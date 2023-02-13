import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callRecipeDetailAPI, getCategories } from "../../apis/RecipeAPICalls";
import RecipeFormCSS from "./RecipeForm.module.css";
import pot from "../../images/pot.png";
import { callRecipeUpdateAPI } from "../../apis/RecipeAPICalls";


function RecipeUpdate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipe = useSelector(state => state.recipeReducer);
    const params = useParams();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const imageInput = useRef();
    const [categoryList, setCategoryList] = useState([]);
    
    const [form, setForm] = useState({
        recipeName : "",
        categoryNo : "",
        ingredients : "",
        recipeBody : ""
    });

    useEffect(
        () => {
            setCategoryList(getCategories());

            dispatch(callRecipeDetailAPI({
                recipeNo : params.recipeNo
            }));// eslint-disable-next-line
        }, []
    );

    useEffect(
        () => {
            setImageUrl(recipe.recipeImageUrl);
            setForm({
                recipeName : recipe.recipeName,
                categoryNo : recipe.categoryNo,
                ingredients : recipe.ingredients,
                recipeBody : recipe.recipeBody
            })
         
        }, [recipe]
    );

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
    
    const onClickRecipeUpdateHandler = () => {

        console.log('[RecipeUpdate] onClickRecipeUpdateHandler');
        const temp = jwtDecode(window.localStorage.getItem("accessToken"));
        console.log(temp.memberCode);
        const formData = new FormData();

        formData.set("recipeNo", params.recipeNo);
        formData.set("recipeName", form.recipeName);
        formData.set("memberCode", temp.memberCode);
        formData.set("categoryNo", form.categoryNo);
        formData.set("ingredients", form.ingredients);
        formData.set("recipeBody", form.recipeBody);

        if(image){
            formData.set("recipeImage", image);
        }

        console.log("form : ", form.recipeName);
        console.log("formData : ", formData);
        console.log("recipeNo : ", params.recipeNo);

        dispatch(callRecipeUpdateAPI({
            form : formData
        }));
        
        alert('레시피 목록으로 이동합니다.');
        navigate('/recipes', { replace: true });
        window.location.reload();
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
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="recipeName">레시피명</label></td>
                            <td><input 
                                type="text" 
                                name="recipeName" 
                                id="recipeName"
                                onChange={onChangeHandler}
                                value={form.recipeName}
                                required/><br/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="categoryNo">카테고리</label></td>
                            <td>
                                <select 
                                    type="selectBox" 
                                    name="categoryNo" 
                                    id="categoryNo"
                                    onChange={onChangeHandler}
                                    required>
                                {categoryList.map((category, index) => <option key={index} value={index + 1}>{category}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className={RecipeFormCSS.problem}><span>재료</span></td>
                            <td><textarea 
                                    rows="6" 
                                    cols="55" 
                                    name="ingredients" 
                                    id="ingredients" 
                                    onChange={onChangeHandler}
                                    defaultValue={form.ingredients}
                                    required></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={RecipeFormCSS.recipeBody}>
                <label htmlFor="recipeBody">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;레시피 내용</label>
                <textarea 
                    rows="20" 
                    cols="100" 
                    name="recipeBody" 
                    onChange={onChangeHandler}
                    defaultValue={form.recipeBody}
                    id="recipeBody"></textarea>
                <button onClick={onClickRecipeUpdateHandler}><span>등록하기</span><img src={pot} alt="수정"/></button>
            </div>
        </div>
    </>
    );
}

export default RecipeUpdate;