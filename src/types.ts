export type Primitive = boolean | number | string | null | undefined;

export type RedisData = Array<Primitive> | Primitive | { [key: string]: RedisData };
