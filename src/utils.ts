import type { RedisData } from './types';

export function format<T extends RedisData>(data: T): string {
	const raw = data as unknown;

	if (
		raw === undefined || //
		typeof raw === 'symbol' ||
		typeof raw === 'function' ||
		typeof raw === 'bigint'
	) {
		throw new TypeError('Symbol, Function, and BigInt are not supported.');
	}

	return JSON.stringify(raw);
}

export function parse<T extends RedisData>(data: string | null): T | null {
	const raw = data as unknown;

	if (typeof raw !== 'string' && raw !== null) {
		throw new TypeError('Data must be type of string or null.');
	}

	if (raw === null || raw === 'null') return null;

	try {
		return JSON.parse(raw);
	} catch {
		return raw as T;
	}
}
