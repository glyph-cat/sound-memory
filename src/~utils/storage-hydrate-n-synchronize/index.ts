import { STORAGE_KEY_PREFIX } from '~constants'

const STR_TRUE = 'true'

export function getRememberMe(): boolean {
  return localStorage.getItem(`${STORAGE_KEY_PREFIX}-rememberMe`) === STR_TRUE
}

export function setRememberMe(state: boolean): void {
  const key = `${STORAGE_KEY_PREFIX}-rememberMe`
  if (state === true) {
    localStorage.setItem(key, STR_TRUE)
  } else {
    localStorage.removeItem(key)
  }
}

export const DynamicStorage = {
  getItem: (key: string): string => {
    return getRememberMe()
      ? localStorage.getItem(key)
      : sessionStorage.getItem(key)
  },
  removeItem: (key: string): void => {
    getRememberMe()
      ? localStorage.removeItem(key)
      : sessionStorage.removeItem(key)
  },
  setItem: (key: string, value: string): void => {
    getRememberMe()
      ? localStorage.setItem(key, value)
      : sessionStorage.setItem(key, value)
  },
}

export function hydrateFromStorage(
  storageKey: string,
  defaultState: unknown,
  mapper?: (data: unknown) => Record<string, unknown>
): unknown {
  let state = defaultState
  const fromStorage = DynamicStorage.getItem(storageKey)
  if (fromStorage) {
    try {
      const rawData = JSON.parse(fromStorage)
      state = typeof mapper === 'function' ? mapper(rawData) : rawData
    } catch (e) {
      DynamicStorage.removeItem(storageKey)
    }
  }
  return state
}

export function synchronizeStorage(
  storageKey: string,
  state: unknown,
  mapper?: (data: unknown) => Record<string, unknown>
): void {
  DynamicStorage.setItem(
    storageKey,
    JSON.stringify(typeof mapper === 'function' ? mapper(state) : state)
  )
}

export function removeFromStorage(storageKey: string): void {
  DynamicStorage.removeItem(storageKey)
}
