<!--医院管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    医院管理
                </div>
                <div @click="addCommClick">
                    新增医院
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont">
                    <ul>
                        <li class="firstLi" v-loading="loading">
                            <div>
                                序号
                            </div>
                            <div>
                                医院名称
                            </div>
                            <div>
                                科室
                            </div>
                            <div>
                                级别
                            </div>
                            <div>
                                排序
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <div class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </div>
                        <li class="dataLi" v-for="(item,index) in dataLists">
                            <div>
                                {{index+1}}
                            </div>
                            <div>
                                {{item.hospitalName}}
                            </div>
                            <div class="astrict">
                                <span>
                                    <nobr>
                                        {{item.departments}}
                                    </nobr>
                                </span>

                            </div>
                            <div>
                                {{item.level}}
                            </div>
                            <div class="opexu">
                                <div>
                                    <img @click="rankClick(index,'up')" v-show=" index != 0" src="/static/img/up.png" alt="向上排序" title="向上排序">
                                    <img @click="grayupIndexClick" v-show=" index == 0" src="/static/img/grayup.png" alt="不可排序" title="不可排序">
                                </div>
                                <div>
                                    <img @click="rankClick(index,'down')" v-show=" index+1 != dataLists.length" src="/static/img/down.png" alt="向下排序" title="向下排序">
                                    <img @click="graydownIndexClick" v-show=" index+1 == dataLists.length" src="/static/img/graydown.png" alt="不可排序" title="不可排序">
                                </div>
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div>
                                    <img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部分页 -->
                    <div class="lastLi" v-show="dataLists.length > 0">
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
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okDeleteClick" @canle="canleClick" :name="titlename"></v-hosdel>
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
                rankClickTrueOrFalse: true,
                okDeleteClickTrueOrFalse: true,
                loading: false,
                titlename: "",
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                dataLists: [],
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 10,
                delIndex: ""
            };
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
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
                if (arrs.indexOf("hospital") == -1) {
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
                    self.hospitalList();
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
            //获取医院管理列表
            hospitalList() {
                var self = this;
                self.loading = true;
                self
                    .gethospitalmanageList({
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    })
                    .then(data => {
                        self.loading = false;
                        //console.log("医院管理列表", data);
                        if (data.code == 200) {
                            sessionStorage.removeItem("hospitalCurrentPage");
                            sessionStorage.removeItem("hospitalPageSizeNum");
                            if (data.data) {
                                if (data.data.records) {
                                    if (data.data.records.length == 0) {
                                        self.dataLists = []
                                    } else {
                                        self.dataLists = data.data.records;
                                        self.totalNum = data.data.total;
                                    }
                                } else {
                                    self.dataLists = []
                                }
                            } else {
                                self.dataLists = []
                            }
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    })
                    .catch(msg => {
                        //console.log(msg);
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                        self.loading = false;
                    });
            },
            // 状态选择
            selectStateClick(state) {
                //console.log(state);
            },
            // 分类选择
            selectTypeClick(type) {
                //console.log(type);
            },

            // 点击分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                this.hospitalList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.hospitalList();
            },
            // 修改医院信息
            updateClick(index) {
                var self = this;
                sessionStorage.setItem("hospitalCurrentPage", self.currentPage);
                sessionStorage.setItem("hospitalPageSizeNum", self.pageSizeNum);
                let edata = JSON.stringify(self.dataLists[index]);
                sessionStorage.setItem("edata", edata);
                self.$router.push({
                    path: "/medical/hospitalEdit"
                });
            },
            // 删除
            deleteClick(index) {
                this.titlename = "确定要删除该医院吗？";
                this.isShowdel = false;
                this.delShow = true;
                this.delIndex = index;
            },
            // 添加医院
            addCommClick() {
                this.$router.push({
                    path: "/medical/hospitalAdd"
                });
            },
            // 确认删除框
            okDeleteClick() {
                var self = this;
                if (self.okDeleteClickTrueOrFalse == true) {
                    self.okDeleteClickTrueOrFalse = false
                    self.getdelhospital({
                        idJson: "['" + self.dataLists[self.delIndex].id + "']"
                    })
                    .then(data => {
                        self.okDeleteClickTrueOrFalse = true
                        //console.log("删除医院", data);
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "删除成功！"
                            })
                            if (self.dataLists.length == 1) {
                                if (self.currentPage == 1) {
                                    self.currentPage = 1;
                                } else if (self.currentPage > 1) {
                                    self.currentPage = self.currentPage - 1;
                                }
                            }
                            this.isShowdel = true;
                            this.delShow = false;
                            self.hospitalList();
                        } else if (data.code == 700) {
                            this.isShowdel = true;
                            this.delShow = false;
                            this.$message({
                                type: "info",
                                message: "该医院有关联医生不可以删除！"
                            });
                        } else {
                            this.isShowdel = true;
                            this.delShow = false;
                            self.hospitalList();
                            this.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    })
                    .catch(msg => {
                        self.okDeleteClickTrueOrFalse = true
                        //console.log(msg);
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
                }
                
            },
            // 取消删除框
            canleClick() {
                this.isShowdel = true;
                this.delShow = false;
            },
            //医院列表排序
            rankClick(index, upOrDown) {
                if (this.flag == false) {
                    return;
                } else {
                    this.flag = false;
                    var clickEle = this.dataLists[index].sort;
                    //向上排序
                    if (upOrDown == "up") {
                        if (clickEle == 1) {
                            this.flag = true;
                            return;
                        } else {
                            var self = this;
                            if (self.rankClickTrueOrFalse == true) {
                                self.rankClickTrueOrFalse = false
                                self.getHospRank({
                                    hospitalId: self.dataLists[index].id,
                                    operation: "up"
                                })
                                .then(data => {
                                    self.rankClickTrueOrFalse = true
                                    //console.log("向上排序", data);
                                    if (data.code == 200) {
                                        self.hospitalList();
                                        this.flag = true;
                                    } else {
                                        this.flag = true;
                                        this.$message({
                                            type: "info",
                                            message: data.message
                                        });
                                    }
                                })
                                .catch(msg => {
                                    self.rankClickTrueOrFalse = true
                                    //console.log(msg);
                                    self.$message({
                                        type: "info",
                                        message: "服务器异常"
                                    });
                                });
                            }
                            
                        }
                        //向下排序
                    } else if (upOrDown == "down") {
                        if (clickEle == this.totalNum) {
                            this.flag = true;
                            return;
                        } else {
                            var self = this;
                            if (self.rankClickTrueOrFalse == true) {
                                self.rankClickTrueOrFalse = false
                                self.getHospRank({
                                    hospitalId: self.dataLists[index].id,
                                    operation: "down"
                                }).then(data => {
                                    self.rankClickTrueOrFalse = true
                                    //console.log("向下排序", data)
                                    if (data.code == 200) {
                                        this.flag = true;
                                        this.hospitalList();
                                    } else {
                                        this.flag = true;
                                        this.$message({
                                            type: "info",
                                            message: data.message
                                        });
                                    }
                                }).catch(msg => {
                                    self.rankClickTrueOrFalse = true
                                    //console.log(msg);
                                    self.$message({
                                        type: "info",
                                        message: "服务器异常"
                                    });
                                });
                            }
                            
                        }
                    }
                }
            },
            // 禁止向上
            grayupIndexClick() {
                this.$message({
                    type: "info",
                    message: "属性处于第一位不支持向上排序!"
                });
            },
            // 禁止向下
            graydownIndexClick() {
                this.$message({
                    type: "info",
                    message: "属性处于最后一位不支持向下排序!"
                });
            },
            ...mapActions(["gethospitalmanageList", "getdelhospital", "getHospRank"])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
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

    .slide-fade-enter-active {
        transition: all 0.7s ease;
    }

    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }

    /*主页*/

    .sale {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .sale>div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .recycle {
        height: 100px;
        width: 100%;
        overflow: hidden;
        display: flex;
    }

    .recycle>div:nth-child(1) {
        min-width: 60px;
        height: 35px;
        color: #353535;
        font-size: 16px;
        line-height: 35px;
    }

    .recycle>div:nth-child(2) {
        margin-left: 10px;
    }

    .recycle>div:nth-child(3) {
        margin-top: 3px;
        margin-left: 25px;
        width: 70px;
        height: 30px;
        background-color: #fe5371;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }

    .glyphicon-ok {
        color: green;
        font-size: 17px;
    }

    .glyphicon-remove {
        color: red;
        font-size: 17px;
    }

    .list {
        margin-top: 25px;
        min-height: 540px;
    }

    .listCont li {
        display: flex;
        height: 50px;
    }

    .firstLi {
        border-top: 1px solid #d9d9d9;
        line-height: 58px;
        height: 58px;
        background-color: #f2f4f8;
        border-bottom: 1px solid #d9d9d9;
    }

    .firstLi>div {
        border-right: 1px solid #e5e7eb;
        text-align: center;
        color: #303030;
        font-size: 17px;
        font-weight: bold;
    }

    .firstLi>div:nth-child(5) {
        min-width: 35px;
    }

    .firstLi>div:nth-child(6) {
        min-width: 35px;
    }

    .firstLi>div:nth-child(1) {
        border-left: 1px solid #e5e7eb;
    }

    .dataLi {
        border-bottom: 1px solid #ececec;
        background-color: #fff;
    }

    .dataLi .opexu {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dataLi .opexu>div {
        width: 25px;
        height: 25px;
        margin: 0 10px;
    }

    .opexu img {
        width: 25px;
        cursor: pointer;
        height: 25px;
    }

    .dataLi .operate {
        display: flex;
    }

    .dataLi .operate>div {
        margin: 0 10px;
    }

    .operate img {
        width: 25px;
        cursor: pointer;
        height: 25px;
    }

    .dataLi>div {
        border-right: 1px solid #ececec;
        text-align: center;     
        font-size: 14px;
        color: #515151;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dataLi>div:nth-child(2) {
        display: block;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .dataLi>div:nth-child(1) {
        border-left: 1px solid #ececec;
    }

    .listCont li>div:nth-child(1) {
        width: 15%;
        overflow: hidden;
        min-width: 60px;
    }

    .listCont li>div:nth-child(2) {
        width: 20%;
        overflow: hidden;
        min-width: 150px;
    }

    .listCont li>div:nth-child(3) {
        width: 20%;
        min-width: 100px;
    }

    .listCont li>div:nth-child(4) {
        width: 15%;
        min-width: 100px;
    }

    .listCont li>div:nth-child(5) {
        width: 15%;
        min-width: 90px;
    }

    .listCont li>div:nth-child(6) {
        width: 15%;
        min-width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
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

    .menu {
        height: 80px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .menuLeft {
        display: flex;
    }

    .menuLeft>div {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 23px;
    }

    .menuLeft>div:nth-child(1) {
        margin-left: 0;
    }

    .menuLeft>div>div:nth-child(1) {
        color: #303030;
        font-size: 14px;
        margin-right: 5px;
        min-width: 50px;
    }

    .menu>div:nth-child(2) {
        width: 95px;
        height: 35px;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-align: center;
        line-height: 35px;
        color: #000;
        font-size: 16px;
        margin-right: 15px;
        margin-top: 9px;
        cursor: pointer;
    }

    .astrict span {
        display: inline-block;
        width: 310px;
        padding: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>