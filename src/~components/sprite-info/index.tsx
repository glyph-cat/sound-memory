import { useGameEngine } from '~engines/game'
import { SingularCardDataSchemaWithPairID } from '~schema/card-data'
import styles from './index.module.css'

export interface SpriteInfoProps {
  src: string
  data: SingularCardDataSchemaWithPairID
  active: boolean
}

function SpriteInfo(props: SpriteInfoProps): JSX.Element {
  const GameEngine = useGameEngine()
  const { src, data, active } = props
  const { primary: namePrimary, secondary: nameSecondary } = data.character.name
  const { primary: titlePrimary, secondary: titleSecondary } = data.title.name
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: active
          ? `${GameEngine.config.selectedColor}33`
          : '',
      }}
    >
      <div className={styles.leftContainer}>
        <img
          className={styles.img}
          src={src}
          alt={`${namePrimary}\n${nameSecondary}`}
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightSubcontainer}>
          <div className={styles.nameContainer}>
            <span className={styles.namePrimary}>
              {namePrimary}
            </span>
            {' '}
            <span className={styles.nameSecondary}>
              {nameSecondary}
            </span>
          </div>
          <div className={styles.titleContainer}>
            <span className={styles.titlePrimary}>
              {titlePrimary}
            </span>
            {' '}
            <span className={styles.titleSecondary}>
              {titleSecondary}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpriteInfo
