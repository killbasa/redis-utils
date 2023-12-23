import { assertType, describe, expectTypeOf, test } from 'vitest';
import type { RedisData } from '#src/types';
import { format } from '#src/utils';
import { MockArrowFunction, MockClass, MockFunction } from '#mocks/generics.mock';

describe('format types', () => {
	test('params', () => {
		expectTypeOf(format).parameter(0).toEqualTypeOf<RedisData>();

		assertType(format('string'));
		assertType(format(10));
		assertType(format(true));
		assertType(format(undefined));
		assertType(format(null));
		assertType(format({}));
		assertType(format([]));

		// @ts-expect-error - Wrong param type
		assertType(format(10n));
		// @ts-expect-error - Wrong param type
		assertType(format(Symbol('value')));
		// @ts-expect-error - Wrong param type
		assertType(format(MockFunction));
		// @ts-expect-error - Wrong param type
		assertType(format(MockArrowFunction));
		// @ts-expect-error - Wrong param type
		assertType(format(MockClass));
		// @ts-expect-error - Wrong param type
		assertType(format(new MockClass()));
	});

	test('return', () => {
		expectTypeOf(format).returns.toEqualTypeOf<string>();
	});
});
