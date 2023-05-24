const { Router } = require("express");
const {
  getAllRecipe,
  getRecipeByTitle,
  getRecipeByIdForApi,
  getRecipeByIdForBd,
  createRecipe,
} = require("../controllers/recipeController");

const recipeRoute = Router();

recipeRoute.get("/", async (req, res) => {
  const { title } = req.query;
  try {
    if (title) {
      let recipeByTitle = await getRecipeByTitle(title);
      recipeByTitle.length
        ? res.status(200).send(recipeByTitle)
        : res.status(404).send({ error: "recipe not found" });
    } else {
      const allRecipes = await getAllRecipe();
      res.status(200).send(allRecipes);
    }
  } catch (error) {
    res.status(404).send({ error: "Recipe not found now curioso" });
  }
});

recipeRoute.get("/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe.includes("-")) {
      const recipeByIdBd = await getRecipeByIdForBd(idRecipe);
      res.status(200).send(recipeByIdBd);
    } else {
      const recipeByIdApi = await getRecipeByIdForApi(idRecipe);
      res.status(200).send(recipeByIdApi);
    }
  } catch (error) {
    res.status(400).send({ error: "Recipe not found nada ndaita nada" });
  }
});

recipeRoute.post("/", async (req, res) => {
  const { title, summary, image, healthScore, steps, diets } = req.body;
  try {
    await createRecipe(title, summary, image, healthScore, steps, diets);
    res.status(200).send("Recipe has been created successfully");
  } catch (error) {
    console.error("Error al crear la receta:", error);
    res
      .status(400)
      .send(
        "Hubo un problema al crear la receta. Por favor, inténtalo de nuevo."
      );
  }
});

module.exports = recipeRoute;
