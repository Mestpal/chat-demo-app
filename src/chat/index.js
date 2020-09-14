export default function Chat(conversation){
  try {
    this.constructor(conversation)
    this.init()
  } catch (error) {
    console.log(error)
  }
}

Chat.prototype = {
  conversation: undefined,
  constructor (conversation) {
    this.conversation = conversation
  },
  init () {
    (function (scope) {
      document.getElementsByTagName('input').item(0).addEventListener('keyup', (e) => {
        if (event.keyCode === 13) {
          const input = document.getElementsByTagName('input').item(0)
          scope.sendMessage(scope, input)
        }
      })

      document.getElementsByName('sendMessage').forEach((element) => {
        element.addEventListener('click', (e) => {
          const input = document.getElementsByTagName('input').item(0)
          scope.sendMessage(scope, input)
        })
      })
    })(this)

    this.renderChatConversation(JSON.parse(localStorage.getItem('conversation')))
  },
  sendMessage(scope, event){
    const newMessage = scope.createMessage(event.value)
    event.value = ''

    if (newMessage) {
      scope.updateChatHistory(newMessage)
      scope.renderChatConversation(JSON.parse(localStorage.getItem('conversation')))
      scope.scrollToLast('chatMessage')
    }
  },
  createMessage(input, user = 'me') {
    if(!input) return

    const message = {id: Date.now(), user: user, text: input}

    return message
  },
  updateChatHistory (message) {
    let conversation = null

    if (!localStorage.getItem('conversation')) {
      conversation = [message]
    } else {
      conversation = JSON.parse(localStorage.getItem('conversation'))
      conversation.push(message)
    }

    localStorage.setItem('conversation', JSON.stringify(conversation))
  },
  renderChatConversation (conversation) {
    const messagesBox = document.getElementsByClassName('chat__messages').item(0)

    if(!conversation) return

    conversation.map((message) => {
      let isNotRender = true

      for (const index in messagesBox.children) {
        if (messagesBox.children[index].id === `${message.id}`) {
          isNotRender = false
        }
      }

      if (isNotRender) {
        let entry = document.createElement('li')
        entry.id = message.id
        entry.textContent = message.text
        entry.setAttribute('class', `chat__messages chat__messages--${message.user} chatMessage` )
        messagesBox.appendChild(entry)
      }
    })
  },
  scrollToLast(className) {
    let msn = document.getElementsByClassName(className)
    let last = msn[msn.length-1]
    last.scrollIntoView()
  }
}