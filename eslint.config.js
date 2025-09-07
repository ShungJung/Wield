import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import jsx11y from 'eslint-plugin-jsx-a11y';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            react,
            'jsx-a11y': jsx11y,
            tailwindcss,
            prettier,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // TypeScript rules
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',

            // React rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],

            // Tailwind rules
            'tailwindcss/classnames-order': 'warn',
            'tailwindcss/no-custom-classname': 'warn',

            // Prettier integration
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    tabWidth: 4,
                    singleQuote: true,
                    trailingComma: 'es5',
                },
            ],
        },
    },
]);
