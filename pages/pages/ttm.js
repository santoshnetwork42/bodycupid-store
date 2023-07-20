import React from "react";
import ChatWindow from "~/components/chatbot/chatWindow";
import Modal from "~/components/common/modal";

function Ttm() {
  return (
    <div>
      <Modal isOpen={true}>
        <ChatWindow />
      </Modal>
    </div>
  );
}

export default Ttm;
