<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="draft">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    草稿管理
                </div>
                <!-- <div @click="addNewsClick">
                    新增新闻
                </div> -->
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按标题搜索" v-model.trim="titleVal">
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按作者搜索" v-model.trim="authorVal">
                </div>
                <div class="selectTime">
                    <div>
                        <el-date-picker :editable='false' @change="beginTimeChange" v-model="beginTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker :editable='false' @change="overtimeChange" v-model="overTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
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
            <div class="mainContent">
                <ul>
                    <li v-for="(item,index) in dataList" :key="index">
                        <div :title="item.title">{{item.title | textNumFun(28)}}</div>
                        <div class="subhead">
                            <span>{{item.createData | timeFun}}</span>
                            <span :title="item.userName">{{item.userName}}</span>
                        </div>
                        <div class="imgBox">
                            <img :src="item.picture | pictureFun" alt="" v-if="item.newsType == 1">
                            <img :src="item.cover" alt="" v-if="item.newsType == 2">
                            <p :title="item.textContent" v-if="item.newsType == 0">{{item.textContent | textNumFun(165)}}</p>
                            <div v-if="item.newsType == 2" class="stopIcon"></div>
                        </div>
                        <div class="draftEle-bottom">
                            <span class="editIcon" @click.stop="editIconClick(index)"></span>
                            <span class="delIcon" @click.stop="recycleClick(index)"></span>
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="dataList.length > 0">
                    <div>

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
                    <v-newsdelete @ok="okClick" @canle="canleClick" :name="titlename"></v-newsdelete>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import { mapActions } from "vuex";
    import newsdelete from "../../cModule/newsDelete";
    export default {
        components: {
            "v-newsdelete": newsdelete
        },
        data() {
            return {
                isShowdel: false, //删除弹框
                titlename: "该草稿将被删除，该操作不可恢复", //删除弹框提示语
                delIndex: "", //删除index
                titleVal: "", //文章标题
                authorVal: "", //作者
                okSearchShow: false, //是否进行了搜索
                timeShow: false, //时间是否可进行筛选
                idstring: "", //序号
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1,
                dataList: [],
                beginTimeVal: "", //开始时间
                overTimeVal: "", //结束时间
                timeOne: "", //转化后的开始时间
                timeTwo: "",//转化后的结束时间
                timeNumOne: '',
                timeNumTwo: "",
                isListUp: true,
            };
        },
        // 过滤
        filters: {
            //   过滤文字字数
            textNumFun(val, m) {
                if (val) {
                    if (val.length > m) {
                        return val.substring(0, m) + "......";
                    } else {
                        return val;
                    }
                }

            },
            pictureFun: function (val) {
                var arr = val.split(',')
                return arr[0]
            },
            // 过滤时间
            timeFun: function (val) {
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
                    return "暂无"
                }
            }
        },
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
                if (arrs.indexOf("draft") == -1) {
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
                    if (sessionStorage.getItem('draftSelect') || sessionStorage.getItem('draftPag')) {
                        if (sessionStorage.getItem('draftSelect')) {
                            this.okSearchShow = true
                            var objSelect = JSON.parse(sessionStorage.getItem('draftSelect'))
                            this.authorVal = objSelect.authorVal
                            this.titleVal = objSelect.titleVal
                            this.timeOne = objSelect.timeOne
                            this.timeTwo = objSelect.timeTwo
                            if (objSelect.timeNumOne == "" || objSelect.overTimeVal == "") {
                                this.beginTimeVal = ""
                                this.timeNumOne = ""
                                this.overTimeVal = ""
                                this.timeNumTwo = ""
                            } else {
                                this.timeShow = true
                                this.beginTimeVal = new Date(objSelect.timeNumOne)   //标准时间-开始时间
                                this.timeNumOne = objSelect.timeNumOne      //标准时间戳-开始时间
                                this.overTimeVal = new Date(objSelect.timeNumTwo)   //标准时间-结束时间
                                this.timeNumTwo = objSelect.timeNumTwo      //标准时间戳-结束时间
                            }
                        }
                        if (sessionStorage.getItem('draftPag')) {
                            var objPag = JSON.parse(sessionStorage.getItem('draftPag'))
                            this.pageSizeNum = objPag.pageSizeNum
                            this.currentPage = objPag.currentPage
                        }
                        this.getDraftListFun("1");
                    } else {
                        this.getDraftListFun("");
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
            // 获取草稿箱列表
            getDraftListFun(m) {
                if (this.isListUp) {
                    this.isListUp = false
                    var self = this;
                    self.getdraftsControllerlistLongArticle({
                        type: "0",
                        name: m == "" ? "" : self.authorVal, //作者
                        title: m == "" ? "" : self.titleVal, //标题
                        startDate: m == "" ? "" : self.timeOne, //开始时间
                        stopDate: m == "" ? "" : self.timeTwo, //结束时间
                        pageSize: self.pageSizeNum,
                        pageNo: self.currentPage,
                        state: '0',
                    }).then(data => {
                        self.isListUp = true
                        if (data.code == 200) {
                            sessionStorage.removeItem('draftSelect')
                            sessionStorage.removeItem('draftPag')
                            if (data.data.records) {
                                self.dataList = data.data.records;
                                self.totalNum = data.data.total;
                            }
                        } else {
                            self.$message(data.message);
                        }
                    }).catch(msg => {
                        self.isListUp = true
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
                }
            },
            //筛选
            okSearClick() {
                if (this.timeShow == false) {
                    this.beginTimeVal = this.timeOne = this.overTimeVal = this.timeTwo = ""
                }
                if (this.titleVal == '' && this.authorVal == '' && this.timeShow == false) {
                    return
                } else {
                    this.okSearchShow = 1;
                    this.getDraftListFun("1");
                }
            },
            //重置筛选
            resetClick() {
                this.titleVal = "";
                this.authorVal = "";
                this.timeShow = false
                this.beginTimeVal = this.timeOne = "";
                this.overTimeVal = this.timeTwo = "";
                if (this.okSearchShow) {
                    this.okSearchShow = 0;
                    this.getDraftListFun("");
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                if (this.okSearchShow == false) {
                    this.titleVal = "";
                    this.authorVal = "";
                    this.beginTimeVal = this.timeOne = "";
                    this.overTimeVal = this.timeTwo = "";
                    this.getDraftListFun("");
                } else {
                    this.getDraftListFun("1");
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.okSearchShow == false) {
                    this.titleVal = "";
                    this.authorVal = "";
                    this.beginTimeVal = this.timeOne = "";
                    this.overTimeVal = this.timeTwo = "";
                    this.getDraftListFun("");
                } else {
                    this.getDraftListFun("1");
                }
            },
            // 开始时间
            beginTimeChange() {
                this.timeShow = false
                this.timeNumOne = Date.parse(this.beginTimeVal);
                var t = this.beginTimeVal;
                if (t) {
                    var y, m, d;
                    y = t.getFullYear();
                    m = t.getMonth() + 1;
                    d = t.getDate();
                    m = m > 9 ? m : "0" + m;
                    d = d > 9 ? d : "0" + d;
                    if (this.overTimeVal) {
                        if (this.overTimeVal != '') {
                            if (this.overTimeVal - this.beginTimeVal >= 0) {
                                this.timeOne = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "开始时间不能大于结束时间！"
                                });
                                this.beginTimeVal = this.timeOne = "";
                            }
                        } else {
                            this.timeOne = y + "-" + m + "-" + d;
                        }
                    } else {
                        this.timeOne = y + "-" + m + "-" + d;
                    }
                }
            },
            //结束时间
            overtimeChange() {
                this.timeShow = false
                this.timeNumTwo = Date.parse(this.overTimeVal);
                var t = this.overTimeVal;
                if (t) {
                    var y, m, d;
                    y = t.getFullYear();
                    m = t.getMonth() + 1;
                    d = t.getDate();
                    m = m > 9 ? m : "0" + m
                    d = d > 9 ? d : "0" + d
                    if (this.beginTimeVal) {
                        if (this.beginTimeVal != '') {
                            if (this.overTimeVal - this.beginTimeVal >= 0) {
                                this.timeTwo = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true
                            } else {
                                this.overTimeVal = "";
                                this.timeTwo = "";
                                this.$message({
                                    type: "info",
                                    message: "结束时间不得小于开始时间！"
                                });
                            }
                        } else {
                            this.overTimeVal = "";
                            this.timeTwo = "";
                            this.$message({ message: "请先选择开始时间！" });
                        }
                    } else {
                        this.overTimeVal = "";
                        this.timeTwo = "";
                        this.$message({ message: "请先选择开始时间！" });
                    }
                }
            },
            //删除
            recycleClick(index) {
                this.isShowdel = true;
                this.delIndex = index;
            },
            //取消删除
            canleClick() {
                this.isShowdel = false;
            },
            //确定删除
            okClick() {
                this.isShowdel = false;
                var self = this;
                self
                    .getdraftsControllerdeleteNews({
                        type: "0",
                        optionState: "0",
                        draftsIds: self.dataList[self.delIndex].id

                    }).then(data => {
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "删除成功"
                            });
                            if (self.okSearchShow == 1) {
                                self.getDraftListFun("1");
                            } else {
                                self.getDraftListFun("");
                            }
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            // 点击编辑按钮
            editIconClick(index) {
                this.$router.push({
                    path: "/news/addNews",
                    query: {
                        id: this.dataList[index].id,
                        newsShow: 'draft'
                    }
                });
                if (this.okSearchShow) {
                    var objOne = {
                        authorVal: this.authorVal,
                        titleVal: this.titleVal,
                        timeOne: this.timeOne,
                        timeTwo: this.timeTwo,
                        timeNumOne: this.timeNumOne,
                        timeNumTwo: this.timeNumTwo,
                    }
                    var strOne = JSON.stringify(objOne)
                    sessionStorage.setItem('draftSelect', strOne)
                }
                var objTwo = {
                    pageSizeNum: this.pageSizeNum,
                    currentPage: this.currentPage,
                }
                var strTwo = JSON.stringify(objTwo)
                sessionStorage.setItem('draftPag', strTwo)
            },
            ...mapActions([
                "getdraftsControllerlistLongArticle",
                "getdraftsControllerdeleteNews",
            ])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .draft {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .draft>div:nth-child(1) {
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

    /*选择时间*/

    .selectTime {
        height: 32px;
        float: right !important;
        line-height: 32px;
        overflow: hidden;
    }

    .selectTime>div {
        float: left;
    }

    .selectTime>div:nth-child(1),
    .selectTime>div:nth-child(3) {
        width: 100px;
        height: 32px;
        overflow: hidden;
        border: 1px solid #aeaeae;
        border-radius: 4px;
        position: relative;
    }

    .selectTime>div:nth-child(1)>div,
    .selectTime>div:nth-child(3)>div {
        position: absolute;
        top: -1px;
        left: -6px;
    }

    .selectTime>div:nth-child(2) {
        height: 32px;
    }

    .selectTime div {
        margin: 0 5px;
    }

    .list {
        min-height: 550px;
    }

    .list>div {
        margin: 0 auto;
    }

    .searBut {
        display: flex;
        width: 158px;
        justify-content: space-between;
        margin-right: 0 !important;
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
        background: #a3a3a3;
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

    .mainContent {
        margin-top: 20px;
    }

    .mainContent ul {
        overflow: hidden;
    }

    .mainContent ul li {
        width: 285px;
        margin: 15px;
        margin-right: 30px;
        border: 1px solid #ccc;
        float: left;
        padding: 10px;
        margin-left: 0;
        box-sizing: content-box;
    }

    .mainContent ul li > div:nth-child(1) {
        height: 29px;
        margin-top: 0;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .imgBox {
        width: 100%;
        height: 215px;
        margin: 10px 0;
        position: relative;
    }

    .imgBox img,
    .imgBox p {
        width: 100%;
        height: 100%;
    }

    .imgBox p {
        width: 100%;
        height: 100%;
        font-size: 16px;
    }

    .draftEle-bottom span:nth-child(1) {
        float: left;
    }

    .draftEle-bottom span:nth-child(2) {
        float: right;
    }

    .stopIcon {
        width: 50px;
        height: 50px;
        background: url("/static/img/stopVideo.png") no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px;
        margin-left: -25px;
    }

    .delIcon {
        width: 22px;
        height: 22px;
        background: url("/static/img/删除.png") no-repeat;
        background-size: cover;
        cursor: pointer;
    }

    .editIcon {
        width: 22px;
        height: 22px;
        background: url("/static/img/编辑.png") no-repeat;
        background-size: cover;
        cursor: pointer;
    }

    .greenFont {
        color: green;
        cursor: pointer;
    }

    .subhead {
        overflow: hidden;
    }

    .subhead span {
        float: left;
    }

    .subhead span:nth-child(1) {
        margin-right: 10px;
    }

    .subhead span:nth-child(2) {
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
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