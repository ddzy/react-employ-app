import axios from 'axios';

import getRedirectPath from '../utils/redirect';



// action-types
const ERRORMSG = 'ERRORMSG';    // 注册 or 登录失败
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGOUT = 'LOGOUT';


// initialState
const initialState = {
  redirectTo: '',   // 注册完成跳转到哪里
  isAuth: false,    // 是否已经登录, 权限验证
  msg: '',          // 信息
  user: '',         // 用户名
  pwd: '',          // 密码
  type: '',         // boss or genuis
  avatar: '',       // 头像
};


// action-creator
function registerOrLoginFaild(msg) {
  return {
    msg,
    type: ERRORMSG,
  };
}

// 登录或注册成功
function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo,
  };
}

export function reduxHandleLogout() {
  return {
    type: LOGOUT,
  };
}



// reducers
export function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ERRORMSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    case LOGOUT:
      return {
        ...initialState,
        redirectTo: '/login',
      };
    default:
      return state;
  }
}



// effects
export function reduxHandleRegister({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !repeatpwd){
    return registerOrLoginFaild('输入项不能为空!');
  }else if (pwd !== repeatpwd){
    return registerOrLoginFaild('两次密码不一致!');
  }

  return (dispatch) => {
    axios.post('/user/register', {user, pwd, type})
      .then((res) => {
        if (res.status === 200 && res.data.code === 0){
          return dispatch(authSuccess({ user, pwd, type }));
        }
        return dispatch(registerOrLoginFaild(res.data.msg));
      })
  };
}


export function reduxHandleLogin({ user, pwd }) {
  if (!user || !pwd) {
    return registerOrLoginFaild('输入项不能为空!');
  }

  return (dispatch) => {
    axios.post('/user/login', { user, pwd })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        }else {
          dispatch(registerOrLoginFaild(res.data.msg));
        }
      });
  };
}


export function reduxHandleUpdateInfo(info) {
  return (dispatch) => {
    axios.post('/user/update', info)
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        }else {
          dispatch(registerOrLoginFaild(res.data.msg));
        }
      });
  };
}




