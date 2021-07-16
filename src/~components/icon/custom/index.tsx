import { BaseIconProps, DEFAULT_ICON_FILL, DEFAULT_ICON_SIZE } from '../bases'

export interface CustomIconProps extends BaseIconProps { }

export function CustomIcon(props: CustomIconProps): JSX.Element {
  const {
    name,
    fill = DEFAULT_ICON_FILL,
    size = DEFAULT_ICON_SIZE,
    className = '',
    style,
  } = props
  if (!name) {
    throw new TypeError(`Expected name to be a string but got ${typeof name}`)
  }
  const { default: RenderContent } = require(`./lib/${name}`)
  return (
    <svg
      viewBox='0 0 100 100'
      height={size}
      width={size}
      style={style}
    >
      <g className={className} fill={fill}>
        {RenderContent}
      </g>
    </svg>
  )
}
