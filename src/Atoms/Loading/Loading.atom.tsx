
import { connect } from 'react-redux';

import './style.css'

function LoadingAtom(props: any) {
    return (
        (props.loadingState.loadingSelected)
            ? <div id="loading" className='loading'>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
            </div>
            : null
    )
}
const mapStateToProps = (state: any) => ({
    ...state
})
export default connect(mapStateToProps, {})(LoadingAtom)