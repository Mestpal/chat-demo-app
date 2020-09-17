import * as routing from './router'
import * as helpers from '../helpers'
import Chat from './chat'

export default function App() {
    this.init()
  }

  App.prototype = {
    init () {
      helpers.friendStatus.listeners()

      var chat = new Chat(JSON.parse(localStorage.getItem('conversation')))

      window.addEventListener('hashchange', (e) => {
        const timer = setTimeout(() => {
          if(window.location.hash.substr(1) === 'chat') {
            const randomMessage = chat.createMessage(Math.random().toString(36).substr(2, 5), 'friend')
            chat.updateChatHistory(randomMessage)
            chat.renderChatConversation(JSON.parse(localStorage.getItem('conversation')))
            chat.scrollToLast('chatMessage')
          }
          clearTimeout(timer)
        }, 500)
      })

      var router = new routing.Router([
        new routing.Route('profile', true),
        new routing.Route('chat')
      ])
    }
  }