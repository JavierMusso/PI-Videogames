const axios = require("axios");
const { Router } = require("express");
const {
  getVideogames,
  postVideogame,
  getGameByID,
} = require("../controllers/Videogames");
const { getGenres } = require("../controllers/Genres");
const { Genre, Videogame } = require("../db");

const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// get a /videogames devuelve una lista de los primeros 100 juegos
// tambien puede devolver juegos filtrando por name, pasado por query
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  const { success, error } = await getVideogames(name);

  if (error) return res.status(400).json(error);
  return res.json(success);
});

// post a /videogames crea un nuevo videogame con data pasada por body, y lo agrega a la base de datos
router.post("/videogames", async (req, res) => {
  const { success, error } = await postVideogame(req.body);

  if (error) return res.status(400).json(error);
  return res.json(success);
});

// get a /videogames/:id debe devolver los detalles de un juego, ID pasado por params
router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  const { success, error } = await getGameByID(Number(id));

  if (error) return res.status(400).json(error);
  return res.json(success);
});

// get a /genres devuelve una lista de todos los generos disponibles.
// primero los busca de rawg y los guarda en la db, para consumirlos de ahi mas tarde.
router.get("/genres", async (req, res) => {
  return res.json(await getGenres());
});

module.exports = router;
