import { assertType, describe, expectTypeOf, test } from 'vitest';
import type { RedisData } from '#src/types';
import { parse } from '#src/utils';
import { MockArrowFunction, MockClass, MockFunction } from '#mocks/generics.mock';

describe('format types', () => {
	test('params', () => {
		expectTypeOf(parse).parameter(0).toEqualTypeOf<string | null>();

		assertType(parse('string'));
		assertType(parse(null));

		// @ts-expect-error - Wrong param type
		assertType(parse(10));
		// @ts-expect-error - Wrong param type
		assertType(parse(10n));
		// @ts-expect-error - Wrong param type
		assertType(parse(true));
		// @ts-expect-error - Wrong param type
		assertType(parse(undefined));
		// @ts-expect-error - Wrong param type
		assertType(parse(Symbol('value')));
		// @ts-expect-error - Wrong param type
		assertType(parse({}));
		// @ts-expect-error - Wrong param type
		assertType(parse([]));
		// @ts-expect-error - Wrong param type
		assertType(parse(MockFunction));
		// @ts-expect-error - Wrong param type
		assertType(parse(MockArrowFunction));
		// @ts-expect-error - Wrong param type
		assertType(parse(MockClass));
		// @ts-expect-error - Wrong param type
		assertType(parse(new MockClass()));
	});

	test('return', () => {
		expectTypeOf(parse).returns.toEqualTypeOf<RedisData>();
	});
});
