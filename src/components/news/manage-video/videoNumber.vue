<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="newsNumber">
        <div>
            <!-- 头部 -->
            <div class="listTitle">
                <img @click="canelClick" src="/static/img/fan.png" alt="">
                <div>
                    {{titleName}}
                </div>
            </div>
            <!-- 次数循环 -->
            <div class="timeLi">
                <ul>
                    <li class="timeCss">
                        <div>收藏次数</div>：
                        <div>{{videoNumber.collectCount | likeNumberFun}}</div>
                    </li>
                    <li class="timeCss">
                        <div>转发次数</div>：
                        <div>{{videoNumber.forwardCount}}</div>
                    </li>
                    <li class="timeCss">
                        <div>播放次数</div>：
                        <div>{{videoNumber.broadcastCount}}</div>
                    </li>
                    <li class="timeCss">
                        <div>点赞次数</div>：
                        <div>{{videoNumber.praiseCount}}</div>
                    </li>
                    <li class="timeCss">
                        <div>点踩次数</div>：
                        <div>{{videoNumber.stepCount}}</div>
                    </li>
                </ul>
            </div>
            <!-- 赞赏列表 -->
            <div class="list">
                <div class="listTop">
                    <div>
                        赞赏记录（{{videoNumber.appreciateCount}}次{{videoNumber.appreciateAmount}}元）
                    </div>
                    <div>
                        <div @click="admirePackUpClick" v-if="isAdmireListShow" class="operation">
                            <div class="packUp"></div>
                            收起
                        </div>
                        <div @click="admireUnfoldclick" v-else class="operation">
                            <div class="unfold"></div>
                            展开
                        </div>
                    </div>
                </div>
                <ul v-show="isAdmireListShow">
                    <li class="admireLi firstLi">
                        <div>
                            用户
                        </div>
                        <div>
                            赞赏时间
                        </div>
                        <div>
                            赞赏金额
                        </div>
                        <div>
                            渠道
                        </div>
                    </li>
                    <li class="admireLi" v-for="(item,index) in admireList" :key="index">
                        <div>
                            {{item.userName}}
                        </div>
                        <div>
                            {{item.createDate | timeFun}}
                        </div>
                        <div>
                            {{item.amount}}
                        </div>
                        <div>
                            {{item.channel | payFun}}
                        </div>
                    </li>
                    <!-- 底部分页 -->
                    <div class="lastLi">
                        <div>
                        </div>
                        <div>
                            <el-pagination @size-change="admireSizeChange" @current-change="admireCurrentChange" :current-page.sync="admirecurrentPage"
                                :page-sizes="[10, 20, 30, 40]" :page-size="admireSizeNum" layout="total, sizes, prev, pager, next"
                                :total="admiretotalNum"></el-pagination>
                        </div>
                    </div>
                </ul>
            </div>
            <!-- 评论列表 -->
            <div class="list">
                <div class="listTop">
                    <div>
                        评论记录（{{totalNum}}次）
                    </div>
                    <div>
                        <div @click="listPackUpclick" v-if="islistShow" class="operation">
                            <div class="packUp"></div>
                            收起
                        </div>
                        <div @click="listUnfoldclick" v-else class="operation">
                            <div class="unfold"></div>
                            展开
                        </div>
                    </div>
                </div>
                <ul v-show="islistShow">
                    <li class="listLi firstLi">
                        <div>
                            用户
                        </div>
                        <div>
                            评论内容
                        </div>
                        <div>
                            回复
                        </div>
                        <div>
                            热评
                        </div>
                        <div>
                            显示
                        </div>
                    </li>
                    <li class="listLi" v-for="(item,index) in commentList">
                        <div :title="item.userName">
                            {{item.userName}}
                        </div>
                        <div :title="item.content">
                            {{item.content}}
                        </div>
                        <div>
                            <div v-show="item.replyCount == 0">
                                {{item.replyCount}}
                            </div>
                            <span v-show="item.replyCount > 0" class="greenFont" @click="replyDetailClick(index)">
                                {{item.replyCount}}
                            </span>
                        </div>
                        <div>
                            <img @click="commentHotclick(index,'cold')" v-if="item.hotReview == '0'" src="/static/img/shi.png" alt="是" title="是">
                            <img @click="commentHotclick(index,'hot')" v-else src="/static/img/fou.png" alt="否" title="否">
                        </div>
                        <div>
                            <img @click="commentShowclick(index,'hidden')" v-if="item.display == '0'" src="/static/img/shi.png" alt="显示" title="显示">
                            <img @click="commentShowclick(index,'show')" v-else src="/static/img/fou.png" alt="不显示" title="不显示">
                        </div>
                    </li>
                    <!-- 底部分页 -->
                    <div class="lastLi">
                        <div>
                        </div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import { mapActions, mapState } from "vuex";
    import hosdel from "../../cModule/newsDelete";
    export default {
        components: {
            "v-hosdel": hosdel
        },
        data() {
            return {
                admireList: [], //赞赏列表
                commentList: [], //评论列表
                admireNumVal: "78", //赞赏次数
                admireMoneyVal: "250", //赞赏钱数
                isAdmireListShow: 0, //赞赏列表展开
                islistShow: 0, //评论列表展开
                admirecurrentPage: 1, //赞赏页码
                admireSizeNum: 10, //赞赏每页条数
                admiretotalNum: 6, //赞赏总数
                currentPage: 1, //评论页码
                pageSizeNum: 10, //评论每页条数
                totalNum: 0, //评论总数
                isHotUp: true, //热评请求监视
                isShowUp: true, //显示请求监视
                titleName: '',   //模块标题
                videoNumber: {}
            };
        },
        // 过滤
        filters: {
            timeFun: function (val) {
                if (val) {
                    var standardTime = new Date(val * 1000);
                    var y, m, d, h, f;
                    y = standardTime.getFullYear();
                    m = standardTime.getMonth() + 1;
                    m = m > 9 ? m : "0" + m;
                    d = standardTime.getDate();
                    d = d > 9 ? d : "0" + d;
                    h = standardTime.getHours();
                    h = h > 9 ? h : "0" + h;
                    f = standardTime.getMinutes();
                    f = f > 9 ? f : "0" + f;
                    return y + "-" + m + "-" + d + " " + h + ":" + f;
                } else {
                    return "暂无";
                }
            },
            payFun: function(val) {
                if (val === '0') {
                    return "余额"
                } else if (val === "1") {
                    return "支付宝"
                } else if (val === "2") {
                    return "微信"
                } else if (val === "3"){
                    return "银联"
                }
            },
            likeNumberFun: function(val) {
                if (val < 0) {
                    return 0
                } else {
                    return val
                }
            }
        },
        // 模块新建时
        created: function () {
            if (sessionStorage.getItem('videoNumberPag')) {
                var objPag = JSON.parse(sessionStorage.getItem('videoNumberPag'))
                this.admirecurrentPage = objPag.admirecurrentPage
                this.admireSizeNum = objPag.admireSizeNum
                this.currentPage = objPag.currentPage
                this.pageSizeNum = objPag.pageSizeNum
            }
            this.videoNumber = JSON.parse(sessionStorage.getItem("numberComment")).videoNumber;
            console.log(this.videoNumber)
            if (JSON.parse(sessionStorage.getItem("numberComment")).newsShow == 'video') {
                this.titleName = '小视频互动数据'
            } else if (JSON.parse(sessionStorage.getItem("numberComment")).newsShow == 'auditContent') {
                this.titleName = '审核视频互动数据'
            }
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
                if (arrs.indexOf("video") == -1 && arrs.indexOf("audit")) {
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
                    this.getadmireListFun();
                    this.getcommentsListFun();
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
            // 点击跳转到评论详情页面
            replyDetailClick(index) {
                if (this.commentList[index].replyCount == 0) {
                    return
                } else {
                    if (JSON.parse(sessionStorage.getItem("numberComment")).newsShow == 'video') {
                        this.$router.push({
                            path: "/news/newsReply",
                            query: {
                                id: this.commentList[index].id,
                                newsShow: "videoNumber",
                                videoNumber: 'video'
                            }
                        });
                    } else if (JSON.parse(sessionStorage.getItem("numberComment")).newsShow == 'auditContent') {
                        this.$router.push({
                            path: "/news/newsReply",
                            query: {
                                id: this.commentList[index].id,
                                newsShow: "videoNumber",
                                videoNumber: 'auditContent'
                            }
                        });
                    }
                    var obj = {
                        admirecurrentPage: this.admirecurrentPage,
                        admireSizeNum: this.admireSizeNum,
                        currentPage: this.currentPage,
                        pageSizeNum: this.pageSizeNum
                    }
                    var str = JSON.stringify(obj)
                    sessionStorage.setItem('videoNumberPag', str)
                }
            },
            // 分页查询赞赏记录
            getadmireListFun() {
                var self = this;
                self
                    .getappreciatelogselectPageIAppreciateLog({
                        type: "1",
                        businessId: self.videoNumber.id,
                        pageNo: self.admirecurrentPage,
                        pageSize: self.admireSizeNum
                    })
                    .then(data => {
                        if (data.code == 200) {
                            if (data.data) {
                                self.admiretotalNum = data.data.total;
                                console.log(self.admiretotalNum)
                                if (data.data.records) {
                                if (data.data.records.length > 0) {
                                    self.admireList = data.data.records;
                                    console.log(self.admireList)
                                    self.isAdmireListShow = 1;
                                } else {
                                    self.isAdmireListShow = 0;
                                }
                            }
                            }
                            
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            // 分页查询评论记录
            getcommentsListFun() {
                var self = this;
                self
                    .getcommentsInfofindCommentsByObjectId({
                        objectId: self.videoNumber.id,
                        current: self.currentPage,
                        size: self.pageSizeNum,
                        limit: 0,
                        type: 4,        //	评论类型：0：新闻、1：商城、2：医生、3：圈子、4：视频、5：新闻-动态
                    })
                    .then(data => {
                        if (data.code == 200) {
                            if (data.data.records) {
                                if (data.data.records.length > 0) {
                                    self.commentList = data.data.records;
                                    self.islistShow = 1;
                                    self.totalNum = data.data.total;
                                } else {
                                    self.commentList = []
                                    self.islistShow = 0;
                                }
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            //赞赏分页
            admireSizeChange(val) {
                this.admireSizeNum = val;
                this.getadmireListFun();
            },
            admireCurrentChange(val) {
                this.admirecurrentPage = val;
                this.getadmireListFun();
            },
            //评论分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                this.getcommentsListFun();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getcommentsListFun();
            },
            //赞赏收起
            admirePackUpClick() {
                this.isAdmireListShow = 0;
            },
            //赞赏展开
            admireUnfoldclick() {
                this.isAdmireListShow = 1;
            },
            //评论收起
            listPackUpclick() {
                this.islistShow = 0;
            },
            //评论展开
            listUnfoldclick() {
                this.islistShow = 1;
            },
            // 评论是否热评
            commentHotclick(index, m) {
                if (this.isHotUp) {
                    this.isHotUp = false
                    var self = this;
                    self.getcommentsInfoupdateCommentInfoState({
                        operationObject: "0",
                        objectIdJson: self.commentList[index].id,
                        operationType: "0",
                        state: m == "hot" ? "0" : "1"
                    }).then(data => {
                        self.isHotUp = true
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "操作成功"
                            });
                            self.getcommentsListFun();
                        } else {
                            self.$message(data.message);
                        }
                    }).catch(msg => {
                        self.isHotUp = true
                        self.$message("服务器异常");
                    });
                }
            },
            //评论显示
            commentShowclick(index, m) {
                if (this.isShowUp) {
                    this.isShowUp = false
                    var self = this;
                    self.getcommentsInfoupdateCommentInfoState({
                        operationObject: "0",
                        objectIdJson: self.commentList[index].id,
                        operationType: "1",
                        state: m == "show" ? "0" : "1"
                    }).then(data => {
                        self.isShowUp = true
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "操作成功"
                            });
                            self.getcommentsListFun();
                        } else {
                            self.$message(data.message);
                        }
                    }).catch(msg => {
                        self.isShowUp = true
                        self.$message("服务器异常");
                    });
                }
            },
            //返回上一页
            canelClick() {
                this.$router.push({
                    path: "/news/" + JSON.parse(sessionStorage.getItem("numberComment")).newsShow
                });
            },
            ...mapActions([
                "getappreciatelogselectPageIAppreciateLog",
                "getcommentsInfofindCommentsByObjectId",
                "getcommentsInfoupdateCommentInfoState"
            ])
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
        margin-bottom: 100px;
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

    .timeLi ul {
        min-height: 24px;
    }

    .timeCss {
        float: left;
        margin: 12px 24px 0 0;
        display: flex;
    }

    .list {
        margin-top: 8px;
    }

    .listTop {
        width: 100%;
        height: 50px;
        border: 1px solid #d1d1d1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 14px;
    }

    .operation {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
    }

    .packUp {
        width: 10px;
        height: 10px;
        margin-top: 5px;
        margin-right: 5px;
        border-left: 1px solid #000;
        border-top: 1px solid #000;
        transform: rotate(45deg);
    }

    .unfold {
        width: 10px;
        height: 10px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        transform: rotate(45deg);
    }

    .list li {
        display: flex;
        border-right: 1px solid #d1d1d1;
        border-bottom: 1px solid #d1d1d1;
    }

    .firstLi {
        background: #f2f4f8;
    }

    .listLi>div,
    .admireLi>div {
        text-align: center;
        height: 48px;
        line-height: 48px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 4px;
        border-left: 1px solid #d1d1d1;
    }

    .admireLi>div:nth-child(1) {
        width: 25%;
    }

    .admireLi>div:nth-child(2) {
        width: 25%;
    }

    .admireLi>div:nth-child(3) {
        width: 25%;
    }

    .admireLi>div:nth-child(4) {
        width: 25%;
    }

    .listLi>div:nth-child(1) {
        width: 20%;
    }

    .listLi>div:nth-child(2) {
        width: 20%;
    }

    .listLi>div:nth-child(3) {
        width: 20%;
    }

    .listLi>div:nth-child(4) {
        width: 20%;
    }

    .listLi>div:nth-child(5) {
        width: 20%;
    }

    .listLi>div:nth-child(5) img,
    .listLi>div:nth-child(4) img {
        cursor: pointer;
    }

    .lastLi {
        height: 60px;
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
    }

    .greenFont {
        color: green;
        cursor: pointer;
    }
</style>