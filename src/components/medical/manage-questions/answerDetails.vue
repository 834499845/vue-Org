<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="answer">
        <div>
            <!-- 详情头部 -->
            <div class="answerTop">
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
                问题：{{answerTitle}}

            </div>
            <div class="answerFor" v-for="(item,index) in answerList">
                <div class="answerContent">
                    <div class="answerImg">
                        <img :src="item.headPortrait" alt="">
                    </div>
                    <div class="answerName">
                        {{item.userName}}
                    </div>
                    <div class="answerFont">
                        回答于：
                    </div>
                    <div class="answertime">
                        {{item.createDate | ctimeFun}}
                    </div>
                    <div class="answerDel" @click="delClick(index)">
                        删除
                    </div>
                </div>
                <div class="answerText">
                    {{item.answer}}
                </div>
            </div>
            <div class="paging">
                <div id="lastLiRight">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
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
    import { mapActions, mapState } from "vuex";
    import hosdel from "../../cModule/cancelBox";
    export default {
        components: {
            "v-hosdel": hosdel
        },
        data() {
            return {
                okDelClickTrueOrFalse: true,
                isShowdel: true,
                titlename: "",
                answerTitle: "",
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                answerList: [],
                questionsId: "",
                cancelId: ""
            };
        },
        // 过滤
        filters: {
            // 返回日期格式化
            ctimeFun: function (val) {
                var now = new Date(val);
                var year = now.getYear() - 100;
                var month = now.getMonth() + 1;
                month = month > 9 ? month : "0" + month;
                var date = now.getDate();
                date = date > 9 ? date : "0" + date;
                var hour = now.getHours();
                hour = hour > 9 ? hour : "0" + hour;
                var minute = now.getMinutes();
                minute = minute > 9 ? minute : "0" + minute;
                return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
            }
        },
        // 模块新建时
        created: function () {
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
                if (arrs.indexOf("questions") == -1) {
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
                    if (sessionStorage.getItem("hospitalCurrentPage")) {
                        self.currentPage = Number(
                            sessionStorage.getItem("hospitalCurrentPage")
                        );
                    }
                    if (sessionStorage.getItem("hospitalPageSizeNum")) {
                        self.pageSizeNum = Number(
                            sessionStorage.getItem("hospitalPageSizeNum")
                        );
                    }
                    this.answerData = JSON.parse(sessionStorage.ansdata);
                    //console.log("模块新建", this.answerData);
                    // this.answerTitle = this.answerData.title
                    this.questionsId = this.answerData.id;
                    this.getanswer();
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
        mounted() { },
        // 事件处理
        methods: {
            //获取评论详情列表
            getanswer() {
                var self = this;
                self.getanswerList({
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        questionId: self.questionsId
                }).then(data => {
                        //console.log("评论详情列表", data);
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.records) {
                                    //console.log("是这里吗")
                                    if (data.data.records.length > 0) {
                                        self.answerList = data.data.records;
                                        self.totalNum = data.data.total;
                                        self.answerTitle = data.data.records[0].questionTitle;
                                    } else {
                                        self.answerList = []
                                    }
                                } else {
                                    self.answerList = []
                                }
                            } else {
                                self.answerList = []
                            }
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                }).catch(msg => {
                    self.$message({
                        type: "info",
                        message: "服务器异常"
                    });
                    
                });
            },
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: "/medical/questions"
                });
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                this.getanswer();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getanswer();
            },
            //删除弹框
            delClick(index) {
                this.isShowdel = false;
                this.titlename = "该评论将被删除，该操作无法恢复！";
                this.cancelId = this.answerList[index].id;
                //console.log(this.cancelId);
            },
            //确认删除
            okDelClick() {
                var self = this;
                if (self.okDelClickTrueOrFalse == true) {
                    self.okDelClickTrueOrFalse = false
                    self
                    .getcancelAnswer({
                        id: self.cancelId
                    })
                    .then(data => {
                        self.okDelClickTrueOrFalse = true
                        //console.log("删除评论详情", data);
                        if (data.code == 200) {
                            this.getanswer();
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    })
                    .catch(msg => {
                        self.okDelClickTrueOrFalse = true
                        //console.log(msg);
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
                }
                
                this.isShowdel = true;
            },
            //取消删除
            canleClick() {
                this.isShowdel = true;
            },
            ...mapActions(["getanswerList", "getcancelAnswer"])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .answer {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .answer>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .answerTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .answerTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .answerTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .answerTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .answerTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .headline {
        width: 1051px;
        margin-left: 5%;
        height: 64px;
        line-height: 64px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #d1d1d1;
    }

    .answerContent {
        font-size: 14px;
        overflow: hidden;
        max-width: 1000px;
        height: 32px;
    }

    .answerContent div {
        height: 32px;
        line-height: 31px;
    }

    .answerImg,
    .answerName,
    .answerFont,
    .answertime {
        float: left;
        margin-right: 10px;
    }

    .answerImg {
        color: #303030;
    }

    .answerFont,
    .answertime {
        color: #8f8e94;
    }

    .answerImg {
        height: 32px;
        width: 32px;
        overflow: hidden;
    }

    .answerImg img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .answerDel {
        float: right !important;
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
        color: #8f8e94;
    }

    .answerFor {
        width: 80%;
        max-width: 1000px;
        margin-left: 8%;
        border-bottom: 1px dashed #d1d1d1;
    }

    .answerFor>div {
        margin: 24px 0;
    }

    .answerText {
        font-size: 14px;
        line-height: 24px;
    }

    .paging {
        max-width: 1000px;
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
        border: none !important;
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
</style>