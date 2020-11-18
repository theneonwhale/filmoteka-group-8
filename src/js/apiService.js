const API_KEY = '726653b8cacb73d155407508fdc35e60';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}popular/?api_key=${API_KEY}&page_size=18`;
    const response = await fetch(url);
    const movies = await response.json();
    const movie = movies.results;

    this.incrementPage();

    return movie;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
