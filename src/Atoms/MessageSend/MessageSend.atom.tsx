
import './style.css'

export function MessageSendAtom(props: any): JSX.Element {
    return (
        <div>
            <div className={`box-message-send ${props.animate ? 'animate-bottom' : ''}`}>
                <p>{props.mensaje}</p>
            </div>
        </div>
    )
}