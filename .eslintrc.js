module.exports = {
	root: true,
	extends: ['@kbotdev/eslint-config'],
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname
	},
	overrides: [
		{
			files: ['tests/**/*'],
			rules: { 'import/no-unresolved': 'off' }
		}
	]
};
