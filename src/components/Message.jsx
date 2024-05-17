import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";

function Message({ message, currentUser, className }) {
  return (
    <div
      className={clsx(`${className} flex`, {
        "justify-end": currentUser.id === message.user_id,
      })}
    >
      <div
        className={clsx(`px-8 pt-2 shadow max-w-[85%] ${className}`, {
          "rounded-tl-xl rounded-br-[30px] rounded-bl-xl bg-white": currentUser.id === message.user_id,
          "rounded-bl-[30px] rounded-br-xl rounded-tr-xl bg-gray-800 text-white": currentUser.id !== message.user_id,
        })}
      >
        <div className="pb-2">{message.text}</div>
        <div className="text-xs font-mono font-bold flex justify-end">
          {dayjs(message.created_at).format("h:mm A, DD/MM/YYYY")}
        </div>
      </div>
    </div>
  );
}

export default Message;
