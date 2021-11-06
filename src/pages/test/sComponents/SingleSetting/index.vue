<template>
  <div>
    <single-route :route="ROUTE"/>
<!--    <single-route :route="ROUTE" style="width: 300px; display: inline-block;margin: 10px"/>-->
  </div>
</template>

<script>
import SingleRoute from "@/pages/test/sComponents/SingleSetting/SingleRoute";
import Page1 from "@/pages/test/sComponents/SingleSetting/Page1";
import Page2 from "@/pages/test/sComponents/SingleSetting/Page2";
import Page3 from "@/pages/test/sComponents/SingleSetting/Page3";

const ROUTE = [
  {name: 'Page1', component: Page1},
  {name: 'Page2', component: Page2},
  {name: 'Page3', component: Page3},
]

export default {
  name: 'SingleSetting',
  components: {SingleRoute},
  props: {
  },
  data() {
    return {
      ROUTE: [...ROUTE],
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
