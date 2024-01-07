import { assertType, describe, expect, expectTypeOf, test } from 'vitest';
import type { RedisData } from '#src/types';
import { format } from '#src/utils';
import { MockArrowFunction, MockClass, MockFunction } from '#mocks/generics.mock';

describe('format types', () => {
	describe('params', () => {
		test('args', () => {
			expectTypeOf(format).parameter(0).toEqualTypeOf<RedisData>();
		});

		test('string', () => {
			assertType(format('string'));
		});

		test('boolean', () => {
			assertType(format(true));
		});

		test('null', () => {
			assertType(format(null));
		});

		test('object', () => {
			assertType(format({}));
		});

		test('array', () => {
			assertType(format([]));
		});

		test('constructor', () => {
			// @ts-expect-error - Wrong param type
			assertType(format(new MockClass()));
		});

		test('undefined', () => {
			// @ts-expect-error - Wrong param type
			expect(() => format(undefined)).toThrow();
		});

		test('bigint', () => {
			// @ts-expect-error - Wrong param type
			expect(() => format(10n)).toThrow();
		});

		test('symbol', () => {
			// @ts-expect-error - Wrong param type
			expect(() => format(Symbol('value'))).toThrow();
		});

		test('function', () => {
			// @ts-expect-error - Wrong param type
			expect(() => format(MockFunction)).toThrow();
		});

		test('arrow function', () => {
			// @ts-expect-error - Wrong param type
			expect(() => format(MockArrowFunction)).toThrow();
		});

		test('class constructor', () => {
			// @ts-expect-error - Wrong param type
			expect(() => format(MockClass)).toThrow();
		});
	});

	test('return', () => {
		expectTypeOf(format).returns.toEqualTypeOf<string>();
	});
});
