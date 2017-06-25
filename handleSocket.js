const _ = require('./util');

const userList = [];
const socketMap = {};

/**
 * 处理socket连接
 */
let handle = (io, socket) => {
    // 缓存当前用户的信息
    let user = {
        id: null, name: null, typing: null, color: null, private: 0
    };
    
    let refreshUserList  = _.boardcast(io, 'refresh userList');//刷新用户列表
    let userJoin         = _.boardcast(io, 'user join');//用户加入
    let userLeave        = _.boardcast(io, 'user leave');//用户离开
    let privateChat      = _.notifyone('chat message');//发送私信给某人
    let chatMessage      = _.notifyother(socket, 'chat message');//发送消息给其他人
    let chatImage        = _.notifyother(socket, 'chat image');//发送图片给其他人
    let addUserSuccess   = _.notifyself(socket, 'add user success');//用户添加成功
    let notifyself       = _.notifyself(socket, 'notify self');//系统通知自己

    _.log('a user connected');
    // 初始化在线用户列表
    refreshUserList(userList);
    /**
     * 接受客户端的聊天信息
     */
    socket.on('chat message', (_msg) => {
        if(_.isPrivate(_msg)){
            let {id, name, msg} = _.getPrivateInfo(_msg);
            let targetSocket = socketMap[id];

            if(targetSocket){
                privateChat(targetSocket, user.name, msg);
            }else{//已下线
                notifyself(`${name} 已下线，消息未送达...`);
            }
        }else{
            let msg = `${user.name}：${_msg}`;
            chatMessage(msg);
        }
    });
    /**
     * 接受客户端的图片信息
     */
    socket.on('chat image', (name, img) => {
        chatImage(name, img);
    });
    /**
     * 新建用户
     */
    socket.on('add user', (name) => {
        let id = _.getRamId();
        let color = _.getRamColor();
        Object.assign(user, {id, name, color});

        socketMap[id] = socket;
        userList.push(user);

        addUserSuccess(name);
        refreshUserList(userList);
        userJoin(user);
    });
    /**
     * 客户端断开连接
     */
    socket.on('disconnect', () => {
        if(!user.id){
            return false;
        }
        
        userList.forEach((u, index) => {
            if(u.id === user.id){
                userList.splice(index, 1);
            }
        });
        
        userLeave(user);
        refreshUserList(userList);

        delete socketMap[user.id];
        user = undefined;
    });
    /**
     * 客户端正在输入
     */
    socket.on('user typing', () => {
        user.typing = true;
        refreshUserList(userList);
    });
    /**
     * 客户端停止输入
     */
    socket.on('user not typing', () => {
        user.typing = false;
        refreshUserList(userList);
    });
} 

module.exports = handle;