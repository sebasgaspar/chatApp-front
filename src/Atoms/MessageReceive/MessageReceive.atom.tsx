
import './style.css'

export function MessageReceiveAtom(props: any): JSX.Element {
    return (
        <div>
            <div className={`box-message-receive ${props.animate ? 'animate-bottom' : ''}`}>
                <p>{props.mensaje}</p>
            </div>
        </div>
    )
}