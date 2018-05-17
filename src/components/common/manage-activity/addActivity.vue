<!--新增单页-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        新增活动
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="list-code">
                    <div>
                        服务项名称：
                    </div>
                    <div>
                        <input type="text" v-model="nameVal" :class="{redInput:isRedtitleVal,grayInput:isGraytitleVal}">
                    </div>
                    <div class="list-tost" :class="{redTest:isRedtitleVal,grayTest:isGraytitleVal}">
                      服务项名称必填
                    </div>
                </div>
                <div class="list-code">
                    <div>
                        服务项Code：
                    </div>
                    <div>
                        <input type="text" v-model="codeVal" :class="{redInput:isRedlaunchVal,grayInput:isGraylaunchVal}">
                    </div>
                    <div class="list-tost" :class="{redTest:isRedlaunchVal,grayTest:isGraylaunchVal}">
                       服务项Code必填
                    </div>
                </div>
                <div class="uploadingImg">
                    <div>
                        海报图：
                    </div>
                    <div>
                        <img :src="pictureVal" alt="" :class="{redInput:isRedpictureVal,grayInput:isGraypictureVal}">
                        <label for="upfile">
                            上传
                        </label>
                        <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                    </div>
                    <div class="list-tost" :class="{redTest:isRedpictureVal,grayTest:isGraypictureVal}">
                      海报图必填
                    </div>
                </div>

                <div class="but">
                    <div @click="addDoct">确定</div>
                    <div @click="canelClick">取消</div>
                </div>
            </div>
        </div>
        <!--未保存拦截提示-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdels}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShows">
                    <v-hosdels @canle="canleClicks" @ok="okclicks" :name="nametitles"></v-hosdels>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
