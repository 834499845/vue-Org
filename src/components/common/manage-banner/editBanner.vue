<!--添加活动管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale" @click="saleClick">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        修改banner
                    </div>
                </div>
            </div>
            <div class="fill-in">
                <div class="location">
                    <div>
                        banner位置：
                    </div>
                    <div>
                        {{moduleName}}
                        <img src="/static/img/hjian.png" alt="">
                    </div>
                </div>
                <div class="activity" v-show="activityShow">
                    <div>
                        活动名称：
                    </div>
                    <div>
                        <input type="text" maxlength="15" v-model="activityName">
                        <span v-show="activityAstrict" class="grayfont">最多输入15个汉字</span>
                        <span v-show="activityIf" class="redfont">有非法字符，请重新输入</span>
                    </div>
                </div>
                <div class="activity" v-show="activityShow">
                    <div>
                        活动描述：
                    </div>
                    <div>
                        <input type="text" maxlength="15" v-model="bannerDescribe">
                        <span v-show="describeAstrict" class="grayfont">最多输入15个汉字</span>
                        <span v-show="describeIf" class="redfont">有非法字符，请重新输入</span>
                    </div>
                </div>
                <div class="uploadingImg">
                    <div>
                        上传图片：
                    </div>
                    <div>
                        <img :src="uploadImg" alt="">
                        <label for="upfile">
                            上传
                        </label>
                        <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                        <span v-show="ifLocation == 3" class="grayfont">图片尺寸为1125*495；大小不能能超过200KB</span>
                        <span v-show="ifLocation == 1" class="grayfont">图片尺寸为710*270；大小不能能超过200KB</span>
                        <span v-show="imgAstrictIf" class="redfont">图片太大，请修改文件尺寸后重新上传</span>
                    </div>
                </div>
                <div class="skipType" v-show="skipTypeIf">
                    <div>
                        跳转类型：
                    </div>
                    <div>
                        <ul>
                            <li class="checkboxs" v-for="(city,index) in levs" @click="levClick(index)">
                                <div class="checkboxsOne" v-if="tfshow == index">
                                    <div></div>
                                </div>
                                <div class="checkboxsTwo" v-else>
                                </div>
                                <div>
                                    {{city.value}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="category" v-show="categoryShow">
                    <div>
                        请选择类目：
                    </div>
                    <div class="allCondition">
                        <div class="allCategory">
                            <div class="categoryList">
                                <div @click.stop="categoryOpenOne">
                                    {{categoryNameOne}}
                                    <img src="/static/img/hjian.png" alt="">
                                </div>
                                <div v-show="categoryListOneIf">
                                    <ul>
                                        <li @click="optionOneClick">一级类目：</li>
                                        <li @click="optionClikOne(index)" v-for="(type,index) in categoryOne">{{type.name}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="categoryList">
                                <div @click.stop="categoryOpenTwo">
                                    {{categoryNameTwo}}
                                    <img src="/static/img/hjian.png" alt="">
                                </div>
                                <div v-show="categoryListTwoIf">
                                    <ul>
                                        <li @click="optionClikTwo(index)" v-for="(type,index) in categoryTwo">{{type.name}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="categoryList">
                                <div @click.stop="categoryOpenThree">
                                    {{categoryNameThree}}
                                    <img src="/static/img/hjian.png" alt="">
                                </div>
                                <div v-show="categoryListThreeIf">
                                    <ul>
                                        <li @click="optionClikThree(index)" v-for="(type,index) in categoryThree">{{type.name}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="seekText">
                            <div>
                                <input type="text" v-model="commodityName">
                            </div>
                            <div @click="commodityClick">
                                搜索
                            </div>
                        </div>

                    </div>
                </div>
                <div v-show="categoryShow">
                    <div></div>
                    <div class="commodity">
                        <div class="allSelect" @click="allClick">
                            <div v-if="okClick">
                                <img src="/static/img/show.jpg" alt="">
                            </div>
                            <div v-else class="allSelectSon"></div>
                            <span>全部</span>
                        </div>
                        <ul>
                            <li v-for="(type,index) in commodityList">
                                <div @click="commodityLiClick(index)" v-show="type.show">{{type.productName}}</div>
                                <div @click="commodityLiClick(index)" v-show="!type.show" class="redback">{{type.productName}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="linkUrl" v-show="linkUrlShow">
                    <div>
                        链接地址：
                    </div>
                    <div>
                        <input type="text" v-model="linkaddress" @change="linkUrlChange">
                        <span v-show="linkAstrict" class="grayfont">填入http://开始的地址</span>
                        <span v-show="linkIf" class="redfont">链接地址不正确，请输入正确的地址</span>
                    </div>
                </div>
                <div class="isContent" v-show="bestirLinkShow">
                    <div>
                        选择内容：
                    </div>
                    <div>
                        <!-- <div> -->
                        <select v-model="contentModel" @change="contentChange">
                            <option v-for="(type,index) in contentList" v-bind:value="type.dictionaryCode">{{type.dictionaryName}}</option>
                        </select>
                    </div>
                </div>
                <div class="bestirLink" v-show="bestirLinkShow">
                    <div>
                        链接地址：
                    </div>
                    <div>
                        <div>
                            <nobr>
                                {{bestirLinkUrl}}
                            </nobr>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnBox">
                <input type="button" value="保存" @click="preserve">
                <input type="button" value="取消" @click="canelClick">
            </div>
        </div>

        <!--保存提示信息弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @canle="canleClick" :name="nametitle"></v-hosdel>
                </div>
            </transition>
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
    require("../../../../API/config.js");
    import { mapActions, mapState } from "vuex";
    import nopreserve from "../../cModule/nopreserve";
    import intercept from "../../cModule/intercept";
    export default {
        components: {
            "v-hosdel": nopreserve,
            "v-hosdels": intercept
        },
        computed: mapState(["bannerIndexObj"]),
        data() {
            return {
                contentList: [],
                bestirLinkShow: false,
                skipTypeIf: true, //跳转类型
                activityShow: true, //活动名称输入框
                categoryNameOne: "一级类目：",
                categoryNameTwo: "二级类目：",
                categoryNameThree: "三级类目：",
                categoryShow: true, //分类选择块
                linkUrlShow: true, //链接地址
                radio: "1",
                ifLocation: "",
                levs: [
                    { value: "链接", show: "externalLink", key: "1" },
                    { value: "商品", show: "interiorLink", key: "2" }
                ],
                brands: [
                    { name: "商城", id: 1 },
                    // { name: '医疗', id: 2 },
                    { name: "激励", id: 3 }
                ],
                commodityList: [],
                arr: [],
                commodityArr: [],
                categoryOne: [],
                categoryTwo: [],
                categoryThree: [],
                isShowdels: true,
                topath: "",
                delShows: false,
                nametitles: "劳动成果还未保存，确定退出？",
                intercept: false,
                nametitle: "有未完成的内容，请填写完整再保存",
                uploadImg: "/static/img/upload.png",
                linkaddress: "",
                activityName: "",
                bannerDescribe: "",
                textcontent: "",
                bannerLinkUrl: "",
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                activityAstrict: true,
                describeAstrict: true,
                describeIf: false,
                linkAstrict: true,
                imgAstrict: true,
                activityIf: false,
                linkIf: false,
                imgAstrictIf: false,
                tfshow: 0,
                categoryListOneIf: false,
                categoryListTwoIf: false,
                categoryListThreeIf: false,
                categoryIdOne: "",
                categoryIdTwo: "",
                categoryIdThree: "",
                moduleName: "",
                typeKey: 1,
                generalities: "",
                commodityName: "",
                okClick: false,
                bestirLinkUrl: "",
                contentModel: "",
                onFileChangeTrue: false,
                preserveTrue: false
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
                if (arrs.indexOf("banner") == -1) {
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
                    self.editData = JSON.parse(sessionStorage.edata);
                    console.log(":::",self.editData.bannerUrl)
                    self.activityName = self.editData.bannerName;
                    self.bannerDescribe = self.editData.bannerContext;
                    self.linkaddress = self.editData.bannerUrl;
                    self.uploadImg = self.editData.bannerImage;
                    self.ifLocation = self.editData.bannerModular;
                    // console.log(self.editData.bannerModular);
                    self.bestirLinkUrl = self.editData.bannerUrl;
                    //修改的模块的名字用for获取
                    for (var i = 0; i < self.brands.length; i++) {
                        if (self.brands[i].id == self.editData.bannerModular) {
                            // console.log("所进行的模块", self.brands[i].name)
                            self.moduleName = self.brands[i].name;
                            break;
                        }
                    }
                    //修改的为商城banner
                    if (self.editData.bannerModular == "1") {
                        self.activityShow = false;
                        self.skipTypeIf = true;
                        self.bestirLinkShow = false;
                        //修改的链接
                        if (self.editData.responseType == "1") {
                            self.tfshow = 0
                            self.linkUrlShow = true;
                            self.categoryShow = false;
                            self.typeKey = 1;
                        }
                        //修改的为商品
                        if (self.editData.responseType == "2") {
                            self.tfshow = 1
                            self.linkUrlShow = false;
                            self.categoryShow = true;
                            // console.log("商品id", self.editData.goodsIds);
                            var commodityArray = [];
                            if (self.editData.goodsIds.indexOf(",") == -1) {
                                commodityArray.push(self.editData.goodsIds);
                            } else {
                                commodityArray = self.editData.goodsIds.split(",");
                            }
                            self.commodityArr = commodityArray;
                            self.getClassfyOne();
                            self.merchandiseNews();
                            self.typeKey = 2;
                        }
                    }
                    //修改的为激励banner
                    if (self.editData.bannerModular == "3") {
                        self.activityShow = true;
                        self.skipTypeIf = false;
                        self.categoryShow = false;
                        self.linkUrlShow = false;
                        self.bestirLinkShow = true;
                        self.typeKey = 1;
                        self.contentFn();
                        self.bannerLinkUrl = self.bestirLinkUrl;
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
            //新增激励选择内容
            contentFn() {
                var self = this;
                self
                    .getbasefindListByParentId({
                        parentId: 3440
                    })
                    .then(data => {
                        //   console.log('子字典列表', data)
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.length > 0) {
                                    self.contentList = data.data;
                                    self.editData = JSON.parse(sessionStorage.edata);
                                    self.contentModel = self.editData.bannerUrl.split("code=")[1];
                                } else {
                                    self.contentList = [];
                                }
                            } else {
                                self.contentList = [];
                            }
                        } else {
                            self.contentList = [];
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
            },
            // 选择内容下拉
            contentChange() {
                var self = this;
                this.bestirLinkUrl =
                    global.httpStr + global.banner + "/#/encourage?sort=5&code=" + this.contentModel;
                this.bannerLinkUrl = this.bestirLinkUrl;
            },
            //全局点击
            saleClick() {
                this.categoryListOneIf = false;
                this.categoryListTwoIf = false;
                this.categoryListThreeIf = false;
            },
            //一级类目点击展开列表
            categoryOpenOne() {
                this.getClassfyOne();
                if (this.categoryOne.length > 0) {
                    this.categoryListOneIf = true;
                    this.categoryListTwoIf = false;
                    this.categoryListThreeIf = false;
                } else {
                    this.categoryListOneIf = false;
                    this.categoryListTwoIf = false;
                    this.categoryListThreeIf = false;
                    this.$message({
                        type: "info",
                        message: "暂无一级类目！"
                    });
                }
            },
            //二级类目点击展开列表
            categoryOpenTwo() {
                if (this.categoryTwo.length > 0) {
                    this.categoryListOneIf = false;
                    this.categoryListTwoIf = true;
                    this.categoryListThreeIf = false;
                } else {
                    this.categoryListOneIf = false;
                    this.categoryListTwoIf = false;
                    this.categoryListThreeIf = false;
                    this.$message({
                        type: "info",
                        message: "暂无二级类目！"
                    });
                }
            },
            //三级类目点击展开列表
            categoryOpenThree() {
                if (this.categoryThree.length > 0) {
                    this.categoryListOneIf = false;
                    this.categoryListTwoIf = false;
                    this.categoryListThreeIf = true;
                } else {
                    this.categoryListOneIf = false;
                    this.categoryListTwoIf = false;
                    this.categoryListThreeIf = false;
                    this.$message({
                        type: "info",
                        message: "暂无三级类目！"
                    });
                }
            },
            //选择一级类目文字
            optionOneClick() {
                this.categoryNameOne = "一级类目：";
                this.categoryNameTwo = "二级类目：";
                this.categoryNameThree = "三级类目：";
                this.categoryTwo = [];
                this.categoryThree = [];
                this.generalities = "";
                this.merchandiseNews();
                // this.commodityList = []
                // this.commodityArr = []
            },
            //获取商品信息
            merchandiseNews() {
                var self = this;
                self
                    .getbannerProductList({
                        pageNo: 1,
                        pageSize: 1000000,
                        logicDelete: 0,
                        classFliy: this.generalities,
                        productName: this.commodityName
                    })
                    .then(data => {
                        self.loading = false;
                        //   console.log("获取商品商品信息", data);
                        if (data.code == 200) {
                            //*/*********************************************************************************************************** */
                            if (data.data.records) {
                                if (data.data.records.length > 0) {
                                    //*/*********************************************************************************************************** */
                                    // console.log("所有商品的长度", data.data.records.length);
                                    // console.log("所有商品", data.data.records);
                                    var arrUp = [];
                                    for (var i = 0; i < data.data.records.length; i++) {
                                        if (data.data.records[i].upShelves == 0) {
                                            var arr = data.data.records[i];
                                            arrUp.push(arr);
                                        }
                                    }
                                    // console.log("上架的数组", arrUp);
                                    // console.log("选取的数组", self.commodityArr);
                                    this.commodityList = [];
                                    if (self.commodityArr.length > 0) {
                                        for (var i = 0; i < arrUp.length; i++) {
                                            var ifshow = false;
                                            for (var j = 0; j < self.commodityArr.length; j++) {
                                                if (arrUp[i].id == self.commodityArr[j]) {
                                                    self.commodityList.push({
                                                        id: arrUp[i].id,
                                                        productName: arrUp[i].productName,
                                                        show: false
                                                    });
                                                    ifshow = true;
                                                }
                                            }
                                            if (ifshow == false) {
                                                self.commodityList.push({
                                                    id: arrUp[i].id,
                                                    productName: arrUp[i].productName,
                                                    show: true
                                                });
                                            }
                                        }
                                    } else {
                                        arrUp.forEach(function (ele, ind) {
                                            self.commodityList.push({
                                                id: ele.id,
                                                productName: ele.productName,
                                                show: true
                                            });
                                        });
                                    }
                                    // console.log("获取商品商品信息", self.commodityList[0].id);
                                    //*/*********************************************************************************************************** */
                                } else {
                                    self.commodityList = [];
                                    self.$message({
                                        type: "info",
                                        message: "暂无商品！"
                                    });
                                }
                            } else {
                                self.commodityList = [];
                                self.$message({
                                    type: "info",
                                    message: "暂无商品！"
                                });
                            }
                            //************************************************************************************************************** */
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
            },
            //点击搜索获取商品信息
            commodityClick() {
                this.okClick = false;
                this.merchandiseNews();
            },
            //一级类目选取
            optionClikOne(index) {
                this.categoryNameTwo = "二级类目：";
                this.categoryNameThree = "三级类目：";
                this.categoryThree = [];
                this.categoryNameOne = this.categoryOne[index].name;
                this.categoryIdOne = this.categoryOne[index].id;
                this.generalities = this.categoryOne[index].id;
                this.commodityName = "";
                this.merchandiseNews();
                var self = this;
                self
                    .getClassfyListFirst({
                        pid: this.categoryOne[index].id
                    })
                    .then(data => {
                        self.loading = false;
                        //   console.log("库存管理下分类列表2", data);
                        if (data.code == 200) {
                            self.categoryTwo = data.data;
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
            },
            //二级类目选取
            optionClikTwo(index) {
                (this.categoryNameThree = "三级类目："),
                    (this.categoryNameTwo = this.categoryTwo[index].name);
                this.categoryIdTwo = this.categoryTwo[index].id;
                this.generalities =
                    this.categoryOne[index].id + "#" + this.categoryTwo[index].id;
                this.commodityName = "";
                this.merchandiseNews();
                var self = this;
                self
                    .getClassfyListFirst({
                        pid: this.categoryTwo[index].id
                    })
                    .then(data => {
                        self.loading = false;
                        //   console.log("库存管理下分类列表2", data);
                        if (data.code == 200) {
                            self.categoryThree = data.data;
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
            },
            //三级类目选取
            optionClikThree(index) {
                this.categoryNameThree = this.categoryThree[index].name;
                this.categoryIdThree = this.categoryThree[index].id;
                this.generalities =
                    this.categoryOne[index].id +
                    "#" +
                    this.categoryTwo[index].id +
                    "#" +
                    this.categoryThree[index].id;
                this.commodityName = "";
                this.merchandiseNews();
            },
            //商品选取关联
            commodityLiClick(index) {
                var self = this;
                if (this.commodityList[index].show == true) {
                    this.commodityArr.push(this.commodityList[index].id);
                    var self = this;
                    var okClickIf;
                    if (this.commodityArr.length == this.commodityList.length) {
                        this.okClick = true;
                    } else {
                        this.okClick = false;
                    }
                } else {
                    for (var i = 0; i < self.commodityArr.length; i++) {
                        if (self.commodityArr[i] == self.commodityList[index].id) {
                            self.commodityArr.splice(i, 1);
                        }
                    }
                    this.okClick = false;
                }
                this.commodityList[index].show = !this.commodityList[index].show;
                //   console.log(this.commodityArr);
            },
            //选择/取消全部商品
            allClick() {
                if (this.okClick == false) {
                    this.commodityArr = [];
                    var self = this;
                    for (var i = 0; i < self.commodityList.length; i++) {
                        self.commodityList[i].show = false;
                        self.commodityArr.push(self.commodityList[i].id);
                    }
                    // console.log(this.commodityArr);
                } else {
                    for (var i = 0; i < this.commodityList.length; i++) {
                        this.commodityList[i].show = true;
                    }
                    this.commodityArr = [];
                    // console.log(this.commodityArr);
                }
                this.okClick = !this.okClick;
            },
            //获取一级分类
            getClassfyOne() {
                var self = this;
                self
                    .getClassfyListFirst({
                        level: 1
                    })
                    .then(data => {
                        if (data.code == 200) {
                            self.categoryOne = data.data;
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
            },
            // 取消点击保存后弹出的提示框
            canleClick() {
                this.isShowdel = true;
                this.delShow = false;
            },
            //取消未保存弹出框返回编辑页面
            canleClicks() {
                this.isShowdels = true;
                this.delShows = false;
            },
            //确定未保存弹出框退出编辑页面
            okclicks() {
                this.intercept = true;
                var url = this.toPath;
                this.$router.push({
                    path: url
                });
            },
            //跳转类型
            levClick(index) {
                this.tfshow = index;
                if (this.levs[index].show == "interiorLink") {
                    this.categoryShow = true;
                    this.linkUrlShow = false;
                    this.typeKey = 2;
                    this.linkaddress = "";
                    if (this.commodityList.length == 0) {
                        this.merchandiseNews();
                    }
                }
                if (this.levs[index].show == "externalLink") {
                    this.categoryShow = false;
                    this.linkUrlShow = true;
                    this.typeKey = 1;
                    this.commodityArr = [];
                    this.commodityList = [];
                    this.okClick = false;
                }
            },
            // 选择图片上传
            onFileChange(e) {
                var self = this;
                if (self.onFileChangeTrue == false) {
                    if (this.ifLocation == 1) {
                        self.ismainPicuter = true;
                        var files = e.target.files || e.dataTransfer.files;
                        if (files[0]) {
                            var fileData = files[0];
                            //   console.log(fileData);
                            // 读取图片数据
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var data = e.target.result;
                                // 加载图片的真实宽度和高度
                                var image = new Image();
                                image.onload = function () {
                                    if (fileData.size > 204800) {
                                        self.$message({
                                            type: "info",
                                            message: "您上传图片的格式或大小不正确，请重新上传"
                                        });
                                        return;
                                    } else if (image.width !== 710) {
                                        self.$message({
                                            type: "info",
                                            message: "您上传图片的格式或大小不正确，请重新上传"
                                        });
                                        return;
                                    } else if (image.height !== 270) {
                                        self.$message({
                                            type: "info",
                                            message: "您上传图片的格式或大小不正确，请重新上传"
                                        });
                                        return;
                                    } else {
                                        self.imgAstrictIf = false;
                                        self.uploadImage(files[0]);
                                    }
                                };
                                image.src = data;
                            };
                            reader.readAsDataURL(fileData);
                        }
                    } else if (this.ifLocation == 3) {
                        self.ismainPicuter = true;
                        var files = e.target.files || e.dataTransfer.files;
                        if (files[0]) {
                            var fileData = files[0];
                            //   console.log(fileData);
                            // 读取图片数据
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var data = e.target.result;
                                // 加载图片的真实宽度和高度
                                var image = new Image();
                                image.onload = function () {
                                    if (fileData.size > 204800) {
                                        self.$message({
                                            type: "info",
                                            message: "您上传图片的格式或大小不正确，请重新上传"
                                        });
                                        return;
                                    } else if (image.width !== 1125) {
                                        self.$message({
                                            type: "info",
                                            message: "您上传图片的格式或大小不正确，请重新上传"
                                        });
                                        return;
                                    } else if (image.height !== 495) {
                                        self.$message({
                                            type: "info",
                                            message: "您上传图片的格式或大小不正确，请重新上传"
                                        });
                                        return;
                                    } else {
                                        self.imgAstrictIf = false;
                                        self.uploadImage(files[0]);
                                    }
                                };
                                image.src = data;
                            };
                            reader.readAsDataURL(fileData);
                        }
                    }
                }
            },
            // 上传图片
            uploadImage(file) {
                var self = this;
                var TOKEN = sessionStorage.getItem("token");
                var formdata = new FormData();
                formdata.append("file", file);
                formdata.append("appName", "BOTU");
                formdata.append("appId", "BOTU");
                formdata.append("module", "component");
                formdata.append("business", "banner");
                formdata.append("token", TOKEN);
                self.onFileChangeTrue = true;
                self
                    .uploadFile(formdata)
                    .then(data => {
                        self.onFileChangeTrue = false;
                        if (data.code == 200) {
                            this.$message({
                                message: "上传图片成功",
                                type: "success"
                            });
                            this.uploadImg = data.data[0].path;
                        } else {
                            this.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.onFileChangeTrue = false;
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            },
            //商城链接地址
            linkUrlChange() {
                this.bannerLinkUrl = this.linkaddress;
            },
            //正则
            panduan() {
                var regOne = /^[\s]*$/; //输入不能为空
                var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
                if (this.ifLocation == "3") {
                    if (
                        regOne.test(this.activityName) ||
                        regOne.test(this.bannerDescribe) ||
                        this.uploadImg == "/static/img/upload.png"
                    ) {
                        return false;
                    }
                    if (regTwo.test(this.activityName)) {
                        return false;
                    }
                    if (regTwo.test(this.bannerDescribe)) {
                        return false;
                    }
                } else if (this.ifLocation == "1") {
                    if (this.uploadImg == "/static/img/upload.png") {
                        return false;
                    }
                    if (this.typeKey == 1) {
                        if (regOne.test(this.linkaddress)) {
                            this.isShowdel = this.linkIf = false;
                            this.delShow = true;
                            return false;
                        } else {
                            var a = this.linkaddress.substring(0, 7);
                            if (a !== "http://") {
                                this.linkAstrict = false;
                                this.linkIf = true;
                                return false;
                            }
                        }
                    } else if (this.typeKey == 2) {
                        if (this.commodityArr == 0) {
                            this.isShowdel = false;
                            this.delShow = true;
                            return false;
                        }
                    }
                }
            },
            // 确定修改banner
            preserve() {
                var self = this;
                if (self.preserveTrue == false) {
                    if (this.panduan() == false || this.imgAstrictIf == true) {
                        var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
                        if (
                            this.linkUrlIf == false ||
                            regTwo.test(this.activityName) ||
                            regTwo.test(this.bannerDescribe)
                        ) {
                            if (this.linkUrlIf == false) {
                                this.linkAstrict = false;
                                this.linkIf = true;
                            } else if (regTwo.test(this.activityName)) {
                                this.activityAstrict = false;
                                this.activityIf = true;
                            }
                            if (regTwo.test(this.bannerDescribe)) {
                                this.describeAstrict = false;
                                this.describeIf = true;
                            }
                        } else {
                            this.isShowdel = false;
                            this.delShow = true;
                        }
                    } else {
                        var arr = [];
                        var commodityArray = "";
                        if (self.commodityArr.length == 1) {
                            commodityArray = self.commodityArr[0];
                        } else {
                            commodityArray = self.commodityArr.join(",");
                        }
                        // console.log(commodityArray);
                        var obj = {
                            id: self.editData.id,
                            bannerUrl: self.bannerLinkUrl,
                            bannerContext: self.bannerDescribe,
                            bannerName: self.activityName,
                            bannerImage: self.uploadImg,
                            bannerModular: self.ifLocation,
                            bannerPosition: 1,
                            responseType: this.typeKey,
                            goodsIds: commodityArray
                        };
                        arr.push(obj);
                        self.preserveTrue = true;
                        self
                            .geteditbannerList({
                                bannerModular: self.ifLocation,
                                bannerPosition: 1,
                                bannersJson: JSON.stringify(arr)
                            })
                            .then(data => {
                                self.preserveTrue = false;
                                if (data.code == 200) {
                                    this.intercept = true;
                                    self.bannerIndexObj.ind = self.$route.query.ind;
                                    this.$router.push({
                                        path: "/common/banner"
                                    });
                                } else {
                                    self.$message({
                                        type: "info",
                                        message: data.message
                                    });
                                }
                            })
                            .catch(msg => {
                                self.preserveTrue = false;
                                self.$message({
                                    type: "info",
                                    message: "服务器异常"
                                });
                            });
                    }
                }
            },

            // 箭头返回上一页
            canelClick() {
                var self = this;
                self.bannerIndexObj.ind = self.$route.query.ind;
                self.$router.push({
                    path: "/common/banner"
                });
            },
            ...mapActions([
                "uploadFile",
                "getbasefindListByParentId",
                "getbannerProductList",
                "geteditbannerList",
                "getClassfyListFirst"
            ])
        },
        // 监视
        watch: {
            linkaddress: function (val) {
                this.changeval = val.length;
                if (this.changeval == 0) {
                    this.linkAstrict = true;
                    this.linkIf = false;
                }
            },
            activityName: function (val) {
                this.changeval = val.length;
                if (this.changeval >= 0) {
                    this.activityAstrict = true;
                    this.activityIf = false;
                }
            },
            bannerDescribe: function (val) {
                this.changeval = val.length;
                if (this.changeval >= 0) {
                    this.describeAstrict = true;
                    this.describeIf = false;
                }
            }
        }
    };
</script>
<style scoped>
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

    /*展示模块*/

    .sale>div:nth-child(1) {
        width: calc(100% - 72px);
    }

    .listTitle {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 36px;
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
        width: 20px;
        height: 20px;
    }

    .listTitle>div:nth-child(1)>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
    }

    .btnBox {
        width: 300px;
        margin: 100px 0 300px 17%;
        overflow: hidden;
    }

    .btnBox input {
        width: 68px;
        height: 32px;
        line-height: 32px;
        border: none;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }

    .btnBox input:nth-child(1) {
        margin-right: 24px;
        background: #fe5371;
    }

    .btnBox input:nth-child(2) {
        margin-left: 24px;
        background: #d1d1d1;
    }

    .fill-in {
        margin-top: 60px;
    }

    .fill-in>div {
        margin: 30px 0 0 50px;
        overflow: hidden;
        min-height: 30px;
        min-width: 700px;
    }

    .fill-in>div>div {
        float: left;
    }

    .fill-in>div>div:nth-child(1) {
        width: 90px;
        height: 30px;
        text-align: right;
        line-height: 30px;
        margin-right: 34px;
    }

    .uploadingImg>div:nth-child(2) {
        height: 52px;
        width: 500px;
        position: relative;
        overflow: hidden;
    }

    .uploadingImg>div:nth-child(2) label {
        cursor: pointer;
        width: 80px;
        height: 28px;
        border-radius: 4px;
        background: #fe5371;
        font-weight: normal;
        text-align: center;
        line-height: 28px;
        color: #fff;
        margin-left: 23px;
    }

    input[type="file"] {
        display: none;
    }

    .uploadingImg>div:nth-child(2) img {
        width: 80px;
        height: 50px;
    }

    .uploadingImg>div:nth-child(2) span {
        position: absolute;
        top: 10px;
        left: 200px;
    }

    .location>div:nth-child(2) {
        width: 100px;
        height: 32px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        line-height: 32px;
        padding: 0 25px;
        position: relative;
        overflow: hidden;
        color: #97969b;
    }

    .location>div:nth-child(2) img {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .location select {
        width: 100px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 92% 12px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
    }

    .isContent select {
        cursor: pointer;
        width: 140px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 92% 12px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
    }

    select::-ms-expand {
        display: none;
    }

    .bestirLink>div:nth-child(2)>div {
        height: 32px;
        min-width: 350px;
        line-height: 32px;
        padding-right: 10px;
        padding-left: 4px;
        border: 1px solid #d1d1dd;
        border-radius: 4px;
    }

    .category>div:nth-child(2)>div {
        float: left;
    }

    .category {
        overflow: visible !important;
    }

    .allCondition {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
    }

    .allCategory {
        min-width: 380px;
        margin-bottom: 24px;
    }

    .seekText {
        min-width: 340px;
        margin-bottom: 24px;
    }

    .allCategory>div {
        float: left;
    }

    .categoryList {
        position: relative;
        width: 110px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        margin-right: 24px;
        cursor: pointer;
    }

    .categoryList div:nth-child(1) {
        min-width: 100px;
        max-width: 140px;
        height: 32px;
        padding-left: 10px;
        padding-right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .categoryList div:nth-child(1) img {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 10px;
        right: 5px;
    }

    .categoryList div:nth-child(2) {
        width: 110px;
        max-height: 160px;
        overflow: auto;
        z-index: 1000;
        background: white;
        border: 1px solid #d1d1d1;
        position: absolute;
        top: 32px;
        left: 0;
    }

    .categoryList div:nth-child(2) li {
        width: 108px;
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        /* color: #d1d1d1; */
    }

    .categoryList div:nth-child(2) li:hover {
        background: #fe5371;
        color: #d1d1d1;
    }

    .seekText div {
        float: left;
        margin: 24px 24px 0 0;
        margin: 0 24px 0 0;
    }

    .seekText div:nth-child(2) {
        width: 60px;
        height: 30px;
        line-height: 30px;
        background: #fe5371;
        color: white;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }

    textarea {
        width: 590px;
        height: 240px;
        resize: none;
    }

    .skipType>div:nth-child(2) ul {
        display: flex;
    }

    .skipType>div:nth-child(2) li {
        padding-right: 24px;
    }

    input[type="text"] {
        height: 32px;
        width: 160px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
        padding-left: 5px;
        line-height: 32px;
    }

    .grayfont {
        color: #8f8e94;
        margin-left: 12px;
    }

    .redfont {
        color: #dc322b;
        margin-left: 12px;
    }

    .commodity {
        width: 530px;
        height: 400px;
        border: 1px solid #d1d1d1;
        border-radius: 5px;
        overflow: auto;
    }

    .allSelect {
        width: 60px;
        margin: 12px;
        cursor: pointer;
    }

    .allSelect span {
        font-size: 14px;
        font-weight: bold;
    }

    .allSelect>div {
        float: left;
        margin-right: 8px;
    }

    .allSelect>div:nth-child(1) {
        width: 18px;
        height: 18px;
    }

    .allSelect>div:nth-child(1) img {
        width: 18px;
        height: 18px;
    }

    .allSelectSon {
        width: 17px;
        height: 17px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
    }

    .allSelect:hover>.allSelectSon {
        border: 1px solid #5acdfa;
        border-radius: 3px;
    }

    .commodity li {
        width: 510px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #303030;
        cursor: pointer;
    }

    .commodity li div {
        padding-left: 16px;
        height: 35px;
        border-bottom: 1px solid white;
    }

    .redback {
        background-color: rgba(254, 83, 113, 0.08);
    }

    .checkboxs {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        cursor: pointer;
    }

    .checkboxsOne {
        width: 18px;
        height: 18px;
        border: 1px solid #fe5371;
        background: #fe5371;
        border-radius: 4px;
        margin-right: 8px;
        position: relative;
    }

    .checkboxsOne div {
        position: absolute;
        top: 0px;
        left: 5px;
        transform: rotate(45deg);
        width: 7px;
        height: 12px;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
    }

    .checkboxsTwo {
        width: 18px;
        height: 18px;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        margin-right: 8px;
    }

    .checkboxs:hover>.checkboxsTwo {
        border: 1px solid rgba(38, 121, 216, 0.924);
    }
</style>