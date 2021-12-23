import { io } from "socket.io-client";


let socket: any;
export const connect = () => {
    const token = localStorage.getItem('token')!

    socket = io(`${process.env.REACT_APP_URL_SOCKET}/`, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        withCredentials: false,
        query: {
            'token': token
        },
    });

    socket.on('connect', () => {
        console.log('Conectado al servidor')
    });
    socket.on('disconnect', () => {
        socket.emit('user-connect')
        console.log('Perdimos comunicación con el servidor');
    });

}
export const getSocket = () => socket;

export const dissConect = () => {
    if (!socket) connect()
    socket.disconnect();
}
