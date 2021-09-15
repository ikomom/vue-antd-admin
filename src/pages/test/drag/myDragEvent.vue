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
        <div class="event-resize left" @mousedown.stop.self="onMouseDownResize"></div>
        <div class="event-resize bottom" @mousedown.stop.self="onMouseDownResize"></div>
      </div>
      </tbody>

    </table>

  </div>
</template>

<script>
import {SEventSource} from "@/pages/test/drag/Event";
import moment from 'moment';

window.moment = moment;

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
      eventSource: [
        {
          title: '测试事件',
          id: 1,
          style: {},
          // 未关联日历，先用style
          start: '2020-09-13',
          end: '2021-09-13',
        }
      ],
    }
  },
  computed: {
    events({eventSource}) {
      console.log('刷新数据源', eventSource)
      return eventSource.map(source => {
        return {
          ...source,
          style: source.style ? source.style : {}
        }
      })
    }
  },
  methods: {
    onMouseDownResize(e) {
      console.log('onMouseDownResize', e)
    },
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
          const index = this.eventSource.findIndex((item) => item.id === this.tempEvent.id)
          // _.remove(this.events, (item) => item.id === this.tempEvent.id)
          this.eventSource.splice(index, 1)
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
        console.log('mousemove', curCell, this.drag.style)
        // TODO 拖动现在是操作computed出来的数据，怪不得改不到源数据，触发不了刷新; 先把日期接进去再说吧
        Object.assign(this.drag.style, moveStyle)
      }
      // console.log('this.mousedownCell', this.mousedownCell, curCell)
      if (this.mousedown) {
        if (this.tempEvent === null) {
          console.log('新建')
          this.tempEvent = new SEventSource({style: moveStyle})
          this.eventSource.push(this.tempEvent)
        } else if (this.mousedownCell[1] === curCell[1]){// 先求横向的
          if (this.mousedownCell[0] <= curCell[0]) {
            this.$set(this.tempEvent.style, 'width', `calc(100% / 7 * ${curCell[0] - this.mousedownCell[0] + 1})`)
            console.log('右延申', curCell[0] - this.mousedownCell[0], {...this.tempEvent.style})
            // 0 时置于原位
            if (this.mousedownCell[0] === curCell[0]) {
              this.$set(this.tempEvent.style, 'left', moveStyle.left)
            }
          } else {
            this.$set(this.tempEvent.style, 'width', `calc(100% / 7 * ${this.mousedownCell[0] - curCell[0] + 1})`)
            console.log('左延申', this.mousedownCell[0] - curCell[0], {...this.tempEvent.style})
            this.$set(this.tempEvent.style, 'left', moveStyle.left)
          }
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
      position: absolute;
      //background: red;

      &.left {
        cursor: e-resize;
        right: 0;
        top: 0;
        width: 4px;
        height: 100%;
      }

      &.bottom {
        cursor: s-resize;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
    }
  }
}

</style>
