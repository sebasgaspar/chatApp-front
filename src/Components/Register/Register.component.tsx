import { RegisterForm } from "../../Common";

import logo from '../../Assets/img/Logo.png';

import './style.css'
export function RegisterComponent(props: any): JSX.Element {
    const _setLogin = () => {
        props.setLogin(true)
    }
    return (
        <div className="register-container">
            <img src={logo} alt="" />
            <h2 className="label-signUpIn">Registro</h2>
            <RegisterForm />
            <div className="signInUp-info">
                <h3>¿Ya tienes una cuenta?</h3>
                <h4 onClick={_setLogin}>Login</h4>
            </div>
        </div>
    )
}