import { describe, expect, test } from 'vitest';
import { getClient } from '#mocks/client.mock';
import { MockObject, MockObjectClean } from '#mocks/generics.mock';

describe('hget / hset', async () => {
	const client = await getClient();

	test('IF no value THEN null', async ({ task: { name } }) => {
		const result = await client.hGet(name, 'no-value');

		expect(result).toBe(null);
	});

	test('IF zero THEN zero', async ({ task: { name } }) => {
		await client.hSet(name, 'key', 0);
		const result = await client.hGet(name, 'key');

		expect(result).toBe(0);
	});

	test('IF one THEN one', async ({ task: { name } }) => {
		await client.hSet(name, 'key', 1);
		const result = await client.hGet(name, 'key');

		expect(result).toBe(1);
	});

	test('IF string THEN string', async ({ task: { name } }) => {
		await client.hSet(name, 'key', 'value');
		const result = await client.hGet(name, 'key');

		expect(result).toBe('value');
	});

	test('IF object THEN object', async ({ task: { name } }) => {
		await client.hSet(
			name,
			'key',
			// @ts-expect-error - Wrong param type
			MockObject
		);
		const result = await client.hGet(name, 'key');

		expect(result).toStrictEqual(MockObjectClean);
	});
});
