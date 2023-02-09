import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER'
// eslint-disable-next-line
const actions = createActions({
    [POST_LOGIN] : () => {},
    [POST_REGISTER] : () => {}
});

// 리듀서
const memberReducer = handleActions({
    [POST_LOGIN] : (state, {payload}) => payload,
    [POST_REGISTER] : (state, {payload}) => payload
}, initialState)

export default memberReducer;


