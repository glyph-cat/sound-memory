import { useLayoutEffect } from '@glyph-cat/swiss-army-knife'
import ClipboardJs from 'clipboard'
import { HTMLProps, useCallback, useState } from 'react'
import { useRelinkValue } from 'react-relink'
import { HoverCoordSource } from '~components/card-grid/hover-coord'
import { MaterialIcon } from '~components/icon'
import LiveTime from '~components/live-time'
import { GEreset, useGameEngine } from '~engines/game'
import getCardPairAnswers from '~engines/game/get-card-pair-answers'
import styles from './index.module.css'

const ELLIPSIS = '...'
const COPY_BUTTON_ID = 'copy-button'
const TOOLBAR_HEIGHT = 54 // px

function Toolbar(): JSX.Element {
  const hoverCoord = useRelinkValue(HoverCoordSource)
  const GameEngine = useGameEngine()
  const [showCopySuccessState, setCopySuccessState] = useState(0)
  // 0: Idle, 1: Success, 2: Error
  useLayoutEffect(() => {
    const cb = new ClipboardJs(`#${COPY_BUTTON_ID}`)
    let timeoutRef: number
    cb.on('success', () => {
      setCopySuccessState(1)
      timeoutRef = window.setTimeout(() => { setCopySuccessState(0) }, 3000)
    })
    cb.on('error', () => {
      setCopySuccessState(2)
      timeoutRef = window.setTimeout(() => { setCopySuccessState(0) }, 3000)
    })
    return () => {
      cb.destroy()
      clearTimeout(timeoutRef)
    }
  }, [])
  return (
    <div className={styles.container}>
      <div
        className={styles.subcontainer}
        style={{ minHeight: TOOLBAR_HEIGHT }}
      >
        <span className={styles.liveTime}>
          <LiveTime />
        </span>
        <span className={styles.hoverCoord}>
          {!!(hoverCoord.col || hoverCoord.row) && (
            `${hoverCoord.col || ELLIPSIS}${hoverCoord.row || ELLIPSIS}`
          )}
        </span>
        <div className={styles.buttonGroup}>
          <div className={styles.buttonGroupSubcontainer}>
            <ToolbarButton
              icon='file_copy'
              label={showCopySuccessState === 0
                ? 'Copy answers to clipboard'
                : showCopySuccessState === 1
                  ? '✓ Copied to clipboard!'
                  : '[Error] Unable to to copy answers'
              }
              imperativeProps={{
                id: COPY_BUTTON_ID,
                'data-clipboard-text': getCardPairAnswers(GameEngine.sequence),
              }}
            />
            <ToolbarButton
              icon='restart_alt'
              onClick={GEreset}
              label='Reset game progress'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar

export interface ToolbarButtonProps {
  icon: string
  label: string
  onClick?: () => void
  imperativeProps?: HTMLProps<HTMLDivElement> | Record<string, unknown>
}

function ToolbarButton(props: ToolbarButtonProps) {
  const { icon, onClick, label, imperativeProps = {} } = props
  const { className, ...remainingImperativeProps } = imperativeProps
  const [isTooltipVisible, setTooltipVisibility] = useState(false)
  const factoryToggleTooltip = useCallback((visibility: boolean) => {
    return () => { setTooltipVisibility(visibility) }
  }, [])
  return (
    <>
      <div
        className={[styles.button, className].join(' ')}
        onClick={onClick}
        {...remainingImperativeProps}
        onMouseEnter={factoryToggleTooltip(true)}
        onMouseLeave={factoryToggleTooltip(false)}
      >
        <MaterialIcon
          name={icon}
          fill='#FFFFFF'
        />
      </div>
      <div
        className={styles.tooltip}
        style={{
          opacity: isTooltipVisible ? 1 : 0,
          top: TOOLBAR_HEIGHT + 20,
          right: 10,
        }}
      >
        {label}
      </div>
    </>
  )
}
