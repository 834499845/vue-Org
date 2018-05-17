<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="drugpushAdd">
        <div>
            <!-- 详情头部 -->
            <div class="drugpushAddTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        新增药品
                    </div>
                </div>
            </div>
            <!-- 新增药品主题 -->
            <div class="drugpushAddList">
                <ul>
                    <li class="drugpushAddLi">
                        <div>
                            症状：
                        </div>
                        <div class="reminder">
                            <input :class="{redborder:issymptomName}" type="text" maxlength="5" v-model="symptomName">
                            <span :class="{redFont:issymptomName}">最多输入5个字符</span>
                        </div>
                    </li>
                    <li class="drugpushAddLi">
                        <div>
                            提示语：
                        </div>
                        <div class="reminder">
                            <input :class="{redborder:isreminder}" type="text" maxlength="20" v-model="reminder">
                            <span :class="{redFont:isreminder}">最多输入20个字符</span>
                        </div>
                    </li>
                    <li class="drugpushAddLi">
                        <div>
                            药品链接：
                        </div>
                        <div>
                            <div class="inp">
                                <div class="inpBox">
                                    <img src="/static/img/search_1.png" alt="">
                                    <input type="text" placeholder="输入后开始搜索" v-model="inpModel">
                                </div>
                                <div class="inpOk" @click="inpClick">
                                    确定
                                </div>
                            </div>
                            <div class="okDrug">
                                <div class="okDrugL">
                                    <div>可选药品</div>
                                    <ul>
                                        <li class="ifDrugLi" v-for="(itme,index) in druglist" @click="druglistClick(index)">
                                            {{itme.productName}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="okDrugR">
                                    <div>
                                        已选药品
                                        <span class="fontgray" :class="{redFont:isulred}">
                                            （必须添加4个药品！）
                                        </span>
                                    </div>
                                    <ul :class="{redborder:isulred}">
                                        <li class="okDrugLi" v-for="(itmes,index) in druglistOk">
                                            <div>
                                                {{itmes.productName}}
                                            </div>
                                            <div @click="deldruglistOk(index)">
                                                <img src="/static/img/删除灰.jpg" alt="">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="drugpushAddLi">
                        <div></div>
                        <div class="drugpushbut">
                            <div @click="okClick">
                                确定
                            </div>
                            <div @click="returnClick">
                                取消
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--取消弹出框-->
        <div :class="{showdel:isShowdel}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="confirmClick" @canle="cancelClick" :name="titlename"></v-hosdel>
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
                okClickTrueOrFalse: true,
                druglist: [], //可选药品
                druglistOk: [], //已选药品
                druglistOkId: [], //已选药品id
                reminder: "", //提示语
                symptomName: '',//主症状
                pushdruglistOk: false,
                isulred: false,
                isShowdel: true,
                isreminder: false,
                issymptomName: false,
                inpModel: "", //搜索关键词
                intercept: false, //跳转拦截
                titlename: "劳动成果还未保存，是否退出？" //跳转拦截标题
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
                //console.log("arrs", arrs);
                if (arrs.indexOf("drugpush") == -1) {
                    this.intercept = true;
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
                    
                }
            } else {
                this.intercept = true;
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
                this.isShowdel = false;
            } else if (this.intercept == true) {
                this.isShowdel = true;
                next();
            }
        },
        // 事件处理
        methods: {
            //取消按钮/返回按钮
            returnClick() {
                this.$router.push({
                    path: "/medical/drugpush"
                });
            },
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
                this.$emit("appchildsay", "return");
                this.isShowdel = true;
            },
            //获取商城药品
            getstoreDrug() {
                var self = this;
                self
                    .getstoreDrugList({
                        searchWord: self.inpModel,
                        pageSize: 1000000,
                        pageNo: 1
                    })
                    .then(data => {
                        //console.log("药品列表", data);
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.records) {
                                    if (data.data.records.length == 0) {
                                        self.druglist = [];
                                    } else {
                                        self.druglist = data.data.records;
                                    }
                                } else {
                                    self.druglist = [];
                                }
                            } else {
                                self.druglist = [];
                            }
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                            //console.log("你好")
                        }
                    })
                    .catch(msg => {
                        //console.log(msg);
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            },
            //搜索
            inpClick() {
                var self = this;
                var searchs = self.inpModel;
                self.inpModel = searchs.replace(/(^\s+)|(\s+$)/g, "");
                if (self.inpModel == 0) {
                    self.$message({
                        type: "info",
                        message: "请输入搜索关键词!"
                    });
                } else {
                    self.getstoreDrug();
                }
            },
            //药品链接选择
            druglistClick(index) {
                this.isulred = false;
                //console.log("数组长度", this.druglistOk.length);
                if (this.druglistOk.length == 0) {
                    this.druglistOk.push(this.druglist[index]);
                    this.druglistOkId.push(this.druglist[index].productId);
                } else if (this.druglistOk.length == 4) {
                    this.$message({
                        type: "info",
                        message: "最多添加4个！"
                    });
                } else if (this.druglistOk.length > 0 && this.druglistOk.length <= 4) {
                    var self = this;
                    for (var i = 0; i < self.druglistOk.length; i++) {
                        if (this.druglist[index].productId == self.druglistOk[i].productId) {
                            self.$message({
                                type: "info",
                                message: "不可重复添加！"
                            });
                            this.pushdruglistOk = false;
                            break;
                        } else {
                            this.pushdruglistOk = true;
                        }
                    }
                    //console.log("是否可以增加", this.pushdruglistOk);
                    if (this.pushdruglistOk == true) {
                        this.druglistOk.push(this.druglist[index]);
                        this.druglistOkId.push(this.druglist[index].productId);
                    }
                }
                //console.log("数组长度wei", this.druglistOk.length);
                //console.log("确定药品数组", this.druglistOk);
                //console.log("确定药品id数组", this.druglistOkId);
            },
            //删除药品链接
            deldruglistOk(index) {
                this.druglistOk.splice(index, 1);
                this.druglistOkId.splice(index, 1);
                //console.log("删除后的数组", this.druglistOk);
                //console.log("删除后的id数组", this.druglistOkId);
            },
            // 正则验证
            validateFun () {
                var self = this
                var regOne = /^[\s]*$/; //输入不能为空
                var regTwo = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
                if (regOne.test(self.symptomName) || regTwo.test(self.symptomName) || this.symptomName.length == 0) {
                    this.issymptomName = true;
                    //console.log("洪")
                }
                if (this.reminder.length == 0) {
                    this.isreminder = true;
                }
                if (this.druglistOkId.length != 4) {
                     this.isulred = true;
                }
                if (this.issymptomName == true || 
                    this.isreminder == true ||
                    this.isulred == true
                    ) {
                        return false
                }
            },
            //确定按钮
            okClick() {
                var self = this;
                if (self.validateFun() == false) {
                    return false
                } else {
                    var drugsIds =
                        self.druglistOkId[0] +
                        "," +
                        self.druglistOkId[1] +
                        "," +
                        self.druglistOkId[2] +
                        "," +
                        self.druglistOkId[3];
                        if (self.okClickTrueOrFalse == true) {
                            self.okClickTrueOrFalse = false
                            self.getMedicalhomeDrugRecommendaddOrUpdateHomeDrugRecommend({
                                symptomName: self.symptomName, //症状名称
                                symptomDescription: self.reminder, //症状描述
                                drugsIds: drugsIds //商城药品ids
                            })
                            .then(data => {
                                self.okClickTrueOrFalse = true
                                //console.log("症状列表", data);
                                if (data.code == 200) {
                                    this.intercept = true;
                                    this.$router.push({
                                        path: "/medical/drugpush"
                                    });
                                } else if (data.code == 712) {
                                    self.$message({
                                        type: "info",
                                        message: "该症状已添加，不可重复添加！"
                                    });
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: data.message
                                    });
                                }
                            })
                            .catch(msg => {
                                self.okClickTrueOrFalse = true
                                //console.log(msg);
                                self.$message({
                                    type: "info",
                                    message: "服务器异常"
                                });
                            });
                        }
                    
                }
            },
            ...mapActions(["getstoreDrugList", "getMedicalhomeDrugRecommendaddOrUpdateHomeDrugRecommend"])
        },
        // 监视
        watch: {
            inpModel: function (val) {
                if (val.length == 0) {
                    //进行所搜
                }
            },
            symptomName: function (val) {
                this.issymptomName = false;
            },
            reminder: function (val) {
                this.isreminder = false;
            }
        }
    };
