import { AlertPropsI } from "../../Interfaces"

import './style.css'

export function AlertMessageAtom(props: AlertPropsI): JSX.Element {
    
    const closeAlert = () => {
        props.setAlertMessage({ type: '', message: '' })
    }

    function SuccessAlert(): JSX.Element {
        return (
            <div className="success-alert">
                <div slot="avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-alert">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div className="message-alert">
                    {props.message}
                </div>
                <div className="close-container">
                    <div onClick={closeAlert}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="close-alert">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
    function FailedAlert(): JSX.Element {
        return (
            <div className="failed-alert">
                <div slot="avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-alert">
                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
                <div className="message-alert">
                    {props.message}
                </div>
                <div className="close-container">
                    <div onClick={closeAlert}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="close-alert">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    const _getAlert = (): JSX.Element => {
        if (props.type === 'SUCCESS') {
            return <SuccessAlert />
        } else if (props.type === 'FAILED') {
            return <FailedAlert />
        } else {
            return (<div></div>)
        }
    }
    return _getAlert()

}