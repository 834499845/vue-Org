<!--账号申诉-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientAccountAppeal">
        <div>
            <div class="listTitle">
                <div>
                    账号申诉
                </div>
                <div>
                </div>
            </div>
            <!-- 筛选 -->    
            <div class="filtrate">
                <div class="selectOne">
                    <select v-model="auditModel" @change="auditChange">
                        <option v-for="(state,index) in auditState" v-bind:value="state.key" :key='state.value'>{{state.value}}</option>
                    </select>
                </div>
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="搜索">
                    <input type="text" placeholder="输入真实姓名和账号" v-model="searchNameVal">
                </div>
                <!-- 日期 -->
                <div class="selectTime">
                    <div>
                        <el-date-picker @change="beginTime" v-model="timeFirst" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker @change="overtime" v-model="timeSecond" type="date" placeholder="请选择日期">
                        </el-date-picker>
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
                            <div title="序号">
                              序号
                            </div>
                            <div title="真实姓名">
                               真实姓名
                            </div>
                            <div title="账号">
                                账号
                            </div>
                            <div title="创建时间">
                                创建时间
                            </div>
                            <div title="更新时间">
                                更新时间
                            </div>
                            <div title="状态">
                                状态
                            </div>
                            <div title="申诉状态">
                                申诉状态
                            </div>
                            <div title="申诉时间">
                                申诉时间
                            </div>
                            <div>
                                操作
                            </div>
                        </li>                       
                        <li class="dataLi" v-for="(item,index) in dataList" :key='index'>
                            <div>
                               {{index+1}}
                            </div>
                            <div>
                                {{item.realName | strFun}}
                            </div>
                            <div>
                                {{item.account | strFun}}
                            </div>
                            <div>
                                {{item.accountCreateDate | timeFun}}
                            </div>
                            <div>
                                {{item.accountUpadteDate | timeFun}}
                            </div>
                            <div>
                                {{item.accountEnable | accountFun}}
                            </div>
                            <div>
                                {{item.appealStatus | auditFun}}
                            </div>
                            <div>
                               {{item.createDate | timeFun}}                               
                            </div>
                            <div class="operation">
                                <div>
                                    <img v-if="item.appealStatus == '0'" src="/static/img/审核.png" @click="checkPendingClick(index)" alt="审核" title="审核">
                                    <img v-else src="/static/img/审核灰.png" @click="auditedClick" alt="已审核" title="已审核">
                                </div>
                                <div>
                                    <img src="/static/img/detail.png" @click="updateClick(index)" alt="查看" title="查看">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 暂无数据 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="图片加载失败">
                        </div>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination" v-show="dataList.length > 0">
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      filterClickTrueOrFalse: true, //控制模糊搜索
      timeFirst: "", // 开始时间Model
      timeSecond: "", // 结束时间Model
      loading: false, // 控制页面加载
      dataList: [], //数据列表
      auditState: [
        { value: "按审核状态", key: "QXZSH" },
        { value: "等待审核", key: "0" },
        { value: "审核通过", key: "1" },
        { value: "审核未通过", key: "2" },
        { value: "申诉撤销", key: "3" }
      ], //审核状态列表
      pageSizeNum: 10, //每页展示条数
      currentPage: 1, //当前页
      totalNum: 1, //总条数
      timeOne: "", // 保存开始时间
      timeTwo: "", // 保存结束时间
      timeNumOne: "", //保存开始时间
      timeNumTwo: "", // 保存结束时间
      auditModel: "QXZSH", //下拉选择审核状态
      auditModels: "", //上传的审核状态
      searchNameVal: "", //输入账户或真实姓名
      searchNameValUp: "" //上传的账户或真实姓名
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    timeFun: function(val) {
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
     // 名称类过滤
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "-";
      }
    },
     // 申诉状态过滤
    auditFun: function(val) {
      if (val == 0) {
        return "待审核";
      } else if (val == 1) {
        return "审核通过";
      } else if (val == 2) {
        return "审核未通过";
      } else if (val == 3) {
        return "撤销审核";
      } else {
        return "—";
      }
    },
    // 账号状态过滤
    accountFun: function(val) {
      if (val == 0) {
        return "正常";
      } else {
        return "禁用";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    if (sessionStorage.getItem("approveCurrentPage")) {
      self.currentPage = Number(sessionStorage.getItem("approveCurrentPage"));
      self.pageSizeNum = Number(sessionStorage.getItem("approvePageSizeNum"));
    }
    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "前台管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("clientSideAccount") == -1) {
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
        if (
          sessionStorage.getItem("searchNameVal") ||
          sessionStorage.getItem("auditModelVal") ||
          (sessionStorage.getItem("timeFirstVal") &&
            sessionStorage.getItem("timeSecondVal"))
        ) {
          if (sessionStorage.getItem("searchNameVal")) {
            self.searchNameValUp = self.searchNameVal = sessionStorage.getItem("searchNameVal");
          }
          if (sessionStorage.getItem("auditModelVal")) {
            self.auditModels = sessionStorage.getItem("auditModelVal");
            self.auditModel = self.auditModels;
          }
          if (
            sessionStorage.getItem("timeFirstVal") &&
            sessionStorage.getItem("timeSecondVal")
          ) {
            self.timeOne = sessionStorage.getItem("timeFirstVal");
            self.timeTwo = sessionStorage.getItem("timeSecondVal");
            self.timeFirst = self.timeOne;
            self.timeSecond = self.timeTwo;
          }
          self.getDataListFun();
        } else {
          self.getDataListFun();
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
  mounted() {},
  // 事件处理
  methods: {
    // 账号申诉列表
    getDataListFun() {
      var self = this;
      sessionStorage.removeItem("approveCurrentPage");
      sessionStorage.removeItem("approvePageSizeNum");
      if (self.filterClickTrueOrFalse == true) {
        self.filterClickTrueOrFalse = false;
        self.getClientSideAppealGetAppealList({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            searchStartDate: self.timeOne,
            searchEndDate: self.timeTwo,
            appealStatus: self.auditModels,
            searchName: self.searchNameValUp
          })
          .then(data => {
            self.filterClickTrueOrFalse = true;
            self.dataList = [];
            if (data.code == 200) {
              if (data.data) {
                self.totalNum = data.data.total;
                if (data.data.records.length > 0) {
                  self.dataList = data.data.records;
                }
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.filterClickTrueOrFalse = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //分页 - 每页条数
    handleSizeChange(val) {
      this.pageSizeNum = val;
      this.getDataListFun();
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataListFun();
    },
    //根据审核状态筛选资料列表
    auditChange() {
      if (this.auditModel == "QXZSH") {
        this.auditModels = "";
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getDataListFun();
      } else {
        this.auditModels = this.auditModel;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getDataListFun();
      }
    },
    // 模糊所搜
    searchClick() {
      var self = this;
      if (self.searchNameVal == "") {
        self.$message({
          type: "info",
          message: "请输入关键字!"
        });
      } else {
        self.searchNameValUp = self.searchNameVal;
        self.getDataListFun();
      }
      sessionStorage.removeItem("searchNameVal");
      sessionStorage.removeItem("auditModelVal");
      sessionStorage.removeItem("timeFirstVal");
      sessionStorage.removeItem("timeSecondVal");
    },
    // 清除
    removeClick() {
      this.auditModels = "";
      this.timeNumOne = "";
      this.timeFirst = "";
      this.timeOne = "";
      this.timeNumTwo = "";
      this.timeSecond = "";
      this.timeTwo = "";
      this.searchNameVal = "";
      this.searchNameValUp = "";
      this.pageSizeNum = 10;
      this.currentPage = 1;
      this.auditModel = "QXZSH";
      this.getDataListFun();
    },
    // 开始时间
    beginTime() {
      this.timeNumOne = Date.parse(this.timeFirst);
      if (this.timeNumOne) {
        if (this.timeNumTwo) {
          if (this.timeNumTwo - this.timeNumOne >= 0) {
            var t = this.timeFirst;
            var y, m, d, mm, dd;
            y = t.getFullYear();
            mm = t.getMonth() + 1;
            dd = t.getDate();
            if (mm > 9) {
              m = mm;
            } else {
              m = "0" + mm;
            }
            if (dd > 9) {
              d = dd;
            } else {
              d = "0" + dd;
            }
            this.timeOne = y + "-" + m + "-" + d;
            //发送请求
            this.currentPage = 1;
            this.getDataListFun();
          } else {
            this.$message({
              type: "info",
              message: "开始时间必须小于结束时间！"
            });
            this.timeOne = this.timeFirst = this.timeNumOne = "";
          }
        } else {
          var t = this.timeFirst;
          var y, m, d, mm, dd;
          y = t.getFullYear();
          mm = t.getMonth() + 1;
          dd = t.getDate();
          if (mm > 9) {
            m = mm;
          } else {
            m = "0" + mm;
          }
          if (dd > 9) {
            d = dd;
          } else {
            d = "0" + dd;
          }
          this.timeOne = y + "-" + m + "-" + d;
          this.currentPage = 1;
          this.getDataListFun();
        }
      } else {
        this.timeNumOne = "";
        this.timeFirst = "";
        this.timeOne = "";
        this.currentPage = 1;
        this.getDataListFun();
      }
    },
    //结束时间
    overtime() {
      this.timeNumTwo = Date.parse(this.timeSecond);
      if (this.timeNumTwo) {
        if (this.timeNumOne) {
          if (this.timeNumTwo - this.timeNumOne >= 0) {
            var t = this.timeSecond;
            var y, m, d, mm, dd;
            y = t.getFullYear();
            mm = t.getMonth() + 1;
            dd = t.getDate();
            if (mm > 9) {
              m = mm;
            } else {
              m = "0" + mm;
            }
            if (dd > 9) {
              d = dd;
            } else {
              d = "0" + dd;
            }
            this.timeTwo = y + "-" + m + "-" + d;
            //发送请求
            this.currentPage = 1;
            this.getDataListFun();
          } else {
            this.timeSecond = "";
            this.timeNumTwo = "";
            this.$message({
              type: "info",
              message: "结束时间不得小于开始时间！"
            });
          }
        } else {
          this.timeSecond = "";
          this.timeNumTwo = "";
          this.$message({
            type: "info",
            message: "请先选择开始时间！"
          });
        }
      }
    },
    //审核
    checkPendingClick(index) {
      var self = this;
      sessionStorage.setItem("id", self.dataList[index].id);
      this.$router.push({
        path: "/clientSide/clientApprove"
      });
    },
    //审核灰
    auditedClick() {
      this.$message({
        type: "info",
        message: "已审核过，不可再操作！"
      });
    },
    //查看
    updateClick(index) {
      var self = this;
      sessionStorage.setItem("id", self.dataList[index].id);
      sessionStorage.setItem("approveCurrentPage", self.currentPage);
      sessionStorage.setItem("approvePageSizeNum", self.pageSizeNum);
      sessionStorage.setItem("searchNameVal", self.searchNameVal);
      sessionStorage.setItem("auditModelVal", self.auditModels);
      sessionStorage.setItem("timeFirstVal", self.timeOne);
      sessionStorage.setItem("timeSecondVal", self.timeTwo);
      self.$router.push({
        path: "/clientSide/clientSeeDetail"
      });
    },
    ...mapActions(["getClientSideAppealGetAppealList"])
  },
  watch: {
    searchNameVal: function(val) {
      var self = this;
      if (val.length == 0) {
        self.searchNameValUp = "";
        self.getDataListFun();
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

.clientAccountAppeal {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.clientAccountAppeal > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 550px;
}

.list > div {
  margin: 0 auto;
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

.listTitle > div:nth-child(1) {
  float: left;
  color: #303030;
  font-size: 16px;
  font-weight: 600;
}

/* 筛选 */

.filtrate {
  width: 100%;
  overflow: hidden;
  height: 74px;
}

.filtrate > div {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

.interval {
  margin-left: 10px;
}

/*第一个下拉框*/

.selectOne {
  width: 15%;
  max-width: 150px;
  min-width: 100px;
}

.selectOne select {
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 93% 12px no-repeat transparent;
  font-size: 14px;
  color: #97a3c3;
  border: 1px solid #d1d1d1;
  overflow: hidden;
  cursor: pointer;
}

.selectOne select::-ms-expand {
  display: none;
}

.searchBox {
  width: 20%;
  min-width: 150px;
  max-width: 210px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
}

.searchBox input {
  width: 85%;
  /* width: 100px; */
  border: none;
  height: 26px;
}

.searchBox input::-webkit-input-placeholder {
  color: #97a3c3;
}

.searchBox input:-moz-input-placeholder {
  color: #97a3c3;
}

.searchBox input::-moz-input-placeholder {
  color: #97a3c3;
}

.searchBox input:-ms-input-placeholder {
  color: #97a3c3;
}

.filtrateOk {
  width: 70px;
  height: 32px;
  background: #5acdfa;
  text-align: center;
  line-height: 32px;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
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
}

.selectTime > div {
  float: left;
}

.selectTime > div:nth-child(1),
.selectTime > div:nth-child(3) {
  width: 100px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  position: relative;
}

.selectTime > div:nth-child(1) > div,
.selectTime > div:nth-child(3) > div {
  position: absolute;
  top: -1px;
  left: -6px;
}

.selectTime > div:nth-child(2) {
  height: 32px;
}

.selectTime div {
  margin: 0 4px;
}

/*暂无数据*/

.noList {
  height: 400px;
}

.noList > div:nth-child(1) {
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

.listContent li > div:nth-child(1) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
  min-width: 10%;
}

.listContent li > div:nth-child(2) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(3) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(4) {
  width: 12%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(5) {
  width: 12%;
  border-right: 1px solid #e5e7eb;
  cursor: pointer;
}

.listContent li > div:nth-child(6) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(7) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(8) {
  width: 13%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(9) {
  width: 13%;
  border-right: 1px solid #e5e7eb;
}

.listContentTop > div {
  font-size: 17px;
  font-weight: bold;
  color: #303030;
  background: #f2f4f8;
}

.operation {
  display: flex;
  justify-content: center;
}

.operation div {
  padding: 0 10px;
}

.operation div img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

/*批量删除*/

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.dataLi > div:nth-child(3) span,
.dataLi > div:nth-child(6) span {
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

.listContent li > div:nth-child(1),
.listContent li > div:nth-child(2),
.listContent li > div:nth-child(3),
.listContent li > div:nth-child(4),
.listContent li > div:nth-child(5),
.listContent li > div:nth-child(6),
.listContent li > div:nth-child(7),
.listContent li > div:nth-child(8),
.listContent li > div:nth-child(9) {
  overflow: hidden;
  padding: 0 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>