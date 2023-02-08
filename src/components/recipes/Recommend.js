import RecommendCSS from './Recommend.module.css';
import RecommendItem from './RecommendItem';

function Recommend() {

    return (
        <div>
            <div className={RecommendCSS.recommendTitle}>
                <span>TOP 3</span>
            </div>
            <div className={RecommendCSS.recommendItems}>
                <hr/>
                <RecommendItem/>
            </div>
        </div>
    );
}

export default Recommend;