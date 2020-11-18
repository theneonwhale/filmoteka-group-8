const API_KEY = '726653b8cacb73d155407508fdc35e60';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}550/?api_key=${API_KEY}`;
    const response = await fetch(url);
    const movies = await response.json();

    this.incrementPage();

    return movies;
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
