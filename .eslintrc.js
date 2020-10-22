module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: require.resolve('./tsconfig.json'),
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
	],
	extends: [
		'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
  rules: {
    'no-unexpected-multiline': [ 'warn' ],
    'no-var': [ 'warn' ],
    'prefer-rest-params': [ 'warn' ],
    'prefer-spread': [ 'warn' ],
    '@typescript-eslint/ban-types': [ 'warn' ],
    '@typescript-eslint/no-explicit-any': [ 'warn' ],
    '@typescript-eslint/no-empty-function': [ 'warn' ],
    '@typescript-eslint/no-floating-promises': [ 'warn' ],
    '@typescript-eslint/no-unsafe-assignment': [ 'warn' ],
    '@typescript-eslint/no-unsafe-member-access': [ 'warn' ],
    '@typescript-eslint/no-unsafe-return': [ 'warn' ],
    '@typescript-eslint/no-unsafe-call': [ 'warn' ],
    '@typescript-eslint/restrict-plus-operands': [ 'warn' ],
    '@typescript-eslint/restrict-template-expressions': [ 'warn' ],
    '@typescript-eslint/require-await': [ 'warn' ],

    'prefer-const': [ 'warn' ],
  },
};
