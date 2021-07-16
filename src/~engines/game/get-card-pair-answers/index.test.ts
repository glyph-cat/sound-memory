import getCardPairAnswers from '.'

it('getCardPairAnswers', () => {
  const sequence = [
    'pair-02/b', // A1 // A1
    'pair-05/b', // A2 // B1
    'pair-04/b', // A3 // C1
    'pair-03/a', // A4 // D1
    'pair-04/a', // A5 // E1
    'pair-06/b', // A6 // F1
    'pair-01/a', // B1 // A2
    'pair-02/a', // B2 // B2
    'pair-05/a', // B3 // C2
    'pair-06/a', // B4 // D2
    'pair-01/b', // B5 // E2
    'pair-03/b', // B6 // F2
  ]
  const output = getCardPairAnswers(sequence)
  expect(output).toStrictEqual([
    'A1 - B2',
    'B1 - C2',
    'C1 - E1',
    'D1 - F2',
    'F1 - D2',
    'A2 - E2',
  ].join('\n'))
})
