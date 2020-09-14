'use strict'
import '../assests/styles/main.scss'

import * as routing from './router'
import * as helpers from './helpers'
import Chat from './chat'

(function (){
  function init () {
    helpers.listenersModule.listeners()

    var chat = new Chat(JSON.parse(localStorage.getItem('conversation')))

    document.getElementsByName('sendMessage').forEach((element) => {
      element.onclick = chat.sendMessage
    })

    var router = new routing.Router([
      new routing.Route('profile', true),
      new routing.Route('chat')
    ])
  }
  init()
}())
