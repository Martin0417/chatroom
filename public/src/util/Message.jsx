/**
 * 消息方法
 */
import React from 'react';

export function createMsg({key, clazz='', content=''}){
    return <tr key={key} className={clazz}>
                <td>
                    {
                        content.map((value, i)=>{
                            return <span key={i}>{value}</span>
                        })
                    }
                </td>
            </tr>;
}

export function getRoleInfo(role) {
    switch(role){
        case 'system':
            return {roleText: '系统', clazz: 'danger'};
        case 'private':
            return {roleText: '私信', clazz: 'warning'};
        case 'self':
            return {roleText: '我', clazz: 'success'};
        default:
            return {roleText: '', clazz: ''};
    }
}

export function isPrivate(msg){
    return _privateReg().test(msg);
}

export function getPrivateInfo(_msg) {
    let {0 : name, 1 : id, 2 : msg} = (_privateReg().exec(_msg)||[]).slice(1);
    return {id, name, msg}
}

function _privateReg() {
    return /^发送给\s(.+)\((\d{16})\)\：(.*)/g;
}
