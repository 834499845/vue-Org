<!--健康检查-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="sale">
        <div>
            <div class="listTitle">
                <div>
                    健康检查
                </div>
                <div @click="addCommClick">
                    <!--新增热词-->
                </div>
            </div>
            <!--列表-->
            <div class="list" v-show="!noData" v-loading="loading">
                <div class="list-nav">
                    <ul>
                        <li>
                            健康分类：
                        </li>
                        <li v-for="(item,index) in navlists" @click="navClick(index)" :class="{'list-li':isListLi,'list-sel':isListSel == index}">
                            {{item.value}}
                        </li>
                    </ul>
                </div>
                <div class="list-issue">
                    <ul>
                        <li v-for="(item,index) in issuelists" @click="issueClick(index)">
                            <div>
                                {{index + 1}}：
                            </div>
                            <div>
                                {{item.name}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="list-add">
                    <div @click="cartClick">初始规则</div>
                    <div @click="addClick">添加规则</div>
                </div>
                <div class="list-select">
                    <ul>
                        <li class="first">
                            <div>
                                <div v-for="item in firsts">
                                    {{item}}
                                </div>
                            </div>
                            <div>
                                内容
                            </div>
                            <div>
                                摘要
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-for="(item,ind) in lists">
                            <div>
                                <div class="defData" v-show="item.rule == 'common'">
                                    默认规则
                                </div>
                                <div v-show="item.rule != 'common'" class="data-selct" v-for="(sel,index) in item.rule">
                                    <div v-if="sel > 0">
                                        <img src="/static/img/是.png" alt="">
                                    </div>
                                    <div v-else>
                                        <img src="/static/img/否.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <el-tooltip :disabled="item.content.length > 12 ? false : true" popper-class="toolexam" id="toolselcont" :content="item.content"
                                placement="bottom" effect="light">
                                <div>
                                    {{item.content}}
                                </div>
                            </el-tooltip>

                            <el-tooltip :disabled="item.content.length > 12 ? false : true" popper-class="toolexam" id="toolselcont" :content="item.remark"
                                placement="bottom" effect="light">
                                <div>
                                    {{item.remark}}
                                </div>
                            </el-tooltip>
                            <div class="opena">
                                <div @click="compliClick(ind)">
                                    <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div @click="deleteClick(ind)">
                                    <img src="/static/img/删除.png" alt="添加" title="添加">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="noList" v-show="noData">
                <div>
                    <img src="/static/img/w.png" alt="">
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
        <!--修改弹出框-->
        <div :class="{addCityPopup:isaddCityPopup,showaddCity:isShowaddCity}">
            <transition name="slide-fade">
                <div class="addCityContent" v-show="addCityShow" v-loading="addUniting">
                    <div class="ad">
                        <div>
                            规则内容：
                        </div>
                        <div>
                            <textarea v-model="exa.name"></textarea>
                        </div>
                        <div @click="lineClick">
                            <div>
                                换行
                            </div>
                        </div>
                    </div>
                    <div class="ad">
                        <div>
                            规则摘要：
                        </div>
                        <div>
                            <textarea v-model="exa.content">

                            </textarea>
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
import hosdel from "../../cModule/healthdel";
export default {
  components: {
    "v-select": select,
    "v-hosdel": hosdel
  },
  data() {
    return {
      firsts: 10,
      noData: true,
      loading: false,
      isListSel: 0,
      isListLi: true,
      listType: "",
      navlists: [],
      issuelists: [],
      lists: [],
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      deling: false,
      commT: true,
      isaddCityPopup: true,
      isShowaddCity: true,
      addCityShow: false,
      cityShowInde: 0,
      addUniting: false,
      exa: {
        name: "",
        content: ""
      },
      cartClickTrue: false,
      addCityClickTrue: false,
      okClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    // 查询权限
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
      if (arrs.indexOf("examination") == -1) {
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
        self.cartFun();
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
    // 删除规则
    deleteClick(index) {
      var self = this;
      if (self.lists[index].rule == "common") {
        self.$message({
          type: "info",
          message: "默认规则不可删除，可修改!"
        });
      } else {
        this.titlename = "规则";
        this.isShowdel = false;
        this.delShow = true;
        this.delIndex = index;
      }
    },
    // 确认删除
    okClick() {
      var self = this;
      if (self.okClickTrue == false) {
        if (self.lists[self.delIndex].rule == "common") {
          self.$message({
            type: "info",
            message: "默认规则不可删除，可修改!"
          });
        } else {
          var TOKEN = sessionStorage.getItem("token");
          self.okClickTrue = true;
          self
            .gethealthbodyCheckRuledelete({
              idJson: "[" + self.lists[self.delIndex].id + "]",
              token: TOKEN
            })
            .then(data => {
              self.okClickTrue = false;
              self.isShowdel = true;
              self.delShow = false;
              if (data.code == 200) {
                self.$message({
                  type: "success",
                  message: "删除规则成功!"
                });
                // 规则列表
                self.lists = [];

                self
                  .gethealthfindByPageNoAndPageSize({
                    pageNo: 1,
                    pageSize: 150,
                    type: self.navlists[self.isListSel].key,
                    token: TOKEN
                  })
                  .then(data => {
                    self.okClickTrue = false;
                    self.isShowdel = true;
                    self.delShow = false;
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.records.length > 0) {
                          var arrs = data.data.records;
                          arrs.forEach(function(ele, ind) {
                            if (ele.rule.indexOf(",") != -1) {
                              var ruls = ele.rule.split(",");
                              self.lists.push({
                                id: ele.id,
                                content: ele.content,
                                createDate: ele.createDate,
                                logicDelete: ele.logicDelete,
                                remark: ele.remark,
                                rule: ruls,
                                type: ele.type,
                                updateDate: ele.updateDate
                              });
                            } else {
                              self.lists.push({
                                id: ele.id,
                                content: ele.content,
                                createDate: ele.createDate,
                                logicDelete: ele.logicDelete,
                                remark: ele.remark,
                                rule: ele.rule,
                                type: ele.type,
                                updateDate: ele.updateDate
                              });
                            }
                          });
                        } else {
                          self.lists = [];
                        }
                      } else {
                        self.lists = [];
                      }
                    } else if (data.code == 500) {
                      self.$message({
                        type: "info",
                        message: "健康规则列表获取暂无数据!"
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
                    self.isShowdel = true;
                    self.delShow = false;
                    self.$message({
                      type: "info",
                      message: "服务器异常"
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
              self.okClickTrue = false;
              self.isShowdel = true;
              self.delShow = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    // 取消删除
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
      this.isShowaddCity = true;
      this.addCityShow = false;
    },
    //  编辑规则
    compliClick(index) {
      var self = this;
      self.isShowaddCity = false;
      self.addCityShow = true;
      self.cityShowInde = index;
      self.exa.name = self.lists[index].content;
      self.exa.content = self.lists[index].remark;
    },
    // 换行
    lineClick() {
      var self = this;
      var cont = self.exa.name;
      self.exa.name = cont + "\n\n";
    },
    // 编辑默认规则
    addCityClick() {
      var self = this;
      if (self.addCityClickTrue == false) {
        if (self.exa.name.length <= 500 && self.exa.content.length <= 30) {
          self.addUniting = true;
          self.addCityClickTrue = true;
          self
            .getfindhealthbodyCheckRuleupdate({
              idJson: '["' + self.lists[self.cityShowInde].id + '"]',
              contentJson: '["' + self.exa.name + '"]',
              remarkJson: '["' + self.exa.content + '"]',
              ruleJson: '["' + self.lists[self.cityShowInde].rule + '"]',
              typeJson: '["' + self.navlists[self.isListSel].key + '"]'
            })
            .then(data => {
              self.addCityClickTrue = false;
              self.addUniting = false;
              self.isShowaddCity = true;
              self.addCityShow = false;
              if (data.code == 200) {
                self.$message({
                  type: "success",
                  message: "编辑规则成功!"
                });

                self.lists = [];
                var TOKEN = sessionStorage.getItem("token");
                self
                  .gethealthfindByPageNoAndPageSize({
                    pageNo: 1,
                    pageSize: 150,
                    type: self.navlists[self.isListSel].key,
                    token: TOKEN
                  })
                  .then(data => {
                    // console.log("健康规则列表", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.records.length > 0) {
                          var arrs = data.data.records;
                          arrs.forEach(function(ele, ind) {
                            if (ele.rule.indexOf(",") != -1) {
                              var ruls = ele.rule.split(",");
                              self.lists.push({
                                id: ele.id,
                                content: ele.content,
                                createDate: ele.createDate,
                                logicDelete: ele.logicDelete,
                                remark: ele.remark,
                                rule: ruls,
                                type: ele.type,
                                updateDate: ele.updateDate
                              });
                            } else {
                              self.lists.push({
                                id: ele.id,
                                content: ele.content,
                                createDate: ele.createDate,
                                logicDelete: ele.logicDelete,
                                remark: ele.remark,
                                rule: ele.rule,
                                type: ele.type,
                                updateDate: ele.updateDate
                              });
                            }
                          });
                        } else {
                          self.lists = [];
                        }
                      } else {
                        self.lists = [];
                      }
                    } else if (data.code == 500) {
                      self.$message({
                        type: "info",
                        message: "健康规则列表获取暂无数据!"
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
              self.isShowaddCity = true;
              self.addCityShow = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          if (self.exa.name.length > 500) {
            self.$message({
              type: "info",
              message: "问题内容字数不得超过500!"
            });
          } else if (self.exa.content.length > 30) {
            self.$message({
              type: "info",
              message: "问题摘要字数不得超过30!"
            });
          }
        }
      }
    },
    // 初始化默认规则
    cartClick() {
      var self = this;
      if (self.cartClickTrue == false) {
        self.lists.forEach(function(ele, ind) {
          if (ele.rule == "common") {
            self.commT = false;
          }
        });
        if (self.commT == true) {
          // 添加规则
          self.commT = false;
          self.cartClickTrue = true;
          self
            .gethealthbodyCheckRuleAdd({
              contentJson: "[你近期需要去体检]",
              remarkJson: "[默认规则，当规则不匹配时的提示]",
              ruleJson: "[common]",
              typeJson: "[" + self.navlists[self.isListSel].key + "]"
            })
            .then(data => {
              self.cartClickTrue = false;
              if (data.code == 200) {
                self.$message({
                  type: "info",
                  message: "添加默认规则成功!"
                });
                self.lists = [];
                var TOKEN = sessionStorage.getItem("token");
                self
                  .gethealthfindByPageNoAndPageSize({
                    pageNo: 1,
                    pageSize: 150,
                    type: self.navlists[self.isListSel].key,
                    token: TOKEN
                  })
                  .then(data => {
                    // console.log("健康规则列表", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.records.length > 0) {
                          var arrs = data.data.records;
                          arrs.forEach(function(ele, ind) {
                            if (ele.rule.indexOf(",") != -1) {
                              var ruls = ele.rule.split(",");
                              self.lists.push({
                                id: ele.id,
                                content: ele.content,
                                createDate: ele.createDate,
                                logicDelete: ele.logicDelete,
                                remark: ele.remark,
                                rule: ruls,
                                type: ele.type,
                                updateDate: ele.updateDate
                              });
                            } else {
                              self.lists.push({
                                id: ele.id,
                                content: ele.content,
                                createDate: ele.createDate,
                                logicDelete: ele.logicDelete,
                                remark: ele.remark,
                                rule: ele.rule,
                                type: ele.type,
                                updateDate: ele.updateDate
                              });
                            }
                          });
                        } else {
                          self.lists = [];
                        }
                      } else {
                        self.lists = [];
                      }
                    } else if (data.code == 500) {
                      self.$message({
                        type: "info",
                        message: "健康规则列表获取暂无数据!"
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
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.cartClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          self.$message({
            type: "info",
            message: "默认规则已经存在!"
          });
        }
      }
    },
    // 添加规则
    addClick() {
      var self = this;
      if ((self.commT = false)) {
        self.$message({
          type: "info",
          message: "你需要先初始通用规则!"
        });
      } else {
        self.$router.push({
          path: "/health/addExamination",
          query: {
            type: self.navlists[self.isListSel].key,
            ap: 0
          }
        });
      }
    },
    // 初始化获取数据
    cartFun() {
      var self = this;
      self.loading = true;
      // 查询健康档案类型
      self
        .gethealthfindJcTypeList({})
        .then(data => {
          // console.log("健康档案类型", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            self.noData = false;
            if (data.data.length > 0) {
              self.navlists = data.data;
              // 问题列表
              self
                .gethealthfindJcOptionsList({
                  code: data.data[0].key
                })
                .then(data => {
                  // console.log("健康档案问题", JSON.parse(JSON.stringify(data)))
                  if (data.code == 200) {
                    if (data.data.length > 0) {
                      self.issuelists = data.data;
                      self.firsts = self.issuelists.length;
                    } else {
                      self.firsts = 1;
                      self.issuelists = [];
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
              // 规则列表
              var TOKEN = sessionStorage.getItem("token");
              self
                .gethealthfindByPageNoAndPageSize({
                  pageNo: 1,
                  pageSize: 150,
                  type: data.data[0].key,
                  token: TOKEN
                })
                .then(data => {
                  // console.log("健康规则列表", JSON.parse(JSON.stringify(data)))
                  self.loading = false;
                  if (data.code == 200) {
                    if (data.data) {
                      if (data.data.records.length > 0) {
                        var arrs = data.data.records;
                        arrs.forEach(function(ele, ind) {
                          if (ele.rule.indexOf(",") != -1) {
                            var ruls = ele.rule.split(",");
                            self.lists.push({
                              id: ele.id,
                              content: ele.content,
                              createDate: ele.createDate,
                              logicDelete: ele.logicDelete,
                              remark: ele.remark,
                              rule: ruls,
                              type: ele.type,
                              updateDate: ele.updateDate
                            });
                          } else {
                            self.lists.push({
                              id: ele.id,
                              content: ele.content,
                              createDate: ele.createDate,
                              logicDelete: ele.logicDelete,
                              remark: ele.remark,
                              rule: ele.rule,
                              type: ele.type,
                              updateDate: ele.updateDate
                            });
                          }
                        });
                      } else {
                        self.lists = [];
                      }
                    } else {
                      self.lists = [];
                    }
                  } else if (data.code == 500) {
                    self.$message({
                      type: "info",
                      message: "健康规则列表获取暂无数据!"
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
            } else {
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
            self.loading = false;
            self.noData = true;
          }
        })
        .catch(msg => {
          // console.log(msg)
          self.loading = false;
          self.noData = true;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 根据分类查询问题
    navClick(index) {
      var self = this;
      self.lists = [];
      self.isListSel = index;
      // 查询健康档案类型
      self
        .gethealthfindJcOptionsList({
          code: self.navlists[index].key
        })
        .then(data => {
          // console.log("健康档案问题", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data.length > 0) {
              self.issuelists = data.data;
              self.firsts = self.issuelists.length;
            } else {
              self.issuelists = [];
              self.firsts = 1;
            }
          } else {
            self.issuelists = [];
            self.firsts = 1;
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
      // console.log(self.navlists[index].key)
      // 规则列表
      var TOKEN = sessionStorage.getItem("token");
      self
        .gethealthfindByPageNoAndPageSize({
          pageNo: 1,
          pageSize: 150,
          type: self.navlists[index].key,
          token: TOKEN
        })
        .then(data => {
          // console.log("健康规则列表", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records.length > 0) {
                var arrs = data.data.records;
                arrs.forEach(function(ele, ind) {
                  if (ele.rule.indexOf(",") != -1) {
                    var ruls = ele.rule.split(",");
                    self.lists.push({
                      id: ele.id,
                      content: ele.content,
                      createDate: ele.createDate,
                      logicDelete: ele.logicDelete,
                      remark: ele.remark,
                      rule: ruls,
                      type: ele.type,
                      updateDate: ele.updateDate
                    });
                  } else {
                    self.lists.push({
                      id: ele.id,
                      content: ele.content,
                      createDate: ele.createDate,
                      logicDelete: ele.logicDelete,
                      remark: ele.remark,
                      rule: ele.rule,
                      type: ele.type,
                      updateDate: ele.updateDate
                    });
                  }
                });
              } else {
                self.lists = [];
              }
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
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    issueClick() {},
    addCommClick() {},
    ...mapActions([
      "gethealthbodyCheckRuleAdd",
      "gethealthfindByPageNoAndPageSize",
      "getfindhealthbodyCheckRuleupdate",
      "gethealthbodyCheckRuledelete",
      "gethealthfindJcTypeList",
      "gethealthfindJcOptionsList"
    ])
  }
};
</script>
<style scoped>
/*主页*/

.noList {
  height: 500px;
}

.noList > div:nth-child(1) {
  width: 657px;
  height: 400px;
  margin: 0 auto;
}

.opena img {
  width: 23px;
  height: 23px;
  cursor: pointer;
}

.oneLi-selct span {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: flex;
  border: 1px solid red;
}

.list-add {
  width: 100%;
  display: flex;
  height: 40px;
  justify-content: space-between;
}

.list-add > div {
  width: 80px;
  height: 26px;
  border: 1px solid #ff8d63;
  color: #ff8d63;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}

.data-selct img {
  width: 20px;
  height: 20px;
}

.list-select > ul > li > div {
  border-right: 1px solid #e5e7eb;
  height: 45px;
  line-height: 45px;
  text-align: center;
}

.list-select > ul > li > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.list-select > ul > li {
  border-bottom: 1px solid #e5e7eb;
}

.list-select > ul > li:nth-child(1) {
  border-top: 1px solid #e5e7eb;
}

.list-select > ul > li > div:nth-last-child(4) {
  width: 165px;
  display: flex;
  justify-content: space-around;
  width: 50%;
}

.list-select > ul > li > div:nth-last-child(1) {
  width: 165px;
  display: flex;
  justify-content: space-around;
  width: 15%;
}

.list-select > ul > li > div:nth-last-child(2) {
  min-width: 155px;
  width: 17%;
  padding: 5px;
  overflow: hidden;
  line-height: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 10px;
  padding-top: 0;
}

.list-select > ul > li > div:nth-last-child(3) {
  min-width: 155px;
  width: 18%;
  padding: 5px;
  padding-top: 0;
  overflow: hidden;
  line-height: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 10px;
}

.dataLi .defData {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-select > ul > li {
  display: flex;
  min-height: 45px;
  height: 100%;
}

.list-select {
  min-height: 400px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 40px;
}

.list-issue li {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
}

.list-issue li > div:nth-child(1) {
  width: 50px;
  text-align: right;
  padding-right: 10px;
}

.list-nav {
  margin-top: 15px;
  overflow: hidden;
}

.list-nav > ul > li:nth-child(1) {
  border: 0;
  margin-right: 0;
}

.list-nav > ul > li {
  margin-bottom: 15px;
  width: 88px;
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

.list-nav > div:nth-child(2) .list-sel {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

.list-nav > ul .list-sel {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

.list-nav > ul .list-li:hover {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

.list {
  min-height: 540px;
}

.list > div {
  width: 100%;
}

.sale {
  width: 100%;
  min-height: 100%;
}

.sale > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
  min-height: 100%;
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
  border: 1px solid #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}

/*添加地区弹出框*/

.addCityContent .ad {
  display: flex;
  margin-top: 15px;
  min-height: 45px;
  align-items: center;
}

.addCityContent > div:nth-child(1) {
  margin-top: 30px;
}

.addCityContent .ad > div:nth-child(1) {
  margin-left: 25px;
  width: 90px;
  height: 180px;
  text-align: right;
}

.addCityContent .ad > div:nth-child(2) {
  margin-left: 10px;
}

.addCityContent .ad > div:nth-child(3) {
  margin-left: 25px;
  width: 90px;
  height: 180px;
  text-align: right;
}

.addCityContent .ad > div:nth-child(3) > div {
  width: 70px;
  height: 30px;
  text-align: center !important;
  line-height: 30px;
  cursor: pointer;
  background-color: #5acdfa;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
}

.addCityContent {
  width: 825px;
  min-height: 105px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  z-index: 100000;
}

textarea {
  width: 550px;
  height: 180px;
  border: 1px solid #d1d1d1;
  resize: none;
  border-radius: 4px;
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

.showaddCity {
  display: none;
}

/*删除弹出框*/

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

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

.but {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.showdel {
  display: none;
}
</style>