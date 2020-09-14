let sendMessage = function () {
  const input = document.getElementsByTagName('input').item(0)

  if (input.value) {
    const message = {id:Date.now(), user:'me', text: input.value}
    input.value = ''
    updateChatHistory(message)
  }
}

function updateChatHistory (message) {
  let conversation = null

  if (!localStorage.getItem('conversation')) {
    console.log('crear conversacion en ls')
    conversation = [message]
  } else {
    conversation = JSON.parse(localStorage.getItem('conversation'))
    conversation.push(message)
  }
  localStorage.setItem('conversation', JSON.stringify(conversation))
}

export {sendMessage}