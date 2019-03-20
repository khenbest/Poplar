<template>
    <div class="makePost">
        <div class="row justify-content-center">
            <div class="col-6 mt-4 d-flex border rounded">
                <div class="card-title">
                    <div class="row justify-content-center">
                        <h3>Which type of question would you like to ask?</h3>
                        <div class="col-6 p-5 card" :class="{question : showForm == false}" @click="showForm=true">
                            <!-- <button class="btn btn-secondary col-3" v-if="showForm"
                                @click="showForm = false">Back</button> -->
                            <h3 v-if="!showForm" class="text-muted">(1 image)</h3>
                            <h3 v-if="!showForm">Yes or No?</h3>
                            <p v-if="showForm">Upload image: <button class="btn btn-secondary"
                                    @click="toggleShow1">Choose
                                    File</button></p>
                            <h4 v-if="showForm" class="muted">OR</h4>
                            <form v-if="showForm" @submit.prevent="addPost">
                                <p v-if="showForm">Enter image Url: <input v-model="newPost.imgUrl1" type="text"
                                        placeholder="URL" /></p>
                                <H4>THEN</H4>
                                <input class="form-control" type="text" placeholder="Ask your question"
                                    v-model="newPost.title" required>
                                <button class="btn btn-primary mt-3" type="submit">Create Post</button>
                            </form>
                        </div>
                        <div class="col-6 p-5 card" :class="{question2 : showForm==false}"
                            @click="showForm1 = !showForm1">
                            <h3 v-if="!showForm1" class="text-muted">(2 images)</h3>
                            <h3 v-if="!showForm1">This or That?</h3>
                            <button v-if="showForm1" class="btn btn-primary" @click="toggleShow1">Upload Image</button>
                            <form v-if="showForm1" @submit.prevent="addPost">
                                <button type="submit">Create Post</button>
                            </form>
                        </div>
                    </div>
                </div>
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
                makePost: null,
                showForm: false,
                showForm1: null
            }
        },
        components: {
            'my-upload': myUpload
        },
        methods: {
            addPost() {
                if (this.newPost.imgDataUrl = "") {
                    this.newPost.imgUrl1 = this.imgDataUrl
                }
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
    .question:hover {
        background-color: rgba(210, 210, 210, 0.673);
        cursor: pointer;
    }

    .question {
        transition: all 0.2s linear;
    }

    .question2:hover {
        background-color: rgba(210, 210, 210, 0.673);
        cursor: pointer;
    }

    .question2 {
        transition: all 0.2s linear;
    }

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