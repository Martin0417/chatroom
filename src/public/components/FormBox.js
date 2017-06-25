/**
 * 发送消息输入框
 */
import React from 'react';

const FormBox = ({list=[]}) => (
    <div className="formBox">
        <form id="j-msgForm" className="msgForm" action="">
            <input id="j-msgInput" className="msgInput" autoComplete="off" /><button>发送</button>
        </form>
        <label className="imgLabel" htmlFor="j-imgInput">发送图片</label>
        <form id="j-imgForm" className="imgForm" action="">
            <input id="j-imgInput" type="file" accept="image/*"/>
        </form>
    </div>
);

export default FormBox;