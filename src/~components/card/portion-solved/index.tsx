import { useGameEngine } from '~engines/game'
import { CARD_WIDTH } from '../constants'
import styles from './index.module.css'

const FIGURE_SIZE = Math.round(CARD_WIDTH * 0.8)
const SPRITE_SIZE = Math.round(CARD_WIDTH * 0.5)

export interface PortionSolvedProps {
  cardId: string
  pairId: string
}

function PortionSolved(props: PortionSolvedProps): JSX.Element {
  const { cardId, pairId } = props
  const GameEngine = useGameEngine()

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <img
          className={styles.figure}
          src={GameEngine.dataPackContents.figures[pairId].assets.img}
          alt='' // Left empty on purpose
          height={FIGURE_SIZE}
          width={FIGURE_SIZE}
          style={{ borderRadius: FIGURE_SIZE }}
        />
        <img
          className={styles.sprite}
          src={GameEngine.dataPackContents.cards[cardId].assets.img}
          alt='' // Left empty on purpose
          height={SPRITE_SIZE}
          width={SPRITE_SIZE}
          style={{ borderRadius: SPRITE_SIZE }}
        />
      </div>
    </div>
  )
}

export default PortionSolved
