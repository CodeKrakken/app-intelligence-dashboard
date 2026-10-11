module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/frontend'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: false,
        }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ] },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/frontend/test/setup.ts'],
  clearMocks: true,
};