require("../../../../API/config.js");
import intercept from "../../cModule/intercept";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    "v-hosdels": intercept
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },

      urlVal: "",
      contentVal: "",

      startDateVal: "",
      isRedstartDateVal: false,
      isGraystartDateVal: true,
      isstartDateVal: false,

      codeVal: "",
      isRedlaunchVal: false,
      isGraylaunchVal: true,
      islaunchVal: false,

      nameVal: "",
      isRedtitleVal: false,
      isGraytitleVal: true,
      istitleVal: false,

      endDateVal: "",
      isRedendDateVal: false,
      isGrayendDateVal: true,
      isendDateVal: false,

      pictureVal: "/static/img/uploadone.jpg",
      isRedpictureVal: false,
      isGraypictureVal: true,
      ispictureVal: false,

      addTrue: false,
      loading: false,
      content: "",
      addDoctTrue: false,
      editorImg: "",
      isdelPopup: true,
      isShowdels: true,
      delShows: false,
      intercept: false,
      nametitles: "劳动成果还未保存，确定退出？"
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");

    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "公共管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("activity") == -1) {
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
  //跳转拦截
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdels = false;
      this.delShows = true;
    } else if (this.intercept == true) {
      this.isShowdels = true;
      this.delShows = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //确定未保存弹出框退出编辑页面
    okclicks() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    //取消未保存弹出框返回编辑页面
    canleClicks() {
      this.isShowdels = true;
      this.delShows = false;
    },
    // 箭头返回上一页/取消按钮
    canelClick() {
      this.$router.push({
        path: "/common/activity"
      });
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      var files = e.target.files || e.dataTransfer.files;
      if (files[0]) {
        var fileData = files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          var image = new Image();
          image.onload = function() {
            self.uploadImage(files[0]);
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    // 上传图片
    uploadImage(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "component");
      formdata.append("business", "hotevents");
      formdata.append("token", TOKEN);
      self
        .uploadFile(formdata)
        .then(data => {
          if (data.code == 200) {
            this.$message({
              message: "上传图片成功",
              type: "success"
            });
            self.pictureVal = data.data[0].path;
            self.ispictureVal = true;
            document.getElementById("upfile").value = "";
          } else {
            self.$message(data.message);
            self.ispictureVal = false;
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
          self.ispictureVal = false;
        });
    },
    // 提交日期格式化
    startEndFun(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      i = t.getMinutes();
      s = t.getSeconds();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (i < 10 ? "0" + i : i) +
        ":" +
        (s < 10 ? "0" + s : s)
      );
    },
    //确定新增
    addDoct() {
      var self = this;
      if (
        self.istitleVal == true &&
        self.ispictureVal == true &&
        self.islaunchVal == true
      ) {
        if (self.addDoctTrue == false) {
          self.addDoctTrue = true;
          self
            .getbasehomeFunctioncreate({
              iconUrl: self.pictureVal,
              name: self.nameVal,
              code: self.codeVal,
              params: ""
            })
            .then(data => {
              self.addDoctTrue = false;
              if (data.code == 200) {
                self.intercept = true;
                self.$router.push({
                  path: "/common/activity"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.addDoctTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      } else {
        if (self.istitleVal == false) {
          self.isRedtitleVal = true;
          self.isGraytitleVal = false;
        } else {
          self.isRedtitleVal = false;
          self.isGraytitleVal = true;
        }
        if (self.islaunchVal == false) {
          self.isRedlaunchVal = true;
          self.isGraylaunchVal = false;
        } else {
          self.isRedlaunchVal = false;
          self.isGraylaunchVal = true;
        }
        if (self.ispictureVal == false) {
          self.isRedpictureVal = true;
          self.isGraypictureVal = false;
        } else {
          self.isRedpictureVal = false;
          self.isGraypictureVal = true;
        }
      }
    },
    ...mapActions(["getbasehomeFunctioncreate", "uploadFile"])
  },
  // 监视
  watch: {
    nameVal: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.istitleVal = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedtitleVal = false;
          this.isGraytitleVal = true;
          this.istitleVal = true;
        } else {
          this.istitleVal = false;
        }
      }
    },
    codeVal: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.islaunchVal = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedlaunchVal = false;
          this.isGraylaunchVal = true;
          this.islaunchVal = true;
        } else {
          this.islaunchVal = false;
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

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.listTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.listTitle > div > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.listTitle > div > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 10px;
}

.list {
  min-height: 540px;
  margin-top: 25px;
  overflow: hidden;
}

.uploadingImg > div:nth-child(2) {
  height: 52px;
  min-width: 100px;
  position: relative;
  overflow: hidden;
  margin-left: 15px;
}

.uploadingImg > div:nth-child(2) label {
  cursor: pointer;
  width: 80px;
  height: 28px;
  border-radius: 4px;
  background: #fe5371;
  font-weight: normal;
  text-align: center;
  line-height: 28px;
  color: #fff;
  margin-left: 23px;
}

input[type="file"] {
  display: none;
}
.uploadingImg {
  display: flex;
  margin-bottom: 25px;
  align-items: center;
}
.uploadingImg > div:nth-child(1) {
  min-width: 100px;
  text-align: right;
}
.uploadingImg > div:nth-child(2) img {
  width: 80px;
  height: 50px;
}

.uploadingImg > div:nth-child(2) span {
  position: absolute;
  top: 10px;
  left: 200px;
}
.list-url > div:nth-child(2) {
  font-size: 14px;
  margin-top: 7px;
  color: #ccc;
  margin-left: 15px;
}
.list-tost-url {
  font-size: 14px;
  color: #ccc;
  margin-left: 15px;
  margin-bottom: 31px;
}

.list-link {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  height: 63px;
}

.list-link > div:nth-child(1) {
  min-width: 80px;
  text-align: right;
  height: 63px;
}

.list-link > div:nth-child(2) {
  margin-left: 15px;
  height: 63px;
}
.list-tost {
  font-size: 14px;
  margin-left: 15px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
}
.list-code {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.list-code > div:nth-child(1) {
  min-width: 100px;
  text-align: right;
}

.list-code > div:nth-child(2) {
  margin-left: 15px;
}

.list-text {
  display: flex;
  align-items: center;
  margin-bottom: 34px;
  height: 75px;
}

.list-text > div:nth-child(1) {
  min-width: 80px;
  text-align: right;
  height: 75px;
}
.list-text > div:nth-child(2) textarea {
  height: 70px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}
.list-text > div:nth-child(2) {
  margin-left: 15px;
  height: 75px;
}
.list-code input {
  width: 250px;
  height: 32px;
  border-radius: 4px;
  padding-left: 5px;
}

.but {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.list > div {
  width: 100%;
  overflow: hidden;
}

.list .but > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #fe5371;
  margin-right: 25px;
  cursor: pointer;
}

.list .but > div:nth-child(2) {
  margin-left: 25px;
  width: 68px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #aeaeae;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

select {
  width: 144px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
  /*padding-left: 14px;*/
  font-size: 14px;
  color: #97969b;
  /* border: 1px solid #d1d1d1; */
  /*text-align: center;*/
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

/*提示信息弹出框*/

.delContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 280px) / 2) auto;
  z-index: 100000;
}

.showdel {
  display: none;
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
</style>