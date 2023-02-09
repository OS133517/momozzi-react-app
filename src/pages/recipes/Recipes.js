import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "../../components/recipes/Recipe";
import { callRecipeListAPI, callRecipeListRecommendAPI } from "../../apis/RecipeAPICalls";
import BoardCSS from "./Recipes.module.css";
import standingFork from "../../images/standingFork.png";
import lyingFork from "../../images/lyingFork.png";
import { useNavigate } from "react-router-dom";

function Recipes({type = 'main'}) {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 + navigate
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector(state => state.recipeReducer);
    console.log(recipes);
    const recipeList = recipes.data;
    console.log(recipeList);
    const pageInfo = recipes.pageInfo;
    console.log(pageInfo);
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
        console.log(pageNumber);
    }

    useEffect(
        () => {
            // 혹시나 나중에 게시판 추가할까 싶어 switch가 나을거 같아서 switch 사용
            switch(type) {
                case 'main' :
                    dispatch(callRecipeListAPI({
                        currentPage : currentPage
                    })); 
                    break;
                case 'recommend' :
                    dispatch(callRecipeListRecommendAPI({
                        currentPage : currentPage
                    }));
                    break;
                default : 
                    dispatch(callRecipeListAPI({
                        currentPage : currentPage
                    })); 
                    break;
            }
        }// eslint-disable-next-line
        , [currentPage, type]
    );

    const onClickBoardHandler = () => {
        switch(type) {
            case 'main' :  navigate("/recipes/recommend"); break;
            case 'recommend' : navigate('/recipes'); break;
            default : navigate("/recipes/recommend"); break;
        }
    }

    return (
        <div className={BoardCSS.board}>
            <div className={BoardCSS.boardTitle}> 
                {type === 'main'? <span>&nbsp;오늘의 레시피<img src={standingFork} alt="포크"/></span>:<span>&nbsp;관리자 추천 레시피<img src={standingFork} alt="포크"/></span>}
                {type === 'main'? <span onClick={onClickBoardHandler}>관리자 추천 레시피&nbsp;<img src={lyingFork} alt="포크"/></span>:<span onClick={onClickBoardHandler}>오늘의 레시피&nbsp;<img src={lyingFork} alt="포크"/></span>}
                
            </div>
            <div className={BoardCSS.boardItems}>
                <hr/>
                {
                    Array.isArray(recipeList) && recipeList.map(recipe => (<Recipe key={recipe.recipeNo} recipe={recipe} />))
                }
                {
                    recipeList?.length === 0 && <p>레시피가 없습니다.<hr/></p>
                }
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                { Array.isArray(recipeList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ BoardCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ BoardCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(recipeList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total === 0}
                    className={ BoardCSS.pagingBtn }
                >
                    &gt;
                </button>
                }
            </div>
        </div>
    );
}

export default Recipes;