import { 
    GET_RECIPES,
    GET_RECIPES_RECOMMEND,
    GET_RECIPE,
    PUT_RECIPE_RECOMMEND,
    DELETE_RECIPE,
    POST_RECIPE,
    GET_RECIPES_TOP_AND_RANDOM} from "../modules/RecipeModule";

export function getCategories() {
    
    return (["한식", "양식", "분식", "중식", "일식", "디저트", "멕시칸", "프렌치", "동남아시아식", "이탈리안"]);
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

export const callRecipeRecommendAPI = ({recipeNo, role}) => {
    let requestURL;
    console.log('role : ', role);
    if(role.auth[0] === 'ROLE_ADMIN') {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes-recommend/${recipeNo}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes-thumbs-up/${recipeNo}`;
    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeRecommendAPI RESULT : ', result);
            dispatch({type : PUT_RECIPE_RECOMMEND, payload : result.data});
        }
    }
}

export const callRecipeDeleteAPI = ({recipeNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/${recipeNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeDeleteAPI RESULT : ', result);
            dispatch({type : DELETE_RECIPE, payload : result.data});
        }
    }
}

export const callRecipeRegistAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes`;
    console.log(form);
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*"
            },
            body: form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RecipeAPICalls] callRecipeRegistAPI RESULT : ', result);
            dispatch({type : POST_RECIPE, payload : result.data});
        }
    }
}

// export const callRecipeRandomAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/random`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method : "GET",
//             headers : {
//                 "Accept" : "*/*"
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[RecipeAPICalls] callRecipeRandomAPI RESULT : ', result);
//             dispatch({type : GET_RECIPES_RANDOM, payload : result.data});
//         }
//     }
// }


export const callRecipeTop3AndRandomListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/recipes/top3-and-randoms`;

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
            console.log('[RecipeAPICalls] callRecipeTop3AndRandomListAPI RESULT : ', result);
            dispatch({type : GET_RECIPES_TOP_AND_RANDOM, payload : result.data});
        }
    }
}

