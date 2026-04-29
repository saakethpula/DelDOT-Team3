import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts'], // Ensure test files are included
    exclude: ['node_modules', 'dist'], // Exclude unnecessary directories
  },
});