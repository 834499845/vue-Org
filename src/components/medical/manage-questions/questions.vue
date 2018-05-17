<!--问答管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    问答管理
                </div>
                <!-- <div @click="addCommClick">
                    
                </div> -->
            </div>
            <!-- 筛选 -->
            <div class="filtrate">             
                <div class="selectOne">
                    <select v-model="filtrateSelect" @change="selectChg">
                        <option v-for="(type,index) in docstate" v-bind:value="type.key">{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="输入后开始搜索" v-model="searchModel" maxlength="500">
                </div>
                <div class="selectTime">
                    <div>
                        <el-date-picker @change="beginTime" v-model="valueOne" type="date" :placeholder="startTime">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker @change="overtime" v-model="valueTwo" type="date" :placeholder="overTime">
                        </el-date-picker>
                    </div>
                </div>
                <div class="filtrateOk" interval @click="searchClick">
                    确定
                </div>
                <div class="filtrateOk interval delfiltrateOk" @click="personOrCircleCDeleteClick">
                    清除
                </div>
                
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div>
                                <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                <span>序号</span>
                            </div>
                            <div>
                                问题
                            </div>
                            <div>
                                提问者
                            </div>
                            <div>
                                提问时间
                            </div>
                            <div>
                                回答数量
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
                                <div>
                                    <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                        <el-checkbox :label="item" :key="item.id">{{index + 1}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="omit">
                                {{item.title}}
                            </div>
                            <div class="omit">
                                {{item.userName}}
                            </div>
                            <div class="omit">
                                {{item.createDate|ctimeFun}}
                            </div>
                            <div class="omit">
                                <span @click="answerClick(index)">
                                    {{item.answerNumber | lFun}}
                                </span>
                            </div>
                            <div class="operation">
                                <div>
                                    <img src="/static/img/删除.png" @click="delClick(index)">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部删除/分页 -->
                    <div class="lastLi" v-show="this.dataList.length > 0">
                        <div class="batchDelete" @click="batchDelClick">
                            批量删除
                        </div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
                            </el-pagination>
                        </div>
                    </div>
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
    import { mapActions, mapState } from "vuex";
    import hosdel from "../../cModule/cancelBox";
    export default {
        components: {
            "v-hosdel": hosdel
        },
        data() {
            return {
                okDelClickTrueOrFalse: true,
                filtrateSelect: "QXZ",
                loading: false,
                docstate: [
                    { value: "请选择", key: "QXZ" },
                    { value: "按问题搜索", key: "0" },
                    { value: "按提问者搜素", key: "1" }
                ], //下拉框.
                valueOne: "",
                valueTwo: "",
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [],
                isShowdel: true,
                titlename: "",
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                searchModel: "",
                searchModelUp: "", //上传的关键字
                titleModel: "",
                timeOne: "",
                timeTwo: "",
                timeNumOne: "",
                timeNumTwo: "",
                cancelIndex: "",
                userNameModel: "",
                startTime: "请选择日期", //开始时间名字
                overTime: "请选择日期", //结束时间名字
                ifcancel: "", //判断为批量删除还是单个删除
                idstring: "", //id字符串
                iscurrentPage: "", //删除后应该为的页码
                ifGetList: true,
                searchClickShow: false
            };
        },
        // 过滤
        filters: {
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
            lFun: function (val) {
                if (val) {
                    return val;
                } else {
                    return "0";
                }
            }
        },
        // 模块新建时
        created: function () {
            var self = this;
            if (sessionStorage.getItem("questionsCurrentPage")) {
                self.currentPage = Number(sessionStorage.getItem("questionsCurrentPage"));
            }
            if (sessionStorage.getItem("questionsPageSizeNum")) {
                self.pageSizeNum = Number(sessionStorage.getItem("questionsPageSizeNum"));
            }
            if (
                sessionStorage.getItem("questionsFiltrateSelect") &&
                sessionStorage.getItem("questionsSearchModel")
            ) {
                this.filtrateSelect = sessionStorage.getItem("questionsFiltrateSelect");
                this.searchModelUp = this.searchModel = sessionStorage.getItem(
                    "questionsSearchModel"
                );
                if (this.filtrateSelect == "0") {
                    this.userNameModel = "";
                    this.titleModel = this.searchModel;
                } else if (this.filtrateSelect == "1") {
                    this.userNameModel = this.searchModel;
                    this.titleModel = "";
                }
            }
            if (
                sessionStorage.getItem("questionsTimeFirst") &&
                sessionStorage.getItem("questionsTimeSecond")
            ) {
                this.timeNumOne = Number(sessionStorage.getItem("questionsTimeFirst"));
                this.timeNumTwo = Number(sessionStorage.getItem("questionsTimeSecond"));
                var t = this.timeNumOne;
                var ts = this.timeNumTwo;
                var td = new Date(t);
                var tsd = new Date(ts);
                this.valueOne = td;
                this.valueTwo = tsd;
                var y, m, d, mm, dd;
                y = td.getFullYear();
                mm = td.getMonth() + 1;
                dd = td.getDate();
                if (mm > 9) {
                    m = mm;
                } else {
                    m = "0" + mm;
                }
                if (dd > 9) {
                    d = dd;
                } else {
                    d = "0" + dd;
                }
                this.timeOne = y + "-" + m + "-" + d;
                var ys, ms, ds, mms, dds;
                ys = tsd.getFullYear();
                mms = tsd.getMonth() + 1;
                dds = tsd.getDate();
                if (mms > 9) {
                    ms = mms;
                } else {
                    ms = "0" + mms;
                }
                if (dds > 9) {
                    ds = dds;
                } else {
                    ds = "0" + dds;
                }
                this.timeTwo = ys + "-" + ms + "-" + ds;
                //console.log("开始时间", sessionStorage.getItem("questionsTimeFirst"));
                //console.log("结束时间", sessionStorage.getItem("questionsTimeSecond"));
            }
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
                if (arrs.indexOf("questions") == -1) {
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
                    if (sessionStorage.getItem("hospitalCurrentPage")) {
                        self.currentPage = Number(
                            sessionStorage.getItem("hospitalCurrentPage")
                        );
                    }
                    if (sessionStorage.getItem("hospitalPageSizeNum")) {
                        self.pageSizeNum = Number(
                            sessionStorage.getItem("hospitalPageSizeNum")
                        );
                    }
                    self.getquestions();
                }
            } else {
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
        mounted() { },
        // 事件处理
        methods: {
            //问答管理-分页
            getquestions() {
                var self = this;
                self.ifGetList = false;
                self.checkList = [];
                self.checked = false;
                self.loading = true;
                self
                    .getquestionsList({
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        title: self.titleModel,
                        userName: self.userNameModel,
                        startDate: self.timeOne,
                        endDate: self.timeTwo
                    })
                    .then(data => {
                        self.loading = false;
                        //console.log("问答管理列表", data);
                        if (data.code == 200) {
                            sessionStorage.removeItem("questionsCurrentPage");
                            sessionStorage.removeItem("questionsPageSizeNum");
                            sessionStorage.removeItem("questionsFiltrateSelect");
                            sessionStorage.removeItem("questionsSearchModel");
                            sessionStorage.removeItem("questionsTimeFirst");
                            sessionStorage.removeItem("questionsTimeSecond");
                            if (data.data) {
                                if (data.data.records) {
                                    if (data.data.records.length == 0) {
                                        self.dataList = [];
                                    } else {
                                        self.dataList = [];
                                        self.dataList = data.data.records;
                                        self.totalNum = data.data.total;
                                    }
                                } else {
                                    self.dataList = [];
                                }
                            } else {
                                self.dataList = [];
                            }
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                        self.ifGetList = true;
                    })
                    .catch(msg => {
                        //console.log(msg);
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                        self.loading = false;
                        self.ifGetList = true;
                    });
            },
            //下拉选择
            selectChg() {
                if (this.filtrateSelect == "QXZ") {
                    this.titleModel = "";
                    this.userNameModel = "";
                    this.searchModelUp = "";
                    this.searchModel = "";
                    this.currentPage = 1;
                    this.getquestions();
                }
            },
            // 清除筛选数据
            personOrCircleCDeleteClick () {
                var self = this
                self.currentPage = 1
                self.pageSizeNum = 10
                self.titleModel = ''
                self.userNameModel = ''
                self.timeOne = ''
                self.timeTwo  = ''
                this.searchModel = ''
                this.valueTwo = ''
                this.valueOne = ''
                this.getquestions()
            },
            //模糊搜索
            searchClick() {
                if (this.filtrateSelect == "QXZ") {
                    this.$message({
                        type: "info",
                        message: "请先选择搜索条件！"
                    });
                } else if (this.filtrateSelect == "0") {
                    if (this.searchModel == "") {
                        this.$message({
                            type: "info",
                            message: "请输入搜索关键词！"
                        });
                    } else {
                        if (this.ifGetList == false) {
                            this.$message({
                                type: "info",
                                message: "数据请求中请稍后！"
                            });
                        } else {
                            this.titleModel = this.searchModelUp = this.searchModel;
                            this.userNameModel = "";
                            this.currentPage = 1;
                            this.pageSizeNum = 10;
                            this.searchClickShow = true;
                            this.getquestions();
                        }
                    }
                } else if (this.filtrateSelect == "1") {
                    if (this.searchModel == "") {
                        this.$message({
                            type: "info",
                            message: "请输入搜索关键词！"
                        });
                    } else {
                        if (this.ifGetList == false) {
                            this.$message({
                                type: "info",
                                message: "数据请求中请稍后！"
                            });
                        } else {
                            this.titleModel = "";
                            this.userNameModel = this.searchModelUp = this.searchModel;
                            this.currentPage = 1;
                            this.searchClickShow = true;
                            this.pageSizeNum = 10;
                            this.getquestions();
                        }
                    }
                }
            },
            //分页
            handleSizeChange(val) {
                if (this.searchClickShow) {
                    if (this.filtrateSelect == "0") {
                        this.titleModel = this.searchModelUp = this.searchModel;
                        this.userNameModel = "";
                        this.currentPage = 1;
                        this.pageSizeNum = 10;
                    } else if (this.filtrateSelect == "1") {
                        this.titleModel = "";
                        this.userNameModel = this.searchModelUp = this.searchModel;
                        this.currentPage = 1;
                        this.pageSizeNum = 10;
                    }
                } else {
                    this.titleModel = "";
                    this.userNameModel = "";
                }
                this.pageSizeNum = val;
                this.getquestions();
            },
            handleCurrentChange(val) {
                if (this.searchClickShow) {
                    if (this.filtrateSelect == "0") {
                        this.titleModel = this.searchModelUp = this.searchModel;
                        this.userNameModel = "";
                        this.currentPage = 1;
                        this.pageSizeNum = 10;
                    } else if (this.filtrateSelect == "1") {
                        this.titleModel = "";
                        this.userNameModel = this.searchModelUp = this.searchModel;
                        this.currentPage = 1;
                        this.pageSizeNum = 10;
                    }
                } else {
                    this.titleModel = "";
                    this.userNameModel = "";
                }
                this.currentPage = val;
                this.getquestions();
            },
            // 开始时间
            beginTime() {
                this.timeNumOne = Date.parse(this.valueOne);
                if (this.timeNumOne) {
                    if (this.timeNumTwo) {
                        if (this.timeNumTwo - this.timeNumOne >= 0) {
                            var t = this.valueOne;
                            var y, m, d, mm, dd;
                            y = t.getFullYear();
                            mm = t.getMonth() + 1;
                            dd = t.getDate();
                            if (mm > 9) {
                                m = mm;
                            } else {
                                m = "0" + mm;
                            }
                            if (dd > 9) {
                                d = dd;
                            } else {
                                d = "0" + dd;
                            }
                            this.timeOne = y + "-" + m + "-" + d;
                            //发送请求
                            this.currentPage = 1;
                            this.getquestions();
                        } else {
                            this.$message({
                                type: "info",
                                message: "开始时间必须大于结束时间！"
                            });
                            this.valueOne = "";
                            this.timeNumOne = "";
                            this.timeOne = "";
                        }
                    } else {
                        var t = this.valueOne;
                        var y, m, d, mm, dd;
                        y = t.getFullYear();
                        mm = t.getMonth() + 1;
                        dd = t.getDate();
                        if (mm > 9) {
                            m = mm;
                        } else {
                            m = "0" + mm;
                        }
                        if (dd > 9) {
                            d = dd;
                        } else {
                            d = "0" + dd;
                        }
                        this.timeOne = y + "-" + m + "-" + d;
                    }
                }
                
            },
            //结束时间
            overtime() {
                this.timeNumTwo = Date.parse(this.valueTwo);
                if (this.timeNumTwo) {
                    if (this.timeNumOne) {
                        if (this.timeNumTwo - this.timeNumOne >= 0) {
                            var t = this.valueTwo;
                            var y, m, d, mm, dd;
                            y = t.getFullYear();
                            mm = t.getMonth() + 1;
                            dd = t.getDate();
                            if (mm > 9) {
                                m = mm;
                            } else {
                                m = "0" + mm;
                            }
                            if (dd > 9) {
                                d = dd;
                            } else {
                                d = "0" + dd;
                            }
                            this.timeTwo = y + "-" + m + "-" + d;
                            //发送请求
                            this.currentPage = 1;
                            this.getquestions();
                        } else {
                            this.valueTwo = "";
                            this.timeNumTwo = "";
                            this.$message({
                                type: "info",
                                message: "结束时间不得小于开始时间！"
                            });
                        }
                    } else {
                        this.valueTwo = "";
                        this.timeNumTwo = "";
                        this.$message({
                            type: "info",
                            message: "请先选择开始时间！"
                        });
                    }
                }
                
            },
            //回答点击
            answerClick(index) {
                var self = this;
                if (this.dataList[index].answerNumber > 0) {
                    //console.log("开始时间", this.timeNumOne);
                    //console.log("结束时间", this.timeNumTwo);
                    sessionStorage.setItem("questionsCurrentPage", self.currentPage);
                    sessionStorage.setItem("questionsPageSizeNum", self.pageSizeNum);
                    sessionStorage.setItem("questionsTimeFirst", self.timeNumOne);
                    sessionStorage.setItem("questionsTimeSecond", self.timeNumTwo);
                    sessionStorage.setItem("questionsFiltrateSelect", self.filtrateSelect);
                    sessionStorage.setItem("questionsSearchModel", self.searchModelUp);
                    let ansdata = JSON.stringify(this.dataList[index]);
                    sessionStorage.setItem("ansdata", ansdata);
                    this.$router.push({
                        path: "/medical/answerDetails"
                    });
                } else {
                    self.$message({
                        type: "info",
                        message: "暂无回答"
                    });
                }
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = JSON.stringify(a);
                this.idstring = string;
                //console.log("全部序号", this.checkList);
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = JSON.stringify(a);
                this.idstring = string;
                //console.log("单个序号", this.checkList);
            },
            //批量删除
            batchDelClick() {
                this.ifcancel = "batch";
                if (this.checkList.length > 0) {
                    this.isShowdel = false;
                    this.titlename = "这些信息将被删除，该操作无法恢复！";
                } else {
                    this.$message({
                        type: "info",
                        message: "请先选择序号！"
                    });
                }
                if (this.dataList.length - this.checkList.length > 0) {
                    this.iscurrentPage = this.currentPage;
                } else {
                    if ((this.currentPage = 1)) {
                        this.iscurrentPage = 1;
                    } else if (this.currentPage > 1) {
                        this.iscurrentPage = this.currentPage - 1;
                    }
                }
            },
            //删除弹框
            delClick(index) {
                this.ifcancel = "single";
                this.cancelIndex = index;
                this.isShowdel = false;
                this.titlename = "该信息将被删除，该操作无法恢复！";
                if (this.dataList.length == 1) {
                    if (this.currentPage == 1) {
                        this.iscurrentPage = 1;
                    } else if (this.currentPage > 1) {
                        this.iscurrentPage = this.currentPage - 1;
                    }
                } else {
                    this.iscurrentPage = this.currentPage;
                }
            },
            //确认删除
            okDelClick() {
                var self = this;
                //单个删除
                if (this.ifcancel == "single") {
                    if (self.okDelClickTrueOrFalse == true) {
                        self.okDelClickTrueOrFalse = false
                        self
                        .getcancelQuestions({
                            id: self.dataList[self.cancelIndex].id
                        })
                        .then(data => {
                            self.okDelClickTrueOrFalse = true
                            if (data.code == 200) {
                                self.$message({
                                    type: "success",
                                    message: "删除成功！"
                                })
                                if (self.dataList.length == 1) {
                                    if (self.currentPage == 1) {
                                        self.currentPage = 1
                                    } else if (self.currentPage > 1) {
                                        self.currentPage = self.currentPage - 1
                                    }
                                }
                                // self.currentPage = self.iscurrentPage;
                                this.getquestions();
                            } else {
                                self.$message({
                                    type: "info",
                                    message: data.message
                                });
                            }
                        })
                        .catch(msg => {
                            self.okDelClickTrueOrFalse = true
                            //console.log(msg);
                            self.$message({
                                type: "info",
                                message: "服务器异常"
                            });
                        });
                    }
                    
                    //批量删除
                } else if (this.ifcancel == "batch") {
                    if (self.okDelClickTrueOrFalse == true) {
                        self.okDelClickTrueOrFalse = false
                        self
                        .getcancelBatchQuestions({
                            ids: self.idstring
                        })
                        .then(data => {
                            self.okDelClickTrueOrFalse = true
                            if (data.code == 200) {
                                this.getquestions();
                            } else {
                                self.$message({
                                    type: "info",
                                    message: data.message
                                });
                            }
                        })
                        .catch(msg => {
                            self.okDelClickTrueOrFalse = true
                            //console.log(msg);
                            self.$message({
                                type: "info",
                                message: "服务器异常"
                            });
                        });
                    }
                    
                }
                this.isShowdel = true;
            },
            //取消删除
            canleClick() {
                this.isShowdel = true;
            },
            addCommClick() { },
            ...mapActions([
                "getquestionsList",
                "getcancelQuestions",
                "getcancelBatchQuestions"
            ])
        },
        // 监视
        watch: {
            searchModel: function (val) {
                this.changeval = val.length;
                if (this.changeval == 0) {
                    if (this.searchClickShow) {
                        this.searchModelUp = this.searchModel = "";
                        this.titleModel = this.userNameModel = "";
                        this.filtrateSelect = "QXZ";
                        this.currentPage = 1;
                        this.pageSizeNum = 10;
                        this.getquestions();
                    }
                }
            }
        }
    };
</script>
<style scoped>
    /*暂无数据*/

    .list .noList {
        height: 400px;
    }

    .list .noList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }

    /*主页*/

    .sale {
        width: 100%;
        height: 100%;
    }

    .sale>div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .listTitle {
        height: 58px;
        line-height: 58px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .listTitle>div:nth-child(1) {
        float: left;
        color: #303030;
        font-size: 16px;
        font-weight: 600;
    }

    .listTitle>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #5acdfa;
    }

    .filtrate {
        overflow: hidden;
        height: 74px;
    }

    .filtrate>div {
        float: left;
        margin-top: 20px;
    }

    /*下拉框*/

    .selectOne select {
        width: 140px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
        font-size: 14px;
        color: #97A8BE;
        border: 1px solid #d1d1d1;
        overflow: hidden;
        cursor: pointer;
    }

    .selectOne select::-ms-expand {
        display: none;
    }

    .searchBox {
        height: 32px;
        line-height: 32px;
        margin-left: 14px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        padding-left: 8px;
        width: 210px;
    }

    .searchBox input {
        border: none;
        height: 26px;
        width: 80%;
    }

    .searchBox input::-webkit-input-placeholder {
        color: #97A8BE;
    }

    .searchBox input:-moz-input-placeholder {
        color: #97A8BE;
    }

    .searchBox input::-moz-input-placeholder {
        color: #97A8BE;
    }

    .searchBox input:-ms-input-placeholder {
        color: #97A8BE;
    }

    .filtrateOk {
        width: 70px;
        height: 32px;
        margin-left: 14px;
        background: #5acdfa;
        text-align: center;
        line-height: 32px;
        color: white;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    .interval {
        margin-left: 10px;
    }

    .delfiltrateOk {
        color: #fe5371 !important;
        background-color: #eaeaea;
    }

    /*选择时间*/

    .selectTime {
        height: 32px;
        /* float: right !important; */
        line-height: 32px;
        overflow: hidden;
        margin-left: 10px;
    }

    .selectTime>div {
        float: left;
    }

    .selectTime>div:nth-child(1),
    .selectTime>div:nth-child(3) {
        width: 100px;
        height: 32px;
        overflow: hidden;
        border: 1px solid #d1d1d1;
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

    /*列表*/

    .listContent {
        overflow: hidden;
    }

    .listContentTop {
        border-top: 1px solid #e5e7eb;
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
        width: 15%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(2) {
        width: 25%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 17%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) {
        width: 17%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(5) {
        width: 15%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(6) {
        width: 11%;
    }

    .listContentTop>div {
        font-size: 17px;
        font-weight: bold;
        color: #303030;
        background: #f2f4f8;
    }

    /*批量删除*/

    .lastLi {
        display: flex;
        height: 60px;
        justify-content: space-between;
    }

    .batchDelete {
        width: 100px !important;
        height: 32px;
        background: #5acdfa;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        font-size: 17px;
        color: white;
        cursor: pointer;
    }

    .dataLi>div:nth-child(5) span {
        color: green;
        cursor: pointer;
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

    .omit {
        overflow: hidden;
        padding: 0 7px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>