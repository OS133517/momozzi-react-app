import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnregisterCSS from "./Unregister.module.css";
import { callUnregisterAPI } from "../../apis/MemberAPICalls";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { useNavigate } from "react-router-dom";

function Unregister() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const result = useSelector(state => {console.log('state.memberReducer : ', state.memberReducer); return state.memberReducer;});

    const [memberPassword, setMemberPassword] = useState("");

    useEffect(() => {
        if(result.data === '회원 탈퇴 성공') {

            window.localStorage.removeItem('accessToken');
            dispatch(callLogoutAPI());
            navigate("/", {replace : true});
            window.location.reload();
        } 
    }, // eslint-disable-next-line
    [result]);

    const onChangeUnregistHandler = (e) => {
        setMemberPassword(e.target.value);
    }

    const onClickUnregistHandler = () => {
        if(window.confirm("정말로 탈퇴하시겠습니까?")) {
            dispatch(callUnregisterAPI({
                memberPassword : memberPassword
            }));
        } 
    };

    return (
        <div className={UnregisterCSS.unregisterFormDiv}>
            <h3>탈퇴하기</h3>
            <input 
                type="password" 
                name="memberPassword" 
                placeholder="비밀번호를 입력하세요"
                onChange={onChangeUnregistHandler}/>
            <br/>
            <button onClick={onClickUnregistHandler}>비밀번호 입력</button>
        </div>
    );
}

export default Unregister;