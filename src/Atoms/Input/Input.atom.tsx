
import { InputPropsI } from '../../Interfaces'

import './style.css'

export function InputAtom(props: InputPropsI): JSX.Element {
    return (
        <div className="input-atom">
            <label htmlFor={props.name}>{props.label}</label>
            <input className="text-primaryColor"
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                required={props.required}
                onChange={props.onChange}
                value={props.value}
                autoComplete="off">
            </input>
        </div>
    )
}