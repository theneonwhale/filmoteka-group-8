import movieItemTpl from '../templates/movie-library.hbs';
import getRefs from './get-refs';

const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';

const refs = getRefs();

const genreIdsArr = [];
fetchGenreIds();

const WATCHED_ARRAY = JSON.parse(localStorage.getItem('watched-movie-list'));
const QUEUE_ARRAY = JSON.parse(localStorage.getItem('queue-movie-list'));

onWatchedBtnClick();

refs.watchedBtnEl.addEventListener('click', onWatchedBtnClick);
refs.queueBtnEl.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  clearMoviesList();

  refs.watchedBtnEl.classList.add('active');

  refs.queueBtnEl.classList.remove('active');

  if (WATCHED_ARRAY === null || WATCHED_ARRAY.length === 0) {
    refs.movieListEl.innerHTML = '<p>There is nothing in the watched list.</p>';

    refs.paginationContainer.innerHTML = '';

    return;
  }

  renderLibraryResults(WATCHED_ARRAY);
}

function onQueueBtnClick() {
  refs.watchedBtnEl.classList.remove('active');

  refs.queueBtnEl.classList.add('active');

  clearMoviesList();

  if (QUEUE_ARRAY === null || QUEUE_ARRAY.length === 0) {
    refs.movieListEl.innerHTML = '<p>There is nothing in the queue list.</p>';

    refs.paginationContainer.innerHTML = '';

    return;
  }

  renderLibraryResults(QUEUE_ARRAY);
}

// fetch
function fetchGenreIds() {
  fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
    .then(responce => responce.json())
    .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
}

function fetchMovieById(id) {
  return fetch(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`,
  ).then(response => response.json());
}

function getMovie(id) {
  fetchMovieById(id).then(movie => appendMoviesMarkup(movie));
}

function appendMoviesMarkup(movie) {
  if (movie.release_date) {
    movie.release_date = movie.release_date.slice(0, 4);
  }

  if (movie.genres.length === 0) {
    movie.genres.push({ name: 'No genre' });
  } else if (movie.genres.length <= 3) {
    movie.genres.forEach(({ id }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    movie.genres[movie.genres.length - 1] = movie.genres[
      movie.genres.length - 1
    ].slice(0, movie.genres[movie.genres.length - 1].length - 1);
  } else {
    movie.genres.forEach(({ id }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    const tempArr = [];

    tempArr.push(movie.genres[0]);
    tempArr.push(movie.genres[1]);
    tempArr.push('Other');

    movie.genres.splice(0, movie.genres.length, ...tempArr);
  }

  refs.movieListEL.insertAdjacentHTML('afterbegin', movieItemTpl(movie));
}

function clearMoviesList() {
  refs.movieListEL.innerHTML = '';
}

function renderLibraryResults(renderArray, page = 1) {
  clearMoviesList();

  const moviesPerPage = 6;

  renderArray.forEach((id, index) => {
    if (
      index >= page * moviesPerPage - moviesPerPage &&
      index <= page * moviesPerPage - 1
    ) {
      getMovie(id);
    }
  });

  const myPagination = new Pagination(refs.paginationContainer, {
    totalItems: renderArray.length,
    itemsPerPage: moviesPerPage,
    visiblePages: 4,
    page: page,
    centerAlign: true,
    usageStatistics: false,
  });

  myPagination.on('afterMove', function (eventData) {
    renderLibraryResults(renderArray, eventData.page);
  });

  scrollToTop();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
