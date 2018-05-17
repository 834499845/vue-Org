<!--标准模型-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        编辑模型
                    </div>
                </div>
            </div>
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            省份：
                        </div>
                        <div>
                            {{areName}}
                        </div>
                    </div>
                    <div>
                        <div>
                            性别：
                        </div>
                        <div>
                            {{sexKey | sexFun}}
                        </div>
                    </div>
                    <div>
                        <div>
                            年龄段：
                        </div>
                        <div>
                            {{sexName}}
                        </div>
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <ul>
                    <li class="oneLi" v-for="item in lists">
                        <div>
                            {{item.title}}
                        </div>
                        <div class="tztwo">
                            <ul>
                                <li class="tzLi" v-for="tzVal in item.conts">
                                    <div>{{tzVal.name}}：</div>
                                    <div>
                                        <div class="tzOPtion" v-if="tzVal.optionList.length > 0">
                                            <ul>
                                                <li class="optionLi" v-for="option in tzVal.optionList">
                                                    <div>
                                                        {{option.name}}
                                                    </div>
                                                    <div>
                                                        <v-minput width="80" :heig="option.height" :low="option.low" @nomodelc="noinputClick" :nameVal="option.name" @delmodelc="delInput"
                                                            @modelc="inputClick" :code="option.code" :codeId="option.id" @modelchaad="modelClick"></v-minput>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tzRange" v-if="tzVal.rangeList.length > 0">
                                            <ul>
                                                <li class="rangeLi" v-for="(range,key,ind) in tzVal.rangeList">
                                                    <div>
                                                        {{range.name}}
                                                    </div>

                                                    <div>
                                                        <v-minput width="80" :heig="range.height" :low="range.low" @nomodelc="noinputClick" :nameVal="range.name" @delmodelc="delInput"
                                                            @modelc="inputClick" :code="range.code" :codeId="range.id" @modelchaad="modelClick"></v-minput>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-show="tzVal.optionList.length == 0 && tzVal.rangeList.length == 0">
                                            <v-minput width="80" :heig="tzVal.height" :low="tzVal.low" @modelc="inputClick" @delmodelc="delInput" @nomodelc="noinputClick"
                                                :nameVal="tzVal.name" :code="tzVal.code" :codeId="tzVal.id" @modelchaad="modelClick"></v-minput>
                                        </div>
                                    </div>
                                    <div>
                                        {{tzVal.unit}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="noLi">
                        {{testStr}}
                    </li>
                    <li class="butLi">
                        <div @click="addCommClick">
                            确定
                        </div>
                        <div @click="canelClick">
                            取消
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--取消弹出框-->
        <div class="delPopup" v-show="isShowdel">
            <transition>
                <div class="delContent">
                    <v-hosdels @ok="confirmClick" @canle="cancelClick" :name="titlename"></v-hosdels>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from "vuex";
    import minput from "../../cModule/upinput";
    import rangeselect from "../../cModule/rangeselect";
    import select from "../../cModule/select";
    import hosdel from "../../cModule/healthdel";
    import hosdels from "../../cModule/cancelBox";
    export default {
        components: {
            "v-minput": minput,
            "v-rangeselect": rangeselect,
            "v-select": select,
            "v-hosdel": hosdel,
            "v-hosdels": hosdels,
        },
        data() {
            return {
                intercept: false,
                isShowdel: false,
                titlename: "劳动成果还未保存，是否退出？",
                loading: false,
                lists: [],
                jsonObjs: [],
                dataObjs: [],
                noStes: [],
                ageKey: 0,
                sexKey: "1",
                areKey: "",
                areName: "",
                testStr: "模型输入格式为：小值/大值，例：2/15",
                tests: [],
                oldtest: "",
                addCommClickTrue: false
            };
        },
        // 过滤
        filters: {
            sexFun: function (val) {
                if (val == 1) {
                    return "男";
                } else if (val == 0) {
                    return "全部";
                } else if (val == 2) {
                    return "女";
                }
            },
            ageFun: function (val) {
                if (val == 0) {
                    return "全部";
                } else if (val == 87) {
                    return "儿童期";
                } else if (val == 88) {
                    return "少年期";
                } else if (val == 89) {
                    return "青年期";
                } else if (val == 90) {
                    return "壮年期";
                } else if (val == 91) {
                    return "盛年期";
                } else if (val == 92) {
                    return "达年期";
                } else if (val == 93) {
                    return "中年期";
                } else if (val == 94) {
                    return "老年期";
                }
            }
        },
        computed: mapState(["headltModel"]),
        // 模块新建时
        created: function () {
            var self = this;

            self.ageKey = self.$route.query.ageKey;
            self.sexKey = self.$route.query.sexKey;
            self.areKey = self.$route.query.areKey;
            self.areName = self.$route.query.areName;
            self.sexName = self.$route.query.ageNmae;
            self.headltModel.searKey = self.$route.query.areKey;
            self.headltModel.sexKey = self.$route.query.sexKey;
            self.headltModel.ageKey = self.$route.query.ageKey;
            self.headltModel.searName = self.$route.query.areName;
            // 查询权限
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
                if (arrs.indexOf("standard") == -1) {
                    self.loading = true;
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
                    // 查询标准指标字典
                    self.loading = true;
                    self
                        .getFindBzzbFromRedisList({})
                        .then(data => {
                            // console.log("基础标准指标", JSON.parse(JSON.stringify(data)))
                            if (data.code == 200) {
                                if (data.data.length > 0) {
                                    var cont = data.data;
                                    var heyLows = [];
                                    cont.forEach(function (one, oneInd) {
                                        heyLows.push({ title: one.key, conts: [] });
                                        one.value.forEach(function (two, twoIndex) {
                                            heyLows[oneInd].conts.push({
                                                name: two.name,
                                                code: two.code,
                                                unit: two.unit,
                                                optionList: [],
                                                rangeList: [],
                                                height: "",
                                                low: "",
                                                id: ""
                                            });
                                            two.optionList.forEach(function (therr, therrIndex) {
                                                heyLows[oneInd].conts[twoIndex].optionList.push({
                                                    name: therr.value,
                                                    code: therr.key,
                                                    height: "",
                                                    low: "",
                                                    id: "",
                                                    unit: two.unit
                                                });
                                            });
                                            two.rangeList.forEach(function (four, fourIndex) {
                                                heyLows[oneInd].conts[twoIndex].rangeList.push({
                                                    name: four.value,
                                                    code: four.key,
                                                    height: "",
                                                    low: "",
                                                    id: "",
                                                    pre: ""
                                                });
                                            });
                                        });
                                    });
                                    self
                                        .getfindStandardDataList({
                                            ageId: self.ageKey,
                                            gender: self.sexKey,
                                            areaId: self.areKey
                                        })
                                        .then(data => {
                                            // console.log("查询标准指标数据", JSON.parse(JSON.stringify(data)))
                                            if (data.code == 200) {
                                                if (data.data.length > 0) {
                                                    var tips = data.data;
                                                    heyLows.forEach(function (ele, eleIndex) {
                                                        ele.conts.forEach(function (cont, contInd) {
                                                            tips.forEach(function (tip, tipIndex) {
                                                                if (cont.code == tip.dictionaryCode) {
                                                                    heyLows[eleIndex].conts[contInd].height =
                                                                        tip.bigValue;
                                                                    heyLows[eleIndex].conts[contInd].low =
                                                                        tip.smallValue;
                                                                    heyLows[eleIndex].conts[contInd].id = tip.id;
                                                                }
                                                            });
                                                            cont.optionList.forEach(function (op, opIndex) {
                                                                tips.forEach(function (tip, tipIndex) {
                                                                    if (op.code == tip.dictionaryCode) {
                                                                        heyLows[eleIndex].conts[contInd].optionList[
                                                                            opIndex
                                                                        ].height =
                                                                            tip.bigValue;
                                                                        heyLows[eleIndex].conts[contInd].optionList[
                                                                            opIndex
                                                                        ].low =
                                                                            tip.smallValue;
                                                                        heyLows[eleIndex].conts[contInd].optionList[
                                                                            opIndex
                                                                        ].id =
                                                                            tip.id;
                                                                        // heyLows[eleIndex].conts[contInd].pre = tip.priority
                                                                    }
                                                                });
                                                            });
                                                            cont.rangeList.forEach(function (op, opIndex) {
                                                                tips.forEach(function (tip, tipIndex) {
                                                                    if (op.code == tip.dictionaryCode) {
                                                                        heyLows[eleIndex].conts[contInd].rangeList[
                                                                            opIndex
                                                                        ].height =
                                                                            tip.bigValue;
                                                                        heyLows[eleIndex].conts[contInd].rangeList[
                                                                            opIndex
                                                                        ].low =
                                                                            tip.smallValue;
                                                                        heyLows[eleIndex].conts[contInd].rangeList[
                                                                            opIndex
                                                                        ].id =
                                                                            tip.id;
                                                                        // heyLows[eleIndex].conts[contInd].pre = tip.priority
                                                                    }
                                                                });
                                                            });
                                                        });
                                                    });
                                                }
                                                self.lists = heyLows;
                                                self.loading = false;
                                            } else {
                                                self.$message({
                                                    type: "info",
                                                    message: data.message
                                                });
                                            }
                                        })
                                        .catch(msg => {
                                            // console.log(msg);
                                            self.$message({
                                                type: "info",
                                                message: "服务器异常"
                                            });
                                        });
                                }
                            } else {
                                self.$message({
                                    type: "info",
                                    message: data.message
                                });
                            }
                        })
                        .catch(msg => {
                            // console.log(msg);
                            self.$message({
                                type: "info",
                                message: "服务器异常"
                            });
                        });
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
                this.$router.push({
                    path: "/health/standard"
                });
            },
            modelClick(val) { },
            // 错误的输入
            noinputClick(val) {
                var self = this;
                var vals = val.split(",");
                var name = vals[0];
                var t = vals[1];
                var ts = [];
                this.tests.forEach(function (ele, ind) {
                    if (ele.name == name) {
                        self.tests.splice(ind, 1);
                    }
                });
                this.tests.push({ name: name, t: t });
            },
            delInput(val) {
                // console.log("del", val);
                var delObjIndex = 0;
                this.dataObjs.forEach(function (ele, ind) {
                    // console.log(ele.id, val.id);
                    if (ele.id == val.id && ele.code == val.code) {
                        delObjIndex = ind;
                    }
                });
                // console.log(delObjIndex);
                this.dataObjs.splice(delObjIndex, 1);
                // console.log("del", this.dataObjs);
            },
            // 对输入的数据进行查理
            inputClick(val) {
                var self = this;
                // 1 12 1 12 12345 4
                self.jsonObjs.unshift(val);
                var arr = this.jsonObjs;
                var hash = {};
                arr = arr.reduce(function (item, next) {
                    hash[next.code] ? "" : (hash[next.code] = true && item.push(next));
                    return item;
                }, []);
                // console.log("arr", arr);
                this.dataObjs = arr;
            },
            // 确认编辑数据模型
            addCommClick() {
                var self = this;
                if (self.addCommClickTrue == false) {
                    var strs = [];
                    self.tests.forEach(function (ele, ind) {
                        if (ele.t == "false") {
                            strs.push(ele.name);
                        }
                    });
                    if (strs.length == 0) {
                        this.testStr = "模型输入格式为：小值/大值，例：2/15";
                        var codes = [];
                        var starts = [];
                        var ends = [];
                        var ids = [];

                        var arr = this.dataObjs;
                        var hash = {};
                        arr = arr.reduce(function (item, next) {
                            hash[next.code] ? "" : (hash[next.code] = true && item.push(next));
                            return item;
                        }, []);
                        this.dataObjs = arr;
                        this.dataObjs.forEach(function (ele, ind) {
                            codes.push(ele.code);
                            starts.push(ele.start);
                            ends.push(ele.end);
                        });
                        // console.log(self.ageKey, codes, starts, ends);
                        // 修改标准指标数据
                        self.loading = true;
                        self.addCommClickTrue = true;
                        self
                            .getAddstandardData({
                                ageId: self.ageKey,
                                gender: self.sexKey,
                                areaId: self.areKey,
                                dictionaryCodeJson: "[" + codes.join(",") + "]",
                                smallValueJson: "[" + starts.join(",") + "]",
                                bigValueJson: "[" + ends.join(",") + "]"
                            })
                            .then(data => {
                                self.addCommClickTrue = false;
                                self.loading = false;
                                if (data.code == 200) {
                                    self.intercept = true;
                                    self.$message({
                                        type: "success",
                                        message: "编辑成功!"
                                    });
                                    self.$router.push({
                                        path: "/health/standard"
                                    });
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: data.message
                                    });
                                }
                            })
                            .catch(msg => {
                                self.$message({
                                    type: "info",
                                    message: "服务器异常"
                                });
                                self.loading = false;
                                self.addCommClickTrue = false;
                            });
                    } else {
                        self.$message({
                            type: "info",
                            message: "编辑失败，请查看错误提示!"
                        });
                        this.testStr = strs.join(",") + " 输入格式不正确";
                    }
                }
            },
            ...mapActions([
                "getFindBzzbFromRedisList",
                "getUpdatestandardData",
                "getfindStandardDataList",
                "getAddstandardData",
                "getListResRole"
            ])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .noLi {
        height: 40px;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        color: red;
    }

    .tzOPtion>ul {
        display: flex;
    }

    .tzOPtion>ul .optionLi {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tzOPtion>ul>li:nth-child(1)>div:nth-child(1) {
        margin-left: 0px;
    }

    .optionLi>div:nth-child(1) {
        margin-left: 10px;
    }

    .optionLi>div:nth-child(2) {
        margin-left: 10px;
    }

    .tzRange {}

    .tzRange>ul {
        display: flex;
    }

    .tzRange>ul .rangeLi {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tzRange>ul>li:nth-child(1)>div:nth-child(1) {
        margin-left: 0px;
    }

    .rangeLi>div:nth-child(1) {
        margin-left: 10px;
    }

    .rangeLi>div:nth-child(2) {
        margin-left: 10px;
    }

    #tzInput {
        width: 80px;
        height: 32px;
        border: 1px solid #eaeaea;
        border-radius: 3px;
        padding-left: 5px;
    }

    .tzLi>div:nth-child(1) {
        min-width: 75px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .tzLi>div:nth-child(3) {
        min-width: 75px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 15px;
    }

    .tzLi>div:nth-child(2)>div:nth-child(1) {
        margin-left: 0;
    }

    .tzLi>div:nth-child(2)>div {
        margin-left: 10px;
    }

    .tzLi>div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 5px;
    }

    .tzLi {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        height: 40px;
        display: flex;
        justify-content: space-between;
    }

    .butLi {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        margin-top: 15px;
    }

    .butLi>div:nth-child(1) {
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

    .butLi>div:nth-child(2) {
        margin-left: 25px;
        width: 68px;
        cursor: pointer;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background-color: #aeaeae;
        color: #fff;
        border-radius: 3px;
    }

    .oneLi .tztwo>ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .oneLi>div:nth-child(1) {
        width: 60px;
        font-size: 22px;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
    }

    .tztwo {
        width: calc(100% - 70px);
        height: 100%;
        padding-top: 15px;
        padding-bottom: 15px;
        border-left: 1px solid #d1d1d1;
    }

    .list {
        min-height: 540px;
        margin-bottom: 40px;
    }

    .list>ul>li:nth-child(1) {
        margin-top: 0;
    }

    .list>ul .oneLi {
        min-height: 50px;
        width: 100%;
        margin-top: 25px;
        display: flex;
        overflow: hidden;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #ccc;
    }

    /*主页*/

    .sale {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
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

    .menu {
        height: 80px;
        align-items: center;
        overflow: hidden;
        display: flex;
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
        min-width: 30px;
    }

    .menuLeft>div>div:nth-child(2) {
        color: #303030;
        font-size: 14px;
        margin-right: 5px;
        min-width: 30px;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid #e5e5e5;
    }

    select {
        width: 114px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
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