import axios from 'axios';

import { UserModel } from '../../Interfaces';
import { dissConect } from '../Sockets/Socket.service'


export class AuthService {
    private url = `${process.env.REACT_APP_URL_BACK}/login`;

    async register(user: UserModel) {
        const body = {
            ...user
        };
        return axios.post(`${this.url}/new`, body)
    }
    async login(user: UserModel) {
        const body = {
            ...user
        };
        return axios.post(`${this.url}/`, body)
    }
    logout() {
        localStorage.clear();
        dissConect();
    }
}