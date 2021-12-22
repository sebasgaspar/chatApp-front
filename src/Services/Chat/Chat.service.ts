import axios from "axios";

export class ChatService {
    private url = `${process.env.REACT_APP_URL_BACK}/mensajes`;

    async getMessage(idUser: string) {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': `${localStorage.getItem('token')}`!
            }
        };
        return axios.get(`${this.url}/${idUser}`, options)
    }
}