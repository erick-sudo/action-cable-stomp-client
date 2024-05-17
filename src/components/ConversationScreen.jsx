import React from "react";
import Message from "./Message";
import clsx from "clsx";

function ConversationScreen({ conversation, className, currentUser }) {
  return (
    <div className={`${className} p-2 flex flex-col gap-2`}>
      {conversation.messages?.map((message, index) => (
        <Message currentUser={currentUser} key={index} message={message} />
      ))}
    </div>
  );
}

export default ConversationScreen;
