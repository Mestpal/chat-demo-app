'use strict'
import '../assests/styles/main.scss'

import * as routing from './router'
import * as helpers from './helpers'
import Chat from './chat'

(function (){
  function init () {
    helpers.listenersModule.listeners()

    var chat = new Chat(JSON.parse(localStorage.getItem('conversation')))

    window.addEventListener('hashchange', (e) => {
      const timer = setTimeout(() => {
        if(window.location.hash.substr(1) === 'chat') {
          const randomMessage = chat.createMessage('lol', 'friend')
          chat.updateChatHistory(randomMessage)
          chat.renderChatConversation(JSON.parse(localStorage.getItem('conversation')))
        }
        clearTimeout(timer)
      }, 500)
    })

    var router = new routing.Router([
      new routing.Route('profile', true),
      new routing.Route('chat')
    ])
  }
  init()
}())
