<!--营销中心-优惠券-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    优惠券
                </div>
                <div @click="addClick">
                    新增优惠券
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            <img src="/static/img/search_1.png" alt="">
                        </div>
                        <div>
                            <input type="text" v-model="searchName" placeholder="活动名称">
                        </div>
                    </div>
                    <div class="search" @click="searchClick">
                        确定
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div class="firstCheckBox" style="width: 10%">
                                <div>
                                    <el-checkbox v-model="checked " @change="numChange "></el-checkbox>
                                </div>
                                <div>
                                    <span>编号</span>
                                </div>
                            </div>
                            <div style="width: 20%">
                                活动名称
                            </div>
                            <div style="width: 10%">
                                商家名称
                            </div>
                            <div style="width: 10%">
                                红包金额
                            </div>
                            <div style="width: 10%">
                                领取数量
                            </div>
                            <div style="width: 10%">
                                使用数量
                            </div>
                            <div style="width: 10%">
                                发行状态
                            </div>
                            <div style="width: 20%">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length> 0" v-for="(item,index) in lists">
                            <div class="dataCheck" style="width: 10%">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="index">{{checkNull}}</el-checkbox>
                                </el-checkbox-group>
                                <div>
                                    {{index + 1}}
                                </div>
                            </div>
                            <div style="width: 20%">
                                {{item.name | strFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.shopName | serverFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.discountAmount | numFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.getNumber | numFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.useNumber | numFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.state | strFun}}
                            </div>
                            <div class="operate" style="width: 20%">
                                <div v-show="item.issueState == '1'" @click="grantEndClick(index)">
                                    <img src="/static/img/s停止.png" alt="停止" title="停止">
                                </div>
                                <div v-show="item.issueState == '0' " @click="grantStartClick(index)">
                                    <img src="/static/img/s开始.png" alt="开始" title="开始">
                                </div>
                                <div @click="lookClick(index)">
                                    <img src="/static/img/查看.png" alt="查看" title="查看">
                                </div>
                                <div @click="compileClick(index)">
                                    <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div @click="deleteClick(index)">
                                    <img src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="lists.length > 0">
                            <div class="lastLiLeft">
                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum"
                                    :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recycle" v-show="lists.length > 0">
                    <div>
                        回收站：
                    </div>
                    <div>
                    </div>
                    <div @click="recycleClick">
                        删除
                    </div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="loading">
                    <v-storeDel @ok="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from "vuex";
    import storeDel from "../../cModule/storeDel";
    import storeRecycle from "../../cModule/storeRecycle";
    export default {
        components: {
            "v-storeDel": storeDel,
            "v-storeRecycle": storeRecycle
        },
        data() {
            return {
                searchName: "",
                searchTrue: true,
                loading: false,
                checkNull: "",
                checked: false,
                checkList: [],
                lists: [],
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 0,
                titlename: "",
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                delIndex: 0,
                idArr: [],
                deletes: true,
                okClickShow: false,
                delClickTrue: false,
                grantEndClickTrue: false,
                grantStartClickTrue: false
            };
        },
        // 过滤
        filters: {
            strFun: function (val) {
                if (val) {
                    return val;
                } else {
                    return "无";
                }
            },
            serverFun: function (val) {
                if (val) {
                    return val;
                } else {
                    return "平台自营";
                }
            },
            numFun: function (val) {
                if (val > 0) {
                    return val;
                } else {
                    return 0;
                }
            }
        },
        // 模块新建时
        created: function () {
            var self = this;
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            if (sessionStorage.getItem("packetcurrentPage")) {
                this.currentPage = Number(sessionStorage.getItem("packetcurrentPage"));
                this.pageSizeNum = Number(sessionStorage.getItem("packetpageSizeNum"));
            }
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                var comms = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "商城管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                            if (one.name == "营销中心") {
                                one.children.forEach(function (two, twoIndex) {
                                    comms.push(two.path);
                                });
                            }
                        });
                    }
                });
                if (arrs.indexOf("marketing") == -1) {
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
                    if (comms.indexOf("packet") == -1) {
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
                        if (sessionStorage.getItem("packetsearchName")) {
                            self.searchName = sessionStorage.getItem("packetsearchName");
                            self.okClickShow = true;
                            self.listpacketNameFun();
                        } else {
                            self.okClickShow = false;
                            self.listFun();
                        }
                    }
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
            // 初始数据
            listFun() {
                var self = this;
                self.checkList = [];
                self.checked = false;
                self.loading = true;
                sessionStorage.removeItem("packetcurrentPage");
                sessionStorage.removeItem("packetpageSizeNum");
                self
                    .getstorecouponpage({
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    })
                    .then(data => {
                        self.loading = false;
                          console.log("优惠券列表", JSON.parse(JSON.stringify(data)));
                        if (data.code == 200) {
                            if (data.data) {
                                self.totalNum = data.data.total;
                                if (data.data.records) {
                                    if (data.data.records.length > 0) {
                                        self.lists = data.data.records;
                                    } else {
                                        self.lists = [];
                                    }
                                } else {
                                    self.lists = [];
                                }
                            } else {
                                self.lists = [];
                            }
                        } else {
                            self.lists = [];
                            self.$message({
                                type: "info",
                                message: "获取失败!"
                            });
                        }
                    })
                    .catch(msg => {
                        self.lists = [];
                        //   console.log(msg);
                        self.loading = false;
                        self.$message({
                            type: "info",
                            message: "获取失败!"
                        });
                    });
            },
            // 搜索初始数据
            listpacketNameFun() {
                var self = this;
                self.currentPage = 1;
                self.loading = true;
                self
                    .getstorecouponpage({
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        name: self.searchName
                    })
                    .then(data => {
                        self.loading = false;
                        //   console.log("优惠券搜索列表", JSON.parse(JSON.stringify(data)));
                        sessionStorage.removeItem("packetsearchName");
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.records) {
                                    if (data.data.records.length > 0) {
                                        self.lists = data.data.records;
                                        self.totalNum = data.data.total;
                                    } else {
                                        self.lists = [];
                                    }
                                } else {
                                    self.lists = [];
                                }
                            } else {
                                self.lists = [];
                            }
                        } else {
                            self.lists = [];
                            self.$message({
                                type: "info",
                                message: "获取失败!"
                            });
                        }
                    })
                    .catch(msg => {
                        self.lists = [];
                        sessionStorage.removeItem("packetsearchName");
                        //   console.log(msg);
                        self.loading = false;
                        self.$message({
                            type: "info",
                            message: "获取失败!"
                        });
                    });
            },
            // 回收站
            selectrecycleClick() { },
            // 批量删除
            recycleClick() {
                var self = this;
                if (this.checkList.length > 0) {
                    this.checkList.forEach(function (ele, index) {
                        self.idArr.push(ele.id);
                    });
                    this.isShowdel = false;
                    this.delShow = true;
                    this.titlename = "活动";
                    this.deletes = false;
                } else {
                    self.$message({
                        type: "info",
                        message: "请选择优惠券!"
                    });
                }
            },
            // 所有序号被选中时
            numChange(event) {
                this.checkList = event.target.checked ? this.lists : [];
                //   console.log(this.checkList);
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.lists.length;
            },
            // 每页个数
            handleSizeChange(val) {
                var self = this;
                self.currentPage = 1;
                self.pageSizeNum = val;
                if (self.okClickShow) {
                    self.listpacketNameFun();
                } else {
                    self.listFun();
                }
            },
            //  点击分页
            handleCurrentChange(val) {
                var self = this;
                this.currentPage = val;
                if (self.okClickShow) {
                    self.listpacketNameFun();
                } else {
                    self.listFun();
                }
            },
            // 搜索
            searchClick() {
                var self = this;
                self.okClickShow = true;
                self.currentPage = 1;
                if (self.searchTrue == false) {
                    self.loading = true;
                    self
                        .getstorecouponpage({
                            pageNo: self.currentPage,
                            pageSize: self.pageSizeNum,
                            name: self.searchName
                        })
                        .then(data => {
                            self.loading = false;
                            // console.log("优惠券搜索列表", JSON.parse(JSON.stringify(data)));
                            if (data.code == 200) {
                                if (data.data) {
                                    if (data.data.records) {
                                        if (data.data.records.length > 0) {
                                            self.lists = data.data.records;
                                            self.totalNum = data.data.total;
                                        } else {
                                            self.lists = [];
                                        }
                                    } else {
                                        self.lists = [];
                                    }
                                } else {
                                    self.lists = [];
                                }
                            } else {
                                self.lists = [];
                                self.$message({
                                    type: "info",
                                    message: "获取失败!"
                                });
                            }
                        })
                        .catch(msg => {
                            self.lists = [];
                            // console.log(msg);
                            self.loading = false;
                            self.$message({
                                type: "info",
                                message: "获取失败!"
                            });
                        });
                } else {
                    self.$message({
                        type: "info",
                        message: "请输入活动名称!"
                    });
                }
            },
            // 发放
            grantStartClick(index) {
                var self = this;
                if (self.grantStartClickTrue == false) {
                    if (self.lists[index].state == "在发行期内") {
                        self.loading = true;
                        self.grantStartClickTrue = true;
                        self
                            .getstorecouponissue({
                                id: self.lists[index].id,
                                issueState: 1
                            })
                            .then(data => {
                                self.loading = false;
                                self.grantStartClickTrue = false;
                                if (data.code == 200) {
                                    self.$message({
                                        type: "success",
                                        message: "发放成功!"
                                    });
                                    self.listFun();
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: "发放失败!"
                                    });
                                }
                            })
                            .catch(msg => {
                                self.grantStartClickTrue = false;
                                self.loading = false;
                                self.$message({
                                    type: "info",
                                    message: "发放失败!"
                                });
                            });
                    } else {
                        self.$message({
                            type: "info",
                            message: "该优惠券还未开始发放或已结束发放"
                        });
                    }
                }
            },
            // 暂停
            grantEndClick(index) {
                var self = this;
                if (self.grantEndClickTrue == false) {
                    if (self.lists[index].state == "在发行期内") {
                        self.loading = true;
                        self.grantEndClickTrue = true;
                        self
                            .getstorecouponissue({
                                id: self.lists[index].id,
                                issueState: 0
                            })
                            .then(data => {
                                self.loading = false;
                                self.grantEndClickTrue = false;
                                if (data.code == 200) {
                                    self.$message({
                                        type: "success",
                                        message: "暂停成功!"
                                    });
                                    
                                    self.listFun();
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: "暂停失败!"
                                    });
                                }
                            })
                            .catch(msg => {
                                self.grantEndClickTrue = false;
                                self.loading = false;
                                self.$message({
                                    type: "info",
                                    message: "暂停失败!"
                                });
                            });
                    } else {
                        self.$message({
                            type: "info",
                            message: "该优惠券还未开始发放或已结束发放"
                        });
                    }
                }
            },
            // 删除优惠券弹框
            deleteClick(index) {
                var self = this;
                if (self.lists[index].state != "在发行期内") {
                    this.isShowdel = false;
                    this.delShow = true;
                    this.delIndex = index;
                    this.titlename = "活动";
                    this.deletes = true;
                } else {
                    self.$message({
                        type: "info",
                        message: "正在发行中，不可删除"
                    });
                }
            },
            // 确认删除优惠券
            delClick() {
                var self = this;
                if (self.delClickTrue == false) {
                    var idStr = "";
                    if (self.deletes == false) {
                        var currentNum = self.currentPage;
                        if (self.idArr.length == self.lists.length && self.currentPage > 1) {
                            self.currentPage = currentNum - 1;
                        }
                        idStr = self.idArr.join(",");
                    } else {
                        var currentNum = self.currentPage;
                        if (self.lists.length == 1 && self.currentPage > 1) {
                            self.currentPage = currentNum - 1;
                        }
                        idStr = self.lists[self.delIndex].id;
                    }
                    self.loading = true;
                    self.delClickTrue = true;
                    self
                        .getstorecoupondeleteById({
                            idJson: "[" + idStr + "]"
                        })
                        .then(data => {
                            self.loading = false;
                            self.delClickTrue = false;
                            self.checked = false;
                            self.checkList = [];
                            self.idArr = [];
                            self.isShowdel = true;
                            self.delShow = false;
                            if (data.code == 200) {
                                self.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                if (self.okClickShow) {
                                    self.listpacketNameFun();
                                } else {
                                    self.listFun();
                                }
                            } else {
                                self.$message({
                                    type: "info",
                                    message: data.message
                                });
                            }
                        })
                        .catch(msg => {
                            self.loading = false;
                            self.delClickTrue = false;
                            self.$message({
                                type: "info",
                                message: "删除失败!"
                            });
                        });
                }
            },
            // 查看优惠券
            lookClick(ind) {
                var self = this;
                if (self.okClickShow) {
                    sessionStorage.setItem("packetsearchName", self.searchName);
                    sessionStorage.setItem("packetcurrentPage", self.currentPage);
                    sessionStorage.setItem("packetpageSizeNum", self.pageSizeNum);
                } else {
                    sessionStorage.setItem("packetcurrentPage", self.currentPage);
                    sessionStorage.setItem("packetpageSizeNum", self.pageSizeNum);
                }
                this.$router.push({
                    path: "/store/marketing/lookPacket",
                    query: {
                        id: self.lists[ind].id
                    }
                });
            },
            // 编辑优惠券
            compileClick(ind) {
                var self = this;
                if (self.okClickShow) {
                    sessionStorage.setItem("packetsearchName", self.searchName);
                    sessionStorage.setItem("packetcurrentPage", self.currentPage);
                    sessionStorage.setItem("packetpageSizeNum", self.pageSizeNum);
                } else {
                    sessionStorage.setItem("packetcurrentPage", self.currentPage);
                    sessionStorage.setItem("packetpageSizeNum", self.pageSizeNum);
                }
                this.$router.push({
                    path: "/store/marketing/operatePacket",
                    query: {
                        operation: 2,
                        id: self.lists[ind].id
                    }
                });
            },
            // 添加优惠券
            addClick(ind) {
                this.$router.push({
                    path: "/store/marketing/operatePacket",
                    query: {
                        operation: 1
                    }
                });
            },
            // 取消弹出框
            cancleClick() {
                this.isShowdel = true;
                this.delShow = false;
                this.titlename = "";
                this.isShowRecycle = true;
            },
            ...mapActions([
                "getstorecoupondeleteById",
                "getstorecouponissue",
                "getstorecouponpage"
            ])
        },
        // 监视
        watch: {
            searchName: function (val) {
                var self = this;
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
                if (trimstr.length <= 0) {
                    if (this.okClickShow) {
                        this.okClickShow = false;
                        this.searchTrue = true;
                        self.listFun();
                    }
                } else {
                    this.searchTrue = false;
                }
            }
        }
    };
