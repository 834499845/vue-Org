<template>
    <div id="app">
        <select @change="selectChange" :disabled="isable" :style="{width:width + 'px'}" v-model="sType">
            <option v-for="(type,index) in list">{{type}}</option>
        </select>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        props: ['list','width','selects','isdisable'],
        data() {
            return {
                sType: '',
                isable:'',
            }
        },
        created: function () {
            this.sType = this.selects
            this.isable = this.isdisable
        },
        mounted: function () {
        },
        watch: {
        },
        methods: {
            selectChange() {
                this.$emit('select', this.sType)
            },
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    select {
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 85% 8px no-repeat transparent;
        /*padding-left: 14px;*/
        font-size: 14px;
        color: #97969b;
        border: 1px solid #d1d1d1;
        /*text-align: center;*/
        overflow: hidden;
    }
    
    select::-ms-expand {
        display: none;
    }
</style>