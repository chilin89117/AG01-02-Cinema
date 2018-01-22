<template>
  <div id="detail" v-if="movieToShow">
    <movie-item :movie="movieToShow">
      <div class="movie-details">
        <p class="movie-genre">{{movieToShow.Genre}}</p>
        <p class="movie-plot">{{movieToShow.Plot}}</p>
        <table>
          <tr><td>Released: </td><td>{{movieToShow.Released}}</td></tr>
          <tr><td>Running Time: </td><td>{{movieToShow.Runtime}}</td></tr>
          <tr><td>Director: </td><td>{{movieToShow.Director}}</td></tr>
          <tr><td>Cast: </td><td>{{movieToShow.Actors}}</td></tr>
          <tr><td>Box Office: </td><td>{{movieToShow.BoxOffice}}</td></tr>
        </table>
      </div>
    </movie-item>
    <div class="home">
      <router-link :to="{name: 'home'}">Back to results</router-link>
    </div>
  </div>
</template>

<script>
  import MovieItem from './MovieItem.vue';

  export default {
    props: ['movies'],
    computed: {
      movieToShow() {
        let theMovie = this.movies.find((m) => m.id === this.$route.params.id);
        return theMovie ? theMovie.movie : null;
      },
    },
    components: {
      MovieItem,
    },
  };
</script>
