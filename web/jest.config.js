const { defaults } = require('jest-config')

module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/(?!(monaco-editor)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '@app-strings': '<rootDir>/src/content/strings/a11y/',
    '@app-theme': '<rootDir>/src/theme/main/',
    '@web-config': '<rootDir>/web-config.js',
    // ui: '<rootDir>/node_modules/@a11ywatch/ui/main/$1',
  },
  verbose: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
}
