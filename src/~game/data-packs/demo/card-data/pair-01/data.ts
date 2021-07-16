import CardDataSchema from '~schema/card-data'

const CardData: CardDataSchema = {
  figure: {
    name: {
      primary: 'Koga Aoi',
      secondary: '古賀 葵',
    },
  },
  cards: {
    a: {
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
    b: {
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
  },
}

export default CardData
