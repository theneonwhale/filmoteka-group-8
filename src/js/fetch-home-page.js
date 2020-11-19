import movieItemsTpl from '../templates/movie.hbs';
const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';

// https://api.themoviedb.org/3/movie/popular/?api_key=726653b8cacb73d155407508fdc35e60
// https://api.themoviedb.org/3/?api_key=726653b8cacb73d155407508fdc35e60

const movieListEL = document.querySelector('.js-cards-markup');
const paginationContainer = document.getElementById('tui-pagination-container');

function fetchDayMovies(page = 1) {
  return fetch(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`,
  ).then(response => response.json());
}

fetchDayMovies().then(responce => {
  renderResults(responce.results);

  const myPagination = new Pagination(paginationContainer, {
    totalItems: responce.total_pages,
    itemsPerPage: 20,
    visiblePages: 4,
    centerAlign: true,
  });

  myPagination.on('afterMove', function (eventData) {
    let currentPage = eventData.page;

    fetchDayMovies(currentPage).then(responce =>
      renderResults(responce.results),
    );
  });
});

function renderResults(results) {
  movieListEL.innerHTML = '';

  results.forEach(movieObj => {
    movieObj.release_date = movieObj.release_date.slice(0, 4);
  });

  movieListEL.insertAdjacentHTML('afterbegin', movieItemsTpl(results));
}
