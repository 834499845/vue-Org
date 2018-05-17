<!--资源管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientSideResource">
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
                        <el-tree @node-click="oneTherrClick" @check-change="oneCheckChange" :accordion="false" class="treeAdd" :data="dataOneLists"
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
                        <el-tree class="treeAdd" @node-click="twoTherrClick" @check-change="twoCheckChange" :data="dataTwoLists" show-checkbox default-expand-all
                            node-key="id" ref="treeTwo" highlight-current :props="defaultPropsTwo">
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
                    <div class="addItem">
                        <div>
                            模块名称：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="resNameVal">
                        </div>
                    </div>
                    <div class="addItem">
                        <div>
                            模块路径：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="resPathVal">
                        </div>
                    </div>
                    <div class="addItem">
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
        <div :class="{addTwoPopup:isaddTwoPopup,showTwoadd:isShowTwoadd}">
            <transition name="slide-fade">
                <div class="twoAddContent" v-show="twoAddShow">
                    <div class="addTitle">
                    </div>
                    <div class="addItem">
                        <div>
                            模块名称：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="twoResNameVal">
                        </div>
                    </div>
                    <div class="addItem">
                        <div>
                            模块路径：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="twoResPathVal">
                        </div>
                    </div>
                    <div class="addItem">
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
      okClickTrue: false,// 控制点击确认删除按钮
      twoButAddClickTrue: false,// 控制点击确认添加二级按钮
      butAddClickTrue: false,// 控制电机确认添加一级按钮
      loading: false,// 控制页面加载
      resId: 0,// 存放添加一级资源父Id
      resOneId: 0,// 存放点击一级节点时获取到的数据Id
      resTwoId: 0,// 存放点击二级节点时获取到的数据Id
      resSortVal: 0,// 添加一级弹框模块排序Model
      resNameVal: "",// 添加一级弹框模块名称Model
      resPathVal: "",// 添加一级弹框模块路径Model
      twoResSortVal: 0,// 添加二级弹框模块排序Model
      twoResNameVal: "",// 添加二级弹框模块名称Model
      twoResPathVal: "",// 添加二级弹框模块路径Model
      isaddTwoPopup: true,// 控制二级弹框展示时的样式
      isShowTwoadd: true,// 控制二级弹框展示与隐藏
      twoAddShow: false,// 控制二级弹框展示与隐藏
      isAddPopup: true,// 控制一级弹框展示时的样式
      isShowAdd: true,// 控制一级弹框展示与隐藏
      addShow: false,// 控制一级弹框展示与隐藏
      titlename: "",// 删除弹框出现时的提示
      isdelPopup: true,// 控制删除弹框展示时的样式
      isShowdel: true,// 控制删除弹框展示与隐藏
      delShow: false,// 控制删除弹框展示与隐藏 
      delIndex: "",// 存放控制删除一级还是二级资源
      dataOneLists: [],// 一级资源列表
      dataTwoLists: [],// 二级资源列表
      defaultPropsOne: {
        children: "child",
        label: "name"
      },// 一级弹框props配置参数列表
      defaultPropsTwo: {
        children: "child",
        label: "name"
      }// 二级弹框props配置参数列表
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
        if (ele.name == "前台管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("clientSideResource") == -1) {
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
          type: "0"
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
      var self = this;
      this.delIndex = 1;
      var Arr = [];
      if (this.delIndex == 1) {
        Arr = this.$refs.treeOne.getCheckedNodes();
      } else if (this.delIndex == 2) {
        Arr = this.$refs.treeTwo.getCheckedNodes();
      }
      var idStr = [];
      if (Arr.length > 0) {
        this.titlename = "资源";
        this.isShowdel = false;
        this.delShow = true;
      } else {
        self.$message({
          type: "info",
          message: "请勾选需要删除的模块!"
        });
      }

      // this.$message({
      //     type: 'success',
      //     message: '暂不支持此操作!'
      // })
    },
    // 一级节点被点击
    oneTherrClick(data) {
      this.dataTwoLists = [];
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
            type: "0"
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
        this.isShowTwoadd = false;
        this.twoAddShow = true;
        // this.$message({
        //     type: 'success',
        //     message: '暂不支持此操作!'
        // })
      }
    },
    // 删除二级资源
    DelTwoCommClick() {
      var self = this;
      this.delIndex = 2;
      var Arr = [];
      if (this.delIndex == 1) {
        Arr = this.$refs.treeOne.getCheckedNodes();
      } else if (this.delIndex == 2) {
        Arr = this.$refs.treeTwo.getCheckedNodes();
      }
      var idStr = [];
      if (Arr.length > 0) {
        this.titlename = "资源";
        this.isShowdel = false;
        this.delShow = true;
      } else {
        self.$message({
          type: "info",
          message: "请勾选需要删除的模块!"
        });
      }

      // this.$message({
      //     type: 'success',
      //     message: '暂不支持此操作!'
      // })
    },
    // 二级节点被点击
    twoTherrClick(data) {
      this.resTwoId = data.id;
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
            type: "0"
          })
          .then(data => {
            self.twoButAddClickTrue = false;
            self.isShowTwoadd = true;
            self.twoAddShow = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "添加模块成功!"
              });
              self.dataOneLists = [];
              self.dataTwoLists = [];
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
            self.isShowTwoadd = true;
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
      this.isShowTwoadd = true;
      this.twoAddShow = false;
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        var Arr = [];
        if (this.delIndex == 1) {
          Arr = this.$refs.treeOne.getCheckedNodes();
        } else if (this.delIndex == 2) {
          Arr = this.$refs.treeTwo.getCheckedNodes();
        }
        var idStr = [];
        if (Arr.length > 0) {
          Arr.forEach(function(ele, ind) {
            idStr.push(ele.id);
          });
          var Str = idStr.join(",");
          var TOKEN = sessionStorage.getItem("token");
          self.okClickTrue = true;
          self
            .getDelRes({
              idJson: Str,
              token: TOKEN,
              type: "0"
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
          self.okClickTrue = false;
          self.isShowdel = true;
          self.delShow = false;
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
      this.okClickTrue = false;
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

.addItem {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
}

.addItem > div:nth-child(2) {
  margin-left: 15px;
}

.addItem > div:nth-child(1) {
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
/*添加弹出框*/

.addTwoPopup {
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

.clientSideResource {
  width: 100%;
  height: 100%;
}

.clientSideResource > div:nth-child(1) {
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
  width: 130px;
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
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
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