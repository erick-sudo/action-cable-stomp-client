import React from "react";
import ConversationListItem from "./ConversationListItem";

function ConversationList({
  setActiveTab,
  currentUser,
  className,
  conversations,
  activeConversation,
  setActiveConversation,
}) {
  return (
    <div className={`${className}`}>
      {conversations.map((conversation, idx) => (
        <ConversationListItem
          currentUser={currentUser}
          onClick={() => {
            setActiveConversation(conversation);
            setActiveTab("conversation-screen");
          }}
          conversation={conversation}
          className={`${
            activeConversation?.id === conversation.id && "bg-black/10"
          }`}
          key={idx}
        />
      ))}
    </div>
  );
}

export default ConversationList;
