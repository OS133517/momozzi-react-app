import RecommendCSS from './Recommend.module.css';
import RecommendItem from './RecommendItem';
import { useDispatch, useSelector } from 'react-redux';

function Recommend() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    // const topThreeList = useSelector(state => state.recipeReducer);

    return (
        <div>
            <div className={RecommendCSS.recommendTitle}>
                <span>TOP 3 레시피</span>
            </div>
            <div className={RecommendCSS.recommendItems}>
                <hr/>
                <RecommendItem/>
            </div>
        </div>
    );
}

export default Recommend;