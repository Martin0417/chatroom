/**
 * action类型
 */

//缓存socket
export const CACHE_SOCKET = 'CACHE_SOCKET';
export const ADD_USER = 'ADD_USER';

//登陆弹窗
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';
export const SET_BTN_LOADING = 'SET_BTN_LOADING';

//输入框
export const SHOW_FORM_BOX = 'SHOW_FORM_BOX';
export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';

//消息列表
export const APPEND_TO_MESSAGE_LIST = 'APPEND_TO_MESSAGE_LIST';

//用户列表
export const REFRESH_USER_LIST = 'REFRESH_USER_LIST';

/**
 * action创造函数（传递参数）
 */

//socket
export function cacheSocket(socket){
    return {type: CACHE_SOCKET, socket}
}
export function addUser(name){
    return {type: ADD_USER, name}
}

//登陆弹窗
export function showLoginModal(){
    return {type: SHOW_LOGIN_MODAL}
}
export function hideLoginModal(){
    return {type: HIDE_LOGIN_MODAL}
}
export function setBtnLoading(){
    return {type: SET_BTN_LOADING}
}

//输入框
export function showFormBox(){
    return {type: SHOW_FORM_BOX}
}
export function setInputValue(value){
    return {type: SET_INPUT_VALUE, value}
}

//消息列表
export function appendToMessageList(message){
    return {type: APPEND_TO_MESSAGE_LIST, message}
}

//用户列表
export function refreshUserList(userList){
    return {type: REFRESH_USER_LIST, userList}
}
