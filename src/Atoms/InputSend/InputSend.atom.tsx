
import { useState } from 'react'
import sendImg from '../../Assets/img/send-message.png'

import './style.css'

export function InputSendAtom(props: any): JSX.Element {
    const [message, setMessage] = useState('')
    const _handledSend = () => {
        props.setMessage({ ...props.message, 'mensaje': message })
        setMessage('')
    }
    const _handledChange = (e: any) => {
        const { value } = e.target;
        setMessage(value)
    }
    const _getDisabledInput = () => {
        if (!props.message) return true
        if (!props.message.para) return true
        return false
    }
    return (
        <div className="input-box">
            <input type="text" value={message} onChange={_handledChange}
                disabled={_getDisabledInput()} />
            <button onClick={_handledSend}>
                <img src={sendImg} alt="" />
            </button>
        </div>
    )
}