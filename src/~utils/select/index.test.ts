import { selectObj } from '.'

describe('selectObj', () => {

  it('Select existent data only', () => {
    const obj = { foo: 'a', bar: 'b' }
    const output = selectObj(obj, ['foo', 'bar'])
    expect(output).toStrictEqual({ foo: 'a', bar: 'b' })
  })

  it('Attempt to select some non-existent data', () => {
    const obj = { foo: 'a', bar: 'b' }
    const output = selectObj(obj, ['foo', 'baz'])
    expect(output).toStrictEqual({ foo: 'a', baz: undefined })
  })

})
