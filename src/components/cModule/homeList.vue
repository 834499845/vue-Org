<template>
    <div id="app">
        <!--筛选-->
        <div class="menu">
            <div class="menuLeft">
                <div>
                    <select v-model="type">
               <option v-for="(type,index) in types" v-bind:value="index" v-bind:key="index">{{type.name}}</option>
           </select>
                </div>
                <div>
                    <select v-model="part">
             <option v-for="(type,index) in parts" v-bind:value="index" v-bind:key="index">{{type.name}}</option>
          </select>
                </div>
                <div class="search">
                    确定
                </div>
            </div>
        </div>
        <!--列表-->
        <div class="list">
            <div class="listCont" v-loading="loading">
                <ul>
                    <li class="firstLi">
                        <div class="firstCheckBox">
                            <div>
                                <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                            </div>
                            <div>
                                <span>序号</span>
                            </div>
                        </div>
                        <div>
                            文案
                        </div>
                        <div>
                            所属项目
                        </div>
                        <div>
                            使用状态
                        </div>
                        <div>
                            操作
                        </div>
                    </li>
                    <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists" v-bind:key="index">
                        <div class="dataCheck">
                            <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="item" :key="item">{{checkNull}}</el-checkbox>
                            </el-checkbox-group>
                            <div>
                                {{index + 1}}
                            </div>
                        </div>
                        <div @click="partNameClick(index)">
                            {{item.name | strFun}}
                        </div>
                        <div>
                            {{item.name |　strFun}}
                        </div>
                        <div>
                            {{item.name |　strFun}}
                        </div>
                        <div class="operate">
                            <div @click="updateClick(index)"><img src="/static/img/编辑.png"></div>
                            <div @click="deleteClick(index)"><img src="/static/img/删除.png"></div>
                        </div>
                    </li>
                    <li class="nullList" v-show="lists.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </li>
                    <li class="lastLi" v-show="lists.length > 0">
                        <div class="lastLiLeft">
                        </div>
                        <div id="lastLiRight">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum"
                                :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
                                </el-pagination>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="recycle" v-show="lists.length > 0">
                <div @click="deletsClick">
                    删除
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                loading: false,
                checkNull: '',
                checked: false,
                checkList: [],
                types: [{
                    name: '全部'
                }, {
                    name: '跑步'
                }, {
                    name: '骑行'
                }, {
                    name: '健走'
                }],
                type: 0,
                parts: [{
                    name: '全部'
                }, {
                    name: '未进行'
                }, {
                    name: '已完成'
                }],
                part: 0,
                lists: [{
                    name: 'ndashdahdhasdhapsihfuashfhasiufdhaspihfduipasdhfiphaspifdhpsafhpashfd',
                    id: '1'
                }],
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 0,
            }
        },
        created: function () {
            var self = this
            self.listFun()
        },
        mounted: function () { },
        // filters
        filters: {
            timeFun: function (val) {
                var now = new Date(val)
                var year = now.getYear() - 100;
                var month = now.getMonth() + 1;
                month = month > 9 ? month : "0 " + month
                var date = now.getDate();
                date = date > 9 ? date : "0 " + date
                var hour = now.getHours();
                hour = hour > 9 ? hour : "0 " + hour
                var minute = now.getMinutes();
                minute = minute > 9 ? minute : "0 " + minute
                return "20 " + year + "- " + month + "- " + date + " " + hour + ": " + minute;
            },
            strFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '无'
                }
            }
        },
        methods: {
            // initialize data
            listFun() {
                var self = this
                self.loading = true
                // 列表
                self.getfitnesssloganselectShareSlogan({
                }).then((data) => {
                    self.loading = false
                    console.log("列表", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.length > 0) {
                                self.lists = data.data
                                self.totalNum = data.data.length
                            } else {
                                self.lists = []
                            }
                        } else {
                            self.lists = []
                        }
                    } else {
                        self.lists = []
                        self.$message({
                            type: 'info',
                            message: '获取失败!'
                        });
                    }
                }).catch(msg => {
                    self.lists = []
                    console.log(msg)
                    self.loading = false
                    self.$message({
                        type: 'info',
                        message: '获取失败!'
                    });
                })
            },
            // batch delete
            deletsClick() {
                this.$emit('deletes', "all")
            },
            // selete all number 
            numChange(event) {
                this.checkList = event.target.checked ? this.lists : [];
            },
            // click select number
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.lists.length;
            },
            // paging-pageNumber
            handleSizeChange(val) {
                var self = this
                self.pageSizeNum = val
                self.listFun()
            },
            //  paging-pageSize
            handleCurrentChange(val) {
                var self = this
                self.currentPage = val
                self.listFun()
            },
            // compile
            updateClick(index) {
                this.$router.push({
                    path: '/fitness/opCourse',
                    query: {
                        op: 2
                    }
                })
            },
            // addtion
            addClick() {
                this.$router.push({
                    path: '/fitness/opCourse',
                    query: {
                        op: 1
                    }
                })
            },
            deleteClick(index) {
                var self = this
                self.$emit('delete', self.lists[index].id)
            },
            ...mapActions(['getfitnesssloganselectShareSlogan'])
        },
        watch: {},
    }

