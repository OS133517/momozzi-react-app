import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import logo from "../../images/logo.png";
import HeaderCSS from "./Header.module.css"
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function Header() {

    // 로그인 모달창 띄우기 위한 state
    const [loginModal, setLoginModal] = useState(false);
    // 로그인 했는지 확인하기 위한 state
    const isLogin = window.localStorage.getItem('accessToken');// Local Storage 에 token 정보 확인
    // 로그인 했을 때 환영 문구 출력하고 싶어서 만들어봤는데 이래도 되나...
    const loginMember = useSelector(state => state.memberReducer.data);
    const [loginMemberName, setLoginMemberName] = useState('');

    // dispatch, navigate 선언
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoginMemberName(loginMember?.memberName);
    }, [loginMember]);

    // 로고 클릭 핸들러
    const onClickLogoHandler = () => {
        // 로고 클릭 시, 메인페이지로 이동
        navigate("/", {replace : true});
    };
    
    // 로그아웃 클릭 핸들러
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        // 로그아웃
        dispatch(callLogoutAPI());

        alert('로그아웃이 되어 메인화면으로 이동합니다.');
        navigate("/", {replace : true});
        window.location.reload();
    }

    // 마이페이지 클릭 핸들러
    const onClickMypageHandler = () => {

        // 토큰이 만료되었을 때 다시 로그인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log("[Header] onClickMypageHandler token : ", token);

        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }

        navigate("/mypage", {replace : true});
    }

    // 로그인 전 출력할 컴포넌트
    function BeforeLogin() {

        return (
            <div className={HeaderCSS.headerRight}>
                <NavLink 
                    to="/signup"
                    className={HeaderCSS.headerLink}>회원가입  |  </NavLink>    
                <NavLink 
                    to="/login" 
                    className={HeaderCSS.headerLink}>로그인</NavLink>
            </div>
        );
    }

    // 로그인 후 출력할 컴포넌트
    function AfterLogin() {

        return (
            <div className={HeaderCSS.headerRight}>
                <button className={HeaderCSS.headerBtn} onClick={onClickMypageHandler}>마이페이지</button>
                <span>  |  </span>
                <button className={HeaderCSS.headerBtn} onClick={onClickLogoutHandler}> 로그아웃</button>
            </div>
        );
    }
    
    return (
        <>
            {loginModal? <LoginModal setLoginModal={setLoginModal}/> : null}
            <div className={HeaderCSS.header}>
                {isLogin&&loginMemberName&&<span id={HeaderCSS.welcome}>맛있는 식사하세요~ {loginMemberName}님</span>}
                <div className={HeaderCSS.headerNav}>
                    <button 
                        className={HeaderCSS.headerBtn}
                        onClick={onClickLogoHandler}>&nbsp;&nbsp;오늘 뭐먹지</button>
                    {/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
                    { (isLogin == null || isLogin === undefined) ? <BeforeLogin /> : <AfterLogin />}    
                </div>
                <img id={HeaderCSS.headerLogo} src={logo} alt="로고" onClick=""/>
            </div>
        </>
    );
}

export default Header;