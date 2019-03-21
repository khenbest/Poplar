<template>
  <div id="app" style="text-align: center">
    <img :src="defaultImage" style="width: 100px;height: 100px">
    <form @submit.prevent="toBase64();toBase64();">
      <input v-model="defaultImage" type="text" placeholder="image Url"> </input>
      <button type="submit">submit</button>
      <img :src="base64" id="image" />
    </form>
    <VueImageUploadCroppie :defaultImage.sync="defaultImage" :height="100" :width="100" :circle="false" :trans="trans">
    </VueImageUploadCroppie>
    <img v-if="this.base64.length > 0" :src="base64" id="image" />
  </div>
</template>

<script>
  import VueImageUploadCroppie from 'vue-image-upload-croppie'
  export default {
    name: 'app',
    props: {
      'height': {
        type: Number,
        default: 200
      },
      'circle': { // crop circle or square image
        type: Boolean,
        default: false
      },
      'width': {
        type: Number,
        default: 200
      },
      'trans': { // button text translation
        type: Object,
        default: function () {
          return {
            'cropImage': 'Crop Image',
            'chooseImage': 'Choose Image',
            'confirmCutting': 'Confirm Cutting'
          }
        }
      }
    },
    data() {
      return {
        base64: '',
        'defaultImage': '',
        'trans': {
          'cropImage': '裁剪图片',
          'chooseImage': '选择图片',
          'confirmCutting': '确认裁剪'
        }
      }
    },
    watch: {
      'defaultImage': function (value) {
        if (value) {
          // do whatever you want with image value,(upload ..)
        }
      }
    },
    components: {
      VueImageUploadCroppie
    },
    methods: {
      toBase64() {
        let img = document.getElementById('image')
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        this.base64 = canvas.toDataURL("image/png");
      }
    }
  }
</script>