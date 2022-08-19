// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnaryFunction = (arg: any) => any
type LastFunction<T extends UnaryFunction[]> = T extends [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...rest: infer REST,
  last: infer LAST,
]
  ? LAST
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
type LastFunctionParameters<T extends UnaryFunction[]> = Parameters<
  LastFunction<T>
>[number]
type FirstFunctionReturnType<T extends UnaryFunction[]> = ReturnType<T[0]>

const compose =
  <T extends UnaryFunction[]>(...fns: T) =>
  (arg: LastFunctionParameters<T>): FirstFunctionReturnType<T> =>
    fns.reduceRight((acc: unknown, fn: T[number]) => fn(acc), arg)

export default compose
