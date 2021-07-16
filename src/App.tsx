import { useCallback, useLayoutEffect, useState } from 'react'
import CardGrid from '~components/card-grid'
import Toolbar from '~components/toolbar'
import { useGameEngine } from '~engines/game'
import CardInfoFragment from '~fragments/card-info-fragment'
import { CardPreviewInfo } from '~schema/card-preview-info'
import styles from './App.module.css'

const initialViewingCardInfo: CardPreviewInfo = {
  cardId: null,
  row: null,
  col: null,
}

function App(): JSX.Element {
  const [viewingCardInfo, setViewingCardInfo] = useState(initialViewingCardInfo)
  const onSelectCard = useCallback((data) => {
    setViewingCardInfo(data)
  }, [])
  const onDeselectCard = useCallback(() => {
    setViewingCardInfo(initialViewingCardInfo)
  }, [])
  return (
    <>
      <AppBg />
      <div className={styles.container}>
        <CardGrid onSelect={onSelectCard} />
      </div>
      <Toolbar />
      {viewingCardInfo.cardId && (
        <CardInfoFragment
          {...viewingCardInfo}
          onDismiss={onDeselectCard}
        />
      )}
    </>
  )
}

export default App

function AppBg(): JSX.Element {
  const GameEngine = useGameEngine()
  const { bgColor } = GameEngine.config
  useLayoutEffect(() => {
    const initialBgColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = bgColor
    return () => {
      document.body.style.backgroundColor = initialBgColor
    }
  }, [bgColor])
  return null
}
