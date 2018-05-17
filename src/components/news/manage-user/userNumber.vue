<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="userNumber">
        <div>
            <!-- 头部 -->
            <div class="listTitle">
                <img @click="canelClick" src="/static/img/fan.png" alt="">
                <div>
                    用户{{moduleVal}}列表
                </div>
            </div>
            <!-- 列表 -->
            <div class="list" v-if="islist">
                <ul>
                    <li class="listLi listFirst">
                        <div>
                            序号
                        </div>
                        <div>
                            {{titleFont}}
                        </div>
                        <div>
                            发布时间
                        </div>
                        <div>
                            作者
                        </div>
                        <div>
                            <div v-if="UserNumObj.val == 'answer'">
                                被赞数
                            </div>
                            <div v-else>
                                互动数据
                            </div>
                        </div>
                        <div>
                            <div v-if="UserNumObj.val == 'answer'">
                                收藏数
                            </div>
                            <div v-else>
                                被推荐数
                            </div>
                        </div>
                    </li>
                    <li class="listLi" v-for="(item,index) in userNumList">
                        <div>
                            {{index+1}}
                        </div>
                        <div>
                            <img @click="titleClick(index)" src="/static/img/查看.png" alt="">
                        </div>
                        <div>
                            {{item.updateDate | ctimeFun}}
                        </div>
                        <div>
                            {{item.name}}
                        </div>
                        <div>
                            <div v-if="item.totalCount == 0 || UserNumObj.val == 'answer'">
                                {{item.totalCount}}
                            </div>
                            <div v-else>
                                <span @click="totalCountClick(index)">
                                    {{item.totalCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            {{item.commendNumber}}
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="userNumList.length > 0">
                    <div></div>
                    <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                    </div>
                </div>
            </div>
            <!-- 违规列表 -->
            <div v-else class="list">
                <ul>
                    <li class="ruleLi listFirst">
                        <div>序号</div>
                        <div>违规时间</div>
                        <div>违规原因</div>
                        <div>查看屏蔽内容</div>
                    </li>
                    <li class="ruleLi" v-for="(item,index) in userNumList">
                        <div>
                            {{index+1}}
                        </div>
                        <div>
                            {{item.updateDate | ctimeFun}}
                        </div>
                        <div>
                            {{item.keyword}}
                        </div>
                        <div>
                            <img @click='rulecauseClick(index)' src="/static/img/查看.png" alt="">
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="userNumList.length > 0">
                    <div></div>
                    <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 违规内容弹出框 -->
        <div class="ruleBox" v-show="isRuleBox">
            <div class="ruleDetails">
                <div class="ruleDetailsTop">
                    {{ruleDetailsTopVal}}
                    <div class="cancelRuleBox" @click='cancelRuleBoxClick'>
                        +
                    </div>
                </div>
                <div class="ruleDetailsBottom">
                    <div v-html="ruleContent"></div>
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
                moduleVal: '文章',  //（文章、动态...）
                titleFont: '',  //标题、内容、动态
                userNumList: [],  //列表数组
                isRuleBox: 0,//违规详情弹出框
                islist: 0,//列表展示
                ruleContent: '', //违规原因
                currentPage: 1,
                pageSizeNum: 10,
                totalNum: 6,
                UserNumObj: {}, //父页的数据
                type: '', //类型(0文章,1动态)
                ruleDetailsTopVal: '',  //违规屏蔽内容/回答内容
            };
        },
        // 过滤
        filters: {
            //是否大V
            hotFun: function (val) {
                if (val == 1) {
                    return '是'
                } else if (val == 0) {
                    return '否'
                } else {
                    return '暂无'
                }
            },
            // 返回日期格式化
            ctimeFun: function (val) {
                if (val) {
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
                } else {
                    return
                }
            },
        },
        // 模块新建时
        created: function () {
            sessionStorage.removeItem('numberComment')
            if (sessionStorage.getItem('userNumberPag')) {
                var objPag = JSON.parse(sessionStorage.getItem('userNumberPag'))
                this.currentPage = objPag.currentPage
                this.pageSizeNum = objPag.pageSizeNum
            }
            this.UserNumObj = JSON.parse(sessionStorage.getItem('userNumber'))
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
                if (arrs.indexOf("user") == -1) {
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
                    if (this.UserNumObj.val == "article") {
                        this.islist = 1
                        this.moduleVal = '文章'
                        this.titleFont = '标题'
                        this.type = 0
                        this.getSelectArticleList()
                    } else if (this.UserNumObj.val == "dynamic") {
                        this.islist = 1
                        this.moduleVal = '动态'
                        this.titleFont = '动态'
                        this.type = 1
                        this.getSelectArticleList()
                    } else if (this.UserNumObj.val == "issue") {
                        this.islist = 1
                        this.moduleVal = '问题'
                        this.titleFont = '标题'
                        this.getSelectQuestionList()
                    } else if (this.UserNumObj.val == "answer") {
                        this.islist = 1
                        this.moduleVal = '回答'
                        this.titleFont = '内容'
                        this.getSelectAnswersList()
                    } else if (this.UserNumObj.val == "rule") {
                        this.moduleVal = '违规'
                        this.islist = 0
                        this.getSelectIllegalListByUserId()
                    }
                    //article-文章、dynamic-动态、issue-问题、answer-回答、rule-违规
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
            //查看用户发表的文章或动态
            getSelectArticleList() {
                var self = this
                self.getuserSummaryControllerSelectArticleList({
                    type: self.type,    //类型(0文章,1动态)
                    userId: self.UserNumObj.userId,  //用户Id
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    self.userNumList = []
                    if (data.code == 200) {
                        sessionStorage.removeItem('userNumberPag')
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                if (self.type == 0) {
                                    data.data.records.forEach(ele => {
                                        self.userNumList.push({
                                            title: ele.title,    //标题
                                            updateDate: ele.updateDate, //时间
                                            name: ele.name, //作者
                                            totalCount: ele.totalCount, //互动数据
                                            commendNumber: ele.commendNumber,   //推荐数
                                            newsId: ele.newsId, //新闻/动态id
                                        })
                                    });
                                } else if (self.type == 1) {
                                    data.data.records.forEach(ele => {
                                        self.userNumList.push({
                                            title: ele.content,    //内容
                                            updateDate: ele.updateDate, //时间
                                            name: ele.name, //作者
                                            totalCount: ele.totalCount, //互动数据
                                            commendNumber: ele.commendNumber,   //推荐数
                                            newsId: ele.newsId, //新闻/动态id
                                        })
                                    });
                                }
                                self.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //查看用户提出的问题
            getSelectQuestionList() {
                var self = this
                self.getuserSummaryControllerSelectQuestionList({
                    userId: self.UserNumObj.userId,  //用户Id
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    this.userNumList = []
                    if (data.code == 200) {
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                data.data.records.forEach(ele => {
                                    self.userNumList.push({
                                        title: ele.title,    //标题
                                        updateDate: ele.updateDate, //时间
                                        name: ele.name, //作者
                                        totalCount: ele.totalCount, //互动数据
                                        commendNumber: ele.commendNumber,   //推荐数
                                        questionId: ele.questionId, //id
                                    })
                                });
                                self.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //查看用户的评论列表
            getSelectAnswersList() {
                var self = this
                self.getuserSummaryControllerSelectAnswersList({
                    userId: self.UserNumObj.userId,  //用户Id
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    this.userNumList = []
                    if (data.code == 200) {
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                data.data.records.forEach(ele => {
                                    self.userNumList.push({
                                        updateDate: ele.updateDate, //时间
                                        name: ele.userName, //作者
                                        totalCount: ele.praiseCount, //点赞数
                                        commendNumber: ele.collectCount,   //收藏数
                                        content: ele.content,   //内容
                                        answerId: ele.answerId, //用户回答id
                                    })
                                });
                                self.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //查看用户的违规详情列表
            getSelectIllegalListByUserId() {
                var self = this
                self.getuserSummaryControllerSelectIllegalListByUserId({
                    userId: self.UserNumObj.userId,  //用户Id
                    appId: 'botu',
                    module: 'news',
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    self.userNumList = []
                    if (data.code == 200) {
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                data.data.records.forEach(ele => {
                                    self.userNumList.push({
                                        updateDate: Number(ele.updateDate),
                                        keyword: ele.keyword,
                                        content: ele.content

                                    })
                                })
                                self.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                if (this.UserNumObj.val == "article") {
                    this.getSelectArticleList()
                } else if (this.UserNumObj.val == "dynamic") {
                    this.getSelectArticleList()
                } else if (this.UserNumObj.val == "issue") {
                    this.getSelectQuestionList()
                } else if (this.UserNumObj.val == "answer") {
                    this.getSelectAnswersList()
                } else if (this.UserNumObj.val == "rule") {
                    this.getSelectIllegalListByUserId()
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val
                if (this.UserNumObj.val == "article") {
                    this.getSelectArticleList()
                } else if (this.UserNumObj.val == "dynamic") {
                    this.getSelectArticleList()
                } else if (this.UserNumObj.val == "issue") {
                    this.getSelectQuestionList()
                } else if (this.UserNumObj.val == "answer") {
                    this.getSelectAnswersList()
                } else if (this.UserNumObj.val == "rule") {
                    this.getSelectIllegalListByUserId()
                }
            },
            //标题点击
            titleClick(index) {
                if (this.UserNumObj.val == "article") {
                    this.$router.push({
                        path: '/news/newsdetails',
                        query: {
                            id: this.userNumList[index].newsId,
                            newsShow: 'userNumber',
                            userNumber: 'article'
                        }
                    })
                } else if (this.UserNumObj.val == "dynamic") {
                    this.$router.push({
                        path: '/news/newsdetails',
                        query: {
                            id: this.userNumList[index].newsId,
                            newsShow: 'userNumber',
                            userNumber: 'dynamic'
                        }
                    })
                } else if (this.UserNumObj.val == "issue") {
                    this.$router.push({
                        path: '/news/newsdetails',
                        query: {
                            id: this.userNumList[index].questionId,
                            newsShow: 'userNumber',
                            userNumber: 'issue'
                        }
                    })
                } else if (this.UserNumObj.val == "answer") {
                    this.isRuleBox = 1
                    this.ruleDetailsTopVal = '回答内容'
                    this.ruleContent = this.userNumList[index].content
                }
                if (this.UserNumObj.val == "article" || this.UserNumObj.val == "dynamic" || this.UserNumObj.val == "issue") {
                    var obj = {
                        currentPage: this.currentPage,
                        pageSizeNum: this.pageSizeNum,
                    }
                    var str = JSON.stringify(obj)
                    sessionStorage.setItem('userNumberPag', str)
                }
            },
            //互动数据
            totalCountClick(index) {
                if (this.userNumList[index].totalCount > 0) {
                    if (this.UserNumObj.val == "article") {
                        this.$router.push({
                            path: '/news/newsNumber',
                        })
                        var arr = {
                            id: this.userNumList[index].newsId,
                            newsShow: 'userNumber',
                        }
                        var obj = JSON.stringify(arr)
                        sessionStorage.setItem("numberComment", obj)
                    } else if (this.UserNumObj.val == "dynamic") {
                        this.$router.push({
                            path: '/news/dynamicNumber',
                        })
                        var arr = {
                            id: this.userNumList[index].newsId,
                            newsShow: 'userNumber',
                        }
                        var obj = JSON.stringify(arr)
                        sessionStorage.setItem("numberComment", obj)
                    } else if (this.UserNumObj.val == "issue") {
                        this.$router.push({
                            path: '/news/answersNumber',
                            query: {
                                id: this.userNumList[index].questionId,
                                newsShow: 'userNumber',
                                userNumber: 'issue'
                            }
                        })
                    } else if (this.UserNumObj.val == "answer") {
                        this.$router.push({
                            path: '/news/answersNumber',
                            query: {
                                id: this.userNumList[index].answerId,
                                newsShow: 'userNumber',
                                userNumber: 'answer'
                            }
                        })
                    }
                    var obj = {
                        currentPage: this.currentPage,
                        pageSizeNum: this.pageSizeNum,
                    }
                    var str = JSON.stringify(obj)
                    sessionStorage.setItem('userNumberPag', str)
                }
            },
            //返回上一页
            canelClick() {
                this.$router.push({
                    path: '/news/user'
                })
            },
            //违规详情
            rulecauseClick(index) {
                this.isRuleBox = 1
                this.ruleDetailsTopVal = '违规屏蔽内容'
                this.ruleContent = this.userNumList[index].content
            },
            //关闭违规详情弹出框
            cancelRuleBoxClick() {
                this.isRuleBox = 0
            },
            ...mapActions(['getuserSummaryControllerSelectArticleList', 'getuserSummaryControllerSelectQuestionList', 'getuserSummaryControllerSelectAnswersList', 'getuserSummaryControllerSelectIllegalListByUserId'])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .userNumber {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .userNumber>div:nth-child(1) {
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
        margin-top: 24px;
    }

    .list li {
        display: flex;
        border-right: 1px solid #d1d1d1;
        border-bottom: 1px solid #d1d1d1;
    }

    .listFirst {
        background: #f2f4f8;
        border-top: 1px solid #d1d1d1;
    }

    .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .listLi>div {
        text-align: center;
        height: 48px;
        line-height: 48px;
        padding: 0 4px;
        border-left: 1px solid #d1d1d1;

    }

    .listLi div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .listLi>div:nth-child(1) {
        width: 15%;
    }

    .listLi>div:nth-child(2) {
        width: 15%;

    }

    .listLi>div:nth-child(2) span {
        color: green;
        cursor: pointer;
    }

    .listLi>div:nth-child(3) {
        width: 22%;
    }

    .listLi>div:nth-child(4) {
        width: 18%;
    }

    .listLi>div:nth-child(5) {
        width: 15%;
    }

    .listLi>div:nth-child(5) span {
        color: green;
        cursor: pointer;
    }

    .listLi>div:nth-child(6) {
        width: 15%;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }

    .ruleLi div {
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-left: 1px solid #d1d1d1;
    }

    .ruleLi div:nth-child(1) {
        width: 20%;
    }

    .ruleLi div:nth-child(2) {
        width: 30%;
    }

    .ruleLi div:nth-child(3) {
        width: 30%;
    }

    .ruleLi div:nth-child(4) {
        width: 20%;
    }

    .ruleLi div:nth-child(4) img {
        cursor: pointer;
    }

    /* 违规内容弹框 */

    .ruleBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1;
    }

    .ruleDetails {
        width: 70%;
        height: 50%;
        max-width: 800px;
        max-height: 700px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: 200px auto;
        z-index: 1;
    }

    .ruleDetailsTop {
        height: 59px;
        line-height: 59px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #d1d1d1;
        position: relative;
    }

    .cancelRuleBox {
        position: absolute;
        top: -5px;
        right: 10px;
        transform: rotate(45deg);
        color: red;
        font-size: 50px;
        font-weight: normal;
        cursor: pointer;
    }

    .ruleDetailsBottom {
        width: 100%;
        height: 100%;
        padding-top: 10px;
    }

    .ruleDetailsBottom div {
        border: 1px solid #d1d1d1;
        line-height: 24px;
        margin: 0 auto;
        width: 95%;
        height: 85%;
        padding: 0 4px;
        border-radius: 4px;
        overflow-y: auto;
        overflow-x: auto;
    }
</style>