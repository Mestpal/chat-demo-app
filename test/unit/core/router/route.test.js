import Route from '../../../../src/core/router/route'

var route = new Route('test', true)

describe('Route', () => {
  test('if it is instance of Route',() => {
    route.constructor = jest.fn()
    expect(route instanceof Route).toBeTruthy
  })

  test('Route throw an error message', () => {
    const r = new Route()
    expect(() => r('')).toThrow()
  })

  test('if contains expected props', () => {
    const expected = {
      name: expect.any(String),
      defaultRoute: expect.any(Boolean),
     }

    expect(route).toMatchObject(expected)
  })

  test('isActualRoute true', () => {
    expect(route.isActualRoute('#test')).toBe(true)
  })

  test('isActualRoute false', () => {
    expect(route.isActualRoute('#about')).toBe(false)
  })

  test('if constructor update the props', () => {
    const r = new Route('page', true)
    expect(r.name).toBe('page')
    expect(r.defaultRoute).toBe(true)
  })
})