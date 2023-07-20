import React from "react";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;
