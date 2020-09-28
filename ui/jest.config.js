module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tailwind/"],
  testRegex: "(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
