import BoardBar from "../../components/recipes/BoardBar";
import TopThree from "../../components/recipes/TopThree";
import { useEffect } from "react";
import { callRecipeTop3AndRandomListAPI } from "../../apis/RecipeAPICalls";
import { useDispatch } from "react-redux";

function Main() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(callRecipeTop3AndRandomListAPI());
        }// eslint-disable-next-line
        ,[]
    );

    return (
        <>
            <BoardBar/>
            <hr style={{width : "85%"}}/>
            <TopThree/>
        </>
    );
}

export default Main;