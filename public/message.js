/**
 * 消息基类
 */
class message{
    constructor(...args){
        this._msg = this.tpl(...args);
    }
    getMsg(){
        return this._msg;
    }
    tpl(msg='', clazz=''){
        return `<tr class='${clazz}'><td>${msg}</td></tr>`;
    }
}
/**
 * 文本消息
 */
class msg_message extends message{
    constructor(...args){
        super(...args);
    }
}

class msg_normal extends msg_message{
    constructor(msg){
        super(msg);
    }
}

class msg_system extends msg_message{
    constructor(msg){
        super(`（系统）${msg}`, 'danger');
    }
}

class msg_private extends msg_message{
    constructor(msg){
        super(`（私信）${msg}`, 'warning');
    }
}

class msg_self extends msg_message{
    constructor(msg){
        super(`（我）${msg}`, 'success');
    }
}
/**
 * 图片消息
 */
class img_message extends message{
    constructor(prefix='', clazz='', name='', imgUrl=''){
        super(`${prefix}${name}：<img width="60%" src="${imgUrl}">`, clazz);
    }
}

class img_normal extends img_message{
    constructor(...args){
        super('', '', ...args);
    }
}

class img_self extends img_message{
    constructor(...args){
        super('（我）', 'success', ...args);
    }
}

export default {
    msg_normal, 
    msg_system, 
    msg_private, 
    msg_self,

    img_normal,
    img_self
}