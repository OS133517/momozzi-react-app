import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/recipes/Main";
import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
import Recipes from "./pages/recipes/Recipes";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import RecipeForm from "./pages/recipes/RecipeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path="recipes">
            <Route index element={<Recipes/>}/>
            <Route path="recommend" element={<Recipes type='recommend'/>}/>
            <Route path=":recipeNo" element={<RecipeDetail/>}/>
          </Route>
          <Route path="recipe-registration" element={<RecipeForm/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
