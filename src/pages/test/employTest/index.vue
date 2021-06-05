<template>
  <div>
    <mock-user/>
    <requrie-list v-if="user"/>
    <ApplyList v-if="user && requireListStore.length"/>
    <a-card v-else>
      <a-empty description="请先添加岗位"></a-empty>
    </a-card>
  </div>
</template>

<script>
import RequrieList from "@/pages/test/employTest/RequrieList";
import MockUser from "@/pages/test/employTest/MockUser";
import {mapGetters} from "vuex";
import ApplyList from "@/pages/test/employTest/ApplyList";
export default {
  name: "EmployTest",
  components: {ApplyList, MockUser, RequrieList},
  data() {
    return {
      // requireList: [],
    }
  },
  created() {
  },
  computed: {
    ...mapGetters('test', ['user', 'requireListStore'])
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
