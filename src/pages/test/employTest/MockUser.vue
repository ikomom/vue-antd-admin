<template>
  <a-card :loading="loading">
    <a-dropdown style="float: right">
      <a-space v-if="user">
        <span class="title">当前用户:</span> {{ user.name }}
        <span v-for="item in user.role" :key="item.key">
            <span class="title">角色:</span> {{ item.name }}
            <span class="title">权限:</span> {{ item.permission }}
          </span>
      </a-space>
      <a v-else>
        选择用户登录
      </a>
      <a-list slot="overlay">
        <a-list-item v-for="list in USER_LIST" :key="list.key" class="list-item" @click="login(list)">
          <span class="title">当前用户:</span>{{ list.name }} <br />
          <span v-for="item in list.role" :key="item.key">
            <span class="title">角色:</span> {{ item.name }} <br />
            <span class="title">权限:</span> {{ item.permission }}
          </span>
        </a-list-item>
      </a-list>
    </a-dropdown>
    <a @click="logout">退出</a>
  </a-card>
</template>

<script>
import {mapGetters} from "vuex";
import {USER_LIST} from "@/pages/test/employTest/user";

export default {
  name: "MockUser",
  computed: {
    ...mapGetters('test', ['user'])
  },
  data() {
    return {
      USER_LIST,
      loading: false
    }
  },
  methods: {
    login(user) {
      this.logout()
      this.loading = true
      setTimeout(() => {
        this.$store.commit('test/setUser', user)
        this.loading = false
      }, 300)
    },
    logout() {
      this.$store.commit('test/clearUser')
    }
  }
}
</script>

<style scoped lang="less">
.list-item {
  padding: 10px 15px;
  //display: grid;
  font-size: 13px;

  &:hover {
    background: lightblue;
    cursor: pointer;
  }
}

.title {
  font-weight: bold;
  margin: 0 10px;
}
</style>
