import BoardBarCSS from "./BoardBar.module.css";
import lyingFork from "../../images/lyingFork.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRandom } from "../../apis/RecipeAPICalls";
import 동남아시아식 from "../../images/동남아시아식.png";
import 디저트 from "../../images/디저트.png";
import 멕시칸 from "../../images/멕시칸.png";
import 샐러드 from "../../images/샐러드.png";
import 양식 from "../../images/양식.png";
import 이탈리안 from "../../images/이탈리안.png";
import 일식 from "../../images/일식.png";
import 중식 from "../../images/중식.png";
import 프렌치 from "../../images/프렌치.png";
import 한식 from "../../images/한식.png";
import 분식 from "../../images/분식.png";

function BoardBar({topAndRandomList}) {

    const navigate = useNavigate();
    const [category, setCategory] = useState({
        categoryNo : '',
        categoryName : ''
    });
    console.log('category', category);

    useEffect(() => {

        setCategory(getRandom());
    }, [])

    const onClickBoardBarHandler = (recipeNo) => {
        navigate(`/recipes/${recipeNo}`);
    }

    const onClickRandomHandler = () => {
        navigate(`/recipes/categories/${category.categoryNo + 1}`);
    }

    return (
        <div className={BoardBarCSS.boardBarDiv}>
            <div className={BoardBarCSS.boardMenu} onClick={onClickRandomHandler}>
                <span>오늘의 랜덤 카테고리<img src={lyingFork} alt="바로가기버튼"/></span>
                <hr/>
                {category.categoryName === '한식' && <img className={BoardBarCSS.boardBarImg} src={한식} alt="랜덤메뉴"/>}
                {category.categoryName === '동남아시아식' && <img className={BoardBarCSS.boardBarImg} src={동남아시아식} alt="랜덤메뉴"/>}
                {category.categoryName === '디저트' && <img className={BoardBarCSS.boardBarImg} src={디저트} alt="랜덤메뉴"/>}
                {category.categoryName === '멕시칸' && <img className={BoardBarCSS.boardBarImg} src={멕시칸} alt="랜덤메뉴"/>}
                {category.categoryName === '샐러드' && <img className={BoardBarCSS.boardBarImg} src={샐러드} alt="랜덤메뉴"/>}
                {category.categoryName === '양식' && <img className={BoardBarCSS.boardBarImg} src={양식} alt="랜덤메뉴"/>}
                {category.categoryName === '이탈리안' && <img className={BoardBarCSS.boardBarImg} src={이탈리안} alt="랜덤메뉴"/>}
                {category.categoryName === '일식' && <img className={BoardBarCSS.boardBarImg} src={일식} alt="랜덤메뉴"/>}
                {category.categoryName === '중식' && <img className={BoardBarCSS.boardBarImg} src={중식} alt="랜덤메뉴"/>}
                {category.categoryName === '프렌치' && <img className={BoardBarCSS.boardBarImg} src={프렌치} alt="랜덤메뉴"/>}
                {category.categoryName === '분식' && <img className={BoardBarCSS.boardBarImg} src={분식} alt="랜덤메뉴"/>}
                <div className={BoardBarCSS.boardBarTitle} onClick={onClickRandomHandler}>
                    {category && <span>{category.categoryName}</span>}
                    <img className={BoardBarCSS.boardBarTitleBtn} src={lyingFork} alt="바로가기버튼"/>
                </div>
            </div>
            <div className={BoardBarCSS.boardMenu}>
                <span onClick={() => navigate("/recipes")}>오늘의 레시피<img src={lyingFork} alt="바로가기버튼"/></span>
                <hr/>
                    {topAndRandomList.length > 0 && <img 
                                                        className={BoardBarCSS.boardBarImg} 
                                                        src={topAndRandomList[3].recipeImageUrl} 
                                                        alt="오늘의 레시피" 
                                                        onClick={() => onClickBoardBarHandler(topAndRandomList[4].recipeNo)}/>}
                <div className={BoardBarCSS.boardBarTitle}> 
                    {topAndRandomList.length > 0 && <span onClick={() => onClickBoardBarHandler(topAndRandomList[4].recipeNo)}>{topAndRandomList[3].recipeName}</span>}
                    <img className={BoardBarCSS.boardBarTitleBtn} src={lyingFork} alt="바로가기버튼" onClick={() => onClickBoardBarHandler(topAndRandomList[4].recipeNo)}/>
                </div>
            </div>
            <div className={BoardBarCSS.boardMenu}>
                <span onClick={() => navigate("/recipes/recommend")}>관리자 추천 레시피<img src={lyingFork} alt="바로가기버튼"/></span>
                <hr/>
                    {topAndRandomList.length > 0 && <img 
                                                        className={BoardBarCSS.boardBarImg} 
                                                        src={topAndRandomList[4].recipeImageUrl} 
                                                        alt="관리자 추천 레시피" 
                                                        onClick={() => onClickBoardBarHandler(topAndRandomList[4].recipeNo)}/>}
                <div className={BoardBarCSS.boardBarTitle}>
                    {topAndRandomList.length > 0 && <span onClick={() => onClickBoardBarHandler(topAndRandomList[4].recipeNo)}>{topAndRandomList[4].recipeName}</span>}
                    <img className={BoardBarCSS.boardBarTitleBtn} src={lyingFork} alt="바로가기버튼" onClick={() => onClickBoardBarHandler(topAndRandomList[4].recipeNo)}/>
                </div>
            </div>
        </div>
    );
}

export default BoardBar;