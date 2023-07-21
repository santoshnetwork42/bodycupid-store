import React from "react";

const ChatMessage = ({ message, isUser }) => {
  const userAvatarUrl =
    "https://banner2.cleanpng.com/20180418/xqw/kisspng-avatar-computer-icons-business-business-woman-5ad736ba3f2735.7973320115240536902587.jpg";
  const botAvatarUrl =
    "https://banner2.cleanpng.com/20180428/sue/kisspng-pittman-animal-hospital-user-computer-icons-avatar-5ae4937a25a0b7.9399757315249294021541.jpg";
  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      {isUser ? (
        <img src={userAvatarUrl} alt="User Avatar" className="avatar" />
      ) : (
        <img src={botAvatarUrl} alt="Bot Avatar" className="avatar" />
      )}
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;
