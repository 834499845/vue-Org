<!--基础字典-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    基础字典
                </div>
                <!--<div>
                    新增分类
                </div>-->
            </div>
            <!--列表-->
            <div class="list">
                <!--<div class="list-nav">
                    <div>
                        顶级字典：
                    </div>
                    <div>
                        <ul>
                            <li v-for="(item,index) in Dictionarys" :class="{'list-li':isListLi,'list-sel':isListSel == index}" @click="dictionClick(index)">
                                {{item.dictionaryName}}
                            </li>
                            <li class="add" @click="addCommClick">
                                添加一级字典
                            </li>
                        </ul>
                    </div>
                </div>-->
                <div class="list-cont" v-loading="loading">
                    <div>
                        <vue-ztree :list.sync='lists' :nameFun="nameClick" :add="addClick" :update="updateClick" :del="deleteClick"></vue-ztree>
                    </div>
                    <div class="nullList" v-show="lists.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling" element-loading-text="删除中....">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
        <!--添加顶级分类弹出框-->
        <div :class="{addPopup:isaddPopup,showadd:isShowadd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding" element-loading-text="添加中....">
                    <div class="ad">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="dicName">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典等级：
                        </div>
                        <div>
                            <input type="text" v-model="diclevel">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典编码：
                        </div>
                        <div>
                            <input type="text" v-model="diccode">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典类型：
                        </div>
                        <div>
                            <input type="text" v-model="dictype">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典内容：
                        </div>
                        <div>
                            <input type="text" v-model="diccontent">
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addokClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加一级分类弹出框-->
        <div :class="{addOnePopup:isaddOnePopup,showaddOne:isShowaddOne}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addOneShow" v-loading="addOneing" element-loading-text="添加中....">
                    <div class="ad">
                        <div>
                            上级字典：
                        </div>
                        <div>
                            {{oneAddName}}
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="oneDic.name">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典编码：
                        </div>
                        <div>
                            <input type="text" v-model="oneDicCode">
                        </div>
                        <div class="n" v-show="adCodeShow">
                            此code已存在
                        </div>
                        <div class="y" v-show="!adCodeShow">
                            此code可以使用
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典内容：
                        </div>
                        <div>
                            <input type="text" v-model="oneDic.content">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典类型：
                        </div>
                        <div>
                            <select @change="selectOneTypeeClick" v-model="oneTypestr">
                                 <option v-for="(type,index) in oneTypes" :key="index" v-bind:value="type.value">{{type.key}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addOneClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--修改录入体征弹出框-->
        <div :class="{addUnitPopup:isaddUnitPopup,showaddUnit:isShowaddUnit}">
            <transition name="slide-fade">
                <div class="addUnitContent" v-show="addUnitShow" v-loading="addUniting">
                    <div class="ad" v-show="!rangeUnitShow">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="upDic.name">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典内容：
                        </div>
                        <div>
                            <input type="text" v-model="upDic.content">
                        </div>
                    </div>
                    <div class="ad" v-show="rangeUnitShow">
                        <div>
                            起始值：
                        </div>
                        <div>
                            <div><input type="number" placeholder="请输入起始值" v-model="upDic.Rangecstart"></div>
                        </div>
                    </div>
                    <div class="ad" v-show="rangeUnitShow">
                        <div>
                            结束值：
                        </div>
                        <div>
                            <div><input type="number" placeholder="请输入结束值" v-model="upDic.Rangecend"></div>
                        </div>
                    </div>
                    <div class="ad" v-show="rangeUnitShow">
                        <div>
                            字典刻度：
                        </div>
                        <div>
                            <div><input type="number" placeholder="请输入刻度" v-model="upDic.Rangecscale"></div>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addUnitClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加和修改年龄段弹出框-->
        <div :class="{addAgePopup:isaddAgePopup,showaddAge:isShowaddAge}">
            <transition name="slide-fade">
                <div class="addAgeContent" v-show="addAgeShow" v-loading="addUniting">
                    <div class="ad">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="ageName">
                        </div>
                    </div>
                    <div class="ad" v-show="ageShowAdd">
                        <div>
                            年龄段：
                        </div>
                        <div>
                            <input type="text" v-model="ageContent" placeholder="例子：0-7，表示0到7岁">
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addAgeClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加健康档案和修改弹出框-->
        <div :class="{addFilePopup:isaddFilePopup,showaddFile:isShowaddFile}">
            <transition name="slide-fade">
                <div class="addFileContent" v-show="addFileShow" v-loading="FileUniting">
                    <div class="ad">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="file.name">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典内容：
                        </div>
                        <div>
                            <input type="text" v-model="file.content">
                        </div>
                    </div>
                    <div class="ad" v-show="fileShowAdd">
                        <div>
                            字典编码：
                        </div>
                        <div>
                            <input type="text" v-model="fileCode">
                        </div>
                        <div class="n" v-show="adCodeShow">
                            此code已存在
                        </div>
                        <div class="y" v-show="!adCodeShow">
                            此code可以使用
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addFileClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加和修改基础字典弹出框-->
        <div :class="{addCityPopup:isaddCityPopup,showaddCity:isShowaddCity}">
            <transition name="slide-fade">
                <div class="addCityContent" v-show="addCityShow" v-loading="addUniting">
                    <div class="ad">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="city.name">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            字典内容：
                        </div>
                        <div>
                            <input type="text" v-model="city.content">
                        </div>
                    </div>
                    <div class="ad" v-show="cityShowAdd">
                        <div>
                            字典编码：
                        </div>
                        <div>
                            <input type="text" v-model="cityCode">
                        </div>
                        <div class="n" v-show="adCodeShow">
                            此code已存在
                        </div>
                        <div class="y" v-show="!adCodeShow">
                            此code可以使用
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addCityClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加和修改食物重量出框-->
        <div :class="{addFoodPopup:isaddFoodPopup,showaddFood:isShowaddFood}">
            <transition name="slide-fade">
                <div class="addFoodContent" v-show="addFoodShow" v-loading="addUniting">
                    <div class="ad">
                        <div>
                            字典名称：
                        </div>
                        <div>
                            <input type="text" v-model="Food.name">
                        </div>
                    </div>
                    <div class="ad" v-show="foodContentShow">
                        <div>
                            字典内容：
                        </div>
                        <div>
                            <input type="number" v-model="Food.content">
                        </div>
                        <div>
                            <select v-model="foodUnit">
                                 <option v-for="(type,index) in foodUnits" :key="index" v-bind:value="type.name">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addFoodClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import select from "../../cModule/select";
import hosdel from "../../cModule/healthdel";
import hosadd from "../../cModule/hosadd";
import vueZtree from "../../cModule/dicTree.vue";
export default {
  components: {
    "v-select": select,
    "v-hosdel": hosdel,
    "v-hosadd": hosadd,
    vueZtree
  },
  computed: mapState(["dicIndexObj"]),
  data() {
    return {
      adCodeShow: false,
      cityShowAdd: true,
      FileUniting: "",
      rangeUnitShow: true,
      ageShowAdd: true,
      typsShows: true,
      addUniting: false,
      unitName: "字典单位",
      oneTypes: [],
      oneTypestr: 1,
      upUnitShow: true,
      oneAddName: "暂无",
      addOneing: false,
      adding: false,
      deling: false,
      loading: false,
      isListSel: 0,
      isListLi: true,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      isaddPopup: true,
      isShowadd: true,
      addShow: false,
      isaddAgePopup: true,
      isShowaddAge: true,
      addAgeShow: false,
      ageShowInde: 0,
      isaddFilePopup: true,
      isShowaddFile: true,
      addFileShow: false,
      fileShowInde: 0,
      fileShowAdd: true,
      isaddCityPopup: true,
      isShowaddCity: true,
      addCityShow: false,
      cityShowInde: 0,
      isaddFoodPopup: false,
      isShowaddFood: true,
      addFoodShow: false,
      FoodShowInde: 0,
      isaddOnePopup: true,
      isShowaddOne: true,
      addOneShow: false,
      isaddUnitPopup: true,
      isShowaddUnit: true,
      addUnitShow: false,
      pageSizeNum: 15,
      currentPage: 1,
      totalNum: 15,
      dictionObj: {
        name: "",
        code: "",
        parentId: "",
        type: "",
        path: "",
        level: "",
        content: "",
        rangeNameJson: "",
        rangeCodeJson: "",
        startValueJson: "",
        endValueJson: "",
        scaleJson: ""
      },
      dicName: "",
      diclevel: "",
      diccode: "",
      dictype: "",
      dicpath: "",
      diccontent: "",
      Dictionarys: [],
      upTypes: [],
      upTypestr: 1,
      upDic: {
        name: "",
        content: "",
        Rangecstart: 0,
        Rangecend: 0,
        Rangecscale: 0,
        id: "",
        code: ""
      },
      ageName: "",
      ageContent: "",
      ageTrue: false,
      city: {
        name: "",
        content: "",
        code: ""
      },
      foodContentShow: false,
      Food: {
        name: "",
        content: 0
      },
      cityCode: "",
      foodUnit: "克",
      foodUnits: [
        {
          name: "克"
        },
        {
          name: "毫升"
        }
      ],
      file: {
        name: "",
        content: "",
        code: ""
      },
      fileCode: "",
      lists: [],
      list: [],
      delIndex: "",
      delParent: "",
      addLevel: 0,
      addOneIndex: "",
      addParent: "",
      oneDic: {
        name: "",
        code: "",
        content: ""
      },
      oneDicCode: "",
      upIndex: "",
      foodIndex: 2,
      parentCode: "",
      addOneClickTrue: false,
      addAgeClickTrue: false,
      addFileClickTrue: false,
      addCityClickTrue: false,
      addFoodClickTrue: false,
      addUnitClickTrue: false,
      okClickTrue: false
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
    // 查询权限
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
      if (arrs.indexOf("dictionary") == -1) {
        self.loading = false;
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
        self.findDictFun();
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
    // 点击收展
    nameClick(m, parent, openIn) {
      var self = this;
      self.loading = true;
      m.children = [];
      if (parent instanceof Array == true) {
        self.parentCode = m.dictionaryCode;
      }
      self
        .gethealtfindDictionaryfindListByParentId({
          parentId: m.id
        })
        .then(data => {
          //   console.log("子字典列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              data.data.forEach(function(ele, i) {
                m.open = openIn;
                m.children.push({
                  id: ele.id,
                  logicDelete: ele.logicDelete,
                  createDate: ele.createDate,
                  updateDate: ele.updateDate,
                  dictionaryName: ele.dictionaryName,
                  dictionaryCode: ele.dictionaryCode,
                  parentId: ele.parentId,
                  type: ele.type,
                  path: ele.path,
                  level: ele.level,
                  content: ele.content,
                  children: []
                  // "opne": true
                });
              });
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
          //   console.log(msg);
          self.lists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 初始化
    findDictFun() {
      var self = this;
      self
        .gethealtfindDictionaryfindListByParentId({
          parentId: 0
        })
        .then(data => {
          //   console.log("子字典列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  self.lists.push({
                    id: ele.id,
                    logicDelete: ele.logicDelete,
                    createDate: ele.createDate,
                    updateDate: ele.updateDate,
                    dictionaryName: ele.dictionaryName,
                    dictionaryCode: ele.dictionaryCode,
                    parentId: ele.parentId,
                    type: ele.type,
                    path: ele.path,
                    level: ele.level,
                    content: ele.content,
                    children: [],
                    open: false
                  });
                });
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
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
    // 获取子字典列表
    dictionClick(index) {
      var self = this;
      self.loading = true;
      self.isListSel = index;
      // 子字典列表
      self.lists = [];
      var idStr = self.Dictionarys[index].id;
      self
        .gethealtfindDictionaryfindListByParentId({
          parentId: idStr
        })
        .then(data => {
          //   console.log("子字典列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  self.lists.push({
                    id: ele.id,
                    logicDelete: ele.logicDelete,
                    createDate: ele.createDate,
                    updateDate: ele.updateDate,
                    dictionaryName: ele.dictionaryName,
                    dictionaryCode: ele.dictionaryCode,
                    parentId: ele.parentId,
                    type: ele.type,
                    path: ele.path,
                    level: ele.level,
                    content: ele.content,
                    children: [],
                    open: false
                  });
                });
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
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
    // 添加顶级分类
    addCommClick() {
      this.isShowadd = false;
      this.addShow = true;
    },
    // 添加确认顶级分类
    addokClick(val) {
      // 新增根字典
      var self = this;
      self.addimg = true;
      self
        .getAddDictionary({
          parentId: 0,
          name: self.dicName,
          level: self.diclevel,
          code: self.diccode,
          type: self.dictype,
          path: "",
          content: self.diccontent
        })
        .then(data => {
          //   console.log("新增根字典", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            self.addimg = false;
            self.isShowadd = true;
            self.addShow = false;
            self.findDictFun();
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
    // 删除
    deleteClick(m, parent) {
      var self = this;
      var pathId = "";
      if (m.path.indexOf(":")) {
        pathId = m.path.split(":")[0];
      } else {
        pathId = m.path;
      }
      if (m.level == 1) {
        self.$message({
          type: "info",
          message: "暂不支持操作!"
        });
      } else {
        if (pathId == "86") {
          self.$message({
            type: "info",
            message: "暂不支持操作!"
          });
        } else {
          this.titlename = "字典";
          this.isShowdel = false;
          this.delShow = true;
          this.delIndex = m;
          this.delParent = parent;
        }
      }
      // self.$message({
      //     type: 'info',
      //     message: '暂不支持操作!'
      // })
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        self.deling = true;
        self.okClickTrue = true;
        // 删除字典
        self
          .getDeleteDictionary({
            id: self.delIndex.id
          })
          .then(data => {
            self.okClickTrue = false;
            self.deling = false;
            if (data.code == 200) {
              self.isShowdel = true;
              self.delShow = false;
              self.$message({
                type: "success",
                message: "删除字典成功!"
              });
              self.delParent.children.forEach(function(ele, ind) {
                if (self.delIndex.id == ele.id) {
                  self.delParent.children.splice(ind, 1);
                }
              });
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okClickTrue = false;
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 一级类型选项
    selectOneTypeeClick() {
      var ind = this.oneTypestr - 1;
      if (this.oneTypes[ind].value == "1") {
        this.unitName = "字典单位";
        this.typsShows = true;
      } else if (this.oneTypes[ind].value == "2") {
        this.unitName = "选项名称";
        this.typsShows = true;
      } else if (this.oneTypes[ind].value == "3") {
        this.typsShows = false;
        this.unitName = "范围名称";
      }
    },
    // 刷新列表
    listFun() {
      var self = this;
      self.lists = [];
      self
        .gethealtfindDictionaryfindListByParentId({
          parentId: 0
        })
        .then(data => {
          //   console.log("子字典列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  self.lists.push({
                    id: ele.id,
                    logicDelete: ele.logicDelete,
                    createDate: ele.createDate,
                    updateDate: ele.updateDate,
                    dictionaryName: ele.dictionaryName,
                    dictionaryCode: ele.dictionaryCode,
                    parentId: ele.parentId,
                    type: ele.type,
                    path: ele.path,
                    level: ele.level,
                    content: ele.content,
                    children: [],
                    open: false
                  });
                });
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
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
    // 添加
    addClick(m, parent) {
      var self = this;
      var level = m.level;
      var pathId = "";
      if (m.path.indexOf(":")) {
        pathId = m.path.split(":")[0];
      } else {
        pathId = m.path;
      }
      console.log(m.id);
      self.addOneIndex = m;
      self.addParent = parent;
      if (pathId == "365") {
        if (level < 4) {
          // 获取类型
          self.oneAddName = m.dictionaryName;
          self.addLevel = level + 1;
          if (level != 3) {
            self
              .getFindBaseDictionaryFromRedis({
                level: level,
                code: m.dictionaryCode
              })
              .then(data => {
                // console.log("对应类型", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  self.oneTypes = data.data;
                  self.oneTypestr = data.data[0].value;
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
            self.isShowaddOne = false;
            self.addOneShow = true;
          } else {
            self.$router.push({
              path: "/health/addDictionary",
              query: {
                level: level,
                code: m.dictionaryCode,
                name: m.dictionaryName,
                parentId: m.id,
                path: m.path
              }
            });
          }
        } else {
          self.$message({
            type: "info",
            message: "已为最小级别字典不可添加!"
          });
        }
      } else if (pathId == "86") {
        // 年龄段添加
        if (level == 1) {
          this.isShowaddAge = false;
          this.addAgeShow = true;
          this.ageShowInde = 0;
        } else {
          self.$message({
            type: "info",
            message: "已为最小级别字典不可添加!"
          });
        }
      } else if (pathId == "103") {
        if (level < 3) {
          self.isShowaddFile = false;
          self.addFileShow = true;
          if (level == 1) {
            self.fileShowAdd = true;
          } else {
            self.fileShowAdd = false;
          }
          self.fileShowInde = 0;
        } else {
          self.$message({
            type: "info",
            message: "已为最小级别字典不可添加!"
          });
        }
      } else if (pathId == "322") {
        // console.log(level);
        if (level < 4) {
          // 获取类型
          self.oneAddName = self.addOneIndex.dictionaryName;
          self.addLevel = level + 1;
          if (level != 3) {
            self
              .getFindBaseDictionaryFromRedis({
                level: level,
                code: self.addOneIndex.dictionaryCode
              })
              .then(data => {
                // console.log("对应类型", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  self.oneTypes = data.data;
                  self.oneTypestr = data.data[0].value;
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
            self.isShowaddOne = false;
            self.addOneShow = true;
          } else {
            self.$router.push({
              path: "/health/addDictionary",
              query: {
                level: level,
                code: self.addOneIndex.dictionaryCode,
                name: self.addOneIndex.dictionaryName,
                parentId: self.addOneIndex.id,
                path: self.addOneIndex.path,
                cla: self.addOneIndex.dictionaryCode
              }
            });
          }
        } else {
          self.$message({
            type: "info",
            message: "已为最小级别字典不可添加!"
          });
        }
      } else if (pathId == "444") {
        if (level == 3) {
          self.$message({
            type: "info",
            message: "暂不支持操作!"
          });
        } else {
          if (m.id == 444) {
            this.foodContentShow = false;
          } else {
            this.foodContentShow = true;
          }
          this.Food.name = "";
          this.Food.content = "";
          this.isaddFoodPopup = true;
          this.isShowaddFood = false;
          this.FoodShowInde = 0;
          this.addFoodShow = true;
        }
      } else if (pathId == "1") {
        this.isShowaddCity = false;
        this.addCityShow = true;
        this.cityShowInde = 0;
        this.cityShowAdd = true;
      } else {
        this.isShowaddCity = false;
        this.addCityShow = true;
        this.cityShowInde = 0;
        this.cityShowAdd = true;
      }
    },
    // 录入体征和标准指标确认添加
    addOneClick() {
      var self = this;
      if (self.addOneClickTrue == false) {
        var pathId = "";
        if (self.addOneIndex.path.indexOf(":")) {
          pathId = self.addOneIndex.path.split(":")[0];
        } else {
          pathId = self.addOneIndex.path;
        }
        if (self.adCodeShow == false) {
          if (pathId == "365") {
            var codeStr =
              self.addOneIndex.dictionaryCode + "_" + self.oneDicCode;
            if (
              self.oneDic.name.length > 0 &&
              self.oneDic.name.length < 10 &&
              self.oneDicCode.length < 10 &&
              self.oneDicCode.length > 0
            ) {
              self.addOneing = true;
              self.addOneClickTrue = true;
              self
                .getAddDictionary({
                  parentId: self.addOneIndex.id,
                  name: self.oneDic.name,
                  level: self.addLevel,
                  code: codeStr,
                  type: self.oneTypestr,
                  path: self.addOneIndex.path,
                  content: self.oneDic.content
                })
                .then(data => {
                  self.addOneClickTrue = false;
                  self.addOneing = false;
                  if (data.code == 200) {
                    self.isShowaddOne = true;
                    self.addOneShow = false;
                    self.oneDic.name = "";
                    self.oneDicCode = "";
                    self.oneDic.content = "";
                    self.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    self.addOneIndex.children.push({
                      id: data.data.id,
                      logicDelete: data.data.logicDelete,
                      createDate: data.data.createDate,
                      updateDate: data.data.updateDate,
                      dictionaryName: data.data.dictionaryName,
                      dictionaryCode: data.data.dictionaryCode,
                      parentId: data.data.parentId,
                      type: data.data.type,
                      path: data.data.path,
                      level: data.data.level,
                      content: data.data.content,
                      children: []
                      // "opne": true
                    });
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addOneing = false;
                  self.addOneClickTrue = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              if (self.oneDic.name.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典名称为必填项!"
                });
              } else if (self.oneDic.name.length > 10) {
                self.$message({
                  type: "info",
                  message: "字典名称可输入十个字符!"
                });
              } else if (self.oneDicCode.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典编码为必填项!"
                });
              } else if (self.oneDicCode.length > 10) {
                self.$message({
                  type: "info",
                  message: "字典编码可输入十个字符!"
                });
              }
            }
          } else if (pathId == "322") {
            if (
              self.oneDic.name.length > 0 &&
              self.oneDic.name.length < 10 &&
              self.oneDicCode.length < 10 &&
              self.oneDicCode.length > 0
            ) {
              self.addOneing = true;
              var codeStr =
                self.addOneIndex.dictionaryCode + "_" + self.oneDicCode;
              self.addOneClickTrue = true;
              self
                .getAddDictionary({
                  parentId: self.addOneIndex.id,
                  name: self.oneDic.name,
                  level: self.addLevel,
                  code: codeStr,
                  type: self.oneTypestr,
                  path: self.addOneIndex.path,
                  content: self.oneDic.content
                })
                .then(data => {
                  self.addOneClickTrue = false;
                  self.addOneing = false;
                  if (data.code == 200) {
                    self.isShowaddOne = true;
                    self.addOneShow = false;
                    self.oneDic.name = "";
                    self.oneDicCode = "";
                    self.oneDic.content = "";
                    self.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    self.addOneIndex.children.push({
                      id: data.data.id,
                      logicDelete: data.data.logicDelete,
                      createDate: data.data.createDate,
                      updateDate: data.data.updateDate,
                      dictionaryName: data.data.dictionaryName,
                      dictionaryCode: data.data.dictionaryCode,
                      parentId: data.data.parentId,
                      type: data.data.type,
                      path: data.data.path,
                      level: data.data.level,
                      content: data.data.content,
                      children: []
                    });
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addOneClickTrue = false;
                  self.addOneing = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              if (self.oneDic.name.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典名称为必填项!"
                });
              } else if (self.oneDic.name.length > 10) {
                self.$message({
                  type: "info",
                  message: "字典名称可输入十个字符!"
                });
              } else if (self.oneDicCode.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典编码为必填项!"
                });
              } else if (self.oneDicCode.length > 10) {
                self.$message({
                  type: "info",
                  message: "字典编码可输入十个字符!"
                });
              }
            }
          }
        } else {
          self.$message({
            type: "info",
            message: "添加失败，此code已存在!"
          });
        }
      }
    },
    // 录入体征和标准指标确认修改
    addUnitClick() {
      var self = this;
      if (self.addUnitClickTrue == false) {
        var pathId = "";
        if (self.upIndex.path.indexOf(":")) {
          pathId = self.upIndex.path.split(":")[0];
        } else {
          pathId = self.upIndex.path;
        }
        if (pathId == "365") {
          if (self.upIndex.level == 4 && self.upIndex.type == 3) {
            if (
              self.upDic.Rangecscale > 0 &&
              self.upDic.Rangecend > 0 &&
              self.upDic.Rangecstart > 0
            ) {
              self.addUniting = true;
              self.addUnitClickTrue = true;
              self
                .getupDictionary({
                  id: self.upIndex.id,
                  parentId: self.upIndex.parentId,
                  name: self.upIndex.dictionaryName,
                  level: self.upIndex.level,
                  code: self.upIndex.dictionaryCode,
                  type: self.upIndex.type,
                  path: self.upIndex.path,
                  content: self.upDic.content,
                  idJson: "[" + self.upIndex.id + "]",
                  rangeCodeJson: '["' + self.upDic.code + '"]',
                  rangeNameJson: '["' + self.upDic.id + '"]',
                  rangeIdJson: "[" + self.upDic.id + "]",
                  scaleJson: "[" + self.upDic.Rangecscale + "]",
                  endValueJson: "[" + self.upDic.Rangecend + "]",
                  startValueJson: "[" + self.upDic.Rangecstart + "]"
                })
                .then(data => {
                  self.addUnitClickTrue = false;
                  self.addUniting = false;
                  if (data.code == 200) {
                    self.isShowaddUnit = true;
                    self.addUnitShow = false;
                    self.upDic.name = "";
                    self.upDic.code = "";
                    self.upDic.content = "";
                    self.$message({
                      type: "success",
                      message: "修改成功!"
                    });
                    self.upIndex.dictionaryName = data.data.dictionaryName;
                    self.upIndex.createDate = data.data.createDate;
                    self.upIndex.updateDate = data.data.updateDate;
                    self.upIndex.id = data.data.id;
                    self.upIndex.dictionaryCode = data.data.dictionaryCode;
                    self.upIndex.parentId = data.data.parentId;
                    self.upIndex.type = data.data.type;
                    self.upIndex.path = data.data.path;
                    self.upIndex.level = data.data.level;
                    self.upIndex.content = data.data.content;
                    self.upIndex.children = data.data.children;
                    self.upIndex.logicDelete = data.data.logicDelete;
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addUnitClickTrue = false;
                  self.addUniting = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              if (self.upDic.Rangecscale <= 0) {
                self.$message({
                  type: "info",
                  message: "刻度为必填项并且大于0!"
                });
              } else if (self.upDic.Rangecend <= 0) {
                self.$message({
                  type: "info",
                  message: "结束值为必填项并且大于0!"
                });
              } else if (self.upDic.Rangecstart <= 0) {
                self.$message({
                  type: "info",
                  message: "开始值为必填项并且大于0!"
                });
              }
            }
          } else {
            if (self.upDic.name.length > 0 && self.upDic.name.length < 10) {
              self.addUniting = true;
              self.addUnitClickTrue = true;
              self
                .getupDictionary({
                  id: self.upIndex.id,
                  parentId: self.upIndex.parentId,
                  name: self.upDic.name,
                  level: self.upIndex.level,
                  code: self.upIndex.dictionaryCode,
                  type: self.upIndex.type,
                  path: self.upIndex.path,
                  content: self.upDic.content
                })
                .then(data => {
                  self.addUnitClickTrue = false;
                  self.addUniting = false;
                  if (data.code == 200) {
                    self.isShowaddUnit = true;
                    self.addUnitShow = false;
                    self.upDic.name = "";
                    self.upDic.code = "";
                    self.upDic.content = "";
                    self.$message({
                      type: "success",
                      message: "修改成功!"
                    });
                    self.upIndex.dictionaryName = data.data.dictionaryName;
                    self.upIndex.createDate = data.data.createDate;
                    self.upIndex.updateDate = data.data.updateDate;
                    self.upIndex.id = data.data.id;
                    self.upIndex.dictionaryCode = data.data.dictionaryCode;
                    self.upIndex.parentId = data.data.parentId;
                    self.upIndex.type = data.data.type;
                    self.upIndex.path = data.data.path;
                    self.upIndex.level = data.data.level;
                    self.upIndex.content = data.data.content;
                    self.upIndex.children = data.data.children;
                    self.upIndex.logicDelete = data.data.logicDelete;
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addUnitClickTrue = false;
                  self.addUniting = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              if (self.upDic.name.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典名称为必填项!"
                });
              } else if (self.upDic.name.length > 10) {
                self.$message({
                  type: "info",
                  message: "字典名称可输入十个字符!"
                });
              }
            }
          }
        } else if (pathId == "322") {
          if (self.upDic.name.length > 0 && self.upDic.name.length < 10) {
            self.addUniting = true;
            self.addUnitClickTrue = true;
            self
              .getupDictionary({
                id: self.upIndex.id,
                parentId: self.upIndex.parentId,
                name: self.upDic.name,
                level: self.upIndex.level,
                code: self.upIndex.dictionaryCode,
                type: self.upIndex.type,
                path: self.upIndex.path,
                content: self.upDic.content
              })
              .then(data => {
                self.addUnitClickTrue = false;
                self.addUniting = false;
                if (data.code == 200) {
                  self.isShowaddUnit = true;
                  self.addUnitShow = false;
                  self.upDic.name = "";
                  self.upDic.code = "";
                  self.upDic.content = "";
                  self.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  self.upIndex.dictionaryName = data.data.dictionaryName;
                  self.upIndex.createDate = data.data.createDate;
                  self.upIndex.updateDate = data.data.updateDate;
                  self.upIndex.id = data.data.id;
                  self.upIndex.dictionaryCode = data.data.dictionaryCode;
                  self.upIndex.parentId = data.data.parentId;
                  self.upIndex.type = data.data.type;
                  self.upIndex.path = data.data.path;
                  self.upIndex.level = data.data.level;
                  self.upIndex.content = data.data.content;
                  self.upIndex.children = data.data.children;
                  self.upIndex.logicDelete = data.data.logicDelete;
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addUnitClickTrue = false;
                self.addUniting = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            if (self.upDic.name.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            } else if (self.upDic.name.length > 10) {
              self.$message({
                type: "info",
                message: "字典名称可输入十个字符!"
              });
            }
          }
        }
      }
    },
    // 修改
    updateClick(m) {
      var self = this;
      self.upIndex = m;
      if (m.level == 1) {
        self.$message({
          type: "info",
          message: "暂不支持操作!"
        });
      } else {
        var pathId = "";
        if (m.path.indexOf(":")) {
          pathId = m.path.split(":")[0];
        } else {
          pathId = m.path;
        }
        if (pathId == "365") {
          self.upDic.name = self.upIndex.dictionaryName;
          self.upDic.content = self.upIndex.content;
          if (self.upIndex.level > 1) {
            self.upUnitShow = true;
            if (self.upIndex.level == 4 && self.upIndex.type == 3) {
              self.addUniting = true;
              self.rangeUnitShow = true;
              self
                .getfindDictionaryById({
                  id: self.upIndex.id
                })
                .then(data => {
                  //   console.log("范围字典", JSON.parse(JSON.stringify(data)));
                  self.addUniting = false;
                  if (data.code == 200) {
                    self.upDic.id = data.data.indexRange.id;
                    self.upDic.code = data.data.indexRange.code;
                    self.upDic.Rangecstart = data.data.indexRange.startValue;
                    self.upDic.Rangecend = data.data.indexRange.endValue;
                    self.upDic.Rangecscale = data.data.indexRange.scaleValue;
                  } else if (data.code == 601) {
                    self.$message({
                      type: "info",
                      message: "查询范围字典失败!"
                    });
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
            } else {
              self.rangeUnitShow = false;
            }
          } else {
            self.rangeUnitShow = false;
            self.upUnitShow = false;
          }
          this.isShowaddUnit = false;
          this.addUnitShow = true;
        } else if (pathId == "86") {
          // 年龄段修改
          this.isShowaddAge = false;
          this.addAgeShow = true;
          this.ageShowInde = 1;
          self.ageName = self.upIndex.dictionaryName;
          self.ageContent = self.upIndex.content;
        } else if (pathId == "103") {
          self.isShowaddFile = false;
          self.addFileShow = true;
          self.fileShowInde = 1;
          var level = self.upIndex.level;
          self.fileShowAdd = false;
          self.file.name = self.upIndex.dictionaryName;
          self.file.content = self.upIndex.content;
        } else if (pathId == "322") {
          self.upDic.name = self.upIndex.dictionaryName;
          self.upDic.content = self.upIndex.content;
          self.rangeUnitShow = false;
          self.isShowaddUnit = false;
          self.addUnitShow = true;
        } else if (pathId == "444") {
          this.isaddFoodPopup = true;
          this.isShowaddFood = false;
          this.FoodShowInde = 1;
          this.addFoodShow = true;
          self.Food.name = self.upIndex.dictionaryName;
          var contentStr = self.upIndex.content;
          if (contentStr.indexOf("/")) {
            self.Food.content = contentStr.split("/")[0];
          } else {
            self.Food.content = self.upIndex.content;
          }
          if (self.upIndex.id == 444 || self.upIndex.parentId == 444) {
            this.foodContentShow = false;
          } else {
            this.foodContentShow = true;
          }
        } else if (pathId == "1") {
          // 基础字典修改
          this.isShowaddCity = false;
          this.addCityShow = true;
          this.cityShowInde = 1;
          this.cityShowAdd = false;
          self.city.name = m.dictionaryName;
          self.city.content = m.content;
        }
      }
    },
    // 年龄段添加和修改
    addAgeClick() {
      var self = this;
      if (self.addAgeClickTrue == false) {
        if (self.ageShowInde == 0) {
          // 添加
          if (self.ageName.length > 0 && self.ageTrue == true) {
            self.addUniting = true;
            self.addAgeClickTrue = true;
            self
              .getAddDictionary({
                parentId: self.addOneIndex.id,
                name: self.ageName,
                level: 2,
                type: "",
                code: "AGE_GROUP",
                path: self.addOneIndex.path,
                content: self.ageContent
              })
              .then(data => {
                self.addAgeClickTrue = false;
                self.addUniting = false;
                if (data.code == 200) {
                  self.isShowaddAge = true;
                  self.addAgeShow = false;
                  self.ageName = "";
                  self.ageContent = "";
                  self.$message({
                    type: "success",
                    message: "新增字典成功!"
                  });
                  self.addOneIndex.children.push({
                    id: data.data.id,
                    logicDelete: data.data.logicDelete,
                    createDate: data.data.createDate,
                    updateDate: data.data.updateDate,
                    dictionaryName: data.data.dictionaryName,
                    dictionaryCode: data.data.dictionaryCode,
                    parentId: data.data.parentId,
                    type: data.data.type,
                    path: data.data.path,
                    level: data.data.level,
                    content: data.data.content,
                    children: []
                    // "opne": true
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addAgeClickTrue = false;
                self.addUniting = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            if (self.ageName.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            }
            if (self.ageTrue == false) {
              self.$message({
                type: "info",
                message: "字典内容格式不正确!"
              });
            }
          }
        } else {
          var contStr = "";
          if (self.upIndex.level == 1) {
            contStr = self.upIndex.content;
          } else {
            contStr = self.ageContent;
          }
          if (self.ageName.length > 0 && self.ageTrue == true) {
            self.addUniting = true;
            self.addAgeClickTrue = true;
            self
              .getupDictionary({
                parentId: self.upIndex.parentId,
                name: self.ageName,
                level: self.upIndex.level,
                type: "",
                code: self.upIndex.dictionaryCode,
                path: self.upIndex.path,
                id: self.upIndex.id,
                content: contStr
              })
              .then(data => {
                self.addAgeClickTrue = false;
                self.addUniting = false;
                if (data.code == 200) {
                  self.isShowaddAge = true;
                  self.addAgeShow = false;
                  self.ageName = "";
                  self.ageContent = "";
                  self.$message({
                    type: "success",
                    message: "修改字典成功!"
                  });
                  self.upIndex.dictionaryName = data.data.dictionaryName;
                  self.upIndex.createDate = data.data.createDate;
                  self.upIndex.updateDate = data.data.updateDate;
                  self.upIndex.id = data.data.id;
                  self.upIndex.dictionaryCode = data.data.dictionaryCode;
                  self.upIndex.parentId = data.data.parentId;
                  self.upIndex.type = data.data.type;
                  self.upIndex.path = data.data.path;
                  self.upIndex.level = data.data.level;
                  self.upIndex.content = data.data.content;
                  self.upIndex.children = data.data.children;
                  self.upIndex.logicDelete = data.data.logicDelete;
                } else if (data.code == 601) {
                  self.$message({
                    type: "info",
                    message: "修改年龄字典失败!"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addAgeClickTrue = false;
                self.addUniting = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            if (self.ageName.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            }
            if (self.ageTrue == false) {
              self.$message({
                type: "info",
                message: "字典内容格式不正确!"
              });
            }
          }
        }
      }
    },
    // 健康档案添加和修改
    addFileClick() {
      var self = this;
      if (self.addFileClickTrue == false) {
        if (self.fileShowInde == 0) {
          if (self.adCodeShow == false) {
            // 添加
            if (self.addOneIndex.level == 1) {
              if (
                self.file.name.length > 0 &&
                self.fileCode.length > 0 &&
                self.file.name.length <= 34
              ) {
                self.FileUniting = true;
                self.addFileClickTrue = true;
                self
                  .getAddDictionary({
                    parentId: self.addOneIndex.id,
                    name: self.file.name,
                    level: self.addOneIndex.level + 1,
                    type: "",
                    code: self.addOneIndex.dictionaryCode + "_" + self.fileCode,
                    path: self.addOneIndex.path,
                    content: self.file.content
                  })
                  .then(data => {
                    self.addFileClickTrue = false;
                    self.FileUniting = false;
                    if (data.code == 200) {
                      self.isShowaddFile = true;
                      self.addFileShow = false;
                      self.file.name = "";
                      self.file.content = "";
                      self.fileCode = "";
                      self.$message({
                        type: "success",
                        message: "新增字典成功!"
                      });
                      self.addOneIndex.children.push({
                        id: data.data.id,
                        logicDelete: data.data.logicDelete,
                        createDate: data.data.createDate,
                        updateDate: data.data.updateDate,
                        dictionaryName: data.data.dictionaryName,
                        dictionaryCode: data.data.dictionaryCode,
                        parentId: data.data.parentId,
                        type: data.data.type,
                        path: data.data.path,
                        level: data.data.level,
                        content: data.data.content,
                        children: []
                        // "opne": true
                      });
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    self.addFileClickTrue = false;
                    self.FileUniting = false;
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                if (self.file.name.length == 0) {
                  self.$message({
                    type: "info",
                    message: "字典名称为必填项!"
                  });
                } else if (self.fileCode.length == 0) {
                  self.$message({
                    type: "info",
                    message: "字典编码为必填项!"
                  });
                } else if (self.file.name.length > 34) {
                  self.$message({
                    type: "info",
                    message: "字典名称为字数最多为34!"
                  });
                }
              }
            } else {
              if (self.file.name.length > 0 && self.file.name.length <= 34) {
                self.FileUniting = true;
                self.addFileClickTrue = true;
                self
                  .getAddDictionary({
                    parentId: self.addOneIndex.id,
                    name: self.file.name,
                    level: self.addOneIndex.level + 1,
                    type: "",
                    code: self.addOneIndex.dictionaryCode + "_WT",
                    path: self.addOneIndex.path,
                    content: self.file.content
                  })
                  .then(data => {
                    self.addFileClickTrue = false;
                    self.FileUniting = false;
                    if (data.code == 200) {
                      self.isShowaddFile = true;
                      self.addFileShow = false;
                      self.file.name = "";
                      self.file.content = "";
                      self.$message({
                        type: "success",
                        message: "新增字典成功!"
                      });
                      self.addOneIndex.children.push({
                        id: data.data.id,
                        logicDelete: data.data.logicDelete,
                        createDate: data.data.createDate,
                        updateDate: data.data.updateDate,
                        dictionaryName: data.data.dictionaryName,
                        dictionaryCode: data.data.dictionaryCode,
                        parentId: data.data.parentId,
                        type: data.data.type,
                        path: data.data.path,
                        level: data.data.level,
                        content: data.data.content,
                        children: []
                        // "opne": true
                      });
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    self.addFileClickTrue = false;
                    self.FileUniting = false;
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                if (self.file.name.length == 0) {
                  self.$message({
                    type: "info",
                    message: "字典名称为必填项!"
                  });
                } else if (self.file.name.length > 34) {
                  self.$message({
                    type: "info",
                    message: "字典名称为字数最多为34!"
                  });
                }
              }
            }
          } else {
            self.$message({
              type: "info",
              message: "添加失败，此code已存在!"
            });
          }
        } else {
          // 修改
          if (self.file.name.length > 0) {
            self.FileUniting = true;
            self
              .getupDictionary({
                parentId: self.upIndex.parentId,
                name: self.file.name,
                level: self.upIndex.level,
                type: "",
                code: self.upIndex.dictionaryCode,
                path: self.upIndex.path,
                id: self.upIndex.id,
                content: self.file.content
              })
              .then(data => {
                //   console.log("修改字典", JSON.parse(JSON.stringify(data)));
                self.FileUniting = false;
                if (data.code == 200) {
                  self.isShowaddFile = true;
                  self.addFileShow = false;
                  self.file.name = "";
                  self.file.content = "";
                  self.$message({
                    type: "success",
                    message: "修改字典成功!"
                  });
                  self.upIndex.dictionaryName = data.data.dictionaryName;
                  self.upIndex.createDate = data.data.createDate;
                  self.upIndex.updateDate = data.data.updateDate;
                  self.upIndex.id = data.data.id;
                  self.upIndex.dictionaryCode = data.data.dictionaryCode;
                  self.upIndex.parentId = data.data.parentId;
                  self.upIndex.type = data.data.type;
                  self.upIndex.path = data.data.path;
                  self.upIndex.level = data.data.level;
                  self.upIndex.content = data.data.content;
                  self.upIndex.children = data.data.children;
                  self.upIndex.logicDelete = data.data.logicDelete;
                } else if (data.code == 601) {
                  self.$message({
                    type: "info",
                    message: "修改字典失败!"
                  });
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
          } else {
            if (self.file.name.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            }
          }
        }
      }
    },
    // 基础字典添加修改
    addCityClick() {
      var self = this;
      if (self.addCityClickTrue == false) {
        if (self.cityShowInde == 0) {
          if (self.adCodeShow == false) {
            if (self.city.name.length > 0 && self.cityCode.length > 0) {
              self.addUniting = true;
              self.addCityClickTrue = true;
              self
                .getAddDictionary({
                  parentId: self.addOneIndex.id,
                  name: self.city.name,
                  level: self.addOneIndex.level + 1,
                  type: "",
                  code: self.cityCode,
                  path: self.addOneIndex.path,
                  content: self.city.content
                })
                .then(data => {
                  self.addCityClickTrue = false;
                  self.addUniting = false;
                  if (data.code == 200) {
                    self.isShowaddCity = true;
                    self.addCityShow = false;
                    self.city.name = "";
                    self.city.content = "";
                    self.cityCode = "";
                    self.$message({
                      type: "success",
                      message: "新增字典成功!"
                    });
                    self.addOneIndex.children.push({
                      id: data.data.id,
                      logicDelete: data.data.logicDelete,
                      createDate: data.data.createDate,
                      updateDate: data.data.updateDate,
                      dictionaryName: data.data.dictionaryName,
                      dictionaryCode: data.data.dictionaryCode,
                      parentId: data.data.parentId,
                      type: data.data.type,
                      path: data.data.path,
                      level: data.data.level,
                      content: data.data.content,
                      children: []
                      // "opne": true
                    });
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addCityClickTrue = false;
                  self.addUniting = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              if (self.city.name.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典名称为必填项!"
                });
              } else if (self.cityCode.length == 0) {
                self.$message({
                  type: "info",
                  message: "字典编码为必填项!"
                });
              }
            }
          } else {
            self.$message({
              type: "info",
              message: "添加失败，此code已存在!"
            });
          }
        } else {
          if (self.city.name.length > 0) {
            self.addUniting = true;
            self.addCityClickTrue = true;
            self
              .getupDictionary({
                parentId: self.upIndex.parentId,
                name: self.city.name,
                level: self.upIndex.level,
                type: "",
                code: self.upIndex.dictionaryCode,
                path: self.upIndex.path,
                id: self.upIndex.id,
                content: self.city.content
              })
              .then(data => {
                self.addCityClickTrue = false;
                self.addUniting = false;
                if (data.code == 200) {
                  self.isShowaddCity = true;
                  self.addCityShow = false;
                  self.city.name = "";
                  self.city.content = "";
                  self.$message({
                    type: "success",
                    message: "修改字典成功!"
                  });
                  self.upIndex.dictionaryName = data.data.dictionaryName;
                  self.upIndex.createDate = data.data.createDate;
                  self.upIndex.updateDate = data.data.updateDate;
                  self.upIndex.id = data.data.id;
                  self.upIndex.dictionaryCode = data.data.dictionaryCode;
                  self.upIndex.parentId = data.data.parentId;
                  self.upIndex.type = data.data.type;
                  self.upIndex.path = data.data.path;
                  self.upIndex.level = data.data.level;
                  self.upIndex.content = data.data.content;
                  self.upIndex.children = data.data.children;
                  self.upIndex.logicDelete = data.data.logicDelete;
                } else if (data.code == 601) {
                  self.$message({
                    type: "info",
                    message: "修改字典失败!"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addCityClickTrue = false;
                self.addUniting = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            if (self.city.name.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            }
          }
        }
      }
    },
    // 食物添加修改
    addFoodClick() {
      var self = this;
      if (self.addFoodClickTrue == false) {
        // 添加
        if (self.FoodShowInde == 0) {
          // 食物重量
          if (self.Food.name.length > 0) {
            self.addUniting = true;
            self.addFoodClickTrue = true;
            var addObj = {};
            if (self.addOneIndex.id == 444) {
              addObj = {
                parentId: self.addOneIndex.id,
                name: self.Food.name,
                level: self.addOneIndex.level + 1,
                type: "",
                code: "FOOD_WEIGHT_STARDAND",
                path: self.addOneIndex.path,
                content: ""
              };
            } else {
              addObj = {
                parentId: self.addOneIndex.id,
                name: self.Food.name,
                level: self.addOneIndex.level + 1,
                type: "",
                code: "FOOD_WEIGHT_STARDAND",
                path: self.addOneIndex.path,
                content: self.Food.content + "/" + self.foodUnit
              };
            }
            self
              .getAddDictionary(addObj)
              .then(data => {
                self.addFoodClickTrue = false;
                self.addUniting = false;
                if (data.code == 200) {
                  self.isaddFoodPopup = true;
                  self.isShowaddFood = true;
                  self.addFoodShow = false;
                  self.Food.name = "";
                  self.Food.content = "";
                  self.$message({
                    type: "success",
                    message: "新增字典成功!"
                  });
                  self.addOneIndex.children.push({
                    id: data.data.id,
                    logicDelete: data.data.logicDelete,
                    createDate: data.data.createDate,
                    updateDate: data.data.updateDate,
                    dictionaryName: data.data.dictionaryName,
                    dictionaryCode: data.data.dictionaryCode,
                    parentId: data.data.parentId,
                    type: data.data.type,
                    path: data.data.path,
                    level: data.data.level,
                    content: data.data.content,
                    children: []
                    // "opne": true
                  });
                } else if (data.code == 601) {
                  self.$message({
                    type: "info",
                    message: "添加失败，此code已存在!"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addFoodClickTrue = false;
                self.addUniting = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            if (self.city.name.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            }
          }
        } else {
          if (self.Food.name.length > 0) {
            self.addUniting = true;
            self.addFoodClickTrue = true;
            var UpdateObj = {};
            if (self.upIndex.id == 444 || self.upIndex.parentId == 444) {
              UpdateObj = {
                parentId: self.upIndex.parentId,
                name: self.Food.name,
                level: self.upIndex.level,
                type: "",
                code: self.upIndex.dictionaryCode,
                path: self.upIndex.path,
                id: self.upIndex.id,
                content: ""
              };
            } else {
              UpdateObj = {
                parentId: self.upIndex.parentId,
                name: self.Food.name,
                level: self.upIndex.level,
                type: "",
                code: self.upIndex.dictionaryCode,
                path: self.upIndex.path,
                id: self.upIndex.id,
                content: self.Food.content + "/" + self.foodUnit
              };
            }
            self
              .getupDictionary(UpdateObj)
              .then(data => {
                self.addFoodClickTrue = false;
                self.addUniting = false;
                if (data.code == 200) {
                  self.isaddFoodPopup = true;
                  self.isShowaddFood = true;
                  self.addFoodShow = false;
                  self.Food.name = "";
                  self.Food.content = "";
                  self.$message({
                    type: "success",
                    message: "修改字典成功!"
                  });
                  self.upIndex.dictionaryName = data.data.dictionaryName;
                  self.upIndex.createDate = data.data.createDate;
                  self.upIndex.updateDate = data.data.updateDate;
                  self.upIndex.id = data.data.id;
                  self.upIndex.dictionaryCode = data.data.dictionaryCode;
                  self.upIndex.parentId = data.data.parentId;
                  self.upIndex.type = data.data.type;
                  self.upIndex.path = data.data.path;
                  self.upIndex.level = data.data.level;
                  self.upIndex.content = data.data.content;
                  self.upIndex.children = data.data.children;
                  self.upIndex.logicDelete = data.data.logicDelete;
                } else if (data.code == 601) {
                  self.$message({
                    type: "info",
                    message: "修改字典失败!"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addFoodClickTrue = false;
                self.addUniting = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            if (self.city.name.length == 0) {
              self.$message({
                type: "info",
                message: "字典名称为必填项!"
              });
            }
          }
        }
      }
    },
    // 取消删除框
    canleClick() {
      var self = this;
      self.isShowdel = true;
      self.delShow = false;
      self.isShowadd = true;
      self.addShow = false;
      self.isShowaddOne = true;
      self.addOneShow = false;
      self.isShowaddUnit = true;
      self.addUnitShow = false;
      self.isShowaddAge = true;
      self.addAgeShow = false;
      self.isShowaddFile = true;
      self.addFileShow = false;
      self.isShowaddCity = true;
      self.addCityShow = false;
      self.isShowaddFood = true;
      self.addFoodShow = false;
      self.oneDic.name = "";
      self.oneDicCode = "";
      self.oneDic.content = "";
      self.file.name = "";
      self.file.content = "";
      self.fileCode = "";
      self.city.name = "";
      self.city.content = "";
      self.cityCode = "";
      self.ageName = "";
      self.ageContent = "";
    },
    ...mapActions([
      "getAddDictionary",
      "getupDictionary",
      "getDeleteDictionary",
      "getFindBaseDictionary",
      "getFindBaseDictionaryFromRedis",
      "getfindRootDictionary",
      "getfindDictionaryListById",
      "getfindDictionaryById",
      "getCheckIndexRangeCode",
      "getListResRole",
      "gethealtfindDictionaryfindListByParentId"
    ])
  },
  // 监视
  watch: {
    oneDicCode: function(val) {
      var self = this;
      self
        .getCheckIndexRangeCode({
          code: self.addOneIndex.dictionaryCode + "_" + val,
          type: 2
        })
        .then(data => {
          //   console.log("检验code", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data == true) {
              self.adCodeShow = true;
            } else {
              self.adCodeShow = false;
            }
          } else if (data.code == 601) {
            self.$message({
              type: "info",
              message: "检验code失败!"
            });
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
    fileCode: function(val) {
      var self = this;
      self
        .getCheckIndexRangeCode({
          code: self.addOneIndex.dictionaryCode + "_" + val,
          type: 2
        })
        .then(data => {
          //   console.log("检验code", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data == true) {
              self.adCodeShow = true;
            } else {
              self.adCodeShow = false;
            }
          } else if (data.code == 601) {
            self.$message({
              type: "info",
              message: "检验code失败!"
            });
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
    cityCode: function(val) {
      var self = this;
      self
        .getCheckIndexRangeCode({
          code: self.addOneIndex.dictionaryCode + "_" + val,
          type: 2
        })
        .then(data => {
          //   console.log("检验code", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data == true) {
              self.adCodeShow = true;
            } else {
              self.adCodeShow = false;
            }
          } else if (data.code == 601) {
            self.$message({
              type: "info",
              message: "检验code失败!"
            });
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
    ageContent: function(val) {
      var smallVal,
        maxVal = "";
      if (val.indexOf("-") > -1) {
        smallVal = val.split("-")[0] * 1;
        maxVal = val.split("-")[1] * 1;
        if (isNaN(smallVal) == false && isNaN(maxVal) == false) {
          this.ageTrue = true;
        } else {
          this.ageTrue = false;
        }
      } else {
        this.ageTrue = false;
      }
    }
  }
};
</script>
<style scoped>
.nullList {
  height: 400px;
}

.nullList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}
/*主页*/

.list-addone > div:nth-child(2) {
  width: 108px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  line-height: 32px;
  margin-right: 15px;
  background-color: #51d0c7;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
}

.list-addone {
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.list-cont > div:nth-child(1) {
  width: 100%;
}

.list-cont ul {
  width: 100%;
  border: 1px solid #ccc;
}

.list-cont li {
  width: 100%;
  min-height: 50px;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
}

.list-cont .noList {
  height: 500px;
}

.list-cont .noList > div:nth-child(1) {
  width: 657px;
  height: 400px;
  margin: 0 auto;
}

.lastLiRight {
  min-width: 300px;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi {
  height: 50px;
  display: flex;
  justify-content: space-between;
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
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  overflow: hidden;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
  line-height: 58px;
  height: 58px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.dataLi > div:nth-child(2) {
  line-height: 58px;
  height: 58px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.firstLi > div:nth-child(2) {
  border-left: 1px solid #e5e7eb;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.dataLi > div:nth-child(3) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  min-width: 75px;
}

.firstLi > div:nth-child(3) {
  border-left: 1px solid #e5e7eb;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.dataLi > div:nth-child(6) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
  text-align: center;
}

.firstLi > div:nth-child(6) {
  border-left: 1px solid #e5e7eb;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.firstLi > div:nth-child(5) {
  border-left: 1px solid #e5e7eb;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.dataLi > div:nth-child(5) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  min-width: 75px;
}

.firstLi > div:nth-child(4) {
  border-left: 1px solid #e5e7eb;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
}

.dataLi > div:nth-child(4) {
  line-height: 58px;
  height: 58px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  min-width: 75px;
  text-overflow: ellipsis;
}

.firstLi > div:nth-child(7) {
  min-width: 118px;
}

.dataLi > div:nth-child(7) {
  min-width: 118px;
}

.dataLi:hover {
  background-color: #f2f4f8;
}

.lis-add {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: flex-end;
}

.lis-add > div {
  width: 68px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  line-height: 32px;
  color: #51d0c7;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #51d0c7;
}

.list-cont {
  min-height: 300px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  border: 1px solid #ccc;
}

.list-nav > div:nth-child(1) {
  width: 80px;
  height: 28px;
  overflow: hidden;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  color: #303030;
  margin-right: 10px;
}

.list-nav {
  display: flex;
}

.list-nav > div:nth-child(2) .list-sel {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

.list-nav > div:nth-child(2) .list-li:hover {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

.list-nav > div:nth-child(2) .add {
  width: 88px;
  height: 28px;
  border: 1px solid #ff8d63;
  color: #ff8d63;
  cursor: pointer;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
}

.list-nav > div:nth-child(2) li {
  margin-bottom: 15px;
  width: 98px;
  height: 28px;
  cursor: pointer;
  line-height: 26px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 26px;
  color: #303030;
  border: 1px solid #d1d1d1;
  float: left;
  user-select: none;
}

.list-nav {
  min-height: 41px;
  width: 100%;
}

.list {
  margin-top: 25px;
  min-height: 450px;
  width: 100%;
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
  border: 1px solid #ff8d63;
  color: #ff8d63;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
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
  background-color: #51d0c7;
}

.but > div:nth-child(2) {
  margin-left: 15px;
  background-color: #d1d1d1;
}

.addContent .ad {
  display: flex;
  margin-top: 15px;
  height: 45px;
  align-items: center;
}

.addContent > div:nth-child(1) {
  margin-top: 30px;
}

.addContent .ad > div:nth-child(1) {
  margin-left: 35px;
  margin-right: 10px;
}

.addContent .ad .n {
  color: red;
  margin-left: 15px;
}

.addContent .ad .y {
  color: green;
  margin-left: 15px;
}

.addContent .ad > div:nth-child(2) input {
  width: 260px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 5px;
}

.addContent {
  width: 525px;
  min-height: 375px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 385px) / 2) auto;
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
/*添加年龄弹出框*/

.addAgeContent .ad {
  display: flex;
  margin-top: 15px;
  height: 45px;
  align-items: center;
}

.addAgeContent > div:nth-child(1) {
  margin-top: 30px;
}

.addAgeContent .ad > div:nth-child(1) {
  margin-left: 25px;
  width: 90px;
  text-align: right;
}

.addAgeContent .ad > div:nth-child(2) {
  margin-left: 10px;
}

.addAgeContent .ad > div:nth-child(2) input {
  width: 250px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 5px;
}

.addAgeContent {
  width: 425px;
  min-height: 105px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 385px) / 2) auto;
  z-index: 100000;
}

.addAgePopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showaddAge {
  display: none;
}
/*添加地区弹出框*/

.addCityContent .ad {
  display: flex;
  margin-top: 15px;
  height: 45px;
  align-items: center;
}

.addCityContent > div:nth-child(1) {
  margin-top: 30px;
}

.addCityContent .ad > div:nth-child(1) {
  margin-left: 25px;
  width: 90px;
  text-align: right;
}

.addCityContent .ad .n {
  color: red;
  margin-left: 15px;
}

.addCityContent .ad .y {
  color: green;
  margin-left: 15px;
}

.addCityContent .ad > div:nth-child(2) {
  margin-left: 10px;
}

.addCityContent .ad > div:nth-child(2) input {
  width: 250px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 5px;
}

.addCityContent {
  width: 525px;
  min-height: 105px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 385px) / 2) auto;
  z-index: 100000;
}

.addCityPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showaddCity {
  display: none;
}
/*添加地区弹出框*/

.addFoodContent .ad {
  display: flex;
  margin-top: 15px;
  height: 45px;
  align-items: center;
}
.addFoodContent .ad:nth-child(1) {
  margin-top: 45px;
}
.addFoodContent > div:nth-child(2) > div:nth-child(3) select {
  width: 70px;
  margin-left: 15px;
}

.addFoodContent > div:nth-child(1) {
  margin-top: 30px;
}

.addFoodContent .ad > div:nth-child(1) {
  margin-left: 25px;
  width: 90px;
  text-align: right;
}

.addFoodContent .ad .n {
  color: red;
  margin-left: 15px;
}

.addFoodContent .ad .y {
  color: green;
  margin-left: 15px;
}

.addFoodContent .ad > div:nth-child(2) {
  margin-left: 10px;
}

.addFoodContent .ad > div:nth-child(2) input {
  width: 250px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 5px;
}

.addFoodContent {
  width: 525px;
  min-height: 105px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  z-index: 100000;
}

.addFoodPopup {
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

.showaddFood {
  display: none;
}
/*文件*/

.addFileContent .ad {
  display: flex;
  margin-top: 15px;
  height: 45px;
  align-items: center;
}

.addFileContent > div:nth-child(1) {
  margin-top: 30px;
}

.addFileContent .ad > div:nth-child(1) {
  margin-left: 25px;
  width: 90px;
  text-align: right;
}

.addFileContent .ad > div:nth-child(2) {
  margin-left: 10px;
}

.addFileContent .ad .n {
  color: red;
  margin-left: 15px;
}

.addFileContent .ad .y {
  color: green;
  margin-left: 15px;
}

.addFileContent .ad > div:nth-child(2) input {
  width: 250px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 5px;
}

.addFileContent {
  width: 525px;
  min-height: 105px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 385px) / 2) auto;
  z-index: 100000;
}

.addFilePopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showaddFile {
  display: none;
}
/*添加一级弹出框*/

.addOneContent {
  width: 425px;
  min-height: 375px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 385px) / 2) auto;
  z-index: 100000;
}

.addOnePopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showaddOne {
  display: none;
}
/*添加单位级弹出框*/

.addUnitContent .ad {
  display: flex;
  margin-top: 15px;
  min-height: 45px;
  align-items: center;
}

.addUnitContent > div:nth-child(1) {
  margin-top: 25px;
}

.addUnitContent .ad > div:nth-child(1) {
  margin-left: 35px;
  margin-right: 10px;
  width: 80px;
  text-align: right;
}

.addUnitContent .ad > div:nth-child(2) input {
  width: 280px;
  height: 32px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 5px;
}

.addUnitContent {
  width: 425px;
  min-height: 225px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  z-index: 100000;
}

.addUnitContent .adFw > div:nth-child(2) {
  width: 300px;
  height: 100%;
  border: 1px solid red;
}

.addUnitContent .adFw > div:nth-child(1) {
  margin-left: 35px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.addUnitContent .adFw {
  min-height: 70px;
  height: 100%;
  border: 1px solid red;
  display: flex;
  margin-top: 15px;
}

.addUnitPopup {
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

.showaddUnit {
  display: none;
}

select {
  width: 300px;
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
  border: 1px solid #eaeaea;
  /*text-align: center;*/
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}
</style>