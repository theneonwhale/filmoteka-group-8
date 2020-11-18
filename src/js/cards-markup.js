import itemTpl from '../templates/card-item.hbs';

import ImagesApiService from '../js/apiService';

const refs = {
  container: document.querySelector('.js-cards-markup'),
};

const imagesApiService = new ImagesApiService();

function fetchArticles() {
  imagesApiService.fetchImages().then(movie => {
    console.log(movie);
    appendMarkup(movie);
  });
}
fetchArticles();

function appendMarkup(movie) {
  refs.container.insertAdjacentHTML('beforeend', itemTpl(movie));
}
