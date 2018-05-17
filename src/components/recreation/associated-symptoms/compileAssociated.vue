<!--修改关联-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <div class="title">
            <div class="backImg" @click="backClick"></div>
            编辑关联
        </div>
        <div class="content">
            <div>
                <div class="itemContent">指标：
                    <v-select class='selectOne' width="178" :selects="selectfl" :list="targetLists" @select="targetSelect"></v-select>
                    <select v-model="levelVal" id="levelVal">
                        <option>偏低</option>
                        <option>偏高</option>
                    </select>
                </div>
            </div>
            <div class="suggestRecipes">
                <div class="suggestRecipesContent">
                    <div class="suggestRecipesContentMain">
                        <div>
                            <div class="suggestRecipesTop">建议食谱：</div>
                            <div class="itemContent">
                                <select @change='selectedAMealChange' v-model="aMealVal">
                                    <option v-for="(type,index) in mealLists" :value="type.id" :key="index">{{type.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>可选食谱</p>
                                <div class="foodListBox">
                                    <ul>
                                        <li @click="selectLeftClick(index)" v-for="(item,index) in selectLeftLists" :class="{optionli:isoptionli,bgcolor:item.checked}" :key="index">
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div style="margin:0 40px;margin-top:154px;">
                                <div class="rightArrow" @click="rightArrowClick"></div>
                                <div class="leftArrow" @click="leftArrowClick"></div>
                            </div>
                            <div>
                                <p>已选食谱</p>
                                <div class="foodListBox">
                                    <ul>
                                        <li @click="selectRightClick(index)" v-for="(item,index) in selectRightLists" :class="{optionli:isoptionli,bgcolor:!item.checked}" :key="index">
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="button">
                <div @click='updateClick'>保存</div>
                <div @click='backClick'>取消</div>
            </div>
        </div>
        <!--提示信息弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdels @canle="canleClick" @ok="okclick" :name="nametitle"></v-hosdels>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import select from "../../cModule/foodSelect";
    import intercept from "../../cModule/intercept";
    export default {
        components: {
            "v-select": select,
            "v-hosdels": intercept
        },
        data() {
            return {
                levelVal: 0,
                checked: false,
                selectfl: "",
                targetLists: [],
                // 选择时段
                aMealVal: "0",
                mealLists: [
                    // { name: "请选择", id: "0" },
                    { name: "早餐", id: "1" },
                    { name: "午餐", id: "2" },
                    { name: "晚餐", id: "3" },
                    { name: "加餐", id: "4" }
                ],
                selectLeftLists: [],
                selectoptionareas: [],
                selectRightLists: [],
                isbgcolor: false,
                isoptionli: true,
                toDeleteIndexes: [],
                toDeleteIndexes_1: [],
                selectgoodsareas: [],
                flag_1: false,
                flag_2: false,
                isShowdel: true,
                topath: "",
                delShow: false,
                nametitle: "劳动成果还未保存，确定退出？",
                intercept: false,
                isdelPopup: true
            };
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            let self = this;
            self.token = sessionStorage.token;
            self.edata = JSON.parse(sessionStorage.edata);
            // console.log(self.edata)
            self.id = self.edata.id;
            self.selectediscretions = self.edata.status.split(",");
            self.levelVal = self.selectediscretions[0];
            self.selectaf = self.edata.type;
            self.aMealVal = self.selectaf;
            // console.log(self.aMealVal)
            if (self.aMealVal == "早餐") {
                self.aMealVal = 1;
            }
            if (self.aMealVal == "中餐") {
                self.aMealVal = 2;
            }
            if (self.aMealVal == "晚餐") {
                self.aMealVal = 3;
            }
            if (self.aMealVal == "加餐") {
                self.aMealVal = 4;
            }
            self.getfindRecipesByType({
                    token: self.token
            })
                .then(data => {
                    if (data.code == 200) {
                        if (self.aMealVal == 1) {
                            self.optionarea = data.data[1];
                            let choosable = [];
                            let choosableId = [];
                            for (var i = 0; i < self.optionarea.length; i++) {
                                choosable.push({
                                    key: self.optionarea[i].key,
                                    value: self.optionarea[i].value,
                                    checked: false
                                });
                            }
                            let sugName = self.edata.suggestName.split(",");
                            let suG = self.edata.suggestRecipes.split(",");
                            let sugA = [];
                            for (var i = 0; i < suG.length; i++) {
                                sugA.push({ key: suG[i], value: sugName[i], checked: true });
                            }
                            self.selectRightLists = sugA;
                            // console.log(self.selectRightLists)
                            for (var j = 0; j < choosable.length; j++) {
                                for (var m = 0; m < self.selectRightLists.length; m++) {
                                    if (choosable[j].value == self.selectRightLists[m].value) {
                                        choosable.splice(j, 1);
                                    }
                                }
                            }
                            self.selectLeftLists = choosable;
                        }
                        if (self.aMealVal == 2) {
                            self.optionarea = data.data[2];
                            let choosable = [];
                            let choosableId = [];
                            for (var i = 0; i < self.optionarea.length; i++) {
                                choosable.push({
                                    key: self.optionarea[i].key,
                                    value: self.optionarea[i].value,
                                    checked: false
                                });
                            }
                            let sugName = self.edata.suggestName.split(",");
                            let suG = self.edata.suggestRecipes.split(",");
                            let sugA = [];
                            for (var i = 0; i < suG.length; i++) {
                                sugA.push({ key: suG[i], value: sugName[i], checked: true });
                            }
                            self.selectRightLists = sugA;
                            // console.log(self.selectRightLists)
                            for (var j = 0; j < choosable.length; j++) {
                                for (var m = 0; m < self.selectRightLists.length; m++) {
                                    if (choosable[j].value == self.selectRightLists[m].value) {
                                        choosable.splice(j, 1);
                                    }
                                }
                            }
                            self.selectLeftLists = choosable;
                        }
                        if (self.aMealVal == 3) {
                            self.optionarea = data.data[3];
                            let choosable = [];
                            let choosableId = [];
                            for (var i = 0; i < self.optionarea.length; i++) {
                                choosable.push({
                                    key: self.optionarea[i].key,
                                    value: self.optionarea[i].value,
                                    checked: false
                                });
                            }
                            let sugName = self.edata.suggestName.split(",");
                            let suG = self.edata.suggestRecipes.split(",");
                            let sugA = [];
                            for (var i = 0; i < suG.length; i++) {
                                sugA.push({ key: suG[i], value: sugName[i], checked: true });
                            }
                            self.selectRightLists = sugA;
                            // console.log(self.selectRightLists)
                            for (var j = 0; j < choosable.length; j++) {
                                for (var m = 0; m < self.selectRightLists.length; m++) {
                                    if (choosable[j].value == self.selectRightLists[m].value) {
                                        choosable.splice(j, 1);
                                    }
                                }
                            }
                            self.selectLeftLists = choosable;
                        }
                        if (self.aMealVal == 4) {
                            self.optionarea = data.data[4];
                            let choosable = [];
                            let choosableId = [];
                            for (var i = 0; i < self.optionarea.length; i++) {
                                choosable.push({
                                    key: self.optionarea[i].key,
                                    value: self.optionarea[i].value,
                                    checked: false
                                });
                            }
                            let sugName = self.edata.suggestName.split(",");
                            let suG = self.edata.suggestRecipes.split(",");
                            let sugA = [];
                            for (var i = 0; i < suG.length; i++) {
                                sugA.push({ key: suG[i], value: sugName[i], checked: true });
                            }
                            self.selectRightLists = sugA;
                            // console.log(self.selectRightLists)
                            for (var j = 0; j < choosable.length; j++) {
                                for (var m = 0; m < self.selectRightLists.length; m++) {
                                    if (choosable[j].value == self.selectRightLists[m].value) {
                                        choosable.splice(j, 1);
                                    }
                                }
                            }
                            self.selectLeftLists = choosable;
                        }
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
                });

            self.selectfl = self.edata.dictionaryCode;
            self
                .getIndexQuery({})
                .then(data => {
                    if (data.code == 200) {
                        self.query = data.data;
                        // console.log(self.query)
                        let targetArr = [];
                        let targetArr1;
                        let targetArr2 = [];
                        let targetArr3;
                        let targetArr4 = [];
                        for (var i = 0; i < self.query.length; i++) {
                            targetArr.unshift({
                                code: self.query[i].code,
                                name: self.query[i].name
                            });
                        }
                        self.targetLists = targetArr;
                        // self.targetLists.splice(0, 0, { code: "", name: "请选择指标" });
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
                });
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");

            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "饮食管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("associatedSymptoms") == -1) {
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
        beforeRouteLeave(to, from, next) {
            this.toPath = to.path;
            if (this.intercept == false) {
                this.isShowdel = false;
                this.delShow = true;
                // this.istipMsg = true
            } else if (this.intercept == true) {
                // this.istipMsg = false
                this.isShowdel = true;
                this.delShow = false;
                next();
            }
        },
        // 事件处理
        methods: {
            backClick() {
                this.$router.push({
                    path: "associatedSymptoms"
                });
            },
            //      	消息框
            canleClick() {
                this.isShowdel = true;
                this.delShow = false;
            },
            okclick() {
                this.intercept = true;
                var url = this.toPath;
                this.$router.push({
                    path: url
                });
            },
            // 分类选择
            targetSelect(sType) {
                this.selectfl = sType;
                console.log(this.selectfl)
            },
            discretionClick() { },
          
            //保存
            updateClick() {
                if (this.selectRightLists.length == 0) {
                    this.$message("请选择食谱！");
                } else {
                    let self = this;
                    this.intercept = true;
                    let nameArr = [];
                    let selectedRecipe = [];
                    let selectedRecipeId = [];
                    for (var i = 0; i < self.targetLists.length; i++) {
                        if (self.selectfl == self.targetLists[i].code) {
                            nameArr.push(self.targetLists[i].name);
                            self.b = nameArr.join(",");
                        }
                    }
                    for (var i = 0; i < self.selectRightLists.length; i++) {
                        selectedRecipe.push(self.selectRightLists[i].value);
                        selectedRecipeId.push(self.selectRightLists[i].key);
                        self.c = selectedRecipeId.join(",");
                        self.d = selectedRecipe.join(",");
                    }
                    if (self.aMealVal == 1) {
                        self.aMealVal = "1";
                    }
                    if (self.aMealVal == 2) {
                        self.aMealVal = "2";
                    }
                    if (self.aMealVal == 3) {
                        self.aMealVal = "3";
                    }
                    if (self.aMealVal == 4) {
                        self.aMealVal = "4";
                    }
                    if (self.levelVal == "偏高") {
                        self.levelVal = 1;
                    }
                    if (self.levelVal == "偏低") {
                        self.levelVal = -1;
                    }
                    self
                        .getAmendAssociatedSymptoms({
                            id: self.id,
                            type: self.aMealVal,
                            dictionaryCode: self.selectfl,
                            status: self.levelVal,
                            dictionaryName: self.b,
                            suggestRecipes: self.c,
                            suggestName: self.d
                        })
                        .then(data => {
                            if (data.code == 200) {
                                this.$message({
                                    message: "保存成功",
                                    type: "success"
                                });
                                this.$router.push({
                                    path: "associatedSymptoms"
                                });
                            } else {
                                this.$message({
                                    message: data.message
                                });
                            }
                        })
                        .catch(msg => {
                            self.$message({
                                type: "info",
                                message: "服务器异常"
                            });
                        });
                }
            },
            // ========================选择食谱==========================
            selectedAMealChange() {
                let self = this;
                self
                    .getfindRecipesByType({
                        token: self.token
                    })
                    .then(data => {
                        if (data.code == 200) {
                            if (self.aMealVal == 1) {
                                self.optionarea = data.data[1];
                                let choosable = [];
                                let choosableId = [];
                                for (var i = 0; i < self.optionarea.length; i++) {
                                    choosable.push({
                                        key: self.optionarea[i].key,
                                        value: self.optionarea[i].value,
                                        checked: false
                                    });
                                }
                                self.selectLeftLists = choosable;
                                // console.log(choosable, choosableId)
                            }
                            if (self.aMealVal == 2) {
                                self.optionarea = data.data[2];
                                let choosable = [];
                                let choosableId = [];
                                for (var i = 0; i < self.optionarea.length; i++) {
                                    choosable.push({
                                        key: self.optionarea[i].key,
                                        value: self.optionarea[i].value,
                                        checked: false
                                    });
                                }
                                self.selectLeftLists = choosable;
                                // console.log(choosable, choosableId)
                            }
                            if (self.aMealVal == 3) {
                                self.optionarea = data.data[3];
                                let choosable = [];
                                let choosableId = [];
                                for (var i = 0; i < self.optionarea.length; i++) {
                                    choosable.push({
                                        key: self.optionarea[i].key,
                                        value: self.optionarea[i].value,
                                        checked: false
                                    });
                                }
                                self.selectLeftLists = choosable;
                                // console.log(choosable, choosableId)
                            }
                            if (self.aMealVal == 4) {
                                self.optionarea = data.data[4];
                                let choosable = [];
                                let choosableId = [];
                                for (var i = 0; i < self.optionarea.length; i++) {
                                    choosable.push({
                                        key: self.optionarea[i].key,
                                        value: self.optionarea[i].value,
                                        checked: false
                                    });
                                }
                                self.selectLeftLists = choosable;
                                // console.log(choosable, choosableId)
                            }
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
                    });
                self.selectRightLists = [];
            },
            selectLeftClick(index) {
                this.flag_1 = true;
                this.selectoptionareas = [];
                this.toDeleteIndexes = [];
                this.selectLeftLists[index].checked = !this.selectLeftLists[index].checked;
                // console.log(this.selectLeftLists)
                for (var i = 0; i < this.selectLeftLists.length; i++) {
                    if (this.selectLeftLists[i].checked == true) {
                        this.selectoptionareas.push(this.selectLeftLists[i]);
                        this.toDeleteIndexes.push(i);
                    }
                }
                // console.log(this.selectoptionareas)
            },
            selectRightClick(index) {
                this.flag_2 = true;
                this.selectgoodsareas = [];
                this.toDeleteIndexes_1 = [];
                this.selectRightLists[index].checked = !this.selectRightLists[index].checked;
                for (var i = 0; i < this.selectRightLists.length; i++) {
                    if (this.selectRightLists[i].checked == false) {
                        this.selectgoodsareas.push(this.selectRightLists[i]);
                        this.toDeleteIndexes_1.push(i);
                    }
                }
            },
            //倒序排序
            descOrder(x, y) {
                if (x > y) {
                    return -1;
                } else {
                    return 1;
                }
            },
            rightArrowClick() {
                if (this.flag_1 == true) {
                    this.toDeleteIndexes.sort(this.descOrder); //按大到小排列
                    for (var i = 0; i < this.toDeleteIndexes.length; i++) {
                        this.selectLeftLists.splice(this.toDeleteIndexes[i], 1);
                    }
                    this.selectRightLists = this.selectRightLists.concat(this.selectoptionareas);
                    // console.log(this.selectRightLists)
                    this.flag_1 = false;
                } else {
                    return;
                }
            },
            leftArrowClick() {
                if (this.flag_2 == true) {
                    this.toDeleteIndexes_1.sort(this.descOrder); //按大到小排列
                    // console.log(this.toDeleteIndexes_1, '22222')
                    for (var i = 0; i < this.toDeleteIndexes_1.length; i++) {
                        this.selectRightLists.splice(this.toDeleteIndexes_1[i], 1);
                    }
                    this.selectLeftLists = this.selectLeftLists.concat(this.selectgoodsareas);
                    // console.log(this.selectRightLists)
                    this.flag_2 = false;
                } else {
                    return;
                }
            },
            ...mapActions([
                "getIndexQuery",
                "getAmendAssociatedSymptoms",
                "getfindRecipesByType",
                "getListResRole"
            ])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .title {
        color: #303030;
        font-size: 16px;
        width: auto;
        height: 56px;
        border-bottom: 1px solid #d1d1d1;
        line-height: 56px;
        padding-left: 1px;
        margin-right: 36px;
        margin-left: 36px;
        font-weight: 600;
        padding-top: 8px;
    }

    .backImg {
        width: 20px;
        height: 20px;
        background: url(../../../../static/img/精灵.png) no-repeat;
        background-position: 41.7% 50%;
        float: left;
        margin-top: 17px;
        margin-right: 8px;
        cursor: pointer;
    }

    .content {
        width: 100%;
        margin-top: 24px;
    }

    .dietName {
        width: 100%;
        margin-left: 108px;
    }

    .dietName input {
        border: 1px solid #8f8e94;
        border-radius: 4px;
        width: 176px;
        height: 30px;
        text-align: center;
        margin-left: 6px;
    }

    .proofRule {
        margin-left: 24px;
        color: #8f8e94;
        font-size: 14px;
    }

    .content > div:nth-child(1) {
        width: 100%;
    }

    .itemContent {
        margin-left: 122px;
        margin-top: 24px;
    }

    .itemContent select {
        width: 178px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
        text-align: center;
        padding-left: 12px;
        margin-left: -116px;
        color: #97969B;
    }

    #disselected {
        margin-left: 20px;
    }

    .selectOne {
        display: inline;
        margin-left: 2px;
    }

    .select2 {
        display: inline;
        margin-left: 24px;
    }

    .addFood {
        width: 100%;
        margin-top: 24px;
        overflow: hidden;
    }

    .plusSign {
        float: left;
        width: 20px;
        height: 20px;
        background: url(../../../../static/img/elf.png) no-repeat;
        background-position: 74.8% 70%;
        margin-left: 184px;
        border: 1px solid #fe5371;
        border-radius: 50%;
        cursor: pointer;
    }

    .addFoodChars {
        float: left;
        margin-left: 10px;
    }

    .suggestRecipes {
        width: 100%;
        margin-top: 24px;
        overflow: hidden;
    }

    .symptomsName {
        float: left;
        margin-left: 108px;
    }

    .diseaseName {
        margin-left: 8px;
    }

    .timeFrame {
        width: 100%;
        margin-left: 137px;
        margin-top: 12px;
    }

    .button {
        float: left;
        margin-top: 40px;
        width: 100%;
    }

    .button > div {
        float: left;
        width: 68px;
        height: 30px;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        margin: auto auto;
    }

    .button > div:nth-child(2) {
        background-color: #d1d1d1;
        margin-left: 48px;
    }

    .button > div:nth-child(1) {
        background-color: #ff6339;
        margin-left: 25%;
    }

    .suggestRecipesContent .suggestRecipesContentMain>div {
        display: flex;
    }

    .suggestRecipesContentMain {
        margin-left: 170px;
    }

    .foodListBox {
        width: 200px;
        height: 320px;
        border: 1px solid #d1d1d1;
        overflow-y: auto;
    }

    .suggestRecipesContent .suggestRecipesContentMain>div:nth-child(2) p {
        margin-top: 24px;
        font-size: 16px;
        text-align: center;
    }

    .rightArrow {
        width: 19px;
        height: 30px;
        background: url("/static/img/elf.png") no-repeat 50.8% 72%;
    }

    .leftArrow {
        width: 19px;
        height: 30px;
        background: url("/static/img/elf.png") no-repeat 53.4% 72%;
        margin-top: 40px;
    }

    .optionli {
        height: 35px;
        line-height: 35px;
        text-align: center;
    }

    .optionli:hover {
        background: #fff1f3;
    }

    .bgcolor {
        background: #fff1f3;
    }

    .foodListBox ul li {
        width: 100%;
        text-align: center;
    }

    .suggestRecipesTop {
        width: auto;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border-radius: 3px;
        color: #000;
        margin-left: -76px;
        margin-top: 24px;
    }

    #levelVal {
        margin-left: 50px;
    }

    /*消息框*/

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
</style>