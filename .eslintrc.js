module.exports = {
  "extends": [
    'airbnb-typescript',
    'airbnb/hooks',
    "react-app",
    "prettier/@typescript-eslint",
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    "plugin:promise/recommended"
  ],
  "rules": {
    "no-underscore-dangle": 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parserOptions": {
    "project": './tsconfig.eslint.json'
  }
}
