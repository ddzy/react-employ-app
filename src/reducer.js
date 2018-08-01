
// 合并所有的 reducer
import { combineReducers } from 'redux';

import { user } from './redux/user.redux';
import { userchat } from './redux/userchat.redux';
import { chat } from './redux/chat.redux';


export default combineReducers({
  user,
  userchat,
  chat,
});