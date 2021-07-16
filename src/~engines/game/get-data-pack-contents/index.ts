import CardDataSchema, {
  FigureSchema,
  SingularCardDataSchemaWithPairID,
} from '~schema/card-data'
import GameConfigSchema from '~schema/game-config'

export interface DataPackContentsSchema {
  figures: Record<string, FigureSchema>
  cards: Record<string, SingularCardDataSchemaWithPairID>
}

function getDataPackContents(
  dataPackName: string,
  config: GameConfigSchema
): DataPackContentsSchema {
  const pairIndices = ['a', 'b']
  const pairCount = config.deckSize / 2
  const data: DataPackContentsSchema = {
    figures: {},
    cards: {},
  }
  for (let i = 1; i <= pairCount; i++) {
    const paddedIndex = i.toString().padStart(2, '0')
    const pairId = `pair-${paddedIndex}`
    const pairData: CardDataSchema = require(
      `~game/data-packs/${dataPackName}/card-data/pair-${paddedIndex}/data`
    ).default
    data.figures[pairId] = {
      ...pairData.figure,
      assets: {
        img: require(
          `~game/data-packs/${dataPackName}/card-data/${pairId}/figure.png`
        ).default,
      },
    }
    for (const ABtype of pairIndices) {
      const cardId = `${pairId}/${ABtype}`
      data.cards[cardId] = {
        ...pairData.cards[ABtype],
        pairId,
        assets: {
          img: require(
            `~game/data-packs/${dataPackName}/card-data/${cardId}/sprite.png`
          ).default,
          sound: require(
            `~game/data-packs/${dataPackName}/card-data/${cardId}/sound.mp3`
          ).default,
        },
      }
    }
  }
  return data
}

export default getDataPackContents
