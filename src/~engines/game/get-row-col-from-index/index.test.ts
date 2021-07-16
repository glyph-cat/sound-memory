import getRowColFromIndex from '.'

it('getRowColFromIndex', () => {
  const outputStack = []
  for (let i = 0; i < 36; i++) {
    const singleOutput = getRowColFromIndex(i)
    outputStack.push(singleOutput)
  }
  expect(outputStack).toStrictEqual([
    [1, 'A'], [1, 'B'], [1, 'C'], [1, 'D'], [1, 'E'], [1, 'F'],
    [2, 'A'], [2, 'B'], [2, 'C'], [2, 'D'], [2, 'E'], [2, 'F'],
    [3, 'A'], [3, 'B'], [3, 'C'], [3, 'D'], [3, 'E'], [3, 'F'],
    [4, 'A'], [4, 'B'], [4, 'C'], [4, 'D'], [4, 'E'], [4, 'F'],
    [5, 'A'], [5, 'B'], [5, 'C'], [5, 'D'], [5, 'E'], [5, 'F'],
    [6, 'A'], [6, 'B'], [6, 'C'], [6, 'D'], [6, 'E'], [6, 'F'],
  ])
})
