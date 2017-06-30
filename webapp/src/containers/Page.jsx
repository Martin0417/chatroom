/**
 * 页面布局
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
import FormBox from 'containers/FormBox';
import MessageList from 'containers/MessageList';
import UserList from 'containers/UserList';

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
        <Header className="header headerWrap">
          <div className="logo" />
          <p className="title">Enjoy Chatting</p>
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