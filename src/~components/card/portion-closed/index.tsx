import { useGameEngine } from '~engines/game'
import { CARD_HEIGHT, CARD_WIDTH } from '../constants'
import styles from './index.module.css'

export interface PortionClosedProps {
  row: number
  col: string
}

function PortionClosed(props: PortionClosedProps): JSX.Element {
  const { row, col } = props
  const GameEngine = useGameEngine()
  return (
    <img
      className={styles.img}
      src={GameEngine.deckImg}
      alt={`Card ${row}${col}`}
      height={CARD_HEIGHT}
      width={CARD_WIDTH}
    />
  )
}

export default PortionClosed
