import debounce from 'lodash.debounce';
import itemTpl from '../templates/card-item.hbs';

const refs = {
  container: document.querySelector('.js-cards-markup'),
  errorEl: document.querySelector('.error-text'),
  inputField: document.querySelector('.search-form input'),
};

function fetchFilm(search) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=726653b8cacb73d155407508fdc35e60&query=${search}&page=1&include_adult=false`,
  )
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .catch(error => {
      console.log(error);
    });
}

refs.inputField.addEventListener('input', debounce(getFilmData, 500));

function getFilmData(e) {
  if (e.target.value) {
    fetchFilm(refs.inputField.value).then(results => {
      console.log(results);
      if (results.length === 0) {
        refs.errorEl.style.display = 'block';
        // refs.container.innerHTML = '';
      } else {
        refs.errorEl.style.display = 'none';
        refs.container.innerHTML = '';
        const cardMarckup = itemTpl(results);
        refs.container.insertAdjacentHTML('afterbegin', cardMarckup);
      }
    });
  }
}
