/**
 * 登陆modal
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Icon } from 'antd';

class LoginModal extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            maxLength: 15
        }
    }

    componentDidMount(){
        setTimeout( ()=> {
            this.handleEmptyInput();
        });
    }

    handleOk(){
        let {name} = this.state;
        let {socket} = this.props;
        this.props.onConfirmName({name, socket});
    }

    handleInputChange(e){
        let name = e.target.value;
        let max = this.state.maxLength;
        if(name.length > max){
            name = name.slice(0, max);
        }
        this.setState({name});
    }

    handleEmptyInput(){
        this.setState({name : ''});
        this.nameInput.focus();
    }

    render() {
        const { name } = this.state;
        const { visible, loading } = this.props;
        const suffix = name ? <Icon type="close-circle" onClick={this.handleEmptyInput.bind(this)} /> : null;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="登录"
                    width={280}
                    onOk={this.handleOk.bind(this)}
                    maskClosable={false}
                    closable={false}
                    footer={[
                        <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk.bind(this)}>
                        确定
                        </Button>
                    ]}
                >
                    <Input
                        placeholder="输入用户名"
                        prefix={<Icon type="user" />}
                        suffix={suffix}
                        value={name}
                        onChange={this.handleInputChange.bind(this)}
                        ref={node => this.nameInput = node}
                    />
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