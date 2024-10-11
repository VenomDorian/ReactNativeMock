// jest.config.js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo-modules-core|expo|@firebase)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest/setup.js'],
};