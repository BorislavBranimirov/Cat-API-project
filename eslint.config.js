//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import queryConfig from '@tanstack/eslint-plugin-query';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...tanstackConfig,
  ...queryConfig.configs['flat/recommended'],
  reactHooks.configs.flat['recommended-latest'],
  {
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
];
