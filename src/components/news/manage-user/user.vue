<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="user">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    用户管理
                </div>
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div>
                    <select v-model="selOneVal">
                        <option v-for="(type,index) in selOneList" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                    </select>
                </div>
                <div>
                    <select v-model="headlineVal">
                        <option v-for="(type,index) in selTwoList" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按姓名搜索" v-model.trim="authorVal">
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
                            昵称
                        </div>
                        <div>
                            姓名
                        </div>
                        <div>
                            是否大V
                        </div>
                        <div>
                            文章
                        </div>
                        <div>
                            动态
                        </div>
                        <div>
                            问题
                        </div>
                        <div>
                            回答
                        </div>
                        <div>
                            违规
                        </div>
                        <div>
                            推荐
                        </div>
                        <div>
                            禁言
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                    <li v-for="(item,index) in dataList">
                        <div>
                            <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="item" :key="item.userId">{{index + 1}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="dynamicFont">
                            {{item.nickName}}
                        </div>
                        <div>
                            {{item.userName}}
                        </div>
                        <div>
                            {{item.whetherV | whetherVFun}}
                        </div>
                        <div>
                            <div v-if="item.articleCount == 0">
                                {{item.articleCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="articleClick(index)">
                                    {{item.articleCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div v-if="item.dynamicCount == 0">
                                {{item.dynamicCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="dynamicClick(index)">
                                    {{item.dynamicCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div v-if="item.questionCount == 0">
                                {{item.questionCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="issueClick(index)">
                                    {{item.questionCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div v-if="item.answerCount == 0">
                                {{item.answerCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="answerClick(index)">
                                    {{item.answerCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div v-if="item.illegalCount == 0">
                                {{item.illegalCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="ruleClick(index)">
                                    {{item.illegalCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            <img v-show="item.excellentAnswer == 0" @click="recommendClick(index)" src="/static/img/shi.png" alt="推荐" title="推荐">
                            <img v-show="item.excellentAnswer == 1" @click="recommendClick(index)" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <div>
                            <img v-show="item.state == 1" @click="forbidClick(index)" src="/static/img/shi.png" alt="禁言" title="禁言">
                            <img v-show="item.state == 0 || item.state == 2 " @click="forbidClick(index)" src="/static/img/fou.png" alt="关闭" title="关闭">
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
    </div>
</template>
<script>
    import Vue from "vue";
    import { mapActions } from "vuex";
    export default {
        data() {
            return {
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [],   //列表数组
                selOneVal: '0', //查询类型(0全部,1加V,2不加V,3文章最多,4动态最多,5问题最多,6回答最多)
                selOneList: [
                    { value: '全部', key: '0' },
                    { value: '加V', key: '1' },
                    { value: '不加V', key: '2' },
                    { value: '文章最多', key: '3' },
                    { value: '动态最多', key: '4' },
                    { value: '问题最多', key: '5' },
                    { value: '回答最多', key: '6' },
                ], //第一个下拉数组
                selTwoList: [
                    { value: '请选择搜索条件', key: '' },
                    { value: '按姓名搜索用户', key: '0' },
                    { value: '按昵称搜索用户', key: '1' },
                ],
                headlineVal: '',//按姓名/昵称搜索
                authorVal: '', //姓名/昵称关键字
                batchVal: '0', //批量操作
                batchList: [
                    { value: '批量推荐', key: '0' },
                    { value: '关闭推荐', key: '1' },
                    { value: '批量禁言', key: '2' },
                    { value: '关闭禁言', key: '3' },
                ],  //批量操作
                okSearShow: false,  //是否进行筛选
                type: '',   //操作状态；0-是；1-否
                idstring: '', //序号选择
                isRecomUp: true,//推荐请求监视
                isBlockUp: true,//禁言请求监视
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1,
            };
        },
        // 过滤
        filters: {
            whetherVFun: function (val) {
                if (val == 0) {
                    return '是'
                } else if (val == 1) {
                    return '否'
                } else {
                    return val
                }
            }
        },
        // 模块新建时
        created: function () {
            sessionStorage.removeItem("userNumber")
            if (sessionStorage.getItem('userSelect')) {
                this.okSearShow = true
                var objSelect = JSON.parse(sessionStorage.getItem('userSelect'))
                this.selOneVal = objSelect.selOneVal
                this.headlineVal = objSelect.headlineVal
                this.authorVal = objSelect.authorVal
            }
            if (sessionStorage.getItem('userPag')) {
                var objPag = JSON.parse(sessionStorage.getItem('userPag'))
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
                    this.getuserList()
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
            //获取用户列表
            getuserList() {
                this.checked = false
                this.checkList = []
                var self = this
                self.getsuserSummaryControllerListUserSummary({
                    sortFieldType: self.selOneVal,   //查询类型(0全部,1加V,2不加V,3文章最多,4动态最多,5问题最多,6回答最多)
                    type: self.headlineVal, //用户姓名
                    nickNameOrName: self.authorVal, //用户昵称
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    this.dataList = []
                    if (data.code == 200) {
                        sessionStorage.removeItem('userSelect')
                        sessionStorage.removeItem('userPag')
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                this.dataList = data.data.records
                                this.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //筛选
            okSearClick() {
                if (this.selOneVal == 0 && this.headlineVal == '' && this.authorVal == '') {
                    this.headlineVal = this.authorVal = ''
                } else if (this.selOneVal == 0 && (this.headlineVal == '' || this.authorVal == '')) {
                    this.headlineVal = this.authorVal = ''
                } else {
                    if(this.headlineVal == '' || this.authorVal == ''){
                        this.headlineVal = this.authorVal = ''
                    }
                    this.okSearShow = 1
                    this.pageSizeNum = 10
                    this.currentPage = 1
                    this.getuserList()
                }
            },
            //重置筛选
            resetClick() {
                this.selOneVal = '0'
                this.headlineVal = ''
                this.authorVal = ''
                if (this.okSearShow == 1) {
                    this.okSearShow = 0
                    this.pageSizeNum = 10
                    this.currentPage = 1
                    this.getuserList()
                }
            },
            //分页
            handleSizeChange(val) {
                if (this.okSearShow == 0) {
                    this.selOneVal = '0'
                    this.headlineVal = ''
                    this.authorVal = ''
                }
                this.pageSizeNum = val
                this.getuserList()

            },
            handleCurrentChange(val) {
                if (this.okSearShow == 0) {
                    this.selOneVal = '0'
                    this.headlineVal = ''
                    this.authorVal = ''
                }
                this.currentPage = val
                this.getuserList()
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.userId;
                });
                var string = a.join(",");
                this.idstring = string;
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.userId;
                });
                var string = a.join(",");
                this.idstring = string;
            },
            //批量操作
            batchClick() {
                if (this.checkList.length == 0) {
                    return
                } else {
                    if (this.batchVal == '0') {
                        this.type = 1
                        this.getuserRecommend()
                    } else if (this.batchVal == '1') {
                        this.type = 0
                        this.getuserRecommend()
                    } else if (this.batchVal == '2') {
                        this.type = 0
                        this.getblockUser()
                    } else if (this.batchVal == '3') {
                        this.type = 1
                        this.getblockUser()
                    }
                }
            },
            //推荐
            recommendClick(index) {
                this.idstring = this.dataList[index].userId
                if (this.dataList[index].excellentAnswer == '0') {
                    this.type = 0
                } else if (this.dataList[index].excellentAnswer == '1') {
                    this.type = 1
                }
                this.getuserRecommend()
            },
            //禁言
            forbidClick(index) {
                this.idstring = this.dataList[index].userId
                if (this.dataList[index].state == '0' || this.dataList[index].state == '2') {
                    this.type = 0
                } else if (this.dataList[index].state == '1') {
                    this.type = 1
                }
                this.getblockUser()
            },
            //推荐接口
            getuserRecommend() {
                if (this.isRecomUp) {
                    this.isRecomUp = false
                    var self = this
                    self.getsuserSummaryControllerRecommend({
                        type: this.type,    //类型(0取消,1推荐)
                        userIds: this.idstring, //	用户Id组(逗号隔开)
                    }).then(data => {
                        self.isRecomUp = true
                        if (data.code == 200) {
                            this.getuserList()
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            self.$message(data.message)
                        }
                    }).catch(msg => {
                        self.isRecomUp = true
                        self.$message('服务器异常')
                    })
                }
            },
            //禁言接口
            getblockUser() {
                if (this.isBlockUp) {
                    this.isBlockUp = false
                    var self = this
                    self.getuserControllerBlockUser({
                        type: self.type,//类型(0封号,1解封)
                        userIds: self.idstring,//用户Id
                        appId: "botu",
                        module: "news",
                    }).then(data => {
                        self.isBlockUp = true
                        if (data.code == 200) {
                            self.getuserList()
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            self.$message(data.message)
                        }
                    }).catch(msg => {
                        self.isBlockUp = true
                        self.$message('服务器异常')
                    })
                }
            },
            //文章数据
            articleClick(index) {
                if (this.dataList[index].articleCount > 0) {
                    var arr = {
                        val: "article",
                        userId: this.dataList[index].userId
                    }
                    let userArr = JSON.stringify(arr)
                    sessionStorage.setItem("userNumber", userArr)
                    this.$router.push({
                        path: '/news/userNumber',
                    })
                    if (this.okSearShow) {
                        var objOne = {
                            selOneVal: this.selOneVal,
                            headlineVal: this.headlineVal,
                            authorVal: this.authorVal
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem("userSelect", strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem("userPag", strTwo)
                }
            },
            //动态数据
            dynamicClick(index) {
                if (this.dataList[index].dynamicCount > 0) {
                    var arr = {
                        val: "dynamic",
                        userId: this.dataList[index].userId
                    }
                    let userArr = JSON.stringify(arr)
                    sessionStorage.setItem("userNumber", userArr)
                    this.$router.push({
                        path: '/news/userNumber'
                    })
                    if (this.okSearShow) {
                        var objOne = {
                            selOneVal: this.selOneVal,
                            headlineVal: this.headlineVal,
                            authorVal: this.authorVal
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem("userSelect", strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem("userPag", strTwo)
                }
            },
            //问题数据
            issueClick(index) {
                if (this.dataList[index].questionCount > 0) {
                    var arr = {
                        val: "issue",
                        userId: this.dataList[index].userId
                    }
                    let userArr = JSON.stringify(arr)
                    sessionStorage.setItem("userNumber", userArr)
                    this.$router.push({
                        path: '/news/userNumber'
                    })
                    if (this.okSearShow) {
                        var objOne = {
                            selOneVal: this.selOneVal,
                            headlineVal: this.headlineVal,
                            authorVal: this.authorVal
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem("userSelect", strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem("userPag", strTwo)
                }
            },
            //回答数据
            answerClick(index) {
                if (this.dataList[index].answerCount > 0) {
                    var arr = {
                        val: "answer",
                        userId: this.dataList[index].userId
                    }
                    let userArr = JSON.stringify(arr)
                    sessionStorage.setItem("userNumber", userArr)
                    this.$router.push({
                        path: '/news/userNumber'
                    })

                    if (this.okSearShow) {
                        var objOne = {
                            selOneVal: this.selOneVal,
                            headlineVal: this.headlineVal,
                            authorVal: this.authorVal
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem("userSelect", strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem("userPag", strTwo)
                }
            },
            //违规数据
            ruleClick(index) {
                if (this.dataList[index].illegalCount >= 0) {
                    var arr = {
                        val: "rule",
                        userId: this.dataList[index].userId
                    }
                    let userArr = JSON.stringify(arr)
                    sessionStorage.setItem("userNumber", userArr)
                    this.$router.push({
                        path: '/news/userNumber'
                    })
                    if (this.okSearShow) {
                        var objOne = {
                            selOneVal: this.selOneVal,
                            headlineVal: this.headlineVal,
                            authorVal: this.authorVal
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem("userSelect", strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem("userPag", strTwo)
                }
            },

            ...mapActions(['getsuserSummaryControllerListUserSummary', 'getuserControllerBlockUser', 'getsuserSummaryControllerRecommend'])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .user {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .user>div:nth-child(1) {
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

    .search {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    .search>div {
        margin-top: 10px;
        margin-right: 18px;
    }

    .search select {
        width: 180px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
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
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
    }

    .listContent li>div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-left: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(1) {
        width: 9%;
    }

    .listContent li>div:nth-child(2) {
        width: 9%;
    }

    .listContent li>div:nth-child(3) {
        width: 9%;
    }

    .listContent li>div:nth-child(4) {
        width: 9%;
    }

    .listContent li>div:nth-child(5) {
        width: 9%;
    }

    .listContent li>div:nth-child(6) {
        width: 9%;
    }

    .listContent li>div:nth-child(7) {
        width: 9%;
    }

    .listContent li>div:nth-child(8) {
        width: 9%;
    }

    .listContent li>div:nth-child(9) {
        width: 9%;
    }

    .listContent li>div:nth-child(10) {
        width: 9%;
    }

    .listContent li>div:nth-child(11) {
        width: 10%;
    }

    .listContent li>div:nth-child(10) img,
    .listContent li>div:nth-child(11) img {
        cursor: pointer;
    }

    .greenFont {
        color: green;
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
</style>