<template>
  <div id="example1">
    <hot-table :settings="hotSettings"></hot-table>
  </div>
</template>

<script>
import {HotTable} from "@handsontable/vue";
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

export default {
  name: "index",
  data() {
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(6, 10),
        colHeaders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  components: {
    HotTable
  }
}
</script>

<style scoped>

</style>
