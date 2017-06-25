/**
 * 登陆modal
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

class LoginModal extends Component {

    constructor(){
        super();
        this.state = {
            name: ''
        }
    }

    componentDidMount(){
        // this.nameInput.focus();
    }

    handleOk(){
        this.props.onConfirmName(this.state.name);
    }

    handleInput(e){
        let name = e.target.value;
        this.setState({name});
    }

    render() {
        let self = this;
        let { visible, loading } = this.props;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="登录"
                    onOk={this.handleOk.bind(this)}
                    maskClosable={false}
                    closable={false}
                    footer={[
                        <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk.bind(this)}>
                        确定
                        </Button>
                    ]}
                >
                    <p>输入用户名：</p>
                    <p><input ref={(elem) => self.nameInput = elem} type="text" value={this.state.name} onChange={this.handleInput.bind(this)}/></p>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool
}

export default LoginModal;