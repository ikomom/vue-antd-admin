<template>
  <div>
    <a-button @click="startRecord">计时</a-button>
    <a-button @click="resetRecord">重置</a-button>
    <div>
      {{ format(hour) }} : {{ format(minute) }} : {{ format(second) }}
    </div>
    <Clock2/>
<!--    <simular-clock/>-->
  </div>
</template>

<script>
import SimularClock from "@/pages/test/sComponents/clock/simularClock";
import Clock2 from "@/pages/test/sComponents/clock/newClock";
export default {
  name: "Clock",
  components: { Clock2},
  data() {
    return {
      recordRef: null,
      hour: 23,
      minute: 59,
      second: 59,
    }
  },
  methods: {
    format(num) {
      return num > 9 ? num : '0' + num
    },
    startRecord() {
      this.recordRef = setInterval(() => {
        this.second++;
        if (this.second >= 60) {
          this.minute++;
          this.second = 0;
        }
        if (this.minute >= 60) {
          this.hour++;
          this.minute = 0;
        }
        if (this.hour >= 24) {
          this.resetRecord(false)
        }
      }, 1000)
    },
    resetRecord(clear = true) {
      clear && clearInterval(this.recordRef);
      Object.assign(this, {
        hour: 0,
        minute: 0,
        second: 0,
      })
    }
  },
  beforeDestroy() {
    this.resetRecord();
  }
}
</script>

<style scoped>

</style>
