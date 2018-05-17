<!--角色管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientSideRole">
        <div>
            <div class="listTitle">
                <div>
                    角色管理
                </div>
                <div @click="addRoleClick">
                    新增角色
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                序号
                            </div>
                            <div>
                                角色名
                            </div>
                            <div>
                                创建时间
                            </div>
                            <div>
                                更新时间
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="dataLists.length > 0" v-for="(item,index) in dataLists" :key="index">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.name | strFun}}
                            </div>
                            <div>
                                {{item.createDate | timeFun}}
                            </div>
                            <div>
                                {{item.updateDate | timeFun}}
                            </div>
                            <div class="operate">
                                <div><img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑"></div>
                                <div><img @click="addresClick(index)" src="/static/img/LIJ.png" alt="资源关联" title="资源关联"></div>
                                <div><img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除"></div>
                            </div>
                        </li>
                        <li class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="dataLists.length > 0">
                            <div class="lastLiLeft">

                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
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
        <!--添加弹出框-->
        <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                      <div>
                        <div>
                            角色名：
                        </div>
                        <div>
                            <input id="inputText" :class="{redBorder:isaddRoleInput,grayBorder:isRrayRoleInput}" maxlength="10" type="text"
                                v-model="accountStrVal">
                        </div>
                      </div>
                      <div :class="{redTest:isaddRoleInput,grayTest:isRrayRoleInput}">
                        必填项切不能超过10个字符
                      </div>
                    </div>
                    <!-- <div class="addForm">
                      <div>
                        <div>
                            角色code：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="codeStrVal" :class="{redBorder:isaddRoleInput,grayBorder:isGrayCodeInput}">
                        </div>
                      </div>
                      <div  :class="{redTest:isaddRoleInput,grayTest:isGrayCodeInput}">
                          角色Code为任意拼音或英文
                      </div>
                    </div> -->
                    <div class="addButton">
                        <div @click="butAddClick">确定</div>
                        <div @click="cancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--更新弹出框-->
        <div :class="{updatePopup:isUpdatePopup,showUpdate:isShowUpdate}">
            <transition name="slide-fade">
                <div class="updateContent" v-show="updateShow" v-loading="uping">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                      <div>
                        <div>
                            角色名：
                        </div>
                        <div>
                            <input id="inputText" :class="{redBorder:isaddRoleInput,grayBorder:isRrayRoleInput}" maxlength="10" type="text"
                                v-model="updateAccountStrVal">
                        </div>
                      </div>
                      <div :class="{redTest:isaddRoleInput,grayTest:isRrayRoleInput}">
                        必填项切不能超过10个字符
                      </div>
                    </div>
                    <!-- <div class="addForm">
                      <div>
                        <div>
                            角色code：
                        </div>
                        <div>
                            <input id="inputText" type="text" v-model="codeStrVal" :class="{redBorder:isRedCodeInput,grayBorder:isGrayCodeInput}">
                        </div>
                      </div>
                      <div :class="{redTest:isRedCodeInput,grayTest:isGrayCodeInput}">
                          角色Code为任意拼音或英文
                      </div> 
                    </div> -->
                    <div class="addButton">
                        <div @click="butUpdateClick">确定</div>
                        <div @click="cancelupdateClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--关联弹出框-->
        <div :class="{rolPopup:isrolPopup,showrol:isShowrol}">
            <transition name="slide-fade">
                <div class="rolContent" v-show="rolShow" v-loading="roling">
                    <div class="rolTitle">
                        角色关联账户
                    </div>
                    <div class="rolCont">
                        <div>
                            <el-tree :data="reldatas" @check-change="rolCheckChange" :accordion="true" show-checkbox node-key="id" ref="treeRol" highlight-current
                                :props="defaultProps">
                            </el-tree>
                        </div>
                    </div>
                    <div class="rolBut">
                        <div @click="butrolClick">确定</div>
                        <div @click="cancelrolClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
