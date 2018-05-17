<template>
    <div id="app">
        <div class="delImg">
            <div>
                <img src="/static/img/gantanhao.png" alt="">
            </div>
        </div>
        <div class="delCont">
            {{name}}
        </div>
        <div class="delope">
            <div @click="canleClick">
                我知道了
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
            // 取消
            canleClick() {
                this.$emit('canle', "2")
            },
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    .delImg {
        width: 525px;
        height: 105px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .delImg>div {
        width: 46px;
        height: 46px;
        overflow: hidden;
        margin-top:20px;
    }
    
    .delImg>div img {
        width: 100%;
        height: 100%;
    }
    
    .delCont {
        width: 525px;
        height: 25px;
        font-size: 20px;
        color: #ee3100;
        text-align: center;
    }
    
    .delope {
        width: 525px;
        height: 145px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .delope>div {
        cursor: pointer;
        width: 100px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        text-align: center;
        border-radius: 3px;
        background-color: #ee3100;
    }
    
    .delContent {
        width: 525px;
        height: 280px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 10px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 280px) / 2) auto;
        z-index: 100000;
    }
</style>