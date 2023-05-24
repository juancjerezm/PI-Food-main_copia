const { Router } = require("express");
const { getDietByApi } = require("../controllers/dietController");

const dietRoute = Router();

dietRoute.get("/", async (req, res) => {
  try {
    const alldiets = await getDietByApi();
    res.status(200).send(alldiets);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = dietRoute;
