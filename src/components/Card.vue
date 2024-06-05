<template>
    <!-- Card per visualizzare le informazioni di un film o una serie TV -->
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100">
        <img class="card-img-top" :src="getImages(item)" :alt="item.title">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            <strong>Titolo Originale:</strong> {{ item.original_title }}
          </p>
          <p class="card-text">
            <strong>Lingua Originale:</strong>
            <img v-if="flags.includes(item.original_language)" :src="getFlagSrc(item.original_language)" alt="Bandiera" class="flag">
            <span v-else>{{ item.original_language }}</span>
          </p>
          <p class="card-text">
            <strong>Voto:</strong>
            <span>
              <i v-for="number in getVote(item.vote_average)" :key="number" class="fas fa-star"></i>
              <i v-for="number in 5 - getVote(item.vote_average)" :key="number + 5" class="far fa-star"></i>
            </span>
          </p>
          <p class="card-text">
            <strong>Generi:</strong> {{ item.genre_ids.join(", ") }}
          </p>
          <p v-if="item.castList && item.castList.length > 0" class="card-text">
            <strong>Attori:</strong> {{ item.castList.join(", ") }}
          </p>
          <p v-if="item.overview" class="card-text">
            <strong>Overview:</strong> {{ item.overview }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const flagImages = import.meta.glob('../assets/img/*.svg', { eager: true });
  
  export default {
    props: {
      item: Object,
      flags: Array
    },
    methods: {
      // Metodo per ottenere l'immagine di un elemento
      getImages(element) {
        if (element.poster_path != null) {
          return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${element.poster_path}`;
        }
        return flagImages['../assets/img/empty-image.jpg'].default;
      },
      // Metodo per ottenere l'immagine della bandiera della lingua originale
      getFlagSrc(language) {
        return flagImages[`../assets/img/${language}.svg`]?.default || '';
      },
      // Metodo per ottenere il numero di stelle da visualizzare in base al voto
      getVote(vote) {
        return Math.ceil(vote / 2);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stile per l'immagine della bandiera */
  .flag {
    width: 20px;
    margin-left: 5px;
    vertical-align: middle;
  }
  </style>
  