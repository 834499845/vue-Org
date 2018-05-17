<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="dynamic">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    动态管理
                </div>
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div>
                    <select v-model="selTwoVal">
                        <option v-for="(type,index) in selTwoList" :value="type.id" :id="type.id">{{type.name}}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selThreeVal">
                        <option v-for="(type,index) in selThreeList" :value="type.id" :id="type.id">{{type.name}}</option>
                    </select>
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按动态搜索" v-model="headlineVal">
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按作者搜索" v-model="authorVal">
                </div>
                <div class="selectTime">
                    <div>
                        <el-date-picker :editable='false' @change="beginTimeChange" v-model="beginTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker :editable='false' @change="overtimeChange" v-model="finishTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="searBut">
                    <div @click="okSearClick">
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
                            动态
                        </div>
                        <div>
                            作者
                        </div>
                        <div>
                            发布时间
                        </div>
                        <div>
                            互动数据
                        </div>
                        <div>
                            推荐
                        </div>
                        <div>
                            显示
                        </div>
                        <!-- <div>
                            操作
                        </div> -->
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
                                <el-checkbox :label="item" :key="item.id ">{{index + 1}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-tooltip :disabled="item.title && item.title.length > 0 ? false : true" popper-class="toolexam" id="toolselcont" :content="item.title"
                            placement="bottom" effect="light">
                            <div>
                                <span class="greenFont" @click="dynamicFontClick(index)">
                                    {{item.title}}
                                </span>
                            </div>
                        </el-tooltip>
                        <!-- <div class="dynamicFont" @click="dynamicFontClick(index)">
                            {{item.title}}
                        </div> -->
                        <div>
                            {{item.authorName}}
                        </div>
                        <div :title="item.updateTime | ctimeFun">
                            {{item.updateTime | ctimeFun}}
                        </div>
                        <div>
                            <div v-show="item.totalCount == 0">
                                {{item.totalCount}}
                            </div>
                            <div v-show="item.totalCount > 0" class="greenFont" @click="numberClick(index)">
                                {{item.totalCount}}
                            </div>
                        </div>
                        <div>
                            <img @click="recommendClick(index)" v-show="item.recommend == 1" src="/static/img/shi.png" alt="推荐" title="推荐">
                            <img @click="recommendClick(index)" v-show="item.recommend == 2" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <div>
                            <img @click="uncommonClick(index)" v-show="item.showState == 0" src="/static/img/shi.png" alt="显示" title="显示">
                            <img @click="uncommonClick(index)" v-show="item.showState == 1" src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <!-- <div class="listBut">
                            <div>
                                <img @click="recycleClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                            </div>
                        </div> -->
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="dataList.length > 0">
                    <div class="batchCss">
                        <div>
                            <select v-model="batchVal">
                                <option v-for="(type,index) in batchList" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                            </select>
                        </div>
                        <div class="batchBut" @click="batchClick">
                            确定
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
                    <v-newsdel @ok="okClick" @canle="canleClick" :name="titlenameVal"></v-newsdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import newsdel from "../../cModule/newsDelete";
    export default {
        components: {
            "v-newsdel": newsdel
        },
        data() {
            return {
                beginTimeVal: "", //开始日期时间戳
                finishTimeVal: "", //结束日期时间戳
                timeNumOne: '',// 开始时间戳
                timeNumTwo: '',//结束时间戳
                timeOne: "",  //开始年-月-日
                timeTwo: "",  //结束年-月-日
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [],   //列表数组
                batchVal: '0', //批量操作
                batchList: [
                    { value: '批量删除', key: '0' },
                    { value: '批量推荐', key: '1' },
                    { value: '关闭推荐', key: '2' },
                    // { value: '批量显示', key: '3' },
                    // { value: '关闭显示', key: '4' },
                ],  //批量操作
                isShowdel: false, //删除弹框
                titlenameVal: '动态', //删除弹框提示语
                delIndex: '',   //删除index
                headlineVal: '',//文章标题
                authorVal: '', //作者
                okSearShow: false,  //是否执行筛选
                timeShow: false, //时间是否可进行筛选
                idstring: '', //批量操作的id字符串数组
                idarr: [], //批量操作的id数组
                isListUp: true, //列表请求判断
                isRecommendUp: true,    //推荐请求判断
                isShowUp: true,     //显示请求判断
                selTwoVal: '2',//第二个下拉
                selTwoList: [
                    { name: '请选择互动条件', id: '2' },
                    { name: '按互动数最多', id: '0' },
                    { name: '按互动数最少', id: '1' },
                ],  //第二个下拉数组
                selThreeVal: '',//第三个下拉
                selThreeList: [
                    { name: '请选择是否推荐', id: '' },
                    { name: '设为推荐的文章', id: '0' },
                    { name: '设为不推荐的文章', id: '1' },
                ],  //第三个下拉数组
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1,
            };
        },
        // 过滤
        filters: {
            // 返回日期格式化
            ctimeFun: function (val) {
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
            sessionStorage.removeItem('numberComment')
            if (sessionStorage.getItem('dynamicListSelect')) {
                this.okSearShow = true
                var objselect = JSON.parse(sessionStorage.getItem('dynamicListSelect'))
                this.selTwoVal = objselect.selTwoVal
                this.selThreeVal = objselect.selThreeVal
                this.headlineVal = objselect.headlineVal
                this.authorVal = objselect.authorVal
                if (objselect.timeNumOne == "" || objselect.finishTimeVal == "") {
                    this.beginTimeVal = ""
                    this.timeNumOne = ""
                    this.finishTimeVal = ""
                    this.timeNumTwo = ""
                } else {
                    this.timeShow = true
                    this.beginTimeVal = new Date(objselect.timeNumOne)   //标准时间-开始时间
                    this.timeNumOne = objselect.timeNumOne      //标准时间戳-开始时间
                    this.finishTimeVal = new Date(objselect.timeNumTwo)   //标准时间-结束时间
                    this.timeNumTwo = objselect.timeNumTwo      //标准时间戳-结束时间
                }
                this.timeOne = objselect.timeOne      //上传时间-开始时间
                this.timeTwo = objselect.timeTwo      //上传时间-结束时间
            }
            if (sessionStorage.getItem('dynamicListPage')) {
                var objPage = JSON.parse(sessionStorage.getItem('dynamicListPage'))
                this.currentPage = objPage.currentPage
                this.pageSizeNum = objPage.pageSizeNum
            }
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
                if (arrs.indexOf("dynamic") == -1) {
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
                    this.getdynamicList()
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
            //获取动态列表
            getdynamicList() {
                this.isListUp = false
                this.checked = false
                this.checkList = []
                var self = this
                self.getnewsControllerSelectNewsList({
                    type: 1,    //0-新闻，1-动态
                    classifyId: '',// 新闻分类ID
                    chooseType: self.selThreeVal, //操作选择(0推荐,1不推荐)
                    sortState: self.selTwoVal, //排序方式(0互动最多排序,1互动最少排序,2按时间排序)  
                    title: self.headlineVal, //标题
                    name: self.authorVal,    //作者
                    startDate: self.timeOne,    //开始时间
                    stopDate: self.timeTwo,     //结束时间 
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                }).then(data => {
                    self.isListUp = true
                    self.dataList = []
                    if (data.code == 200) {
                        sessionStorage.removeItem('dynamicListSelect')
                        sessionStorage.removeItem('dynamicListPage')
                        if (data.data.records) {
                            if (data.data.records.length > 0) {                               
                                self.dataList = data.data.records
                                console.log(self.dataList)
                                self.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.isListUp = true
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                })
            },
            //筛选
            okSearClick() {
                if (this.selTwoVal == '2' && this.selThreeVal == '' && this.headlineVal == '' && this.authorVal == '' && this.timeShow == 0) {
                    return
                } else {
                    this.okSearShow = 1
                    if (this.timeShow == 0) {
                        this.beginTimeVal = this.timeOne = ''
                        this.finishTimeVal = this.timeTwo = ''
                    }
                    this.currentPage = 1
                    this.pageSizeNum = 10
                    if (this.isListUp) {
                        this.getdynamicList()
                    }
                }
            },
            //重置筛选
            resetClick() {
                this.timeShow = false
                this.selTwoVal = '2'
                this.selThreeVal = ''
                this.headlineVal = ''
                this.authorVal = ''
                this.beginTimeVal = this.timeOne = ''
                this.finishTimeVal = this.timeTwo = ''
                if (this.okSearShow) {
                    this.okSearShow = 0
                    this.getdynamicList()
                }
            },
            //分页
            handleSizeChange(val) {
                if (this.okSearShow == false) {
                    this.selTwoVal = '2'
                    this.selThreeVal = ''
                    this.headlineVal = ''
                    this.authorVal = ''
                    this.beginTimeVal = this.timeOne = ''
                    this.finishTimeVal = this.timeTwo = ''
                }
                this.pageSizeNum = val
                this.getdynamicList()
            },
            handleCurrentChange(val) {
                if (this.okSearShow == false) {
                    this.selTwoVal = '2'
                    this.selThreeVal = ''
                    this.headlineVal = ''
                    this.authorVal = ''
                    this.beginTimeVal = this.timeOne = ''
                    this.finishTimeVal = this.timeTwo = ''
                }
                this.currentPage = val
                this.getdynamicList()
            },
            //内容点击
            dynamicFontClick(index) {
                this.$router.push({
                    path: '/news/newsdetails',
                    query: {
                        id: this.dataList[index].id,
                        newsShow: 'dynamic'
                    }
                })
                sessionStorage.setItem("authorval",this.dataList[index].authorName)
                if (this.okSearShow) {
                    var objOne = {
                        selTwoVal: this.selTwoVal,//排序方式(0互动最多排序,1互动最少排序,2按时间排序)  
                        selThreeVal: this.selThreeVal,//操作选择(0推荐,1不推荐)
                        headlineVal: this.headlineVal,  //标题
                        authorVal: this.authorVal,  //作者
                        timeNumOne: this.timeNumOne,    //标准时间戳-开始时间
                        timeNumTwo: this.timeNumTwo,      //标准时间戳-结束时间
                        timeOne: this.timeOne,  //开始时间
                        timeTwo: this.timeTwo,  //结束时间
                    }
                    var strOne = JSON.stringify(objOne)
                    sessionStorage.setItem('dynamicListSelect', strOne)
                }

                var objTwo = {
                    currentPage: this.currentPage,
                    pageSizeNum: this.pageSizeNum
                }
                var strTwo = JSON.stringify(objTwo)
                sessionStorage.setItem('dynamicListPage', strTwo)
            },
            // 开始时间
            beginTimeChange() {
                this.timeShow = false
                this.timeNumOne = Date.parse(this.beginTimeVal);
                var t = this.beginTimeVal;
                if (t) {
                    var y, m, d;
                    y = t.getFullYear();
                    m = t.getMonth() + 1;
                    d = t.getDate();
                    m = m > 9 ? m : "0" + m;
                    d = d > 9 ? d : "0" + d;
                    if (this.finishTimeVal) {
                        if (this.finishTimeVal != '') {
                            if (this.finishTimeVal - this.beginTimeVal >= 0) {
                                this.timeOne = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "开始时间不能大于结束时间！"
                                });
                                this.beginTimeVal = this.timeOne = "";
                            }
                        } else {
                            this.timeOne = y + "-" + m + "-" + d;
                        }
                    } else {
                        this.timeOne = y + "-" + m + "-" + d;
                    }
                }
            },
            //结束时间
            overtimeChange() {
                this.timeShow = false
                this.timeNumTwo = Date.parse(this.finishTimeVal);
                var t = this.finishTimeVal;
                if (t) {
                    var y, m, d;
                    y = t.getFullYear();
                    m = t.getMonth() + 1;
                    d = t.getDate();
                    m = m > 9 ? m : "0" + m
                    d = d > 9 ? d : "0" + d
                    if (this.beginTimeVal) {
                        if (this.beginTimeVal != '') {
                            if (this.finishTimeVal - this.beginTimeVal >= 0) {
                                this.timeTwo = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true
                            } else {
                                this.finishTimeVal = "";
                                this.timeTwo = "";
                                this.$message({
                                    type: "info",
                                    message: "结束时间不得小于开始时间！"
                                });
                            }
                        } else {
                            this.finishTimeVal = "";
                            this.timeTwo = "";
                            this.$message({ message: "请先选择开始时间！" });
                        }
                    } else {
                        this.finishTimeVal = "";
                        this.timeTwo = "";
                        this.$message({ message: "请先选择开始时间！" });
                    }
                }
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = JSON.stringify(a);
                this.idstring = string;
                this.idarr = a
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = JSON.stringify(a);
                this.idstring = string;
                this.idarr = a
            },
            //批量操作
            batchClick() {
                if (this.checkList.length == 0) {
                    return
                } else {
                    if (this.batchVal == 0) {
                        this.isShowdel = true
                        this.idstring = this.idarr.join(",")
                        console.log(this.idstring)
                        this.titlenameVal = '这些新闻将被删除，该操作不可恢复！'
                    } else if (this.batchVal == 1) {
                        this.stateVal = 1
                        this.getuncommon()
                    } else if (this.batchVal == 2) {
                        this.stateVal = 2
                        this.getuncommon()
                    } else if (this.batchVal == 3) {
                        this.stateVal = 2
                        this.getShowDynamic()
                    } else if (this.batchVal == 4) {
                        this.stateVal = 3
                        this.getShowDynamic()
                    }
                }
            },
            //推荐
            recommendClick(index) {
                this.idstring = '["' + this.dataList[index].id + '"]'
                if (this.dataList[index].recommend == 1) {
                    this.stateVal = 2
                } else if (this.dataList[index].recommend == 2) {
                    this.stateVal = 1
                }
                if (this.isRecommendUp) {
                    this.getuncommon()
                }
            },
            //推荐操作接口
            getuncommon() {
                this.isRecommendUp = false
                var self = this
                self.getnewsControllerRecommendNews({
                    newsIdJson: self.idstring,
                    state: self.stateVal
                }).then(data => {
                    self.isRecommendUp = true
                    if (data.code == 200) {
                        this.getdynamicList()
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.isRecommendUp = true
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                })
            },
            //显示
            uncommonClick(index) {
                this.idstring = '["' + this.dataList[index].id + '"]'
                if (this.dataList[index].showState == 0) {
                    this.stateVal = 1
                } else if (this.dataList[index].showState == 1) {
                    this.stateVal = 0
                }
                if (this.isShowUp) {
                    this.getShowDynamic()
                }
            },
            //显示操作接口
            getShowDynamic() {
                this.isShowUp = false
                var self = this
                self.getControllerShowDynamic({
                    newsIdJson: self.idstring,
                    state: self.stateVal
                }).then(data => {
                    self.isShowUp = true
                    if (data.code == 200) {
                        this.getdynamicList()
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.isShowUp = true
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                })
            },
            //删除
            recycleClick(index) {
                this.isShowdel = true
                this.titlenameVal = '该新闻将被删除，该操作不可恢复！'
                this.idstring = this.dataList[index].id
            },
            //取消删除
            canleClick() {
                this.isShowdel = false
            },
            //确定删除
            okClick() {
                // this.isShowdel = false
                this.getdeleteNews()
            },
            //删除动态接口
            getdeleteNews() {
                var self = this
                self.getControllerDelete({
                    newsType: 1, //类型（0：新闻，1：动态）
                    newsIds: self.idstring
                }).then(data => {
                    if (data.code == 200) {
                        this.isShowdel = false
                        self.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        self.getdynamicList()
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message('服务器异常')
                })
            },
            //互动数据
            numberClick(index) {
                if (this.dataList[index].totalCount > 0) {
                    this.$router.push({
                        path: '/news/dynamicNumber'
                    })
                    var arr = {
                        id: this.dataList[index].id,
                        newsShow: 'dynamic',
                    }
                    var obj = JSON.stringify(arr)
                    sessionStorage.setItem("numberComment", obj)
                    if (this.okSearShow) {
                        var objOne = {
                            selTwoVal: this.selTwoVal,//排序方式(0互动最多排序,1互动最少排序,2按时间排序)  
                            selThreeVal: this.selThreeVal,//操作选择(0推荐,1不推荐)
                            headlineVal: this.headlineVal,  //标题
                            authorVal: this.authorVal,  //作者
                            timeOne: this.timeOne,  //开始时间
                            timeTwo: this.timeTwo,  //结束时间
                            timeNumOne: this.timeNumOne,    //标准时间戳-开始时间
                            timeNumTwo: this.timeNumTwo,      //标准时间戳-结束时间
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem('dynamicListSelect', strOne)
                    }
                    var objTwo = {
                        currentPage: this.currentPage,
                        pageSizeNum: this.pageSizeNum
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem('dynamicListPage', strTwo)
                } else {
                    this.$message({
                        type: 'info',
                        message: '暂无互动数据'
                    })
                }

            },
            ...mapActions(['getnewsControllerSelectNewsList', 'getnewsControllerRecommendNews', 'getControllerShowDynamic', 'getControllerDelete'])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .dynamic {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .dynamic>div:nth-child(1) {
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

    .search select {
        width: 180px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
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

    .batchCss select {
        width: 100px;
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
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

    /*选择时间*/

    .selectTime {
        height: 32px;
        float: right !important;
        line-height: 32px;
        overflow: hidden;
    }

    .selectTime>div {
        float: left;
    }

    .selectTime>div:nth-child(1),
    .selectTime>div:nth-child(3) {
        width: 100px;
        height: 32px;
        overflow: hidden;
        border: 1px solid #aeaeae;
        border-radius: 4px;
        position: relative;
    }

    .selectTime>div:nth-child(1)>div,
    .selectTime>div:nth-child(3)>div {
        position: absolute;
        top: -1px;
        left: -6px;
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

    .dynamicFont {
        padding: 0 4px;
    }

    .dynamicFont span {
        color: green;
        cursor: pointer;
    }

    .searBut {
        display: flex;
        width: 158px;
        justify-content: space-between;
        margin-right: 0!important;
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
        background: #a3a3a3
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
        background: #f2f4f8
    }

    .listContent li {
        display: flex;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-left: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
    }

    .listContent li>div {
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(1) {
        width: 10%;
    }

    .listContent li>div:nth-child(2) {
        width:20%;
        cursor: pointer;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }

    .listContent li>div:nth-child(3) {
        width: 10%;
    }

    .listContent li>div:nth-child(4) {
        width: 15%;
    }

    .listContent li>div:nth-child(5) {
        width: 15%;
        cursor: pointer;
    }

    .listContent li>div:nth-child(6) {
        width: 15%;
    }

    .listContent li>div:nth-child(7) {
        width: 15%;
    }

    .listContent li>div:nth-child(6) img,
    .listContent li>div:nth-child(7) img {
        cursor: pointer;
    }

    .greenFont {
        color: green;
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
</style>