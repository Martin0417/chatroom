/**
 * 信息列表
 */
import React from 'react';
import PropTypes from 'prop-types';

const MessageList = ({list=[]}) => (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">消息列表</h3>
      </div>
      <div className="panel-body">
        <table id="j-messages" className="table table-striped messagesBox">
            {list.map((msg)=>{
                return msg;
            })}
        </table>
      </div>
    </div>
);

MessageList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object)
}

export default MessageList;