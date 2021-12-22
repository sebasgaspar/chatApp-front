
import { AuthService } from '../../Services/Auth/Auth.service'
import { useNavigate } from "react-router-dom";

import './style.css'

export function LogoutAtom(): JSX.Element {
    const authService = new AuthService()

    const navigation = useNavigate();

    const _handleLogout = () => {
        authService.logout()
        navigation("/")
    }

    return (
        <div className="btn-logout">
            <button onClick={_handleLogout}>Logout</button>
        </div>
    )
}