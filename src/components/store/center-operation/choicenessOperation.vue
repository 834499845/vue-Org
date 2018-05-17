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
                        <div class="listImg">
                            <div>
                                封面选择：
                            </div>
                            <div>
                                <div>
                                    <img :src="image" alt="">
                                </div>
                                <div>
                                    <label class="grayIconlabel" for="brightIcon">上传</label>
                                </div>
                            </div>
                            <div :class="{redTest:isRedbrightIcon,grayTest:isGraybrightIcon}">
                                {{imgTest}}
                            </div>
                            <div>
                                <input id="brightIcon" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageChange">
                            </div>
                        </div>
                        <div class="comone">
                            <div>
                                跳转类型：
                            </div>
                            <div>
                                <el-checkbox v-model="skipPath" @change="skipChange(1)"></el-checkbox><small>链接</small>
                            </div>
                            <div>
                                <el-checkbox v-model="skipShop" @change="skipChange(2)"></el-checkbox><small>商品</small>
                            </div>
                        </div>
                        <div class="listPath" v-show="skipPath">
                            <div>
                                链接地址：
                            </div>
                            <div>
                                <input type="text">
                            </div>
                        </div>
                        <div class="listCommon" v-show="skipShop">
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
                                <div class="grantCommodity">
                                    <div>
                                        <div>
                                            可选商品
                                        </div>
                                        <div>

                                        </div>
                                        <div>
                                            已选商品
                                        </div>
                                    </div>
                                    <div>
                                        <div class="commodityLeft">
                                            <ul>
                                                <li v-for="(item,index) in leftLists" @click="leftListClick(index)" :class="{bgcolor:isBgcolor == item.bgcolor}">
                                                    {{item.productName}}
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
                                                <li v-for="(item,index) in rightLists" @click="rightListClick(index)" :class="{bgcolor:isBgcolor == item.bgcolor}">
                                                    {{item.productName}}
                                                </li>
                                            </ul>
                                        </div>
                                        <div :class="{redTest:isRedrightLists,grayTest:isGrayrightLists}">
                                            必选一件商品
                                        </div>
                                    </div>
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
      imgTest: "尺寸限制为600*600",
      title: "编辑为你精选",
      loading: false,
      jingxuans: [],
      nullOrData: true,
      image: "/static/img/addWini.jpg",
      isRedbrightIcon: false,
      isGraybrightIcon: true,
      isRedcommon: false,
      isGraycommon: true,
      skipPath: false,
      skipShop: true,
      searchtypes: [
        {
          name: "全部",
          path: ""
        }
      ],
      keyword: "",
      searchtype: "",
      isBgcolor: true,
      addTrue: false,
      leftLists: [],
      rightLists: [],
      isRedrightLists: false,
      isGrayrightLists: true,
      selectLeftArrs: [],
      selectRightArrs: [],
      onimageChangeTrue: false,
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
          self.title = "添加为你精选";
          self.commonsFun();
        } else {
          self.title = "编辑为你精选";
          self.creatFun();
        }
        var isBig = "";
        isBig = self.$route.query.isBig;
        if (isBig == 1) {
          self.imgTest = "尺寸限制为600*600";
        } else {
          self.imgTest = "尺寸限制为300*204";
        }
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
    // 为你精选列表
    creatFun() {
      var self = this;
      self.loading = true;
      self
        .getstorecarefullyChosengetCarefullyChosenDetail({})
        .then(data => {
          self.loading = false;
          //   console.log("为你精选商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                var ids = "";
                ids = self.$route.query.id;
                var pathStr = "";
                data.data.forEach(function(ele, ind) {
                  if (ele.id == ids) {
                    self.image = ele.image;
                    pathStr = ele.goodsIds;
                  } else {
                  }
                });
                var pathArray = [];
                if (pathStr) {
                  if (pathStr.length > 0 && pathStr.indexOf(",") != -1) {
                    if (pathStr.indexOf(",")) {
                      pathArray = pathStr.split(",");
                    }
                  } else if (pathStr.length > 0) {
                    pathArray.push(pathStr);
                  } else {
                    pathArray = [];
                  }
                } else {
                  pathArray = [];
                }
                self
                  .getstoreproductList({
                    pageNo: 1,
                    pageSize: 300,
                    logicDelete: 0
                  })
                  .then(data => {
                    self.loading = false;
                    // console.log("商品列表", JSON.parse(JSON.stringify(data)));
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.records) {
                          if (data.data.records.length > 0) {
                            var dataArr = [];
                            data.data.records.forEach(function(ele, ind) {
                              if (ele.upShelves == 0) {
                                dataArr.push({
                                  productName: ele.productName,
                                  id: ele.id
                                });
                              }
                            });
                            dataArr.forEach(function(ele) {
                              self.leftLists.push({
                                productName: ele.productName,
                                id: ele.id,
                                bgcolor: false
                              });
                            });
                            self.leftLists.forEach(function(ele, ind) {
                              if (pathArray.indexOf(ele.id) != -1) {
                                self.leftLists[ind].bgcolor = true;
                              }
                            });
                            self.rightLists = [];
                            self.leftLists.forEach(function(ele, ind) {
                              if (ele.bgcolor == true) {
                                self.rightLists.push({
                                  productName: ele.productName,
                                  id: ele.id,
                                  bgcolor: false
                                });
                              }
                            });
                          } else {
                            self.leftLists = [];
                          }
                        } else {
                          self.leftLists = [];
                        }
                      } else {
                        self.leftLists = [];
                      }
                    } else {
                      self.leftLists = [];
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    self.leftLists = [];
                    // console.log(msg);
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              }
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
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 查询所有商品
    commonsFun() {
      var self = this;
      self.loading = true;
      self
        .getstoreproductList({
          pageNo: 1,
          pageSize: 30,
          logicDelete: 0
        })
        .then(data => {
          self.loading = false;
          //   console.log("商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var dataArr = [];
                  data.data.records.forEach(function(ele, ind) {
                    if (ele.upShelves == 0) {
                      dataArr.push({
                        productName: ele.productName,
                        id: ele.id
                      });
                    }
                  });
                  dataArr.forEach(function(ele) {
                    self.leftLists.push({
                      productName: ele.productName,
                      id: ele.id,
                      bgcolor: false
                    });
                  });
                } else {
                  self.leftLists = [];
                }
              } else {
                self.leftLists = [];
              }
            } else {
              self.leftLists = [];
            }
          } else {
            self.leftLists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.leftLists = [];
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
    // 取消选中商品
    rightListClick(index) {
      var self = this;
      this.rightLists[index].bgcolor = !this.rightLists[index].bgcolor;
    },
    commodityRightClick() {
      var self = this;
      var rights = [];
      self.rightLists.forEach(function(ele, ind) {
        if (ele.bgcolor == false) {
          rights.push({
            productName: ele.productName,
            id: ele.id,
            bgcolor: false
          });
        }
      });
      self.rightLists = rights;
      var ars = [];
      self.selectLeftArrs.forEach(function(left, leftInd) {
        self.rightLists.forEach(function(right, rightInd) {
          if (left.id == right.id) {
            self.selectRightArrs.push({ id: left.id, show: left.show });
          }
        });
      });
    },
    // 添加选中商品
    leftListClick(index) {
      //   console.log(this.leftLists[index].bgcolor);
      var self = this;
      var selects = [];
      if (this.leftLists[index].bgcolor == false) {
        self
          .getstoreProductInfo({
            productId: self.leftLists[index].id
          })
          .then(data => {
            self.loading = false;
            // console.log("添加商品之前查询商品状态", JSON.parse(JSON.stringify(data)));
            if (data.code == 200) {
              if (data.data.product.upShelves == 1) {
                self.$message({
                  type: "info",
                  message: "这个商品已经下架了！"
                });
                self.selectLeftArrs.push({
                  show: false,
                  id: self.leftLists[index].id
                });
              } else {
                self.selectLeftArrs.push({
                  show: true,
                  id: self.leftLists[index].id
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
            // console.log(msg);
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      } else {
        self.selectLeftArrs.forEach(function(ele, ind) {
          if (ele.id == self.leftLists[index].id) {
            self.selectLeftArrs.splice(ind, 1);
          }
        });
      }
      this.leftLists[index].bgcolor = !this.leftLists[index].bgcolor;
    },
    commodityLeftClick() {
      var self = this;
      self.rightLists = [];
      self.leftLists.forEach(function(ele, ind) {
        if (ele.bgcolor == true) {
          self.rightLists.push({
            productName: ele.productName,
            id: ele.id,
            bgcolor: false
          });
        }
      });
    },
    // 切换链接和商品
    skipChange(ind) {
      if (ind == 1) {
        this.skipPath = false;
        this.skipShop = true;
        this.$message({
          type: "info",
          message: "暂不支持链接添加!"
        });
      } else {
        this.skipPath = false;
        this.skipShop = true;
      }
    },
    // 根据商品类型选择商品
    selectsearchtypesClick() {},
    // 封面图
    onimageChange(e) {
      var self = this;
      if (self.onimageChangeTrue == false) {
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
              var isBig = 0;
              isBig = self.$route.query.isBig;
              if (isBig == 1) {
                if (image.width != 600 && image.height != 600) {
                  self.$message({
                    type: "info",
                    message: "上传图片的格式或大小不正确，请重新上传"
                  });
                  document.getElementById("brightIcon").value = "";
                  return;
                } else {
                  self.onimage(fileData);
                }
              } else {
                if (image.width != 300 && image.height != 204) {
                  self.$message({
                    type: "info",
                    message: "上传图片的格式或大小不正确，请重新上传"
                  });
                  document.getElementById("brightIcon").value = "";
                  return;
                } else {
                  self.onimage(fileData);
                }
              }
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    onimage(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "mall");
      formdata.append("business", "carefullyChosen");
      formdata.append("token", TOKEN);
      self.onimageChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功",
              type: "success"
            });
            self.image = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 添加为你精选
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var leng = 0;
        leng = self.$route.query.isBig;
        var arrs = [];
        var ids = "";
        var typsArr = [];
        self.rightLists.forEach(function(ele) {
          typsArr.push(ele.id);
        });
        ids = typsArr.join(",");
        var aps = "";
        aps = self.$route.query.ap;
        if (aps == 1) {
          var selecyShow = true;
          if (self.selectRightArrs.length > 0) {
            self.selectRightArrs.forEach(function(ele, ind) {
              if (ele.show == false) {
                selecyShow = false;
              }
            });
          } else {
            self.selectLeftArrs.forEach(function(ele, ind) {
              if (ele.show == false) {
                selecyShow = false;
              }
            });
          }
          if (
            typsArr.length > 0 &&
            selecyShow == true &&
            self.image != "/static/img/addWini.jpg"
          ) {
            var carefullyChosenJson = {
              title: self.$route.query.name,
              image: self.image,
              goodsIds: ids,
              flag: 0,
              isBig: parseInt(leng)
            };
            self.loading = true;
            var objstr = JSON.stringify(carefullyChosenJson);
            self.addClickTrue = true;
            self
              .getstorecarefullyChosengetCarefullyChosenDetail({})
              .then(data => {
                self.loading = false;
                self.addClickTrue = false;
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.length > 0) {
                      if (data.data[0].isBig == 1 && leng == 1) {
                        self.$message({
                          type: "info",
                          message: "大图只能添加一张!"
                        });
                      } else if (data.data.length == 5) {
                        self.$message({
                          type: "info",
                          message: "大图加小图最多五张!"
                        });
                      } else {
                        self.loading = true;
                        self.addClickTrue = true;
                        self
                          .getstorecarefullyChosengetadd({
                            carefullyChosenJson: "[" + objstr + "]"
                          })
                          .then(data => {
                            self.loading = false;
                            self.addClickTrue = false;
                            if (data.code == 200) {
                              self.$message({
                                type: "success",
                                message: "添加成功!"
                              });
                              self.$router.push({
                                path: "/store/delchoicenessOperation",
                                query: {
                                  name: self.$route.query.name
                                }
                              });
                              self.image = "/static/img/addWini.jpg";
                              self.lists = [];
                              self.commonsFun();
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
                      self.loading = true;
                      self.addClickTrue = true;
                      self
                        .getstorecarefullyChosengetadd({
                          carefullyChosenJson: "[" + objstr + "]"
                        })
                        .then(data => {
                          self.loading = false;
                          self.addClickTrue = false;
                          if (data.code == 200) {
                            self.$message({
                              type: "success",
                              message: "添加成功!"
                            });
                            self.$router.push({
                              path: "/store/delchoicenessOperation",
                              query: {
                                name: self.$route.query.name
                              }
                            });
                            self.image = "/static/img/addWini.jpg";
                            self.lists = [];
                            self.commonsFun();
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
                self.loading = false;
                self.addClickTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            if (typsArr.length == 0) {
              self.isRedrightLists = true;
              self.isGrayrightLists = false;
            } else {
              self.isRedrightLists = false;
              self.isGrayrightLists = true;
            }
            if (selecyShow == false) {
              self.$message({
                type: "info",
                message: "这个商品已经下架了！"
              });
            }
            if (self.image == "/static/img/addWini.jpg") {
              self.isRedbrightIcon = true;
              self.isGraybrightIcon = false;
            } else {
              self.isRedbrightIcon = false;
              self.isGraybrightIcon = true;
            }
          }
        } else {
          var id = "";
          id = self.$route.query.id;
          var carefullyChosenJson = {
            id: id,
            title: self.$route.query.name,
            image: self.image,
            goodsIds: ids,
            flag: 0
          };
          var objstr = JSON.stringify(carefullyChosenJson);
          self.addClickTrue = true;
          self
            .getstorecarefullyChosengetupdate({
              carefullyChosenJson: "[" + objstr + "]"
            })
            .then(data => {
              self.loading = false;
              self.addClickTrue = false;
              if (data.code == 200) {
                self.$message({
                  type: "success",
                  message: "修改成功!"
                });
                self.$router.push({
                  path: "/store/delchoicenessOperation",
                  query: {
                    name: self.$route.query.name
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
              self.loading = false;
              self.addClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        }
      }
    },
    // 搜索商品
    searchClick() {
      var self = this;
      self.leftLists = [];
      self
        .getstoreproductList({
          pageNo: 1,
          pageSize: 100,
          logicDelete: 0,
          classFliy: self.searchtype,
          productName: self.keyword
        })
        .then(data => {
          self.loading = false;
          //   console.log("搜索商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var dataArr = [];
                  dataArr = data.data.records;
                  dataArr.forEach(function(ele) {
                    self.leftLists.push({
                      productName: ele.productName,
                      id: ele.id,
                      bgcolor: false
                    });
                  });
                } else {
                  self.leftLists = [];
                }
              } else {
                self.leftLists = [];
              }
            } else {
              self.leftLists = [];
            }
          } else {
            self.leftLists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false;
          self.leftLists = [];
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      var self = this;
      self.$router.push({
        path: "/store/delchoicenessOperation",
        query: {
          name: self.$route.query.name
        }
      });
    },
    ...mapActions([
      "getstorecarefullyChosengetCarefullyChosenDetail",
      "getstoreproductList",
      "getstorechannelManagementselectChanneluploadFile",
      "getstorecarefullyChosengetadd",
      "getstorecarefullyChosengetupdate",
      "getstoreclassficationfindByLevelAndId",
      "getstoreProductInfo"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.commodityModule {
}

.commodityLeft li:nth-child(1) {
  margin-top: 10px;
}

.commodityLeft {
  height: 240px;
  width: 210px;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.commodityRight li:nth-child(1) {
  margin-top: 10px;
}

.commodityRight {
  height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
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
  width: 210px;
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
  width: 210px;
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

.listCommon {
  min-height: 260px;
  display: flex;
  width: 100%;
  margin-top: 24px;
}

.listCommon > div:nth-child(1) {
  height: 260px;
  padding-top: 5px;
  width: 80px;
}

.listCommon > div:nth-child(2) {
  min-height: 260px;
  width: 750px;
  margin-left: 4px;
  overflow: hidden;
}

.listPath {
  display: flex;
  align-items: center;
  height: 30px;
  margin-top: 24px;
}

.listPath > div:nth-child(2) {
  margin-left: 14px;
}

.listPath input {
  width: 436px;
  height: 32px;
  border: 1px solid #d1d1d1;
  line-height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.grayIconlabel {
  width: 80px;
  height: 28px;
  border-radius: 4px;
  line-height: 28px;
  color: #fff;
  background-color: #fe5371;
  cursor: pointer;
  text-align: center;
  display: block;
}

.listImg {
  margin-top: 24px;
  height: 52px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.listImg > div:nth-child(2) > div:nth-child(1) {
  width: 142px;
  height: 52px;
  border: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.listImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 24px;
}

.listImg > div:nth-child(2) {
  width: 250px;
  height: 52px;
  margin-left: 14px;
  display: flex;
  align-items: center;
}

.listImg > div:nth-child(1) {
  height: 30px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
}

.listImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.comone {
  margin-top: 24px;
  height: 30px;
  display: flex;
  align-items: center;
}

.comone > div:nth-child(1) {
  height: 30px;
  line-height: 28px;
}

.comone > div:nth-child(2) {
  margin-top: 5px;
  margin-left: 12px;
}

.comone > div:nth-child(2) small {
  margin-left: 8px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) small {
  margin-left: 8px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) {
  margin-top: 5px;
  overflow: hidden;
  margin-left: 30px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
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