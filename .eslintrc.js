module.exports = {
  "extends": [
    'airbnb-typescript',
    'airbnb/hooks',
    "react-app",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parserOptions": {
    "project": './tsconfig.eslint.json'
  }
}
