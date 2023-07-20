import React, { useState } from "react";
import ChatMessage from "../chatbot/chatMessage";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const addMessage = (message, isUser = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: isUser },
    ]);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      addMessage(userInput, true);
      // Call your chatbot logic here to generate a response
      // For this example, we'll just echo back the user's input
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
          />
        ))}
      </div>
      <div className="input-container">
        <form onSubmit={handleUserSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
