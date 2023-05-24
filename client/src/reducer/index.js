import {
  GET_ALL_RECIPES,
  GET_DIETS,
  GET_BY_TITLE,
  GET_BY_ID,
  CREATE_RECIPE,
  FILTER_BY_TITLE,
  FILTER_BY_DIET,
  FILTER_BY_HEALTSCORE,
  FILTER_BY_CREATED,
  FILTER_BY_ID,
  SET_CURRENT_PAGE,
  CLEAN_DETAIL,
} from "../actions";

const initialState = {
  recipes: [],
  allrecipes: [],
  diets: [],
  detailRecipe: [],
  currentPage: 1,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allrecipes: action.payload,
      };

    case GET_BY_TITLE:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        detailRecipe: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case FILTER_BY_TITLE:
      if (action.payload === "asc") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            return a.title.localeCompare(b.title);
          }),
        };
      } else if (action.payload === "desc") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            return b.title.localeCompare(a.title);
          }),
        };
      } else {
        return {
          ...state,
          recipes: state.recipes,
        };
      }

    case FILTER_BY_HEALTSCORE:
      if (action.payload === "asc") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            return a.healthScore - b.healthScore;
          }),
        };
      } else if (action.payload === "desc") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            return b.healthScore - a.healthScore;
          }),
        };
      } else {
        return {
          ...state,
          recipes: state.recipes,
        };
      }

    case FILTER_BY_DIET:
      const recipeByDiets =
        action.payload === "ALL"
          ? state.allrecipes
          : state.allrecipes.filter((recipe) => {
              return recipe.diets.includes(action.payload);
            });
      return {
        ...state,
        recipes: recipeByDiets,
      };

    case FILTER_BY_CREATED:
      const recipeByCreated =
        action.payload === "ALL"
          ? state.allrecipes
          : action.payload === "database"
          ? state.allrecipes.filter((el) => el.createInBd)
          : state.allrecipes.filter((el) => !el.createInBd);
      return {
        ...state,
        recipes: recipeByCreated,
      };

    case FILTER_BY_ID:
      return {
        ...state,
        detailRecipe: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        detailRecipe: {},
      };

    default:
      return { ...state };
  }
};
export default rootReducer;
