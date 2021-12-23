import { useEffect, useState } from "react";

import { ChatItem, Logout } from "../../Atoms";
import { UserModel } from "../../Interfaces";

import { UserService } from "../../Services/Users/Users.service";
import { validateSocket } from "../../Utils/Functions/functions";

import './style.css'

export function ListChatComponent(): JSX.Element {

    const socket = validateSocket();
    socket.emit('user-connect')

    const userService = new UserService();
    const [users, setUsers] = useState<UserModel[]>([])
    const [selected, setSelected] = useState('')

    const _getUsers = async () => {
        try {
            const user = await userService.getUser();
            if (user.status === 200) setUsers(user.data.usuarios);
        } catch (err: any) {
            throw err
        }
    }
    useEffect(() => {
        _getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on('refresh', () => _getUsers());
    }, [socket]);

    return (
        <div className="list-chat-container">
            <HeaderInfo />
            <div className="list-chat">
                {users.map((item, index) => {
                    const image = require(`../../Assets/user/${item.img}`);
                    return <ChatItem
                        key={index}
                        id={item.uid!}
                        index={index}
                        selected={selected}
                        setSelected={setSelected}
                        user={item.user}
                        image={image}
                        status={item.online!} />
                })}
            </div>
            <Logout />
        </div>
    )
}

function HeaderInfo(): JSX.Element {
    const user = JSON.parse(localStorage.getItem('user')!)
    const image = require(`../../Assets/user/${user.img}`);
    return (
        <div className="box-header-info">
            <p>Bienvenido <strong>{user['user']}</strong> </p>
            <img src={image} alt="Avatar" className="avatar-img" />
        </div>
    )
}