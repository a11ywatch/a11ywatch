const { defaults } = require("jest-config");
const tsPreset = require("ts-jest/jest-preset");
const mongodbPreset = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
  },
  verbose: true,
};
