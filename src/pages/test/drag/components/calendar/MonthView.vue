<template>
  <div class="month-view">
    <div v-for="item in weekdays" :key="item" class="month-cell">{{item}}</div>
    <div v-for="item in curDays.prev" :key="'prev' + item" class="month-cell prev">{{item}}  {{sular(item)}}</div>
    <div v-for="item in curDays.current" :key="item" class="month-cell">{{item}} {{sular(item)}}</div>
    <div v-for="item in curDays.next" :key="'next' + item" class="month-cell next">{{item}}  {{sular(item)}}</div>
  </div>
</template>

<script>
import {generateMonthDays} from "@/pages/test/drag/components/calendar/date";
import moment from "moment";
import solarLunar from 'solarlunar';

window.solarLunar = solarLunar

const current = new Date();

export default {
  name: "MonthView",
  props: {
    year: {
      type: [String, Number],
      default: current.getFullYear(),
    },
    month: {
      type: [String, Number],
      default: current.getMonth() + 1
    }
  },
  filters: {
  },
  data() {
    return {
      weekdays: moment.weekdays(true),
    }
  },
  computed: {
    isLeapYear({year}) {
      return moment([year]).isLeapYear()
    },
    curDays({year, month}) {
      console.log('generate', generateMonthDays(year, month, 'DD'))
      return generateMonthDays(year, month, 'DD')
    }
  },
  methods: {
    sular(day) {
      return solarLunar.solar2lunar(this.year, this.month, day).dayCn
    }
  }
}
</script>

<style scoped lang="less">
.month-view {
  .month-cell {
    color: #000;
    width: calc(100% / 7);
    display: inline-block;
    border: 1px solid #b7bfd0;

    &.prev, &.next {
      color: #b7bfd0;
    }
  }
}
</style>
