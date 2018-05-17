<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="check">
        <div>
            <!-- 详情头部 -->
            <div class="checkTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        {{doctorname}}圈主详情
                    </div>
                </div>
            </div>
            <!-- 审核列表展示 -->
            <div class="checkList">
                <ul v-show="this.isShow == 2">
                    <li>
                        <div>
                            昵称：
                        </div>
                        <div>
                            {{isname}}
                        </div>
                    </li>
                    <li>
                        <div>
                            姓名：
                        </div>
                        <div>
                            {{names}}
                        </div>
                    </li>
                    <li>
                        <div>
                            所属医院：
                        </div>
                        <div>
                            {{doctorDetail}}
                        </div>
                    </li>
                    <li v-show="this.doctorShow == 3">
                        <div>
                            特殊说明：
                        </div>
                        <div>
                            此医生是后台添加的医生，没有证件照片！
                        </div>
                    </li>
                    <li v-show="this.doctorShow == 1">
                        <div>
                            医生职业证书：
                        </div>
                        <div>
                            <img :src="certificateImg" alt="暂无图片">
                        </div>
                    </li>
                    <li  v-show="this.doctorShow == 1">
                        <div>
                            职称证书或工牌：
                        </div>
                        <div>
                            <img :src="certificateImg" alt="暂无图片">
                        </div>
                    </li>
                </ul>
                <ul v-show="this.isShow == 1">
                    <li>
                        <div>
                            昵称：
                        </div>
                        <div>
                            {{isname}}
                        </div>
                    </li>
                    <li>
                        <div>
                            姓名：
                        </div>
                        <div>
                            {{names}}
                        </div>
                    </li>
                    <li>
                        <div>
                            身份证：
                        </div>
                        <div>
                            <img :src="workCardImgOne" alt="暂无图片" title="身份证正面">
                            <span>
                                （正面）
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>

                        </div>
                        <div>
                            <img :src="workCardImgTwo" alt="暂无图片" title="身份证反面">
                            <span>
                                （反面）
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                        </div>
                        <div>
                            <img :src="workCardImgThree" alt="手持身份证" title="手持身份证">
                            <span>
                                （手持）
                            </span>
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
                doctorname: "",
                certificateImg: "",
                workCardImgOne: "",
                workCardImgTwo: "",
                workCardImgThree: "",
                isRepulse: true,
                isRepulseShow: true,
                value1: '',
                isShow: '',
                names: '',
                isname: '',
                circleId: '',
                doctorDetail: '',
                doctorShow: '',
                circleUserData:''
            }
        },
        // 过滤
        filters: {
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
                    self.getCircleUserDataFun()
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
            //查看圈主资料
            getCircleUserDataFun() {
                var self = this;
                self.userId = sessionStorage.circleuserId
                self.getMedicalcirclegetCreatorDetail({
                    userId: self.userId,
                }).then((data) => {
                        //console.log("圈主详情", data)
                        if (data.code == 200) {
                            if (data.data.creatorType) {
                                self.isShow = data.data.creatorType
                                if (data.data.name) {
                                    self.names = data.data.name
                                } else {
                                    self.names = '暂无'
                                }
                                if (data.data.nickName) {
                                    self.isname = data.data.nickName
                                } else {
                                    self.isname = '暂无'
                                }
                                if (data.data.doctorDetail) {
                                    self.doctorDetail = data.data.doctorDetail
                                } else {
                                    self.doctorDetail = '暂无'
                                }
                                if (data.data.doctorType) {
                                    self.doctorShow = data.data.doctorType
                                    if (data.data.pictures) {
                                        if (data.data.pictures.titleCertificate) {
                                            self.workCardImg = data.data.pictures.titleCertificate
                                        } else {
                                            self.workCardImg = '暂无'
                                        }
                                        if (data.data.pictures.doctorPracticeCertificate) {
                                            self.certificateImg = data.data.pictures.doctorPracticeCertificate
                                        } else {
                                            self.certificateImg = '暂无'
                                        }
                                    }
                                } else {
                                    self.doctorShow = ''
                                }
                                //console.log(data.data.pictures)
                                if (data.data.pictures) {
                                    if (data.data.pictures.back) {
                                        self.workCardImgTwo = data.data.pictures.back
                                    } else {
                                        self.workCardImgBack = '暂无'
                                    }
                                    if (data.data.pictures.font) {
                                        self.workCardImgOne = data.data.pictures.font
                                    } else {
                                        self.workCardImgFront = '暂无'
                                    }
                                    if (data.data.pictures.handle) {
                                        self.workCardImgThree = data.data.pictures.handle
                                    } else {
                                        self.workCardImgHand = '暂无'
                                    }
                                }
                            } else {
                                self.$message({
                                    type: 'info',
                                    message: '服务器异常！'
                                })
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
            //返回按钮
            returnClick() {
                this.$router.push({
                    path: '/medical/circle'
                })
            },
            ...mapActions(['getMedicalcirclegetCreatorDetail'])
        },
        // 监视
        watch: {

        }
    }

</script>
<style scoped>
    .check {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .check>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .checkTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .checkTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .checkTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .checkTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .checkTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .checkList {
        margin-top: 24px;
    }

    .checkList li {
        overflow: hidden;
        margin-bottom: 24px;
    }

    .checkList li div {
        float: left;
    }

    .checkList li div:nth-child(1) {
        width: 200px;
        height: 32px;
        text-align: right;
        margin-right: 16px;
    }

    .checkList li div:nth-child(2) {
        text-align: left;
    }

    .checkList li div img {
        width: 320px;
        height: 168px;
    }

    </style scoped>