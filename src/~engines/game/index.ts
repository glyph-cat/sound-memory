import { shuffle } from '@glyph-cat/swiss-army-knife'
import { createSource, RelinkSource, useRelinkValue } from 'react-relink'
import { STORAGE_KEY_PREFIX } from '~constants'
import GameSetup from '~game/setup'
import GameConfigSchema from '~schema/game-config'
import { selectObj } from '~utils/select'
import {
  DynamicStorage,
  getRememberMe,
  hydrateFromStorage,
  removeFromStorage,
  setRememberMe,
  synchronizeStorage,
} from '~utils/storage-hydrate-n-synchronize'
import getDataPackContents, {
  DataPackContentsSchema,
} from './get-data-pack-contents'

const GE_STORAGE_KEY = `${STORAGE_KEY_PREFIX}/game-engine`

export interface GameEngineSourceSchema {
  dataPackName: string
  dataPackContents: DataPackContentsSchema
  config: GameConfigSchema
  deckImg: string
  currentlySelectedCardId: string
  sequence: Array<string>
  solvedStatus: Record<string, boolean> // By pairId
}

export function createGameEngineSource(): RelinkSource<GameEngineSourceSchema> {
  const dataPackName: string = GameSetup.loadFrom
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config: GameConfigSchema = require(
    `~game/data-packs/${dataPackName}/config`
  ).default
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const deckImg = require(
    `~game/data-packs/${dataPackName}/card-image/image.png`
  )
  const dataPackContents = getDataPackContents(dataPackName, config)
  const shuffledSequence = shuffle(Object.keys(dataPackContents.cards))
  const solvedStatus: Record<string, boolean> = {}
  const initialState: GameEngineSourceSchema = {
    dataPackName,
    dataPackContents,
    config,
    deckImg,
    currentlySelectedCardId: null,
    sequence: shuffledSequence,
    solvedStatus,
  }
  return createSource({
    key: 'game-engine/(data-pack-name)',
    default: initialState,
    lifecycle: {
      init: ({ commit }) => {
        const receivedData = hydrateFromStorage(GE_STORAGE_KEY, initialState)
        commit({
          ...initialState,
          ...receivedData as GameEngineSourceSchema,
        })
      },
      didSet: ({ state }) => {
        if (!getRememberMe()) {
          setRememberMe(true)
        }
        const dataToPersist = selectObj(
          state as unknown as Record<string, unknown>,
          ['sequence', 'solvedStatus']
        )
        synchronizeStorage(GE_STORAGE_KEY, dataToPersist)
      },
      didReset: () => {
        removeFromStorage(GE_STORAGE_KEY)
      },
    },
  })
}

const GameEngineSource = createGameEngineSource()

export function useGameEngine(): GameEngineSourceSchema {
  const GEState = useRelinkValue(GameEngineSource)
  return GEState
}

const PROMPT_TIME_PADDING = 50 // ms

export function GEmarkAsSolved(pairId: string, status: boolean): void {
  setTimeout(() => {
    let shouldContinue = true
    if (status) {
      shouldContinue = window.confirm('Mark this pair as resolved?')
    }
    if (shouldContinue) {
      GameEngineSource.set((existingState) => {
        return {
          ...existingState,
          solvedStatus: {
            ...existingState.solvedStatus,
            [pairId]: status,
          }
        }
      })
    }
  }, PROMPT_TIME_PADDING)
}

export function GEreset(): void {
  setTimeout(() => {
    const shouldContinue = window.confirm(
      'Reset everything?\nGame progress will be lost.'
    )
    if (shouldContinue) {
      GameEngineSource.reset()
      const { dataPackContents } = GameEngineSource.get()
      const shuffledSequence = shuffle(Object.keys(dataPackContents.cards))
      // NOTE: This will cause data to be persisted again.
      GameEngineSource.set((existingState) => ({
        ...existingState,
        sequence: shuffledSequence,
      }))
      // NOTE: This will remove it.
      DynamicStorage.removeItem(GE_STORAGE_KEY)
      setRememberMe(false)
      // If user continues to interact with page and Relink setter is invoked,
      // data will be persist again.
    }
  }, PROMPT_TIME_PADDING)
}
