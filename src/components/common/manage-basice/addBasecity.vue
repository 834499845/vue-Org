<!--添加字典管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        基础字典
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list-menu">
                <div @click="addOrDelClick(1)" :class="{addOrdel:isAddOrDel == 1}">
                    新增
                </div>
                <div @click="addOrDelClick(2)" :class="{addOrdel:isAddOrDel == 2}">
                    编辑
                </div>
                <div @click="addOrDelClick(3)" :class="{addOrdel:isAddOrDel == 3}">
                    删除
                </div>
                <div @click="addOrDelClick(4)" :class="{addOrdel:isAddOrDel == 4}">
                    查看
                </div>
            </div>
            <!--添加-->
            <div v-show="addOrDel == 1" class="list" v-loading="loading">
                <div class="list-nav">
                    <ul>
                        <li v-for="(item,index) in Dictionarys" :class="{'list-li':isListLi,'list-sel':isListSel == index}" @click="dictionClick(index)">
                            {{item.dictionaryName}}
                        </li>
                    </ul>
                </div>
                <div class="list-cont">
                    <div v-show="contIndex == 0" class="cont-shi">
                        <div>
                            <div>
                                省份名称：
                            </div>
                            <div>
                                <input type="text" v-model="sheng" :class="{shengInpit:isShengInput,shengRedInpit:isRedShengInput}">
                            </div>
                            <div :class="{shengTest:isShengInput,shengRedTest:isRedShengInput}">
                                必填项，为汉字，最少一个字符
                            </div>
                        </div>
                        <div>
                            <div>
                                省份编码：
                            </div>
                            <div>
                                <input type="number" v-model="shengCode" :class="{shengInpit:isShengCodeInput,shengRedInpit:isRedShengCodeInput}">
                            </div>
                            <div :class="{shengTest:isShengCodeInput,shengRedTest:isRedShengCodeInput}">
                                必填项，为数字，编码可用
                            </div>
                        </div>
                    </div>
                    <div v-show="contIndex == 1" class="cont-shi">
                        <div>
                            <div>
                                省份名称：
                            </div>
                            <div>
                                <select @change="addselectShiShengClick" v-model="addshiKey">
                                   <option v-for="(type,index) in addshishengs" v-bind:value="index">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                城市名称：
                            </div>
                            <div>
                                <input type="text" v-model="shi" :class="{shengInpit:isShiInput,shengRedInpit:isRedShiInput}">
                            </div>
                            <div :class="{shengTest:isShiInput,shengRedTest:isRedShiInput}">
                                必填项，为汉字
                            </div>
                        </div>
                        <div>
                            <div>
                                城市编码：
                            </div>
                            <div>
                                <input type="number" v-model="shiCode" :class="{shengInpit:isShiCodeInput,shengRedInpit:isRedShiCodeInput}">
                            </div>
                            <div :class="{shengTest:isShiCodeInput,shengRedTest:isRedShiCodeInput}">
                                必填项，为数字，编码可用
                            </div>
                        </div>
                    </div>
                    <div v-show="contIndex == 2" class="cont-shi">
                        <div>
                            <div>
                                省份名称：
                            </div>
                            <div>
                                <select @change="addselectXianShengClick" v-model="xianshengKey">
                                   <option v-for="(type,index) in addxianshengs" v-bind:value="index">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                城市名称：
                            </div>
                            <div>
                                <select @change="addselectXianShiClick" v-model="xianshiKey">
                                   <option v-for="(type,index) in addxianshis" v-bind:value="index">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                县区名称：
                            </div>
                            <div>
                                <input type="text" v-model="xian" :class="{shengInpit:isXianInput,shengRedInpit:isRedXianInput}">
                            </div>
                            <div :class="{shengTest:isXianInput,shengRedTest:isRedXianInput}">
                                必填项，为汉字，最少一个字符
                            </div>
                        </div>
                        <div>
                            <div>
                                县区编码：
                            </div>
                            <div>
                                <input type="number" v-model="xianCode" :class="{shengInpit:isXianCodeInput,shengRedInpit:isRedXianCodeInput}">
                            </div>
                            <div :class="{shengTest:isXianCodeInput,shengRedTest:isRedXianCodeInput}">
                                必填项，为数字，编码可用
                            </div>
                        </div>
                    </div>
                </div>
                <div class="but">
                    <div @click="addClick">确定</div>
                    <div @click="backClick">取消</div>
                </div>
            </div>
            <!--编辑-->
            <div v-show="addOrDel == 2" class="list" v-loading="loading">
                <div class="list-cont">
                    <div class="cont-delshi">
                        <div>
                            <div>
                                省份名称：
                            </div>
                            <div>
                                <select @change="upselectShengClick" v-model="upshengKey">
                                   <option v-for="(type,index) in upshengs" v-bind:value="index">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                            <div @click="updateClick(1)">
                                <img src="/static/img/编辑.png" alt="">
                            </div>
                        </div>
                        <div>
                            <div>
                                城市名称：
                            </div>
                            <div>
                                <select @change="upselectShiClick" v-model="upshiKey">
                                   <option v-for="(type,index) in upshis" v-bind:value="index">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                            <div @click="updateClick(2)">
                                <img src="/static/img/编辑.png" alt="">
                            </div>
                        </div>
                        <div>
                            <div>
                                县区名称：
                            </div>
                            <div>
                                <select @change="upselectXianClick" v-model="upxianKey">
                                   <option v-for="(type,index) in upxians" v-bind:value="index">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                            <div @click="updateClick(3)">
                                <img src="/static/img/编辑.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="but">
                    <div @click="addClick">确定</div>
                    <div @click="backClick">取消</div>
                </div>
            </div>
            <!--删除-->
            <div v-show="addOrDel == 3" class="list" v-loading="loading">
                <div class="list-cont">
                    <div class="cont-delshi">
                        <div>
                            <div>
                                省份名称：
                            </div>
                            <div>
                                <select @change="delselectShengClick" v-model="delshengKey">
                                   <option v-for="(type,index) in delshengs" v-bind:value="type.id">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                            <div @click="delClick(1)">
                                <img src="/static/img/删除.png" alt="">
                            </div>
                        </div>
                        <div>
                            <div>
                                城市名称：
                            </div>
                            <div>
                                <select @change="delselectShiClick" v-model="delshiKey">
                                   <option v-for="(type,index) in delshis" v-bind:value="type.id">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                            <div @click="delClick(2)">
                                <img src="/static/img/删除.png" alt="">
                            </div>
                        </div>
                        <div>
                            <div>
                                县区名称：
                            </div>
                            <div>
                                <select @change="delselectXianClick" v-model="delxianKey">
                                   <option v-for="(type,index) in delxians" v-bind:value="type.id">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                            <div @click="delClick(3)">
                                <img src="/static/img/删除.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="but">
                    <div @click="addClick">确定</div>
                    <div @click="backClick">取消</div>
                </div>
            </div>
            <!--查看-->
            <div v-show="addOrDel == 4" class="list" v-loading="loading">
                <div class="list-cont">
                    <div class="cont-delshi">
                        <div>
                            <div>
                                省份名称：
                            </div>
                            <div>
                                <select @change="dataselectShengClick" v-model="datashengKey">
                                   <option v-for="(type,index) in datashengs" v-bind:value="type.id">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                城市名称：
                            </div>
                            <div>
                                <select @change="dataselectShiClick" v-model="datashiKey">
                                   <option v-for="(type,index) in datashis" v-bind:value="type.id">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                县区名称：
                            </div>
                            <div>
                                <select @change="dataselectXianClick" v-model="dataxianKey">
                                   <option v-for="(type,index) in dataxians" v-bind:value="type.id">{{type.dictionaryName}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="but">
                    <div @click="addClick">确定</div>
                    <div @click="backClick">取消</div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
        <!--修改基础弹出框-->
        <div :class="{addCityPopup:isaddCityPopup,showaddCity:isShowaddCity}">
            <transition name="slide-fade">
                <div class="addCityContent" v-show="addCityShow" v-loading="loading">
                    <div class="ad">
                        <div>
                            名称：
                        </div>
                        <div>
                            <input type="text" v-model="upName">
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            内容：
                        </div>
                        <div>
                            <input type="text" v-model="upContent">
                        </div>
                    </div>
                    <div class="but">
                        <div @click="upCityClick">确定</div>
                        <div @click="canleClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/healthdel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  computed: mapState(["dicIndexObj"]),
  data() {
    return {
      isaddCityPopup: true,
      isShowaddCity: true,
      addCityShow: false,
      isRedXianCodeInput: false,
      isXianCodeInput: true,
      isRedXianInput: false,
      isXianInput: true,
      isRedShiCodeInput: false,
      isShiCodeInput: true,
      isRedShiInput: false,
      isShiInput: true,
      isRedShengCodeInput: false,
      isShengCodeInput: true,
      isRedShengInput: false,
      isShengInput: true,
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      deling: false,
      titlename: "地区",
      isAddOrDel: 1,
      addOrDel: 1,
      addCodeShow: true,
      loading: false,
      Dictionarys: [
        { dictionaryName: "省" },
        { dictionaryName: "市" },
        { dictionaryName: "区县" }
      ],
      isListLi: true,
      isListSel: 0,
      contIndex: 0,
      upId: "",
      shengCode: "",
      shiCode: "",
      xianCode: "",
      xian: "",
      shi: "",
      sheng: "",
      datashengKey: 1,
      datashiKey: 1,
      dataxianKey: 1,
      datashengs: "",
      datashis: "",
      dataxians: "",
      delshengKey: "",
      delshiKey: "",
      delxianKey: "",
      delshengs: "",
      delshis: "",
      delxians: "",
      addshiKey: "",
      addshishengs: "",
      xianshengKey: "",
      xianshiKey: "",
      addxianshengs: "",
      addxianshis: "",
      upshengKey: "",
      upshiKey: "",
      upxianKey: "",
      upshengs: "",
      upshis: "",
      upxians: "",
      upContent: "",
      upName: "",
      ups: [],
      upIndex: "",
      isUpNameInput: true,
      addClickTrue: false,
      okClickTrue: false,
      upCityClickTrue: false
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
      if (arrs.indexOf("basice") == -1) {
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
    // 查看数据信息
    dataShengFun() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: 1
        })
        .then(data => {
          //   console.log("省级列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.datashengs = data.data;
                self.datashengKey = data.data[0].id;
                self.dataselectShengClick();
              } else {
                self.shengs = [];
              }
            } else {
              self.shengs = [];
            }
          } else {
            self.shengs = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.shengs = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    dataselectShengClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.datashengKey
        })
        .then(data => {
          //   console.log("市区级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.datashis = data.data;
                self.datashiKey = data.data[0].id;
                self.dataselectShiClick();
              } else {
                self.datashis = [];
              }
            } else {
              self.datashis = [];
            }
          } else {
            self.datashis = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.datashis = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    dataselectShiClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.datashiKey
        })
        .then(data => {
          //   console.log("县区级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.dataxians = data.data;
                self.dataxianKey = data.data[0].id;
              } else {
                self.dataxians = [];
              }
            } else {
              self.dataxians = [];
            }
          } else {
            self.dataxians = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.dataxians = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    dataselectXianClick() {},
    // 删除数据信息
    delShengFun() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: 1
        })
        .then(data => {
          //   console.log("子字典列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.delshengs = data.data;
                self.delshengKey = data.data[0].id;
                self.delselectShengClick();
              } else {
                self.delshengs = [];
              }
            } else {
              self.delshengs = [];
            }
          } else {
            self.delshengs = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.delshengs = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    delselectShengClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.delshengKey
        })
        .then(data => {
          //   console.log("市区级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.delshis = data.data;
                self.delshiKey = data.data[0].id;
                self.delselectShiClick();
              } else {
                self.delshis = [];
              }
            } else {
              self.delshis = [];
            }
          } else {
            self.delshis = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.delshis = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    delselectShiClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.delshiKey
        })
        .then(data => {
          //   console.log("县区级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.delxians = data.data;
                self.delxianKey = data.data[0].id;
              } else {
                self.delxians = [];
              }
            } else {
              self.delxians = [];
            }
          } else {
            self.delxians = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.delxians = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    delselectXianClick() {},
    // 删除弹出框
    delClick(index) {
      var self = this;
      if (index == 1) {
        if (self.delshengs.length > 0) {
          self.delId = self.delshengKey;
          self.isShowdel = false;
          self.delShow = true;
        } else {
          self.$message({
            type: "info",
            message: "暂无数据。不支持修改!"
          });
        }
      } else if (index == 2) {
        if (self.delshis.length > 0) {
          self.delId = self.delshiKey;
          self.isShowdel = false;
          self.delShow = true;
        } else {
          self.$message({
            type: "info",
            message: "暂无数据。不支持修改!"
          });
        }
      } else if (index == 3) {
        if (self.delxians.length > 0) {
          self.delId = self.delxianKey;
          self.isShowdel = false;
          self.delShow = true;
        } else {
          self.$message({
            type: "info",
            message: "暂无数据。不支持修改!"
          });
        }
      }
    },
    // 确认删除
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        self.loading = true;
        self.okClickTrue = true;
        self
          .getbasedeldictionary({
            id: self.delId
          })
          .then(data => {
            self.okClickTrue = false;
            self.loading = false;
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除字典成功!"
              });
              self.delShengFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okClickTrue = false;
            self.loading = false;
            self.isShowdel = true;
            self.delShow = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除弹框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
      this.isShowaddCity = true;
      this.addCityShow = false;
    },
    // 修改数据信息
    upShengFun() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: 1
        })
        .then(data => {
          //   console.log("修改省份级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.upshengs = data.data;
                self.upshengKey = 0;
                self.upselectShengClick();
              } else {
                self.upshengs = [];
              }
            } else {
              self.upshengs = [];
            }
          } else {
            self.upshengs = [];
            self.loading = false;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.upshengs = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    upselectShengClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.upshengs[self.upshengKey].id
        })
        .then(data => {
          //   console.log("修改市区级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.upshis = data.data;
                self.upshiKey = 0;
                self.upselectShiClick();
              } else {
                self.upshis = [];
              }
            } else {
              self.upshis = [];
            }
          } else {
            self.upshis = [];
            self.loading = false;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.upshis = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    upselectShiClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.upshis[self.upshiKey].id
        })
        .then(data => {
          //   console.log("修改县区级别列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.upxians = data.data;
                self.upxianKey = 0;
              } else {
                self.upxians = [];
              }
            } else {
              self.upxians = [];
            }
          } else {
            self.upxians = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.upxians = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    upselectXianClick() {
      //   console.log(this.upxianKey);
    },
    // 更新
    updateClick(index) {
      var self = this;
      if (index == 1) {
        if (self.upshengs.length > 0) {
          self.ups = self.upshengs;
          self.upIndex = self.upshengKey;
          self.upContent = self.upshengs[self.upshengKey].content;
          self.upName = self.upshengs[self.upshengKey].dictionaryName;
          self.isShowaddCity = false;
          self.addCityShow = true;
        } else {
          self.$message({
            type: "info",
            message: "暂无数据。不支持修改!"
          });
        }
      } else if (index == 2) {
        if (self.upshis.length > 0) {
          self.ups = self.upshis;
          self.upIndex = self.upshiKey;
          self.upContent = self.upshis[self.upshiKey].content;
          self.upName = self.upshis[self.upshiKey].dictionaryName;
          self.isShowaddCity = false;
          self.addCityShow = true;
        } else {
          self.$message({
            type: "info",
            message: "暂无数据。不支持修改!"
          });
        }
      } else if (index == 3) {
        if (self.upxians.length > 0) {
          self.ups = self.upxians;
          self.upIndex = self.upxianKey;
          self.upContent = self.upxians[self.upxianKey].content;
          self.upName = self.upxians[self.upxianKey].dictionaryName;
          self.isShowaddCity = false;
          self.addCityShow = true;
        } else {
          self.$message({
            type: "info",
            message: "暂无数据。不支持修改!"
          });
        }
      }
    },
    // 确认更新
    upCityClick() {
      var self = this;
      if (self.upCityClickTrue == false) {
        if (self.isUpNameInput == false) {
          self.upCityClickTrue = true;
          self
            .getbaseupdatedictionary({
              parentId: self.ups[self.upIndex].parentId,
              name: self.upName,
              level: self.ups[self.upIndex].level,
              type: 0,
              code: self.ups[self.upIndex].dictionaryCode,
              path: self.ups[self.upIndex].path,
              id: self.ups[self.upIndex].id,
              content: self.upContent
            })
            .then(data => {
              self.upCityClickTrue = false;
              if (data.code == 200) {
                self.isShowaddCity = true;
                self.addCityShow = false;
                self.upName = "";
                self.upContent = "";
                self.$message({
                  type: "info",
                  message: "修改字典成功!"
                });
                self.upShengFun();
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
              self.upCityClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          self.$message({
            type: "info",
            message: "字典名称为必填项!"
          });
        }
      }
    },
    // 添加-删除-修改-查看 切换
    addOrDelClick(ind) {
      this.isAddOrDel = ind;
      this.addOrDel = ind;
      if (ind == 1) {
      } else if (ind == 2) {
        this.upShengFun();
      } else if (ind == 3) {
        this.delShengFun();
      } else if (ind == 4) {
        this.dataShengFun();
      }
    },
    // 添加市区数据选择省份的对应选择
    addselectShiShengClick() {
      //   console.log(this.addshiKey);
    },
    // 添加区县数据时跟怒获取省份获取对应市区
    addselectXianShengClick() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: self.addxianshengs[self.xianshengKey].id
        })
        .then(data => {
          //   console.log("城市列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.addxianshis = data.data;
                self.xianshiKey = 0;
              } else {
                self.addxianshis = [];
              }
            } else {
              self.addxianshis = [];
            }
          } else {
            self.addxianshis = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.lists = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 添加区县数据时跟怒获取对应市区索引
    addselectXianShiClick() {
      //   console.log(this.xianshiKey);
    },
    // 添加城市时省份更新
    addShiFun() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: 1
        })
        .then(data => {
          //   console.log("添加市区时省份列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.addshishengs = data.data;
                self.addshiKey = 0;
              } else {
                self.addshishengs = [];
              }
            } else {
              self.addshishengs = [];
            }
          } else {
            self.addshishengs = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.addshishengs = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 添加县区时省份城市更新
    addXianFun() {
      var self = this;
      self.loading = true;
      self
        .getbasefindListByParentId({
          parentId: 1
        })
        .then(data => {
          //   console.log("添加县区时省份列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.addxianshengs = data.data;
                self.xianshengKey = 0;
                self
                  .getbasefindListByParentId({
                    parentId: self.addxianshengs[self.xianshengKey].id
                  })
                  .then(data => {
                    // console.log("添加县区时城市列表", JSON.parse(JSON.stringify(data)));
                    self.loading = false;
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.length > 0) {
                          self.addxianshis = data.data;
                          self.xianshiKey = 0;
                        } else {
                          self.addxianshis = [];
                        }
                      } else {
                        self.addxianshis = [];
                      }
                    } else {
                      self.addxianshis = [];
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    self.loading = false;
                    self.addxianshis = [];
                    // console.log(msg);
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                self.addxianshengs = [];
              }
            } else {
              self.addxianshengs = [];
            }
          } else {
            self.addxianshengs = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.addxianshengs = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 确认添加
    addClick() {
      var self = this;
      var addObj = {};
      if (self.addClickTrue == false) {
        if (self.addCodeShow == false) {
          if (self.contIndex == 0) {
            addObj = {
              parentId: "1",
              name: self.sheng,
              level: 2,
              type: "0",
              code: self.shengCode,
              path: "1",
              content: ""
            };
            if (
              self.isRedShengCodeInput == true &&
              self.isRedShengInput == true
            ) {
              self.loading = true;
              self.addClickTrue = true;
              self
                .getbaseadddictionary(addObj)
                .then(data => {
                  self.addClickTrue = false;
                  self.loading = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "info",
                      message: "新增字典成功!"
                    });
                    self.shengCode = "";
                    self.shiCode = "";
                    self.xianCode = "";
                    self.sheng = "";
                    self.shi = "";
                    self.xian = "";
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
                  self.addClickTrue = false;
                  self.loading = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              self.$message({
                type: "info",
                message: "输入不符合规则!"
              });
            }
          } else if (self.contIndex == 1) {
            addObj = {
              parentId: self.addshishengs[self.addshiKey].id,
              name: self.shi,
              level: 3,
              type: "0",
              code: self.shiCode,
              path: self.addshishengs[self.addshiKey].path,
              content: ""
            };
            if (self.isRedShiCodeInput == true && self.isRedShiInput == true) {
              self.addClickTrue = true;
              self.loading = true;
              self
                .getbaseadddictionary(addObj)
                .then(data => {
                  self.addClickTrue = false;
                  self.loading = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "info",
                      message: "新增字典成功!"
                    });
                    self.shengCode = "";
                    self.shiCode = "";
                    self.xianCode = "";
                    self.sheng = "";
                    self.shi = "";
                    self.xian = "";
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
                  self.addClickTrue = false;
                  self.loading = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              self.$message({
                type: "info",
                message: "输入不符合规则!"
              });
            }
          } else if (self.contIndex == 2) {
            addObj = {
              parentId: self.addxianshis[self.xianshiKey].id,
              name: self.xian,
              level: 4,
              type: "0",
              code: self.xianCode,
              path: self.addxianshis[self.xianshiKey].path,
              content: ""
            };
            if (
              self.isRedXianCodeInput == true &&
              self.isRedXianInput == true
            ) {
              self.addClickTrue = true;
              self.loading = true;
              self
                .getbaseadddictionary(addObj)
                .then(data => {
                  self.addClickTrue = false;
                  self.loading = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "info",
                      message: "新增字典成功!"
                    });
                    self.shengCode = "";
                    self.shiCode = "";
                    self.xianCode = "";
                    self.sheng = "";
                    self.shi = "";
                    self.xian = "";
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
                  self.addClickTrue = false;
                  self.loading = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              self.$message({
                type: "info",
                message: "输入不符合规则!"
              });
            }
          }
        } else {
          self.$message({
            type: "info",
            message: "此编码不可用!"
          });
        }
      }
    },
    // 切换添加省市区
    dictionClick(index) {
      this.isListSel = index;
      this.contIndex = index;
      if (index == 0) {
      } else if (index == 1) {
        this.addShiFun();
      } else if (index == 2) {
        this.addXianFun();
      }
      this.shengCode = "";
      this.shiCode = "";
      this.xianCode = "";
      this.sheng = "";
      this.shi = "";
      this.xian = "";
    },
    // 箭头返回上一页
    backClick() {
      var self = this;
      self.$router.push({
        path: "/common/basice"
      });
    },
    ...mapActions([
      "getbasefindListByParentId",
      "getbaseadddictionary",
      "getbasecheckCodeIsExist",
      "getbasedeldictionary",
      "getbaseupdatedictionary"
    ])
  },
  // 监视
  watch: {
    shengCode: function(val) {
      var self = this;
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^\d{1,12}$/);
      if (trimstr.length <= 0) {
        self.isRedShengCodeInput = false;
        self.isShengCodeInput = true;
      } else {
        if (reg.test(trimstr)) {
          self
            .getbasecheckCodeIsExist({
              code: val,
              type: 2
            })
            .then(data => {
              //   console.log("检验code", JSON.parse(JSON.stringify(data)));
              if (data.code == 200) {
                if (data.data == true) {
                  self.addCodeShow = true;
                  self.isRedShengCodeInput = false;
                  self.isShengCodeInput = true;
                } else {
                  self.isRedShengCodeInput = true;
                  self.isShengCodeInput = false;
                  self.addCodeShow = false;
                }
              } else if (data.code == 601) {
                self.$message({
                  type: "info",
                  message: "检验code失败!"
                });
                self.isRedShengCodeInput = false;
                self.isShengCodeInput = true;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
                self.isRedShengCodeInput = false;
                self.isShengCodeInput = true;
              }
            })
            .catch(msg => {
              //   console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
              self.isRedShengCodeInput = false;
              self.isShengCodeInput = true;
            });
        } else {
          self.isRedShengCodeInput = false;
          self.isShengCodeInput = true;
        }
      }
    },
    shiCode: function(val) {
      var self = this;
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^\d{1,12}$/);
      if (trimstr.length <= 0) {
        self.isRedShiCodeInput = false;
        self.isShiCodeInput = true;
      } else {
        if (reg.test(trimstr)) {
          self
            .getbasecheckCodeIsExist({
              code: val,
              type: 2
            })
            .then(data => {
              //   console.log("检验code", JSON.parse(JSON.stringify(data)));
              if (data.code == 200) {
                if (data.data == true) {
                  self.addCodeShow = true;
                  self.isRedShiCodeInput = false;
                  self.isShiCodeInput = true;
                } else {
                  self.addCodeShow = false;
                  self.isRedShiCodeInput = true;
                  self.isShiCodeInput = false;
                }
              } else if (data.code == 601) {
                self.$message({
                  type: "info",
                  message: "检验code失败!"
                });
                self.isRedShiCodeInput = false;
                self.isShiCodeInput = true;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
                self.isRedShiCodeInput = false;
                self.isShiCodeInput = true;
              }
            })
            .catch(msg => {
              //   console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
              self.isRedShiCodeInput = false;
              self.isShiCodeInput = true;
            });
        } else {
          self.isRedShiCodeInput = false;
          self.isShiCodeInput = true;
        }
      }
    },
    xianCode: function(val) {
      var self = this;
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^\d{1,12}$/);
      if (trimstr.length <= 0) {
        self.isRedXianCodeInput = false;
        self.isXianCodeInput = true;
      } else {
        if (reg.test(trimstr)) {
          self
            .getbasecheckCodeIsExist({
              code: val,
              type: 2
            })
            .then(data => {
              //   console.log("检验code", JSON.parse(JSON.stringify(data)));
              if (data.code == 200) {
                if (data.data == true) {
                  self.addCodeShow = true;
                  self.isRedXianCodeInput = false;
                  self.isXianCodeInput = true;
                } else {
                  self.addCodeShow = false;
                  self.isRedXianCodeInput = true;
                  self.isXianCodeInput = false;
                }
              } else if (data.code == 601) {
                self.$message({
                  type: "info",
                  message: "检验code失败!"
                });
                self.isRedXianCodeInput = false;
                self.isXianCodeInput = true;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
                self.isRedXianCodeInput = false;
                self.isXianCodeInput = true;
              }
            })
            .catch(msg => {
              //   console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
              self.isRedXianCodeInput = false;
              self.isXianCodeInput = true;
            });
        } else {
          self.isRedXianCodeInput = false;
          self.isXianCodeInput = true;
        }
      }
    },
    sheng: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      if (trimstr.length <= 0) {
        this.isShengInput = true;
        this.isRedShengInput = false;
      } else {
        if (reg.test(trimstr)) {
          this.isShengInput = false;
          this.isRedShengInput = true;
        } else {
          this.isShengInput = true;
          this.isRedShengInput = false;
        }
      }
    },
    shi: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      if (trimstr.length <= 0) {
        this.isShiInput = true;
        this.isRedShiInput = false;
      } else {
        if (reg.test(trimstr)) {
          this.isShiInput = false;
          this.isRedShiInput = true;
        } else {
          this.isShiInput = true;
          this.isRedShiInput = false;
        }
      }
    },
    xian: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      if (trimstr.length <= 0) {
        this.isXianInput = true;
        this.isRedXianInput = false;
      } else {
        if (reg.test(trimstr)) {
          this.isXianInput = false;
          this.isRedXianInput = true;
        } else {
          this.isXianInput = true;
          this.isRedXianInput = false;
        }
      }
    },
    upName: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      if (trimstr.length <= 0) {
        this.isUpNameInput = true;
      } else {
        if (reg.test(trimstr)) {
          this.isUpNameInput = false;
        } else {
          this.isUpNameInput = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.shengTest {
  color: #fe5371;
}

.shengRedTest {
  color: #d1d1d1;
}

.shengRedInpit {
  border: 1px solid #d1d1d1;
}

.shengInpit {
  border: 1px solid #fe5371;
}

input {
  width: 220px;
  height: 32px;
  border-radius: 3px;
  padding-left: 5px;
}

.cont-delshi > div {
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
}

.cont-delshi > div > div:nth-child(2) {
  margin-left: 15px;
}

.cont-delshi > div > div:nth-child(3) {
  margin-left: 25px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.cont-shi > div {
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
}

.cont-shi > div > div:nth-child(2) {
  margin-left: 15px;
}

.cont-shi > div > div:nth-child(3) {
  margin-left: 25px;
}

.cont-sheng {
  display: flex;
  align-items: center;
}

.cont-sheng > div:nth-child(2) {
  margin-left: 15px;
}

.list-cont > div {
  width: 700px;
  min-height: 70px;
}

.list-menu .addOrdel {
  background-color: #fe5371;
  color: #fff;
}

.list-menu {
  height: 50px;
  width: 1000px;
  overflow: hidden;
  display: flex;
  margin-top: 15px;
}

.list-menu div {
  border: 1px solid #fe5371;
  margin-bottom: 15px;
  width: 98px;
  height: 28px;
  cursor: pointer;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 26px;
  color: #303030;
}

.list-cont {
  min-height: 70px;
  width: 100%;
}

.list-nav {
  min-height: 40px;
  width: 100%;
  overflow: hidden;
}

.list-nav .list-sel {
  border: 1px solid #fe5371;
  color: #fe5371;
}

.list-nav .list-li:hover {
  border: 1px solid #fe5371;
  color: #fe5371;
}

.list-nav .add {
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

.list-nav li {
  margin-bottom: 15px;
  width: 98px;
  height: 28px;
  cursor: pointer;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 26px;
  color: #303030;
  border: 1px solid #d1d1d1;
  float: left;
}

.list {
  min-height: 540px;
  overflow: hidden;
  width: 100%;
}

.sale {
  width: 100%;
  height: 100%;
}

.but {
  margin-top: 25px;
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
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
  cursor: pointer;
  border-radius: 3px;
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

.listTitle > div:nth-child(1) {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.listTitle > div:nth-child(1) > div:nth-child(1) {
  width: 24px;
  height: 24px;
}

.listTitle > div:nth-child(1) > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  /*font-weight: 600;*/
  margin-left: 10px;
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

.showdel {
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
  width: 425px;
  min-height: 105px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.but {
  margin-top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

.showaddCity {
  display: none;
}
</style>