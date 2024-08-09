import React from "react";

function ConversationListItem({ conversation, className, onClick }) {
  const unreadMessages = conversation.messages.reduce((acc, curr) => {
    if (!curr.viewed) {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <div
      onClick={onClick}
      className={`${className} group flex gap-2 px-2 py-2 border-b hover:bg-black text-gray-700 hover:text-white duration-300 cursor-pointer`}
    >
      <div className="max-w-10 min-w-10 min-h-10 max-h-10 flex justify-center items-center border-4 border-gray-700 rounded-full font-semibold truncate">
        {conversation.title?.slice(0, 1)}
      </div>
      <div className="flex-grow relative">
        <div className="text-sm absolute left-0 right-0 top-0 truncate bottom-1/2">{conversation.title}</div>
        {conversation.messages.length > 0 && (
          <div className="text-xs font-semibold absolute left-0 right-0 top-1/2 truncate bottom-0">
            {conversation.messages[conversation.messages.length - 1].text}
          </div>
        )}
      </div>

      {Boolean(unreadMessages) && (
        <span className="text-[8px] self-center group-hover:ring-1 group-hover:ring-white bg-black text-white rounded-full px-[5px] font-bold">
          {unreadMessages}
        </span>
      )}
    </div>
  );
}

export default ConversationListItem;
