import connect, { message, forward } from './src/index'

// protocol
const messageHandler = (dispatch) =>
  (e) => console.log('message received:', e.text)

const defaultHandler = (dispatch) =>
  (e) => dispatch({
    type: 'error',
    text: 'Unknown event'
  })

const connectTo = (token, dispatch) =>
  setTimeout(() => {
    dispatch({
      type: 'connect',
      token: token
    })
  }, 100)

const registerEvents = (dispatch) =>
  setInterval(() => {
    dispatch({
      type: 'message',
      chat: '#test',
      text: Math.random().toString(36).substring(7)
    })
  }, 250)

const exampleProtocol = (config, dispatch) => {
  connectTo(config.token, dispatch)
  registerEvents(dispatch)
  return forward({
    'message': messageHandler(dispatch),
    'default': defaultHandler(dispatch)
  })
}
// /protocol

// app
const networks = connect([
  {
    protocol: exampleProtocol,
    token: '...'
  }
])

networks.on('event', (e) => console.log(e))

const reverse = (msg, reply) => {
  const reversedText = msg.text.split('').reverse().join('')
  const reversedMessage = message(msg.chat, reversedText)

  reply(reversedMessage)
}

networks.on('message', reverse)
// /app
