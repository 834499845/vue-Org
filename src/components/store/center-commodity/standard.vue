<!--商品中心-商品规格-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    商品规格
                </div>
                <div @click="addClick">
                    新建规格
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            <img src="/static/img/search_1.png" alt="">
                        </div>
                        <div>
                            <input type="text" v-model="searchClassName">
                        </div>
                    </div>
                    <div class="search" @click="nameSearchClick">
                        确定
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                类目名称
                            </div>
                            <div>
                                第一类属性
                            </div>
                            <div>
                                第二类属性
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length != 0" v-for="(item,index) in lists">
                            <div>
                                {{item.className}}
                            </div>
                            <div class="attribute">
                                <div>
                                    <div>
                                        {{item.firstAttribute}}
                                    </div>
                                    <div @click="firstAttributeClick(index)">
                                        <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                                    </div>
                                </div>
                            </div>
                            <div class="attribute">
                                <div>
                                    <div>
                                        {{item.secondAttribute}}
                                    </div>
                                    <div @click="secondAttributeClick(index)">
                                        <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                                    </div>
                                </div>
                            </div>
                            <div class="operate">
                                <div @click="deleteClick(index)">
                                    <img src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="lists.length != 0">
                            <div class="lastLiLeft">
                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum"
                                    :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @ok="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/storeDel";
