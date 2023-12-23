import { describe, expect, test } from 'vitest';
import { MockArrowFunction, MockClass, MockFunction, MockObject, MockObjectClean } from '#mocks/generics.mock';
import { getClient } from '#mocks/client.mock';

describe('get / set', async () => {
	const client = await getClient();

	test('IF no value THEN null', async ({ task: { name } }) => {
		const result = await client.get(name);

		expect(result).toBe(null);
	});

	test('IF string THEN string', async ({ task: { name } }) => {
		await client.set(name, 'value');
		const result = await client.get(name);

		expect(result).toBe('value');
	});

	test('IF number THEN number', async ({ task: { name } }) => {
		await client.set(name, 10);
		const result = await client.get(name);

		expect(result).toBe(10);
	});

	test('IF bigint THEN throw TypeError', async ({ task: { name } }) => {
		await expect(async () => {
			await client.set(
				name,
				// @ts-expect-error - Wrong param type
				BigInt(10)
			);
		}).rejects.toThrowError(TypeError);
	});

	test('IF boolean THEN boolean', async ({ task: { name } }) => {
		await client.set(name, true);
		const result = await client.get(name);

		expect(result).toBe(true);
	});

	test('IF undefined THEN throw TypeError', async ({ task: { name } }) => {
		await expect(async () => {
			await client.set(name, undefined);
		}).rejects.toThrowError(TypeError);
	});

	test('IF null THEN null', async ({ task: { name } }) => {
		await client.set(name, null);
		const result = await client.get(name);

		expect(result).toBe(null);
	});

	test('IF symbol THEN throw TypeError', async ({ task: { name } }) => {
		await expect(async () => {
			await client.set(
				name,
				// @ts-expect-error - Wrong param type
				Symbol('value')
			);
		}).rejects.toThrowError(TypeError);
	});

	test('IF object THEN cleaned object', async ({ task: { name } }) => {
		await client.set(name, MockObject);
		const result = await client.get(name);

		expect(result).toStrictEqual(MockObjectClean);
	});

	test('IF array THEN array', async ({ task: { name } }) => {
		await client.set(name, []);
		const result = await client.get(name);

		expect(result).toStrictEqual([]);
	});

	test('IF function THEN throw TypeError', async ({ task: { name } }) => {
		await expect(async () => {
			await client.set(
				name,
				// @ts-expect-error - Wrong param type
				MockFunction
			);
		}).rejects.toThrowError(TypeError);
	});

	test('IF arrow function THEN throw TypeError', async ({ task: { name } }) => {
		await expect(async () => {
			await client.set(
				name,
				// @ts-expect-error - Wrong param type
				MockArrowFunction
			);
		}).rejects.toThrowError(TypeError);
	});

	test('IF class constructor THEN throw TypeError', async ({ task: { name } }) => {
		await expect(async () => {
			await client.set(
				name,
				// @ts-expect-error - Wrong param type
				MockClass
			);
		}).rejects.toThrowError(TypeError);
	});

	test('IF class instance THEN POJO', async ({ task: { name } }) => {
		await client.set(
			name,
			// @ts-expect-error - Wrong param type
			new MockClass()
		);
		const result = await client.get(name);

		expect(result).toStrictEqual({
			key: 'value'
		});
	});
});
