import { Property } from 'csstype' // eslint-disable-line import/no-unresolved
import { CSSProperties } from 'react'

export const DEFAULT_ICON_FILL = '#888888'
export const DEFAULT_ICON_SIZE = 24

export interface BaseIconProps {
  name: string
  fill?: Property.Color
  size?: number
  className?: string
  style?: CSSProperties
}
