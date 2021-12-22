import { LoginForm } from "../../Common";

import logo from '../../Assets/img/Logo.png'

import './style.css'
export function LoginComponent(props: any): JSX.Element {
    const _setLogin = () => {
        props.setLogin(false)
    }
    return (
        <div className="login-container">
            <img src={logo} alt="" />
            <h2 className="label-signUpIn">Login</h2>
            <LoginForm />
            <div className="signInUp-info">
                <h3>¿No tienes una cuenta?</h3>
                <h4 onClick={_setLogin}>Registrate</h4>
            </div>
        </div>
    )
}