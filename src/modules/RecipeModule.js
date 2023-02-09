import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [];

// 액션
export const GET_RECIPES_TOP = 'recipe/GET_RECIPES_TOP';
export const GET_RECIPES = 'recipe/GET_RECIPES';
export const GET_RECIPES_RECOMMEND = 'recipe/GET_RECIPES_RECOMMEND';
export const GET_RECIPE = 'recipe/GET_RECIPE';
// eslint-disable-next-line
const actions = createActions({
    [GET_RECIPES_TOP] : () => {},
    [GET_RECIPES] : () => {},
    [GET_RECIPES_RECOMMEND] : () => {},
    [GET_RECIPE] : () => {}
});

// 리듀서
const recipeReducer = handleActions({
    [GET_RECIPES_TOP] : (state, {payload}) => payload,
    [GET_RECIPES] : (state, {payload}) => payload,
    [GET_RECIPES_RECOMMEND] : (state, {payload}) => payload,
    [GET_RECIPE] : (state, {payload}) => payload
}, initialState);

export default recipeReducer;