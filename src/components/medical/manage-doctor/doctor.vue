<!--医生管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    医生管理
                </div>
                <div @click="addCommClick">
                    新增医生
                </div>
            </div>
            <!-- 筛选 -->
            <div class="screen">
                <div class="screenSele" @change="docstateChag">
                    <select v-model="docstateSelect">
                        <option v-for="(type,index) in docstate" v-bind:value="type.key">{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" v-model="searchDoctor" maxlength="10" placeholder="输入后开始搜索">
                </div>
                <div class="filtrateOk" @click="screenOkClick">
                    确定
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div title="序号">
                                序号
                            </div>
                            <div title="医生名称">
                                医生名称
                            </div>
                            <div title="医院/科室">
                                医院/科室
                            </div>
                            <div title="级别">
                                级别
                            </div>
                            <div title="接诊数量">
                                接诊数量
                            </div>
                            <div title="被咨询次数">
                                被咨询次数
                            </div>
                            <div title="好评率">
                                好评率
                            </div>
                            <div title="排序">
                                排序
                            </div>
                            <div title="状态">
                                状态
                            </div>
                            <div title="操作">
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <li class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="dataLi" v-for="(item,index) in dataLists" :key="item.sort">
                            <div>
                                {{index+1}}
                            </div>
                            <div>
                                <span @click="docNameClick(index)">
                                    {{item.doctorName}}
                                </span>
                            </div>
                            <div :title="(item.hospitalName)+(item.department)">
                                {{item.hospitalName}} /{{item.department}}
                            </div>
                            <div :title="item.doctorLevel">
                                {{item.doctorLevel}}
                            </div>
                            <div :title="item.appointmentNumber">
                                <span @click="diagnoseClick(index)">
                                    {{item.appointmentNumber}}
                                </span>
                            </div>
                            <div :title="item.advisoryNumber">
                                {{item.advisoryNumber}}
                            </div>
                            <div :title="item.highPraise">
                                {{item.highPraise}}
                            </div>
                            <div class="opexu">
                                <div>
                                    <img @click="upRankClick(index)" v-show="index != 0" src="/static/img/up.png" alt="向上排序" title="向上排序">
                                    <img @click="grayupIndexClick" v-show="index == 0" src="/static/img/grayup.png" alt="不可排序" title="不可排序">
                                </div>
                                <div>
                                    <img @click="downRankClick(index)" v-show=" index+1 != dataLists.length" src="/static/img/down.png" alt="向下排序" title="向下排序">
                                    <img @click="graydownIndexClick" v-show=" index+1 == dataLists.length" src="/static/img/grayup.png" alt="不可排序" title="向下排序">
                                </div>
                            </div>
                            <div :title="item.doctorState|StateFun">
                                {{item.doctorState|StateFun}}
                            </div>
                            <div class="operate">
                                <div>
                                    <img v-if="item.doctorState == '0' " @click="checkClick(index)" src="/static/img/审核.png" alt="审核" title="审核">
                                    <img v-else @click="checkNoClick(index)" src="/static/img/审核灰.png" alt="审核灰" title="查看详情">
                                </div>
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div>
                                    <img @click="recycleClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部分页 -->
                    <div class="lastLi" v-show="dataLists.length > 0">
                        <div>
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
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
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
      upordownrank: true,
      okclick: true,
      searchDoctor: "", //搜索医生关键字
      docstateSelect: "QXZ", //审核状态下拉列表
      doctorState: "", //筛选上传的审核状态
      loading: false,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      sStates: ["所有状态", "A状态"],
      sTypes: ["所有分类", "A分类"],
      dataLists: [], //    医生列表
      docstate: [
        { value: "请选择", key: "QXZ" },
        { value: "未审核", key: "0" },
        { value: "审核通过", key: "1" },
        { value: "未通过", key: "2" },
        { value: "无需审核", key: "3" },
        { value: "审核通过/无需审核", key: "4" }
      ],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 10,
      flag: true,
      objstr: [],
      ifGetList: true,
      searchDoctorUp: "", //上传的关键字
      screenOkShow: false //判断是否进行了确认筛选
    };
  },
  // 过滤
  filters: {
    StateFun: function(val) {
      if (val == 0) {
        return "未审核";
      }
      if (val == 1) {
        return "审核通过";
      }
      if (val == 2) {
        return "未通过";
      }
      if (val == 3) {
        return "无需审核";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    if (sessionStorage.getItem("DocCurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("DocCurrentPage"));
    }
    if (sessionStorage.getItem("doctorSelect")) {
      this.docstateSelect = sessionStorage.getItem("doctorSelect");
      if (this.docstateSelect == "QXZ") {
        this.doctorState = "";
      } else if (this.docstateSelect == "0") {
        this.doctorState = "0";
      } else if (this.docstateSelect == "1") {
        this.doctorState = "1";
      } else if (this.docstateSelect == "2") {
        this.doctorState = "2";
      } else if (this.docstateSelect == "3") {
        this.doctorState = "3";
      } else if (this.docstateSelect == "4") {
        this.doctorState = "4";
      }
    }
    if (sessionStorage.getItem("searchDoctorFont")) {
      this.searchDoctorUp = this.searchDoctor = sessionStorage.getItem(
        "searchDoctorFont"
      );
      this.screenOkShow = true;
    }
    if (sessionStorage.getItem("doctorPageSizeNum")) {
      this.pageSizeNum = Number(sessionStorage.getItem("doctorPageSizeNum"));
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
      //console.log("arrs", arrs);
      if (arrs.indexOf("doctor") == -1) {
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
        this.doctorList();
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
    //获取医生管理列表
    doctorList() {
      //console.log("获取列表", this.ifGetList);
      var self = this;
      self.loading = true;
      self.ifGetList = false;
      sessionStorage.removeItem("DocCurrentPage");
      sessionStorage.removeItem("doctorSelect");
      sessionStorage.removeItem("searchDoctorFont");
      sessionStorage.removeItem("doctorPageSizeNum");
      self
        .getdoctorLists({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          searchStr: self.searchDoctorUp,
          doctorState: self.doctorState
        })
        .then(data => {
          self.loading = false;
          //console.log("医生管理列表", data);
          if (data.code == 200) {
            self.dataLists = [];
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length == 0) {
                  self.dataLists = [];
                } else {
                  self.dataLists = data.data.records;
                  self.totalNum = data.data.total;
                }
              } else {
                self.dataLists = [];
              }
            } else {
              self.dataLists = [];
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
          self.ifGetList = true;
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常！"
          });
          self.loading = false;
          self.ifGetList = true;
        });

      //console.log("sssssssss", this.ifGetList);
    },
    //审核状态下拉列表
    docstateChag() {
      if (this.docstateSelect == "QXZ") {
        this.doctorState = "";
      } else if (this.docstateSelect == "0") {
        this.doctorState = "0";
      } else if (this.docstateSelect == "1") {
        this.doctorState = "1";
      } else if (this.docstateSelect == "2") {
        this.doctorState = "2";
      } else if (this.docstateSelect == "3") {
        this.doctorState = "3";
      } else if (this.docstateSelect == "4") {
        this.doctorState = "4";
      } else {
        this.doctorState = "";
      }
      this.currentPage = 1;
      this.pageSizeNum = 10;
      this.doctorList();
    },
    //关键字搜索
    screenOkClick() {
      if (this.searchDoctor == "") {
        this.$message({
          type: "info",
          message: "请先输入关键字!"
        });
      } else {
        if (this.docstateSelect == "QXZ") {
          this.doctorState = "";
        } else if (this.docstateSelect == "0") {
          this.doctorState = "0";
        } else if (this.docstateSelect == "1") {
          this.doctorState = "1";
        } else if (this.docstateSelect == "2") {
          this.doctorState = "2";
        } else if (this.docstateSelect == "3") {
          this.doctorState = "3";
        } else if (this.docstateSelect == "4") {
          this.doctorState = "4";
        } else {
          this.doctorState = "";
        }
        if (this.ifGetList == true) {
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.screenOkShow = true;
          this.searchDoctorUp = this.searchDoctor;
          this.doctorList();
        } else {
          this.$message({
            type: "info",
            message: "数据请求中，请稍后！"
          });
        }
      }
    },
    // 禁止向上
    grayupIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于第一位不支持向上排序!"
      });
    },
    // 禁止向下
    graydownIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于最后一位不支持向下排序!"
      });
    },
    //向上排序
    upRankClick(index) {
      if (index == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        var self = this;
        var arrs = self.dataLists;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, doctorSort: ele.doctorSort });
        });
        self.oneObj = [];
        self.twoObj = [];
        self.oneObj.push({
          id: self.dataLists[index].id,
          doctorSort: self.dataLists[index - 1].doctorSort
        });
        self.twoObj.push({
          id: self.dataLists[index - 1].id,
          doctorSort: self.dataLists[index].doctorSort
        });
        //console.log("11111", self.oneObj[0]);
        //console.log("22222", self.twoObj[0]);
        ups.splice(index, 1, self.twoObj[0]);
        ups.splice(index - 1, 1, self.oneObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, doctorSort: ele.doctorSort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.upOrDownRank();
      }
    },
    //向下排序
    downRankClick(index) {
      if (index + 1 == this.dataLists.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        var self = this;
        var arrs = self.dataLists;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, doctorSort: ele.doctorSort });
        });
        self.oneObj = [];
        self.twoObj = [];
        self.oneObj.push({
          id: self.dataLists[index + 1].id,
          doctorSort: self.dataLists[index].doctorSort
        });
        self.twoObj.push({
          id: self.dataLists[index].id,
          doctorSort: self.dataLists[index + 1].doctorSort
        });
        //console.log("11111", self.oneObj[0]);
        //console.log("22222", self.twoObj[0]);
        ups.splice(index + 1, 1, self.twoObj[0]);
        ups.splice(index, 1, self.oneObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, doctorSort: ele.doctorSort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.upOrDownRank();
      }
    },
    // 排序接口
    upOrDownRank() {
      var self = this;
      if (self.upordownrank == true) {
        self.upordownrank = false;
        self
          .getDoctorSort({
            doctorSortJson: self.objstr
          })
          .then(data => {
            self.upordownrank = true;
            //console.log("排序", data);
            if (data.code == 200) {
              self.doctorList();
            } else {
              this.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.upordownrank = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }
    },
    // 点击分页
    handleSizeChange(val) {
      this.pageSizeNum = val;
      if (this.screenOkShow) {
        this.searchDoctorUp = this.searchDoctor;
      } else {
        this.searchDoctorUp = "";
      }
      this.doctorList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.screenOkShow) {
        this.searchDoctorUp = this.searchDoctor;
      } else {
        this.searchDoctorUp = "";
      }
      this.doctorList();
    },
    // 修改医生信息
    updateClick(index) {
      let eDocData = JSON.stringify(this.dataLists[index]);
      sessionStorage.setItem("DocCurrentPage", this.currentPage);
      sessionStorage.setItem("doctorSelect", this.docstateSelect);
      sessionStorage.setItem("searchDoctorFont", this.searchDoctorUp);
      sessionStorage.setItem("doctorPageSizeNum", this.pageSizeNum);
      sessionStorage.setItem("eDocData", eDocData);
      this.$router.push({
        path: "/medical/doctorEdit"
      });
    },
    // 删除信息
    recycleClick(index) {
      this.titlename = "该医生将被删除，该操作无法恢复！";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 新增医生信息
    addCommClick() {
      this.$router.push({
        path: "/medical/doctorAdd"
      });
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okclick == true) {
        self.okclick = false;
        self
          .getdeldoctor({
            idJson: "['" + self.dataLists[self.delIndex].id + "']"
          })
          .then(data => {
            self.okclick = true;
            //console.log("删除", data);
            if (data.code == 200) {
              self.$message ({
                type: "success",
                message: "删除成功!"
              })
              if (self.dataLists.length == 1) {
                if (self.currentPage == 1) {
                  self.currentPage = 1;
                } else if (self.currentPage > 1) {
                  self.currentPage = self.currentPage - 1;
                }
              }
              this.isShowdel = true;
              this.delShow = false; 
              self.doctorList();
            } else {
              this.isShowdel = true;
              this.delShow = false;
              this.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okclick = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //医生名字点击
    docNameClick(index) {
      sessionStorage.setItem("DocCurrentPage", this.currentPage);
      sessionStorage.setItem("doctorSelect", this.docstateSelect);
      sessionStorage.setItem("searchDoctorFont", this.searchDoctorUp);
      sessionStorage.setItem("doctorPageSizeNum", this.pageSizeNum);
      //发送请求 返回成功后再跳转
      let dotdata = JSON.stringify(this.dataLists[index]);
      sessionStorage.setItem("dotdata", dotdata);
      this.$router.push({
        path: "/medical/doctorDetails"
      });
    },
    //接诊数量
    diagnoseClick(index) {
      if (this.dataLists[index].appointmentNumber == 0) {
        this.$message({
          type: "info",
          message: "暂无接诊！"
        });
      } else {
        sessionStorage.setItem("DocCurrentPage", this.currentPage);
        sessionStorage.setItem("doctorSelect", this.docstateSelect);
        sessionStorage.setItem("searchDoctorFont", this.searchDoctorUp);
        sessionStorage.setItem("doctorPageSizeNum", this.pageSizeNum);
        let diadata = JSON.stringify(this.dataLists[index]);
        sessionStorage.setItem("diadata", diadata);
        this.$router.push({
          path: "/medical/doctorDiagnose"
        });
      }
    },
    //医生审核
    checkClick(index) {
      let chdata = JSON.stringify(this.dataLists[index]);
      sessionStorage.setItem("chdata", chdata);
      sessionStorage.setItem("DocCurrentPage", this.currentPage);
      sessionStorage.setItem("doctorSelect", this.docstateSelect);
      sessionStorage.setItem("doctorPageSizeNum", this.pageSizeNum);
      sessionStorage.setItem("searchDoctorFont", this.searchDoctorUp);
      this.$router.push({
        path: "/medical/doctorCheck"
      });
      let checkData = JSON.parse(chdata);

      sessionStorage.setItem("doctorState", checkData.doctorState);
    },
    //灰色审核
    checkNoClick(index) {
      // this.$message({
      //   type: "info",
      //   message: "已审核过！"
      // });
      let chdata = JSON.stringify(this.dataLists[index]);
      sessionStorage.setItem("chdata", chdata);
      sessionStorage.setItem("DocCurrentPage", this.currentPage);
      sessionStorage.setItem("doctorSelect", this.docstateSelect);
      sessionStorage.setItem("doctorPageSizeNum", this.pageSizeNum);
      sessionStorage.setItem("searchDoctorFont", this.searchDoctorUp);
      let checkData = JSON.parse(chdata);
      sessionStorage.setItem("doctorState", checkData.doctorState);
      this.$router.push({
        path: "/medical/doctorCheck"
      });

      //console.log(checkData.doctorState);
      // sessionStorage.getItem("doctorState",checkData.doctorState)
    },
    ...mapActions(["getdoctorLists", "getdeldoctor", "getDoctorSort"])
  },
  // 监视
  watch: {
    searchDoctor: function(val) {
      if (val.length == 0) {
        if (this.screenOkShow) {
          (this.pageSizeNum = 10),
            (this.currentPage = 1),
            (this.screenOkShow = false);
          this.searchDoctorUp = "";
          this.doctorList();
        }
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

.list .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

/*主页*/

.sale {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 150px;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.glyphicon-ok {
  color: green;
  font-size: 17px;
}

.glyphicon-remove {
  color: red;
  font-size: 17px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
}

.dataLi .opexu {
  display: flex;
  align-items: center;
}

.dataLi .opexu > div {
  margin: 0 0 0 10px;
}

.opexu img {
  width: 25px;
  cursor: pointer;
  height: 25px;
}

.dataLi .operate {
  display: flex;
  align-items: center;
}

.dataLi .operate > div {
  margin: 0 10px;
}

.operate img {
  width: 25px;
  cursor: pointer;
  height: 25px;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  font-size: 14px;
  color: #515151;
  line-height: 49px;
  padding: 0 7px;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.dataLi span {
  display: inline-block;
  color: green;
  cursor: pointer;
}

.listCont li {
  display: flex;
  height: 50px;
}

.listCont li > div:nth-child(1) {
  width: 6%;
  overflow: hidden;
  min-width: 50px;
}

.listCont li > div:nth-child(2) {
  width: 10%;
  overflow: hidden;
  min-width: 60px;
}

.listCont li > div:nth-child(3) {
  width: 20%;
  min-width: 60px;
}

.listCont li > div:nth-child(4) {
  width: 10%;
  min-width: 60px;
}

.listCont li > div:nth-child(5) {
  width: 8%;
  min-width: 60px;
}

.listCont li > div:nth-child(6) {
  width: 8%;
  min-width: 60px;
}

.listCont li > div:nth-child(7) {
  width: 8%;
  min-width: 50px;
}

.listCont li > div:nth-child(8) {
  width: 8%;
  min-width: 90px;
}

.listCont li > div:nth-child(9) {
  width: 8%;
  min-width: 70px;
}

.listCont li > div:nth-child(10) {
  width: 14%;
  min-width: 140px;
}

.list {
  min-height: 540px;
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

.listTitle > div:nth-child(2) {
  float: right;
  width: 80px;
  height: 26px;
  border: 1px solid #5acdfa;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #5acdfa;
  cursor: pointer;
}

.menu {
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menuLeft {
  display: flex;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 23px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  font-size: 14px;
  margin-right: 5px;
  min-width: 50px;
}

.menu > div:nth-child(2) {
  width: 95px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  line-height: 35px;
  color: #000;
  font-size: 16px;
  margin-right: 15px;
  margin-top: 9px;
  cursor: pointer;
}

.screen {
  margin: 20px 0;
  overflow: hidden;
}

.screen > div {
  float: left;
  margin-right: 25px;
}

.searchBox {
  height: 32px;
  line-height: 32px;
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

select {
  width: 150px;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  color: #97a8be;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 95% 12px no-repeat transparent;
  font-size: 14px;
  border: 1px solid #d1d1d1;
  overflow: hidden;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

.firstLi > div,
.dataLi > div {
  overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(8),
.dataLi > div:nth-child(10) {
  display: flex;
  justify-content: center;
}
</style>