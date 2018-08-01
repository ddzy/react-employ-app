import * as React from 'react';
import { connect } from 'react-redux';

import UserCard from '../usercard/UserCard';
import { getUserList } from '../../redux/userchat.redux';




function mapStateToProps(state) {
  return {
    userchat: state.userchat,
  };
}
function mapDispatchToProps() {
  return {
    getUserList,
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps()
)
class Genius extends React.Component {
  
  componentDidMount() {
    this.props.getUserList('boss');
  }

  render () {

    return (
      <div>
        <UserCard userlist={this.props.userchat.userlist} />
      </div>
    );
  }
}


export default Genius;