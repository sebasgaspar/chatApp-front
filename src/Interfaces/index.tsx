
export interface SignUpIn {
    login: FormContactI[]
    register: FormContactI[]
}

export interface FormContactI {
    label: string
    name: string
    placeholder: string
    type: string
    required: boolean
}

export interface InputPropsI {
    onChange?: React.ChangeEventHandler<any>
    value: string
    label: string
    name: string
    type: string
    placeholder: string
    required: boolean
}

export interface AlertPropsI {
    type: string
    message: string
    setAlertMessage?: any
}

export interface ChatItemProps {
    id: string
    user: string
    image: string
    status: boolean
}

export interface ChatMessage {
    de: string
    para: string
    mensaje: string
}

export interface UserModel {
    uid?: string
    user: string;
    password?: string
    online?: boolean
    img?: string
}
