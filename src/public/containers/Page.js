/**
 * 页面布局
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
import FormBox from '../components/FormBox';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

const mapStateToProps = (state, ownProps) => {
    let {visible} = state.formBox;
    return {
        visible
    }
}

class Page extends Component{
  
  render(){
    let {visible} = this.props;

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <p className="title">聊天室</p>
        </Header>
        <Layout>
          <Content style={{ background: '#fff', padding: 20, margin: 0, minHeight: 280 }}>
            <MessageList />
          </Content>
          <Sider width={200} style={{ background: '#fff', paddingTop: 20 }}>
            <UserList />
          </Sider>
        </Layout>
        {visible ? <FormBox/> : ''}
      </Layout>
    )
  }
}

export default connect(mapStateToProps)(Page);