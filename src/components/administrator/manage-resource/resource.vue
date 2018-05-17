<!--资源管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="resource">
        <div>
            <div class="listTitle">
                <div>
                    模块管理
                </div>
                <!--<div @click="">
                    新增顶级模块
                </div>-->
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="addTree">
                    <div>
                        <div @click="addOneCommClick">
                            新增一级模块
                        </div>
                        <div @click="DelOneCommClick">
                            删除模块
                        </div>
                    </div>
                    <div>
                        <el-tree @node-click="oneClick" @check-change="oneCheckChange" :accordion="false" class="treeAdd" :data="dataOneLists"
                            show-checkbox :default-expand-all="false" node-key="id" ref="treeOne" highlight-current :props="defaultPropsOne">
                        </el-tree>
                    </div>
                </div>
                <div class="addTree">
                    <div>
                        <div @click="addTwoCommClick">
                            新增二级列表
                        </div>
                        <div @click="DelTwoCommClick">
                            删除模块
                        </div>
                    </div>
                    <div>
                        <el-tree class="treeAdd" @node-click="twoClick" @check-change="twoCheckChange" :data="dataTwoLists" show-checkbox default-expand-all
                            node-key="id" ref="treeTwo" highlight-current :props="defaultPropsTwo">
                            </el-tree>
                    </div>
                </div>
                <div class="addTree">
                    <div>
                        <div @click="addThreeCommClick">
                            新增三级列表
                        </div>
                        <div @click="DelThreeCommClick">
                            删除模块
                        </div>
                    </div>
                    <div>
                        <el-tree class="treeAdd" @check-change="therrCheckChange" :data="dataTherrLists" show-checkbox default-expand-all node-key="id"
                            ref="treeTherr" highlight-current :props="defaultPropsTherr">
                            </el-tree>
                    </div>
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
        <!--添加一级弹出框-->
        <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                        <div>
                            模块名称：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="resNameVal">
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            模块路径：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="resPathVal">
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            模块排序：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="resSortVal">
                        </div>
                    </div>
                    <div class="addButton">
                        <div @click="butAddClick">确定</div>
                        <div @click="cancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加二级弹出框-->
        <div :class="{twoAddPopup:isTwoAddPopup,showTwoadd:isShowTwoAdd}">
            <transition name="slide-fade">
                <div class="twoAddContent" v-show="twoAddShow">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                        <div>
                            模块名称：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="twoResNameVal">
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            模块路径：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="twoResPathVal">
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            模块排序：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="twoResSortVal">
                        </div>
                    </div>
                    <div class="addButton">
                        <div @click="twoButAddClick">确定</div>
                        <div @click="twoCancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--添加三级弹出框-->
        <div :class="{threeAddPopup:isThreeAddPopup,showThreeAdd:isShowThreeAdd}">
            <transition name="slide-fade">
                <div class="saddContent" v-show="threeAddShow">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                        <div>
                            模块名称：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="threeResNameVal">
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            模块路径：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="threeResPathVal">
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            模块排序：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="threeResSortVal">
                        </div>
                    </div>
                    <div class="addButton">
                        <div @click="threeButAddClick">确定</div>
                        <div @click="threeCancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
