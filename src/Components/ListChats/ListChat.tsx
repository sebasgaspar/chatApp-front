import { useEffect, useState } from "react";

import { ChatItem, Logout } from "../../Atoms";
import { UserModel } from "../../Interfaces";

import { UserService } from "../../Services/Users/Users.service";

import './style.css'

export function ListChatComponent(): JSX.Element {


    const userService = new UserService();
    const [users, setUsers] = useState<UserModel[]>([])

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
    }, [])

    return (
        <div className="list-chat-container">
            <div className="list-chat">
                {users.map((item, index) => {
                    const image = require(`../../Assets/user/${item.img}`);
                    return <ChatItem key={index} id={item.uid!} user={item.user} image={image} status={item.online!} />
                })}
            </div>
            <Logout />
        </div>
    )
}