import { getRawClient, getServer } from './mocks/client.mock';
import { afterAll, beforeEach } from 'vitest';

beforeEach(async () => {
	const client = await getRawClient();
	await client.flushall();
});

afterAll(async () => {
	const rawClient = await getRawClient();
	rawClient.disconnect();

	const server = getServer();
	await server.stop();
});
