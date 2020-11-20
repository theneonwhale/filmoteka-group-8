import debounce from 'lodash.debounce';
// import itemTpl from '../templates/card-item.hbs';
import movieItemsTpl from '../templates/movie.hbs';

const refs = {
  container: document.querySelector('.js-cards-markup'),
  errorEl: document.querySelector('.error-text'),
  inputField: document.querySelector('.search-form input'),
  spinner: document.querySelector('.spinner'),
};

// function fetchFilm(search) {
//   return fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=726653b8cacb73d155407508fdc35e60&query=${search}&page=1&include_adult=false`,
//   )
//     .then(response => response.json())
//     .then(({ results }) => {
//       return results;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// refs.inputField.addEventListener('input', debounce(getFilmData, 500));

// function getFilmData(e) {
//   // refs.spinner.classList.add('active');
//   if (e.target.value) {
//     fetchFilm(e.target.value).then(results => {
//       if (results.length === 0) {
//         refs.errorEl.style.display = 'block';
//       } else {
//         refs.errorEl.style.display = 'none';
//         refs.container.innerHTML = '';
//         const cardMarckup = movieItemsTpl(results);
//         refs.container.insertAdjacentHTML('afterbegin', cardMarckup);
//         // refs.spinner.classList.remove('active');
//       }
//     });
//   } else if (e.target.value === '') {
//     location.reload();
//   }
// }
const Pagination = require('tui-pagination');
import 'tui-pagination/dist/tui-pagination.css';

const paginationContainer = document.getElementById('tui-pagination-container');

function fetchFilm(search, page = 1) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=726653b8cacb73d155407508fdc35e60&query=${search}&page=${page}&include_adult=false`,
  ).then(response => response.json());
  // .then(({ results }) => {
  //   return results;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
}

refs.inputField.addEventListener('input', debounce(getFilmData, 500));

function getFilmData(e) {
  // refs.spinner.classList.add('active');
  if (e.target.value) {
    fetchFilm(e.target.value).then(responce => {
      if (responce.results === 0) {
        refs.errorEl.style.display = 'block';
      } else {
        const myPagination = new Pagination(paginationContainer, {
          totalItems: responce.total_pages,
          itemsPerPage: 20,
          visiblePages: 4,
          centerAlign: true,
        });

        myPagination.on('afterMove', function (eventData) {
          let currentPage = eventData.page;

          fetchFilm(e.target.value, currentPage).then(responce => {
            const cardMarckup = movieItemsTpl(responce.results);
            refs.container.insertAdjacentHTML('afterbegin', cardMarckup);
          });
        });

        refs.errorEl.style.display = 'none';
        refs.container.innerHTML = '';
        const cardMarckup = movieItemsTpl(responce.results);
        refs.container.insertAdjacentHTML('afterbegin', cardMarckup);
        // refs.spinner.classList.remove('active');
      }
    });
  } else if (e.target.value === '') {
    location.reload();
  }
}
