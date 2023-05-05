import { ADD_FAV, REMOVE_FAV, GET_ID_RECIPES, GET_NAME_RECIPES, GET_ALL_DIETS, GET_ALL_RECIPES } from "./actions";


const initialState = {
    favRecipes: [],
    allRecipes: [],
    idRecipe: [],
    nameRecipes: [],
    allDiets: [],
}


const rootReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case GET_ALL_RECIPES:
        return {
          ...state,
          allRecipes: actions.payload,
        };

      case GET_ID_RECIPES:
        return {
          ...state,
          idRecipe: actions.payload,
        };

      case GET_NAME_RECIPES:
        return {
          ...state,
          allRecipes: actions.payload,
        };

      case GET_ALL_DIETS:
        return {
          ...state,
          allDiets: actions.payload,
        };

      case ADD_FAV:
        return {
          ...state,
          favRecipes: actions.payload,
          allRecipes: actions.payload,
        };

      case REMOVE_FAV:
        return {
          ...state,
          favRecipes: actions.payload,
        };

      default:
        return { ...state };
    }
}

export default rootReducer;