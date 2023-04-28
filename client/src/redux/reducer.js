import { ADD_FAV, REMOVE_FAV, FILTER_DIETS, FILTER_TYPE, ORDERING, RESET, GET_ALL_DIETS, GET_ALL_RECIPES } from "./actions";


const initialState = {
    favRecipes: [],
    allRecipes: [],
    allDiets: [],
}


const rootReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case GET_ALL_RECIPES:
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

      case FILTER_DIETS:
        return {
          ...state,
          favRecipes: state.allRecipes.filter((recipe) =>
            recipe.diet.map((diet) => diet === actions.payload)
          ),
        };

      case FILTER_TYPE:
        if (actions.payload == "API") {
          return {
            ...state,
            favRecipes: state.favRecipes.filter(
              (recipe) => isNaN(recipe.id) === false
            ),
          };
        } else if (actions.payload == "DB") {
          return {
            ...state,
            favRecipes: state.favRecipes.filter(
              (recipe) => isNaN(recipe.id) === true
            ),
          };
        }

      case ORDERING:
        if (actions.payload == "A") {
          return {
            ...state,
            favRecipes: state.favRecipes.sort((a, b) => a.name - b.name),
          };
        } else if (actions.payload == "D") {
          return {
            ...state,
            favRecipes: state.favRecipes.sort((a, b) => b.name - a.name),
          };
        }

      case RESET:
        return {
          ...state,
          favRecipes: state.favRecipes,
        };

      default:
        return { ...state };
    }
}

export default rootReducer;