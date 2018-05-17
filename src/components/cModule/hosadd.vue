<template>
    <div id="app">
        <div class="title">
            {{name}}
        </div>
        <div class="add">
            <div>
                父类：
            </div>
            <div>
                <v-select width="125" :list="brands" @select="selecBradnsClick"></v-select>
            </div>
        </div>
        <div class="add">
            <div>
                名称：
            </div>
            <div>
                <v-minput width="125"></v-minput>
            </div>
        </div>
        <div class="add">
            <div>
                code：
            </div>
            <div>
                <v-minput width="125"></v-minput>
            </div>
        </div>
        <div class="but">
            <div @click="okClick">确定</div>
            <div @click="canleClick">取消</div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import minput from './minput'
    import select from './select'
    export default {
        props: ['name'],
        components: {
            'v-minput': minput,
            'v-select': select
        },
        data() {
            return {
                brands: [
                    '1', '2'
                ],
                sel: ''
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
                this.$emit('addok', this.sel)
            },
            // 取消
            canleClick() {
                this.$emit('addcanle', "2")
            },
            selecBradnsClick(val) {
                this.sel = val
            },
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    #app>div:nth-child(2) {
        margin-top: 15px;
    }
    
    .title {
        width: 100%;
        height: 57px;
        line-height: 57px;
        text-align: center;
        font-size: 16px;
        color: #474747;
        border-bottom: 1px solid #ececec;
    }
    
    .add {
        width: 100%;
        height: 55px;
        display: flex;
        align-items: center;
    }
    
    .add>div:nth-child(1) {
        width: 103px;
        text-align: right;
    }
    
    .add>div:nth-child(2) {
        height: 55px;
        width: 190px;
        margin-left: 15px;
        display: flex;
        align-items: center;
    }
    
    .but {
        margin-top: 35px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
    }
    
    .but>div {
        width: 68px;
        height: 32px;
        text-align: center;
        font-size: 15px;
        line-height: 32px;
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
    }
    
    .but>div:nth-child(1) {
        margin-right: 15px;
        background-color: #51d0c7
    }
    
    .but>div:nth-child(2) {
        margin-left: 15px;
        background-color: #d1d1d1;
    }
</style>