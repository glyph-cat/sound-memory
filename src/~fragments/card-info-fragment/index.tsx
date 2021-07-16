import { useCallback, useState } from 'react'
import { FlatButton, FormSheet } from '~components/form'
import { MaterialIcon } from '~components/icon'
import Scrim from '~components/scrim'
import { useGameEngine } from '~engines/game'
import { CardPreviewInfo } from '~schema/card-preview-info'
import styles from './index.module.css'
import PortionInfo from './portion-info'
import PortionLocked from './portion-locked'
import PortionVoice from './portion-voice'
import { TopBarTab } from './top-bar'

// type RenderPortionProps = PortionVoiceProps

export interface CardInfoFragmentProps extends CardPreviewInfo {
  onDismiss: () => void
}

function CardInfoFragment(props: CardInfoFragmentProps): JSX.Element {
  const { row, col, cardId, onDismiss } = props

  const GameEngine = useGameEngine()
  const { pairId } = GameEngine.dataPackContents.cards[cardId]
  const isCardSolved = GameEngine.solvedStatus[pairId]

  // If already solved, will open info portion by default
  const [tabIndex, setTabIndex] = useState(isCardSolved ? 1 : 0)
  const factorySetTabIndex = useCallback((t) => {
    return () => setTabIndex(t)
  }, [])

  const RenderPortion = tabIndex === 0
    ? PortionVoice
    : isCardSolved ? PortionInfo : PortionLocked

  return (
    <Scrim dismissOnEsc dismissOnClick onDismiss={onDismiss}>
      <FormSheet style={{ gap: 10 }}>
        <div className={styles.topBarContainer}>
          <span className={styles.cardCoordLabel}>
            {`Card ${col}${row}`}
          </span>
          <TopBarTab
            label='Voice'
            active={tabIndex === 0}
            onClick={factorySetTabIndex(0)}
          />
          <TopBarTab
            label={(
              <>
                {'Info '}
                <MaterialIcon
                  name={isCardSolved ? 'lock_open' : 'lock'}
                  fill='inherit'
                  size={16}
                />
              </>
            )}
            active={tabIndex === 1}
            onClick={factorySetTabIndex(1)}
          />
        </div>
        <div className={styles.renderContainer}>
          <RenderPortion {...{ cardId, pairId }} />
        </div>
        <div className={styles.bottomBarContainer}>
          <FlatButton
            label={'Close'}
            onClick={onDismiss}
          />
        </div>
      </FormSheet>
    </Scrim>
  )
}

export default CardInfoFragment
