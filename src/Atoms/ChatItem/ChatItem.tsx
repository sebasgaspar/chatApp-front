
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../../Interfaces'
import setChatAction from '../../redux/actions/ChatAction'

import './style.css'

function ChatItemAtom(props: any): JSX.Element {

    const navigation = useNavigate();


    const _handleSingleChat = () => {
        const user: UserModel = {
            uid: props.id,
            user: props.user,
            img: props.image
        }
        props.setChatActions(user)
        props.setSelected(props.index)
        if (window.matchMedia("(max-width: 767px)").matches) {
            navigation("/singlechat")
        }
    }

    const _isSelected = () => {
        if (props.selected === props.index) return true
        return false
    }

    return (
        <div className={`chat-box ${_isSelected() ? 'selected' : ''}`} onClick={_handleSingleChat}>
            <img src={props.image} alt="Avatar" className="avatar-img" />
            <div className="info-user">
                <label className="label-user">{props.user}</label>
            </div>
            <div className={`user-status ${props.status ? 'connect' : 'disconnect'}`}></div>
        </div>
    )
}

const _mapDispatchToProps = (dispatch: any) => ({
    setChatActions: (chatSelected: UserModel) => dispatch(setChatAction(chatSelected))
})

export default connect(null, _mapDispatchToProps)(ChatItemAtom)