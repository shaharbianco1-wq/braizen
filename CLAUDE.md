# BRAIZEN — Expo App

## What this app is
This is the Expo shell for **BRAIZEN**, a habit tracker. The actual app UI lives in a single HTML file loaded via WebView.

## Architecture
- `App.tsx` — loads `assets/brizen.html` into a `react-native-webview` fullscreen WebView. No other screens or navigation.
- `assets/brizen.html` — the entire BRAIZEN app (all UI, logic, localStorage persistence). This is the source of truth for features.
- All feature work (habits, XP, challenges, history, profile, theme) happens in `brizen.html`, not in React Native files.

## SDK & versions
- **Expo SDK 54**
- React 19.1.0 / React Native 0.81.5
- Read versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## Running locally
```
npx expo start --lan
```
Scan QR code with Expo Go on phone (same Wi-Fi). SDK 54 is supported by current Expo Go.

## Updating the app
When `brizen.html` changes, copy it to `assets/`:
```
cp ../brizen.html assets/brizen.html
```
Then reload in Expo Go (shake device → Reload).

## Key packages
- `react-native-webview` — renders the HTML app
- `expo-asset` — bundles and resolves the local HTML file URI
- `expo-status-bar` — status bar styling
