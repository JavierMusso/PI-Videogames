const axios = require("axios");
const { Router } = require("express");
const genresRoutes = require("./genres");
const videogamesRoutes = require("./videogames");

const router = Router();

router.use("/videogames", videogamesRoutes);
router.use("/genres", genresRoutes);

module.exports = router;
