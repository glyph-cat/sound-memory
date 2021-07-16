import { useReducer } from 'react'

export const forceUpdateReducer = (c: number): number => c + 1

export function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0)
  return forceUpdate
}
