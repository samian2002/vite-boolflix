<template>
  <!-- Barra di navigazione -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Logo del sito -->
      <a class="navbar-brand" href="javascript:history.go(0)">
        <span class="navbar-text">Boolflix</span>
      </a>
      <!-- Bottone per il menu mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Menu di navigazione -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ms-auto">
          <!-- Dropdown per i generi dei film -->
          <div v-if="store.movies.length > 0" class="nav-item me-2">
            <select id="genre-movies-list" v-model="store.selectedMovieGenre" class="form-select">
              <option value="selectedMovie" disabled selected>Seleziona Genere Film</option>
              <option value="all">Tutti</option>
              <option v-for="genre in store.genresMovies" :key="genre.id" :value="genre.name">{{ genre.name }}</option>
            </select>
          </div>
          <!-- Dropdown per i generi delle serie TV -->
          <div v-if="store.series.length > 0" class="nav-item me-2">
            <select id="genre-series-list" v-model="store.selectedSerieGenre" class="form-select">
              <option value="selectedSerie" disabled selected>Seleziona Genere SerieTV</option>
              <option value="all">Tutti</option>
              <option v-for="genre in store.genresSeries" :key="genre.id" :value="genre.name">{{ genre.name }}</option>
            </select>
          </div>
          <!-- Barra di ricerca -->
          <div class="nav-item d-flex align-items-center">
            <input type="text" placeholder="Cerca film e serieTv" autofocus v-model="store.searchQuery" @keydown.enter="searchTitles" class="form-control me-2">
            <i class="fas fa-search text-white" @click="searchTitles" style="cursor: pointer;"></i>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from '../store';
import axios from 'axios';

export default {
  setup() {
    return { store };
  },
  methods: {
    // Metodo per cercare i titoli di film e serie TV in base alla query dell'utente
    async searchTitles() {
      if (store.searchQuery) {
        await this.getMovies();
        await this.getSeries();
        store.renderMessage = true;
      }
    },
    // Metodo per ottenere i film basati sulla query di ricerca
    async getMovies() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=it-IT&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
        },
        params: {
          query: store.searchQuery
        }
      };

      try {
        const response = await axios.request(options);
        store.movies = response.data.results;
        for (const movie of store.movies) {
          await this.getMovieCredits(movie);
          // Mappa i generi dal loro ID al loro nome
          movie.genre_ids = movie.genre_ids.map(id => store.genresMovies.find(genre => genre.id === id)?.name || id);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // Metodo per ottenere i dettagli del cast di un film
    async getMovieCredits(movie) {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=it-IT`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
        }
      };

      try {
        const response = await axios.request(options);
        movie.castList = response.data.cast.slice(0, 5).map(cast => cast.name);
      } catch (error) {
        console.error(error);
      }
    },
    // Metodo per ottenere le serie TV basate sulla query di ricerca
    async getSeries() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/tv?include_adult=false&language=it-IT&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
        },
        params: {
          query: store.searchQuery
        }
      };

      try {
        const response = await axios.request(options);
        store.series = response.data.results;
        for (const serie of store.series) {
          await this.getSerieCredits(serie);
          // Mappa i generi dal loro ID al loro nome
          serie.genre_ids = serie.genre_ids.map(id => store.genresSeries.find(genre => genre.id === id)?.name || id);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // Metodo per ottenere i dettagli del cast di una serie TV
    async getSerieCredits(serie) {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${serie.id}/credits?language=it-IT`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
        }
      };

      try {
        const response = await axios.request(options);
        serie.castList = response.data.cast.slice(0, 5).map(cast => cast.name);
      } catch (error) {
        console.error(error);
      }
    },
    // Metodo per ottenere i film popolari
    async getPopularMovies() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
        }
      };

      try {
        const response = await axios.request(options);
        store.popularMovies = response.data.results;
        for (const movie of store.popularMovies) {
          await this.getMovieCredits(movie);
          // Mappa i generi dal loro ID al loro nome
          movie.genre_ids = movie.genre_ids.map(id => store.genresMovies.find(genre => genre.id === id)?.name || id);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // Metodo per ottenere le serie TV popolari
    async getPopularSeries() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/popular?language=it-IT&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
        }
      };

      try {
        const response = await axios.request(options);
        store.popularSeries = response.data.results;
        for (const serie of store.popularSeries) {
          await this.getSerieCredits(serie);
          // Mappa i generi dal loro ID al loro nome
          serie.genre_ids = serie.genre_ids.map(id => store.genresSeries.find(genre => genre.id === id)?.name || id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  async mounted() {
    // Metodo chiamato al montaggio del componente per ottenere i generi di film e serie TV
    const genreMovieOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list?language=it-IT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
      }
    };

    const genreTVOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/tv/list?language=it-IT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNlOGYxNDNhZmYwNjdhNDhlMDAzYzM5YTk2N2JhOSIsInN1YiI6IjY2NWQ4ZjZhYWUxMjNkYzk1NzIzMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2REfiPSWdTBRzeHna4mlIjNNVf-vCaR25Jbqja4zyM'
      }
    };

    try {
      const [genresMoviesData, genresSeriesData] = await Promise.all([
        axios.request(genreMovieOptions),
        axios.request(genreTVOptions)
      ]);

      store.genresMovies = genresMoviesData.data.genres;
      store.genresSeries = genresSeriesData.data.genres;
    } catch (error) {
      console.error(error);
    }

    // Carica i film e le serie TV popolari
    await this.getPopularMovies();
    await this.getPopularSeries();
  }
};
</script>

<style scoped>

</style>
