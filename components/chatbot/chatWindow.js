import React, { useState } from "react";
import ChatMessage from "../chatbot/chatMessage";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const addMessage = (message, isUser = false) => {
    const avatar = isUser
      ? "https://banner2.cleanpng.com/20180418/xqw/kisspng-avatar-computer-icons-business-business-woman-5ad736ba3f2735.7973320115240536902587.jpg"
      : "https://banner2.cleanpng.com/20180428/sue/kisspng-pittman-animal-hospital-user-computer-icons-avatar-5ae4937a25a0b7.9399757315249294021541.jpg";
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: isUser, avatar: avatar },
    ]);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      addMessage(userInput, true);
      setTimeout(() => addMessage(userInput), 1000);
      setUserInput("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-log">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            avatar={message.avatar}
          />
        ))}
      </div>
      <div className="input-container">
        <form onSubmit={handleUserSubmit}>
          <input
            className="input1"
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Type your message..."
          />
          <button className="button1" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
