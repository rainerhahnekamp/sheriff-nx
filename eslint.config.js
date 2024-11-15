const nx = require('@nx/eslint-plugin');
const tseslint = require('typescript-eslint');
const sheriff = require('@softarc/eslint-plugin-sheriff');

module.exports = tseslint.config(
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.ts'],
    ignores: ['sheriff.config.ts'],
    extends: [sheriff.configs.all],
  }
  // Note: proposed eslint config for https://github.com/softarc-consulting/sheriff/issues/165 (given that a new rule, 'checkConfig' was created)
  // {
  //   files: ['sheriff.config.ts'],
  //   extends: [sheriff.configs.checkConfig],
  // }
);
