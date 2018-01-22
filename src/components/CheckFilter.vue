<template>
  <div :class="{'check-filter': true, active: checked}"
       @click="checkFilter">
    <span class="checkbox"></span>
    <span class="check-filter-title">{{value}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
      };
    },
    props: ['filterCategory', 'value'],
    methods: {
      checkFilter() {
        this.checked = !this.checked;
        this.$bus.$emit('check-filter',
          this.filterCategory, this.value, this.checked);
      },
    },
  };
</script>
