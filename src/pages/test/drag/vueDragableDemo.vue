<template>
  <div class="drag-demo">
    <details>
      <summary style="cursor: pointer">vue-draggable和元素混用</summary>
      <a-row>
        <a-col :span="12">
          {{ drag ? '拖拽中' : '停止' }}
          <table
            border="1" cellpadding="10" cellspacing="10" frame="hsides"
            summary="The number of employees and the foundation year of some imaginary companies."
          >
            <caption>Table 1: Company data</caption>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Employees</th>
              <th scope="col">Founded</th>
            </tr>
            <!--       handle=".move" -->
            <draggable
              v-model="list"
              :group="{ name: 'people', pull: pullCallBack, put: true }"
              :component-data="{aa: 222}"
              animation="500"
              :delay="750"
              tag="tBody"
              handle=".move"
              :force-fallback="true"
              @start="onStart"
              @end="onEnd"
              :move="checkMove"
            >
              <tr v-for="item in list" :key="item.id"
                  :class="{'tr-chosen': item.chosen}"
              >
                <th scope="row">{{item.chosen}}</th>
                <td>{{ item.name }}</td>
                <td class="move"
                    @mousedown="item.chosen = true"
                    @mouseleave="item.chosen = false"
                    @mouseup="item.chosen = false"
                >{{ item.id }}</td>
              </tr>
            </draggable>
          </table>
        </a-col>
        <a-col :span="12">
          <!--        {{ list }} {{ tabs }}-->
          <!--handle=".ant-tabs-tab"-->
          <a-button type="primary" @click="tabs = []">重置</a-button>
          <div class="drag-box">
            <a-tabs style="height: 100%" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @mouseup="onMouseUp">
              <a-tab-pane v-for="item in tabs" :key="item.id" :tab="item.name">{{ item }}</a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
      </a-row>
    </details>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sortablejs from 'sortablejs'

export default {
  name: "VueDragableDemo",
  components: {draggable},
  data() {
    return {
      drag: false,
      dragOver: false,
      chosen: false,
      dragItem: null,
      //定义要被拖拽对象的数组
      list: [
        {id: 1, name: 'www.itxst.com', chosen: false},
        {id: 2, name: 'www.jd.com', chosen: false},
        {id: 3, name: 'www.ebay.com', chosen: false},
      ],
      tabs: [
        {id: 4, name: 'tab_1'}
      ],
      dragTabName: new Date().getTime()
    };
  },

  methods: {
    pullCallBack() {
      return this.drag ? true : 'clone'
    },
    checkMove(evt) {
      // console.log(evt)
      return true;
    },
    //开始拖拽事件
    onStart(evt) {
      console.log('开始拖拽', evt)
      this.drag = true;
      this.dragItem = {...this.list[evt.oldIndex]}
    },
    //拖拽结束事件
    onEnd(evt) {
      console.log('拖拽结束', evt)
      this.drag = false;
      this.dragItem = null
    },
    onAdd(evt) {
      console.log('evt', evt)
    },
    // 监听鼠标
    onMouseEnter(evt) {
      console.log('onMouseEnter', evt)

    },
    onMouseLeave(evt) {
      console.log('onMouseLeave', evt)
    },
    onMouseUp(evt) {
      console.log('onMouseUp', evt)
      if (this.drag && this.dragItem) {
        this.dragItem.id = new Date().getTime()
        this.dragItem.name = this.dragItem.name + this.dragItem.id
        this.tabs.push(this.dragItem)
      }
    }
  },
}
</script>

<style scoped lang="less">
.drag-demo {
  table {
    border-collapse: collapse;
    border: 4px solid rgb(200, 200, 200);
    font-size: .8rem;
  }

  .move {
    cursor: pointer;
  }

  ::v-deep {
    .ant-row {
      background: #fa9898;

      * {
        color: #ffffff;
      }
    }
  }

  tr {
    position: relative;
    &::before{
      width: 0;
      height: 100%;
      z-index: 1;
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      transition: width .8s;
      background: linear-gradient(right,red,blue);
    }
  }


  //@keyframes progress{
  //  0% {
  //    background: #55a532;
  //  }
  //  100% {
  //    background: red;
  //  }
  //}


  .tr-chosen {
    //cursor: pointer;
    &::before {
      //background: #c3ecb5;
      width:  calc(100% - 4px);
    }
    * {
      position: relative;
      z-index: 2;
    }
  }
  .sortable-chosen {
    * {
      position: relative;
      z-index: 2;
    }
    &::before {
      //background: #55a532;
      width:  calc(100% - 4px);
    }
  }

  .sortable-ghost{
    background: linear-gradient(right,red,blue);
  }

  .drag-box {
    margin: 0 auto;
    border: 1px dashed #5454ff;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    //padding: 10px;
    //box-sizing: border-box;
    height: 100px;
    //overflow: auto;

    &:hover {
      border: 4px dashed red;
      //* {
      //  pointer-events: none;
      //}
    }
  }
}

</style>
