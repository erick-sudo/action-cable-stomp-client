import { createContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.43.143:3000");

export const SocketIOClientContext = createContext(socket);

export const SocketIOClientContextProvider = ({ children }) => {
  return (
    <SocketIOClientContext.Provider value={socket}>
      {children}
    </SocketIOClientContext.Provider>
  );
};
