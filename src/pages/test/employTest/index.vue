<template>
  <div>
    <mock-user/>
    <requrie-list v-if="user"/>
  </div>
</template>

<script>
import RequrieList from "@/pages/test/employTest/RequrieList";
import MockUser from "@/pages/test/employTest/MockUser";
import {mapGetters} from "vuex";
export default {
  name: "EmployTest",
  components: {MockUser, RequrieList},
  data() {
    return {
      requireList: [],
    }
  },
  created() {
  },
  computed: {
    ...mapGetters('test', ['user'])
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
