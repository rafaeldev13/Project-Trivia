import { SET_USER_INFO, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: 'Carlão',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_INFO:
    return {
      ...state,
      gravatarEmail: action.userInfo.email,
      name: action.userInfo.name,
    };
  case SET_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default playerReducer;
