
import { connect } from 'react-redux'
import setChatAction from '../../redux/actions/ChatAction'

import './style.css'

function ChatItemAtom(props: any): JSX.Element {
    const _handleSingleChat = () => {
        props.setChatActions(props.id)
    }

    return (
        <div className="chat-box" onClick={_handleSingleChat}>
            <img src={props.image} alt="Avatar" className="avatar-img" />
            <div className="info-user">
                <label className="label-user">{props.user}</label>
            </div>
            <div className={`user-status ${props.status ? 'connect' : 'disconnect'}`}></div>
        </div>
    )
}

const _mapDispatchToProps = (dispatch: any) => ({
    setChatActions: (chatSelected: any) => dispatch(setChatAction(chatSelected))
})

export default connect(null, _mapDispatchToProps)(ChatItemAtom)