import React from "react";
import Message from "./Message";

function ConversationScreen({ conversation, className }) {
  return (
    <div className={`${className} p-2 grid gap-2`}>
      {conversation.messages?.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default ConversationScreen;
