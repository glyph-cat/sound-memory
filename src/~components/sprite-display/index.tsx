import { CSSProperties } from 'react'
import { MaterialIcon } from '~components/icon'
import { useGameEngine } from '~engines/game'
import styles from './index.module.css'

export interface SpriteDisplayProps {
  size: number
  src: string
  locked: boolean
  style?: CSSProperties
}

function SpriteDisplay(props: SpriteDisplayProps): JSX.Element {
  const { src, size, locked, style } = props
  const GameEngine = useGameEngine()
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: locked ? '#CCCCCC' : GameEngine.config.bgColor,
        height: size,
        width: size,
        ...style,
      }}
    >
      <div className={styles.iconContainer}>
        <MaterialIcon
          name='help'
          size={Math.round(size * 0.65)}
          fill='#00000044'
          style={locked ? {} : { opacity: 0 }}
        />
      </div>
      {!locked && (
        <img
          src={src}
          height={size}
          width={size}
          alt='Sprite'
        // Name of sprite is not included in 'alt' to reduce chances of
        // exploitation that causes name to be revealed before card is solved
        />
      )}
    </div>
  )
}

export default SpriteDisplay
