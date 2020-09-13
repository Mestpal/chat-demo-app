'use strict'
import '../assests/styles/main.scss'

import * as routing from './router'

(function (){
  function init () {
    document.addEventListener('click', clickAddFriend)

    if (localStorage.getItem('friendStatus')) {
      let target = null
      let buttons = document.getElementsByName('addAsFriend')

      for (const index in buttons) {
        updateProfile(JSON.parse(localStorage.getItem('friendStatus')), buttons.item(index))
      }
    }

    var router = new routing.Router([
      new routing.Route('profile', true),
      new routing.Route('chat')
    ])
  }
  init()
}())

function clickAddFriend (event) {
  let target = event.target
  if (target.classList.contains('btn') && target.innerText === "ADD AS FRIEND") {
    if(localStorage.getItem('friendStatus') === 'true') {
      localStorage.setItem('friendStatus', 'false')
    } else {
      localStorage.setItem('friendStatus', 'true')
    }
    updateProfile(JSON.parse(localStorage.getItem('friendStatus')), target)
  }
}

function updateProfile (friendStatus, target = null) {
  const profilePage = document.getElementsByClassName('page__profile')[0]

  if (JSON.parse(friendStatus) ) {
    profilePage.setAttribute('class', 'page__profile page__profile--alt')
    target ? target.setAttribute('class', 'btn btn--alt') : ''
  } else {
    profilePage.setAttribute('class', 'page__profile')
    target ? target.setAttribute('class', 'btn') : ''
  }
}
