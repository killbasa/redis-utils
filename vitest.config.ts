import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: 'istanbul',
			reporter: ['text']
		},
		setupFiles: ['./tests/vitest.setup.ts'],
		typecheck: {
			enabled: true,
			checker: 'tsc',
			tsconfig: './tests/tsconfig.json'
		}
	},
	resolve: {
		alias: {
			'#mocks': resolve('./tests/mocks'),
			'#src': resolve('./src')
		}
	}
});
