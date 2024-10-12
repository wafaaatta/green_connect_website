/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest', // Use 'ts-jest' if using TypeScript
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.tsx', '.ts'], // Add extensions to treat as ESM
  transformIgnorePatterns: [
    "node_modules/(?!your-module-name)", // If needed
  ],
};