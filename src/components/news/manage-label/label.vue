<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="tag">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    兴趣管理
                </div>
                <div @click="addTagsClick">
                    新增兴趣
                </div>
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div>
                    <select v-model="classifyVal">
                        <option v-for="(type,index) in classifyList" :value="type.id">{{type.name}}</option>
                    </select>
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按兴趣搜索" v-model="labelVal">
                </div>
                <div class="searBut">
                    <div @click="okSearchClick">
                        确定
                    </div>
                    <div @click="resetClick">
                        重置
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="list">
                <ul class="listContent">
                    <li class="listContentTop">
                        <div>
                            <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                            <span>序号</span>
                        </div>
                        <div>
                            兴趣
                        </div>
                        <div>
                            分类
                        </div>
                        <div>
                            使用次数
                        </div>
                        <div>
                            操作
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                    <li class="dataLi" v-for="(item,index) in dataList">
                        <div>
                            <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="item" :key="item.articleId">{{index + 1}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div>
                            {{item.labelName}}
                        </div>
                        <div>
                            {{item.classifyName}}
                        </div>
                        <div>
                            {{item.useNumber}}
                        </div>
                        <div class="listBut">
                            <div>
                                <img @click="editTagsClick(index)" src="/static/img/编辑.png">
                            </div>
                            <div>
                                <img @click="recycleClick(index)" src="/static/img/删除.png">
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="dataList.length > 0">
                    <div class="batchCss">
                        <div class="batchBut" @click="batchClick">
                            批量删除
                        </div>
                    </div>
                    <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div class="delPopup" v-show="isShowdel">
            <transition name="slide-fade">
                <div class="delContent">
                    <news-Delete @ok="okClick" @canle="canleClick" :name="titlename"></news-Delete>
                </div>
            </transition>
        </div>
        <!--新增兴趣/修改兴趣弹出框-->
        <div class="ModalsBox" v-show="isModalsBox">
            <div class="Modals modalMain">
                <div class="modalTitle">{{tagtitle}}</div>
                <div class="modalContent">
                    <span>分类名称：</span>
                    <select v-model="classifyValAdd" :class="{redBorder:isclassifyValAddredBorder}">
                        <option v-for="(type,index) in classifyList" :value="type.id">{{type.name}}</option>
                    </select>
                </div>
                <div class="modalContent">
                    <span>兴趣名称：</span>
                    <input maxlength="5" :class="{redBorder:isredBorder}" type="text" v-model.trim="tagName">
                    <div class="modalContent-tips">
                        <span :class="{colorRed:iscolorRed}">最多输入5个字符(不支持特殊字符)</span>
                    </div>
                </div>

                <div class="btnBox">
                    <input type="button" value="确定" @click="addTagSureClick" v-show="tagtitle == '新增兴趣'">
                    <input type="button" value="确定" @click="editTagSureClick" v-show="tagtitle == '编辑兴趣'">
                    <input type="button" value="取消" @click="canleClick">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import newsDelete from "../../cModule/newsDelete";
    export default {
        components: {
            newsDelete
        },
        data() {
            return {
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [], //列表数组
                isShowdel: false, //删除弹框
                titlename: "该兴趣将被删除，该操作无法恢复", //删除弹框提示语
                delIndex: "", //删除index
                idstring: "", //序号
                idsArr: [], //多选，所有的id集合
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1,
                tagtitle: "新增兴趣", //新增兴趣弹框标题
                iscolorRed: false, //新增兴趣弹框内的input红字体
                isredBorder: false, //新增兴趣弹框内的input红边框
                tagName: "", //新增兴趣弹框内的input值
                isModalsBox: false, //新增兴趣弹框是否出现
                labelVal: "", //搜索的兴趣名称,
                okSearchShow: false, //判断是否点击了搜索的确定按钮
                classifyVal: "",//绑定的分类的id
                classifyList: [], //查询分类的数组
                classifyValAdd: '',//弹框中的分类
                isclassifyValAddredBorder: false,//弹框中的select框 border
            };
        },
        // 过滤
        filters: {},
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
                if (arrs.indexOf("label") == -1) {
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
                    this.getclassiflyList();
                    this.getLabelListsFun("");
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
            //获取分类列表
            getclassiflyList() {
                   this.checked = false
                this.checkList = []
                var self = this;
                self
                    .getclassiflyControlClassifyFindAll({
                        token: sessionStorage.getItem("token")
                    })
                    .then(data => {
                        self.classifyList = [
                            {
                                id: "",
                                name: "请选择分类"
                            }
                        ];
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.length > 0) {
                                    data.data.forEach(function (ele, ind) {
                                        self.classifyList.push({
                                            id: ele.id,
                                            name: ele.name
                                        });
                                    });
                                }
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });
            },
            // 获取兴趣列表
            getLabelListsFun(m) {
                var self = this;
                self.checkList = [];
                self
                    .getlabelControllerlistLabels({
                        classifyId: m == '' ? '' : self.classifyVal,
                        labelName: m == '' ? '' : self.labelVal,
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    })
                    .then(data => {
                        if (data.code == 200) {
                            self.dataList = data.data.records;
                            self.totalNum = data.data.total;
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器错误");
                    });
            },
            //筛选
            okSearchClick() {
                if (this.labelVal != '' || this.classifyVal != '') {
                    this.okSearchShow = true;
                    this.getLabelListsFun('1');
                }
            },
            //重置筛选
            resetClick() {
                this.labelVal = "";
                this.classifyVal = ''
                if (this.okSearchShow) {
                    this.okSearchShow = false;
                    this.getLabelListsFun("");
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;           
                if (this.okSearchShow == true) {
                    this.getLabelListsFun('1');
                } else {
                    this.getLabelListsFun("");
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;              
                if (this.okSearchShow == true) {
                    this.getLabelListsFun('1');
                } else {
                    this.getLabelListsFun("");
                }
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                this.idsArr = this.checkList.map(function (data) {
                    return data.labelId;
                });
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                this.idsArr = this.checkList.map(function (data) {
                    return data.labelId;
                });
            },
            //批量删除
            batchClick() {
                if (this.checkList.length > 0) {
                    this.isShowdel = true;
                } else {
                    this.$message("请选择要删除的兴趣");
                }
            },
            //删除
            recycleClick(index) {
                this.idsArr = [];
                this.isShowdel = true;
                this.idsArr.push(this.dataList[index].labelId);
            },
            //取消删除(取消所有弹框)
            canleClick() {
                this.isShowdel = false;
                this.isModalsBox = false;
            },
            //确定删除
            okClick() {
                var self = this;
                this.isShowdel = false;
                self
                    .getlabelControllerdeleteLabels({
                        labelIdJson: JSON.stringify(self.idsArr)
                    })
                    .then(data => {
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "删除成功"
                            });
                            if (self.okSearchShow == true) {
                                self.getLabelListsFun('1');
                            } else {
                                self.getLabelListsFun("");
                            }
                        } else {
                            self.$message(data.message);
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器错误");
                    });
            },
            // 点击新增兴趣按钮
            addTagsClick() {
                this.tagtitle = "新增兴趣";
                this.tagName = this.classifyValAdd = "";
                this.isModalsBox = true;
                this.iscolorRed = this.isredBorder = this.isclassifyValAddredBorder = false;
            },
            // 点击编辑兴趣按钮
            editTagsClick(index) {
                this.tagtitle = "编辑兴趣";
                this.isModalsBox = true;
                this.tagName = this.dataList[index].labelName;
                this.classifyValAdd = this.dataList[index].classifyId;
                this.delIndex = index;
            },
            // 兴趣验证规则
            validateFun() {
                var self = this;
                var reg_1 = /^[\s]*$/; //输入不能为空
                var reg_2 = new RegExp(
                    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
                );
                if (self.classifyValAdd == '') {
                    self.isclassifyValAddredBorder = true
                }
                if (reg_1.test(self.tagName)) {
                    self.iscolorRed = self.isredBorder = true;
                }
                if (self.isclassifyValAddredBorder == true || self.isredBorder == true) {
                    return false
                }
                if (reg_2.test(self.tagName)) {
                    self.iscolorRed = self.isredBorder = true;
                    return false;
                }
            },
            // 确定添加兴趣
            addTagSureClick() {
                var self = this;
                if (self.validateFun() == false) {
                    return;
                } else {
                    this.isModalsBox = false;
                    self
                        .getlabelControllersaveLabel({
                            labelName: self.tagName,
                            classifyId: self.classifyValAdd,
                        })
                        .then(data => {
                            if (data.code == 200) {
                                self.$message({
                                    type: "success",
                                    message: "添加兴趣成功"
                                });
                                self.getLabelListsFun("");
                            } else {
                                self.$message(data.message);
                            }
                        })
                        .catch(msg => {
                            self.$message("服务器错误");
                        });
                }
            },
            // 确定编辑兴趣
            editTagSureClick() {
                var self = this;
                if (self.validateFun() == false) {
                    return;
                } else {
                    this.isModalsBox = false;
                    self
                        .getlabelControllerupdateLabel({
                            labelName: self.tagName,
                            labelId: self.dataList[self.delIndex].labelId,
                            classifyId: self.classifyValAdd,
                        })
                        .then(data => {
                            if (data.code == 200) {
                                self.$message({
                                    type: "success",
                                    message: "修改兴趣成功"
                                });
                                if (self.okSearchShow == true) {
                                    self.getLabelListsFun('1');
                                } else {
                                    self.getLabelListsFun("");
                                }
                            } else {
                                self.$message(data.message);
                            }
                        })
                        .catch(msg => {
                            self.$message("服务器错误");
                        });
                }
            },
            ...mapActions([
                "getlabelControllerlistLabels",
                "getlabelControllersaveLabel",
                "getlabelControllerupdateLabel",
                "getlabelControllerdeleteLabels",
                'getclassiflyControlClassifyFindAll'
            ])
        },
        // 监视
        watch: {
            tagName: function (val) {
                this.iscolorRed = this.isredBorder = false;
            },
            classifyValAdd: function (val) {
                this.isclassifyValAddredBorder = false;
            },
        }
    };
</script>
<style scoped>
    .tag {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .tag>div:nth-child(1) {
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
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
    }

    .head>div:nth-child(1) {
        float: left;
        color: #303030;
        font-size: 16px;
        font-weight: 600;
        margin-top: 12px;
    }

    .head>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        margin-top: 14px;
        border: 1px solid #fe5371;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #fe5371;
        cursor: pointer;
    }

    .search {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    .search>div {
        margin-top: 10px;
        margin-right: 18px;
    }

    select {
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 85% 8px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
    }

    .search select {
        width: 180px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
    }

    .batchCss select {
        width: 100px;
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
    }

    .modalContent select {
        width: 160px;
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
        margin: 0 10px;
    }

    select::-ms-expand {
        display: none;
    }

    .searchBox {
        height: 32px;
        line-height: 32px;
        border: 1px solid #aeaeae;
        border-radius: 3px;
        padding-left: 8px;
        width: 180px;
    }

    .searchBox input {
        border: none;
        height: 26px;
        width: 80%;
    }

    .searchBox input::-webkit-input-placeholder {
        color: #aeaeae;
    }

    .searchBox input:-moz-input-placeholder {
        color: #aeaeae;
    }

    .searchBox input::-moz-input-placeholder {
        color: #aeaeae;
    }

    .searchBox input:-ms-input-placeholder {
        color: #aeaeae;
    }

    .list {
        min-height: 550px;
    }

    .list>div {
        margin: 0 auto;
    }

    .searBut {
        display: flex;
        width: 158px;
        justify-content: space-between;
        margin-right: 0 !important;
    }

    .searBut div {
        height: 32px;
        width: 70px;
        line-height: 32px;
        text-align: center;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }

    .searBut div:nth-child(1) {
        background: #fe5371;
    }

    .searBut div:nth-child(2) {
        background: #a3a3a3;
    }

    /*暂无数据*/

    .noList {
        height: 400px;
    }

    .noList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }

    /*列表*/

    .listContent {
        overflow: hidden;
    }

    .listContentTop {
        border-top: 1px solid #e5e7eb;
        font-size: 16px;
        font-weight: bold;
        background: #f2f4f8;
    }

    .listContent li {
        display: flex;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(1) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(2) {
        width: 20%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 20%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(4) {
        width: 20%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(5) {
        width: 30%;
        border-right: 1px solid #e5e7eb;
    }

    .greenFont {
        color: green;
        cursor: pointer;
    }

    .listContent li>div:nth-child(4) img {
        cursor: pointer;
    }

    .listContent li>div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .lastLi {
        height: 60px;
        display: flex;
        justify-content: space-between;
    }

    .batchCss {
        display: flex;
    }

    .batchBut {
        width: 70px;
        height: 32px;
        border-radius: 4px;
        margin-left: 16px;
        background: #fe5371;
        text-align: center;
        line-height: 32px;
        color: white;
        cursor: pointer;
    }

    .listBut {
        display: flex;
        justify-content: center;
    }

    .listBut div {
        height: 25px;
        width: 25px;
        margin: 0 8px;
        cursor: pointer;
    }

    /* 删除弹框 */

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
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 280px) / 2) auto;
        z-index: 100000;
    }

    /* 新增、编辑弹框 */

    .modalMain {
        height: 265px;
    }

    .modalTitle {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-weight: bold;
    }

    .modalContent {
        margin-top: 22px;
        margin-left: 96px;
        height: 32px;
        line-height: 30px;
    }

    .modalContent input {
        width: 160px;
        border: 1px solid #aeaeae;
        border-radius: 5px;
        /* text-align: center; */
        padding-left: 15px;
        margin: 0 10px;
    }

    .btnBox {
        margin-top: 39px;
        text-align: center;
    }

    .btnBox input {
        color: #fff;
        border: none;
        width: 68px;
        height: 30px;
        border-radius: 4px;
    }

    .btnBox input:nth-child(1) {
        background: #f84848;
        margin-right: 24px;
    }

    .btnBox input:nth-child(2) {
        background: #f84848;
        margin-right: 24px;
    }

    .btnBox input:nth-child(3) {
        background: #aeaeae;
        margin-left: 24px;
    }

    .colorRed {
        color: #fd5851;
    }

    .redBorder {
        border: 1px solid #fd5851 !important;
    }

    .modalContent-tips {
        margin: 2px 0;
        margin-left: 85px;
    }
</style>