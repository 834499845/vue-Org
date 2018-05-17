<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="dynamic">
        <div>
            <!-- 动态头部 -->
            <div class="dynamicTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        圈子管理/{{quanziName}}
                    </div>
                </div>
            </div>
            <!-- 动态列表展示 -->
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listConte">
                    <ul>
                        <li class="listConteTop listConteLI">
                            <div title="序号">
                                <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                <span>序号</span>
                            </div>
                            <div title="动态内容">
                                动态内容
                            </div>
                            <div title="发布人">
                                发布人
                            </div>
                            <div title="发布时间">
                                发布时间
                            </div>
                            <div title="评论数量">
                                评论数量
                            </div>
                            <div title="操作">
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <div class="noList" v-show="dataList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </div>
                        <li class="dataLi listConteLI" v-for="(item,index) in dataList">
                            <div>
                                <div>
                                    <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                        <el-checkbox :label="item" :key="item.id">{{index + 1}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div>
                                <span @click="datumClick(index)">
                                    {{item.content}}
                                </span>
                            </div>
                            <div>
                                {{item.userCircleNickName}}
                            </div>
                            <div>
                                {{item.createDate | ctimeFun}}
                            </div>
                            <div>
                                {{item.commentNum}}
                            </div>
                            <div class="operation">
                                <div>
                                    <img src="/static/img/删除.png" @click="delClick(index)" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部删除/分页 -->
                    <div class="lastLi" v-show="dataList.length > 0">
                        <div class="batchDelete" @click="batchDelClick">
                            批量删除
                        </div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum">
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
    import { mapActions, mapState } from 'vuex'
    import hosdel from '../../cModule/cancelBox'
    export default {
        components: {
            'v-hosdel': hosdel
        },
        data() {
            return {
                okdelclick: true,
                quanziName: "",  //圈子名称
                loading: false,
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [],  //圈子列表
                isShowdel: true,
                titlename: '',
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                circleId: '',  //动态父级圈子的id
                idstring: '',  // 要删除的id
            }
        },
        // 过滤
        filters: {
            // 返回日期格式化
            ctimeFun: function (val) {
                var now = new Date(val)
                var year = now.getYear() - 100;
                var month = now.getMonth() + 1;
                month = month > 9 ? month : "0" + month
                var date = now.getDate();
                date = date > 9 ? date : "0" + date
                var hour = now.getHours();
                hour = hour > 9 ? hour : "0" + hour
                var minute = now.getMinutes();
                minute = minute > 9 ? minute : "0" + minute
                return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
            },
        },
        // 模块新建时
        created: function () {
            var self = this
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
                if (arrs.indexOf("circle") == -1) {
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
                    self.dynamicData = JSON.parse(sessionStorage.dyndata)
                    self.quanziName = self.dynamicData.circleName
                    self.circleId = self.dynamicData.id
                    self.getdynamic()
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
        mounted() {

        },
        // 事件处理
        methods: {
            //圈子管理-动态列表
            getdynamic() {
                var self = this
                self.getdynamicList(
                    {
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        circleId: self.circleId,
                    }
                ).then((data) => {
                    //console.log("圈子动态列表", data)
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.records) {
                                if (data.data.records.length > 0) {
                                    self.dataList = data.data.records
                                    self.totalNum = data.data.total
                                } else {
                                    self.dataList = []
                                }
                            } else {
                                self.dataList = []
                            }
                        } else {
                            self.dataList = []
                        }
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        })
                    }
                }).catch(msg => {
                    //console.log(msg)
                    self.$message({
                        type: 'info',
                        message: '服务器异常！'
                    })
                })
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                this.getdynamic()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getdynamic()
            },
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: '/medical/circle'
                })
            },
            //点击动态内容跳转详情
            datumClick(index) {
                if (this.dataList[index].commentNum == 0) {
                    this.$message({
                        type: 'info',
                        message: '此动态下没有评论！'
                    })
                } else {
                    let remadata = JSON.stringify(this.dataList[index])
                    sessionStorage.setItem('remadata', remadata)
                    this.$router.push({
                        path: '/medical/remarkOn'
                    })
                }
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.id
                })
                var string = JSON.stringify(a)
                this.idstring = string

            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.id
                })
                var string = JSON.stringify(a)
                this.idstring = string

            },
            //批量删除
            batchDelClick() {
                if (this.checkList.length > 0) {
                    this.isShowdel = false
                    this.titlename = '这些圈子将被删除，该操作无法恢复！'
                } else {
                    this.$message({
                        type: 'info',
                        message: '请先选择序号！'
                    })
                }
                if (this.dataList.length - this.checkList.length > 0) {
                    this.iscurrentPage = this.currentPage
                } else {
                    if (this.currentPage = 1) {
                        this.iscurrentPage = 1
                    } else if (this.currentPage > 1) {
                        this.iscurrentPage = this.currentPage - 1
                    }
                }
            },
            //删除弹框
            delClick(index) {
                this.isShowdel = false
                this.titlename = '该动态将被删除，该操作无法恢复！'
                var deleteId = this.dataList[index].id
                var string = JSON.stringify(deleteId)
                this.idstring = "[" + string + "]"
                if (this.dataList.length == 1) {
                    if (this.currentPage == 1) {
                        this.iscurrentPage = 1
                    } else if (this.currentPage > 1) {
                        this.iscurrentPage = this.currentPage - 1
                    }
                } else {
                    this.iscurrentPage = this.currentPage
                }
            },
            //确认删除
            okDelClick() {
                //console.log("要删除的id", this.idstring)
                var self = this
                if (self.okdelclick == true) {
                    self.okdelclick = false
                    self.getdeleteDynamic(
                        {
                            dynamicIdJson: self.idstring,
                        }
                    ).then((data) => {
                        self.okdelclick = true
                        //console.log("删除动态", data)
                        if (data.code == 200) {
                            self.currentPage = self.iscurrentPage
                            self.getdynamic()
                        } else {
                            self.$message({
                                type: 'info',
                                message: data.message
                            })
                        }
                    }).catch(msg => {
                        self.okdelclick = true
                        //console.log(msg)
                        self.$message({
                            type: 'info',
                            message: '服务器异常！'
                        })
                    })
                }
                
                this.isShowdel = true
            },
            //取消删除
            canleClick() {
                this.isShowdel = true
            },
            ...mapActions(['getdynamicList', 'getdeleteDynamic'])
        },
        // 监视
        watch: {

        }
    }

