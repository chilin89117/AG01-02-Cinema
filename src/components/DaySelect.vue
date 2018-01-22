<template>
  <div id="day-select">
    <ul class="days">
      <li :class="{day: true, active: isActive(day)}"
          v-for="day in days"
          @click="selectDay(day)">{{formatDay(day)}}
      </li>
      <!-- left & right arrows for mobile devices -->
      <li class="day-selector">
        <span class="dec" @click="changeDay(-1)"></span>
        <span class="inc" @click="changeDay(1)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['selectedDay'],
    data() {
      return {
        // Add 1-week of days starting from today
        days: [0, 1, 2, 3, 4, 5, 6].map(n => this.$moment().add(n, 'days')),
      };
    },
    methods: {
      formatDay(d) {
        if(d.isSame(this.$moment(), 'day')) {
          return 'Today';
        } else {
          return d.format('ddd MM/DD');
        }
      },
      isActive(d) {
        return d.isSame(this.selectedDay, 'day');
      },
      selectDay(d) {
        this.$bus.$emit('set-day', d);
      },
      changeDay(n) {
        let newDay = this.$moment(this.selectedDay).add(n, 'days');
        if(this.days.find(d => newDay.isSame(d, 'day'))) {
          this.selectDay(newDay);
        }
      },
    },
  };
</script>
