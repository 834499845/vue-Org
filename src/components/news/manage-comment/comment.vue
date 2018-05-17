<!--评论管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div @click="canelClick">
                    <img src="/static/img/fan.png" alt="">
                </div>
                <div style="margin-left: 5px;">
                    评论管理
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading" element-loading-text="加载中....">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div class="checkBoxCl">
                                <div>
                                    <!--<el-checkbox v-model="checked" @change="numChange"></el-checkbox>-->
                                </div>
                                <div>
                                    <span>序号</span>
                                </div>
                            </div>
                            <div>
                                用户
                            </div>
                            <div>
                                评价对象
                            </div>
                            <div>
                                内容
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <div v-show="nodata" class="nodataBox">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                        <li v-show="yesdata" class="dataLi" v-for="(item,index) in dataLists">
                            <div class="checkCl">
                                <!--<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="item">{{index + 1}}</el-checkbox>
                                </el-checkbox-group>-->
                                <div>
                                    <span>{{index + 1}}</span>
                                </div>
                            </div>
                            <div>
                                {{item.userName}}
                            </div>
                            <div :title="title">
                                {{title}}
                            </div>
                            <div style="cursor: pointer" :title="item.content" @click="contentClick(index)">
                                {{item.content}}
                            </div>
                            <div class="operate">
                                <div><img style="vertical-align: baseline;" @click="recycleClick(index)" src="/static/img/删除.png"></div>
                            </div>
                        </li>
                        <li class="lastLi" v-show="yesdata">
                            <div class="lastLiLeft">

                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 30, 40]"
                                    :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                                    </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--<div class="recycle" v-show="yesdata">
                    <div>
                        回收站：
                    </div>
                    <div @click="ensureClick">
                        删除
                    </div>
                </div>-->
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
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
                nodata: false,
                yesdata: false,
                loading: false,
                titlename: '',
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                checked: false,
                checkedOne: false,
                checkedAll: true,
                checkList: [],
                sStates: [
                    '所有状态',
                    'A状态'
                ],
                sTypes: [
                    '所有分类',
                    'A分类'
                ],
                sRecys: [
                    '回收站',
                    '新品'
                ],
                dataLists: [
                ],
                checkt: 100000000000000000000,
                checkShow: true,
                pageSizeNum: 15,
                currentPage: 1,
                totalNum: 15,
                delIndex: '',
                ids: [],
                objectId: '',
                title: '',
            }
        },
        // 过滤
        filters: {
        },
        // 模块新建时
        created: function () {
            var self = this;
            self.objectId = JSON.parse(sessionStorage.edatacomment).id
            self.title = JSON.parse(sessionStorage.edatacomment).title
            self.plList()
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            // 
            canelClick() {
                var self = this;
                self.$router.push({
                    path: '/news/administrivia'
                })
            },
            contentClick(index) {
                var self = this;
                let edata = JSON.stringify(this.dataLists[index])
                sessionStorage.setItem('edata', edata)
                self.$router.push({
                    path: '/news/commentdetail'
                })
            },
            // 获取评论列表
            plList() {
                var self = this
                self.checked = false
                self.ids = []
                self.checkList = []
                self.loading = true
                self.getcommentList({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    objectId: self.objectId,
                }).then((data) => {
                    self.loading = false
                    if (data.code == 200) {
                        self.dataLists = data.data.records
                        self.totalNum = data.data.total
                        if (self.dataLists.length == 0) {
                            self.nodata = true
                            self.yesdata = false
                        } else {
                            self.nodata = false
                            self.yesdata = true
                        }
                    } else {
                        self.nodata = true
                        self.yesdata = false
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    self.loading = false
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            // 批量删除
            ensureClick() {
                var self = this
                self.getplbatchOp({
                    batchMark: '1',
                    ids: JSON.stringify(self.ids)
                }).then((data) => {
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        self.plList()
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg =>{
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            // 所有序号被选中时
            numChange(event) {
                var self = this;
                self.checkList = event.target.checked ? self.dataLists : [];
                // console.log(this.checkList)
                var a = self.checkList.map(function (data) {
                    return data.id
                })
                self.ids = a
            },
            handleCheckedCitiesChange(value) {
                var self = this;
                let checkedCount = value.length;
                self.checked = checkedCount === self.dataLists.length;
                // console.log(this.checkList)
                var a = self.checkList.map(function (data) {
                    return data.id
                })
                self.ids = a
            },
            // 点击分页
            handleSizeChange(val) {
                var self = this;
                self.pageSizeNum = val
                self.plList()
            },
            handleCurrentChange(val) {
                var self = this;
                self.currentPage = val
                self.plList()
            },
            // 更新商品信息
            updateClick(index) {

            },
            // 查看商品信息
            detailsClick(index) {

            },
            // 确认删除框
            okClick() {
                var self = this
                self.getdelcommentManager({
                    id: self.dataLists[self.delIndex].id
                }).then((data) => {
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        self.isShowdel = true
                        self.delShow = false
                        self.plList()
                    } else{
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            // 删除
            recycleClick(index) {
                var self = this
                self.titlename = '评论'
                self.isShowdel = false
                self.delShow = true
                self.delIndex = index
            },
            // 取消删除框
            canleClick() {
                var self = this
                self.isShowdel = true
                self.delShow = false
            },
            // 添加商品
            addCommClick() {

            },
            ...mapActions(['getcommentList','getdelcommentManager','getplbatchOp'])
        },
        // 监视
        watch: {
        }
    }

</script>
<style scoped>
    /*删除弹出框*/
    
    .delContent {
        width: 525px;
        height: 280px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 280px) / 2) auto;
        z-index: 100000;
    }
    
    .delPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1000000;
    }
    
    .showdel {
        display: none;
    }
    
    .slide-fade-enter-active {
        transition: all 0.7s ease;
    }
    
    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
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
    
    .recycle {
        height: 100px;
        width: 100%;
        overflow: hidden;
        display: flex;
    }
    
    .recycle>div:nth-child(1) {
        min-width: 60px;
        height: 35px;
        color: #353535;
        font-size: 16px;
        line-height: 35px;
    }
    
    .recycle>div:nth-child(2) {
        margin-top: 3px;
        margin-left: 10px;
        width: 70px;
        height: 30px;
        background-color: #fe4848;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
    }
    
    #lastLiRight {
        min-width: 300px;
        display: flex;
        align-items: center;
        margin-right: 80px;
        width: 80%;
        justify-content: flex-end;
    }
    
    .lastLi {
        height: 78px;
        display: flex;
        justify-content: space-between;
    }
    
    .glyphicon-ok {
        color: green;
        font-size: 17px;
    }
    
    .glyphicon-remove {
        color: red;
        font-size: 17px;
    }
    
    .dataLi .operate {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .dataLi .operate>div {
        width: 24px;
        height: 24px;
    }
    /*.dataLi .operate>div:nth-child(1) {
        margin-left: 15px;
    }
    
    .dataLi .operate>div:nth-child(2) {
        margin-right: 15px;
    }*/
    
    .operate img {
        font-size: 18px;
        cursor: pointer;
    }
    
    .listCont li {
        display: flex;
        /*border: 1px solid red;*/
        min-height: 50px;
    }
    
    .firstLi {
        border-top: 1px solid #d9d9d9;
        line-height: 58px;
        height: 58px;
        background-color: #f2f4f8;
        border-bottom: 1px solid #d9d9d9;
    }
    /*.checkCl>div:nth-child(1) {
        display: flex;
        align-items: center;
        margin-left: 51px;
    }
    
    .checkCl>div:nth-child(2) {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    
    .checkCl>div:nth-child(3) {
        margin-left: 5px;
    }
    
    .checkCl>div:nth-child(3) span {
        height: 40px;
        margin-top: 1px;
        display: block;
        font-size: 14px;
    }*/
    
    .checkBoxCl {
        display: flex;
        align-items: center;
        /*justify-content: center;*/
    }
    
    .checkBoxCl>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 51px;
    }
    
    .checkBoxCl>div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 9px;
    }
    
    .firstLi>div {
        border-right: 1px solid #e5e7eb;
        text-align: center;
        color: #303030;
        font-size: 17px;
        font-weight: bold;
    }
    
    .firstLi>div:nth-child(5) {
        min-width: 35px;
    }
    
    .firstLi>div:nth-child(6) {
        min-width: 35px;
    }
    
    .firstLi>div:nth-child(7) {
        min-width: 35px;
    }
    
    .firstLi>div:nth-child(8) {
        min-width: 35px;
    }
    
    .firstLi>div:nth-child(9) {
        min-width: 70px;
    }
    
    .firstLi>div:nth-child(10) {
        min-width: 70px;
    }
    
    .firstLi>div:nth-child(1) {
        border-left: 1px solid #e5e7eb;
    }
    
    .dataLi {
        border-bottom: 1px solid #ececec;
        background-color: #fff;
    }
    
    .dataLi>div {
        border-right: 1px solid #ececec;
        text-align: center;
        /*display: flex;
        align-items: center;
        justify-content: center;*/
        font-size: 14px;
        color: #515151;
        height: 49px;
        line-height: 49px;
    }
    
    .dataLi>div:nth-child(2) {
        font-size: 14px;
    }
    
    .dataLi>div:nth-child(1) {
        border-left: 1px solid #ececec;
        justify-content: center;
    }
    
    .listCont li>div:nth-child(1) {
        /*width: 15%;*/
        overflow: hidden;
        /*min-width: 70px;*/
        display: flex;
        min-height: 49px;
        width: 160px;
    }
    
    .listCont .dataLi>div:nth-child(4) {
        width: 30%;
        overflow: hidden;
        /*padding: 7px;*/
        min-width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .listCont .dataLi>div:nth-child(2) {
        overflow: hidden;
        /*padding: 7px;*/
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .listCont .dataLi>div:nth-child(3) {
        overflow: hidden;
        /*padding: 7px;*/
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    
    .listCont .firstLi>div:nth-child(4) {
        width: 30%;
        padding: 7px;
        padding-top: 0;
        min-width: 200px;
    }
    
    .listCont li>div:nth-child(3) {
        width: 20%;
        min-width: 100px;
    }
    
    .listCont li>div:nth-child(2) {
        width: 15%;
        min-width: 100px;
    }
    
    .listCont li>div:nth-child(5) {
        width: 25%;
        min-width: 127px;
    }
    
    .list {
        margin-top: 28px;
        min-height: 540px;
    }
    
    .listTitle {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        /*justify-content: space-between;*/
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
        width: 20px;
        height: 20px;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        /*font-weight: 600;*/
        /*margin-left: 10px;*/
    }
    
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
        min-width: 50px;
    }
    
    .menu>div:nth-child(2) {
        width: 95px;
        height: 35px;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-align: center;
        line-height: 35px;
        color: #000;
        font-size: 16px;
        margin-right: 15px;
        margin-top: 9px;
        cursor: pointer;
    }
</style>