</script>
<style scoped>
    .dynamic {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .dynamic>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .dynamicTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dynamicTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .dynamicTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .dynamicTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .dynamicTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .list {
        margin-top: 24px;
        min-height: 550px;
    }

    .list>div {
        margin: 0 auto;
    }

    /*列表*/

    .listConte {
        overflow: hidden;
    }

    .listConteTop {
        border-top: 1px solid #e5e7eb;
    }

    .listConteLI {
        display: flex;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
    }

    .listConte li>div:nth-child(1) {
        width: 14%;
        border-right: 1px solid #e5e7eb;
    }

    .listConte li>div:nth-child(2) {
        width: 29%;
        border-right: 1px solid #e5e7eb;
    }

    .listConte li>div:nth-child(3) {
        width: 14%;
        border-right: 1px solid #e5e7eb;
    }

    .listConte li>div:nth-child(4) {
        width: 18%;
        border-right: 1px solid #e5e7eb;
    }

    .listConte li>div:nth-child(5) {
        width: 12%;
        border-right: 1px solid #e5e7eb;
    }

    .listConte li>div:nth-child(6) {
        width: 13%;
    }

    .listConteTop>div {
        font-size: 17px;
        font-weight: bold;
        color: #303030;
        background: #f2f4f8
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

    /*批量删除*/

    .lastLi {
        display: flex;
        justify-content: space-between;
    }

    .batchDelete {
        width: 100px!important;
        height: 32px;
        background: #5acdfa;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        font-size: 17px;
        color: white;
        cursor: pointer;
    }

    .dataLi>div:nth-child(2) span {
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

    .operation {
        display: flex;
        justify-content: center;
    }

    .operation div img {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .listConte li>div:nth-child(2),
    .listConte li>div:nth-child(3),
    .listConte li>div:nth-child(4),
    .listConte li>div:nth-child(5) {
        overflow: hidden;
        padding: 0 7px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>