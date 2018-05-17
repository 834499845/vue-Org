<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="details">
        <div>
            <!-- 详情头部 -->
            <div class="detailsTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        动态详情
                    </div>
                </div>
            </div>
            <!-- 详情展示 -->
            <div class="headline">
                帖子：{{remarkText}}
            </div>
            <div class="detailsFor" v-for="(item,index) in remarkList" :key="item.text">
                <div class="detailstime">
                    {{item.updateDate|ctimeFun}}
                </div>
                <div class="detailsName">
                    <div>
                        {{item.userName}}
                    </div>
                    <div>
                        ：
                    </div>
                    <div>
                        {{item.content}}
                    </div>
                </div>
                <div class="detailsBottom">
                    <div class="detailsText" @click="detailsClick(index)">
                        共{{item.replyCount}}条评论，点击查看详情！
                    </div>
                    <div class="detailsDel" @click="delClick(index)">
                        删除
                    </div>
                </div>
            </div>
            <!-- 暂无数据 -->
            <div class="noList" v-show="remarkList.length == 0">
                <div>
                    <img src="/static/img/w.png" alt="">
                </div>
            </div>
            <div class="paging" v-show="remarkList.length > 0">
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
                titlename: '',
                isShowdel: true,
                remarkText: '帖子标题',
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                remarkList: [],
                dynId: '',
                delId: '',
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
                    this.intercept = true
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
                    self.remarkData = JSON.parse(sessionStorage.remadata)
                    self.remarkText = self.remarkData.content
                    self.dynId = self.remarkData.id
                    self.getremarkOn()
                }
            } else {
                this.intercept = true
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
            //获取动态详情
            getremarkOn() {
                //console.log("sad")
                var self = this
                self.getremarkOnList(
                    {
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        objectId: self.dynId,
                        type: "3",
                    }
                ).then((data) => {
                    //console.log("圈子评论列表", data)
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.records) {
                                if (data.data.records.length) {
                                    self.remarkList = data.data.records
                                    self.totalNum = data.data.total
                                } else {
                                    self.remarkList = []
                                }
                            } else {
                                self.remarkList = []
                            }
                        } else {
                            self.remarkList = []
                        }
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        })
                    }
                }).catch(msg => {
                    //console.log(msg)
                    self.$message({
                        type: 'info',
                        message: '服务器异常！'
                    })
                })
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                this.getremarkOn()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getremarkOn()
            },
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: '/medical/dynamicState'
                })
            },
            //跳转评论详情
            detailsClick(index) {
                if (this.remarkList[index].replyCount == 0) {
                    this.$message({
                        type: 'info',
                        message: '暂无评论！'
                    })
                } else {
                    let discussdata = JSON.stringify(this.remarkList[index])
                    sessionStorage.setItem('discussdata', discussdata)
                    this.$router.push({
                        path: '/medical/discussDetails'
                    })
                }
            },
            //删除弹框
            delClick(index) {
                this.isShowdel = false
                this.titlename = '该评论将被删除，该操作无法恢复！'
                this.delId = this.remarkList[index].id
            },
            //确认删除
            okDelClick() {
                var self = this
                if (self.okdelclick == true) {
                    self.okdelclick = false
                    self.getdelRemarkOn(
                            {
                                id: self.delId,
                                type: "3",
                            }
                        ).then((data) => {
                            //console.log("圈子评论删除", data)
                            self.okdelclick = true
                            if (data.code == 200) {
                                if (self.remarkList.length == 1) {
                                    if (self.currentPage == 1) {
                                        self.currentPage = 1
                                    } else if (self.currentPage > 1) {
                                        self.currentPage = self.currentPage - 1
                                    }
                                }
                                self.getremarkOn()
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
            ...mapActions(['getremarkOnList', 'getdelRemarkOn'])
        },
        // 监视
        watch: {

        }
    }

</script>
<style scoped>
    .details {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .details>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .detailsTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .detailsTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .detailsTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .detailsTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .detailsTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .headline {
        width: 80%;
        max-width: 1000px;
        margin-left: 8%;
        height: 64px;
        line-height: 64px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #d1d1d1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .detailsName {
        font-size: 14px;
        overflow: hidden;
    }

    .detailsBottom {
        font-size: 14px;
        overflow: hidden;
        color: #8f8e94;
    }

    .detailsName>div {
        float: left;
    }

    .detailsName>div:nth-child(1) {
        color: #dc322b;
    }

    .detailsName>div:nth-child(2) {
        padding: 0 10px;
    }

    .detailsText {
        float: left;
        color: green;
        cursor: pointer;
    }

    .detailsDel {
        float: right;
        cursor: pointer;
    }

    .detailsFor {
        width: 80%;
        max-width: 1000px;
        margin-left: 8%;
        border-bottom: 1px dashed #d1d1d1;
    }

    .detailsFor>div {
        margin: 24px 0;
    }

    .detailstime {
        font-size: 14px;
        line-height: 24px;
    }

    .paging {
        width: 80%;
        max-width: 1000px;
        margin-left: 8%;
        margin-top: 24px;
        overflow: hidden;
    }

    #lastLiRight {
        float: right;
        min-width: 270px;
        display: flex;
        align-items: center;
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