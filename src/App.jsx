import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const WS_URL = 'http://localhost:3000/';

function App() {


  

  const [socket, setSocket] = useState(null);
  const [readyState, setReadyState] = useState(null);
  const [lastJsonMessage, setLastJsonMessage] = useState(null);

  useEffect(() => {

    const newSocket = io(WS_URL, {
      rejectUnauthorized: false,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setReadyState(newSocket.readyState);
    });

    newSocket.on('disconnect', () => {
      setReadyState(newSocket.readyState);
    });

    newSocket.on('pong', (message) => {
      setLastJsonMessage(message);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed 'readyState':", readyState)
    /*if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      })
    }*/
  }, [readyState])

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`)
  }, [lastJsonMessage])




  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit('ping', 'ping');
  }

  return (
    <>
      <h1>ReactJS with Websocket</h1>
      <div className="card">
        <button onClick={handleMessage}>
          Haz PING
        </button>
        <pre>
          {lastJsonMessage && JSON.stringify(lastJsonMessage, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default App
