import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterCSS from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callRegisterAPI } from "../../apis/MemberAPICalls";

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);

    const [form, setForm] = useState({
        memberId : '',
        memberPassword : '',
        memberName : '',
        memberEmail : ''
    })

    useEffect(() => {
        if(member.status === 201) {
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", {replace : true});
        }
    },[member, navigate]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form : form
        }));
    };

    return (
        <>
            <div className={RegisterCSS.registerForm}>
                <label>&nbsp;&nbsp;아이디  <input 
                                                type="text" 
                                                name="memberId" 
                                                placeholder="아이디"
                                                onChange={onChangeHandler}
                                                /></label>
                <label>&nbsp;&nbsp;이름  <input 
                                                type="text" 
                                                name="memberName" 
                                                placeholder="이름"
                                                onChange={onChangeHandler}
                                                /></label>
                <label>&nbsp;&nbsp;비밀번호  <input 
                                                type="password" 
                                                name="memberPassword" 
                                                placeholder="비밀번호"
                                                onChange={onChangeHandler}
                                                /></label>
                <label>&nbsp;&nbsp;이메일  <input 
                                                type="email" 
                                                name="memberEmail" 
                                                placeholder="이메일"
                                                onChange={onChangeHandler}
                                                /></label>
                <div className={RegisterCSS.registerBtnDiv}>
                    <button onClick = { onClickRegisterHandler }>회원가입</button>
                    <Link to="/login">로그인</Link>
                </div>
            </div>
        </>
    );
}

export default Register;