import { SET_USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_INFO:
    return {
      ...state,
      gravatarEmail: action.userInfo.email,
      name: action.userInfo.name,
    };
  default:
    return state;
  }
};

export default userReducer;
