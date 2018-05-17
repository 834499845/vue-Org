<!--添加字典管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        基础字典
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="addOneing">
                <div class="ad">
                    <div>
                        上级字典：
                    </div>
                    <div>
                        {{oneAddName}}
                    </div>
                </div>
                <div class="ad">
                    <div>
                        字典类型：
                    </div>
                    <div>
                        <select @change="selectOneTypeeClick" v-model="oneTypestr">
                            <option v-for="(type,index) in oneTypes" :key="index" v-bind:value="type.value">{{type.key}}</option>
                        </select>
                    </div>
                    <div class="adAdd" @click="addFwClick" v-show="!typsShows">
                        <img src="/static/img/添加.png" alt="">
                    </div>
                </div>
                <div class="adFw" v-show="!typsShows">
                    <ul>
                        <li v-for="(item,ind) in lists" :key="ind">
                            <div>
                                字典范围-{{ind+1}}：
                            </div>
                            <div>
                                <input :key="index" v-for="(its,index) in item.expressions" @change="expresChange(ind)" :placeholder="item.expressions[index].pl"
                                    type="text" v-model="item.expressions[index].name">
                            </div>
                            <!--<div class="adAdd" @click="findFwClick(ind)">
                                检测
                            </div>-->
                            <div class="adAdd" @click="delFwClick(ind)">
                                <img src="/static/img/删除.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ad" v-show="bzzbShow">
                    <div>
                        {{unitName}}：
                    </div>
                    <div>
                        <input type="text" v-model="oneDic.name">
                    </div>
                </div>
                <div class="ad" v-show="bzzbShow">
                    <div>
                        字典编码：
                    </div>
                    <div>
                        <input type="text" v-model="oneDiccode">
                    </div>
                    <div class="adCoden" v-show="adCodeShow">
                        此code已存在
                    </div>
                    <div class="adCodey" v-show="!adCodeShow">
                        code可以使用
                    </div>
                </div>
                <div class="ad">
                    <div>
                        字典内容：
                    </div>
                    <div>
                        <input type="text" v-model="oneDic.content">
                    </div>
                </div>
                <div id="bzzbTst" v-show="!bzzbShow">{{testStr}}</div>
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
            "v-textra": textraea,
            "v-hosdel": hosdel,
        },
        computed: mapState(["dicIndexObj"]),
        data() {
            return {
                intercept: false,
                isShowdel: false,
                titlename: "劳动成果还未保存，是否退出？",
                bzzbShow: true,
                oneTypes: [],
                testStr: "字典范围的五个输入项均为必填项，起始值。结束值，刻度均为数字。",
                findadCodeShow: false,
                adCodeShow: false,
                addOneing: false,
                typsShows: true,
                oneAddName: "暂无",
                unitName: "字典单位",
                oneDic: {
                    name: "",
                    code: "",
                    content: ""
                },
                oneDiccode: "",
                addLevel: 0,
                rangeNameJsons: [],
                rangeCodeJsons: [],
                startValueJsons: [],
                endValueJsons: [],
                scaleJsons: [],
                lists: [],
                oneTypestr: 1,
                detes: [],
                deteTrue: [],
                changeIndex: 0,
                addClickTrue: false
            };
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            var self = this;
            self.addOneing = true;
            // 查询权限
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "健康管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("dictionary") == -1) {
                    self.addOneing = false;
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
                    self.addOneing = false;
                    self.oneAddName = self.$route.query.name;
                    // 获取类型
                    self
                        .getFindBaseDictionaryFromRedis({
                            level: self.$route.query.level,
                            code: self.$route.query.code
                        })
                        .then(data => {
                            // console.log('对应类型', JSON.parse(JSON.stringify(data)))
                            if (data.code == 200) {
                                self.oneTypes = data.data;
                                self.oneTypestr = data.data[0].value;
                            } else {
                                self.$message({
                                    type: "info",
                                    message: "获取类型失败!"
                                });
                            }
                        })
                        .catch(msg => {
                            // console.log(msg)
                            self.$message({
                                type: "info",
                                message: "获取类型失败!"
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
                var self = this;
                self.$router.push({
                    path: "/health/dictionary"
                });
            },
            // 选择类型
            selectOneTypeeClick() {
                var self = this;
                var ind = this.oneTypestr - 1;
                if (this.oneTypes[ind].value == "1") {
                    this.unitName = "字典单位";
                    this.typsShows = true;
                    self.bzzbShow = true;
                } else if (this.oneTypes[ind].value == "2") {
                    this.unitName = "选项名称";
                    this.typsShows = true;
                    self.bzzbShow = true;
                } else if (this.oneTypes[ind].value == "3") {
                    self.bzzbShow = true;
                    if (self.$route.query.cla == "BZZB") {
                        // console.log(self.$route.query.cla)
                        this.typsShows = true;
                    } else {
                        this.typsShows = false;
                        self.bzzbShow = false;
                        this.lists.push({
                            expressions: [
                                { name: "", pl: "输入名称" },
                                { name: "", pl: "输入Code" },
                                { name: "", pl: "输入起始值" },
                                { name: "", pl: "输入结束值" },
                                { name: "", pl: "输入刻度" }
                            ]
                        });
                    }
                    this.unitName = "范围名称";
                }
            },
            // 减少范围
            delFwClick(index) {
                if (this.lists.length > 1) {
                    this.lists.splice(index, 1);
                } else {
                    this.$message({
                        type: "info",
                        message: "至少一个单位!"
                    });
                }
            },
            // 添加范围
            addFwClick() {
                this.lists.push({
                    expressions: [
                        { name: "", pl: "输入名称" },
                        { name: "", pl: "输入Code" },
                        { name: "", pl: "输入起始值" },
                        { name: "", pl: "输入结束值" },
                        { name: "", pl: "输入刻度" }
                    ]
                });
            },
            // 添加
            addClick() {
                var self = this;
                if (self.addClickTrue == false) {
                    var ind = this.oneTypestr - 1;
                    self.addLevel = self.$route.query.level + 1;
                    if (this.oneTypes[ind].value == "3") {
                        var codeStr = self.$route.query.code + "_" + self.oneDiccode;
                        var obj = {};
                        if (self.$route.query.cla == "BZZB") {
                            if (self.adCodeShow == false) {
                                if (self.oneDic.name.length > 0 && self.oneDiccode.length > 0) {
                                    obj = {
                                        parentId: self.$route.query.parentId,
                                        name: self.oneDic.name,
                                        level: self.addLevel,
                                        code: codeStr,
                                        type: self.oneTypestr,
                                        path: self.$route.query.path,
                                        content: self.oneDic.content
                                    };
                                    self.addOneing = true;
                                    self.addClickTrue = true;
                                    self
                                        .getAddDictionary(obj)
                                        .then(data => {
                                            self.addClickTrue = false;
                                            self.addOneing = false;
                                            if (data.code == 200) {
                                                self.intercept = true;
                                                self.$message({
                                                    type: "success",
                                                    message: "添加成功!"
                                                });
                                                self.$router.push({
                                                    path: "/health/dictionary"
                                                });
                                            } else if (data.code == 601) {
                                                self.$message({
                                                    type: "info",
                                                    message: "添加失败，此code已存在!"
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
                                            self.addOneing = false;
                                            self.$message({
                                                type: "info",
                                                message: "服务器异常"
                                            });
                                        });
                                } else {
                                    if (self.oneDic.name.length == 0) {
                                        self.$message({
                                            type: "info",
                                            message: "范围名称或字典单位为必填项!"
                                        });
                                    } else if (self.oneDiccode.length == 0) {
                                        self.$message({
                                            type: "info",
                                            message: "字典编码为必填项!"
                                        });
                                    }
                                }
                            } else {
                                self.$message({
                                    type: "info",
                                    message: "字典编码已存在，不可使用!"
                                });
                            }
                        } else {
                            var arr = this.lists;
                            self.rangeCodeJsons = [];
                            arr.forEach(function (ele, index) {
                                self.rangeCodeJsons.push(
                                    self.$route.query.code + "_" + ele.expressions[1].name
                                );
                            });
                            self
                                .getCheckIndexRangeCode({
                                    code: self.rangeCodeJsons[self.changeIndex],
                                    type: 2
                                })
                                .then(data => {
                                    // console.log('检验code', JSON.parse(JSON.stringify(data)))
                                    if (data.code == 200) {
                                        if (data.data == true) {
                                            self.deteTrue.forEach(function (ele, i) {
                                                if (ele.in == self.changeIndex) {
                                                    self.deteTrue.splice(i, 1);
                                                }
                                            });
                                            self.deteTrue.push({
                                                name: self.rangeCodeJsons[self.changeIndex],
                                                nt: true,
                                                in: self.changeIndex
                                            });
                                        } else {
                                            self.deteTrue.forEach(function (ele, i) {
                                                if (ele.in == self.changeIndex) {
                                                    self.deteTrue.splice(i, 1);
                                                }
                                            });
                                        }
                                        self.detes = [];
                                        self.rangeNameJsons = [];
                                        self.rangeCodeJsons = [];
                                        self.startValueJsons = [];
                                        self.endValueJsons = [];
                                        self.scaleJsons = [];
                                        arr.forEach(function (ele, ind) {
                                            var is = ind + 1;
                                            self.rangeNameJsons.push(ele.expressions[0].name);
                                            self.rangeCodeJsons.push(
                                                self.$route.query.code + "_" + ele.expressions[1].name
                                            );
                                            self.startValueJsons.push(ele.expressions[2].name);
                                            self.endValueJsons.push(ele.expressions[3].name);
                                            self.scaleJsons.push(ele.expressions[4].name);
                                            if (ele.expressions[0].name.length == 0) {
                                                self.detes.push("字典范围-" + is + " 的字典名称不能为空");
                                            }
                                            if (ele.expressions[1].name.length == 0) {
                                                self.detes.push("字典范围-" + is + " 的字典编码不能为空");
                                            }
                                            var st = isNaN(arr[ind].expressions[2].name);
                                            var en = isNaN(arr[ind].expressions[3].name);
                                            var sa = isNaN(arr[ind].expressions[4].name);
                                            if (ele.expressions[2].name.length == 0) {
                                                self.detes.push(
                                                    "字典范围-" + is + " 的字典起始值不能为空"
                                                );
                                            } else {
                                                var st = isNaN(ele.expressions[2].name);
                                                if (st == true) {
                                                    self.detes.push(
                                                        "字典范围-" + is + " 的字典起始值只能为数字"
                                                    );
                                                }
                                            }
                                            if (ele.expressions[3].name.length == 0) {
                                                self.detes.push(
                                                    "字典范围-" + is + " 的字典结束值不能为空"
                                                );
                                            } else {
                                                var st = isNaN(ele.expressions[3].name);
                                                if (st == true) {
                                                    self.detes.push(
                                                        "字典范围-" + is + " 的字典结束值只能为数字"
                                                    );
                                                }
                                            }
                                            if (ele.expressions[4].name.length == 0) {
                                                self.detes.push("字典范围-" + is + " 的字典刻度不能为空");
                                            } else {
                                                var st = isNaN(ele.expressions[4].name);
                                                if (st == true) {
                                                    self.detes.push(
                                                        "字典范围-" + is + " 的字典刻度只能为数字"
                                                    );
                                                }
                                            }
                                        });
                                        if (self.detes.length == 0) {
                                            self.deteTrue.forEach(function (ele) {
                                                var eleindex = ele.in + 1;
                                                self.detes.push(
                                                    "字典范围-" + eleindex + " 的字典编码不可使用"
                                                );
                                            });
                                            self.testStr = self.detes.join(",");
                                            if (self.detes.length == 0) {
                                                // console.log(self.rangeNameJsons, self.rangeCodeJsons, self.startValueJsons, self.endValueJsons, self.scaleJsons)
                                                obj = {
                                                    parentId: self.$route.query.parentId,
                                                    name: self.oneDic.name,
                                                    level: self.addLevel,
                                                    code: codeStr,
                                                    type: self.oneTypestr,
                                                    path: self.$route.query.path,
                                                    content: self.oneDic.content,
                                                    rangeNameJson:
                                                        "[" + self.rangeNameJsons.toString() + "]",
                                                    rangeCodeJson:
                                                        "[" + self.rangeCodeJsons.toString() + "]",
                                                    startValueJson:
                                                        "[" + self.startValueJsons.toString() + "]",
                                                    endValueJson: "[" + self.endValueJsons.toString() + "]",
                                                    scaleJson: "[" + self.scaleJsons.toString() + "]"
                                                };
                                                self.addOneing = true;
                                                self.addClickTrue = true;
                                                self
                                                    .getAddDictionary(obj)
                                                    .then(data => {
                                                        self.addClickTrue = false;
                                                        self.addOneing = false;
                                                        if (data.code == 200) {
                                                            self.$message({
                                                                type: "success",
                                                                message: "添加成功!"
                                                            });
                                                            self.$router.push({
                                                                path: "/health/dictionary"
                                                            });
                                                        } else if (data.code == 601) {
                                                            self.$message({
                                                                type: "info",
                                                                message: "添加失败，此code已存在!"
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
                                                        self.addOneing = false;
                                                        self.$message({
                                                            type: "info",
                                                            message: "服务器异常"
                                                        });
                                                    });
                                            }
                                        } else {
                                            self.testStr = self.detes.join(",");
                                        }
                                        // console.log(self.detes)
                                    } else {
                                        self.$message({
                                            type: "info",
                                            message: data.message
                                        });
                                    }
                                })
                                .catch(msg => {
                                    // console.log(msg)
                                    self.$message({
                                        type: "info",
                                        message: "服务器异常"
                                    });
                                });
                        }
                    } else {
                        if (self.adCodeShow == false) {
                            var codeStr = self.$route.query.code + "_" + self.oneDiccode;
                            if (self.oneDic.name.length > 0 && self.oneDiccode.length > 0) {
                                self.addOneing = true;
                                self.addClickTrue = true;
                                self
                                    .getAddDictionary({
                                        parentId: self.$route.query.parentId,
                                        name: self.oneDic.name,
                                        level: self.addLevel,
                                        code: codeStr,
                                        type: self.oneTypestr,
                                        path: self.$route.query.path,
                                        content: self.oneDic.content
                                    })
                                    .then(data => {
                                        self.addClickTrue = false;
                                        self.addOneing = false;
                                        if (data.code == 200) {
                                            self.$message({
                                                type: "success",
                                                message: "添加成功!"
                                            });
                                        } else if (data.code == 601) {
                                            self.$message({
                                                type: "info",
                                                message: "添加失败，此code已存在!"
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
                                        self.addOneing = false;
                                        self.$message({
                                            type: "info",
                                            message: "服务器异常"
                                        });
                                    });
                            } else {
                                if (self.oneDic.name.length == 0) {
                                    self.$message({
                                        type: "info",
                                        message: "选项名称或字典单位为必填项!"
                                    });
                                } else if (self.oneDiccode.length == 0) {
                                    self.$message({
                                        type: "info",
                                        message: "字典编码为必填项!"
                                    });
                                }
                            }
                        } else {
                            self.$message({
                                type: "info",
                                message: "字典编码已存在，不可使用!"
                            });
                        }
                    }
                }
            },
            // 输入框检测
            changeFun(ind) {
                var self = this;
                var arr = this.lists;
                self.rangeCodeJsons = [];
                arr.forEach(function (ele, index) {
                    self.rangeCodeJsons.push(
                        self.$route.query.code + "_" + ele.expressions[1].name
                    );
                });
                self
                    .getCheckIndexRangeCode({
                        code: self.rangeCodeJsons[ind],
                        type: 2
                    })
                    .then(data => {
                        // console.log('检验code', JSON.parse(JSON.stringify(data)))
                        if (data.code == 200) {
                            if (data.data == true) {
                                self.deteTrue.forEach(function (ele, i) {
                                    if (ele.in == self.changeIndex) {
                                        self.deteTrue.splice(i, 1);
                                    }
                                });
                                self.deteTrue.push({
                                    name: self.rangeCodeJsons[ind],
                                    nt: true,
                                    in: ind
                                });
                            } else {
                                self.deteTrue.forEach(function (ele, i) {
                                    if (ele.in == ind) {
                                        self.deteTrue.splice(i, 1);
                                    }
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
                        // console.log(msg)
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            },
            // 输入框检测
            expresChange(ind) {
                var self = this;
                // console.log(ind)
                self.changeIndex = ind;
                self.changeFun(ind);
            },
            // 检测code是否可用
            findFwClick(ind) {
                // var self = this
                // var arr = this.lists
                // self.rangeNameJsons = []
                // self.rangeCodeJsons = []
                // self.startValueJsons = []
                // self.endValueJsons = []
                // self.scaleJsons = []
                // // self.detes = []
                // arr.forEach(function (ele, index) {
                //     self.rangeCodeJsons.push(self.$route.query.code + '_' + ele.expressions[1].name)
                // })
                // var st = isNaN(arr[ind].expressions[2].name)
                // var en = isNaN(arr[ind].expressions[3].name)
                // var sa = isNaN(arr[ind].expressions[4].name)
                // if (arr[ind].expressions[0].name.length > 0 && arr[ind].expressions[1].name.length > 0 && arr[ind].expressions[2].name.length > 0 && arr[ind].expressions[3].name.length > 0 && arr[ind].expressions[4].name.length > 0) {
                //     if (st == false && en == false && sa == false) {
                // console.log('规则通过')
                //         self.getCheckIndexRangeCode({
                //             code: self.rangeCodeJsons[ind],
                //             type: 2
                //         }).then((data) => {
                // console.log('检验code', JSON.parse(JSON.stringify(data)))
                //             if (data.code == 200) {
                //                 if (data.data == true) {
                //                     self.$message({
                //                         type: 'info',
                //                         message: '此编码不可用!'
                //                     })
                //                 } else {
                //                     self.$message({
                //                         type: 'info',
                //                         message: '通过!'
                //                     })
                //                     self.detes.push({ dete: true })
                //                 }
                //             } else {
                //                 self.$message({
                //                     type: 'info',
                //                     message: '检验code失败!'
                //                 })
                //             }
                //         }).catch(msg => {
                // console.log(msg)
                //             self.$message({
                //                 type: 'info',
                //                 message: '检验code失败!'
                //             })
                //         });
                //     } else {
                //         if (st == true) {
                //             self.$message({
                //                 type: 'info',
                //                 message: '范围起始值为数字!'
                //             })
                //         } else if (en == true) {
                //             self.$message({
                //                 type: 'info',
                //                 message: '范围结束值为数字!'
                //             })
                //         } else if (sa == true) {
                //             self.$message({
                //                 type: 'info',
                //                 message: '范围刻度为数字!'
                //             })
                //         }
                //     }
                // } else {
                //     if (arr[ind].expressions[0].name.length == 0) {
                //         self.$message({
                //             type: 'info',
                //             message: '范围名称为必填项!'
                //         })
                //     } else if (arr[ind].expressions[1].name.length == 0) {
                //         self.$message({
                //             type: 'info',
                //             message: '范围编码为必填项!'
                //         })
                //     } else if (arr[ind].expressions[2].name.length == 0) {
                //         self.$message({
                //             type: 'info',
                //             message: '范围起始值为必填项!'
                //         })
                //     } else if (arr[ind].expressions[3].name.length == 0) {
                //         self.$message({
                //             type: 'info',
                //             message: '范围结束值为必填项!'
                //         })
                //     } else if (arr[ind].expressions[4].name.length == 0) {
                //         self.$message({
                //             type: 'info',
                //             message: '范围刻度为必填项!'
                //         })
                //     }
                // }
                // console.log(self.rangeCodeJsons[ind])
                // console.log(self.rangeCodeJsons)
            },
            ...mapActions([
                "getFindBaseDictionaryFromRedis",
                "getAddDictionary",
                "getCheckIndexRangeCode"
            ])
        },
        // 监视
        watch: {
            oneDiccode: function (val) {
                var self = this;
                self
                    .getCheckIndexRangeCode({
                        code: self.$route.query.code + "_" + val,
                        type: 2
                    })
                    .then(data => {
                        // console.log('检验code', JSON.parse(JSON.stringify(data)))
                        if (data.code == 200) {
                            if (data.data == true) {
                                self.adCodeShow = true;
                            } else {
                                self.adCodeShow = false;
                            }
                        } else if (data.code == 601) {
                            self.$message({
                                type: "info",
                                message: "检验code失败!"
                            });
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    })
                    .catch(msg => {
                        // console.log(msg)
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            }
        }
    };
</script>
<style scoped>
    .list .ad {
        display: flex;
        margin-top: 15px;
        height: 45px;
        align-items: center;
    }

    #bzzbTst {
        color: red;
        margin-top: 15px;
        min-height: 50px;
        display: flex;
        width: 80%;
        margin-left: 120px;
    }

    .adCoden {
        margin-left: 20px;
        color: red;
    }

    .adCodey {
        margin-left: 20px;
        color: green;
    }

    .adShCode {
        margin-left: 20px;
        color: green;
    }

    .list>div:nth-child(1) {
        margin-top: 15px;
    }

    .adAdd {
        margin-left: 15px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .adAdd img {
        /*width: 100%;
        height: 100%;*/
        width: 25px;
        height: 25px;
    }

    .list .ad>div:nth-child(1) {
        margin-left: 35px;
        margin-right: 10px;
        width: 150px;
        text-align: right;
    }

    .list .adFw>ul {
        margin: 0;
    }

    .list .adFw li {
        display: flex;
        align-items: center;
        min-height: 20px;
    }

    .list .adFw li>div {
        margin-left: 25px;
        min-width: 150px;
    }

    .list .adFw li>div:nth-child(1) {
        margin-left: 35px;
        margin-right: 10px;
        width: 150px;
        text-align: right;
    }

    .list .adFw li>div:nth-child(2) {
        margin-left: 0;
        min-height: 25px;
    }

    .list .adFw li>div:nth-child(2) input {
        margin-right: 25px;
        margin-bottom: 5px;
        margin-top: 5px;
    }

    .list .adFw li>div:nth-child(2) input:nth-child(1) {
        margin-left: 0;
    }

    .list .adFw {
        overflow: hidden;
        min-height: 20px;
        margin-top: 15px;
        display: flex;
        align-items: center;
    }

    .list {
        min-height: 540px;
        margin-top: 25px;
    }

    .sale {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
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

    select {
        width: 144px;
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

    input {
        width: 120px;
        height: 32px;
        border: 1px solid #eaeaea;
        border-radius: 3px;
        padding-left: 5px;
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