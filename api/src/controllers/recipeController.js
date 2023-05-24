require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getAllRecipe = async () => {
  try {
    const apiRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let allApiRecipe = apiRecipe.data.results;
    allApiRecipe = allApiRecipe.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0]?.steps.map((el) => el.step),
        diets: recipe.diets?.map((el) => el),
      };
    });

    let bdRecipe = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["diets"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    bdRecipe = bdRecipe.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,
        healthScore: recipe.healthScore,
        diets: recipe.diets?.map((el) => el.diets),
        steps: recipe.steps?.map((el) => el),
        createInBd: recipe.createInBd,
      };
    });
    let allInfoApiAndBd = [...allApiRecipe, ...bdRecipe];

    return allInfoApiAndBd;
  } catch (error) {
    const errorMessage = `Error al obtener la informacion : ${error.message}`;
    throw new Error(errorMessage);
  }
};

const getRecipeByTitle = async (title) => {
  try {
    const recipeByQueryTitleApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${title}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );
    // if (recipeByQueryTitleApi.data.results.length === 0) {
    //   return [];
    // }
    let recipeByTitleApi = recipeByQueryTitleApi.data.results;
    recipeByTitleApi = recipeByTitleApi.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0]?.steps.map((el) => el.step),
        diets: recipe.diets?.map((el) => el),
      };
    });

    let recipeByQueryTitleBd = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}`,
        },
      },
      include: {
        model: Diet,
        attributes: ["diets"],
        through: {
          attributes: [],
        },
      },
    });
    if (recipeByQueryTitleBd.length) {
      recipeByQueryTitleBd = recipeByQueryTitleBd.map((recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
          summary: recipe.summary,
          image: recipe.image,
          healthScore: recipe.healthScore,
          diets: recipe.diets?.map((el) => el.diets),
          steps: recipe.steps?.map((el) => el),
          createInBd: recipe.createInBd,
        };
      });
    }
    let allRecipesByTitle = [...recipeByTitleApi, ...recipeByQueryTitleBd];
    return allRecipesByTitle;
  } catch (error) {
    throw new Error(error);
  }
};

let getRecipeByIdForApi = async (id) => {
  try {
    let getrecipeByIdApi = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?addRecipeInformation=true&apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    getrecipeByIdApi = getrecipeByIdApi.data;
    let recipeByIdApi = {
      id: getrecipeByIdApi.id,
      title: getrecipeByIdApi.title,
      summary: getrecipeByIdApi.summary,
      image: getrecipeByIdApi.image,
      healthScore: getrecipeByIdApi.healthScore,
      steps: getrecipeByIdApi.analyzedInstructions[0]?.steps.map(
        (el) => el.step
      ),
      diets: getrecipeByIdApi?.diets.map((el) => el),
    };

    return recipeByIdApi;
  } catch (error) {
    const errorMessage = `Error al obtener la informacion : ${error.message}`;
    throw new Error(errorMessage);
  }
};

let getRecipeByIdForBd = async (id) => {
  try {
    recipeByIdBd = await Recipe.findOne({
      where: { id: id },
      include: [
        {
          model: Diet,
          attributes: ["diets"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    // let newFormatDiet = recipeByIdBd.diets.map((el) => el);
    // console.log(recipeByIdBd);
    // return recipeByIdBd;
    return {
      id: recipeByIdBd.id,
      title: recipeByIdBd.title,
      summary: recipeByIdBd.summary,
      image: recipeByIdBd.image,
      healthScore: recipeByIdBd.healthScore,
      diets: recipeByIdBd.diets?.map((el) => el.diets),
      steps: recipeByIdBd.steps?.map((el) => el),
      createInBd: recipeByIdBd.createInBd,
    };
  } catch (error) {
    const errorMessage = `Error al obtener la informacion : ${error.message}`;
    throw new Error(errorMessage);
  }
};

let createRecipe = async (title, summary, image, healthScore, steps, diets) => {
  let [newRecipe, created] = await Recipe.findOrCreate({
    where: {
      title: {
        [Op.iLike]: `%${title}`,
      },
    },
    defaults: {
      title,
      summary,
      image,
      healthScore,
      steps,
    },
  });
  if (!created) {
    throw new Error("La receta ya existe en la base de datos");
  }
  let dietByBd = await Diet.findAll({
    where: {
      diets: diets,
    },
  });
  await newRecipe.addDiet(dietByBd);
  return newRecipe;
};
module.exports = {
  getAllRecipe,
  getRecipeByTitle,
  getRecipeByIdForApi,
  getRecipeByIdForBd,
  createRecipe,
};
