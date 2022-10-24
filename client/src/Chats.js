import React, { useEffect } from "react";
import { useState } from "react";

function Chats(props) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: props.room,
        username: props.username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await props.socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [props.socket]);

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chats;
