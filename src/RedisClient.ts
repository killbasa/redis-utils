import { format, parse } from './utils';
import { Redis } from 'ioredis';
import type { RedisKey, RedisOptions } from 'ioredis';
import type { RedisData } from 'types';

export class RedisClient extends Redis {
	/**
	 * The options to pass to the {@link RedisClient}.
	 * @param options - The {@link RedisOptions} to pass
	 */
	public constructor(options: RedisOptions) {
		super(options);
	}

	/**
	 * Get the value of a key.
	 * @param key - The key to get.
	 * @returns The value of the key.
	 */
	public override async get<T extends RedisData>(key: string): Promise<T | null> {
		const result = await super.get(key);
		return parse<T>(result);
	}

	/**
	 * Set the string value of a key.
	 * @param key - The key of the value to set.
	 * @param data - The value to set.
	 * @returns If the operation was successful.
	 */
	public override async set<T extends RedisData>(key: string, data: T): Promise<'OK'> {
		return super.set(key, format<T>(data));
	}

	/**
	 * Set the value and expiration of a key.
	 * @param key - The key of the value to set.
	 * @param data - The value to set.
	 * @param milliseconds - The lifetime of the key.
	 * @returns If the operation was successful.
	 */
	public async setEx<T extends RedisData>(key: string, data: T, milliseconds: number): Promise<'OK'> {
		return super.setex(key, milliseconds / 1000, format<T>(data));
	}

	/**
	 * Delete a key.
	 * @param key - The key of delete.
	 * @returns If the operation was successful.
	 */
	public async delete(key: string): Promise<number> {
		return super.del(key);
	}

	/**
	 * Delete many keys.
	 * @param keys - The keys to delete.
	 * @returns If the operation was successful.
	 */
	public async deleteMany(keys: Iterable<string>): Promise<number> {
		return super.del(Array.from(keys));
	}

	/**
	 * Set a key's time to live in milliseconds.
	 * @param key - The key to update.
	 * @param milliseconds - The amount of milliseconds to set.
	 * @returns If the operation was successful.
	 */
	public async updateExpiry(key: string, milliseconds: number): Promise<number> {
		return super.expire(key, milliseconds / 1000);
	}

	/**
	 * Get the string value of a hash field.
	 * @param hashKey - The key of the hash.
	 * @param key - The key of the value to set.
	 * @returns The value of the key.
	 */
	public async hGet<T extends RedisData>(hashKey: string, key: string): Promise<T | null> {
		const result = await super.hget(hashKey, key);
		if (result === null) return result;
		return parse<T>(result);
	}

	/**
	 * Set the string value of a hash field.
	 * @param hashKey - The key of the hash.
	 * @param key - The key of the value to set.
	 * @param data - The data to set.
	 * @returns If the operation was successful.
	 */
	public async hSet<T extends RedisData>(hashKey: string, key: string, data: T): Promise<number> {
		return super.hset(hashKey, { [key]: format<T>(data) });
	}

	/**
	 * Set the string value of many hash fields.
	 * @param hashKey - The key of the hash.
	 * @param data - A {@link Map} of the data to set.
	 * @returns If the operation was successful.
	 *
	 * @remarks Passing an empty {@link Map} will throw an error.
	 */
	public async hmSet<T extends RedisData>(hashKey: string, data: Map<string, T>): Promise<number> {
		const formattedData = new Map<string, string>();

		for (const [key, value] of data.entries()) {
			formattedData.set(key, format<T>(value));
		}

		return super.hset(hashKey, formattedData);
	}

	/**
	 * Get all the values of a hash.
	 * @param hashKey - The key of the hash.
	 * @returns A {@link Map} of the hash's values.
	 */
	public async hGetAll<T extends RedisData>(hashKey: string): Promise<Map<string, T>> {
		const result = await super.hgetall(hashKey);

		const map = new Map<string, T>();

		for (const [key, value] of Object.entries(result)) {
			const data = parse<T>(value);
			if (data) map.set(key, data);
		}

		return map;
	}

	/**
	 * Get all the values of a hash.
	 * @param hashKey - The key of the hash.
	 * @returns An {@link Array} of the hash's values.
	 */
	public async hGetValues<T extends RedisData>(hashKey: string): Promise<T[]> {
		const result = await super.hgetall(hashKey);

		const array: T[] = [];

		for (const value of Object.values(result)) {
			const data = parse<T>(value);
			if (data) array.push(data);
		}

		return array;
	}

	/**
	 * Add a key to a set.
	 * @param key - The key of the set.
	 * @param member - The member to add.
	 * @returns If the operation was successful.
	 */
	public async sAdd(key: string, member: string): Promise<boolean> {
		return (await super.sadd(key, member)) === 1;
	}

	/**
	 * Remove a key from a set.
	 * @param key - The key of the set.
	 * @param member - The member to remove.
	 * @returns If the operation was successful.
	 */
	public async sRem(key: string, member: string): Promise<boolean> {
		return (await super.srem(key, member)) === 1;
	}

	/**
	 * Check if a key is a part of a set.
	 * @param key - The key of the set.
	 * @param member - The member to check.
	 * @returns If the operation was successful.
	 */
	public async sIsMember(key: string, member: string): Promise<boolean> {
		return (await super.sismember(key, member)) === 1;
	}

	/**
	 *
	 * @param key - The key of the list.
	 * @param data - The elements to add to the list.
	 * @returns The number of elements added to the list.
	 */
	public async listPush<T extends RedisData>(key: string, ...data: T[]): Promise<number> {
		return super.rpush(key, ...data.map((item) => format<T>(item)));
	}

	/**
	 *
	 * @param key - The key of the list.
	 * @returns An {@link Array} of the lists's values.
	 */
	public async listPop<T extends RedisData>(key: string): Promise<T[]> {
		const result = await super.lrange(key, 0, -1);

		const array: T[] = [];

		for (const value of Object.values(result)) {
			const data = parse<T>(value);
			if (data) array.push(data);
		}

		return array;
	}

	/**
	 * Unlink any keys that match a pattern.
	 * @param pattern -  The pattern to match
	 */
	public deleteScanKeys(pattern: string): void {
		super
			.scanStream({
				type: 'scan',
				match: pattern
			})
			.on('data', async (keys: RedisKey[]) => {
				if (keys.length > 0) {
					await super.unlink(keys).catch(() => null);
				}
			});
	}
}
