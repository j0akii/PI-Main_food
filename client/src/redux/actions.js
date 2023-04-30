import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const FILTER_DIETS = 'FILTER_DIETS';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDERING = 'ORDERING';
export const RESET = 'RESET';

const URL_END = 'http://localhost:3001';


// Para llamar a todas las recetas 

export const getAllRecipes = () => {
   return async (dispatch) => {
      try {
         const endPoint = `${URL_END}/recipes/`;
         const response = await axios.get(endPoint);
         return dispatch({
            type: GET_ALL_RECIPES,
            payload: response.data
         });
      } catch (error) {
         console.log(error.message);
      };
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

}

// Para agregar a recetas favoritas

export const addFav = (recipe) => {
   return async (dispatch) => {
      try {
         const endPoint = `${URL_END}/recipes/fav`;
         const response = await axios.post(endPoint, recipe);
         return dispatch({ // No estoy seguro de que vaya un return
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

// Filtrar por tipo de dietas:

export const filterDiets = (diets) => {
    return {
        type: FILTER_DIETS,
        payload: diets,
    };
};

// Filtrar por si es creada por nosotros la receta o no:

export const filterType = (type) => {
    return {
        type: FILTER_TYPE,
        payload: type,
    };
};

// Boton para resetear todos los filtro:

export const reset = () => {
    return {
        type: RESET,
    };
};
