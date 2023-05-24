require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require("../db");

let getDietByApi = async () => {
  try {
    const existingDiets = await Diet.findAll();

    if (existingDiets.length > 0) {
      console.log("Diet data already exists in the database.");
      return existingDiets.map((diet) => diet.diets);
    }

    const recipesApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let allRecipes = recipesApi.data.results;
    const mapDiets = allRecipes.map((recipe) =>
      recipe.diets.map((diet) => diet)
    );
    let diets = [...new Set(mapDiets.flat())];
    console.log("estas son las diets", diets);
    const dietsObject = diets.map((diet) => ({ diets: diet }));

    await Diet.bulkCreate(dietsObject);
    return diets;
  } catch (error) {
    const errorMessage = `Error getting the information : ${error.message}`;
    throw new Error(errorMessage);
  }
};

// let dietsDatabase = async (diets) => {
//   try {
//     const dietsObject = diets.map((diet) => ({ diets: diet }));
//     await Diet.bulkCreate(dietsObject);
//   } catch (error) {
//     const errorMessage = `Error al obtener la informacion : ${error.message}`;
//     throw new Error(errorMessage);
//   }
// };

// let dietMain = async () => {
//   const allDiets = getDietByApi();
//   await dietsDatabase(allDiets);
// };

module.exports = { getDietByApi };
