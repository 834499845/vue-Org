<!--首页活动-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    首页功能区
                </div>
                <div @click="addClick">
                    新增功能
                </div>
            </div>
            <!-- <div class="moduleButton">
                <div>
                    <div>
                        选择类型：
                    </div>
                    <div>
                      <select @change="selectcodesClick" v-model="codestr">
                                 <option v-for="(type,index) in codes" :key="index" v-bind:value="index">{{type.dictionaryName}}</option>
                       </select>
                    </div>
                </div>
            </div> -->
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                名称
                            </div>
                            <div>
                                图片
                            </div>
                            <div>
                                排序
                            </div>
                            <div>
                                状态
                            </div>
                            <div>
                                默认
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li v-show="lists.length > 0" :key="index" class="dataLi" v-for="(item,index) in lists">
                            <div>
                                {{item.name | strFun}}
                            </div>
                            <div>
                                <img :src="item.iconUrl" alt="">
                            </div>
                            <div class="sortClick">
                                <div v-show="item.defaulted != false">
                                    <img @click="grayupIndexClick" v-show="index == 0" src="/static/img/grayup.png" alt="">
                                    <img @click="changeArr(index,'up')" v-show="index != 0" src="/static/img/up.png">
                                </div>
                                <div v-show="item.defaulted != false">
                                    <img @click="changeArr(index,'down')" v-show="index != item.leng - 1" src="/static/img/down.png">
                                    <img @click="graydownIndexClick" v-show="index == item.leng - 1" src="/static/img/graydown.png" alt="">
                                </div>
                                <div v-show="item.defaulted != true">
                                    <img @click="defaultedIndexClick" src="/static/img/grayup.png">
                                </div>
                                <div v-show="item.defaulted != true">
                                    <img @click="defaultedIndexClick" src="/static/img/graydown.png" alt="">
                                </div>
                            </div>
                            <div>
                              <template v-if="item.status == '1'">
                                <img @click="logicstatusClick(index)" src="/static/img/shi.png" alt="开启" title="开启">
                              </template>
                                <template v-else>
                                  <img @click="logicstatusClick(index)" src="/static/img/fou.png" alt="关闭" title="关闭">
                                </template>
                            </div>
                            <div>
                                <img @click="logicdefaultedClick(index)" v-if="item.defaulted == true" src="/static/img/shi.png" alt="默认" title="默认">
                                <img @click="logicdefaultedClick(index)" v-else src="/static/img/fou.png" alt="关闭" title="关闭">
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <!-- <div>
                                    <img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                                </div> -->
                            </div>
                        </li>
                        <div v-show="lists.length == 0" class="nodataBox">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-hosdel @ok="delClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/commondel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      deling: false,
      loading: false,
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      codes: [
        {
          dictionaryName: "所有",
          dictionaryCode: "0"
        },
        {
          dictionaryName: "默认",
          dictionaryCode: "1"
        }
      ],
      codestr: "0",
      delClickTrue: false,
      changeArrTrue: false,
      logicstatusTrue: false,
      logicdefaultedTrue: false
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
    },
    strFun: function(val) {
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
        self.listFun();
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
      var TOKEN = sessionStorage.getItem("token");
      self.lists = [];
      self
        .getbasehomeFunctionqueryAll({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          token: TOKEN
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.service_items) {
                if (data.data.service_items.length > 0) {
                  var arrs = [];
                  data.data.service_items.forEach(function(ele, ind) {
                    if (ele.defaulted == true) {
                      arrs.push(ele.id);
                    }
                  });
                  var arrNum = arrs.length;
                  data.data.service_items.forEach(function(ele, ind) {
                    self.lists.push({
                      id: ele.id,
                      name: ele.name,
                      code: ele.code,
                      iconUrl: ele.iconUrl,
                      defaulted: ele.defaulted,
                      status: ele.status,
                      leng: arrNum
                    });
                  });
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
          }
        })
        .catch(msg => {
          // console.log(msg)
          self.lists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 编码选择
    selectcodesClick() {
      var self = this;
      if (self.codestr == "0") {
        self.loading = true;
        self.listFun();
      } else {
        self.loading = true;
        var TOKEN = sessionStorage.getItem("token");
        self
          .getbasehomeFunctionqueryDefault({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            token: TOKEN
          })
          .then(data => {
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data) {
                  if (data.data.length > 0) {
                    self.lists = data.data;
                    self.totalNum = data.data.length;
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
            }
          })
          .catch(msg => {
            // console.log(msg)
            self.lists = [];
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 修改banner信息
    updateClick(index) {
      var self = this;
      this.$router.push({
        path: "/common/editActivity",
        query: {
          id: self.lists[index].id
        }
      });
    },
    // 修改状态
    logicstatusClick(index) {
      var self = this;
      if (self.logicstatusTrue == false) {
        self.logicstatusTrue = true;
        var state = "";
        if (self.lists[index].status == 1) {
          state = 0;
        } else {
          state = 1;
        }
        self
          .getbasehomeFunctionstatus({
            id: self.lists[index].id,
            status: state
          })
          .then(data => {
            self.logicstatusTrue = false;
            self.loading = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "操作成功！"
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
            self.logicstatusTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 修改默认
    logicdefaultedClick(index) {
      var self = this;
      var idArr = [];
      self.lists.forEach(function(ele) {
        if (ele.defaulted == true) {
          idArr.push(ele.id);
        }
      });
      if (idArr.length >= 8 && self.lists[index].defaulted == false) {
        self.$message({
          type: "info",
          message: "默认最多只有八个"
        });
      } else {
        if (self.lists[index].defaulted == true) {
          var inarrIndex = 0;
          idArr.forEach(function(ele, ind) {
            if (ele == self.lists[index].id) {
              inarrIndex = ind;
            }
          });
          idArr.splice(inarrIndex, 1);
        } else {
          idArr.push(self.lists[index].id);
        }
        if (self.logicdefaultedTrue == false) {
          self.logicdefaultedTrue = true;
          self.loading = true;
          self
            .getbasehomeFunctionupdateDefault({
              services: JSON.stringify(idArr)
            })
            .then(data => {
              self.logicdefaultedTrue = false;
              self.loading = false;
              if (data.code == 200) {
                self.$message({
                  type: "success",
                  message: "操作成功！"
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
              self.logicdefaultedTrue = false;
              self.loading = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    //上下排序
    changeArr(index, upOrDown) {
      var self = this;
      if (self.changeArrTrue == false) {
        var clickEle = self.lists[index];
        if (upOrDown == "up") {
          if (index <= 0) {
            return;
          } else {
            self.changeArrTrue = true;
            self.loading = true;
            var idArr = [];
            var idStr = self.lists[index].name;
            self.lists.forEach(function(ele) {
              if (ele.defaulted == true) {
                idArr.push(ele.id);
              }
            });
            var inarrIndex = 0;
            idArr.forEach(function(ele, ind) {
              if (ele == self.lists[index].id) {
                inarrIndex = ind;
              }
            });
            idArr.splice(inarrIndex, 1);
            idArr.splice(inarrIndex - 1, 0, self.lists[inarrIndex].id);
            self
              .getbasehomeFunctionupdateDefault({
                services: JSON.stringify(idArr)
              })
              .then(data => {
                self.changeArrTrue = false;
                self.loading = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "操作成功！"
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
                self.changeArrTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        } else if (upOrDown == "down") {
          if (index >= self.lists.length - 1) {
            return;
          } else {
            self.loading = true;
            self.changeArrTrue = true;
            var idArr = [];
            var idStr = self.lists[index].name;
            self.lists.forEach(function(ele) {
              if (ele.defaulted == true) {
                idArr.push(ele.id);
              }
            });
            var inarrIndex = 0;
            idArr.forEach(function(ele, ind) {
              if (ele == self.lists[index].id) {
                inarrIndex = ind;
              }
            });
            idArr.splice(inarrIndex, 1);
            idArr.splice(inarrIndex + 1, 0, self.lists[inarrIndex].id);
            self
              .getbasehomeFunctionupdateDefault({
                services: JSON.stringify(idArr)
              })
              .then(data => {
                self.loading = false;
                self.changeArrTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "操作成功"
                  });
                  self.listFun();
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
        message: "属性处于默认最后一位不支持向下排序!"
      });
    },
    // 禁止向下
    defaultedIndexClick() {
      this.$message({
        type: "info",
        message: "属性不在默认不支持排序!"
      });
    },
    // 删除单页
    deleteClick(index) {
      this.titlename = "单页";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.loading = true;
        self.delClickTrue = true;
        self
          .getcutpageContextdel({
            idJson: '["' + self.lists[self.delIndex].id + '"]'
          })
          .then(data => {
            self.delClickTrue = false;
            self.loading = false;
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              self.$message({
                type: "info",
                message: "删除成功！"
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
            self.delClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 新增活动
    addClick() {
      this.$router.push({
        path: "/common/addActivity"
      });
    },
    ...mapActions([
      "getcutpageContextdel",
      "getbasehomeFunctionupdateDefault",
      "getbasehomeFunctionqueryAll",
      "getbasehomeFunctionqueryDefault",
      "getbasehomeFunctionstatus"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
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

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  height: 50px;
}

.dataLi .operate {
  display: flex;
  align-items: center;
  width: 25%;
}

.dataLi .operate > div {
  width: 24px;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
}

.dataLi .operate > div:nth-child(1) {
  margin-right: 10px;
}

.dataLi .operate > div:nth-child(2) {
  margin-left: 10px;
}

.operate img {
  width: 100%;
  height: 100%;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  font-size: 14px;
  color: #515151;
}

.listCont li > div:nth-child(1) {
  width: 20%;
  border-left: 1px solid #ececec;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.listCont li > div:nth-child(2) {
  width: 15%;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}
.sortClick {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sortClick div {
  padding: 0 10px;
}

.sortClick div img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.dataLi > div:nth-child(2) img {
  height: 40px;
}
.listCont li > div:nth-child(3) {
  width: 15%;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.listCont li > div:nth-child(4) {
  width: 17%;
  overflow: hidden;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.listCont li > div:nth-child(5) {
  width: 18%;
  overflow: hidden;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}
.listCont li > div:nth-child(6) {
  width: 15%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  min-height: 540px;
  margin-top: 32px;
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
  height: 70px;
  display: flex;
  overflow: hidden;
  align-items: center;
}

.moduleButton > div:nth-child(1) {
  height: 30px;
  line-height: 30px;
  display: flex;
}

.moduleButton > div:nth-child(1) > div:nth-child(2) {
  margin-left: 15px;
}
/*删除弹出框*/

.delContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 4px;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.showdel {
  display: none;
}

.but {
  margin-top: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.but > div {
  width: 68px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
}

.but > div:nth-child(1) {
  margin-right: 15px;
  background-color: #fe5371;
}

.but > div:nth-child(2) {
  margin-left: 15px;
  background-color: #d1d1d1;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
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
</style>