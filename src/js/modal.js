import modalTpl from '../templates/modal.hbs';

const refs = {
  backdrop: document.querySelector('.js-backdrop'),
  cardsContainer: document.querySelector('.js-cards-markup'),
  modalContent: document.querySelector('.backdrop-content'),
  watchedBtn: document.querySelector('.watched-btn'),
  queueBtn: document.querySelector('.queue-btn'),
  modal: document.querySelector('.modal'),
};
let currentSelectedMovieId = null;

// localStorage variables
const WATCHED_MOVIES_STORAGE = 'watched-movie-list';
const QUEUE_MOVIES_STORAGE = 'queue-movie-list';
refs.cardsContainer.addEventListener('click', onCardClick);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.modal.addEventListener('click', onModalBtnsClick);
function onModalBtnsClick(e) {
  if (e.target.classList.contains('watched-btn')) {

    localStorage.setItem(WATCHED_MOVIE, opendMovieId);
    e.target.classList.add('clicked');
    e.target.textContent = 'remove from watched';

    addMovieToWatched();

  }
  if (e.target.classList.contains('queue-btn')) {

    localStorage.setItem(QUEUE_MOVIE, opendMovieId);
    e.target.classList.add('clicked');
    e.target.textContent = 'remove from queue';

    addMovieToQueued();

  }
}
function addMovieToQueued() {
  // remove movie from watched list
  const watchedMovies = new Set(
    JSON.parse(localStorage.getItem(WATCHED_MOVIES_STORAGE)),
  );
  watchedMovies.delete(currentSelectedMovieId);
  localStorage.setItem(
    WATCHED_MOVIES_STORAGE,
    JSON.stringify([...watchedMovies.values()]),
  );
  // add to queued list
  const queuedMovies = new Set(
    JSON.parse(localStorage.getItem(QUEUE_MOVIES_STORAGE)),
  );
  queuedMovies.add(currentSelectedMovieId);
  localStorage.setItem(
    QUEUE_MOVIES_STORAGE,
    JSON.stringify([...queuedMovies.values()]),
  );
}
function addMovieToWatched() {
  // remove movie from queued list
  const queuedMovies = new Set(
    JSON.parse(localStorage.getItem(QUEUE_MOVIES_STORAGE)),
  );
  queuedMovies.delete(currentSelectedMovieId);
  localStorage.setItem(
    QUEUE_MOVIES_STORAGE,
    JSON.stringify([...queuedMovies.values()]),
  );
  // add to watched list
  const watchedMovies = new Set(
    JSON.parse(localStorage.getItem(WATCHED_MOVIES_STORAGE)),
  );
  watchedMovies.add(currentSelectedMovieId);
  localStorage.setItem(
    WATCHED_MOVIES_STORAGE,
    JSON.stringify([...watchedMovies.values()]),
  );
}
function onCardClick(e) {
  const card = e.target.classList.contains('film-img');
  if (!card) {
    return;
  }
  const id = e.target.dataset.id;
  currentSelectedMovieId = id;
  e.preventDefault();
  fetchFilm(id);
  refs.backdrop.classList.add('opened');
  window.addEventListener('keydown', onEscBtnClick);
}
function fetchFilm(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=726653b8cacb73d155407508fdc35e60&language=en-US`,
  )
    .then(response => response.json())
    .then(movie => {
      appendMarkup(movie);
    });
}
function appendMarkup(movie) {
  refs.modalContent.insertAdjacentHTML('beforeend', modalTpl(movie));
}
function closeModal() {
  refs.backdrop.classList.remove('opened');
  refs.modalContent.innerHTML = '';
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
