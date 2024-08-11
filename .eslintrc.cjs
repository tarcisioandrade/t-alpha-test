module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "react-hooks",
    "prettier",
    "@typescript-eslint",
    "react-refresh",
    "import",
    "@tanstack/query",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
  ],
  rules: {
    "no-useless-escape": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs", "eslint.config.js"],
  globals: {
    Edit: "writable",
    console: "writable",
    _: "writable",
    $: "writable",
  },
};
