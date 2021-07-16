export interface NameSchema {
  primary: string
  secondary: string
}

export interface AssetSchema {
  img?: string
  sound?: string
}

export interface SingularCardDataSchema {
  title: {
    name: NameSchema
  }
  character: {
    name: NameSchema
  }
  assets?: AssetSchema
}

export interface SingularCardDataSchemaWithPairID
  extends SingularCardDataSchema {
  pairId: string
}

export interface FigureSchema {
  name: NameSchema
  assets?: AssetSchema
}

interface CardDataSchema {
  figure: FigureSchema
  cards: {
    a: SingularCardDataSchema
    b: SingularCardDataSchema
  }
}

export default CardDataSchema
