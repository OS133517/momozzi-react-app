import { 
    POST_LOGIN,
    POST_REGISTER,
    PUT_UPDATE,
    DELETE_UNREGIST,
    GET_ACTIVITY,
    GET_MY_RECIPE} from "../modules/MemberModule";

export const callLoginAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/login`;
    console.log(form);
    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Access-Control-Allow-Origin" : "*"
            },
            body : JSON.stringify({
                memberId : form.memberId,
                memberPassword : form.memberPassword
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if(result.status === 200) {
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        
        dispatch({type : POST_LOGIN, payload : result});
    }
}

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {

        dispatch({type : POST_LOGIN, payload : ''});// 이렇게 로컬스토리지에서 토큰 지우고 아무것도 없는 걸로 로그인하는 식으로 로그아웃하는구나
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    }
}

export const callRegisterAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/signup`;
    console.log('form', form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                memberId : form.memberId,
                memberPassword : form.memberPassword,
                memberName : form.memberName,
                memberEmail : form.memberEmail
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

        if(result.status === 201) {
            dispatch({type : POST_REGISTER, payload : result});
        } 
    }
}

export const callMyUpdateAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                memberPassword : form?.memberPassword,
                memberEmail : form.memberEmail
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callMyUpdateAPI RESULT : ', result);

        if(result.status === 200) {
            dispatch({type : PUT_UPDATE, payload : result});
        } 
    }
}

export const callUnregisterAPI = ({memberPassword}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                memberPassword : memberPassword
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callUnregisterAPI RESULT : ', result);
        alert(result.message);

        if(result.status === 200) {
            dispatch({type : DELETE_UNREGIST, payload : result});
        } 
    }
}

export const callMyActivityAPI = ({memberCode, currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members/${memberCode}/activity?offset=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callMyActivityAPI RESULT : ', result);

        if(result.status === 200) {
            dispatch({type : GET_ACTIVITY, payload : result.data});
        } 
    }
}

export const callMyRecipeAPI = ({memberCode, currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members/${memberCode}/my-recipe?offset=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callMyRecipeAPI RESULT : ', result);

        if(result.status === 200) {
            dispatch({type : GET_MY_RECIPE, payload : result.data});
        } 
    }
}