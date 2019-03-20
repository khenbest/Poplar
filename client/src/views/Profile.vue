<template>
    <div class="profile">
        <a class="btn" @click="toggleShow">set avatar</a>
        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="300" url="/upload" :params="params"
            :langType="langType" :headers="headers" img-format="png"></my-upload>
        <img :src="imgDataUrl">
        <p>{{this.imgDataUrl}}</p>
    </div>
</template>

<script>
    import '@babel/polyfill'; // es6 shim
    import Vue from 'vue';
    import myUpload from 'vue-image-crop-upload';
    export default {
        name: "profile",
        props: [],
        mounted() {
            if (this.files && this.files[0]) {
                var FR = new FileReader();
                FR.addEventListener("load", function (e) {
                    document.getElementById("img").src = e.target.result;
                    document.getElementById("b64").innerHTML = e.target.result;
                });

                FR.readAsDataURL(this.files[0]);
            }
            document.getElementById("inp").addEventListener("change", readFile);
        },
        data() {
            return {
                show: true,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
                imgDataUrl: '',
                langType: 'en'
            }
        },
        components: {
            'my-upload': myUpload
        },
        methods: {
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field) {
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData  server api return data, already json encode
             * [param] field
             */
            cropUploadSuccess(jsonData, field) {
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field) {
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }
</script>