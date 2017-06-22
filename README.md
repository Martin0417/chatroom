# 基于websocket的聊天室

### 启动
`npm start`

### 依赖
- 服务端：socket.io, express
- 客户端：socket.io, jquery, bootstrap, script-type-module

### Improvements
代码主要是对[socket.io官方聊天室](httphttps://socket.io/get-started/chat/)例子的完善，有以下几点：

1. Broadcast a message to connected users when someone connects or disconnects
1. Add support for nicknames
1. Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
1. Add “{user} is typing” functionality
1. Show who’s online
1. Add private messaging

### Todo
- session
- 心跳机制
- 界面完善
- ...