let id = 1000;
import { mapActions } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/select";
import hosdel from "../../cModule/healthdel";
export default {
  components: {
    "v-minput": minput,
    "v-select": select,
    "v-hosdel": hosdel
  },
  data() {
    return {
      okClickTrue: false,// 控制确认删除按钮
      threeButAddClickTrue: false,// 控制确认添加三级按钮
      twoButAddClickTrue: false,// 控制确认添加二级按钮
      butAddClickTrue: false,// 控制确认添加一级按钮
      loading: false,// 控制页面加载
      resId: 0,// 存放一级模块富id
      resOneId: 0,// 存放一级模块id
      resTwoId: 0,// 存放二级模块id
      resSortVal: 0,// 添加一级模块弹框模块排序Model
      resNameVal: "",// 添加一级模块弹框模块名称Model
      resPathVal: "",// 添加一级模块弹框模块路径Model
      twoResSortVal: 0,// 添加二级模块弹框模块排序Model
      twoResNameVal: "",// 添加二级模块弹框模块名称Model
      twoResPathVal: "",// 添加二级模块弹框模块路径Model
      threeResSortVal: 0,// 添加三级模块弹框模块排序Model
      threeResNameVal: "",// 添加三级模块弹框模块名称Model
      threeResPathVal: "",// 添加三级模块弹框模块路径Model
      isThreeAddPopup: true,// 控制添加三级弹框显示时的样式
      isShowThreeAdd: true,// 控制添加三级弹框显示与隐藏
      threeAddShow: false,// 控制添加三级弹框显示与隐藏
      isTwoAddPopup: true,// 控制添加二级弹框显示的样式
      isShowTwoAdd: true,// 控制添加二级弹框显示与隐藏
      twoAddShow: false,// 控制添加二级弹框显示与隐藏
      isAddPopup: true,// 控制添加一级弹框显示时的样式
      isShowAdd: true,// 控制添加一级弹框显示与隐藏
      addShow: false,// 控制添加一级弹框显示与隐藏
      titlename: "",// 删除弹框弹出时的提示
      isdelPopup: true,// 控制删除弹框显示时的样式
      isShowdel: true,// 控制删除弹框显示与隐藏
      delShow: false,// 控制删除弹框显示与隐藏
      delIndex: "",// 存放删除index
      dataOneLists: [],// 一级模块列表
      dataTwoLists: [],// 二级模块列表
      dataTherrLists: [],// 三级模块列表
      defaultPropsOne: {
        children: "child",
        label: "name"
      },
      defaultPropsTwo: {
        children: "child",
        label: "name"
      },
      defaultPropsTherr: {
        children: "child",
        label: "name"
      }
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
        if (ele.name == "后台管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("resource") == -1) {
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
    // 获取初始数据
    listFun() {
      var self = this;
      self.loading = true;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getListRes({
          token: TOKEN,
          type: "1"
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.dataOneLists = data.data;
              } else {
                self.dataOneLists = [];
              }
            } else {
              self.dataOneLists = [];
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.dataOneLists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 添加一级资源
    addOneCommClick() {
      this.resId = 0;
      this.isShowAdd = false;
      this.addShow = true;
      // this.$message({
      //     type: 'success',
      //     message: '暂不支持此操作!'
      // })
    },
    // 删除一级资源
    DelOneCommClick() {
        this.titlename = "资源";
        // this.isShowdel = false;
        // this.delShow = true;
        // this.delIndex = 1;
        var ArrS = [];
        ArrS = this.$refs.treeOne.getCheckedNodes()       
        if (ArrS.length > 0) {
          this.isShowdel = false;
          this.delShow = true;
          this.delIndex = 1;
        } else {
          this.$message({
            type: "info",
            message: '请先勾选需要删除的模块！'
          })
        }
      // this.$message({
      //     type: 'success',
      //     message: '暂不支持此操作!'
      // })
    },
    // 一级节点被点击
    oneClick(data) {
      this.dataTwoLists = [];
      this.dataTherrLists = [];
      this.resOneId = 0;
      this.resTwoId = 0;
      this.resOneId = data.id;
      if (data.children != null) {
        this.dataTwoLists = data.children;
      } else {
        this.dataTwoLists = [];
      }
    },
    // 一级节点被打钩
    oneCheckChange(data) {},
    // 确认添加一级
    butAddClick() {
      var self = this;
      if (self.butAddClickTrue == false) {
        self.butAddClickTrue = true;
        self
          .getAddRes({
            name: self.resNameVal,
            parentId: self.resId,
            path: self.resPathVal,
            sort: self.resSortVal,
            type: "1"
          })
          .then(data => {
            self.butAddClickTrue = false;
            self.isShowAdd = true;
            self.addShow = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "添加模块成功!"
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
            self.butAddClickTrue = false;
            self.isShowAdd = true;
            self.addShow = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消添加一级
    cancelClcik() {
      this.isShowAdd = true;
      this.addShow = false;
    },
    // 添加二级资源
    addTwoCommClick() {
      if (this.resOneId == 0) {
        this.$message({
          type: "success",
          message: "请选择需要添加的一级模块!"
        });
      } else {
        this.isShowTwoAdd = false;
        this.twoAddShow = true;
        // this.$message({
        //     type: 'success',
        //     message: '暂不支持此操作!'
        // })
      }
    },
    // 删除二级资源
    DelTwoCommClick() {
        this.titlename = "资源";
        var ArrS = [];
        ArrS = this.$refs.treeTwo.getCheckedNodes()       
        if (ArrS.length > 0) {
          this.isShowdel = false;
          this.delShow = true;
          this.delIndex = 2;
        } else {
          this.$message({
            type: "info",
            message: '请先勾选需要删除的模块！'
          })
        }
      // this.isShowdel = false;
      // this.delShow = true;
      // this.delIndex = 2;
      // this.$message({
      //     type: 'success',
      //     message: '暂不支持此操作!'
      // })
    },
    // 二级节点被点击
    twoClick(data) {
      this.dataTherrLists = [];
      this.resTwoId = data.id;
      if (data.children != null) {
        this.dataTherrLists = data.children;
      } else {
        this.dataTherrLists = [];
      }
    },
    // 二级节点被打钩
    twoCheckChange(data) {
      // console.log(data)
    },
    // 确认添加二级
    twoButAddClick() {
      var self = this;
      if (self.twoButAddClickTrue == false) {
        self.twoButAddClickTrue = true;
        self
          .getAddRes({
            name: self.twoResNameVal,
            parentId: self.resOneId,
            path: self.twoResPathVal,
            sort: self.twoResSortVal,
            type: "1"
          })
          .then(data => {
            self.twoButAddClickTrue = false;
            self.isShowTwoAdd = true;
            self.twoAddShow = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "添加模块成功!"
              });
              self.dataOneLists = [];
              self.dataTwoLists = [];
              self.dataTherrLists = [];
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.twoButAddClickTrue = false;
            self.isShowTwoAdd = true;
            self.twoAddShow = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消添加二级
    twoCancelClcik() {
      this.isShowTwoAdd = true;
      this.twoAddShow = false;
    },
    // 添加三级资源
    addThreeCommClick() {
      if (this.resTwoId == 0) {
        this.$message({
          type: "success",
          message: "请选择需要添加的二级模块!"
        });
      } else {
        this.isShowThreeAdd = false;
        this.threeAddShow = true;
        // this.$message({
        //     type: 'success',
        //     message: '暂不支持此操作!'
        // })
      }
    },
    // 删除三级资源
    DelThreeCommClick() {
        this.titlename = "资源";
        var ArrS = [];
        ArrS = this.$refs.treeTherr.getCheckedNodes();       
        if (ArrS.length > 0) {
          this.isShowdel = false;
          this.delShow = true;
          this.delIndex = 3;
        } else {
          this.$message({
            type: "info",
            message: '请先勾选需要删除的模块！'
          })
        }
    },
    // 打钩三级资源
    therrCheckChange(data) {
      // console.log(data)
    },
    // 确认添加三级
    threeButAddClick() {
      var self = this;
      if (self.threeButAddClickTrue == false) {
        self.threeButAddClickTrue = true;
        self
          .getAddRes({
            name: self.threeResNameVal,
            parentId: self.resTwoId,
            path: self.threeResPathVal,
            sort: self.threeResSortVal,
            type: "1"
          })
          .then(data => {
            self.isShowThreeAdd = true;
            self.threeAddShow = false;
            self.threeButAddClickTrue = false;
            if (data.code == 200) {
              self.dataOneLists = [];
              self.dataTwoLists = [];
              self.dataTherrLists = [];
              self.$message({
                type: "success",
                message: "添加模块成功!"
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
            self.isShowThreeAdd = true;
            self.threeAddShow = false;
            self.threeButAddClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消添加二级
    threeCancelClcik() {
      this.isShowThreeAdd = true;
      this.threeAddShow = false;
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        self.okClickTrue = true;
        var Arr = [];
        if (this.delIndex == 1) {
          Arr = this.$refs.treeOne.getCheckedNodes();
        } else if (this.delIndex == 2) {
          Arr = this.$refs.treeTwo.getCheckedNodes();
        } else if (this.delIndex == 3) {
          Arr = this.$refs.treeTherr.getCheckedNodes();
        }
        var idStr = [];
        if (Arr.length > 0) {
          Arr.forEach(function(ele, ind) {
            idStr.push(ele.id);
          });
          var Str = idStr.join(",");
          var TOKEN = sessionStorage.getItem("token");
          self
            .getDelRes({
              idJson: Str,
              token: TOKEN,
              type: "1"
            })
            .then(data => {
              self.okClickTrue = false;
              self.isShowdel = true;
              self.delShow = false;
              if (data.code == 200) {
                self.$message({
                  type: "success",
                  message: "删除模块成功!"
                });
                self.dataOneLists = [];
                self.dataTwoLists = [];
                self.dataTherrLists = [];
                self.listFun();
              } else {
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
        } else {
          self.$message({
            type: "success",
            message: "请勾选需要删除的模块!"
          });
        }
      }
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    ...mapActions([
      "getDelRes",
      "getAddRes",
      "getListRes",
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.addForm {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
}

.addForm > div:nth-child(2) {
  margin-left: 15px;
}

.addForm > div:nth-child(1) {
  width: 105px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  height: 100%;
}

#inputText {
  width: 270px;
  border: 1px solid #aeaeae;
  height: 32px;
  line-height: 32px;
  padding-left: 2px;
  border-radius: 3px;
}

.addButton {
  width: 100%;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.addButton > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.addButton > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.addButton > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #aeaeae;
  text-align: center;
  line-height: 30px;
}

.addTitle {
  margin-top: 15px;
}
/*添加弹出框*/

.threeAddPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.27);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.saddContent {
  width: 450px;
  height: 260px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 1;
}

.showThreeAdd {
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
/*添加弹出框*/

.twoAddPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.27);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.twoAddContent {
  width: 450px;
  height: 260px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 1;
}

.showTwoadd {
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
/*添加弹出框*/

.addPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.27);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addContent {
  width: 450px;
  height: 260px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 1;
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

.resource {
  width: 100%;
  height: 100%;
}

.resource > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.addTree {
  min-width: 200px;
  min-height: 100px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.addTree > div:nth-child(1) {
  height: 60px;
  width: 100%;
  text-align: center;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #eaeaea;
}

.addTree > div:nth-child(1) > div {
  float: right;
  height: 40px;
  width: 120px;
  border: 1px solid #eaeaea;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 15px;
  margin-left: 15px;
  overflow: hidden;
}

.addTree > div:nth-child(2) {
  min-height: 300px;
  /*border: 1px solid red;*/
  border: 0;
  width: 100%;
}

.treeAdd {
  border: 0;
}

.list {
  margin-top: 25px;
  min-height: 540px;
  display: flex;
  justify-content: space-around;
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
</style>