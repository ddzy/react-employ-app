import * as React from 'react';
import { WingBlank, WhiteSpace, InputItem, List, Button, TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarSelector from '../../components/avatarselector/AvatarSelector';
import { reduxHandleUpdateInfo } from '../../redux/user.redux';
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
  mapDispatchToProps(),
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',    // 招聘职位
      company: '',  // 公司名称
      money: '',    // 职位薪资
      desc: '',     // 职位要求
      avatar: '',   // 头像
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

  render () {
    const path = this.props.location.pathname;
    const redirect = this.props.user.redirectTo;
    
    return (
      <div>
        {
          // redirect 
          //   && redirect !== path
          //   && <Redirect push to={redirect} />
          redirect
            && redirect !== path
            && <Redirect push to={redirect} />
        }
        <HeaderNav text="boss信息完善" leftContent="<" />
        <WingBlank>
          <AvatarSelector onSelectAvatar={this.handleSelectAvatar} />
        </WingBlank>
        <WingBlank size="sm">
          <WhiteSpace size="lg" />
          <List>
            <InputItem
              type="text"
              placeholder="职位名称"
              clear="true"
              onChange={(val) => {
                this.handleChange('title', val)
              }}
              value={this.state.title}
            >
              招聘:
            </InputItem>
            <InputItem
              type="text"
              placeholder="公司名称"
              clear="true"
              onChange={(val) => {
                this.handleChange('company', val)
              }}
              value={this.state.company}
            >
              公司名称:
            </InputItem>
            <InputItem
              type="text"
              placeholder="比如10K-20K"
              clear="true"
              onChange={(val) => {
                this.handleChange('money', val)
              }}
              value={this.state.money}
            >
              职位薪资:
            </InputItem>
            <TextareaItem
              placeholder="职位信息简介"
              clear="true"
              autoHeight="true"
              title="职位要求:"
              onChange={(val) => {
                this.handleChange('desc', val)
              }}
              value={this.state.desc}
            >
            </TextareaItem>
          </List>
        </WingBlank>
        <div className="prefect-infobtn">
          <Button
            type="primary"
            onClick={this.handleSaveClick}
          >保存</Button>
        </div>
      </div>
    );
  }
}


export default BossInfo;