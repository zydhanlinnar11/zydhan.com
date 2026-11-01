import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: [
			'build/**',
			'.svelte-kit/**',
			'node_modules/**',
			'.agent/**',
			'.claude/**',
			'.cursor/**',
			'.gemini/**',
			'.impeccable/**',
			'.opencode/**',
			'.superpowers/**'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs.recommended,
	{
		files: ['**/*.svelte'],
		languageOptions: { parserOptions: { parser: tseslint.parser } }
	},
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } }
];
