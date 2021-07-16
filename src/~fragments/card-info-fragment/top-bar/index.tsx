import { ReactNode } from 'react'
import { useGameEngine } from '~engines/game'
import styles from './index.module.css'

export interface TopBarTabProps {
  active: boolean
  label: ReactNode
  onClick: () => void
}

export function TopBarTab(props: TopBarTabProps): JSX.Element {
  const { onClick, active, label } = props
  const GameEngine = useGameEngine()
  return (
    <div
      className={styles.topBarTabButtonContainer}
      onClick={onClick}
    >
      <b
        className={styles.topBarLabel}
        style={{ color: active ? GameEngine.config.selectedColor : '' }}
      >
        {label}
      </b>
      <div className={styles.topBarTabButtonIndicatorBase}>
        <div
          className={styles.topBarTabButtonIndicatorFill}
          style={{
            backgroundColor: GameEngine.config.selectedColor,
            width: active ? '100%' : '0%',
          }}
        />
      </div>
    </div>
  )
}
