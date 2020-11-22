import debounce from 'lodash.debounce';
import movieItemsTpl from '../templates/movie.hbs';
import getRefs from './get-refs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';

const refs = getRefs();

const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const paginationContainer = document.getElementById('tui-pagination-container');

const genreIdsArr = [];
fetchGenreIds();

function fetchGenreIds() {
  fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
    .then(responce => responce.json())
    .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
}

function fetchFilm(search, page = 1) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}&page=${page}&include_adult=false`,
  ).then(response => response.json());
}

refs.inputField.addEventListener('input', debounce(getFilmData, 500));

function getFilmData(e) {
  if (e.target.value) {
    fetchFilm(e.target.value).then(response => {
      if (!response.results.length) {
        refs.errorEl.style.display = 'block';
      } else {
        const myPagination = new Pagination(paginationContainer, {
          totalItems: response.total_pages,
          itemsPerPage: 20,
          visiblePages: 4,
          centerAlign: true,
        });

        myPagination.on('afterMove', function (eventData) {
          let currentPage = eventData.page;

          fetchFilm(e.target.value, currentPage).then(response => {
            const cardMarkup = movieItemsTpl(response.results);

            refs.movieListEL.insertAdjacentHTML('afterbegin', cardMarkup);
          });

          scrollToTop();
        });

        refs.errorEl.style.display = 'none';

        refs.movieListEL.innerHTML = '';

        response.results.forEach(movieObj => {
          movieObj.release_date = movieObj.release_date.slice(0, 4);
          if (movieObj.genre_ids.length === 0) {
            movieObj.genre_ids.push('No genre');
          } else if (movieObj.genre_ids.length <= 3) {
            movieObj.genre_ids.forEach((currentId, index) => {
              const idObj = genreIdsArr.find(
                genreObj => genreObj.id === currentId,
              );

              movieObj.genre_ids[index] = `${idObj.name},`;
            });

            movieObj.genre_ids[
              movieObj.genre_ids.length - 1
            ] = movieObj.genre_ids[movieObj.genre_ids.length - 1].slice(
              0,
              movieObj.genre_ids[movieObj.genre_ids.length - 1].length - 1,
            );
          } else {
            movieObj.genre_ids.forEach((currentId, index) => {
              const idObj = genreIdsArr.find(
                genreObj => genreObj.id === currentId,
              );

              movieObj.genre_ids[index] = `${idObj.name},`;
            });

            const tempArr = [];

            tempArr.push(movieObj.genre_ids[0]);
            tempArr.push(movieObj.genre_ids[1]);
            tempArr.push('Other');

            movieObj.genre_ids.splice(0, movieObj.genre_ids.length, ...tempArr);
          }
        });

        const cardMarkup = movieItemsTpl(response.results);

        refs.movieListEL.insertAdjacentHTML('afterbegin', cardMarkup);
      }
    });
  } else if (e.target.value === '') {
    location.reload();
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
