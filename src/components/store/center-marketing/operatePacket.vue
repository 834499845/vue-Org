<!--营销中心-优惠券-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
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
                    <div class="list-contOne">
                        <div>
                            活动名称：
                        </div>
                        <div>
                            <input type="text" :class="{redInput:isRedname,grayInput:isGrayname}" v-model="name" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedname,grayTest:isGrayname}">
                            最多10个字符
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            最小订单金额：
                        </div>
                        <div>
                            <input id="operaInput" type="text" :class="{redInput:isRedorderAmount,grayInput:isGrayorderAmount}" v-model="orderAmount"
                                maxlength="20">
                        </div>
                        <div :class="{redTest:isRedorderAmount,grayTest:isGrayorderAmount}">
                            只能填写数字
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            红包金额：
                        </div>
                        <div>
                            <input type="text" :class="{redInput:isReddiscountAmount,grayInput:isGraydiscountAmount}" v-model="discountAmount" maxlength="20"
                                :disabled='discountDisa'>
                        </div>
                        <div :class="{redTest:isReddiscountAmount,grayTest:isGraydiscountAmount}">
                            只能填写数字
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            发放数量：
                        </div>
                        <div>
                            <input type="text" :class="{redInput:isRednumber,grayInput:isGraynumber}" v-model="number" maxlength="20">
                        </div>
                        <div :class="{redTest:isRednumber,grayTest:isGraynumber}">
                            只能填写数字
                        </div>
                    </div>
                    <div class="startTime">
                        <div>
                            发放日期：
                        </div>
                        <div>
                            <!--<el-date-picker @change="issueDateChange" v-model="issueDate" type="datetime" placeholder="选择起始时间">
                            </el-date-picker>-->
                            <DatePicker type="datetime" @on-change="issueDateChange" format="yyyy-MM-dd HH:mm:ss" @on-clear="issueClearDateChange" v-model="issueDate"
                                placeholder="选择日期和时间"></DatePicker>
                        </div>
                        <div>
                            至
                        </div>
                        <div>
                            <!--<el-date-picker @change="endingDateChange" v-model="endingDate" type="datetime" placeholder="选择结束时间">
                            </el-date-picker>-->
                            <template>
                                <DatePicker type="datetime" @on-change="endingDateChange" format="yyyy-MM-dd HH:mm:ss" v-model="endingDate" placeholder="选择日期和时间"></DatePicker>
                            </template>
                        </div>
                        <div :class="{redTest:isRedendingDate,grayTest:isGrayendingDate}">
                            结束时间必须大于起始时间
                        </div>
                    </div>
                    <div class="startTime">
                        <div>
                            使用日期：
                        </div>
                        <div>
                            <template>
                                <DatePicker type="datetime" v-model="firsDate" placeholder="选择日期和时间"></DatePicker>
                            </template>
                        </div>
                        <div>
                            至
                        </div>
                        <div>
                            <template>
                                <DatePicker type="datetime" v-model="lastDate" placeholder="选择日期和时间"></DatePicker>
                            </template>
                        </div>
                        <div :class="{redTest:isRedlastDate,grayTest:isGraylastDate}">
                            结束时间必须大于起始时间
                        </div>
                    </div>
                    <div class="comone list-contOne">
                        <div>
                            如何发放：
                        </div>
                        <div>
                            <el-checkbox v-model="selectType" @change="grantChange(1)"></el-checkbox><small>按商品类目</small>
                        </div>
                        <div>
                            <el-checkbox v-model="selectCommodity" @change="grantChange(2)"></el-checkbox><small>按商品发放</small>
                        </div>
                    </div>
                    <!--按类目发放-->
                    <div class="granttype" v-show="selectType">
                        <div>
                            一级类目：
                        </div>
                        <div>
                            <select @change="selectOneTypesClick" v-model="OneType">
                                 <option v-for="(type,index) in OneTypes"  v-bind:value="index">{{type.name}}</option>
                            </select>
                        </div>
                        <div>
                            二级类目：
                        </div>
                        <div>
                            <select @change="selectTwoTypesClick" v-model="TwoType">
                                 <option v-for="(type,index) in TwoTypes"  v-bind:value="index">{{type.name}}</option>
                            </select>
                        </div>
                        <div>
                            三级类目：
                        </div>
                        <div>
                            <select @change="selectTherrTypesClick" v-model="TherrType">
                                 <option v-for="(type,index) in TherrTypes"  v-bind:value="index">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <!--按商品发放-->
                    <div class="grantSearch" v-show="selectCommodity">
                        <div>
                            搜索商品：
                        </div>
                        <div>
                            <select @change="selectsearchtypesClick" v-model="searchtype">
                                 <option v-for="(type,index) in searchtypes"  v-bind:value="type.path">{{type.name}}</option>
                            </select>
                        </div>
                        <div>
                            <select @change="selectbrandClick" v-model="brand">
                                 <option v-for="(type,index) in brands"  v-bind:value="type.id">{{type.chinaName}}</option>
                            </select>
                        </div>
                        <div>
                            <div @click="searchCommonityClick">确定</div>
                        </div>
                    </div>
                    <div class="grantCommodity" v-show="selectCommodity">
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
                    <div class="but">
                        <div @click="addClick">确定</div>
                        <div @click="backClick">取消</div>
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
      discountDisa: false,
      isRedname: false,
      isGrayname: true,
      isName: false,
      isRedorderAmount: false,
      isGrayorderAmount: true,
      isorderAmount: false,
      isReddiscountAmount: false,
      isGraydiscountAmount: true,
      isdiscountAmount: false,
      isRednumber: false,
      isGraynumber: true,
      isnumber: false,
      isRedendingDate: false,
      isGrayendingDate: true,
      isendingDate: false,
      isRedlastDate: false,
      isGraylastDate: true,
      islastDate: false,
      isRedrightLists: false,
      isGrayrightLists: true,
      isrightLists: false,
      isBgcolor: true,
      selectType: true,
      selectCommodity: false,
      title: "添加优惠券",
      loading: false,
      issueDate: "", //开始发行日期时间戳
      issuetamp: "",
      endingDate: "", //结束发行日期时间戳
      endingtamp: "",
      issueTime: "", //开始发行日期
      endingTime: "", //结束发行日期
      firsDate: "", //开始使用日期时间戳
      firstamp: "",
      lastDate: "", //结束使用日期时间戳
      lasttamp: "",
      firsTime: "", //开始使用日期
      lastTime: "", //结束使用日期
      name: "", //活动名称
      shopName: "", //商家名称
      discountAmount: "", //优惠金额
      orderAmount: "", //订单最小金额
      number: "", //优惠券数量
      leftLists: [],
      rightLists: [],
      OneType: 0,
      OneTypes: [
        {
          name: "全部"
        }
      ],
      TwoType: 0,
      TwoTypes: [
        {
          name: "请选择"
        }
      ],
      TherrType: 0,
      TherrTypes: [
        {
          name: "请选择"
        }
      ],
      searchtypes: [
        {
          name: "所有类目",
          path: 9999999
        }
      ],
      searchtype: 9999999,
      brands: [
        {
          chinaName: "所有品牌",
          id: 9999999
        }
      ],
      brand: 9999999,
      addClickTrue: false,
      searchCommonityClickTrue: false
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
            if (one.name == "营销中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("marketing") == -1) {
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
        if (comms.indexOf("packet") == -1) {
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
          var operation = "";
          operation = self.$route.query.operation;
          self.typeFun();
          self.brandsFun();
          if (operation == 1) {
            self.title = "添加优惠券";
            self.commonsFun();
            self.typesFun();
            self.discountDisa = false;
          } else {
            self.loading = true;
            self.title = "修改优惠券";
            self.commonsFun();
            self.typesFun();
            self.updetaCommFun();
            self.discountDisa = true;
          }
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
    // 三级分类
    typeFun() {
      var self = this;
      self
        .getstoreclassficationfindByLevelAndId({
          level: 3
        })
        .then(data => {
          self.loading = false;
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
    // 商品品牌
    brandsFun() {
      var self = this;
      self.loading = true;
      self
        .getstorebrandfindPage({
          pageNo: 1,
          pageSize: 1000
        })
        .then(data => {
          self.loading = false;
          //   console.log("品牌列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  data.data.records.forEach(function(ele) {
                    self.brands.push(ele);
                  });
                  self.brand = self.brands[0].id;
                } else {
                  self.brands = [];
                }
              } else {
                self.brands = [];
              }
            } else {
              self.brands = [];
            }
          } else {
            self.brands = [];
            self.$message({
              type: "info",
              message: "获取失败!"
            });
          }
        })
        .catch(msg => {
          self.brands = [];
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "获取失败!"
          });
        });
    },
    // 按类目搜索商品
    selectsearchtypesClick() {},
    // 按品牌搜索商品
    selectbrandClick() {},
    // 确认搜索商品
    searchCommonityClick() {
      var self = this;
      if (self.searchCommonityClickTrue == false) {
        self.leftLists = [];
        var searchObj = {};
        if (self.brand == 9999999 && self.searchtype == 9999999) {
          searchObj = {
            pageNo: 1,
            pageSize: 100,
            logicDelete: 0
          };
        } else if (self.brand != 9999999 && self.searchtype == 9999999) {
          searchObj = {
            pageNo: 1,
            pageSize: 100,
            logicDelete: 0,
            brandId: self.brand
          };
        } else if (self.brand == 9999999 && self.searchtype != 9999999) {
          searchObj = {
            pageNo: 1,
            pageSize: 100,
            logicDelete: 0,
            classFliy: self.searchtype
          };
        } else {
          searchObj = {
            pageNo: 1,
            pageSize: 100,
            logicDelete: 0,
            brandId: self.brand,
            classFliy: self.searchtype
          };
        }
        self.searchCommonityClickTrue = true;
        self
          .getstoreproductList(searchObj)
          .then(data => {
            self.loading = false;
            self.searchCommonityClickTrue = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length > 0) {
                    var dataArr = [];
                    // dataArr = data.data.records;
                    data.data.records.forEach(function(ele) {
                      dataArr.push({
                        productName: ele.productName,
                        id: ele.id,
                        bgcolor: false
                      });
                    });
                    self.leftLists = dataArr;
                    self.leftLists.forEach(function(ele, ind) {
                      ele.bgcolor = false;
                    });
                    self.leftLists.forEach(function(ele, ind) {
                      self.rightLists.forEach(function(item, index) {
                        if (ele.id == item.id) {
                          ele.bgcolor = true;
                        }
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
            self.searchCommonityClickTrue = false;
            self.leftLists = [];
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 修改时获取商品的信息
    updetaCommFun() {
      var self = this;
      self
        .getstorecouponfindById({
          id: self.$route.query.id
        })
        .then(data => {
          self.loading = false;
          //   console.log("优惠券详情", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              var newDate1 = new Date();
              newDate1.setTime(data.data.firsDate);
              // self.firsDate = newDate1.toString();
              self.firsDate = data.data.firsDate;
              var newDate2 = new Date();
              newDate2.setTime(data.data.lastDate);
              // self.lastDate = newDate2.toString();
              self.lastDate = data.data.lastDate;
              var newDate3 = new Date();
              newDate3.setTime(data.data.issueDate);
              // self.issueDate = newDate3.toString();
              self.issueDate = data.data.issueDate;
              var newDate4 = new Date();
              newDate4.setTime(data.data.endingDate);
              // self.endingDate = newDate4.toString();
              self.endingDate = data.data.endingDate;
              self.name = data.data.name;
              self.shopName = data.data.shopName;
              self.discountAmount = data.data.discountAmount;
              self.orderAmount = data.data.orderAmount;
              self.number = data.data.number;
              if (data.data.type == 3) {
                // 按商品类目
                self.selectType = true;
                self.selectCommodity = false;
              } else {
                // 按商品发放
                self.selectType = false;
                self.selectCommodity = true;
              }
              // 根据发放形式来进行判断已有的数据
              if (data.data.type == 2) {
                // 通过切割path获取商品对应id，以此遍历获取选中的数据
                var pathArray = [];
                var pathStr = data.data.path;
                if (pathStr) {
                  if (pathStr.length > 0 && pathStr.indexOf("#") != -1) {
                    if (pathStr.indexOf("#")) {
                      pathArray = pathStr.split("#");
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
                    pageSize: 30,
                    logicDelete: 0
                  })
                  .then(data => {
                    self.loading = false;
                    if (data.code == 200) {
                      if (data.data) {
                        if (data.data.records) {
                          if (data.data.records.length > 0) {
                            var dataArr = [];
                            // dataArr = data.data.records;
                            data.data.records.forEach(function(ele) {
                              dataArr.push({
                                productName: ele.productName,
                                id: ele.id,
                                bgcolor: false
                              });
                            });
                            self.leftLists = dataArr;
                            self.leftLists.forEach(function(ele, ind) {
                              pathArray.forEach(function(item, index) {
                                if (ele.id == item) {
                                  self.leftLists[ind].bgcolor = true;
                                  self.rightLists.push({
                                    productName: ele.productName,
                                    id: ele.id,
                                    bgcolor: false
                                  });
                                }
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
                    // console.log(msg);
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              } else {
                // 通过path切割来获取一二三级别的分类的id来进行标记
                var pathStr = data.data.path;
                if (pathStr.indexOf("#")) {
                  var pathArr = pathStr.split("#");
                  if (pathStr == "1#") {
                    self.OneType = 0;
                  } else if (pathArr.length == 2) {
                    var onePath = pathStr;
                    self
                      .getstoreclassfindByLevelAndId({
                        level: 1
                      })
                      .then(dataOne => {
                        self.loading = false;
                        if (dataOne.code == 200) {
                          if (dataOne.data) {
                            if (dataOne.data.length > 0) {
                              dataOne.data.forEach(function(ele) {
                                self.OneTypes.push(ele);
                              });
                              // if (onePath == "1#") {
                              //   self.OneType = 0;
                              // } else {
                              self.OneTypes.forEach(function(ele, ind) {
                                if (ele.path == onePath) {
                                  self.OneType = ind;
                                }
                              });
                              // }
                            } else {
                              self.OneTypes = [];
                            }
                          } else {
                            self.OneTypes = [];
                          }
                        } else {
                          self.OneTypes = [];
                          self.$message({
                            type: "info",
                            message: dataOne.message
                          });
                        }
                      })
                      .catch(msg => {
                        // console.log(msg);
                        self.loading = false;
                        self.OneTypes = [];
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
                      });
                  } else if (pathArr.length == 3) {
                    var onePath = pathArr[0] + "#" + pathArr[1];
                    // var onePath = "";
                    var twoPath = pathStr;
                    self
                      .getstoreclassfindByLevelAndId({
                        level: 1
                      })
                      .then(dataOne => {
                        self.loading = false;
                        if (dataOne.code == 200) {
                          if (dataOne.data) {
                            if (dataOne.data.length > 0) {
                              dataOne.data.forEach(function(ele) {
                                self.OneTypes.push(ele);
                              });
                              // if (onePath == "1#") {
                              //   self.OneType = 0;
                              // } else {
                              self.OneTypes.forEach(function(ele, ind) {
                                if (ele.path == onePath) {
                                  self.OneType = ind;
                                }
                              });
                              // }
                              self
                                .getstoreclassficationfindByLevelAndId({
                                  pid: self.OneTypes[self.OneType].id
                                })
                                .then(dataTwo => {
                                  self.loading = false;
                                  if (dataTwo.code == 200) {
                                    if (dataTwo.data) {
                                      if (dataTwo.data.length > 0) {
                                        dataTwo.data.forEach(function(ele) {
                                          self.TwoTypes.push(ele);
                                        });
                                        // self.TwoType = 0;
                                        self.TwoTypes.forEach(function(
                                          ele,
                                          ind
                                        ) {
                                          if (ele.path == twoPath) {
                                            self.TwoType = ind;
                                          }
                                        });
                                      } else {
                                        self.TwoTypes = [
                                          {
                                            name: "请选择"
                                          }
                                        ];
                                        self.TwoType = 0;
                                      }
                                    } else {
                                      self.TwoTypes = [];
                                    }
                                  } else {
                                    self.TwoTypes = [];
                                    self.$message({
                                      type: "info",
                                      message: dataTwo.message
                                    });
                                  }
                                })
                                .catch(msg => {
                                  //   console.log(msg);
                                  self.loading = false;
                                  self.TwoTypes = [];
                                  self.$message({
                                    type: "info",
                                    message: "服务器错误"
                                  });
                                });
                            } else {
                              self.OneTypes = [];
                            }
                          } else {
                            self.OneTypes = [];
                          }
                        } else {
                          self.OneTypes = [];
                          self.$message({
                            type: "info",
                            message: dataOne.message
                          });
                        }
                      })
                      .catch(msg => {
                        // console.log(msg);
                        self.loading = false;
                        self.OneTypes = [];
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
                      });
                  } else if (pathArr.length == 4) {
                    var onePath = pathArr[0] + "#" + pathArr[1];
                    var twoPath =
                      pathArr[0] + "#" + pathArr[1] + "#" + pathArr[2];
                    var threePath = pathStr;
                    self
                      .getstoreclassfindByLevelAndId({
                        level: 1
                      })
                      .then(dataOne => {
                        self.loading = false;
                        if (dataOne.code == 200) {
                          if (dataOne.data) {
                            if (dataOne.data.length > 0) {
                              dataOne.data.forEach(function(ele) {
                                self.OneTypes.push(ele);
                              });
                              self.OneTypes.forEach(function(ele, ind) {
                                if (ele.path == onePath) {
                                  self.OneType = ind;
                                }
                              });
                              self
                                .getstoreclassficationfindByLevelAndId({
                                  pid: self.OneTypes[self.OneType].id
                                })
                                .then(dataTwo => {
                                  self.loading = false;
                                  if (dataTwo.code == 200) {
                                    if (dataTwo.data) {
                                      if (dataTwo.data.length > 0) {
                                        dataTwo.data.forEach(function(ele) {
                                          self.TwoTypes.push(ele);
                                        });
                                        self.TwoTypes.forEach(function(
                                          ele,
                                          ind
                                        ) {
                                          if (ele.path == twoPath) {
                                            self.TwoType = ind;
                                          }
                                        });
                                        self
                                          .getstoreclassficationfindByLevelAndId(
                                            {
                                              pid:
                                                self.TwoTypes[self.TwoType].id
                                            }
                                          )
                                          .then(dataThr => {
                                            self.loading = false;
                                            if (dataThr.code == 200) {
                                              if (dataThr.data) {
                                                if (dataThr.data.length > 0) {
                                                  dataThr.data.forEach(function(
                                                    ele
                                                  ) {
                                                    self.TherrTypes.push(ele);
                                                  });
                                                  // self.TherrType = 0;
                                                  self.TherrTypes.forEach(
                                                    function(ele, ind) {
                                                      if (
                                                        ele.path == threePath
                                                      ) {
                                                        self.TherrType = ind;
                                                      }
                                                    }
                                                  );
                                                } else {
                                                  self.TherrTypes = [
                                                    {
                                                      name: "请选择"
                                                    }
                                                  ];
                                                  self.TherrType = 0;
                                                }
                                              } else {
                                                self.TherrTypes = [];
                                              }
                                            } else {
                                              self.TherrTypes = [];
                                              self.$message({
                                                type: "info",
                                                message: dataThr.message
                                              });
                                            }
                                          })
                                          .catch(msg => {
                                            // console.log(msg);
                                            self.loading = false;
                                            self.TherrTypes = [];
                                            self.$message({
                                              type: "info",
                                              message: "服务器错误"
                                            });
                                          });
                                      } else {
                                        self.TwoTypes = [
                                          {
                                            name: "请选择"
                                          }
                                        ];
                                        self.TwoType = 0;
                                      }
                                    } else {
                                      self.TwoTypes = [];
                                    }
                                  } else {
                                    self.$message({
                                      type: "info",
                                      message: dataTwo.message
                                    });
                                    self.TwoTypes = [];
                                  }
                                })
                                .catch(msg => {
                                  //   console.log(msg);
                                  self.loading = false;
                                  self.TwoTypes = [];
                                  self.$message({
                                    type: "info",
                                    message: "服务器错误"
                                  });
                                });
                            } else {
                              self.OneTypes = [];
                            }
                          } else {
                            self.OneTypes = [];
                          }
                        } else {
                          self.OneTypes = [];
                          self.$message({
                            type: "info",
                            message: dataOne.message
                          });
                        }
                      })
                      .catch(msg => {
                        // console.log(msg);
                        self.loading = false;
                        self.OneTypes = [];
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
                      });
                    //   } else if (pathArr.length == 4) {
                    var onePath = pathArr[0] + "#" + pathArr[1];
                    var twoPath =
                      pathArr[0] + "#" + pathArr[1] + "#" + pathArr[2];
                    var thrPath = pathStr;
                    self
                      .getstoreclassfindByLevelAndId({
                        level: 1
                      })
                      .then(dataOne => {
                        self.loading = false;
                        if (dataOne.code == 200) {
                          if (dataOne.data) {
                            if (dataOne.data.length > 0) {
                              dataOne.data.forEach(function(ele) {
                                self.OneTypes.push(ele);
                              });
                              self.OneTypes.forEach(function(ele, ind) {
                                if (ele.path == onePath) {
                                  self.OneType = ind;
                                }
                              });
                              self
                                .getstoreclassficationfindByLevelAndId({
                                  pid: self.OneTypes[self.OneType].id
                                })
                                .then(dataTwo => {
                                  self.loading = false;
                                  if (dataTwo.code == 200) {
                                    if (dataTwo.data) {
                                      if (dataTwo.data.length > 0) {
                                        dataTwo.data.forEach(function(ele) {
                                          self.TwoTypes.push(ele);
                                        });
                                        self.TwoTypes.forEach(function(
                                          ele,
                                          ind
                                        ) {
                                          if (ele.path == twoPath) {
                                            self.TwoType = ind;
                                          }
                                        });
                                        self
                                          .getstoreclassficationfindByLevelAndId(
                                            {
                                              pid:
                                                self.TwoTypes[self.TwoType].id
                                            }
                                          )
                                          .then(dataThr => {
                                            self.loading = false;
                                            if (dataThr.code == 200) {
                                              if (dataThr.data) {
                                                if (dataThr.data.length > 0) {
                                                  dataThr.data.forEach(function(
                                                    ele
                                                  ) {
                                                    self.TherrTypes.push(ele);
                                                  });
                                                  self.TherrTypes.forEach(
                                                    function(ele, ind) {
                                                      if (ele.path == thrPath) {
                                                        self.TherrType = ind;
                                                      }
                                                    }
                                                  );
                                                } else {
                                                  self.TherrTypes = [
                                                    {
                                                      name: "请选择"
                                                    }
                                                  ];
                                                  self.TherrType = 0;
                                                }
                                              } else {
                                                self.TherrTypes = [];
                                              }
                                            } else {
                                              self.TherrTypes = [];
                                              self.$message({
                                                type: "info",
                                                message: dataThr.message
                                              });
                                            }
                                          })
                                          .catch(msg => {
                                            // console.log(msg);
                                            self.loading = false;
                                            self.TherrTypes = [];
                                            self.$message({
                                              type: "info",
                                              message: "服务器错误"
                                            });
                                          });
                                      } else {
                                        self.TwoTypes = [
                                          {
                                            name: "请选择"
                                          }
                                        ];
                                        self.TwoType = 0;
                                      }
                                    } else {
                                      self.TwoTypes = [];
                                    }
                                  } else {
                                    self.TwoTypes = [];
                                    self.$message({
                                      type: "info",
                                      message: dataTwo.message
                                    });
                                  }
                                })
                                .catch(msg => {
                                  //   console.log(msg);
                                  self.loading = false;
                                  self.TwoTypes = [];
                                  self.$message({
                                    type: "info",
                                    message: "服务器错误"
                                  });
                                });
                            } else {
                              self.OneTypes = [];
                            }
                          } else {
                            self.OneTypes = [];
                          }
                        } else {
                          self.OneTypes = [];
                          self.$message({
                            type: "info",
                            message: dataOne.message
                          });
                        }
                      })
                      .catch(msg => {
                        // console.log(msg);
                        self.loading = false;
                        self.OneTypes = [];
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
                      });
                  }
                }
              }
            } else {
              self.$message({
                type: "info",
                message: data.message || "暂无数据"
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
      self.leftLists = [];
      self
        .getstoreproductList({
          pageNo: 1,
          pageSize: 30,
          logicDelete: 0
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var dataArr = [];
                  data.data.records.forEach(function(ele) {
                    dataArr.push({
                      productName: ele.productName,
                      id: ele.id,
                      bgcolor: false
                    });
                  });
                  self.leftLists = dataArr;
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
    // 查询一级分类
    typesFun() {
      var self = this;
      self
        .getstoreclassfindByLevelAndId({
          level: 1
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele) {
                  self.OneTypes.push(ele);
                });
                self.OneType = 0;
              } else {
                self.OneTypes = [];
              }
            } else {
              self.OneTypes = [];
            }
          } else {
            self.OneTypes = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.OneTypes = [];
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 一级类目
    selectOneTypesClick() {
      var self = this;
      self.TwoTypes = [
        {
          name: "请选择"
        }
      ];
      if (self.OneType == 0) {
        self.TwoType == 0;
      } else {
        self
          .getstoreclassficationfindByLevelAndId({
            pid: self.OneTypes[self.OneType].id
          })
          .then(data => {
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                self.TwoType = 0;
                if (data.data.length > 0) {
                  data.data.forEach(function(ele) {
                    self.TwoTypes.push(ele);
                  });
                } else {
                  self.TwoTypes = [
                    {
                      name: "请选择"
                    }
                  ];
                }
              } else {
                self.TwoTypes = [];
              }
            } else {
              self.TwoTypes = [];
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            // console.log(msg);
            self.loading = false;
            self.TwoTypes = [];
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 二级类目
    selectTwoTypesClick() {
      var self = this;
      self.TherrTypes = [
        {
          name: "请选择"
        }
      ];
      if (self.TwoType == 0) {
        self.TherrType = 0;
      } else {
        self
          .getstoreclassficationfindByLevelAndId({
            pid: self.TwoTypes[self.TwoType].id
          })
          .then(data => {
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                self.TherrType = 0;
                if (data.data.length > 0) {
                  data.data.forEach(function(ele) {
                    self.TherrTypes.push(ele);
                  });
                } else {
                  self.TherrTypes = [
                    {
                      name: "请选择"
                    }
                  ];
                }
              } else {
                self.TherrTypes = [];
              }
            } else {
              self.TherrTypes = [];
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            // console.log(msg);
            self.loading = false;
            self.TherrTypes = [];
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 三级类目
    selectTherrTypesClick() {},
    // 取消选中商品
    rightListClick(index) {
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
      self.leftLists.forEach(function(ele, ind) {
        ele.bgcolor = false;
      });
      self.leftLists.forEach(function(ele, ind) {
        self.rightLists.forEach(function(item, index) {
          if (ele.id == item.id) {
            ele.bgcolor = true;
          }
        });
      });
    },
    // 添加选中商品
    leftListClick(index) {
      this.leftLists[index].bgcolor = !this.leftLists[index].bgcolor;
    },
    commodityLeftClick() {
      var self = this;
      // self.rightLists = [];
      self.leftLists.forEach(function(ele, ind) {
        if (ele.bgcolor == true) {
          self.rightLists.push({
            productName: ele.productName,
            id: ele.id,
            bgcolor: false
          });
        }
      });
      // 数组去重
      var hash = {};
      self.rightLists = self.rightLists.reduce(function(
        item,
        next
      ) {
        hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
        return item;
      },
      []);
    },
    // 选择发放形式
    grantChange(index) {
      if (index == 1) {
        this.selectType = true;
        this.selectCommodity = false;
      } else {
        this.selectType = false;
        this.selectCommodity = true;
      }
    },
    // 确认添加或者修改
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var operation = "";
        operation = self.$route.query.operation;
        if (
          self.issueDate.toString().length &&
          self.endingDate.toString().length
        ) {
          var issueDateTime = new Date(self.issueDate);
          var endingDateTime = new Date(self.endingDate);
          if (issueDateTime.getTime() < endingDateTime.getTime()) {
            self.isendingDate = true;
          } else {
            self.isendingDate = false;
          }
        } else {
          self.isendingDate = false;
        }
        if (
          self.firsDate.toString().length &&
          self.lastDate.toString().length
        ) {
          var firsDateTime = new Date(self.firsDate);
          var lastDateTime = new Date(self.lastDate);
          if (firsDateTime.getTime() < lastDateTime.getTime()) {
            self.islastDate = true;
          } else {
            self.islastDate = false;
          }
        } else {
          self.islastDate = false;
        }
        if (operation == 1) {
          // 添加
          if (
            self.isName == true &&
            self.isorderAmount == true &&
            self.isdiscountAmount == true &&
            self.isnumber == true &&
            self.isendingDate == true &&
            self.islastDate == true
          ) {
            var pathStr = "";
            var typeStr = "3";
            var typsArr = [];
            self.issueTime = self.timeFun(self.issueDate);
            self.endingTime = self.timeFun(self.endingDate);
            self.firsTime = self.timeFun(self.firsDate);
            self.lastTime = self.timeFun(self.lastDate);
            if (self.selectType == true) {
              typeStr = "3";
              if (self.TherrType != 0) {
                pathStr = self.TherrTypes[self.TherrType].path;
              } else if (self.TwoType != 0) {
                pathStr = self.TwoTypes[self.TwoType].path;
              } else if (self.OneType != 0) {
                pathStr = self.OneTypes[self.OneType].path;
              } else if (self.OneType == 0) {
                pathStr = "1#";
              }
              self.loading = true;
              self.addClickTrue = true;
              self
                .getstorecouponadd({
                  name: self.name,
                  discountAmount: self.discountAmount,
                  orderAmount: self.orderAmount,
                  number: self.number,
                  firsDate: self.firsTime,
                  lastDate: self.lastTime,
                  issueDate: self.issueTime,
                  endingDate: self.endingTime,
                  path: pathStr,
                  type: typeStr,
                  issueState: 1
                })
                .then(data => {
                  self.loading = false;
                  self.addClickTrue = false;
                  // console.log("新增优惠券", JSON.parse(JSON.stringify(data)));
                  if (data.code == 200) {
                    self.$message({
                      type: "success",
                      message: "新增优惠券成功!"
                    });
                    self.$router.push({
                      path: "/store/marketing/packet"
                    });
                    self.issueDate = "";
                    self.endingDate = "";
                    self.firsDate = "";
                    self.lastDate = "";
                    self.name = "";
                    self.discountAmount = "";
                    self.orderAmount = "";
                    self.number = "";
                    self.typesFun();
                    self.commonsFun();
                    self.selectType = true;
                    self.selectCommodity = false;
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
              typeStr = "2";
              self.rightLists.forEach(function(ele) {
                typsArr.push(ele.id);
              });
              if (typsArr.length > 0) {
                self.isRedrightLists = false;
                self.isGrayrightLists = true;
                pathStr = typsArr.join("#");
                self.loading = true;
                self.addClickTrue = true;
                self
                  .getstorecouponadd({
                    name: self.name,
                    discountAmount: self.discountAmount,
                    orderAmount: self.orderAmount,
                    number: self.number,
                    firsDate: self.firsTime,
                    lastDate: self.lastTime,
                    issueDate: self.issueTime,
                    endingDate: self.endingTime,
                    path: pathStr,
                    type: typeStr,
                    issueState: 1
                  })
                  .then(data => {
                    self.loading = false;
                    self.addClickTrue = false;
                    if (data.code == 200) {
                      self.$message({
                        type: "success",
                        message: "新增优惠券成功!"
                      });
                      self.$router.push({
                        path: "/store/marketing/packet"
                      });
                      self.issueDate = "";
                      self.endingDate = "";
                      self.firsDate = "";
                      self.lastDate = "";
                      self.name = "";
                      self.discountAmount = "";
                      self.orderAmount = "";
                      self.number = "";
                      self.typesFun();
                      self.commonsFun();
                      self.selectType = true;
                      self.selectCommodity = false;
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
                self.isRedrightLists = true;
                self.isGrayrightLists = false;
              }
            }
          } else {
            if (self.isName == false) {
              self.isRedname = true;
              self.isGrayname = false;
            } else {
              self.isRedname = false;
              self.isGrayname = true;
            }
            if (self.isorderAmount == false) {
              self.isRedorderAmount = true;
              self.isGrayorderAmount = false;
            } else {
              self.isRedorderAmount = false;
              self.isGrayorderAmount = true;
            }
            if (self.isdiscountAmount == false) {
              self.isReddiscountAmount = true;
              self.isGraydiscountAmount = false;
            } else {
              self.isReddiscountAmount = false;
              self.isGraydiscountAmount = true;
            }
            if (self.isnumber == false) {
              self.isRednumber = true;
              self.isGraynumber = false;
            } else {
              self.isRednumber = false;
              self.isGraynumber = true;
            }
            if (self.isendingDate == false) {
              self.isRedendingDate = true;
              self.isGrayendingDate = false;
            } else {
              self.isRedendingDate = false;
              self.isGrayendingDate = true;
            }
            if (self.islastDate == false) {
              self.isRedlastDate = true;
              self.isGraylastDate = false;
            } else {
              self.isRedlastDate = false;
              self.isGraylastDate = true;
            }
          }
        } else {
          // 修改
          if (
            self.isName == true &&
            self.isorderAmount == true &&
            self.isdiscountAmount == true &&
            self.isnumber == true &&
            self.isendingDate == true &&
            self.islastDate == true
          ) {
            var pathStr = "";
            var typeStr = "";
            var typsArr = [];
            self.issueTime = self.timeFun(self.issueDate);
            self.endingTime = self.timeFun(self.endingDate);
            self.firsTime = self.timeFun(self.firsDate);
            self.lastTime = self.timeFun(self.lastDate);
            if (self.selectType == true) {
              typeStr = "3";
              if (self.TherrType != 0) {
                pathStr = self.TherrTypes[self.TherrType].path;
              } else if (self.TwoType != 0) {
                pathStr = self.TwoTypes[self.TwoType].path;
              } else if (self.OneType != 0) {
                pathStr = self.OneTypes[self.OneType].path;
              } else if (self.OneType == 0) {
                pathStr = "1#";
              }
              self.loading = true;
              self.addClickTrue = true;
              self
                .getstorecouponupdateById({
                  id: self.$route.query.id,
                  name: self.name,
                  discountAmount: self.discountAmount,
                  orderAmount: self.orderAmount,
                  number: self.number,
                  firsDate: self.firsTime,
                  lastDate: self.lastTime,
                  issueDate: self.issueTime,
                  endingDate: self.endingTime,
                  path: pathStr,
                  type: typeStr,
                  issueState: 1
                })
                .then(data => {
                  self.loading = false;
                  self.addClickTrue = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "success",
                      message: "修改优惠券成功!"
                    });
                    self.$router.push({
                      path: "/store/marketing/packet"
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
                    message: "服务器错误"
                  });
                });
            } else {
              typeStr = "2";
              self.rightLists.forEach(function(ele) {
                typsArr.push(ele.id);
              });
              if (typsArr.length > 0) {
                self.isRedrightLists = false;
                self.isGrayrightLists = true;
                pathStr = typsArr.join("#");
                self.loading = true;
                self.addClickTrue = true;
                self
                  .getstorecouponupdateById({
                    id: self.$route.query.id,
                    name: self.name,
                    discountAmount: self.discountAmount,
                    orderAmount: self.orderAmount,
                    number: self.number,
                    firsDate: self.firsTime,
                    lastDate: self.lastTime,
                    issueDate: self.issueTime,
                    endingDate: self.endingTime,
                    path: pathStr,
                    type: typeStr,
                    issueState: 1
                  })
                  .then(data => {
                    self.loading = false;
                    self.addClickTrue = false;
                    if (data.code == 200) {
                      self.$message({
                        type: "success",
                        message: "修改优惠券成功!"
                      });
                      self.$router.push({
                        path: "/store/marketing/packet"
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
                      message: "服务器错误"
                    });
                  });
              } else {
                self.isRedrightLists = true;
                self.isGrayrightLists = false;
              }
            }
          } else {
            if (self.isName == false) {
              self.isRedname = true;
              self.isGrayname = false;
            } else {
              self.isRedname = false;
              self.isGrayname = true;
            }
            if (self.isorderAmount == false) {
              self.isRedorderAmount = true;
              self.isGrayorderAmount = false;
            } else {
              self.isRedorderAmount = false;
              self.isGrayorderAmount = true;
            }
            if (self.isdiscountAmount == false) {
              self.isReddiscountAmount = true;
              self.isGraydiscountAmount = false;
            } else {
              self.isReddiscountAmount = false;
              self.isGraydiscountAmount = true;
            }
            if (self.isnumber == false) {
              self.isRednumber = true;
              self.isGraynumber = false;
            } else {
              self.isRednumber = false;
              self.isGraynumber = true;
            }
            if (self.isendingDate == false) {
              self.isRedendingDate = true;
              self.isGrayendingDate = false;
            } else {
              self.isRedendingDate = false;
              self.isGrayendingDate = true;
            }
            if (self.islastDate == false) {
              self.isRedlastDate = true;
              self.isGraylastDate = false;
            } else {
              self.isRedlastDate = false;
              self.isGraylastDate = true;
            }
          }
        }
      }
    },
    // 日期转化方法
    timeFun(val) {
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
      var seconds = now.getSeconds();
      seconds = seconds > 9 ? seconds : "0" + seconds;
      return (
        "20" +
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        seconds
      );
    },
    issueClearDateChange() {},
    // 发放起始日期
    issueDateChange() {
      var self = this;
    },
    // 发放结束日期
    endingDateChange() {
      var self = this;
    },
    // 使用起始日期
    firsDateChange() {
      var self = this;
    },
    // 使用结束日期
    lastDateChange() {
      var self = this;
    },
    // 箭头返回上一页/取消按钮
    backClick() {
      this.$router.push({
        path: "/store/marketing/packet"
      });
    },
    ...mapActions([
      "getstorecouponupdateById",
      "getstorecouponfindById",
      "getstorecouponadd",
      "getstoreclassfindByLevelAndId",
      "getstoreclassficationfindByLevelAndId",
      "getstoreproductList",
      "getstorebrandfindPage"
    ])
  },
  // 监视
  watch: {
    name: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        this.isName = false;
      } else {
        if (trimstr.length < 11) {
          this.isRedname = false;
          this.isGrayname = true;
          this.isName = true;
        } else {
          this.isName = false;
        }
      }
    },
    orderAmount: function(val) {
      var reg = new RegExp(/^\d{1,12}$/);
      if (val.length <= 0) {
        this.isorderAmount = false;
      } else {
        if (reg.test(val)) {
          this.isRedorderAmount = false;
          this.isGrayorderAmount = true;
          this.isorderAmount = true;
        } else {
          this.isorderAmount = false;
        }
      }
    },
    discountAmount: function(val) {
      var reg = new RegExp(/^\d{1,12}$/);
      if (val.length <= 0) {
        this.isdiscountAmount = false;
      } else {
        if (reg.test(val)) {
          this.isReddiscountAmount = false;
          this.isGraydiscountAmount = true;
          this.isdiscountAmount = true;
        } else {
          this.isdiscountAmount = false;
        }
      }
    },
    number: function(val) {
      var reg = new RegExp(/^\d{1,12}$/);
      if (val.length <= 0) {
        this.isnumber = false;
      } else {
        if (reg.test(val)) {
          this.isRednumber = false;
          this.isGraynumber = true;
          this.isnumber = true;
        } else {
          this.isnumber = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.bgcolor {
  background-color: #fff1f3;
}

.grantSearch {
  display: flex;
}

.list-cont .grantSearch > div:nth-child(4) {
  margin-left: 24px;
  width: 68px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #fe5371;
  margin-right: 25px;
  cursor: pointer;
}

.list-cont .grantSearch > div:nth-child(3) {
  margin-left: 24px;
}

.list-cont .grantSearch > div:nth-child(2) {
  margin-left: 10px;
}

.list-cont .grantSearch > div:nth-child(1) {
  width: 120px;
  text-align: right;
  color: #4a4a4a;
  font-size: 14px;
}

.commodityLeft li:nth-child(1) {
  margin-top: 10px;
}

.commodityLeft {
  height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.commodityLeft li {
  height: 36px;
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
  margin-left: 120px;
  width: 240px;
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
  width: 240px;
  height: 240px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.grantCommodity > div:nth-child(2) > div:nth-child(4) {
  width: 240px;
  height: 240px;
  line-height: 440px;
  margin-left: 15px;
}

.grantCommodity {
  display: flex;
  flex-wrap: wrap;
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
  margin-left: 120px;
  width: 240px;
  height: 40px;
  background-color: #fff;
}

.grantCommodity > div:nth-child(1) > div:nth-child(2) {
  width: 60px;
  height: 40px;
  margin-left: 0;
}

.grantCommodity > div:nth-child(1) > div:nth-child(3) {
  width: 240px;
  height: 40px;
  border-radius: 4px;
}

.grantCommodity {
  /*border: 1px solid red;*/
  height: 300px;
}

.granttype > div:nth-child(1) {
  width: 120px;
  text-align: right;
}

.granttype > div:nth-child(3) {
  width: 90px;
  text-align: right;
}

.granttype > div:nth-child(5) {
  width: 90px;
  text-align: right;
}

.granttype {
  margin-bottom: 35px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayInput {
  border: 1px solid #aeaeae;
}

.redInput {
  border: 1px solid #fe5371;
}

.comone {
  height: 32px;
}

.comone > div:nth-child(1) {
  height: 32px;
  line-height: 32px;
}

.comone > div:nth-child(2) {
  margin-top: 5px;
}

.comone > div:nth-child(2) small {
  margin-left: 8px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) {
  margin-top: 5px;
  overflow: hidden;
  margin-left: 30px;
}

.startTime > div:nth-child(1) {
  width: 120px;
  text-align: right;
  color: #4a4a4a;
  font-size: 14px;
}

.startTime > div:nth-child(2) {
  margin-left: 10px;
  width: 160px;
}

.startTime > div:nth-child(3) {
  margin-left: 18px;
}

.startTime > div:nth-child(4) {
  margin-left: 18px;
  width: 160px;
}

.startTime > div:nth-child(5) {
  margin-left: 12px;
}

input {
  width: 160px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

textarea {
  width: 486px;
  height: 56px;
  resize: none;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  padding-top: 10px;
}

.list-cont .list-contOne > div:nth-child(3) {
  margin-left: 12px;
}

.list-cont .list-contOne > div:nth-child(2) {
  margin-left: 10px;
}

.list-cont .list-contOne > div:nth-child(1) {
  width: 120px;
  text-align: right;
  color: #4a4a4a;
  font-size: 14px;
}

.list-cont > div {
  margin-top: 24px;
  min-height: 36px;
  display: flex;
  align-items: center;
}

.list-cont {
  min-width: 700px;
  min-height: 300px;
}

.but {
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
</style>