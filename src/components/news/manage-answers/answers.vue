<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="dynamic">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    问答管理
                </div>
                <!-- <div @click="addNewsClick">
                    新增新闻
                </div> -->
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按动态搜索" v-model.trim="headlineVal">
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按作者搜索" v-model.trim="authorVal">
                </div>
                <div class="searBut">
                    <div @click="okSearClick">
                        确定
                    </div>
                    <div @click="resetClick">
                        重置
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="list">
                <ul class="listContent">
                    <li class="listContentTop">
                        <div>
                            <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                            <span>序号</span>
                        </div>
                        <div>
                            标题
                        </div>
                        <div>
                            作者
                        </div>
                        <div>
                            发布时间
                        </div>
                        <div>
                            互动数据
                        </div>
                        <div>
                            推荐
                        </div>
                        <div>
                            操作
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                    <li class="dataLi" v-for="(item,index) in dataList">
                        <div>
                            <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="item" :key="item.articleId">{{index + 1}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-tooltip :disabled="item.title.length > 13 ? false : true" popper-class="toolexam" id="toolselcont" :content="item.title"
                            placement="bottom" effect="light">
                            <div class="dynamicFont">
                                <span @click="dynamicFontClick(index)">
                                    {{item.title}}
                                </span>
                            </div>
                        </el-tooltip>
                        <div :title="item.userName">
                            {{item.userName}}
                        </div>
                        <div :title="item.createData | ctimeFun">
                            {{item.createData | ctimeFun}}
                        </div>
                        <div>
                            <div v-show="item.totalCount == 0">
                                {{item.totalCount}}
                            </div>
                            <span v-show="item.totalCount > 0" class="greenFont" @click="numberClick(index)">
                                {{item.totalCount}}
                            </span>
                        </div>
                        <div>
                            <img @click="recommendClick(index)" v-show="item.recommend == 1" src="/static/img/shi.png" alt="推荐" title="推荐">
                            <img @click="recommendClick(index)" v-show="item.recommend == 2" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <div class="listBut">
                            <div>
                                <img @click="recycleClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="dataList.length > 0">
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
        <!--删除弹出框-->
        <div class="delPopup" v-show="isShowdel">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
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
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [],   //列表数组
                batchVal: '0', //批量操作
                batchList: [
                    { value: '批量删除', key: '0' },
                    { value: '批量推荐', key: '1' },
                    { value: '关闭推荐', key: '2' },
                ],  //批量操作
                isShowdel: false, //删除弹框
                titlename: '', //删除弹框提示语
                headlineVal: '',//文章标题
                authorVal: '', //作者
                okSearShow: false,  //是否执行筛选
                timeShow: false, //时间是否可进行筛选
                idstring: '', //序号
                state: '',  //操作 
                isRecommendUp: true,    //推荐请求接口监视
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1,
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
            },
        },
        // 模块新建时
        created: function () {
            if (sessionStorage.getItem('answersSelect')) {
                this.okSearShow = 1
                var objSelect = JSON.parse(sessionStorage.getItem('answersSelect'))
                this.headlineVal = objSelect.headlineVal
                this.authorVal = objSelect.authorVal
            }
            if (sessionStorage.getItem('answersPag')) {
                var objPag = JSON.parse(sessionStorage.getItem('answersPag'))
                this.pageSizeNum = objPag.pageSizeNum
                this.currentPage = objPag.currentPage
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
                if (arrs.indexOf("answers") == -1) {
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
                    this.getanswersList()
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
            //获取问答列表
            getanswersList() {
                var self = this
                this.checked = false
                this.checkList = []
                self.getquestionsControllerListQuestions({
                    title: self.headlineVal,     //标题
                    name: self.authorVal,    //作者
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    self.dataList = []
                    if (data.code == 200) {
                        sessionStorage.removeItem('answersSelect')
                        sessionStorage.removeItem('answersPag')
                        self.totalNum = data.data.total
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                self.dataList = data.data.records
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message("服务器异常")
                })
            },
            //筛选
            okSearClick() {
                if (this.headlineVal == '' && this.authorVal == '') {
                    this.$message('请先选择筛选条件')
                } else {
                    this.okSearShow = 1
                    this.pageSizeNum = 10
                    this.currentPage = 1
                    this.getanswersList()
                }
            },
            //重置筛选
            resetClick() {
                this.headlineVal = ''
                this.authorVal = ''
                if (this.okSearShow == 1) {
                    this.okSearShow = 0
                    this.pageSizeNum = 10
                    this.currentPage = 1
                    this.getanswersList()
                }
            },
            //分页
            handleSizeChange(val) {
                if (this.okSearShow == 0) {
                    this.headlineVal = ''
                    this.authorVal = ''
                }
                this.pageSizeNum = val
                this.getanswersList()
            },
            handleCurrentChange(val) {
                if (this.okSearShow == 0) {
                    this.headlineVal = ''
                    this.authorVal = ''
                }
                this.currentPage = val
                this.getanswersList()
            },
            //标题点击
            dynamicFontClick(index) {
                this.$router.push({
                    path: '/news/newsdetails',
                    query: {
                        id: this.dataList[index].id,
                        newsShow: 'answers'
                    }
                })
                if (this.okSearShow) {
                    var objOne = {
                        headlineVal: this.headlineVal,
                        authorVal: this.authorVal
                    }
                    var srtOne = JSON.stringify(objOne)
                    sessionStorage.setItem('answersSelect', srtOne)
                }
                var objTwo = {
                    pageSizeNum: this.pageSizeNum,
                    currentPage: this.currentPage
                }
                var srtTwo = JSON.stringify(objTwo)
                sessionStorage.setItem('answersPag', srtTwo)
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                this.idstring = JSON.stringify(a)
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                this.idstring = JSON.stringify(a)
            },
            //批量操作
            batchClick() {
                if (this.checkList.length > 0) {
                    if (this.batchVal == 0) {
                        this.titlename = '这些回答将被删除，该操作不可恢复'
                        this.isShowdel = true
                    } else if (this.batchVal == 1) {
                        this.state = 2
                        this.getRecommendQuestions()
                    } else if (this.batchVal == 2) {
                        this.state = 1
                        this.getRecommendQuestions()
                    }
                } else {
                    this.$message('请先选择序号')
                }
            },
            //推荐
            recommendClick(index) {
                this.idstring = '["' + this.dataList[index].id + '"]'
                if (this.dataList[index].recommend == 1) {
                    this.state = 2
                } else if (this.dataList[index].recommend == 2) {
                    this.state = 1
                }
                this.getRecommendQuestions()
            },
            //推荐接口
            getRecommendQuestions() {
                if (this.isRecommendUp) {
                    this.isRecommendUp = false
                    var self = this
                    self.getsquestionsControllerRecommendQuestions({
                        questionIdJson: self.idstring,
                        state: self.state,
                    }).then(data => {
                        self.isRecommendUp = true
                        if (data.code == 200) {
                            this.getanswersList()
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            self.$message(data.message)
                        }
                    }).catch(msg => {
                        this.isRecommendUp = true
                        self.$message('服务器异常')
                    })
                }
            },
            //删除
            recycleClick(index) {
                this.isShowdel = true
                this.titlename = '此回答将被删除，该操作不可恢复'
                this.idstring = '["' + this.dataList[index].id + '"]'
            },
            //取消删除
            canleClick() {
                this.isShowdel = false
            },
            //确定删除
            okClick() {
                // this.isShowdel = false
                this.getDeleteQuestions()
            },
            //删除问答接口
            getDeleteQuestions() {
                var self = this
                self.getquestionsControllerDeleteQuestions({
                    idJson: self.idstring,
                }).then(data => {
                    if (data.code == 200) {
                        this.getanswersList()
                        this.isShowdel = false
                        self.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //互动数据
            numberClick(index) {
                if (this.dataList[index].totalCount > 0) {
                    this.$router.push({
                        path: '/news/answersNumber',
                        query: {
                            id: this.dataList[index].id,
                            newsShow: 'answers'
                        }
                    })
                    if (this.okSearShow) {
                        var objOne = {
                            headlineVal: this.headlineVal,
                            authorVal: this.authorVal
                        }
                        var srtOne = JSON.stringify(objOne)
                        sessionStorage.setItem('answersSelect', srtOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var srtTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem('answersPag', srtTwo)
                } else {
                    this.$message({
                        type: 'info',
                        message: '暂无互动数据'
                    })
                }
            },
            ...mapActions(['getquestionsControllerListQuestions', 'getsquestionsControllerRecommendQuestions', 'getquestionsControllerDeleteQuestions'])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .dynamic {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .dynamic>div:nth-child(1) {
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
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
    }

    .head>div:nth-child(1) {
        float: left;
        color: #303030;
        font-size: 16px;
        font-weight: 600;
        margin-top: 12px;
    }

    .head>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        margin-top: 14px;
        border: 1px solid #fe5371;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #fe5371;
        cursor: pointer;
    }

    .search {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    .search>div {
        margin-top: 10px;
        margin-right: 18px;
    }

    .batchCss select {
        width: 100px;
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 85% 8px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
    }

    select::-ms-expand {
        display: none;
    }

    .searchBox {
        height: 32px;
        line-height: 32px;
        border: 1px solid #aeaeae;
        border-radius: 3px;
        padding-left: 8px;
        width: 180px;
    }

    .searchBox input {
        border: none;
        height: 26px;
        width: 80%;
    }

    .searchBox input::-webkit-input-placeholder {
        color: #aeaeae;
    }

    .searchBox input:-moz-input-placeholder {
        color: #aeaeae;
    }

    .searchBox input::-moz-input-placeholder {
        color: #aeaeae;
    }

    .searchBox input:-ms-input-placeholder {
        color: #aeaeae;
    }

    .list {
        min-height: 550px;
    }

    .list>div {
        margin: 0 auto;
    }

    .dynamicFont {
        padding: 0 4px;
    }

    .dynamicFont span {
        color: green;
        cursor: pointer;
    }

    .searBut {
        display: flex;
        width: 158px;
        justify-content: space-between;
        margin-right: 0!important;
    }

    .searBut div {
        height: 32px;
        width: 70px;
        line-height: 32px;
        text-align: center;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }

    .searBut div:nth-child(1) {
        background: #fe5371;
    }

    .searBut div:nth-child(2) {
        background: #a3a3a3
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

    /*列表*/

    .listContent {
        overflow: hidden;
    }

    .listContentTop {
        border-top: 1px solid #e5e7eb;
        font-size: 16px;
        font-weight: bold;
        background: #f2f4f8
    }

    .listContent li {
        display: flex;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(1) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(2) {
        width: 30%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 12%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) {
        width: 12%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(5) {
        width: 12%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(6) {
        width: 12%;
        border-right: 1px solid #e5e7eb;
    }

    .greenFont {
        color: green;
        cursor: pointer;
    }

    .listContent li>div:nth-child(7) {
        width: 12%;
    }

    .listContent li>div:nth-child(7) img,
    .listContent li>div:nth-child(6) img {
        cursor: pointer;
    }


    .listContent li>div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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

    /* 删除弹框 */

    .delPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1000000;
    }

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
</style>