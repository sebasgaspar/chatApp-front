import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signUpIn } from "../../Utils/Json/SignUpIn";
import { AlertPropsI, FormContactI, UserModel } from "../../Interfaces";
import { AlertMessage, Input } from "../../Atoms";

import { connect } from '../../Services/Sockets/Socket.service'
import { AuthService } from '../../Services/Auth/Auth.service'

export function RegisterFormCommon(): JSX.Element {
    const authService = new AuthService()
    const navigation = useNavigate();

    const registerData: FormContactI[] = signUpIn.register

    const alertState: AlertPropsI = { type: '', message: '' };
    const [alertMessage, setAlertMessage] = useState<AlertPropsI>(alertState);

    const frmContact: any = { user: '', password: '', 'repeat-password': '' };
    const [register, setRegister] = useState<any>(frmContact);

    const _handleChange = (e: any) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
    };
    const _handleSubmit = async (e: any) => {
        e.preventDefault();
        if (register.password !== register['repeat-password']) {
            setAlertMessage({ type: 'FAILED', message: 'Las contraseñas no coinciden' })
            return
        }
        const user: UserModel = {
            user: register.user,
            password: register.password,
            img:'avatar-1.png'
        }
        try {
            const response = await authService.register(user)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.usuario))
                localStorage.setItem('uid', response.data.usuario.uid)
                connect()
                navigation("/chat")
            }
        } catch (err: any) {
            if (err.response.status === 400) setAlertMessage({ type: 'FAILED', message: err.response.data.msg })
            throw err
        }
    }

    return (
        <form action="" className="form-container" onSubmit={_handleSubmit}>
            <div>
                {registerData.map((item, index) => {
                    return <Input
                        key={index}
                        name={item.name}
                        type={item.type}
                        value={register[`${item.name}`]}
                        placeholder={item.placeholder}
                        label={item.label}
                        required={item.required}
                        onChange={_handleChange}
                    />
                })}
            </div>
            <div className="btn-container">
                <button type="submit">Registrar</button>
            </div>
            {alertMessage.type
                ? <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />
                : null
            }
        </form>
    )
}