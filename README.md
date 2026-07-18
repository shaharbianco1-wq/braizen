# BRAIZEN

A minimalist habit tracker built to help you become 1% better every day.

## Features

- **Today** — check off daily habits, see completion ring and streak
- **History** — 12-week heatmap, habit performance ranking, radar chart, analytics
- **Challenges** — 12 pre-built multi-week challenges (cold showers, running, clean eating, digital detox, and more) with XP rewards
- **Progress** — XP system, 10 levels, streak calendar, perfect day tracking
- **Profile** — name, photo, settings, light/dark mode toggle
- **XP & Levels** — earn XP for every habit logged, perfect days, and completed challenges
- **Streaks** — per-habit streaks and consistency streak (60% daily completion)
- **Light/Dark mode** — toggle in top bar or profile settings

## Tech

| Layer | Stack |
|---|---|
| App UI | Single HTML file (`brizen.html`) — vanilla JS, CSS custom properties, localStorage |
| Mobile shell | Expo SDK 54 (React Native 0.81.5) |
| Renderer | `react-native-webview` loading `brizen.html` as a local asset |

## Running on your phone

1. Install **Expo Go** from the App Store or Play Store
2. Make sure your phone and PC are on the same Wi-Fi
3. Run:
   ```bash
   cd my-app
   npx expo start --lan
   ```
4. Scan the QR code with Expo Go

## Project structure

```
brizen.html          ← entire app UI + logic (edit features here)
my-app/
  App.tsx            ← Expo shell: loads brizen.html in a WebView
  assets/brizen.html ← copy of brizen.html bundled with the app
  app.json           ← Expo config (SDK 54)
  package.json       ← dependencies
```

## Updating the app

After editing `brizen.html`, copy it into the Expo assets folder:

```bash
cp brizen.html my-app/assets/brizen.html
```

Then reload in Expo Go (shake device → Reload).
