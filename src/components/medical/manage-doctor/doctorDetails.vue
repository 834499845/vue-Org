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
                        {{doctorName}}医生的详情
                    </div>
                </div>
            </div>
            <!-- 详情展示 -->
            <div class="detailsText">
                <ul>
                    <li>
                        <div>
                            姓名：
                        </div>
                        <div>
                            {{doctorName}}
                        </div>
                    </li>
                    <li>
                        <div>
                            所属医院：
                        </div>
                        <div>
                            {{hospitalName}}
                        </div>
                    </li>
                    <li>
                        <div>
                            科室：
                        </div>
                        <div>
                            {{department}}
                        </div>
                    </li>
                    <li>
                        <div>
                            级别：
                        </div>
                        <div>
                            {{doctorLevel}}
                        </div>
                    </li>
                    <li>
                        <div>
                            状态：
                        </div>
                        <div>
                            {{doctorState|StateFun}}
                        </div>
                    </li>
                    <li>
                        <div>
                            标签：
                        </div>
                        <div>
                            {{label}}
                        </div>
                    </li>
                    <li>
                        <div>
                            医生简介：
                        </div>
                        <div class="lineSpacing">
                            {{instruction}}
                        </div>
                    </li>
                    <li>
                        <div>
                            擅长领域介绍：
                        </div>
                        <div class="lineSpacing">
                            {{fieldInstruction}}
                        </div>
                    </li>
                    <li>
                        <div>
                            医学背景介绍：
                        </div>
                        <div class="lineSpacing">
                            {{medicalInstruction}}
                        </div>
                    </li>
                    <li>
                        <div>
                            学术研究成果介绍：
                        </div>
                        <div class="lineSpacing">
                            {{academicInstruction}}
                        </div>
                    </li>
                    <li>
                        <div>
                            医生寄语：
                        </div>
                        <div class="lineSpacing">
                            {{doctorWrote}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                doctorName: '',
                hospitalName: '',
                department: '',
                doctorLevel: '',
                doctorState: '',
                label: '',
                instruction: '',
                fieldInstruction: '',
                medicalInstruction: '',
                academicInstruction: '',
                doctorWrote: '',
            }
        },
        // 过滤
        filters: {
            StateFun: function (val) {
                if (val == 0) {
                    return "未审核"
                }
                if (val == 1) {
                    return "审核通过"
                }
                if (val == 2) {
                    return "未通过"
                }
                if (val == 3) {
                    return "无需审核"
                }
            }
        },
        // 模块新建时
        created: function () {
            this.detailsData = JSON.parse(sessionStorage.dotdata)
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
                    self.getselectDoctorById({
                        doctorId: this.detailsData.id,
                    }).then((data) => {
                        //console.log("医生详情列表", data)
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.hospitalName) {
                                    self.hospitalName = data.data.hospitalName
                                } else {
                                    self.hospitalName = "暂无"
                                }
                                if (data.data.doctorState) {
                                    self.doctorState = data.data.doctorState
                                } else {
                                    self.doctorState = "暂无"
                                }
                                if (data.data.department) {
                                    self.department = data.data.department
                                } else {
                                    self.department = "暂无"
                                }
                                if (data.data.doctorLevel) {
                                    self.doctorLevel = data.data.doctorLevel
                                } else {
                                    self.doctorLevel = "暂无"
                                }
                                if (data.data.label) {
                                    self.label = data.data.label
                                } else {
                                    self.label = "暂无"
                                }
                                if (data.data.instruction) {
                                    self.instruction = data.data.instruction
                                } else {
                                    self.instruction = "暂无"
                                }
                                if (data.data.fieldInstruction) {
                                    self.fieldInstruction = data.data.fieldInstruction
                                } else {
                                    self.fieldInstruction = "暂无"
                                }
                                if (data.data.medicalInstruction) {
                                    self.medicalInstruction = data.data.medicalInstruction
                                } else {
                                    self.medicalInstruction = "暂无"
                                }
                                if (data.data.academicInstruction) {
                                    self.academicInstruction = data.data.academicInstruction

                                } else {
                                    self.academicInstruction = "暂无"
                                }
                                if (data.data.doctorWrote) {
                                    self.doctorWrote = data.data.doctorWrote
                                } else {
                                    self.doctorWrote = "暂无"
                                }
                            } else {
                                self.hospitalName = "暂无"
                                self.department = "暂无"
                                self.doctorLevel = "暂无"
                                self.label = "暂无"
                                self.instruction = "暂无"
                                self.fieldInstruction = "暂无"
                                self.medicalInstruction = "暂无"
                                self.academicInstruction = "暂无"
                                self.doctorWrote = "暂无"
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
            self.doctorName = self.detailsData.doctorName
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: '/medical/doctor'
                })
            },
            ...mapActions(['getselectDoctorById'])
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

    .detailsText li {
        margin: 24px 0;
        overflow: hidden;
    }

    .detailsText li div {
        float: left;
        font-size: 14px;
    }

    .detailsText li div:nth-child(1) {
        width: 130px;
        text-align: right;
    }

    .detailsText li div:nth-child(2) {
        width: 79%;
        min-width: 550px;
        max-width: 710px;
        text-align: left;
        margin-left: 16px;
    }

    .lineSpacing {
        line-height: 24px;
    }
</style>