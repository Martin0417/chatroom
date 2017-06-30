/**
 * 用户列表
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';

const UserList = ({list=[], handleDoubleClick}) => (
    <article className="userList panel panel-info">
      <section className="panel-heading">在线用户</section>
      <section className="panel-body">
        <ul className="list-group">
          {list.map( (user, i) => {
            return (
              <li key={i} className='list-group-item' 
                  onDoubleClick={handleDoubleClick.bind(this, user)}>
                <Tooltip title='双击私聊' placement='left'>
                  {user.name}{user.typing ? ' | 正在输入...' : ''}
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </section>
    </article>
);

UserList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object)
}

export default UserList;