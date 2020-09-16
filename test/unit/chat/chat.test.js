import jsdom from 'jsdom'
import Chat from '../../../src/core/chat/index'

const mockMessage = {
  id: Date.now,
  user: 'me',
  text: 'test'
}
const mockChatList =`
  <ul class="chat__messages">
    <li id="1600207870204" class="chat__messages chat__messages--friend chatMessage">
      nn7wo
      <a class="chat__messages_image chat__messages__image--friend" href="#profile"></a>
    </li>
    <li id="1600207873478" class="chat__messages chat__messages--friend chatMessage">
      18vpw
      <a class="chat__messages_image chat__messages__image--friend" href="#profile"></a>
    </li>
  </ul>
`
const mockInput=`<input type="text" placeholder="write a text" value="test">`
const mockSendMessageButton = `<button type="button" name="sendMessage" class="btn"> Send </button>`
const chat = new Chat([mockMessage])
const {JSDOM} = jsdom

beforeEach(() => {
  const documentHTML = `<!doctype html><html><body></body></html>`
  const {document} = (new JSDOM(documentHTML)).window
  global.document = document
  global.window = document.defaultView
})

afterEach(() => {
  localStorage.removeItem('conversation')
})

describe('Chat', () => {

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

  test('update chat history when a chat in the storage exits', () => {
    const message = { id: 1, user: 'friend', text: 'pepe'}
    const newMessage = { id: 1, user: 'me', text: 'Test'}
    localStorage.setItem('conversation', JSON.stringify([message]))

    chat.updateChatHistory(newMessage)
    const storage = JSON.parse(localStorage.getItem('conversation'))

    expect(storage).toEqual(expect.arrayContaining([message, newMessage]))
  })

  test('renderChatConversation does nothing with an empty conversation', () =>{
     expect(chat.renderChatConversation()).toBeNull
  })

  test('renderChatConversation when a conversatio exits',() =>{
    global.document.body.innerHTML = mockChatList
    let messagesBox = window.document.getElementsByClassName('chat__messages').item(0)
    const initialChildrenCount = messagesBox.children.length

    chat.renderChatConversation([mockMessage])
    messagesBox = window.document.getElementsByClassName('chat__messages').item(0)
    const finalChildrenCount = messagesBox.children.length

    expect(finalChildrenCount).toBe(initialChildrenCount + 1)
  })

  test('scroll to the last message in the chat', () => {
    const documentHTML = `<!doctype html><html><body></body></html>`
    const {document} = (new JSDOM(documentHTML)).window
    global.document = document
    global.window = document.defaultView
    global.document.body.innerHTML = mockChatList


    document.getElementsByClassName = jest.fn((className) => {
      return window.document.getElementsByClassName('chatMessage')
    })
    let msn = document.getElementsByClassName('chatMessage')
    let last = msn[msn.length-1]


    last.scrollIntoView = jest.fn()
    last.scrollIntoView()

    expect(document.getElementsByClassName.mock.calls[0][0]).toBe('chatMessage')
    expect(document.getElementsByClassName).toBeCalled()
    expect(last.scrollIntoView).toBeCalled()
  })

  test('init add the events listeners, and renders conversation', () => {
    window.document.body.innerHTML = `${mockInput}${mockSendMessageButton}`
    let input = window.document.getElementsByTagName('input').item(0)
    let sendButton = window.document.getElementsByName('sendMessage').item(0)

    input.addEventListener = jest.fn()
    sendButton.addEventListener = jest.fn()

    new Chat()

    expect(input.addEventListener.mock.calls[0][0]).toBe('keyup')
    expect(sendButton.addEventListener.mock.calls[0][0]).toBe('click')
  })

  test('sendMessage does the complete process', () => {
    const scope = {
      createMessage: jest.fn(() => (mockMessage)),
      updateChatHistory: jest.fn(),
      renderChatConversation: jest.fn(),
      scrollToLast: jest.fn()
    }
    const event = {
      value: 'test'
    }

    chat.sendMessage(scope, event)

    expect(scope.createMessage).toHaveBeenCalled()
    expect(scope.updateChatHistory).toHaveBeenCalled()
    expect(scope.renderChatConversation).toHaveBeenCalled()
    expect(scope.scrollToLast).toHaveBeenCalled()
  })

  test('sendMessage does nothing when event has not a value', () => {
    const scope = {
      createMessage: jest.fn(() => ('')),
      updateChatHistory: jest.fn(),
      renderChatConversation: jest.fn(),
      scrollToLast: jest.fn()
    }
    const event = {
      value: ''
    }

    chat.sendMessage(scope, event)

    expect(scope.createMessage).toHaveBeenCalled()
    expect(scope.updateChatHistory).not.toHaveBeenCalled()
    expect(scope.renderChatConversation).not.toHaveBeenCalled()
    expect(scope.scrollToLast).not.toHaveBeenCalled()
  })
})