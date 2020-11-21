import modalTpl from '../templates/modal.hbs';

const refs = {
  backdrop: document.querySelector('.js-backdrop'),
  cardsContainer: document.querySelector('.js-cards-markup'),
  modalContent: document.querySelector('.backdrop-content'),
};

refs.cardsContainer.addEventListener('click', onCardClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function onCardClick(e) {
  const card = e.target.classList.contains('film-img');
  const id = e.target.dataset.id;
  // console.log(e.target);
  // console.log(id);
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
      // console.log(movie);
      const mov = JSON.stringify(movie);
      localStorage.setItem('film', mov);
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
