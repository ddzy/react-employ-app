import axios from 'axios';
import io from 'socket.io-client';
// 连接 socket
const socket = io('ws://localhost:8888');



// Action-Types
const MSG_LIST = 'MSG_LIST';        // 聊天列表
const MSG_RECEIVE = 'MSG_RECEIVE';  // 读取消息
const MSG_READ = 'MSG_READ';        // 标识已读


// InitialState
const initialState = {
  chatmsg: [],      // 信息列表
  unread: 0,        // 未读
  users: {},        // 用户列表
};


// Action-Creators
// 接收信息列表
function msgList(data) {
  return {
    type: MSG_LIST,
    payload: data,
  };
}

// 接收单条信息
function msgReceive(data) {
  return {
    type: MSG_RECEIVE,
    payload: data,
  };
}





// Reducer
export function chat(state = initialState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.fullData,
        users: action.payload.users,
        // read为false 且 chat.to 为 当前用户id
        unread: action.payload.fullData.filter((val) =>(!val.read && val.to === action.payload.userid)).length,
      };
    case MSG_RECEIVE:
      // 只过滤 发送给我的消息
      const n = action.payload.to === action.payload.userid
        ? 1
        : 0;
      return {
        ...state,
        chatmsg: state.chatmsg.concat(action.payload),
        unread: state.unread + n,
      };
    case MSG_READ:

    default:
      return state;
  }
}



// Effects
// 首次进入, 获取聊天信息列表
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then((response) => {
        if(response.status === 200 && response.data.code === 0) {
          // 获取当前登录的用户id
          const userid = getState().user._id;
          dispatch(msgList({...response.data.data, userid}));
        }
      });
  };
}

// 处理发送聊天信息按钮
export function reduxHandleSendMsg({ from, to, msg }) {
  return (dispatch) => {
    socket.emit('sendmsg', { from, to, msg });
  };
}


// 处理实时接收聊天信息
export function reduxHandleReceiveMsg() {
  return (dispatch, getState) => {
    socket.on('receivemsg', ({ _doc }) => {

      const userid = getState().user._id;
      dispatch(msgReceive({ ..._doc, userid }));
    });
  };
}



// 获取唯一聊天信息, chatid
export function getChatId(userId, targetId) {
  return (dispatch) => {
    return [ userId, targetId ].sort().join('_');
  };
}
