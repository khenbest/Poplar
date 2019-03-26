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
                        <p v-if="showForm">Upload image:</p>
                        <div v-if="showForm">
                            <form @submit.prevent="">
                                <input v-model="url" type="text" placeholder="image Url"> </input>
                            </form>
                            <!-- <button @click="choose()"> -->
                            </button>
                            <croppa v-model="croppa" :width="480" :height="270">
                                <img crossOrigin="anonymous" :src="url" slot="initial">
                            </croppa>
                            </croppa>
                            <button @click="output1()">Crop</button>
                        </div>
                        <div v-if="showForm">
                            <h4>THEN</H4>
                            <input class="form-control" type="text" placeholder="Ask your question"
                                v-model="newPost.title" required>
                            <button v-if="this.dataUrl1 != ''" @click="addPost" class="btn btn-primary mt-3"
                                type="submit">Create Post</button>
                        </div>
                    </div>
                    <div class="col-12 p-5 card" :class="{question : showForm1==false}" @click="showForm1 = true">
                        <h3 v-if="!showForm1" class="text-muted">(2 images)</h3>
                        <h3 v-if="!showForm1">This or That?</h3>
                        <div v-if="showForm1" @submit.prevent="addPost2">
                            <div class="row">
                                <p v-if="showForm1">Upload image:</p>
                                <div v-if="showForm1">
                                    <form @submit.prevent="">
                                        <input v-model="url2" type="text" placeholder="image Url"> </input>
                                    </form>
                                    <!-- <button @click="choose()"> -->
                                    </button>
                                    <croppa v-model="croppa2" :width="240" :height="270">
                                        <img crossOrigin="anonymous" :src="url2" slot="initial">
                                    </croppa>
                                    <button @click="output2()">Crop</button>
                                </div>
                                <h4 class="m-2">Image 2</h4>
                                <p v-if="showForm1">Upload image:</p>
                                <div v-if="showForm1">
                                    <form @submit.prevent="">
                                        <input v-model="url3" type="text" placeholder="image Url"> </input>
                                    </form>
                                    <!-- <button @click="choose()"> -->
                                    <croppa v-model="croppa3" :width="240" :height="270">
                                        <img crossOrigin="anonymous" :src="url3" slot="initial">
                                    </croppa>
                                    <button @click="output3()">Crop</button>
                                </div>
                            </div>
                            <H4 class="m-2">THEN</H4>
                            <input class="form-control" type="text" placeholder="Ask your question"
                                v-model="newPost.title" required>
                            <button v-if="dataUrl2 != '' && dataUrl3 != ''" class="btn btn-primary mt-3"
                                @click="addPost2">Create Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Croppa from 'vue-croppa'
    export default {
        name: "makePost",
        props: [],
        data() {
            return {
                croppa: {},
                croppa2: {},
                croppa3: {},
                showCroppa: false,
                url: '',
                url2: '',
                url3: '',
                dataUrl1: '',
                dataUrl2: '',
                dataUrl3: '',
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
        },
        methods: {
            choose() {
                this.croppa.chooseFile()
            },
            addPost() {
                let payload = {
                    title: this.newPost.title,
                    imgUrl1: this.dataUrl1
                }
                console.log(payload)
                this.$store.dispatch("addPost", payload).then(((this.$router.push({ name: 'posts' }))))
            },
            addPost2() {
                let payload = {
                    title: this.newPost.title,
                    imgUrl1: this.dataUrl2,
                    imgUrl2: this.dataUrl3
                }
                console.log(payload)
                this.$store.dispatch("addPost", payload).then(((this.$router.push({ name: 'posts' }))))
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
            },
            refresh() {
                console.log(this.croppa)
                this.croppa.refresh()
            },
            output1() {
                this.dataUrl1 = this.croppa.generateDataUrl('image/jpeg', 0.5)
            },
            output2() {
                this.dataUrl2 = this.croppa2.generateDataUrl('image/jpeg', 0.5)
            },
            output3() {
                this.dataUrl3 = this.croppa3.generateDataUrl('image/jpeg', 0.5)
            },
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