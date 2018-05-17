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
            <div class="comment">
                评论次数：{{commentNumberVal}}
            </div>
            <!-- 列表 -->
            <div class="list">
                <ul>
                    <li class="listLi listFirst">
                        <div>
                            <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                            <span>序号</span>
                        </div>
                        <div>
                            评论人
                        </div>
                        <div>
                            内容
                        </div>
                        <div>
                            回复数
                        </div>
                        <div>
                            热评
                        </div>
                        <div>
                            显示
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="newsNumList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                    <li class="listLi" v-for="(items,index) in newsNumList">
                        <div>
                            <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="items" :key="items.id">{{index + 1}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div>
                            {{items.userName}}
                        </div>
                        <el-tooltip :disabled="items.content.length > 12 ? false : true" popper-class="toolexam" id="toolselcont" :content="items.content"
                            placement="bottom" effect="light">
                            <div>
                                {{items.content}}
                            </div>
                        </el-tooltip>
                        <div>
                            <div v-show="items.replyCount == 0">
                                {{items.replyCount}}
                            </div>
                            <span v-show="items.replyCount > 0" @click="CountClick(index)">
                                {{items.replyCount}}
                            </span>
                        </div>
                        <div>
                            <img @click="hotCommentClick(index)" v-show="items.hotReview == 0" src="/static/img/shi.png" alt="热评" title="热评">
                            <img @click="hotCommentClick(index)" v-show="items.hotReview == 1" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <div>
                            <img @click="showClick(index)" v-show="items.display == 0" src="/static/img/shi.png" alt="显示" title="显示">
                            <img @click="showClick(index)" v-show="items.display == 1" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="newsNumList.length > 0">
                    <div class="batchCss">
                        <div>
                            <select v-model="batchVal">
                                <option v-for="(type,index) in batchList" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                            </select>
                        </div>
                        <div class="batchBut" @click="batchClick">
                            确定
                        </div>
                    </div>
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
                timeList: [],   //次数循环
                newsNumList: [],    //评论列表
                commentNumberVal: "", //评论次数
                checked: false, //选取全部序号
                checkList: [], //序号选取
                batchVal: '0', //底部分页
                operation: '',  //操作类型（0：热评，1：显示）
                state: '', //状态：0：是 1：否
                batchList: [
                    { value: '批量热评', key: '0' },
                    { value: '关闭热评', key: '1' },
                    { value: '批量显示', key: '2' },
                    { value: '停止显示', key: '3' },
                ],  //操作选项
                titleNameVal: '',   //标题名称
                numberArr: '',  //跳转数据
                isHotShowUp: true,  //评论显示接口判断
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
                if (arrs.indexOf("newsList") == -1 && arrs.indexOf("audit") == -1 && arrs.indexOf("user") == -1) {
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
                    if (sessionStorage.getItem('newsNumberPage')) {
                        var objPage = JSON.parse(sessionStorage.getItem('newsNumberPage'))
                        this.currentPage = objPage.currentPage
                        this.pageSizeNum = objPage.pageSizeNum
                    }
                    this.numberArr = JSON.parse(sessionStorage.getItem('numberComment'))
                    if (this.numberArr.newsShow == 'newsList') {
                        this.titleNameVal = '新闻互动数据'
                    } else if (this.numberArr.newsShow == 'userNumber') {
                        this.titleNameVal = '用户文章互动数据'
                    } else if (this.numberArr.newsShow == 'auditContent') {
                        this.titleNameVal = '审核动态互动数据'
                    }
                    var self = this
                    self.getSummaryControllerListNewsInteractionData({
                        newsId: this.numberArr.id
                    }).then(data => {
                        if (data.code == 200) {
                            self.commentNumberVal = data.data.commentCount
                            self.timeList = [
                                { val: '点赞数', num: data.data.praiseCount },
                                { val: '转发数', num: data.data.forwardCount },
                                { val: '收藏数', num: data.data.collectCount },
                                { val: '阅读数', num: data.data.operationCount },
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
                this.checked = false
                var self = this
                self.getcommentsInfofindCommentsByObjectId({
                    objectId: this.numberArr.id,  //被评论的对象ID
                    current: self.currentPage,  //当前页
                    size: self.pageSizeNum, //每页记录数
                    limit: 0,           //评论的回复列表条数（不需要回复，传0）
                    type: 5,        //	评论类型：0：新闻、1：商城、2：医生、3：圈子、4：视频、5：新闻-动态
                }).then(data => {
                    self.newsNumList = []
                    if (data.code == 200) {
                        sessionStorage.removeItem('newsNumberPage')
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                self.newsNumList = data.data.records
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
                    path: '/news/' + this.numberArr.newsShow
                })
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.newsNumList : [];
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                this.idstring = a.join(",");
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.newsNumList.length;
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                this.idstring = a.join(",");
            },
            //热评
            hotCommentClick(index) {
                if (this.isHotShowUp) {
                    if (this.newsNumList[index].hotReview == 0) {
                        this.operation = 0
                        this.state = 1
                    } else if (this.newsNumList[index].hotReview == 1) {
                        this.operation = 0
                        this.state = 0
                    }
                    this.idstring = this.newsNumList[index].id
                    this.getUpdateCommentInfoState()
                }
            },
            //显示
            showClick(index) {
                if (this.isHotShowUp) {
                    if (this.newsNumList[index].display == 1) {
                        this.operation = 1
                        this.state = 0
                    } else if (this.newsNumList[index].display == 0) {
                        this.operation = 1
                        this.state = 1
                    }
                    this.idstring = this.newsNumList[index].id
                    this.getUpdateCommentInfoState()
                }
            },
            //批量操作
            batchClick() {
                if (this.checkList.length == 0) {
                } else {
                    if (this.batchVal == "0") {
                        this.operation = 0
                        this.state = 0
                    } else if (this.batchVal == "1") {
                        this.operation = 0
                        this.state = 1
                    } else if (this.batchVal == "2") {
                        this.operation = 1
                        this.state = 0
                    } else if (this.batchVal == "3") {
                        this.operation = 1
                        this.state = 1
                    }
                    this.getUpdateCommentInfoState()
                }
            },
            //显示/热评操作接口
            getUpdateCommentInfoState() {
                this.isHotShowUp = false
                var self = this
                self.getcommentsInfofindUpdateCommentInfoState({
                    operationObject: 0, //操作对象（0：评论，1：回复）
                    objectIdJson: self.idstring, //对象id
                    operationType: self.operation, //操作类型（0：热评，1：显示）
                    state: self.state, //状态：0：是 1：否
                }).then(data => {
                    self.isHotShowUp = true
                    if (data.code == 200) {
                        self.getcommentList()
                        self.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.isHotShowUp = true
                    self.$message('服务器异常')
                })
            },
            //回复数量
            CountClick(index) {
                if (this.newsNumList[index].replyCount > 0) {
                    if (this.numberArr.newsShow == 'newsList') {
                        this.$router.push({
                            path: '/news/newsReply',
                            query: {
                                id: this.newsNumList[index].id,
                                newsShow: 'newsNumber',
                            }
                        })
                    } else if (this.numberArr.newsShow == 'userNumber') {
                        this.$router.push({
                            path: '/news/newsReply',
                            query: {
                                id: this.newsNumList[index].id,
                                newsShow: 'userNumber',
                            }
                        })
                    } else if (this.numberArr.newsShow == 'auditContent') {
                        this.$router.push({
                            path: '/news/newsReply',
                            query: {
                                id: this.newsNumList[index].id,
                                newsShow: 'auditContent',
                            }
                        })
                    }
                    var obj = {
                        currentPage: this.currentPage,
                        pageSizeNum: this.pageSizeNum
                    }
                    var str = JSON.stringify(obj)
                    sessionStorage.setItem('newsNumberPage', str)
                } else {
                    this.$message('暂无回复数量')
                }
            },
            ...mapActions(['getSummaryControllerListNewsInteractionData', 'getcommentsInfofindCommentsByObjectId', 'getcommentsInfofindUpdateCommentInfoState'])
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

    .list li {
        display: flex;
        border-left: 1px solid #d1d1d1;
        border-right: 1px solid #d1d1d1;
        border-bottom: 1px solid #d1d1d1;
    }

    .listFirst {
        background: #f2f4f8;
        border-top: 1px solid #d1d1d1;
    }

    .comment {
        height: 32px;
        font-size: 16px;
        font-weight: bold;
        line-height: 32px;
        margin-top: 16px;
    }

    .listLi>div {
        text-align: center;
        height: 48px;
        line-height: 48px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 4px;
    }

    .listLi>div:nth-child(1) {
        width: 15%;
    }

    .listLi>div:nth-child(2) {
        width: 15%;
        border-left: 1px solid #d1d1d1;
    }

    .listLi>div:nth-child(3) {
        width: 25%;
        border-left: 1px solid #d1d1d1;
    }

    .listLi>div:nth-child(4) {
        width: 15%;
        border-left: 1px solid #d1d1d1;
    }

    .listLi>div:nth-child(4) span {
        color: green;
        cursor: pointer;
    }

    .listLi>div:nth-child(5) {
        width: 15%;
        border-left: 1px solid #d1d1d1;
    }

    .listLi>div:nth-child(5) img {
        cursor: pointer;
    }

    .listLi>div:nth-child(6) {
        width: 15%;
        border-left: 1px solid #d1d1d1;
    }

    .listLi>div:nth-child(6) img {
        cursor: pointer;
    }

    .lastLi {
        height: 60px;
        display: flex;
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