import { reactive } from 'vue';

export const store = reactive({
  searchQuery: "",
  movies: [],
  series: [],
  popularMovies: [],
  popularSeries: [],
  flags: ["it", "en", "es", "fr", "de", "ja", "zh", "ko"],
  genresMovies: [],
  genresSeries: [],
  selectedMovieGenre: "selectedMovie",
  selectedSerieGenre: "selectedSerie",
  renderMessage: false,
});
