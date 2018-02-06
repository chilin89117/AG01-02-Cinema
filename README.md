# AG01-02-Cinema
## Vue.js project using vue-resource and vue-router in a cinema showtime and filtering application (OMDb API)

![Home Page](../assets/a.png?raw=true)
![Detail](../assets/b.png?raw=true)

### Run `npm run start`

### Path `"/"` (name: `home`)
- `Overview` component has 3 child-components: `MovieList`, `MovieFilter`, and `DaySelect`
  - `MovieList` component shows list of all filtered movies
    - passes `movie` property of each filtered movie to the `MovieItem` component which
      - shows movie poster on the left
      - shows title and rating on the right
      - has links to the detail page (see below)
    - shows session times of each movie in a `<slot>` of the `MovieItem` component
      - each session time uses custom directive `v-tooltip` (as a Vue plug-in `util/tooltip.js`) to show number of available seats
  - `MovieFilter` component
    - passes `filterCategory="timeslist"` and `value="time"` to first `CheckFilter` component
    - passes `filterCategory="genreslist"` and `value="genre"` to second `CheckFilter` component
    - `CheckFilter` component emits a `check-filter` event on the event bus when it is clicked
      - `main.js` listens for this event and uses function in `util/bus.js` to add to/remove from `times/genreslist`
  - `DaySelect` component
    - gets today's date from `main.js` through `Overview` component
    - shows 1-week of days starting from today's date
    - clicking on a specific day triggers `set-day` event on the event bus
      - `main.js` listens for this event and uses `util/bus.js` to set the day
    - has left/right arrows for mobile devices to decrement/incremnt day by one

### Path `"/movie/:id"` (name: `movie`)
- `Detail` component
  - passes `movie` property of one movie to the `MovieItem` component which
    - shows movie poster on the left
    - shows title and rating on the right
  - shows session times of each movie in a `<slot>` of the `MovieItem` component
