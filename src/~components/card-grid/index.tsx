import { useCallback } from 'react'
import { useRelinkValue } from 'react-relink'
import Card from '~components/card'
import { MaterialIcon } from '~components/icon'
import { GRID_COLUMN_ALPHABETS, GRID_COLUMN_SIZE } from '~constants'
import { useGameEngine } from '~engines/game'
import getRowColFromIndex from '~engines/game/get-row-col-from-index'
import { CardPreviewInfo } from '~schema/card-preview-info'
import { HoverCoordSource } from './hover-coord'
import styles from './index.module.css'

export interface CardGridProps {
  onSelect: (data: CardPreviewInfo) => void
}

function CardGrid({ onSelect }: CardGridProps): JSX.Element {

  const GameEngine = useGameEngine()

  const factoryMouseOver = useCallback((newState) => {
    return () => {
      HoverCoordSource.set((oldState) => ({
        ...oldState,
        ...newState,
      }))
    }
  }, [])

  const resetCoords = useCallback(() => {
    HoverCoordSource.set({
      row: null,
      col: null,
      cardId: null,
    })
  }, [])

  const factoryOnSelectCard = useCallback((data: CardPreviewInfo) => {
    return () => { onSelect(data) }
  }, [onSelect])

  const renderStack = []

  // Empty block in first column of first row
  renderStack.push(<div key='efcfr' />)

  // First row - alphabet headers
  for (const colAlphabet of GRID_COLUMN_ALPHABETS) {
    renderStack.push(
      <HeaderColumn
        key={`hC-${colAlphabet}`}
        value={colAlphabet}
        onMouseEnter={factoryMouseOver({
          row: null,
          col: colAlphabet,
          cardId: null,
        })}
        onMouseLeave={resetCoords}
      />
    )
  }

  // Empty block in last column of first row
  renderStack.push(<div key='elcfr' />)

  // Followed by row header, cards, and row footer in each row
  for (let i = 0; i < GameEngine.sequence.length; i++) {
    const currentCardId = GameEngine.sequence[i]
    const { pairId } = GameEngine.dataPackContents.cards[currentCardId]
    const [row, col] = getRowColFromIndex(i)
    if (i % GRID_COLUMN_SIZE === 0) {
      renderStack.push(
        <HeaderRow
          key={`hR-${row}`}
          value={row}
          onMouseEnter={factoryMouseOver({
            row,
            col: null,
            cardId: null,
          })}
          onMouseLeave={resetCoords}
        />
      )
    }
    renderStack.push(
      <Card
        key={`card-${currentCardId}`}
        row={row}
        column={col}
        cardId={currentCardId}
        pairId={pairId}
        onClick={factoryOnSelectCard({ row, col, cardId: currentCardId })}
        onMouseEnter={factoryMouseOver({ row, col, cardId: currentCardId })}
        onMouseLeave={resetCoords}
      />
    )
    if (i % GRID_COLUMN_SIZE === (GRID_COLUMN_SIZE - 1)) {
      renderStack.push(
        <FooterRow
          key={`fR-${row}`}
          value={row}
        />
      )
    }
  }

  // Empty block in first column of last row
  renderStack.push(<div key='efclr' />)

  // Last row - alphabet footers
  for (const colAlphabet of GRID_COLUMN_ALPHABETS) {
    renderStack.push(
      <FooterColumn
        key={`fC-${colAlphabet}`}
        value={colAlphabet}
      />
    )
  }

  return (
    <div
      className={styles.container}
      style={{
        // +2 to include columns for row header and footer
        gridTemplateColumns: `repeat(${GRID_COLUMN_SIZE + 2}, auto)`,
      }}
    >
      {renderStack}
    </div>
  )
}

export default CardGrid

function HeaderColumn({ value, onMouseEnter, onMouseLeave }) {
  const GameEngine = useGameEngine()
  const hoverCoord = useRelinkValue(HoverCoordSource)
  const isActive = value === hoverCoord.col
  return (
    <div
      className={styles.headerCell}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        alignItems: 'center',
        backgroundColor: isActive
          ? `${GameEngine.config.selectedColor}44`
          : 'transparent',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingTop: 10,
      }}
    >
      <span style={{ opacity: 0.5 }}>{value}</span>
      <MaterialIcon
        name='expand_more'
        fill='#000000'
        style={{ opacity: isActive ? 1 : 0 }}
      />
    </div>
  )
}

function FooterColumn({ value }) {
  const hoverCoord = useRelinkValue(HoverCoordSource)
  const GameEngine = useGameEngine()
  const isActive = value === hoverCoord.col
  return (
    <div
      style={{
        backgroundColor: isActive
          ? `${GameEngine.config.selectedColor}44`
          : 'transparent',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 20,
      }}
    />
  )
}

function HeaderRow({ value, onMouseEnter, onMouseLeave }) {
  const hoverCoord = useRelinkValue(HoverCoordSource)
  const GameEngine = useGameEngine()
  const isActive = value === hoverCoord.row
  return (
    <div
      className={styles.headerCell}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: isActive
          ? `${GameEngine.config.selectedColor}44`
          : 'transparent',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        gridTemplateColumns: 'repeat(2, auto)',
        paddingInlineStart: 10,
        justifyContent: 'center',
      }}
    >
      <span style={{ opacity: 0.5 }}>{value}</span>
      <MaterialIcon
        name='chevron_right'
        fill='#000000'
        style={{ opacity: isActive ? 1 : 0 }}
      />
    </div>
  )
}

function FooterRow({ value }) {
  const hoverCoord = useRelinkValue(HoverCoordSource)
  const GameEngine = useGameEngine()
  const isActive = value === hoverCoord.row
  return (
    <div
      style={{
        backgroundColor: isActive
          ? `${GameEngine.config.selectedColor}44`
          : 'transparent',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 20,
      }}
    />
  )
}
