import { describe, expect, test } from 'vitest';
import { MockArrowFunction, MockClass, MockFunction, MockObject } from '#mocks/generics.mock';
import { format } from '#src/utils';

describe('format', () => {
	test('string', () => {
		const value = 'String';

		const result = format(value);
		expect(result).toBe('"String"');
	});

	test('number', () => {
		const value = 10;

		const result = format(value);
		expect(result).toBe('10');
	});

	test('bigint', () => {
		const value = BigInt(10);

		expect(() => {
			// @ts-expect-error - Wrong param type
			format(value);
		}).toThrow(TypeError);
	});

	test('boolean', () => {
		const value = true;

		const result = format(value);
		expect(result).toBe('true');
	});

	test('undefined', () => {
		const value = undefined;

		expect(() => {
			format(value);
		}).toThrow(TypeError);
	});

	test('null', () => {
		const value = null;

		const result = format(value);
		expect(result).toBe('null');
	});

	test('symbol', () => {
		const value = Symbol('value');

		expect(() => {
			// @ts-expect-error - Wrong param type
			format(value);
		}).toThrow(TypeError);
	});

	test('object', () => {
		const result = format(MockObject);
		expect(result).toBe('{"string":"value","number":10,"bool":true,"null":null,"object":{"key":"value"},"array":[]}');
	});

	test('array', () => {
		const value: string[] = [];

		const result = format(value);
		expect(result).toBe('[]');
	});

	test('function', () => {
		expect(() => {
			// @ts-expect-error - Wrong param type
			format(MockFunction);
		}).toThrow(TypeError);
	});

	test('arrow function', () => {
		expect(() => {
			// @ts-expect-error - Wrong param type
			format(MockArrowFunction);
		}).toThrow(TypeError);
	});

	test('class', () => {
		expect(() => {
			// @ts-expect-error - Wrong param type
			format(MockClass);
		}).toThrow(TypeError);
	});

	test('class instance', () => {
		const value = new MockClass();

		// @ts-expect-error - Wrong param type
		const result = format(value);
		expect(result).toBe('{"key":"value"}');
	});
});
