import debounce from 'lodash.debounce';
import itemTpl from '../templates/card-item.hbs';

const refs = {
  container: document.querySelector('.js-cards-markup'),
  errorEl: document.querySelector('.error-text'),
  inputField: document.querySelector('.search-form input'),
  spinner: document.querySelector('.spinner'),
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
  refs.spinner.classList.add('active');
  if (e.target.value) {
    fetchFilm(e.target.value).then(results => {
      console.log(results);
      if (results.length === 0) {
        refs.errorEl.style.display = 'block';
      } else {
        refs.errorEl.style.display = 'none';
        refs.container.innerHTML = '';
        const cardMarckup = itemTpl(results);
        refs.container.insertAdjacentHTML('afterbegin', cardMarckup);
        refs.spinner.classList.remove('active');
      }
    });
  } else if (e.target.value === '') {
    location.reload();
  }
}