let id = 1000;
import { mapActions } from "vuex";
import hosdel from "../../cModule/healthdel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      butrolClickTrue: false,// 控制确认添加角色关联按钮
      okClickTrue: false,// 控制确认删除按钮
      butAddClickTrue: false,// 控制确认天机按钮
      butUpdateClickTrue: false,// 控制确认修改按钮
      isRrayRoleInput: true,// 控制角色名输入框符合规则时样式
      isaddRoleInput: false,// 控制角色名输入框不符合规则时样式
      isGrayCodeInput: true,// 控制code输入框符合规则样式
      isRedCodeInput: false,// 控制code输入框不符合规则时样式
      adding: false,// 控制添加弹框加载
      deling: false,// 控制删除弹框加载
      uping: false,// 控制修改弹框加载
      loading: false,// 控制页面加载
      reldatas: [],// 角色关联列表
      defaultProps: {
        children: "children",
        label: "name"
      },// 关联弹框props配置参数
      roling: false,// 控制关联弹框加载
      isrolPopup: true,// 控制关联弹框展示时的样式
      isShowrol: true,// 控制关联弹框展示或隐藏
      rolShow: false,// 控制关联弹框展示或隐藏
      updateAccountStrVal: "",// 更新弹框角色名Model
      UppwsStr: "",// 存放角色code
      isUpdatePopup: true,// 控制修改弹框展示时的样式
      isShowUpdate: true,// 控制修改弹框展示与隐藏
      updateShow: false,// 控制修改弹框展示与隐藏
      accountStrVal: "",// 添加或修改弹框角色名Model
      codeStrVal: "",// 添加或修改弹框code Model
      isAddPopup: true,// 控制添加弹框显示时的样式
      isShowAdd: true,// 控制添加弹框显示或隐藏
      addShow: false,// 控制添加弹框显示或隐藏
      titlename: "",// 删除弹框弹出时的提示语
      isdelPopup: true,// 控制删除弹框展示时的样式
      isShowdel: true,// 控制删除弹框显示与隐藏
      delShow: false,// 控制删除弹框显示与隐藏
      dataLists: [],// 角色列表
      pageSizeNum: 10,// 每页展示条数
      currentPage: 1,// 当前页面
      totalNum: 0,// 总条数
      delIndex: "",// 存放删除index
      upIndex: "",// 存放修改index
      rolIndex: "",// 存放关联index
      roleArrs: [],// 存放角色资源
      zhu: true
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
          "20" + year + "-" + month + "-" + date + " " + hour + ": " + minute
        );
      } else {
        return "暂无";
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
        if (ele.name == "前台管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("clientSideRole") == -1) {
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
    // 初始化
    listFun() {
      var self = this;
      self.loading = true;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getListRole({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          token: TOKEN,
          type: "0"
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.dataLists = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.dataLists = [];
                }
              } else {
                self.dataLists = [];
              }
            } else {
              self.dataLists = [];
            }
          } else {
            self.dataLists = [];
            self.$message({
              type: "info",
              message: "获取列表失败！"
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.dataLists = [];
          self.$message({
            type: "info",
            message: "获取列表失败！"
          });
        });
    },
    // 点击分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun();
    },
    // 选择每页个数
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun();
    },
    // 修改角色信息弹出框
    updateClick(index) {
      this.isShowUpdate = false;
      this.updateShow = true;
      this.updateAccountStrVal = this.dataLists[index].name;
      this.UppwsStr = this.dataLists[index].code;
      this.upIndex = index;
    },
    // 确认修改角色信息
    butUpdateClick() {
      var self = this;
      if (self.updateAccountStrVal.length > 0 && self.updateAccountStrVal.length <= 10) {
        if (self.butUpdateClickTrue == false) {
          self.butUpdateClickTrue = true;
          self.uping = true;
          self
            .getUpdateRole({
              name: self.updateAccountStrVal,
              code: self.dataLists[self.upIndex].code,
              id: self.dataLists[self.upIndex].id,
              type: "0"
            })
            .then(data => {
              self.butUpdateClickTrue = false;
              self.uping = false;
              self.isShowUpdate = true;
              self.updateShow = false;
              if (data.code == 200) {
                self.updateAccountStrVal = "";
                self.$message({
                  type: "success",
                  message: "修改角色成功！"
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
              self.uping = false;
              self.isShowUpdate = true;
              self.updateShow = false;
              self.butUpdateClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      } else {
        if (self.accountStrVal.length <= 0) {
          self.$message({
            type: "info",
            message: "角色名称为必填项！"
          });
        }
      }
    },
    // 取消修改角色信息弹出框
    cancelupdateClcik() {
      this.isShowUpdate = true;
      this.updateShow = false;
      this.isRrayRoleInput = true;
      this.isaddRoleInput = false;
      this.updateAccountStrVal = "";
    },
    // 添加角色弹出框
    addRoleClick() {
      this.isShowAdd = false;
      this.addShow = true;
    },
    // 确认添加角色
    butAddClick() {
      var self = this;
      if (self.accountStrVal.length > 0 && self.accountStrVal.length <= 10) {
        if (self.butAddClickTrue == false) {
          self.butAddClickTrue = true;
          self.adding = true;
          self
            .getAddRole({
              name: self.accountStrVal,
              code: self.codeStrVal,
              type: "0"
            })
            .then(data => {
              self.butAddClickTrue = false;
              self.adding = false;
              self.isShowAdd = true;
              self.addShow = false;
              if (data.code == 200) {
                self.accountStrVal = "";
                self.codeStrVal = "";
                self.$message({
                  type: "success",
                  message: "添加角色成功！"
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
              self.adding = false;
              self.isShowAdd = true;
              self.addShow = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      } else {
        if (self.accountStrVal.length <= 0) {
          self.$message({
            type: "info",
            message: "角色名称为必填项！"
          });
        }
      }
    },
    // 取消添加弹出框
    cancelClcik() {
      this.accountStrVal = "";
      this.isShowAdd = true;
      this.addShow = false;
      this.isRrayRoleInput = true;
      this.isaddRoleInput = false;
    },
    // 删除角色角色框
    deleteClick(index) {
      this.titlename = "角色";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 确认删除角色
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        self.okClickTrue = true;
        self.deling = true;
        var currentNum = self.currentPage;
        if (self.currentPage > 1 && self.delIndex == 0) {
          self.currentPage = currentNum - 1;
        }
        var TOKEN = sessionStorage.getItem("token");
        self
          .getDelRole({
            id: self.dataLists[self.delIndex].id,
            token: TOKEN,
            type: "0"
          })
          .then(data => {
            self.okClickTrue = false;
            self.isShowdel = true;
            self.delShow = false;
            self.deling = false;
            if (data.code == 200) {
              if (self.dataLists.length == 1) {
              if (self.currentPage == 1) {
                self.currentPage = 1
              } else if (self.currentPage > 1){
                slef.currentPage = currentPage - 1
              }
            }  
              self.$message({
                type: "success",
                message: "删除角色成功！"
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
            self.okClickTrue = false;
            self.isShowdel = true;
            self.delShow = false;
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除角色框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 选中节点时
    rolCheckChange(data, tu, seldata) {},
    // 增加角色资源管理弹出框
    addresClick(index) {
      var self = this;
      self.zhu = true;
      self.isShowrol = false;
      self.rolShow = true;
      self.roleArrs = [];
      self.roling = true;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getListRes({
          token: TOKEN,
          type: "0"
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.reldatas = data.data;
                var ralDatas = data.data;
                self
                  .getListResRole({
                    roleId: self.dataLists[index].id,
                    token: TOKEN,
                    type: "0"
                  })
                  .then(data => {
                    self.roling = false;
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.length > 0) {
                          var treeSlects = data.data;
                          var treeIds = [];
                          var smalls = [];
                          ralDatas.forEach(function(all, allind) {
                            treeSlects.forEach(function(tree, treeind) {
                              if (all.id == tree.id) {
                                if (
                                  tree.children.length == all.children.length
                                ) {
                                  treeIds.push(all.id);
                                }
                                all.children.forEach(function(
                                  allOne,
                                  allOneInd
                                ) {
                                  tree.children.forEach(function(
                                    treeOne,
                                    treeOneInd
                                  ) {
                                    if (allOne.id == treeOne.id) {
                                      if (treeOne.children) {
                                        if (
                                          treeOne.children.length ==
                                          allOne.children.length
                                        ) {
                                          treeIds.push(allOne.id);
                                        } else {
                                          treeOne.children.forEach(function(
                                            treetwo,
                                            treetwoInd
                                          ) {
                                            treeIds.push(treetwo.id);
                                          });
                                          smalls.push(tree.id);
                                        }
                                      } else {
                                        treeIds.push(allOne.id);
                                      }
                                    }
                                  });
                                });
                              }
                            });
                          });
                          var n = [];
                          for (var i = 0; i < smalls.length; i++) {
                            if (n.indexOf(smalls[i]) == -1) {
                              n.push(smalls[i]);
                            }
                          }
                          var arr4 = new Array();
                          for (var i = 0; i < treeIds.length; i++) {
                            var flag = true;
                            for (var j = 0; j < n.length; j++) {
                              if (treeIds[i] == n[j]) flag = false;
                            }
                            if (flag) {
                              arr4.push(treeIds[i]);
                            }
                          }
                          self.$refs.treeRol.setCheckedKeys(arr4);
                        } else {
                          self.$refs.treeRol.setCheckedKeys([]);
                        }
                      } else {
                        self.$refs.treeRol.setCheckedKeys([]);
                      }
                    } else if (data.code == 602) {
                      self.$message({
                        type: "info",
                        message: "暂无关联模块!"
                      });
                      self.$refs.treeRol.setCheckedKeys([]);
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                      self.$refs.treeRol.setCheckedKeys([]);
                    }
                  })
                  .catch(msg => {
                    self.roling = false;
                    self.$refs.treeRol.setCheckedKeys([]);
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                self.$refs.treeRol.setCheckedKeys([]);
                self.roling = false;
                self.$message({
                  type: "info",
                  message: "暂无关联"
                });
              }
            } else {
              self.roling = false;
              self.$message({
                type: "info",
                message: "暂无关联"
              });
            }
          } else {
            self.roling = false;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.roling = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
      this.rolIndex = index;
    },
    // 确认添加角色关联
    butrolClick() {
      var self = this;
      if (self.butrolClickTrue == false) {
        self.butrolClickTrue = true;
        self.roling = true;
        var arr = this.roleArrs;
        var reds = self.reldatas;
        var treeRols = this.$refs.treeRol.getCheckedKeys();
        reds.forEach(function(red, redInd) {
          if (red.children) {
            red.children.forEach(function(chi, chiind) {
              treeRols.forEach(function(ele, index) {
                if (chi.id == ele) {
                  treeRols.push(red.id);
                }
              });
            });
          }
        });
        reds.forEach(function(red, redInd) {
          if (red.children) {
            red.children.forEach(function(chi, chiind) {
              if (chi.children) {
                chi.children.forEach(function(chit, chitind) {
                  treeRols.forEach(function(ele, index) {
                    if (chit.id == ele) {
                      treeRols.push(chi.id);
                    }
                  });
                });
              }
            });
          }
        });
        var arr = [];
        treeRols.forEach(function(ele, ind) {
          if (arr.indexOf(ele) === -1) {
            arr.push(ele);
          }
        });
        var arrStr = arr.join("##");
        var TOKEN = sessionStorage.getItem("token");
        self
          .getDelRoleRes({
            roleId: self.dataLists[self.rolIndex].id,
            token: TOKEN,
            type: "0"
          })
          .then(data => {
            if (data.code == 200 || data.code == 602) {
              self
                .getRoleRes({
                  roleId: self.dataLists[self.rolIndex].id,
                  resourcesId: arrStr,
                  type: "0"
                })
                .then(data => {
                  self.butrolClickTrue = false;
                  self.roling = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "success",
                      message: "角色资源关联成功!"
                    });
                    arr = [];
                    self.roleArrs = [];
                    self.isShowrol = true;
                    self.rolShow = false;
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.roling = false;
                  self.butrolClickTrue = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              self.roling = false;
              self.butrolClickTrue = false;
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.butrolClickTrue = false;
            self.roling = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    cancelrolClcik() {
      this.isShowrol = true;
      this.rolShow = false;
    },
    ...mapActions([
      "getListRole",
      "getAddRole",
      "getUpdateRole",
      "getDelRole",
      "getListRes",
      "getRoleRes",
      "getListResRole",
      "getDelRoleRes"
    ])
  },
  // 监视
  watch: {
    accountStrVal: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length > 0) {
        this.isRrayRoleInput = false;
        this.isaddRoleInput = true;
      } else {
        this.isRrayRoleInput = true;
        this.isaddRoleInput = false;
      }
    },
    updateAccountStrVal: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length > 0) {
        this.isRrayRoleInput = false;
        this.isaddRoleInput = true;
      } else {
        this.isRrayRoleInput = true;
        this.isaddRoleInput = false;
      }
    }
  }
};
</script>
<style scoped>
/*关联弹出框*/

.listCont .noList {
  height: 400px;
}

.listCont .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.rolTitle {
  height: 56px;
  margin-top: 13px;
  overflow: hidden;
  width: 100%;
  line-height: 56px;
  text-align: center;
  font-size: 17px;
  color: #303030;
}

.rolCont {
  min-height: 70px;
  height: 100%;
  width: 100%;
}

.rolCont > div {
  border: 1px solid #eaeaea;
  width: 80%;
  height: 350px;
  margin: 10px auto;
  overflow-y: scroll;
  overflow-x: hidden;
}

.rolPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rolContent {
  width: 540px;
  min-height: 250px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  z-index: 1;
}

.rolBut {
  width: 100%;
  height: 60px;
  display: flex;
  margin-top: 5px;
  justify-content: center;
}

.rolBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.rolBut > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.rolBut > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.showrol {
  display: none;
}
/*更新弹出框*/

.updatePopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.updateContent > div:nth-child(1) {
  height: 15px;
  width: 100%;
}

.updateContent {
  width: 420px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  margin: calc((100vh - 220px) / 2) auto;
  z-index: 1;
  padding-bottom: 30px;
}

.showUpdate {
  display: none;
}
/*添加弹出框*/

#inputText {
  width: 220px;
  height: 32px;
  line-height: 32px;
  padding-left: 2px;
  border-radius: 3px;
}

.redBorder {
  border: 1px solid #d1d1d1;
}

.grayBorder {
  border: 1px solid #dc322b;
}

.redTest {
  color: #d1d1d1;
}

.grayTest {
  color: #dc322b;
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
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addForm  {
  min-height: 55px;
  width: 100%;
}

.addForm > div:nth-child(1) {
    display: flex;
    align-items: center;
    min-height: 55px;
}

.addForm > div:nth-child(2) {
  margin-left: 115px;
}

.addForm >  div:nth-child(1) > div:nth-child(2) {
  margin-left: 15px;
}

.addForm > div:nth-child(3) {
  margin-left: 16px;
}

.addForm > div:nth-child(1) > div:nth-child(1) {
  width: 105px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  height: 100%;
}

.addTitle {
  margin-top: 15px;
}

.addPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addContent > div:nth-child(1) {
  height: 15px;
  width: 100%;
}

.addContent {
  width: 420px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  margin: calc((100vh - 220px) / 2) auto;
  z-index: 1;
  padding-bottom: 30px;
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
  border: 1px solid #d1d1d1;
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

.clientSideRole {
  width: 100%;
  height: 100%;
}

.clientSideRole > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}


#lastLiRight {
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.lastLi > div:nth-child(1) {
  width: 50px;
}

.list {
  margin-top: 25px;
}

.listCont li {
  display: flex;
  /*border: 1px solid red;*/
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
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(5) {
  min-width: 35px;
}

.firstLi > div:nth-child(6) {
  min-width: 35px;
}

.firstLi > div:nth-child(7) {
  min-width: 35px;
}

.firstLi > div:nth-child(8) {
  min-width: 35px;
}

.firstLi > div:nth-child(9) {
  min-width: 70px;
}

.firstLi > div:nth-child(10) {
  min-width: 70px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  height: 50px;
}

.dataLi .opexu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dataLi .opexu > div {
  width: 30px;
  height: 30px;
}

.dataLi .opexu > div:nth-child(1) {
  margin-left: 5px;
}

.dataLi .opexu > div:nth-child(2) {
  margin-right: 5px;
}

.opexu img {
  width: 30px;
  font-size: 18px;
  cursor: pointer;
  height: 26px;
}

.dataLi .operate {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.dataLi .operate > div {
  width: 24px;
  height: 24px;
}

.operate img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #515151;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 15%;
  overflow: hidden;
  min-width: 100px;
}

.listCont li > div:nth-child(2) {
  width: 30%;
  overflow: hidden;
  min-width: 110px;
}

.listCont li > div:nth-child(3) {
  width: 25%;
  min-width: 145px;
}

.listCont li > div:nth-child(4) {
  width: 15%;
  min-width: 145px;
}

.listCont li > div:nth-child(5) {
  width: 15%;
  min-width: 165px;
}

.list {
  min-height: 540px;
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