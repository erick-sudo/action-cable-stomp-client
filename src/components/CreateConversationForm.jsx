import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function CreateConversationForm({ className, onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      conversation: {
        title: title,
      },
    });
    setTitle("");
  };
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="rounded flex relative">
        <div className="absolute text-xs left-1 inset-y-1 rounded-full w-8 flex items-center justify-center">
          <PlusIcon height={20} />
        </div>
        <input
          placeholder="Conversation Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
          className="py-2 pl-12 pr-24 grow border rounded-full peer  bg-transparent"
        />
        <input
          value="Create"
          className="absolute text-xs right-1 inset-y-1 bg-[#062C30] w-max px-6 py-1 rounded-full hover:bg-[#062c30da] text-white"
          type="submit"
        />
      </form>
    </div>
  );
}

export default CreateConversationForm;
