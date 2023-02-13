import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../components/common/LoginModal";
import MyRecipeCSS from "./MyRecipe.module.css";
import { callMyRecipeAPI } from "../../apis/MemberAPICalls";

function MyRecipe() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const result = useSelector(state => state.memberReducer);
    const recipeList = result.data;
    const pageInfo = result.pageInfo;
    const isLogin = window.localStorage.getItem("accessToken") || null;

    const [loginModal, setLoginModal] = useState(false);
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
            const temp = jwtDecode(window.localStorage.getItem("accessToken"));
            dispatch(callMyRecipeAPI({
                memberCode : temp.memberCode,
                currentPage : currentPage
            }));// eslint-disable-next-line
        }, [currentPage]
    )

    const onClickHandler = () => {

    }

    const onClickDetailHandler = (recipeNo) => {

        // 로그인 상태인지 확인
        if(isLogin === null) {
            alert('로그인을 먼저해주세요');
            setLoginModal(true);
            return;
        }

        // 토큰이 만료되었을때 다시 로그인
        if (jwtDecode(isLogin).exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }

        navigate(`/recipes/${recipeNo}`);
    }

    return (
        <>
        { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
        <div className={MyRecipeCSS.myRecipeDiv}>
            <h3>&nbsp;&nbsp;&nbsp;마이 레시피</h3>
            <table>
                <thead>
                    <tr>
                        <td>
                            레시피명
                        </td>
                        <td>
                            비고
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(recipeList) && 
                        recipeList.map((recipe) => 
                            <tr key={recipe.recipeNo}>
                                <td className={MyRecipeCSS.names} onClick={() => onClickHandler(recipe.recipeNo)}>{recipe.recipeName}</td>
                                <td><button 
                                        className={MyRecipeCSS.controlBtn} 
                                        onClick={() => onClickDetailHandler(recipe.recipeNo)}>바로가기</button>
                                </td>
                            </tr>)}
                    {Array.isArray(recipeList) && recipeList.length === 0 && <tr><td colSpan="3" style={{textAlign : "center"}}>등록된 레시피가 없습니다.</td></tr>}
                </tbody>
            </table>
            <div className={MyRecipeCSS.pagingBtnDiv}>
                { Array.isArray(recipeList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ MyRecipeCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ MyRecipeCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(recipeList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                    className={ MyRecipeCSS.pagingBtn }
                >
                    &gt;
                </button>
                }
            </div>
        </div>
    </>
    );
}

export default MyRecipe;