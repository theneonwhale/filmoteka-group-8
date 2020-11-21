import movieItemsTpl from '../templates/movie.hbs';

const refs = {
  buttonsBoxEl: document.querySelector('.buttons-wrapper'),
  watchedBtnEl: document.querySelector('.js-watched'),
  queueBtnEl: document.querySelector('.js-queue'),
  moviesListEl: document.querySelector('.js-cards-markup'),
  cardsContainer: document.querySelector('.modal'),
  watchedList: document.querySelector('.watched'),
  queueList: document.querySelector('.queue'),
};

document.querySelector('.modal').addEventListener('click', onBtnClick);
let filmsArrW = [];
let filmsArrQ = [];

function onBtnClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'BUTTON') {
    return;
  } else if (event.target.classList.contains('js-watched')) {
    onWatchedBtnClick();
    console.log(event.target);
  } else if (event.target.classList.contains('js-queue')) {
    onQueueBtnClick();
    console.log(event.target);
  }
}

function onWatchedBtnClick() {
  const watchedMoviesStr = localStorage.getItem('film');
  const watchedMoviesObj = JSON.parse(watchedMoviesStr);
  console.log(watchedMoviesObj);
  console.log(refs.watchedList);
  // додати перевірку на існуючий в масиві ід
  filmsArrW.push(watchedMoviesObj);
  console.log(filmsArrW);

  refs.watchedList.insertAdjacentHTML('beforeend', movieItemsTpl(filmsArrW));
}

function onQueueBtnClick() {
  const watchedMoviesStr = localStorage.getItem('film');
  const watchedMoviesObj = JSON.parse(watchedMoviesStr);
  // додати перевірку на існуючий в масиві ід
  filmsArrQ.push(watchedMoviesObj);

  refs.queueList.insertAdjacentHTML('beforeend', movieItemsTpl(filmsArrQ));
}
