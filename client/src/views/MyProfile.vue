<template>
    <div class="myProfile ">

    </div>
</template>

<script>
    export default {
        name: "myProfile",
        props: [],
        data() {
            return {}
        },
        mounted() {
            this.$store.dispatch("getPosts", true); //with a second argument passed in that is truthy this will get just your posts

        },
        computed: {},
        methods: {},
        components: {}
    }
</script>