</script>
<style scoped>
    .drugpushAdd {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .drugpushAdd>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .drugpushAddTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .drugpushAddTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .drugpushAddTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .drugpushAddTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .drugpushAddTop>div>div:nth-child(2) {
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .drugpushAddList {
        margin: 24px 0px;
    }

    .drugpushAddLi {
        overflow: hidden;
        margin-bottom: 24px;
    }

    .drugpushAddLi>div {
        float: left;
    }

    .drugpushAddLi>div:nth-child(1) {
        width: 16%;
        max-width: 200px;
        height: 32px;
        line-height: 32px;
        text-align: right;
        margin-right: 16px;
    }

    .drugpushAddLi>div:nth-child(2) {
        text-align: left;
        width: 80%;
        max-width: 720px;
    }



    .drugpushbut {
        width: 37% !important;
        min-width: 560px;
        height: 32px;
        display: flex;
        margin-top: 36px;
        justify-content: center;
    }

    .drugpushbut div {
        width: 70px;
        height: 32px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
    }

    .drugpushbut div:nth-child(1) {
        background: #5acdfa;
        margin-right: 40px;
    }

    .drugpushbut div:nth-child(2) {
        background: #aeaeae;
    }

    .fontred {
        color: #dc322b;
    }

    .fontgray {
        color: #8f8e94;
    }

    .okDrug {
        width: 80%;
        display: flex;
        margin-top: 24px;
    }

    .okDrugL,
    .okDrugR {
        width: 50%;
        max-width: 410px;
    }

    .okDrugR {
        margin-left: 74px;
    }

    .okDrugL>div,
    .okDrugR>div {
        width: 100%;
        max-width: 410px;
        min-width: 245px;
        height: 40px;
        font-size: 16px;
        color: #303030;
        line-height: 40px;
        text-align: center;
    }

    .okDrugL ul,
    .okDrugR ul {
        width: 100%;
        min-width: 245px;
        max-width: 410px;
        height: 320px;
        border: 1px solid #d1d1d1;
        overflow-y: auto;
    }

    .ifDrugLi {
        width: 96%;
        height: 38px;
        line-height: 38px;
        margin: 0 8px;
        cursor: pointer;
        padding: 0 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .okDrugLi {
        width: 96%;
        height: 38px;
        margin: 0 8px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        float: left;
    }

    .okDrugLi div:nth-child(1) {
        position: absolute;
        width: 90%;
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* background: red */
    }

    .okDrugLi div:nth-child(2) {
        width: 16px;
        height: 17px;
        position: absolute;
        top: 8px;
        right: 4px;
    }

    .inp {
        overflow: hidden;
        height: 34px;
        display: flex;
    }

    .inpOk {
        width: 70px;
        height: 32px;
        background: #5acdfa;
        text-align: center;
        line-height: 32px;
        color: white;
        font-size: 16px;
        border-radius: 4px;
        margin-left: 24px;
        cursor: pointer;
    }

    .inpBox {
        border-radius: 4px;
        padding-left: 10px;
        border: 1px solid #d1d1d1;
    }

    .inpBox input {
        border: none !important;
        height: 28px;
    }

    .inpBox input::-webkit-input-placeholder {
        color: #8F8E94;
    }

    .inpBox input:-moz-input-placeholder {
        color: #8F8E94;
    }

    .inpBox input::-moz-input-placeholder {
        color: #8F8E94;
    }

    .inpBox input:-ms-input-placeholder {
        color: #8F8E94;
    }

    .redborder {
        border-color: #fe5371 !important;
    }

    .redFont {
        color: #fe5371 !important;
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

    .showdel {
        display: none;
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

    input {
        width: 290px;
        height: 32px;
        padding: 0 4px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
    }

    .reminder input {
        width: 290px;
        height: 32px;
        padding: 0 4px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
    }

    .reminder span {
        margin-left: 24px;
        color: #8f8e94;
    }
</style>