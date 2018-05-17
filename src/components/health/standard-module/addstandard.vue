<!--标准模型-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        添加模型
                    </div>
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            省份：
                        </div>
                        <div>
                            {{areName}}
                        </div>
                    </div>
                    <div>
                        <div>
                            性别：
                        </div>
                        <div>
                            {{sexKey | sexFun}}
                        </div>
                    </div>
                    <div>
                        <div>
                            年龄段：
                        </div>
                        <div>
                            {{ageKey | ageFun}}
                        </div>
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading" element-loading-text="加载中....">
                <ul>
                    <li class="oneLi" v-for="item in lists">
                        <div>
                            {{item.key}}
                        </div>
                        <div class="tztwo">
                            <ul>
                                <li class="tzLi" v-for="tzVal in item.value">
                                    <div>{{tzVal.name}}：</div>
                                    <div>
                                        <div class="tzOPtion" v-if="tzVal.optionList.length > 0">
                                            <ul>
                                                <li class="optionLi" v-for="option in tzVal.optionList">
                                                    <div>
                                                        {{option.value}}
                                                    </div>
                                                    <div>
                                                        <v-minput width="80" @nomodelc="noinputClick" :nameVal="tzVal.value" @modelc="inputClick" :code="option.key" @modelchaad="modelClick"></v-minput>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tzRange" v-if="tzVal.rangeList.length > 0">
                                            <ul>
                                                <li class="rangeLi" v-for="(range,key,ind) in tzVal.rangeList">
                                                    <div>
                                                        {{range.value}}
                                                    </div>

                                                    <div>
                                                        <v-minput width="80" @nomodelc="noinputClick" :nameVal="tzVal.value" @modelc="inputClick" :code="range.key" @modelchaad="modelClick"></v-minput>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-show="tzVal.optionList.length == 0 && tzVal.rangeList.length == 0">
                                            <v-minput width="80" @modelc="inputClick" @nomodelc="noinputClick" :nameVal="tzVal.name" :code="tzVal.code" @modelchaad="modelClick"></v-minput>
                                        </div>
                                    </div>
                                    <div>
                                        {{tzVal.unit}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="butLi">
                        <div @click="addCommClick">
                            确定
                        </div>
                        <div @click="canelClick">
                            取消
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import minput from '../../cModule/minput'
    import rangeselect from '../../cModule/rangeselect'
    import select from '../../cModule/select'
    import hosdel from '../../cModule/healthdel'
    export default {
        components: {
            'v-minput': minput,
            'v-rangeselect': rangeselect,
            'v-select': select,
            'v-hosdel': hosdel
        },
        data() {
            return {
                loading: false,
                lists: [],
                jsonObjs: [],
                dataObjs: [],
                noStes: [],
                ageKey: '145',
                sexKey: '1',
                areKey: '',
                areName: '',

            }
        },
        // 过滤
        filters: {
            sexFun: function (val) {
                if (val == 1) {
                    return '男'
                } else {
                    return '女'
                }
            },
            ageFun: function (val) {
                switch (val) {
                    case "145":
                        return "儿童期"
                        break;
                    case "146":
                        return "少年期"
                        break;
                    case "147":
                        return "青年期"
                        break;
                    case "148":
                        return "壮年期"
                        break;
                    case "149":
                        return "盛年期"
                        break;
                    case "150":
                        return "达年期"
                        break;
                    case "151":
                        return "中年期"
                        break;
                    case "152":
                        return "老年期"
                        break;
                    default:
                        break;
                }
            }
        },
        // 模块新建时
        created: function () {
            var self = this
            self.ageKey = self.$route.query.ageKey
            self.sexKey = self.$route.query.sexKey
            self.areKey = self.$route.query.areKey
            self.areName = self.$route.query.areName
            // 查询标准指标字典
            self.loading = true
            self.getFindBzzbFromRedisList({
            }).then((data) => {
                console.log("基础标准指标", JSON.parse(JSON.stringify(data)))
                if (data.code == 200) {
                    if (data.data.length > 0) {
                        self.lists = data.data
                        self.loading = false
                    }
                } else {
                    self.$message({
                        type: 'info',
                        message: '修改基础模型失败!'
                    });
                }
            }).catch(msg => {
                console.log(msg)
                self.$message({
                    type: 'info',
                    message: '修改基础模型失败!'
                });
            })
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            // 箭头返回上一页
            canelClick() {
                this.$router.push({
                    path: '/health/standard'
                })
            },
            modelClick(val) {

            },
            // 错误的输入
            noinputClick(val) {
                // console.log('错误的信息', val)
                this.noStes.push(val)
                // console.log(this.noStes)
            },
            inputClick(val) {
                var self = this
                self.jsonObjs.unshift(val)
                var arr = this.jsonObjs
                var hash = {};
                arr = arr.reduce(function (item, next) {
                    hash[next.code] ? '' : hash[next.code] = true && item.push(next);
                    return item
                }, [])
                // console.log(arr);
                this.dataObjs = arr
            },
            // 添加商品
            addCommClick() {
                var codes = []
                var starts = []
                var ends = []
                var self = this
                self.loading = true
                this.dataObjs.forEach(function (ele, ind) {
                    codes.push(ele.code)
                    starts.push(ele.start)
                    ends.push(ele.end)
                })
                console.log("[" + codes.join(',') + "]", starts, ends)
                // 查询标准指标
                self.getAddstandardData({
                    ageId: self.ageKey,
                    gender: self.sexKey,
                    areaId: self.areKey,
                    dictionaryCodeJson: "[" + codes.join(',') + "]",
                    smallValueJson: "[" + starts.join(',') + "]",
                    bigValueJson: "[" + ends.join(',') + "]"
                }).then((data) => {
                    console.log("添加指标", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '添加成功!'
                        })
                        self.loading = false
                    } else {
                        self.$message({
                            type: 'info',
                            message: '修改基础模型失败!'
                        });
                    }
                }).catch(msg => {
                    console.log(msg)
                    self.$message({
                        type: 'info',
                        message: '修改基础模型失败!'
                    });
                })
            },
            ...mapActions(['getFindBzzbFromRedisList','getfindAreaFromRedisList','getfindAgeGroupFromRedisList','getAddstandardData','getfindStandardDataList'])
        },
        // 监视
        watch: {
        }
    }

