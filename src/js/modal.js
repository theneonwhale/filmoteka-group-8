import modalTpl from '../templates/modal.hbs';
import getRefs from './get-refs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '726653b8cacb73d155407508fdc35e60';

let refs = getRefs();

let currentSelectedMovieId = null;

const genreIdsArr = [];
fetchGenreIds();

// localStorage variables
const WATCHED_MOVIES_STORAGE = 'watched-movie-list';
const QUEUE_MOVIES_STORAGE = 'queue-movie-list';

refs.movieListEL.addEventListener('click', onCardClick);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.modal.addEventListener('click', onModalBtnsClick);

function onModalBtnsClick(e) {
  if (e.target.classList.contains('watched-btn')) {
    addMovieToWatched();
    renderQueueBtn();
    renderRemoveFromWatchedBtn();
    return;
  }

  if (e.target.classList.contains('remove-from-watched')) {
    deleteMovieFromWatched();
    renderAddToWatchedBtn();
    return;
  }

  if (e.target.classList.contains('queue-btn')) {
    addMovieToQueued();
    renderAddToWatchedBtn();
    renderRemoveFromQueueBtn();
    return;
  }

  if (e.target.classList.contains('remove-from-queue')) {
    deleteMovieFromQueued();
    renderQueueBtn();
  }
}

function renderQueueBtn() {
  refs.queueBtn.classList.remove('clicked');
  refs.queueBtn.classList.remove('remove-from-queue');
  refs.queueBtn.classList.add('queue-btn');
  refs.queueBtn.textContent = 'add to queue';
}
function renderRemoveFromWatchedBtn() {
  refs.watchedBtn.classList.remove('watched-btn');
  refs.watchedBtn.classList.add('remove-from-watched');
  refs.watchedBtn.classList.add('clicked');
  refs.watchedBtn.textContent = 'remove from watched';
}

function renderAddToWatchedBtn() {
  refs.watchedBtn.classList.remove('remove-from-watched');
  refs.watchedBtn.classList.remove('clicked');
  refs.watchedBtn.classList.add('watched-btn');
  refs.watchedBtn.textContent = 'add to watched';
}

function renderRemoveFromQueueBtn() {
  refs.queueBtn.classList.remove('queue-btn');
  refs.queueBtn.classList.add('remove-from-queue');
  refs.queueBtn.classList.add('clicked');
  refs.queueBtn.textContent = 'remove from queue';
}

function deleteMovieFromWatched() {
  const watchedMovies = new Set(
    JSON.parse(localStorage.getItem(WATCHED_MOVIES_STORAGE)),
  );

  watchedMovies.delete(currentSelectedMovieId);

  localStorage.setItem(
    WATCHED_MOVIES_STORAGE,
    JSON.stringify([...watchedMovies.values()]),
  );
}

function deleteMovieFromQueued() {
  const queuedMovies = new Set(
    JSON.parse(localStorage.getItem(QUEUE_MOVIES_STORAGE)),
  );

  queuedMovies.delete(currentSelectedMovieId);

  localStorage.setItem(
    QUEUE_MOVIES_STORAGE,
    JSON.stringify([...queuedMovies.values()]),
  );
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

  // checkIfFilmAlreadyAdded();
  window.addEventListener('keydown', onEscBtnClick);
}

function fetchGenreIds() {
  fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
    .then(responce => responce.json())
    .then(responce => genreIdsArr.splice(0, 0, ...responce.genres));
}

function fetchFilm(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=726653b8cacb73d155407508fdc35e60&language=en-US`,
  )
    .then(response => response.json())
    .then(movie => appendMarkup(movie));
}

function appendMarkup(movie) {
  if (movie.genres.length === 0) {
    movie.genres.push({ name: 'No genre' });
  } else if (movie.genres.length <= 3) {
    movie.genres.forEach(({ id }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    movie.genres[movie.genres.length - 1] = movie.genres[
      movie.genres.length - 1
    ].slice(0, movie.genres[movie.genres.length - 1].length - 1);
  } else {
    movie.genres.forEach(({ id }, index) => {
      const idObj = genreIdsArr.find(genreObj => genreObj.id === id);

      movie.genres[index] = `${idObj.name},`;
    });

    const tempArr = [];

    tempArr.push(movie.genres[0]);
    tempArr.push(movie.genres[1]);
    tempArr.push('Other');

    movie.genres.splice(0, movie.genres.length, ...tempArr);
  }
  const modalContent = modalTpl(movie);
  refs.modalContent.insertAdjacentHTML('beforeend', modalContent);
  refs = getRefs();
  checkFilmInWatchedList();
  checkFilmInQueuedList();
}

function checkFilmInWatchedList() {
  const watchedMovies = new Set(
    JSON.parse(localStorage.getItem(WATCHED_MOVIES_STORAGE)),
  );

  if (watchedMovies.has(currentSelectedMovieId)) {
    renderRemoveFromWatchedBtn();
  }
}

function checkFilmInQueuedList() {
  const queuedMovies = new Set(
    JSON.parse(localStorage.getItem(QUEUE_MOVIES_STORAGE)),
  );

  if (queuedMovies.has(currentSelectedMovieId)) {
    renderRemoveFromQueueBtn();
  }
}
function closeModal() {
  refs.backdrop.classList.remove('opened');

  refs.modalContent.innerHTML = '';

  window.removeEventListener('keydown', onEscBtnClick);
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('js-backdrop')) {
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
