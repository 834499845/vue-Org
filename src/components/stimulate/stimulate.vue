<!--新闻-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div id="app" class="store">
		<!--导航-->
		<div class="nav">
			<div>
				<div>
					<span>激励管理后台</span>
				</div>
			</div>
			<div class="nav-r">
				<div class="nav-r-head">
					<div>
						<img src="/static/img/admin.JPG" alt="">
					</div>
					<div>
						{{username}}
					</div>
				</div>
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
					<li v-for="(itemo,ind) in lists">
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
      isGlyphicon: true,
      isGlyphiconTriangleRight: true,
      isRotateCl: 0,
      isTweSan: 0,
      isRotateCl: 0,
      isTweSan: 0,
      isOneSan: 0,
      twoShow: 0,
      isliOne: true,
      listCopys: [
        {
          name: "活动管理",
          children: [],
          path: "activity"
        }
        // {
        //     name: 'banner设置', twoList: [
        //     ],
        //     path: 'bannerSet'
        // },
      ],
      lists: [],
      twoShow: 0,
      username: "暂无名称"
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var username = sessionStorage.getItem("userName");
    this.username = username == null ? "暂无名称" : username;
    var self = this;
    var idStr = sessionStorage.getItem("userId");
    var paths = this.$route.path.split("/");
    var oneStr = paths[2];
    var twoStr = paths[3];
    switch (oneStr) {
      case "activity":
        this.twoShow = 0;
        this.isRotateCl = 0;
        this.isTweSan = 0;
        this.isOneSan = 0;
        break;
      default:
        break;
    }
    self.fetchData();
  },
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    // 路由监视
    fetchData() {
      var self = this;
      var userRoleOBj = sessionStorage.getItem("userRole");
      userRoleOBj = JSON.parse(userRoleOBj);

      var paths = this.$route.path.split("/");
      var oneStr = paths[2];
      var idStr = sessionStorage.getItem("userId");
      if (idStr) {
        var roleIdStr = sessionStorage.getItem("roleId");
        var TOKEN = sessionStorage.getItem("token");
        if (userRoleOBj) {
          if (userRoleOBj.length > 0) {
            var arrs = [];
            var arrs_1 = [];
            var flag = false;
            userRoleOBj.forEach(function(ele, ind) {
              if (ele.name == "激励管理") {
                self.lists = ele.children;
                ele.children.forEach(function(one, oneIndex) {
                  arrs.push(one.path);
                });
                return (flag = true);
              }
            });
            // console.log(arrs, 'arrs')
            if (flag == false) {
              var warningStr = "没有权限访问";
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
            } else {
              for (var i = 0; i < arrs.length; i++) {
                if (arrs[i] == "activity") {
                  arrs_1.push("activity", "addactivity", "editactivity");
                }
              }
              if (oneStr == undefined || oneStr == "") {
                self.$router.push({
                  path: "/stimulate/" + arrs[0]
                });
              } else {
                if (arrs_1.indexOf(oneStr) == -1) {
                  // console.log(arrs_1, 'arrs_1')
                  alert("1212");
                  var warningStr = "没有权限访问";
                  self
                    .$alert(warningStr, "提示", {
                      confirmButtonText: "确定",
                      type: "info"
                    })
                    .then(() => {
                      self.$router.push({
                        path: "/stimulate/" + arrs[0]
                      });
                    })
                    .catch(() => {
                      self.$router.push({
                        path: "/login" + arrs[0]
                      });
                    });
                }
              }
            }
          }
        }
        // })
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
      this.isTweSan = ind;
      this.isOneSan = ind;
      var pathStr = this.lists[ind].path;
      this.$router.push({
        path: "/stimulate/" + pathStr
      });
    },
    // 退出登录
    exitClick() {
      this.$router.push({
        path: "/home"
      });
    },
    ...mapActions([""])
  },
  // 监视
  watch: {
    $route: "fetchData"
  }
};
</script>
<style scoped>
.store {
  background-color: #f4f6f9;
}
/*主体部分*/

.content {
  width: 100%;
  /*min-height: 700px;*/
  min-height: calc(100vh - 80px);
  display: flex;
  overflow: hidden;
  margin-top: 16px;
  background-color: #f4f6f9;
}
/*侧栏导航*/

.sidebar {
  width: 212px;
  border-right: 1px solid #f4f6f9;
  overflow: hidden;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #2b3147;
  min-height: calc(100vh - 80px);
}

.sidebar .oneSan {
  background-color: #1c202e;
}

.sidebar > ul {
  margin-top: 10px;
}

.liOne {
  display: flex;
  overflow: hidden;
  height: 48px;
  background-color: #2b3147;
  border-bottom: 1px solid #404659;
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  position: relative;
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
  height: 48px;
  background-color: #fd5851;
  content: "";
}
/*子页面*/

.main {
  width: calc(100% - 252px);
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
  width: 212px;
  height: 64px;
  line-height: 64px;
  float: left;
  background-color: #ee3100;
  text-align: center;
  color: #fff;
  line-height: 64px;
}

.nav > div:nth-child(1) > div {
  color: #fff;
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
<!--激励管理公共样式-->
<style>
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
  height: 238px;
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

.wangEditor-container {
  margin-left: 234px !important;
  margin-top: 30px !important;
  width: 827px !important;
}

.wangEditor-menu-container .menu-group {
  padding: 0 2px !important;
}

label {
  margin-bottom: 0 !important;
}

select {
  outline: none;
}

.nodataBox {
  text-align: center;
  margin: 180px 0;
}

.nodataBox p {
  margin-top: 40px;
  font-size: 30px;
  color: #f1f0f0;
}

#backTop {
  position: fixed;
  bottom: 30px;
  right: 47px;
  width: 40px;
  height: 40px;
  background: url("/static/img/top.png") no-repeat;
  z-index: 999;
}

.listCont .el-checkbox__label {
  padding-left: 17px !important;
}

p {
  margin: 0;
}

input[type="file"] {
  display: none;
}

input[type="button"] {
  border: none;
}

textarea {
  outline: none;
  resize: none;
  padding-left: 5px;
  border: 1px solid #d1d1d1;
}

.nodataBox {
  text-align: center;
  margin: 180px 0;
}

.nodataBox p {
  margin-top: 40px;
  font-size: 30px;
  color: #f1f0f0;
}
/*.el-time-spinner__list::after, .el-time-spinner__list::before {
    content: '';
    display: block;
    width: 100%;
    height: 72px!important;
}*/

.ivu-date-picker {
  width: 137px !important;
}

.ivu-input-wrapper {
  margin-top: -4px !important;
  margin-left: -1px !important;
}
</style>