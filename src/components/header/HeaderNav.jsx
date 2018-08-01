import * as React from 'react';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';



const HeaderNav = ({ text, leftContent, history }) => {
  const handleLeftClick = () => {
    history.goBack();
  };

  return (
    <div className="header-nav-box">
      <NavBar
        mode="dark"
        leftContent={<Icon type="left" />}
        onLeftClick={handleLeftClick}
      >
        {text}
      </NavBar>
      <div className="nav-margin"></div>
    </div>
  );
};

HeaderNav.propTypes = {
  text: PropTypes.string,
  leftContent: PropTypes.string,
};


export default withRouter(HeaderNav);