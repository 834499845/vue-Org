<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="sale">
        <div>
            <div class="listTitle">
                <div>
                    物流中心
                </div>
                <div @click="addClick">
                    新增项
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div>
                                配送方式
                            </div>
                            <div>
                                配送描述
                            </div>
                            <div>
                                是否启用
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="logisticsList.length > 0" v-for="(item,index) in logisticsList">
                            <div>
                                {{item.expressDelivery}}
                            </div>
                            <div>
                                首重{{item.firstWeight}}kg-{{item.postage}}元，续重{{item.additionalWeight}}kg-{{item.renew}}元
                            </div>
                            <div>
                                <img v-if="item.enable == 1" src="/static/img/closeBlue.png" @click="showClick(index)">
                                <img v-else src="/static/img/blue.png" @click="showClick(index)">
                            </div>
                            <div class="operate">
                                <div><img @click="editClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑"></div>
                                <div><img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除"></div>
                            </div>
                        </li>
                        <li class="noList" v-show="logisticsList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="logisticsList.length > 0">
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
                    <v-storeDels @ok="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDels>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/storeDelast";
export default {
  components: {
    "v-storeDels": storeDel
  },
  data() {
    return {
      searchName: "",
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      logisticsList: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      loading: false,
      showClickTrue: false,
      delClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    if (sessionStorage.getItem("logisticsCurrentPage")) {
      self.currentPage = Number(sessionStorage.getItem("logisticsCurrentPage"));
    }
    if (sessionStorage.getItem("logisticsPageSizeNum")) {
      self.pageSizeNum = Number(sessionStorage.getItem("logisticsPageSizeNum"));
    }
    var paths = this.$route.path.split("/");
    var oneStr = paths[2];
    var twoStr = paths[3];
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");

    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      var comms = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "商城管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("logistics") == -1) {
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
        // console.log("持有当前权限");
        self.listFun();
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
    // 初始数据
    listFun() {
      var self = this;
      self.loading = true;
      self
        .getLogisticsData({
          current: self.currentPage,
          size: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          //   console.log("物流列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            sessionStorage.removeItem("logisticsCurrentPage");
            sessionStorage.removeItem("logisticsPageSizeNum");
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.logisticsList = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.logisticsList = [];
                }
              } else {
                self.logisticsList = [];
              }
            } else {
              self.logisticsList = [];
            }
          } else {
            self.logisticsList = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.logisticsList = [];
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun();
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun();
    },
    //是否启用
    showClick(index) {
      var self = this;
      if (self.showClickTrue == false) {
        if (this.logisticsList[index].enable == 0) {
          var showObj = [];
          showObj = [
            {
              id: this.logisticsList[index].id,
              expressDelivery: this.logisticsList[index].expressDelivery,
              firstWeight: this.logisticsList[index].firstWeight,
              postage: this.logisticsList[index].postage,
              renew: this.logisticsList[index].renew,
              area: this.logisticsList[index].area,
              enable: 1,
              remarks: this.logisticsList[index].remarks
            }
          ];
          var objstr = [];
          objstr = JSON.stringify(showObj);
          self.showClickTrue = true;
          self
            .getShowlogistics({
              logisticsCenterJson: objstr
            })
            .then(data => {
              self.loading = false;
              self.showClickTrue = false;
              if (data.code == 200) {
                self.listFun();
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.loading = false;
              self.showClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          var showObj = [];
          showObj = [
            {
              id: this.logisticsList[index].id,
              expressDelivery: this.logisticsList[index].expressDelivery,
              firstWeight: this.logisticsList[index].firstWeight,
              postage: this.logisticsList[index].postage,
              renew: this.logisticsList[index].renew,
              area: this.logisticsList[index].area,
              enable: 0,
              remarks: this.logisticsList[index].remarks
            }
          ];
          var objstr = [];
          objstr = JSON.stringify(showObj);
          self.showClickTrue = true;
          self
            .getShowlogistics({
              logisticsCenterJson: objstr
            })
            .then(data => {
              self.loading = false;
              self.showClickTrue = false;
              //   console.log("展开", data);
              if (data.code == 200) {
                self.listFun();
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.loading = false;
              self.showClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    // 编辑物流
    editClick(index) {
      var self = this;
      sessionStorage.setItem("logisticsCurrentPage", self.currentPage);
      sessionStorage.setItem("logisticsPageSizeNum", self.pageSizeNum);
      let logdata = JSON.stringify(this.logisticsList[index]);
      sessionStorage.setItem("logdata", logdata);
      this.$router.push({
        path: "/store/compileLogistics"
      });
    },
    // 删除物流
    deleteClick(index) {
      this.titlename = "品牌";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
      //   console.log(this.logisticsList[index].id);
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.delClickTrue = true;
        self
          .getDelLogistics({
            id: self.logisticsList[self.delIndex].id
          })
          .then(data => {
            self.loading = false;
            self.delClickTrue = false;
            self.titlename = "";
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              this.$message({
                type:'success',
                message:'删除成功'
              })
              if (self.logisticsList.length == 1) {
                if (self.currentPage == 1) {
                  self.currentPage = 1;
                } else if (self.currentPage > 1) {
                  self.currentPage = self.currentPage - 1;
                }
              }
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.loading = false;
            self.delClickTrue = false;
            self.titlename = "";
            self.isShowdel = true;
            self.delShow = false;
            self.$message({
              type: "info",
              message: "服务器异常"
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
    // 新增项
    addClick() {
      this.$router.push({
        path: "/store/addLogistics"
      });
    },
    ...mapActions(["getLogisticsData", "getShowlogistics", "getDelLogistics"])
  }
};
</script>
<style scoped>
/*主页*/

.sale {
  width: 100%;
  height: 100%;
}

.sale > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
  margin-top: 24px;
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
}

.operate > div {
  width: 30px;
  height: 30px;
  cursor: pointer;
  overflow: hidden;
  line-height: 25px;
}

.operate > div:nth-child(1) {
  margin-right: 9px;
}

.operate > div:nth-child(2) {
  margin-left: 9px;
}

.operate > div img {
  width: 25px;
  height: 25px;
}

.listCont li {
  display: flex;
  height: 50px;
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
}

.dataLi > div {
  border-right: 1px solid #d9d9d9;
  text-align: center;
  line-height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #303030;
  padding: 0 7px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #d9d9d9;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
  padding: 0 7px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(3) img {
  cursor: pointer;
}

.listCont li > div:nth-child(1) {
  width: 23%;
  overflow: hidden;
  min-width: 78px;
}

.listCont .dataLi > div:nth-child(4) {
  width: 23%;
  overflow: hidden;
  padding: 7px;
  min-width: 210px;
}

.listCont .firstLi > div:nth-child(4) {
  width: 23%;
  padding: 7px;
  padding-top: 0;
  min-width: 210px;
}

.listCont li > div:nth-child(3) {
  width: 23%;
  min-width: 176px;
}

.listCont li > div:nth-child(2) {
  width: 31%;
  min-width: 176px;
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