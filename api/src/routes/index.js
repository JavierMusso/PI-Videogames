const axios = require("axios");
const { Router } = require("express");
const genresRoutes = require("./genres");
const videogamesRoutes = require("./videogames");
const fs = require("fs");

const router = Router();

router.use("/videogames", videogamesRoutes);
router.use("/genres", genresRoutes);

router.get("/default-game.jpg", (req, res) => {
  res.sendFile("default-game.jpg", { root: __dirname });
});

module.exports = router;
