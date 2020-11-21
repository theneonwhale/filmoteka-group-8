import movieItemTpl from '../templates/movie-item-library.hbs';
const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';
const genreIdsArr = [];
// fetchGenreIds();

const movieListEL = document.querySelector('.js-cards-markup');
const paginationContainer = document.getElementById('tui-pagination-container');

const refs = {
  buttonsBoxEl: document.querySelector('.buttons-wrapper'),
  watchedBtnEl: document.querySelector('.js-watched'),
  queueBtnEl: document.querySelector('.js-queue'),
  moviesListEl: document.querySelector('.js-cards-markup'),
};

const WATCHED_ARRAY = JSON.parse(localStorage.getItem('watched-movie-list'));
const QUEUE_ARRAY = JSON.parse(localStorage.getItem('queue-movie-list'));

console.log(WATCHED_ARRAY);
console.log(QUEUE_ARRAY);

// const arrayOfMovies = [
//   {
//     original_name: 'Game of Thrones',
//     id: 1399,
//     name: 'Game of Thrones',
//     vote_count: 4772,
//     vote_average: 8.2,
//     first_air_date: '2011-04-17',
//     poster_path: '/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg',
//     genre_ids: [18, 10759, 10765],
//     original_language: 'en',
//     backdrop_path: '/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg',
//     overview:
//       "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
//     origin_country: ['US'],
//     popularity: 61.91,
//   },
//   {
//     adult: false,
//     backdrop_path: '/5a7lMDn3nAj2ByO0X1fg6BhUphR.jpg',
//     genre_ids: [12, 14, 878],
//     id: 333339,
//     original_language: 'en',
//     original_title: 'Ready Player One',
//     overview:
//       'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.',
//     poster_path: '/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
//     release_date: '2018-03-28',
//     title: 'Ready Player One',
//     video: false,
//     vote_average: 7.7,
//     vote_count: 3673,
//     popularity: 68.153,
//   },
// ];
// localStorage.setItem('watched', JSON.stringify(arrayOfMovies));

refs.watchedBtnEl.classList.add('active');

refs.buttonsBoxEl.addEventListener('click', onBtnClick);

function onBtnClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (!event.target.classList.contains('active')) {
    refs.buttonsBoxEl.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
  }

  if (event.target.classList.contains('js-watched')) {
    onWatchedBtnClick();
  }

  //   console.log(event.target);
}

function onWatchedBtnClick() {
  if (WATCHED_ARRAY === null) {
    refs.moviesListEl.innerHTML =
      '<p>There is nothing in the watched list.</p>';
    return;
  }
  getMovies();
}

function onQueueBtnClick() {}

// fetch

// function fetchGenreIds() {
//   fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
//     .then(responce => responce.json())
//     .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
// }

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
function fetchMovieById(id) {
  console.log(id);
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(response => response.json())
    .then(movie => {
      console.log(movie);
      return movie;
    });
}

function getMovies() {
  const result = WATCHED_ARRAY.map(id => {
    return fetchMovieById(id);
  });
  console.log(result);
  appendMoviesMarkup(result);
}

function appendMoviesMarkup(movie) {
  // refs.ldsCircle.classList.add('lds-circle');
  refs.moviesListEl.insertAdjacentHTML('afterbegin', movieItemTpl(movie));
  // refs.ldsCircle.classList.remove('lds-circle');
}

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
