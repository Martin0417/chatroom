$(function () {

    class chatRoom {
        constructor() {
            this.socket = io();
            this.user = {};
            this.getNode();
            this.toLogin();
            this.listenSocket();
            this.privateChar();
        }
        getNode() {
            Object.assign(this, {
                loginBox : $('#j-loginBox'),
                nameInput: $('#j-nameInput'),
                msgForm  : null,
                msgInput : null,
                msgBox   : $('#j-messages'),
                userListBox : $("#j-userList")
            });
        }
        /**
         * 提示登录
         */
        toLogin() {
            this.loginBox
            .modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            })
            .on('shown.bs.modal', () => {
                this.nameInput.focus()
            })
            .on('hide.bs.modal', () => {
                var name = this.nameInput.val().trim();
                if (name === '') {
                    return false;
                }

                this.user.name = name;
                this.socket.emit('add user', name);
                this.afterLogin();
            });
        }
        /**
         * 登录成功后
         */
        afterLogin() {
            $('body').append(
                `<div class="formBox">
                    <form id="j-msgForm" class="msgForm" action="">
                        <input id="j-msgInput" class="msgInput" autocomplete="off" /><button>发送</button>
                    </form>
                    <label class="imgLabel" for="j-imgInput">发送图片</label>
                    <form id="j-imgForm" class="imgForm" action="">
                        <input id="j-imgInput" type="file" accept="image/*"/>
                    </form>
                </div>`
            );

            Object.assign(this, {
                msgForm: $('#j-msgForm'),
                msgInput: $('#j-msgInput'),
                imgInput: $('#j-imgInput')
            });
            //绑定消息发送事件
            this.bindSendMsg();
            //绑定图片发送
            this.bindSendImg();
            //绑定是否正在输入事件
            this.bindTyping();
        }
        /**
         * 发送聊天信息 
         */
        bindSendMsg() {
            this.msgForm.submit(() => {
                var value = this.msgInput.val().trim();
                if (value === '') {
                    return false;
                }
                
                if(this.isPrivate(value)){
                    let {name, msg} = this.getPrivateInfo(value);
                    this.msgInput.val(value.replace(msg, ''));
                    this.newMsg(`（私信）我对${name}说：${msg}`, 'warning');
                }else{
                    this.msgInput.val('');
                    this.newMsg(`（我）${this.user.name}：${value}`, 'success');
                }

                this.socket.emit('chat message', value);
                this.msgInput.focus();
                return false;
            });
        }
        /**
         * 发送图片 
         */
        bindSendImg() {
            this.imgInput.change((e) => {
                let input = e.target;
                let files = input.files || [];
                if(files.length > 0){
                    if(this.supportFileReader()){
                        let file = files[0];
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            let imgUrl = e.target.result;
                            this.newImg(`（我）${this.user.name}`, imgUrl, 'success');
                            this.socket.emit('chat image', this.user.name , imgUrl);
                        }
                        reader.readAsDataURL(file);
                    }else{
                        input.value = '';
                        alert('很遗憾！您的浏览器不支持file reader，无法发送图片');
                        return false;
                    }
                }
            });
        }
        supportFileReader(){
            let support = !!FileReader;
            this.supportFileReader = function(){
                return support;
            }
            return support;
        }
        /**
         * 私信
         */
        _privateReg() {
            return /^发送给\s(.+)\((\d{16})\)\：(.*)/g;
        }
        isPrivate(_msg) {
            return this._privateReg().test(_msg);
        }
        getPrivateInfo(_msg) {
            let {0 : name, 1 : id, 2 : msg} = (this._privateReg().exec(_msg)||[]).slice(1);
            return {id, name, msg}
        }
        /**
         * 是否正在输入 
         */
        bindTyping() {
            this.msgInput
            .focus(() => {
                this.socket.emit('user typing');
            })
            .blur(() => {
                this.socket.emit('user not typing');
            });
        }
        /**
         * 监听socket消息
         */
        listenSocket() {
            let socket = this.socket;
            /**
             * 当前用户加入成功
             */
            socket.on('self:add user success', () => {
                delete this.loginBox;
                delete this.nameInput;
            });
            /**
             * 有用户加入
             */
            socket.on('all:user join', (user) => {
                this.newMsg(`（系统）${user.name} 加入聊天，一起说几句吧!`, 'danger');
            });
            /**
             * 有用户离开
             */
            socket.on('all:user leave', (user) => {
                this.newMsg(`（系统）${user.name} 悄悄地离开了...`, 'danger');
            });
            /**
             * 接收聊天信息 
             */
            socket.on('other:chat image', (name, msg) => {
                this.newImg(name, msg);
            });
            /**
             * 接收图片信息 
             */
            socket.on('other:chat message', (msg) => {
                this.newMsg(msg);
            });
            /**
             * 接受私信
             */
            socket.on('private:chat message', (name, msg) => {
                this.newMsg(`（私信）${name}对我说：${msg}`, 'warning');
            });
            /**
             * 刷新用户列表 
             */
            socket.on('all:refresh userList', (userList) => {
                this.userListBox
                    .html(
                        userList.reduce((acc, val) => {
                            return `${acc}
                            <li class='list-group-item' data-toggle="tooltip" data-placement="top" title="双击私聊" uid="${val.id}" uname="${val.name}">
                                ${val.name}${val.typing ? '&nbsp;|&nbsp;正在输入...' : ''}
                                ${this.getBadge(val)}
                            </li>`;
                        }, '')
                    )
                    .children()
                    .tooltip();
            });
            /**
             * 系统通知自己
             */
            socket.on('self:notify self', (msg) => {
                this.newMsg(msg, 'danger');
            });
        }
        privateChar(){
            this.userListBox.delegate('.list-group-item').click((e) => {
                let target = $(e.target);
                let uid = target.attr('uid');
                let uname = target.attr('uname');
                this.msgInput
                .val(`发送给 ${uname}(${uid})：`)
                .focus();
            });
        }
        
        newMsg(msg='', clazz='') {
            return this.msgBox.append(`<tr class='${clazz}'><td>${msg}</td></tr>`);
        }
        newImg(name='', imgUrl='', clazz='') {
            this.newMsg(`${name}：<img width="60%" src="${imgUrl}">`);
        }
        getBadge(user={}) {
            return user.private > 0 ? `<span class="badge">${user.private}</span>` : '';
        }
    }

    new chatRoom();
});