</script>
<style scoped>
    .tzOPtion>ul {
        display: flex;
    }
    
    .tzOPtion>ul .optionLi {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .tzOPtion>ul>li:nth-child(1)>div:nth-child(1) {
        margin-left: 0px;
    }
    
    .optionLi>div:nth-child(1) {
        margin-left: 10px;
    }
    
    .optionLi>div:nth-child(2) {
        margin-left: 10px;
    }
    
    .tzRange {}
    
    .tzRange>ul {
        display: flex;
    }
    
    .tzRange>ul .rangeLi {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .tzRange>ul>li:nth-child(1)>div:nth-child(1) {
        margin-left: 0px;
    }
    
    .rangeLi>div:nth-child(1) {
        margin-left: 10px;
    }
    
    .rangeLi>div:nth-child(2) {
        margin-left: 10px;
    }
    
    #tzInput {
        width: 80px;
        height: 32px;
        border: 1px solid #eaeaea;
        border-radius: 3px;
        padding-left: 5px;
    }
    
    .tzLi>div:nth-child(1) {
        min-width: 75px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    
    .tzLi>div:nth-child(3) {
        min-width: 75px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 15px;
    }
    
    .tzLi>div:nth-child(2)>div:nth-child(1) {
        margin-left: 0;
    }
    
    .tzLi>div:nth-child(2)>div {
        margin-left: 10px;
    }
    
    .tzLi>div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 5px;
    }
    
    .tzLi {
        margin-top: 5px;
        margin-left: 5px;
        height: 40px;
        display: flex;
        justify-content: space-between;
    }
    
    .butLi {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        margin-top: 15px;
    }
    
    .butLi>div:nth-child(1) {
        width: 68px;
        height: 32px;
        border-radius: 3px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        background-color: #5acdfa;
        margin-right: 25px;
        cursor: pointer;
    }
    
    .butLi>div:nth-child(2) {
        margin-left: 25px;
        width: 68px;
        cursor: pointer;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background-color: #aeaeae;
        color: #fff;
        border-radius: 3px;
    }
    
    .oneLi .tztwo>ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    
    .oneLi>div:nth-child(1) {
        width: 60px;
        font-size: 22px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-right: 1px solid #ccc;
        justify-content: center;
    }
    
    .tztwo {
        width: calc(100% - 70px);
    }
    
    .list {
        min-height: 540px;
        margin-bottom: 40px;
        /*border: 1px solid black;*/
    }
    
    .list>ul>li:nth-child(1) {
        margin-top: 0;
    }
    
    .list>ul .oneLi {
        min-height: 80px;
        width: 100%;
        margin-top: 25px;
        display: flex;
        overflow: hidden;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #eaeaea;
    }
    /*主页*/
    
    .sale {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }
    
    .sale>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }
    
    .listTitle {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .listTitle>div:nth-child(1) {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        /*font-weight: 600;*/
        margin-left: 10px;
    }
    
    .menu {
        height: 80px;
        align-items: center;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }
    
    .menuLeft {
        display: flex;
    }
    
    .menuLeft>div {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 23px;
    }
    
    .menuLeft>div:nth-child(1) {
        margin-left: 0;
    }
    
    .menuLeft>div>div:nth-child(1) {
        color: #303030;
        font-size: 14px;
        margin-right: 5px;
        min-width: 30px;
    }
    
    .menuLeft>div>div:nth-child(2) {
        color: #303030;
        font-size: 14px;
        margin-right: 5px;
        min-width: 30px;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid #e5e5e5;
    }
    
    select {
        width: 114px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
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