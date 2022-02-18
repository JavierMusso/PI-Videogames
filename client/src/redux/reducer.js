import {
  BUILD_PAGES,
  FILTER_GENRE,
  FILTER_SOURCE,
  GET_GAMES,
  GET_GAMES_BY_NAME,
  GET_GAME_BY_ID,
  GET_GENRES,
  SET_CURRENT,
  SET_GENRE_INPUTS,
  SHOW_SEARCH,
  SORT_BY,
} from "./actions";

const initialState = {
  games: [],
  genres: [],
  pages: [],
  currentPage: 0,
  searchResults: [],
  showSearchResults: false,
  filteredGames: [],
  genreInputs: {},
  filterByGenreGames: [],
};

let gamesPerPage = 15;

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BUILD_PAGES:
      let nPages = Math.ceil(state.filterByGenreGames.length / gamesPerPage);
      let newPages = [];
      for (let i = 0; i < nPages; i++) {
        newPages.push([
          ...state.filterByGenreGames.slice(
            i * gamesPerPage,
            (i + 1) * gamesPerPage
          ),
        ]);
      }
      if (!newPages.length) newPages = `Can't find any game :(`;
      return { ...state, pages: newPages };

    case SET_CURRENT:
      return {
        ...state,
        currentPage: payload,
        searchResults: [],
        showSearchResults: false,
      };

    case SHOW_SEARCH:
      return { ...state, showSearchResults: payload, searchResults: [] };

    case GET_GAMES:
      return {
        ...state,
        games: payload,
        filteredGames: payload,
        filterByGenreGames: payload,
      };

    case GET_GAMES_BY_NAME:
      return { ...state, searchResults: payload };

    case GET_GAME_BY_ID:
      if (!payload) return { ...state, gameDetail: "" };
      return { ...state, gameDetail: payload };

    case GET_GENRES:
      return { ...state, genres: payload };

    case FILTER_SOURCE:
      switch (payload) {
        case "created":
          let createdOnly = state.games.filter((game) => game.id.length === 36);
          return {
            ...state,
            filteredGames: createdOnly,
            currentPage: 0,
            filterByGenreGames: createdOnly,
          };

        case "rawg":
          let rawgOnly = state.games.filter((game) => game.id.length !== 36);
          return {
            ...state,
            filteredGames: rawgOnly,
            currentPage: 0,
            filterByGenreGames: rawgOnly,
          };

        default:
          return {
            ...state,
            filteredGames: state.games,
            filterByGenreGames: state.games,
          };
      }

    case SORT_BY:
      switch (payload) {
        case "AZ":
          // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
          let sortedAZ;
          if (state.showSearchResults) {
            sortedAZ = state.searchResults;
            sortedAZ.sort((a, b) => a.name.localeCompare(b.name));

            return { ...state, searchResults: sortedAZ };
          }
          sortedAZ = state.filterByGenreGames;
          sortedAZ.sort((a, b) => a.name.localeCompare(b.name));

          return { ...state, filterByGenreGames: sortedAZ };
        case "ZA":
          let sortedZA;
          if (state.showSearchResults) {
            sortedZA = state.searchResults;
            sortedZA.sort((a, b) => b.name.localeCompare(a.name));

            return { ...state, searchResults: sortedZA };
          }
          sortedZA = state.filterByGenreGames;
          sortedZA.sort((a, b) => b.name.localeCompare(a.name));

          return { ...state, filterByGenreGames: sortedZA };
        case "HighRated":
          let sortedHigh;
          if (state.showSearchResults) {
            sortedHigh = state.searchResults;
            sortedHigh.sort((a, b) => b.rating - a.rating);

            return { ...state, searchResults: sortedHigh };
          }
          sortedHigh = state.filterByGenreGames;
          sortedHigh.sort((a, b) => b.rating - a.rating);

          return { ...state, filterByGenreGames: sortedHigh };
        case "LowRated":
          let sortedLow;
          if (state.showSearchResults) {
            sortedLow = state.searchResults;
            sortedLow.sort((a, b) => a.rating - b.rating);

            return { ...state, searchResults: sortedLow };
          }
          sortedLow = state.filterByGenreGames;
          sortedLow.sort((a, b) => a.rating - b.rating);

          return { ...state, filterByGenreGames: sortedLow };
        default:
          return state;
      }

    case FILTER_GENRE:
      // dev log
      // console.log(state.genreInputs);

      //
      //    ORDEN:
      //    filtrar by source --> copia games / devuelve filteredGames
      //    filtrar by genres --> copia filteredGames / devuelve filterByGenreGames
      //    sort by AZ-rating --> modifica filterByGenreGames
      //
      //    DEBERIA HACER QUE LOS GENEROS QUEDEN COMO UN STRING CONCATENADO...
      //    para luego poder hacer .include (any genre... )
      //    1 .include por cada filtro que tengo en mi arreglo de filtros
      //
      //
      // iterar objeto. si ninguna key es TRUE, mostrar todos
      // guardar en variable todos las key true, para luego filtrar resultados by genre.
      // 1
      let filters = [];
      for (const filter of Object.entries(state.genreInputs)) {
        if (filter[1]) {
          filters.push(filter[0]);
        }
      }
      if (filters.length) {
        // dev log
        //console.log(`should filter by ${filters.join(", ")}`);

        // filter games by genres
        // if game.genres.length < filters.lenght -> not filtered
        // else game.genres.includes(...filters) -> filtered

        let filterByGenreGames = state.filteredGames;

        for (const filter of filters) {
          filterByGenreGames = filterByGenreGames.filter((game) =>
            game.genres.includes(filter)
          );
        }
        if (!filterByGenreGames.length)
          return {
            ...state,
            filterByGenreGames: [],
          };
        return { ...state, filterByGenreGames: filterByGenreGames };
      } else {
        // case para cuando no hay filtros seleccionados.
        // devuelve todos los juegos
        return { ...state, filterByGenreGames: state.filteredGames };
      }

    case SET_GENRE_INPUTS:
      if (!payload) return { ...state, genreInputs: {} };
      return { ...state, genreInputs: { ...state.genreInputs, ...payload } };

    default:
      return state;
  }
};

export default rootReducer;
