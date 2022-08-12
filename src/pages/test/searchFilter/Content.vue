<template>
  <div>
    Content {{provider}}
    <Chart style="border: 1px solid blue;padding: 10px"/>
  </div>
</template>

<script>
import Chart from './components/chart.vue';
import {getInject} from './search';

export default {
  name: "Content",
  components: {Chart},
  mixins: [getInject()],
  beforeMount() {
    console.log('beforeMount', this.provider)
  },
}
</script>

<style>

</style>
