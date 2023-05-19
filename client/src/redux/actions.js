import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ID_RECIPES = "GET_ID_RECIPES";
export const GET_NAME_RECIPES = "GET_NAME_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_DIETS = "FILTER_DIETS";
export const UPDATE_SELECTED_DIETS = "UPDATE_SELECTED_DIETS";
export const FILTER_TYPE = "FILTER_TYPE";
export const ORDERING = "ORDERING";
export const VALIDATION_ERRORS = "VALIDATION_ERRORS";

const URL_END = "https://pi-food-ytwm.onrender.com/";

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
      const response = await axios(endPoint);
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

// Para ordenar las recetas

export const orderRecipes = (value) => {
  return {
    type: ORDERING,
    payload: value,
  };
};

// Para saber cuales son las dietas seleccionadas para el filtro

export const updateSelectedDiets = (selectedDiets) => {
  return {
    type: UPDATE_SELECTED_DIETS,
    payload: { selectedDiets },
  };
};

// Para filtrar por dietas

export const filterDietsRecipes = () => {
  return {
    type: FILTER_DIETS,
  };
};

// Para filtrar por tipo

export const filterTypeRecipes = (value) => {
  return {
    type: FILTER_TYPE,
    payload: value,
  };
};

// Para guardar los errores de las validaciones del form

export const setValidationErrors = (obj) => {
  return {
    type: VALIDATION_ERRORS,
    payload: obj,
  };
};
