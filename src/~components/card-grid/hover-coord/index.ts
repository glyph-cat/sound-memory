import {
  createSource,
  RelinkSetter,
  RelinkSource,
  useRelinkState,
} from 'react-relink'

export interface HoverCoordSourceSchema {
  row: number,
  col: string,
  cardId: string,
}

export const HoverCoordSource: RelinkSource<
  HoverCoordSourceSchema
> = createSource({
  key: 'hover-coord-source',
  default: {
    row: null,
    col: null,
    cardId: null,
  },
  options: {
    mutable: true,
  },
})

export function useHoverCoord():
  [HoverCoordSourceSchema, RelinkSetter<HoverCoordSourceSchema>] {
  return useRelinkState(HoverCoordSource)
}
