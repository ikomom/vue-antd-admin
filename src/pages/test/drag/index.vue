<template>
  <a-tabs>
    <a-tab-pane key="5" tab="交换位置">
      <swtich-position/>
    </a-tab-pane>
    <a-tab-pane key="4" tab="自定义拖拽事件">
      <my-drag-event/>
    </a-tab-pane>
    <a-tab-pane key="3" tab="test-snow">
      <x-button>zzzz</x-button>
      <XCalendar/>
    </a-tab-pane>
    <a-tab-pane key="1" tab="html5">
      <html5-drag-and-drop/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="vue-dragable">
      <vue-dragable-demo/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import Html5DragAndDrop from "@/pages/test/drag/html5DragAndDrop";
import VueDragableDemo from "@/pages/test/drag/vueDragableDemo";
import {XButton, XCalendar} from "vue-snow-ui";
import MyDragEvent from "@/pages/test/drag/components/calendar/myDragEvent";
import SwtichPosition from "@/pages/test/drag/swtichPosition";

export default {
  name: "index",
  // eslint-disable-next-line vue/no-unused-components
  components: {SwtichPosition, MyDragEvent, VueDragableDemo, Html5DragAndDrop, XButton, XCalendar},
  created() {
    // document.addEventListener('dragstart', function (event) {
    //   console.log('dragstart: ' + event.dataTransfer);
    // });
    // document.addEventListener('dragenter', function (event) {
    //   console.log('dragenter: ' + event.dataTransfer);
    // });
    // document.addEventListener('dragleave', function (event) {
    //   console.log('dragleave: ' + event.dataTransfer);
    // });
    // document.addEventListener('dragover', function (event) {
    //   event.preventDefault();
    //   console.log('dragover: ' + event.dataTransfer);
    // });
    // document.addEventListener('drop', function (event) {
    //   console.log('drop: ' + event.dataTransfer);
    // });
    // document.addEventListener('dragend', function (event) {
    //   console.log('dragend: ' + event.dataTransfer);
    // });
  }
}
</script>

<style scoped>

</style>
