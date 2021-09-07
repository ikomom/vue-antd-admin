<template>
  <a-tabs>
    <a-tab-pane key="3" tab="test-snow">
      <x-button>zzzz</x-button>
      <Calendar/>
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
import {XButton, Calendar} from "vue-snow-ui";

export default {
  name: "index",
  // eslint-disable-next-line vue/no-unused-components
  components: {VueDragableDemo, Html5DragAndDrop, XButton, Calendar},
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
