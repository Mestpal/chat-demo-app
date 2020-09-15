import Chat from '../../../src/chat/index'

const mockMessage = {
  id: Date.now,
  user: 'me',
  text: 'test'
}
const chat = new Chat([mockMessage])

afterEach(() => {
  localStorage.removeItem('conversation')
})

describe('chat', () => {
  test('if is instance of Chat',() => {
    chat.init = jest.fn()
    expect(chat instanceof Chat).toBeTruthy
  })

  test('if contains expect props', () => {
    const expected = { conversation: expect.any(Array) }
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

  test('update chat history when storage is empty', () => {
    let storage = localStorage.getItem('conversation')
    const message = { id: 1, user: 'me', text: 'pepe'}

    expect(storage).toBeNull

    chat.updateChatHistory(message)
    storage = JSON.parse(localStorage.getItem('conversation'))
    expect(storage).toEqual(expect.arrayContaining([message]))
  })

  test('update chat history when storage exits', () => {
    const message = { id: 1, user: 'friend', text: 'pepe'}
    const newMessage = { id: 1, user: 'me', text: 'Test'}
    localStorage.setItem('conversation', JSON.stringify([message]))

    chat.updateChatHistory(newMessage)
    const storage = JSON.parse(localStorage.getItem('conversation'))

    expect(storage).toEqual(expect.arrayContaining([message, newMessage]))
  })
})