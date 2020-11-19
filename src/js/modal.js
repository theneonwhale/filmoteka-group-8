import modalTpl from '../templates/modal.hbs';
import ImagesApiService from '../js/apiService';

const refs = {
  backdrop: document.querySelector('.js-backdrop'),
  cardsContainer: document.querySelector('.js-cards-markup'),
  modalContent: document.querySelector('.backdrop-content'),
};

window.addEventListener('keydown', onEscBtnClick);
refs.cardsContainer.addEventListener('click', onCardClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function onCardClick(e) {
  e.preventDefault();

  if (e.target.classList.contains('.card-link')) {
    const id = e.target.dataset.id;
    fetchFilm(id);

    refs.backdrop.classList.add('opened');
  }
}
const imagesApiService = new ImagesApiService();

function fetchFilm(id) {
  imagesApiService.idQuery(id).then(movie => appendMarkup(movie));
}

function appendMarkup(movie) {
  refs.modalContent.insertAdjacentHTML('beforeend', modalTpl(movie));
}

function closeModal() {
  refs.backdrop.classList.remove('opened');

  window.removeEventListener('keydown', onEscBtnClick);
}

function onBackdropClick(e) {
  if (e.target.classList.contains('backdrop-content')) {
    return;
  } else if (e.target.classList.contains('js-btn')) {
    return;
  }
  closeModal();
}

function onEscBtnClick(e) {
  if (e.code !== 'Escape') {
    return;
  }
  closeModal();
}
