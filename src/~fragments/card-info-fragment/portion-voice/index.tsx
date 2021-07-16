import AudioPlayer from '~components/audio-player'
import { Checkbox } from '~components/form'
import SpriteDisplay from '~components/sprite-display'
import { GEmarkAsSolved, useGameEngine } from '~engines/game'
import styles from './index.module.css'

function factoryGEmarkAsSolved(
  pairId: string,
  status: boolean
): () => void {
  return () => {
    GEmarkAsSolved(pairId, status)
  }
}

export interface PortionVoiceProps {
  pairId: string
  cardId: string
}

function PortionVoice(props: PortionVoiceProps): JSX.Element {
  const { cardId, pairId } = props

  const GameEngine = useGameEngine()
  const isSolved = GameEngine.solvedStatus[pairId]

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <SpriteDisplay
          src={GameEngine.dataPackContents.cards[cardId].assets.img}
          size={200}
          locked={!isSolved}
          style={{ marginBottom: 15 }}
        />

        <AudioPlayer
          src={GameEngine.dataPackContents.cards[cardId].assets.sound}
        />

        <Checkbox
          label='Mark as solved'
          onChange={factoryGEmarkAsSolved(pairId, !isSolved)}
          checked={isSolved}
        />
      </div>
    </div>
  )
}

export default PortionVoice
