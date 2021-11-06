<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in history" :key="item.key">{{ item.name }}</a-breadcrumb-item>
    </a-breadcrumb>
    {{ includeKeys }}
    <page-transition animate="fade" :direction="direction" :disabled="false">
      <a-keep-alive :includeKeys="includeKeys" :matches="matches">
        <component :key="lastActive.key" :is="activeComponent" :sRoute="sRoute" />
      </a-keep-alive>
    </page-transition>
  </div>
</template>

<script>
import PageTransition from '@/components/transition/PageToggleTransition'
import AKeepAlive from "@/components/cache/AKeepAlive";

export const sRouteMixin = {
  props: {
    sRoute: {
      type: Object
    }
  },
  created() {
    console.log(this.$options.name + ':created')
  },
  beforeDestroy() {
    console.log(this.$options.name + ':beforeDestroy')
  }
}

export default {
  name: 'SingleRoute',
  components: {PageTransition, AKeepAlive},
  props: {
    route: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      activeName: null,
      activeComponent: null,
      params: null,
      direction: 'left',
      history: []
    }
  },
  computed: {
    sRoute() {
      return {
        go: this.go,
        back: this.back,
        history: this.history,
        params: this.params,
      }
    },
    lastActive() {
      return this.history.length ? this.history[this.history.length - 1] : null
    },
    includeKeys() {
      return this.history.map(i => i.key)
    }
  },
  methods: {
    matches(pattern, name) {
      let match = false
      if (Array.isArray(pattern)) {
        for (let item of pattern) {
          if (name.indexOf(item) !== -1) {
            match = true
            break
          }
        }
      }
      // console.log('matches', pattern, name, match)
      return match
    },
    shortId() {
      return Math.random().toString(36).substr(-8)
    },
    setActive(name, setHistory = true) {
      const active = this.route.find(i => i.name === name)
      if (active) {
        this.activeName = name
        this.activeComponent = active.component
        if (setHistory) {
          this.history.push({
            key: this.shortId(),
            name: name
          })
        }
        return true
      }
      console.warn(`未找到名字为${name}的路由`)
      return false
    },
    go(name, data) {
      this.direction = 'left'
      this.setActive(name)
      this.params = data
    },
    back() {
      this.params = null
      if (this.history.length > 1) {
        this.direction = 'right'
        this.history.pop()
        this.setActive(this.lastActive?.name, false)
      } else {
        console.warn('已经到第一页')
      }
    }
  },
  watch: {
    route: {
      immediate: true,
      handler(val) {
        if (val?.length) {
          this.setActive(val[0].name)
        }
      }
    }
  }
}
</script>

<style scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .8s ease;
}

.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */
{
  opacity: 0;
}
</style>
