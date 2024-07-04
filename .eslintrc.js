module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'next',
      'next/core-web-vitals',
      'plugin:prettier/recommended',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    ignorePatterns: ['node_modules/', 'dist/', 'build/', '.next/'],
    plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React and other node_modules
            ['^react', '^@?\\w'],
            // Side effect imports.
            ['^\\u0000'],
            // Absolute imports
            ['^src/'],
            // Relative imports
            ['^\\.'],
            // CSS and SCSS files last (if any)
            ['^.+\\.s?css$'],
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/ban-types': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      curly: ['error'],
      // 'no-console': 2,
    },
  }
  