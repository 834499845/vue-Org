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
            <!-- 次数循环 -->
            <div class="timeLi">
                <ul>
                    <li class="timeCss" v-for="(item,index) in timeList">
                        <div>
                            {{item.val}}
                        </div>
                        ：
                        <div>
                            {{item.num}}
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 列表 -->
            <div class="list">
                <div class="listTop">
                    <div>
                        评论次数（{{commentNumVal}}次）
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
                            被赞
                        </div>
                        <div>
                            热评
                        </div>
                        <div>
                            显示
                        </div>
                    </li>
                     <!-- 暂无数据 -->
                    <div class="noList" v-show="answeesNumList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                    <li class="listLi" v-for="(item,index) in answeesNumList">
                        <div>
                            {{item.userName}}
                        </div>
                        <div>
                            <img @click="userContentClick(index)" src="/static/img/查看.png" alt="">
                        </div>
                        <div>
                            {{item.praiseCount}}
                        </div>
                        <div>
                            <img @click="hotCommentClick(index)" v-show="item.recommend == 1" src="/static/img/shi.png" alt="热评" title="热评">
                            <img @click="hotCommentClick(index)" v-show="item.recommend == 2" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <div>
                            <img @click="showClick(index)" v-show="item.showState == 0" src="/static/img/shi.png" alt="显示" title="显示">
                            <img @click="showClick(index)" v-show="item.showState == 1" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                    </li>
                    <!-- 底部分页 -->
                    <div class="lastLi" v-show='answeesNumList.length != 0'>
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
        <!-- 回答详情弹出框 -->
        <div class="ruleBox" v-show="isRuleBox">
            <div class="ruleDetails">
                <div class="ruleDetailsTop">
                    回答内容
                    <div class="cancelRuleBox" @click='cancelRuleBoxClick'>
                        +
                    </div>
                </div>
                <div class="ruleDetailsBottom">
                    <div v-html="answeesContent"></div>
                </div>
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
                timeList: [],   //次数循环
                answeesNumList: [], //评论列表
                commentNumVal: '', //评论次数
                islistShow: 1,//列表展示
                UpdatObj: {}, //操作接口上传的对象
                answeesContent: '',//回答内容
                isRuleBox: 0,//回答详情弹出框
                titleNameVal: '',   //问答互动数据/用户问题互动数据/用户回答互动数据
                isUpdate: true, //显示/热评接口监视
                currentPage: 1,
                pageSizeNum: 10,
                totalNum: 10,
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
                if (arrs.indexOf("answers") == -1 && arrs.indexOf("user") == -1 && arrs.indexOf("audit") == -1) {
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
                    if (this.$route.query.newsShow == 'answers') {
                        this.titleNameVal = '问答互动数据'
                    } else if (this.$route.query.newsShow == 'userNumber') {
                        if (this.$route.query.userNumber == 'issue') {
                            this.titleNameVal = '用户问题互动数据'
                        } else if (this.$route.query.userNumber == 'answer') {
                            this.titleNameVal = '用户回答互动数据'
                        }
                    } else if (this.$route.query.newsShow == 'auditContent') {
                        this.titleNameVal = '审核回答互动数据'
                    }
                    var self = this
                    self.getsnewsSummaryControllerListQuestionInteractionData({
                        questionId: this.$route.query.id
                    }).then(data => {
                        if (data.code == 200) {
                            self.commentNumVal = data.data.commentCount
                            self.timeList = [
                                { val: '转发数', num: data.data.forwardCount },
                                { val: '收藏数', num: data.data.collectCount },
                                { val: '屏蔽数', num: data.data.shieldCount },
                            ]
                        } else {
                            self.$message(data.message)
                        }
                    }).catch(msg => {
                        self.$message({
                            type: 'info',
                            message: '服务器异常'
                        })
                    })
                    this.getcommentList()
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
            //获取评论列表
            getcommentList() {
                this.checkList = []
                var self = this
                self.getanswersControllerListAnswersDetail({
                    questionId: this.$route.query.id,  //被评论的对象ID
                    pageNo: self.currentPage,  //当前页
                    pageSize: self.pageSizeNum, //每页记录数
                }).then(data => {
                    self.answeesNumList = []
                    if (data.code == 200) {
                        self.totalNum = data.data.total
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                self.answeesNumList = data.data.records
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
                this.getcommentList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getcommentList()
            },
            //返回上一页
            canelClick() {
                this.$router.push({
                    path: '/news/' + this.$route.query.newsShow
                })
            },
            //列表收起
            listPackUpclick() {
                this.islistShow = 0
            },
            //列表展开
            listUnfoldclick() {
                this.islistShow = 1
            },
            //内容
            userContentClick(index) {
                this.answeesContent = this.answeesNumList[index].content
                this.isRuleBox = 1
            },
            //关闭内容弹出框
            cancelRuleBoxClick() {
                this.isRuleBox = 0
            },
            //热评
            hotCommentClick(index) {
                if (this.answeesNumList[index].recommend == '1') {
                    this.UpdatObj = {
                        answerIdJson: '[' + '"' + this.answeesNumList[index].id + '"' + ']', //对象id
                        type: '2', //操作类型（1:热评，2:取消热评）
                    }
                } else if (this.answeesNumList[index].recommend == '2') {
                    this.UpdatObj = {
                        answerIdJson: '[' + '"' + this.answeesNumList[index].id + '"' + ']', //对象id
                        type: '1', //操作类型（1:热评，2:取消热评）
                    }
                }
                this.getUpdateCommentInfoState()
            },
            //显示
            showClick(index) {
                if (this.answeesNumList[index].showState == '1') {
                    this.UpdatObj = {
                        answerIdJson: '[' + '"' + this.answeesNumList[index].id + '"' + ']', //对象id
                        state: '0', //状态：0：是 1：否
                    }
                } else if (this.answeesNumList[index].showState == '0') {
                    this.UpdatObj = {
                        answerIdJson: '[' + '"' + this.answeesNumList[index].id + '"' + ']', //对象id
                        state: '1', //状态：0：是 1：否
                    }
                }
                this.getUpdateCommentInfoState()
            },
            //显示/热评操作接口
            getUpdateCommentInfoState() {
                if (this.isUpdate) {
                    this.isUpdate = false
                    var self = this
                    self.getanswersControllerSetAnswers(
                        self.UpdatObj
                    ).then(data => {
                        self.isUpdate = true
                        if (data.code == 200) {
                            this.getcommentList()
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            self.$message(data.message)
                        }
                    }).catch(msg => {
                        self.isUpdate = true
                        self.$message('服务器异常')
                    })
                }
            },
            ...mapActions(['getsnewsSummaryControllerListQuestionInteractionData', 'getanswersControllerListAnswersDetail', 'getanswersControllerSetAnswers'])
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

    .firstLi {
        background: #f2f4f8;
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

    .list {
        margin-top: 24px;
    }

    .list li {
        display: flex;
        border-right: 1px solid #d1d1d1;
        border-bottom: 1px solid #d1d1d1;
    }

    .listLi>div {
        text-align: center;
        height: 48px;
        line-height: 48px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 4px;
        border-left: 1px solid #d1d1d1;
    }

    .listLi>div:nth-child(1) {
        width: 20%;
    }

    .listLi>div:nth-child(2) {
        width: 20%;
    }

    .listLi>div:nth-child(2) img {
        cursor: pointer;
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
        margin-top: 12px;
        justify-content: space-between;
    }

    .batchCss {
        display: flex;
    }

    .batchBut {
        width: 70px;
        height: 32px;
        border-radius: 4px;
        margin-left: 16px;
        background: #fe5371;
        text-align: center;
        line-height: 32px;
        color: white;
        cursor: pointer;
    }

    .listBut {
        display: flex;
        justify-content: center;
    }

    .listBut div {
        height: 25px;
        width: 25px;
        margin: 0 8px;
        cursor: pointer;
    }

    .batchCss select {
        width: 100px;
        height: 32px;
        line-height: 32px;
        padding-left: 14px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
    }

    select::-ms-expand {
        display: none;
    }

    .ruleBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1;
    }

    .ruleDetails {
        width: 90%;
        max-width: 700px;
        height: 90%;
        max-height: 600px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc(14%) auto;
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
        padding-top: 10px;
        height: calc(100% - 60px);
    }

    .ruleDetailsBottom div {
        border: 1px solid #d1d1d1;
        line-height: 24px;
        margin: 0 auto;
        width: 95%;
        height: 97%;
        padding: 4px;
        border-radius: 4px;
        overflow-y: auto;
        overflow-x: auto;
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