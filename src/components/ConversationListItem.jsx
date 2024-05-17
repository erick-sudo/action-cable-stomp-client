import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import React from "react";

function ConversationListItem({ conversation, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${className} flex items-center gap-2 px-2 py-2 border-b hover:bg-black text-gray-700 hover:text-white duration-300 cursor-pointer`}
    >
      <div className="w-8 h-8 flex justify-center items-center border-4 border-gray-700 rounded-full font-semibold">
        {conversation.title?.slice(0, 1)}
      </div>
      <div className="flex-grow">{conversation.title}</div>

      <button className="hover:text-gray-500 text-gray-700">
        <EllipsisVerticalIcon height={20} />
      </button>
    </div>
  );
}

export default ConversationListItem;
