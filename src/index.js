'use strict'
import '../assests/styles/main.scss'

import * as routing from './router'

(function (){
  function init () {
    var router = new routing.Router([
      new routing.Route('profile', 'profile.html', true),
      new routing.Route('chat', 'chat.html')
    ])
  }
  init()

  document.addEventListener('click', clickAddFriend)
  function clickAddFriend (event) {
    let element = event.target
    if (element.classList.contains('btn') && element.innerText === "ADD AS FRIEND") {
        const profilePage = document.getElementsByClassName('page__profile')[0]
        if (profilePage.classList.contains('page__profile--alt')) {
          profilePage.setAttribute('class', 'page__profile')
          element.setAttribute('class', 'btn')
        } else {
          profilePage.setAttribute('class', 'page__profile page__profile--alt')
          element.setAttribute('class', 'btn btn--alt')
        }
      }
  }
}())
