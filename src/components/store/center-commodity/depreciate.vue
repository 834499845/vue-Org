<!--商品中心-降价通知-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    降价通知
                </div>
                <!--<div @click="addCommClick">
                    新增品牌
                </div>-->
            </div>
            <!--筛选-->
            <!--<div class="menu">
                <div class="menuLeft">
                    选择
                </div>
            </div>-->
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div style="width: 8%">
                                序号
                            </div>
                            <div style="width: 23%">
                                商品名称
                            </div>
                            <div style="width: 10%">
                                商家
                            </div>
                            <div style="width: 10%">
                                用户名
                            </div>
                            <div style="width: 15%">
                                手机号
                            </div>
                            <div style="width: 8%">
                                状态
                            </div>
                            <div style="width: 8%">
                                当前价格
                            </div>
                            <div style="width: 8%">
                                期望价格
                            </div>
                            <div style="width: 10%">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists">
                            <div style="width: 8%">
                                {{index + 1}}
                            </div>
                            <div style="width: 23%" :title="item.productName | strFun">
                                {{item.productName | strFun}}
                            </div>
                            <div style="width: 10%" :title="item.server | strFun">
                                {{item.server | strFun}}
                            </div>
                            <div style="width: 10%" :title="item.userName | strFun">
                                {{item.userName | strFun}}
                            </div>
                            <div style="width: 15%">
                                {{item.mobilePhoneNo | strFun}}
                            </div>
                            <div style="width: 8%">
                                {{item.state | stateFun}}
                            </div>
                            <div style="width: 8%">
                                {{item.price | numFun}}
                            </div>
                            <div style="width: 8%">
                                {{item.hopePrice | numFun}}
                            </div>
                            <div class="operate" style="width: 10%">
                                <div v-show="item.state == 1">
                                    <img src="/static/img/lvfeiji.png">
                                </div>
                                <div v-show="item.state == 0">
                                    <img @click="detailsClick(index)" src="/static/img/huifeiji.png">
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
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      detailsClickTrue: false,
      lists: [],
      loading: false,
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0
    };
  },
  // 过滤
  filters: {
    stateFun: function(val) {
      if (val == 1) {
        return "已通知";
      } else {
        return "未通知";
      }
    },
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    numFun: function(val) {
      if (val) {
        return val + "元";
      } else {
        return "无";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
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
        if (comms.indexOf("depreciate") == -1) {
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
          self.listFun();
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
    listFun() {
      var self = this;
      self.loading = true;
      self
        .getstoreNoticeOfReductionControllerselectNoticePage({
          current: self.currentPage,
          size: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          //   console.log("降价用户列表", JSON.parse(JSON.stringify(data)));
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
            self.loading = false;
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
    // 点击分页
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun();
    },
    // 点击更换每页条数
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun();
    },
    // 发送通知
    detailsClick(index) {
      var self = this;
      self.loading = true;
      if (self.detailsClickTrue == false) {
        self.detailsClickTrue = true;
        self
          .getstoremerchantsNotice({
            id: self.lists[index].id
          })
          .then(data => {
            self.loading = false;
            self.detailsClickTrue = false;
            if (data.code == 200) {
              self.loading = true;
              self.$message({
                type: "success",
                message: "发送通知成功!"
              });
              self.listFun();
            } else if (data.code > 400 && data.code < 500) {
              self.$message({
                type: "info",
                message: data.data
              });
            } else if (data.code > 600 && data.code < 700) {
              self.$message({
                type: "info",
                message: data.data
              });
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.detailsClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    ...mapActions([
      "getstoreNoticeOfReductionControllerselectNoticePage",
      "getstoremerchantsNotice"
    ])
  },
  // 监视
  watch: {}
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

.sale > div {
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
}

.operate {
  justify-content: space-around;
  align-items: center;
  display: flex;
  height: 58px;
}

.operate > div {
  width: 24px;
  height: 24px;
  cursor: pointer;
  overflow: hidden;
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
  line-height: 60px;
  height: 60px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
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

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: 600;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #d9d9d9;
}

.dataLi {
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
}

.dataLi > div {
  border-right: 1px solid #d9d9d9;
  text-align: center;
  font-size: 14px;
  color: #515151;
  height: 58px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #d9d9d9;
}

.listCont .dataLi > div {
  overflow: hidden;
}

.dataLi > div:nth-child(1),
.firstLi > div:nth-child(1) {
  min-width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(2),
.firstLi > div:nth-child(2) {
  min-width: 104px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(3),
.firstLi > div:nth-child(3) {
  min-width: 76px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(4),
.firstLi > div:nth-child(4) {
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(5),
.firstLi > div:nth-child(5) {
  min-width: 154px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(6),
.firstLi > div:nth-child(6) {
  min-width: 82px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(7),
.firstLi > div:nth-child(7) {
  min-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(8),
.firstLi > div:nth-child(8) {
  min-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
  height: 58px;
}

.dataLi > div:nth-child(9),
.firstLi > div:nth-child(9) {
  min-width: 50px;
}

.list {
  overflow: hidden;
  width: 100%;
  margin-top: 25px;
  min-height: 540px;
}

.listTitle {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  float: left;
  color: #303030;
  font-size: 17px;
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
  height: 85px;
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
  color: #373737;
  font-size: 16px;
  margin-right: 10px;
  min-width: 80px;
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
</style>