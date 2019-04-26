<template>
    <div class="makePost container-fluid"
        :class="$mq | mq({xs: 'margin-mobile', sm: 'margin-mobile', md: 'margin-comp', lg: 'margin-comp'})">
        <mq-layout mq="xs">
            <div class="row justify-content-center">
                <div :class="$mq | mq({xs: 'col-12 px-0', sm: 'col-12 px-0', md: 'col-8', lg: 'col-8'})">
                    <h3>Which type of question would you like to ask?</h3>
                    <!-- YES OR NO -->
                    <div class="col-12 p-5 card" :class="{question : showForm == false}" @click="showForm=true">
                        <h3 v-if="!showForm" class="text-muted">(1 image)</h3>
                        <h3 v-if="!showForm">Yes or No?</h3>
                        <h4 v-if="showForm">Upload "YES/NO" Image:</h4>
                        <div v-if="showForm" class="">
                            <div class="row">
                                <div class="col-12 d-flex justify-content-center">
                                    <form @submit.prevent="">
                                        <input class="form-control" v-model="url" type="text" placeholder="image Url">
                                        </input>
                                    </form>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-12 d-flex justify-content-center">
                                    <croppa v-model="croppa" canvas-color="#e9ecee" :width="374" :height="210.375">
                                        <img crossOrigin="anonymous" :src="cUrl" slot="initial">
                                    </croppa>
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-12">
                                    <button class="btn btn-primary" @click="output1()">Crop</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="showForm">
                            <h4>THEN</H4>
                            <div>
                                <h4>Select a Tag!</h4>
                                <form class="mb-3 ">
                                    <select name="tags" v-model="newPost.tags">
                                        <option :value="null">Please select a Tag</option>
                                        <option value=music>Music</option>
                                        <option value="sports">Sports</option>
                                        <option value="movies">Movies</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="food">Food</option>
                                        <option value="tv">TV</option>
                                        <option value="kimspiration">Kimspiration</option>
                                        <option value="question">Questions</option>
                                        <option value="developer">Developer Memes</option>
                                        <option value="meme-culture">Meme-Culture</option>
                                    </select>
                                </form>
                            </div>
                            <input class="form-control" type="text" placeholder="Ask your question"
                                v-model="newPost.title" required>
                            <button v-if="this.dataUrl1 != ''" @click="addPost" class="btn btn-primary mt-3"
                                type="submit">Create
                                Post</button>
                        </div>
                    </div>

                    <!-- THIS OR THAT -->
                    <div class="col-12 p-5 card" :class="{question : showForm1==false}" @click="showForm1 = true">
                        <h3 v-if="!showForm1" class="text-muted">(2 images)</h3>
                        <h3 v-if="!showForm1">This or That?</h3>
                        <div v-if="showForm1" @submit.prevent="addPost2">
                            <p v-if="showForm1">Upload "THIS" Image:</p>
                            <div class="row justify-content-center">
                                <div v-if="showForm1">
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center">
                                            <form @submit.prevent="">
                                                <input v-model="url2" type="text" placeholder="image Url"> </input>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col-12 d-flex justify-content-center">
                                            <croppa v-model="croppa2" canvas-color="#e9ecee" :width="240" :height="270">
                                                <img crossOrigin="anonymous" :src="url2" slot="initial">
                                            </croppa>
                                        </div>
                                    </div>
                                    <button @click="output2()" class="mb-2">Crop</button>
                                </div>
                                <!-- IMAGE 2 -->
                                <p v-if="showForm1">Upload "THAT" Image:</p>
                                <div v-if="showForm1">
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center">
                                            <form @submit.prevent="">
                                                <input v-model="url3" type="text" placeholder="image Url"> </input>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col-12 d-flex justify-content-center">
                                            <croppa v-model="croppa3" canvas-color="#e9ecee" :width="240" :height="270">
                                                <img crossOrigin="anonymous" :src="url3" slot="initial">
                                            </croppa>
                                        </div>
                                    </div>
                                    <button @click="output3()" class="mb-2">Crop</button>
                                </div>
                            </div>
                            <H4 class="m-2">THEN</H4>
                            <div>
                                <h4>Select a Tag!</h4>
                                <form class="mb-3">
                                    <select name="tags" v-model="newPost.tags">
                                        <option :value="null">Please select a Tag</option>
                                        <option value=music>Music</option>
                                        <option value="sports">Sports</option>
                                        <option value="movies">Movies</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="food">Food</option>
                                        <option value="tv">TV</option>
                                        <option value="kimspiration">Kimspiration</option>
                                        <option value="question">Question's</option>
                                        <option value="developer">Developer Meme's</option>
                                        <option value="meme-culture">Meme-Culture</option>
                                    </select>
                                </form>
                            </div>
                            <input class="form-control" type="text" placeholder="Ask your question"
                                v-model="newPost.title" required>
                            <button v-if="dataUrl2 != '' && dataUrl3 != ''" class="btn btn-primary mt-3"
                                @click="addPost2">Create
                                Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </mq-layout>

        <mq-layout mq="sm">
            <div class="row justify-content-center">
                <div :class="$mq | mq({xs: 'col-12 px-0', sm: 'col-12 px-0', md: 'col-8', lg: 'col-8'})">
                    <h3>Which type of question would you like to ask?</h3>
                    <!-- YES OR NO -->
                    <div class="col-12 p-5 card" :class="{question : showForm == false}" @click="showForm=true">
                        <h3 v-if="!showForm" class="text-muted">(1 image)</h3>
                        <h3 v-if="!showForm">Yes or No?</h3>
                        <h3 v-if="showForm">Upload "YES/NO" Image:</h3>
                        <div v-if="showForm" class="">
                            <div class="row">
                                <div class="col-12 d-flex justify-content-center">
                                    <form class="row" @submit.prevent="">
                                        <input class="form-control" v-model="url" type="text" placeholder="image Url">
                                        </input>
                                    </form>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-12 d-flex justify-content-center">
                                    <croppa v-model="croppa" canvas-color="#e9ecee" :width="374" :height="210.375">
                                        <img crossOrigin="anonymous" :src="url" slot="initial">
                                    </croppa>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-4">
                                    <button class="btn btn-primary my-2" @click="output1()">Crop</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="showForm">
                            <h4>THEN</H4>
                            <div>
                                <h4>Select a Tag!</h4>
                                <form class="mb-3 ">
                                    <select name="tags" v-model="newPost.tags">
                                        <option :value="null">Please select a Tag</option>
                                        <option value=music>Music</option>
                                        <option value="sports">Sports</option>
                                        <option value="movies">Movies</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="food">Food</option>
                                        <option value="tv">TV</option>
                                        <option value="kimspiration">Kimspiration</option>
                                        <option value="question">Question's</option>
                                        <option value="developer">Developer Meme's</option>
                                        <option value="meme-culture">Meme-Culture</option>
                                    </select>
                                </form>
                            </div>
                            <div class="row justify-content-center">
                                <input class="col-10 form-control" type="text" placeholder="Ask your question"
                                    v-model="newPost.title" required>
                                <button v-if="this.dataUrl1 != ''" @click="addPost" class="btn btn-primary mt-3"
                                    type="submit">Create
                                    Post</button>
                            </div>
                        </div>
                    </div>

                    <!-- THIS OR THAT -->
                    <div class="col-12 p-5 card" :class="{question : showForm1==false}" @click="showForm1 = true">
                        <h3 v-if="!showForm1" class="text-muted">(2 images)</h3>
                        <h3 v-if="!showForm1">This or That?</h3>
                        <div v-if="showForm1" @submit.prevent="addPost2">
                            <p v-if="showForm1">Upload "THIS" Image:</p>
                            <div class="row justify-content-center">
                                <div v-if="showForm1">
                                    <div class="row">
                                        <form class="row" @submit.prevent="">
                                            <input class="form-control" v-model="url2" type="text"
                                                placeholder="image Url" />
                                        </form>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col-12 d-flex justify-content-center">
                                            <croppa v-model="croppa2" canvas-color="#e9ecee" :width="240" :height="270">
                                                <img crossOrigin="anonymous" :src="url2" slot="initial">
                                            </croppa>
                                        </div>
                                    </div>
                                    <button @click="output2()" class="mb-2">Crop</button>
                                </div>
                                <!-- IMAGE 2 -->
                                <p v-if="showForm1">Upload "THAT" Image:</p>
                                <div v-if="showForm1">
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center">
                                            <form @submit.prevent="">
                                                <input v-model="url3" type="text" placeholder="image Url"> </input>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col-12 d-flex justify-content-center">
                                            <croppa v-model="croppa3" canvas-color="#e9ecee" :width="240" :height="270">
                                                <img crossOrigin="anonymous" :src="url3" slot="initial">
                                            </croppa>
                                        </div>
                                    </div>
                                    <button @click="output3()" class="mb-2">Crop</button>
                                </div>
                            </div>
                            <H4 class="m-2">THEN</H4>
                            <div>
                                <h4>Select a Tag!</h4>
                                <form class="mb-3">
                                    <select name="tags" v-model="newPost.tags">
                                        <option :value="null">Please select a Tag</option>
                                        <option value=music>Music</option>
                                        <option value="sports">Sports</option>
                                        <option value="movies">Movies</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="food">Food</option>
                                        <option value="tv">TV</option>
                                        <option value="kimspiration">Kimspiration</option>
                                        <option value="question">Question's</option>
                                        <option value="developer">Developer Meme's</option>
                                        <option value="meme-culture">Meme-Culture</option>
                                    </select>
                                </form>
                            </div>
                            <input class="form-control" type="text" placeholder="Ask your question"
                                v-model="newPost.title" required>
                            <button v-if="dataUrl2 != '' && dataUrl3 != ''" class="btn btn-primary mt-3"
                                @click="addPost2">Create
                                Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </mq-layout>

        <mq-layout mq="md">
            <div class="row justify-content-center">
                <div class="border rounded" :class="$mq | mq({xs: 'col-11', sm: 'col-11', md: 'col-8', lg: 'col-8'})">
                    <div class="card-title">
                        <h3>Which type of question would you like to ask?</h3>
                        <!-- YES OR NO -->
                        <div class="col-12 p-5 card" :class="{question : showForm == false}" @click="showForm=true">
                            <!-- <button class="btn btn-secondary col-3" v-if="showForm"
                                @click="showForm = false">Back</button> -->
                            <h3 v-if="!showForm" class="text-muted">(1 image)</h3>
                            <h3 v-if="!showForm">Yes or No?</h3>
                            <h4 class="mb-3" v-if="showForm">Upload "Yes/No" Image</h4>
                            <div v-if="showForm">
                                <form class="row justify-content-center mb-3" @submit.prevent="">
                                    <input class="col-6 form-control" v-model="url" type="text" placeholder="image Url">
                                    </input>
                                </form>
                                <!-- <button @click="choose()"> -->
                                <!-- </button> -->
                                <croppa v-model="croppa" canvas-color="#e9ecee" :width="480" :height="270">
                                    <img crossOrigin="anonymous" :src="url" slot="initial">
                                </croppa>
                                <div class="row justify-content-center my-2">
                                    <div class="col-4">
                                        <button class="btn btn-primary" @click="output1()">Crop</button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="showForm">
                                <h3>THEN</h3>
                                <div>
                                    <h4>Select a Tag!</h4>
                                    <form class="mb-3 ">
                                        <select name="tags" v-model="newPost.tags">
                                            <option :value="null">Please select a Tag</option>
                                            <option value=music>Music</option>
                                            <option value="sports">Sports</option>
                                            <option value="movies">Movies</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="food">Food</option>
                                            <option value="tv">TV</option>
                                            <option value="kimspiration">Kimspiration</option>
                                            <option value="question">Question's</option>
                                            <option value="developer">Developer Meme's</option>
                                            <option value="meme-culture">Meme-Culture</option>
                                        </select>
                                    </form>

                                </div>
                                <form class="row justify-content-center">
                                    <input class="form-control col-10" type="text" placeholder="Ask your question"
                                        v-model="newPost.title" required>
                                    <button v-if="this.dataUrl1 != ''" @click="addPost" class="btn btn-primary mt-3"
                                        type="submit">Create Post</button>
                                </form>
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
                                        <croppa v-model="croppa2" canvas-color="#e9ecee" :width="240" :height="270">
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
                                        <croppa v-model="croppa3" canvas-color="#e9ecee" :width="240" :height="270">
                                            <img crossOrigin="anonymous" :src="url3" slot="initial">
                                        </croppa>
                                        <button @click="output3()">Crop</button>
                                    </div>
                                </div>
                                <H4 class="m-2">THEN</H4>
                                <div>
                                    <h4>Select a Tag!</h4>
                                    <form class="mb-3">
                                        <select name="tags" v-model="newPost.tags">
                                            <option :value="null">Please select a Tag</option>
                                            <option value=music>Music</option>
                                            <option value="sports">Sports</option>
                                            <option value="movies">Movies</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="food">Food</option>
                                            <option value="tv">TV</option>
                                            <option value="kimspiration">Kimspiration</option>
                                            <option value="question">Question's</option>
                                            <option value="developer">Developer Meme's</option>
                                            <option value="meme-culture">Meme-Culture</option>
                                        </select>
                                    </form>
                                </div>
                                <input class="form-control" type="text" placeholder="Ask your question"
                                    v-model="newPost.title" required>
                                <button v-if="dataUrl2 != '' && dataUrl3 != ''" class="btn btn-primary mt-3"
                                    @click="addPost2">Create Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </mq-layout>

        <mq-layout mq="lg">
            <div class="row justify-content-center">
                <div class="border rounded" :class="$mq | mq({xs: 'col-11', sm: 'col-11', md: 'col-8', lg: 'col-8'})">
                    <div class="card-title">
                        <h3>Which type of question would you like to ask?</h3>
                        <!-- YES OR NO -->
                        <div class="col-12 p-5 card" :class="{question : showForm == false}" @click="showForm=true">
                            <!-- <button class="btn btn-secondary col-3" v-if="showForm"
                                @click="showForm = false">Back</button> -->
                            <h3 v-if="!showForm" class="text-muted">(1 image)</h3>
                            <h3 v-if="!showForm">Yes or No?</h3>
                            <h4 v-if="showForm">Upload "Yes/No" Image</h4 style="text-decoration: underline;">
                            <div v-if="showForm">
                                <form class="row mb-3 justify-content-center align-items-center" @submit.prevent="">
                                    <input class="col-4 form-control" v-model="url" type="text" placeholder="image Url">
                                    </input>
                                </form>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <h6>OR</h6>
                                    </div>
                                </div>
                                <!-- <button @click="choose()"> -->
                                <!-- </button> -->
                                <croppa v-model="croppa" canvas-color="#e9ecee" :width="480" :height="270">
                                    <img crossOrigin="anonymous" :src="url" slot="initial">
                                </croppa>
                            </div>
                            <div v-if="showForm">
                                <h4>THEN</H4>
                                <div class="row justify-content-center">
                                    <div class="col-4 mb-2">
                                        <button class="btn btn-primary" @click="output1()">Crop</button>
                                    </div>
                                </div>
                                <div>
                                    <h4>Select a Tag!</h4>
                                    <form class="mb-3 ">
                                        <select name="tags" v-model="newPost.tags">
                                            <option :value="null">Please select a Tag</option>
                                            <option value=music>Music</option>
                                            <option value="sports">Sports</option>
                                            <option value="movies">Movies</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="food">Food</option>
                                            <option value="tv">TV</option>
                                            <option value="kimspiration">Kimspiration</option>
                                            <option value="question">Question's</option>
                                            <option value="developer">Developer Meme's</option>
                                            <option value="meme-culture">Meme-Culture</option>
                                        </select>
                                    </form>

                                </div>
                                <form class="row justify-content-center">
                                    <input class="form-control col-6" type="text" placeholder="Ask your question"
                                        v-model="newPost.title" required>
                                    <button v-if="this.dataUrl1 != ''" @click="addPost" class="btn btn-primary mt-3"
                                        type="submit">Create Post</button>
                                </form>
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
                                        <croppa v-model="croppa2" canvas-color="#e9ecee" :width="240" :height="270">
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
                                        <croppa v-model="croppa3" canvas-color="#e9ecee" :width="240" :height="270">
                                            <img crossOrigin="anonymous" :src="url3" slot="initial">
                                        </croppa>
                                        <button @click="output3()">Crop</button>
                                    </div>
                                </div>
                                <H4 class="m-2">THEN</H4>
                                <div>
                                    <h4>Select a Tag!</h4>
                                    <form class="mb-3">
                                        <select name="tags" v-model="newPost.tags">
                                            <option :value="null">Please select a Tag</option>
                                            <option value=music>Music</option>
                                            <option value="sports">Sports</option>
                                            <option value="movies">Movies</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="food">Food</option>
                                            <option value="tv">TV</option>
                                            <option value="kimspiration">Kimspiration</option>
                                            <option value="question">Question's</option>
                                            <option value="developer">Developer Meme's</option>
                                            <option value="meme-culture">Meme-Culture</option>
                                        </select>
                                    </form>
                                </div>
                                <input class="form-control" type="text" placeholder="Ask your question"
                                    v-model="newPost.title" required>
                                <button v-if="dataUrl2 != '' && dataUrl3 != ''" class="btn btn-primary mt-3"
                                    @click="addPost2">Create Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </mq-layout>

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
                cors: 'https://crossorigin.me/',
                url3: '',
                dataUrl1: '',
                dataUrl2: '',
                dataUrl3: '',
                tags: '',
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
        computed: {
            cUrl() {
                return this.cors + this.url
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
                    imgUrl1: this.dataUrl1,
                    tags: this.newPost.tags
                }
                console.log(payload)
                this.$store.dispatch("addPost", payload).then(((this.$router.push({ name: 'posts' }))))
            },
            addPost2() {
                let payload = {
                    title: this.newPost.title,
                    imgUrl1: this.dataUrl2,
                    imgUrl2: this.dataUrl3,
                    tags: this.newPost.tags
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
    .makePost {
        color: #3d6ea0;
        font-family: "Amatic SC", cursive;
    }

    .fix {
        margin-left: -48px;
    }

    .margin-mobile {
        margin-top: 80px;
    }

    .margin-comp {
        margin-top: 90px;
    }

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

    .btn-primary {
        background-color: #6496c6 !important;
    }

    span {
        color: black !important;
        padding-right: 10%;
    }

    .croppa-container {
        background-color: white;
    }
</style>