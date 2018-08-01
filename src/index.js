import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducer';
import './config';

import './index.css';

import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRoute from './components/authroute/AuthRoute'; 
import BossInfo from './containers/bossinfo/bossinfo';
import GeniusInfo from './containers/geniusinfo/geniusinfo';
import Dashboard from './components/dashboard/dashboard';
import Chat from './components/chat/Chat';


const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension
    ? window.devToolsExtension()
    : () => {}
));



ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* 检测路由 */}
          <AuthRoute />
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={GeniusInfo}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')
);


