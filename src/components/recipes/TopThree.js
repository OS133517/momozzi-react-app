import TopThreeCSS from './TopThree.module.css';
import Recipe from './Recipe';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callRecipeTop3ListAPI } from '../../apis/RecipeAPICalls';

function TopThree() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const topThreeList = useSelector(state => state.recipeReducer);

    useEffect(() => {
        dispatch(callRecipeTop3ListAPI());
        }// eslint-disable-next-line
        , []
    );

    return (
        <div>
            <div className={TopThreeCSS.recommendTitle}>
                <span>TOP 3 레시피</span>
            </div>
            <div className={TopThreeCSS.recommendItems}>
                <hr/>
                {
                    topThreeList.length > 0 && topThreeList.map((recipe, index) => (<Recipe key={recipe.recipeNo} recipe={recipe} index={index} />))
                }
            </div>
        </div>
    );
}

export default TopThree;