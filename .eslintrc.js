module.exports = {
  "extends": [
    'airbnb-typescript',
    'airbnb/hooks',
    "react-app",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
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
