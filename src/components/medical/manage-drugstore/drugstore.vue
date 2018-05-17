<!--问答管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    药店管理
                </div>
                <div @click="addCommClick">
                    新增药店
                </div>
            </div>
            <!-- 筛选 -->
            <div class="filtrate">
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" v-model="filtrateModel" maxlength="25" placeholder="输入后点击确定开始搜索">
                </div>
                <div class="filtrateOk" @click="searchClick">
                    确定
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div>
                                药店名称
                            </div>
                            <div>
                                地址
                            </div>
                            <div>
                                联系方式
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
                                {{item.drugstoreName}}
                            </div>
                            <div class="omit">
                                {{item.site}}
                            </div>
                            <div class="omit">
                                {{item.contact}}
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
                </div>
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
                okDelClickTrueOrFalse: true,
                loading: false,
                dataList: [],
                isShowdel: true,
                titlename: '',
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                filtrateModel: '',
                filtrateModelUp: '',    //上传的关键字
                searchShow: false,  //判断是否确定筛选
                ifGetList: true,
            }
        },
        // 过滤
        filters: {
        },
        // 模块新建时
        created: function () {
            var self = this
            if (sessionStorage.getItem("drugstoreCurrentPage")) {
                self.currentPage = Number(sessionStorage.getItem("drugstoreCurrentPage"))
            }
            if (sessionStorage.getItem("drugstorePageSizeNum")) {
                self.pageSizeNum = Number(sessionStorage.getItem("drugstorePageSizeNum"))
            }
            if (sessionStorage.getItem("drugstorefiltrateModel")) {
                self.filtrateModelUp = self.filtrateModel = sessionStorage.getItem("drugstorefiltrateModel")
                this.searchShow = true
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
                if (arrs.indexOf("drugstore") == -1) {
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
                    self.getdrugstore()
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
            //药店管理-分页
            getdrugstore() {
                var self = this
                self.ifGetList = false
                self.loading = true
                self.getdrugstoreList(
                    {
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum,
                        drugstoreName: self.filtrateModelUp,
                    }
                ).then((data) => {
                    self.loading = false
                    //console.log("药店管理列表", data)
                    if (data.code == 200) {
                        sessionStorage.removeItem("drugstoreCurrentPage")
                        sessionStorage.removeItem("drugstorePageSizeNum")
                        sessionStorage.removeItem("drugstorefiltrateModel")
                        if (data.data) {
                            if (data.data.records) {
                                if (data.data.records.length == 0) {
                                    self.$message({
                                        type: 'info',
                                        message: '暂无数据！'
                                    })
                                    self.dataList = []
                                } else {
                                    self.dataList = data.data.records
                                    self.totalNum = data.data.total
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
                    self.ifGetList = true
                }).catch(msg => {
                    //console.log(msg)
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                    self.loading = false
                    self.ifGetList = true
                })
            },
            //模糊搜索
            searchClick() {
                if (this.filtrateModel.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请输入搜索关键词！'
                    })
                } else {
                    if (this.ifGetList == false) {
                        this.$message({
                            type: "info",
                            message: "数据请求中请稍后！",
                        })
                    } else {
                        this.currentPage = 1
                        this.pageSizeNum = 10
                        this.searchShow = true
                        this.filtrateModelUp = this.filtrateModel
                        this.getdrugstore()
                    }
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                if (this.searchShow) {
                    this.filtrateModelUp = this.filtrateModel
                } else {
                    this.filtrateModelUp = ""
                }
                this.getdrugstore()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                if (this.searchShow) {
                    this.filtrateModelUp = this.filtrateModel
                } else {
                    this.filtrateModelUp = ""
                }
                this.getdrugstore()
            },
            //删除弹框
            delClick(index) {
                this.cancelId = this.dataList[index].id
                this.isShowdel = false
                this.titlename = '该信息将被删除，该操作无法恢复！'
            },
            //确认删除
            okDelClick() {
                var self = this
                if (self.okDelClickTrueOrFalse == true) {
                    self.okDelClickTrueOrFalse = false
                    self.getcancelDrugstoreList(
                        {
                            id: this.cancelId,
                        }
                    ).then((data) => {
                        self.okDelClickTrueOrFalse = true
                        //console.log("药店管理列表", data)
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
                            self.getdrugstore()
                            self.isShowdel = true
                        } else {
                            self.$message({
                                type: 'info',
                                message: data.message
                            })
                        }
                    }).catch(msg => {
                        self.okDelClickTrueOrFalse = true
                        //console.log(msg)
                        self.$message({
                            type: 'info',
                            message: '服务器异常'
                        })
                    })
                }
                
            },
            //取消删除
            canleClick() {
                this.isShowdel = true
            },
            //新增药物
            addCommClick() {
                this.$emit('appchildsay', "drugstore")
                this.$router.push({
                    path: '/medical/drugstoreAdd'
                })
            },
            //编辑按钮
            comClick(index) {
                var self = this
                sessionStorage.setItem("drugstoreCurrentPage", self.currentPage)
                sessionStorage.setItem("drugstorePageSizeNum", self.pageSizeNum)
                sessionStorage.setItem("drugstorefiltrateModel", self.filtrateModelUp)
                let eDrugstdata = JSON.stringify(self.dataList[index])
                sessionStorage.setItem('eDrugstdata', eDrugstdata)
                self.$router.push({
                    path: '/medical/drugstoreEdit'
                })
            },
            ...mapActions(['getdrugstoreList', 'getcancelDrugstoreList'])
        },
        watch: {
            //模糊搜索
            filtrateModel: function (val) {
                this.changeval = val.length
                if (this.changeval == 0) {
                    if (this.searchShow) {
                        this.filtrateModelUp = ''
                        this.currentPage = 1
                        this.pageSizeNum = 10
                        this.searchShow = false
                        this.getdrugstore()
                    }
                }
            },
        }
    }

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
        margin-bottom: 100px;
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
        width: 30%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(2) {
        width: 35%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 15%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) {
        width: 20%;
    }

    .listContentTop>div {
        font-size: 17px;
        font-weight: bold;
        color: #303030;
        background: #f2f4f8
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

    .omit {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 7px;
    }
</style>