module.exports = {
  // See: https://nextjs.org/docs/basic-features/eslint
  root: true,
  extends: ["eslint:recommended", "plugin:import/recommended", "next/core-web-vitals", "prettier"],
  plugins: ["jest", "testing-library"],
  env: {
    // See: https://www.npmjs.com/package/eslint-plugin-jest
    "jest/globals": true
    // browser: true,
    // es6: true,
    // jest: true,
    // node: true
  },
  settings: {
    // Recognize imports from "components/" so we don't have to write "../../components/", etc.
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
