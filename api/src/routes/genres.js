const express = require("express");
const { getGenres } = require("../controllers/Genres");

const router = express.Router();

// get a /genres devuelve una lista de todos los generos disponibles.
// primero los busca de rawg y los guarda en la db, para consumirlos de ahi mas tarde.
router.get("/", async (req, res) => {
  return res.json(await getGenres());
});

module.exports = router;
