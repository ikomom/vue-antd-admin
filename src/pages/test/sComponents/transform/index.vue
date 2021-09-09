<template>
  <div class="transform-container" :style="{maxWidth: width}">
    <ul class="transform-list" ref="list" @click="onClick">
      <template v-for="(item, index) in listItem">
        <li
          :key="item.key"
          :data-key="index"
          class="threeD"
          :style="getListItemStyle(index)"
          :class="{active: index === activeKey}"
        >
          <a-icon :type="item.icon" style="pointer-events: none" />
          {{ item.title }}
        </li>
      </template>
    </ul>
    <div class="transform-button">
      <a-icon type="left" class="button left" @click="scroll(-scrollDistance)" :tab-index="1" />
      <a-icon type="right" class="button right" @click="scroll(scrollDistance)" :tab-index="1" />
    </div>
  </div>

</template>

<script>

export default {
  name: "TransformTest",
  data() {
    return {
      width: '380px',
      activeKey: 1,
      scrollDistance: 100,
      listItem: [
        {title: 1, icon: 'delete'},
        {title: 2, icon: 'align-right'},
        {title: 3, icon: 'bg-colors'},
        {title: 4, icon: 'delete'},
        {title: 5, icon: 'left'},
        {title: 6, icon: 'right'},
        {title: 7, icon: 'bold'},
        {title: 8, icon: 'diff'},
        // {key: 4, title: 4, icon: ''},
      ],
    }
  },
  methods: {
    getListItemStyle(index) {
      const isActive = this.activeKey === index;
      return {
        transform: `rotateY(${(this.activeKey - index) * -22}deg) translateZ(${isActive ? 100 : 5}px) scale(${isActive ? 1 : 0.8})`,
        zIndex: isActive ? 2 : 0,
      }
    },
    onClick(e) {
      console.log('e', e.target.getAttribute('data-key'))
      // console.dir(e.target)
      const key = e.target.getAttribute('data-key')
      if (key !== null && key !== this.activeKey) {
        this.activeKey = Number(key)
        e.target.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      }
    },
    onClickAction() {

    },
    scroll(distance) {
      const oldLeft = this.$refs.list.scrollLeft
      const scrollLeft = oldLeft + distance
      this.$refs.list.scroll({
        left: scrollLeft < 0 ? 0 : scrollLeft,
        behavior: 'smooth'
      })
    },
  }
}
</script>

<style scoped lang="less">
.transform-container {
  padding: 0 30px;
  display: inline-block;
  position: relative;
  //background: #a71d5d;

  .transform-list {
    list-style-type: none;
    margin: 0;
    padding: 20px 30px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    transform-style: preserve-3d;
    perspective: 900px;
    position: relative;

    .threeD {
      transition: transform .5s ease-in-out;
      transform: rotateX(0deg) rotateY(-30deg);
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      position: relative;
      backdrop-filter: blur(13px);
    }

    li {
      background-color: lightseagreen;
      display: inline-block;
      padding: 0 20px;
      color: rgba(254, 254, 254, 0.65);
      height: 64px;
      line-height: 64px;
      cursor: pointer;
      font-size: 26px;
      //margin-right: 10px;
      user-select: none;

      &.active {
        color: #fefefe;
      }
    }
  }


  .transform-button {
    .button {
      position: absolute;
      top: calc(50% - 8px);
      cursor: pointer;
      transition: font-size 0.2s;
      user-select: none;

      &:hover {
        color: #1890ff;
      }

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }
    }
  }

}
</style>
