import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['apps/rosetta-api/src/**/*.spec.ts', 'apps/rosetta-cli/src/**/*.spec.ts', 'packages/**/src/**/*.spec.ts'],
    reporters: 'default',
    coverage: {
      enabled: false
    }
  }
});
