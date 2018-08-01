import * as React from 'react';
import { Button, List, InputItem, WingBlank, WhiteSpace, TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { reduxHandleUpdateInfo } from '../../redux/user.redux';
import AvatarSelector from '../../components/avatarselector/AvatarSelector';
import HeaderNav from '../../components/header/HeaderNav';



function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleUpdateInfo,
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps()
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',        // 期望职位
      desc: '',         // 个人简介
    };
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  
  // 头像
  handleSelectAvatar = (text) => {
    this.setState({
      avatar: text,
    });
  }

  // 保存
  handleSaveClick = () => {
    this.props.reduxHandleUpdateInfo(this.state);
  }

  render() {
    const { pathname } = this.props.location;
    const redirectTo = this.props.user.redirectTo;

    return (
      <div>
        {
          redirectTo
            && redirectTo !== pathname
            && <Redirect push to={redirectTo} />
        }
        <HeaderNav text="牛人信息完善" leftContent="<" />
        <WingBlank>
          <AvatarSelector 
            onSelectAvatar={this.handleSelectAvatar}
          />
          <WhiteSpace size="lg" />
          <List>
            <InputItem
              type="text"
              placeholder="您想找的工作"
              clear="true"
              onChange={(val) => {
                this.handleChange('title', val)
              }}
              value={this.state.title}
            >
              期望职位:
            </InputItem>
            <TextareaItem
              placeholder="简单介绍下你自己吧"
              clear="true"
              autoHeight="true"
              title="个人简介:"
              onChange={(val) => {
                this.handleChange('desc', val)
              }}
              value={this.state.desc}
            />
          </List>
          <WhiteSpace size="lg" />
          <Button
            type="primary"
            onClick={this.handleSaveClick}
          >
            保存
          </Button>
        </WingBlank>
      </div>
    );
  }
}



export default GeniusInfo;