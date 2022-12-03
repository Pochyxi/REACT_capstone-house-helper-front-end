import { SET_USER, LOG_OUT } from "../actions/actions";

const initialState = {
  user: {},
  userList: [],
  token: "",
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
    default:
      return state;
  }
};

export default userReducer;
