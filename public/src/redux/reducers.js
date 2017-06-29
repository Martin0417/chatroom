import {combineReducers} from 'redux';
import {
    CACHE_SOCKET, ADD_USER, //socket
    SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL, SET_BTN_LOADING, //登录弹窗
    SHOW_FORM_BOX, SET_INPUT_VALUE, //输入框
    APPEND_TO_MESSAGE_LIST, //消息列表
    REFRESH_USER_LIST, //用户列表
} from 'actions';

function socket(state = {instance: null, name: ''}, action){
    switch(action.type){
        case CACHE_SOCKET:
            return Object.assign({}, state, {
                instance: action.socket
            });
        case ADD_USER:
            return Object.assign({}, state, {
                name: action.name
            });
        default:
            return state;
    }
}

function loginModal(state = {visible: false,loading: false, name: ''}, action){
    switch(action.type){
        case SHOW_LOGIN_MODAL: 
            return Object.assign({}, state, {
                visible: true
            });
        case HIDE_LOGIN_MODAL: 
            return Object.assign({}, state, {
                visible: false,
                loading: false
            });
        case SET_BTN_LOADING: 
            return Object.assign({}, state, {
                loading: true
            });
        default: 
            return state;
    }
}

function formBox(state = {visible: false, inputValue: ''}, action){
    switch(action.type){
        case SHOW_FORM_BOX:
            return Object.assign({}, state, {
                visible: true
            });
        case SET_INPUT_VALUE:
            return Object.assign({}, state, {
                inputValue: action.value
            });
        default:
            return state;
    }
}

function messageList(state = [], action){
    switch(action.type){
        case APPEND_TO_MESSAGE_LIST: 
            return [...state, action.message];
        default: 
            return state;
    }
}

function userList(state = [], action){
    switch(action.type){
        case REFRESH_USER_LIST: 
            return action.userList;
        default: 
            return state;
    }
}

const app = combineReducers({
    socket,
    loginModal,
    formBox,
    messageList,
    userList
});

export default app;