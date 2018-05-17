<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="error">
        <div>
            <img src="/static/img/404.png" alt="">
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'error',
        data() {
            return {

            }
        },
        created: function () {

        },
        methods: {
        }
    }

</script>
<style scoped>
    .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

</style>