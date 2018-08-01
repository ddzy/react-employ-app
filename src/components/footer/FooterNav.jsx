import * as React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';


// 底部导航
@withRouter
class FooterNav extends React.Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unread: PropTypes.number,
  };
  
  render () {
    // 未读消息个数
    const { unread } = this.props;
    const { pathname } = this.props.location;
    const navList = this.props.navList.filter((val) => {
      return !val['hide'];
    });
    const navListItemArr = navList.map((val, index) => {
      return (
        <TabBar.Item
          key={index}
          title={val.text}
          icon={{uri: require(`./images/${val.icon}.png`)}}
          selectedIcon={{uri: require(`./images/${val.icon}-active.png`)}}
          selected={pathname === val.path}
          onPress={() => {
            this.props.history.push(val.path)
          }}
          badge={val.path === '/msg' ? unread : 0}
        >
        </TabBar.Item>
      );
    });

    return (
      <div>
        <div className="tab-bar-margin-bottom">
          <TabBar
            tabBarPosition="bottom"
          >
            {navListItemArr}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default FooterNav;