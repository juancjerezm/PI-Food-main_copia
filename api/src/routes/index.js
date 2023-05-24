const { Router } = require("express");
const recipeRoute = require("./recipeRouter");
const dietRoute = require("./dietRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/recipes", recipeRoute);
router.use("/diets", dietRoute);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
