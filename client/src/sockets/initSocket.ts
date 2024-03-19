import { io } from 'socket.io-client';
const baseURL = "https://coderbro.online/socket";
console.log(baseURL)
export const initSocket = async () => {
    try {
        const options = {
            'force new connection': true,
            reconnectionAttempt: 'Infinity',
            timeout: 10000,
            transports: ['websocket'],
        };
        return io(baseURL, options);
    } catch (error:any) {
        throw new Error(error.message)
    }
};
