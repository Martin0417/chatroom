import './index.css';
import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ReactDom from 'react-dom';
import reducers from 'reducers';
import {showLoginModal} from 'actions';
import listenSocket from 'util/listenSocket';
import Page from 'containers/Page';
import LoginModal from 'containers/LoginModal';

if (module.hot) {
    module.hot.accept();
}

let store = createStore(reducers);

class Index extends Component{

    componentDidMount(){
        let socket = io();
        let dispatch = store.dispatch.bind(store);
        dispatch(showLoginModal());//弹出登录弹窗
        listenSocket(socket, dispatch);
    }

    render(){
        return (
            <div>
                <Page />
                <LoginModal />
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

