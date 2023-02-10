import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import RecipeFormCSS from "./RecipeForm.module.css";
import { getCategories } from "../../apis/RecipeAPICalls";
import pot from "../../images/pot.png";

function RecipeForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const [categoryList, setCategoryList] = useState([]);

    const [form, setForm] = useState({
        recipeName : '',
        categoryNo : '',
        ingredients : '',
        recipeBody : ''
    });

    useEffect(() => {
        setCategoryList(getCategories());
    }, [])

    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    
    const onClickRecipeRegistrationHandler = () => {

        console.log('[RecipeRegistration] onClickRecipeRegistrationHandler');

        const formData = new FormData();

        formData.set("recipeName", form.recipeName);
        formData.set("categoryNo", form.categoryNo);
        formData.set("ingredients", form.ingredients);
        formData.set("recipeBody", form.recipeBody);

        if(image){
            formData.set("recipeImage", image);
        }

        console.log("form : ", form);
        console.log("formData : ", formData);

        // dispatch(callProductRegistAPI({	// 상품 상세 정보 조회
        //     form: formData
        // }));        
        
        
        // alert('상품 리스트로 이동합니다.');
        // navigate('/recipes', { replace: true });
        // window.location.reload();
    }

    return (
        <>
            <hr style={{width : "1440px"}}/>
            <div className={RecipeFormCSS.recipeFormDiv}>
                <div className={RecipeFormCSS.recipeFormImg}>
                    { imageUrl && <img 
                                src={ imageUrl } 
                                alt="preview"
                    />}
                    <input 
                        style={ { display: 'none' }}
                        type="file" 
                        name="recipeImage"
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={onChangeImageUpload}
                        ref={ imageInput }/>
                    <button
                        onClick={onClickImageUpload}>이미지 업로드</button>
                </div>
                <div className={RecipeFormCSS.recipeFormDescription}>
                    <tr>
                        <td><label htmlFor="recipeName">레시피명</label></td>
                        <td><input 
                            type="text" 
                            name="recipeName" 
                            id="recipeName"
                            onChange={onChangeHandler}
                            required/><br/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="categoryNo">카테고리</label></td>
                        <td><select 
                        type="selectBox" 
                        name="categoryNo" 
                        id="categoryNo"
                        onChange={onChangeHandler}
                        required>
                        {categoryList.map((category, index) => <option key={index} value={index + 1}>{category}</option>)}
                        </select></td>
                    </tr>
                    <tr>
                        <td className={RecipeFormCSS.problem}><span>재료</span></td>
                        <td><textarea 
                            rows="6" 
                            cols="55" 
                            name="ingredients" 
                            id="ingredients" 
                            onChange={onChangeHandler}
                            required></textarea></td>
                    </tr>
                </div>
                <div className={RecipeFormCSS.recipeBody}>
                    <label htmlFor="recipeBody">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;레시피 내용</label>
                    <textarea 
                        rows="20" 
                        cols="100" 
                        name="recipeBody" 
                        onChange={onChangeHandler}
                        id="recipeBody"></textarea>
                    <button onClick={onClickRecipeRegistrationHandler}><span>등록하기</span><img src={pot} alt="등록"/></button>
                </div>
            </div>
        </>
    );
}

export default RecipeForm;