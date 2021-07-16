import { useCallback, useState } from 'react'

export interface CustomSetStateAction<S> {
  (newState: S): void
  (newStateFactory: (oldState: S) => S): void
}

export function useClassState<S>(
  initialState: S | (() => S)
): [S, CustomSetStateAction<S>] {
  const [state, setStateBase] = useState(initialState)
  const setState = useCallback((partialState) => {
    setStateBase((oldState) => {
      const newState =
        typeof partialState === 'function'
          ? partialState(oldState)
          : partialState
      return {
        ...oldState,
        ...newState,
      }
    })
  }, [])
  return [state, setState]
}
