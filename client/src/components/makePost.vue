<template>
    <div class="makePost">
        <div class="row justify-content-center">
            <div class="col-6 mt-4 d-flex border rounded">
                <div class="card-title">
                    <div class="row justify-content-center">
                        <h3>Which type of question would you like to ask?</h3>
                        <div class="col-6">
                            <h3 class="text-muted">(1 image)</h3>
                            <div class="btn border shadow" @click="toggleShow1">Yes or No?</div>
                            <form v-if="toggleShow1" @submit.prevent="addPost">
                                <input type="text" placeholder="title" v-model="newPost.title" required>
                                <button type="submit">Create Post</button>
                            </form>
                        </div>
                        <div class="col-6">
                            <h3 class="text-muted">(2 images)</h3>
                            <div class="btn border shadow" @click="toggleShow">This or That?</div>
                            <form v-if="toggleShow" @submit.prevent="addPost">
                                <input type="text" placeholder="title" v-model="newPost.title" required>
                                <button type="submit">Create Post</button>
                            </form>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="submitPost">

                </form>
            </div>
        </div>
        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadSuccess" v-model="show" :width="250" :noCircle='noCircle' :height="500" url=""
            :params="params" :langType="langType" :headers="headers" img-format="jpg"></my-upload>

        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadSuccess" v-model="show1" :width="500" :noCircle='noCircle' :height="500" url=""
            :params="params" :langType="langType" :headers="headers" img-format="jpg">
        </my-upload>
        <img :src="imgDataUrl">
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
                newPost: {

                },
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
            addPost() {
                this.newPost.imgUrl1 = this.imgDataUrl
                console.log(this.newPost)
                this.$store.dispatch("addPost", this.newPost);
                event.target.reset()
            },
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