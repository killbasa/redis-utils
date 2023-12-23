import type { RedisData } from './types';

export function format<T extends RedisData>(data: T): string {
	validate(data);

	return JSON.stringify(data);
}

export function parse<T extends RedisData>(data: string | null): T | null {
	validate(data);

	if (data === null || data === 'null') return null;

	return JSON.parse(data);
}

function validate(data: unknown): void {
	if (
		data === undefined || //
		typeof data === 'symbol' ||
		typeof data === 'function' ||
		typeof data === 'bigint'
	) {
		throw new TypeError('Symbol, Function, and BigInt are not supported.');
	}
}
