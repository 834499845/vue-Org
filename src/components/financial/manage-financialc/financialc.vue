<!--金融产品-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    金融产品
                </div>
                <div @click="addCommClick">
                    <!--新增热词-->
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div>
                    <img src="/static/img/缺省页1.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import minput from '../../cModule/minput'
    import select from '../../cModule/select'
    import hosdel from '../../cModule/newdel'
    export default {
        components: {
            'v-minput': minput,
            'v-select': select,
            'v-hosdel': hosdel
        },
        data() {
            return {
            }
        },
        // 过滤
        filters: {
        },
        // 模块新建时
        created: function () {
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            addCommClick() {
            },
            ...mapActions([''])
        }
    }

</script>
<style scoped>
    /*主页*/
    
    .sale {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }
    
    .sale>div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }
    
    .list {
        min-height: 540px;
    }
    
    .list>div {
        margin: 0 auto;
        width: 650px;
    }
    
    .listTitle {
        height: 58px;
        line-height: 58px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .listTitle>div:nth-child(1) {
        float: left;
        color: #303030;
        font-size: 16px;
        font-weight: 600;
    }
    
    .listTitle>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        border: 1px solid #fff;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #fe5371;
        cursor: pointer;
    }
</style>