<!--系统设置-热词管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="sale">
        <div>
            <div class="listTitle">
                <div>
                    热词管理
                </div>
                <div @click="addClick">
                    新增热词
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="list-cont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                热搜词语
                            </div>
                            <div>
                                创建时间
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li v-show="lists.length > 0" class="dataLi" v-for="(item,index) in lists">
                            <div>
                                {{item.hotWord}}
                            </div>
                            <div>
                                {{item.createDate | timeFun}}
                            </div>
                            <div class="operation">
                                <div @click="compileClick(index)">
                                    <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div @click="deleteClick(index)">
                                    <img src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                        <li class="noList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--添加弹出框-->
        <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding">
                    <div class="addTitle">
                    </div>
                    <div class="addNa">
                        <div>
                            热词：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addInput:isaddattributeValue,grayInput:isRrayattributeValue}" maxlength="4" type="text"
                                    v-model="hotWord">
                            </div>
                            <div :class="{addTest:isaddattributeValue,grayTest:isRrayattributeValue}">
                                可输入4个汉字
                            </div>
                        </div>
                    </div>
                    <div class="adBut">
                        <div @click="butAddClick">确定</div>
                        <div @click="cancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @ok="delClick()" @canle="cancelClcik" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/storeDel";
export default {
  components: {
    "v-storeDel": storeDel
  },
  data() {
    return {
      deling: false,
      loading: false,
      adding: false,
      lists: [],
      hotWord: "",
      isRrayattributeValue: true,
      isaddattributeValue: false,
      isattributeValue: false,
      isAddPopup: true,
      isShowAdd: true,
      addShow: false,
      upOrAd: 1,
      upIndex: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      delClickTrue: false,
      butAddClickTrue: false
    };
  },
  // 过滤
  filters: {
    timeFun: function(val) {
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
      return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
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
            if (one.name == "系统设置") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("system") == -1) {
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
        if (comms.indexOf("hotword") == -1) {
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
        .getstorehotSearchgetHotSearch({
          type: "mall"
        })
        .then(data => {
          self.loading = false;
          //   console.log("热搜列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.lists = data.data;
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
    // 编辑弹出框
    compileClick(ind) {
      this.isShowAdd = false;
      this.addShow = true;
      this.hotWord = this.lists[ind].hotWord;
      this.upOrAd = 2;
      this.upIndex = ind;
    },
    // 删除弹出框
    deleteClick(ind) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = ind;
      this.titlename = "热词";
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.deling = true;
        self.delClickTrue = true;
        self
          .getstorehotSearchdelete({
            type: "mall",
            idJson: "[" + self.lists[self.delIndex].id + "]"
          })
          .then(dataThr => {
            self.deling = false;
            self.delClickTrue = false;
            if (dataThr.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.isShowdel = true;
              self.delShow = false;
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.delClickTrue = false;
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 添加弹出框
    addClick() {
      this.isShowAdd = false;
      this.addShow = true;
      this.upOrAd = 1;
    },
    // 确认添加或者修改
    butAddClick() {
      var self = this;
      if (self.butAddClickTrue == false) {
        if (self.isattributeValue == true) {
          if (self.upOrAd == 1) {
            if (self.lists.length < 5) {
              self.adding = true;
              self.butAddClickTrue = true;
              self
                .getstorehotSearchadd({
                  type: "mall",
                  hotWord: self.hotWord,
                  showFlag: 0
                })
                .then(data => {
                  self.adding = false;
                  self.butAddClickTrue = false;
                  self.isShowAdd = true;
                  self.addShow = false;
                  self.hotWord = "";
                  if (data.code == 200) {
                    self.$message({
                      type: "info",
                      message: "添加成功!"
                    });
                    self.listFun();
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.adding = false;
                  self.butAddClickTrue = false;
                  self.isShowAdd = true;
                  self.addShow = false;
                  self.hotWord = "";
                  self.$message({
                    type: "info",
                    message: "服务器错误"
                  });
                });
            } else {
              self.$message({
                type: "info",
                message: "热词最多五条!"
              });
            }
          } else {
            self.adding = true;
            self.butAddClickTrue = true;
            self
              .getstorehotSearchupdate({
                id: self.lists[self.upIndex].id,
                hotWord: self.hotWord,
                showFlag: 0
              })
              .then(dataThr => {
                self.adding = false;
                self.butAddClickTrue = false;
                self.hotWord = "";
                self.isShowAdd = true;
                self.addShow = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "info",
                    message: "修改成功!"
                  });

                  self.listFun();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.hotWord = "";
                self.isShowAdd = true;
                self.addShow = false;
                self.butAddClickTrue = false;
                self.adding = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          }
        } else {
          if (self.isattributeValue == false) {
            self.isRrayattributeValue = false;
            self.isaddattributeValue = true;
          } else {
            self.isRrayattributeValue = true;
            self.isaddattributeValue = false;
          }
        }
      }
    },
    // 取消弹出框
    cancelClcik() {
      this.isShowdel = true;
      this.delShow = false;
      this.isShowAdd = true;
      this.addShow = false;
    },
    ...mapActions([
      "getstorehotSearchgetHotSearch",
      "getstorehotSearchupdate",
      "getstorehotSearchdelete",
      "getstorehotSearchadd"
    ])
  },
  // 监视
  watch: {
    hotWord: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        this.isattributeValue = false;
      } else {
        if (trimstr.length < 5) {
          this.isRrayattributeValue = true;
          this.isaddattributeValue = false;
          this.isattributeValue = true;
        } else {
          this.isattributeValue = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.addTest {
  color: #fe5371;
}

.grayTest {
  color: #d1d1d1;
}

.addPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addContent > div:nth-child(1) {
  height: 15px;
  width: 100%;
}

.addContent input {
  width: 270px;
  height: 32px;
  border-radius: 4px;
  color: #303030;
  text-align: center;
}

.addContent {
  width: 450px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.showAdd {
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

.adBut {
  width: 100%;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.adBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.adBut > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #fe5371;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.adBut > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addNa {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
  margin-top: 20px;
}

.addNa > div:nth-child(2) {
  margin-left: 15px;
  /*border: 1px solid red;*/
  height: 70px;
  overflow: hidden;
}

.addNa > div:nth-child(2) > div {
  width: 280px;
  overflow: hidden;
}

.addNa > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.addNa > div:nth-child(1) {
  width: 105px;
  height: 70px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  padding-top: 5px;
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
/*主页*/

.list .noList {
  height: 400px;
  border: 0;
}

.list .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.firstLi > div {
  height: 58px;
  border-right: 1px solid #d1d1d1;
}

.firstLi {
  border-top: 1px solid #d1d1d1;
  background-color: #f2f4f8;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.dataLi > div {
  height: 50px;
  border-right: 1px solid #d1d1d1;
}

.list-cont li > div {
  width: 33.33333333%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-cont li > div:nth-child(1) {
  border-left: 1px solid #d1d1d1;
}

.list-cont li {
  min-height: 50px;
  border-bottom: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
}

.list-cont {
  width: 100%;
  min-height: 450px;
  margin-top: 24px;
}

.operation {
  display: flex;
}

.operation > div {
  width: 24px;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
}

.operation > div img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.operation > div:nth-child(1) {
  margin-right: 10px;
}

.operation > div:nth-child(2) {
  margin-left: 10px;
}

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
</style>