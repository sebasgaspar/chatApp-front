import axios from 'axios';


export class UserService {
    private url = `${process.env.REACT_APP_URL_BACK}/usuarios`;
    async getUser() {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': `${localStorage.getItem('token')}`!
            }
        };
        return axios.get(`${this.url}/`, options);
    }
}