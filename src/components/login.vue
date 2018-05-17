<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="login" v-loading="loading">
        <div class="login-title">
            <div>
                <!--<img src="/static/img/tlogo.jpg" alt="">-->
            </div>
            <div>
                伯图全景管理系统
            </div>
        </div>
        <div class="login-cont">
            <div>
                <img src="/static/img/loginBg.png" alt="标志">
            </div>
            <div class="login-input">
                <div class="content" v-loading="loading">
                    <div :class="{'login-user':isloginUser,redInput:isName,grayInput:isGrayName}">
                        <div>
                            <img src="/static/img/账号.png" alt="">
                        </div>
                        <div>
                            <input id="loginInput" type="text" placeholder="请输入账号" v-model="name">
                        </div>
                    </div>
                    <div :class="{'login-psw':isloginUser,redInput:ispassword,grayInput:isGraypassword}">
                        <div>
                            <img src="/static/img/密码.png" alt="">
                        </div>
                        <div>
                            <input id="loginInput1" type="password" v-on:keyup.13.stop="show" placeholder="请输入密码" v-model="password">
                        </div>
                    </div>
                    <!--v-on:keyup.enter="submit"-->
                    <div class="login-but" v-on:click="loginClick">
                        <!-- -->
                        <button v-focus="focusTrue" id="loginInp" v-on:keyup.13.stop="show">
                            登录
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-foot">
            <div>
                苏ICP 8394839583
            </div>
            <div>
                copyright 2017
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      focusTrue: true,
      isloginUser: true,
      isName: false,
      isGrayName: true,
      nameTrue: true,
      ispassword: false,
      isGraypassword: true,
      pswTrue: true,
      checked: false,
      name: "",
      password: "",
      loading: false,
      loginTrue: true
    };
  },
  created: function() {
    var self = this;
    self.name = "";
    self.password = "";
  },
  mounted: function() {
    var self = this;
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("roleId");
  },
  watch: {
    name: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        // this.isName = true
        // this.isGrayName = false
        this.nameTrue = false;
      } else {
        // this.isName = false
        // this.isGrayName = true
        this.nameTrue = true;
      }
    },
    password: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        // this.ispassword = true
        // this.isGraypassword = false
        this.pswTrue = false;
      } else {
        // this.ispassword = false
        // this.isGraypassword = true
        this.pswTrue = true;
      }
    }
  },
  methods: {
    loginClick() {
      var self = this;
      if (self.loginTrue == true) {
        self.loginTrue == false;
        if (this.nameTrue == false || this.name.length == 0) {
          this.$message({
            type: "info",
            message: "账号或密码不能为空!"
          });
          self.loginTrue == true;
        } else if (this.pswTrue == false || this.password.length == 0) {
          this.$message({
            type: "info",
            message: "账号或密码不能为空!"
          });
          self.loginTrue == true;
        } else {
          self.loading = true;
          self
            .login({
              account: self.name,
              password: self.password,
              type: "4"
            })
            .then(data => {
              // console.log('登录', data)
              self.loginTrue == true;
              if (data.code == 200) {
                self.loading = false;
                sessionStorage.setItem("userId", data.data.id);
                sessionStorage.setItem("userAccount", self.name);
                sessionStorage.setItem("token", data.data.token);
                self.$router.push({
                  path: "/home"
                });
                self.$message({
                  type: "success",
                  message: "登录成功!"
                });
                self.isName = false;
                self.isGrayName = true;
                self.nameTrue = true;
                self.ispassword = false;
                self.isGraypassword = true;
                self.pswTrue = true;
              } else {
                self.loading = false;
                self.$message({
                  type: "info",
                  message: data.message
                });
                self.isName = false;
                self.isGrayName = true;
                self.nameTrue = true;
                self.ispassword = false;
                self.isGraypassword = true;
                self.pswTrue = true;
              }
            })
            .catch(msg => {
              // console.log(msg)
              self.loginTrue == true;
              this.$message({
                type: "info",
                message: "服务器异常"
              });
              this.loading = false;
            });
        }
      } else {
        this.$message({
          type: "info",
          message: "正在登陆中请稍后...!"
        });
      }
    },
    show() {
      var self = this;
      if (self.loginTrue == true) {
        self.loginTrue == false;
        if (this.nameTrue == false || this.name.length == 0) {
          this.$message({
            type: "info",
            message: "账号或密码不能为空!"
          });
          self.loginTrue == true;
        } else if (this.pswTrue == false || this.password.length == 0) {
          this.$message({
            type: "info",
            message: "账号或密码不能为空!"
          });
          self.loginTrue == true;
        } else {
          self.loading = true;
          self
            .login({
              account: self.name,
              password: self.password,
              type: "4"
            })
            .then(data => {
              // console.log('登录', data)
              self.loginTrue == true;
              if (data.code == 200) {
                self.loading = false;
                sessionStorage.setItem("userId", data.data.id);
                sessionStorage.setItem("token", data.data.token);
                sessionStorage.setItem("userAccount", self.name);
                self.$router.push({
                  path: "/home"
                });
                self.$message({
                  type: "success",
                  message: "登录成功!"
                });
                self.isName = false;
                self.isGrayName = true;
                self.nameTrue = true;
                self.ispassword = false;
                self.isGraypassword = true;
                self.pswTrue = true;
              } else {
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "账号或密码错误!"
                });
                self.isName = false;
                self.isGrayName = true;
                self.nameTrue = true;
                self.ispassword = false;
                self.isGraypassword = true;
                self.pswTrue = true;
              }
            })
            .catch(msg => {
              // console.log(msg)
              self.loginTrue == true;
              this.$message({
                type: "info",
                message: "服务器异常"
              });
              this.loading = false;
            });
        }
      } else {
        this.$message({
          type: "info",
          message: "正在登陆中请稍后...!"
        });
      }
    },
    ...mapActions(["login"])
  }
};
</script>
<style scoped>
.grayInput {
  border: 1px solid #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
}

