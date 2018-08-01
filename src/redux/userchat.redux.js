import axios from 'axios';


const initialState = {
  userlist: [],       // 牛人/boss列表
};



// Action-types
const USER_LIST = 'USER_LIST';




// Action-creator
function userList(data) {
  return {
    type: USER_LIST,
    payload: data,
  };
}




// Reducer
export function userchat(state = initialState, action) {
  switch(action.type) {
    case USER_LIST:
      return {
        ...state,
        userlist: action.payload,
      };
    default:
      return state;
  }
}




// Effects
export function getUserList(type) {
  return (dispatch) => {
    axios.get(`/user/list?type=${type}`)
      .then((res) => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(userList(res.data.data));
        }else {
          dispatch();
        }
      });
  };
}

