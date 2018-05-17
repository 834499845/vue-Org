<!--商品中心-商品品牌-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div class="sacontent">
            <div class="listTitle">
                <div>
                    商品品牌
                </div>
                <div @click="addCommClick">
                    新增品牌
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
                            <input type="text" v-model="searchName">
                        </div>
                    </div>
                    <div class="search" @click="searchClick">
                        确定
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div style="width: 10%">
                                编号
                            </div>
                            <div style="width: 15%">
                                品牌中文名称
                            </div>
                            <div style="width: 15%">
                                品牌英文名称
                            </div>
                            <div style="width: 25%">
                                品牌描述
                            </div>
                            <div style="width: 15%">
                                审核状态
                            </div>
                            <div style="width: 10%">
                                是否启用
                            </div>
                            <div style="width: 10%">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists">
                            <div style="width: 10%">
                                {{index + 1}}
                            </div>
                            <div style="width: 15%" :title="item.chinaName">
                                {{item.chinaName}}
                            </div>
                            <div style="width: 15%" :title="item.englishName">
                                {{item.englishName}}
                            </div>
                            <div style="width: 25%" :title="item.remark">
                                {{item.remark}}
                            </div>
                            <div style="width: 15%">
                                <!--{{item.state}}-->
                                无需审核
                            </div>
                            <div style="width: 10%">
                                <img v-if="item.state == 1" src="/static/img/closeBlue.png">
                                <img v-else src="/static/img/blue.png">
                            </div>
                            <div class="operate" style="width: 10%">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div>
                                    <img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                        <li class="noList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="lists.length > 0">
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
                <div class="delContent" v-show="delShow" v-loading="loading">
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
      delClickTrue: false,
      searchName: "",
      okClickShow: false, //判断是否筛选
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      loading: false
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
    if (sessionStorage.getItem("brandcurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("brandcurrentPage"));
      this.pageSizeNum = Number(sessionStorage.getItem("brandpageSizeNum"));
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
        if (comms.indexOf("brand") == -1) {
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
          if (sessionStorage.getItem("brandsearchName")) {
            self.searchName = sessionStorage.getItem("brandsearchName");
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
  updated: function() {},
  // 事件处理
  methods: {
    // 初始数据
    listFun() {
      var self = this;
      self.loading = true;
      sessionStorage.removeItem("brandcurrentPage");
      sessionStorage.removeItem("brandpageSizeNum");
      self
        .getstorebrandfindPage({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          //   console.log("品牌列表", JSON.parse(JSON.stringify(data)));
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
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 带有搜索的初始数据
    listbrandNameFun() {
      var self = this;
      self.loading = true;
      self
        .getstorebrandfindByBrandName({
          brandName: self.searchName
        })
        .then(data => {
          self.loading = false;
          //   console.log("搜索品牌列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.lists = data.data;
                self.totalNum = data.data.length;
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
          sessionStorage.removeItem("brandsearchName");
        })
        .catch(msg => {
          self.lists = [];
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 分页
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
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      if (self.okClickShow) {
        self.listbrandNameFun();
      } else {
        self.listFun();
      }
    },
    // 品牌搜索
    searchClick() {
      var self = this;
      var search = self.searchName;
      self.searchName = search.replace(/(^\s+)|(\s+$)/g, "");
      if (self.searchName.length == 0) {
        self.$message({
          type: "info",
          message: "请输入搜索关键词!"
        });
      } else {
        self.okClickShow = true;
        self.loading = true;
        self
          .getstorebrandfindByBrandName({
            brandName: self.searchName
          })
          .then(data => {
            self.loading = false;
            // console.log("搜索品牌列表", JSON.parse(JSON.stringify(data)));
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  self.lists = data.data;
                  self.totalNum = data.data.length;
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
    },
    // 更新品牌信息
    updateClick(index) {
      var self = this;
      if (self.searchName.length > 0) {
        sessionStorage.setItem("brandsearchName", self.searchName);
      } else {
        sessionStorage.setItem("brandcurrentPage", self.currentPage);
        sessionStorage.setItem("brandpageSizeNum", self.pageSizeNum);
      }
      this.$router.push({
        path: "/store/commodity/addBrand",
        query: {
          operation: 2,
          id: self.lists[index].id
        }
      });
    },
    // 删除品牌
    deleteClick(index) {
      this.titlename = "品牌";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.delClickTrue = true;
        var currentNum = self.currentPage;
        if (self.currentPage > 1 && self.delIndex == 0) {
          self.currentPage = currentNum - 1;
        }
        self.loading = true;
        self
          .getstorebranddeleteById({
            id: self.lists[self.delIndex].id
          })
          .then(data => {
            self.loading = false;
            self.titlename = "";
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              if (self.searchName.length > 0) {
                self.listbrandNameFun();
              } else {
                self.listFun();
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.delClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 取消删除
    cancleClick() {
      this.titlename = "";
      this.isShowdel = true;
      this.delShow = false;
    },
    // 添加商品
    addCommClick() {
      this.$router.push({
        path: "/store/commodity/addBrand",
        query: {
          operation: 1
        }
      });
    },
    ...mapActions([
      "getstorebranddeleteById",
      "getstorebrandfindPage",
      "getstorebrandfindByBrandName"
    ])
  },
  // 监视
  watch: {
    searchName: function(val) {
      var self = this;
      if (val.length == 0) {
        if (self.okClickShow) {
          self.okClickShow = false;
          var self = this;
          self.loading = true;
          self
            .getstorebrandfindPage({
              pageNo: 1,
              pageSize: 10
            })
            .then(data => {
              self.loading = false;
              //   console.log("品牌列表", JSON.parse(JSON.stringify(data)));
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
              //   console.log(msg);
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

.sale {
  width: 100%;
  height: 100%;
}

.sale .sacontent {
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

.operate {
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
}

.operate > div {
  width: 24px;
  height: 24px;
  cursor: pointer;
  overflow: hidden;
}

.operate > div:nth-child(1) {
  margin-right: 9px;
}

.operate > div:nth-child(2) {
  margin-left: 9px;
}

.operate > div img {
  width: 100%;
  height: 100%;
}

.listCont li {
  display: flex;
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
  border-right: 1px solid #d9d9d9;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  height: 58px;
}

.dataLi > div {
  border-right: 1px solid #d9d9d9;
  font-size: 14px;
  color: #303030;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #d9d9d9;
}

.dataLi > div:nth-child(1),
.firstLi > div:nth-child(1) {
  min-width: 78px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
}

.dataLi > div:nth-child(4),
.firstLi > div:nth-child(4) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 76px;
}

.dataLi > div:nth-child(3),
.firstLi > div:nth-child(3) {
  min-width: 86px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
}

.dataLi > div:nth-child(2),
.firstLi > div:nth-child(2) {
  min-width: 76px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
}

.dataLi > div:nth-child(5),
.firstLi > div:nth-child(5) {
  min-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
}

.dataLi > div:nth-child(6),
.firstLi > div:nth-child(6) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 76px;
}

.dataLi > div:nth-child(7),
.firstLi > div:nth-child(7) {
  min-width: 75px;
}

.list {
  min-height: 540px;
  width: 100%;
}

.listTitle {
  width: 100%;
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
  width: 100%;
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

.menuLeft input {
  width: 140px;
  height: 32px;
  border: 0;
  border-radius: 3px;
  padding-left: 5px;
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