<!--新增关联-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <div class="title">
            <div class="backImg" @click="backClick"></div>
            新增关联
        </div>
        <div class="content">
            <div class="foodTarget">
                <div>
                    指标：
                </div>
                <div>
                    <select @change="selecTargetNameChange" v-model="targetVal" id="targetName">
                        <option v-for="(items,index) in targetLists" :key="items.name" :value="items.name">{{items.name}}</option>
                    </select>
                </div>
                <div>

                    <select @change="selectLevelChange" v-model="levelVal" id="targetName">
                        <option v-for="(items,index) in levelLists" :key="index" :value="items.id">{{items.name}}</option>
                    </select>
                </div>
            </div>
            <div class="suggestRecipes">
                <div class="suggestRecipesContent">
                    <div class="suggestRecipesContentMain">
                        <div>
                            <div class="suggestRecipesTop">建议食谱：</div>
                            <div class="selectAMeal">
                                <select @change='selectedAMealChange' v-model="aMealVal">
                                    <option v-for="(type,index) in mealLists" :key="index" :value="type.id">{{type.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>  
                                <p>可选食谱</p>
                                <div class="foodListBox">
                                    <ul>
                                        <li @click="selectLeftClick(index)" :key="index" v-for="(item,index) in selectLeftLists" :class="{optionli:isoptionli,bgcolor:item.checked}">
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
                                        <li @click="selectRightClick(index)" :key="index" v-for="(item,index) in selectRightLists" :class="{optionli:isoptionli,bgcolor:!item.checked}">
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
                <div @click='addClick'>保存</div>
                <div @click='backClick'>取消</div>
            </div>
        </div>
        <!--提示信息弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdels @canle="canleClick" @ok="okClick" :name="nametitle"></v-hosdels>
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
                levelLists: [
                    { name: "请选择", id: "0" },
                    { name: "偏高", id: "1" },
                    { name: "偏低", id: "-1" }
                ],
                checked: false,
                targetVal: "请选择指标", //指标name
                selectfl: "",   //指标code
                selectOp: "请选择",
                targetLists: [{ name: "请选择指标", code: "" }],
                // 选择时段
                aMealVal: "0",  //建议食谱
                mealLists: [
                    { name: "请选择", id: "0" },
                    { name: "早餐", id: "1" },
                    { name: "午餐", id: "2" },
                    { name: "晚餐", id: "3" },
                    { name: "加餐", id: "4" }
                ], //建议食谱
                selectLeftLists: [],//可选食谱
                selectoptionareas: [],
                selectRightLists: [], //已选食谱
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
            self.getIndexQuery({
            }).then(data => {
                if (data.code == 200) {
                    self.query = data.data;
                    let targetArr = [];
                    for (var i = 0; i < self.query.length; i++) {
                        targetArr.unshift({
                            code: self.query[i].code,
                            name: self.query[i].name
                        });
                    }
                    self.targetLists = targetArr;
                    self.targetLists.splice(0, 0, { code: "", name: "请选择指标" });
                } else {
                    self.$message({
                        type: "info",
                        message: data.message
                    });
                }
            }).catch(msg => {
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
                }
            } else {
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
        beforeRouteLeave(to, from, next) {
            this.toPath = to.path;
            if (this.intercept == false) {
                this.isShowdel = false;
                this.delShow = true;
            } else if (this.intercept == true) {
                this.isShowdel = true;
                this.delShow = false;
                next();
            }
        },
        // 事件处理
        methods: {
            // 返回/取消
            backClick() {
                this.$router.push({
                    path: "associatedSymptoms"
                });
            },
            // 消息框
            canleClick() {
                this.isShowdel = true;
                this.delShow = false;
            },
            // 拦截框 - 确定
            okClick() {
                this.intercept = true;
                var url = this.toPath;
                this.$router.push({
                    path: url
                });
            },
            // 分类选择
            selecTargetNameChange(sType) {
                var self = this
                for(var i = 0;i<self.targetLists.length;i++){
                    if(self.targetLists[i].name == self.targetVal){
                        self.selectfl = self.targetLists[i].code
                    }
                }
            },
            // 偏高/偏低
            selectLevelChange() {
            },
            // 保存
            addClick() {
                if (this.aMealVal == 0 || this.targetVal == "" || this.selectRightLists.length == 0 || this.levelVal == 0) {
                    if (this.selectRightLists.length == 0) {
                        this.$message("请选择食谱！");
                    }
                    if (this.aMealVal == 0) {
                        this.$message("请选择建议食谱！");
                    }
                    if (this.targetVal == "" || this.levelVal == 0) {
                        this.$message("请选择指标！");
                    }
                } else {
                    let self = this;
                    this.intercept = true;
                    let nameArr = [];
                    nameArr.push(this.targetVal)
                    let selectedRecipe = [];
                    let selectedRecipeId = [];

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
                    self.getAddAssociatedSymptoms({
                        typeJson: JSON.stringify([self.aMealVal]),
                        dictionaryCodeJson: JSON.stringify([self.selectfl]),
                        statusJson: JSON.stringify([self.levelVal]),
                        dictionaryNameJson: JSON.stringify(nameArr),
                        suggestRecipesJson: JSON.stringify([self.c]),
                        suggestNameJson: JSON.stringify([self.d])
                    }).then(data => {
                        if (data.code == 200) {
                            this.$message({
                                message: "保存成功",
                                type: "success"
                            });
                            sessionStorage.removeItem("associatedPag");
                            this.$router.push({
                                path: "associatedSymptoms"
                            });
                        } else {
                            this.$message({
                                message: data.message
                            });
                        }
                    }).catch(msg => {
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
                self.getfindRecipesByType({
                    token: sessionStorage.token
                }).then(data => {
                    if (data.code == 200) {
                        self.selectLeftLists = []
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
                        } else if (self.aMealVal == 2) {
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
                        } else if (self.aMealVal == 3) {
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
                        } else if (self.aMealVal == 4) {
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
                        }
                    } else {
                        self.$message({
                            type: "info",
                            message: data.message
                        });
                    }
                }).catch(msg => {
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
                for (var i = 0; i < this.selectLeftLists.length; i++) {
                    if (this.selectLeftLists[i].checked == true) {
                        this.selectoptionareas.push(this.selectLeftLists[i]);
                        this.toDeleteIndexes.push(i);
                    }
                }
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
                    this.flag_1 = false;
                } else {
                    return;
                }
            },
            leftArrowClick() {
                if (this.flag_2 == true) {
                    this.toDeleteIndexes_1.sort(this.descOrder); //按大到小排列
                    for (var i = 0; i < this.toDeleteIndexes_1.length; i++) {
                        this.selectRightLists.splice(this.toDeleteIndexes_1[i], 1);
                    }
                    this.selectLeftLists = this.selectLeftLists.concat(this.selectgoodsareas);
                    this.flag_2 = false;
                } else {
                    return;
                }
            },
            ...mapActions([
                "getIndexQuery",
                "getAddAssociatedSymptoms",
                "getfindRecipesByType",
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


    .foodTarget {
        width: 100%;
        margin-top: 24px;
        display: flex;
        align-items: center;
        margin-left: 120px;
    }

    .foodTarget div:nth-child(1){
        font-size: 15px!important;
        color: #333;
    }

    .foodTarget select {
        width: 178px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
        text-align: center;
        padding-left: 12px;
        color: #97969B;
    }

    .selectAMeal {
        margin-left: 122px;
        margin-top: 24px;
    }

    .selectAMeal select {
        width: 178px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
        text-align: center;
        padding-left: 12px;
        margin-left: -116px;
        color: #97969B;
    }

    #targetName {
        margin-right: 20px;
        margin-left: 6px;
    }

    .suggestRecipes {
        width: 100%;
        margin-top: 24px;
        overflow: hidden;
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