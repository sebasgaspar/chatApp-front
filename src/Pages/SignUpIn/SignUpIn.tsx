import { useState } from "react";
import { Login, Register } from "../../Components";
import curveBackground from '../../Assets/backgrounds/CurveDegradado.png'

import './style.css'

export function SignUpInPage(): JSX.Element {
    const [login, setLogin] = useState(true)
    return (
        <div>
            <div className="signUp-background">
                <img id="imgCurve-1" src={curveBackground} alt="backround" />
            </div>
            {login
                ? <Login setLogin={setLogin} />
                : <Register setLogin={setLogin} />
            }
        </div>
    )
}