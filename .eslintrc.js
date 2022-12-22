module.exports = {
  // See: https://nextjs.org/docs/basic-features/eslint
  root: true,
  extends: ["eslint:recommended", "plugin:import/recommended", "next/core-web-vitals", "prettier"],
  // TODO: consider removing `eslint-plugin-prettier` and `prettier/prettier` rule
  // See: https://prettier.io/docs/en/integrating-with-linters.html#notes
  plugins: ["jest", "testing-library", "prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  env: {
    // See: https://www.npmjs.com/package/eslint-plugin-jest
    "jest/globals": true
    // browser: true,
    // es6: true,
    // jest: true,
    // node: true
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", __dirname]
      }
    }
  },
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"]
    }
  ]
};
