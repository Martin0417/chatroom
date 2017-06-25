import {combineReducers} from 'redux';
import {
    CACHE_SOCKET, ADD_USER, //socket
    SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL, SET_BTN_LOADING, //登录弹窗
    SHOW_FORM_BOX, //输入框
} from './actions';

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

function formBox(state = {visible: false}, action){
    switch(action.type){
        case SHOW_FORM_BOX:
            return Object.assign({}, state, {
                visible: true
            });
        default:
            return state;
    }
}

function messageList(state = [], action){
    switch(action.type){
        case 11: 
            return state;
        default: 
            return state;
    }
}

function userList(state = [], action){
    switch(action.type){
        case 11: 
            return state;
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