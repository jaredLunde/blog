const path = require("path");
const tsconfig = require("../tsconfig.json");

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  coverageDirectory: ".jest/coverage",
  globals: {
    "split-tests": { junit: "./.jest/test-results.xml" },
  },
  moduleDirectories: [
    "node_modules",
    ...Object.values(tsconfig.compilerOptions.paths)
      .flatMap((dirs) => dirs.map((dir) => path.dirname(dir)))
      .filter((dir, i, arr) => arr.indexOf(dir) === i),
  ],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  rootDir: path.resolve(__dirname, "../"),
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.{js,jsx,ts,tsx}"],
  testSequencer: "@split-tests/jest",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc-node/jest",
      {
        react: {
          runtime: "automatic",
          useBuiltins: true,
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules"],
};
