import { SET_USER , LOG_OUT , SET_LOGIN_FLAG_TRUE , SET_LOGIN_FLAG_FALSE } from "../actions/actions";

const initialState = {
  user: {},
  userList: [],
  token: "",
  loginFlag: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      return{
        user: {}
      }
    case SET_LOGIN_FLAG_TRUE:
      return {
        ...state,
        loginFlag : action.payload
      }
    case SET_LOGIN_FLAG_FALSE:
      return {
        ...state,
        loginFlag : action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
