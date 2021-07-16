import { CSSProperties, MouseEventHandler, ReactElement, useCallback } from 'react'
import { useKeyListener } from '~hooks/key-listener'
import styles from './index.module.css'

export interface ScrimProps {
  /**
   * The popup content that you would like to show.
   */
  children: ReactElement | Array<ReactElement>
  /**
   * Should users be able to dismiss the scrim just by clicking on it?
   */
  dismissOnClick?: boolean
  /**
   * Should users be able to dismiss the scrim by pressing 'Esc'?
   */
  dismissOnEsc?: boolean
  /**
   * This should be a setter function from the parent component to unmount
   * the scrim.
   */
  onDismiss?: CallableFunction
  /**
   * Disable fade-in animation
   */
  noAnimation?: boolean
  /**
   * Override the container's styles
   */
  style?: CSSProperties
}

const DEFAULT_ON_DISMISS: CallableFunction = () => { }
/**
 * A translucent layer that appears beneath popups.
 * This is so that we can direct users' attention towards the popup.
 * @see https://material.io/design/environment/surfaces.html#attributes
 */
function Scrim(props: ScrimProps): JSX.Element {
  const {
    children,
    dismissOnClick,
    dismissOnEsc,
    onDismiss = DEFAULT_ON_DISMISS,
    noAnimation,
    style,
  } = props
  // Hooks must always be called at the top levels
  // Cannot use if-else to fire useKeyListener since it is a hook
  // So the parameter value becomes conditional instead
  // https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  useKeyListener(dismissOnEsc ? 'Escape' : null, onDismiss)
  const handleOnClick: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    if (dismissOnClick) { onDismiss() }
  }, [dismissOnClick, onDismiss])
  return (
    <div
      className={styles.container}
      style={noAnimation
        ? { animationDuration: '0s', ...style }
        : { ...style }
      }
    >
      <div
        className={styles.layer}
        onClick={handleOnClick}
      />
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  )
}

export default Scrim