input {
  width: 270px;
  height: 32px;
  border: 0 !important;
  font-size: 14px;
  color: #303030;
}

.login-psw {
  margin-top: 24px;
  width: 320px;
  margin-left: 70px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.login-psw > div:nth-child(2) {
  margin-left: 12px;
}

.login-psw > div:nth-child(1) {
  margin-left: 12px;
  width: 22px;
  height: 22px;
}

.login-user > div:nth-child(2) {
  margin-left: 12px;
}

.login-user > div:nth-child(1) {
  margin-left: 12px;
  width: 22px;
  height: 22px;
}

.login-user {
  margin-top: 86px;
  width: 320px;
  margin-left: 70px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.login-but {
  margin-top: 36px;
  width: 320px;
  margin-left: 70px;
  border-radius: 4px;
  background-color: #f17207;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.login-but button {
  background-color: rgba(0, 0, 0, 0);
  width: 320px;
  height: 40px;
  border: 0;
}

.content > div {
  height: 40px;
}

.login-input > div {
  width: 460px;
  height: 350px;
  background-color: #fff;
  border-radius: 4px;
}

input:-webkit-autofill {
  background-color: #fff !important;
  background-image: none !important;
  color: rgb(255, 255, 255) !important;
}

#loginInput {
  background-color: #fff !important;
}
#loginInput1 {
  background-color: #fff !important;
}
.login-title {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
}

.login-title > div:nth-child(1) {
  width: 32px;
  height: 32px;
  margin-left: 104px;
  overflow: hidden;
}

.login-title > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.login-title > div:nth-child(2) {
  font-size: 24px;
  color: #ff6a08;
  margin-left: 10px;
}

.login-cont {
  width: 100%;
  overflow: hidden;
}

.login-cont > div {
  width: 552px;
  height: 500px;
}

.login-cont > div:nth-child(1) {
  /*margin-right: 45px;*/
}

.login-cont > div:nth-child(2) {
  /*margin-left: 45px;*/
  display: flex;
  align-items: center;
}

.login-cont {
  min-height: 500px;
  width: 100%;
  height: calc(100vh - 240px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ea5504;
  background: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(#f68e0a),
    to(#ea5504)
  );
  background: -moz-gradient(
    linear,
    center top,
    center bottom,
    from(#f68e0a),
    to(#ea5504)
  );
  background: -o-gradient(
    linear,
    center top,
    center bottom,
    from(#f68e0a),
    to(#ea5504)
  );
}

.login-foot > div:nth-child(1) {
  margin-right: 27px;
}

.login-foot > div:nth-child(2) {
  margin-left: 27px;
  position: relative;
}

.login-foot > div:nth-child(2):after {
  width: 1px;
  background-color: #979797;
  height: 14px;
  position: absolute;
  top: 4px;
  left: -26px;
  content: "";
}

.login-foot > div {
  font-size: 14px;
  color: #979797;
}

.login-foot {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  overflow: hidden;
}

.login {
  width: 100%;
  height: 100vh;
  min-height: 740px;
}
</style>