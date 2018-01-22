<template>
  <div id="overview">
    <day-select :selectedDay="day"></day-select>
    <div class="main">
      <movie-list :movies="movies"
                  :genreslist="genreslist"
                  :timeslist="timeslist"
                  :day="day">
      </movie-list>
      <movie-filter></movie-filter>
    </div>
  </div>
</template>

<script>
  import MovieList from './MovieList.vue';
  import MovieFilter from './MovieFilter.vue';
  import DaySelect from './DaySelect.vue';

  export default {
    props: ['movies', 'genreslist', 'timeslist', 'day'],
    components: {
      MovieList,
      MovieFilter,
      DaySelect,
    },
  };
</script>
