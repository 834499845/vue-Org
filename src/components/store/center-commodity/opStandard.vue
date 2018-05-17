<!--新增品牌管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="caneleClick">
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
                    <div class="list-search">
                        <div class="menuLeft">
                            <div>
                                <div>
                                    <img src="/static/img/search_1.png" alt="">
                                </div>
                                <div>
                                    <input type="text" v-model="typeName">
                                </div>
                            </div>
                            <div class="search" @click="searchClick">
                                确定
                            </div>
                        </div>
                    </div>
                    <div class="list-type">
                        <div>
                            <div class="type-name">
                                <div>
                                    一级分类
                                </div>
                                <div>
                                    二级分类
                                </div>
                                <div>
                                    三级分类
                                </div>
                            </div>
                            <div class="type-cont">
                                <div>
                                    <ul>
                                        <li v-show="listOnes.length > 0" v-for="(item,index) in listOnes" @click="typeOneClick(index)" :class="{bgColor:isOneBgColor == index}">
                                            {{item.name}}
                                        </li>
                                        <li v-show="listOnes.length == 0">
                                            暂无数据
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li v-show="listTwos.length > 0" v-for="(item,index) in listTwos" @click="typeTwoClick(index)" :class="{bgColor:isTwoBgColor == index}">
                                            {{item.name}}
                                        </li>
                                        <li v-show="listTwos.length == 0">
                                            暂无数据
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li v-show="listThrs.length > 0" v-for="(item,index) in listThrs" @click="typeThrClick(index)" :class="{bgColor:isThrBgColor == index}">
                                            {{item.name}}
                                        </li>
                                        <li v-show="listThrs.length == 0">
                                            暂无数据
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list-firstAttribute">
                        <div>
                            <div>
                                第一类属性：
                            </div>
                            <div>
                                <input type="text" v-model="firstAttribute" maxlength="8" :class="{redInput:isRedfirstAttribute,grayInput:isGrayfirstAttribute}">
                            </div>
                            <div :class="{redTest:isRedfirstAttribute,grayTest:isGrayfirstAttribute}">
                                最多8个字符
                            </div>
                        </div>
                        <div>
                            <div>
                                属性值：
                            </div>
                            <div>
                                <div>
                                    <input type="text" v-model="firstAttributeproperty" :class="{redInput:isRedfirstAttributeproperty,grayInput:isGrayfirstAttributeproperty}">
                                </div>
                                <div :class="{redTest:isRedfirstAttributeproperty,grayTest:isGrayfirstAttributeproperty}">
                                    属性值用“,”隔开，单个属性值不能超过8个字符
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list-secondAttribute">
                        <div>
                            <div>
                                第二类属性：
                            </div>
                            <div>
                                <input type="text" v-model="secondAttribute" maxlength="8" :class="{redInput:isRedsecondAttribute,grayInput:isGraysecondAttribute}">
                            </div>
                            <div :class="{redTest:isRedsecondAttribute,grayTest:isGraysecondAttribute}">
                                最多8个字符
                            </div>
                        </div>
                        <div>
                            <div>
                                属性值：
                            </div>
                            <div>
                                <div>
                                    <input type="text" v-model="secondAttributeproperty" :class="{redInput:isRedsecondAttributeproperty,grayInput:isGraysecondAttributeproperty}">
                                </div>
                                <div :class="{redTest:isRedsecondAttributeproperty,grayTest:isGraysecondAttributeproperty}">
                                    属性值用“,”隔开，单个属性值不能超过8个字符
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addClick">确定</div>
                        <div @click="caneleClick">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @ok="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/upStanrd";
