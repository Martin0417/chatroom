/**
 * 监听socket消息
 */
import {
    cacheSocket, addUser,
    hideLoginModal,
    showFormBox,
    appendToMessageList,
    refreshUserList
} from 'actions';
import {message} from 'antd';

export default function listenSocket (socket, dispatch){
    /**
     * 缓存socket
     */
    dispatch(cacheSocket(socket));
    /**
     * 当前用户加入成功
     */
    socket.on('self:add user success', (name) => {
        dispatch(hideLoginModal());
        dispatch(showFormBox());
        dispatch(addUser(name));
    });
    /**
     * 有用户加入
     */
    socket.on('all:user join', (user) => {
        message.info(`${user.name} 加入聊天，一起说几句吧!`, 1);
        // dispatch(appendToMessageList({
        //     type: 'text',
        //     role: 'system',
        //     content: `${user.name} 加入聊天，一起说几句吧!`
        // }));
    });
    /**
     * 有用户离开
     */
    socket.on('all:user leave', (user) => {
        message.info(`${user.name} 悄悄地离开了...`, 1);
        // dispatch(appendToMessageList({
        //     type: 'text',
        //     role: 'system',
        //     content: `${user.name} 悄悄地离开了...`
        // }));
    });
    /**
     * 接收聊天信息
     */
    socket.on('other:chat message', (msg) => {
        dispatch(appendToMessageList({
            type: 'text',
            content: msg
        }));
    });
    /**
     * 接收图片信息 
     */
    socket.on('other:chat image', (name, img) => {
        dispatch(appendToMessageList({
            type: 'image',
            content: name,
            imgUrl: img
        }));
    });
    /**
     * 接受私信
     */
    socket.on('private:chat message', (name, msg) => {
        dispatch(appendToMessageList({
            type: 'text',
            role: 'private',
            content: `${name}对我说：${msg}`
        }));
    });
    /**
     * 系统通知自己
     */
    socket.on('self:notify self', (msg) => {
        dispatch(appendToMessageList({
            type: 'text',
            role: 'self',
            content: msg
        }));
    });
    /**
     * 刷新用户列表 
     */
    socket.on('all:refresh userList', (userList) => {
        dispatch(refreshUserList(userList));
    });
}