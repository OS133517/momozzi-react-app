import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [];

// 액션
export const GET_RECIPES_TOP_AND_RANDOM = 'recipe/GET_RECIPES_TOP_AND_RANDOM';
export const GET_RECIPES = 'recipe/GET_RECIPES';
export const GET_RECIPES_RECOMMEND = 'recipe/GET_RECIPES_RECOMMEND';
export const GET_RECIPE = 'recipe/GET_RECIPE';
export const PUT_RECIPE_RECOMMEND = 'recipe/PUT_RECIPE_RECOMMEND';
export const DELETE_RECIPE = 'recipe/DELETE_RECIPE';
export const POST_RECIPE = 'recipe/POST_RECIPE';
export const PUT_RECIPE = 'recipe/PUT_RECIPE';
export const GET_RECIPES_CATEGORY = 'recipe/GET_RECIPES_CATEGORY';
export const POST_MY_RECIPE = 'recipe/POST_MY_RECIPE';
// eslint-disable-next-line
const actions = createActions({
    [GET_RECIPES_TOP_AND_RANDOM] : () => {},
    [GET_RECIPES] : () => {},
    [GET_RECIPES_RECOMMEND] : () => {},
    [GET_RECIPE] : () => {},
    [PUT_RECIPE_RECOMMEND] : () => {},
    [DELETE_RECIPE] : () => {},
    [POST_RECIPE] : () => {},
    [PUT_RECIPE] : () => {},
    [GET_RECIPES_CATEGORY] : () => {},
    [POST_MY_RECIPE] : () => {}
});

// 리듀서
const recipeReducer = handleActions({
    [GET_RECIPES_TOP_AND_RANDOM] : (state, {payload}) => payload,
    [GET_RECIPES] : (state, {payload}) => payload,
    [GET_RECIPES_RECOMMEND] : (state, {payload}) => payload,
    [GET_RECIPE] : (state, {payload}) => payload,
    [PUT_RECIPE_RECOMMEND] : (state, {payload}) => payload,
    [DELETE_RECIPE] : (state, {payload}) => payload,
    [POST_RECIPE] : (state, {payload}) => payload,
    [PUT_RECIPE] : (state, {payload}) => payload,
    [GET_RECIPES_CATEGORY] : (state, {payload}) => payload,
    [POST_MY_RECIPE] : (state, {payload}) => payload
}, initialState);

export default recipeReducer;