</script>
<style scoped>
    .menu {
        height: 80px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .menuLeft {
        display: flex;
    }
    
    .menuLeft input {
        border: 0;
    }
    
    .menuLeft>div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 32px;
    }
    
    .menuLeft .search {
        width: 70px;
        height: 30px;
        text-align: center !important;
        line-height: 30px;
        cursor: pointer;
        background-color: #5acdfa;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
    }
    
    select {
        width: 120px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #d1d1d1;
        overflow: hidden;
    }
    
    select::-ms-expand {
        display: none;
    }
    
    .list .nullList {
        height: 400px;
    }
    
    .list .nullList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }
    
    .recycle {
        height: 100px;
        width: 100%;
        overflow: hidden;
        display: flex;
    }
    
    .recycle>div:nth-child(1) {
        margin-top: 3px;
        margin-left: 25px;
        width: 70px;
        height: 30px;
        background-color: #5acdfa;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
    }
    
    #lastLiRight {
        width: 80%;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    
    .lastLi>div:nth-child(1) {
        width: 10px;
    }
    
    .lastLi>div:nth-child(2) {
        width: 80%;
        display: flex;
        justify-content: flex-end;
    }
    
    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }
    
    .operate {
        align-items: center;
        display: flex;
    }
    
    .operate>div {
        width: 30px;
        height: 50px;
        cursor: pointer;
        overflow: hidden;
    }
    
    .operate>div:nth-child(1) {
        margin-right: 9px;
    }
    
    .operate>div:nth-child(2) {
        margin-left: 9px;
    }
    
    .operate>div img {
        width: 25px;
        height: 25px;
    }
    
    .listCont li {
        display: flex;
        min-height: 50px;
    }
    
    .firstLi {
        border-top: 1px solid #d9d9d9;
        line-height: 58px;
        height: 58px;
        background-color: #f2f4f8;
        border-bottom: 1px solid #d9d9d9;
    }
    
    .dataCheck>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
    }
    
    .dataCheck>div:nth-child(2) {
        width: 25px;
        line-height: 22px;
        height: 25px;
    }
    
    .dataCheck>div:nth-child(3) {
        margin-left: 5px;
    }
    
    .dataCheck>div:nth-child(3) span {
        height: 40px;
        margin-top: 1px;
        display: block;
        font-size: 15px;
    }
    
    .firstCheckBox {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .firstCheckBox>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0px;
        margin-top: 5px;
    }
    
    .firstCheckBox>div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
    }
    
    .firstLi>div {
        border-right: 1px solid #e5e7eb;
        text-align: center;
        color: #303030;
        font-size: 17px;
        font-weight: bold;
    }
    
    .firstLi>div:nth-child(1) {
        border-left: 1px solid #e5e7eb;
    }
    
    .dataLi {
        border-bottom: 1px solid #ececec;
        background-color: #fff;
        height: 50px;
        line-height: 50px;
    }
    
    .listCont .dataLi>div {
        border-right: 1px solid #ececec;
        font-size: 14px;
        color: #515151;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .listCont .firstLi>div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .dataLi>div:nth-child(2) {
        font-size: 14px;
        cursor: pointer;
    }
    
    .dataLi>div:nth-child(1) {
        border-left: 1px solid #ececec;
    }
    
    .listCont li>div:nth-child(1) {
        width: 15%;
        overflow: hidden;
        min-width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .listCont li>div:nth-child(2) {
        width: 25%;
        min-width: 100px;
    }
    
    .listCont li>div:nth-child(3) {
        width: 20%;
        min-width: 100px;
    }
    
    .listCont li>div:nth-child(4) {
        width: 20%;
        min-width: 140px;
    }
    
    .listCont li>div:nth-child(5) {
        width: 20%;
        min-width: 165px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .list {
        min-height: 400px;
    }
</style>