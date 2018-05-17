<!--商城-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="store">
        <!--导航-->
        <div class="nav">
            <div>
                <div>
                    <span>商城管理平台</span>
                </div>
            </div>
            <div class="nav-r">
                <div class="nav-r-head">
                    <div>
                        <img src="/static/img/admin.JPG" alt="">
                    </div>
                    <div>
                        {{userName}}
                    </div>
                </div>
                <!--<div class="nav-r-em">
                        <div @click="emilaClick">
                            <img src="/static/img/tubiao.png" alt="">
                        </div>
                        <span>35</span>
                    </div>-->
                <div class="nav-r-exit">
                    <div @click="exitClick">
                        <img src="/static/img/tubiao.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!--路由切换-->
        <div class="content">
            <div class="sidebar">
                <ul>
                    <li v-for="(itemo,ind) in lists" :key="ind">
                        <div :class="{liOne:isLiOne,liOneBg:isliOneBg == ind}"  @click="loOneClick(ind)">
                            <div>
                                {{itemo.name}}
                            </div>
                            <div :class="{rotateCl:isRotateCl != ind}">
                                <img src="/static/img/箭头.png" alt="">
                            </div>
                        </div>
                        <el-collapse-transition>
                            <div v-show="twoShow == ind" class="liTwo">
                                <ul>
                                    <li v-for="(itemt,index) in itemo.children" :key="index" @click="loTwoClick(index)">
                                        <div :class="{tweSan:isTweSan == index}">
                                            {{itemt.name}}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-transition>
                    </li>
                </ul>
            </div>
            <div class="main">
                <router-view class="view" keep-alive></router-view>
            </div>
        </div>
        <a href="javascript:scrollTo(0,0);" id="backTop"></a>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isGlyphicon: true,
      isGlyphiconTriangleRight: true,
      isRotateCl: 0,
      isliOneBg: 0,
      isTweSan: 0,
      isLiOne: true,
      lists: [],
      listCopys: [
        {
          name: "商品中心",
          children: [
            {
              name: "在售商品",
              path: "sale"
            },
            {
              name: "商品类目",
              path: "reartype"
            },
            {
              name: "商品规格",
              path: "standard"
            },
            {
              name: "商品品牌",
              path: "brand"
            },
            {
              name: "商品回收站",
              path: "recycle"
            },
            {
              name: "降价通知",
              path: "depreciate"
            }
          ],
          path: "commodity"
        },
        {
          name: "库存中心",
          children: [],
          path: "inventory"
        },
        {
          name: "订单中心",
          children: [
            {
              name: "订单列表",
              path: "list"
            },
            {
              name: "打印格式",
              path: "stamp"
            },
            {
              name: "发货单列表",
              path: "dispatch"
            },
            {
              name: "退货原因列表",
              path: "cause"
            },
            {
              name: "退换货列表",
              path: "exchange"
            },
            {
              name: "订单日志",
              path: "operate"
            }
          ],
          path: "order"
        },
        {
          name: "营销中心",
          children: [
            {
              name: "优惠券",
              path: "packet"
            }
          ],
          path: "marketing"
        },
        {
          name: "运营中心",
          children: [],
          path: "operation"
        },
        {
          name: "财务中心",
          children: [],
          path: "finance"
        },
        {
          name: "评价中心",
          children: [],
          path: "evaluate"
        },
        {
          name: "支付中心",
          children: [],
          path: "payment"
        },
        {
          name: "物流中心",
          children: [],
          path: "logistics"
        },
        {
          name: "系统设置",
          children: [
            {
              name: "商城设置",
              path: "components"
            },
            {
              name: "地区列表",
              path: "region"
            },
            {
              name: "配送时间",
              path: "distribution"
            },
            {
              name: "检索记录",
              path: "searching"
            },
            {
              name: "热词管理",
              path: "hotword"
            }
          ],
          path: "system"
        }
      ],
      twoShow: 0,
      userName: "暂无名称"
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  // beforeDestroy() {
  //     sessionStorage.removeItem('storeOneIndex')
  //     sessionStorage.removeItem('storeTwoIndex')
  // },
  created: function() {
    var self = this;
    if (sessionStorage.getItem("storeOneIndex")) {
    } else {
      sessionStorage.setItem("storeOneIndex", 0);
      sessionStorage.setItem("storeTwoIndex", 0);
    }
    var idStr = sessionStorage.getItem("userId");
    var paths = this.$route.path.split("/");
    var oneStr = paths[2];
    var twoStr = paths[3];
    self.fetchData();
    if (idStr) {
      var nameStr = sessionStorage.getItem("userName");
      if (nameStr) {
        self.userName = nameStr;
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
    // 路由监视
    fetchData() {
      var self = this;
      var idStr = sessionStorage.getItem("userId");
      if (idStr) {
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
              if (ele.children) {
                self.lists = ele.children;
                ele.children.forEach(function(one, oneIndex) {
                  arrs.push({
                    path: one.path,
                    cos: one.children
                  });
                });
              }
            }
          });
          if (self.lists.length > 0) {
            if (oneStr == undefined || oneStr == "") {
              self.$router.push({
                path: "/store/" + self.lists[0].path,
                query: self.$route.query
              });
            } else {
              if (twoStr == undefined || twoStr == "") {
                if (arrs.indexOf(oneStr) == -1) {
                  self.$router.push({
                    path: "/store/" + oneStr,
                    query: self.$route.query
                  });
                } else if (oneStr != self.lists[0].path) {
                  self.$router.push({
                    path: "/store/" + oneStr,
                    query: self.$route.query
                  });
                } else {
                  self.$router.push({
                    path: "/store/" + self.lists[0].path,
                    query: self.$route.query
                  });
                }
              } else {
                self.$router.push({
                  path: "/store/" + oneStr + "/" + twoStr,
                  query: self.$route.query
                });
              }
            }
            arrs.forEach(function(ele, ind) {
              if (ele.path == oneStr) {
                self.twoShow = ind;
                self.isRotateCl = ind;
                self.isliOneBg = ind;

                if (ele.cos) {
                  ele.cos.forEach(function(com, comIndex) {
                    if (com.path == twoStr) {
                      self.isTweSan = comIndex;
                    }
                  });
                }
              }
            });
            if (
              twoStr == "opStandard" ||
              twoStr == "spStandard" ||
              twoStr == "add" ||
              twoStr == "detail" ||
              twoStr == "reartypeAdd" ||
              twoStr == "addBrand" ||
              twoStr == "operatePacket" ||
              twoStr == "orderReview"
            ) {
              self.twoShow = sessionStorage.getItem("storeOneIndex");
              self.isRotateCl = sessionStorage.getItem("storeOneIndex");
              self.isliOneBg = sessionStorage.getItem("storeOneIndex");
              self.isTweSan = sessionStorage.getItem("storeTwoIndex");
            }
            if (
              oneStr == "choicenessOperation" ||
              oneStr == "xpOperation" ||
              oneStr == "xpchoicenessOperation" ||
              oneStr == "delchoicenessOperation" ||
              oneStr == "navOperation" ||
              oneStr == "editinventory" ||
              oneStr == "xpConjOperation" ||
              oneStr == "addLogistics" ||
              oneStr == "compileLogistics"
            ) {
              self.twoShow = sessionStorage.getItem("storeOneIndex");
              self.isRotateCl = sessionStorage.getItem("storeOneIndex");
              self.isliOneBg = sessionStorage.getItem("storeOneIndex");
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
    // 一级目录跳转
    loOneClick(ind) {
      this.twoShow = ind;
      this.isRotateCl = ind;
      this.isliOneBg = ind;
      var pathStr = this.lists[ind].path;
      this.$router.push({
        path: "/store/" + pathStr
      });
      sessionStorage.setItem("storeOneIndex", ind);
      this.isTweSan = 0;
    },
    // 二级目录跳转
    loTwoClick(ind) {
      var self = this;
      var pathOneStr = self.lists[self.isRotateCl].path;
      var pathTwoStr = self.lists[self.isRotateCl].children[ind].path;
      self.$router.push({
        path: "/store/" + pathOneStr + "/" + pathTwoStr
      });
      sessionStorage.setItem("storeOneIndex", self.isRotateCl);
      sessionStorage.setItem("storeOneIndex", self.isliOneBg);
      sessionStorage.setItem("storeTwoIndex", ind);
      this.isTweSan = ind;
    },
    // 退出登录
    exitClick() {
      sessionStorage.removeItem("storeOneIndex");
      sessionStorage.removeItem("storeTwoIndex");
      this.$router.push({
        path: "/home"
      });
    },
    ...mapActions(["getListResRole"])
  },
  // 监视
  watch: {
    $route: "fetchData"
  }
};
</script>
<style scoped>
#backTop {
  position: fixed;
  bottom: 30px;
  right: 47px;
  width: 40px;
  height: 40px;
  background: url("/static/img/top.png") no-repeat;
  z-index: 999;
}

.store {
  background-color: #f4f6f9;
}
/*主体部分*/

.content {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  overflow: hidden;
  margin-top: 16px;
  background-color: #f4f6f9;
}
/*侧栏导航*/

.sidebar {
  width: 210px;
  border-right: 1px solid #f4f6f9;
  overflow: hidden;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #332f48;
  min-height: calc(100vh - 80px);
}

.sidebar > ul {
  margin-top: 10px;
}

.liOne {
  display: flex;
  overflow: hidden;
  height: 50px;
  background-color: #29263b;
  border-bottom: 1px solid #332f48;
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.liOneBg {
  background-color: #29264a;
}

.liOne > div:nth-child(2) {
  margin-left: 10px;
  width: 13px;
  overflow: hidden;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.liOne > div:nth-child(2) img {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.liOne .rotateCl {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}

.liTwo {
  width: 100%;
}

.liTwo > ul > li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  cursor: pointer;
  background-color: #332f48;
  border-bottom: 1px solid #47445a;
  user-select: none;
}

.liTwo > ul > li > div {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 17px;
  color: #b0afb8;
  overflow: hidden;
}

.liTwo .tweSan::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 50px;
  background-color: #fe5371;
  content: "";
}

.liTwo .tweSan::before {
  position: absolute;
  top: 12px;
  right: 0px;
  width: 0;
  height: 0;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-right: 10px solid #f4f6f9;
  /*border: 0;*/
  content: "";
}
/*子页面*/

.main {
  width: calc(100% - 250px);
  overflow: hidden;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 5px;
}
/*导航部分*/

.nav {
  height: 64px;
  background-color: #fff;
  overflow: hidden;
  border-bottom: 1px solid #e1e3e6;
}

.nav > div:nth-child(1) {
  width: 210px;
  height: 64px;
  line-height: 64px;
  /*margin-left: 48px;*/
  float: left;
  background-color: #fe5371;
  text-align: center;
}

.nav > div:nth-child(1) > div {
  line-height: 64px;
}

.nav > div:nth-child(1) > div > span {
  font-size: 20px;
  color: #fff;
  font-weight: 600;
}

.nav-r {
  float: right;
}

.nav-r > div {
  float: left;
  height: 64px;
  overflow: hidden;
}

.nav-r-head {
  min-width: 90px;
  display: flex;
  align-items: center;
}

.nav-r-head > div:nth-child(1) {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
}

.nav-r-head > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.nav-r-head > div:nth-child(2) {
  margin-left: 8px;
  color: #9b9a9f;
  font-size: 15px;
  cursor: pointer;
}

.nav-r-em {
  margin-left: 23px;
  width: 30px;
  justify-content: center;
  display: flex;
  cursor: pointer;
  align-items: center;
  position: relative;
}

.nav-r-em > div:nth-child(1) {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.nav-r-em span {
  position: absolute;
  display: block;
  width: 17px;
  height: 13px;
  background-color: #fe5371;
  color: #fff;
  top: 15px;
  line-height: 15px;
  font-size: 12px;
  left: 12px;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.nav-r-exit {
  width: 30px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 35px;
  cursor: pointer;
}

.slide-column-enter-active {
  transition: all 0.7s ease;
}

.slide-column-enter,
.slide-column-leave-active {
  transform: translateX(30px);
  opacity: 0.5;
}
</style>
<style>
input[type="text"] {
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 5px;
}

select,
input,
textarea {
  outline: none;
}

.details .wangEditor-container {
  margin-left: 0px !important;
  margin-top: 0px !important;
  /*width: 830px!important;*/
  height: 566px !important;
  overflow: hidden;
  min-width: 590px;
}

.details .wangEditor-menu-container .menu-group {
  padding: 0 2px !important;
}
/*弹出框*/

.ModalsBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 999;
}

.Modals {
  background: #fff;
  position: absolute;
  left: 0;
  top: 0px;
  right: 0;
  bottom: 0;
  margin: auto auto;
  width: 520px;
  height: 330px;
  box-shadow: 0 2px 3px #cccccc;
  border-radius: 5px;
  animation: madalsBox 0.8s;
}

@keyframes madalsBox {
  from {
    transform: translateY(-200px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

label {
  font-weight: normal !important;
}

input[type="file"] {
  position: absolute;
  width: 110px;
  height: 0;
  display: none;
}

.abrand .el-select {
  margin-left: -2px !important;
  height: 35px !important;
  width: 180px !important;
  margin-top: -2px !important;
  line-height: 35px !important;
}
</style>