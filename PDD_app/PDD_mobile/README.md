# AI Trip Planner Mobile

Production-oriented Expo + React Native app for AI-assisted tourism planning. It includes source/destination planning, route intelligence, weather, hotel and food recommendations, transport options, emergency nearby services, safety analysis, saved trips, profile/auth screens, and an AI travel assistant.

## Run

```bash
npm install
npm start
```

Open in Expo Go on Android/iOS.

## Environment

API keys are loaded from `.env` through `EXPO_PUBLIC_*` variables. Keep real keys in `.env` and use `.env.example` as the template.

## Architecture

- `app/` Expo Router screens and tabs
- `components/travel/` reusable mobile UI components
- `services/` Geoapify, OpenWeather, OpenRouteService, AI planning, and fallback data
- `redux/` app state provider with reducer-style actions
- `api/` backend API client
- `database/` offline saved trip abstraction
- `hooks/` reusable hooks

The API service modules always return fallback data if a provider fails, so the app remains usable during network/API limits.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
