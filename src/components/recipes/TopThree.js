import TopThreeCSS from './TopThree.module.css';
import Recipe from './Recipe';

function TopThree({topAndRandomList}) {

    return (
        <div>
            <div className={TopThreeCSS.recommendTitle}>
                <span>TOP 3 레시피</span>
            </div>
            <div className={TopThreeCSS.recommendItems}>
                <hr style={{width : '1600px'}}/>
                {
                    topAndRandomList.length > 0 && topAndRandomList.filter((recipe, index) => index < 3 && recipe.regDate !== null).map((recipe, index) => (<Recipe key={recipe.recipeNo} recipe={recipe} index={index} />))
                }
            </div>
        </div>
    );
}

export default TopThree;