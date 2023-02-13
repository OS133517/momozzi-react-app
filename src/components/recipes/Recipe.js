import { useNavigate } from "react-router-dom";
import RecipeCSS from "./Recipe.module.css";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
import recMedal from "../../images/recMedal.png";
import thumsMedal from "../../images/thumsMedal.png";

function Recipe({recipe, index = 4}) {
    console.log('index 찍히나?', index);
    const navigate = useNavigate();

    const onClickRecipeHandler = (recipeNo) => {
        navigate(`/recipes/${recipeNo}`);
    } 

    return (
        <>
            <div className={RecipeCSS.recipeDiv} onClick={() => onClickRecipeHandler(recipe.recipeNo)}>
                <div className={RecipeCSS.recipeImgContainer}>
                    <img src={recipe.recipeImageUrl} alt="레시피 섬네일"/>
                </div>
                <div className={RecipeCSS.recipeDescription}>
                    <b>{recipe.recipeName}</b>
                    <span>&nbsp;&nbsp;재료 : {recipe.ingredients}</span>
                    <span>&nbsp;&nbsp;등록일 : {recipe.regDate}&nbsp;&nbsp;&nbsp;조회수 : {recipe.viewNum}&nbsp;&nbsp;&nbsp;추천수 : {recipe.thumbsUpNum}</span>
                </div>
                <div className={RecipeCSS.recipeWriter}>
                    {recipe.recommendStatus === 'Y' && <img id={RecipeCSS.recMedal} src={recMedal} alt="추천메달"/>}
                    {recipe.thumbsUpNum >= 100 && <img id={RecipeCSS.thMedal} src={thumsMedal} alt="추천메달"/>}
                    <b>오늘의 셰프 : {recipe.memberName}</b>
                </div>
                {index === 0 && <img className={RecipeCSS.medalImg} src={gold} alt="top1"/>}
                {index === 1 && <img className={RecipeCSS.medalImg} src={silver} alt="top2"/>}
                {index === 2 && <img className={RecipeCSS.medalImg} src={bronze} alt="top3"/>}
            </div>
            <hr style={{width : '1600px'}}/>
        </>
    );
}

export default Recipe;