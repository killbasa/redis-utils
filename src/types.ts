export type Primitive = boolean | number | string | null | undefined;

export type RedisData = Array<Primitive> | Exclude<Primitive, undefined> | { [key: string]: RedisData };
