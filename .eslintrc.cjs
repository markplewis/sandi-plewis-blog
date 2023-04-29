/* eslint-env node */
module.exports = {
  // See: https://nextjs.org/docs/basic-features/eslint
  root: true,
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    // If the following needs to be re-enabled, then reinstall `eslint-plugin-import` and
    // `eslint-import-resolver-typescript`, but I think `tsc --noemit` takes care of it
    // "plugin:import/recommended",
    // "plugin:import/typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    // "import",
    "jest",
    "testing-library"
  ],
  // rules: {
  //   "import/no-unresolved": "error" // Turn on errors for missing imports
  // },
  // settings: {
  //   "import/parsers": {
  //     "@typescript-eslint/parser": [".ts", ".tsx"]
  //   },
  //   "import/resolver": {
  //     node: true,
  //     typescript: {
  //       alwaysTryTypes: true,
  //       project: "./tsconfig.json"
  //     }
  //   }
  // },
  env: {
    "jest/globals": true // See: https://www.npmjs.com/package/eslint-plugin-jest
  },
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"]
    }
  ]
};
