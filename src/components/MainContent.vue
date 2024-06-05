<template>
    <!-- Contenuto principale della pagina -->
    <main class="container mt-4">
      <!-- Titolo per i film popolari -->
      <h2 v-if="store.movies.length == 0 && store.series.length == 0 && !store.renderMessage" class="movies-title">Film Popolari</h2>
      <!-- Contenitore per le card dei film popolari -->
      <div class="row" v-if="store.movies.length == 0 && store.series.length == 0 && !store.renderMessage">
        <Card v-for="(movie, index) in store.popularMovies" :key="index" :item="movie" :flags="store.flags" />
      </div>
  
      <!-- Titolo per le serie TV popolari -->
      <h2 v-if="store.movies.length == 0 && store.series.length == 0 && !store.renderMessage" class="series-title">Serie TV Popolari</h2>
      <!-- Contenitore per le card delle serie TV popolari -->
      <div class="row" v-if="store.movies.length == 0 && store.series.length == 0 && !store.renderMessage">
        <Card v-for="(serie, index) in store.popularSeries" :key="index" :item="serie" :flags="store.flags" />
      </div>
  
      <!-- Titolo per i risultati della ricerca nei film -->
      <h2 v-if="store.movies.length > 0" class="movies-title">Risultati della ricerca in Film</h2>
      <!-- Contenitore per le card dei film trovati -->
      <div class="row" v-if="store.movies.length > 0">
        <Card v-for="(movie, index) in store.movies" :key="index" :item="movie" :flags="store.flags" />
      </div>
  
      <!-- Titolo per i risultati della ricerca nelle serie TV -->
      <h2 v-if="store.series.length > 0" class="series-title">Risultati della ricerca in Serie TV</h2>
      <!-- Contenitore per le card delle serie TV trovate -->
      <div class="row" v-if="store.series.length > 0">
        <Card v-for="(serie, index) in store.series" :key="index" :item="serie" :flags="store.flags" />
      </div>
  
      <!-- Messaggio di avviso quando non ci sono risultati -->
      <div class="warning" v-if="store.movies.length == 0 && store.series.length == 0 && store.renderMessage">
        <h2>Non è stato trovato alcun titolo con i criteri utilizzati</h2>
      </div>
    </main>
  </template>
  
  <script>
  import { store } from '../store';
  import Card from './Card.vue';
  
  export default {
    components: {
      Card
    },
    setup() {
      return { store };
    }
  };
  </script>
  
  <style scoped>

  .movies-title, .series-title {
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
    padding-bottom: 5px;
    text-align: center;
    border-bottom: 2px solid #DB202C;
    color: #fff;
  }
  
  .series-title {
    border-bottom-color: red;
  }
  
  </style>
  