import React from 'react';
import { Button, List, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HocForm from '../../components/HOC_form/hoc.form';
import Logo from '../../components/logo/logo';
import { reduxHandleLogin } from '../../redux/user.redux';



function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps() {
  return {
    reduxHandleLogin,
  };
}


@connect(
  mapStateToProps,
  mapDispatchToProps(),
)
@HocForm
class Login extends React.Component {
  
  // 登录按钮
  handleLogin = () => {
    this.props.reduxHandleLogin(this.props.state);
  }

  // 注册按钮
  handleRegister = () => {
    this.props.history.push('/register');
  }

  render () {
    const errorMsg = this.props.user.msg
      && (<p className="error-msg">{this.props.user.msg}</p>);

    return (
      <div className="app-container">
        {
          this.props.user.redirectTo
            && this.props.user.redirectTo !== '/login'
            && (<Redirect push to={this.props.user.redirectTo} />)
        }
        <Logo />
        <WingBlank size="sm">
          <List>
            {errorMsg}
            <WhiteSpace size="sm" />
            <InputItem
              onChange={(value) => {this.props.handleChange('user', value)}}
              value={this.props.state.user}
              type="text"
              placeholder="请输入用户名"
              clear="true"
            >
              用户:
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(value) => {this.props.handleChange('pwd', value)}}
              value={this.props.state.pwd}
              type="password"
              placeholder="请输入密码"
              clear="true"
            >
              密码:
            </InputItem>
          </List>
          <WhiteSpace size="lg" />
          <Button
            type="primary"
            onClick={this.handleLogin}
          >登录</Button>
          <WhiteSpace size="xs" />
          <Button
            type="primary"
            onClick={this.handleRegister}
          >注册</Button>
        </WingBlank>
      </div>
    );
  }
}



export default Login;