import modalTpl from '../templates/modal.hbs';

const refs = {
  backdrop: document.querySelector('.js-backdrop'),
  cardsContainer: document.querySelector('.js-cards-markup'),
  modalContent: document.querySelector('.backdrop-content'),
  watchedBtn: document.querySelector('.watched-btn'),
  queueBtn: document.querySelector('.queue-btn'),
  modal: document.querySelector('.modal'),
};

// localStorage variables
const OPEND_MOVIE = 'current-movie-id';
const WATCHED_MOVIE = 'watched-movie';
const QUEUE_MOVIE = 'queue-movie';

const WATCHED_MOVIES = new Set();
const QUEUE_MOVIES = new Set();
const WATCHED_MOVIES_STORAGE = 'watched-movie-list';
const QUEUE_MOVIES_STORAGE = 'queue-movie-list';

refs.cardsContainer.addEventListener('click', onCardClick);
refs.backdrop.addEventListener('click', onBackdropClick);

refs.modal.addEventListener('click', onModalBtnsClick);

function onModalBtnsClick(e) {
  const opendMovieId = localStorage.getItem(OPEND_MOVIE);

  if (e.target.classList.contains('watched-btn')) {
    localStorage.setItem(WATCHED_MOVIE, opendMovieId);
  }

  if (e.target.classList.contains('queue-btn')) {
    localStorage.setItem(QUEUE_MOVIE, opendMovieId);
  }
}

function onCardClick(e) {
  const card = e.target.classList.contains('film-img');
  const id = e.target.dataset.id;

  localStorage.setItem(OPEND_MOVIE, id);

  if (!card) {
    return;
  }

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

  if (localStorage.getItem(WATCHED_MOVIE) !== null) {
    WATCHED_MOVIES.add(localStorage.getItem(WATCHED_MOVIE));
  }

  if (localStorage.getItem(QUEUE_MOVIE) !== null) {
    QUEUE_MOVIES.add(localStorage.getItem(QUEUE_MOVIE));
  }

  localStorage.setItem(
    WATCHED_MOVIES_STORAGE,
    JSON.stringify([...WATCHED_MOVIES.values()]),
  );

  localStorage.setItem(
    QUEUE_MOVIES_STORAGE,
    JSON.stringify([...QUEUE_MOVIES.values()]),
  );

  localStorage.removeItem(OPEND_MOVIE);

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
