export interface AudioEngine {
  // ...
}

export function createAudioEngine(): AudioEngine {
  return {
    // ...
  }
}

// NOTE: When game loads it will shuffle all game data
// Then the shuffled indices or IDs will be saved as game state in local host
// along with how many cards have been solved
