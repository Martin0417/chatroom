let _ = {};

_.log = (msg) => {
    console.log(msg);
}

_.err = (msg) => {
    console.err(msg);
}

_.boardcast = (io, event) => (...arg) => {
    io.emit(`all:${event}`, ...arg);
};

_.notifyself = (socket, event) => (...arg) => {
    socket.emit(`self:${event}`, ...arg);
};

_.notifyone = (event) => (...arg) => {
    arg[0].emit(`private:${event}`, ...arg.slice(1));
};

_.notifyother = (socket, event) => (...arg) => {
    socket.broadcast.emit(`other:${event}`, ...arg);
};

_.getRamId = () => + new Date + "" + Math.floor( Math.random()*899 + 100 );

_.getRamColor = () => "#"+_.fillZero( (~~(Math.random()*16777215)).toString(16), 6 );//parseInt('ffffff', 16) or (1<<24)-1

_.fillZero = (num, len) => {
    len = len || 2;
    return (Array(len).fill(0).join('')+num).slice(-len);
}

_.now = () => new Date;

_.getTime = () => {
    let date = new Date;
    return `${this.fillZero(date.getHours())}:
            ${this.fillZero(date.getMinutes())}:
            ${this.fillZero(date.getSeconds())}`;
}

_._privateReg = () => /^发送给\s(.+)\((\d{16})\)\：(.*)/g;

_.isPrivate = (_msg) => _._privateReg().test(_msg);

_.getPrivateInfo = (_msg) => {
    let {0 : name, 1 : id, 2 : msg} = (_._privateReg().exec(_msg)||[]).slice(1);
    return {id, name, msg}
}

module.exports = _;