// See: https://github.com/vercel/next.js/issues/37524
const { default: nextJest } = require("next/jest");

// See: https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

const createJestConfig = nextJest({
  // Provide the path to load `next.config.js` and `.env` files in your test environment
  dir: "./"
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */

const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom"
};

// `createJestConfig` is exported this way to ensure that
// `next/jest` can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
