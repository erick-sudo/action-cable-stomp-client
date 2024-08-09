import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";
import ToolTip from "./ToolTip";

function Message({ message, currentUser, className }) {
  return (
    <div
      className={clsx(`${className} flex`, {
        "justify-end": currentUser.id === message.user_id,
      })}
    >
      <ToolTip
        pointerPosition={`${
          currentUser.id === message.user_id ? "right" : "left"
        }`}
        bg={`${currentUser.id === message.user_id ? "white" : "rgb(31 41 55)"}`}
        className={clsx("", {
          "": currentUser.id === message.user_id,
          "text-white": currentUser.id !== message.user_id,
        })}
      >
        <div className={clsx(`px-3 pt-2 pb-1 ${className}`)}>
          <div className="pb-2">{message.text}</div>
          <div className="text-xs font-mono font-bold flex justify-end">
            {dayjs(message.created_at).format("h:mm A, DD/MM/YYYY")}
          </div>
        </div>
      </ToolTip>
    </div>
  );
}

export default Message;
