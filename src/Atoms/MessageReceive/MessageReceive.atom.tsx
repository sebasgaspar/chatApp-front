
import './style.css'

export function MessageReceiveAtom(props: any): JSX.Element {
    return (
        <div>
            <div className="box-message-receive">
                <p>{props.mensaje}</p>
            </div>
        </div>
    )
}