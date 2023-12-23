import { describe, expect, test } from 'vitest';
import { Redis } from 'ioredis';
import { getClient } from '#mocks/client.mock';

describe('internals', async () => {
	const client = await getClient();

	test('IF get client THEN ioredis Redis instance', async () => {
		const result = client.client;

		expect(result).toBeInstanceOf(Redis);
	});
});
