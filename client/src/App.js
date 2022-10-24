import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chats from "./Chats";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Let's Chat</h3>
      <input
        type="text"
        placeholder="Your Name"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Room ID"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>Join The Room</button>
      <Chats socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
