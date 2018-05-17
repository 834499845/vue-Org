<template>
    <div id="app">
        <div class="upInput">
            <div>
                频道名称
            </div>
            <div>
                <input type="text">
            </div>
            <div>
                （限制四个汉字）
            </div>
        </div>
        <div class="upbut">
            <div @click="okClick">
                确定
            </div>
            <div @click="canleClick">
                取消
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        props: ['name'],
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
            // 确认
            okClick() {
                this.$emit('ok', "1")
            },
            // 取消
            canleClick() {
                this.$emit('canle', "2")
            },
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    .upInput {
        border: 1px solid red;
    }
    
    .delImg {
        width: 525px;
        height: 46px;
        display: flex;
        justify-content: center;
        margin-top: 64px;
    }
    
    .delImg>div {
        width: 45px;
        height: 45px;
        overflow: hidden;
    }
    
    .delImg>div img {
        width: 100%;
        height: 100%;
    }
    
    .delCont {
        width: 525px;
        height: 27px;
        margin-top: 24px;
        font-size: 20px;
        color: #fe5371;
        text-align: center;
    }
    
    .upbut {
        width: 525px;
        height: 32px;
        margin-top: 36px;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    
    .upbut >div {
        cursor: pointer;
        width: 70px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: center;
        border-radius: 3px;
    }
    
    .upbut >div:nth-child(1) {
        margin-right: 24px;
        background-color: #fe5371;
    }
    
    .upbut >div:nth-child(2) {
        margin-left: 24px;
        background-color: #d1d1d1;
    }
</style>