import { assert, describe, expect, test } from 'vitest';
import { getClient } from '#mocks/client.mock';
import { MockObject, MockObjectClean } from '#mocks/generics.mock';

describe('hgetall / hmset', async () => {
	const client = await getClient();

	test('IF no value THEN null', async ({ task: { name } }) => {
		const result = await client.hGetAll(name);

		expect(result).toStrictEqual(new Map());
	});

	test('IF string map THEN string map', async ({ task: { name } }) => {
		const data = new Map([
			['key', 'value'],
			['key2', 'value2']
		]);

		await client.hmSet(name, data);
		const [entries, values] = await Promise.all([
			client.hGetAll(name), //
			client.hGetValues(name)
		]);

		assert(entries.size === data.size);
		expect(values).toStrictEqual(['value', 'value2']);

		for (const [key, val] of entries) {
			const obj = data.get(key);
			expect(val).toBe(obj);
		}
	});

	test('IF object map THEN object map', async ({ task: { name } }) => {
		const data = new Map([
			['key', MockObject],
			['key2', MockObject]
		]);

		await client.hmSet(
			name,
			// @ts-expect-error - Wrong param type
			data
		);
		const [entries, values] = await Promise.all([
			client.hGetAll(name), //
			client.hGetValues(name)
		]);

		assert(entries.size === data.size);
		assert(values.length === data.size);

		for (const val of entries.values()) {
			expect(val).toStrictEqual(MockObjectClean);
		}

		for (const val of values) {
			expect(val).toStrictEqual(MockObjectClean);
		}
	});
});
