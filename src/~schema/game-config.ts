interface GameConfigSchema {
  /**
   * Any positive value that is divisble by 2 is considered valid.
   */
  deckSize: number
  /**
   * Background color of the game UI.
   */
  bgColor: string
  /**
   * Color of items when selected.
   */
  selectedColor: string
}

export default GameConfigSchema
