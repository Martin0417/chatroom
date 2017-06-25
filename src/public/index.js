import m from './message.js';
import './index.css';
import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ReactDom from 'react-dom';
import reducers from './redux/reducers';
import {
    cacheSocket, addUser, 
    showLoginModal, hideLoginModal,
    showFormBox
} from './redux/actions';

import Page from './containers/Page';
import LoginModal from './containers/LoginModal';

if (module.hot) {
    module.hot.accept();
}

let store = createStore(reducers);

class Index extends Component{

    componentDidMount(){
        let socket = io();        
        store.dispatch(cacheSocket(socket));//缓存socket
        store.dispatch(showLoginModal());//弹出登录弹窗
        this._listenSocket(socket, store);
    }

    _listenSocket(socket, store){
        socket.on('self:add user success', (name) => {
            store.dispatch(hideLoginModal());
            store.dispatch(showFormBox());
            store.dispatch(addUser(name));
        });
    }

    render(){
        return (
            <div>
                <Page />
                <LoginModal store={store} />{/*直接传入store是否合理??*/}
            </div>
        );
    }

}

ReactDom.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.querySelector('#chartroom')
);

