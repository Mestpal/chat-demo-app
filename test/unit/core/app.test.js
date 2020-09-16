import jsdom from 'jsdom'
import App from '../../../src/core/App'
import * as helpers from '../../../src/helpers'
import { Route, Router } from '../../../src/core/router'
import Chat from '../../../src/core/chat'

const mockMessage = {
  id: Date.now,
  user: 'me',
  text: 'test'
}
const routes = [
  new Route('test', true),
  new Route('about')
]
const {JSDOM} = jsdom
let router

beforeEach(() => {
  const documentHTML = `<!doctype html><html><body></body></html>`
  const {document} = (new JSDOM(documentHTML)).window
  global.document = document
  global.window = document.defaultView
})

describe('App', () => {
  test('Init generates the eventListeners and the Router', () => {
    helpers.listenersModule.listeners = jest.fn()
    localStorage.setItem('conversation', JSON.stringify(mockMessage))
    global.window.addEventListener = jest.fn()
    Router.init = jest.fn()

    new App()

    expect(window.addEventListener.mock.calls[0][0]).toBe('hashchange')
    expect(helpers.listenersModule.listeners).toHaveBeenCalled()
    expect(global.window.addEventListener).toHaveBeenCalled()
  })
})