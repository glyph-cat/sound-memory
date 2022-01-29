import { useForceUpdate } from '@glyph-cat/swiss-army-knife'
import { useEffect } from 'react'
import Scrim from '~components/scrim'
import LoadingAnimation from '~components/loading-animation'
import styles from './index.module.css'

const hookers: Record<string, boolean> = {}
let GLOBAL_triggerUpdate = null

function triggerComponentUpdate(queueDepth = 0) {
  if (queueDepth <= 10) {
    if (typeof GLOBAL_triggerUpdate === 'function') {
      GLOBAL_triggerUpdate()
    } else {
      // Set queue to refresh later
      setTimeout(() => { triggerComponentUpdate(queueDepth + 1) }, 1000)
    }
  } else {
    console.warn(
      '[LoadingCover] Maximum queue depth reached. This is a no-op, but may ' +
      'the presence of race conditions in functions that rely on this ' +
      'component to convey loading status to users.'
    )
  }
}

export const getHookerList = (): Array<string> => Object.keys(hookers)

function showLoadingCover(id: string): void {
  if (typeof id !== 'string') {
    throw new TypeError(`Expected 'id' to be a string but got ${typeof id}`)
  }
  hookers[id] = true
  triggerComponentUpdate()
}

function hideLoadingCover(id: string): void {
  if (typeof id !== 'string') {
    throw new TypeError(`Expected 'id' to be a string but got ${typeof id}`)
  }
  delete hookers[id]
  triggerComponentUpdate()
}

function TrueComponent(): JSX.Element {
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    GLOBAL_triggerUpdate = forceUpdate
    return () => { GLOBAL_triggerUpdate = null }
  }, [forceUpdate])
  const hookerList = getHookerList()
  // console.log(hookerList)
  const isVisible = hookerList.length > 0
  return (
    <Scrim
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'initial' : 'none',
        transition: 'opacity 0.2s'
      }}
    >
      <div
        className={styles.subcontainer}
        style={{
          transform: `scale(${isVisible ? 1 : 0.9})`
        }}
      >
        <LoadingAnimation />
        <span className={styles.label}>
          {'Please wait...'}
        </span>
      </div>
    </Scrim>
  )
}

function PseudoComponent({ id }: { id: string }): JSX.Element {
  useEffect(() => {
    showLoadingCover(id)
    return () => {
      hideLoadingCover(id)
    }
  }, [id])
  return null
}

const LoadingCover = {
  hide: hideLoadingCover,
  show: showLoadingCover,
  PseudoComponent,
  Component: TrueComponent,
}

export default LoadingCover
