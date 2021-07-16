import { MutableRefObject, useRef } from 'react'

export function useLazyRef<E>(
  valueOrFactory: E | (() => E)
): MutableRefObject<E> {
  const isFirstRun = useRef(true)
  const mutableRefObj = useRef(
    isFirstRun.current
      ? typeof valueOrFactory === 'function'
        ? (valueOrFactory as (() => E))()
        : valueOrFactory
      : null
  )
  if (isFirstRun.current) {
    isFirstRun.current = false
  }
  return mutableRefObj
}
