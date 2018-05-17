<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="smallVideo">
        <div>
            <!-- 头部 -->
            <div class="head">
                <div>
                    小视频管理
                </div>
                <!-- <div @click="addNewsClick">
                    新增新闻
                </div> -->
            </div>
            <!-- 筛选 -->
            <div class="search">
                <div>
                    <select v-model="selOneKeyVal">
                        <option v-for="(type,index) in selOneList" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                    </select>
                </div>
                <div>
                    <select v-model="selTwoKeyVal">
                        <option v-for="(type,index) in selTwoList" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="按标题/作者搜索" v-model.trim="authorOrTitleVal">
                </div>
                <div class="selectTime">
                    <div>
                        <el-date-picker @change="beginTimeChange" v-model="beginTimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker @change="overtimeChange" v-model="overtimeVal" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
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
                            标题
                        </div>
                        <div>
                            视频
                        </div>
                        <div>
                            时长
                        </div>
                        <div>
                            发布时间
                        </div>
                        <div>
                            作者
                        </div>
                        <div>
                            互动数据
                        </div>
                        <div>
                            热点
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
                        <el-tooltip :disabled="item.title && item.title.length > 5 ? false : true" popper-class="toolexam" id="toolselcont" :content="item.title"
                            placement="bottom" effect="light">
                            <div class="smallVideoFont">
                                {{item.title}}
                            </div>
                        </el-tooltip>
                        <div>
                            <div class="imgBox">
                                <img :src="item.cover" alt="" @click="videoExamine(index)" title="查看视频">
                            </div>
                            <div class="stopIcon" @click="videoExamine(index)"></div>
                        </div>
                        <div>
                            {{item.longTime}}
                        </div>
                        <div :title="item.createDate | timeFun">
                            {{item.createDate | timeFun}}
                        </div>
                        <div :title="item.userName">
                            {{item.userName}}
                        </div>
                        <div>
                            <div v-show="item.totalCount == 0">
                                {{item.totalCount}}
                            </div>
                            <span v-show="item.totalCount > 0" class="greenFont" @click="numberClick(index)">
                                {{item.totalCount}}
                            </span>
                        </div>
                        <div class="commonImgBox">
                            <img @click="uncommonClick('1',index)" v-if="item.recommend == '1'" src="/static/img/shi.png" alt="显示" title="显示">
                            <img @click="uncommonClick('2',index)" v-else src="/static/img/fou.png" alt="关闭" title="关闭">
                        </div>
                        <div class="listBut">
                            <div>
                                <img @click="recycleClick(index)" src="/static/img/删除.png">
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 底部分页 -->
                <div class="lastLi" v-show="dataList.length > 0">
                    <div class="batchCss">
                        <div>
                            <select v-model="batchmodel">
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
                    <v-newsdelete @ok="okClick" @canle="canleClick" :name="titlename"></v-newsdelete>
                </div>
            </transition>
        </div>
        <!-- 视频弹出框 -->
        <div class="delPopup" v-show="isvideo">
            <div class="videoBox">
                <div>
                    视频播放
                    <div @click="closeVideoClick" class="closeVideo">+</div>
                </div>
                <div>
                    <video :src="videoSrc" controls="controls"></video>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from "vuex";
    import newsdelete from "../../cModule/newsDelete";
    export default {
        components: {
            "v-newsdelete": newsdelete
        },
        data() {
            return {
                beginTimeVal: "", //开始标准日期时间
                overtimeVal: "", //结束标准日期时间
                timeNumOne: '',// 开始时间戳
                timeNumTwo: '',//结束时间戳
                timeOne: "", //开始年-月-日
                timeTwo: "", //结束年-月-日
                isvideo: 0, //视频弹出框
                videoSrc: "", // 视频路径
                checked: false, //选取全部序号
                checkList: [], //序号选取
                dataList: [], //列表数组
                selOneKeyVal: "", //第一个下拉
                selOneList: [
                    { value: "请选择是否推荐", key: "" },
                    { value: "推荐", key: "1" },
                    { value: "不推荐", key: "2" }
                ], //第一个下拉数组
                selTwoList: [
                    { value: "选择标题/作者搜索", key: "" },
                    { value: "按标题搜索", key: "0" },
                    { value: "按作者搜索", key: "1" }
                ], //第二个下拉数组
                selTwoKeyVal: "", //第二个下拉
                batchmodel: "0", //批量操作
                batchList: [
                    { value: "批量删除", key: "0" },
                    { value: "开启热点", key: "1" },
                    { value: "关闭热点", key: "2" }
                ], //批量操作
                isShowdel: false, //删除弹框
                titlename: "该记录将被删除，该操作不可恢复", //删除弹框提示语
                authorOrTitleVal: "", //作者/标题
                okSearchShow: false, //是否执行筛选
                timeShow: false, //时间是否可进行筛选
                idstring: "", //序号
                batchObj: {}, //批量操作对象
                isCommonUp: true, //推荐请求判断
                pageSizeNum: 10,
                totalNum: 10,
                currentPage: 1
            };
        },
        // 过滤
        filters: {
            timeFun: function (val) {
                if (val) {
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
                } else {
                    return "暂无";
                }
            }
        },
        // 模块新建时
        created: function () {
            sessionStorage.removeItem('numberComment')
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
                if (arrs.indexOf("video") == -1) {
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
                    if (sessionStorage.getItem('videoSelect') || sessionStorage.getItem('videoPag')) {
                        if (sessionStorage.getItem('videoSelect')) {
                            this.okSearchShow = true
                            var objSelect = JSON.parse(sessionStorage.getItem('videoSelect'))
                            this.selOneKeyVal = objSelect.selOneKeyVal    //是否推荐
                            this.selTwoKeyVal = objSelect.selTwoKeyVal    //选择作者/标题
                            this.authorOrTitleVal = objSelect.authorOrTitleVal    //标题/作者
                            if (objSelect.timeNumOne == "" || objSelect.overtimeVal == "") {
                                this.beginTimeVal = ""
                                this.timeNumOne = ""
                                this.overtimeVal = ""
                                this.timeNumTwo = ""
                            } else {
                                this.timeShow = true
                                this.beginTimeVal = new Date(objSelect.timeNumOne)   //标准时间-开始时间
                                this.timeNumOne = objSelect.timeNumOne      //标准时间戳-开始时间
                                this.overtimeVal = new Date(objSelect.timeNumTwo)   //标准时间-结束时间
                                this.timeNumTwo = objSelect.timeNumTwo      //标准时间戳-结束时间
                            }
                            this.timeOne = objSelect.timeOne      //上传时间-开始时间
                            this.timeTwo = objSelect.timeTwo      //上传时间-结束时间
                        }
                        if (sessionStorage.getItem('videoPag')) {
                            var objPag = JSON.parse(sessionStorage.getItem('videoPag'))
                            this.pageSizeNum = objPag.pageSizeNum
                            this.currentPage = objPag.currentPage
                        }
                        this.getvideoList("1");
                    } else {
                        this.getvideoList("");
                    }
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
            //获取小视频列表
            getvideoList(m) {
                this.checkList = [];
                this.checked = false;
                var self = this;
                self.getVideoSelectPageVideo({
                    recommend: m == "" ? "" : self.selOneKeyVal, //是否推荐
                    type: m == "" ? "" : self.selTwoKeyVal, //类型，0-标题，1-作者
                    titleOrUserName: m == "" ? "" : self.authorOrTitleVal, //关键字
                    startTime: m == "" ? "" : self.timeOne, //开始时间
                    endTime: m == "" ? "" : self.timeTwo, //结束时间
                    pageSize: self.pageSizeNum,
                    pageNo: self.currentPage
                }).then(data => {
                    if (data.code == 200) {
                        sessionStorage.removeItem('videoSelect')
                        sessionStorage.removeItem('videoPag')
                        if (data.data.records) {
                            self.dataList = data.data.records;
                        }
                        self.totalNum = data.data.total;
                    } else {
                        self.$message(data.message);
                    }
                }).catch(msg => {
                    self.$message({
                        type: "info",
                        message: "服务器异常"
                    });
                });
            },
            //筛选
            okSearchClick() {
                if (this.timeShow == false) {
                    this.beginTimeVal = this.timeNumOne = this.overtimeVal = this.timeNumTwo = ""
                }
                if (this.selOneKeyVal == "" && this.selTwoKeyVal == "" && this.authorOrTitleVal == "" && this.timeShow == false) {
                } else {
                    if (this.selOneKeyVal == "" && this.authorOrTitleVal == "" && this.timeShow == false) {
                        this.selTwoKeyVal = ""
                    } else if (this.selOneKeyVal == "" && this.selTwoKeyVal == "" && this.timeShow == false) {
                        this.authorOrTitleVal = ""
                    } else {
                        if (this.authorOrTitleVal == "" || this.selTwoKeyVal == "") {
                            this.authorOrTitleVal = ""
                            this.selTwoKeyVal = ""
                        }
                        this.okSearchShow = 1;
                        this.getvideoList("1");
                    }
                }
            },
            //重置筛选
            resetClick() {
                this.timeShow = false
                this.selOneKeyVal = "";
                this.selTwoKeyVal = "";
                this.authorOrTitleVal = "";
                this.beginTimeVal = this.timeOne = "";
                this.overtimeVal = this.timeTwo = "";
                if (this.okSearchShow) {
                    this.okSearchShow = 0;
                    this.getvideoList("");
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSizeNum = val;
                if (this.okSearchShow == false) {
                    this.getvideoList("");
                } else {
                    this.getvideoList("1");
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.okSearchShow == false) {
                    this.getvideoList("");
                } else {
                    this.getvideoList("1");
                }
            },
            // 开始时间
            beginTimeChange() {
                this.timeShow = false;
                this.timeNumOne = Date.parse(this.beginTimeVal);
                var t = this.beginTimeVal;
                if (t) {
                    var y, m, d;
                    y = t.getFullYear();
                    m = t.getMonth() + 1;
                    d = t.getDate();
                    m = m > 9 ? m : "0" + m;
                    d = d > 9 ? d : "0" + d;
                    if (this.overtimeVal) {
                        if (this.overtimeVal != "") {
                            if (this.overtimeVal - this.beginTimeVal >= 0) {
                                this.timeOne = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true;
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
                this.timeShow = false;
                this.timeNumTwo = Date.parse(this.overtimeVal);
                var t = this.overtimeVal;
                if (t) {
                    var y, m, d;
                    y = t.getFullYear();
                    m = t.getMonth() + 1;
                    d = t.getDate();
                    m = m > 9 ? m : "0" + m;
                    d = d > 9 ? d : "0" + d;
                    if (this.beginTimeVal) {
                        if (this.beginTimeVal != "") {
                            if (this.overtimeVal - this.beginTimeVal >= 0) {
                                this.timeTwo = y + "-" + m + "-" + d;
                                //发送请求
                                this.timeShow = true;
                            } else {
                                this.overtimeVal = "";
                                this.timeTwo = "";
                                this.$message({
                                    type: "info",
                                    message: "结束时间不得小于开始时间！"
                                });
                            }
                        } else {
                            this.overtimeVal = "";
                            this.timeTwo = "";
                            this.$message({ message: "请先选择开始时间！" })
                        }
                    } else {
                        this.overtimeVal = "";
                        this.timeTwo = "";
                        this.$message({ message: "请先选择开始时间！" })
                    }
                }
            },
            //选取全部序号
            numChange(event) {
                this.checkList = event.target.checked ? this.dataList : [];
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = a.join(",");
                this.idstring = string;
            },
            //序号选取
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataList.length;
                var a = this.checkList.map(function (data) {
                    return data.id;
                });
                var string = a.join(",");
                this.idstring = string;
            },
            //批量操作
            batchClick() {
                if (this.checkList.length > 0) {
                    if (this.batchmodel == "0") {
                        this.isShowdel = true;
                    } else if (this.batchmodel == "1") {
                        this.batchObj = {
                            type: 1,
                            recommend: 1,
                            videoIds: this.idstring
                        };
                        this.getBatchClick();
                    } else if (this.batchmodel == "2") {
                        this.batchObj = {
                            type: 1,
                            recommend: 2,
                            videoIds: this.idstring
                        };
                        this.getBatchClick();
                    }

                } else {
                    this.$message('请先选取序号')
                }
            },
            //不推荐或者推荐
            uncommonClick(m, index) {
                if (this.isCommonUp) {
                    this.isCommonUp = false
                    var self = this;
                    self
                        .getvideoupdateVideoState({
                            type: "1",
                            recommend: m == "1" ? "2" : "1",
                            videoIds: self.dataList[index].id
                        })
                        .then(data => {
                            self.isCommonUp = true
                            if (data.code == 200) {
                                self.$message({
                                    type: "success",
                                    message: "操作成功"
                                });
                                if (self.okSearchShow == false) {
                                    self.getvideoList("");
                                } else {
                                    self.getvideoList("1");
                                }
                            } else {
                                self.$message(data.message);
                            }
                        })
                        .catch(msg => {
                            self.isCommonUp = true
                            self.$message("服务器异常");
                        });
                }
            },
            //删除
            recycleClick(index) {
                this.isShowdel = true;
                this.idstring = this.dataList[index].id;
            },
            //取消删除
            canleClick() {
                this.isShowdel = false;
            },
            //确定删除
            okClick() {
                var self = this;
                this.isShowdel = false;
                self
                    .getvideoupdateVideoState({
                        type: "0",
                        videoIds: self.idstring
                    })
                    .then(data => {
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "删除成功"
                            });
                            if (self.okSearchShow == false) {
                                self.getvideoList("");
                            } else {
                                self.getvideoList("1");
                            }
                        }
                    })
                    .catch(msg => {
                        self.$message("服务器异常");
                    });
            },
            //操作接口
            getBatchClick() {
                var self = this;
                self
                    .getvideoupdateVideoState(self.batchObj)
                    .then(data => {
                        if (data.code == 200) {
                            self.$message({
                                type: "success",
                                message: "操作成功"
                            });
                            if (self.okSearchShow == false) {
                                self.getvideoList("");
                            } else {
                                self.getvideoList("1");
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
            //互动数据
            numberClick(index) {
                if (this.dataList[index].totalCount > 0) {
                    this.$router.push({
                        path: "/news/videoNumber"
                    });
                    if (this.okSearchShow) {
                        var objOne = {
                            selOneKeyVal: this.selOneKeyVal,    //是否推荐
                            selTwoKeyVal: this.selTwoKeyVal,    //选择作者/标题
                            authorOrTitleVal: this.authorOrTitleVal,    //标题/作者
                            timeNumOne: this.timeNumOne,    //标准时间戳-开始时间
                            timeNumTwo: this.timeNumTwo,      //标准时间戳-结束时间
                            timeOne: this.timeOne,      //上传时间-开始时间
                            timeTwo: this.timeTwo,      //上传时间-结束时间
                        }
                        var strOne = JSON.stringify(objOne)
                        sessionStorage.setItem('videoSelect', strOne)
                    }
                    var objTwo = {
                        pageSizeNum: this.pageSizeNum,
                        currentPage: this.currentPage
                    }
                    var strTwo = JSON.stringify(objTwo)
                    sessionStorage.setItem('videoPag', strTwo)
                    var objEidt = {
                        videoNumber: this.dataList[index],
                        newsShow: 'video',
                    }
                    var srtEidt = JSON.stringify(objEidt)
                    sessionStorage.setItem("numberComment", srtEidt);
                }
            },
            //查看视频
            videoExamine(index) {
                this.isvideo = 1;
                this.videoSrc = this.dataList[index].content;
            },
            //关闭视频弹出框
            closeVideoClick() {
                this.isvideo = 0;
                this.videoSrc = "";
            },
            ...mapActions(["getVideoSelectPageVideo", "getvideoupdateVideoState"])
        },
        // 监视
        watch: {}
    };
</script>
<style scoped>
    .smallVideo {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .smallVideo>div:nth-child(1) {
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

    .smallVideoFont {
        padding: 0 4px;
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
        width: 15%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(3) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
        position: relative;
    }

    .listContent li>div:nth-child(3) img {
        cursor: pointer;
        width: 50px;
        height: 36px;
    }

    .listContent li>div:nth-child(4) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(5) {
        width: 15%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(6) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .greenFont {
        color: green;
        cursor: pointer;
    }

    .listContent li>div:nth-child(7) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(7) img {
        cursor: pointer;
    }

    .listContent li>div:nth-child(8) {
        width: 10%;
        border-right: 1px solid #e5e7eb;
    }

    .listContent li>div:nth-child(9) {
        width: 10%;
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

    .commonImgBox img {
        cursor: pointer;
    }

    /* 删除弹框 */

    .delPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
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

    .videoBox {
        width: 700px;
        height: 490px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 580px) / 2) auto;
        z-index: 100000;
    }

    .videoBox>div:nth-child(1) {
        width: 700px;
        height: 59px;
        border-bottom: 1px solid #d1d1d1;
        line-height: 59px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        position: relative;
    }

    .closeVideo {
        color: red;
        font-size: 50px;
        position: absolute;
        font-weight: normal;
        top: 0;
        right: 20px;
        transform: rotate(45deg);
        cursor: pointer;
    }

    .videoBox>div:nth-child(2) {
        height: 420px;
        padding: 0 10px;
    }

    video {
        width: 680px;
        height: 410px;
    }

    .stopIcon {
        width: 20px;
        height: 20px;
        background: url(/static/img/stopVideo.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
        cursor: pointer;
    }
</style>