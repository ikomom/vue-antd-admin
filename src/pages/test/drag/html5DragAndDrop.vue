<template>
  <div class="drag-contain">
    <a-row>
      <a-col :span="12">
        <div class="drag-box" @dragstart="onDragStart" @dragend="onDragEnd" @drag="onDrag">
          <a :draggable="true" href="#">链接</a>
          <p>测试文本~~~~</p>
          <img :draggable="true" style="object-fit: scale-down"
               src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/a240c0830a5281c566e1799245f5f92f~300x300.image">
        </div>
        <!--        <draggable>-->
        <!--          <img style="object-fit: scale-down" src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/a240c0830a5281c566e1799245f5f92f~300x300.image">-->
        <!--          <img style="object-fit: scale-down" src="https://avatars.githubusercontent.com/u/9692408?v=4">-->
        <!--        </draggable>-->
      </a-col>
      <a-col :span="12">
        <drag-container
          class="drag-box forbidden-user-action"
          hover-class="drag-hover"
          @dragenter="onDragEnter"
          @dragleave="onDragLeave"
          @dragover="onDragOver"
          @drop="onDragDrop"
        >
          <a-icon type="container" style="font-size: 40px;margin-bottom: 10px" />
          <p>放置</p>
        </drag-container>

      </a-col>
    </a-row>
  </div>
</template>

<script>
// import draggable from "vuedraggable";

import DragContainer from "@/pages/test/drag/components/dragContainer";

export default {
  name: "html5DragAndDrop",
  components: {DragContainer},
  // components: {draggable},
  data() {
    return {
      dragOver: false,
      lastDragEnter: null
    }
  },
  created() {
  },
  methods: {
    toArrayTransferItems(items = []) {
      const arr = []

      for (let item of items) {
        const itemData = {
          type: item.type,
          kind: item.kind,
        }
        console.log('=======', itemData)
        arr.push(
          new Promise((resolve) => {
            item.getAsString((data) => {
              resolve({
                ...itemData,
                string: data
              })
            })
          })
        )
      }
      return Promise.all
    },
    //=========== 拖拽元素回调 ===========
    onDragStart(event) {
      console.log('onDragStart', {
        uri: event.dataTransfer.getData('text/uri-list'),
        html: event.dataTransfer.getData('text/html')
      })
      event.dataTransfer.setData("deviceId", JSON.stringify({
        Hello: 'World'
      }))
    },
    onDrag(event) {
      // console.log('onDrag',
      //   event.dataTransfer.getData('text/uri-list')
      // )
    },
    onDragEnd(event) {
      console.log('onDragEnd',
        event.dataTransfer.getData('deviceId')
      )
    },
    //=========== 目标区域回调 ===========
    onDragEnter(event) {

    },
    onDragLeave(event) {
      console.log('onDragLeave', event.target)

    },
    onDragOver(event) {

    },
    onDragDrop(event) {
      console.log('onDrop', event.dataTransfer.getData('deviceId'))

    },
  }
}
</script>

<style scoped lang="less">
.drag-contain {
  ::v-deep {
    .ant-col {
      //height: 500px;
    }
  }

  .forbidden-user-action {
    user-select: none;
    -webkit-user-drag: none;
  }

  .drag-box {
    margin: 0 auto;
    width: 200px;
    height: 300px;
    border: 1px dashed #5454ff;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding: 10px;
  }

  .drag-hover {
    border: 4px dashed red;

    * {
      pointer-events: none;
    }
  }
}
</style>
