import { clamp } from '.'

describe('clamp', () => {

  it('Below lower boundary', () => {
    const output = clamp(5, 10, 3)
    expect(output).toBe(5)
  })

  it('At lower boundary', () => {
    const output = clamp(5, 10, 5)
    expect(output).toBe(5)
  })

  it('Within both boundaries', () => {
    const output = clamp(5, 10, 7)
    expect(output).toBe(7)
  })

  it('At upper boundary', () => {
    const output = clamp(5, 10, 10)
    expect(output).toBe(10)
  })

  it('Above upper boundary', () => {
    const output = clamp(5, 10, 17)
    expect(output).toBe(10)
  })

})