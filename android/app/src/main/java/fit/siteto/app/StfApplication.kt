package fit.siteto.app

import android.app.Application
import com.stripe.stripeterminal.TerminalApplicationDelegate

// Stripe's card-reader software needs to know when the app starts and stops.
class StfApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        TerminalApplicationDelegate.onCreate(this)
    }
}
