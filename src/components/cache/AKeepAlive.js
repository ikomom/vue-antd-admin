import { isDef, isRegExp, remove } from '@/utils/util'

const patternTypes = [String, RegExp, Array]

/**
 *
 * @param {VNode.componentOptions} opts
 * @returns {*}
 */
function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

/**
 *
 * @param {VNode} vnode
 * @returns {*}
 */
function getComponentKey(vnode) {
  const { componentOptions, key } = vnode
  return key == null
    // cid是唯一且自增的
    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
    : key + componentOptions.Ctor.cid
}

/**
 * 获取第一个子组件
 * @param children
 * @returns {{isAsyncPlaceholder}|*}
 */
function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || c.isAsyncPlaceholder)) {
        return c
      }
    }
  }
}

/**
 *
 * @param {VNode} keepAliveInstance
 * @param {Function} filter
 */
function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      const componentKey = getComponentKey(cachedNode)
      if (name && !filter(name, componentKey)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

/**
 * 清除缓存 2
 * @param {Object<String, VNode>} cache
 * @param {String} key
 * @param {Array} keys
 */
function pruneCacheEntry2(cache, key, keys) {
  const cached = cache[key]
  if (cached) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

/**
 * 清除缓存
 * @param {Object<String, VNode>} cache
 * @param key
 * @param keys
 * @param {VNode} current
 */
function pruneCacheEntry(cache = {}, key = '', keys = [], current = {}) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
// 闲的，手动实现一个keepAlive, 只支持一个子元素
export default {
  name: 'AKeepAlive',
  // mode: 'abstract', // 抽象路由
  model: {
    prop: 'clearCaches',
    event: 'clear'
  },
  props: {
    // 其余和keep-alive相似 https://cn.vuejs.org/v2/api/#keep-alive
    include: patternTypes,
    includeKeys: patternTypes, // 根据key值判断是否相等
    exclude: patternTypes,
    excludeKeys: patternTypes,
    matches: Function,
    max: [String, Number],
    clearCaches: Array
  },
  watch: {
    clearCaches: function (val) {
      if (val && val.length > 0) {
        const { cache, keys } = this
        val.forEach(key => {
          pruneCacheEntry2(cache, key, keys)
        })
        this.$emit('clear', [])
      }
    }
  },
  created() {
    // 不放到data里，防止重渲染
    this.cache = Object.create(null)
    this.keys = []
  },
  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted() {
    this.$watch('include', val => {
      pruneCache(this, (name) => this._matches(val, name))
    })
    this.$watch('includeKeys', val => {
      pruneCache(this, (name, key) => this._matches(val, key))
    })
    this.$watch('exclude', val => {
      pruneCache(this, (name) => !this._matches(val, name))
    })
    this.$watch('excludeKeys', val => {
      pruneCache(this, (name, key) => !this._matches(val, key))
    })
  },
  methods: {
    _matches(pattern, name) {
      if (this.matches) {
        return this.matches(pattern, name)
      }
      if (Array.isArray(pattern)) {
        if (pattern.indexOf(name) > -1) {
          return true
        } else {
          for (const item of pattern) {
            if (isRegExp(item) && item.test(name)) {
              return true
            }
          }
          return false
        }
      } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
      } else if (isRegExp(pattern)) {
        return pattern.test(name)
      }
      /* istanbul ignore next */
      return false
    }

  },
  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions

    if (componentOptions) {
      const name = getComponentName(componentOptions)
      const componentKey = getComponentKey(vnode)

      const { include, exclude, excludeKeys, includeKeys } = this
      if (
        // 组件名不在include中或不存在
        (include && (!name || !this._matches(include, name))) ||
        (includeKeys && (!componentKey || !this._matches(includeKeys, componentKey))) ||
        // 组件名在exclude中
        (exclude && name && this._matches(exclude, name)) ||
        // 组件key在exclude中
        (excludeKeys && componentKey && this._matches(excludeKeys, componentKey))
      ) {
        // 返回原值
        return vnode
      }

      const { cache, keys } = this
      if (cache[componentKey]) {
        console.log('命中缓存', { componentKey, name })
        // 设置缓存
        vnode.componentInstance = cache[componentKey].componentInstance
        // 去除旧的key值, 使其最新
        remove(keys, componentKey)
        keys.push(componentKey)
      } else {
        console.log('新设缓存', { componentKey, name })
        cache[componentKey] = vnode
        keys.push(componentKey)
        // 超过最大值去除最旧的一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
