const refs = {
  buttonsBoxEl: document.querySelector('.buttons-wrapper'),
  watchedBtnEl: document.querySelector('.js-watched'),
  queueBtnEl: document.querySelector('.js-queue'),
  moviesListEl: document.querySelector('.js-cards-markup'),
};

// const arrayOfMovies = [
//   {
//     original_name: 'Game of Thrones',
//     id: 1399,
//     name: 'Game of Thrones',
//     vote_count: 4772,
//     vote_average: 8.2,
//     first_air_date: '2011-04-17',
//     poster_path: '/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg',
//     genre_ids: [18, 10759, 10765],
//     original_language: 'en',
//     backdrop_path: '/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg',
//     overview:
//       "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
//     origin_country: ['US'],
//     popularity: 61.91,
//   },
//   {
//     adult: false,
//     backdrop_path: '/5a7lMDn3nAj2ByO0X1fg6BhUphR.jpg',
//     genre_ids: [12, 14, 878],
//     id: 333339,
//     original_language: 'en',
//     original_title: 'Ready Player One',
//     overview:
//       'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.',
//     poster_path: '/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
//     release_date: '2018-03-28',
//     title: 'Ready Player One',
//     video: false,
//     vote_average: 7.7,
//     vote_count: 3673,
//     popularity: 68.153,
//   },
// ];
// localStorage.setItem('watched', JSON.stringify(arrayOfMovies));

refs.watchedBtnEl.classList.add('active');

// refs.buttonsBoxEl.addEventListener('click', onBtnClick);

// function onBtnClick(event) {
//   event.preventDefault();

//   if (event.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   if (!event.target.classList.contains('active')) {
//     refs.buttonsBoxEl.querySelector('.active').classList.remove('active');
//     event.target.classList.add('active');
//   }

//   if (event.target.classList.contains('js-watched')) {
//     onWatchedBtnClick();
//   }

//   //   console.log(event.target);
// }

// function onWatchedBtnClick() {
//   const watchedMoviesStr = localStorage.getItem('watched');

//   if (watchedMovies) {
//     const watchedMoviesArr = JSON.parse(watchedMoviesStr);
//   }

//   refs.moviesListEl.innerHTML = '<p>There is nothing in the watched list.</p>';
// }

// function onQueueBtnClick() {}
/////
document.querySelector('.library-header').addEventListener('click', onBtnClick);
function onBtnClick(event) {
  event.preventDefault();
  console.log(event.target);
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.classList.contains('watched-btn')) {
    localStorage.getItem('watched');
    // renderWatchedFilms();
  } else if (event.target.classList.contains('queue-btn')) {
    localStorage.getItem('queued');
    // renderQueuedFilms();
  }
}
