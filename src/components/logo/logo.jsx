import * as React from 'react';

import logoImage from './miaomiao.jpg';
import './logo.css';


const Logo = () => {
  return (
    <div className="logo-container">
      <a href="">
        <img src={logoImage} width="256" height="256" alt="牛人网"/>
      </a>
    </div>
  );
}



export default Logo;