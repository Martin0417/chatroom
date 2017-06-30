/**
 * 信息列表
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createMsg, getRoleInfo} from 'util/Message';

class MessageList extends Component{

    _handleTextMsg(msg, key){
        let {role, content} = msg;
        let {roleText, clazz} = getRoleInfo(role);
        return createMsg({
            key, 
            clazz, 
            content: [
                (roleText ? `（${roleText}）` : '') + `${content}`
            ]
        });
    }

    _handleImgMsg(msg, key){
        let {role, content, imgUrl} = msg;
        let {roleText, clazz} = getRoleInfo(role);
        return createMsg({
            key, 
            clazz, 
            content: [
                (roleText ? `（${roleText}）` : '') + `${content}：`,
                <img width="60%" src={imgUrl} />
            ]
        });
    }

    render(){
        let {list=[]} = this.props;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">消息列表</h3>
                </div>
                <div className="panel-body">
                    <table className="table table-striped messagesBox">
                        <tbody>
                            {list.map((msg, i)=>{
                                switch(msg.type){
                                    case 'text': 
                                        return this._handleTextMsg(msg, i);
                                    case 'image': 
                                        return this._handleImgMsg(msg, i);
                                    default:
                                        return '';
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

MessageList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object)
}

export default MessageList;