</script>
<style scoped>
    .list .nullList {
        height: 400px;
    }

    .list .nullList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }

    .sale {
        width: 100%;
        height: 100%;
    }

    .sale>div {
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
        /*margin-left: 10px;*/
    }

    .recycle>div:nth-child(3) {
        margin-top: 3px;
        margin-left: 10px;
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

    #lastLiRight {
        width: 80%;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .lastLi>div:nth-child(1) {
        width: 10px;
    }

    .lastLi>div:nth-child(2) {
        width: 80%;
        display: flex;
        justify-content: flex-end;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }

    .operate {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .operate>div {
        width: 24px;
        height: 24px;
        cursor: pointer;
        overflow: hidden;
    }

    .operate>div:nth-child(1) {
        margin-right: 9px;
    }

    .operate>div:nth-child(2) {
        margin-right: 9px;
    }

    .operate>div:nth-child(3) {
        margin-left: 9px;
        margin-right: 9px;
    }

    .operate>div:nth-child(4) {
        margin-left: 9px;
        margin-right: 9px;
    }

    .operate>div:nth-child(5) {
        margin-left: 9px;
    }

    .operate>div img {
        width: 100%;
        height: 100%;
    }

    .firstLi {
        border-top: 1px solid #d9d9d9;
        line-height: 58px;
        height: 58px;
        background-color: #f2f4f8;
        border-bottom: 1px solid #d9d9d9;
    }

    .dataCheck>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
    }

    .dataCheck>div:nth-child(2) {
        width: 25px;
        line-height: 22px;
        height: 25px;
    }

    .dataCheck>div:nth-child(3) {
        margin-left: 5px;
    }

    .dataCheck>div:nth-child(3) span {
        height: 40px;
        margin-top: 1px;
        display: block;
        font-size: 15px;
    }

    .firstCheckBox {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .firstCheckBox>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0px;
        margin-top: 5px;
    }

    .firstCheckBox>div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
    }

    .firstLi>div {
        border-right: 1px solid #e5e7eb;
        text-align: center;
        color: #303030;
        font-size: 17px;
        font-weight: bold;
    }

    .firstLi>div:nth-child(1) {
        border-left: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dataLi {
        border-bottom: 1px solid #ececec;
        background-color: #fff;
    }

    .dataLi>div {
        border-right: 1px solid #ececec;
        font-size: 15px;
        color: #515151;
        height: 58px;
    }

    .dataLi>div:nth-child(1) {
        border-left: 1px solid #ececec;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(1) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(2) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 58px;
        height: 58px;
        text-align: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(2) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(3) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 58px;
        height: 58px;
        text-align: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(3) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(4) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 58px;
        height: 58px;
        text-align: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(4) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(5) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 58px;
        height: 58px;
        text-align: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(5) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(6) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 58px;
        height: 58px;
        text-align: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(6) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(7) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 58px;
        height: 58px;
        text-align: center;
        min-width: 74px;
    }

    .firstLi>div:nth-child(7) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 74px;
    }

    .dataLi>div:nth-child(8) {
        min-width: 155px;
    }

    .firstLi>div:nth-child(8) {
        min-width: 155px;
    }

    .listCont li {
        display: flex;
        min-height: 50px;
    }

    .list {
        min-height: 540px;
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
        border: 1px solid #fe5371;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #fe5371;
        cursor: pointer;
    }

    .menu {
        height: 80px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .menuLeft input {
        border: 0;
    }

    .menuLeft {
        display: flex;
    }

    .menuLeft>div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menuLeft .search {
        width: 70px;
        margin-left: 32px;
        height: 30px;
        text-align: center !important;
        line-height: 30px;
        cursor: pointer;
        background-color: #fe5371;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
    }

    .menuLeft>div:nth-child(1) {
        margin-left: 0;
        border: 1px solid #eaeaea;
        width: 270px;
        overflow: hidden;
        border-radius: 4px;
    }

    .menuLeft>div>div:nth-child(1) {
        color: #303030;
        width: 32px;
        display: flex;
        align-items: center;
    }

    .menuLeft>div>div:nth-child(1) img {
        margin-left: 12px;
    }

    .menuLeft>div>div:nth-child(2) {
        width: 230px;
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

    .menuLeft input {
        width: 230px;
        height: 32px;
        border: 0;
        border-radius: 3px;
        padding-left: 5px;
    }

    select {
        width: 120px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
        /*padding-left: 14px;*/
        font-size: 14px;
        color: #97969b;
        border: 1px solid #d1d1d1;
        /*text-align: center;*/
        overflow: hidden;
    }

    select::-ms-expand {
        display: none;
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
</style>