import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Tooltip from './util/tooltip.js';  // A custom plug-in
import './style.scss';

import moment from 'moment-timezone';
// Set default timezone
moment.tz.setDefault("America/Los_Angeles");
// Allow 'moment' to be used in child components as 'this.$moment'
Object.defineProperty(Vue.prototype, '$moment', {
  get() {return this.$root.moment}
});

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Tooltip);

import {checkFilter, setDay} from './util/bus.js';
const bus = new Vue();
// Allow event bus to be used in child components as 'this.$bus'
Object.defineProperty(Vue.prototype, '$bus', {
  get() {return this.$root.bus}
});

import routes from './util/routes.js';
const router = new VueRouter({routes, mode: 'history'});

new Vue({
  el: '#app',
  data: {
    genreslist: [],   // List of selected genres
    timeslist: [],    // List of selected session times
    movies: [],       // List of movies
    moment,
    day: moment(),    // Today
    bus,              // Event bus
  },
  created() {
    this.$http.get('/api')
              .then(response => this.movies = response.data);
    this.$bus.$on('check-filter', checkFilter.bind(this));
    this.$bus.$on('set-day', setDay.bind(this));
  },
  router,
});
