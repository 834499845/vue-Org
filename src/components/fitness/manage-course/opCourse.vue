<!--新增训练管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="list-cont">
                    <div class="listRoutine">
                        <div>
                            课程名称：
                        </div>
                        <div>
                            <input type="text" v-model="courseNameVal" :class="{redInput:isRedcourseName,grayInput:isGraycourseName}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedcourseName,grayTest:isGraycourseName}">
                            最多十个字符
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            课程描述：
                        </div>
                        <div>
                            <input type="text" v-model="descriTextVal" :class="{redInput:isReddescriText,grayInput:isGraydescriText}" maxlength="10">
                        </div>
                        <div :class="{redTest:isReddescriText,grayTest:isGraydescriText}">
                            最多十个字符
                        </div>
                    </div>
                    <div class="listPeriod">
                        <div>
                            <div>
                                课程周期：
                            </div>
                            <div>
                                <select @change="selectWeekNum" v-model="courseWeekVal" :class="{redInput:isRedcourseWeek,grayInput:isGraycourseWeek}">
                                    <option v-for="(week,index) in courseWeeks" v-bind:key="week.weekNum">{{week.weekNum}}</option>
                                </select>
                                <div> 周</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                训练频率：
                            </div>
                            <div class="frequencyClass">
                                <div>训</div>
                                <div>
                                    <input type="text" v-model="frequencyOneVal" :class="{redInput:isRedfrequencyOne,grayInput:isGrayfrequencyOne}" maxlength="3"
                                        onkeyup="value=value.replace(/[^\d]/g,'')">
                                </div>
                                <div>休</div>
                                <div>
                                    <input type="text" v-model="frequencyTwoVal" :class="{redInput:isRedfrequencyTwo,grayInput:isGrayfrequencyTwo}" maxlength="3"
                                        onkeyup="value=value.replace(/[^\d]/g,'')">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div :class="{redTest:isRedfrequency,grayTest:isGrayfrequency}">训和休不能为小数</div>
                        </div>
                        <div>
                            <div :class="{redTest:isRedTrainAndRest,transparentTest:isTransparentTrainAndRest}">训和休总天数不能超过{{courseWeekVal*7}}</div>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            单个日程安排：
                        </div>
                        <div>
                            <input type="text" v-model="singleDayVal" :class="{redInput:isRedsingleDay,grayInput:isGraysingleDay}" maxlength="3">
                        </div>
                        <div>节</div>
                        <div>
                            <div :class="{redTest:isRedDay,grayTest:isGrayDay}">节数只能为数字，但不能为小数</div>
                        </div>
                    </div>
                    <div class="coverImg">
                        <div>
                            封面图：
                        </div>
                        <div>
                            <div>
                                <img :src="imageCorve" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="coverImg">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedbrightcoverImg,grayTest:isGraybrightcoverImg}">
                            建议尺寸：355*130像素
                        </div>
                        <div>
                            <input id="coverImg" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageCoverChange">
                        </div>
                    </div>
                    <div class="bgImg">
                        <div>
                            背景图：
                        </div>
                        <div>
                            <div>
                                <img :src="imageBg" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="bgImg">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedbrightbgImg,grayTest:isGraybrightbgImg}">
                            建议上传尺寸为 1:1
                        </div>
                        <div>
                            <input id="bgImg" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageBgChange">
                        </div>
                    </div>
                    <div class="listCommon">
                        <div>
                            训练选择：
                        </div>
                        <div class="listCommonSearch">
                            <div>
                                <div>
                                    <select @change="selectSearchTypesClick" v-model="searchType">
                                        <option v-for="(type,index) in searchTypes" v-bind:value="index">{{type.labelName}}</option>
                                    </select>
                                </div>
                                <div>
                                    <select @change="selectSearchPartsClick" v-model="searchPart">
                                        <option v-for="(type,index) in searchParts" v-bind:value="index">{{type.siteName}}</option>
                                    </select>
                                </div>
                                <div>
                                    <select @change="selectSearchLevelsClick" v-model="searchLevel">
                                        <option v-for="(type,index) in searchLevels" v-bind:value="index">{{type.name}}</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="text" v-model="searchKeyword" placeholder="搜索">
                                </div>
                                <div @click="searchClick">
                                    搜索
                                </div>
                            </div>
                            <div class="grantCommodity">
                                <div>
                                    <div>
                                        可选训练
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                        已选训练
                                    </div>
                                </div>
                                <div>
                                    <div class="commodityLeft">
                                        <ul>
                                            <li v-for="(item,index) in selectLeftLists" @click="leftListClick(index)" :class="{bgcolor:isBgcolor == item.bgcolor}">
                                                {{item.actionName}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="commodityCenter">
                                        <div>
                                            <div @click="commodityLeftClick">

                                            </div>
                                            <div @click="commodityRightClick">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="commodityRight">
                                        <ul>
                                            <li v-for="(item,index) in selectRightLists">
                                              <div  @click="rightListClick(index)" :class="{bgcolor:isBgcolor == item.bgcolor}">{{index+1}} . {{item.actionName}}</div>
                                              <div>
                                                  <img @click="rankUpClick(index)" v-show="index != 0" src="/static/img/up.png" alt="">
                                                  <img @click="unRankUpClick" v-show="index == 0" src="/static/img/grayup.png" alt="">                                                 
                                                  <img @click="rankDownClick(index)" v-show="index+1 != selectRightLists.length" src="/static/img/down.png" alt="">
                                                  <img @click="unRankDownClick" v-show="index+1 == selectRightLists.length" src="/static/img/graydown.png" alt="">                                        
                                              </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if ="frequencyOneVal.length == 0 || frequencyTwoVal.length == 0 || singleDayVal.length == 0" :class="{redTest:isRedrightLists,transparentTest:isGrayrightLists}">
                                    请输入训练频率和单个日程安排
                                </div>
                                <div v-else :class="{redTest:isRedrightLists,transparentTest:isGrayrightLists}">
                                    必须选择 : {{selectTrainNum()}} 个训练
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div> 
                            动作标签：
                        </div>
                        <div>
                            <select v-model="type">
                                <option v-for="(type,index) in types" v-bind:value="index">{{type.labelName}}</option>
                            </select>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            训练部位：
                        </div>
                        <div>
                            <select v-model="part">
                                <option v-for="(type,index) in parts" v-bind:value="index">{{type.siteName}}</option>
                            </select>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div class="but">
                        <div @click="addClick">确定</div>
                        <div @click="backClick">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--拦截弹出框-->
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
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      title: "新增训练",
      loading: false,

      isReddescriText: false,
      isGraydescriText: true,
      isdescriText: false,

      isRedcourseName: false,
      isGraycourseName: true,
      iscourseName: false,

      isRedcourseWeek: false,
      isGraycourseWeek: true,
      iscourseWeek: false,

      isRedfrequencyOne: false,
      isGrayfrequencyOne: true,
      isfrequencyOne: false,
      isRedfrequencyTwo: false,
      isGrayfrequencyTwo: true,
      isfrequencyTwo: false,

      isRedsingleDay: false,
      isGraysingleDay: true,
      issingleDay: false,

      isRedbrightbgImg: false,
      isGraybrightbgImg: true,
      isbgImg: false,

      isRedbrightcoverImg: false,
      isGraybrightcoverImg: true,
      isCoverImage: false,

      isRedrightLists: false,
      isGrayrightLists: true,
      isrightLists: false,

      selectLeftLists: [],
      selectRightLists: [],
      isBgcolor: true,
      searchTypes: [],
      searchType: 0,
      searchParts: [],
      searchPart: 0,
      searchLevels: [
        { name: "请选择", num: -1 },
        { name: "初级", num: 0 },
        { name: "中级", num: 1 },
        { name: "高级", num: 2 }
      ],
      searchLevel: 0,
      types: [],
      type: 0,
      parts: [],
      part: 0,

      searchKeyword: "",
      imageCorve: "",
      imageBg: "",
      courseNameVal: "",
      descriTextVal: "",
      courseWeekVal: 2,
      frequencyVal: "",
      frequencyOneVal: "",
      frequencyTwoVal: "",
      singleDayVal: "",
      searchArray: [],
      courseWeeks: [{ weekNum: 2 }],

      isRedfrequency: false,
      isGrayfrequency: true,

      isRedDay: false,
      isGrayDay: true,

      isRedTrainAndRest: false,
      isTransparentTrainAndRest: true,

      intercept: false,
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      titlename: "您确定要执行该操作吗？",
      onimageBgChangeTrue: false,
      onimageCoverChangeTrue: false,
      addClickTrue: false
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
        if (ele.name == "健身管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("course") == -1) {
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
        var operation = "";
        operation = self.$route.query.op;
        if (operation == 1) {
          self.title = "新增课程";
          self.addlistFun();
        } else {
          self.title = "修改课程";
          self.uplistFun();
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
  // 跳转拦截
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdel = false;
      this.delShow = true;
    } else if (this.intercept == true) {
      this.isShowdel = true;
      this.delShow = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //确定拦截弹出
    okClick() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    //取消拦截弹出
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    addlistFun() {
      var self = this;
      // 训练列表
      self
        .getfitnessTrainControllerselectTrainPage({
          pageNo: 1,
          pageSize: 200
        })
        .then(data => {
          self.loading = false;
          // //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var dataArr = [];
                  dataArr = data.data.records;
                  dataArr.forEach(function(ele) {
                    self.selectLeftLists.push({
                      actionName: ele.trainName,
                      id: ele.id,
                      bgcolor: false
                    });
                  });
                } else {
                  self.selectLeftLists = [];
                }
              } else {
                self.selectLeftLists = [];
              }
            } else {
              self.selectLeftLists = [];
            }
          } else {
            self.selectLeftLists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.selectLeftLists = [];
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 标签
      self
        .getfitnessLabellControllerselectLabellPage({
          current: 1,
          size: 200
        })
        .then(data => {
          // //console.log("标签列表", JSON.parse(JSON.stringify(data)))
          self
            .getfitnessLabellControllerselectLabellPage({
              current: 1,
              size: 200
            })
            .then(data => {
              // //console.log("标签列表", JSON.parse(JSON.stringify(data)))
              if (data.code == 200) {
                if (data.data) {
                  if (data.data.records) {
                    if (data.data.records.length > 0) {
                      self.types = data.data.records;
                      self.type = 0;
                    } else {
                      self.types = [{ labelName: "暂无数据" }];
                      self.type = 0;
                    }
                  } else {
                    self.types = [{ labelName: "暂无数据" }];
                    self.type = 0;
                  }
                } else {
                  self.types = [{ labelName: "暂无数据" }];
                  self.type = 0;
                }
              } else {
                self.types = [{ labelName: "暂无数据" }];
                self.type = 0;
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.types = [{ labelName: "暂无数据" }];
              self.type = 0;
              //console.log(msg);
              self.loading = false;
              self.$message({
                type: "info",
                message: "服务器异常!"
              });
            });
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.searchTypes = data.data.records;
                  self.searchTypes.unshift({ labelName: "请选择" });
                  self.searchType = 0;
                } else {
                  self.searchTypes = [{ labelName: "暂无数据" }];
                  self.searchType = 0;
                }
              } else {
                self.searchTypes = [{ labelName: "暂无数据" }];
                self.searchType = 0;
              }
            } else {
              self.searchTypes = [{ labelName: "暂无数据" }];
              self.searchType = 0;
            }
          } else {
            self.searchTypes = [{ labelName: "暂无数据" }];
            self.searchType = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchTypes = [{ labelName: "暂无数据" }];
          self.searchType = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 部位
      self
        .getfitnessSiteControllerselectSitePage({
          current: 1,
          size: 200
        })
        .then(data => {
          // //console.log("列表", JSON.parse(JSON.stringify(data)))
          self
            .getfitnessSiteControllerselectSitePage({
              current: 1,
              size: 200
            })
            .then(data => {
              // //console.log("列表", JSON.parse(JSON.stringify(data)))
              if (data.code == 200) {
                if (data.data) {
                  if (data.data.records) {
                    if (data.data.records.length > 0) {
                      self.parts = data.data.records;
                      self.part = 0;
                    } else {
                      self.parts = [{ siteName: "暂无数据" }];
                      self.part = 0;
                    }
                  } else {
                    self.parts = [{ siteName: "暂无数据" }];
                    self.part = 0;
                  }
                } else {
                  self.parts = [{ siteName: "暂无数据" }];
                  self.part = 0;
                }
              } else {
                self.parts = [{ siteName: "暂无数据" }];
                self.part = 0;
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.parts = [{ siteName: "暂无数据" }];
              self.part = 0;
              //console.log(msg);
              self.loading = false;
              self.$message({
                type: "info",
                message: "服务器异常!"
              });
            });
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.searchParts = data.data.records;
                  self.searchPart = 0;
                  self.searchParts.unshift({ siteName: "请选择" });
                } else {
                  self.searchParts = [{ siteName: "暂无数据" }];
                  self.searchPart = 0;
                }
              } else {
                self.searchParts = [{ siteName: "暂无数据" }];
                self.searchPart = 0;
              }
            } else {
              self.searchParts = [{ siteName: "暂无数据" }];
              self.searchPart = 0;
            }
          } else {
            self.searchParts = [{ siteName: "暂无数据" }];
            self.searchPart = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchParts = [{ siteName: "暂无数据" }];
          self.searchPart = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // 排序-向上
    rankUpClick (index,arr) {
      var self = this
      var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      arr = self.selectRightLists
      if (self.selectRightLists.length > 0 && index != 0) {
        self.selectRightLists = swapItems(self.selectRightLists, index, index - 1)
      }
      //console.log(self.selectRightLists)
    },
    // 不可向上排序
    unRankUpClick () {
      this.$message({
        type: 'info',
        message: '处于第一位不支持向上排序!'
      })
    },
    // 不可向下排序
    unRankDownClick() {
      this.$message({
        type: 'info',
        message: '处于最后一位不支持向下排序!'
      })
    },
    // 排序-向下
    rankDownClick (index,arr) {
      var self = this
      var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      arr = self.selectRightLists
      if (self.selectRightLists.length > 1 && index != (self.selectRightLists.length-1)) {
        self.selectRightLists = swapItems(self.selectRightLists, index, index + 1)
      }
      //console.log(self.selectRightLists)
    },
    uplistFun() {
      var self = this;
      var id = "";
      id = self.$route.query.id;
      self
        .getfitnessCourseControllerfindById({
          courseId: id
        })
        .then(data => {
          //console.log("详情", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            self.imageBg = data.data.backgroundMap || "";
            self.imageCorve = data.data.coverSheet || "";
            self.courseNameVal = data.data.courseName || "";
            self.descriTextVal = data.data.describe || "";
            self.courseWeekVal = data.data.courseWeek || "";
            var frequencyStr = data.data.frequency;
            if (
              frequencyStr.indexOf("训") != -1 &&
              frequencyStr.indexOf("休") != -1
            ) {
              self.frequencyOneVal = frequencyStr.match(/训(\S*)休/)[1];
              self.frequencyTwoVal = frequencyStr.match(/休(\S*)/)[1];
            } else {
              self.frequencyOneVal = "";
              self.frequencyTwoVal = "";
            }
            self.singleDayVal = data.data.singleDay || "";
            var labelStr = data.data.labelId || "";
            var siteStr = data.data.siteId || "";
            var levelStr = data.data.level || "";
            self.isbgImg = true;
            self.isCoverImage = true;
            var actionLists = [];
            var pathArray = [];
            actionLists = data.data.trainListDTOList || [];
            actionLists.forEach(function(ele) {
              self.selectRightLists.push({
                actionName: ele.trainName,
                id: ele.id,
                bgcolor: false
              });
              pathArray.push(ele.id);
              self.searchArray.push(ele.id);
            });
            // 训练列表
            self
              .getfitnessTrainControllerselectTrainPage({
                pageNo: 1,
                pageSize: 200
              })
              .then(data => {
                self.loading = false;
                //console.log("可选训练列表", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        var dataArr = [];
                        dataArr = data.data.records;
                        dataArr.forEach(function(ele) {
                          self.selectLeftLists.push({
                            actionName: ele.trainName,
                            id: ele.id,
                            bgcolor: false
                          });
                        });
                        self.selectLeftLists.forEach(function(ele, ind) {
                          if (pathArray.indexOf(ele.id) != -1) {
                            self.selectLeftLists[ind].bgcolor = true;
                          }
                        });
                      } else {
                        self.selectLeftLists = [];
                      }
                    } else {
                      self.selectLeftLists = [];
                    }
                  } else {
                    self.selectLeftLists = [];
                  }
                } else {
                  self.selectLeftLists = [];
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.selectLeftLists = [];
                //console.log(msg);
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
            self
              .getfitnessLabellControllerselectLabellPage({
                current: 1,
                size: 200
              })
              .then(data => {
                // //console.log("列表", JSON.parse(JSON.stringify(data)))
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        self.types = data.data.records;
                        self.types.forEach(function(ele, ind) {
                          if (labelStr == ele.id) {
                            self.type = ind;
                          }
                        });
                      } else {
                        self.types = [{ labelName: "暂无数据" }];
                        self.type = 0;
                      }
                    } else {
                      self.types = [{ labelName: "暂无数据" }];
                      self.type = 0;
                    }
                  } else {
                    self.types = [{ labelName: "暂无数据" }];
                    self.type = 0;
                  }
                } else {
                  self.types = [{ labelName: "暂无数据" }];
                  self.type = 0;
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.types = [{ labelName: "暂无数据" }];
                self.type = 0;
                //console.log(msg);
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
            self
              .getfitnessSiteControllerselectSitePage({
                current: 1,
                size: 200
              })
              .then(data => {
                //console.log("训练部位列表", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        self.parts = data.data.records;
                        self.parts.forEach(function(ele, ind) {
                          if (siteStr == ele.id) {
                            self.part = ind;
                          }
                        });
                      } else {
                        self.parts = [{ siteName: "暂无数据" }];
                        self.part = 0;
                      }
                    } else {
                      self.parts = [{ siteName: "暂无数据" }];
                      self.part = 0;
                    }
                  } else {
                    self.parts = [{ siteName: "暂无数据" }];
                    self.part = 0;
                  }
                } else {
                  self.parts = [{ siteName: "暂无数据" }];
                  self.part = 0;
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.parts = [{ siteName: "暂无数据" }];
                self.part = 0;
                //console.log(msg);
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 标签
      self
        .getfitnessLabellControllerselectLabellPage({
          current: 1,
          size: 200
        })
        .then(data => {
          // //console.log("列表", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.searchTypes = data.data.records;
                  self.searchTypes.unshift({ labelName: "请选择" });
                  self.searchType = 0;
                } else {
                  self.searchTypes = [{ labelName: "暂无数据" }];
                  self.searchType = 0;
                }
              } else {
                self.searchTypes = [{ labelName: "暂无数据" }];
                self.searchType = 0;
              }
            } else {
              self.searchTypes = [{ labelName: "暂无数据" }];
              self.searchType = 0;
            }
          } else {
            self.searchTypes = [{ labelName: "暂无数据" }];
            self.searchType = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchTypes = [{ labelName: "暂无数据" }];
          self.searchType = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 部位
      self
        .getfitnessSiteControllerselectSitePage({
          current: 1,
          size: 200
        })
        .then(data => {
          // //console.log("列表", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.searchParts = data.data.records;
                  self.searchPart = 0;
                  self.searchParts.unshift({ siteName: "请选择" });
                } else {
                  self.searchParts = [{ siteName: "暂无数据" }];
                  self.searchPart = 0;
                }
              } else {
                self.searchParts = [{ siteName: "暂无数据" }];
                self.searchPart = 0;
              }
            } else {
              self.searchParts = [{ siteName: "暂无数据" }];
              self.searchPart = 0;
            }
          } else {
            self.searchParts = [{ siteName: "暂无数据" }];
            self.searchPart = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchParts = [{ siteName: "暂无数据" }];
          self.searchPart = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // change Image
    onimageBgChange(e) {
      var self = this;
      if (self.onimageBgChangeTrue == false) {
        self.isbgImg = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
              self.onimageBg(fileData);
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    onimageBg(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "fitness");
      formdata.append("business", "course");
      formdata.append("token", TOKEN);
      self.onimageBgChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageBgChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功!",
              type: "success"
            });
            self.isbgImg = true;
            self.imageBg = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageBgChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    onimageCoverChange(e) {
      var self = this;
      if (self.onimageCoverChangeTrue == false) {
        self.isCoverImage = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
              self.onimageCover(fileData);
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    onimageCover(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "fitness");
      formdata.append("business", "course");
      formdata.append("token", TOKEN);
      self.onimageCoverChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageCoverChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功!",
              type: "success"
            });
            self.isCoverImage = true;
            self.imageCorve = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageCoverChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // canel select movement alert bgcolor
    rightListClick(index) {
      this.selectRightLists[index].bgcolor = !this.selectRightLists[index]
        .bgcolor;
    },
    // canel select moverment
    commodityRightClick() {
      var self = this;
      var rights = [];
      self.selectRightLists.forEach(function(ele, ind) {
        if (ele.bgcolor == false) {
          rights.push({
            actionName: ele.actionName,
            id: ele.id,
            bgcolor: false
          });
        }
      });
      var pathArray = [];
      self.selectRightLists.forEach(function(ele, ind) {
        if (ele.bgcolor == true) {
          pathArray.push(ele.id);
        }
      });
      self.selectRightLists = rights;
      self.selectLeftLists.forEach(function(ele, ind) {
        if (pathArray.indexOf(ele.id) != -1) {
          self.selectLeftLists[ind].bgcolor = false;
        }
      });
    },
    // select movement alert bgcolor
    leftListClick(index) {
      this.selectLeftLists[index].bgcolor = !this.selectLeftLists[index]
        .bgcolor;
    },
    // add select movement
    commodityLeftClick() {
      var self = this;
      self.selectRightLists = [];
      self.selectLeftLists.forEach(function(ele, ind) {
        if (ele.bgcolor == true) {
          self.selectRightLists.push({
            actionName: ele.actionName,
            id: ele.id,
            bgcolor: false
          });
        }
      });
    },
    //select week num
    selectWeekNum() {
      //console.log(this.courseWeekVal);
    },
    // select search type
    selectSearchTypesClick() {},
    // select search part
    selectSearchPartsClick() {},
    // select search level
    selectSearchLevelsClick() {},
    // search click
    searchClick() {
      var self = this;
      var searchObj = {};
      if (self.searchKeyword.length > 0) {
        searchObj.trainName = self.searchKeyword;
      }
      if (self.searchLevels[self.searchLevel].name != "请选择") {
        searchObj.level = self.searchLevels[self.searchLevel].num;
      }
      if (self.searchParts[self.searchPart].siteName != "请选择") {
        searchObj.siteName = self.searchParts[self.searchPart].siteName;
      }
      if (self.searchTypes[self.searchType].labelName != "请选择") {
        searchObj.labelName = self.searchTypes[self.searchType].labelName;
      }
      self
        .getfitnessCourseControllerselectSiteLabelLevel(searchObj)
        .then(data => {
          //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              self.selectLeftLists = [];
              var dataArr = [];
              dataArr = data.data;
              dataArr.forEach(function(ele) {
                self.selectLeftLists.push({
                  actionName: ele.trainName,
                  id: ele.id,
                  bgcolor: false
                });
              });
              self.selectLeftLists.forEach(function(ele, ind) {
                if (self.searchArray.indexOf(ele.id) != -1) {
                  self.selectLeftLists[ind].bgcolor = true;
                }
              });
            } else {
              self.selectLeftLists = [];
            }
          } else {
            self.selectLeftLists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.selectLeftLists = [];
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    //需要选择的训练数提示
    selectTrainNum: function() {
      var self = this;
      var timeTotal = self.courseWeekVal * 7;
      var oneAndTwo =
        parseInt(self.frequencyOneVal) + parseInt(self.frequencyTwoVal);
      if (timeTotal % oneAndTwo == 0) {
        return (
          parseInt(timeTotal / oneAndTwo) *
          parseInt(self.frequencyOneVal) *
          parseInt(self.singleDayVal)
        );
      } else {
        if (timeTotal % oneAndTwo > parseInt(self.frequencyOneVal)) {
          return (
            (parseInt(timeTotal / oneAndTwo) * parseInt(self.frequencyOneVal) +
              parseInt(self.frequencyOneVal)) *
            parseInt(self.singleDayVal)
          );
        } else {
          return (
            (parseInt(timeTotal / oneAndTwo) * parseInt(self.frequencyOneVal) +
              timeTotal % oneAndTwo) *
            parseInt(self.singleDayVal)
          );
        }
      }
    },
    // affirm addtion
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var operation = "";
        operation = self.$route.query.op;
        let courseWeekTotal = self.courseWeekVal * 7;
        let frequencySumVal =
          parseInt(self.frequencyOneVal) + parseInt(self.frequencyTwoVal);
        if (
          self.iscourseName == true &&
          self.isdescriText == true &&
          self.isCoverImage == true &&
          self.isbgImg == true &&
          self.isfrequencyOne == true &&
          self.isfrequencyTwo == true &&
          self.issingleDay == true &&
          self.selectRightLists.length == self.selectTrainNum() &&
          frequencySumVal < courseWeekTotal
        ) {
          if (operation == 1) {
            self.adding = true;
            var ids = [];
            self.selectRightLists.forEach(function(ele, ind) {
              ids.push(ele.id);
            });
            self.addClickTrue = true;
            self
              .getfitnessCourseControllersave({
                courseName: self.courseNameVal,
                describe: self.descriTextVal,
                courseWeek: self.courseWeekVal,
                frequency:
                  "训" + self.frequencyOneVal + "休" + self.frequencyTwoVal,
                singleDay: self.singleDayVal,
                coverSheet: self.imageCorve,
                backgroundMap: self.imageBg,
                labelId: self.types[self.type].id,
                siteId: self.parts[self.part].id,
                ids: JSON.stringify(ids)
              })
              .then(data => {
                self.adding = false;
                self.addClickTrue = false;
                if (data.code == 200) {
                  this.intercept = true;
                  self.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  self.$router.push({
                    path: "/fitness/course"
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
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          } else {
            var id = "";
            id = self.$route.query.id;
            self.adding = true;
            var ids = [];
            self.selectRightLists.forEach(function(ele, ind) {
              ids.push(ele.id);
            });
            var ipdateObj = {};
            ipdateObj = {
              id: id,
              courseName: self.courseNameVal,
              describe: self.descriTextVal,
              courseWeek: self.courseWeekVal,
              frequency:
                "训" + self.frequencyOneVal + "休" + self.frequencyTwoVal,
              singleDay: self.singleDayVal,
              coverSheet: self.imageCorve,
              backgroundMap: self.imageBg,
              labelId: self.types[self.type].id,
              siteId: self.parts[self.part].id,
              trainIds: JSON.stringify(ids)
            };
            self.addClickTrue = true;
            self
              .getfitnessCourseControllerupdateById(ipdateObj)
              .then(dataThr => {
                self.adding = false;
                self.addClickTrue = false;
                if (dataThr.code == 200) {
                  this.intercept = true;
                  self.$message({
                    type: "info",
                    message: "修改成功!"
                  });
                  self.$router.push({
                    path: "/fitness/course"
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
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          }
        } else {
          if (self.iscourseName == false) {
            self.isRedcourseName = true;
            self.isGraycourseName = false;
          } else {
            self.isRedcourseName = false;
            self.isGraycourseName = true;
          }
          if (self.isdescriText == false) {
            self.isReddescriText = true;
            self.isGraydescriText = false;
          } else {
            self.isReddescriText = false;
            self.isGraydescriText = true;
          }
          if (self.isCoverImage == false) {
            self.isRedbrightcoverImg = true;
            self.isGraybrightcoverImg = false;
          } else {
            self.isRedbrightcoverImg = false;
            self.isGraybrightcoverImg = true;
          }
          if (self.isbgImg == false) {
            self.isRedbrightbgImg = true;
            self.isGraybrightbgImg = false;
          } else {
            self.isRedbrightbgImg = false;
            self.isGraybrightbgImg = true;
          }
          if (self.isfrequencyOne == false) {
            self.isRedfrequencyOne = true;
            self.isGrayfrequencyOne = false;
          } else {
            self.isRedfrequencyOne = false;
            self.isGrayfrequencyOne = true;
          }
          if (self.isfrequencyTwo == false) {
            self.isRedfrequencyTwo = true;
            self.isGrayfrequencyTwo = false;
          } else {
            self.isRedfrequencyTwo = false;
            self.isGrayfrequencyTwo = true;
          }
          if (self.issingleDay == false) {
            self.isRedsingleDay = true;
            self.isGraysingleDay = false;
          } else {
            self.isRedsingleDay = false;
            self.isGraysingleDay = true;
          }
          if (self.selectRightLists.length == self.selectTrainNum()) {
            self.isRedrightLists = false;
            self.isGrayrightLists = true;
          } else {
            self.isRedrightLists = true;
            self.isGrayrightLists = false;
          }
          if (frequencySumVal > courseWeekTotal) {
            self.isRedTrainAndRest = true;
            self.isTransparentTrainAndRest = false;
          } else {
            self.isRedTrainAndRest = false;
            self.isTransparentTrainAndRest = true;
          }
        }
      }
    },
    // back
    backClick() {
      this.$router.push({
        path: "/fitness/course"
      });
    },
    ...mapActions([
      "getstorechannelManagementselectChanneluploadFile",
      "getfitnessLabellControllerselectLabellPage",
      "getfitnessSiteControllerselectSitePage",
      "getfitnessTrainControllerselectTrainPage",
      "getfitnessCourseControllersave",
      "getfitnessCourseControllerupdateById",
      "getfitnessCourseControllerfindById",
      "getfitnessCourseControllerselectSiteLabelLevel"
    ])
  },
  // 监视
  watch: {
    courseNameVal: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.iscourseName = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedcourseName = false;
          this.isGraycourseName = true;
          this.iscourseName = true;
        } else {
          this.iscourseName = false;
        }
      }
    },
    descriTextVal: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/[A-Za-z0-9,.，。\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.isdescriText = false;
      } else {
        if (reg.test(trimstr)) {
          this.isReddescriText = false;
          this.isGraydescriText = true;
          this.isdescriText = true;
        } else {
          this.isdescriText = false;
        }
      }
    },
    courseWeekVal: function(val) {
      var trimstr = val;
      var reg = new RegExp(/^\d{1,12}$/);
      if (trimstr.length <= 0) {
        this.iscourseWeek = false;
      } else {
        if (reg.test(trimstr)) {
          this.iscourseWeek = true;
          this.isRedcourseWeek = false;
          this.isGraycourseWeek = true;
        } else {
          this.iscourseWeek = false;
        }
      }
    },
    frequencyTwoVal: function(val) {
      var trimstr = val;
      // var reg = new RegExp(/^\d{1,5}$/);
      var reg = new RegExp(/^[0-9]*$/);
      if (trimstr.length <= 0) {
        this.isfrequencyTwo = false;
        // this.isTransparentTrainAndRest = true,
        //     this.isRedTrainAndRest = false
      } else {
        if (reg.test(trimstr)) {
          this.isfrequencyTwo = true;
          this.isRedfrequencyTwo = false;
          this.isGrayfrequencyTwo = true;
          this.isRedfrequency = false;
          this.isGrayfrequency = true;

          // this.isTransparentTrainAndRest = false,
          //     this.isRedTrainAndRest = true
        } else {
          this.isfrequency = false;
          this.isRedfrequency = true;
          this.isGrayfrequency = false;
        }
      }
    },
    frequencyOneVal: function(val) {
      var trimstr = val;
      // var reg = new RegExp(/^\d{1,5}$/);
      var reg = new RegExp(/^[0-9]*$/);
      if (trimstr.length <= 0) {
        this.isfrequencyOne = false;
      } else {
        if (reg.test(trimstr)) {
          this.isfrequencyOne = true;
          this.isRedfrequencyOne = false;
          this.isGrayfrequencyOne = true;
          this.isRedfrequency = false;
          this.isGrayfrequency = true;
        } else {
          this.isfrequencyOne = false;
          this.isRedfrequency = true;
          this.isGrayfrequency = false;
        }
      }
    },
    singleDayVal: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[0-9]*$/);
      // var reg = new RegExp(/^[\u4e00-\u9fa5]{1,50}$/);
      if (trimstr.length <= 0) {
        this.issingleDay = false;
      } else {
        // if (trimstr.length <= 50) {
        if (reg.test(trimstr)) {
          this.issingleDay = true;
          this.isRedsingleDay = false;
          this.isGraysingleDay = true;
          this.isRedDay = false;
          this.isGrayDay = true;
        } else {
          this.issingleDay = false;
          this.isRedDay = true;
          this.isGrayDay = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.frequencyClass {
  display: flex;
}

.frequencyClass > div {
  min-height: 33px;
  line-height: 33px;
}

.frequencyClass > div:nth-child(1) {
  margin-right: 10px;
}

.frequencyClass > div:nth-child(3) {
  margin-right: 10px;
  margin-left: 10px;
}

.frequencyClass > div:nth-child(5) {
  width: 50px;
}

.frequencyClass input {
  width: 50px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.commodityLeft li:nth-child(1) {
  margin-top: 10px;
}

.commodityLeft {
  height: 240px;
  width: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.commodityLeft li {
  height: 36px;
  width: 100%;
  border-bottom: 1px solid #fff;
  line-height: 36px;
  cursor: pointer;
  padding-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.commodityRight li:nth-child(1) {
  margin-top: 10px;
}

.commodityRight {
  height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.commodityRight li {
  height: 36px;
  border-bottom: 1px solid #fff;
  line-height: 36px;
  font-size: 14px;
  color: #303030;
  cursor: pointer;
  padding-left: 10px;
 
  display: flex;
  justify-content: space-between;
}

.commodityRight li > div:nth-child(1) {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.commodityCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.commodityCenter > div {
  width: 19px;
  height: 65px;
}

.commodityCenter > div > div:nth-child(1) {
  width: 19px;
  height: 30px;
  cursor: pointer;
  overflow: hidden;
  background: url("/static/img/elf.png") no-repeat 50.8% 72%;
}

.commodityCenter > div > div:nth-child(2) {
  width: 19px;
  height: 30px;
  overflow: hidden;
  cursor: pointer;
  margin-top: 12px;
  background: url("/static/img/elf.png") no-repeat 53.4% 72%;
}

.grantCommodity > div:nth-child(2) > div:nth-child(1) {
  width: 240px;
  height: 240px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.grantCommodity > div:nth-child(2) > div:nth-child(2) {
  width: 60px;
  height: 240px;
}

.grantCommodity > div:nth-child(2) > div:nth-child(3) {
  width: 240px;
  height: 240px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.grantCommodity > div:nth-child(2) > div:nth-child(4) {
  width: 120px;
  height: 240px;
  line-height: 440px;
  margin-left: 15px;
}

.grantCommodity {
  display: flex;
  flex-wrap: wrap;
  width: 750px;
  height: 350px;
  margin-top: 24px;
  border-radius: 4px;
  overflow: hidden;
}

.grantCommodity > div:nth-child(1) {
  display: flex;
  width: 100%;
  height: 30px;
  font-size: 16px;
  color: #303030;
  text-align: center;
  line-height: 12px;
}

.grantCommodity > div:nth-child(2) {
  display: flex;
  width: 100%;
  height: 260px;
}

.grantCommodity > div:nth-child(1) > div:nth-child(1) {
  width: 240px;
  height: 40px;
  background-color: #fff;
  line-height: 40px;
}

.grantCommodity > div:nth-child(1) > div:nth-child(2) {
  width: 60px;
  height: 40px;
  margin-left: 0;
}

.grantCommodity > div:nth-child(1) > div:nth-child(3) {
  width: 240px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
}

.bgcolor {
  background-color: #fff1f3;
}

.nullCont {
  min-height: 500px;
  width: 100%;
}

.listCommonSearch > div:nth-child(1) {
  height: 32px;
  width: 750px;
  display: flex;
  align-items: center;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(1) select {
  width: 100px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(2) select {
  width: 100px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(2) {
  margin-left: 20px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(3) select {
  width: 100px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(3) {
  margin-left: 20px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(4) {
  margin-left: 20px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(4) input {
  width: 120px;
  height: 32px;
  border: 1px solid #d1d1d1;
  line-height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(5) {
  margin-left: 24px;
  width: 80px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  background-color: #5acdfa;
  border-radius: 4px;
  cursor: pointer;
}

.listCommon {
  min-height: 260px;
  display: flex;
  width: 100%;
  margin-top: 24px;
  overflow: hidden;
  /*border: 1px solid red;*/
}

.listCommon > div:nth-child(1) {
  height: 260px;
  padding-top: 5px;
  width: 100px;
  text-align: right;
}

.listCommon > div:nth-child(2) {
  min-height: 260px;
  width: 800px;
  margin-left: 20px;
  overflow: hidden;
}

.comone {
  height: 32px;
  display: flex;
  align-items: center;
  margin-top: 24px;
}

.comone > div:nth-child(1) {
  height: 32px;
  line-height: 32px;
  width: 100px;
  text-align: right;
  margin-right: 14px;
}

.comone > div:nth-child(2) {
  margin-top: 5px;
}

.comone > div:nth-child(2) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) {
  margin-top: 5px;
  overflow: hidden;
  margin-left: 30px;
}

.bgImg {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 155px;
}

.bgImg > div:nth-child(2) > div:nth-child(1) {
  width: 170px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.bgImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}

.bgImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 24px;
  width: 70px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #5acdfa;
  color: #fff;
  background-color: #5acdfa;
  cursor: pointer;
}

.bgImg > div:nth-child(2) > div:nth-child(2) label {
  width: 70px;
  padding: 0;
}

.bgImg > div:nth-child(2) {
  width: 400px;
  height: 155px;
  margin-left: 14px;
  display: flex;
  align-items: center;
}

.bgImg > div:nth-child(1) {
  height: 150px;
  width: 100px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
  text-align: right;
}

.bgImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.bgImg > div:nth-child(4) {
  height: 0px;
  margin-left: 24px;
  width: 0px;
  opacity: 0;
  border: 1px solid red;
}

.bgImg > div:nth-child(4) input {
  width: 0;
  height: 0;
  display: none;
}

/*cover*/

.coverImg {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 175px;
}

.coverImg > div:nth-child(2) > div:nth-child(1) {
  width: 310px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.coverImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.coverImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 24px;
  width: 70px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #5acdfa;
  color: #fff;
  background-color: #5acdfa;
  cursor: pointer;
}

.coverImg > div:nth-child(2) > div:nth-child(2) label {
  width: 70px;
  padding: 0;
}

.coverImg > div:nth-child(2) {
  width: 400px;
  height: 270px;
  margin-left: 14px;
  display: flex;
  align-items: center;
}

.coverImg > div:nth-child(1) {
  height: 170px;
  width: 100px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
  text-align: right;
}

.coverImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.coverImg > div:nth-child(4) {
  height: 0px;
  margin-left: 24px;
  width: 0px;
  opacity: 0;
  border: 1px solid red;
}

.coverImg > div:nth-child(4) input {
  width: 0;
  height: 0;
  display: none;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.transparentTest {
  color: transparent;
}

.listPeriod > div > div:nth-child(1) {
  width: 100px;
  text-align: right;
  margin-right: 14px;
}

.listPeriod > div:nth-child(1) > div:nth-child(2) input {
  width: 120px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.listPeriod > div:nth-child(1) > div:nth-child(2) {
  display: flex;
}

.listPeriod > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) {
  line-height: 33px;
  padding-left: 5px;
}

.listPeriod > div {
  width: 260px;
  display: flex;
  align-items: center;
}

.listPeriod {
  margin-top: 24px;
  display: flex;
  min-height: 33px;
  align-items: center;
}

.listPeriod > div:nth-child(3) > div {
  width: 300px;
  margin-left: -170px;
}

.listPeriod > div:nth-child(4) > div {
  width: 300px;
  margin-left: -120px;
}

.listRoutine input {
  width: 305px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.listRoutine > div:nth-child(1) {
  width: 100px;
  text-align: right;
}

.listRoutine > div:nth-child(2) {
  margin-left: 16px;
}

.listRoutine > div:nth-child(3) {
  margin-left: 18px;
}

.listRoutine > div:nth-child(4) {
  margin-left: 18px;
}

.listRoutine {
  margin-top: 24px;
  display: flex;
  min-height: 33px;
  align-items: center;
}

.list-cont {
  width: 850px;
  min-height: 300px;
}

.but {
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 40px;
}

.list .but > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #5acdfa;
  margin-right: 25px;
  cursor: pointer;
}

.list .but > div:nth-child(2) {
  margin-left: 25px;
  width: 68px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #d1d1d1;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
  width: 100%;
}

.listTitle {
  height: 58px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  /*border: 1px solid red;*/
  width: 120px;
  height: 27px;
  margin-top: 12px;
  float: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.listTitle > div:nth-child(1) > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 0px;
  margin-left: 10px;
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

.tipBox {
  display: none;
  display: flex;
}

.tipBox > div {
  width: 120px;
  margin-left: 10px;
}

/* 取消弹出框 */

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
</style>