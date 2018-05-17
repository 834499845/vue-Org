<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="newsNumber">
        <div>
            <!-- 头部 -->
            <div class="listTitle">
                <img @click="canelClick" src="/static/img/fan.png" alt="">
                <div>
                    {{titleNameVal}}
                </div>
            </div>
            <!-- 列表 -->
            <div class="list">
                <div>
                    <ul>
                        <li v-for="(item,index) in newsReplyList">
                            <div class="replyName">
                                <div>
                                    {{item.fromUserName}}
                                </div>
                                回复
                                <div>
                                    {{item.toUserName}}
                                </div>
                            </div>
                            <div class="replyContent">
                                <div>
                                    {{item.content}}
                                </div>
                                <div class="showOperation">
                                    <div>
                                        显示
                                    </div>
                                    :
                                    <div>
                                        <img @click="showClick(index)" v-show="item.display == 0" src="/static/img/shi.png" alt="显示" title="显示">
                                        <img @click="showClick(index)" v-show="item.display == 1" src="/static/img/fou.png" alt="关闭" title="关闭">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="newsReplyList.length > 0">
                    <div></div>
                    <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    export default {
        data() {
            return {
                newsReplyList: [],  //回复列表
                idstring: '', //操作的id
                state: '', //状态：0：是 1：否
                titleNameVal: '',//动态评论回复列表/用户动态评论回复列表
                currentPage: 1,
                pageSizeNum: 10,
                totalNum: 6,
            };
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            // 权限限制
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "新闻管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("dynamic") == -1 && arrs.indexOf("user") == -1) {
                    this.intercept = true;
                    var warningStr = "您暂时没有权限访问这个页面";
                    self.$alert(warningStr, "提示", {
                        confirmButtonText: "确定",
                        type: "info"
                    }).then(() => {
                        self.$router.push({
                            path: "/login"
                        });
                    }).catch(() => {
                        self.$router.push({
                            path: "/login"
                        });
                    });
                } else {
                    if (this.$route.query.newsShow == 'dynamic') {
                        this.titleNameVal = '动态评论回复列表'
                    } else if (this.$route.query.newsShow == 'userNumber') {
                        this.titleNameVal = '用户动态评论回复列表'
                    }
                    this.getnewsReplyList()
                }
            } else {
                this.intercept = true;
                var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
                this.$alert(warningStr, "提示", {
                    confirmButtonText: "确定",
                    type: "info"
                }).then(() => {
                    this.$router.push({
                        path: "/login"
                    });
                }).catch(() => {
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
            //返回
            canelClick() {
                this.$router.push({
                    path: '/news/dynamicNumber',
                })
            },
            //获取评论回复列表
            getnewsReplyList() {
                var self = this
                self.getcommentdetailList({
                    parentId: self.$route.query.id,
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    type: 5,        //	评论类型：0：新闻、1：商城、2：医生、3：圈子、4：视频、5：新闻-动态
                }).then(data => {
                    self.newsNumList = []
                    if (data.code == 200) {
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                self.newsReplyList = data.data.records
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                })
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                this.getnewsReplyList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getnewsReplyList()
            },
            //显示操作
            showClick(index) {
                if (this.newsReplyList[index].display == '0') {
                    this.state = "1"
                } else if (this.newsReplyList[index].display == '1') {
                    this.state = "0"
                }
                this.idstring = this.newsReplyList[index].id
                this.getUpdateCommentInfoState()
            },
            //显示操作接口
            getUpdateCommentInfoState() {
                var self = this
                self.getcommentsInfofindUpdateCommentInfoState({
                    operationObject: '1', //操作对象（0：评论，1：回复）
                    objectIdJson: self.idstring, //对象id
                    operationType: '1', //操作类型（0：热评，1：显示）
                    state: self.state, //状态：0：是 1：否
                }).then(data => {
                    if (data.code == 200) {
                        this.getnewsReplyList()
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            ...mapActions(['getcommentdetailList', 'getcommentsInfofindUpdateCommentInfoState'])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .newsNumber {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .newsNumber>div:nth-child(1) {
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
    }

    .listTitle>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 16px;
        font-size: 16px;
        font-weight: bold;
    }

    .listTitle img {
        cursor: pointer;
    }

    .list {
        margin-top: 8px;
        width: 90%;
        margin-left: 50px;
        max-width: 1000px;
    }

    .list li {
        padding: 16px 0;
        border-bottom: 1px solid #d1d1d1;
    }

    .replyName {
        display: flex;
        height: 30px;
        line-height: 30px;
    }

    .replyName div:nth-child(1) {
        color: green;
        margin-right: 8px;
    }

    .replyName div:nth-child(2) {
        color: green;
        margin-left: 8px;
    }

    .replyContent {
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .replyContent div:nth-child(1) {
        width: 82%;
        padding-left: 16px;
    }

    .showOperation {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
    }

    .showOperation div {
        margin: 0 8px;
    }

    .showOperation img {
        cursor: pointer;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }
</style>