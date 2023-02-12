import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyUpdateCSS from "./MyPageUpdate.module.css";
import { callMyUpdateAPI } from "../../apis/MemberAPICalls";

function MyPageUpdate() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.memberReducer);

    const [form, setForm] = useState({
        memberPassword : '',
        memberEmail : ''
    });

    useEffect(() => {
        if(result.message === '회원 정보 수정 성공') {
            alert(result.message);
            window.location.reload();
        }
    }, [result]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickUpdateHandler = () => {
        dispatch(callMyUpdateAPI({
            form : form
        }));
    };

    return (
        <div className={MyUpdateCSS.updateFormDiv}>
            <h3>회원 정보 수정</h3>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>비밀번호(선택)</label>
                        </td>
                        <td>
                            <input 
                            type="password" 
                            name="memberPassword" 
                            placeholder="비밀번호"
                            onChange={onChangeHandler}
                            />
                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <label>이메일</label>  
                        </td>
                        <td>
                            <input 
                                type="email" 
                                name="memberEmail" 
                                placeholder="이메일"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={onClickUpdateHandler}>수정하기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MyPageUpdate;