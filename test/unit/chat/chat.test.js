import Chat from '../../../src/chat/index'

const chat = new Chat([])

describe('chat', () => {
  test('if is instance of Chat',() => {
    chat.init = jest.fn()
    expect(chat instanceof Chat).toBeTruthy
  })

  test('if contains expect props', () => {
    const expected = { conversation: [] }
    expect(chat).toMatchObject(expected)
  })

  test('createMessage creates a message', () => {
    const message = chat.createMessage('test')
    const expected =  {
      id: expect.any(Number),
      user: 'me',
      text: 'test'
    }
    expect(message).toMatchObject(expected)
  })

  test('createMessage does not return nothing', () => {
    const message = chat.createMessage()
    expect(message).toBeNull()
  })
})