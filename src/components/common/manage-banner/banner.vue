<!--banner设置-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    banner设置
                </div>
                <div @click="addCommClick">
                    新增banner
                </div>
            </div>
            <div class="moduleButton">
                <div>
                    选择banner：
                </div>
                <div>
                    <ul>
                        <li v-for="(item,index) in moduleSelect" :class="{'clickOn':isClickOn == index}" @click="moduleSelectClick(index)">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                序号
                            </div>
                            <div>
                                标题
                            </div>
                            <div>
                                链接地址
                            </div>
                            <div>
                                发布时间
                            </div>
                            <div>
                                排序
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <div v-show="dataLists.length == 0" class="nodataBox">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                        <li v-show="dataLists.length > 0" class="dataLi" v-for="(item,index) in dataLists">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.bannerName | withoutFun}}
                            </div>
                            <div>
                                {{item.bannerUrl | withoutFun}}
                            </div>
                            <div>
                                {{item.createDate | UnFormatDates}}
                            </div>
                            <div class="sortClick">
                                <div>
                                    <img @click="grayupIndexClick" v-show="index == 0" src="/static/img/grayup.png" alt="">
                                    <img @click="changeArr(index,'up')" v-show="index != 0" src="/static/img/up.png">
                                </div>
                                <div>
                                    <img @click="changeArr(index,'down')" v-show="index != dataLists.length - 1" src="/static/img/down.png">
                                    <img @click="graydownIndexClick" v-show="index == dataLists.length - 1" src="/static/img/graydown.png" alt="">
                                </div>
                            </div>
                            <div class="operate">
                                <div @click="startactivity(index)" v-show="item.bannerFlag == '1'">
                                    <img src="/static/img/offblue.jpg">
                                </div>
                                <div @click="stopactivity(index)" v-show="item.bannerFlag == '0'">
                                    <img src="/static/img/onblue.jpg">
                                </div>
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png">
                                </div>
                                <div>
                                    <img v-show="dataLists.length > 1" @click="deleteClick(index)" src="/static/img/删除.png">
                                    <img v-show="dataLists.length == 1" @click="lastDeleteClick" src="/static/img/删除灰.png">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/newdel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  computed: mapState(["bannerIndexObj"]),
  data() {
    return {
      getModule: 1,
      isClickOn: 0,
      loading: false,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      checked: false,
      sRecys: ["回收站", "新品"],
      dataLists: [],
      moduleSelect: [
        {
          name: "商城",
          key: "1"
        },
        // { name: "医疗",key:"2" },
        {
          name: "激励",
          key: "3"
        }
      ],
      pageSizeNum: 15,
      currentPage: 1,
      totalNum: 15,
      delIndex: "",
      ids: "",
      changeArrTrue: false,
      batchTrue: false,
      okClickTrue: false
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    UnFormatDates(date) {
      var y, m, d, h, f, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      f = t.getMinutes();
      return (
        y +
        "." +
        (m < 10 ? "0" + m : m) +
        "." +
        (d < 10 ? "0" + d : d) +
        "  " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (f < 10 ? "0" + f : f)
      );
    },
    withoutFun: function(val) {
      if (val) {
        return val;
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
          //   console.log("权限管理",arrs)
        }
      });
      if (arrs.indexOf("banner") == -1) {
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
        if (self.bannerIndexObj.ind != 999999) {
          self.getModule = self.bannerIndexObj.ind;
        }
        if (self.getModule == 1) {
          self.isClickOn = 0;
        } else if (self.getModule == 3) {
          self.isClickOn = 1;
        } else {
          self.getModule = 1;
          self.isClickOn = 0;
        }
        self.bannerList();
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
    // 获取banner设置列表
    bannerList() {
      var self = this;
      self.loading = true;
      self
        .getbannerList({
          bannerModular: this.getModule,
          bannerPosition: 1
        })
        .then(data => {
          self.loading = false;
          //   console.log("banner设置列表", data);
          if (data.code == 200) {
            self.dataLists = data.data;
          } else {
            this.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //模块选择banner点击
    moduleSelectClick(index) {
      this.getModule = this.moduleSelect[index].key;
      this.isClickOn = index;
      this.dataLists = [];
      this.bannerList();
    },
    //上下排序
    changeArr(index, upOrDown) {
      var self = this;
      if (self.changeArrTrue == false) {
        var clickEle = this.dataLists[index];
        if (upOrDown == "up") {
          if (index <= 0) {
            return;
          } else {
            self.changeArrTrue = true;
            self.loading = true;
            self
              .getsortbanner({
                bannerModular: this.getModule,
                bannerPosition: 1,
                bannerId: self.dataLists[index].id,
                operation: "up"
              })
              .then(data => {
                self.changeArrTrue = false;
                self.loading = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "操作成功！"
                  });
                  self.bannerList();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.changeArrTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        } else if (upOrDown == "down") {
          if (index >= self.dataLists.length - 1) {
            return;
          } else {
            self.loading = true;
            self.changeArrTrue = true;
            self
              .getsortbanner({
                bannerModular: self.getModule,
                bannerPosition: 1,
                bannerId: self.dataLists[index].id,
                operation: "down"
              })
              .then(data => {
                self.loading = false;
                self.changeArrTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "操作成功"
                  });
                  self.bannerList();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
                //   console.log(data);
              })
              .catch(msg => {
                self.loading = false;
                self.changeArrTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        }
      }
    },
    // 禁止向上
    grayupIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于第一位不支持向上排序!"
      });
    },
    // 禁止向下
    graydownIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于最后一位不支持向下排序!"
      });
    },
    // 开始或停止活动
    batch(m) {
      var self = this;
      if (self.batchTrue == false) {
        self.batchTrue = true;
        var arr = [];
        var obj = {
          bannerFlag: m,
          id: self.ids,
          bannerModular: self.getModule,
          bannerPosition: 1
        };
        arr.push(obj);
        self
          .geteditbannerList({
            bannerModular: self.getModule,
            bannerPosition: 1,
            bannersJson: JSON.stringify(arr)
          })
          .then(data => {
            self.batchTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "操作成功！"
              });
              self.bannerList();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.batchTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 开始活动
    startactivity(index) {
      var self = this;
      self.ids = self.dataLists[index].id;
      self.batch(0);
    },
    // 停止活动
    stopactivity(index) {
      var self = this;
      self.ids = self.dataLists[index].id;
      self.batch(1);
    },
    // 修改banner信息
    updateClick(index) {
      var self = this;
      self.$router.push({
        path: "/common/editBanner",
        query: {
          ind: self.getModule
        }
      });
      let edata = JSON.stringify(self.dataLists[index]);
      sessionStorage.setItem("edata", edata);
    },
    //最后一个删除
    lastDeleteClick() {
      this.$message({
        type: "info",
        message: "最后一个不能删除！"
      });
    },
    // 删除
    deleteClick(index) {
      if (this.dataLists.length > 1) {
        this.titlename = "banner";
        this.isShowdel = false;
        this.delShow = true;
        this.delIndex = index;
      } else {
        return;
      }
    },
    // 新增活动
    addCommClick() {
      this.$router.push({
        path: "/common/addBanner"
      });
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        self.okClickTrue = true;
        self
          .getdelbanner({
            bannerModular: this.getModule,
            bannerPosition: 1,
            idJson: "['" + self.dataLists[self.delIndex].id + "']"
          })
          .then(data => {
            self.okClickTrue = false;
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });

              self.bannerList();
            } else if (data.code == 605) {
              this.$message({
                type: "info",
                message: "最后一个不能删除！"
              });
            } else {
              self.isShowdel = true;
              self.delShow = false;
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okClickTrue = false;
            self.isShowdel = true;
            self.delShow = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    ...mapActions([
      "getbannerList",
      "getsortbanner",
      "getdelbanner",
      "geteditbannerList"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
/*主页*/

.sale {
  width: 100%;
  height: 100%;
}

.sale > div:nth-child(1) {
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
  min-width: 60px;
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
  min-width: 300px;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.glyphicon-ok {
  color: green;
  font-size: 16px;
}

.glyphicon-remove {
  color: red;
  font-size: 16px;
}

.listCont li {
  display: flex;
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 16px;
  font-weight: bold;
}

.firstLi > div:nth-child(5) {
  min-width: 35px;
}

.firstLi > div:nth-child(6) {
  min-width: 35px;
  width: 25%;
}

.firstLi > div:nth-child(7) {
  min-width: 35px;
}

.firstLi > div:nth-child(8) {
  min-width: 35px;
}

.firstLi > div:nth-child(9) {
  min-width: 70px;
}

.firstLi > div:nth-child(10) {
  min-width: 70px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
}

.dataLi .operate {
  display: flex;
  align-items: center;
  width: 25%;
}

.dataLi .operate > div:nth-child(3) {
  margin: 0 20px;
}

.operate img {
  width: 25px;
  height: 25px;
  font-size: 18px;
  cursor: pointer;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  font-size: 14px;
  color: #515151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 7px;
  line-height: 49px;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 100px;
  overflow: hidden;
}

.listCont li > div:nth-child(2) {
  width: 16%;
  overflow: hidden;
  min-width: 150px;
}

.listCont li > div:nth-child(3) {
  width: 20%;
  min-width: 120px;
}

.listCont li > div:nth-child(4) {
  width: 15%;
  min-width: 120px;
}

.listCont li > div:nth-child(5) {
  width: 15%;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listCont li > div:nth-child(6) {
  width: 24%;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  min-height: 540px;
}

.listTitle {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
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
  margin-bottom: 10px;
}

.menu {
  height: 80px;
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
  color: #303030;
  font-size: 14px;
  margin-right: 5px;
  min-width: 50px;
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

.nodataBox {
  text-align: center;
  margin: 180px 0;
}

.nodataBox p {
  margin-top: 40px;
  font-size: 30px;
  color: #f1f0f0;
}

.moduleButton {
  height: 30px;
  margin: 25px 30px 15px;
  display: flex;
  overflow: hidden;
}

.moduleButton > div:nth-child(1) {
  height: 30px;
  line-height: 30px;
}

.moduleButton > div:nth-child(2) {
  margin-left: 30px;
}

.moduleButton > div:nth-child(2) li {
  margin-bottom: 15px;
  width: 98px;
  height: 28px;
  cursor: pointer;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 26px;
  color: #313131;
  border: 1px solid #d1d1d1;
  float: left;
}

.moduleButton > div:nth-child(2) li:hover {
  border: 1px solid #fe5371;
  color: #fe5371;
}

.moduleButton > div:nth-child(2) .clickOn {
  border: 1px solid #fe5371;
  color: #fe5371;
}

.sortClick div {
  padding: 0 10px;
}

.sortClick div img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>