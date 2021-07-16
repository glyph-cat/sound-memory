import { useLayoutEffect } from 'react'
import { useForceUpdate } from '~hooks/force-update'
import { useRef } from '~hooks/lazy-ref'

const IS_MEDIA_QUERY_SUPPORTED = typeof window.matchMedia !== 'undefined'

export function useMediaQuery(query: string): boolean {
  const forceUpdate = useForceUpdate()
  const mq = useRef(() => {
    return IS_MEDIA_QUERY_SUPPORTED
      ? window.matchMedia(query)
      : null
  })
  useLayoutEffect(() => {
    // The ref value `mq.current will likely have changed by the time this
    // effect's cleanup function runs. So a copy by value is made inside this
    // effect.
    const { current: _mq } = mq
    if (IS_MEDIA_QUERY_SUPPORTED) {
      if (typeof _mq.addEventListener === 'function') {
        // New API
        _mq.addEventListener('change', forceUpdate)
        return () => { _mq.removeEventListener('change', forceUpdate) }
      } else if (typeof _mq.addListener === 'function') {
        // Deprecated API
        _mq.addListener(forceUpdate)
        return () => { _mq.removeListener(forceUpdate) }
      }
    }
  }, [forceUpdate])
  return IS_MEDIA_QUERY_SUPPORTED
    ? mq.current.matches || false
    : false
}

export function useColorScheme(): 'dark' | 'light' {
  const mq = useMediaQuery('(prefers-color-scheme: dark)')
  return mq ? 'dark' : 'light'
}
