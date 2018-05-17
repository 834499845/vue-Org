<template>
    <div id="app">
        <textarea name="" id="" :style="{width:width + 'px',height:height + 'px'}"></textarea>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        props: ['list', 'width', 'height'],
        data() {
            return {

            }
        },
        created: function () {
        },
        mounted: function () {
        },
        watch: {
        },
        methods: {
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    textarea {
        border: 1px solid red;
        border-radius: 3px;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        resize: none;
    }
</style>