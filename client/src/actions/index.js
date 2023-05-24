import axios from "axios";
//Action para para paginado
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
//Actions para pbtener info Y crear receta
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_TITLE = "GET_BY_TITLE";
export const GET_BY_ID = "GET_BY_ID";
//Action para crear receta
export const CREATE_RECIPE = "CREATE_RECIPE";
//Actions para filtrar
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_ID = "FILTER_BY_ID";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_HEALTSCORE = "FILTER_BY_HEALTSCORE ";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
//----------------------------------------------------------------
export const CLEAN_DETAIL = "CLEAN_DETAIL";

//-----------------------------------------------------
//Actions Creators get

export const getRecipes = () => {
  return async function (dispatch) {
    const response = await axios.get("/recipes");
    const recipes = response.data;
    dispatch({ type: GET_ALL_RECIPES, payload: recipes });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const response = await axios.get("/diets");
    const diets = response.data;
    dispatch({ type: GET_DIETS, payload: diets });
  };
};

export const getRecipesByTitle = (title) => {
  return async function (dispatch) {
    const response = await axios.get(`/recipes?title=${title}`);
    const recipe = response.data;
    console.log(recipe);
    dispatch({ type: GET_BY_TITLE, payload: recipe });
  };
};

export const getRecipesById = (id) => {
  return async function (dispatch) {
    const response = await axios.get("/recipes/" + id);
    const recipe = response.data;
    dispatch({ type: GET_BY_ID, payload: recipe });
  };
};

//-----------------------------------------------------
//Actions Creators post

export const createRecipe = (recipe) => {
  return async function (dispatch) {
    const response = await axios.post("/recipes", recipe);
    const newRecipe = response.data;
    dispatch({ type: CREATE_RECIPE, payload: newRecipe });
  };
};

//-----------------------------------------------------
//Actions Filters

export const filterRecipesByTitle = (payload) => {
  return {
    type: FILTER_BY_TITLE,
    payload,
  };
};
export const filterRecipesById = (payload) => {
  return {
    type: FILTER_BY_ID,
    payload,
  };
};

export const filterRecipesByDiet = (payload) => {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
};
export const filterRecipesByHealt = (payload) => {
  return {
    type: FILTER_BY_HEALTSCORE,
    payload,
  };
};
export const filterRecipeByCreated = (payload) => {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
};

export const setPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const cleanDetail = (payload) => {
  return {
    type: CLEAN_DETAIL,
    payload,
  };
};
