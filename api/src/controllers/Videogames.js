const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

// cantidad de paginas a llenar (100 / 20 = 5)
const qtyOfGames = 1;

module.exports = {
  async getVideogames(name) {
    // si tengo un name por query, busca y devuelve 15 resultados que contienen ese nombre
    let videogames = [];
    if (name) {
      // deberia buscar primero en la BD.
      // despues en la api, concatenar hasta tener 15 resultados.

      let gamesDB = await Videogame.findAll({
        limit: 15,
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      if (gamesDB.length === 15) return { success: gamesDB };

      videogames.push(...gamesDB);

      let { data } = await axios.get(`https://api.rawg.io/api/games`, {
        params: { search: name, key: API_KEY },
      });

      let gamesNeeded = 15 - videogames.length;
      data.results.slice(0, gamesNeeded).map((game) => {
        let genres = game.genres.map((genre) => genre.name);
        videogames.push({
          id: game.id,
          name: game.name,
          rating: game.rating,
          image: game.background_image,
          genres: genres,
        });
      });

      if (!videogames.length) {
        return { error: `Error: no videogames found for ${name}` };
      }
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
      let genres = game.genres.map((genre) => genre.name);
      videogames.push({
        id: game.id,
        name: game.name,
        rating: Number(game.rating),
        image: game.image,
        genres: genres,
      });
    });

    for (let i = 1; i <= qtyOfGames; i++) {
      let { data } = await axios.get(`https://api.rawg.io/api/games`, {
        params: { key: API_KEY, page: i },
      });

      data.results.map((game) => {
        let genres = game.genres.map((genre) => genre.name);

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
    const { name, description, released, rating, platforms, genres, image } =
      body;

    if (!name || typeof name !== "string")
      return { error: "Error: Not a valid Name" };
    if (!description || typeof description !== "string")
      return { error: "Error: Not a valid description" };
    if (!platforms || typeof platforms !== "string")
      return { error: "Error: Not a valid platform" };

    console.log(image);
    let newVideogame = {
      name,
      description,
      released,
      rating,
      platforms,
      image,
    };

    const [videogame, created] = await Videogame.findOrCreate({
      where: newVideogame,
    });

    await videogame.addGenres(genres);

    if (created) return { success: "Game created succesfully!" };
    return { success: "Game already exist!" };
  },

  async getGameByID(id) {
    if (!id) return { error: "Error: Invalid ID" };

    // should check what ID is, and look either in rawg or my api.

    if (id.length < 36) {
      let { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: { key: API_KEY },
      });

      let platforms = data.parent_platforms.map(
        (parent) => parent.platform.name
      );
      let genres = data.genres.map((genre) => genre.name);

      let foundGame = {
        image: data.background_image,
        name: data.name,
        genre: genres,
        description: data.description_raw,
        released: data.released,
        rating: data.rating,
        platforms: platforms.join(", "),
      };

      return { success: foundGame };
    }

    let gameDB = await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    let genres = gameDB.genres.map((genre) => genre.name);

    let foundGame = {
      image: gameDB.image,
      name: gameDB.name,
      genre: genres,
      description: gameDB.description,
      released: gameDB.released,
      rating: gameDB.rating,
      platforms: gameDB.platforms,
    };

    return { success: foundGame };
  },
};
