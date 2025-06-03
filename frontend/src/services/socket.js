import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socketInstance = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

// Conectar automaticamente quando a instância for criada
if (!socketInstance.connected) {
    socketInstance.connect();
}


const socket = {
    connect: () => {
        if (!socketInstance.connected) {
            socketInstance.connect();
        } else {
            console.warn("Socket is already connected.");
        }
    },

    disconnect: () => {
        if (socketInstance.connected) {
            socketInstance.disconnect();
        } else {
            console.warn("Socket is not connected.");
        }
    },

    isConnected: () => socketInstance.connected,

    on: (event, callback) => {
        if (typeof callback === "function") {
            socketInstance.on(event, callback);
        } else {
            console.error("Callback must be a function.");
        }
    },

    emit: (event, data) => {
        if (socketInstance.connected) {
            socketInstance.emit(event, data);
        } else {
            console.error("Socket is not connected. Cannot emit event.");
        }
    }
};

export default socket;