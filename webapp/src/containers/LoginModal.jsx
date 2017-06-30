import {connect} from 'react-redux';
import {message} from 'antd';
import {setBtnLoading} from 'actions';
import LoginModal from 'components/LoginModal';

const mapStateToProps = (state, ownProps) => {
    let {visible, loading} = state.loginModal;
    let {socket} = state;
    return {
        visible,
        loading,
        socket
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //确认用户名
        onConfirmName({name, socket}){
            if(name.trim()){
                dispatch(setBtnLoading());
                socket.instance.emit('add user', name);
            }else{
                message.error('请输入用户名');
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);