import {connect} from 'react-redux';
import MessageList from 'components/MessageList';

const mapStateToProps = (state, ownProps) => {
    let {messageList} = state;
    return {
        list: messageList
    };
}

export default connect(mapStateToProps)(MessageList);