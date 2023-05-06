import { FILTER_DIETS, ORDERING, GET_ID_RECIPES, GET_NAME_RECIPES, GET_ALL_DIETS, GET_ALL_RECIPES, UPDATE_SELECTED_DIETS, FILTER_TYPE } from "./actions";


const initialState = {
    allRecipes: [],
    idRecipe: [],
    nameRecipes: [],
    allDiets: [],
    filtredRecipes: [],
    selectedDiets: [],
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

      case ORDERING:
        if (actions.payload === "A") {
          return {
            ...state,
            filtredRecipes: state.filtredRecipes.length
              ? state.filtredRecipes.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )
              : state.allRecipes.sort((a, b) => a.name.localeCompare(b.name)),
          };
        } 
        else if (actions.payload === "D") {
          return {
            ...state,
            filtredRecipes: state.filtredRecipes.length
              ? state.filtredRecipes.sort((a, b) =>
                  b.name.localeCompare(a.name)
                )
              : state.allRecipes.sort((a, b) => b.name.localeCompare(a.name)),
          };
        } 
        else if (actions.payload === "hplus") {
          return {
            ...state,
            filtredRecipes: state.filtredRecipes.length
              ? state.filtredRecipes.sort(
                  (a, b) => b.healthScore - a.healthScore
                )
              : state.allRecipes.sort((a, b) => b.healthScore - a.healthScore),
          };
        } 
        else if (actions.payload === "hless") {
          return {
            ...state,
            filtredRecipes: state.filtredRecipes.length
              ? state.filtredRecipes.sort(
                  (a, b) => a.healthScore - b.healthScore
                )
              : state.allRecipes.sort((a, b) => a.healthScore - b.healthScore),
          };
        } 
        else if (actions.payload == "pplus") {
          return {
            ...state,
            filtredRecipes: state.filtredRecipes.length
              ? state.filtredRecipes.sort((a, b) => b.price - a.price)
              : state.allRecipes.sort((a, b) => b.price - a.price),
          };
        } 
        else if (actions.payload == "pless") {
          return {
            ...state,
            filtredRecipes: state.filtredRecipes.length
              ? state.filtredRecipes.sort((a, b) => a.price - b.price)
              : state.allRecipes.sort((a, b) => a.price - b.price),
          };
        }

      case UPDATE_SELECTED_DIETS:
        return {
          ...state,
          selectedDiets: {
            ...state.selectedDiets,
            [Object.keys(actions.payload.selectedDiets)]: actions.payload.selectedDiets[Object.keys(actions.payload.selectedDiets)],
          }
        };

      case FILTER_DIETS:
        const selectedDietKeys = Object.keys(state.selectedDiets).filter(
          (key) => state.selectedDiets[key]
        );

        if (selectedDietKeys.length === 0) {
          return {
            ...state,
            filtredRecipes: state.allRecipes,
          };
        }

        return {
          ...state,
          filtredRecipes: state.filtredRecipes.length 
          ? state.filtredRecipes.filter((recipe) => selectedDietKeys.every((diet) => {
              return recipe.diets.length > 0 && recipe.diets.includes(diet.toLowerCase());
            })
          )
          : state.allRecipes.filter((recipe) => selectedDietKeys.every((diet) => {
              return recipe.diets.length > 0 && recipe.diets.includes(diet.toLowerCase());
            })
          )
        }

      case FILTER_TYPE:
        if (actions.payload === "ALL") {
          return {
            ...state,
            filtredRecipes: state.allRecipes,
          };
        } 
        else if (actions.payload === "DB") {
          return {
            ...state,
            filtredRecipes: state.allRecipes.filter((recipe) => typeof recipe.id !== 'number' && recipe)
          };
        } 
        else if (actions.payload === "API") {
          return {
            ...state,
            filtredRecipes: state.allRecipes.filter((recipe) => typeof recipe.id === 'number' && recipe)
          };
        } 


      default:
        return { ...state };
    }
}

export default rootReducer;