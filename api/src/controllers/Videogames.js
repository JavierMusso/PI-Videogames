const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

// cantidad de paginas de api que quiero cargar
const qtyOfGames = 1;

module.exports = {
  async getVideogames(name) {
    // si tengo un name por query, busca y devuelve 15 resultados que contienen ese nombre
    let videogames = [];
    if (name) {
      let { data } = await axios.get(`https://api.rawg.io/api/games`, {
        params: { search: name, key: API_KEY },
      });
      if (!data.count)
        return { error: `Error: no videogames found for ${name}` };

      data.results.slice(0, 15).map((game) => {
        let platforms = game.parent_platforms
          .map((parent) => parent.platform.id)
          .join(", ");

        let genres = game.genres.map((genre) => genre.id).join(", ");

        videogames.push({
          id: game.id,
          name: game.name,
          description: "",
          released: game.released,
          rating: game.rating,
          platforms: platforms,
          genres: genres,
          image: game.background_image,
        });
      });

      return { success: videogames };
    }

    // si es invocado sin parametros, devuelve una cantidad determinada de juegos + los juegos en mi DB

    let gamesDB = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    gamesDB.map((game) => {
      videogames.push({
        id: game.id,
        name: game.name,
        rating: Number(game.rating),
        image: "",
        genres: game.genres,
      });
    });

    for (let i = 1; i <= qtyOfGames; i++) {
      let { data } = await axios.get(`https://api.rawg.io/api/games`, {
        params: { key: API_KEY, page: i },
      });

      data.results.map((game) => {
        let genres = game.genres.map((genre) => {
          return { name: genre.name };
        });

        videogames.push({
          id: game.id,
          name: game.name,
          rating: game.rating,
          image: game.background_image,
          genres: genres,
        });
      });
    }

    return { success: videogames };
  },

  async postVideogame(body) {
    const { name, description, released, rating, platforms, genres } = body;

    if (!name || typeof name !== "string")
      return { error: "Error: Not a valid Name" };
    if (!description || typeof description !== "string")
      return { error: "Error: Not a valid description" };
    if (!platforms || typeof platforms !== "string")
      return { error: "Error: Not a valid platform" };

    let newVideogame = {
      name,
      description,
      released,
      rating,
      platforms,
    };

    const [videogame, created] = await Videogame.findOrCreate({
      where: newVideogame,
    });

    await videogame.addGenres(genres);

    if (created) return { success: "Game created succesfully!" };
    return { success: "Game already exist!" };
  },

  async getGameByID(id) {
    if (!id || typeof id !== "number") return { error: "Error: Invalid ID" };

    let { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: { key: API_KEY },
    });

    let platforms = data.parent_platforms.map((parent) => parent.platform.name);
    let genres = data.genres.map((genre) => {
      return { name: genre.name };
    });

    let foundGame = {
      image: data.background_image,
      name: data.name,
      genre: genres,
      description: data.description_raw,
      released: data.released,
      rating: data.rating,
      platforms: platforms,
    };

    return { success: foundGame };
  },
};
