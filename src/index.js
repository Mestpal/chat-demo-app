'use strict'
import '../assests/styles/main.scss'

import * as routing from './router'
import * as helpers from './helpers'

(function (){
  function init () {
    helpers.listenersModule.listeners()

    var router = new routing.Router([
      new routing.Route('profile', true),
      new routing.Route('chat')
    ])
  }
  init()
}())
