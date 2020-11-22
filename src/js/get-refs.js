export default function getRefs() {
  return {
    movieListEL: document.querySelector('.js-cards-markup'),
    paginationContainer: document.getElementById('tui-pagination-container'),
    backdrop: document.querySelector('.js-backdrop'),
    modalContent: document.querySelector('.backdrop-content'),
    watchedBtn: document.querySelector('.watched-btn'),
    queueBtn: document.querySelector('.queue-btn'),
    modal: document.querySelector('.modal'),
    errorEl: document.querySelector('.error-text'),
    inputField: document.querySelector('.search-form input'),
    spinner: document.querySelector('.spinner'),
    ldsCircle: document.querySelector('.lds-circle'),
    buttonsBoxEl: document.querySelector('.buttons-wrapper'),
    watchedBtnEl: document.querySelector('.js-watched'),
    queueBtnEl: document.querySelector('.js-queue'),
  };
}
