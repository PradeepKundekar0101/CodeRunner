import { io } from 'socket.io-client';
const baseURL = import.meta.env.VITE_SOCKET_SERVER;
export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(baseURL, options);
};