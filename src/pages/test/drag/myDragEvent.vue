<template>
  <div class="event-container">
    宽度(%):
    <a-input-number v-model="width" />
    <table
      class="table-class"
      :style="{width: width + '%'}"
      @mouseup="onMouseUp"
    >
      <thead>
      <tr>
        <th v-for="item in 7" :key="item">星期 {{ item }}</th>
      </tr>
      </thead>
      <tbody @mousemove="onMouseMove" @mouseover="onMouseOver" ref="area">
      <tr v-for="row in 6" :key="row" @mousedown="onMouseDownCell">
        <td v-for="item in 7" :key="item">{{ row }}-{{ item }}</td>
      </tr>
      <div
        v-for="item in events"
        :key="'evt_' + item.id"
        :style="item.style"
        title="事件"
        ref="event"
        class="event"
        @mousedown="onMouseDown($event, item)"
        @mouseup="onMouseUp"
      >
        {{ item.title }}
        <div class="event-resize"></div>
      </div>
      </tbody>

    </table>

  </div>
</template>

<script>
/**
 * TODO 待办
 * 1. table表现力不佳，可能会有隐藏bug, 需要谨慎使用， 以后看看要不要换成div
 * 2. 事件其他家的做法都是，以月视图每行作绝对定位，很奇怪，这个先按我的思路写，如果不行再改
 * 3. 多行事件的表示
 * 4. 事件完全受控于日期、和拖拽，现在用矩阵方法
 */
export default {
  name: "myDragEvent",
  data() {
    return {
      width: 100,
      drag: null,
      mousedownCell: null,
      mousedown: false,
      tempEvent: null,
      events: [
        {
          title: '测试事件',
          id: 1,
          style: {
            top: 0,
            left: 0,
          },
          // 未关联日历，先用style
          start: '2020-09-13',
          end: '2021-09-13',
        }
      ],
    }
  },
  methods: {
    onMouseDownCell(e) {
      this.mousedown = true
      this.mousedownCell = this.getCurCell(e).curCell
      console.log('onMouseDownCell', this.mousedownCell)
    },
    onMouseDown(e, draged) {
      this.drag = draged
    },
    onMouseUp(e) {
      console.log('mouseUp', e)
      this.drag = null
      this.mousedown = false
      if (this.tempEvent) {
        const title = prompt('请输入标题')
        if (title) {
          this.tempEvent.title = title
        } else {
          const index = this.events.findIndex((item) => item.id === this.tempEvent.id)
          // _.remove(this.events, (item) => item.id === this.tempEvent.id)
          this.events.splice(index, 1)
          console.log('removed', this.events)
        }
        this.tempEvent = null
        this.mousedownCell = null
      }
    },
    getCurCell({x, y}) {
      const {height, width, left, top} = this.$refs.area.getBoundingClientRect();
      const cellSize = {h: height / 6, w: width / 7}
      const movePoint = {
        x: x - left,
        y: y - top,
      };
      // [row, col]
      const curCell = [Math.floor(movePoint.x / cellSize.w), Math.floor(movePoint.y / cellSize.h)]
      const moveStyle = {
        top: `${curCell[1] * cellSize.h}px`,
        left: `${curCell[0] * cellSize.w}px`
      }
      return {
        moveStyle,
        curCell,
      }
    },
    onMouseMove(e) {
      const {moveStyle, curCell} = this.getCurCell(e);
      if (this.drag) {
        console.log('mousemove', curCell, this.drag)
        Object.assign(this.drag.style, moveStyle)
      }
      console.log('this.mousedownCell', this.mousedownCell, curCell)
      if (this.mousedown) {
        if (this.tempEvent === null) {
          console.log('新建')
          // this.events.push()
          this.tempEvent = {
            id: new Date().getTime(),
            style: moveStyle,
            title: '( 无标题 )'
          }
          this.events.push(this.tempEvent)
        } else if (this.mousedownCell[1] === curCell[1] && this.mousedownCell[0] <= curCell[0]){// 先求横、正向的
          console.log('延申', curCell[0] - this.mousedownCell[0], this.tempEvent.style)
          this.$set(this.tempEvent.style, 'width', `calc(100% / 7 * ${curCell[0] - this.mousedownCell[0] + 1})`)
        }
      }
    },
    onMouseOver(e) {
      // console.log('onMouseOver')
    }
  }
}
</script>

<style scoped lang="less">
.event-container {
  position: relative;
  //overflow: hidden;

  .table-class {
    table-layout: fixed;
    //border: 1px solid;
    background: #000;
    border-collapse: separate;
    border: none;
    border-spacing: 0.08vw;
    width: 100%;

    td, th {
      background: #fff;
      user-select: none;
    }

    tbody {
      position: relative;

      td {
        padding: 40px;
        margin: 1px;

        &:hover {
          outline: 1px solid red;
        }
      }
    }

    th {
      text-align: center;
    }
  }


  .event {
    position: absolute;
    top: 0;
    left: 0;
    background: blueviolet;
    color: white;
    padding: 4px 8px;
    border-radius: 5px;
    width: calc(100% / 7);
    cursor: pointer;
    user-select: none;

    &:hover {
      background: rgba(138, 43, 226, 0.7);
    }

    .event-resize {
      cursor: s-resize;
    }
  }
}

</style>
