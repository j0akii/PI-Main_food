import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ID_RECIPES = "GET_ID_RECIPES";
export const GET_NAME_RECIPES = "GET_NAME_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const FILTER_DIETS = 'FILTER_DIETS';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDERING = 'ORDERING';
export const RESET = 'RESET';

const URL_END = 'http://localhost:3001';



// Para llamar las recetas por id

export const getIdRecipes = (id) => {
  return async (dispatch) => {
    try {
      const endPoint = `${URL_END}/recipes/${id}`;
      const response = await axios.get(endPoint);
      return dispatch({
        type: GET_ID_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Para llamar las recetas por nombre y si no se pasa nombre se llama a todas

export const getAllRecipes = (name) => {
  return async (dispatch) => {
    try {
      const endPoint = name
        ? `${URL_END}/recipes?name=${name}`
        : `${URL_END}/recipes/`;
      const response = await axios.get(endPoint);
      return dispatch({
        type: GET_NAME_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
};

// Para llamar a todas las dietas

export const getAllDiets = () => {
   return async (dispatch) => {
     try {
       const endPoint = `${URL_END}/diets/`;
       const response = await axios.get(endPoint);
       return dispatch({
         type: GET_ALL_DIETS,
         payload: response.data,
       });
     } catch (error) {
       console.log(error.message);
     }
   };
};

// Para crear una receta

export const createRecipe = (obj) => {
  return async (dispatch) => {
    try {
      const endPoint = `${URL_END}/diets/`;
      const response = await axios.post(endPoint, obj);
      return dispatch({
        type: CREATE_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Para agregar a recetas favoritas

export const addFav = (recipe) => {
   return async (dispatch) => {
      try {
         const endPoint = `${URL_END}/recipes/fav`;
         const response = await axios.post(endPoint, recipe);
         return dispatch({
            type: ADD_FAV,
            payload: response.data
         });
      } catch (error) {
         console.log(error.message);
      };
   };
};

// Para eliminar de recetas favoritas

export const removeFav = (id) => {
   return async (dispatch) => {
      try {
         const endPoint = `${URL_END}/recipes/fav/${id}`;
         const response = await axios.delete(endPoint);
         return dispatch({
            type: REMOVE_FAV,
            payload: response.data,
         })
      }
      catch (error) {
         console.log(error.message);
      };
   };
};

// Boton para resetear todos los filtro:

export const reset = () => {
    return {
        type: RESET,
    };
};
