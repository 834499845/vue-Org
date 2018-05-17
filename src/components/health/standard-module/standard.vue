<!--标准模型-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    标准模型
                </div>
                <!--<div v-if="addUp" @click="addCommClick">
                    添加模型
                </div>-->
                <div @click="uPCommClick">
                    编辑模型
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            省份：
                        </div>
                        <div>
                            <select @change="selectAreaClick" v-model="Areastr">
                                 <option v-for="(type,index) in Areas"  v-bind:value="type.key">{{type.value}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            性别：
                        </div>
                        <div>
                            <select @change="selectSexClick" v-model="Sexstr">
                                 <option v-for="(type,index) in Sexs"  v-bind:value="type.num">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            年龄段：
                        </div>
                        <div>
                            <select @change="selectAgeClick" v-model="Agestr">
                                 <option v-for="(type,index) in Ages" v-bind:value="type.id">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="search">
                        <div @click="searchClick">
                            筛选
                        </div>
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <ul>
                    <li class="oneLi" v-show="lists.length > 0" v-for="item in lists">
                        <div>
                            {{item.title}}
                        </div>
                        <div class="tztwo" v-show="item.conts.length > 0">
                            <ul>
                                <li class="tzLi" v-for="tzVal in item.conts">
                                    <div>{{tzVal.name}}：</div>
                                    <div>
                                        <div class="tzOPtion" v-if="tzVal.optionList.length > 0">
                                            <ul>
                                                <li class="optionLi" v-for="option in tzVal.optionList">
                                                    <div>
                                                        {{option.name}}
                                                    </div>
                                                    <div :class="{showLow:isShowLow,redShowLow:option.low.length != 0 ? false : true,garyShowLow:option.low.length == 0 ? false :true }">
                                                        {{option.low | lowHeiFun}} - {{option.height | lowHeiFun}}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tzRange" v-if="tzVal.rangeList.length > 0">
                                            <ul>
                                                <li class="rangeLi" v-for="(range,key,ind) in tzVal.rangeList">
                                                    <div>
                                                        {{range.name}}
                                                    </div>
                                                    <div :class="{showLow:isShowLow,redShowLow:range.low.length != 0 ? false : true,garyShowLow:range.low.length == 0 ? false :true }">
                                                        {{range.low | lowHeiFun}} - {{range.height | lowHeiFun}}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div :class="{showLow:isShowLow,redShowLow:tzVal.low.length != 0 ? false : true,garyShowLow:tzVal.low.length == 0 ? false :true }"
                                            v-show="tzVal.optionList.length == 0 && tzVal.rangeList.length == 0">
                                            {{tzVal.low | lowHeiFun}} - {{tzVal.height | lowHeiFun}}
                                    </div>
                        </div>
                        <div>
                            {{tzVal.unit}}
                        </div>
                        </li>
                        </ul>
            </div>
            <div class="newShow" v-show="item.conts.length == 0">
                暂无数据...
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
</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import rangeselect from "../../cModule/rangeselect";
import select from "../../cModule/select";
import hosdel from "../../cModule/healthdel";
export default {
  components: {
    "v-minput": minput,
    "v-rangeselect": rangeselect,
    "v-select": select,
    "v-hosdel": hosdel
  },
  data() {
    return {
      isRedShowLow: false,
      isGaryShowLow: true,
      isShowLow: true,
      addUp: true,
      loading: false,
      lists: [],
      Areas: [{ key: "0", value: "全部" }],
      Areastr: "0",
      Ages: [{ endValue: 84, id: 0, name: "全部", startValue: 0 }],
      Sexs: [
        { name: "全部", num: 0 },
        { name: "男", num: 1 },
        { name: "女", num: 2 }
      ],
      jsonObjs: [],
      noStes: [],
      Agestr: 0,
      Sexstr: 0,
      AreaName: "",
      ageKey: 144,
      sexKey: 0,
      areKey: "",
      heys: []
    };
  },
  computed: mapState(["headltModel"]),
  // 过滤
  filters: {
    ctimeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0 " + month;
      var date = now.getDate();
      date = date > 9 ? date : "0 " + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0 " + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0 " + minute;
      return (
        "20 " + year + "- " + month + "- " + date + " " + hour + ": " + minute
      );
    },
    ageFun: function(val) {
      if (val == 145) {
        return "儿童期";
      } else if (val == 146) {
        return "少年期";
      } else if (val == 147) {
        return "青年期";
      } else if (val == 148) {
        return "壮年期";
      } else if (val == 149) {
        return "盛年期";
      } else if (val == 150) {
        return "达年期";
      } else if (val == 151) {
        return "中年期";
      } else if (val == 152) {
        return "老年期";
      }
    },
    lowHeiFun: function(val) {
      if (val) {
        return val;
      } else {
        return 0;
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
      if (arrs.indexOf("standard") == -1) {
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
        // 查询地域
        self.loading = true;
        self
          .getfindAreaFromRedisList({
            code: "PROVINCE",
            parentId: 1
          })
          .then(data => {
            // console.log("基础标准地域", JSON.parse(JSON.stringify(data)));
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  self.Areas = self.Areas.concat(data.data);
                  if (self.headltModel.searKey != "") {
                    self.Areastr = self.headltModel.searKey;
                  } else {
                    self.Areastr = self.Areas[0].key;
                  }
                }
                self
                  .getfindAgeGroupFromRedisList({})
                  .then(data => {
                    // console.log("基础标准年龄段", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.length > 0) {
                          self.Ages = self.Ages.concat(data.data);
                          if (self.headltModel.ageKey != "") {
                            self.Agestr = self.headltModel.ageKey;
                            self.Sexstr = self.headltModel.sexKey;
                          } else {
                            self.Agestr = self.Ages[0].id;
                            self.Sexstr = self.Sexs[0].num;
                          }
                        }
                        self.BzzbFun();
                      }
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    // console.log(msg);
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "模型获取失败!"
                });
              }
            } else {
              self.loading = false;
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            // console.log(msg);
            self.loading = false;
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
  // 事件处理
  methods: {
    // 初始化列表
    BzzbFun() {
      var self = this;
      self.loading = true;
      // 查询标准指标字典
      self
        .getFindBzzbFromRedisList({})
        .then(data => {
        //   console.log("基础标准指标", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data.length > 0) {
              var cont = data.data;
              var heyLows = [];
              cont.forEach(function(one, oneInd) {
                heyLows.push({ title: one.key, conts: [] });
                one.value.forEach(function(two, twoIndex) {
                  heyLows[oneInd].conts.push({
                    name: two.name,
                    code: two.code,
                    unit: two.unit,
                    optionList: [],
                    rangeList: [],
                    height: "",
                    low: "",
                    id: ""
                  });
                  two.optionList.forEach(function(therr, therrIndex) {
                    heyLows[oneInd].conts[twoIndex].optionList.push({
                      name: therr.value,
                      code: therr.key,
                      height: "",
                      low: "",
                      id: "",
                      unit: two.unit
                    });
                  });
                  two.rangeList.forEach(function(four, fourIndex) {
                    heyLows[oneInd].conts[twoIndex].rangeList.push({
                      name: four.value,
                      code: four.key,
                      height: "",
                      low: "",
                      id: "",
                      pre: ""
                    });
                  });
                });
              });
            //   console.log(heyLows.length);
              self
                .getfindStandardDataList({
                  ageId: self.Agestr,
                  gender: self.Sexstr,
                  areaId: self.Areastr
                })
                .then(data => {
                //   console.log("查询标准指标数据", JSON.parse(JSON.stringify(data)));
                  if (data.code == 200) {
                    if (data.data.length > 0) {
                      var tips = data.data;
                      heyLows.forEach(function(ele, eleIndex) {
                        ele.conts.forEach(function(cont, contInd) {
                          tips.forEach(function(tip, tipIndex) {
                            if (cont.code == tip.dictionaryCode) {
                              heyLows[eleIndex].conts[contInd].height =
                                tip.bigValue;
                              heyLows[eleIndex].conts[contInd].low =
                                tip.smallValue;
                              heyLows[eleIndex].conts[contInd].id = tip.id;
                            }
                          });
                          cont.optionList.forEach(function(op, opIndex) {
                            tips.forEach(function(tip, tipIndex) {
                              if (op.code == tip.dictionaryCode) {
                                heyLows[eleIndex].conts[contInd].optionList[
                                  opIndex
                                ].height =
                                  tip.bigValue;
                                heyLows[eleIndex].conts[contInd].optionList[
                                  opIndex
                                ].low =
                                  tip.smallValue;
                                heyLows[eleIndex].conts[contInd].optionList[
                                  opIndex
                                ].id =
                                  tip.id;
                                // heyLows[eleIndex].conts[contInd].pre = tip.priority
                              }
                            });
                          });
                          cont.rangeList.forEach(function(op, opIndex) {
                            tips.forEach(function(tip, tipIndex) {
                              if (op.code == tip.dictionaryCode) {
                                heyLows[eleIndex].conts[contInd].rangeList[
                                  opIndex
                                ].height =
                                  tip.bigValue;
                                heyLows[eleIndex].conts[contInd].rangeList[
                                  opIndex
                                ].low =
                                  tip.smallValue;
                                heyLows[eleIndex].conts[contInd].rangeList[
                                  opIndex
                                ].id =
                                  tip.id;
                                // heyLows[eleIndex].conts[contInd].pre = tip.priority
                              }
                            });
                          });
                        });
                      });
                    //   console.log(heyLows)
                    } else {
                      self.lists = [];
                    }
                    self.lists = heyLows;
                    self.loading = false;
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
                //   console.log(msg);
                  self.loading = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              self.loading = false;
              self.$message({
                type: "info",
                message: "获取基础模型失败!"
              });
            }
          } else {
            self.loading = false;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
        //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    carthFun() {
      var self = this;
      self.loading = true;
      // 查询标准指标字典
      self
        .getFindBzzbFromRedisList({})
        .then(data => {
        //   console.log("基础标准指标", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data.length > 0) {
              var cont = data.data;
              var heyLows = [];
              cont.forEach(function(one, oneInd) {
                heyLows.push({ title: one.key, conts: [] });
                one.value.forEach(function(two, twoIndex) {
                  heyLows[oneInd].conts.push({
                    name: two.name,
                    code: two.code,
                    unit: two.unit,
                    optionList: [],
                    rangeList: [],
                    height: "",
                    low: "",
                    id: ""
                  });
                  two.optionList.forEach(function(therr, therrIndex) {
                    heyLows[oneInd].conts[twoIndex].optionList.push({
                      name: therr.value,
                      code: therr.key,
                      height: "",
                      low: "",
                      id: "",
                      unit: two.unit
                    });
                  });
                  two.rangeList.forEach(function(four, fourIndex) {
                    heyLows[oneInd].conts[twoIndex].rangeList.push({
                      name: four.value,
                      code: four.key,
                      height: "",
                      low: "",
                      id: "",
                      pre: ""
                    });
                  });
                });
              });
              self.lists = heyLows;
              self.loading = false;
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
        //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 筛选
    searchClick() {
      var self = this;
      this.BzzbFun();
    },
    // 性别选择
    selectSexClick() {},
    // 地域选择
    selectAreaClick() {},
    // 年龄选择
    selectAgeClick() {},
    // 添加商品
    addCommClick() {
      var self = this;
      this.$router.push({
        path: "/health/addstandard",
        query: {
          ageKey: self.ageKey,
          sexKey: self.sexKey,
          areKey: self.Areastr,
          areName: AreaNamestr
        }
      });
    },
    // 跳转更新
    uPCommClick() {
      var self = this;
      var AreaNamestr = "";
      self.Areas.forEach(function(ele, ind) {
        if (ele.key == self.Areastr) {
          AreaNamestr = ele.value;
        }
      });
      var AgeNamestr = "";
      self.Ages.forEach(function(ele, ind) {
        if (ele.id == self.Agestr) {
          AgeNamestr = ele.name;
        }
      });
      this.$router.push({
        path: "/health/upstandard",
        query: {
          ageKey: self.Agestr,
          sexKey: self.Sexstr,
          areKey: self.Areastr,
          areName: AreaNamestr,
          ageNmae: AgeNamestr
        }
      });
      // }
    },
    ...mapActions([
      "getFindBzzbFromRedisList",
      "getfindAreaFromRedisList",
      "getfindAgeGroupFromRedisList",
      "getAddstandardData",
      "getfindStandardDataList",
      "getListResRole"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.list .noList {
  height: 400px;
}

.list .noList > div:nth-child(1) {
  width: 657px;
  height: 400px;
  margin: 0 auto;
}

.tzOPtion > ul {
  display: flex;
}

.garyShowLow {
  border: 1px solid #aeaeae;
}

.redShowLow {
  border: 1px solid #fe5371;
}

.showLow {
  width: 80px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tzOPtion > ul .optionLi {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tzOPtion > ul > li:nth-child(1) > div:nth-child(1) {
  margin-left: 0px;
}

.optionLi > div:nth-child(1) {
  margin-left: 10px;
}

.optionLi > div:nth-child(2) {
  margin-left: 10px;
}

.tzRange > ul {
  display: flex;
}

.tzRange > ul .rangeLi {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tzRange > ul > li:nth-child(1) > div:nth-child(1) {
  margin-left: 0px;
}

.rangeLi > div:nth-child(1) {
  margin-left: 10px;
}

.rangeLi > div:nth-child(2) {
  margin-left: 10px;
}

#tzInput {
  width: 80px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  padding-left: 5px;
}

.tzLi > div:nth-child(1) {
  min-width: 75px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.tzLi > div:nth-child(3) {
  min-width: 75px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
}

.tzLi > div:nth-child(2) > div:nth-child(1) {
  margin-left: 0;
}

.tzLi > div:nth-child(2) > div {
  margin-left: 10px;
}

.tzLi > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
}

.tzLi {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.oneLi .tztwo > ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.oneLi .newShow {
  width: calc(100% - 70px);
  padding-left: 40px;
}

.oneLi > div:nth-child(1) {
  width: 60px;
  font-size: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

.tztwo {
  width: calc(100% - 70px);
  border-left: 1px solid #d1d1d1;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.list {
  min-height: 440px;
  margin-bottom: 40px;
}

.list > ul > li:nth-child(1) {
  margin-top: 0;
}

.list > ul .oneLi {
  min-height: 50px;
  width: 100%;
  margin-top: 25px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 10px #ccc;
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
  overflow: hidden;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
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
  border: 1px solid #51d0c7;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #51d0c7;
  cursor: pointer;
}

.menu {
  height: 80px;
  align-items: center;
  overflow: hidden;
  display: flex;
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
  min-width: 30px;
}

.menuLeft .search {
  width: 100px;
  height: 100%;
}

.menuLeft .search > div:nth-child(1) {
  margin-top: 1px;
  border-radius: 3px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 28px;
  background-color: #51d0c7;
}

select {
  width: 114px;
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