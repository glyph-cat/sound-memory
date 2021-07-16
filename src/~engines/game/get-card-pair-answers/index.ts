import getRowColFromIndex from '../get-row-col-from-index'

function getCardPairAnswers(sequence: Array<string>): string {
  const answerCache: Record<string, Array<string>> = {}
  for (let i = 0; i < sequence.length; i++) {
    const currentCardId = sequence[i]
    const currentPairId = currentCardId.replace(/\/(a|b)$/, '')
    const [row, col] = getRowColFromIndex(i)
    if (!answerCache[currentPairId]) { answerCache[currentPairId] = [] }
    answerCache[currentPairId].push(`${col}${row}`)
  }
  const answerStack = []
  for (const pairId in answerCache) {
    const cachedAnswer = answerCache[pairId]
    const [keyA, keyB] = cachedAnswer
    answerStack.push(`${keyA} - ${keyB}`)
  }
  return answerStack.join('\n')
}

export default getCardPairAnswers
