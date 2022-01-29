import { displayStringArray } from '@glyph-cat/swiss-army-knife'
import { BaseIconProps, DEFAULT_ICON_FILL, DEFAULT_ICON_SIZE } from '../bases'

// TODO: May be just use the <MaterialIcon/> component from '@glyph-cat/swiss-army-knife'

// Google Material Icon Fonts
// * https://www.material.io/tools/icons
// * https://google.github.io/material-design-icons

const VALID_MATERIAL_ICON_VARIANT = [
  'default',
  'round',
  'outlined',
  'two-tone',
  'sharp',
] as const

export type MaterialIconVariant = typeof VALID_MATERIAL_ICON_VARIANT[number]

const DEFAULT_MATERIAL_ICON_VARIANT: MaterialIconVariant = 'round'

export interface MaterialIconProps extends BaseIconProps {
  variant?: MaterialIconVariant
}

const importCache: Map<MaterialIconVariant, boolean> = new Map()

export function getVariantClassName(variant: MaterialIconVariant): string {
  let className = 'material-icons'
  if (!VALID_MATERIAL_ICON_VARIANT.includes(variant)) {
    throw new TypeError(
      'Expected \'variant\' to be one of ' +
      displayStringArray([...VALID_MATERIAL_ICON_VARIANT]) +
      ` but got ${variant}`
    )
  } else if (variant !== 'default') {
    className = `${className}-${variant}`
  }
  if (!importCache.has(variant)) {
    import(`./stylesheets/${variant}.css`)
    importCache.set(variant, true)
  }
  return className
}

export function MaterialIcon(props: MaterialIconProps): JSX.Element {
  const {
    name,
    fill = DEFAULT_ICON_FILL,
    size = DEFAULT_ICON_SIZE,
    variant = DEFAULT_MATERIAL_ICON_VARIANT,
    className = '',
    style,
  } = props
  return (
    <i
      className={[getVariantClassName(variant), className].join(' ')}
      style={{
        fontSize: size,
        color: fill,
        ...style,
      }}
    >
      {name}
    </i>
  )
}
