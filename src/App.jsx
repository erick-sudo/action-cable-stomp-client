import React from "react";
import axios from "axios";
// import NestWebSocketClient from "./components/nest-ws/NestWebSocketClient";
import SocketIOClient from "./components/socket-io-client/SocketIOClient";
import { SocketIOClientContextProvider } from "./components/socket-io-client/client.context";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default function App() {
  return (
    <div className="flex fixed inset-0">
      {/* <NestWebSocketClient /> */}
      <SocketIOClientContextProvider>
        <SocketIOClient />
      </SocketIOClientContextProvider>
    </div>
  );
}
