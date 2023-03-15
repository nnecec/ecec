import { useCallback, useEffect, useRef } from 'react'

type noop = (...args: any[]) => any

export const useMemoizedFn = <T extends noop>(fn: T) => {
  if (typeof fn !== 'function') {
    // eslint-disable-next-line no-console
    console.error(
      `useMemoizedFn expected parameter is a function, got ${typeof fn}`,
    )
  }

  const fnRef = useRef<T>(fn)
  useEffect(() => {
    fnRef.current = fn
  })

  const memoizedFn = useCallback((...args: any[]) => {
    const fn = fnRef.current
    return fn(...args)
  }, [])

  return memoizedFn as T
}
