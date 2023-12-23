import { describe, expect, test } from 'vitest';
import { MockObject, MockObjectClean } from '#mocks/generics.mock';

describe('mocks', () => {
	test('MockObject', () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { undef, ...rest } = MockObject;
		expect(MockObjectClean).toStrictEqual(rest);
	});
});
