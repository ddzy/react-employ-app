import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderNav from '../header/HeaderNav';
import FooterNav from '../footer/FooterNav';
import Boss from '../boss/Boss';
import Genius from '../genius/Genius';
import User from '../user/User';
import { getMsgList, reduxHandleReceiveMsg } from '../../redux/chat.redux';



function mapStateToProps(state) {
  return {
    user: state.user,
    chat: state.chat,
  };
}
function mapDispatchToProps() {
  return {
    getMsgList,
    reduxHandleReceiveMsg,
  };
}


function Msg() {
  return <h2>消息列表</h2>
}


@connect(
  mapStateToProps,
  mapDispatchToProps()
)
class Dashboard extends React.Component {

  componentDidMount() {
    // 获取聊天信息列表
    // 做判断, 如果没有数据, 则去获取
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.reduxHandleReceiveMsg();
    }
  }

  render() {
    const { pathname } = this.props.location;
    const { unread } = this.props.chat;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: this.props.user.type === 'genius',
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: this.props.user.type === 'boss',
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ];
    const { title } = navList.find((val) => {
      return val.path === pathname;
    });
    const navRouteArr = navList.map((val, index) => {
      return (
        <Route 
          key={index}
          path={val.path}
          component={val.component}   
        />
      );
    });

    return (
      <div>
        <HeaderNav
          text={title}
        />
        <div>
          <Switch>
            {navRouteArr}
          </Switch>
        </div>
        <FooterNav navList={navList} unread={unread} />
      </div>
    );
  }
}


export default Dashboard;