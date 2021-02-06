const { defaults } = require("jest-config");

module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
  },
  verbose: true,
  preset: "ts-jest",
  coverageDirectory: "./coverage/",
  collectCoverage: true,
};
