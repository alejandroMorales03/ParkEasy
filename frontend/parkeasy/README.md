# Expo Router Example

Use [`expo-router`](https://docs.expo.dev/router/introduction/) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)

# SVG Installation Commands

- Install React Native SVG using ```npx expo install react-native-svg``` allows core support for SVG elements and components.

- Install React Native SVG Transformer ```npm install --save-dev react-native-svg-transformer``` automatically converts and SVG file into a React component

- Import your .svg file inside a React Component
  ```import InsertLogoNameHere from "./assets/logoName.svg";```

- Render it using ... within the component
  ```<InsertLogoNameHere width={120} height={40} />```