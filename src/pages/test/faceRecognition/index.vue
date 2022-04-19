<template>
  <div>
    faceRecognition
    <video id="myVideo" ref="video" width="640" height="480" preload autoplay loop muted></video>

  </div>
</template>

<script>
import adapter from 'webrtc-adapter';
import './shim'

export default {
  name: "FaceRecognition",
  data() {
    return {
    }
  },
  created() {

    console.log('adapter', adapter.browserDetails)
    // {facingMode: 'environment'}
    navigator.mediaDevices.getUserMedia({ audio: false, video: true,  })
      .then((stream) => {
        console.log('stream', stream)
        const video = this.$refs.video
         if ("srcObject" in video) {
           video.srcObject =  stream
         } else {
           video.src =  window.URL.createObjectURL(stream)
         }


        video.onloadedmetadata = (e) => {
          this.$message.success('开始录制')
          console.log('onloadedmetadata', e)
          video.play();
        }
        video.onerror = (err) => {
          this.$message.error('播放失败')
          console.error('onerror', err)
          // stream.stop()
        }
      })
      .catch((err) =>  {
        console.error('stream', err.message)
      });
  }
}
</script>

<style scoped>
video {
  background: #cccccc;
}
</style>
