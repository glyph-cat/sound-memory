import { useRef } from '@glyph-cat/swiss-army-knife'
import { MutableRefObject, useEffect } from 'react'

export function useKeyListener(
  keyCode: string,
  callback: CallableFunction,
  active = true
): MutableRefObject<HTMLElement> {
  const targetRef: MutableRefObject<HTMLElement> = useRef(null)
  useEffect(() => {
    if (active && typeof keyCode === 'string') {
      const keyCodeStack = Array.isArray(keyCode) ? keyCode : [keyCode]
      const onKeyDown = (event: KeyboardEvent) => {
        const { code } = event
        if (keyCodeStack.includes(code)) {
          callback()
        }
      }
      const node = targetRef.current ? targetRef.current : window
      node.addEventListener('keydown', onKeyDown)
      return () => { node.removeEventListener('keydown', onKeyDown) }
    }
  }, [keyCode, callback, active])
  return targetRef
}
