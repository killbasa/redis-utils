import { describe, expect, test } from 'vitest';
import { getClient } from '#mocks/client.mock';

describe('deleteScanKeys', async () => {
	const client = await getClient();

	test('IF no value THEN null', async ({ task: { name } }) => {
		const keys = [
			`${name}:value:1`, //
			`${name}:value:2`,
			`${name}:value:3`
		];

		await Promise.all(keys.map((key) => client.set(key, true)));

		client.deleteScanKeys(`${name}:value:*`);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep 1s

		const result = await Promise.all(keys.map((key) => client.get(key)));

		expect(result).toStrictEqual([null, null, null]);
	});
});
