# 基于websocket、react的聊天室

### 启动
- `npm i`
- 开发环境：`npm run dev`
- 生产环境：`npm run build`

### 技术栈
- 服务端：`nodejs, socket.io, express`
- 客户端：`socket.io, react, redux, antd, webpack, bootstrap`

### Improvements
代码主要是对[socket.io官方聊天室](httphttps://socket.io/get-started/chat/)例子的**完善**和**前端重构**，有以下几点：

1. Broadcast a message to connected users when someone connects or disconnects
1. Add support for nicknames
1. Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
1. Add “{user} is typing” functionality
1. Show who’s online
1. Add private messaging

### Todo
- session
- ...

### 前端重构前版本
- 客户端技术栈： `socket.io, jquery, bootstrap, script-type-module`
- 分支：[feature_jqueryES6ScriptModule_0622](httphttps://github.com/Martin0417/websocket-chatroom/tree/feature_jqueryES6ScriptModule_0622)