export default {
  components: {
    "v-storeDel": storeDel
  },
  data() {
    return {
      lists: [],
      loading: false,
      deling: false,
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      searchClassName: "", //筛选input
      okClickShow: false, //判断是否进行筛选
      delClickTrue: false
    };
  },
  // 过滤
  filters: {
    timeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0 " + month;
      var date = now.getDate();
      date = date > 9 ? date : "0 " + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0 " + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0 " + minute;
      return (
        "20 " + year + "- " + month + "- " + date + " " + hour + ": " + minute
      );
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    if (sessionStorage.getItem("standardcurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("standardcurrentPage"));
      this.pageSizeNum = Number(sessionStorage.getItem("standardpageSizeNum"));
    }

    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      var comms = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "商城管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
            if (one.name == "商品中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("commodity") == -1) {
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
        if (comms.indexOf("standard") == -1) {
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
          if (sessionStorage.getItem("standardsearchName")) {
            self.searchClassName = sessionStorage.getItem("standardsearchName");
            self.okClickShow = true;
            self.listbrandNameFun();
          } else {
            self.listFun();
          }
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
    // 获取列表
    listFun() {
      sessionStorage.removeItem("standardcurrentPage");
      sessionStorage.removeItem("standardpageSizeNum");
      var self = this;
      self.loading = true;
      self
        .getstoreclassAttributefindPage({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          // console.log("商品规格列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.lists = [];
                }
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
            }
          } else {
            self.lists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.lists = [];
          // console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 有搜索内容时初始数据
    listbrandNameFun() {
      var self = this;
      self.currentPage = 1;
      self
        .getstoreclassAttributefindPage({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          className: self.searchClassName
        })
        .then(data => {
          self.loading = false;
          sessionStorage.removeItem("standardsearchName");
          // console.log("商品规格列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.lists = [];
                }
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
            }
          } else {
            sessionStorage.removeItem("standardsearchName");
            self.lists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.lists = [];
          // console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 搜索
    nameSearchClick() {
      var self = this;
      self.currentPage = 1;
      if (self.searchClassName.length > 0) {
        self.okClickShow = true;
        self
          .getstoreclassAttributefindPage({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            className: self.searchClassName
          })
          .then(data => {
            self.loading = false;
            // console.log("商品规格列表", JSON.parse(JSON.stringify(data)));
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length > 0) {
                    self.lists = data.data.records;
                    self.totalNum = data.data.total;
                  } else {
                    self.lists = [];
                  }
                } else {
                  self.lists = [];
                }
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.lists = [];
            // console.log(msg);
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      } else {
        self.$message({
          type: "info",
          message: "请输入搜索内容!"
        });
      }
    },
    // 每页个数
    handleSizeChange(val) {
      var self = this;
      self.currentPage = 1;
      self.pageSizeNum = val;
      if (self.okClickShow) {
        self.listbrandNameFun();
      } else {
        self.listFun();
      }
    },
    //  点击分页
    handleCurrentChange(val) {
      var self = this;
      this.currentPage = val;
      if (self.okClickShow) {
        self.listbrandNameFun();
      } else {
        self.listFun();
      }
    },
    // 第一属性
    firstAttributeClick(ind) {
      var self = this;
      if (self.searchClassName.length > 0) {
        sessionStorage.setItem("standardsearchName", self.searchClassName);
      } else {
        sessionStorage.setItem("standardcurrentPage", self.currentPage);
        sessionStorage.setItem("standardpageSizeNum", self.pageSizeNum);
      }
      this.$router.push({
        path: "/store/commodity/spStandard",
        query: {
          first: self.lists[ind].firstAttribute,
          id: self.lists[ind].id,
          rank: 1
        }
      });
    },
    // 第二属性
    secondAttributeClick(ind) {
      var self = this;
      if (self.searchClassName.length > 0) {
        sessionStorage.setItem("standardsearchName", self.searchClassName);
      } else {
        sessionStorage.setItem("standardcurrentPage", self.currentPage);
        sessionStorage.setItem("standardpageSizeNum", self.pageSizeNum);
      }
      this.$router.push({
        path: "/store/commodity/spStandard",
        query: {
          first: self.lists[ind].secondAttribute,
          id: self.lists[ind].id,
          rank: 2
        }
      });
    },
    // 修改规格
    detailsClick(ind) {
      var self = this;
      if (self.searchClassName.length > 0) {
        sessionStorage.setItem("standardsearchName", self.searchClassName);
      } else {
        sessionStorage.setItem("standardcurrentPage", self.currentPage);
        sessionStorage.setItem("standardpageSizeNum", self.pageSizeNum);
      }
      this.$router.push({
        path: "/store/commodity/opStandard",
        query: {
          id: self.lists[ind].id,
          ap: 2
        }
      });
    },
    // 添加规格
    addClick() {
      var self = this;
      this.$router.push({
        path: "/store/commodity/opStandard",
        query: {
          ap: 1,
          pageno: self.currentPage,
          pagesi: self.pageSizeNum
        }
      });
    },
    // 删除规格
    deleteClick(ind) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = ind;
      this.titlename = "属性";
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        var currentNum = self.currentPage;
        if (self.delIndex == 0 && self.currentPage > 1) {
          self.currentPage = currentNum - 1;
        }
        self.delClickTrue = true;
        self.deling = true;
        self
          .getstoreclassAttributedelete({
            id: self.lists[self.delIndex].id
          })
          .then(dataThr => {
            self.deling = false;
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            if (dataThr.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              if (self.searchClassName.length > 0) {
                self.listbrandNameFun();
              } else {
                self.listFun();
              }
            } else {
              self.$message({
                type: "info",
                message: dataThr.message
              });
            }
          })
          .catch(msg => {
            self.delClickTrue = false;
            self.deling = false;
            self.isShowdel = true;
            self.delShow = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 取消删除弹出框
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    ...mapActions([
      "getstoreclassAttributefindPage",
      "getstoreclassAttributedelete"
    ])
  },
  // 监视
  watch: {
    searchClassName: function(val) {
      if (val.length == 0) {
        if (this.okClickShow) {
          this.okClickShow = false;
          var self = this;
          self.currentPage = 1;
          self.pageSizeNum = 10;
          self
            .getstoreclassAttributefindPage({
              pageNo: self.currentPage,
              pageSize: self.pageSizeNum
            })
            .then(data => {
              self.loading = false;
              // console.log("商品规格列表", JSON.parse(JSON.stringify(data)));
              if (data.code == 200) {
                if (data.data) {
                  if (data.data.records) {
                    if (data.data.records.length > 0) {
                      self.lists = data.data.records;
                      self.totalNum = data.data.total;
                    } else {
                      self.lists = [];
                    }
                  } else {
                    self.lists = [];
                  }
                } else {
                  self.lists = [];
                }
              } else {
                self.lists = [];
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.lists = [];
              // console.log(msg);
              self.loading = false;
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        }
      }
    }
  }
};
</script>
<style scoped>
.sale {
  width: 100%;
  height: 100%;
}

input {
  width: 140px;
  height: 32px;
  border: 0;
  border-radius: 3px;
  padding-left: 5px;
}

.operate {
  display: flex;
  align-items: center;
  justify-content: center;
}

.operate > div {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.operate > div img {
  width: 100%;
  height: 100%;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

#lastLiRight {
  width: 80%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi > div:nth-child(1) {
  width: 10px;
}

.lastLi > div:nth-child(2) {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.listCont li {
  display: flex;
  /*border: 1px solid red;*/
  min-height: 50px;
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

.list .nullList {
  height: 400px;
}

.list .nullList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
}

.dataLi > div:nth-child(1) {
  line-height: 50px;
  text-align: center;
}

.attribute {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataLi > div {
  border-right: 1px solid #ececec;
}

.attribute > div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #515151;
}

.attribute > div {
  min-width: 100px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.attribute > div > div:nth-child(1) {
  min-width: 50px;
  overflow: hidden;
  font-size: 14px;
  text-align: right;
}

.attribute > div > div:nth-child(2) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 24px;
}

.attribute > div > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.attribute > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div {
  width: 33.33333333%;
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
  border: 1px solid #fe5371;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
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

.menuLeft input {
  border: 0;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menuLeft .search {
  width: 70px;
  margin-left: 32px;
  height: 30px;
  text-align: center !important;
  line-height: 30px;
  cursor: pointer;
  background-color: #fe5371;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
  border: 1px solid #eaeaea;
  width: 176px;
  overflow: hidden;
  border-radius: 4px;
  height: 32px;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  width: 32px;
  display: flex;
  align-items: center;
}

.menuLeft > div > div:nth-child(1) img {
  margin-left: 12px;
}

.menuLeft > div > div:nth-child(2) {
  width: 140px;
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
</style>