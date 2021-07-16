import { useHoverCoord } from '~components/card-grid/hover-coord'
import { useGameEngine } from '~engines/game'
import { CARD_HEIGHT, CARD_WIDTH } from './constants'
import styles from './index.module.css'
import PortionClosed from './portion-closed'
import PortionSolved from './portion-solved'

export interface CardProps {
  row: number
  column: string
  cardId: string
  pairId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

function Card(props: CardProps): JSX.Element {
  const {
    row, column, cardId, pairId,
    onClick, onMouseEnter, onMouseLeave,
  } = props
  const GameEngine = useGameEngine()
  const [hoverCoord] = useHoverCoord()

  const isSolved = GameEngine.solvedStatus[pairId]
  const isRowMatch = row === hoverCoord.row
  const isColMatch = column === hoverCoord.col
  const isRowAndColMatch = isRowMatch && isColMatch

  return (
    <div
      className={styles.superContainer}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: isRowMatch || isColMatch
          ? `${GameEngine.config.selectedColor}44`
          : 'transparent',
      }}
    >
      <div
        className={styles.borderContainer}
        style={{
          backgroundColor: isRowAndColMatch
            ? GameEngine.config.selectedColor
            : 'transparent',
        }}
      >
        <div
          className={styles.container}
          style={{
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
          }}
        >
          {isSolved
            ? <PortionSolved cardId={cardId} pairId={pairId} />
            : <PortionClosed row={row} col={column} />
          }
        </div>
      </div>
    </div>
  )
}

export default Card
