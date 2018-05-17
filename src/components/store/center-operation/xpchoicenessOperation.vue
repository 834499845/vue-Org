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
                <div class="listCont">
                    <div class="nullCont" v-show="nullOrData">
                        <div class="listCommon">
                            <div>
                                商品选择：
                            </div>
                            <div class="listCommonSearch">
                                <div>
                                    <div>
                                        <select @change="selectsearchtypesClick" v-model="searchtype">
                                            <option v-for="(type,index) in searchtypes"  v-bind:value="type.path">{{type.name}}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" v-model="keyword" placeholder="关键词搜索">
                                    </div>
                                    <div @click="searchClick">
                                        搜索
                                    </div>
                                </div>
                                <div>
                                    <ul>
                                        <li v-for="(item,index) in lists" @click="commonClick(index)" :class="{bgcolor:isBgcolor == index}">
                                            {{item.productName}}
                                        </li>
                                    </ul>
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
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      title: "编辑为你精选",
      loading: false,
      nullOrData: true,
      image: "/static/img/addWini.jpg",
      isRedbrightIcon: false,
      isGraybrightIcon: true,
      searchtypes: [
        {
          name: "全部",
          path: ""
        }
      ],
      searchtype: "",
      isBgcolor: 0,
      lists: [],
      addTrue: false,
      keyword: "",
      addClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    var paths = this.$route.path.split("/");
    var oneStr = paths[2];
    var twoStr = paths[3];
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
          });
        }
      });
      if (arrs.indexOf("operation") == -1) {
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
        var aps = "";
        aps = self.$route.query.ap;
        if (aps == 1) {
          self.title = "添加商品";
        } else {
          self.title = "编辑商品";
        }
        self.commonsFun();
        self.typeFun();
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
    // 查询所有商品
    commonsFun() {
      var self = this;
      var goodId = "";
      self.loading = true;
      goodId = self.$route.query.goodsId;
      self
        .getstoreproductList({
          pageNo: 1,
          pageSize: 300,
          logicDelete: 0
        })
        .then(data => {
          self.loading = false;
          //   console.log("商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  data.data.records.forEach(function(ele, ind) {
                    if (ele.upShelves == 0) {
                      self.lists.push({
                        productName: ele.productName,
                        id: ele.id
                      });
                    }
                  });
                  var aps = "";
                  aps = self.$route.query.ap;
                  if (aps == 1) {
                    self.isBgcolor = 0;
                  } else {
                    data.data.records.forEach(function(ele, index) {
                      if (goodId == ele.id) {
                        self.isBgcolor = index;
                      }
                    });
                  }
                } else {
                  self.lists = [];
                }
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
          self.lists = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    typeFun() {
      var self = this;
      self
        .getstoreclassficationfindByLevelAndId({
          level: 3
        })
        .then(data => {
          self.loading = false;
          //   console.log("商品三级类目", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele) {
                  self.searchtypes.push(ele);
                });
                self.searchtype = self.searchtypes[0].path;
              } else {
                self.searchtypes = [];
              }
            } else {
              self.searchtypes = [];
            }
          } else {
            self.searchtypes = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.lists = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 选择商品
    selectsearchtypesClick() {},
    // 搜索商品
    searchClick() {
      var self = this;
      //   console.log(self.searchtype, self.keyword);
      self
        .getstoreproductList({
          pageNo: 1,
          pageSize: 30,
          logicDelete: 0,
          classFliy: self.searchtype,
          productName: self.keyword
        })
        .then(data => {
          self.loading = false;
          //   console.log("商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  var aps = "";
                  aps = self.$route.query.ap;
                  var goodId = "";
                  goodId = self.$route.query.goodsId;
                  if (aps == 1) {
                    self.isBgcolor = 0;
                  } else {
                    data.data.records.forEach(function(ele, index) {
                      if (goodId == ele.id) {
                        self.isBgcolor = index;
                      }
                    });
                  }
                } else {
                  self.lists = [];
                }
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
          self.lists = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    commonClick(index) {
      this.isBgcolor = index;
    },
    // 添加或修改商品
    addClick() {
      var self = this;
      var ids = "";
      var aps = "";
      aps = self.$route.query.ap;
      var type = "";
      type = self.$route.query.type;
      if (self.addClickTrue == false) {
        if (aps == 1) {
          // 添加
          if (self.lists.length > 0) {
            self.loading = true;
            self.addClickTrue = true;
            self
              .getstoreProductInfo({
                productId: self.lists[self.isBgcolor].id
              })
              .then(data => {
                self.loading = false;
                self.addClickTrue = false;
                if (data.code == 200) {
                  if (data.data.product.upShelves == 1) {
                    self.$message({
                      type: "info",
                      message: "这个商品已经下架了！"
                    });
                  } else {
                    self.addClickTrue = true;
                    self
                      .getstorechannelGoodsadd({
                        goodsId: self.lists[self.isBgcolor].id,
                        channelType: type
                      })
                      .then(data => {
                        self.loading = false;
                        self.addClickTrue = false;
                        if (data.code == 200) {
                          self.$message({
                            type: "success",
                            message: "添加成功!"
                          });
                          var typeName = "";
                          typeName = self.$route.query.typeName;
                          if (type == 1) {
                            self.$router.push({
                              path: "/store/xpConjOperation",
                              query: {
                                type: type,
                                typeName: typeName
                              }
                            });
                          } else {
                            self.$router.push({
                              path: "/store/xpOperation",
                              query: {
                                type: type,
                                typeName: typeName
                              }
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
                        self.loading = false;
                        self.addClickTrue = false;
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
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
                self.loading = false;
                self.addClickTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            var typeBack = "";
            typeBack = self.$route.query.type;
            if (typeBack == 1) {
              self.$router.push({
                path: "/store/xpConjOperation",
                query: {
                  type: typeBack,
                  typeName: typeName
                }
              });
            } else {
              self.$router.push({
                path: "/store/xpOperation",
                query: {
                  type: typeBack,
                  typeName: typeName
                }
              });
            }
          }
        } else {
          var id = "";
          id = self.$route.query.id;
          if (self.lists.length > 0) {
            self.loading = true;
            self.addClickTrue = true;
            self
              .getstorechannelGoodsupdate({
                id: id,
                goodsId: self.lists[self.isBgcolor].id,
                channelType: type
              })
              .then(data => {
                self.loading = false;
                self.addClickTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  var typeName = "";
                  typeName = self.$route.query.typeName;
                  if (type == 1) {
                    self.$router.push({
                      path: "/store/xpConjOperation",
                      query: {
                        type: type,
                        typeName: typeName
                      }
                    });
                  } else {
                    self.$router.push({
                      path: "/store/xpOperation",
                      query: {
                        type: type,
                        typeName: typeName
                      }
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
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            var typeName = "";
            typeName = self.$route.query.typeName;
            if (type == 1) {
              self.$router.push({
                path: "/store/xpConjOperation",
                query: {
                  type: type,
                  typeName: typeName
                }
              });
            } else {
              self.$router.push({
                path: "/store/xpOperation",
                query: {
                  type: type,
                  typeName: typeName
                }
              });
            }
          }
        }
      }
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      var self = this;
      var type = "";
      type = self.$route.query.type;
      var typeName = "";
      typeName = self.$route.query.typeName;
      if (type == 1) {
        self.$router.push({
          path: "/store/xpConjOperation",
          query: {
            type: type,
            typeName: typeName
          }
        });
      } else {
        self.$router.push({
          path: "/store/xpOperation",
          query: {
            type: type,
            typeName: typeName
          }
        });
      }
    },
    ...mapActions([
      "getstoreproductList",
      "getstorechannelGoodsadd",
      "getstorechannelGoodsupdate",
      "getstoreclassficationfindByLevelAndId",
      "getstoreProductInfo"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.bgcolor {
  background-color: #fff1f3;
}

.nullCont {
  min-height: 320px;
  width: 100%;
}

.listCommonSearch > div:nth-child(1) {
  height: 32px;
  width: 550px;
  display: flex;
  align-items: center;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(1) select {
  width: 100px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(2) {
  margin-left: 32px;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(2) input {
  width: 210px;
  height: 32px;
  border: 1px solid #d1d1d1;
  line-height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.listCommonSearch > div:nth-child(1) > div:nth-child(3) {
  margin-left: 24px;
  width: 70px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  background-color: #fe5371;
  border-radius: 4px;
  cursor: pointer;
}

.listCommonSearch > div:nth-child(2) {
  width: 530px;
  height: 200px;
  border: 1px solid #aeaeae;
  margin-top: 24px;
  border-radius: 4px;
  overflow-y: scroll;
}

.listCommonSearch > div:nth-child(2) li:nth-child(1) {
  margin-top: 5px;
}

.listCommonSearch > div:nth-child(2) li {
  height: 36px;
  width: 100%;
  padding-left: 12px;
  line-height: 36px;
  font-size: 14px;
  color: #303030;
  cursor: pointer;
}

.listCommon {
  height: 260px;
  display: flex;
  width: 100%;
  margin-top: 24px;
}

.listCommon > div:nth-child(1) {
  height: 260px;
  padding-top: 5px;
}

.listCommon > div:nth-child(2) {
  height: 260px;
  width: 550px;
  margin-left: 14px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.listCont {
  width: 800px;
  min-height: 450px;
  margin-top: 24px;
  overflow: hidden;
}

.but {
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.listCont .but > div:nth-child(1) {
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

.listCont .but > div:nth-child(2) {
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

.sale > div:nth-child(1) {
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
  width: 150px;
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
</style>