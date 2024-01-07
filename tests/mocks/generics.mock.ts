import type { RedisData } from '#src/types';

export const MockObject = {
	string: 'value',
	number: 10,
	bool: true,
	null: null,
	object: { key: 'value' },
	array: [],
	undef: undefined
};

export const MockObjectClean = {
	string: 'value',
	number: 10,
	bool: true,
	null: null,
	object: { key: 'value' },
	array: []
} satisfies RedisData;

export const MockFunction = function (): boolean {
	return true;
};

export const MockArrowFunction = (): boolean => {
	return true;
};

export const MockClass = class Test {
	public key = 'value';
};
