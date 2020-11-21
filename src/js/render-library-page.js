import movieItemTpl from '../templates/movie-item-library.hbs';
const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';
const genreIdsArr = [];
fetchGenreIds();
console.log(genreIdsArr);

const movieListEL = document.querySelector('.js-cards-markup');
const paginationContainer = document.getElementById('tui-pagination-container');

const refs = {
  buttonsBoxEl: document.querySelector('.buttons-wrapper'),
  watchedBtnEl: document.querySelector('.js-watched'),
  queueBtnEl: document.querySelector('.js-queue'),
  moviesListEl: document.querySelector('.js-cards-markup'),
  paginationContainer: document.getElementById('tui-pagination-container'),
};

const WATCHED_ARRAY = JSON.parse(localStorage.getItem('watched-movie-list'));
const QUEUE_ARRAY = JSON.parse(localStorage.getItem('queue-movie-list'));

onWatchedBtnClick();
// console.log(WATCHED_ARRAY);
// console.log(QUEUE_ARRAY);

refs.watchedBtnEl.addEventListener('click', onWatchedBtnClick);
refs.queueBtnEl.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  clearMoviesList();
  refs.watchedBtnEl.classList.add('active');
  refs.queueBtnEl.classList.remove('active');
  if (WATCHED_ARRAY === null) {
    refs.moviesListEl.innerHTML =
      '<p>There is nothing in the watched list.</p>';
    return;
  }
  WATCHED_ARRAY.forEach(id => getMovie(id));

  // const myPagination = new Pagination(paginationContainer, {
  //   totalItems: WATCHED_ARRAY.length,
  //   itemsPerPage: 3,
  //   visiblePages: 4,
  //   page: 1,
  //   centerAlign: true,
  // });

  // myPagination.on('afterMove', function (eventData) {
  //   WATCHED_ARRAY.forEach(id => getMovie(id));
  // });
}

function onQueueBtnClick() {
  refs.watchedBtnEl.classList.remove('active');
  refs.queueBtnEl.classList.add('active');
  clearMoviesList();
  if (QUEUE_ARRAY === null) {
    refs.moviesListEl.innerHTML =
      '<p>There is nothing in the watched list.</p>';
    return;
  }
  QUEUE_ARRAY.forEach(id => getMovie(id));
}

// fetch

function fetchGenreIds() {
  fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
    .then(responce => responce.json())
    .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
}

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
function fetchMovieById(id, page) {
  // console.log(id);
  return fetch(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`,
  ).then(response => response.json());
}

function getMovie(id) {
  fetchMovieById(id).then(movie => appendMoviesMarkup(movie));
}

function appendMoviesMarkup(movie) {
  // refs.ldsCircle.classList.add('lds-circle');
  console.log(movie);
  movie.release_date = movie.release_date.slice(0, 4);
  movie.genres.forEach(({ name }) => console.log(name));
  if (movie.genres.length === 0) {
    movie.genres.push({ name: 'No genre' });
  } else if (movie.genres.length <= 3) {
    movie.genres.forEach(({ id, name }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    movie.genres[movie.genres.length - 1] = movie.genres[
      movie.genres.length - 1
    ].slice(0, movie.genres[movie.genres.length - 1].length - 1);
  } else {
    movie.genres.forEach(({ id, name }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    const tempArr = [];

    tempArr.push(movie.genres[0]);
    tempArr.push(movie.genres[1]);
    tempArr.push('Other');

    movie.genres.splice(0, movie.genres.length, ...tempArr);
  }

  refs.moviesListEl.insertAdjacentHTML('afterbegin', movieItemTpl(movie));
  // refs.ldsCircle.classList.remove('lds-circle');
}

function clearMoviesList() {
  refs.moviesListEl.innerHTML = '';
}

const options = {
  // below default value of options
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};
const pagination = new Pagination(paginationContainer, options);

// fetchDayMovies().then(responce => {
//   renderResults(responce.results);

//   const myPagination = new Pagination(paginationContainer, {
//     totalItems: responce.total_pages,
//     itemsPerPage: 20,
//     visiblePages: 4,
//     centerAlign: true,
//   });

//   myPagination.on('afterMove', function (eventData) {
//     fetchDayMovies(eventData.page)
//       .then(responce => {
//         renderResults(responce.results);
//       })
//       .catch(console.log);
//   });
// });

// function renderResults(results) {
//   movieListEL.innerHTML = '';

//   results.forEach(movieObj => {
//     movieObj.release_date = movieObj.release_date.slice(0, 4);

//     if (movieObj.genre_ids.length === 0) {
//       movieObj.genre_ids.push('No genre');
//     } else if (movieObj.genre_ids.length <= 3) {
//       movieObj.genre_ids.forEach((currentId, index) => {
//         const idObj = genreIdsArr.find(genreObj => genreObj.id === currentId);

//         movieObj.genre_ids[index] = `${idObj.name},`;
//       });

//       movieObj.genre_ids[movieObj.genre_ids.length - 1] = movieObj.genre_ids[
//         movieObj.genre_ids.length - 1
//       ].slice(0, movieObj.genre_ids[movieObj.genre_ids.length - 1].length - 1);
//     } else {
//       movieObj.genre_ids.forEach((currentId, index) => {
//         const idObj = genreIdsArr.find(genreObj => genreObj.id === currentId);

//         movieObj.genre_ids[index] = `${idObj.name},`;
//       });

//       const tempArr = [];

//       tempArr.push(movieObj.genre_ids[0]);
//       tempArr.push(movieObj.genre_ids[1]);
//       tempArr.push('Other');

//       movieObj.genre_ids.splice(0, movieObj.genre_ids.length, ...tempArr);
//     }
//   });

//   movieListEL.insertAdjacentHTML('afterbegin', movieItemsTpl(results));
// }
