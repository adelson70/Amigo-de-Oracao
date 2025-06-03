// src/contexts/SocketContext.jsx
import { createContext, useContext } from "react";
import socket from "../services/socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket deve ser usado dentro de um SocketProvider");
    }
    return context;
};