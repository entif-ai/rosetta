import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'apps/rosetta-operator/react-router.config.ts',
      'apps/rosetta-operator/tests/**',
      'apps/rosetta-operator/vite.config.ts',
      'apps/rosetta-operator/build/**',
      'apps/rosetta-operator/dist/**',
      'apps/rosetta-cli/dist/**',
      'apps/rosetta-api/dist/**',
      '.nx/**',
      'coverage/**',
      'node_modules/**',
      'packages/**/dist/**',
      'tmp/**',
      'vitest.config.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  }
);
