import { SignUpIn } from "../../Interfaces";

export const signUpIn: SignUpIn = {
    'login': [
        {
            'label': 'Usuario',
            'name': 'user',
            'type': 'text',
            'placeholder': 'Usuario',
            'required': true
        },
        {
            'label': 'Contraseña',
            'name': 'password',
            'type': 'password',
            'placeholder': 'Contraseña',
            'required': true
        }
    ],
    'register': [
        {
            'label': 'Usuario',
            'name': 'user',
            'type': 'text',
            'placeholder': 'Usuario',
            'required': true
        },
        {
            'label': 'Contraseña',
            'name': 'password',
            'type': 'password',
            'placeholder': 'Contraseña',
            'required': true
        },
        {
            'label': 'Repita la contraseña',
            'name': 'repeat-password',
            'type': 'password',
            'placeholder': 'Contraseña',
            'required': true
        },
    ]
}