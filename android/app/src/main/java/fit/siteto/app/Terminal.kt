package fit.siteto.app

import android.content.Context
import android.util.Log
import com.stripe.stripeterminal.Terminal
import com.stripe.stripeterminal.external.callable.ConnectionTokenCallback
import com.stripe.stripeterminal.external.callable.ConnectionTokenProvider
import com.stripe.stripeterminal.external.callable.TapToPayReaderListener
import com.stripe.stripeterminal.external.callable.TerminalListener
import com.stripe.stripeterminal.external.models.ConnectionStatus
import com.stripe.stripeterminal.external.models.ConnectionTokenException
import com.stripe.stripeterminal.external.models.DisconnectReason
import com.stripe.stripeterminal.external.models.LocaleConfig
import com.stripe.stripeterminal.external.models.PaymentStatus
import com.stripe.stripeterminal.external.models.Reader
import com.stripe.stripeterminal.log.LogLevel

/**
 * Stripe's card reader needs a short-lived "connection token" every so often. Only the SiteToFit server can make
 * one, so we ask the page that is open in the app (it is already signed in) and it calls [provide] with the answer.
 */
object StfTokenProvider : ConnectionTokenProvider {

    /** Set by MainActivity: asks the web page for a token. Runs on the main thread. */
    @Volatile
    var ask: (() -> Unit)? = null

    private var waiting: ConnectionTokenCallback? = null

    override fun fetchConnectionToken(callback: ConnectionTokenCallback) {
        synchronized(this) { waiting = callback }
        val ask = this.ask
        if (ask == null) {
            finish("", "The app isn’t ready yet. Close it and open it again.")
        } else {
            ask()
        }
    }

    /** Called from the web page, through the bridge. */
    fun provide(secret: String, error: String) = finish(secret, error)

    private fun finish(secret: String, error: String) {
        val cb = synchronized(this) { waiting.also { waiting = null } } ?: return
        if (secret.isNotEmpty()) {
            cb.onSuccess(secret)
        } else {
            cb.onFailure(ConnectionTokenException(error.ifEmpty { "Couldn’t sign in to Stripe." }))
        }
    }
}

object StfTerminalListener : TerminalListener {
    override fun onConnectionStatusChange(status: ConnectionStatus) {
        Log.i("StfTerminal", "connection: $status")
    }

    override fun onPaymentStatusChange(status: PaymentStatus) {
        Log.i("StfTerminal", "payment: $status")
    }
}

object StfReaderListener : TapToPayReaderListener {
    override fun onReaderReconnectStarted(reader: Reader, cancelReconnect: com.stripe.stripeterminal.external.callable.Cancelable, reason: DisconnectReason) {
        Log.i("StfTerminal", "reconnect started: $reason")
    }

    override fun onReaderReconnectSucceeded(reader: Reader) {
        Log.i("StfTerminal", "reconnected")
    }

    override fun onReaderReconnectFailed(reader: Reader) {
        Log.w("StfTerminal", "reconnect failed")
    }

    override fun onDisconnect(reason: DisconnectReason) {
        Log.i("StfTerminal", "disconnected: $reason")
    }
}

fun initTerminal(context: Context) {
    if (!Terminal.isInitialized()) {
        Terminal.init(
            context = context.applicationContext,
            logLevel = LogLevel.ERROR,
            tokenProvider = StfTokenProvider,
            listener = StfTerminalListener,
            offlineListener = null,
            localeConfig = LocaleConfig.HardcodedLocale.Builder("en-GB").build(),
        )
    }
}
