import BoardBarCSS from "./BoardBar.module.css";
import lyingFork from "../../images/lyingFork.png"
import img from "../../images/free-icon-scuba-3163524 (1).png"
import { useEffect } from "react";
import { Link } from "react-router-dom";

function BoardBar() {

    useEffect(() => {

    }, []);

    return (
        <div className={BoardBarCSS.boardBarDiv}>
            <div className={BoardBarCSS.boardMenu}>
                <Link to="/">오늘의 랜덤 메뉴</Link>
                <hr/>
                <img className={BoardBarCSS.boardBarImg} src={img} alt="랜덤메뉴" onClick=""/>
                <div className={BoardBarCSS.boardBarTitle}>
                    <Link path="/adminRecommend">메뉴 이름</Link>
                    <img className={BoardBarCSS.boardBarTitleBtn} src={lyingFork} alt="바로가기버튼"/>
                </div>
            </div>
            <div className={BoardBarCSS.boardMenu}>
                <Link to="/recipes">오늘의 레시피</Link>
                <hr/>
                <img className={BoardBarCSS.boardBarImg} src={lyingFork} alt="오늘의 레시피" onClick=""/>
                <div className={BoardBarCSS.boardBarTitle}>
                <Link path="/adminRecommend">메뉴 이름</Link>
                    <img className={BoardBarCSS.boardBarTitleBtn} src={lyingFork} alt="바로가기버튼"/>
                </div>
            </div>
            <div className={BoardBarCSS.boardMenu}>
                <Link to="/recipes/recommend">관리자 추천 레시피</Link>
                <hr/>
                <img className={BoardBarCSS.boardBarImg} src={lyingFork} alt="관리자 추천 레시피" onClick=""/>
                <div className={BoardBarCSS.boardBarTitle}>
                    <Link path="/adminRecommend">메뉴 이름</Link>
                    <img className={BoardBarCSS.boardBarTitleBtn} src={lyingFork} alt="바로가기버튼"/>
                </div>
            </div>
        </div>
    );
}

export default BoardBar;