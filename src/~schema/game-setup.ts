interface GameSetupSchema {
  /**
   * The name of data pack that will be used.
   * Should be name of one of the folders in '~game/data'.
   */
  loadFrom: string
}

export default GameSetupSchema
