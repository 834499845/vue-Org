<!--积分统计-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="pointStatistics">
        <div>
            <div class="listTitle">
                <div>
                    积分统计
                </div>
                <!-- <div @click="addCommClick">
                    
                </div> -->
            </div>
            <!-- 筛选 -->
            <div class="filtrate">            
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="输入手机号或真实姓名" v-model="searchWordVal" maxlength="11">
                </div>
                <div class="selectTime">
                    <div :class="{redBorder:isRedScoreStartVal,grayBorder:isGrayScoreStartVal}">
                        <input type="text" placeholder="最小积分" v-model="scoreStartVal" maxlength="8" >
                    </div>
                    <div>
                        至
                    </div>
                    <div  :class="{redBorder:isRedScoreEndVal,grayBorder:isGrayScoreEndVal}">
                        <input type="text" placeholder="最大积分" v-model="scoreEndVal" maxlength="8" >
                    </div>
                </div>
                <div class="filtrateOk interval" @click="searchClick">
                    确定
                </div>
                <div class="filtrateOk interval delfiltrateOk" @click="removeClick">
                    清除
                </div>               
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div>
                                <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                <span>序号</span>
                            </div>
                            <div>
                                真实姓名
                            </div>
                            <div>
                                手机号
                            </div>
                            <div>
                                当前积分
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <div class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </div>
                        <li class="dataLi" v-for="(item,index) in dataLists" :key="index">
                            <div>
                                <div>
                                    <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                        <el-checkbox :label="item" :key="item.id">{{index + 1}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div>
                                {{item.name}}
                            </div>
                            <div>
                                {{item.account}}
                            </div>
                            <div>
                                {{item.score}}
                            </div>
                            <div class="operation">
                                <div>
                                    <img src="/static/img/查看.png" @click="detailClick(index)" title="查看" alt="查看">
                                    <img src="/static/img/编辑.png" @click="ucompileClick(index)" title="编辑" alt="编辑">       
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部删除/分页 -->
                    <div class="lastLi" v-show="this.dataLists.length > 0">
                        <!-- <div class="batchDelete" @click="batchDelClick">
                            批量删除
                        </div> -->
                        <div></div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--修改弹出框-->
        <div :class="{popup:isPopup,showPopup:isShowPopup}">
            <transition name="slide-fade">
                <div class="popupContent" v-show="popupShow" v-loading="popuping">
                <div class="popupTitle">
                    <div>编辑</div>
                    <div @click="closeClick">
                    <img src="/static/img/小叉号@2x.png" alt="">
                    </div>
                </div>
                <div class="popupData">
                    <div>
                        真实姓名：
                    </div> 
                    <div>
                        {{realNameVal}}
                    </div>                   
                </div>
                <div class="popupData">
                    <div>
                        手机号：
                    </div> 
                    <div>
                        {{phoneVal}}
                    </div>
                </div>
                <div class="popupData">
                    <div>
                        当前积分：
                    </div> 
                    <div>
                        <input type="text" placeholder="请输入当前积分" v-model="scoreVal" :class="{redBorder:isRedScoreVal,grayBorder:isGrayScoreVal}">
                    </div>
                    <div :class="{redTest:isRedScoreVal,grayTest:isGrayScoreVal}">请输入正整数积分</div>
                </div>
                <div class="popupButton">
                    <div class="button" @click="butUcompileClick">确定</div>
                    <div @click="cancelClcik">取消</div>
                </div>
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
                scoreVal: '',
                realNameVal: '',
                phoneVal: '',
                isGrayScoreVal: true,
                isRedScoreVal: false,
                butUcompileClickTrueOrFalse: true,
                userIdVal: '',
                okDelClickTrueOrFalse: true,
                loading: false,
                scoreStartVal: "",
                isGrayScoreStartVal: true,
                isRedScoreStartVal: false,
                scoreEndVal: "",
                isGrayScoreEndVal: true,
                isRedScoreEndVal: false,
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataLists: [],
                isShowdel: true,
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 1,
                searchWordVal: "",
                searchWordValUp: "", //上传的关键字
                idstring: "", //id字符串
                iscurrentPage: "", //删除后应该为的页码
                searchClickShow: false,
                isPopup: true,
                isShowPopup: true,
                popupShow: false, // 控制修改弹框展示隐藏
                popuping: false
            };
        },
        // 过滤
        filters: {
            timeFun: function (val) {
                var now = new Date(val);
                var year = now.getYear() - 100;
                var month = now.getMonth() + 1;
                month = month > 9 ? month : "0" + month;
                var date = now.getDate();
                date = date > 9 ? date : "0" + date;
                var hour = now.getHours();
                hour = hour > 9 ? hour : "0" + hour;
                var minute = now.getMinutes();
                minute = minute > 9 ? minute : "0" + minute;
                return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
            },
        },
        // 模块新建时
        created: function () {
            var self = this;
            if (sessionStorage.getItem("pointStatisticsCurrentPage")) {
                self.currentPage = Number(sessionStorage.getItem("pointStatisticsCurrentPage"));
            }
            if (sessionStorage.getItem("pointStatisticsPageSizeNum")) {
                self.pageSizeNum = Number(sessionStorage.getItem("pointStatisticsPageSizeNum"));
            }
            if (sessionStorage.getItem("pointStatisticsSearchWordVal")) {
                self.searchWordValUp = self.searchWordVal = sessionStorage.getItem("pointStatisticsSearchWordVal")
            }
            // 权限限制
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "积分管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("pointStatistics") == -1) {
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
                    self.getIntegralLists();
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
        // 事件处理
        methods: {
            // 用户积分列表
            getIntegralLists() {
                var self = this;
                self.checked = false
                self.checkList = []
                sessionStorage.removeItem("pointStatisticsCurrentPage"),
                sessionStorage.removeItem("pointStatisticsPageSizeNum"),
                sessionStorage.removeItem("searchWordVal")                
                self.getpointIntegralUserGetUserIntegralListByCondition({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    searchWord: self.searchWordVal,
                    scoreStart: self.scoreStartVal,
                    scoreEnd: self.scoreEndVal,
                }).then(data => {
                    if (data.code == 200) {
                        self.dataLists = []
                        if (data.data.records.length>0) {
                            self.dataLists = data.data.records
                        }
                        self.totalNum = data.data.total
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        })
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                })
            },
            // 清除筛选数据
            removeClick () {
                var self = this
                self.currentPage = 1
                self.pageSizeNum = 10
                self.searchWordVal = ''
                self.scoreEndVal = ''
                self.scoreStartVal = ''
                self.getIntegralLists()
            },
            // 修改
            ucompileClick(index) {
                var self = this;
                self.isShowPopup= false
                self.popupShow = true
                self.isRedScoreVal = false
                self.isGrayScoreVal = true
                self.scoreVal = self.dataLists[index].score
                self.realNameVal = self.dataLists[index].name
                self.phoneVal = self.dataLists[index].account
                self.userIdVal = self.dataLists[index].userId
            },
            // 查看积分积分详情
            detailClick (index) {
                var self = this
                self.$router.push({
                    path: '/point/pointDetail'
                })
                sessionStorage.setItem("realName",self.dataLists[index].name)
                sessionStorage.setItem("phone",self.dataLists[index].account)
                sessionStorage.setItem("score",self.dataLists[index].score)
                sessionStorage.setItem("userIds",self.dataLists[index].userId)
                sessionStorage.setItem("pointStatisticsCurrentPage",self.currentPage)
                sessionStorage.setItem("pointStatisticsPageSizeNum",self.pageSizeNum)
                sessionStorage.setItem("searchWordValue",self.searchWordVal)
            },
            // 关闭
            closeClick () {
                this.isShowPopup = true;
                this.popupShow = false;
            },
            // 确认修改
            butUcompileClick () {
                var self = this
                if (self.validateFun() == false) {
                    return false
                } else {
                    if (self.butUcompileClickTrueOrFalse == true) {
                        self.butUcompileClickTrueOrFalse = false
                        self.getpointIntegralUserUpdateUserIntegral({
                            userId: self.userIdVal,
                            score: self.scoreVal,
                        }).then(data => {
                            self.butUcompileClickTrueOrFalse = true
                            if (data.code == 200) {
                                self.isShowPopup = true;
                                self.popupShow = false;
                                self.getIntegralLists()
                            } else {
                                    self.$message({
                                        type: 'info',
                                        message: data.message
                                    })
                            }
                        }).catch(msg => {
                            self.butUcompileClickTrueOrFalse = true
                            self.$message({
                                    type: 'info',
                                    message: '服务器异常'
                            })
                        })
                    }
                }
                
            },
             // 取消修改弹出框
            cancelClcik() {
                this.isShowPopup = true;
                this.popupShow = false;
            },
            //正则验证
            validateFun() {
                var reg_1 = /^[\s]*$/; //输入不能为空
                var reg_2 = /^\+?[1-9]\d*$/;// 只能输入正整数
                if (reg_1.test(this.scoreVal) || !reg_2.test(this.scoreVal)) {
                    this.isRedScoreVal = true;
                    this.isGrayScoreVal = false;
                }
                if (this.isRedScoreVal == true) {
                    return false;
                }
            },
            //模糊搜索
            searchClick() {
                var self = this
                if (self.searchWordVal.length > 0 || (self.scoreStartVal.length > 0 && self.scoreEndVal.length > 0)) {  
                    if (self.scoreStartVal.length > 0 && self.scoreEndVal.length > 0) {
                        if (this.isRedScoreStartVal == true || this.isRedScoreEndVal == true) {
                            return false
                        }
                    }
                    this.getIntegralLists(); 
        
                } else {
                    self.$message({
                        type: "info",
                        message: "请先输入搜索关键字!"
                    })
                    if (self.scoreStartVal.length == 0 && self.scoreEndVal.length > 0) {
                        self.$message({
                            type: "info",
                            message: "请先输入最小积分!"
                        })
                    } else if (self.scoreStartVal.length > 0 && self.scoreEndVal.length == 0) {
                        self.$message({
                            type: "info",
                            message: "请输入最大积分!"
                        })
                    }
                }                   
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                this.getIntegralLists();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getIntegralLists()
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataLists : [];
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = JSON.stringify(a);
                this.idstring = string;
                //console.log("全部序号", this.checkList);
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataLists.length;
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = JSON.stringify(a);
                this.idstring = string;
                //console.log("单个序号", this.checkList);
            },
            //取消删除
            canleClick() {
                this.isShowdel = true;
            },
            addCommClick() { },
            ...mapActions([
                "getpointIntegralUserGetUserIntegralListByCondition",
                "getpointIntegralUserUpdateUserIntegral"
            ])
        },
        // 监视
        watch: {
            searchWordVal: function (val) {
                if (val.length == 0) {
                    this.getIntegralLists();
                }
            },
            scoreVal: function(val) {
                var reg_1 = /^[\s]*$/; //输入不能为空
                var reg_2 = /^\+?[1-9]\d*$/;// 只能输入正整数
                if (reg_1.test(this.scoreVal) || !reg_2.test(this.scoreVal)) {
                    this.isRedScoreVal = true;
                    this.isGrayScoreVal = false;
                } else {
                    this.isRedScoreVal = false;
                    this.isGrayScoreVal = true;
                }
            },
            scoreStartVal: function(val) {
                var reg_1 = /^[\s]*$/; //输入不能为空
                var reg_2 = /^\+?[1-9]\d*$/;// 只能输入正整数
                if (val.length > 0) {
                    if (!reg_2.test(this.scoreStartVal)) {
                        this.isRedScoreStartVal = true;
                        this.isGrayScoreStartVal = false;
                        this.$message({
                            type: 'info',
                            message: "积分只能为正整数"
                        })
                    } else {
                        this.isRedScoreStartVal = false;
                        this.isGrayScoreStartVal = true;
                    }
                } else {
                    this.isRedScoreStartVal = false;
                    this.isGrayScoreStartVal = true;
                }                
            },
            scoreEndVal: function(val) {
                var reg_1 = /^[\s]*$/; //输入不能为空
                var reg_2 = /^\+?[1-9]\d*$/;// 只能输入正整数
                if (val.length > 0) {
                    if (!reg_2.test(this.scoreEndVal)) {
                        this.isRedScoreEndVal = true;
                        this.isGrayScoreEndVal = false;
                        this.$message({
                            type: 'info',
                            message: "积分只能为正整数"
                        })
                    } else {
                        this.isRedScoreEndVal = false;
                        this.isGrayScoreEndVal = true;
                    }
                } else {
                    this.isRedScoreEndVal = false;
                    this.isGrayScoreEndVal = true;
                }
                
            }
        }
    };
