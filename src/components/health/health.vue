<!--健康-->
<template>
    <div id="app" class="store">
        <!--导航-->
        <div class="nav">
            <div>
                <div>
                    <span>健康管理平台</span>
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
                            <img src="/static/img/XX.png" alt="">
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
                        <div :class="{liOne:isliOne,oneSan:isOneSan == ind}" @click="loOneClick(ind)">
                            <div :class="{tweSan:isTweSan == ind}">
                                {{itemo.name}}
                            </div>
                        </div>
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
      isRotateCl: 0,
      isliOne: true,
      isOneSan: 0,
      isTweSan: 0,
      listCopys: [
        {
          name: "用户管理",
          children: [],
          path: "user"
        },
        {
          name: "基础字典",
          children: [],
          path: "dictionary"
        },
        {
          name: "标准模型",
          children: [],
          path: "standard"
        },
        {
          name: "健康建议",
          children: [],
          path: "suggest"
        },
        {
          name: "健康检查",
          children: [],
          path: "examination"
        }
      ],
      lists: [],
      twoShow: 0,
      userName: "暂无名称",
      indexOfNum: ""
    };
  },
  // 过滤
  filters: {},
  computed: mapState(["headltModel"]),
  // 模块新建时
  created: function() {
    var self = this;
    var idStr = sessionStorage.getItem("userId");
    var paths = this.$route.path.split("/");
    var oneStr = paths[2];
    var twoStr = paths[3];
    if (sessionStorage.getItem("healthIndex")) {
    } else {
      sessionStorage.setItem("healthIndex", 0);
    }
    self.fetchData();
    var nameStr = sessionStorage.getItem("userName");
    if (nameStr) {
      self.userName = nameStr;
    }
  },
  // 计算属性
  mounted() {},
  watch: {
    $route: "fetchData"
  },
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
        if (idStr) {
          var roleIdStr = sessionStorage.getItem("roleId");
          var TOKEN = sessionStorage.getItem("token");
          var userRoleOBj = sessionStorage.getItem("userRole");
          if (userRoleOBj) {
            userRoleOBj = JSON.parse(userRoleOBj);
            var arrs = [];
            userRoleOBj.forEach(function(ele, ind) {
              if (ele.name == "健康管理") {
                self.lists = ele.children;
                ele.children.forEach(function(one, oneIndex) {
                  arrs.push(one.path);
                });
              }
            });
            if (self.lists.length > 0) {
              if (oneStr == undefined || oneStr == "") {
                self.$router.push({
                  path: "/health/" + self.lists[0].path
                });
              } else {
                if (arrs.indexOf(oneStr) == -1) {
                } else if (oneStr != self.lists[0].path) {
                  self.$router.push({
                    path: "/health/" + oneStr
                  });
                } else {
                  self.$router.push({
                    path: "/health/" + self.lists[0].path
                  });
                }
              }
              arrs.forEach(function(ele, ind) {
                if (ele == oneStr) {
                  // self.twoShow = ind;
                  // self.isRotateCl = ind;
                  self.isTweSan = ind;
                  self.isOneSan = ind;
                }
                if (oneStr == "addDictionary") {
                  if (ele == "dictionary") {
                    // self.twoShow = ind;
                    // self.isRotateCl = ind;
                    self.isTweSan = ind;
                    self.isOneSan = ind;
                  }
                } else if (oneStr == "upstandard") {
                  if (ele == "standard") {
                    // self.twoShow = ind;
                    // self.isRotateCl = ind;
                    self.isTweSan = ind;
                    self.isOneSan = ind;
                  }
                } else if (oneStr == "addExamination") {
                  if (ele == "examination") {
                    // self.twoShow = ind;
                    // self.isRotateCl = ind;
                    self.isTweSan = ind;
                    self.isOneSan = ind;
                  }
                } else if (oneStr == "dateilsuser") {
                  if (ele == "user") {
                    // self.twoShow = ind;
                    // self.isRotateCl = ind;
                    self.isTweSan = ind;
                    self.isOneSan = ind;
                  }
                }
              });
              // if (
              //   oneStr == "addExamination" ||
              //   oneStr == "upstandard" ||
              //   oneStr == "addDictionary" ||
              //   oneStr == "dateilsuser"
              // ) {
              //   self.twoShow = sessionStorage.getItem("healthIndex");
              //   self.isRotateCl = sessionStorage.getItem("healthIndex");
              //   self.isTweSan = sessionStorage.getItem("healthIndex");
              //   self.isOneSan = sessionStorage.getItem("healthIndex");
              // }
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
      var pathStr = this.lists[ind].path;
      this.$router.push({
        path: "/health/" + pathStr
      });
      sessionStorage.setItem("healthIndex", ind);
      this.isTweSan = ind;
      this.isOneSan = ind;
    },
    // 退出登录
    exitClick() {
      sessionStorage.removeItem("healthIndex");
      this.$router.push({
        path: "/home"
      });
    },
    // 信息登录
    emilaClick() {},
    ...mapActions(["getListResRole"])
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
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #f4f6f9;
}
/*主体部分*/

.content {
  width: 100%;
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
  background-color: #2b3147;
  min-height: calc(100vh - 80px);
}

.sidebar ul {
  margin-top: 10px;
}

.sidebar .oneSan {
  background-color: #1c202e;
}

.liOne {
  display: flex;
  overflow: hidden;
  height: 50px;
  background-color: #2b3147;
  border-bottom: 1px solid #4a4f62;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
}

.liOne > div:nth-child(2) {
  margin-left: 10px;
  width: 28px;
  overflow: hidden;
  height: 18px;
}

.liOne > div:nth-child(2) img {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  margin-top: -10px;
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
}

.liTwo > ul > li > div {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 17px;
  color: #b0afb8;
  overflow: hidden;
}

.liOne .tweSan::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 50px;
  background-color: #51d0c7;
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
  float: left;
  background-color: #51d0c7;
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
  background-color: #51d0c7;
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