import * as React from 'react';
import { connect } from 'react-redux';
import { Result, List, WingBlank, WhiteSpace, Button, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router-dom';

import { reduxHandleLogout } from '../../redux/user.redux';



/**
 * 个人中心
 */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleLogout,
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps()
)
class User extends React.Component {
  
  logout = () => {
    // 删除cookie
    const alert = Modal.alert;

    alert('注销', '确认退出登录么???', [
      { text: '取消' },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid');
        this.props.reduxHandleLogout();
      } }
    ]);
  }

  render() {
    const { user } = this.props;
    const ListItem = List.Item;
    const Brief = List.Item.Brief;

    return user 
      ? (
          <div>
            {
              user.redirectTo
                && user.redirectTo === '/login'
                && <Redirect push to={user.redirectTo} />
            }
            <Result 
              img={<img src={require(`../images/${user.avatar ? user.avatar : 'default_avatar'}.jpg`)} className="me-avatar-img" alt={user.avatar ? user.avatar : 'default'} />}
              title={user.user}
              message={user.type && user.type === 'boss' && user.company}
            />
            <WingBlank>
              <List
                renderHeader={() => ('简介')}
              >
                <ListItem 
                  extra={user.money && `薪资: ${user.money}`}
                >
                  {user.title}
                </ListItem>
                <ListItem multipleLine="true">
                  {
                    user.desc
                    && user.desc.split('\n').map((val, index) => (
                      <Brief key={index}>{val}</Brief>
                    ))
                  }
                </ListItem>
              </List>
              <WhiteSpace size="xl" />
              <List>
                <Button
                  type="primary"
                  onClick={this.logout}
                >注销</Button>
              </List>
            </WingBlank>
          </div>
        )
      : null;
  }
}


export default User;