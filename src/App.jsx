import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';

function App() {

  const WS_URL = 'ws://localhost:3000/';

  /*const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )*/

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      share: true,
      filter: () => false,
      retryOnError: true,
      shouldReconnect: () => true,
  });

  console.log({
    sendJsonMessage, lastJsonMessage, readyState
  })

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed")
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      })
    }
  }, [readyState])

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`)
  }, [lastJsonMessage])



  const [count, setCount] = useState(0);


  const handleMessage = (e) => {

  }

  return (
    <>
      <h1>ReactJS with Websocket</h1>
      <div className="card">
        <button onClick={handleMessage}>
          count is {count} - Message: {lastJsonMessage}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
