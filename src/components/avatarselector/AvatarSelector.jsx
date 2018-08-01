import * as React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';


/**
 * 头像选择组件
 */
class AvatarSelector extends React.Component {
  static propTypes = {
    onSelectAvatar: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    };
  }

  render () {
    const avatarList = 'boy,chicken,dog,ducky,girl,kid,koala,man,mimicat,mushroom,noglassescat,peiqi,pig,smile,woman,yiyiyicat'.split(',').map((img) => {
      return {
        icon: require(`../images/${img}.jpg`),
        text: img,
      };
    });
    const gridHeader = this.state.avatar 
      ? (<div>
          <span>已选择头像---</span>
          <img src={this.state.avatar.icon} alt={this.state.avatar.text} width="32" height="32"/>
        </div>)
      : ('请选择头像');

    return (
      <div>
        <List 
          renderHeader={() => gridHeader}
        >
          <Grid 
            data={avatarList}
            onClick={(av) => {
              this.setState({ avatar: av })
              this.props.onSelectAvatar(av.text)
            }}
          />
        </List>
      </div>
    );
  }
}


export default AvatarSelector;