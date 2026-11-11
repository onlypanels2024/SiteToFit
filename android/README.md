# SiteToFit Android app

The SiteToFit app in a full-screen window, plus **Tap to Pay**: a payment taken on the staff phone
itself, with the client holding their card, phone or watch against the back of it.

## Building the app file (APK)

1. Open the repository on GitHub, then the **Actions** tab.
2. Choose **Android app** on the left, then **Run workflow**.
3. When it finishes, open the run and download **SiteToFit-app** at the bottom. Inside is the
   `.apk` file to install on the phone.

## Installing it on a phone

The app is not on Google Play yet, so the phone has to allow it: open the `.apk`, and when Android
asks, allow installing apps from that app (Files or Chrome).

## What the phone needs for Tap to Pay

- Android 13 or newer, NFC switched on, Google Play services, not rooted, developer options off.
- Stripe must have switched Tap to Pay on for the account (Malta is on Stripe's preview list).
- The business address filled in under **POS settings → Tap to Pay** in the SiteToFit app.

If anything is missing, the payment screen still shows the QR code and link so the client can pay
on their own phone.

## Signing

The release build is signed with Android's debug key so the workflow can produce an installable
file without anyone handling a keystore. Before the app goes on Google Play it needs a real signing
key, which is set up then.
