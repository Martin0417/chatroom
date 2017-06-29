/**
 * 发送消息输入框
 */
import React, {Component} from 'react';

class FormBox extends Component{
    constructor(){
        super();
    }

    componentDidUpdate(){
        this.refs.input.focus();
    }

    render(){
        let {
            socket, inputValue,
            handleInputChange, handleInputFocus, handleInputBlur, handleInputKeyPress, 
            handleButtonClick,
            handleImgInputChange
        } = this.props;
        
        return (
            <div className="formBox">
                <form className="msgForm" action="">
                    <input ref='input' autoFocus className="msgInput" autoComplete="off" 
                        placeholder="随便说几句吧~" 
                        value={inputValue} 
                        onChange={handleInputChange.bind(this)}
                        onFocus={handleInputFocus.bind(this, socket)} 
                        onBlur={handleInputBlur.bind(this, socket)} 
                        onKeyPress={handleInputKeyPress.bind(this, inputValue, socket)}/>
                    <button onClick={handleButtonClick.bind(this, inputValue, socket)}>发送</button>
                </form>
                <label className="imgLabel" htmlFor="j-imgInput">发送图片</label>
                <form className="imgForm" action="">
                    <input id="j-imgInput" type="file" accept="image/*" onChange={handleImgInputChange.bind(this, socket)} />
                </form>
            </div>
        )
    }
}

export default FormBox;