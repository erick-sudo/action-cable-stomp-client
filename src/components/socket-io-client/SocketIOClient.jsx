import React, { useContext, useEffect, useState } from "react";
import { SocketIOClientContext } from "./client.context";

export default function SocketIOClient() {
  const socket = useContext(SocketIOClientContext);
  const [msg, setMsg] = useState("");
  const [online, setOnline] = useState(socket.connected);
  const [messages, setMessages] = useState([
    ...new Array(12).fill({
      from: "postman",
      msg: "Alternatively, enable CORS via the create() method's options object. Set the cors property to true to enable CORS with default settings. Or, pass a CORS configuration object or callback function as the cors property value to customize its behavior.",
    }),
  ]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to gateway...");
      setOnline(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from gateway...!!");
      setOnline(false);
    });

    socket.on("onMessage", (msg) => {
      console.log("Incoming Message...");
      setMessages((msgs) => [...msgs, msg.message]);
    });

    return () => {
      console.log("Cleaning up event listeners...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  return (
    <div className="p-2 flex flex-col gap-3 flex-grow max-w-2xl mx-auto">
      <h3 className=" bg-white rounded-md shadow p-4 flex justify-between">
        <span className="font-semibold text-pink-900">SocketIOClient</span>
        <span
          className={`text-sm font-semibold ${
            online ? "text-pink-600" : "text-yellow-600"
          }`}
        >
          {online ? "Online" : "Offline"}
        </span>
      </h3>

      <div className="flex flex-grow shadow-inner border rounded-lg relative">
        <div className="flex flex-col absolute inset-2 gap-3 zero-size-vertical-scrollbar">
          {messages.map(({ from, msg }, index) => (
            <div
              key={index}
              className={`py-2 px-4 flex flex-col border rounded-lg shadow ${
                from === "me"
                  ? "text-violet-900 bg-violet-100 mr-12 self-start"
                  : "text-pink-900 self-end bg-pink-50 ml-12"
              }`}
            >
              <span
                className={`text-sm w-max px-2 border rounded-full ${
                  from === "me"
                    ? "bg-violet-100 text-violet-600 border-violet-600/50"
                    : "bg-pink-100 text-pink-600 border-pink-600/50"
                }`}
              >
                {from}
              </span>
              <div className="text-lg select-text">{msg}</div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("newMessage", {
            from: "me",
            msg,
          });
          setMsg("");
        }}
        className="flex bg-white rounded-md shadow p-1"
      >
        <input
          disabled={!online}
          required
          className="flex-grow bg-transparent py-2 px-4 outline-none disabled:cursor-not-allowed"
          name="msg"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message here"
        />
        <button
          disabled={!online}
          type="submit"
          className="px-4 py-2 bg-pink-800 rounded-md text-white hover:bg-pink-600 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
