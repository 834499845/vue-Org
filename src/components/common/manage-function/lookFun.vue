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
                        活动详情
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="list-code">
                    <div>
                        活动名称：
                    </div>
                    <div>
                        {{titleVal}}
                    </div>
                    <div class="list-tost">
                      <!-- 活动名称必填 -->
                    </div>
                </div>
                <div class="uploadingImg">
                    <div>
                        海报图：
                    </div>
                    <div>
                        <img :src="pictureVal" alt="">
                        <!-- <label for="upfile">
                            上传
                        </label> -->
                        <!-- <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange"> -->
                    </div>
                    <div class="list-tost">
                      <!-- 海报图必填 -->
                    </div>
                </div>
                <div class="list-code">
                    <div>
                        活动链接：
                    </div>
                    <div>
                      {{urlVal}}
                        <!-- <input type="text" v-model="urlVal"> -->
                    </div>
                    <div class="list-tost">
                      <!-- 活动链接必填 -->
                    </div>
                </div>
                <div class="list-code">
                    <div>
                        开始时间：
                    </div>
                    <div>
                      {{startDateVal | timeFun}}
                        <!-- <Date-picker :options="pickerOptions" :clearable="true" :editable="false" v-model="startDateVal" type="datetime" format="yyyy-MM-dd HH:mm"
                                placeholder="选择开始时间" style="width: 200px"></Date-picker> -->
                    </div>
                    <div class="list-tost">
                      <!-- 开始时间必填 -->
                    </div>
                </div>
                <div class="list-code">
                    <div>
                        结束时间：
                    </div>
                    <div>
                       {{endDateVal | timeFun}}
                        <!-- <Date-picker :options="pickerOptions" :clearable="true" :editable="false" v-model="endDateVal" type="datetime" format="yyyy-MM-dd HH:mm"
                                placeholder="选择结束时间" style="width: 200px"></Date-picker> -->
                    </div>
                    <div class="list-tost">
                      <!-- 结束时间必填 -->
                    </div>
                </div>
                <div class="list-code">
                    <div>
                        发起人：
                    </div>
                    <div>
                      {{launchVal}}
                        <!-- <input type="text" v-model="launchVal"> -->
                    </div>
                    <div class="list-tost">
                       <!-- 发起人必填 -->
                    </div>
                </div>
                <div class="list-text">
                    <div>
                        活动描述：
                    </div>
                    <div>
                      {{contentVal}}
                        <!-- <textarea v-model="contentVal"></textarea> -->
                    </div>
                    <div class="list-tost">
                      <!-- 活动描述选填 -->
                    </div>
                </div>
                <div class="but">
                    <!-- <div @click="addDoct">修改</div> -->
                    <div @click="canelClick">返回</div>
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
      codes: [
        {
          dictionaryName: "请选择",
          dictionaryCode: "QINGXUNZE"
        }
      ],
      urlVal: "",
      contentVal: "",
      startDateVal: "",
      launchVal: "",
      titleVal: "",
      endDateVal: "",
      pictureVal: "/static/img/uploadone.jpg",
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
          "20" + year + "-" + month + "-" + date + "  " + hour + ":" + minute
        );
      } else {
        return "无";
      }
    }
  },
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
      if (arrs.indexOf("fun") == -1) {
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
        // 获取内容
        self
          .getbasehoteventgetHotEventInfo({
            id: self.$route.query.id
          })
          .then(data => {
            if (data.code == 200) {
              self.urlVal = data.data.url;
              self.contentVal = data.data.content;
              self.startDateVal = data.data.createDate;
              self.launchVal = data.data.launch;
              self.titleVal = data.data.title;
              self.endDateVal = data.data.endDate;
              self.pictureVal = data.data.picture;
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
        // 获取编码
        self
          .getbasefindListByParentId({
            parentId: 3440
          })
          .then(data => {
            // console.log("子字典列表", JSON.parse(JSON.stringify(data)));
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  data.data.forEach(function(ele) {
                    self.codes.push(ele);
                  });
                  self.addTrue = true;
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
            self.loading = false;
            self.lists = [];
            // console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
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
  // 计算属性
  mounted() {},
  //跳转拦截
  // beforeRouteLeave(to, from, next) {
  //   this.toPath = to.path;
  //   if (this.intercept == false) {
  //     this.isShowdels = false;
  //     this.delShows = true;
  //   } else if (this.intercept == true) {
  //     this.isShowdels = true;
  //     this.delShows = false;
  //     next();
  //   }
  // },
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
        path: "/common/fun"
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
            document.getElementById("upfile").value = "";
          } else {
            self.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
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
    vFun() {
      var self = this;
      var phoneReg = new RegExp(/^\d{11}$/);
      var numReg = new RegExp(/^\d{1,7}$/);
      var num1Reg = new RegExp(/^\d{1,2}$/);
      var emailReg = new RegExp(
        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      );
      var strReg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      var nameReg = new RegExp(/^[a-zA-Z\u4e00-\u9fa5]{1,30}$/);
      var vFunFalse = false;
      if (
        nameReg.test(self.titleVal) == true &&
        nameReg.test(self.launchVal) == true &&
        phoneReg.test(self.phoneVal) == true &&
        self.startDateVal &&
        self.endDateVal
      ) {
      } else {
        if (nameReg.test(self.titleVal) == false) {
          self.$message({
            type: "info",
            message: "姓名项为必填且为汉字"
          });
        } else if (phoneReg.test(self.phoneVal) == false) {
          self.$message({
            type: "info",
            message: "手机号项输入不正确"
          });
        } else if (emailReg.test(self.emailVal) == false) {
          self.$message({
            type: "info",
            message: "邮箱项输入不正确"
          });
        }
        vFunFalse = false;
      }
      if (self.backgroundVal) {
        self.addObj["background"] = self.backgroundVal;
      } else {
        delete self.addObj.background;
      }
      if (self.upFileUrl) {
        self.addObj["file"] = self.upFileUrl;
      } else {
        delete self.addObj.file;
      }

      return vFunFalse;
    },
    //确定修改
    addDoct() {
      var self = this;
      if (
        self.pictureVal &&
        self.urlVal &&
        self.titleVal &&
        self.launchVal &&
        self.startDateVal &&
        self.endDateVal
      ) {
        self
          .getbasehoteventeditHotEvent({
            id: self.$route.query.id,
            picture: self.pictureVal,
            url: self.urlVal,
            content: self.contentVal,
            title: self.titleVal,
            launch: self.launchVal,
            startDate: self.startEndFun(self.startDateVal),
            endDate: self.startEndFun(self.endDateVal)
          })
          .then(data => {
            if (data.code == 200) {
              self.intercept = true;
              self.$router.push({
                path: "/common/fun"
              });
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        self.$message({
          type: "info",
          message: "请填写完成必填项"
        });
      }
    },
    ...mapActions([
      "getbasefindListByParentId",
      "getbasehoteventgetHotEventInfo",
      "getbasehoteventeditHotEvent",
      "uploadFile"
    ])
  },
  // 监视
  watch: {}
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
  min-width: 80px;
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
.list-tost {
  font-size: 14px;
  color: #ccc;
  margin-left: 15px;
}
.list-code {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.list-code > div:nth-child(1) {
  min-width: 80px;
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
  border: 1px solid #d1d1d1;
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
  border: 1px solid #d1d1d1;
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