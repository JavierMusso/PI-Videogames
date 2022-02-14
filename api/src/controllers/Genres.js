const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

module.exports = {
  async getGenres() {
    // busco los generos en mi DB
    let genres = await Genre.findAll();

    // checkeo si ya tengo los generos en mi DB
    if (genres.length) {
      // dev
      console.log("Generos enviados desde DB.");
      return genres;
    }

    // si no los tengo (first time case) los voy a buscar a la api, los envio a mi DB, y devuelvo resultado desde mi DB
    let { data } = await axios.get(`https://api.rawg.io/api/genres`, {
      params: { key: API_KEY },
    });

    let genresBulk = [];
    data.results.map((genre) => {
      genresBulk.push({ id: genre.id, name: genre.name });
    });

    // a bulkCreate le paso arreglo de objetos
    await Genre.bulkCreate(genresBulk, {
      ignoreDuplicates: true,
    });

    genres = await Genre.findAll();

    // dev
    console.log("Generos ingresados a DB y enviados.");
    return genres;
  },
};
