import { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { ChatService } from '../../Services/Chat/Chat.service';
import { MessageSend, MessageReceive, InputSend } from "../../Atoms/";
import { ChatMessage } from "../../Interfaces";
import { validateSocket } from "../../Utils/Functions/functions";

import './style.css'

function ChatComponent(props: any): JSX.Element {

    const chatService = new ChatService()

    const [message, setMessage] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState<ChatMessage>();


    const _getMessage = async () => {
        if (props.chatState.chatSelected) {
            const mensaje = await chatService.getMessage(props.chatState.chatSelected)
            setMessage(mensaje.data.mensaje)
        }
    }
    useEffect(() => {
        let socket = validateSocket();
        socket.on('mensaje-personal', (data: any) => _getMessage());

        if (!props.chatState.chatSelected) {
            setMessage([])
        }
        else {
            const newMensaje: ChatMessage = {
                de: localStorage.getItem('uid')!,
                para: props.chatState.chatSelected,
                mensaje: ''
            }
            setNewMessage(newMensaje)
            _getMessage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.chatState.chatSelected]);

    useEffect(() => {
        let socket = validateSocket();
        if (newMessage?.mensaje !== '') {
            socket.emit('mensaje-personal', {
                ...newMessage
            });
            const newMensaje: ChatMessage = {
                de: localStorage.getItem('uid')!,
                para: props.chatState.chatSelected,
                mensaje: ''
            }
            _getMessage()
            setNewMessage(newMensaje)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage]);

    const ref = useRef(document.createElement("div"))
    const scrollToBottom = () => {
        ref.current.scrollIntoView(false)
    }
    useEffect(() => {
        scrollToBottom()
    });
    return (
        <div className="message-container" >
            <div className="messages-box" >
                <div style={{ display: 'grid' }} ref={ref}>
                    {message.map((item, index) => {
                        if (`${item.de}` === localStorage.getItem('uid')) {
                            return <MessageSend key={index} mensaje={item.mensaje} />
                        } else {
                            return <MessageReceive key={index} mensaje={item.mensaje} />
                        }
                    })
                    }
                </div>
            </div>
            <InputSend setMessage={setNewMessage} message={newMessage} />
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    ...state
})
export default connect(mapStateToProps, {})(ChatComponent)