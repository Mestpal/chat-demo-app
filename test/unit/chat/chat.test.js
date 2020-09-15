import Chat from '../../../src/chat/index'

describe('chat', () => {
  test('if is instance of Chat',() => {
    let chat = new Chat([])
    chat.init = jest.fn()
    expect(chat instanceof Chat).toBeTruthy
  })

  test('if contains expect props', () => {
    const expected = { conversation: [] }
    let chat = new Chat([])
    expect(chat).toMatchObject(expected)
  })
})