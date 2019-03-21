<template>
    <div class="makePost">
        <div class="row justify-content-center">
            <div class="col-8 mt-4 border rounded">
                <div class="card-title">
                    <h3>Which type of question would you like to ask?</h3>
                    <div class="col-12 p-5 card" :class="{question : showForm == false}" @click="showForm=true">
                        <!-- <button class="btn btn-secondary col-3" v-if="showForm"
                                @click="showForm = false">Back</button> -->
                        <h3 v-if="!showForm" class="text-muted">(1 image)</h3>
                        <h3 v-if="!showForm">Yes or No?</h3>
                        <p v-if="showForm">Upload image: <button class="btn btn-secondary" @click="toggleShow1">Choose
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
                    <div class="col-12 p-5 card" :class="{question : showForm1==false}" @click="showForm1 = true">
                        <h3 v-if="!showForm1" class="text-muted">(2 images)</h3>
                        <h3 v-if="!showForm1">This or That?</h3>
                        <form v-if="showForm1" @submit.prevent="addPost2">
                            <div class="row">
                                <div class="col-6 card w-100 justify-content-center">
                                    <h4 class="m-2">Image 1</h4>
                                    <button v-if="showForm1" class="btn btn-secondary w-50 offset-3"
                                        @click="toggleShow2">Choose
                                        File</button>
                                    <h5 v-if="showForm1" class="muted p-3">OR</h5>
                                    <p v-if="showForm1">Enter image Url: <input v-model="newPost.imgUrl1" type="text"
                                            placeholder="URL" /></p>
                                </div>
                                <div class="col-6 card w-100 justify-content-center">
                                    <h4 class="m-2">Image 2</h4>
                                    <button v-if="showForm1" class="btn btn-secondary w-50 offset-3"
                                        @click="toggleShow3">Choose
                                        File</button>
                                    <h5 v-if="showForm1" class="muted p-3">OR</h5>
                                    <p v-if="showForm1">Enter image Url: <input v-model="newPost.imgUrl2" type="text"
                                            placeholder="URL" /></p>
                                </div>
                            </div>
                            <H4 class="m-2">THEN</H4>
                            <input class="form-control" type="text" placeholder="Ask your question"
                                v-model="newPost.title" required>
                            <button class="btn btn-primary mt-3" type="submit">Create Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <my-upload field="imgUrlData1" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadSuccess" v-model="show1" :width="600" :noCircle='noCircle' :height="375" url=""
            :params="params" :langType="langType" :headers="headers" img-format="jpg">
        </my-upload>
        <my-upload field="imgUrlData2" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadSuccess" v-model="show2" :width="300" :noCircle='noCircle' :height="375" url=""
            :params="params" :langType="langType" :headers="headers" img-format="jpg">
        </my-upload>
        <my-upload field="imgUrlData3" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadSuccess" v-model="show3" :width="300" :noCircle='noCircle' :height="375" url=""
            :params="params" :langType="langType" :headers="headers" img-format="jpg">
        </my-upload>
        <!-- <img :src="imgUrlData">
        <p>{{imgUrlData1}}</p>
        <p>{{imgUrlData2}}</p>
        <img :src="imgUrlData2" /> -->
        <p>{{imgUrlData3}}</p>
        <img :src="imgUrlData3" />
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
                imgUrlData1: '',
                imgUrlData2: '',
                imgUrlData3: '',
                langType: 'en',
                show1: null,
                show2: null,
                show3: null,
                noCircle: true,
                makePost: null,
                showForm: false,
                showForm1: false
            }
        },
        components: {
            'my-upload': myUpload,
        },
        methods: {
            addPost() {
                if (this.imgUrlData1 != "") {
                    this.newPost.imgUrl1 = this.imgUrlData1
                }
                console.log(this.newPost)
                this.$store.dispatch("addPost", this.newPost);
                event.target.reset()
            },
            addPost2() {
                if (this.imgUrlData2 != "") {
                    this.newPost.imgUrl1 = this.imgUrlData2
                }
                if (this.imgUrlData3 != "") {
                    this.newPost.imgUrl2 = this.imgUrlData3
                }
                console.log(this.newPost)
                this.$store.dispatch("addPost", this.newPost);
            },
            toggleShow2() {
                this.show2 = !this.show2;
            },
            toggleShow1() {
                this.show1 = !this.show1;
            },
            toggleShow3() {
                this.show3 = !this.show3;
            },
            /**
             * crop success
             *
             * [param] imgUrlData
             * [param] field
             */
            cropSuccess(data, field) {
                if (field == 'imgUrlData1') {
                    this.imgUrlData1 = data;
                } else if (field == 'imgUrlData2') {
                    this.imgUrlData2 = data;
                } else {
                    this.imgUrlData3 = data;
                }
                console.log('-------- 剪裁成功 --------');
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