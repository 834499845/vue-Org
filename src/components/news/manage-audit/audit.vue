<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="dynamic">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    审核管理
                </div>
                <!-- <div @click="addNewsClick">
                    新增新闻
                </div> -->
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div>
                    <select v-model="statusVal">
                        <option v-for="(type,index) in statusList" v-bind:value="type.key">{{type.value}}</option>
                    </select>
                </div>
                <div>
                    <select v-model="nickNameVal">
                        <option v-for="(type,index) in typeList" v-bind:value="type.key">{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按名字/昵称搜索" v-model.trim="nameVal">
                </div>
                <div class="selectTime">
                    <div>
                        <el-date-picker :editable='false' :clearable='true' @change="beginTimeChange" v-model="beginTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker :editable='false' :clearable='true' @change="overtimeChange" v-model="overTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="searBut">
                    <div @click="okSearchClick">
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
                            序号
                        </div>
                        <div>
                            昵称
                        </div>
                        <div>
                            姓名
                        </div>
                        <div>
                            身份证
                        </div>
                        <div>
                            发布内容
                        </div>
                        <div>
                            提交时间
                        </div>
                        <div>
                            审核时间
                        </div>
                        <div>
                            状态
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
                            {{index+1}}
                        </div>
                        <div :title="item.nickName">
                            {{item.nickName}}
                        </div>

                        <div>
                            {{item.userName}}
                        </div>
                        <div>
                            <img src="/static/img/detail.png" @click="cardClick(index)" alt="查看" title="查看身份证">
                        </div>
                        <div>
                            <div v-if="item.totalCount == 0 || item.totalCount == null">
                                {{item.totalCount}}
                            </div>
                            <div v-else>
                                <span class="greenFont" @click="contentClick(index)">
                                    {{item.totalCount}}
                                </span>
                            </div>
                        </div>
                        <div>
                            {{item.createDate | timeFun}}
                        </div>
                        <div>
                            {{item.updateDate | timeFun}}
                        </div>
                        <div>
                            {{item.checkState | statusFun}}
                        </div>
                        <div>
                            <div v-show="item.checkState == '0'">
                                <img @click="auditClick(index)" src="/static/img/审核.png" alt="审核" title="审核">
                            </div>
                            <div v-show="item.checkState == '1'">
                                <img @click="AuthorityClick(index,'close')" v-if="item.permission == '0'" src="/static/img/shi.png" alt="是" title="权限开启">
                                <img @click="AuthorityClick(index,'open')" v-else src="/static/img/fou.png" alt="否" title="权限关闭">
                            </div>
                            <div v-show="item.checkState == '2'">
                                <img @click="recycleClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="dataList.length > 0">
                    <div></div>
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
                    <news-Delete @ok="okClick" @canle="canleClick" :name="titlename"></news-Delete>
                </div>
            </transition>
        </div>
        <!-- 审核弹出框 -->
        <div class="auditBox" v-show="auditBoxShow">
            <div class="auditBoxSon">
                <div class="auditBoxHead">
                    审
                    <div></div>核
                </div>
                <div class="auditOperation">
                    <div class="auditselect">
                        <div class="auditselectS auditselectT" @click="auditOk">
                            <div class="selectBox selectBoxT" :class="{redBack:isTrue}">
                                <div class="selectBor"></div>
                            </div>
                            <div>
                                审核通过
                            </div>
                        </div>
                        <div class="auditselectS auditselectF" @click="auditNo">
                            <div class="selectBox selectBoxF" :class="{redBack:!isTrue}">
                                <div class="selectBor"></div>
                            </div>
                            <div>
                                审核不通过
                            </div>
                        </div>
                    </div>
                    <div class="auditText" v-show="!isTrue">
                        <textarea maxlength="150" placeholder="请填写申请不通过的原因，150字以内" v-model="auditModel">
                        </textarea>
                    </div>
                </div>
                <div class="auditBut">
                    <div @click="auditButOk">
                        确定
                    </div>
                    <div @click="auditButNo">
                        取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import newsDelete from "../../cModule/newsDelete";
    export default {
        components: {
            newsDelete
        },
        data() {
            return {
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [], //列表数组
                statusVal: "", //第一个下拉
                statusList: [
                    { value: "请选择审核条件", key: "" },
                    { value: "未审核", key: "0" },
                    { value: "审核通过", key: "1" },
                    { value: "审核未通过", key: "2" }
                ], //第一个下拉数组
                typeList: [
                    { value: "按姓名或昵称搜索", key: "" },
                    { value: "按昵称搜索", key: "1" },
                    { value: "按姓名搜索", key: "0" },
                ],
                nickNameVal: "", // type 0-昵称；1-名字
                isShowdel: false, //删除弹框
                titlename: "该记录将被删除，该操作无法恢复！", //删除弹框提示语
                delIndex: "", //删除index
                nameVal: "", //姓名/昵称
                okSearchShow: false, //判断是否点击确定搜索按钮
                idstring: "", //序号
                auditBoxShow: 0, //审核弹出框
                auditIndex: "", //审核Index
                auditModel: "", //审核拒绝理由
                isTrue: 1, //审核通过
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1,
                timeShow: false,    //筛选判断
                beginTimeVal: "", //开始时间
                overTimeVal: "", //结束时间
                beginTimes: "", //转化后的开始时间
                overTimes: "",//转化后的结束时间
                timeNumOne: '', //开始时间戳
                timeNumTwo: '', //结束时间戳
                isAutUp: true,   //权限请求监视
                isListUp: true, //列表请求监视
            };
        },
        // 过滤
        filters: {
            statusFun: function (val) {
                if (val == 0) {
                    return "待审核";
                } else if (val == 1) {
                    return "审核通过";
                } else if (val == 2) {
                    return "审核未通过";
                } else {
                    return "暂无";
                }
            },
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
            sessionStorage.removeItem('auditId')
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
                    if (sessionStorage.getItem('auditSelect') || sessionStorage.getItem('auditPag')) {
                        if (sessionStorage.getItem('auditSelect')) {
                            this.okSearchShow = true
                            var objSelect = JSON.parse(sessionStorage.getItem('auditSelect'))
                            this.statusVal = objSelect.statusVal  //审核条件
                            this.nickNameVal = objSelect.nickNameVal  //type 0-昵称；1-名字
                            this.nameVal = objSelect.nameVal  //姓名/昵称
                            this.beginTimes = objSelect.beginTimes    //开始时间
                            this.overTimes = objSelect.overTimes  //结束时间
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
                        if (sessionStorage.getItem('auditPag')) {
                            var objPag = JSON.parse(sessionStorage.getItem('auditPag'))
                            this.pageSizeNum = objPag.pageSizeNum
                            this.currentPage = objPag.currentPage
                        }
                        this.getAuditListFun("1");
                    } else {
                        this.getAuditListFun("");
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
            // 获取审核管理列表
            getAuditListFun(m) {
                if (this.isListUp) {
                    var self = this;
                    self.getuserPermissionControllerlistUserPermissionData({
                        checkState: m == "" ? "" : self.statusVal,
                        type: m == "" ? "" : self.nickNameVal, // type 0-昵称；1-名字
                        nicknameOrUsername: m == "" ? "" : self.nameVal, //姓名/昵称
                        createDate: m == "" ? "" : self.beginTimes,
                        updateDate: m == "" ? "" : self.overTimes,
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    }).then(data => {
                        self.isListUp = true
                        if (data.code == 200) {
                            sessionStorage.removeItem('auditSelect')
                            sessionStorage.removeItem('auditPag')
                            if (data.data.records) {
                                self.dataList = data.data.records;
                                self.totalNum = data.data.total;
                            }
                        } else {
                            self.$message(data.message);
                        }
                    }).catch(msg => {
                        self.isListUp = true
                        self.$message("服务器异常");
                    });
                }
            },
            //筛选
            okSearchClick() {
                if(this.timeShow == false){
                    this.beginTimeVal = this.beginTimes = this.overTimeVal = this.overTimes = ""
                }
                if (this.statusVal == "" && this.nickNameVal == "" && this.nameVal == '' && this.timeShow == false) {
                    return
                } else {
                    if (this.statusVal == "" && this.nameVal == '' && this.timeShow == false) {
                        this.nickNameVal = ""
                    } else if (this.statusVal == "" && this.nickNameVal == "" && this.timeShow == false) {
                        this.nameVal = ''
                    } else {
                        if (this.nickNameVal == "" || this.nameVal == '') {
                            this.nickNameVal = ""
                            this.nameVal = ''
                        }
                        this.okSearchShow = true;
                        this.getAuditListFun('1')
                    }
                }
            },
            //重置筛选
            resetClick() {
                this.timeShow = false
                this.statusVal = "";
                this.nickNameVal = "";
                this.nameVal = "";
                this.beginTimeVal = this.beginTimes = "";
                this.overTimeVal = this.overTimes = "";
                if (this.okSearchShow) {
                    this.okSearchShow = false;
                    this.getAuditListFun('')
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                if (this.okSearchShow == true) {
                    this.getAuditListFun("1");
                } else {
                    this.getAuditListFun("");
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.okSearchShow == true) {
                    this.getAuditListFun("1");
                } else {
                    this.getAuditListFun("");
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
                                this.beginTimes = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "开始时间不能大于结束时间！"
                                });
                                this.beginTimeVal = this.beginTimes = "";
                            }
                        } else {
                            this.beginTimes = y + "-" + m + "-" + d;
                        }
                    } else {
                        this.beginTimes = y + "-" + m + "-" + d;
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
                                this.overTimes = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true
                            } else {
                                this.overTimeVal = "";
                                this.overTimes = "";
                                this.$message({
                                    type: "info",
                                    message: "结束时间不得小于开始时间！"
                                });
                            }
                        } else {
                            this.overTimeVal = "";
                            this.overTimes = "";
                            this.$message({ message: "请先选择开始时间！" });
                        }
                    } else {
                        this.overTimeVal = "";
                        this.overTimes = "";
                        this.$message({ message: "请先选择开始时间！" });
                    }
                }
            },
            //查看身份证
            cardClick(index) {
                this.$router.push({
                    path: "/news/auditCard",
                    query: { userId: this.dataList[index].userId }
                });
                sessionStorage.setItem("auditId",this.dataList[index].id)
                if (this.okSearchShow) {
                    var objOne = {
                        statusVal: this.statusVal,  //审核条件
                        nickNameVal: this.nickNameVal,  //type 0-昵称；1-名字
                        nameVal: this.nameVal,  //姓名/昵称
                        beginTimes: this.beginTimes,    //开始时间
                        overTimes: this.overTimes,  //结束时间
                        timeNumOne: this.timeNumOne,    //开始时间戳
                        timeNumTwo: this.timeNumTwo,    //结束时间戳
                    }
                    var strOne = JSON.stringify(objOne)
                    sessionStorage.setItem('auditSelect', strOne)
                }
                var objTwo = {
                    pageSizeNum: this.pageSizeNum,
                    currentPage: this.currentPage
                }
                var strTwo = JSON.stringify(objTwo)
                sessionStorage.setItem('auditPag', strTwo)
            },
            //查看内容
            contentClick(index) {
                if (this.dataList[index].totalCount > 0) {
                    this.$router.push({
                        path: "/news/auditContent",
                    });
                    sessionStorage.setItem('auditId', this.dataList[index].userId)
                    if (this.okSearchShow) {
                        var objOne = {
                            statusVal: this.statusVal,  //审核条件
                            nickNameVal: this.nickNameVal,  //type 0-昵称；1-名字
                            nameVal: this.nameVal,  //姓名/昵称
                            beginTimes: this.beginTimes,    //开始时间
                            overTimes: this.overTimes,  //结束时间
                            timeNumOne: this.timeNumOne,    //开始时间戳
                            timeNumTwo: this.timeNumTwo,    //结束时间戳
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem('auditSelect', strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem('auditPag', strTwo)
                }
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.a;
                });
                var string = a.join(",");
                this.idstring = string;
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.a;
                });
                var string = a.join(",");
                this.idstring = string;
            },
            //推荐
            recommendClick(index) {
                this.dataList[index].e = !this.dataList[index].e;
            },
            //显示
            uncommonClick(index) {
                this.dataList[index].f = !this.dataList[index].f;
            },
            //点击删除按钮
            recycleClick(index) {
                this.isShowdel = true;
                this.delIndex = index;
            },
            // 点击关闭权限/开启权限按钮
            AuthorityClick(index, m) {
                if (this.isAutUp) {
                    this.isAutUp = false
                    var self = this;
                    self.getuserPermissionControllerupdateCheckState({
                        userIdJson: JSON.stringify([self.dataList[index].userId]),
                        type: m == 'close' ? '1' : '0',
                    }).then(data => {
                        self.isAutUp = true
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "权限变更成功！"
                            });
                            if (self.okSearchShow == true) {
                                self.getAuditListFun("1");
                            } else {
                                self.getAuditListFun("");
                            }
                        } else {
                            self.$message(data.message);
                        }
                    }).catch(msg => {
                        self.isAutUp = true
                        self.$message('服务器异常')
                    })
                }
            },
            //取消删除
            canleClick() {
                this.isShowdel = false;
            },
            //确定删除
            okClick() {
                var self = this;
                this.isShowdel = false;
                self.getuserPermissionControllerdeleteCheckState({
                    userIdJson: JSON.stringify([self.dataList[self.delIndex].userId]),
                }).then(data => {
                    if (data.code == 200) {
                        self.$message({
                            type: "success",
                            message: "删除成功"
                        });
                        if (self.okSearchShow == true) {
                            self.getAuditListFun("1");
                        } else {
                            self.getAuditListFun("");
                        }
                    } else {
                        self.$message(data.message);
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },

            //审核
            auditClick(index) {
                this.auditIndex = index;
                this.auditBoxShow = 1;
                this.isTrue = 1;
                this.auditModel = "";
            },
            //审核通过
            auditOk() {
                this.isTrue = 1;
            },
            //审核不通过
            auditNo() {
                this.isTrue = 0;
            },
            //确定审核
            auditButOk() {
                var self = this;
                if (self.isTrue == 0 && self.auditModel == "") {
                    self.$message("请输入审核不通过原因");
                    return;
                }
                self
                    .getuserPermissionControllerupdateUncheckedState({
                        userIdJson: JSON.stringify([self.dataList[self.auditIndex].userId]),
                        type: self.isTrue == 1 ? "1" : "2",
                        remark: self.isTrue == 1 ? "" : self.auditModel
                    })
                    .then(data => {
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "操作成功"
                            });
                            if (self.okSearchShow == true) {
                                self.getAuditListFun("1");
                            } else {
                                self.getAuditListFun("");
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });

                this.auditBoxShow = 0;
            },
            //取消审核
            auditButNo() {
                this.auditBoxShow = 0;
            },
            ...mapActions([
                "getuserPermissionControllerlistUserPermissionData",
                "getuserPermissionControllerupdateUncheckedState",
                'getuserPermissionControllerupdateCheckState',
                'getuserPermissionControllerdeleteCheckState'
            ])
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

    .listContent {
        overflow: hidden;
    }

    .listContentTop {
        border-top: 1px solid #e5e7eb;
        font-size: 16px;
        font-weight: bold;
        background: #f2f4f8;
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
        width: 8%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(2) {
        width: 8%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 8%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) {
        width: 8%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) img {
        cursor: pointer;
    }

    .listContent li>div:nth-child(5) {
        width: 12%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(6) {
        width: 18%;
        border-right: 1px solid #e5e7eb;
    }

    .greenFont {
        color: green;
        cursor: pointer;
    }

    .listContent li>div:nth-child(7) {
        width: 18%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(8) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(9) {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .listContent li>div:nth-child(9) div {
        margin: 0 10px;
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

    /* 审核弹出框 */

    .auditBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
    }

    .auditBoxSon {
        width: 500px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 380px) / 2) auto;
        z-index: 11;
    }

    .auditBoxHead {
        width: 100%;
        height: 60px;
        color: #f84848;
        font-size: 20px;
        font-weight: bold;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f84848;
    }

    .auditBoxHead div {
        width: 24px;
    }

    .auditOperation {
        padding: 24px 0;
        border-bottom: 1px solid #f84848;
    }

    .auditselect {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 14px;
    }

    .auditselectS {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 36px;
        cursor: pointer;
    }

    .selectBoxT:hover {
        border: 1px solid #f84848 !important;
    }

    .selectBoxF:hover {
        border: 1px solid #f84848 !important;
    }

    .selectBox {
        width: 17px;
        height: 17px;
        border: 1px solid #000;
        border-radius: 3px;
        margin-right: 4px;
    }

    .selectBor {
        width: 6px;
        height: 10px;
        border-left: 1px solid white;
        border-top: 1px solid white;
        margin: 1px auto;
        transform: rotate(225deg);
    }

    .redBack {
        background: #f84848;
        border: 1px solid #f84848 !important;
    }

    .auditText {
        width: 500px;
        padding: 0 50px;
        padding-top: 12px;
        border-top: 1px solid #d1d1d1;
    }

    textarea {
        resize: none;
        width: 400px;
        height: 175px;
        line-height: 26px;
        padding: 8px 4px;
        border-radius: 4px;
    }

    .auditBut {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 12px 0;
        width: 100%;
        height: 56px;
    }

    .auditBut div {
        width: 70px;
        height: 32px;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        line-height: 32px;
        margin: 0 18px;
        color: white;
    }

    .auditBut>div:nth-child(1) {
        background: #f84848;
    }

    .auditBut>div:nth-child(2) {
        background: #bbb;
    }
</style>