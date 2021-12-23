import { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { ChatService } from '../../Services/Chat/Chat.service';
import { MessageSend, MessageReceive, InputSend } from "../../Atoms/";
import { ChatMessage, UserModel } from "../../Interfaces";
import { validateSocket } from "../../Utils/Functions/functions";

import './style.css'
import { useNavigate } from "react-router-dom";

function ChatComponent(props: any): JSX.Element {
    const socket = validateSocket();

    const chatService = new ChatService()

    const [message, setMessage] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState<ChatMessage>();

    const _getMessage = async () => {
        if (props.chatState.chatSelected.uid) {
            const mensaje = await chatService.getMessage(props.chatState.chatSelected.uid)
            setMessage(mensaje.data.mensaje)
        }
    }

    useEffect(() => {
        if (!props.chatState.chatSelected) {
            setMessage([])
        }
        else {
            const newMensajeState: ChatMessage = {
                de: localStorage.getItem('uid')!,
                para: props.chatState.chatSelected.uid,
                mensaje: ''
            }
            setNewMessage(newMensajeState)
            _getMessage()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.chatState.chatSelected]);

    useEffect(() => {
        socket.on('mensaje-personal', (data: any) => setMessage(arrayData => [...arrayData, data]));
    }, [socket]);

    useEffect(() => {
        if (newMessage !== undefined && newMessage?.mensaje !== '') {
            socket.emit('mensaje-personal', {
                ...newMessage
            });
            setMessage(arrayData => [...arrayData, newMessage]);
            const newMensajeState: ChatMessage = {
                de: localStorage.getItem('uid')!,
                para: props.chatState.chatSelected.uid,
                mensaje: ''
            }
            setNewMessage(newMensajeState)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage]);

    const ref = useRef(document.createElement("div"))
    const scrollToBottom = () => {
        if (ref) ref.current.scrollIntoView(false)
    }
    useEffect(() => {
        scrollToBottom()
    });
    return (
        <div className="message-container" >
            <InfoUserAtom
                user={props.chatState.chatSelected.user}
                img={props.chatState.chatSelected.img} />
            <div className="messages-box" >
                {(props.chatState.chatSelected.uid)
                    ? <div className="messages-items" ref={ref}>
                        {message.map((item, index) => {
                            if (`${item.de}` === localStorage.getItem('uid')) {
                                return <MessageSend
                                    key={index}
                                    mensaje={item.mensaje}
                                />
                            } else {
                                return <MessageReceive
                                    key={index}
                                    mensaje={item.mensaje}
                                />
                            }
                        })
                        }
                    </div>
                    : <NoUserSelected />
                }
            </div>
            <InputSend setNewMessage={setNewMessage} newMessage={newMessage} />
        </div>
    )
}
function NoUserSelected(): JSX.Element {

    return (
        <div className="no-user-selected">
            <h3>No chat selected</h3>
        </div>
    )
}

function InfoUserAtom(props: UserModel): JSX.Element {
    const navigation = useNavigate();

    const _handleBack = () => {
        navigation("/chat")
    }
    return (
        (props.user)
            ? <div className="info-user-container">
                <i className="back-icon" onClick={_handleBack}></i>
                <img src={props.img} alt="Avatar" className="avatar-img" />
                <label className="label-user">{props.user}</label>
            </div>
            : <div></div>
    )
}

const mapStateToProps = (state: any) => ({
    ...state
})
export default connect(mapStateToProps, {})(ChatComponent)