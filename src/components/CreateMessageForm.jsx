import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function CreateMessageForm({ className, onSubmit, conversation_id }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      message: {
        text,
        conversation_id,
      },
    });
    setText("");
  };
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="rounded flex relative">
        <div className="absolute text-xs left-1 inset-y-1 rounded-full w-8 flex items-center justify-center">
          <PlusIcon height={20} />
        </div>
        <input
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          required
          className="py-2 pl-12 pr-24 grow block border rounded-full peer  bg-transparent"
        />
        <button
          type="submit"
          className="absolute text-xs right-1 inset-y-1 bg-[#062C30] w-max px-6 py-1 rounded-full hover:bg-[#062c30da] text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default CreateMessageForm;
