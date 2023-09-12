import { describe, expect, test } from 'bun:test';
import { format, parse } from '#src/utils';

describe('e2e', () => {
	test('string', () => {
		const value = 'String';

		const result = format(value);
		expect(parse(result)).toBe(value);
	});

	test('number', () => {
		const value = 10;

		const result = format(value);
		expect(parse(result)).toBe(value);
	});

	test('boolean', () => {
		const value = true;

		const result = format(value);
		expect(parse(result)).toBe(value);
	});

	test('null', () => {
		const value = null;

		const result = format(value);
		expect(parse(result)).toBe(value);
	});

	test('object', () => {
		const value = { key: 'value' };

		const result = format(value);
		expect(parse(result)).toStrictEqual(value);
	});
});
