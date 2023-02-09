import {combineReducers} from 'redux';
import memberReducer from './MemberModule';
import recipeReducer from './RecipeModule';

const rootReducer = combineReducers({
    memberReducer,
    recipeReducer
});

export default rootReducer;