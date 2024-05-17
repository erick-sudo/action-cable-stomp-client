import React from "react";
import ConversationListItem from "./ConversationListItem";

function ConversationList({
  className,
  conversations,
  activeConversation,
  setActiveConversation,
}) {
  return (
    <div className={`${className}`}>
      {conversations.map((conversation, idx) => (
        <ConversationListItem
          onClick={() => setActiveConversation(conversation)}
          conversation={conversation}
          className={`${activeConversation?.id === conversation.id && "bg-black/10"}`}
          key={idx}
        />
      ))}
    </div>
  );
}

export default ConversationList;