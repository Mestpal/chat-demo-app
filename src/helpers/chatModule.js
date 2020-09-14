let sendMessage = function () {
  const input = document.getElementsByTagName('input').item(0)

  if (input.value) {
    const message = {id: Date.now(), user: 'me', text: input.value}
    input.value = ''
    updateChatHistory(message)
  }
  renderChatConversation(JSON.parse(localStorage.getItem('conversation')))
}

function updateChatHistory (message) {
  let conversation = null

  if (!localStorage.getItem('conversation')) {
    conversation = [message]
  } else {
    conversation = JSON.parse(localStorage.getItem('conversation'))
    conversation.push(message)
  }

  localStorage.setItem('conversation', JSON.stringify(conversation))
}

function renderChatConversation (conversation) {
  try {
    const messagesBox = document.getElementsByClassName('chat__messages').item(0)
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
        entry.setAttribute('class', `chat__messages chat__messages--${message.user}`)
        messagesBox.appendChild(entry)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export {sendMessage, renderChatConversation}