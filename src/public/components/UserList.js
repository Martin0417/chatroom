/**
 * 用户列表
 */
import React from 'react';
import PropTypes from 'prop-types';

const UserList = ({list=[]}) => (
    <article className="userList panel panel-info">
      <section className="panel-heading">在线用户</section>
      <section className="panel-body">
        <ul className="list-group">
          {list.map}
        </ul>
      </section>
    </article>
);

UserList.propTypes = {
    list: PropTypes.array
}

export default UserList;