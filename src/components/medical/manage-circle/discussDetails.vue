<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="discuss">
        <div>
            <!-- 详情头部 -->
            <div class="discussTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        评论详情
                    </div>
                </div>
            </div>
            <!-- 详情展示 -->
            <div class="headline">
                {{name}}：{{discussText}}
            </div>
            <div class="discussFor" v-for="(item,index) in discussList" :key="item.text">
                <div class="discussName">
                    <div>
                        {{item.fromUserName}}
                    </div>
                    <div>
                        回复：
                    </div>
                    <div>
                        {{item.toUserName}}
                    </div>
                </div>
                <div class="discussText">
                    {{item.content}}
                </div>
                <div class="discussBottom">
                    <div class="discusstime">
                        {{item.createDate | ctimeFun}}
                    </div>
                    <div class="discussDel" @click="delClick(index)">
                        删除
                    </div>
                </div>
            </div>
            <!-- 暂无数据 -->
            <div class="noList" v-show="discussList.length == 0">
                <div>
                    <img src="/static/img/w.png" alt="">
                </div>
            </div>
            <div class="paging" v-show="discussList.length > 0">
                <div id="lastLiRight">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{showdel:isShowdel}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="okDelClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import hosdel from '../../cModule/cancelBox'
    export default {
        components: {
            'v-hosdel': hosdel
        },
        data() {
            return {
                okdelclick: true,
                getdiscusslist: true,
                titlename: '',
                isShowdel: true,
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                discussList: [],
                remarkId: '',
            }
        },
        // 过滤
        filters: {
            // 返回日期格式化
            ctimeFun: function (val) {
                var now = new Date(val)
                var year = now.getYear() - 100;
                var month = now.getMonth() + 1;
                month = month > 9 ? month : "0" + month
                var date = now.getDate();
                date = date > 9 ? date : "0" + date
                var hour = now.getHours();
                hour = hour > 9 ? hour : "0" + hour
                var minute = now.getMinutes();
                minute = minute > 9 ? minute : "0" + minute
                return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
            },
        },
        // 模块新建时
        created: function () {
            var self = this;
            // 权限限制
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "医疗管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                //console.log("arrs", arrs)
                if (arrs.indexOf("circle") == -1) {
                    var warningStr = "您暂时没有权限访问这个页面";
                    self
                        .$alert(warningStr, "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        })
                        .then(() => {
                            self.$router.push({
                                path: "/login"
                            });
                        })
                        .catch(() => {
                            self.$router.push({
                                path: "/login"
                            });
                        });
                } else {
                    self.discussdata = JSON.parse(sessionStorage.discussdata)
                    self.name = self.discussdata.userName
                    self.discussText = self.discussdata.content
                    self.remarkId = self.discussdata.id
                    self.getdiscussList()
                }
            } else {
                var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
                this.$alert(warningStr, "提示", {
                    confirmButtonText: "确定",
                    type: "info"
                })
                    .then(() => {

                        this.$router.push({
                            path: "/login"
                        });
                    })
                    .catch(() => {
                        this.$router.push({
                            path: "/login"
                        });
                    });
            }

        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            //获取圈子动态评论详情
            getdiscussList() {
                var self = this
                if (self.getdiscussList == true) {
                    self.getdiscussList = false
                    self.getdiscussOnList(
                    {
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        parentId: self.remarkId,
                        type: "3",
                    }
                    ).then((data) => {
                        self.getdiscussList = true
                        //console.log("圈子动态评论列表", data)
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.records) {
                                    if (data.data.records.length > 0) {
                                        self.discussList = data.data.records
                                        self.totalNum = data.data.total
                                    } else {
                                        self.discussList = []
                                    }
                                } else {
                                    self.discussList = []
                                }
                            } else {
                                self.discussList = []
                            }
                        } else {
                            self.$message({
                                type: 'info',
                                message: data.message
                            })
                        }
                    }).catch(msg => {
                        self.getdiscussList = true
                        //console.log(msg)
                        self.$message({
                            type: 'info',
                            message: '服务器异常！'
                        })
                    })
                }
                
            },
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: '/medical/remarkOn'
                })
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                this.getdiscussList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getdiscussList()
            },
            //删除弹框
            delClick(index) {
                this.isShowdel = false
                this.titlename = '该评论将被删除，该操作无法恢复！'
                this.delId = this.discussList[index].id
            },
            //确认删除
            okDelClick() {
                var self = this
                if (self.okdelclick == true) {
                    self.okdelclick = false
                    self.getdeldiscuss(
                    {
                        id: self.delId,
                        type: "3",
                    }
                    ).then((data) => {
                        self.okdelclick = true
                        //console.log("圈子评论删除", data)
                        if (data.code == 200) {
                            if (self.discussList.length == 1) {
                                if (self.currentPage == 1) {
                                    self.currentPage = 1
                                } else if (self.currentPage > 1) {
                                    self.currentPage = self.currentPage - 1
                                }
                            }
                            self.getdiscussList()
                        } else {
                            self.$message({
                                type: 'info',
                                message: data.message
                            })
                        }
                    }).catch(msg => {
                        self.okdelclick = true
                        //console.log(msg)
                        self.$message({
                            type: 'info',
                            message: '服务器异常！'
                        })
                    })
                }
                
                this.isShowdel = true
            },
            //取消删除
            canleClick() {
                this.isShowdel = true
            },
            ...mapActions(['getdiscussOnList', 'getdeldiscuss'])
        },
        // 监视
        watch: {

        }
    }

</script>
<style scoped>
    .discuss {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .discuss>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .discussTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .discussTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .discussTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .discussTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .discussTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .headline {
        width: 1000px;
        margin-left: 124px;
        height: 64px;
        line-height: 64px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #d1d1d1;
    }

    .discussName {
        font-size: 14px;
        overflow: hidden;
    }

    .discussBottom {
        font-size: 14px;
        overflow: hidden;
        color: #8f8e94;
    }

    .discussName>div {
        float: left;
    }

    .discussName>div:nth-child(1),
    .discussName>div:nth-child(3) {
        color: #dc322b;
    }

    .discussName>div:nth-child(2) {
        padding: 0 10px;
    }

    .discusstime {
        float: left;
    }

    .discussDel {
        float: right;
        cursor: pointer;
    }

    .discussFor {
        width: 1000px;
        margin-left: 124px;
        border-bottom: 1px dashed #d1d1d1;
    }

    .discussFor>div {
        margin: 24px 0;
    }

    .discussText {
        font-size: 14px;
        line-height: 24px;
    }

    .paging {
        width: 1000px;
        margin-left: 124px;
        margin-top: 24px;
        overflow: hidden;
    }

    #lastLiRight {
        float: right;
        min-width: 300px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        border: none!important;
    }


    /*删除弹出框*/

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


    /*暂无数据*/

    .noList {
        height: 400px;
    }

    .noList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }
</style>