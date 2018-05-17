<!--库存中心-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale" @click="wholeClick">
        <div>
            <div class="listTitle">
                <div>
                    库存中心
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            分类查询：
                        </div>
                        <div class="pull-down" @click="pullDownClick">
                            <div>{{classify}}</div>
                            <img src="/static/img/downjian.jpg" alt="" v-show="imgOne">
                            <img src="/static/img/upjian.jpg" alt="" v-show="imgTwo">
                        </div>
                        <div class="searchBtn" @click.stop="filterClick">
                            筛选
                        </div>
                        <div class="searchBox">
                            <img src="/static/img/search_1.png" alt="">
                            <input v-model="searchTitle" type="text" placeholder="请输入标题">
                        </div>
                        <div class="searchBtn" @click="searchClick">
                            搜索
                        </div>
                    </div>
                    <div v-show="pullDownIf">
                        <ul>
                            <li>
                                <div :class="{classifyHover:isClassifyHoverOne == index}" v-for="(item,index) in classifyListOne" @click.stop="classifyClickOne(index)">
                                    {{item.name}}
                                </div>
                            </li>
                            <li v-show="classifyTwo">
                                <div :class="{classifyHoverTwo:isClassifyHoverTwo == index}" v-for="(item,index) in classifyListTwo" @click.stop="classifyClickTwo(index)">
                                    {{item.name}}
                                </div>
                            </li>
                            <li v-show="classifyThree">
                                <div :class="{classifyHoverThree:isClassifyHoverThree == index}" v-for="(item,index) in classifyListThree" @click.stop="classifyClickThree(index)">
                                    {{item.name}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                商品名称
                            </div>
                            <div>
                                库存总量
                            </div>
                            <div>
                                库存余量
                            </div>
                            <div>
                                库存状态
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-for="(item,index) in dataLists">
                            <div class="productname" :title="item.productName">
                                {{item.productName}}
                            </div>
                            <div class="gross" @mouseover.stop="classifyOverParticulars(index)" @mouseout.stop="classifyoutParticulars">
                                {{item.totalNum}}
                                <!-- 库存总量详情 -->
                                <div class="triangle" v-show="ifParticulars == index"></div>
                                <div class="particulars" v-show="ifParticulars == index">
                                    <ul>
                                        <li class="firstparticulars">
                                            <div class="particularsOne">
                                                {{firstName}}
                                            </div>
                                            <div class="particularsTwo">
                                                {{secondName}}
                                            </div>
                                            <div class="particularsTherr">
                                                库存
                                            </div>
                                            <div class="particularsFour">
                                                价格
                                            </div>
                                        </li>
                                        <li class="particularsLi" v-for="(item,index) in grossLists">
                                            <div class="particularsOne">
                                                {{item.skuName1.attr2}}
                                            </div>
                                            <div class="particularsTwo">
                                                {{item.skuName2.attr4}}
                                            </div>
                                            <div class="particularsTherr">
                                                {{item.totalNum}}
                                            </div>
                                            <div class="particularsFour">
                                                {{item.price}}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="inventoryMargin" @mouseover.stop="marginOver(index)" @mouseout.stop="marginOut">
                                {{item.surplusNum}}
                                <!-- 库存余量详情 -->
                                <div class="marginTriangle" v-show="ifMargin == index"></div>
                                <div class="inventoryMarginDetails" v-show="ifMargin == index">

                                    <ul>
                                        <li class="firstmargin">
                                            <div>
                                                {{firstName}}
                                            </div>
                                            <div>
                                                {{secondName}}
                                            </div>
                                            <div>
                                                库存
                                            </div>
                                            <div>
                                                价格
                                            </div>
                                        </li>
                                        <li class="marginLi" v-for="(item,index) in marginLists">
                                            <div>
                                                {{item.skuName1.attr2}}
                                            </div>
                                            <div>
                                                {{item.skuName2.attr4}}
                                            </div>
                                            <div>
                                                {{item.surplusNum}}
                                            </div>
                                            <div>
                                                {{item.price}}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                {{item.repertoryState | lFun}}
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="editClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div>
                                    <img v-show="item.upShelves == 1" @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                                    <img v-show="item.upShelves == 0" src="/static/img/删除灰.png" alt="删除灰" title="删除灰">
                                </div>
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <li class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="dataLists.length > 0">
                            <div class="lastLiLeft">

                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--删除弹出框-->
                <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
                    <transition name="slide-fade">
                        <div class="delContent" v-show="delShow">
                            <v-hosdel @ok="okDeleteClick" @canle="canleClick" :name="titlename"></v-hosdel>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  computed: mapState(["inventoryEdit"]),
  data() {
    return {
      loading: false,
      secondName: "",
      firstName: "",
      ifParticulars: -1,
      ifMargin: -1,
      isClassifyHoverOne: -1,
      isClassifyHoverTwo: -1,
      isClassifyHoverThree: -1,
      classifyPid: "",
      classifyTwo: false,
      classifyThree: false,
      classify: "请选择分类",
      pullDownIf: false,
      classifyListOne: [],
      classifyListTwo: [],
      classifyListThree: [],
      classifyList: [],
      imgOne: true,
      imgTwo: false,
      selectDoctorId: "",
      searchTitle: "", //筛选input
      searchTitleUp: "", //上传关键字
      okClickShow: false, //判断是否进行筛选
      longShow: true, //判断请求是否进行完成
      selectfl: [],
      checked: false,
      checkedOne: false,
      checkedAll: true,
      checkList: [],
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      titlename: "",
      dataLists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      delIndex: "",
      oneHover: "",
      twoHover: "",
      threeHover: "",
      grossLists: [
        {
          skuName1: {
            attr2: ""
          },
          skuName2: {
            attr4: ""
          }
        }
      ],
      marginLists: [
        {
          skuName1: {
            attr2: ""
          },
          skuName2: {
            attr4: ""
          }
        }
      ],
      particularsIndex: "0",
      okDeleteClickTrue: false,
      pullDownClickTrue: false
    };
  },
  // 过滤
  filters: {
    ctimeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0 " + month;
      var date = now.getDate();
      date = date > 9 ? date : "0 " + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0 " + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0 " + minute;
      return (
        "20 " + year + "- " + month + "- " + date + " " + hour + ": " + minute
      );
    },
    lFun: function(val) {
      if (val) {
        switch (val) {
          case "1":
            return "正常";
            break;
          case "2":
            return "库存不足";
            break;
          default:
            break;
        }
      } else {
        return "暂无信息";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    if (sessionStorage.getItem("inventoryCurrentPage")) {
      self.currentPage = Number(sessionStorage.getItem("inventoryCurrentPage"));
    }
    if (sessionStorage.getItem("inventoryPageSizeNum")) {
      self.pageSizeNum = Number(sessionStorage.getItem("inventoryPageSizeNum"));
    }
    if (sessionStorage.getItem("inventoryclassifyPid")) {
      self.classifyPid = sessionStorage.getItem("inventoryclassifyPid");
    }
    if (sessionStorage.getItem("inventorysearchTitle")) {
      self.searchTitleUp = self.searchTitle = sessionStorage.getItem(
        "inventorysearchTitle"
      );
      self.okClickShow = true;
    }
    if (sessionStorage.getItem("inventoryclassify")) {
      self.classify = sessionStorage.getItem("inventoryclassify");
    }
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
      if (arrs.indexOf("inventory") == -1) {
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
        self.gainInventory();
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
    //获取库存列表
    gainInventory() {
      var self = this;
      self.loading = true;
      self
        .getInventory({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          productName: self.searchTitleUp,
          category: self.classifyPid
        })
        .then(data => {
          self.loading = false;
          this.longShow = true;
          //   console.log("库存管理列表", data);
          if (data.code == 200) {
            sessionStorage.removeItem("inventoryCurrentPage");
            sessionStorage.removeItem("inventoryPageSizeNum");
            sessionStorage.removeItem("inventoryclassifyPid");
            sessionStorage.removeItem("inventorysearchTitle");
            sessionStorage.removeItem("inventoryclassify");
            if (data.data.records) {
              if (data.data.records.length > 0) {
                self.dataLists = data.data.records;
                self.totalNum = data.data.total;
              } else {
                self.loading = false;
                self.dataLists = [];
              }
            } else {
              self.loading = false;
              self.dataLists = [];
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
          self.$message({
            type: "info",
            message: "服务器异常"
          });
          self.loading = false;
          this.longShow = true;
        });
    },
    //鼠标移入库存总量展示详情
    classifyOverParticulars(index) {
      var self = this;
      if (self.dataLists[index].productSkuVo) {
        if (self.dataLists[index].productSkuVo.length > 0) {
          self.grossLists = self.dataLists[index].productSkuVo;
          self.firstName = self.grossLists[0].skuName1.attr1;
          self.secondName = self.grossLists[0].skuName2.attr3;
          self.ifParticulars = index;
        } else {
          self.$message({
            type: "info",
            message: "暂无库存！"
          });
          return;
        }
      } else {
        self.$message({
          type: "info",
          message: "暂无库存！"
        });
        return;
      }
    },
    //鼠标移出库存总量隐藏详情
    classifyoutParticulars() {
      this.ifParticulars = -1;
    },
    //鼠标移入库存余量
    marginOver(index) {
      var self = this;
      if (self.dataLists[index].productSkuVo) {
        if (self.dataLists[index].productSkuVo.length > 0) {
          self.marginLists = self.dataLists[index].productSkuVo;
          self.firstName = self.marginLists[0].skuName1.attr1;
          self.secondName = self.marginLists[0].skuName2.attr3;
          self.ifMargin = index;
        } else {
          self.$message({
            type: "info",
            message: "暂无库存！"
          });
          return;
        }
      } else {
        self.$message({
          type: "info",
          message: "暂无库存！"
        });
        return;
      }
    },
    //鼠标移出库存余量
    marginOut() {
      this.ifMargin = -1;
    },
    //点击分类查询框
    pullDownClick() {
      var self = this;
      if (self.pullDownClickTrue == false) {
        self.pullDownClickTrue = true;
        // this.searchTitle = "";
        this.classifyTwo = false;
        this.classifyThree = false;
        this.classifyPid = [];
        this.classify = "请选择分类";
        self
          .getClassfyListFirst({
            level: 1
          })
          .then(data => {
            self.loading = false;
            self.pullDownClickTrue = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length) {
                  self.classifyListOne = data.data;
                  this.imgOne = false;
                  this.imgTwo = true;
                  this.pullDownIf = true;
                } else {
                  self.classifyListOne = [];
                }
              } else {
                self.classifyListOne = [];
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.pullDownClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //分类一级点击
    classifyClickOne(index) {
      var self = this;
      if (self.pullDownClickTrue == false) {
        self.pullDownClickTrue = true;
        this.oneHover = index;
        this.isClassifyHoverOne = index;
        this.classify = this.classifyListOne[this.oneHover].name;
        this.classifyPid = this.classifyListOne[this.oneHover].id;
        self
          .getClassfyListFirst({
            pid: self.classifyListOne[index].id
          })
          .then(data => {
            self.loading = false;
            self.pullDownClickTrue = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length == 0) {
                  self.classifyListTwo = data.data;
                  self.$message({
                    type: "info",
                    message: "此一级分类下暂无二级分类！"
                  });
                  this.classifyTwo = false;
                  this.classifyThree = false;
                  this.isClassifyHoverTwo = -1;
                  this.isClassifyHoverThree = -1;
                  this.classifyListThree = [];
                } else {
                  self.classifyListTwo = data.data;
                  this.classifyTwo = true;
                  this.classifyThree = false;
                  this.isClassifyHoverTwo = -1;
                  this.isClassifyHoverThree = -1;
                  this.classifyListThree = [];
                }
              } else {
                self.$message({
                  type: "info",
                  message: "此一级分类下暂无二级分类！"
                });
                this.classifyTwo = false;
                this.classifyThree = false;
                this.isClassifyHoverTwo = -1;
                this.isClassifyHoverThree = -1;
                this.classifyListThree = [];
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.pullDownClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //分类二级点击
    classifyClickTwo(index) {
      var self = this;
      if (self.pullDownClickTrue == false) {
        self.pullDownClickTrue = true;
        this.twoHover = index;
        this.isClassifyHoverTwo = index;
        this.classify = this.classifyListTwo[this.twoHover].name;
        this.classifyPid =
          this.classifyListOne[this.oneHover].id +
          "#" +
          this.classifyListTwo[this.twoHover].id;
        this.classifyListThree = [];
        this.classifyOverTwoDivIf = true;

        self
          .getClassfyListFirst({
            pid: self.classifyListTwo[index].id
          })
          .then(data => {
            self.loading = false;
            self.pullDownClickTrue = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length == 0) {
                  self.classifyListThree = data.data;
                  this.classifyThree = false;
                  self.$message({
                    type: "info",
                    message: "此二级分类下暂无三级分类！"
                  });
                } else {
                  self.classifyListThree = data.data;
                  this.isClassifyHoverOne = this.oneHover;
                  this.isClassifyHoverThree = -1;
                  this.classifyThree = true;
                }
              } else {
                this.classifyThree = false;
                self.$message({
                  type: "info",
                  message: "此二级分类下暂无三级分类！"
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
            self.pullDownClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
        this.twoHover = index;
        this.isClassifyHoverTwo = index;
      }
    },
    //分类三级点击
    classifyClickThree(index) {
      this.threeHover = index;
      this.isClassifyHoverThree = index;
      this.classify = this.classifyListThree[this.threeHover].name;
      this.classifyPid =
        this.classifyListOne[this.oneHover].id +
        "#" +
        this.classifyListTwo[this.twoHover].id +
        "#" +
        this.classifyListThree[this.threeHover].id;
    },
    //筛选按钮 隐藏分类二、三级
    filterClick() {
      // if (this.classifyPid == "") {
      //   this.pullDownIf = false;
      //   this.$message({
      //     type: "info",
      //     message: "清先选择分类！"
      //   });
      // } else {
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.pullDownIf = false;
        this.classifyTwo = false;
        this.classifyThree = false;
        this.isClassifyHoverOne = -1;
        this.imgOne = true;
        this.imgTwo = false;
        this.gainInventory();
      // }
    },
    //全局点击
    wholeClick() {
      this.imgOne = true;
      this.imgTwo = false;
      this.pullDownIf = false;
      this.isClassifyHoverOne = -1;
    },
    // 模糊搜索
    searchClick() {
      var self = this;
      // self.classify = "请选择分类";
      // self.classifyPid = "";
      self.pullDownIf = false;
      self.classifyTwo = false;
      self.classifyThree = false;
      self.isClassifyHoverOne = -1;
      self.imgOne = true;
      self.imgTwo = false;
      var searchs = self.searchTitle;
      self.searchTitle = searchs.replace(/(^\s+)|(\s+$)/g, "");
      if (self.searchTitle.length == 0) {
        self.$message({
          type: "info",
          message: "请输入搜索关键词!"
        });
      } else {
        if (this.longShow) {
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.okClickShow = true;
          this.searchTitleUp = this.searchTitle;
          this.longShow = false;
          this.gainInventory();
        } else {
          this.$message({
            type: "info",
            message: "数据请求中请稍后"
          });
        }
      }
    },
    // 删除
    deleteClick(index) {
      this.titlename = "库存将被删除，该操作无法恢复！";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    //确认删除
    okDeleteClick() {
      var self = this;
      if (self.okDeleteClickTrue == false) {
        self.okDeleteClickTrue = true;
        self
          .getdelInventory({
            operation: "2",
            ids: self.dataLists[self.delIndex].productId
          })
          .then(data => {
            self.okDeleteClickTrue = false;
            if (data.code == 200) {
              if (self.dataLists.length == 1) {
                if (self.currentPage == 1) {
                  self.currentPage = 1;
                } else if (self.currentPage > 1) {
                  self.currentPage = self.currentPage - 1;
                }
              }
              this.isShowdel = true;
              this.delShow = false;
              self.gainInventory();
            } else {
              this.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okDeleteClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //编辑按钮
    editClick(index) {
      var self = this;
      sessionStorage.setItem("inventoryCurrentPage", self.currentPage);
      sessionStorage.setItem("inventoryPageSizeNum", self.pageSizeNum);
      sessionStorage.setItem("inventoryclassifyPid", self.classifyPid);
      sessionStorage.setItem("inventorysearchTitle", self.searchTitleUp);
      sessionStorage.setItem("inventoryclassify", self.classify);

      let edata = JSON.stringify(self.dataLists[index]);
      sessionStorage.setItem("edata", edata);
      self.$router.push({
        path: "/store/editinventory"
      });
    },
    // 点击分页每页多少条
    handleSizeChange(val) {
      if (this.okClickShow) {
        this.searchTitleUp = this.searchTitle;
      } else {
        this.searchTitleUp = "";
      }
      this.pageSizeNum = val;
      this.gainInventory();
    },
    // 点击分页
    handleCurrentChange(val) {
      if (this.okClickShow) {
        this.searchTitleUp = this.searchTitle;
      } else {
        this.searchTitleUp = "";
      }
      this.currentPage = val;
      this.gainInventory();
    },
    ...mapActions(["getInventory", "getdelInventory", "getClassfyListFirst"])
  },
  // 监视
  watch: {
    searchTitle: function(val) {
      if (val.length == 0) {
        if (this.okClickShow) {
          this.okClickShow = false;
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.searchTitleUp = "";
          this.gainInventory();
        }
      }
    }
  }
};
</script>
<style scoped>
.list .noList {
  height: 400px;
}

.list .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
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

.sale {
  width: 100%;
  min-height: 100%;
  border-bottom: 1px solid #ccc;
  overflow-y: scroll;
}

.sale > div {
  width: calc(100% - 72px);
  margin-left: 36px;
}

#lastLiRight {
  width: 80%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.dataLi {
  height: 33px;
}

.operate {
  display: flex;
  align-items: center;
}

.operate > div {
  padding: 0 10px;
}

.operate img {
  width: 25px;
  font-size: 18px;
  cursor: pointer;
  height: 25px;
}

.listCont li {
  display: flex;
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.checkCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.checkCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.checkCl > div:nth-child(3) {
  margin-left: 5px;
}

.checkCl > div:nth-child(3) span {
  height: 40px;
  margin-top: 1px;
  display: block;
  font-size: 15px;
}

.checkBoxCl {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkBoxCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  margin-top: 5px;
}

.checkBoxCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
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
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  align-items: center;
  line-height: 49px;
  justify-content: center;
  font-size: 15px;
  color: #515151;
}

.listCont li > div:nth-child(2) {
  width: 17%;
  min-width: 100px;
}

.productname {
  width: 30%;
  overflow: hidden;
  padding: 0 7px;
  border-left: 1px solid #ececec;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listCont .firstLi > div:nth-child(1) {
  width: 30%;
  padding: 7px;
  padding-top: 0;
}

.listCont li > div:nth-child(3) {
  width: 17%;
  min-width: 100px;
}

.listCont li > div:nth-child(4) {
  width: 17%;
  min-width: 100px;
}

.listCont li > div:nth-child(5) {
  width: 19%;
  min-width: 100px;
}

.list {
  min-height: 540px;
  margin-bottom: 150px;
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
  border: 1px solid #fe5371;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}

.menu {
  height: 80px;
  align-items: center;
  overflow: inherit !important;
  display: flex;
  justify-content: space-between;
}

.menuLeft {
  display: flex;
  position: relative;
}

.menuLeft > div:nth-child(1) {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 23px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
}

.menuLeft > div:nth-child(1) > div:nth-child(1) {
  color: #303030;
  font-size: 14px;
  margin-right: 16px;
  min-width: 70px;
}

.menu > div:nth-child(2) {
  width: 95px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  line-height: 35px;
  color: #000;
  font-size: 16px;
  margin-right: 15px;
  margin-top: 9px;
  cursor: pointer;
}

.searchBox {
  height: 32px;
  line-height: 32px;
  margin-left: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
  width: 210px;
  color: #97969b;
}

.searchBox input {
  border: none;
  height: 26px;
  width: 80%;
}

.searchBox input::-webkit-input-placeholder {
  color: #97969b;
}

.searchBox input:-moz-input-placeholder {
  color: #97969b;
}

.searchBox input::-moz-input-placeholder {
  color: #97969b;
}

.searchBox input:-ms-input-placeholder {
  color: #97969b;
}

.searchBtn {
  margin-left: 32px;
  width: 70px;
  height: 32px;
  background-color: #f84848;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
}

.pull-down {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding: 0 8px;
  width: 155px;
}

.pull-down div:nth-child(1) {
  float: left;
  width: 120px;
  height: 32px;
  color: #97969b;
}

.pull-down img {
  width: 12px;
  height: 7px;
}

.menuLeft > div:nth-child(2) {
  position: absolute;
  top: 32px;
  left: 86px;
  z-index: 1000;
  cursor: pointer;
}

.menuLeft > div:nth-child(2) li {
  float: left;
  width: 155px;
  overflow: auto;
  background: white;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
}

.menuLeft > div:nth-child(2) li:nth-child(1) {
  max-height: 162px !important;
}

.menuLeft > div:nth-child(2) li:nth-child(2) {
  height: 162px !important;
}

.menuLeft > div:nth-child(2) li:nth-child(3) {
  height: 162px !important;
}

.menuLeft > div:nth-child(2) li div {
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  color: #97969b;
  text-overflow: ellipsis;
}

.menuLeft > div:nth-child(2) li div:hover {
  background: pink;
}

.classifyHover,
.classifyHoverTwo,
.classifyHoverThree {
  background: #fe5371 !important;
}

.particulars li {
  width: 100%;
  height: 48px;
  overflow: hidden;
}

.gross {
  position: relative;
}

.particulars {
  border-radius: 4px;
  background: white;
  z-index: 10;
  position: absolute;
  left: -45%;
  top: 46px;
  box-shadow: 0px 2px 10px #eaeaea !important;
  margin-bottom: 20px;
}

.triangle {
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  box-shadow: -1px -1px 1px #eaeaea !important;
  transform: rotate(45deg);
  left: 45%;
  z-index: 11;
  top: 80%;
}

.particulars ul {
  margin: 4%;
}

.particulars li div {
  color: #303030;
  height: 48px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  float: left;
  line-height: 48px;
  text-align: center;
}

.particularsOne {
  border-left: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  width: 106px;
}

.particularsTwo {
  width: 108px;
}

.particularsTherr {
  width: 134px;
}

.particularsFour {
  width: 156px;
}

.firstparticulars div {
  background: #f2f4f8;
  font-size: 16px;
}

.firstparticulars {
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
}

.particularsLi {
  background: white;
}

.inventoryMargin {
  overflow: initial !important;
  position: relative;
  font-size: 14px;
}

.marginTriangle {
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  box-shadow: -1px -1px 1px #eaeaea !important;
  transform: rotate(45deg);
  left: 45%;
  top: 80%;
  z-index: 11;
}

.inventoryMarginDetails {
  border-radius: 4px;
  background: white;
  z-index: 10;
  position: absolute;
  left: -189px;
  top: 46px;
  box-shadow: 0px 2px 10px #eaeaea !important;
  margin-bottom: 20px;
}

.inventoryMarginDetails ul {
  margin: 4%;
}

.inventoryMarginDetails li {
  width: 100%;
  height: 48px;
  overflow: hidden;
}

.inventoryMarginDetails li div {
  color: #303030;
  height: 48px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  float: left;
  line-height: 48px;
  text-align: center;
}

.inventoryMarginDetails li div:nth-child(1) {
  border-left: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  width: 106px;
}

.inventoryMarginDetails li div:nth-child(2) {
  width: 108px;
}

.inventoryMarginDetails li div:nth-child(3) {
  width: 134px;
}

.inventoryMarginDetails li div:nth-child(4) {
  width: 156px;
}

.firstmargin div {
  background: #f2f4f8;
  font-size: 16px;
}

.firstmargin {
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
}

.marginLi {
  background: white;
}
</style>