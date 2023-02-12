import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callRecipeDetailAPI } from "../../apis/RecipeAPICalls";
import RecipeDetailCSS from "./RecipeDetail.module.css";
import jwtDecode from "jwt-decode";
import LoginModal from "../../components/common/LoginModal";
import { callRecipeRecommendAPI } from "../../apis/RecipeAPICalls";
import { callRecipeDeleteAPI } from "../../apis/RecipeAPICalls";

function RecipeDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams("recipeNo");
    const recipe = useSelector(state => state.recipeReducer);
    const isLogin = window.localStorage.getItem("accessToken") || null;
    const role = isLogin !== null && jwtDecode(isLogin);

    const [loginModal, setLoginModal] = useState(false);

    useEffect(
        () => {
            dispatch(callRecipeDetailAPI({
                recipeNo : params.recipeNo
            }));
        } // eslint-disable-next-line
        ,[]
    );

    const onClickRecommendHandler = () => {

        // 로그인 상태인지 확인
        if(isLogin === null) {
            alert('로그인을 먼저해주세요');
            setLoginModal(true);
            return;
        }

         // 토큰이 만료되었을때 다시 로그인
         if (jwtDecode(isLogin).exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }

        dispatch(callRecipeRecommendAPI({
            recipeNo : params.recipeNo,
            role : role
        }));

        window.location.reload();
    }

    const onClickMyRecipeHandler = () => {

        // 로그인 상태인지 확인
        if(isLogin === null) {
            alert('로그인을 먼저해주세요');
            setLoginModal(true);
            return;
        }

        // 토큰이 만료되었을때 다시 로그인
        if (jwtDecode(isLogin).exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }
    }

    const onClickDeleteHandler = () => {

        if(window.confirm("정말로 삭제하시겠습니까?")) {
            dispatch(callRecipeDeleteAPI({
                recipeNo : params.recipeNo
            }));
    
            alert('목록 화면으로 돌아갑니다.');
            navigate('/recipes', { replace: true });
            window.location.reload();
        }
    }

    const onClickUpdateHandler = () => {
        
    }

    return (
        <div className={RecipeDetailCSS.detailDiv}>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={RecipeDetailCSS.imgContainer}><img src={recipe.recipeImageUrl} alt="레시피 사진"/></div>
            <div className={RecipeDetailCSS.description}>
                <b>{recipe.recipeName}</b>
                <span>
                    카테고리 : {recipe.categoryName}&nbsp;&nbsp;작성자 : {recipe.memberName}
                </span>
                <span>
                    재료 : {recipe.ingredients}
                </span>
                <span>
                    작성일 : {recipe.regDate} &nbsp;&nbsp;조회수 : {recipe.viewNum} &nbsp;&nbsp;추천수 : {recipe.thumbsUpNum}
                </span>
            </div>
            <div className={RecipeDetailCSS.recipeBody}>
                {role.auth[0] === 'ROLE_ADMIN'?<button onClick={onClickRecommendHandler}>관리자 추천</button>:<button onClick={onClickRecommendHandler}>추천</button>}
                <button onClick={onClickMyRecipeHandler}>마이레시피 등록</button>
                <p>
                    {recipe.recipeBody}
                </p>
                {role.sub === recipe.memberId && <button onClick={onClickUpdateHandler}>수정</button>}
                {role.sub === recipe.memberId && <button onClick={onClickDeleteHandler}>삭제</button>}
            </div>
        </div>
    );
}

export default RecipeDetail;