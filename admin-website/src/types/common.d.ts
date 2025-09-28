export type OneOf<A extends unknown[]> = A extends Array<infer O> ? O : never;
