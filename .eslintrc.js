const schemaJson = require('./graphql.schema.json');

module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
  ],
  plugins: ['@typescript-eslint', 'graphql', 'security'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'graphql/required-fields': 'off',
    'graphql/template-strings': ['error', { env: 'apollo', schemaJson }],
    'no-console': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'security/detect-object-injection': 'off',
  },
};
