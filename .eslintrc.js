module.exports = {
  env: {
    browser: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:flowtype/recommended"
  ],
  plugins: ["react", "flowtype", "jest"]
};
