<!--版本操作管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="adding">
                <div class="list-cont">
                    <div class="listRoutine">
                        <div>
                            版本名称：
                        </div>
                        <div>
                            <input type="text" v-model="versionNameVal" :class="{redInput:isRedversionName,grayInput:isGrayversionName}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedversionName,grayTest:isGrayversionName}">
                            最多十个字符
                        </div>
                    </div>
                    <div class="listVersions" v-show="versionsShow">
                        <div>
                            安装包：
                        </div>
                        <div>
                            <div class="listVersionsProgress">
                                <div>
                                    <div>
                                        <img src="/static/img/apk.png" alt="">
                                    </div>
                                    <div>
                                        {{apkName}}
                                    </div>
                                </div>
                                <div>
                                    <progress :value="progressVal" max="1" id="progress" style="height: 20px; width: 100%"></progress>
                                </div>
                            </div>
                            <div>
                                <label class="grayIconlabel" for="upFileApk">{{fileBut}}</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedFile,grayTest:isGrayFile}">
                            最大100M
                        </div>
                        <div>
                            <input id="upFileApk" type="file" @change="onFileChange">
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            版本类型：
                        </div>
                        <div>
                            <select v-model="type">
                                <option v-for="(type,index) in types" v-bind:value="type.name">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            版本号：
                        </div>
                        <div>
                            <input type="text" v-model="versionCodeVal" :class="{redInput:isRedversionCode,grayInput:isGrayversionCode}" maxlength="20">
                        </div>
                        <div :class="{redTest:isRedversionCode,grayTest:isGrayversionCode}">
                            英文和数字
                        </div>
                    </div>
                    <div class="listRoutine listRoutineTextarea">
                        <div>
                            版本说明：
                        </div>
                        <div>
                            <textarea v-model="versionsInfoVal" :class="{redInput:isRedversionsInfo,grayInput:isGrayversionsInfo}" maxlength="50"></textarea>
                        </div>
                        <div :class="{redTest:isRedversionsInfo,grayTest:isGrayversionsInfo}">
                            最多50字符
                        </div>
                    </div>
                    <div class="comone">
                        <div>
                            是否启用：
                        </div>
                        <div>
                            <el-checkbox v-model="Using" @change="typeChange(0)"></el-checkbox>
                            <small>不发布</small>
                        </div>
                        <div>
                            <el-checkbox v-model="NoUsing" @change="typeChange(1)"></el-checkbox>
                            <small>发布</small>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            强制更新状态：
                        </div>
                        <div>
                            <select v-model="UpdatingStateVal">
                                <option v-for="(type,index) in stateList" :value="type.key" :key="index">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addClick">确定</div>
                        <div @click="backClick">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--未保存拦截提示-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdels}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShows">
                    <v-hosdels @canle="canleClicks" @ok="okclicks" :name="nametitles"></v-hosdels>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from "vuex";
    import intercept from "../../cModule/intercept";
    import Vue from "vue";
    export default {
        components: {
            "v-hosdels": intercept
        },
        data() {
            return {
                Using: true,
                NoUsing: false,
                title: "新增动作",
                adding: false,
                isRedversionsInfo: false,
                isGrayversionsInfo: true,
                isversionsInfo: false,
                isRedversionCode: false,
                isGrayversionCode: true,
                isversionCode: false,
                isRedversionName: false,
                isGrayversionName: true,
                isversionName: false,
                isRedFile: false,
                isGrayFile: true,
                isFile: false,
                types: [{ name: "Android" }, { name: "iOS" }],
                type: "Android",
                progressVal: 0,
                versionsFile: "",
                versionsFileUrl: "",
                apkName: "",
                fileBut: "上传",
                versionNameVal: "",
                versionCodeVal: "",
                versionsInfoVal: "",
                versionsSize: "",
                stateIndex: 0,
                versionsShow: true,
                addClickTrue: false,
                isdelPopup: true,
                isShowdels: true,
                delShows: false,
                intercept: false,
                nametitles: "劳动成果还未保存，确定退出？",
                UpdatingStateVal: '0',   
                stateList: [
                    {name:'非强制',key:'0'},
                    {name:'强制',key:'1'},
                ]
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
                    if (ele.name == "公共管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("versions") == -1) {
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
                    var operation = "";
                    operation = self.$route.query.op;
                    self.fileBut = "上传";
                    if (operation == 1) {
                        self.title = "新增动作";
                        self.addlistFun();
                        self.versionsShow = true;
                    } else {
                        self.versionsShow = false;
                        self.title = "修改动作";
                        self.uplistFun();
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
                this.isShowdels = false;
                this.delShows = true;
            } else if (this.intercept == true) {
                this.isShowdels = true;
                this.delShows = false;
                next();
            }
        },
        // 事件处理
        methods: {
            //确定未保存弹出框退出编辑页面
            okclicks() {
                this.intercept = true;
                var url = this.toPath;
                this.$router.push({
                    path: url
                });
            },
            //取消未保存弹出框返回编辑页面
            canleClicks() {
                this.isShowdels = true;
                this.delShows = false;
            },
            typeChange(index) {
                // console.log(index)
                if (index == 1) {
                    this.Using = false;
                    this.NoUsing = true;
                } else {
                    this.Using = true;
                    this.NoUsing = false;
                }
                this.stateIndex = index;
            },
            // add initialize data
            addlistFun() {
                var self = this;
            },
            // up initialize data
            uplistFun() {
                var self = this;
                var id = "";
                id = self.$route.query.id;
                self
                    .getbaseappVersionfindOne({
                        id: id
                    })
                    .then(data => {
                        // console.log("详情", JSON.parse(JSON.stringify(data)))
                        if (data.code == 200) {
                            self.versionNameVal = data.data.versionName;
                            self.versionCodeVal = data.data.versionCode;
                            self.type = data.data.type;
                            self.isFile = true;
                            self.UpdatingStateVal = data.data.forcedUpdatingState;
                            self.versionsInfoVal = data.data.info;
                            self.versionsFileUrl = data.data.url;
                            self.versionsSize = data.data.size;
                            if (data.data.state == 1) {
                                this.Using = false;
                                this.NoUsing = true;
                            } else {
                                this.Using = true;
                                this.NoUsing = false;
                            }
                            self.stateIndex = data.data.state;
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    })
                    .catch(msg => {
                        // console.log(msg)
                        self.loading = false;
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            },
            // change file
            onFileChange(e) {
                var self = this;
                if (self.fileBut != "上传中..") {
                    self.isFile = false;
                    var files = e.target.files || e.dataTransfer.files;
                    if (files[0]) {
                        var fileData = files[0];
                        self.apkName = fileData.name;
                        var fileSize = "";
                        self.versionsSize = fileData.size;
                        fileSize = fileData.size / 1024 / 1024;
                        var typeApk = fileData.type.split('/')[0]
                        if (fileSize > 100) {
                            self.$message({
                                message: "上传大于100M",
                                type: "info"
                            });
                            document.getElementById("upFileApk").value = "";
                            self.isFile = false;
                        } else if (typeApk != 'application') {
                            self.$message('请上传Apk文件')
                        } else {
                            self.onFile(fileData);
                            self.fileBut = "上传中..";
                        }
                    }
                } else {
                    document.getElementById("upFileApk").value = "";
                    self.$message({
                        message: "正在上传..",
                        type: "info"
                    });
                }
            },
            getuploadFileVersions(formdata) {
                var self = this;
                return Vue.http
                    .post(
                    "/zuul/file-service-file-upload/V1.0.0/api/file/upload",
                    formdata,
                    {
                        progress: function (event) {
                            if (event.loaded == event.total) {
                                self.progressVal = 1;
                            } else {
                                self.progressVal = event.loaded / event.total;
                            }
                        }
                    }
                    )
                    .then(response => {
                        if (response.status === 200) {
                            return Promise.resolve(response.body);
                        } else {
                            return Promise.reject(response.data);
                        }
                    });
            },
            onFile(file) {
                var self = this;
                var TOKEN = sessionStorage.getItem("token");
                var formdata = new FormData();
                formdata.append("file", file);
                formdata.append("appName", "BOTU");
                formdata.append("appId", "BOTU");
                formdata.append("module", "component");
                formdata.append("business", "apk");
                formdata.append("token", TOKEN);
                self
                    .getuploadFileVersions(formdata)
                    .then(data => {
                        // console.log("上传", JSON.parse(JSON.stringify(data)))
                        if (data.code == 200) {
                            self.$message({
                                message: "上传成功",
                                type: "success"
                            });
                            self.isFile = true;
                            self.fileBut = "上传完成";
                            self.versionsFileUrl = data.data[0].path;
                        } else {
                            self.isFile = false;
                            self.fileBut = "上传";
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    })
                    .catch(msg => {
                        // console.log(msg)
                        self.isFile = false;
                        self.fileBut = "上传";
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            },
            // affirm addtion
            addClick() {
                var self = this;
                if (self.addClickTrue == false) {
                    var operation = "";
                    operation = self.$route.query.op;
                    if (
                        self.isversionName == true &&
                        self.isFile == true &&
                        self.isversionCode == true &&
                        self.isversionsInfo == true
                    ) {
                        if (operation == 1) {
                            self.adding = true;
                            self.addClickTrue = true;
                            self
                                .getbaseappVersionsave({
                                    versionName: self.versionNameVal,
                                    versionCode: parseInt(self.versionCodeVal),
                                    type: self.type,
                                    info: self.versionsInfoVal,
                                    times: 0,
                                    url: self.versionsFileUrl,
                                    size: parseInt(self.versionsSize),
                                    state: parseInt(self.stateIndex),
                                    forcedUpdatingState: self.UpdatingStateVal,
                                })
                                .then(data => {
                                    self.adding = false;
                                    self.addClickTrue = false;
                                    if (data.code == 200) {
                                        self.intercept = true;
                                        self.$message({
                                            type: "success",
                                            message: "添加成功!"
                                        });

                                        self.$router.push({
                                            path: "/common/versions"
                                        });
                                    } else {
                                        self.$message({
                                            type: "info",
                                            message: data.message
                                        });
                                    }
                                })
                                .catch(msg => {
                                    self.adding = false;
                                    self.addClickTrue = false;
                                    self.$message({
                                        type: "info",
                                        message: "服务器异常"
                                    });
                                });
                        } else {
                            var id = "";
                            id = self.$route.query.id;
                            self.adding = true;
                            var ipdateObj = {};
                            ipdateObj = {
                                id: id,
                                versionName: self.versionNameVal,
                                versionCode: parseInt(self.versionCodeVal),
                                type: self.type,
                                info: self.versionsInfoVal,
                                state: parseInt(self.stateIndex),
                                forcedUpdatingState: self.UpdatingStateVal,
                            };
                            self.addClickTrue = true;
                            self
                                .getbaseappVersionupdate(ipdateObj)
                                .then(dataThr => {
                                    self.adding = false;
                                    self.addClickTrue = false;
                                    if (dataThr.code == 200) {
                                        self.intercept = true
                                        self.$message({
                                            type: "success",
                                            message: "修改成功!"
                                        });
                                        self.$router.push({
                                            path: "/common/versions"
                                        });
                                    } else {
                                        self.$message({
                                            type: "info",
                                            message: data.message
                                        });
                                    }
                                })
                                .catch(msg => {
                                    self.adding = false;
                                    self.addClickTrue = false;
                                    self.$message({
                                        type: "info",
                                        message: "服务器异常"
                                    });
                                });
                        }
                    } else {
                        if (self.isversionName == false) {
                            self.isRedversionName = true;
                            self.isGrayversionName = false;
                        } else {
                            self.isRedversionName = false;
                            self.isGrayversionName = true;
                        }
                        if (self.isFile == false) {
                            self.isRedFile = true;
                            self.isGrayFile = false;
                        } else {
                            self.isRedFile = false;
                            self.isGrayFile = true;
                        }
                        if (self.isversionCode == false) {
                            self.isRedversionCode = true;
                            self.isGrayversionCode = false;
                        } else {
                            self.isRedversionCode = false;
                            self.isGrayversionCode = true;
                        }
                        if (self.isversionsInfo == false) {
                            self.isRedversionsInfo = true;
                            self.isGrayversionsInfo = false;
                        } else {
                            self.isRedversionsInfo = false;
                            self.isGrayversionsInfo = true;
                        }
                    }
                }
            },
            // back
            backClick() {
                this.$router.push({
                    path: "/common/versions"
                });
            },
            ...mapActions([
                "getbaseappVersionsave",
                "getbaseappVersionupdate",
                "getbaseappVersionfindOne"
            ])
        },
        // 监视
        watch: {
            versionNameVal: function (val) {
                var trimstr = val;
                var reg = new RegExp(/[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/g);
                if (trimstr.length <= 0) {
                    this.isversionName = false;
                } else {
                    if (reg.test(trimstr)) {
                        this.isRedversionName = false;
                        this.isGrayversionName = true;
                        this.isversionName = true;
                    } else {
                        this.isversionName = false;
                    }
                }
            },
            versionCodeVal: function (val) {
                var b = this.versionCodeVal.toString()
                var a = b.replace(/[^A-Za-z0-9.]/g, '')
                this.versionCodeVal = a
                var trimstr = val;
                var reg = new RegExp(/[A-Za-z0-9.]{1,10}$/g);
                if (trimstr.length <= 0) {
                    this.isversionCode = false;
                } else {
                    if (reg.test(trimstr)) {
                        this.isRedversionCode = false;
                        this.isGrayversionCode = true;
                        this.isversionCode = true;
                    } else {
                        this.isversionCode = false;
                    }
                }
            },
            versionsInfoVal: function (val) {
                var trimstr = val;
                if (trimstr.length <= 0) {
                    this.isversionsInfo = false;
                } else {
                    if (trimstr.length < 50) {
                        this.isRedversionsInfo = false;
                        this.isGrayversionsInfo = true;
                        this.isversionsInfo = true;
                    } else {
                        this.isversionsInfo = false;
                    }
                }
            }
        }
    };
</script>
<style scoped>
    .listRoutineTextarea>div:nth-child(1) {
        height: 100px;
    }

    .grayIconlabel {
        width: 100%;
        height: 100%;
    }

    textarea {
        width: 350px;
        height: 100px;
        resize: none;
        padding-top: 5px;
        padding-left: 5px;
    }

    .listVersions {
        margin-top: 24px;
        display: flex;
        align-items: center;
        overflow: hidden;
        height: 75px;
    }

    .listVersionsProgress {
        width: 310px;
        height: 70px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-radius: 4px;
        /*overflow: hidden;*/
    }

    .listVersionsProgress>div {
        width: 100%;
    }

    .listVersionsProgress>div:nth-child(1) {
        display: flex;
    }

    .listVersionsProgress>div:nth-child(1)>div:nth-child(2) {
        margin-left: 10px;
    }

    .listVersions>div:nth-child(2)>div:nth-child(2) {
        margin-left: 24px;
        width: 90px;
        text-align: center;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        border: 1px solid #fe5371;
        color: #fff;
        background-color: #fe5371;
        cursor: pointer;
    }

    .listVersions>div:nth-child(2) {
        width: 400px;
        height: 50px;
        margin-left: 14px;
        display: flex;
        align-items: center;
    }

    .listVersions>div:nth-child(1) {
        height: 50px;
        width: 100px;
        line-height: 50px;
        color: #303030;
        font-size: 14px;
        text-align: right;
    }

    .listVersions>div:nth-child(3) {
        height: 30px;
        line-height: 30px;
        margin-left: 24px;
        font-size: 14px;
    }

    .listVersions>div:nth-child(4) {
        height: 30px;
        line-height: 30px;
        margin-left: 24px;
        width: 10px;
        font-size: 14px;
    }

    .listVersions>div:nth-child(4) input {
        width: 10px;
    }

    .comone {
        display: flex;
        align-items: center;
        height: 30px;
        margin-top: 20px;
    }

    .comone>div:nth-child(1) {
        height: 30px;
        width: 100px;
        line-height: 30px;
        color: #303030;
        font-size: 14px;
        text-align: right;
    }

    .comone>div:nth-child(2) {
        height: 30px;
        margin-left: 14px;
        margin-top: 10px;
    }

    .comone>div:nth-child(2) small {
        margin-left: 5px;
        font-size: 14px;
        color: #4a4a4a;
    }

    .comone>div:nth-child(3) small {
        margin-left: 5px;
        font-size: 14px;
        color: #4a4a4a;
    }

    .comone>div:nth-child(3) {
        margin-top: 10px;
        overflow: hidden;
        margin-left: 30px;
        height: 30px;
    }

    .redTest {
        color: #fe5371;
    }

    .grayTest {
        color: #8f8e94;
    }

    .grayInput {
        border: 1px solid #d1d1d1;
    }

    .redInput {
        border: 1px solid #fe5371;
    }

    .listRoutine input {
        width: 305px;
        height: 32px;
        border-radius: 4px;
        padding-left: 10px;
        color: #303030;
    }

    .listRoutine>div:nth-child(1) {
        width: 100px;
        text-align: right;
    }

    .listRoutine>div:nth-child(2) {
        margin-left: 16px;
    }

    .listRoutine>div:nth-child(3) {
        margin-left: 18px;
    }

    .listRoutine {
        margin-top: 24px;
        display: flex;
        min-height: 33px;
        align-items: center;
    }

    .list-cont {
        width: 800px;
        min-height: 300px;
    }

    .but {
        height: 80px;
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
        margin-top: 40px;
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
        background-color: #d1d1d1;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }

    .sale>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .list {
        min-height: 540px;
        width: 100%;
    }

    .listTitle {
        height: 58px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .listTitle>div:nth-child(1) {
        /*border: 1px solid red;*/
        width: 120px;
        height: 27px;
        margin-top: 12px;
        float: left;
        display: flex;
        align-items: center;
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
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 0px;
        margin-left: 10px;
    }

    select {
        width: 120px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
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

    /*提示信息弹出框*/

    .delContent {
        width: 525px;
        height: 280px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 280px) / 2) auto;
        z-index: 100000;
    }

    .showdel {
        display: none;
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

    .slide-fade-enter-active {
        transition: all 0.7s ease;
    }

    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
</style>