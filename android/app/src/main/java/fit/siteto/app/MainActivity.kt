package fit.siteto.app

import android.Manifest
import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.stripe.stripeterminal.Terminal
import com.stripe.stripeterminal.external.models.CollectPaymentIntentConfiguration
import com.stripe.stripeterminal.external.models.ConfirmPaymentIntentConfiguration
import com.stripe.stripeterminal.external.models.ConnectionConfiguration
import com.stripe.stripeterminal.external.models.DiscoveryConfiguration
import com.stripe.stripeterminal.external.models.PaymentIntentStatus
import com.stripe.stripeterminal.external.models.Reader
import com.stripe.stripeterminal.external.models.TapUseCase
import com.stripe.stripeterminal.external.models.TerminalException
import com.stripe.stripeterminal.ktx.connectReader
import com.stripe.stripeterminal.ktx.discoverReaders
import com.stripe.stripeterminal.ktx.processPaymentIntent
import com.stripe.stripeterminal.ktx.retrievePaymentIntent
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.coroutines.flow.first
import androidx.lifecycle.lifecycleScope
import org.json.JSONObject
import java.io.OutputStream

/**
 * The SiteToFit app: the website's app in a full-screen window, plus Tap to Pay, so a payment can be taken on the
 * phone itself. Everything else (jobs, clients, quotes) is the same app as in the browser.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var web: WebView
    private var filePick: ValueCallback<Array<Uri>>? = null
    private var pendingTap: JSONObject? = null

    private val pickFiles = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        val cb = filePick ?: return@registerForActivityResult
        filePick = null
        cb.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(r.resultCode, r.data) ?: arrayOf())
    }

    private val askLocation = registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        val tap = pendingTap
        pendingTap = null
        if (granted && tap != null) startTap(tap)
        else if (tap != null) tapFailed("Tap to Pay needs the location permission. Stripe requires it for card payments.")
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initTerminal(this)
        StfTokenProvider.ask = { runJs("window.stfTapToken && window.stfTapToken()") }

        web = WebView(this)
        setContentView(web)
        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT
            useWideViewPort = true
            loadWithOverviewMode = true
            userAgentString = "$userAgentString SiteToFitApp/1.0"
        }
        web.addJavascriptInterface(Bridge(), "StfNative")
        web.webViewClient = Client()
        web.webChromeClient = Chrome()
        web.setDownloadListener { url, _, _, _, _ -> openOutside(url) }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (web.canGoBack()) web.goBack() else finish()
            }
        })

        if (savedInstanceState == null) web.loadUrl(APP_URL) else web.restoreState(savedInstanceState)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        web.saveState(outState)
    }

    override fun onDestroy() {
        StfTokenProvider.ask = null
        super.onDestroy()
    }

    // ---------- the page talks to the app ----------

    inner class Bridge {
        /** The page asks for a payment to be taken on this phone. */
        @JavascriptInterface
        fun tapToPay(json: String) {
            val data = try { JSONObject(json) } catch (e: Exception) { null }
            if (data == null || data.optString("clientSecret").isEmpty()) {
                runOnUiThread { tapFailed("The payment couldn’t be prepared. Try again.") }
                return
            }
            runOnUiThread {
                if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.ACCESS_COARSE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED
                ) {
                    startTap(data)
                } else {
                    pendingTap = data
                    askLocation.launch(Manifest.permission.ACCESS_COARSE_LOCATION)
                }
            }
        }

        /** The page hands over the Stripe connection token it fetched from the server. */
        @JavascriptInterface
        fun tapToken(secret: String, error: String) = StfTokenProvider.provide(secret, error)

        /** True whenever the page is running inside this app. */
        @JavascriptInterface
        fun hasTapToPay(): Boolean = true

        /** The page hands over a file it made (a receipt or quote PDF) so the app can save it. */
        @JavascriptInterface
        fun saveFile(name: String, mime: String, base64: String) {
            try {
                val bytes = Base64.decode(base64, Base64.DEFAULT)
                saveToDownloads(if (name.isBlank()) "SiteToFit.pdf" else name, mime.ifBlank { "application/pdf" }, bytes)
                runOnUiThread { Toast.makeText(this@MainActivity, "Saved to Downloads", Toast.LENGTH_SHORT).show() }
            } catch (e: Exception) {
                runOnUiThread { Toast.makeText(this@MainActivity, "The file couldn’t be saved.", Toast.LENGTH_LONG).show() }
            }
        }
    }

    // ---------- Tap to Pay ----------

    private fun startTap(data: JSONObject) {
        val secret = data.optString("clientSecret")
        val locationId = data.optString("locationId")
        val simulated = data.optBoolean("simulated", false)
        lifecycleScope.launch {
            try {
                tapStatus("Starting the card reader on this phone…")
                val reader = withContext(Dispatchers.IO) { connectedOrConnect(locationId, simulated) }
                if (reader == null) {
                    tapFailed("This phone can’t take Tap to Pay payments. Check it has NFC switched on and is supported by Stripe.")
                    return@launch
                }
                tapStatus("Hold the card or phone against the back of this phone…")
                val paid = withContext(Dispatchers.IO) {
                    val intent = Terminal.getInstance().retrievePaymentIntent(secret)
                    Terminal.getInstance().processPaymentIntent(
                        intent = intent,
                        collectConfig = CollectPaymentIntentConfiguration.Builder().build(),
                        confirmConfig = ConfirmPaymentIntentConfiguration.Builder().build(),
                    )
                }
                if (paid.status == PaymentIntentStatus.SUCCEEDED) {
                    tapDone()
                } else {
                    tapFailed("The card wasn’t accepted (${paid.status?.name?.lowercase()?.replace('_', ' ')}). Nothing was charged.")
                }
            } catch (e: CancellationException) {
                throw e
            } catch (e: TerminalException) {
                tapFailed(e.errorMessage.ifBlank { "The payment didn’t go through. Nothing was charged." })
            } catch (e: Exception) {
                tapFailed(e.message ?: "The payment didn’t go through. Nothing was charged.")
            }
        }
    }

    /** Uses the reader already set up on this phone, or sets it up (once per app start). */
    private suspend fun connectedOrConnect(locationId: String, simulated: Boolean): Reader? {
        Terminal.getInstance().connectedReader?.let { return it }
        if (locationId.isEmpty()) return null
        val found = withTimeoutOrNull(25_000) {
            Terminal.getInstance()
                .discoverReaders(config = DiscoveryConfiguration.TapToPayDiscoveryConfiguration(simulated))
                .first { it.isNotEmpty() }
                .first()
        } ?: return null
        return Terminal.getInstance().connectReader(
            found,
            ConnectionConfiguration.TapToPayConnectionConfiguration(
                useCase = TapUseCase.Pay(locationId),
                autoReconnectOnUnexpectedDisconnect = true,
                tapToPayReaderListener = StfReaderListener,
            ),
        )
    }

    private fun tapStatus(msg: String) = runJs("window.stfTapStatus && window.stfTapStatus(${js(msg)})")
    private fun tapDone() = runJs("window.stfTapResult && window.stfTapResult({ok:true})")
    private fun tapFailed(msg: String) = runJs("window.stfTapResult && window.stfTapResult({ok:false,error:${js(msg)}})")

    private fun runJs(code: String) = runOnUiThread { web.evaluateJavascript(code, null) }
    private fun js(s: String) = JSONObject.quote(s)

    // ---------- the window itself ----------

    private inner class Client : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
            val url = request.url.toString()
            val inApp = url.startsWith("https://siteto.fit") || url.startsWith("https://www.siteto.fit")
            // Stripe's own pages (card set-up) have to open in the app too, or the owner can't finish signing up.
            val stripe = url.startsWith("https://connect.stripe.com") || url.startsWith("https://checkout.stripe.com")
            if (inApp || stripe) return false
            openOutside(url)
            return true
        }

        override fun onPageFinished(view: WebView, url: String) {
            // Save PDFs the app makes in the page (receipts, quotes) to the phone's Downloads.
            view.evaluateJavascript(DOWNLOAD_HOOK, null)
        }
    }

    private inner class Chrome : WebChromeClient() {
        override fun onShowFileChooser(
            view: WebView,
            callback: ValueCallback<Array<Uri>>,
            params: FileChooserParams,
        ): Boolean {
            filePick?.onReceiveValue(null)
            filePick = callback
            return try {
                pickFiles.launch(params.createIntent())
                true
            } catch (e: ActivityNotFoundException) {
                filePick = null
                false
            }
        }

        override fun onPermissionRequest(request: android.webkit.PermissionRequest) {
            // Only the camera, and only for taking a photo of a job or a fault.
            val camera = request.resources.filter { it == android.webkit.PermissionRequest.RESOURCE_VIDEO_CAPTURE }
            if (camera.isNotEmpty() &&
                ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED
            ) request.grant(camera.toTypedArray()) else request.deny()
        }
    }

    private fun openOutside(url: String) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        } catch (e: ActivityNotFoundException) {
            Toast.makeText(this, "Nothing on this phone can open that link.", Toast.LENGTH_LONG).show()
        }
    }

    private fun saveToDownloads(name: String, mime: String, bytes: ByteArray) {
        val values = ContentValues().apply {
            put(MediaStore.MediaColumns.DISPLAY_NAME, name)
            put(MediaStore.MediaColumns.MIME_TYPE, mime)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) put(MediaStore.MediaColumns.IS_PENDING, 1)
        }
        val resolver = contentResolver
        val collection = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q)
            MediaStore.Downloads.EXTERNAL_CONTENT_URI else MediaStore.Files.getContentUri("external")
        val uri = resolver.insert(collection, values) ?: throw IllegalStateException("no uri")
        resolver.openOutputStream(uri).use { out: OutputStream? -> out?.write(bytes) }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            values.clear()
            values.put(MediaStore.MediaColumns.IS_PENDING, 0)
            resolver.update(uri, values, null, null)
        }
    }

    companion object {
        private const val APP_URL = "https://siteto.fit/app/"

        /** Catches a file the page downloads (blob:) and hands it to the app to save. */
        private const val DOWNLOAD_HOOK = """
            (function(){
              if (window.__stfDl) return; window.__stfDl = 1;
              document.addEventListener('click', function(e){
                var a = e.target && e.target.closest && e.target.closest('a[download]');
                if (!a) return;
                var h = a.getAttribute('href') || '';
                if (h.indexOf('blob:') !== 0 && h.indexOf('data:') !== 0) return;
                e.preventDefault(); e.stopPropagation();
                fetch(h).then(function(r){ return r.blob() }).then(function(b){
                  var fr = new FileReader();
                  fr.onload = function(){
                    var s = String(fr.result); var i = s.indexOf(',');
                    StfNative.saveFile(a.getAttribute('download') || 'SiteToFit.pdf', b.type || 'application/pdf', i < 0 ? '' : s.slice(i+1));
                  };
                  fr.readAsDataURL(b);
                }).catch(function(){});
              }, true);
            })();
        """
    }
}
