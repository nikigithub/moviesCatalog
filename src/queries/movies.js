import { fetchDataAtUrl } from '../util/NetworkRequest';

function moviewByUrl({ query, id, credits=`` }) {
  const appKey = `248388e4c0fb93d7a4463ed3b1844778`;

  if (id) {
    return `http://api.themoviedb.org/3/movie/${id}${credits}?api_key=${appKey}&language=en-US`;
  } else {
    return `http://api.themoviedb.org/3/search/movie${query}&api_key=${appKey}&language=en-US`;
  }
}

const MoviesActions = {
  MovieByTitle(title) {
    const query = `?t=${title}&r=json`;
    const url = `http://www.omdbapi.com/${query}`;
    return fetchDataAtUrl(url);
  },

  MovieById(id) {
    const url = moviewByUrl({ id });
    return fetchDataAtUrl(url);
  },

  CreditsById(id) {
    const credits = '/credits';
    const url = moviewByUrl({ id, credits });
    return fetchDataAtUrl(url);
  },

  ListMoviesByTitle(title) {
    const query = `?query=${title}`;
    const url = moviewByUrl({ query });
    return fetchDataAtUrl(url);
  }

};

export default MoviesActions;
