// import { getToken } from '../../services/fethApiTrivia';
import { LOGIN } from './actionTypes';
// import { addToken } from '../../services/saveToken';

export const login = (payload) => ({ type: LOGIN, value: payload });
export const token = (payload) => ({ type: 'TOKEN', value: payload });
// export const getApiToken = () => (dispatch, state) => {
//   getToken().then((resp) => {
//     const { localStorage } = state.login;
//     addToken({ ...localStorage, [localStorage.token]: resp });
//     dispatch(token(resp));
//   });
// };
