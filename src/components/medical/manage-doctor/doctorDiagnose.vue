<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="details">
        <div>
            <!-- 详情头部 -->
            <div class="detailsTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        {{doctorname}}医生的接诊详情
                    </div>
                </div>
            </div>
            <!-- 详情展示 -->
            <div class="detailsText">
                <div class="detailsTextFor" v-for="(item,index) in doctorDiagList">
                    <div class="detailsTextTop">
                        <div class="detailsTextTopLeft">
                            <ul>
                                <li>
                                    <div>姓名：</div>
                                    <div>{{item.patientName}}</div>
                                </li>
                                <li>
                                    <div>性别：</div>
                                    <div>{{item.patientSex}}</div>
                                </li>
                                <li>
                                    <div>年龄：</div>
                                    <div>{{item.patientAge}}</div>
                                </li>
                                <li>
                                    <div>症状：</div>
                                    <div>{{item.disease}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="detailsTextTopRight">
                            <span>{{item.createDate|dataFun}}</span>
                            <span>{{item.createDate|timeFun}}</span>
                        </div>
                    </div>
                    <div class="detailsTextFoot">
                        <ul>
                            <li>
                                <div>
                                    病人描述：
                                </div>
                                <div>
                                    {{item.supplyDescription}}
                                </div>
                            </li>
                            <li>
                                <div>
                                    诊断结果：
                                </div>
                                <div>
                                    {{item.diagnosis}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 底部分页 -->
            <div class="lastLi" v-show="doctorDiagList.length > 0">
                <div>
                </div>
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                doctorname: "",
                doctorDiagList: [],
                totalNum: 10,
                pageSizeNum: 10,
                currentPage: 1,
            }
        },
        // 过滤
        filters: {
            dataFun: function (val) {
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
                return "20" + year + "-" + month + "-" + date;
            },
            timeFun: function (val) {
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
                return hour + ":" + minute;
            }
        },
        // 模块新建时
        created: function () {
            this.diagnoseData = JSON.parse(sessionStorage.diadata)
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
                if (arrs.indexOf("doctor") == -1) {
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
                    this.doctorname = this.diagnoseData.doctorName
                    this.getdoctorDiagList()
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
            // 获取接诊列表
            getdoctorDiagList() {
                var self = this
                self.getdoctorFindPageLists({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    doctorId: self.diagnoseData.id,
                }).then((data) => {
                    console.log("医生接诊列表", data)
                    if (data.code == 200) {
                        if (data.data) {
                            self.totalNum = data.data.total
                            if (data.data.records) {
                                if (data.data.records.length > 0) {
                                    self.doctorDiagList = data.data.records

                                } else {
                                    self.doctorDiagList = []
                                }
                            } else {
                                self.doctorDiagList = []
                            }
                        } else {
                            self.doctorDiagList = []
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
            // 点击分页
            handleSizeChange(val) {
                this.pageSizeNum = val
                this.doctorList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.doctorList()
            },
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: '/medical/doctor'
                })
            },
            ...mapActions(['getdoctorFindPageLists'])
        },
        // 监视
        watch: {

        }
    }

</script>
<style scoped>
    .details {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .details>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .detailsTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .detailsTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .detailsTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .detailsTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .detailsTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .detailsText {
        font-size: 14px;
        line-height: 24px;
    }

    .detailsTextFor {
        width: 100%;
        min-width: 700px;
        max-width: 1106px;
        padding: 24px 0 10px;
        margin: 0 auto;
        color: #303030;
        border-bottom: 1px solid #d1d1d1;
    }

    .detailsTextTop {
        overflow: hidden;
        /* margin: 24px 0; */
    }

    .detailsTextTopLeft {
        float: left;
    }

    .detailsTextTopLeft li {
        float: left;
        margin-right: 30px;
    }

    .detailsTextTopLeft li div {
        float: left;
    }

    .detailsTextTopRight {
        float: right;
        color: #8f8e94;
    }

    .detailsTextFoot li {
        overflow: hidden;
        margin-top: 24px;
    }

    .detailsTextFoot li div {
        float: left;
    }

    .detailsTextFoot li div:nth-child(1) {
        width: 70px;
        margin-right: 14px;
    }

    .detailsTextFoot li div:nth-child(2) {
        width: 80%;
        max-width: 940px;
    }

    .lastLi {
        height: 60px;
        display: flex;
        margin-top: 24px;
        justify-content: space-between;
    }
</style>