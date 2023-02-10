import LoginModalCSS from "./LoginModal.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { callLoginAPI } from "../../apis/MemberAPICalls";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

function LoginModal({setLoginModal}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const onClickLoginHandler = () => {
        console.log('[LoginModal] Login Process Start!!');        
        window.localStorage.removeItem('accessToken');
        
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));

        setLoginModal(false);
        console.log('[LoginModal] Login Process End!!');
        alert('로그인이 완료되었습니다.');
        window.location.reload();
    }

    return (
        <div className={LoginModalCSS.modal} onClick={() => setLoginModal(false)}>
        <div className={ LoginModalCSS.modalContainer }>
             <div className={LoginModalCSS.header}>
                <div className={LoginModalCSS.headerNav}>
                </div>
                <img id={LoginModalCSS.headerLogo} src={logo} alt="로고"/>
            </div>
            <div className={ LoginModalCSS.loginModalDiv }>
                <h1>로그인</h1>
                <input 
                    type="text" 
                    name='memberId'
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name='memberPassword' 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick={ onClickLoginHandler }
                >
                    로그인
                </button>
                <span>
                    <span onClick={ () => setLoginModal(false) }>돌아가기 / </span>
                    <span onClick={ () => navigate("/signup") }>회원가입</span>
                </span>
            </div>
        </div>
    </div>
    );
}

export default LoginModal;