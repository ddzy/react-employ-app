import * as React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadData } from '../../redux/user.redux';

/**
 * 检测路由
 */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps() {
  return {
    loadData,
  };
}



@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps(),
)
class AuthRoute extends React.Component {

  _checkStatus(res) {
    return res.status === 200;
  }

  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;

    // 如果当前已经在 登录 页
    if (publicList.indexOf(pathname) !== -1){
      return false;
    }
    // 获取用户信息
    axios.get('/user/info')
      .then((res) => {
        if (this._checkStatus(res)){
          if (res.data.code === 0){
            // 有登录信息
            this.props.loadData(res.data.data);
          }else {
            // 没有登录信息, 直接push到登录页
            this.props.history.push('/login');
            
          }
        }
      });
    // 是否登录
    // 现在的 url 地址, login是不需要跳转的
    // 用户的 type 身份是 boss 还是 牛人
    // 用户是否完善信息, (选择投降, 个人简介)
  }

  render() {
    return null;
  }

}


export default AuthRoute;