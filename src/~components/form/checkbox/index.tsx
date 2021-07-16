import { useCallback } from 'react'
import { MaterialIcon } from '~components/icon'
import { useGameEngine } from '~engines/game'
import styles from './index.module.css'

export interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (newChecked: boolean) => void
}

export function Checkbox(props: CheckboxProps): JSX.Element {
  const GameEngine = useGameEngine()
  const { label, checked, onChange } = props
  const handleOnClick = useCallback(() => {
    onChange(!checked)
  }, [onChange, checked])
  return (
    <>
      <style>
        {/* eslint-disable indent */ `
          .${styles.container}:hover {
            background-color: ${checked
            ? GameEngine.config.selectedColor + '44'
            : '#88888844'};
            color: #000000;
          }
          .${styles.container}:active {
            background-color: ${checked
            ? GameEngine.config.selectedColor + '88'
            : '#88888888'};
            transform: scale(0.98, 0.95);
          }
        ` /* eslint-enable indent */}
      </style>
      <div
        className={styles.container}
        onClick={handleOnClick}
      >
        <div
          className={styles.boxContainer}
          style={checked ? {
            backgroundColor: GameEngine.config.selectedColor,
            borderColor: GameEngine.config.selectedColor,
          } : {
            backgroundColor: '#FFFFFF',
          }}
        >
          <MaterialIcon
            name='done'
            fill='#FFFFFF'
            size={24}
            style={{ opacity: checked ? 1 : 0 }}
          />
        </div>
        <span className={styles.label}>{label}</span>
      </div>
    </>
  )
}
