<template>
    <div id="app">
        <input id="inp" type="text" :style="{width:width + 'px'}" :placeholder="aces" v-model="expression" @change="expresChange(code)">
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        props: ['heig', 'low', 'width', 'code', 'nameVal'],
        data() {
            return {
                aces: '',
                expression: ''
            }
        },
        created: function () {
            this.aces = this.placeho
            this.expression = this.val
        },
        mounted: function () {
        },
        watch: {
            expression: function (val, oldVal) {
            }
        },
        methods: {
            expresChange(val) {
                // console.log(val)
                this.$emit('modelchaad', val)
            },
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    input {
        width: 80px;
        height: 32px;
        border: 1px solid #eaeaea;
        border-radius: 3px;
        padding-left: 5px;
    }
</style>