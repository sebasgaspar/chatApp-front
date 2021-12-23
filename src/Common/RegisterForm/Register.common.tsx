import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from 'react-redux'
import setLoadingAction from '../../redux/actions/LoadingAction'

import { signUpIn } from "../../Utils/Json/SignUpIn";
import { AlertPropsI, FormContactI, UserModel } from "../../Interfaces";
import { AlertMessage, Input } from "../../Atoms";

import { connect as connectSockect } from '../../Services/Sockets/Socket.service'
import { AuthService } from '../../Services/Auth/Auth.service'

import maleImg from '../../Assets/user/avatar-1.png'
import femaleImg from '../../Assets/user/avatar-2.png'

import './style.css'
function RegisterFormCommon({ setLoadingActions }: any): JSX.Element {
    const authService = new AuthService()
    const navigation = useNavigate();

    const registerData: FormContactI[] = signUpIn.register

    const alertState: AlertPropsI = { type: '', message: '' };
    const [alertMessage, setAlertMessage] = useState<AlertPropsI>(alertState);

    const frmContact: any = { user: '', password: '', 'repeat-password': '', gender: '' };
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
        if (register.gender === '') {
            setAlertMessage({ type: 'FAILED', message: 'Llena el campo de genero' })
            return
        }
        const user: UserModel = {
            user: register.user,
            password: register.password,
            img: register.gender
        }
        try {
            setLoadingActions(true)
            const response = await authService.register(user)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.usuario))
                localStorage.setItem('uid', response.data.usuario.uid)
                connectSockect()
                setLoadingActions(false)
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
                <GenderRadio register={register} setRegister={setRegister} />
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

function GenderRadio(props: any): JSX.Element {
    const _onChangeValue = (e: any) => {
        const { value } = e.target;
        props.setRegister({ ...props.register, 'gender': value })
    }
    return (
        <div>
            <label className="label-gender">Género</label>
            <div className="radio-gender-container" onChange={_onChangeValue}>
                <div className="gender-radio">
                    <img className="img-gender" src={maleImg} alt="Male" />
                    <input type="radio" value="avatar-1.png" name="gender" /> Male
                </div>
                <div className="gender-radio">
                    <img className="img-gender" src={femaleImg} alt="Male" />
                    <input type="radio" value="avatar-2.png" name="gender" /> Female
                </div>
            </div>
        </div>
    )
}

const _mapDispatchToProps = (dispatch: any) => ({
    setLoadingActions: (loadingSelected: boolean) => dispatch(setLoadingAction(loadingSelected))
})

export default connect(null, _mapDispatchToProps)(RegisterFormCommon)