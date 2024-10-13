/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest', 
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.tsx', '.ts']
};