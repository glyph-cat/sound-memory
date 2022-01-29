import { useForceUpdate } from '@glyph-cat/swiss-army-knife'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

function LiveTime(): JSX.Element {
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    const intervalRef = setInterval(() => { forceUpdate() }, 15000)
    return () => { clearInterval(intervalRef) }
  }, [forceUpdate])
  const currentTime = DateTime.now()
  return (
    <>
      {currentTime.toLocaleString(DateTime.TIME_SIMPLE)}
    </>
  )
}

export default LiveTime
