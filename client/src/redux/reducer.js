import {
  BUILD_PAGES,
  FILTER_GENRE,
  FILTER_SOURCE,
  GET_GAMES,
  GET_GAMES_BY_NAME,
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
      let nPages = Math.ceil(state.filteredGames.length / gamesPerPage);
      let newPages = [];
      for (let i = 0; i < nPages; i++) {
        newPages.push([
          ...state.filteredGames.slice(
            i * gamesPerPage,
            (i + 1) * gamesPerPage
          ),
        ]);
      }
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
      return { ...state, games: payload, filteredGames: payload };

    case GET_GAMES_BY_NAME:
      return { ...state, searchResults: payload };

    case GET_GENRES:
      return { ...state, genres: payload };

    case FILTER_SOURCE:
      switch (payload) {
        case "created":
          let createdOnly = state.games.filter((game) => game.id.length === 36);
          return { ...state, filteredGames: createdOnly, currentPage: 0 };

        case "rawg":
          let rawgOnly = state.games.filter((game) => game.id.length !== 36);
          return { ...state, filteredGames: rawgOnly };

        default:
          return { ...state, filteredGames: state.games };
      }

    case SORT_BY:
      switch (payload) {
        case "AZ":
          let sortedAZ;
          if (state.showSearchResults) {
            sortedAZ = state.searchResults;
            sortedAZ.sort((a, b) => a.name.localeCompare(b.name));

            return { ...state, searchResults: sortedAZ };
          }
          sortedAZ = state.filteredGames;
          sortedAZ.sort((a, b) => a.name.localeCompare(b.name));

          return { ...state, filteredGames: sortedAZ };
        case "ZA":
          let sortedZA;
          if (state.showSearchResults) {
            sortedZA = state.searchResults;
            sortedZA.sort((a, b) => b.name.localeCompare(a.name));

            return { ...state, searchResults: sortedZA };
          }
          sortedZA = state.filteredGames;
          sortedZA.sort((a, b) => b.name.localeCompare(a.name));

          return { ...state, filteredGames: sortedZA };
        case "HighRated":
          let sortedHigh;
          if (state.showSearchResults) {
            sortedHigh = state.searchResults;
            sortedHigh.sort((a, b) => b.rating - a.rating);

            return { ...state, searchResults: sortedHigh };
          }
          sortedHigh = state.filteredGames;
          sortedHigh.sort((a, b) => b.rating - a.rating);

          return { ...state, filteredGames: sortedHigh };
        case "LowRated":
          let sortedLow;
          if (state.showSearchResults) {
            sortedLow = state.searchResults;
            sortedLow.sort((a, b) => a.rating - b.rating);

            return { ...state, searchResults: sortedLow };
          }
          sortedLow = state.filteredGames;
          sortedLow.sort((a, b) => a.rating - b.rating);

          return { ...state, filteredGames: sortedLow };
        default:
          return state;
      }

    case FILTER_GENRE:
      console.log(state.genreInputs);
      //
      //    ORDEN:
      //    filtrar by source --> modifica games / devuelve filteredGames
      //    filtrar by genres --> copia filteredGames / devuelve filteredGames2?
      //    sort by AZ-rating --> modifica filteredGames2
      //
      //    DEBERIA HACER QUE LOS GENEROS QUEDEN COMO UN STRING CONCATENADO...
      //    para luego poder hacer .include (any genre... )
      //    1 .include por cada filtro que tengo en mi arreglo de filtros
      //
      //
      // iterar objeto. si ninguna key es TRUE, mostrar todos
      // guardar en variable todos las key true, para luego filtrar resultados by genre.
      // 1
      return state;

    case SET_GENRE_INPUTS:
      return { ...state, genreInputs: { ...state.genreInputs, ...payload } };

    default:
      return state;
  }
};

export default rootReducer;
