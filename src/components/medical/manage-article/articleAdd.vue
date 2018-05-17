<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="articleAdd">
        <div>
            <!-- 详情头部 -->
            <div class="articleAddTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        新增文章
                    </div>
                </div>
            </div>
            <!-- 审核列表展示 -->
            <div class="articleAddList">
                <ul>
                    <li class="title">
                        <div>
                            标题：
                        </div>
                        <div class="cssFlex">
                            <input :class="{redborder:isbortitle}" type="text" maxlength="25" v-model="titleText">
                            <span :class="{fontred:isbortitle}">最多输入25个字符（不支持非法字符）</span>
                        </div>
                    </li>
                    <li class="cover">
                        <div>
                            封面：
                        </div>
                        <div>
                            <div>
                                <img src="/static/img/addimg.jpg" alt="" v-show="imgboxOne">
                                <img :src="mainPicuter" alt="" v-show="imgboxTow">
                            </div>
                            <label for="upfile">上传</label>
                            <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                            <span :class="{fontred:articlebutcover}">图片尺寸为375*125，大小不能超过100KB</span>
                        </div>
                    </li>
                    <li class="classify">
                        <div>
                            分类：
                        </div>
                        <div>
                            <select :class="{redborder:isborclassify}" v-model="classifyModel" @change="classifyChg">
                                <option v-for="(type,index) in healthList" v-bind:value="type.key" :key='type.value'>{{type.value}}</option>
                            </select>
                        </div>
                    </li>
                    <li class="author">
                        <div>
                            作者：
                        </div>
                        <div>
                            <input :class="{redborder:isborauthor}" type="text" maxlength="10" v-model="authorText">
                            <span :class="{fontred:isborauthor}">最多输入10个字符（不支持非法字符）</span>
                        </div>
                    </li>

                </ul>
            </div>
            <div class="editorLi">
                <div id="editor" tabindex="-1" v-html="inputContent" style="height: 500px;">

                </div>
            </div>
            <div class="articlebut">
                <div @click="okClick">
                    确定
                </div>
                <div @click="returnClick">
                    取消
                </div>
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
    import WangEditor from "wangeditor";
    import hosdel from "../../cModule/cancelBox";
    export default {
        components: {
            "v-hosdel": hosdel
        },
        data() {
            return {
                uploadimage: true,
                okclick: true, //控制是否可以点击确定添加的按钮
                isShowdel: true,
                titleText: "",
                authorText: "",
                classifyModel: "QXZ",
                inputContent: "", //编辑器
                content: "", //编辑器html
                inputText: "", //编辑器文本内容
                imgboxOne: true,
                imgboxTow: false,
                titlename: "劳动成果还未保存，是否退出？",
                mainPicuter: "",
                isbortitle: false,
                articlebutcover: false,
                isborclassify: false,
                isborauthor: false,
                healthList: [{ value: "请选择", key: "QXZ" }], //健康分类下拉
                intercept: false
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
                if (arrs.indexOf("article") == -1) {
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
                    self
                        .getArticleAssortment({})
                        .then(data => {
                            self.loading = false;
                            //console.log("健康分类", data);
                            if (data.code == 200) {
                                var arr = data.data;
                                arr.forEach(function (ele, ind) {
                                    self.healthList.push({ value: ele.value, key: ele.key });
                                });
                            } else {
                                self.$message({
                                    type: "info",
                                    message: data.message
                                });
                            }
                        })
                        .catch(msg => {
                            //console.log(msg);
                            self.$message({
                                type: "info",
                                message: "服务器异常！"
                            });
                        });
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
        mounted() {
            this.createEditor();
        },
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
                    path: "/medical/article"
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
                this.isShowdel = true;
            },
            // 编辑器处理
            createEditor() {
                const self = this;
                const editor = new WangEditor("editor");
                editor.config.menus = [
                    "bold",
                    "underline",
                    "italic",
                    "strikethrough",
                    "eraser",
                    "forecolor",
                    "bgcolor",
                    "|",
                    "quote",
                    "fontfamily",
                    "fontsize",
                    "head",
                    "unorderlist",
                    "orderlist",
                    "alignleft",
                    "aligncenter",
                    "alignright",
                    "|",
                    "link",
                    "unlink",
                    "table",
                    "img",
                    "video",
                    "insertcode",
                    "|",
                    "undo",
                    "redo",
                    "fullscreen"
                ];
                // 上传图片（举例）
                editor.config.uploadImgUrl =
                    '/V1.0.0/api/file/uploadWebEditor';
                var TOKEN = sessionStorage.getItem("token");
                editor.config.uploadParams = {
                    appName: "BOTU",
                    appId: "BOTU",
                    module: "medical",
                    business: "medical",
                    token: TOKEN
                };
                // 设置 headers（举例）
                editor.config.uploadHeaders = {
                    Accept: "*"
                };
                // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
                //  editor.config.hideLinkImg = true;
                editor.onchange = function () {
                    self.content = this.$txt.html();
                    self.inputText = this.$txt.text();
                    //console.log("111");
                    //console.log(editor.$txt.find("img"));
                };
                editor.create();
            },
            //分类选择
            classifyChg() {
                this.isborclassify = false;
            },
            // 选择图片上传
            onFileChange(e) {
                var self = this;
                self.ismainPicuter = true;
                var files = e.target.files || e.dataTransfer.files;
                var fileData = files[0];
                if (files[0]) {
                    //console.log(fileData);
                    // 读取图片数据
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        // 加载图片的真实宽度和高度
                        var image = new Image();
                        image.onload = function () {
                            if (fileData.size > 102400) {        
                                self.$message({
                                    type: "info",
                                    message: "您上传图片的格式或大小不正确，请重新上传"
                                });
                                return;
                            } else if (image.width !== 375) {
                                self.$message({
                                    type: "info",
                                    message: "您上传图片的格式或大小不正确，请重新上传"
                                });
                                document.getElementById("upfile").value = "";
                                return;
                            } else if (image.height !== 125) {
                                self.$message({
                                    type: "info",
                                    message: "您上传图片的格式或大小不正确，请重新上传"
                                });
                                document.getElementById("upfile").value = "";
                                return;
                            } else {
                                self.uploadImage(files[0]);
                            }
                        };
                        image.src = data;
                    };
                    reader.readAsDataURL(fileData);
                }
            },
            // 上传图片
            uploadImage(file) {
                var formdata = new FormData();
                var self = this;
                //console.log(file);
                formdata.append("file", file);
                formdata.append("appId", "BOTU");
                formdata.append("appName", "BOTU");
                formdata.append("module", "medical");
                formdata.append("business", "article");
                if (self.uploadimage == true) {
                    self.uploadimage = false;
                    this.gethosuploadFile(formdata)
                        .then(data => {
                            //console.log(data);
                            self.uploadimage = true;
                            if (data.code == 200) {
                                if (this.ismainPicuter == true) {
                                    this.imgboxOne = false;
                                    this.imgboxTow = true;
                                    this.articlebutcover = false;
                                    this.mainPicuter = data.data[0].path;
                                } else {
                                    return;
                                }
                            } else {
                                this.$message(data.message);
                            }
                        })
                        .catch(msg => {
                            self.uploadimage = true;
                            //console.log(msg);
                            self.$message({
                                type: "info",
                                message: "服务器异常！"
                            });
                        });
                }
            },
            //正则验证
            panduan() {
                var regOne = /^[\s]*$/; //输入不能为空
                var regTwo = new RegExp("[`:+~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
                if (regOne.test(this.titleText) || regTwo.test(this.titleText)) {
                    this.isbortitle = true;
                }
                if (regOne.test(this.authorText) || regTwo.test(this.authorText)) {
                    this.isborauthor = true;
                }
                if (this.imgboxTow == false) {
                    this.articlebutcover = true;
                }
                if (this.classifyModel == "QXZ") {
                    this.isborclassify = true;
                }
                if (
                    regOne.test(this.titleText) ||
                    regOne.test(this.authorText) ||
                    this.imgboxTow == false ||
                    this.classifyModel == "QXZ"
                ) {
                    return false;
                }
                if (regTwo.test(this.titleText) || regTwo.test(this.authorText)) {
                    return false;
                } else {
                    return true;
                }
            },
            //编辑器的判断
            ensuredscribeClick() {
                var regOne = /^[\s]*$/; //输入不能为空
                if (this.content.indexOf('<img src="http://') >= 0) {
                    return true;
                } else if (regOne.test(this.inputText) || this.inputText.length > 5000) {
                    return false;
                }
            },
            //确定按钮
            okClick() {
                if (this.panduan() == false || this.ensuredscribeClick() == false) {
                    if (this.ensuredscribeClick() == false) {
                        var obj = document.getElementsByClassName("wangEditor-container");
                        obj[0].style.border = "1px solid #fe5371";
                    }
                } else {
                    var self = this;
                    if (self.okclick == true) {
                        self.okclick = false;
                        self
                            .getaddArticle({
                                articleTitle: self.titleText, //文章标题
                                articleImage: self.mainPicuter, //文章图片
                                authorName: self.authorText, //作者名字
                                articleContent: self.content, //文章内容
                                articleAssortmentId: self.classifyModel //文章分类id
                            })
                            .then(data => {
                                self.loading = false;
                                self.okclick = true;
                                //console.log("健康分类", data);
                                if (data.code == 200) {
                                    this.intercept = true;
                                    this.$router.push({
                                        path: "/medical/article"
                                    });
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: data.message
                                    });
                                }
                            })
                            .catch(msg => {
                                self.okclick = true;
                                //console.log(msg);
                                self.$message({
                                    type: "info",
                                    message: "服务器异常！"
                                });
                            });
                    }
                }
            },
            ...mapActions(["gethosuploadFile", "getArticleAssortment", "getaddArticle"])
        },
        // 监视
        watch: {
            //标题
            titleText: function (val) {
                this.isbortitle = false;
            },
            //作者
            authorText: function (val) {
                this.isborauthor = false;
            },
            content: function (val) {
                var obj = document.getElementsByClassName("wangEditor-container");
                obj[0].style.border = "1px solid #d1d1d1";
            }
        }
    };
