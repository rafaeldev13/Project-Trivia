export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_SCORE = 'SET_SCORE';
export const CLEAR_PLAYER = 'CLEAR_PLAYER';

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  userInfo,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const clearPlayer = () => ({
  type: CLEAR_PLAYER,
});
