<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="auditCard">
        <div>
            <!-- 头部 -->
            <div class="head">
                <img @click="canelClick" src="/static/img/fan.png" alt=""> 查看身份证
            </div>
            <div class="listCss">
                <div class="listName">
                    昵称：
                </div>
                <div class="listContent">
                    {{nickname | strFun}}
                </div>
            </div>
            <div class="listCss">
                <div class="listName">
                    姓名：
                </div>
                <div class="listContent">
                    {{name | strFun}}
                </div>
            </div>
            <div class="listCss">
                <div class="listName">
                    领域：
                </div>
                <div class="listContent">
                    {{territory | strFun}}
                </div>
            </div>
            <div class="listCss">
                <div class="listName">
                    身份证正面：
                </div>
                <div class="listContent">
                    <img :src="cardFront" @click="workCardImgFrontClick" alt="身份证正面图片" title="身份证正面"> 点击可查看大图
                </div>
            </div>
            <div class="listCss">
                <div class="listName">
                    身份证反面：
                </div>
                <div class="listContent">
                    <img :src="cardContrary" @click="workCardImgBackClick" alt="身份证反面图片" title="身份证反面"> 点击可查看大图
                </div>
            </div>
        </div>
        <!-- 图片弹出框 -->
        <div class="imgPopupBoxFa" :class="{imgBoxShow:isImgBox}">
            <div class="imgPopupBox">
                <img id="imgZoom" :src="imgBox" @wheel.prevent="scrollBarWheel">
            </div>
            <div class="offImgBox" @click="offImgBoxClick">
                <img src="/static/img/添加.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    export default {
        data() {
            return {
                isImgBox: true,
                imgBox: "",
                nickname: "", //昵称
                name: "", //姓名
                territory: "", //领域
                // cardFront: "/static/img/dcor.jpg", //身份证正面
                // cardContrary: "/static/img/dcor.jpg" //身份证反面
                cardFront: "", //身份证正面
                cardContrary: "" //身份证反面
            };
        },
        // 过滤
        filters: {
            strFun: function(val) {
                if (val) {
                    return val
                } else {
                    return "暂无数据"
                }
            }
        },
        // 模块新建时
        created: function () {
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
                    this.getCardListFun()
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
            // 查看用户身份证信息
            getCardListFun() {
                var self = this;
                self
                    .getuserPermissionControllergetUserIdCard({
                        userId: self.$route.query.userId,
                        id: sessionStorage.getItem("auditId")
                    })
                    .then(data => {
                        if (data.code == 200) {
                            self.nickname = data.data.nickName
                            self.name = data.data.userName
                            self.territory = data.data.advantage
                            self.cardFront = data.data.cardLeftImg
                            self.cardContrary = data.data.cardLeftImg
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            // 箭头返回上一页
            canelClick() {
                this.$router.push({
                    path: "/news/audit"
                });
                sessionStorage.removeItem("auditId")
            },
            //身份证（正面）
            workCardImgFrontClick() {
                this.imgBox = this.cardFront;
                this.isImgBox = false;
            },
            //身份证（反面）
            workCardImgBackClick() {
                this.imgBox = this.cardContrary;
                this.isImgBox = false;
            },
            //关闭图片弹框
            offImgBoxClick() {
                this.imgBox = "";
                this.isImgBox = true;
            },
            //滚轮事件缩放图片
            scrollBarWheel(e) {
                var imgs = document.getElementById("imgZoom");
                var e = window.event || e; // 兼容处理
                var delta = e.deltaY; //鼠标滚动后事件中的值
                if (delta > 0) {
                    //鼠标向下滚动
                    if (imgs.offsetHeight <= 200) {
                        imgs.style.height == 200 + "px";
                    }
                    if (imgs.offsetWidth <= 500) {
                        imgs.style.width == 500 + "px";
                    } else {
                        imgs.style.width = imgs.offsetWidth - 50 + "px";
                    }
                } else {
                    //鼠标向上滚动
                    if (imgs.offsetHeight >= 750) {
                        imgs.style.height == 750 + "px";
                    }
                    if (imgs.offsetWidth >= 1100) {
                        imgs.style.width == 1100 + "px";
                    } else {
                        imgs.style.width = imgs.offsetWidth + 50 + "px";
                    }
                }
                return false;
            },
            ...mapActions(["getuserPermissionControllergetUserIdCard"])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .auditCard {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .auditCard>div:nth-child(1) {
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
        border-bottom: 1px solid #e5e5e5;
        font-size: 16px;
        font-weight: bold;
    }

    .head img {
        margin-right: 12px;
        cursor: pointer;
    }

    .listCss {
        display: flex;
        margin-left: 30px;
        margin-top: 32px;
    }

    .listName {
        width: 100px;
        text-align: right;
        margin-right: 16px;
    }

    .listContent img {
        width: 357px;
        height: 207px;
    }

    .imgPopupBoxFa {
        position: fixed;
        left: 0px;
        right: 0;
        margin: 0 auto;
        top: 70px;
        width: 98%;
        height: 800px;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000000;
        border-radius: 7px;
    }

    .imgBoxShow {
        display: none;
    }

    .imgPopupBox {
        width: 100%;
        text-align: center;
        line-height: 800px;
        z-index: 100000;
    }

    .offImgBox {
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 20px;
        right: 20px;
        overflow: hidden;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        /* IE 9 */
        -moz-transform: rotate(45deg);
        /* Firefox */
        -webkit-transform: rotate(45deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(45deg);
        /* Opera */
    }

    #imgZoom {
        max-width: 100%;
        max-height: 100%;
    }
</style>