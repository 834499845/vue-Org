<!--圈子管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="circle">
        <div>
            <div class="listTitle">
                <div>
                    圈子管理
                </div>
                <div>
                </div>
            </div>
            <!-- 筛选 -->    
            <div class="filtrate">
                <div class="selectOne">
                    <select v-model="auditModel" @change="auditChg">
                        <option v-for="(type,index) in docstate" v-bind:value="type.key" :key='type.value'>{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="输入后开始搜索" v-model="personOrCircleModel" maxlength="50">
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
                <div class="filtrateOk interval" @click="personOrCircleChgClick">
                    确定
                </div>
                <div class="filtrateOk interval delfiltrateOk" @click="personOrCircleCDeleteClick">
                    清除
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div title="序号">
                                <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                <span>序号</span>
                            </div>
                            <div title="圈子名称">
                                圈子名称
                            </div>
                            <div title="类型">
                                类型
                            </div>
                            <div title="分类">
                                分类
                            </div>
                            <div title="圈主">
                                圈主
                            </div>
                            <div title="手机号">
                                手机号
                            </div>
                            <div title="创建时间">
                                创建时间
                            </div>
                            <div title="动态">
                                动态
                            </div>
                            <div title="状态">
                                状态
                            </div>
                            <div title="推荐">
                              推荐
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
                        <li class="dataLi" v-for="(item,index) in dataList" :key='item.name'>
                            <div>
                                <div>
                                    <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                        <el-checkbox :label="item" :key="item.id">{{index + 1}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div>
                                {{item.circleName}}
                            </div>
                            <div>
                                {{item.circleType | typeFun}}
                            </div>
                            <div>
                                {{item.assortmentName}}
                            </div>
                            <div>
                                <span @click="datumClick(index)">
                                    {{item.creatorName}}
                                </span>
                            </div>
                            <div>
                                {{item.telPhone | lFun}}
                            </div>
                            <div>
                                {{item.createDate | ctimeFun}}
                            </div>
                            <div>
                                <span @click="dynamicStateClick(index)">
                                    {{item.dynamicNum}}
                                </span>
                            </div>
                            <div>
                                {{item.state|sFun}}
                            </div>
                            <div>
                              <img @click="openOrCloseClick(index)" v-show="item.commonState == 1" src="/static/img/blue.png">
                              <img @click="openOrCloseClick(index)" v-show="item.commonState == 0" src="/static/img/closeBlue.png">
                            </div>
                            <div class="operation">
                                <div>
                                    <img v-if="item.state == 0" src="/static/img/审核.png" @click="operationClick(index)" alt="审核" title="审核">
                                    <img v-else src="/static/img/审核灰.png" @click="operationNoClick" alt="已审核" title="已审核">
                                </div>
                                <div>
                                    <img src="/static/img/删除.png" @click="delClick(index)" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部删除/分页 -->
                    <div class="lastLidel" v-show="dataList.length > 0">
                        <div class="batchDelete" @click="batchDelClick">
                            批量删除
                        </div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{showdel:isShowdel}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="okDelClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
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
      getCircle: true,
      okdelclick: true,
      openorcloseclick: true,
      personorcirclechgclick: true,
      timeFirst: "",
      timeSecond: "",
      loading: false,
      dataList: [],
      docstate: [
        { value: "按审核状态", key: "QXZSH" },
        { value: "未审核", key: "0" },
        { value: "审核通过", key: "1" },
        { value: "审核未通过", key: "2" }
      ], //下拉框
      levs: [
        { value: "按筛选方式", key: "QXZSC" },
        { value: "圈主", key: "QZ" },
        { value: "圈子名称", key: "QZMC" }
      ],
      checked: false, //选取全部序号
      checkList: [], //序号选取
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 1,
      isShowdel: true,
      titlename: "",
      timeOne: "",
      timeTwo: "",
      timeNumOne: "",
      timeNumTwo: "",
      auditModel: "QXZSH", //下拉选择审核状态
      auditModels: "", //上传的审核状态
      personOrCircleModel: "", //输入框人或者圈子
      personOrCircleChgShow: false, //判断是否筛选
      idstring: "", //id多选
      iscurrentPage: "", //删除后应该为的页码
      idstring: "", //删除id 集合
      ifGetList: true,
      dataTrue: false,
      userId: "", //圈主Id
      circleUser: [], //圈主资料列表
      circleId: "" //圈子Id
    };
  },
  // 过滤
  filters: {
    //  类型过滤
    typeFun: function(val) {
      if (val == 1) {
        return "普通圈";
      } else {
        return "医生圈";
      }
    },
    // 返回日期格式化
    ctimeFun: function(val) {
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
    lFun: function(val) {
      if (val) {
        return val;
      } else {
        return "暂无数据";
      }
    },
    sFun: function(val) {
      if (val) {
        switch (val) {
          case "0":
            return "未审核";
            break;
          case "1":
            return "审核通过";
            break;
          case "2":
            return "审核未通过";
            break;
          default:
            break;
        }
      } else {
        return "暂无信息";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    if (sessionStorage.getItem("circleCurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("circleCurrentPage"));
    }
    if (sessionStorage.getItem("circlePageSizeNum")) {
      this.pageSizeNum = Number(sessionStorage.getItem("circlePageSizeNum"));
    }
    if (
      sessionStorage.getItem("circleTimeFirst") &&
      sessionStorage.getItem("circleTimeSecond")
    ) {
      this.timeNumOne = Number(sessionStorage.getItem("circleTimeFirst"));
      this.timeNumTwo = Number(sessionStorage.getItem("circleTimeSecond"));
      var t = this.timeNumOne;
      var ts = this.timeNumTwo;
      var td = new Date(t);
      var tsd = new Date(ts);
      this.timeFirst = td;
      this.timeSecond = tsd;
      var y, m, d, mm, dd;
      y = td.getFullYear();
      mm = td.getMonth() + 1;
      dd = td.getDate();
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
      var ys, ms, ds, mms, dds;
      ys = tsd.getFullYear();
      mms = tsd.getMonth() + 1;
      dds = tsd.getDate();
      if (mms > 9) {
        ms = mms;
      } else {
        ms = "0" + mms;
      }
      if (dds > 9) {
        ds = dds;
      } else {
        ds = "0" + dds;
      }
      this.timeTwo = ys + "-" + ms + "-" + ds;
    }
    if (sessionStorage.getItem("circleAudit")) {
      this.auditModel = sessionStorage.getItem("circleAudit");
      if (this.auditModel == "QXZSH") {
        this.auditModels = "";
      } else {
        this.auditModels = this.auditModel;
      }
    }
    if (sessionStorage.getItem("personOrCircleModel")) {
      this.personOrCircleModel = sessionStorage.getItem("personOrCircleModel");
    }

    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("circle") == -1) {
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
        this.getcircle();
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
  mounted() {},
  // 事件处理
  methods: {
    //圈子管理-分页
    getcircle() {
      this.ifGetList = false;
      var self = this;
      self.checkList = [];
      self.checked = false;
      self.loading = true;
      sessionStorage.removeItem("circleCurrentPage");
      sessionStorage.removeItem("circlePageSizeNum");
      sessionStorage.removeItem("circleTimeFirst");
      sessionStorage.removeItem("circleTimeSecond");
      sessionStorage.removeItem("circleAudit");
      sessionStorage.removeItem("personOrCircleModel");
      if (self.getCircle == true) {
        self.getCircle = false;
        self
          .getMedicalcirclefindCircleListByCondition({
            pageNo: self.currentPage, // 页码
            pageSize: self.pageSizeNum, // 每页显示条数
            state: self.auditModels, // 审核状态
            beginDate: self.timeOne, //开始时间
            endDate: self.timeTwo, //结束时间
            serachStr: self.personOrCircleModel //关键字
          })
          .then(data => {
            self.getCircle = true;
            self.loading = false;
            //console.log("圈子管理列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length == 0) {
                    self.dataList = [];
                  } else {
                    self.dataList = data.data.records;
                    self.totalNum = data.data.total;
                  }
                } else {
                  self.dataList = [];
                }
              } else {
                self.dataList = [];
              }
            } else {
              self.loading = false;
              self.getCircle = true;
              self.$message({
                type: "info",
                message: data.message
              });
            }
            self.ifGetList = true;
          })
          .catch(msg => {
            // //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
            self.ifGetList = true;
            self.loading = false;
          });
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSizeNum = val;
      this.getcircle();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcircle();
    },
    //设为推荐打开
    openOrCloseClick(index) {
      if (this.dataList[index].commonState == 0) {
        this.dataList[index].commonState = 1;
      } else if (this.dataList[index].commonState == 1) {
        this.dataList[index].commonState = 0;
      }
      var self = this;
      self.circleId = self.dataList[index].id;
      if (self.openorcloseclick == true) {
        // self.openorcloseclick = false
        //console.log(self.openorcloseclick);
        self
          .getMedicalcirclecheck({
            id: self.circleId,
            commonState: this.dataList[index].commonState
          })
          .then(data => {
            self.openorcloseclick = true;
            //console.log(self.openorcloseclick);
            if (data.code == 200) {
              self.getcircle();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.openorcloseclick = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //根据审核状态筛选圈子
    auditChg() {
      if (this.auditModel == "QXZSH") {
        this.auditModels = "";
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getcircle();
      } else {
        this.auditModels = this.auditModel;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getcircle();
      }
    },
    //模糊所搜
    personOrCircleChgClick() {
      var self = this;
      self.dataTrue = true;
      if (self.dataTrue == true) {
        self.dataTrue = false;
        // //console.log(self.auditModel)
        if (
          self.auditModel == "QXZSH" &&
          self.personOrCircleModel.length == 0 &&
          self.timeFirst.length == 0 &&
          self.timeSecond.length == 0
        ) {
          self.getcircle();
        } else {
          //列表
          var searchObj = {
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum
          };
          if (self.personOrCircleModel.length > 0) {
            searchObj.searchStr = self.personOrCircleModel;
          }
          if (self.auditModel != "QXZSH") {
            searchObj.state = self.auditModel;
          }
          if (self.timeOne.length > 0) {
            searchObj.beginDate = self.timeOne;
          }
          if (self.timeTwo.length > 0) {
            searchObj.endDate = self.timeTwo;
          }
          if (self.personorcirclechgclick == true) {
            self.personorcirclechgclick = false;
            //  //console.log("111")
            self
              .getMedicalcirclefindCircleListByCondition(searchObj)
              .then(data => {
                self.personorcirclechgclick = true;
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length == 0) {
                        self.dataList = [];
                      } else {
                        self.dataList = data.data.records;
                        self.totalNum = data.data.total;
                      }
                    } else {
                      self.dataList = [];
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
              })
              .catch(msg => {
                self.personorcirclechgclick = true;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        }
      } else {
      }
    },
    personOrCircleCDeleteClick() {
      this.auditModels = "";
      this.timeNumOne = "";
      this.timeFirst = "";
      this.timeOne = "";
      this.timeNumTwo = "";
      this.timeSecond = "";
      this.timeTwo = "";
      this.personOrCircleModel = "";
      this.pageSizeNum = 10;
      this.currentPage = 1;
      this.auditModel = "QXZSH";
      this.getcircle();
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
            this.getcircle();
          } else {
            this.$message({
              type: "info",
              message: "开始时间必须大于结束时间！"
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
          this.getcircle();
        }
      } else {
        this.timeNumOne = "";
        this.timeFirst = "";
        this.timeOne = "";
        this.currentPage = 1;
        this.getcircle();
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
            this.getcircle();
          } else {
            this.timeTwo = "";
            this.timeSecond = "";
            this.timeNumTwo = "";
            this.$message({
              type: "info",
              message: "结束时间不得小于开始时间！"
            });
          }
        } else {
          var t = this.timeNumTwo;
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
          this.currentPage = 1;
          this.getcircle();
        }
      } else {
        this.timeNumTwo = "";
        this.timeSecond = "";
        this.timeTwo = "";
        this.currentPage = 1;
        this.getcircle();
        // this.$message({
        //   type: 'info',
        //   message: '请先选择开始时间'
        // })
      }
    },
    //点击名字跳转详情
    datumClick(index) {
      var self = this;
      sessionStorage.setItem("circleuserId", self.dataList[index].userId);
      this.$router.push({
        path: "/medical/figureDatum"
      });
    },
    //点击动态跳转动态列表
    dynamicStateClick(index) {
      if (this.dataList[index].dynamicNum > 0) {
        var self = this;
        sessionStorage.setItem("circleCurrentPage", self.currentPage);
        sessionStorage.setItem("circlePageSizeNum", self.pageSizeNum);
        sessionStorage.setItem("circleTimeFirst", self.timeNumOne);
        sessionStorage.setItem("circleTimeSecond", self.timeNumTwo);
        sessionStorage.setItem("personOrCircleModel", self.personOrCircleModel);
        sessionStorage.setItem("circleAudit", self.auditModel);
        let dyndata = JSON.stringify(this.dataList[index]);
        sessionStorage.setItem("dyndata", dyndata);
        this.$router.push({
          path: "/medical/dynamicState"
        });
      } else {
        this.$message({
          type: "info",
          message: "暂无动态！"
        });
      }
    },
    //审核
    operationClick(index) {
      var self = this;
      sessionStorage.setItem("circleCurrentPage", self.currentPage);
      sessionStorage.setItem("circlePageSizeNum", self.pageSizeNum);
      sessionStorage.setItem("circleTimeFirst", self.timeNumOne);
      sessionStorage.setItem("circleTimeSecond", self.timeNumTwo);
      sessionStorage.setItem("circleAudit", self.auditModel);
      sessionStorage.setItem("personOrCircleModel", self.personOrCircleModel);
      let chedata = JSON.stringify(this.dataList[index]);
      sessionStorage.setItem("chedata", chedata);
      this.$router.push({
        path: "/medical/circleCheck"
      });
    },
    //审核灰
    operationNoClick() {
      this.$message({
        type: "info",
        message: "已审核过，不可再操作！"
      });
    },
    //选取全部序号
    numChange(event) {
      this.checkList = event.target.checked ? this.dataList : [];
      var a = this.checkList.map(function(data) {
        return data.id;
      });
      var string = JSON.stringify(a);
      this.idstring = string;
    },
    //序号选取
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.dataList.length;
      var a = this.checkList.map(function(data) {
        return data.id;
      });
      var string = JSON.stringify(a);
      this.idstring = string;
    },
    //批量删除
    batchDelClick() {
      if (this.checkList.length > 0) {
        this.isShowdel = false;
        this.titlename = "这些圈子将被删除，该操作无法恢复！";
      } else {
        this.$message({
          type: "info",
          message: "请先选择序号！"
        });
      }
      if (this.dataList.length - this.checkList.length > 0) {
        this.iscurrentPage = this.currentPage;
      } else {
        if ((this.currentPage = 1)) {
          this.iscurrentPage = 1;
        } else if (this.currentPage > 1) {
          this.iscurrentPage = this.currentPage - 1;
        }
      }
    },
    //删除弹框
    delClick(index) {
      this.isShowdel = false;
      this.titlename = "该圈子将被删除，该操作无法恢复！";
      var cancelId = this.dataList[index].id;
      var string = JSON.stringify(cancelId);
      this.idstring = "[" + string + "]";
      if (this.dataList.length == 1) {
        if (this.currentPage == 1) {
          this.iscurrentPage = 1;
        } else if (this.currentPage > 1) {
          this.iscurrentPage = this.currentPage - 1;
        }
      } else {
        this.iscurrentPage = this.currentPage;
      }
    },
    //确认删除
    okDelClick() {
      var self = this;
      if (this.okdelclick == true) {
        this.okdelclick = false;
        self
          .getcancelfigureDatum({
            idJson: self.idstring
          })
          .then(data => {
            this.okdelclick = true;
            // //console.log("圈子删除", data);
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功！"
              });
              if (this.dataList.length == 1) {
                if (this.currentPage == 1) {
                  this.currentPage = 1;
                } else if (this.currentPage > 1) {
                  this.currentPage = this.currentPage - 1;
                }
              } else {
                this.currentPage = this.currentPage;
              }
              self.getcircle();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            this.okdelclick = true;
            // //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }

      this.isShowdel = true;
    },
    //取消删除
    canleClick() {
      this.isShowdel = true;
    },
    ...mapActions([
      "getcircleList",
      "getcancelfigureDatum",
      "getMedicalcirclefindCircleListByCondition",
      "getMedicalcirclecheck",
      "getMedicalcirclefindCircleListByCondition"
    ])
  },
  watch: {
    personOrCircleModel: function(val) {
      var self = this;
      self.getcircle();
    }
  }
};
</script>
<style scoped>
/*主页*/

.circle {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.circle > div:nth-child(1) {
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
  padding-left: 5px;
  color: #97a8be;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 93% 12px no-repeat transparent;
  font-size: 14px;
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
  color: #97a8be;
}

.searchBox input:-moz-input-placeholder {
  color: #97a8be;
}

.searchBox input::-moz-input-placeholder {
  color: #97a8be;
}

.searchBox input:-ms-input-placeholder {
  color: #97a8be;
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
  width: 8%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(4) {
  width: 8%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(5) {
  width: 10%;
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
  width: 5%;
  border-right: 1px solid #e5e7eb;
  min-width: 5%;
}

.listContent li > div:nth-child(9) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(10) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(11) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(12) {
  width: 10%;
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

.lastLidel {
  display: flex;
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

.listContent li > div:nth-child(2),
.listContent li > div:nth-child(3),
.listContent li > div:nth-child(4),
.listContent li > div:nth-child(5),
.listContent li > div:nth-child(6),
.listContent li > div:nth-child(7) {
  overflow: hidden;
  padding: 0 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>