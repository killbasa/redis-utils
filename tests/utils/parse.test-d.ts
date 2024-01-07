import { assertType, describe, expect, expectTypeOf, test } from 'vitest';
import type { RedisData } from '#src/types';
import { parse } from '#src/utils';
import { MockArrowFunction, MockClass, MockFunction } from '#mocks/generics.mock';

describe('format types', () => {
	describe('params', () => {
		test('args', () => {
			expectTypeOf(parse).parameter(0).toEqualTypeOf<string | null>();
		});

		test('string', () => {
			assertType(parse('string'));
		});

		test('null', () => {
			assertType(parse(null));
		});

		test('boolean', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(true)).toThrow(TypeError);
		});

		test('undefined', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(undefined)).toThrow(TypeError);
		});

		test('object', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse({})).toThrow(TypeError);
		});

		test('array', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse([])).toThrow(TypeError);
		});

		test('bigint', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(10n)).toThrow(TypeError);
		});

		test('symbol', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(Symbol('value'))).toThrow(TypeError);
		});

		test('function', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(MockFunction)).toThrow(TypeError);
		});

		test('arrow function', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(MockArrowFunction)).toThrow(TypeError);
		});

		test('class constructor', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(MockClass)).toThrow(TypeError);
		});

		test('constructor', () => {
			// @ts-expect-error - Wrong param type
			expect(() => parse(new MockClass())).toThrow(TypeError);
		});
	});

	test('return', () => {
		expectTypeOf(parse).returns.toEqualTypeOf<RedisData>();
	});
});