</script>
<style scoped>
    .articleAdd {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .articleAdd>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .articleAddTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .articleAddTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .articleAddTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .articleAddTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .articleAddTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .articleAddList {
        margin: 24px 0px;
    }

    .articleAddList li {
        overflow: hidden;
        margin-bottom: 24px;
    }

    .articleAddList li div {
        float: left;
    }

    .articleAddList li div:nth-child(1) {
        width: 13%;
        max-width: 200px;
        height: 32px;
        line-height: 32px;
        text-align: right;
        margin-right: 16px;
    }

    .articleAddList li div:nth-child(2) {
        text-align: left;
        width: 80%;
    }

    select {
        width: 150px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
        cursor: pointer;
    }

    select::-ms-expand {
        display: none;
    }

    .title input {
        width: 362px;
        height: 32px;
        padding-left: 4px;
        border-radius: 4px;
        border: 1px solid #aeaeae;
    }

    .author input {
        width: 150px;
        height: 32px;
        padding-left: 4px;
        border-radius: 4px;
        border: 1px solid #aeaeae;
    }

    .editorLi {
        margin: 54px 0 0 14%;
        overflow: hidden;
        width: 80%;
        max-width: 945px;
        height: 570px;
    }

    .cover {
        overflow: hidden;
    }

    .cover>div:nth-child(2)>div {
        float: left;
        width: 375px;
        height: 152px;
        margin-top: 1px;
        line-height: 152px;
        text-align: center;
        border: 1px solid rgba(209, 209, 209, 0.5);
    }

    .cover>div:nth-child(2) label {
        float: left;
        width: 80px;
        height: 30px;
        color: white;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        /* #5acdfa 蓝色 */
        background: #f0622e;
        margin: 10px 0 0 24px;
        cursor: pointer;
    }

    .cover img:nth-child(2) {
        width: 100%;
        height: 100%;
    }

    .cover>div:nth-child(2) span {
        height: 32px;
        line-height: 32px;
        margin-top: 8px;
        display: inline-block;
    }

    .cover input {
        display: none;
    }

    .articlebut {
        width: 80%;
        max-width: 950px;
        height: 32px;
        display: flex;
        margin: 24px 14%;
        justify-content: center;
    }

    .articlebut div {
        width: 70px;
        height: 32px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
    }

    .articlebut div:nth-child(1) {
        background: #5acdfa;
        margin-right: 40px;
    }

    .articlebut div:nth-child(2) {
        background: #aeaeae;
    }

    .articleAddList span {
        padding-left: 18px;
        color: #8f8e94;
    }

    .fontred {
        color: #dc322b !important;
    }

    .redborder {
        border-color: #dc322b !important;
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

    .cssFlex {
        display: flex;
        flex-wrap: wrap;
    }

    .cssFlex span {
        margin-top: 8px;
    }
</style>