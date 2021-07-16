import SpriteInfo from '~components/sprite-info'
import { useGameEngine } from '~engines/game'
import styles from './index.module.css'

export interface PortionInfoProps {
  cardId: string
  pairId: string
}

function PortionInfo(props: PortionInfoProps): JSX.Element {
  const { cardId, pairId } = props
  const { dataPackContents } = useGameEngine()
  const {
    primary: figureNamePrimary,
    secondary: figureNameSecondary,
  } = dataPackContents.figures[pairId].name
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftSubcontainer}>
          <img
            className={styles.figure}
            src={dataPackContents.figures[pairId].assets.img}
            alt={`${figureNamePrimary}\n${figureNameSecondary}`}
          />
          <span className={styles.figureLabelPrimary}>
            {figureNamePrimary}
          </span>
          <span className={styles.figureLabelSecondary}>
            {figureNameSecondary}
          </span>
        </div>
      </div>
      <div className={styles.vSeparator} />
      <div className={styles.rightContainer}>
        <SpriteInfo
          src={dataPackContents.cards[`${pairId}/a`].assets.img}
          data={dataPackContents.cards[`${pairId}/a`]}
          active={cardId === `${pairId}/a`}
        />
        <SpriteInfo
          src={dataPackContents.cards[`${pairId}/b`].assets.img}
          data={dataPackContents.cards[`${pairId}/b`]}
          active={cardId === `${pairId}/b`}
        />
      </div>
    </div>
  )
}

export default PortionInfo
