const express = require("express");
const {
  getVideogames,
  postVideogame,
  getGameByID,
} = require("../controllers/Videogames");

const router = express.Router();

// get a /videogames devuelve una lista de los primeros 100 juegos
// tambien puede devolver juegos filtrando por name, pasado por query
router.get("/", async (req, res) => {
  const { name } = req.query;
  const { success, error } = await getVideogames(name);

  if (error) return res.json(error);
  return res.json(success);
});

// post a /videogames crea un nuevo videogame con data pasada por body, y lo agrega a la base de datos
router.post("/", async (req, res) => {
  const { success, error } = await postVideogame(req.body);

  if (error) return res.json(error);
  return res.json(success);
});

// get a /videogames/:id debe devolver los detalles de un juego, ID pasado por params
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { success, error } = await getGameByID(id);

  if (error) return res.json(error);
  return res.json(success);
});

module.exports = router;
