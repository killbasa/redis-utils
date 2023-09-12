import { describe, expect, test } from 'bun:test';
import { parse } from '#src/utils';

describe('parse', () => {
	// eslint-disable-next-line @typescript-eslint/no-extraneous-class
	const TestClass = class Test {
		public key = 'value';
	};

	test('string', () => {
		const value = '"String"';

		const result = parse(value);
		expect(result).toBe('String');
	});

	test('number', () => {
		const value = '10';

		const result = parse(value);
		expect(result).toBe(10);
	});

	test('bigint', () => {
		const value = BigInt(10);

		expect(() => {
			// @ts-expect-error Wrong param type
			parse(value);
		}).toThrow(TypeError);
	});

	test('boolean', () => {
		const value = 'true';

		const result = parse(value);
		expect(result).toBe(true);
	});

	test('undefined', () => {
		const value = undefined;

		expect(() => {
			// @ts-expect-error Wrong param type
			parse(value);
		}).toThrow(TypeError);
	});

	test('null', () => {
		const value = 'null';

		const result = parse(value);
		expect(result).toBe(null);
	});

	test('symbol', () => {
		const value = Symbol('value');

		expect(() => {
			// @ts-expect-error Wrong param type
			parse(value);
		}).toThrow(TypeError);
	});

	test('object', () => {
		const value = '{"string":"value","number":10,"bool":true,"null":null,"object":{"key":"value"},"array":[]}';

		const result = parse(value);
		expect(result).toStrictEqual({
			string: 'value',
			number: 10,
			bool: true,
			null: null,
			object: { key: 'value' },
			array: []
		});
	});

	test('array', () => {
		const value = '[]';

		const result = parse(value);
		expect(result).toStrictEqual([]);
	});

	test('function', () => {
		const value = function (): boolean {
			return true;
		};

		expect(() => {
			// @ts-expect-error Wrong param type
			parse(value);
		}).toThrow(TypeError);
	});

	test('arrow function', () => {
		const value = (): boolean => {
			return true;
		};

		expect(() => {
			// @ts-expect-error Wrong param type
			parse(value);
		}).toThrow(TypeError);
	});

	test('class', () => {
		const value = TestClass;

		expect(() => {
			// @ts-expect-error Wrong param type
			parse(value);
		}).toThrow(TypeError);
	});

	test('class instance', () => {
		const value = '{"key":"value"}';

		const result = parse(value);
		expect(result).toEqual(new TestClass());
	});
});
