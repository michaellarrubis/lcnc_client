module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: [
    'reportWebVitals.ts',
    'react-app-env.d.ts',
    'tailwind.config.js',
    'vite.config.js',
    '.eslintrc.js'
  ],
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/control-has-associated-label': [
      2, 
      { 
        'ignoreElements': [
          'input',
          'textarea',
          'button',
          'th',
          'label',
          'option',
          'td'
        ] 
      }
    ],
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never'
      }
    ],
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'import/prefer-default-export': 'off',
    'no-return-await': 'off',
    camelcase: 'off',
    'react/no-danger': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-plusplus': 'off',
    'react/forbid-prop-types': 'off',
    'func-names': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: ['.']
      }
    }
  }
};