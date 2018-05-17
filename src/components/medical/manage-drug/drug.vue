<!--问答管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    药物管理
                </div>
                <div @click="addCommClick">
                    新增药物
                </div>
            </div>
            <!-- 筛选 -->
            <div class="filtrate">
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="输入后开始搜索" v-model="screenModel" maxlength="50">
                </div>
                <div class="filtrateOk" @click="okScreen">
                    确定
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading" element-loading-text="加载中....">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div>
                                药品名称
                            </div>
                            <div>
                                对应症状
                            </div>
                            <div>
                                对应药店
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
                            <div class="omit">
                                {{item.drug}}
                            </div>
                            <div class="omit">
                                {{item.symptom}}
                            </div>
                            <div class="omit">
                                {{item.drugstore}}
                            </div>
                            <div class="operation">
                                <div>
                                    <img src="/static/img/编辑.png" @click="comClick(index)">
                                </div>
                                <div>
                                    <img src="/static/img/删除.png" @click="delClick(index)">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部删除/分页 -->
                    <div class="lastLi" v-show="dataList.length > 0">
                        <div></div>
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
                loading: false,
                dataList: [], //药物数组
                isShowdel: true,
                titlename: "", //删除弹框的提示语
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                screenModel: "", //模糊搜索inp
                okScreenShow: '', //是否点击了确定搜索
                screenModelUp: '', //上传的关键字
                deleteId: "", //删除id
                ifGetList: true,    //请求成功在进行请求
            };
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            var self = this;
            if (sessionStorage.getItem("drugCurrentPage")) {
                self.currentPage = Number(sessionStorage.getItem("drugCurrentPage"));
            }
            if (sessionStorage.getItem("drugPageSizeNum")) {
                self.pageSizeNum = Number(sessionStorage.getItem("drugPageSizeNum"));
            }
            if (sessionStorage.getItem("drugModel")) {
                self.screenModelUp = self.screenModel = sessionStorage.getItem("drugModel");
                this.okScreenShow = true
            }
            var self = this;
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
                //console.log("arrs", arrs)
                if (arrs.indexOf("drug") == -1) {
                    this.intercept = true
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
                    self.datalist();
                    //console.log("11111")
                }
            } else {
                this.intercept = true
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
            //获取药物分页列表
            datalist() {
                var self = this;
                self.ifGetList = false
                self.loading = true;
                sessionStorage.removeItem("drugCurrentPage");
                sessionStorage.removeItem("drugPageSizeNum");
                sessionStorage.removeItem("drugModel");
                sessionStorage.removeItem("drugData");
                self.getdrugList({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    drugName: self.screenModelUp
                }).then(data => {
                    self.loading = false;
                    //console.log("药物管理列表", data);
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.records) {
                                if (data.data.records.length == 0) {
                                    self.dataList = [];
                                } else {
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
                    self.ifGetList = true
                }).catch(msg => {
                    //console.log(msg);
                    self.$message({
                        type: "info",
                        message: "服务器异常"
                    });
                    self.loading = false;
                    self.ifGetList = true
                });
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                if (this.okScreenShow) {
                    this.screenModelUp = this.screenModel
                } else {
                    this.screenModelUp = ''
                }
                this.datalist();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.okScreenShow) {
                    this.screenModelUp = this.screenModel
                } else {
                    this.screenModelUp = ''
                }
                this.datalist();
            },
            //确定模糊搜素
            okScreen() {
                if (this.screenModel == "") {
                    this.$message({
                        type: "info",
                        message: "请输入药店名称！"
                    });
                } else {
                    if (this.ifGetList == false) {
                        self.$message({
                            type: "info",
                            message: "数据请求中，请等待！"
                        });
                    } else {
                        this.currentPage = 1
                        this.pageSizeNum = 10
                        this.okScreenShow = true
                        this.screenModelUp = this.screenModel
                        //console.log("234")
                        this.datalist();
                    }
                }
            },
            //删除弹框
            delClick(index) {
                this.isShowdel = false;
                this.titlename = "该信息将被删除，该操作无法恢复！";
                this.deleteId = this.dataList[index].id;
            },
            //确认删除
            okDelClick() {
                var self = this;
                if (self.okDelClickTrueOrFalse == true) {
                    self.okDelClickTrueOrFalse = false
                        self.getdeletedrug({
                        id: self.deleteId
                    }).then(data => {
                        self.okDelClickTrueOrFalse = true
                        //console.log("药物管理列表", data);
                        if (data.code == 200) {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            if (self.dataList.length == 1) {
                                if (self.currentPage == 1) {
                                    self.currentPage = 1;
                                } else if (self.currentPage > 1) {
                                    self.currentPage = self.currentPage - 1;
                                }
                            }if (self.dataList.length == 1) {
                                if (self.currentPage == 1) {
                                    self.currentPage = 1;
                                } else if (self.currentPage > 1) {
                                    self.currentPage = self.currentPage - 1;
                                }
                            }
                            self.datalist();
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    }).catch(msg => {
                        self.okDelClickTrueOrFalse = true
                        //console.log(msg);
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
                }
                
                this.isShowdel = true;
            },
            //取消删除
            canleClick() {
                this.isShowdel = true;
            },
            //新增药物
            addCommClick() {
                this.$router.push({
                    path: "addMedical"
                });
            },
            //编辑按钮
            comClick(index) {
                var self = this;
                sessionStorage.setItem("drugCurrentPage", self.currentPage);
                sessionStorage.setItem("drugPageSizeNum", self.pageSizeNum);
                sessionStorage.setItem("drugModel", self.screenModelUp);
                let drugData = JSON.stringify(self.dataList[index]);
                sessionStorage.setItem("drugData", drugData);
                self.$router.push({
                    path: "compileMedical"
                });
            },
            ...mapActions(["getdrugList", "getdeletedrug"])
        },
        watch: {
            screenModel: function (val) {
                this.changeval = val.length;
                if (this.changeval == 0) {
                    if (this.okScreenShow) {
                        this.currentPage = 1
                        this.pageSizeNum = 10
                        this.okScreenShow = false
                        this.screenModelUp = ''
                        this.datalist()
                    }
                }
            }
        }
    };

</script>
<style scoped>
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
        border: 1px solid #5acdfa;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #5acdfa;
        cursor: pointer;
    }

    .filtrate {
        overflow: hidden;
        height: 74px;
    }

    .filtrate div {
        float: left;
        margin: 20px 10px 0 0;
    }

    .filtrateOk {
        width: 70px;
        height: 32px;
        background: #5acdfa;
        text-align: center;
        line-height: 32px;
        color: white;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    .searchBox {
        height: 32px;
        line-height: 32px;
        margin-left: 32px;
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
        width: 20%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(2) {
        width: 30%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 30%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) {
        width: 20%;
    }

    .listContentTop>div {
        font-size: 17px;
        font-weight: bold;
        color: #303030;
        background: #f2f4f8;
    }

    .operation {
        display: flex;
        justify-content: center;
    }

    .operation div {
        margin: 0 10px;
    }

    .operation img {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    /*批量删除*/

    .lastLi {
        display: flex;
        height: 60px;
        margin-top: 10px;
        justify-content: space-between;
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

    .omit {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 7px;
    }
</style>