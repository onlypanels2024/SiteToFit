plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "fit.siteto.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "fit.siteto.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            // Debug signing so GitHub Actions can produce an installable APK without Gary's keystore.
            // Before the app goes on Google Play, this gets a real signing key.
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions { jvmTarget = "1.8" }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.activity:activity-ktx:1.9.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.2")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")

    // Stripe Terminal: Tap to Pay on this phone
    implementation("com.stripe:stripeterminal-taptopay:6.0.0")
    implementation("com.stripe:stripeterminal-core:6.0.0")
    implementation("com.stripe:stripeterminal-ktx:6.0.0")
}
