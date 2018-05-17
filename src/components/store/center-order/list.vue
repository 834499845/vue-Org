<!--订单中心-订单列表-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    订单列表
                </div>
                <div @click="exportClick">
                    导出订单
                </div>
            </div>
            <!--筛选-->
            <!-- <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            订单状态：
                        </div>
                        <div>
                            <select @change="selectStateClick" v-model="stateStr">
                                 <option v-for="(type,index) in States"  v-bind:value="index">{{type}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            店铺名称：
                        </div>
                        <div>
                            <select @change="selectTypeClick" v-model="typestr">
                                 <option v-for="(type,index) in sTypes"  v-bind:value="index">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            订单号：
                        </div>
                        <div>
                            <input type="text">
                        </div>
                    </div>
                    <div>
                        <div>
                            收货人：
                        </div>
                        <div>
                            <input type="text">
                        </div>
                    </div>
                    <div>
                        <div class="search">确定</div>
                    </div>
                </div>
            </div> -->
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div class="firstCheckBox" style="width: 18%">
                                <div>
                                    <!-- <div>
                                        <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                    </div> -->
                                    <div>
                                        <span>订单号</span>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 15%">
                                商家名称
                            </div>
                            <div style="width: 12%">
                                下单时间
                            </div>
                            <div style="width: 10%">
                                收货人
                            </div>
                            <div style="width: 10%">
                                总金额
                            </div>
                            <div style="width: 10%">
                                实际应付
                            </div>
                            <div style="width: 10%">
                                订单状态
                            </div>
                            <div style="width: 15%">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists">
                            <div class="dataCheck" style="width: 18%">
                                <div>
                                    <!-- <div>
                                        <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                            <el-checkbox :label="item" :key="index">{{checkNum}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div> -->
                                    <div>
                                        <span>{{item.orderNo | strFun}}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 15%">
                                {{item.server | serverFun}}
                            </div>
                            <div style="width: 12%">
                                {{item.createDate | timeFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.name | strFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.orderAmount | numFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.actualAmount | numFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.status | stateFun}}
                            </div>
                            <div class="operate" style="width: 15%">
                                <div @click="detailsClick(index)"><img src="/static/img/查看.png" alt="查看" title="查看"></div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
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
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/select";
export default {
  components: {
    "v-minput": minput,
    "v-select": select
  },
  data() {
    return {
      loading: false,
      checkNum: "",
      checked: false,
      checkList: [],
      States: ["所有状态", "已付款"],
      stateStr: 0,
      sTypes: ["所有分类", "A分类"],
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      searchName: ""
    };
  },
  // 过滤
  filters: {
    timeFun: function(val) {
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
        return (
          "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute
        );
      } else {
        return "无";
      }
    },
    stateFun: function(val) {
      if (val) {
        switch (val) {
          case "00":
            return "暂无信息";
            break;
          case "01":
            return "待支付";
            break;
          case "02":
            return "已支付";
            break;
          case "03":
            return "已发货";
            break;
          case "04":
            return "交易成功";
            break;
          case "05":
            return "交易关闭";
            break;
          case "06":
            return "取消订单";
            break;
          case "07":
            return "退款成功";
            break;
          default:
            break;
        }
      } else {
        return "暂无信息";
      }
    },
    serverFun: function(val) {
      if (val) {
        return val;
      } else {
        return "平台自营";
      }
    },
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "暂无信息";
      }
    },
    numFun: function(val) {
      if (val) {
        if (val >= 0) {
          return val;
        } else {
        }
      } else {
        return "0";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    if (sessionStorage.getItem("listcurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("listcurrentPage"));
      this.pageSizeNum = Number(sessionStorage.getItem("listpageSizeNum"));
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
            if (one.name == "订单中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("order") == -1) {
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
        if (comms.indexOf("list") == -1) {
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
          if (sessionStorage.getItem("listsearchName")) {
            self.searchName = sessionStorage.getItem("listsearchName");
            self.listNameFun();
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
    // 初始数据
    listFun() {
      var self = this;
      self.loading = true;
      sessionStorage.removeItem("listcurrentPage");
      sessionStorage.removeItem("listpageSizeNum");
      self
        .getstoregoodsOrderfindOrderList({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          //   console.log("订单列表", JSON.parse(JSON.stringify(data)));
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
    // 存在搜索时的初始数据
    listNameFun() {},
    // 状态选择
    selectStateClick(state) {
      //   console.log(state);
    },
    // 店铺名称
    selectTypeClick(type) {
      //   console.log(type);
    },
    // 回收站
    selectrecycleClick() {},
    // 所有序号被选中时
    numChange(event) {
      this.checkList = event.target.checked ? this.dataLists : [];
      //   console.log(this.checkList);
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.dataLists.length;
      //   console.log(this.checkList);
    },
    // 点击分页
    handleSizeChange(val) {
      var self = this;
      self.currentPage = 1;
      self.pageSizeNum = val;
      if (self.searchName.length > 0) {
        self.listbrandNameFun();
      } else {
        self.listFun();
      }
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      if (self.searchName.length > 0) {
        self.listbrandNameFun();
      } else {
        self.listFun();
      }
    },
    // 查看商品信息
    detailsClick(index) {
      var self = this;
      if (self.searchName.length > 0) {
        sessionStorage.setItem("listsearchName", self.searchName);
      } else {
        sessionStorage.setItem("listcurrentPage", self.currentPage);
        sessionStorage.setItem("listpageSizeNum", self.pageSizeNum);
      }
      this.$router.push({
        path: "/store/order/orderReview",
        query: {
          id: self.lists[index].id
        }
      });
    },
    // 回收站
    recycleClick(index) {},
    // 导出订单
    exportClick() {},
    ...mapActions(["getstoregoodsOrderfindOrderList"])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
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

.search {
  width: 72px;
  height: 32px;
  color: #ffffff !important;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  background-color: #fe5371;
  cursor: pointer;
}

.sale {
  width: 100%;
  height: 100%;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.recycle {
  height: 100px;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.recycle > div:nth-child(1) {
  /*min-width: 60px;*/
  height: 35px;
  color: #353535;
  font-size: 16px;
  line-height: 35px;
}

.recycle > div:nth-child(2) {
  margin-left: 10px;
}

.recycle > div:nth-child(3) {
  margin-top: 3px;
  margin-left: 25px;
  width: 70px;
  height: 30px;
  background-color: #fe5371;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
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
  justify-content: center;
  height: 58px;
}

.operate > div {
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
}

.operate > div img {
  width: 100%;
  height: 100%;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 50px;
  height: 50px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.dataCheck > div {
  width: 180px;
  display: flex;
  align-items: center;
}

.dataCheck > div > div {
  margin-left: 20px;
}

/* .dataCheck > div > div:nth-child(1) {
  width: 22px;
}

.dataCheck > div > div:nth-child(2) {
  width: 25px;
  line-height: 22px;
  height: 25px;
} */

.dataCheck > div > div:nth-child(3) {
  margin-left: 5px;
}

.dataCheck > div > div:nth-child(3) span {
  height: 40px;
  margin-top: 1px;
  display: block;
  font-size: 15px;
}

.firstCheckBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.firstCheckBox > div {
  width: 80px;
  display: flex;
  align-items: center;
}

.firstCheckBox > div > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.firstCheckBox > div > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.firstLi > div {
  border-right: 1px solid #d1d1d1;
  text-align: center;
  color: #303030;
  font-size: 16px;
  font-weight: bold;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #d1d1d1;
}

.dataLi {
  border-bottom: 1px solid #d1d1d1;
  background-color: #fff;
}

.dataLi > div {
  border-right: 1px solid #d1d1d1;
  text-align: center;
  font-size: 14px;
  color: #515151;
  height: 58px;
}

.dataLi > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  overflow: hidden;
}

.firstLi > div:nth-child(1) {
  display: flex;
  align-items: center;
  min-width: 200px;
  overflow: hidden;
}

.dataLi > div:nth-child(2) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 74px;
}

.firstLi > div:nth-child(2) {
  min-width: 74px;
}

.dataLi > div:nth-child(3) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 74px;
}

.firstLi > div:nth-child(3) {
  min-width: 74px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(4) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 74px;
}

.firstLi > div:nth-child(4) {
  min-width: 74px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(5) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 54px;
}

.firstLi > div:nth-child(5) {
  min-width: 54px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(6) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 54px;
}

.firstLi > div:nth-child(6) {
  min-width: 74px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  min-width: 54px;
}

.firstLi > div:nth-child(7) {
  min-width: 54px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(7) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 54px;
}

.dataLi > div:nth-child(8) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
  text-align: center;
  min-width: 54px;
}

.firstLi > div:nth-child(8) {
  min-width: 54px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #d1d1d1;
}

.listCont li {
  display: flex;
  min-height: 50px;
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
  min-height: 80px;
  /* overflow: hidden; */
  display: flex;
  justify-content: space-between; 
}

.menuLeft {
  display: flex;
  /* flex-wrap: wrap; */
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
  min-width: 74px;
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

input {
  width: 100px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
  border: 1px solid #d1d1d1;
}

select {
  width: 120px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
  /*padding-left: 14px;*/
  font-size: 14px;
  color: #97969b;
  border: 1px solid #d1d1d1;
  /*text-align: center;*/
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}
</style>