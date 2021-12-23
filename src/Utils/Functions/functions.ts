import { getSocket, connect } from "../../Services/Sockets/Socket.service"

export function validateSocket() {
    let socket = getSocket()
    if (!socket) {
        connect()
        socket = getSocket()
    }
    return socket
}

export function isLoggin() {
    let auth = false;
    if (localStorage.getItem('uid')) auth = true
    return auth
}