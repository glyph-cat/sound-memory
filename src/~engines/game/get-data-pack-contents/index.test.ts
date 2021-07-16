import GameConfigSchema from '~schema/game-config'
import getDataPackContents, { DataPackContentsSchema } from '.'

// NOTE: `.toMatchObject()` is used instead of `.toStrictEqual` because
// `assets` is an optional property and it would cause the test to fail

it('getDataPackContents', () => {

  const dataPackName = 'demo'
  const config: GameConfigSchema = require(
    `~game/data-packs/${dataPackName}/config`
  ).default
  const output: DataPackContentsSchema = getDataPackContents(dataPackName, config)

  // Check if card data are correct
  expect(output.cards).toMatchObject({
    'pair-01/a': {
      pairId: 'pair-01',
      title: {
        name: {
          primary: 'Kaguya Sama: Love Is War',
          secondary: 'かぐや様は告らせたい',
        },
      },
      character: {
        name: {
          primary: 'Shinomiya Kaguya',
          secondary: '四宮 かぐや',
        },
      },
    },
    'pair-01/b': {
      pairId: 'pair-01',
      title: {
        name: {
          primary: 'Genshin Impact',
          secondary: '原神',
        },
      },
      character: {
        name: {
          primary: 'Paimon',
          secondary: 'パイモン',
        },
      },
    },
    'pair-02/a': {
      pairId: 'pair-02',
      title: {
        name: {
          primary: 'Food Wars',
          secondary: '食戟のソーマ',
        },
      },
      character: {
        name: {
          primary: 'Yukihira Sōma',
          secondary: '幸平創真',
        },
      },
    },
    'pair-02/b': {
      pairId: 'pair-02',
      title: {
        name: {
          primary: 'Osamake: Romcom Where The Childhood Friend Won\'t Lose',
          secondary: '幼なじみが絶対に負けないラブコメ',
        },
      },
      character: {
        name: {
          primary: 'Maru Sueharu',
          secondary: '丸末晴',
        },
      },
    },
  })

  // Check if figure data are correct
  expect(output.figures).toMatchObject({
    'pair-01': {
      name: {
        primary: 'Koga Aoi',
        secondary: '古賀 葵',
      }
    },
    'pair-02': {
      name: {
        primary: 'Matsuoka Yoshitsugu',
        secondary: '松岡禎丞',
      }
    }
  })

})
