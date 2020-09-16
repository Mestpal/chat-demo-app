import Route from '../../../../src/core/router/route'
import Router from '../../../../src/core/router/router'
import jsdom from 'jsdom'

var routes = [
  new Route('test', true),
  new Route('about')
]
var router = new Router(routes)
const {JSDOM} = jsdom

beforeEach(() => {
  const documentHTML = `<!doctype html><html><body></body></html>`
  const {document} = (new JSDOM(documentHTML)).window
  global.document = document
  global.window = document.defaultView
})

describe('Router', () => {
  test('if it is instance of Router',() => {
    router.constructor = jest.fn()
    expect(router instanceof Router).toBeTruthy
  })

  test('Router throw an error message', () => {
    const rt = new Router([])
    expect(() => rt('')).toThrow()
  })

  test('init creates event listener and shows default section', () => {
    const scope = {
      routeChanged: jest.fn()
    }
    global.window.addEventListener = jest.fn()

    new Router(routes)

    expect(window.addEventListener.mock.calls[0][0]).toBe('hashchange')
  })

  test('if contains expected props', () => {
    const expected = {
      routes: expect.any(Array),
    }

    expect(router).toMatchObject(expected)
  })

  test('routeChanged to another route via hash', () => {
      global.window.location = '#test'
      const scope = {
        showSelectedSection: jest.fn()
      }

      router.routeChanged(scope, routes)

      expect(scope.showSelectedSection).toHaveBeenCalled()
  })

  test('routeChanged to default route', () => {
    global.window.location = ''
    const scope = {
      showSelectedSection: jest.fn()
    }

    router.routeChanged(scope, routes)

    expect(scope.showSelectedSection.mock.calls[0][0]).toBe('test')
})

  test('showSelectedSection fails when it dosen\'t have args', () => {
    expect(router.showSelectedSection()).toBeNull
  })

  test('showSelectedSection', () => {
    window.document.body.innerHTML = `<section id="profile"></section>`

    router.showSelectedSection('profile')
    let activeSection = window.document.getElementsByClassName('section section--active')

    expect(activeSection.length).toBe(1)

  })

})