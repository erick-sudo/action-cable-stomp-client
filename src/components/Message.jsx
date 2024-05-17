import dayjs from "dayjs";
import React from "react";

function Message({ message }) {
  return (
    <div className="px-4 pt-2 bg-white shadow rounded-lg">
      <div>{message.text}</div>
      <div className="text-xs font-mono font-bold text-gray-500 flex justify-end">{dayjs(message.created_at).format("h:mm A, DD/MM/YYYY")}</div>
    </div>
  );
}

export default Message;
