<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>by time of day:</h3>
    <div class="filter-group">
      <check-filter v-for="time in times"
                    filterCategory="timeslist"
                    :value="time">
      </check-filter>
    </div>
    <h3>by genre:</h3>
    <div class="filter-group">
      <check-filter v-for="genre in genres"
                    filterCategory="genreslist"
                    :value="genre">
      </check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import times from '../util/times.js';
  import CheckFilter from './CheckFilter.vue';

  export default {
    data() {
      return {
        genres,
        times,
      };
    },
    components: {
      CheckFilter,
    },
  };
</script>
