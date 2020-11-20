module.exports = {
  "extends": [
    'airbnb-typescript'
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-underscore-dangle": 0
  },
  "parserOptions": {
    "project": './tsconfig.json'
  }
}
