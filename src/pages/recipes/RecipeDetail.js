import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callRecipeDetailAPI } from "../../apis/RecipeAPICalls";
import RecipeDetailCSS from "./RecipeDetail.module.css";
import jwtDecode from "jwt-decode";

function RecipeDetail() {

    const dispatch = useDispatch();
    const params = useParams("recipeNo");
    const recipe = useSelector(state => state.recipeReducer);
    const role = jwtDecode(window.localStorage.getItem("accessToken")).auth[0];
    console.log(role);

    useEffect(
        () => {
            dispatch(callRecipeDetailAPI({
                recipeNo : params.recipeNo
            }));
        } // eslint-disable-next-line
        ,[]
    );

    return (
        <div className={RecipeDetailCSS.detailDiv}>
            <div className={RecipeDetailCSS.imgContainer}><img src={recipe.recipeImageUrl} alt="레시피 사진"/></div>
            <div className={RecipeDetailCSS.description}>
                <b>{recipe.recipeName}</b>
                <p>
                    카테고리  : {recipe.categoryName}<br/>
                    재료     : {recipe.ingredients}<br/>
                    작성자   : {recipe.memberName}<br/>
                    작성일   : {recipe.regDate}
                </p>
            </div>
            <div className={RecipeDetailCSS.recipeBody}>
                {role === 'ROLE_ADMIN' && <button>관리자 추천</button>}
                {role !== 'ROLE_ADMIN' && <button>추천하기</button>}
                <button>찜하기</button>
                <p>
                    {recipe.recipeBody}
                </p>
            </div>
        </div>
    );
}

export default RecipeDetail;