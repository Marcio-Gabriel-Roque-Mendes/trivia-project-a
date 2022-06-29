import { LOGIN } from '../Actions/actionTypes';

const initialState = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.value };
  default:
    return state;
  }
}

export default loginReducer;
