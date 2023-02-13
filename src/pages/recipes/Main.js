import BoardBar from "../../components/recipes/BoardBar";
import TopThree from "../../components/recipes/TopThree";
import { useEffect } from "react";
import { callRecipeTop3AndRandomListAPI } from "../../apis/RecipeAPICalls";
import { useDispatch, useSelector } from "react-redux";

function Main() {

    const dispatch = useDispatch();
    const topAndRandomList = useSelector(state => state.recipeReducer);
    console.log('topAndRandomList', topAndRandomList);

    useEffect(() => {
        dispatch(callRecipeTop3AndRandomListAPI());
        }// eslint-disable-next-line
        ,[]
    );

    return (
        <>
            <BoardBar topAndRandomList={topAndRandomList}/>
            <hr style={{width : '1600px'}}/>
            <TopThree topAndRandomList={topAndRandomList}/>
        </>
    );
}

export default Main;