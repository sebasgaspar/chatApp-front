import { useState } from 'react'

import { signUpIn } from '../../Utils/Json/SignUpIn'
import { AlertPropsI, FormContactI, UserModel } from '../../Interfaces'

import { AlertMessage, Input } from '../../Atoms'

import { AuthService } from '../../Services/Auth/Auth.service'
import { connect } from '../../Services/Sockets/Socket.service'

import { useNavigate } from 'react-router-dom'

import './style.css'

export function LoginFormCommon(): JSX.Element {
    const authService = new AuthService()
    const navigation = useNavigate();

    const alertState: AlertPropsI = { type: '', message: '' };
    const [alertMessage, setAlertMessage] = useState<AlertPropsI>(alertState);

    const loginData: FormContactI[] = signUpIn.login

    const frmContact: any = { user: '', password: '' };
    const [login, setLogin] = useState<any>(frmContact);

    const _handleChange = (e: any) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    
    const _handleSubmit = async (e: any) => {
        e.preventDefault();
        const user: UserModel = {
            user: login.user,
            password: login.password,
        }
        try {
            const response = await authService.login(user)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.usuario))
                localStorage.setItem('uid', response.data.usuario.uid)
                connect()
                navigation("/chat")
            }
        } catch (err: any) {
            console.log(err.response)
            if (err.response.status === 404) setAlertMessage({ type: 'FAILED', message: err.response.data.msg })
            if (err.response.status === 400) setAlertMessage({ type: 'FAILED', message: err.response.data.msg })
            throw err
        }
    }

    return (
        <form action="" className="form-container my-8 px-4" onSubmit={_handleSubmit}>
            <div>
                {loginData.map((item, index) => {
                    return <Input
                        key={index}
                        name={item.name}
                        type={item.type}
                        value={login[`${item.name}`]}
                        placeholder={item.placeholder}
                        label={item.label}
                        required={item.required}
                        onChange={_handleChange}
                    />
                })}
            </div>
            <div className="btn-container">
                <button>Login</button>
            </div>
            {alertMessage.type
                ? <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />
                : null
            }
        </form>
    )
}