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
                            训练名称：
                        </div>
                        <div>
                            <input type="text" v-model="trainName" :class="{redInput:isRedtrainName,grayInput:isGraytrainName}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedtrainName,grayTest:isGraytrainName}">
                            最多十个字符
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            训练描述：
                        </div>
                        <div>
                            <input type="text" v-model="describeText" :class="{redInput:isReddescribeText,grayInput:isGraydescribeText}" maxlength="10">
                        </div>
                        <div :class="{redTest:isReddescribeText,grayTest:isGraydescribeText}">
                            最多十个字符
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
                            动作选择：
                        </div>
                        <div class="listCommonSearch">
                            <div>
                                <div>
                                    <select @change="selectSearchTypesClick" v-model="searchType">
                                        <option v-for="(type,index) in searchTypes"  v-bind:value="index">{{type.labelName}}</option>
                                    </select>
                                </div>
                                <div>
                                    <select @change="selectSearchPartsClick" v-model="searchPart">
                                        <option v-for="(type,index) in searchParts"  v-bind:value="index">{{type.siteName}}</option>
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
                                        可选动作
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                        已选动作
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
                                                <div @click="rightListClick(index)"  :class="{bgcolor:isBgcolor == item.bgcolor}">
                                                  {{item.actionName}}
                                                </div>
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
                                <div :class="{redTest:isRedrightLists,grayTest:isGrayrightLists}">
                                    最少添加一个动作
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            动作标签：
                        </div>
                        <div>
                            <select @change="selectTypesClick" v-model="type">
                                <option v-for="(type,index) in types"  v-bind:value="index">{{type.labelName}}</option>
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
                            <select @change="selectPartsClick" v-model="part">
                                <option v-for="(type,index) in parts"  v-bind:value="index">{{type.siteName}}</option>
                            </select>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div class="comone">
                        <div>
                            有无器材：
                        </div>
                        <div>
                            <el-checkbox v-model="Using" @change="typeChange(0)"></el-checkbox><small>无</small>
                        </div>
                        <div>
                            <el-checkbox v-model="NoUsing" @change="typeChange(1)"></el-checkbox><small>有</small>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            动作级别：
                        </div>
                        <div>
                            <select @change="selectLevelsClick" v-model="level">
                                <option v-for="(type,index) in levels"  v-bind:value="index">{{type.name}}</option>
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
        <!--取消弹出框-->
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
      isReddescribeText: false,
      isGraydescribeText: true,
      isdescribeText: false,
      isRedtrainName: false,
      isGraytrainName: true,
      istrainName: false,
      isRedbrightbgImg: false,
      isGraybrightbgImg: true,
      isbgImg: false,
      isRedbrightcoverImg: false,
      isGraybrightcoverImg: true,
      isCoverImage: false,
      Using: true,
      NoUsing: false,
      isRedrightLists: false,
      isGrayrightLists: true,
      types: [],
      type: 0,
      parts: [],
      part: 0,
      levels: [
        { name: "初级", num: 0 },
        { name: "中级", num: 1 },
        { name: "高级", num: 2 }
      ],
      level: 0,
      selectLeftLists: [],
      selectRightLists: [],
      searchArray: [],
      isBgcolor: true,
      searchTypes: [],
      searchType: '',
      searchParts: [],
      searchPart: '',
      searchKeyword: "",
      imageCorve: "",
      imageBg: "",
      trainName: "",
      describeText: "",
      stateIndex: "0",

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
      if (arrs.indexOf("drill") == -1) {
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
          self.title = "新增训练";
          self.addlistFun();
        } else {
          self.title = "修改训练";
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
  //跳转拦截
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
        path: url,
        query: { op: 3, id: sessionStorage.getItem("lookCourseId") }
      });
    },
    //取消拦截弹出
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // add initialize data
    addlistFun() {
      var self = this;
      // 动作列表
      self
        .getfitnessTrainActionControllerfindAction({
          pageNo: 1,
          pageSize: 200
        })
        .then(data => {
          self.loading = false;
          //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var dataArr = [];
                  dataArr = data.data.records;
                  dataArr.forEach(function(ele) {
                    self.selectLeftLists.push({
                      actionName: ele.actionName,
                      id: ele.actionId,
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
          // //console.log("列表", JSON.parse(JSON.stringify(data)))
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
                      self.type = 0;
                    } else {
                      self.types = [{ labelName: "暂无数据", id: 9999 }];
                      self.type = 0;
                    }
                  } else {
                    self.types = [{ labelName: "暂无数据", id: 9999 }];
                    self.type = 0;
                  }
                } else {
                  self.types = [{ labelName: "暂无数据", id: 9999 }];
                  self.type = 0;
                }
              } else {
                self.types = [{ labelName: "暂无数据", id: 9999 }];
                self.type = 0;
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.types = [{ labelName: "暂无数据", id: 9999 }];
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
                  self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
                  self.searchType = 0;
                }
              } else {
                self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
                self.searchType = 0;
              }
            } else {
              self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
              self.searchType = 0;
            }
          } else {
            self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
            self.searchType = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
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
                      self.parts = [{ siteName: "暂无数据", id: 9999 }];
                      self.part = 0;
                    }
                  } else {
                    self.parts = [{ siteName: "暂无数据", id: 9999 }];
                    self.part = 0;
                  }
                } else {
                  self.parts = [{ siteName: "暂无数据", id: 9999 }];
                  self.part = 0;
                }
              } else {
                self.parts = [{ siteName: "暂无数据", id: 9999 }];
                self.part = 0;
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.parts = [{ siteName: "暂无数据", id: 9999 }];
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
                  self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
                  self.searchPart = 0;
                }
              } else {
                self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
                self.searchPart = 0;
              }
            } else {
              self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
              self.searchPart = 0;
            }
          } else {
            self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
            self.searchPart = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
          self.searchPart = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // up initialize data
    uplistFun() {
      var self = this;
      var id = "";
      id = self.$route.query.id;
      self
        .getfitnessTrainControllerfindTrainActionById({
          id: id
        })
        .then(data => {
          //console.log("详情", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            self.imageBg = data.data.backgroundMap || "";
            self.imageCorve = data.data.coverSheet || "";
            self.trainName = data.data.trainName || "";
            self.describeText = data.data.describe || "";
            var labelStr = data.data.labelName || "";
            var siteStr = data.data.siteName || "";
            var levelStr = data.data.level || "";
            self.isbgImg = true;
            self.isCoverImage = true;
            if (data.data.anyEquipment == 1) {
              self.Using = false;
              self.NoUsing = true;
            } else {
              self.Using = true;
              self.NoUsing = false;
            }
            self.levels.forEach(function(ele, ind) {
              if (levelStr == ele.num) {
                self.level = ind;
              }
            });
            var actionLists = [];
            var pathArray = [];
            actionLists = data.data.actionList;
            actionLists.forEach(function(ele) {
              self.selectRightLists.push({
                actionName: ele.actionName,
                id: ele.actionId,
                bgcolor: false
              });
              pathArray.push(ele.actionId);
              self.searchArray.push(ele.actionId);
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
                          if (labelStr == ele.labelName) {
                            self.type = ind;
                          }
                        });
                      } else {
                        self.types = [{ labelName: "暂无数据", id: 9999 }];
                        self.type = 0;
                      }
                    } else {
                      self.types = [{ labelName: "暂无数据", id: 9999 }];
                      self.type = 0;
                    }
                  } else {
                    self.types = [{ labelName: "暂无数据", id: 9999 }];
                    self.type = 0;
                  }
                } else {
                  self.types = [{ labelName: "暂无数据", id: 9999 }];
                  self.type = 0;
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.types = [{ labelName: "暂无数据", id: 9999 }];
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
                // //console.log("列表", JSON.parse(JSON.stringify(data)))
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        self.parts = data.data.records;
                        self.parts.forEach(function(ele, ind) {
                          if (siteStr == ele.siteName) {
                            self.part = ind;
                          }
                        });
                      } else {
                        self.parts = [{ siteName: "暂无数据", id: 9999 }];
                        self.part = 0;
                      }
                    } else {
                      self.parts = [{ siteName: "暂无数据", id: 9999 }];
                      self.part = 0;
                    }
                  } else {
                    self.parts = [{ siteName: "暂无数据", id: 9999 }];
                    self.part = 0;
                  }
                } else {
                  self.parts = [{ siteName: "暂无数据", id: 9999 }];
                  self.part = 0;
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.parts = [{ siteName: "暂无数据", id: 9999 }];
                self.part = 0;
                //console.log(msg);
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
            // 动作列表
            self
              .getfitnessTrainActionControllerfindAction({
                pageNo: 1,
                pageSize: 200
              })
              .then(data => {
                self.loading = false;
                //console.log("可选动作列表", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        var dataArr = [];
                        dataArr = data.data.records;
                        dataArr.forEach(function(ele) {
                          self.selectLeftLists.push({
                            actionName: ele.actionName,
                            id: ele.actionId,
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
                  self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
                  self.searchType = 0;
                }
              } else {
                self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
                self.searchType = 0;
              }
            } else {
              self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
              self.searchType = 0;
            }
          } else {
            self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
            self.searchType = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchTypes = [{ labelName: "暂无数据", id: 9999 }];
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
                  self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
                  self.searchPart = 0;
                }
              } else {
                self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
                self.searchPart = 0;
              }
            } else {
              self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
              self.searchPart = 0;
            }
          } else {
            self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
            self.searchPart = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.searchParts = [{ siteName: "暂无数据", id: 9999 }];
          self.searchPart = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // select yes or no
    typeChange(index) {
      //console.log(index);
      if (index == 1) {
        this.Using = false;
        this.NoUsing = true;
      } else {
        this.Using = true;
        this.NoUsing = false;
      }
      this.stateIndex = index;
    },
    // change img
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
      formdata.append("business", "train");
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
      formdata.append("business", "train");
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
    // select type
    selectTypesClick() {},
    // select part
    selectPartsClick() {},
    // select level
    selectLevelsClick() {},
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
    // select search type
    selectSearchTypesClick() {},
    // select search part
    selectSearchPartsClick() {},
    // search click
    searchClick() {
      var self = this;
      self.selectLeftLists = [];
      if (
        self.searchKeyword.length == 0 &&
        self.searchTypes[self.searchType].labelName == "请选择" &&
        self.searchParts[self.searchPart].siteName == "请选择"
      ) {
        self.addlistFun();
      } else {
        var searchObj = {
          pageNo: 1,
          pageSize: 10
        };

        if (self.searchKeyword.length > 0) {
          searchObj.actionName = self.searchKeyword;
        }
        if (self.searchParts[self.searchPart].siteName != "请选择") {
          searchObj.siteId = self.searchParts[self.searchPart].id;
        }
        if (self.searchTypes[self.searchType].labelName != "请选择") {
          searchObj.labelId = self.searchTypes[self.searchType].id;
        }
        self
          .getfitnessTrainActionControllerfindAction(searchObj)
          .then(data => {
            self.loading = false;
            //console.log("列表", JSON.parse(JSON.stringify(data)));
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  self.selectLeftLists = [];
                  var dataArr = [];
                  dataArr = data.data.records;
                  dataArr.forEach(function(ele) {
                    self.selectLeftLists.push({
                      actionName: ele.actionName,
                      id: ele.actionId,
                      bgcolor: false
                    });
                  });
                  self.selectLeftLists.forEach(function(ele, ind) {
                    if (self.searchArray.indexOf(ele.actionId) != -1) {
                      self.selectLeftLists[ind].bgcolor = true;
                    }
                  });
                }
              } else {
                selectLeftLists = [];
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
            self.lists = [];
            //console.log(msg);
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常!"
            });
          });
      }
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
    // affirm addtion
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var operation = "";
        operation = self.$route.query.op;
        if (
          self.types[self.type].id != 9999 ||
          self.parts[self.part].id != 9999
        ) {
          if (
            self.istrainName == true &&
            self.isdescribeText == true &&
            self.isCoverImage == true &&
            self.isbgImg == true &&
            self.selectRightLists.length > 0
          ) {
            if (operation == 1) {
              self.adding = true;
              var ids = [];
              self.selectRightLists.forEach(function(ele, ind) {
                ids.push(ele.id);
              });
              self.addClickTrue = true;
              self
                .getfitnessTrainControllersave({
                  trainName: self.trainName,
                  describe: self.describeText,
                  coverSheet: self.imageCorve,
                  backgroundMap: self.imageBg,
                  labelId: self.types[self.type].id,
                  siteId: self.parts[self.part].id,
                  anyEquipment: parseInt(self.stateIndex),
                  level: parseInt(self.levels[self.level].num),
                  actionIds: JSON.stringify(ids)
                })
                .then(data => {
                  self.adding = false;
                  self.addClickTrue = false;
                  if (data.code == 200) {
                    self.intercept = true;
                    self.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    self.$router.push({
                      path: "/fitness/drill"
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
              var back = "";
              back = self.$route.query.back;
              self.adding = true;
              var ids = [];
              self.selectRightLists.forEach(function(ele, ind) {
                ids.push(ele.id);
              });
              var ipdateObj = {};
              ipdateObj = {
                id: id,
                trainName: self.trainName,
                describe: self.describeText,
                coverSheet: self.imageCorve,
                backgroundMap: self.imageBg,
                labelId: self.types[self.type].id,
                siteId: self.parts[self.part].id,
                anyEquipment: parseInt(self.stateIndex),
                level: parseInt(self.levels[self.level].num),
                actionIds: JSON.stringify(ids)
              };
              self.addClickTrue = true;
              self
                .getfitnessTrainControllerupdateById(ipdateObj)
                .then(dataThr => {
                  self.adding = false;
                  self.addClickTrue = false;
                  if (dataThr.code == 200) {
                    this.intercept = true;
                    self.$message({
                      type: "info",
                      message: "修改成功!"
                    });
                    if (back == 1) {
                      var parentId = "";
                      parentId = self.$route.query.parentId;
                      self.$router.push({
                        path: "/fitness/lookCourse",
                        query: { id: parentId }
                      });
                    } else {
                      self.$router.push({
                        path: "/fitness/drill"
                      });
                    }
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
            if (self.istrainName == false) {
              self.isRedtrainName = true;
              self.isGraytrainName = false;
            } else {
              self.isRedtrainName = false;
              self.isGraytrainName = true;
            }
            if (self.isdescribeText == false) {
              self.isReddescribeText = true;
              self.isGraydescribeText = false;
            } else {
              self.isReddescribeText = false;
              self.isGraydescribeText = true;
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
            if (self.selectRightLists.length == 0) {
              self.isRedrightLists = true;
              self.isGrayrightLists = false;
            } else {
              self.isRedrightLists = false;
              self.isGrayrightLists = true;
            }
          }
        } else {
          if (self.types[self.type].id == 9999) {
            self.$message({
              type: "info",
              message: "标签暂无数据，请去设置!"
            });
          } else if (self.parts[self.part].id == 9999) {
            self.$message({
              type: "info",
              message: "部位暂无数据，请去设置!"
            });
          }
        }
      }
    },
    // back
    backClick() {
      // this.$router.push({
      //     path: '/fitness/drill'
      // })
      history.back();
    },
    ...mapActions([
      "getfitnessSiteControllerselectSitePage",
      "getfitnessLabellControllerselectLabellPage",
      "getfitnessTrainControllerfindTrainActionById",
      "getstorechannelManagementselectChanneluploadFile",
      "getfitnessTrainActionControllerfindAction",
      "getfitnessTrainControllersave",
      "getfitnessTrainControllerupdateById"
    ])
  },
  // 监视
  watch: {
    trainName: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.istrainName = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedtrainName = false;
          this.isGraytrainName = true;
          this.istrainName = true;
        } else {
          this.istrainName = false;
        }
      }
    },
    describeText: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[A-Za-z0-9,.，。\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.isdescribeText = false;
      } else {
        if (reg.test(trimstr)) {
          this.isReddescribeText = false;
          this.isGraydescribeText = true;
          this.isdescribeText = true;
        } else {
          this.isdescribeText = false;
        }
      }
    }
  }
};
</script>
<style scoped>
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
  
}

.commodityRight li:nth-child(1) {
  margin-top: 10px;
}

.commodityRight {
  height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.commodityRight  li > div:nth-child(1) {
  width: 150px!important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.commodityRight li {
  height: 36px;
  border-bottom: 1px solid #fff;
  line-height: 36px;
  font-size: 14px;
  color: #303030;
  cursor: pointer;
  padding-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
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
  height: 330px;
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
  margin-left: 32px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(3) {
  margin-left: 32px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(3) input {
  width: 210px;
  height: 32px;
  border: 1px solid #d1d1d1;
  line-height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(4) {
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
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  width: 10px;
  font-size: 14px;
}

.bgImg > div:nth-child(4) input {
  width: 10px;
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
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  width: 10px;
  font-size: 14px;
}

.coverImg > div:nth-child(4) input {
  width: 10px;
  display: none;
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