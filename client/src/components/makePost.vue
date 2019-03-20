<template>
    <div class="makePost">
        <a class="btn btn-primary mt-5 mr-2" @click="makePost = !makePost">Make New Post</a>
        <div class="row justify-content-center">
            <div v-if="makePost" class="col-3 mt-4 d-flex border rounded">
                <div class="card-title">
                    <div class="row justify-content-center">
                        <h3>Which type of question would you like to ask?</h3>
                        <div class="col-6">
                            <h5 class="text-muted">(1 image)</h5>
                            <button class="btn border box-shadow" @click="toggleShow1">This or That?</button>
                        </div>
                        <div class="col-6">
                            <h5 class="text-muted">(2 images)</h5>
                            <button class="btn border box-shadow" @click="toggleShow">Yes or No?</button>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="submitPost">

                </form>
            </div>
        </div>
        <a class="btn btn-primary mt-5" @click="toggleShow">Upload Image</a>
        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail" v-model="show" :width="250" :noCircle='noCircle' :height="500"
            url="/upload" :params="params" :langType="langType" :headers="headers" img-format="jpg"></my-upload>
        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail" v-model="show1" :width="500" :noCircle='noCircle' :height="500"
            url="/upload" :params="params" :langType="langType" :headers="headers" img-format="jpg"></my-upload>
        <img :src="imgDataUrl">
        <p>{{this.imgDataUrl}}</p>
    </div>
</template>

<script>
    import '@babel/polyfill'; // es6 shim
    import Vue from 'vue';
    import myUpload from 'vue-image-crop-upload';
    export default {
        name: "makePost",
        props: [],
        data() {
            return {
                show: null,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
                imgDataUrl: '',
                langType: 'en',
                show1: null,
                noCircle: true,
                makePost: null
            }
        },
        components: {
            'my-upload': myUpload
        },
        methods: {
            toggleShow() {
                this.show = !this.show;
            },
            toggleShow1() {
                this.show1 = !this.show1;
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
                console.log('-------- upload failed --------');
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }
</script>
<style>
    .vue-image-crop-upload .vicp-wrap .vicp-operate a {
        color: white;
        background-color: blue;
        border-radius: 5%;
    }

    .vue-image-crop-upload .vicp-wrap .vicp-operate a:hover {
        color: white;
        background-color: rgb(136, 136, 255);
        border-radius: 5%;
    }

    .vicp-preview {
        padding-right: 60px;
    }

    span {
        color: black !important;
        padding-right: 10%;
    }
</style>