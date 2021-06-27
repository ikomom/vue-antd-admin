<template>
  <div>
    <a-card title="文件上传">
      <input type="file" @change="loadFile($event)" />
      <img style="width: 300px" alt="preview" :src="imgPreview" />
    </a-card>
    <a-card title="加密图片转换">
      <a-button @click="getDreImg">获取</a-button>
      <img style="width: 80px" alt="imgDecr" :src="imgDecr" />
    </a-card>
  </div>
</template>

<script>
export default {
  name: "fileTest",
  data() {
    return {
      imgPreview: '',
      imgDecr: ''
    }
  },
  methods: {
    loadFile(event) {
      const file = event.target.files[0]
      if (file) {
        console.log('loadFile', file.size / (1024 * 1204) + 'M', file)
        file.arrayBuffer().then(res => {
          const dataV = new DataView(res)
          console.log('dataV', dataV)
        })
        const reader = new FileReader();
        reader.onload = () => {
          this.imgPreview = reader.result;
          // console.log("转换结果", reader.result.length, reader.result)
          // const source = atob(reader.result.split('base64,')[1])
          // console.log('source', source)
        };
        reader.onerror = (err) => {
          console.error(err)
        }
        reader.readAsDataURL(file);
      }
    },
    getDreImg() {
      fetch("https://avatars3.githubusercontent.com/u/4220799")
          .then((response) => {
            console.log('response', response)
            return response.blob()
          })
          .then((blob) => {
            console.log("blob", blob)
            this.imgDecr = URL.createObjectURL(blob);
          });
    }
  }
}
</script>

<style scoped>

</style>
