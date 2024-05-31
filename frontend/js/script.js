
//Elementos do login
const login = document.querySelector('.login')
const loginForm = login.querySelector('.login-form')
const loginInput = login.querySelector('.login-input')

//Elementos do chat
const chat = document.querySelector('.chat')
const chatForm = chat.querySelector('.chat-form')
const chatInput = chat.querySelector('.chat-input')
const chatMessages = chat.querySelector('.chat-messages')


const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold"
]

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
//Atualizando os valores do usuário
const user = {
  id: "",
  name: "",
  color: ""
}

let websocket

//Cria o 'balão' da mensagem
const createMessageSelfElement = (content) => {
  const div = document.createElement('div')
  div.classList.add('message-self')

  div.innerHTML = content
  return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
  const div = document.createElement('div')
  const span = document.createElement('span')




  div.classList.add('message-other')
  span.classList.add('message-sender')
  span.style.color = senderColor

  div.appendChild(span)
  span.innerHTML = sender

  div.innerHTML += content
  return div
}

const scrollScreen = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

//Recebe a mensagem do servidor  e mostra na tela
const processMessage = ({ data }) => {
  //Dados que vem do servidor
  const { userId, userName, userColor, content } = JSON.parse(data)

  const message =
    userId == user.id
      ? createMessageSelfElement(content)
      : createMessageOtherElement(content, userName, userColor)


  const element = createMessageOtherElement(content, userName, userColor)

  //Coloca a mensagem na tela
  chatMessages.appendChild(message)
  scrollScreen()

}

const handleLogin = (event) => {
  event.preventDefault()
  user.id = Date.now()
  user.name = loginInput.value
  user.color = getRandomColor()

  login.style.display = 'none'
  chat.style.display = 'flex'

  //Criando conexão, utilizando render para subir online
  websocket = new WebSocket('ws://chaton-backend-7x1m.onrender.com')
  websocket.onmessage = processMessage
}

//Envia mensagem para o servidor
const sendMessage = (event) => {
  event.preventDefault()

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value
  }

  websocket.send(JSON.stringify(message))
  chatInput.value = ""
}

loginForm.addEventListener('submit', handleLogin)
chatForm.addEventListener('submit', sendMessage)