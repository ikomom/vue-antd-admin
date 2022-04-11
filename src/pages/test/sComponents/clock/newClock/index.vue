<template>
  <div class="clock">
    <clock-digital :num="hour[1]"/>
    <clock-digital :num="hour[0]"/>
    <div class="gap">:</div>
    <clock-digital :num="minute[1]"/>
    <clock-digital :num="minute[0]"/>
    <div class="gap">:</div>
    <clock-digital :num="second[1]"/>
    <clock-digital :num="second[0]"/>
  </div>
</template>

<script>
import ClockDigital from "./clockDigital";

export default {
  name: "Clock2",
  components: {ClockDigital},
  data() {
    return {
      dateRef: null,
      hour: [0, 0],
      minute: [0, 0],
      second: [0, 0],
    }
  },
  created() {
    this.dateRef = setInterval(this.updateDate, 1000)
  },
  beforeDestroy() {
    clearInterval(this.dateRef)
  },
  methods: {
    updateDate() {
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      if (h < 10) {
        this.hour = [h, 0]
      } else {
        this.hour = [parseInt(h % 10), parseInt(h / 10)]
      }
      if (m < 10) {
        this.minute = [m, 0]
      } else {
        this.minute = [parseInt(m % 10), parseInt(m / 10)]
      }
      if (s < 10) {
        this.second = [s, 0]
      } else {
        this.second = [parseInt(s % 10), parseInt(s / 10)]
      }
    }
  }
}
</script>

<style scoped lang="less">
.clock {
  display: flex;
}

.gap {
  height: 46px;
  padding-left: 10px;
  font-size: 50px;
  font-weight: bold;
  line-height: 0.8;
  transform: skew(-6deg);
}

</style>