</script>
<style scoped>
    /*暂无数据*/
    .list .noList {
        height: 400px;
    }

    .list .noList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }

    /*主页*/

    .pointStatistics {
        width: 100%;
        height: 100%;
    }

    .pointStatistics>div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
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
        font-weight: 600;
    }

    .listTitle>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #5acdfa;
    }

    .filtrate {
        overflow: hidden;
        height: 74px;
    }

    .filtrate>div {
        float: left;
        margin-top: 20px;
    }

    /*下拉框*/

    .selectOne select {
        width: 140px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        border-radius: 3px;
        /* appearance: none; */
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
        font-size: 14px;
        color: #97A8BE;
        border: 1px solid #d1d1d1;
        overflow: hidden;
        cursor: pointer;
    }

    .selectOne select::-ms-expand {
        display: none;
    }

    .searchBox {
        height: 32px;
        line-height: 32px;
        margin-left: 14px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        padding-left: 8px;
        width: 210px;
    }

    .searchBox input {
        border: none;
        height: 26px;
        width: 80%;
    }

    .searchBox input::-webkit-input-placeholder {
        color: #97A8BE;
    }

    .searchBox input:-moz-input-placeholder {
        color: #97A8BE;
    }

    .searchBox input::-moz-input-placeholder {
        color: #97A8BE;
    }

    .searchBox input:-ms-input-placeholder {
        color: #97A8BE;
    }

    .filtrateOk {
        width: 70px;
        height: 32px;
        margin-left: 14px;
        background: #FF8A41;
        text-align: center;
        line-height: 32px;
        color: white;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    .interval {
        margin-left: 10px;
    }

    .delfiltrateOk {
        color: #fe5371 !important;
        background-color: #eaeaea;
    }

    /*选择时间*/

    .selectTime {
        height: 32px;
        /* float: right !important; */
        line-height: 32px;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
        width: 220px;
    }

    /* .selectTime input {
        border: 1px solid #d1d1d1;
    } */

    .selectTime input {
        border: none;
        height: 32px;
        width: 80px!important;
        padding-right: 10px;
    }

    .selectTime input::-webkit-input-placeholder {
        color: #97A8BE;
    }

    .selectTime input:-moz-input-placeholder {
        color: #97A8BE;
    }

    .selectTime input::-moz-input-placeholder {
        color: #97A8BE;
    }

    .selectTime input:-ms-input-placeholder {
        color: #97A8BE;
    }

    .selectTime>div {
        float: left;
    }

    .selectTime>div:nth-child(1),
    .selectTime>div:nth-child(3) {
        width: 80px;
        height: 32px;
        overflow: hidden; 
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        position: relative;
    }

    .selectTime>div:nth-child(1)>div,
    .selectTime>div:nth-child(3)>div {
        position: absolute;
        top: -1px;
        left: -6px;
        width:100px;
    }

    .selectTime>div:nth-child(2) {
        height: 32px;
    }

    .selectTime div {
        margin: 0 5px;
    }

    .list {
        min-height: 550px;
    }

    .list>div {
        margin: 0 auto;
    }

    /*列表*/

    .listContent {
        overflow: hidden;
    }

    .listContentTop {
        border-top: 1px solid #e5e7eb;
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
        width: 20%;
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
        width: 20%;
        border-right: 1px solid #e5e7eb;
    }

    .listContentTop>div {
        font-size: 17px;
        font-weight: bold;
        color: #303030;
        background: #f2f4f8;
    }

    /*批量删除*/

    .lastLi {
        display: flex;
        height: 60px;
        justify-content: space-between;
    }

    .batchDelete {
        width: 100px !important;
        height: 32px;
        background: #5acdfa;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        font-size: 17px;
        color: white;
        cursor: pointer;
    }

    .dataLi>div:nth-child(5) span {
        color: green;
        cursor: pointer;
    }

    /*删除弹出框*/

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

    /* .omit {
        overflow: hidden;
        padding: 0 7px;
        white-space: nowrap;
        text-overflow: ellipsis;
    } */

    .dataLi > div {
        overflow: hidden;
        padding: 0 7px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .operation > div {
        width: 50%;
        display: flex;
        justify-content: space-around;
        margin-top: 12.5px;
        margin-left: 25%;
        cursor: pointer;
    }

    .operation img {
        cursor: pointer;
    }


    .operation {
        height: 49px;
        line-height: 49px;
    }
    
/* 弹出框 */
.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showPopup {
  display: none;
}

.popupData {
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 25px 20%;
}

.popupData > div:nth-child(2) {
    margin-left: 15px;
}

.popupData:nth-child(3) > div:nth-child(1) {
    margin-left: 14px!important;
}

.popupData:nth-child(4) > div:nth-child(2) {
    margin-right: 20px!important;
}

.popupData input {
    width: 150px;
    height: 32px;
    border: 1px solid #d1d1d1;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

.redTest {
  color: #fe5371 !important;
}

.grayTest {
  color: #908f95 !important;
}

.redBorder {
  border: 1px solid #fe5371 !important;
}

.grayBorder {
  border: 1px solid #d1d1d1 !important;
}

.popupButton {
  display: flex;
  margin: 50px auto 25px auto;
}
.popupButton > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
  margin-left: 30%; 
}

.popupButton > .button {
  width: 68px;
  height: 30px;
  background-color: #FF8A41;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 50px;
}

.popupButton > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

 input {
  width: 150px!important;
  height: 36px;
  border-radius: 4px;
  color: #303030;
  /* text-align: center; */
  padding-left: 10px;
}

.popupContent {
  width: 550px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.popupContent .popupTitle {
  display: flex;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #F2F4F8;
  width: 100%;
  border-bottom: 1px solid #d1d1d1;
  margin-top:-50;
  font-size: 15px;
  font-weight: bold;
}

.popupContent .popupTitle div:nth-child(2) {
  margin-left: 460px;
  cursor: pointer;
}

.popupTitle div:nth-child(2) img {
  width: 15px;
  height: 15px;
}
</style>