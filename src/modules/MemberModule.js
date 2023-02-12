import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const PUT_UPDATE = 'member/PUT_UPDATE';
export const DELETE_UNREGIST = 'member/DELETE_UNREGIST';
// eslint-disable-next-line
const actions = createActions({
    [POST_LOGIN] : () => {},
    [POST_REGISTER] : () => {},
    [PUT_UPDATE] : () => {},
    [DELETE_UNREGIST] : () => {}
});

// 리듀서
const memberReducer = handleActions({
    [POST_LOGIN] : (state, {payload}) => payload,
    [POST_REGISTER] : (state, {payload}) => payload,
    [PUT_UPDATE] : (state, {payload}) => payload,
    [DELETE_UNREGIST] : (state, {payload}) => payload
}, initialState)

export default memberReducer;


