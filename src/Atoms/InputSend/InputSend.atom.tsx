
import { useState } from 'react'
import sendImg from '../../Assets/img/send-message.png'

import './style.css'

export function InputSendAtom(props: any): JSX.Element {
    const [message, setMessage] = useState('')

    const _handledSend = (e: any, isSubmit = false) => {
        if (e.key === 'Enter' || isSubmit) {

            props.setNewMessage({ ...props.newMessage, 'mensaje': message })
            setMessage('')
        }

    }

    const _handledChange = (e: any) => {
        const { value } = e.target;
        setMessage(value)

    }
    const _getDisabledInput = () => {
        if (!props.newMessage) return true
        if (!props.newMessage.para) return true
        return false
    }
    return (
        <div className="input-box">
            <input type="text" value={message} onChange={_handledChange} onKeyPress={_handledSend}
                disabled={_getDisabledInput()} />
            <button onClick={(e) => _handledSend(e, true)} >
                <img src={sendImg} alt="" />
            </button>
        </div>
    )
}