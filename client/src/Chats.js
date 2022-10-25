import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chats(props) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
      setMessageList((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [props.socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={
                  props.username === messageContent.username ? "you" : "other"
                }
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Type a message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chats;
