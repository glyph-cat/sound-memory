import { useLayoutEffect, useState } from 'react'

function __onResize(setState: CallableFunction) {
  setState({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  })
}

export function useWindowDimensions() {
  const [state, setState] = useState({
    height: 0,
    width: 0,
  })
  useLayoutEffect(() => { __onResize(setState) }, [])
  useLayoutEffect(() => {
    const r = () => { __onResize(setState) }
    window.addEventListener('resize', r)
    return () => {
      window.removeEventListener('resize', r)
    }
  }, [])
  return state
}
