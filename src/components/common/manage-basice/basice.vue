<!--基础字典-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    基础字典
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <!--<div class="list-nav">
                    <div>
                        基础字典：
                    </div>
                    <div>
                        <ul>
                            <li v-for="(item,index) in Dictionarys" :class="{'list-li':isListLi,'list-sel':isListSelect == index}" @click="dictionClick(index)">
                                {{item.dictionaryName}}
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
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
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
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import select from "../../cModule/select";
import hosdel from "../../cModule/commondel";
import hosadd from "../../cModule/hosadd";
import vueZtree from "../../cModule/homeTree.vue";
export default {
  components: {
    "v-hosdel": hosdel,
    vueZtree
  },
  computed: mapState(["dicIndexObj"]),
  data() {
    return {
      addUniting: false,
      addCityClickTrue: false,
      deling: false,
      loading: false,
      adCodeShow: false,
      cityShowAdd: true,
      isListSelect: 0,
      isListLi: true,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      isaddCityPopup: true,
      isShowaddCity: true,
      addCityShow: false,
      cityShowIndex: 0,
      city: {
        name: "",
        content: "",
        code: ""
      },
      cityCode: "",
      lists: [],
      Dictionarys: [],
      delIndex: "",
      delParent: "",
      addIndex: 0,
      upIndex: "",
      upParent: "",
      optionObj: "",
      opParent: "",
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
        // console.log('3123')
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
      self
        .getbasefindListByParentId({
          parentId: m.id
        })
        .then(data => {
          // console.log('子字典列表', JSON.parse(JSON.stringify(data)))
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
          // console.log(msg)
          self.lists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 初始化列表数据
    findDictFun() {
      var self = this;
      self.lists = [];
      self
        .getbasefindListByParentId({
          parentId: 0
        })
        .then(data => {
          // console.log('子字典列表', JSON.parse(JSON.stringify(data)))
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
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
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          // console.log(msg)
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
      self.isListSelect = index;
      self.lists = [];
      // 子字典列表
      var idStr = self.Dictionarys[index].id;
      self
        .getbasefindListByParentId({
          parentId: idStr
        })
        .then(data => {
          // console.log('子字典列表', JSON.parse(JSON.stringify(data)))
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
          // console.log(msg)
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 删除弹出框
    deleteClick(m, parent) {
      var self = this;
      var pathId = "";
      if (m.path.indexOf(":")) {
        pathId = m.path.split(":")[0];
      } else {
        pathId = m.path;
      }
      if (pathId == "1") {
        self.$router.push({
          path: "/common/addBasecity"
        });
      } else {
        if (m.level == 1) {
          self.$message({
            type: "info",
            message: "暂不支持操作!"
          });
        } else {
          self.titlename = "字典";
          self.isShowdel = false;
          self.delShow = true;
          self.delIndex = m;
          self.delParent = parent;
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
          .getbasedeldictionary({
            id: self.delIndex.id
          })
          .then(data => {
            self.okClickTrue = false;
            self.deling = false;
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
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
            self.isShowdel = true;
            self.delShow = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 刷新列表
    listFun() {
      var self = this;
      self.lists = [];
      var idStr = self.Dictionarys[self.isListSelect].id;
      self
        .getbasefindListByParentId({
          parentId: idStr
        })
        .then(data => {
          // console.log('子字典列表', JSON.parse(JSON.stringify(data)))
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
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
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          // console.log(msg)
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 添加弹框
    addClick(m, parent) {
      var self = this;
      var pathId = "";
      // console.log(m)
      if (m.path.indexOf(":")) {
        pathId = m.path.split(":")[0];
      } else {
        pathId = m.path;
      }
      this.optionObj = m;
      this.opParent = parent;
      if (pathId == "1") {
        self.$router.push({
          path: "/common/addBasecity"
        });
      } else {
        // self.$message({
        //   type: "info",
        //   message: "暂不支持添加子级!"
        // });
        self.isShowaddCity = false;
        self.addCityShow = true;
        self.cityShowIndex = 0;
        self.cityShowAdd = true;
      }
      //  else if (pathId == "3481") {
      //   this.isShowaddCity = false;
      //   this.addCityShow = true;
      //   this.cityShowIndex = 0;
      //   this.cityShowAdd = true;
      // }
    },
    // 修改弹框
    updateClick(m) {
      var self = this;
      var level = m.level;
      var pathId = "";
      if (m.path.indexOf(":")) {
        pathId = m.path.split(":")[0];
      } else {
        pathId = m.path;
      }
      if (level == 1) {
        self.$message({
          type: "info",
          message: "一级字典不支持修改!"
        });
      } else {
        if (pathId == "1") {
          self.$router.push({
            path: "/common/addBasecity"
          });
        } else {
          self.isShowaddCity = false;
          self.addCityShow = true;
          self.cityShowIndex = 1;
          self.cityShowAdd = false;
          self.city.name = m.dictionaryName;
          self.city.content = m.content;
          self.upIndex = m;
        }
      }
    },
    // 确认添加或修改
    addCityClick() {
      var self = this;
      if (self.addCityClickTrue == false) {
        if (self.cityShowIndex == 0) {
          // 添加
          if (self.adCodeShow == false) {
            var pathId = "";
            if (self.optionObj.path.indexOf(":")) {
              pathId = self.optionObj.path.split(":")[0];
            } else {
              pathId = self.optionObj.path;
            }
            console.log(self.optionObj);
            var addObj = {};
            if (
              self.optionObj.dictionaryName == "国籍" ||
              self.optionObj.dictionaryName == "职业" ||
              self.optionObj.dictionaryName == "收入"
            ) {
              addObj = {
                parentId: self.optionObj.id,
                name: self.city.name,
                level: self.optionObj.level + 1,
                type: "2",
                code: self.cityCode,
                path: self.optionObj.path,
                content: self.city.content
              };
            } else {
              addObj = {
                parentId: self.optionObj.id,
                name: self.city.name,
                level: self.optionObj.level + 1,
                type: "1",
                code: self.cityCode,
                path: self.optionObj.path,
                content: self.city.content
              };
            }
            self.addUniting = true;
            self.addCityClickTrue = true;
            self
              .getbaseadddictionary(addObj)
              .then(data => {
                // console.log('新增字典', JSON.parse(JSON.stringify(data)))
                self.addUniting = false;
                self.addCityClickTrue = false;
                if (data.code == 200) {
                  self.isShowaddCity = true;
                  self.addCityShow = false;
                  self.city.name = "";
                  self.city.content = "";
                  self.cityCode = "";
                  self.$message({
                    type: "info",
                    message: "新增字典成功!"
                  });
                  self.optionObj.children.push({
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
                self.addUniting = false;
                self.addCityClickTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
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
              .getbaseupdatedictionary({
                parentId: self.upIndex.parentId,
                name: self.city.name,
                level: self.upIndex.level,
                type: self.upIndex.type,
                code: self.upIndex.dictionaryCode,
                path: self.upIndex.path,
                id: self.upIndex.id,
                content: self.city.content
              })
              .then(data => {
                // console.log('新增字典', JSON.parse(JSON.stringify(data)))
                self.addUniting = false;
                self.addCityClickTrue = false;
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
                self.addUniting = false;
                self.addCityClickTrue = false;
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
      this.isShowdel = true;
      this.delShow = false;
      this.isShowadd = true;
      this.isShowaddCity = true;
      this.addCityShow = false;
      this.city.name = "";
      this.city.content = "";
      this.cityCode = "";
    },
    ...mapActions([
      "getBasefindRootDictionary",
      "getbasecheckCodeIsExist",
      "getbasefindListByParentId",
      "getbaseupdatedictionary",
      "getbasedeldictionary",
      "getbaseadddictionary"
    ])
  },
  // 监视
  watch: {
    cityCode: function(val) {
      var self = this;
      // console.log(val)
      self
        .getbasecheckCodeIsExist({
          code: val,
          type: 2
        })
        .then(data => {
          // console.log('检验code', JSON.parse(JSON.stringify(data)))
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
          // console.log(msg)
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
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
  background-color: #fe5371;
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

.list-cont li {
  display: flex;
  /*border: 1px solid red;*/
  min-height: 40px;
}

.lastLiRight {
  min-width: 300px;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi {
  height: 40px;
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
  height: 50px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.dataLi:hover {
  background-color: #d1d1d1;
}

.dataLi > div:nth-child(1) {
  min-width: 95px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
}

.firstLi > div:nth-child(1) {
  min-width: 95px;
}

.dataLi > div:nth-child(2) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
}

.firstLi > div:nth-child(2) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(3) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
}

.firstLi > div:nth-child(3) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(4) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
}

.firstLi > div:nth-child(4) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(5) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
}

.firstLi > div:nth-child(5) {
  min-width: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dataLi > div:nth-child(6) {
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 58px;
}

.firstLi > div:nth-child(6) {
  min-width: 50px;
}

.dataLi > div:nth-child(7) {
  min-width: 155px;
}

.firstLi > div:nth-child(7) {
  min-width: 155px;
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
  color: #fe5371;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #fe5371;
}

.list-cont > div:nth-child(1) {
  border: 1px solid #ccc;
  border-bottom: 1px solid #ececec;
  overflow: hidden;
}

.list-cont {
  min-height: 40px;
  width: 100%;
  margin-bottom: 40px;
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
  border: 1px solid #fe5371;
  color: #fe5371;
}

.list-nav > div:nth-child(2) .list-li:hover {
  border: 1px solid #fe5371;
  color: #fe5371;
}

.list-nav > div:nth-child(2) li {
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

.list-nav {
  min-height: 41px;
  width: 100%;
}

.list {
  margin-top: 25px;
  min-height: 450px;
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