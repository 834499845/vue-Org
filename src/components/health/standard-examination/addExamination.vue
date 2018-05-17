<!--添加健康检查-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        健康检查
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="addOneing">
                <div class="list-rolus">
                    <div>
                        <div>
                            所有问题：
                        </div>
                        <div class="list-issue">
                            <ul>
                                <li v-for="(item,index) in issuelists" :key="index">
                                    <div>{{index + 1}}.</div>
                                    <div>{{item.name}}</div>
                                    <div>
                                        <el-radio class="radio" v-model="item.rstr" :label="item.radind">是</el-radio>
                                    </div>
                                    <div>
                                        <el-radio class="radio" v-model="item.rstr" :label="-item.radind">否</el-radio>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            问题内容：
                        </div>
                        <div>
                            <textarea v-model="content"></textarea>
                        </div>
                        <div @click="lineClick">
                            换行
                        </div>
                    </div>
                    <div>
                        <div>
                            问题摘要：
                        </div>
                        <div>
                            <textarea v-model="remark"></textarea>
                        </div>
                    </div>
                </div>
                <div class="but">
                    <div @click="addClick">确定</div>
                    <div @click="canelClick">取消</div>
                </div>
            </div>
        </div>
        <!--取消弹出框-->
        <div class="delPopup" v-show="isShowdel">
            <transition>
                <div class="delContent">
                    <v-hosdel @ok="confirmClick" @canle="cancelClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from "vuex";
    import select from "../../cModule/select";
    import textraea from "../../cModule/textraea";
    import hosdel from "../../cModule/cancelBox";
    export default {
        components: {
            "v-select": select,
            "v-hosdel": hosdel,
            "v-textra": textraea
        },
        computed: mapState([""]),
        data() {
            return {
                intercept: false,
                isShowdel: false,
                titlename: "劳动成果还未保存，是否退出？",
                addOneing: false,
                issuelists: [],
                radio: true,
                content: "",
                remark: "",
                addClickTrue: false
            };
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            var self = this;
            // 查询权限
            self.addOneing = true;
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");

            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "健康管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("examination") == -1) {
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
                    if (self.$route.query.ap == 0) {
                        // 获取问题列表
                        self.addOneing = false;
                        self
                            .gethealthfindJcOptionsList({
                                code: self.$route.query.type
                            })
                            .then(data => {
                                //   console.log("健康档案问题", JSON.parse(JSON.stringify(data)));
                                if (data.code == 200) {
                                    if (data.data.length > 0) {
                                        var arrs = data.data;
                                        arrs.forEach(function (ele, ind) {
                                            var rstrind = ind + 1;
                                            self.issuelists.push({
                                                id: ele.id,
                                                code: ele.code,
                                                name: ele.name,
                                                result: ele.result,
                                                radind: ele.id * 1,
                                                rstr: "rste" + ele.id
                                            });
                                        });
                                    } else {
                                    }
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: data.message
                                    });
                                }
                            })
                            .catch(msg => {
                                //   console.log(msg);
                                self.$message({
                                    type: "info",
                                    message: "服务器异常"
                                });
                            });
                    } else {
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
        //跳转拦截
        beforeRouteLeave(to, from, next) {
            this.toPath = to.path;
            if (this.intercept == false) {
                this.isShowdel = true;
            } else if (this.intercept == true) {
                this.isShowdel = false;
                next();
            }
        },
        // 事件处理
        methods: {
            //确定取消
            confirmClick() {
                this.intercept = true;
                var url = this.toPath;
                this.$router.push({
                    path: url
                });
            },
            //取消未保存弹出框
            cancelClick() {
                this.isShowdel = false;
            },
            // 箭头返回上一页
            canelClick() {
                var self = this;
                self.$router.push({
                    path: "/health/examination"
                });
            },
            lineClick() {
                var self = this;
                var cont = self.content;
                self.content = cont + "\n\n";
            },
            // 添加
            addClick() {
                var self = this;
                if (self.addClickTrue == false) {
                    if (self.$route.query.ap == 0) {
                        var ruleJsons = [];
                        this.issuelists.forEach(function (ele, ind) {
                            if (isNaN(ele.rstr)) {
                                self.radio = false;
                            } else {
                                ruleJsons.push(ele.rstr);
                                self.radio = true;
                            }
                        });
                        if (self.radio == false) {
                            self.$message({
                                type: "info",
                                message: "所有题目必须勾选!"
                            });
                        } else {
                            if (self.content.length <= 500 && self.remark.length <= 30) {
                                self.addClickTrue = true;
                                self
                                    .gethealthbodyCheckRuleAdd({
                                        contentJson: "['" + self.content + "']",
                                        remarkJson: "['" + self.remark + "']",
                                        ruleJson: "['" + ruleJsons.join(",") + "']",
                                        typeJson: "['" + self.$route.query.type + "']"
                                    })
                                    .then(data => {
                                        self.addClickTrue = false;
                                        if (data.code == 200) {
                                            self.intercept = true
                                            self.$message({
                                                type: "success",
                                                message: "添加规则成功!"
                                            });
                                            self.$router.push({
                                                path: "/health/examination"
                                            });
                                        } else {
                                            self.$message({
                                                type: "info",
                                                message: data.message
                                            });
                                        }
                                    })
                                    .catch(msg => {
                                        self.addClickTrue = false;
                                        self.$message({
                                            type: "info",
                                            message: "服务器异常"
                                        });
                                    });
                            } else {
                                if (self.content.length > 500) {
                                    self.$message({
                                        type: "info",
                                        message: "问题内容字数不得超过500!"
                                    });
                                } else if (self.remark.length > 30) {
                                    self.$message({
                                        type: "info",
                                        message: "问题摘要字数不得超过30!"
                                    });
                                }
                            }
                        }
                    } else {
                    }
                }
            },
            ...mapActions(["gethealthfindJcOptionsList", "gethealthbodyCheckRuleAdd"])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .list-issue li>div {
        margin-right: 10px;
    }

    .list-issue li>div:nth-child(1) {
        min-width: 20px;
        text-align: right;
    }

    .list-issue li>div:nth-child(2) {
        min-width: 400px;
    }

    .list-issue li>div:nth-child(3) {
        margin-left: 25px;
    }

    .list-issue li {
        display: flex;
        height: 35px;
    }

    .list-issue li .radio {
        margin-top: 0;
    }

    textarea {
        width: 500px;
        height: 150px;
        border: 1px solid #d1d1d1;
        resize: none;
        border-radius: 4px;
    }

    .list-rolus>div:nth-child(2)>div:nth-child(3) {
        width: 70px;
        margin-left: 32px;
        height: 30px;
        text-align: center !important;
        line-height: 30px;
        cursor: pointer;
        background-color: #5acdfa;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
    }

    .list-rolus>div:nth-child(2)>div:nth-child(2) {
        margin-left: 25px;
        width: 570px;
    }

    .list-rolus>div>div:nth-child(2) {
        margin-left: 25px;
        width: 1000px;
    }

    .list-rolus>div>div:nth-child(1) {
        min-width: 100px;
        text-align: right;
    }

    .list-rolus>div>div {
        margin-top: 25px;
    }

    .list-rolus>div {
        display: flex;
    }

    .list {
        min-height: 540px;
        margin-top: 25px;
    }

    .sale {
        width: 100%;
        height: 100%;
    }

    .but {
        margin-top: 25px;
        height: 80px;
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
    }

    .list .but>div:nth-child(1) {
        width: 68px;
        height: 32px;
        border-radius: 3px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        background-color: #5acdfa;
        margin-right: 25px;
        cursor: pointer;
    }

    .list .but>div:nth-child(2) {
        margin-left: 25px;
        width: 68px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background-color: #aeaeae;
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
    }

    .sale>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .listTitle {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .listTitle>div:nth-child(1) {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .listTitle>div:nth-child(1)>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .listTitle>div:nth-child(1)>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .listTitle>div:nth-child(1)>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        /*font-weight: 600;*/
        margin-left: 10px;
    }

    /*取消弹出框*/

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
        box-shadow: 0px 10px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 280px) / 2) auto;
        z-index: 100000;
    }
</style>