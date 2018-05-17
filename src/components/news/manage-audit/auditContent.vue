<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="auditCard">
        <div>
            <!-- 头部 -->
            <div class="head">
                <img @click="canelClick" src="/static/img/fan.png" alt=""> 查看审核内容
            </div>
            <div class="headSelect">
                <div @click="selectClick(index)" :class="{selectOK: selectShow == index}" v-for="(item,index) in selectList">
                    {{item}}
                </div>
            </div>
            <div class="list" v-show="videoShow == 1">
                <ul>
                    <li class="selectLi fristLi">
                        <div>序号</div>
                        <div>{{titleName}}</div>
                        <div>发布时间</div>
                        <div>作者</div>
                        <div>
                            互动次数
                        </div>
                        <div>
                            推荐状态
                        </div>
                        <div>不喜欢次数</div>
                    </li>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                    <li class="selectLi" v-for="(item,index) in dataList">
                        <div>{{index+1}}</div>
                        <div class="greenFont">
                            <img @click="titleClick(index)" src="/static/img/查看.png" alt="查看" title="查看">
                        </div>
                        <div>{{item.updateDate | timeFun}}</div>
                        <div>{{item.name}}</div>
                        <div>
                            <div v-if='item.totalCount == 0'>
                                {{item.totalCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="totalCountClick(index)">
                                    {{item.totalCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            {{item.commendNumber}}
                        </div>
                        <div>{{item.shieldCount}}</div>
                    </li>
                </ul>
            </div>
            <div class="list" v-show="videoShow == 2">
                <ul>
                    <li class="selectTwoLi fristLi">
                        <div>序号</div>
                        <div>内容</div>
                        <div>发布时间</div>
                        <div>作者</div>
                        <div>被赞次数</div>
                        <div>收藏次数</div>
                    </li>
                    <li class="selectTwoLi" v-for="(item,index) in dataList">
                        <div>{{index+1}}</div>
                        <div class="greenFont">
                            <img @click="titleClick(index)" src="/static/img/查看.png" alt="查看" title="查看">
                        </div>
                        <div>{{item.updateDate | timeFun}}</div>
                        <div>{{item.userName}}</div>
                        <div>
                            {{item.praiseCount}}
                        </div>
                        <div>
                            {{item.collectCount}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list" v-show="videoShow == 3">
                <ul>
                    <li class="videoLi fristLi">
                        <div>序号</div>
                        <div>标题</div>
                        <div>视频</div>
                        <div>发布时间</div>
                        <div>作者</div>
                        <div>互动次数</div>
                        <div>推荐状态</div>
                        <div>不喜欢次数</div>
                    </li>
                    <li class="videoLi" v-for="(item,index) in dataList">
                        <div>{{index+1}}</div>
                        <el-tooltip :disabled="item.title && item.title.length > 11 ? false : true" popper-class="toolexam" id="toolselcont" :content="item.title"
                            placement="bottom" effect="light">
                            <div>
                                {{item.title}}
                            </div>
                        </el-tooltip>
                        <div>
                            <div>
                                <img @click="videoExamine(index)" src="/static/img/查看.png" alt="查看" title="查看视频">
                            </div>
                        </div>
                        <div :title="item.createDate | timeFun">{{item.createDate | timeFun}}</div>
                        <div>{{item.author}}</div>
                        <div>
                            <div v-show="item.totalCount == 0">
                                {{item.totalCount}}
                            </div>
                            <span @click="totalCountClick(index)" class="greenFont" v-show="item.totalCount > 0">
                                {{item.totalCount}}
                            </span>
                        </div>
                        <div>
                            {{item.recommendCount}}
                        </div>
                        <div>{{item.shieldCount}}</div>
                    </li>
                </ul>
            </div>
            <!-- 底部分页 -->
            <div class="lastLi" v-show="dataList.length > 0">
                <div></div>
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                </div>
            </div>
        </div>
        <!-- 视频弹出框 -->
        <div class="delPopup" v-show="isvideo">
            <div class="videoBox">
                <div>
                    {{delPopupName}}
                    <div @click="closeVideoClick" class="closeVideo">+</div>
                </div>
                <div class="videoBoxTwo">
                    <video v-show="selectShow == 1" :src="videoSrc" controls="controls"></video>
                    <audio v-show="selectShow == 3" :src="videoSrc" controls="controls"></audio>
                    <!-- <div v-show="selectShow == 3" v-html="videoSrc"></div> -->
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
                selectShow: 0,
                selectList: ["动态", "视频", "问题", "回答"], //头部teb切换
                titleName: "动态", //列表动态、标题、内容切换
                dataList: [], //切换的列表
                videoShow: "1", //视频列表与其他三个列表的切换
                isvideo: 0, //视频弹出框
                videoSrc: "", //视频路径
                delPopupName: '',   //弹出框标题
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1
            };
        },
        // 过滤
        filters: {
            //返回时间过滤
            timeFun: function (val) {
                if (val) {
                    var standardTime = new Date(val);
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
            }
        },
        // 模块新建时
        created: function () {
            sessionStorage.removeItem('numberComment')
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
                if (arrs.indexOf("audit") == -1) {
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
                    if (sessionStorage.getItem('auditContents')) {
                        var obj = JSON.parse(sessionStorage.getItem('auditContents'))
                        this.pageSizeNum = obj.pageSizeNum
                        this.currentPage = obj.currentPage
                        this.selectShow = obj.selectShow
                        if (this.selectShow == 0) {
                            this.titleName = "动态";
                            this.videoShow = 1;
                            this.getdynamicListFun();
                        } else if (this.selectShow == 1) {
                            this.videoShow = 3;
                            this.getvideoListFun()
                            this.getvideoListFun();
                        } else if (this.selectShow == 2) {
                            this.titleName = "标题";
                            this.videoShow = 1;
                            this.getquestionListFun();
                        } else if (this.selectShow == 3) {
                            this.videoShow = 2;
                            this.getSelectAnswersList();
                        }
                    } else {
                        this.getdynamicListFun();
                    }
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
            // 获取动态列表
            getdynamicListFun() {
                var self = this;
                self
                    .getuserSummaryControllerselectArticleList({
                        type: "1",
                        userId: sessionStorage.getItem('auditId'),
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    })
                    .then(data => {
                        self.dataList = []
                        if (data.code == 200) {
                            sessionStorage.removeItem('auditContents')
                            if (data.data.records) {
                                self.dataList = data.data.records;
                                self.totalNum = data.data.total;
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            // 获取问题列表
            getquestionListFun() {
                var self = this;
                self
                    .getuserSummaryControllerselectQuestionList({
                        userId: sessionStorage.getItem('auditId'),
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    })
                    .then(data => {
                        if (data.code == 200) {
                            sessionStorage.removeItem('auditContents')
                            if (data.data.records) {
                                self.dataList = data.data.records;
                                self.totalNum = data.data.total;
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            // 获取视频列表
            getvideoListFun() {
                var self = this;
                self
                    .getuserSummaryControllerselectVideoByUserId({
                        userId: sessionStorage.getItem('auditId'),
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    })
                    .then(data => {
                        if (data.code == 200) {
                            sessionStorage.removeItem('auditContents')
                            if (data.data.records) {
                                self.dataList = data.data.records;
                                self.totalNum = data.data.total;
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            //获取回答列表
            getSelectAnswersList() {
                var self = this
                self.getuserSummaryControllerSelectAnswersList({
                    userId: sessionStorage.getItem('auditId'),
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    this.userNumList = []
                    if (data.code == 200) {
                        sessionStorage.removeItem('auditContents')
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                self.dataList = data.data.records;
                                self.totalNum = data.data.total;
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            // 箭头返回上一页
            canelClick() {
                this.$router.push({
                    path: "/news/audit"
                });
            },
            //分页
            handleSizeChange(val) {
                var self = this
                this.pageSizeNum = val
                if (self.selectShow == 0) {
                    this.getdynamicListFun()
                } else if (self.selectShow == 1) {
                    this.getvideoListFun()
                } else if (self.selectShow == 2) {
                    this.getquestionListFun()
                    console.log("每页条数")
                } else if (self.selectShow == 3) {
                    this.getSelectAnswersList()
                }
            },
            handleCurrentChange(val) {
                var self = this
                this.currentPage = val
                if (self.selectShow == 0) {
                    this.getdynamicListFun()
                } else if (self.selectShow == 1) {
                    this.getvideoListFun()
                } else if (self.selectShow == 2) {
                    this.getquestionListFun()
                    console.log("当前页")
                } else if (self.selectShow == 3) {
                    this.getSelectAnswersList()
                }
            },
            //选择点击  
            selectClick(index) {
                var self = this;
                self.pageSizeNum = 10
                self.currentPage = 1
                self.selectShow = index;
                if (self.selectShow == 0) {
                    this.titleName = "动态";
                    this.videoShow = 1;
                    this.getdynamicListFun()
                } else if (self.selectShow == 1) {
                    this.videoShow = 3;
                    this.getvideoListFun()
                } else if (self.selectShow == 2) {
                    this.titleName = "标题";
                    this.videoShow = 1;
                    this.getquestionListFun()
                } else if (self.selectShow == 3) {
                    this.videoShow = 2;
                    this.getSelectAnswersList()
                }
            },
            //动态/标题/内容点击
            titleClick(index) {
                if (this.selectShow == 0) {
                    this.$router.push({
                        path: '/news/newsdetails',
                        query: {
                            id: this.dataList[index].newsId,
                            newsShow: 'auditContent',
                            auditContent: 'auditDynamic'
                        }
                    })
                    sessionStorage.setItem("nameVal",this.dataList[index].name)
                    sessionStorage.setItem("updateDateVal",this.dataList[index].updateDate)
                    sessionStorage.setItem("contentVal",this.dataList[index].content)
                } else if (this.selectShow == 2) {
                    this.$router.push({
                        path: '/news/newsdetails',
                        query: {
                            id: this.dataList[index].questionId,
                            newsShow: 'auditContent',
                            auditContent: 'auditIssue'
                        }
                    })
                } else if (this.selectShow == 3) {
                    this.delPopupName = '回答详情'
                    this.isvideo = 1;
                    this.videoSrc = this.dataList[index].content
                }
                var obj = {
                    pageSizeNum: this.pageSizeNum,
                    currentPage: this.currentPage,
                    selectShow: this.selectShow,
                }
                var str = JSON.stringify(obj)
                sessionStorage.setItem('auditContents', str)
            },
            //互动数据
            totalCountClick(index) {
                if (this.dataList[index].totalCount > 0) {
                    if (this.selectShow == 0) {
                        this.$router.push({
                            path: '/news/newsNumber',
                        })
                        var arr = {
                            id: this.dataList[index].newsId,
                            newsShow: 'auditContent',
                        }
                        var obj = JSON.stringify(arr)
                        sessionStorage.setItem("numberComment", obj)
                    } else if (this.selectShow == 1) {
                        this.$router.push({
                            path: '/news/videoNumber',
                        })
                        var objEidt = {
                            videoNumber: this.dataList[index],
                            newsShow: 'auditContent',
                        }
                        var srtEidt = JSON.stringify(objEidt)
                        sessionStorage.setItem("numberComment", srtEidt);
                    } else if (this.selectShow == 2) {
                        this.$router.push({
                            path: '/news/answersNumber',
                            query: {
                                id: this.dataList[index].questionId,
                                newsShow: 'auditContent',
                            }
                        })
                    }
                    var obj = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage,
                        selectShow: this.selectShow,
                    }
                    var str = JSON.stringify(obj)
                    sessionStorage.setItem('auditContents', str)
                }
            },
            //查看视频
            videoExamine(index) {
                this.delPopupName = '视频详情'
                this.isvideo = 1;
                this.videoSrc = this.dataList[index].content
            },
            //关闭视频弹出框
            closeVideoClick() {
                this.isvideo = 0;
                this.videoSrc = "";
            },
            ...mapActions(["getuserSummaryControllerselectArticleList", 'getuserSummaryControllerselectQuestionList', 'getuserSummaryControllerselectVideoByUserId', 'getuserSummaryControllerSelectAnswersList'])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .auditCard {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .auditCard>div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .head {
        height: 58px;
        display: flex;
        overflow: hidden;
        line-height: 58px;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        font-size: 16px;
        font-weight: bold;
    }

    .head img {
        margin-right: 12px;
        cursor: pointer;
    }

    .headSelect {
        height: 32px;
        padding: 24px 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .headSelect div {
        width: 69px;
        height: 31px;
        text-align: center;
        line-height: 31px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        margin-right: 24px;
        cursor: pointer;
    }

    .headSelect div:hover {
        color: white;
        background: #f84848;
        border: 1px solid #f84848;
    }

    .selectOK {
        color: white;
        background: #f84848;
        border: 1px solid #f84848 !important;
    }

    .list {
        margin-top: 12px;
    }

    .list li {
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #d1d1d1;
        border-bottom: 1px solid #d1d1d1;
    }

    .list li>div {
        border-left: 1px solid #d1d1d1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .fristLi {
        border-top: 1px solid #d1d1d1;
        background: #e5e7eb;
    }

    .selectLi>div:nth-child(1) {
        width: 15%;
    }

    .selectLi>div:nth-child(2) {
        width: 15%;
    }

    .selectLi>div:nth-child(3) {
        width: 20%;
    }

    .selectLi>div:nth-child(4) {
        width: 15%;
    }

    .selectLi>div:nth-child(5) {
        width: 15%;
    }

    .selectLi>div:nth-child(6) {
        width: 15%;
    }

    .selectLi>div:nth-child(7) {
        width: 15%;
    }

    .selectTwoLi>div:nth-child(1) {
        width: 15%;
    }

    .selectTwoLi>div:nth-child(2) {
        width: 15%;
    }

    .selectTwoLi>div:nth-child(3) {
        width: 20%;
    }

    .selectTwoLi>div:nth-child(4) {
        width: 20%;
    }

    .selectTwoLi>div:nth-child(5) {
        width: 15%;
    }

    .selectTwoLi>div:nth-child(6) {
        width: 15%;
    }

    .videoLi>div:nth-child(1) {
        width: 9%;
    }

    .videoLi>div:nth-child(2) {
        width: 24%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .videoLi>div:nth-child(3) {
        width: 10%;
    }

    .videoLi>div:nth-child(3) img {
        cursor: pointer;
    }

    .videoLi>div:nth-child(4) {
        width: 15%;
    }

    .videoLi>div:nth-child(5) {
        width: 10%;
    }

    .videoLi>div:nth-child(6) {
        width: 10%;
    }

    .videoLi>div:nth-child(7) {
        width: 11%;
    }

    .videoLi>div:nth-child(8) {
        width: 11%;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }

    .delPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000000;
    }

    .videoBox {
        width: 700px;
        height: 490px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 580px) / 2) auto;
        z-index: 100000;
    }

    .videoBox>div:nth-child(1) {
        width: 700px;
        height: 59px;
        border-bottom: 1px solid #d1d1d1;
        line-height: 59px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        position: relative;
    }

    .closeVideo {
        color: red;
        font-size: 50px;
        position: absolute;
        font-weight: normal;
        top: 0;
        right: 20px;
        transform: rotate(45deg);
        cursor: pointer;
    }

    .videoBoxTwo {
        height: 420px;
        padding: 0 10px;
        overflow: hidden;
        overflow-x: auto;
        overflow-y: auto;
    }

    .videoBoxTwo video,
    .videoBoxTwo div {
        width: 100%;
        height: 95%;
    }

    .greenFont {
        color: green;
        cursor: pointer;
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