import {connect} from 'react-redux';
import {message} from 'antd';
import {setBtnLoading} from '../redux/actions';
import LoginModal from '../components/LoginModal';

const mapStateToProps = (state, ownProps) => {
    let {visible, loading} = state.loginModal;
    return {
        visible,
        loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //确认用户名
        onConfirmName(name){
            if(name.trim()){
                let state = ownProps.store.getState();
                dispatch(setBtnLoading());
                state.socket.instance.emit('add user', name);
            }else{
                message.error('请输入用户名');
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);