import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import MyPageCSS from "./MyPage.module.css";

function MyPage() {

    const navigate = useNavigate();

    const onClickMyPageHandler = (num) => {
        switch(num) {
            case 1: navigate("/myPage"); break;
            case 2: navigate("/myPage/myactivity"); break;
            case 3: navigate("/myPage/myrecipe"); break;
            case 4: navigate("/myPage/unregister"); break;
            default: navigate("/myPage"); break;
        }
    }

    return (
        <div>
            <Header/>
            <div className={MyPageCSS.myPageDiv}>
                <div className={MyPageCSS.myPageSideBar}>
                    <button onClick={() => {onClickMyPageHandler(1)}}>회원정보 수정</button>
                    <button onClick={() => {onClickMyPageHandler(2)}}>나의 활동</button>
                    <button onClick={() => {onClickMyPageHandler(3)}}>마이 레시피</button>
                    <button onClick={() => {onClickMyPageHandler(4)}}>회원 탈퇴</button>
                </div>
                <div className={MyPageCSS.myPageContent}>
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default MyPage;