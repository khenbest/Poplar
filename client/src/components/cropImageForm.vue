<template>
  <div id="app" style="text-align: center">
    <form @submit.prevent="">
      <input v-model="url" type="text" placeholder="image Url"> </input>
    </form>
    <button @click="refresh()">Refresh</button>
    <croppa crossOrigin='anonymous' v-model="croppa" :width="300" :height="375">
      <img crossOrigin="anonymous" :src="url" slot="initial">
    </croppa>
    </croppa>
    <button @click="output()">Output</button>
  </div>
</template>

<script>
  import VueImageUploadCroppie from 'vue-image-upload-croppie'
  import VueCroppie from 'vue-croppie';
  import Croppa from 'vue-croppa'
  export default {
    mounted() {
      console.log(this)
    },
    data() {
      return {
        croppa: {},
        url: '',
        dataUrl: ''
      }
    },
    methods: {
      uploadCroppedImage() {
        this.myCroppa.generateBlob((blob) => {
          // write code to upload the cropped image file (a file is a blob)
        }, 'image/jpeg', 0.8) // 80% compressed jpeg file
      },
      refresh() {
        console.log(this.croppa)
        this.croppa.refresh()
      },
      output() {
        this.dataUrl = this.croppa.generateDataUrl('image/jpeg')
      },
    },
    components: {
    }
  }     
</script>