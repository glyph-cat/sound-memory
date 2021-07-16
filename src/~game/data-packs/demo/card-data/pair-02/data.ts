import CardDataSchema from '~schema/card-data'

const CardData: CardDataSchema = {
  figure: {
    name: {
      primary: 'Matsuoka Yoshitsugu',
      secondary: '松岡禎丞',
    },
  },
  cards: {
    a: {
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
    b: {
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
  },
}

export default CardData
