<!--评论管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div @click="canelClick">
                    <img src="/static/img/fan.png" alt="">
                </div>
                <div style="margin-left: 5px;">
                    评论内容
                </div>
            </div>
            <!--列表-->
            <div class="main">
                <div class="mainCom">
                    <p>{{username}}</p>
                    <div>{{mainComments}}</div>
                    <p class="grayfont"><span style="float: left">{{date | UnFormatDates}}</span>
                        <!--<span style="float: right;cursor: pointer;">删除</span></p>-->
                        <p>最新评论</p>
                </div>
                <div>
                    <ul>
                        <li v-for="(item,index) in dataLists" class="mainComs" style="margin-top:14px;">
                            <p><span style="color: #DC322B;">{{item.fromUserName}}</span><span style="margin:0 5px;">回复</span><span
                                    style="color:#DC322B;">{{item.toUserName}}</span></p>
                            <div>{{item.content}}</div>
                            <p class="grayfont" style="border-bottom: 1px solid #d1d1d1;padding-bottom: 10px;"><span style="float: left">{{item.createDate | UnFormatDates}}</span>
                                <span style="float: right;cursor: pointer;"
                                    @click="recycleClick(index)">删除</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="lastLi">
                    <div class="lastLiLeft">

                    </div>
                    <div id="lastLiRight">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                            </el-pagination>
                    </div>
                </div>
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
                titlename: '',
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 10,
                delIndex: '',
                ids: [],
                username: '伯图用户123',
                mainComments: '',
                date: '',
                editData: '',
                dataLists: [],
                parentId: '',
            }
        },
        // 过滤
        filters: {
            // 返回日期格式化
            UnFormatDates(date) {
                var y, m, d, h, f, s
                var t = new Date(date)
                y = t.getFullYear()
                m = t.getMonth() + 1
                d = t.getDate()
                h = t.getHours()
                f = t.getMinutes()
                return y + '.' + (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d) +
                    '  ' + (h < 10 ? '0' + h : h) + ':' + (f < 10 ? '0' + f : f)
            },
        },
        // 模块新建时
        created: function () {
            var self = this
            self.editData = JSON.parse(sessionStorage.edata)
            // console.log(this.editData)
            self.username = self.editData.userName
            self.mainComments = self.editData.content
            self.date = self.editData.createDate
            self.parentId = self.editData.id
            self.plList()

        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {           
            canelClick() {
                var self = this
                self.$router.push({
                    path: '/news/comment'
                })
            },
            // 获取评论详情列表
            plList() {
                var self = this
                self.checked = false
                self.ids = []
                self.checkList = []
                self.loading = true
                self.getcommentdetailList({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    parentId: self.parentId
                }).then((data) => {
                    // console.log("评论详情列表", data)
                    self.loading = false
                    if (data.code == 200) {
                        self.dataLists = data.data.records
                        self.totalNum = data.data.total
                    } else {
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
            // 点击分页
            handleSizeChange(val) {
                var self = this
                this.pageSizeNum = val
                this.plList()
            },
            handleCurrentChange(val) {
                var self = this
                self.currentPage = val
                self.plList()
            },
            // 确认删除框
            okClick() {
                var self = this
                self.getdelcommentdetailManager({
                    id: self.dataLists[self.delIndex].id
                }).then((data) => {
                    // console.log('删除子评论', data)
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        self.isShowdel = true
                        self.delShow = false
                        self.plList()
                    }else {
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
            ...mapActions(['getcommentdetailList','getdelcommentdetailManager',''])
        },
        // 监视
        watch: {
        }
    }

</script>
<style scoped>
    #lastLiRight {
        min-width: 300px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        width: 80%;
        justify-content: flex-end;
    }
    
    .lastLi {
        height: 78px;
        display: flex;
        justify-content: space-between;
    }
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
    
    .grayfont {
        font-size: 14px;
        color: #8f8e94;
    }
    
    .main {
        margin: 24px 89px;
    }
    
    .mainCom>div {
        margin-top: 24px;
        margin-bottom: 18px;
        font-size: 16px;
        line-height: 28px;
    }
    
    .mainCom p:nth-child(3) {
        margin-bottom: 36px;
        overflow: hidden;
    }
    
    .mainCom>p:nth-child(4) {
        padding-bottom: 12px;
        border-bottom: 1px solid #d1d1d1;
        font-size: 16px;
        font-weight: bold;
    }
    
    .mainComs>div {
        margin-top: 18px;
        margin-bottom: 18px;
        font-size: 16px;
        line-height: 28px;
    }
    
    .mainComs p:nth-child(3) {
        margin-bottom: 18px;
        overflow: hidden;
    }
    
    .mainComs>p:nth-child(4) {
        padding-bottom: 18px;
        border-bottom: 1px solid #d1d1d1;
        font-size: 16px;
        font-weight: bold;
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
</style>