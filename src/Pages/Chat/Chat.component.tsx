import { ListChat, Chat } from "../../Components";

import './style.css'
export function ChatPage(): JSX.Element {
    return (
        <div className="container-chat">
            <ListChat />
            <Chat />
        </div>
    )
}