import { 
    GET_RECIPES_TOP,
    GET_RECIPES,
    GET_RECIPES_RECOMMEND,
    GET_RECIPE } from "../modules/RecipeModule";


export const callRecipeTop3ListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/top3`;

    return async (dispatch, get) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeTop3ListAPI RESULT : ', result);
            dispatch({type : GET_RECIPES_TOP, payload : result.data});
        }
    }
}

export const callRecipeListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes`;
    }

    console.log('[RecipeAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeListAPI RESULT', result);
            dispatch({type : GET_RECIPES, payload : result.data});
        }
    }
}

export const callRecipeListRecommendAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/recommend?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/recommend`;
    }

    console.log('[RecipeAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeListAPI RESULT : ', result);
            dispatch({type : GET_RECIPES_RECOMMEND, payload : result.data});
        }
    }
}

export const callRecipeDetailAPI = ({recipeNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/${recipeNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeDetailAPI RESULT : ', result);
            dispatch({type : GET_RECIPE, payload : result.data});
        }
    }
}