export default {
  components: {
    "v-storeDel": storeDel
  },
  data() {
    return {
      addClickTrue: false,
      firstAttribute: "",
      isRedfirstAttribute: false,
      isGrayfirstAttribute: true,
      isfirstAttribute: false,
      firstAttributeproperty: "",
      isRedfirstAttributeproperty: false,
      isGrayfirstAttributeproperty: true,
      isfirstAttributeproperty: false,
      secondAttribute: "",
      isRedsecondAttribute: false,
      isGraysecondAttribute: true,
      issecondAttribute: false,
      secondAttributeproperty: "",
      isRedsecondAttributeproperty: false,
      isGraysecondAttributeproperty: true,
      issecondAttributeproperty: false,
      typeName: "",
      title: "新增规格",
      loading: false,
      listOnes: [],
      isOneBgColor: 0,
      listTwos: [],
      isTwoBgColor: 0,
      listThrs: [],
      isThrBgColor: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      deling: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      var comms = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "商城管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
            if (one.name == "商品中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("commodity") == -1) {
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
        if (comms.indexOf("standard") == -1) {
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
          var ap = "";
          ap = self.$route.query.ap;
          if (ap == 1) {
            self.title = "新增规格";
          } else {
            self.title = "修改规格";
          }
          self.createdFun();
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
  // 事件处理
  methods: {
    // 获取分类列表
    createdFun() {
      var self = this;
      self.loading = true;
      self
        .getstoreclassfindByLevelAndId({
          level: 1
        })
        .then(dataOne => {
          self.loading = false;
          //   console.log("一级商品分类列表", JSON.parse(JSON.stringify(dataOne)));
          if (dataOne.code == 200) {
            if (dataOne.data) {
              if (dataOne.data.length > 0) {
                self.listOnes = dataOne.data;
                self
                  .getstoreclassficationfindByLevelAndId({
                    pid: dataOne.data[0].id
                  })
                  .then(dataTwo => {
                    self.loading = false;
                    if (dataTwo.code == 200) {
                      if (dataTwo.data) {
                        if (dataTwo.data.length > 0) {
                          self.listTwos = dataTwo.data;
                          self
                            .getstoreclassficationfindByLevelAndId({
                              pid: dataTwo.data[0].id
                            })
                            .then(dataThr => {
                              self.loading = false;
                              if (dataThr.code == 200) {
                                if (dataThr.data) {
                                  if (dataThr.data.length > 0) {
                                    self.listThrs = dataThr.data;
                                  } else {
                                    self.listThrs = [];
                                  }
                                } else {
                                  self.listThrs = [];
                                }
                              } else {
                                self.listThrs = [];
                                self.$message({
                                  type: "info",
                                  message: dataThr.message
                                });
                              }
                            })
                            .catch(msg => {
                              //   console.log(msg);
                              self.loading = false;
                              self.listThrs = [];
                              self.$message({
                                type: "info",
                                message: "服务器错误"
                              });
                            });
                        } else {
                          self.listTwos = [];
                          self.listThrs = [];
                        }
                      } else {
                        self.listTwos = [];
                        self.listThrs = [];
                      }
                    } else {
                      self.listTwos = [];
                      self.listThrs = [];
                      self.$message({
                        type: "info",
                        message: dataTwo.message
                      });
                    }
                  })
                  .catch(msg => {
                    // console.log(msg);
                    self.loading = false;
                    self.listTwos = [];
                    self.listThrs = [];
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              } else {
                self.listOnes = [];
                self.listTwos = [];
                self.listThrs = [];
              }
            } else {
              self.listOnes = [];
              self.listTwos = [];
              self.listThrs = [];
            }
          } else {
            self.listOnes = [];
            self.listTwos = [];
            self.listThrs = [];
            self.$message({
              type: "info",
              message: dataOne.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.listOnes = [];
          self.listTwos = [];
          self.listThrs = [];
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 搜索一级类名
    searchClick() {
      var self = this;
      self.loading = true;
      self.isOneBgColor = 0;
      self.isTwoBgColor = 0;
      self.isThrBgColor = 0;
      self
        .getstoreclassfindByLevelAndId({
          level: 1,
          name: self.typeName
        })
        .then(dataOne => {
          self.loading = false;
          //   console.log("一级商品分类列表", JSON.parse(JSON.stringify(dataOne)));
          if (dataOne.code == 200) {
            if (dataOne.data) {
              if (dataOne.data.length > 0) {
                self.listOnes = dataOne.data;
                self
                  .getstoreclassficationfindByLevelAndId({
                    pid: dataOne.data[0].id
                  })
                  .then(dataTwo => {
                    self.loading = false;
                    if (dataTwo.code == 200) {
                      if (dataTwo.data) {
                        if (dataTwo.data.length > 0) {
                          self.listTwos = dataTwo.data;
                          self
                            .getstoreclassficationfindByLevelAndId({
                              pid: dataTwo.data[0].id
                            })
                            .then(dataThr => {
                              self.loading = false;
                              if (dataThr.code == 200) {
                                if (dataThr.data) {
                                  if (dataThr.data.length > 0) {
                                    self.listThrs = dataThr.data;
                                  } else {
                                    self.listThrs = [];
                                  }
                                } else {
                                  self.listThrs = [];
                                }
                              } else {
                                self.listThrs = [];
                                self.$message({
                                  type: "info",
                                  message: dataThr.message
                                });
                              }
                            })
                            .catch(msg => {
                              //   console.log(msg);
                              self.loading = false;
                              self.listThrs = [];
                              self.$message({
                                type: "info",
                                message: "服务器错误"
                              });
                            });
                        } else {
                          self.listTwos = [];
                          self.listThrs = [];
                        }
                      } else {
                        self.listTwos = [];
                        self.listThrs = [];
                      }
                    } else {
                      self.listTwos = [];
                      self.listThrs = [];
                      self.$message({
                        type: "info",
                        message: dataTwo.message
                      });
                    }
                  })
                  .catch(msg => {
                    // console.log(msg);
                    self.loading = false;
                    self.listTwos = [];
                    self.listThrs = [];
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              } else {
                self.listOnes = [];
                self.listTwos = [];
                self.listThrs = [];
              }
            } else {
              self.listOnes = [];
              self.listTwos = [];
              self.listThrs = [];
            }
          } else {
            self.listOnes = [];
            self.listTwos = [];
            self.listThrs = [];
            self.$message({
              type: "info",
              message: dataOne.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.listOnes = [];
          self.listTwos = [];
          self.listThrs = [];
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 一级分类切换
    typeOneClick(ind) {
      var self = this;
      self.isOneBgColor = ind;
      self.isTwoBgColor = 0;
      self.isThrBgColor = 0;
      self
        .getstoreclassficationfindByLevelAndId({
          pid: self.listOnes[ind].id
        })
        .then(dataTwo => {
          self.loading = false;
          //   console.log("二级商品分类列表", JSON.parse(JSON.stringify(dataTwo)));
          if (dataTwo.code == 200) {
            if (dataTwo.data) {
              if (dataTwo.data.length > 0) {
                self.listTwos = dataTwo.data;
                self
                  .getstoreclassficationfindByLevelAndId({
                    pid: dataTwo.data[0].id
                  })
                  .then(dataThr => {
                    self.loading = false;
                    if (dataThr.code == 200) {
                      if (dataThr.data) {
                        if (dataThr.data.length > 0) {
                          self.listThrs = dataThr.data;
                        } else {
                          self.listThrs = [];
                        }
                      } else {
                        self.listThrs = [];
                      }
                    } else {
                      self.listThrs = [];
                      self.$message({
                        type: "info",
                        message: dataThr.message
                      });
                    }
                  })
                  .catch(msg => {
                    // console.log(msg);
                    self.loading = false;
                    self.listThrs = [];
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              } else {
                self.listTwos = [];
                self.listThrs = [];
              }
            } else {
              self.listTwos = [];
              self.listThrs = [];
            }
          } else {
            self.listTwos = [];
            self.listThrs = [];
            self.$message({
              type: "info",
              message: dataTwo.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.listTwos = [];
          self.listThrs = [];
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 二级分类切换
    typeTwoClick(ind) {
      var self = this;
      self.isTwoBgColor = ind;
      self.isThrBgColor = 0;
      self
        .getstoreclassficationfindByLevelAndId({
          pid: self.listTwos[ind].id
        })
        .then(dataThr => {
          self.loading = false;
          //   console.log("三级级商品分类列表", JSON.parse(JSON.stringify(dataThr)));
          if (dataThr.code == 200) {
            if (dataThr.data) {
              if (dataThr.data.length > 0) {
                self.listThrs = dataThr.data;
              } else {
                self.listThrs = [];
              }
            } else {
              self.listThrs = [];
            }
          } else {
            self.listThrs = [];
            self.$message({
              type: "info",
              message: dataThr.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.listThrs = [];
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 三级分类切换
    typeThrClick(ind) {
      var self = this;
      self.isThrBgColor = ind;
    },
    // 确认添加
    addClick() {
      var self = this;
      var ap = "";
      ap = self.$route.query.ap;
      if (self.addClickTrue == false) {
        if (ap == 1) {
          if (
            self.isfirstAttribute == true &&
            self.isfirstAttributeproperty == true &&
            self.issecondAttribute == true &&
            self.issecondAttributeproperty == true
          ) {
            var firstAttributepropertyArr = [];
            var firstAttributepropertyStr = self.firstAttributeproperty;
            firstAttributepropertyStr = firstAttributepropertyStr.replace(
              /(^\s+)|(\s+$)/g,
              ""
            );
            if (firstAttributepropertyStr.indexOf(",") != -1) {
              var arrs = firstAttributepropertyStr.split(",");
              // console.log(arrs);
              arrs.forEach(function(ele, ind) {
                if (ele) {
                  firstAttributepropertyArr.push({
                    attributeValue: ele,
                    attributeMark: 1,
                    rank: ind + 1
                  });
                }
              });
            } else {
              firstAttributepropertyArr.push({
                attributeValue: self.firstAttributeproperty,
                attributeMark: 1,
                rank: 1
              });
            }
            var secondAttributepropertyArr = [];
            var secondAttributepropertyStr = self.secondAttributeproperty;
            secondAttributepropertyStr = secondAttributepropertyStr.replace(
              /(^\s+)|(\s+$)/g,
              ""
            );
            if (secondAttributepropertyStr.indexOf(",") != -1) {
              var arrs = secondAttributepropertyStr.split(",");
              arrs.forEach(function(ele, ind) {
                if (ele) {
                  secondAttributepropertyArr.push({
                    attributeValue: ele,
                    attributeMark: 2,
                    rank: ind + 1
                  });
                }
              });
            } else {
              secondAttributepropertyArr.push({
                attributeValue: self.secondAttributeproperty,
                attributeMark: 2,
                rank: 1
              });
            }
            var classArr = [];
            classArr = firstAttributepropertyArr.concat(
              secondAttributepropertyArr
            );
            var paramJsonobj = {
              classAttribute: {
                classId: self.listThrs[self.isThrBgColor].id,
                className: self.listThrs[self.isThrBgColor].name,
                firstAttribute: self.firstAttribute,
                secondAttribute: self.secondAttribute
              },
              classAttributeItems: classArr
            };
            self.loading = true;
            self.addClickTrue = true;
            self
              .getstoreclassAttributesave({
                paramJson: JSON.stringify(paramJsonobj)
              })
              .then(dataThr => {
                self.addClickTrue = false;
                self.loading = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  self.$router.push({
                    path: "/store/commodity/standard",
                    query: {
                      pageno: self.$route.query.pageno,
                      pagesi: self.$route.query.pagesi
                    }
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: dataThr.message
                  });
                }
              })
              .catch(msg => {
                self.addClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            if (self.isfirstAttribute == false) {
              this.isRedfirstAttribute = true;
              this.isGrayfirstAttribute = false;
            } else {
              this.isRedfirstAttribute = false;
              this.isGrayfirstAttribute = true;
            }
            if (self.isfirstAttributeproperty == false) {
              this.isRedfirstAttributeproperty = true;
              this.isGrayfirstAttributeproperty = false;
            } else {
              this.isRedfirstAttributeproperty = false;
              this.isGrayfirstAttributeproperty = true;
            }
            if (self.issecondAttribute == false) {
              this.isRedsecondAttribute = true;
              this.isGraysecondAttribute = false;
            } else {
              this.isRedsecondAttribute = false;
              this.isGraysecondAttribute = true;
            }
            if (self.issecondAttributeproperty == false) {
              this.isRedsecondAttributeproperty = true;
              this.isGraysecondAttributeproperty = false;
            } else {
              this.isRedsecondAttributeproperty = false;
              this.isGraysecondAttributeproperty = true;
            }
          }
        } else {
          this.isShowdel = false;
          this.delShow = true;
        }
      }
    },
    // 确认修改
    delClick() {
      var self = this;
      self.deling = true;
      var id = "";
      id = self.$route.query.id;
      if (self.delClickTrue == false) {
        self.delClickTrue = true;
        self
          .getstoreclassAttributemodify({
            id: id,
            className: self.listThrs[self.isThrBgColor].name
          })
          .then(dataThr => {
            self.deling = false;
            self.delClickTrue = false;
            if (dataThr.code == 200) {
              self.$message({
                type: "success",
                message: "修改成功!"
              });
              self.isShowdel = true;
              self.delShow = false;
              self.$router.push({
                path: "/store/commodity/standard",
                query: {
                  pageNo: self.$route.query.pageNo,
                  pageSize: self.$route.query.pageSize
                }
              });
            } else {
              self.deling = false;
              self.delClickTrue = false;
              self.$message({
                type: "info",
                message: dataThr.message
              });
            }
          })
          .catch(msg => {
            //   console.log(msg);
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 取消修改弹出框
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      var self = this;
      var pageNoStr = self.$route.query.pageno;
      var pagesiStr = self.$route.query.pagesi;
      self.$router.push({
        path: "/store/commodity/standard",
        query: {
          pageno: pageNoStr,
          pagesi: pagesiStr
        }
      });
    },
    ...mapActions([
      "getstoreclassfindByLevelAndId",
      "getstoreclassficationfindByLevelAndId",
      "getstoreclassAttributesave",
      "getstoreclassAttributemodify"
    ])
  },
  // 监视
  watch: {
    firstAttribute: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        this.isfirstAttribute = false;
      } else {
        if (trimstr.length <= 8) {
          this.isRedfirstAttribute = false;
          this.isGrayfirstAttribute = true;
          this.isfirstAttribute = true;
        } else {
          this.isfirstAttribute = false;
        }
      }
    },
    firstAttributeproperty: function(val) {
      var self = this;
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.indexOf("，") != -1){
        this.isfirstAttributeproperty = false
      }else if (trimstr.indexOf(",") != -1) {
        var arrs = trimstr.split(",");
        this.isfirstAttributeproperty = true;
        arrs.forEach(function(ele) {
          if (ele) {
            if (ele.length > 8) {
              self.isfirstAttributeproperty = false;
            }
          }
        });
      } else {
        if (trimstr.length <= 0) {
          this.isfirstAttributeproperty = false;
        } else {
          if (trimstr.length <= 8) {
            this.isRedfirstAttributeproperty = false;
            this.isGrayfirstAttributeproperty = true;
            this.isfirstAttributeproperty = true;
          } else {
            this.isfirstAttributeproperty = false;
          }
        }
      }
    },
    secondAttribute: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        this.issecondAttribute = false;
      } else {
        if (trimstr.length <= 8) {
          this.isRedsecondAttribute = false;
          this.isGraysecondAttribute = true;
          this.issecondAttribute = true;
        } else {
          this.issecondAttribute = false;
        }
      }
    },
    secondAttributeproperty: function(val) {
      var self = this;
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.indexOf("，") != -1){
        this.issecondAttributeproperty = false;
      }else if (trimstr.indexOf(",") != -1) {
        var arrs = trimstr.split(",");
        this.issecondAttributeproperty = true;
        arrs.forEach(function(ele) {
          if (ele) {
            if (ele.length > 8) {
              self.issecondAttributeproperty = false;
            }
          }
        });
      } else {
        if (trimstr.length <= 0) {
          this.issecondAttributeproperty = false;
        } else {
          if (trimstr.length <= 8) {
            this.isRedsecondAttributeproperty = false;
            this.isGraysecondAttributeproperty = true;
            this.issecondAttributeproperty = true;
          } else {
            this.issecondAttributeproperty = false;
          }
        }
      }
    },
    typeName: function(val) {
      if (val.length == 0) {
        var self = this;
        self.loading = true;
        self.isOneBgColor = 0;
        self.isTwoBgColor = 0;
        self.isThrBgColor = 0;
        self
          .getstoreclassfindByLevelAndId({
            level: 1
          })
          .then(dataOne => {
            self.loading = false;
            // console.log("一级商品分类列表", JSON.parse(JSON.stringify(dataOne)));
            if (dataOne.code == 200) {
              if (dataOne.data) {
                if (dataOne.data.length > 0) {
                  self.listOnes = dataOne.data;
                  self
                    .getstoreclassficationfindByLevelAndId({
                      pid: dataOne.data[0].id
                    })
                    .then(dataTwo => {
                      self.loading = false;
                      if (dataTwo.code == 200) {
                        if (dataTwo.data) {
                          if (dataTwo.data.length > 0) {
                            self.listTwos = dataTwo.data;
                            self
                              .getstoreclassficationfindByLevelAndId({
                                pid: dataTwo.data[0].id
                              })
                              .then(dataThr => {
                                self.loading = false;
                                if (dataThr.code == 200) {
                                  if (dataThr.data) {
                                    if (dataThr.data.length > 0) {
                                      self.listThrs = dataThr.data;
                                    } else {
                                      self.listThrs = [];
                                    }
                                  } else {
                                    self.listThrs = [];
                                  }
                                } else {
                                  self.listThrs = [];
                                  self.$message({
                                    type: "info",
                                    message: dataThr.message
                                  });
                                }
                              })
                              .catch(msg => {
                                // console.log(msg);
                                self.loading = false;
                                self.listThrs = [];
                                self.$message({
                                  type: "info",
                                  message: "服务器错误"
                                });
                              });
                          } else {
                            self.listTwos = [];
                            self.listThrs = [];
                          }
                        } else {
                          self.listTwos = [];
                          self.listThrs = [];
                        }
                      } else {
                        self.listTwos = [];
                        self.listThrs = [];
                        self.$message({
                          type: "info",
                          message: dataTwo.message
                        });
                      }
                    })
                    .catch(msg => {
                      //   console.log(msg);
                      self.loading = false;
                      self.listTwos = [];
                      self.listThrs = [];
                      self.$message({
                        type: "info",
                        message: "服务器错误"
                      });
                    });
                } else {
                  self.listOnes = [];
                  self.listTwos = [];
                  self.listThrs = [];
                }
              } else {
                self.listOnes = [];
                self.listTwos = [];
                self.listThrs = [];
              }
            } else {
              self.listOnes = [];
              self.listTwos = [];
              self.listThrs = [];
              self.$message({
                type: "info",
                message: dataOne.message
              });
            }
          })
          .catch(msg => {
            // console.log(msg);
            self.loading = false;
            self.listOnes = [];
            self.listTwos = [];
            self.listThrs = [];
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    }
  }
};
</script>
<style scoped>
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

.list-firstAttribute > div {
  display: flex;
}

.list-firstAttribute > div:nth-child(1) {
  height: 32px;
}

.list-firstAttribute > div:nth-child(2) {
  height: 64px;
  margin-top: 24px;
}

.list-firstAttribute > div > div:nth-child(1) {
  width: 120px;
  text-align: right;
}

.list-firstAttribute > div:nth-child(1) > div:nth-child(2) input {
  width: 170px;
}

.list-firstAttribute > div:nth-child(1) > div:nth-child(3) {
  line-height: 32px;
  margin-left: 15px;
}

.list-firstAttribute > div > div:nth-child(2) {
  margin-left: 20px;
}

.list-firstAttribute > div:nth-child(2) > div:nth-child(2) input {
  width: 445px;
}

.list-firstAttribute > div > div:nth-child(2) > div:nth-child(2) {
  margin-top: 7px;
}

.list-firstAttribute {
  height: 120px;
  margin-top: 48px;
  width: 850px;
  margin-left: 170px;
}

.list-secondAttribute {
  height: 120px;
  width: 850px;
  margin-left: 170px;
  margin-top: 24px;
}

.list-secondAttribute > div:nth-child(1) > div:nth-child(3) {
  line-height: 32px;
  margin-left: 15px;
}

.list-secondAttribute > div {
  display: flex;
}

.list-secondAttribute > div:nth-child(1) {
  height: 32px;
}

.list-secondAttribute > div:nth-child(2) {
  height: 64px;
  margin-top: 24px;
}

.list-secondAttribute > div > div:nth-child(1) {
  width: 120px;
  text-align: right;
}

.list-secondAttribute > div:nth-child(1) > div:nth-child(2) input {
  width: 170px;
}

.list-secondAttribute > div > div:nth-child(2) {
  margin-left: 20px;
}

.list-secondAttribute > div:nth-child(2) > div:nth-child(2) input {
  width: 445px;
}

.list-secondAttribute > div > div:nth-child(2) > div:nth-child(2) {
  margin-top: 7px;
}

.type-name {
  height: 22px;
  display: flex;
}

.type-name > div {
  width: 240px;
  margin-right: 60px;
  text-align: center;
  font-size: 16px;
}

.type-cont > div li {
  height: 36px;
  width: 240px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
}

.type-cont > div li:nth-child(1) {
  margin-top: 10px;
}

.bgColor {
  background-color: #fff1f3;
}

.type-cont > div {
  width: 240px;
  text-align: center;
  margin-right: 60px;
  height: 250px;
  border-radius: 4px;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #d1d1d1;
}

.type-cont {
  margin-top: 16px;
  overflow: hidden;
  min-height: 250px;
  display: flex;
}

.list-type > div {
  width: 850px;
  margin-left: 100px;
  min-height: 250px;
}

.list-type {
  margin-top: 36px;
  overflow: hidden;
  min-height: 250px;
  width: 100%;
}

.menuLeft {
  display: flex;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menuLeft .search {
  width: 70px;
  margin-left: 32px;
  height: 30px;
  text-align: center !important;
  line-height: 30px;
  cursor: pointer;
  background-color: #fe5371;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
  border: 1px solid #eaeaea;
  width: 176px;
  overflow: hidden;
  border-radius: 4px;
  height: 32px;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  width: 32px;
  display: flex;
  align-items: center;
}

.menuLeft > div > div:nth-child(1) img {
  margin-left: 12px;
}

.menuLeft > div > div:nth-child(2) {
  width: 140px;
}

.list-search {
  height: 34px;
  width: 100%;
  margin-left: 100px;
}

.list-cont {
  min-height: 300px;
  margin-top: 24px;
}

.menuLeft input {
  width: 320px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
  border: 0;
}

textarea {
  width: 320px;
  height: 78px;
  resize: none;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  padding-top: 10px;
}

.list .but {
  margin-top: 36px;
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
</style>