<template>
  <!-- Contenitore principale dell'applicazione -->
  <div id="root">
    <!-- Barra di navigazione -->
    <NavBar @search="getTitles" ref="navbar" />
    <!-- Contenuto principale -->
    <MainContent />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import MainContent from './components/MainContent.vue';

export default {
  components: {
    NavBar,
    MainContent
  },
  methods: {
    // Metodo per avviare la ricerca dei titoli chiamando il metodo della NavBar
    getTitles() {
      this.$refs.navbar.searchTitles();
    }
  }
};
</script>

<style>
/* CSS globale */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  list-style: none;
  font-family: 'Lato', sans-serif;
}

body {
  background-color: #000;
  color: #fff;
}

#root {
  width: 100%;
  height: 100vh;
  background-color: #141414;
}
</style>
