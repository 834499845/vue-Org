<!--健康建议-->
<template>
    <div class="Suggest">
        <div>
            <div class="listTitle">
                <div>
                    健康建议
                </div>
                <!--<div @click="addSuggestClick">
                    新增建议
                </div>-->
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <ul>
                    <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists">
                        <div>
                            {{item.title}}
                        </div>
                        <div class="dataLiHeiLow" v-show="item.conts.length > 0">
                            <ul>
                                <li v-for="(cont,ind) in item.conts">
                                    <div>
                                        {{cont.name}}：
                                    </div>
                                    <div>
                                        <div>{{cont.height | lowHeiFun}}</div>
                                        <div>{{cont.low | lowHeiFun}}</div>
                                    </div>
                                    <div class="operate">
                                        <img @click="operateUpClick(index,ind)" v-show="cont.height.length > 0" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                        <img @click="operateAddClick(index,ind)" v-show="cont.height.length == 0" src="/static/img/添加.png" alt="添加" title="添加">
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="newClass" v-show="item.conts.length == 0">
                            暂无数据...
                        </div>
                    </li>
                    <li class="nothingLi" v-show="lists.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="暂无图片">
                        </div>
                    </li>
                    <li class="lastLi" v-show="lists.length == 0">
                        <div class="lastLiLeft">

                        </div>
                        <div class="lastLiRight">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--添加弹出框-->
        <div :class="{addPopup:isaddPopup,showadd:isShowadd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding">
                    <div class="priority">
                        <div>优先级：</div>
                        <div>
                            <input type="number" v-model.number="priorityNum" placeholder="只允许数字">
                        </div>
                    </div>
                    <div class="reminder">
                        <div>
                            偏高提示语：
                        </div>
                        <div>
                            <textarea name="" v-model="high"></textarea>
                        </div>
                    </div>
                    <div class="reminder">
                        <div>
                            偏低提示语：
                        </div>
                        <div>
                            <textarea name="" v-model="low"></textarea>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addClick">添加</div>
                        <div @click="canlelClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--更新弹出框-->
        <div :class="{upPopup:isupPopup,showup:isShowup}">
            <transition name="slide-fade">
                <div class="upContent" v-show="upShow" v-loading="uping">
                    <div class="priority">
                        <div>优先级：</div>
                        <div>
                            <input type="text" v-model="UppriorityNum">
                        </div>
                    </div>
                    <div class="reminder">
                        <div>
                            偏高提示语：
                        </div>
                        <div>
                            <textarea v-model="Uphigh"></textarea>
                        </div>
                    </div>
                    <div class="reminder">
                        <div>
                            偏低提示语：
                        </div>
                        <div>
                            <textarea v-model="Uplow"></textarea>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="upClick">修改</div>
                        <div @click="canlelClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      loading: false,
      uping: false,
      adding: false,
      isupPopup: true,
      isShowup: true,
      upShow: false,
      isaddPopup: true,
      isShowadd: true,
      addShow: false,
      lists: [],
      priorityNum: "",
      high: "",
      low: "",
      ondIndex: "",
      twoIndex: "",
      UppriorityNum: 0,
      Uphigh: "",
      Uplow: "",
      ondupIndex: "",
      twoupIndex: "",
      addClickTrue: false,
      upClickTrue: false,
      UphighReg: true,
      UplowReg: true,
      UppriorityNumReg: true,
      highReg: true,
      lowReg: true,
      priorityNumReg: true
    };
  },
  // 过滤
  filters: {
    lowHeiFun: function(val) {
      if (val) {
        return val;
      } else {
        return "暂无信息";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    self.loading = true;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");

    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "健康管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("suggest") == -1) {
        self.loading = true;
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
      self.loading = true;
      // 查询标准提示语
      self
        .getLrtzFromRedisList({})
        .then(data => {
          // console.log("查询已录入的体征", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                var cont = data.data;
                var heyLows = [];
                cont.forEach(function(one, oneInd) {
                  heyLows.push({
                    title: one.key,
                    conts: []
                  });
                  one.value.forEach(function(two, twoIndex) {
                    // heyLows.push({ name: two.name, code: two.code, height: '', low: '' })
                    if (
                      two.optionList.length == 0 &&
                      two.indexRangeDTOList.length == 0
                    ) {
                    }
                    if (two.type == 5) {
                      // heyLows[oneInd].conts.push({ name: two.name, code: two.code, height: '', low: '', id: '', pre: '' })
                      if (two.indexRangeDTOList) {
                        if (two.indexRangeDTOList.length > 0) {
                          two.indexRangeDTOList.forEach(function(
                            four,
                            fourIndex
                          ) {
                            heyLows[oneInd].conts.push({
                              name: two.name + "-" + four.name,
                              code: four.code,
                              height: "",
                              low: "",
                              id: "",
                              pre: ""
                            });
                          });
                        }
                      }
                    } else if (two.type == 3) {
                      heyLows[oneInd].conts.push({
                        name: two.name,
                        code: two.code,
                        height: "",
                        low: "",
                        id: "",
                        pre: ""
                      });
                    } else if (two.type == 4) {
                      // heyLows[oneInd].conts.push({ name: two.name, code: two.code, height: '', low: '', id: '', pre: '' })
                      if (two.optionList) {
                        if (two.optionList.length > 0) {
                          two.optionList.forEach(function(therr, therrIndex) {
                            // heyLows.push({ name: two.name + '-' + therr.value, code: therr.key, height: '', low: '' })
                            // if (therr.type != 3) {
                            //     heyLows[oneInd].conts.push({ name: two.name + '-' + therr.value, code: therr.key, height: '', low: '', id: '', pre: '' })
                            // }
                            heyLows[oneInd].conts.push({
                              name: two.name + "-" + therr.value,
                              code: therr.key,
                              height: "",
                              low: "",
                              id: "",
                              pre: ""
                            });
                          });
                        }
                      }
                    } else if (two.type == 1) {
                      // heyLows[oneInd].conts.push({ name: two.name, code: two.code, height: '', low: '', id: '', pre: '' })
                    } else if (two.type == 6) {
                      // heyLows[oneInd].conts.push({ name: two.name, code: two.code, height: '', low: '', id: '', pre: '' })
                    } else if (two.type == 7) {
                      // heyLows[oneInd].conts.push({ name: two.name, code: two.code, height: '', low: '', id: '', pre: '' })
                    } else {
                      heyLows[oneInd].conts.push({
                        name: two.name,
                        code: two.code,
                        height: "",
                        low: "",
                        id: "",
                        pre: ""
                      });
                    }
                  });
                });
                self
                  .getFindTipList({})
                  .then(data => {
                    // console.log("查询标准提示语", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.length > 0) {
                          // heyLows.forEach(function (ele, index) {
                          //     tips.forEach(function (tip, ind) {
                          //         if (ele.code == tip.dictionaryCode) {
                          //             heyLows[index].height = tip.highContent
                          //             heyLows[index].low = tip.lowContent
                          //         }
                          //     })
                          // })
                          // console.log(self.lists)
                        }
                        self.Tips = data.data;
                        var tips = data.data;
                        heyLows.forEach(function(ele, eleIndex) {
                          ele.conts.forEach(function(cont, contInd) {
                            tips.forEach(function(tip, tipIndex) {
                              if (cont.code == tip.dictionaryCode) {
                                heyLows[eleIndex].conts[contInd].height =
                                  tip.highContent;
                                heyLows[eleIndex].conts[contInd].low =
                                  tip.lowContent;
                                heyLows[eleIndex].conts[contInd].id = tip.id;
                                heyLows[eleIndex].conts[contInd].pre =
                                  tip.priority;
                              }
                            });
                          });
                        });
                        self.lists = heyLows;
                        self.loading = false;
                        // console.log("查询标准完成版", JSON.parse(JSON.stringify(self.lists)))
                      } else {
                        self.loading = false;
                        self.lists = [];
                      }
                    } else {
                      self.loading = false;
                      self.lists = [];
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    // console.log(msg)
                    self.loading = false;
                    self.lists = [];
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                self.loading = false;
                self.lists = [];
              }
            } else {
              self.loading = false;
              self.lists = [];
            }
          } else {
            self.loading = false;
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
          // console.log(msg)
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 修改建议
    operateUpClick(index, tIndex) {
      var self = this;
      this.isShowup = false;
      this.upShow = true;
      this.UppriorityNum = self.lists[index].conts[tIndex].pre;
      this.Uphigh = self.lists[index].conts[tIndex].height;
      this.Uplow = self.lists[index].conts[tIndex].low;
      this.ondupIndex = index;
      this.twoupIndex = tIndex;
    },
    // 确认修改
    upClick() {
      var self = this;
      if (self.upClickTrue == false) {
        if (
          self.UphighReg == false &&
          self.UplowReg == false &&
          self.UppriorityNumReg == false
        ) {
          self.uping = true;
          self.upClickTrue = true;
          self
            .getUpTipOne({
              id: self.lists[self.ondupIndex].conts[self.twoupIndex].id,
              dictionaryCode:
                self.lists[self.ondupIndex].conts[self.twoupIndex].code,
              highContent: self.Uphigh,
              lowContent: self.Uplow,
              priority: self.UppriorityNum
            })
            .then(data => {
              self.upClickTrue = false;
              self.isShowup = true;
              self.upShow = false;
              self.uping = false;
              if (data.code == 200) {
                self.listFun();
                self.$message({
                  type: "success",
                  message: "修改建议成功!"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.upClickTrue = false;
              self.isShowup = true;
              self.upShow = false;
              self.uping = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          var numReg = new RegExp(/^\d{1,5}$/);
          if (numReg.test(self.UppriorityNum * 1) == false) {
            self.$message({
              type: "info",
              message: "优先级不能为0-10000!"
            });
          } else if (self.Uphigh.length >= 51 || self.Uphigh.length == 0) {
            self.$message({
              type: "info",
              message: "偏高提示语0-50字!"
            });
          } else if (self.Uplow.length >= 51 || self.Uplow.length == 0) {
            self.$message({
              type: "info",
              message: "偏低提示语0-50字!"
            });
          }
        }
      }
    },
    // 添加建议弹框
    operateAddClick(index, tIndex) {
      this.isShowadd = false;
      this.addShow = true;
      this.ondIndex = index;
      this.twoIndex = tIndex;
    },
    // 添加建议
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var priNum = self.priorityNum * 1;
        if (
          self.highReg == false &&
          self.lowReg == false &&
          self.priorityNumReg == false
        ) {
          self.adding = true;
          var dictions =
            "[" +
            '"' +
            self.lists[self.ondIndex].conts[self.twoIndex].code +
            '"' +
            "]";
          var hightCont = "[" + '"' + self.high + '"' + "]";
          var lowConten = "[" + '"' + self.low + '"' + "]";
          var priorityJ = "[" + '"' + self.priorityNum + '"' + "]";
          self.addClickTrue = true;
          self
            .getAddTips({
              dictionaryCodeJson: dictions,
              hightContentJson: hightCont,
              lowContentJson: lowConten,
              priorityJson: priorityJ
            })
            .then(data => {
              self.addClickTrue = false;
              self.adding = false;
              self.isShowadd = true;
              self.addShow = false;
              if (data.code == 200) {
                self.listFun();
                self.high = "";
                self.low = "";
                self.priorityNum = "";
                self.$message({
                  type: "success",
                  message: "添加建议成功!"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.addClickTrue = false;
              self.adding = false;
              self.isShowadd = true;
              self.addShow = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          var numReg = new RegExp(/^\d{1,5}$/);
          if (numReg.test(self.priorityNum * 1) == false) {
            self.$message({
              type: "info",
              message: "优先级不能为0-10000!"
            });
          } else if (self.high.length >= 51 || self.high.length == 0) {
            self.$message({
              type: "info",
              message: "偏高提示语0-50字!"
            });
          } else if (self.low.length >= 51 || self.low.length == 0) {
            self.$message({
              type: "info",
              message: "偏低提示语0-50字!"
            });
          }
        }
      }
    },
    // 取消弹框
    canlelClick() {
      this.isShowadd = true;
      this.addShow = false;
      this.isShowup = true;
      this.upShow = false;
      this.high = "";
      this.low = "";
      this.priorityNum = "";
      this.Uphigh = "";
      this.Uplow = "";
      this.UppriorityNum = "";
    },
    ...mapActions([
      "getFindTipList",
      "getAddTips",
      "getUpTipOne",
      "getLrtzFromRedisList",
      "getListResRole"
    ])
  },
  // 监视
  watch: {
    Uphigh: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
      if (val.length > 0 && val.length < 50) {
        this.UphighReg = false;
      } else {
        this.UphighReg = true;
      }
    },
    Uplow: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
      if (val.length > 0 && val.length < 50) {
        this.UplowReg = false;
      } else {
        this.UplowReg = true;
      }
    },
    UppriorityNum: function(val) {
      var numReg = new RegExp(/^\d{1,5}$/);
      if (numReg.test(val * 1) == true) {
        this.UppriorityNumReg = false;
      } else {
        this.UppriorityNumReg = true;
      }
    },
    high: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
      if (val.length > 0 && val.length < 50) {
        this.highReg = false;
      } else {
        this.highReg = true;
      }
    },
    low: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
      if (val.length > 0 && val.length < 50) {
        this.lowReg = false;
      } else {
        this.lowReg = true;
      }
    },
    priorityNum: function(val) {
      var numReg = new RegExp(/^\d{1,5}$/);
      if (numReg.test(val * 1) == true) {
        this.priorityNumReg = false;
      } else {
        this.priorityNumReg = true;
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

.list .nothingLi {
  height: 500px;
}

.list .nothingLi > div:nth-child(1) {
  border: 0;
  width: 657px;
  height: 400px;
  margin: 0 auto;
}

.dataLiHeiLow > ul > li {
  display: flex;
  width: 100%;
  margin-top: 10px;
}

.dataLi .newClass {
  width: calc(100% - 250px);
  height: 70px;
  margin-left: 10px;
  border-left: 1px solid #eaeaea;
  line-height: 70px;
  padding-left: 20px;
}

.dataLiHeiLow > ul > li:last-of-type {
  margin-bottom: 15px;
}

.dataLiHeiLow > ul > li > div:nth-child(1) {
  min-width: 120px;
  text-align: right;
  padding-right: 5px;
  padding-top: 10px;
  overflow: hidden;
}

.dataLiHeiLow > ul > li > div:nth-child(2) {
  min-width: 300px;
  overflow: hidden;
  white-space: unset;
}

.dataLiHeiLow > ul > li > div:nth-child(3) {
  margin-left: 10px;
  display: flex;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dataLiHeiLow > ul > li > div:nth-child(3) img {
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 15px;
}

.dataLiHeiLow > ul > li > div:nth-child(2) > div {
  margin-top: 5px;
  font-size: 14px;
  min-height: 30px;
  line-height: 30px;
  color: #303030;
  padding-left: 10px;
  border-radius: 3px;
  border: 1px solid #eaeaea;
}

.dataLiHeiLow > ul > li > div:nth-child(2) > div:nth-child(1) {
  border: 1px solid #ff6f75;
}

.dataLiHeiLow > ul > li > div:nth-child(2) > div:nth-child(2) {
  border: 1px solid #7bdbf8;
  margin-top: 10px;
}

.dataLi .dataLiHeiLow {
  width: calc(100% - 250px);
  margin-left: 10px;
  border-left: 1px solid #eaeaea;
}

.dataLi > div:nth-child(1) {
  min-width: 90px;
  padding-top: 5px;
  text-align: right;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.dataLi {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 7px;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 10px #ccc;
}

.list > ul > li:nth-child(1) {
  margin-top: 0;
}

.list > ul > li {
  width: 100%;
  min-height: 80px;
  margin-top: 35px;
}

.lastLiRight {
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

.list {
  margin-top: 25px;
  min-height: 540px;
}

.Suggest {
  width: 100%;
  height: 100%;
}

.Suggest > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.listCont li > div:nth-child(1) {
  width: 20%;
  overflow: hidden;
  min-width: 100px;
}

.listCont li > div:nth-child(2) {
  width: 20%;
  overflow: hidden;
  min-width: 150px;
}

.listCont li > div:nth-child(3) {
  width: 20%;
  min-width: 100px;
}

.listCont li > div:nth-child(4) {
  width: 15%;
  min-width: 100px;
}

.listCont li > div:nth-child(5) {
  width: 10%;
  min-width: 64px;
}

.listCont li > div:nth-child(6) {
  width: 15%;
  min-width: 165px;
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
  border: 1px solid #5acdfa;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #5acdfa;
  cursor: pointer;
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
/*添加弹出框*/

.reminder > div:nth-child(1) {
  width: 110px;
  padding-left: 10px;
  text-align: right;
  height: 100px;
}

.reminder > div:nth-child(2) {
  margin-left: 10px;
}

textarea {
  width: 320px;
  height: 100px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  resize: none;
  padding-left: 5px;
}

.priority > div:nth-child(1) {
  width: 110px;
  padding-left: 10px;
  text-align: right;
}

.priority > div:nth-child(2) {
  margin-left: 10px;
}

.priority > div:nth-child(2) input {
  width: 320px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  padding-left: 5px;
}

.addContent > div {
  margin-top: 10px;
}

.addContent > div {
  display: flex;
  min-height: 50px;
  align-items: center;
}

.addContent {
  width: 475px;
  min-height: 400px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 335px) / 2) auto;
  z-index: 100000;
}

.addPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showadd {
  display: none;
}

.addContent .but {
  margin-top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.addContent .but > div {
  width: 68px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
}

.addContent .but > div:nth-child(1) {
  margin-right: 15px;
  background-color: #51d0c7;
}

.addContent .but > div:nth-child(2) {
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
/*更新弹出*/

.upContent > div {
  margin-top: 10px;
}

.upContent > div {
  display: flex;
  min-height: 50px;
  align-items: center;
}

.upContent {
  width: 475px;
  min-height: 400px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 335px) / 2) auto;
  z-index: 100000;
}

.upPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showup {
  display: none;
}

.upContent .but {
  margin-top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.upContent .but > div {
  width: 68px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
}

.upContent .but > div:nth-child(1) {
  margin-right: 15px;
  background-color: #51d0c7;
}

.upContent .but > div:nth-child(2) {
  margin-left: 15px;
  background-color: #d1d1d1;
}
</style>