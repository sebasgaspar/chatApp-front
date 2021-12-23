import { ListChat, Chat } from "../../Components";

import './style.css'
export function ChatPage(): JSX.Element {
    return (
        <div className="container-chat">
            <ListChat />
            <div className="chat-component-container">
            <Chat />
            </div>
        </div>
    )
}