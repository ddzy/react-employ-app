import React from 'react';
import { WhiteSpace, WingBlank, Button, List, InputItem, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HocForm from '../../components/HOC_form/hoc.form';
import Logo from '../../components/logo/logo';
import { reduxHandleRegister } from '../../redux/user.redux';



/**
 * state & dispatch => props
 */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleRegister,
  };
}


@connect(
  mapStateToProps,
  mapDispatchToProps()
)
@HocForm
class Register extends React.Component {

  /* 处理注册按钮 */
  handleRegister = () => {
    this.props.reduxHandleRegister(this.props.state);
  }

  render () {
    const RadioItem = Radio.RadioItem;
    const redirectTo = this.props.user.redirectTo;

    return (
      <div>
        {
          redirectTo
            ? <Redirect to={redirectTo} />
            : null
        }
        <Logo />
        <WingBlank>
          <List>
            {
              this.props.user.msg
                && <p className='error-msg'>{this.props.user.msg}</p>
            }
            <InputItem 
              onChange={(val) => {this.props.handleChange('user', val)}}
              type="text"
              clear="true"
              placeholder="请输入用户名"
              value={this.props.state.user}
            >
              用户名:
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(val) => {this.props.handleChange('pwd', val)}}
              type="password"
              clear="true"
              placeholder="请输入密码"
              value={this.props.state.pwd}
            >
              密码:
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(val) => {this.props.handleChange('repeatpwd', val)}} 
              type="password"
              clear="true"
              placeholder="请再次输入密码"
              value={this.props.state.repeatpwd}
            >
              确认密码:
            </InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => {this.props.handleChange('type', 'genius')}}
            >
              牛人
            </RadioItem>
            <RadioItem 
              checked={this.props.state.type === 'boss'}
              onChange={() => {this.props.handleChange('type', 'boss')}}
            >
              BOSS
            </RadioItem>
            <WhiteSpace size="lg" />
            <Button
              type="primary"
              onClick={this.handleRegister}
            >
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}


export default Register;