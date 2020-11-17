// const refs = {
//   backdrop: document.querySelector('.js-backdrop'),
//   card: document.querySelector('.card-link'),
// };

// window.addEventListener('keydown', onEscBtnClick);
// refs.card.addEventListener('click', onCardClick);
// refs.backdrop.addEventListener('click', onBackdropClick);

// function closeModal() {
//   refs.backdrop.classList.remove('opened');

//   window.removeEventListener('keydown', onEscBtnClick);
// }
// function onCardClick(e) {
//   e.preventDefault();

//   refs.backdrop.classList.add('opened');
// }

// function onBackdropClick(e) {
//   if (e.target.classList.contains('backdrop-content')) {
//     return;
//   } else if (e.target.classList.contains('js-btn')) {
//     return;
//   }
//   closeModal();
// }

// function onEscBtnClick(e) {
//   if (e.code !== 'Escape') {
//     return;
//   }
//   closeModal();
// }
