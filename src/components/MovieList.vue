<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="fm in filteredMovies"
                  :movie="fm.movie">
        <div class="movie-sessions">
          <div v-for="sess in filterSessions(fm.sessions)"
               :key="sess.id"
               class="session-time-wrapper tooltip-wrapper"
               v-tooltip="{seats: sess.seats}">
            <div class="session-time">{{formatSessionTime(sess.time)}}</div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      {{noResults}}
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import times from '../util/times.js';
  import MovieItem from './MovieItem.vue';

  export default {
    props: ['movies', 'genreslist', 'timeslist', 'day'],
    methods: {
      moviesInGenres(m) {
        if(this.genreslist.length === 0) {
          return true;  // Return all movies if no genres chosen
        } else {
          let genresOfMovie = m.movie.Genre.split(", ");
          let matched = true;
          this.genreslist.forEach((g) => {
            if(genresOfMovie.indexOf(g) === -1) {
              matched = false;
            }
          });
          return matched;
        }
      },
      sessionPassesTimeFilter(s) {  // Filter for session times
        if(!this.day.isSame(this.$moment(s.time), 'day')) {
          return false;
        } else if(this.timeslist.length === 0 || this.timeslist.length === 2) {
          return true;
        } else if(this.timeslist[0] === times.AFTER_6PM) {
          return this.$moment(s.time).hour() >= 18;
        } else {
          return this.$moment(s.time).hour() < 18;
        }
      },
      formatSessionTime(rawValue) {   // Format session time
        return this.$moment(rawValue).format('h:mm A');
      },
      filterSessions(sessions) {      // Get all sessions that pass the filter
        return sessions.filter(this.sessionPassesTimeFilter);
      },
    },
    computed: {
      filteredMovies() {    // Filter movies by genre and session times
        return this.movies.filter(this.moviesInGenres)
                          .filter(m => m.sessions.find(this.sessionPassesTimeFilter));
      },
      noResults() {
        let genresCriteria = this.genreslist.join('/');
        let timesCriteria = this.timeslist.join(' or ');
        return `No ${genresCriteria} movies${timesCriteria.length == 0 ?
          '.' : ' ' + timesCriteria + '.'}`;
      },
    },
    components: {
      MovieItem,
    },
  };
</script>
