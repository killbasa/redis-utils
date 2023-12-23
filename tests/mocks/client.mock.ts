import Redis from 'ioredis';
import { RedisMemoryServer } from 'redis-memory-server';
import { RedisClient } from '#src/RedisClient';

let server: RedisMemoryServer;
let rawClient: Redis;
let client: RedisClient;

export function getServer(): RedisMemoryServer {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (server) return server;

	server = new RedisMemoryServer();
	return server;
}

export async function getRawClient(): Promise<Redis> {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (rawClient) return rawClient;

	const _server = getServer();

	rawClient = new Redis({
		host: await _server.getHost(),
		port: await _server.getPort()
	});
	return rawClient;
}

export async function getClient(): Promise<RedisClient> {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (client) return client;

	const _rawClient = await getRawClient();

	client = new RedisClient({
		instance: _rawClient
	});

	return client;
}
