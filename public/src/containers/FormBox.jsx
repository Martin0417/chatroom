import {connect} from 'react-redux';
import {
    appendToMessageList, 
    setInputValue,
} from 'actions';
import FormBox from 'components/FormBox';
import {createMsg, isPrivate, getPrivateInfo} from 'util/Message'
import {message} from 'antd';

const mapStateToProps = (state, ownProps) => {
    let {formBox, socket} = state;
    let {inputValue} = formBox;
    return {
        inputValue,
        socket //先传入所需的参数
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleInputChange(e){
            dispatch(setInputValue(e.target.value));
        },

        handleInputFocus(socket){
            socket.instance.emit('user typing');
        },
        handleInputBlur(socket){
            socket.instance.emit('user not typing');
        },

        handleInputKeyPress(value, socket, e){
            if(e.charCode !== 13){
                return;
            }
            prevent(e);
            sendMsg({value, socket, dispatch});
            return false;
        },
        handleButtonClick(value, socket, e){
            prevent(e);
            sendMsg({value, socket, dispatch});
        },

        handleImgInputChange(socket, e){
            let input = e.target;
            let files = input.files || [];
            if(files.length > 0){
                if(supportFileReader()){
                    let file = files[0];
                    let reader = new FileReader();

                    reader.onload = (e) => {
                        let imgUrl = e.target.result;
                        dispatch(appendToMessageList({
                            type: 'image',
                            role: 'self',
                            content: `${socket.name}`,
                            imgUrl
                        }));
                        socket.instance.emit('chat image', socket.name , imgUrl);
                    }
                    reader.readAsDataURL(file);
                    
                }else{
                    input.value = '';
                    message.error('很遗憾！您的浏览器不支持file reader，无法发送图片');
                    return false;
                }
            }
        }

    }
}

function supportFileReader(){
    return !!FileReader;
}

function prevent(e){
    e.preventDefault();
}

function sendMsg({value, socket, dispatch}){
    if(isPrivate(value)){
        let {name, msg} = getPrivateInfo(value);
        if(msg.trim() === ''){
            return message.error('请输入消息');
        }
        sendPrivateMsg({dispatch, name, msg, value});
        
    }else{
        if(value.trim() === ''){
            return message.error('请输入消息');
        }
        sendPublicMsg({dispatch, socket, value});
    }
    socket.instance.emit('chat message', value);
}

function sendPrivateMsg({dispatch, name, msg, value}){
    dispatch(appendToMessageList({
        type: 'text',
        role: 'private',
        content: `我对${name}说：${msg}`
    }));
    dispatch(setInputValue(value.replace(msg, '')));
}

function sendPublicMsg({dispatch, socket, value}){
    dispatch(appendToMessageList({
        type: 'text',
        role: 'self',
        content: `${socket.name}：${value}`
    }));
    dispatch(setInputValue(''));
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBox);