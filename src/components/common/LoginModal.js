import LoginModalCSS from "./LoginModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callLoginAPI } from "../../apis/MemberAPICalls";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

function LoginModal({setLoginModal}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginMember = useSelector(state => state.memberReducer);

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    useEffect(() => {

        if(loginMember.status === 200) {
            console.log("[Login] Login SUCCESS {}", loginMember);
            setLoginModal(false);
            window.location.reload();
        } else if (loginMember.state === 400){
            console.log("[Login] Login FAIL {}", loginMember);
            alert(loginMember.message);
        }// eslint-disable-next-line
    }, [loginMember, navigate]);

    
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
    }

    const onClickModalHandler = (e) => {
        console.log(e.target.className);
        if(e.target.className === 'LoginModal_modal__npKyi') {
            setLoginModal(false);
        }
    }

    return (
        <div className={LoginModalCSS.modal} onClick={onClickModalHandler}>
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