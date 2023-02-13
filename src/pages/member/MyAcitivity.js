import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callMyActivityAPI } from "../../apis/MemberAPICalls";
import MyActivityCSS from "./MyActivity.module.css";
import LoginModal from "../../components/common/LoginModal";
import { callRecipeDeleteAPI } from "../../apis/RecipeAPICalls";

function MyActivity() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const result = useSelector(state => state.memberReducer);
    const activityList = result.data;
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
            dispatch(callMyActivityAPI({
                memberCode : temp.memberCode,
                currentPage : currentPage
            }));// eslint-disable-next-line
        }, [currentPage]
    )

    const onClickHandler = (recipeNo) => {
        navigate(`/recipes/${recipeNo}`);
    }

    const onClickUpdateHandler = (recipeNo) => {

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

        navigate(`/recipes/update/${recipeNo}`);
    }

    const onClickDeleteHandler = (recipeNo) => {

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
            
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            dispatch(callRecipeDeleteAPI({
                recipeNo : recipeNo
            }));
    
            navigate('/myPage/myactivity', { replace: true });
            window.location.reload();
        }
    }

    return (
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={MyActivityCSS.myActivityDiv}>
                <h3>&nbsp;&nbsp;&nbsp;나의 활동</h3>
                <table>
                    <thead>
                        <tr>
                            <td>
                                레시피명
                            </td>
                            <td>
                                조회수
                            </td>
                            <td>
                                추천수
                            </td>
                            <td>
                                등록일
                            </td>
                            <td>
                                비고
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(activityList) && 
                            activityList.map((activity, index) => 
                                <tr key={activity.recipeNo}>
                                    <td className={MyActivityCSS.names} onClick={() => onClickHandler(activity.recipeNo)}>{activity.recipeName}</td>
                                    <td>{activity.viewNum}</td>
                                    <td>{activity.thumbsUpNum}</td>
                                    <td>{activity.regDate}</td>
                                    <td><button 
                                            className={MyActivityCSS.controlBtn} 
                                            onClick={() => onClickUpdateHandler(activity.recipeNo)}>수정</button> / <button 
                                                                                                className={MyActivityCSS.controlBtn} 
                                                                                                onClick={() => onClickDeleteHandler(activity.recipeNo)}>삭제</button></td>
                                </tr>)}
                        {Array.isArray(activityList) && activityList.length === 0 && <tr><td colSpan="5" style={{textAlign : "center"}}>활동이 없습니다.</td></tr>}
                    </tbody>
                </table>
                <div className={MyActivityCSS.pagingBtnDiv}>
                    { Array.isArray(activityList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={ MyActivityCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                    }
                    {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                            className={ MyActivityCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                    ))}
                    { Array.isArray(activityList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                        className={ MyActivityCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                    }
                </div>
            </div>
        </>
    );
}

export default MyActivity;