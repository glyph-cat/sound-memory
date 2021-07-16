import CardDataSchema from '~schema/card-data'

const CardData: CardDataSchema = {
  figure: {
    name: {
      primary: 'Hondo Kaede',
      secondary: '本渡楓',
    },
  },
  cards: {
    a: {
      title: {
        name: {
          primary: 'I\'ve Been Killing Slimes for 300 Years and Maxed Out My Level',
          secondary: 'スライム倒して300年、知らないうちにレベルMAXになってました',
        },
      },
      character: {
        name: {
          primary: 'Laika',
          secondary: 'ライカ',
        },
      },
    },
    b: {
      title: {
        name: {
          primary: 'Wandering Witch: The Journey of Elaina',
          secondary: '魔女の旅々',
        },
      },
      character: {
        name: {
          primary: 'Elaina',
          secondary: 'イレイナ',
        },
      },
    },
  },
}

export default CardData
