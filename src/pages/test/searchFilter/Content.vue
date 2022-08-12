<template>
  <div>
    Content {{provide}}
    <Chart style="border: 1px solid blue;padding: 10px"/>
  </div>
</template>

<script>
import Chart from './components/chart.vue';
import { PROVIDE_KEY } from './search';
export default {
    name: "Content",
    components: { Chart },
    inject: {
      ['provide']: PROVIDE_KEY
    },
    beforeMouted(){
      console.log('onMouted', this.provide)
    }
}
</script>

<style>

</style>