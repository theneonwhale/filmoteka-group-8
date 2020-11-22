import movieItemsTpl from '../templates/movie.hbs';
const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';
const genreIdsArr = [];
fetchGenreIds();

// https://api.themoviedb.org/3/search/movie?api_key=726653b8cacb73d155407508fdc35e60&query=vav&page=1&include_adult=false
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=726653b8cacb73d155407508fdc35e60&language=en-US
// https://api.themoviedb.org/3/genre/movie/list?api_key=726653b8cacb73d155407508fdc35e60&language=en-US
// https://api.themoviedb.org/3/movie/popular/?api_key=726653b8cacb73d155407508fdc35e60
// https://api.themoviedb.org/3/?api_key=726653b8cacb73d155407508fdc35e60

const movieListEL = document.querySelector('.js-cards-markup');
const paginationContainer = document.getElementById('tui-pagination-container');

function fetchGenreIds() {
  fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
    .then(responce => responce.json())
    .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
}

function fetchDayMovies(page = 1) {
  return fetch(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`,
  ).then(response => response.json());
}

fetchDayMovies().then(responce => {
  renderResults(responce.results);

  const myPagination = new Pagination(paginationContainer, {
    totalItems: responce.total_results,
    itemsPerPage: 20,
    visiblePages: 4,
    centerAlign: true,
    usageStatistics: false,
  });

  myPagination.on('afterMove', function (eventData) {
    fetchDayMovies(eventData.page)
      .then(responce => {
        renderResults(responce.results);
      })
      .catch(console.log);
    scrollToTop();
  });
});

function renderResults(results) {
  movieListEL.innerHTML = '';

  results.forEach(movieObj => {
    if (movieObj.release_date) {
      movieObj.release_date = movieObj.release_date.slice(0, 4);
    }

    if (movieObj.genre_ids.length === 0) {
      movieObj.genre_ids.push('No genre');
    } else if (movieObj.genre_ids.length <= 3) {
      movieObj.genre_ids.forEach((currentId, index) => {
        const idObj = genreIdsArr.find(genreObj => genreObj.id === currentId);

        movieObj.genre_ids[index] = `${idObj.name},`;
      });

      movieObj.genre_ids[movieObj.genre_ids.length - 1] = movieObj.genre_ids[
        movieObj.genre_ids.length - 1
      ].slice(0, movieObj.genre_ids[movieObj.genre_ids.length - 1].length - 1);
    } else {
      movieObj.genre_ids.forEach((currentId, index) => {
        const idObj = genreIdsArr.find(genreObj => genreObj.id === currentId);

        movieObj.genre_ids[index] = `${idObj.name},`;
      });

      const tempArr = [];

      tempArr.push(movieObj.genre_ids[0]);
      tempArr.push(movieObj.genre_ids[1]);
      tempArr.push('Other');

      movieObj.genre_ids.splice(0, movieObj.genre_ids.length, ...tempArr);
    }
  });
  movieListEL.insertAdjacentHTML('afterbegin', movieItemsTpl(results));
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
