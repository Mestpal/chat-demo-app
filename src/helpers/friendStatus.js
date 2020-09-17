export default function listeners() {
  document.getElementsByName('addAsFriend').forEach((element) => {
    element.addEventListener('click', (e) => {
      clickAddFriend(e)
      updateProfile(JSON.parse(localStorage.getItem('friendStatus')),
        {
          profilePage: document.getElementsByClassName('page__profile').item(0),
          friendButton: e.target
        }
      )
    })
  })

  if (localStorage.getItem('friendStatus')) {
    let buttons = document.getElementsByName('addAsFriend')
    for (const index in buttons) {
      updateProfile(JSON.parse(localStorage.getItem('friendStatus')),
        {
          profilePage: document.getElementsByClassName('page__profile').item(0),
          friendButton: buttons.item(index)
        }
      )
    }
  }
}

let clickAddFriend = function (event) {
  if(localStorage.getItem('friendStatus') === 'true') {
    localStorage.setItem('friendStatus', 'false')
  } else {
    localStorage.setItem('friendStatus', 'true')
  }
}

let updateProfile = function (friendStatus, target = {}) {
  if (friendStatus) {
    target.profilePage.setAttribute('class', 'page__profile page__profile--alt')
    target.friendButton ? target.friendButton.setAttribute('class', 'btn btn--alt') : ''
  } else {
    target.profilePage.setAttribute('class', 'page__profile')
    target.friendButton ? target.friendButton.setAttribute('class', 'btn') : ''
  }
}

export { listeners, clickAddFriend, updateProfile }
