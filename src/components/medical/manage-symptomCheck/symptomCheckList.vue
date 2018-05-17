<!--医疗模块-症状自查列表-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="symptomCheck">
        <div>
            <div class="listTitle">
                <div>
                    <img src="/static/img/返回蓝.jpg" @click="backClick">
                    <span>{{symptomCheck}}</span>
                    <span>/症状列表</span>
                </div>
                <div @click="addClick">
                    新增症状
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <ul>
                    <li class="firstLi">
                        <div>
                            主症状
                        </div>
                        <div>
                            对应疾病
                        </div>
                        <div>
                            性别
                        </div>
                        <div>
                            伴随症状
                        </div>
                        <div>
                            操作
                        </div>
                    </li>
                    <li class="dataLi" v-for="(item,index) in dataList" :key="index">
                        <div class="symptomName">
                            {{item.symptomName | strFun}}
                        </div>
                        <div>
                            <span v-for="(diseaseItem,diseaseIndex) in item.diseaseRelationList" :key="diseaseIndex">{{diseaseItem.diseaseName | strFun}}</span>
                        </div>
                        <div>
                            {{item.gender |  genderFun}}
                        </div>
                        <div>
                            <span v-for="(symptomItem,symptomIndex) in item.subSymptomRelationList" :key="symptomIndex">{{symptomItem.value | strFun}}</span>
                        </div>
                        <div class="operate">
                            <div>
                                <img @click="updateClick(index)" src="/static/img/编辑.png">
                            </div>
                            <div>
                                <img @click="deleteClick(index)" src="/static/img/删除.png">
                            </div>
                        </div>
                    </li>
                </ul>
                    <!-- 获取不到数据时 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>      
                
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="butdelClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import hosdel from "../../cModule/cancelBox";//引入组件
    export default {
        components: {
            "v-hosdel": hosdel//注册组件
        },
        data() {
            return {
                butdelClickTrueOrFalse: true,
                symptomCheck: "", //标题 身体部位
                dataList: [],//症状列表
                diseaseList:[],//对应疾病列表
                isdelPopup: true,//控制删除弹出框样式
                isShowdel: true,//控制删除弹出框显示/隐藏
                delShow: false,//控制删除弹出框显示/隐藏
                titlename: "确定要删除该条数据吗？", // 删除弹窗标题
                delIndex: "", //删除index
                symptomId: "" //身体部位id
            };
        },
        // 过滤
        filters: {
            strFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '无'
                }
            },
             genderFun: function (val) {
                if (val == 'ALL') {
                    return "全部"
                } else if (val == 'MAN') {
                    return "男士"
                } else {
                    return "女士"
                }
            }
        },
        // 模块新建时
        created: function () {
            var self = this;
            //权限管理
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
                if (arrs.indexOf("symptomCheck") == -1) {
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
                    self.editsymptomData = JSON.parse(sessionStorage.symptomData);
                    self.symptomId = self.editsymptomData.key;
                    self.symptomCheck = self.editsymptomData.value;
                    this.getsymptomFun();
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
        // 事件处理
        methods: {
            //根据部位id查询症状列表症状列表
            getsymptomFun() {
                var self = this;
                self.getMedicalsymptomPositionselectSymptomByPositionId({
                    positionId: self.symptomId, 
                    type: 'SEE_SYMPTOM',   
                }).then(data => {
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.length == 0) {
                                self.dataList = [];
                            } else {
                                self.dataList = data.data;
                            }
                        } else {
                            self.dataList = [];
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
            },
            //返回人体部位
            backClick() {
                this.$router.push({
                    path: "/medical/symptomCheck"
                });
            },
            // 删除
            deleteClick(index) {
                this.isShowdel = false;
                this.delShow = true;
                this.delIndex = this.dataList[index].symptomId;
            },
            // 确认删除框
            butdelClick() {
                var self = this;
                if (self.butdelClickTrueOrFalse == true) {
                    self.butdelClickTrueOrFalse = false
                    self.getMedicalsymptomPositiondelete({
                        id: self.delIndex
                    }).then(data => {
                        self.butdelClickTrueOrFalse = true
                        if (data.code == 200) {
                            self.$message({
                                type:'success',
                                message:'删除成功!'
                            })
                            self.isShowdel = true;
                            self.delShow = false;
                            self.getsymptomFun();        
                        } else {
                            self.$message({
                                type: "info",
                                message: data.message
                            });
                        }
                    }).catch(msg => {
                        self.butdelClickTrueOrFalse = true
                        self.$message({
                            type: "info",
                            message: "服务器异常"
                        });
                    });    
                }
                           
            },
            // 取消删除框
            canleClick() {
                this.isShowdel = true;
                this.delShow = false;
            },
            //新增疾病
            addClick() {
                this.$router.push({
                    path: "/medical/addSymptomCheck",
                });
            },
            // 编辑
            updateClick(index) {
                var self = this;
                let addsymptomcheckdata = JSON.stringify(self.dataList[index]);
                sessionStorage.setItem("addsymptomcheckdata", addsymptomcheckdata);
                this.$router.push({
                    path: "/medical/addSymptomCheck",
                    query: {operation: 1, id: self.dataList[index].symptomId}
                });
            },
            ...mapActions(["getMedicalsymptomPositionselectSymptomByPositionId","getMedicalsymptomPositiondelete"])
        },
        watch: {}
    };
</script>
<style scoped>
    /*删除弹出框*/

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

    /*主页*/

    .symptomCheck {
        width: 100%;
        height: 100%;
    }

    .symptomCheck > div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .list {
        min-height: 540px;
    }

    .list>div {
        margin: 0 auto;
        width: 650px;
    }

    .listTitle {
        height: 58px;
        line-height: 58px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .listTitle>div:nth-child(1) {
        float: left;
        color: #303030;
        font-size: 16px;
        display: flex;
        align-items: center;
    }

    .listTitle>div:nth-child(1) img {
        margin-right: 5px;
        cursor: pointer;
    }

    .listTitle>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        border: 1px solid #fff;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #5acdfa;
        cursor: pointer;
        border: 1px solid #5acdfa;
    }

    .list ul {
        border: 1px solid #ececec;
        border-bottom: none;
        width: 100%;
        margin-top: 20px;
    }

    .list li {
        display: flex;
    }

    .list li>div {
        text-align: center;
        line-height: 55px;
        border-right: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        overflow: hidden;
        text-overflow: ellipsis;
         white-space: nowrap;
    }

    .dataLi li>div {
        line-height: 49px !important;
    }

    .dataLi span {
        margin-left: 10px;
    }

    .list li>div:nth-child(1) {
        width: 15%;
    }

    .list li>div:nth-child(2) {
        width: 15%;
    }
    .list li>div:nth-child(3) {
        width: 20%;
    }

    .list li>div:nth-child(4) {
        width: 25%;
    }

    .list li>div:nth-child(5) {
        display: flex;
        align-content: center;
        justify-content: center;
        width: 25%;
    }

    .firstLi {
        color: #303030;
        font-size: 16px;
        font-weight: bold;
        height: 55px;
        line-height: 55px;
        background: #f2f4f8;
    }

    .dataLi {
        color: #303030;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
    }

    .operate div:nth-child(1) {
        cursor: pointer;
        margin-right: 10px;
    }

    .operate div:nth-child(2) {
        cursor: pointer;
        margin-left: 10px;
    }

    .symptomName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 7px;
    }

    /* 获取不到数据 */
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
</style>