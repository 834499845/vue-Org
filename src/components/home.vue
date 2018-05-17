<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" class="home">
    <div class="nav">
      <div>
        <div>
          <!--<img src="/static/img/tlogo.jpg" alt="">-->
        </div>
        <div>
          <span>伯图全景管理平台</span>
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
        <div class="nav-r-exit">
          <div @click="exitClick">
            <img src="/static/img/tubiao.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-loading="loading">
      <div>
        <ul>
          <li class="navrLi" :key="index" v-for="(item,index) in lists" @click="pathClick(index)">
            <img :src="item.name | imgFun" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from "vuex";
  export default {
    computed: mapState(["colNacs"]),
    data() {
      return {
        loading: false,
        userName: "暂无名称",
        lists: [],
      };
    },
    created: function () {
      var self = this;
      var idStr = sessionStorage.getItem("userId");
      var TOKEN = sessionStorage.getItem("token");
      if (idStr) {
        self.loading = true;
        self
          .getAcountAndRoleList({
            accountId: idStr,
            type: 1
          })
          .then(data => {
            // console.log("用户的角色列表", JSON.parse(JSON.stringify(data)))
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  sessionStorage.setItem("roleId", data.data[0].id);
                  sessionStorage.setItem("userName", data.data[0].name);
                  self.userName = data.data[0].name;
                  self
                    .getListResRole({
                      roleId: data.data[0].id,
                      type: 1
                    })
                    .then(data => {
                      console.log("角色下资源列表", JSON.parse(JSON.stringify(data)))
                      if (data.code == 200) {
                        if (data.data) {
                          if (data.data.length > 0) {
                            var lengthArr = 4 - Math.ceil(data.data.length % 4);
                            var a = 9 % 4;
                            if (a != 4) {
                              for (var i = 0; i < lengthArr; i++) {
                                data.data.push({ name: "" });
                              }
                              self.lists = data.data;
                            } else {
                              self.lists = data.data;
                            }
                            console.log(self.lists)
                            sessionStorage.setItem(
                              "userRole",
                              JSON.stringify(data.data)
                            );
                            // console.log(JSON.parse(sessionStorage.getItem("userRole")))
                          } else {
                            self.lists = [];
                            self.$message({
                              type: "info",
                              message: "该角色下无资源!"
                            });
                          }
                        } else {
                          self.$message({
                            type: "info",
                            message: "该角色下无资源!"
                          });
                          self.lists = [];
                        }
                      } else {
                        self.lists = [];
                        self.$message({
                          type: "info",
                          message: data.message
                        });
                      }
                      self.loading = false;
                    })
                    .catch(msg => {
                      self.$message({
                        type: "info",
                        message: "服务器异常"
                      });
                      // console.log(msg)
                    });
                } else {
                  self.lists = [];
                  self.$message({
                    type: "info",
                    message: "该账户无关联角色!"
                  });
                }
              } else {
                self.lists = [];
                self.$message({
                  type: "info",
                  message: "获取模块失败!"
                });
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
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
            // console.log(msg)
          });
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
    filters: {
      imgFun: function (val) {
        if (val) {
          return "/static/img/" + val + ".png";
        }
      }
    },
    methods: {
      // 导航跳转
      pathClick(index) {
        if (this.lists[index].name.length == 0) {
        } else {
          var pathStr = "/" + this.lists[index].path;
          console.log(pathStr)
          this.$router.push({
            path: pathStr
          });
        }
      },
      exitClick() {
        this.$router.push({
          path: "/login"
        });
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("roleId");
        sessionStorage.removeItem("userName");
      },
      ...mapActions(["getAcountAndRoleList", "getListResRole"])
    }
  };
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background-color: #f4f6f9;
    overflow: hidden;
  }

  .home>div {
    width: 100%;
  }

  .main ul {
    min-height: 200px;
    display: flex;
    align-content: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 50px;
  }

  .navrLi {
    user-select: none;
    /*float: left;*/
    margin: 30px;
    padding: 0;
    border-radius: 3px;
    font-size: 21px;
    font-weight: 700;
    border-radius: 7px;
    /*color: #fff;*/
    width: 280px;
    height: 180px;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    /* overflow: hidden; */
  }

  .navrLi img {
    /* width: 100%; */
    /* height: 100%; */
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 16px;
    background-color: #fff;
  }

  .main>div {
    width: 100%;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    margin-top: 48px;
    margin-bottom: 50px;
  }

  /*导航部分*/

  .nav {
    width: 100%;
    overflow: hidden;
    height: 64px;
    background-color: #fff;
    border-bottom: 1px solid #e1e3e6;
  }

  .nav>div:nth-child(1) {
    min-width: 250px;
    height: 64px;
    margin-left: 104px;
    display: flex;
    float: left;
    align-items: center;
  }

  .nav>div:nth-child(1)>div:nth-child(1) {
    width: 40px;
    height: 40px;
  }

  .nav>div:nth-child(1)>div:nth-child(1) img {
    width: 100%;
    height: 100%;
  }

  .nav>div:nth-child(1)>div:nth-child(2) {
    margin-left: 10px;
  }

  .nav>div:nth-child(1)>div:nth-child(2) span {
    font-size: 26px;
    color: #fe6500;
  }

  .nav-r {
    float: right;
    margin-right: 64px;
  }

  .nav-r>div {
    float: left;
    height: 64px;
    overflow: hidden;
  }

  .nav-r-head {
    min-width: 90px;
    display: flex;
    align-items: center;
  }

  .nav-r-head>div:nth-child(1) {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }

  .nav-r-head>div:nth-child(1) img {
    width: 100%;
    height: 100%;
  }

  .nav-r-head>div:nth-child(2) {
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

  .nav-r-em>div:nth-child(1) {
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
</style>