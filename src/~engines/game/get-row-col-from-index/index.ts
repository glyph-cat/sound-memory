import { GRID_COLUMN_ALPHABETS, GRID_COLUMN_SIZE } from '~constants'

function getRowColFromIndex(index: number): [number, string] {
  //  ┌───────────────> Columm
  //  │   A B C D E F
  //  │ 1
  //  │ 2
  //  │ 3
  //  ▼
  // Row
  const row = Math.floor(index / GRID_COLUMN_SIZE) + 1
  const col = GRID_COLUMN_ALPHABETS[index % GRID_COLUMN_SIZE]
  return [row, col]
}

export default getRowColFromIndex
