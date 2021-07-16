import { useGameEngine } from '~engines/game'
import styles from './index.module.css'

export interface FlatButtonProps {
  label: string
  onClick: () => void
}

export function FlatButton(props: FlatButtonProps): JSX.Element {
  const { label, onClick } = props
  const GameEngine = useGameEngine()
  return (
    <div
      className={styles.button}
      onClick={onClick}
      style={{ color: GameEngine.config.selectedColor }}
    >
      {label}
    </div>
  )
}
