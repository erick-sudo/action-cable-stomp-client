import axios from "axios";
import React from "react";
import useWebSocket from "react-use-websocket";

const serverDomain = import.meta.env.VITE_NEST_WS_SERVER_DOMAIN;
const httpUrl = `http://${serverDomain}`;
const wsUrl = `ws://${serverDomain}`;

export default function NestWebSocketClient() {
  const WS_URL = `${wsUrl}`;

  const { readyState } = useWebSocket(WS_URL, {
    share: true,
    onOpen() {
      console.log("Web socket connected");
    },
    onError(error) {
      console.log("WEB-SOCKET ERROR: " + error);
    },
    onClose(error) {
      console.log("CONNECTION CLOSED: " + error);
    },
  });

  return (
    <div className="">
      <h3 className="text-lg mb-4">NestWebSocketClient</h3>
      <button
        onClick={() => {
          axios
            .get(`${httpUrl}`)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        className="px-4 py-1 rounded-md bg-pink-800 text-white hover:bg-pink-600 duration-300"
      >
        Test Hello
      </button>
    </div>
  );
}
