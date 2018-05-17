<!--商品中心-在售商品-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    商品列表
                </div>
                <div @click="addCommClick">
                    添加商品
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            所有状态：
                        </div>
                        <div>
                            <v-selec width="86" :selects="selectedState" :list="sStates" @select="selectStateClick"></v-selec>
                        </div>
                    </div>
                    <div>
                        <div>
                            所有分类：
                        </div>
                        <div>
                            <!--<v-select width="114" :selects="selectedType" :list="sTypes" @select="selectTypeClick"></v-select>-->
                            <select @change="selectTypeClick" style="width:120px;" v-model="selectedType">
                                    <option v-for="(type,index) in sTypes" :value="type.path">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            商品类型：
                        </div>
                        <div>
                            <v-selec width="86" :selects="selectedStyle" :list="sStyle" @select="selectstyleTypeClick"></v-selec>
                        </div>
                    </div>
                    <div class="searchInput searchInputmedia">
                        <img src="/static/img/search_1.png" alt="">
                        <input v-model="searchTitle" type="text" placeholder="商品名称" style="border:none;height: 28px;width:100%;">
                    </div>
                    <div class="searchBut" @click="searchClick">
                        确定
                    </div>
                    <!--<div>
                        <div>
                            商品名称：
                        </div>
                        <div>
                            <v-minput width="160"></v-minput>
                        </div>
                    </div>
                    <div>
                        <div>
                            店铺名称：
                        </div>
                        <div>
                            <v-minput width="160"></v-minput>
                        </div>
                    </div>-->
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div class="checkBoxCl">
                                <div>
                                    <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                </div>
                                <div>
                                    <span>序号</span>
                                </div>
                            </div>
                            <div>
                                商品名称
                            </div>
                            <div>
                                商家名称
                            </div>
                            <div>
                                货号
                            </div>
                            <div>
                                展示状态
                            </div>
                            <div>
                                在架状态
                            </div>
                            <!--<div>
                                推荐排序
                            </div>-->
                            <div>
                                审核状态
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="dataLists.length > 0" v-for="(item,index) in dataLists">
                            <div class="checkCl">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="index">{{index + 1}}</el-checkbox>
                                </el-checkbox-group>
                                <div>
                                    <!--<span>{{item.num}}</span>-->
                                </div>
                            </div>
                            <div :title="item.productName">
                                {{item.productName}}
                            </div>
                            <div title="平台自营">
                                <!-- {{item.description}} -->
                                平台自营
                            </div>
                            <div :title="item.productCode">
                                {{item.productCode}}
                            </div>
                            <div>
                                <div v-show="item.showState == 1">展示中</div>
                                <div v-show="item.showState == 0">未展示</div>
                            </div>
                            <div>
                                <div v-show="item.upShelves == 0">已上架</div>
                                <div v-show="item.upShelves == 1">已下架</div>
                                <!--<div title="上架" class="undercarriage" v-show="item.upShelves == 1" @click="groundingClick(index)"></div>
                                <div title="下架" class="grounding" v-show="item.upShelves == 0" @click="undercarriageClick(index)"></div>-->
                                <!--<img v-if="item.d == 0" src="/static/img/dui.png">
                                <img v-else src="/static/img/cuo.png">-->
                            </div>
                            <!--<div>
                                {{item.h}}
                            </div>-->
                            <div>
                                无需审核
                            </div>
                            <div class="operate">
                                <div><img title="编辑" alt="编辑" @click="updateClick(index)" src="/static/img/编辑.png"></div>
                                <div><img title="查看详情" alt="查看详情" @click="detailsClick(index)" src="/static/img/detail.png"></div>
                                <div v-show="item.upShelves != 0"><img title="删除" alt="删除" @click="recycleClick(index)" src="/static/img/删除.png"></div>
                                <div v-show="item.upShelves == 0"><img src="/static/img/删除灰.png"></div>
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
                <div class="recycle" v-show="dataLists.length > 0">
                    <div>
                        批量操作：
                    </div>
                    <div>
                        <v-selec width="100" :selects='selectedRecy' :list="sRecys" @select="selectRecClick"></v-selec>
                    </div>
                    <div @click="ensureClick">
                        确定
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
    </div>

</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/newsselect";
import selec from "../../cModule/select";
import hosdel from "../../cModule/goodsdel";
export default {
  components: {
    "v-minput": minput,
    "v-select": select,
    "v-hosdel": hosdel,
    "v-selec": selec
  },
  data() {
    return {
      checked: false,
      checkedOne: false,
      checkedAll: true,
      checkList: [],
      sStates: ["所有状态", "上架", "下架"],
      sTypes: [
        { name: "所有分类", path: "" }
        // { name: 'A分类', id: 1 },
      ],
      sStyle: ["所有商品", "普通商品", "定制商品"],
      sRecys: ["删除", "上架", "下架"],
      dataLists: [],
      checkt: 100000000000000000000,
      checkShow: true,
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 15,
      selectedRecy: "删除",
      selectedState: "所有状态",
      selectedStyle: "所有商品",
      selectedType: "",
      searchTitle: "", //筛选的input
      searchTitleUp: "", //上传的关键字
      okClickShow: false, //判断是否筛选
      productType: "",
      // productName:'',
      // classFliy: "",
      upShelves: "",
      ids: "",
      delIndex: "10000",
      loading: false,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      tchTrue: false,
      batchTrue: false
    };
  },
  // 过滤
  filters: {
    lFun: function(val) {
      if (val) {
        switch (val) {
          case 0:
            return "上架状态";
            break;
          case 1:
            return "下架状态";
            break;
          case 2:
            return "新品";
            break;
          case 3:
            return "精品";
            break;
          case 4:
            return "热销";
            break;
          case 5:
            return "未审核";
            break;
          case 6:
            return "审核通过";
            break;
          case 7:
            return "审核未通过";
            break;
          case 8:
            return "无需审核";
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
    self.currentPage = Number(sessionStorage.getItem("currentPage"));
    if (sessionStorage.getItem("alltypes")) {
      self.selectedType = sessionStorage.getItem("alltypes");
    }
    if (sessionStorage.getItem("allstatus")) {
      self.selectedState = sessionStorage.getItem("allstatus");
      if (sessionStorage.getItem("allstatus") == "0") {
        self.upShelves = "0";
        self.selectedState = "上架";
      } else if (sessionStorage.getItem("allstatus") == "1") {
        self.upShelves = "1";
        self.selectedState = "下架";
      } else {
        self.upShelves = "";
        self.selectedState = "所有状态";
      }
    }
    if (sessionStorage.getItem("allstyle")) {
      //   console.log(sessionStorage.getItem("allstyle"));
      if (sessionStorage.getItem("allstyle") == "2") {
        self.productType = "2";
        self.selectedStyle = "普通商品";
      } else if (sessionStorage.getItem("allstyle") == "1") {
        self.productType = "1";
        self.selectedStyle = "定制商品";
      } else {
        self.productType = "";
        self.selectedStyle = "所有商品";
      }
    }
    if (sessionStorage.getItem("pageSizeNum")) {
      self.pageSizeNum = Number(sessionStorage.getItem("pageSizeNum"));
    }
    if (sessionStorage.getItem("productName")) {
      self.searchTitleUp = self.searchTitle = sessionStorage.getItem(
        "productName"
      );
      self.okClickShow = true;
    }
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
        if (comms.indexOf("sale") == -1) {
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
          self.queryType(3);
          self.goodslist();
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
    // 查询所有的三级分类
    queryType(m) {
      var self = this;
      self
        .getqueryTypeList({
          level: m
        })
        .then(data => {
          //   console.log("类目查询", data);
          if (data.code == 200) {
            self.sTypes = data.data;
            self.sTypes.unshift({ path: "", name: "所有分类" });
            sessionStorage.removeItem("currentPage");
            sessionStorage.removeItem("allstatus");
            sessionStorage.removeItem("alltypes");
            sessionStorage.removeItem("allstyle");
            sessionStorage.removeItem("pageSizeNum");
            sessionStorage.removeItem("productName");
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 获取商品列表
    goodslist() {
      var self = this;
      self.checked = false;
      self.ids = "";
      self.checkList = [];
      self.loading = true;
      self
        .getproductlist({
          pageSize: self.pageSizeNum,
          pageNo: self.currentPage,
          logicDelete: "0",
          productType: self.productType,
          productName: self.searchTitleUp, //关键字
          classFliy: self.selectedType,
          upShelves: self.upShelves
        })
        .then(data => {
          self.loading = false;
          //   console.log(data, "获取商品列表");
          if (data.code == 200) {
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
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.dataLists = [];
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 搜索点击
    searchClick() {
      // this.productName = this.searchTitle
      if (this.searchTitle == "") {
        this.$message({
          type: "info",
          message: "请输入搜索关键字"
        });
      } else {
        this.searchTitleUp = this.searchTitle;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.okClickShow = true;
        this.goodslist();
      }
    },
    // 商品类型选择
    selectstyleTypeClick(state) {
      if (state == "所有商品") {
        this.productType = "";
      } else if (state == "普通商品") {
        this.productType = "2";
      } else if (state == "定制商品") {
        this.productType = "1";
      }
      this.goodslist();
    },
    // 状态选择
    selectStateClick(state) {
      //   console.log(state);
      if (state == "所有状态") {
        this.upShelves = "";
      } else if (state == "上架") {
        this.upShelves = "0";
      } else if (state == "下架") {
        this.upShelves = "1";
      }
      this.goodslist();
    },
    // 分类选择
    selectTypeClick() {
      // this.classFliy = this.selectedType;
      this.goodslist();
    },
    // 回收站
    selectRecClick(state) {
      this.selectedRecy = state;
    },
    // 所有序号被选中时
    numChange(event) {
      this.checkList = event.target.checked ? this.dataLists : [];
      //   console.log(this.checkList);
      var a = this.checkList.map(function(data) {
        return data.id;
      });
      this.ids = a.join(",");
    },
    handleCheckedCitiesChange(value) {
      //   console.log(this.checkList);
      let checkedCount = value.length;
      this.checked = checkedCount === this.dataLists.length;
      var a = this.checkList.map(function(data) {
        return data.id;
      });
      this.ids = a.join(",");
      //   console.log(this.ids);
    },
    // 封装批量操作方法
    batch(m) {
      var self = this;
      if (self.batchTrue == false) {
        self.batchTrue = true;
        self
          .getstorebatchOperation({
            operation: m,
            ids: this.ids
          })
          .then(data => {
            self.batchTrue = false;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              self.isShowdel = true;
              self.delShow = false;
              if (self.delIndex == 0) {
                if (self.currentPage == 1) {
                  self.goodslist();
                  return;
                } else {
                  self.currentPage = self.currentPage - 1;
                  self.goodslist();
                }
              } else {
                self.goodslist();
              }
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.batchTrue = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    ensureClick() {
      if (this.ids == "") {
        this.$message("请选择商品再进行操作");
      } else {
        var self = this;
        var flag;
        if (self.selectedRecy == "删除") {
          for (var i = 0; i < self.checkList.length; i++) {
            if (self.checkList[i].upShelves == "0") {
              this.$message("存在上架的商品，不能进行批量删除");
              flag = true;
              break;
            } else {
              flag = false;
            }
          }
          if (flag == false) {
            self.batch("2");
          }
        } else if (self.selectedRecy == "上架") {
          self.batch("0");
        } else if (self.selectedRecy == "下架") {
          self.batch("1");
        }
      }
    },
    // 下架
    // undercarriageClick(index) {
    //     console.log(this.dataLists[index].id)
    //     this.ids = this.dataLists[index].id
    //     this.batch('1')
    // },
    // // 上架
    // groundingClick(index) {
    //     this.ids = this.dataLists[index].id
    //     this.batch('0')
    // },
    // 点击分页
    handleSizeChange(val) {
      if (this.okClickShow) {
        this.searchTitleUp = this.searchTitle;
      } else {
        this.searchTitleUp = "";
      }
      this.pageSizeNum = val;
      this.goodslist();
    },
    handleCurrentChange(val) {
      if (this.okClickShow) {
        this.searchTitleUp = this.searchTitle;
      } else {
        this.searchTitleUp = "";
      }
      this.currentPage = val;
      this.goodslist();
    },
    // 更新商品信息
    updateClick(index) {
      var self = this;
      this.$router.push({
        path: "/store/commodity/add",
        query: { operation: 2, id: self.dataLists[index].id }
      });
      sessionStorage.setItem("currentPage", this.currentPage);
      sessionStorage.setItem("allstatus", this.upShelves);
      sessionStorage.setItem("alltypes", this.selectedType);
      sessionStorage.setItem("allstyle", this.productType);
      sessionStorage.setItem("pageSizeNum", this.pageSizeNum);
      sessionStorage.setItem("productName", this.searchTitleUp);
    },
    // 查看商品信息
    detailsClick(index) {
      var self = this;
      this.$router.push({
        path: "/store/commodity/detail",
        query: { id: self.dataLists[index].id }
      });
      sessionStorage.setItem("currentPage", this.currentPage);
      sessionStorage.setItem("allstatus", this.upShelves);
      sessionStorage.setItem("alltypes", this.selectedType);
      sessionStorage.setItem("allstyle", this.productType);
      sessionStorage.setItem("pageSizeNum", this.pageSizeNum);
      sessionStorage.setItem("productName", this.searchTitleUp);
    },
    // 确认删除框
    okClick() {
      this.ids = this.dataLists[this.delIndex].id;
      this.batch("2");
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 删除商品
    recycleClick(index) {
      this.titlename = "确定删除该商品吗？";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 添加商品
    addCommClick() {
      this.$router.push({
        path: "/store/commodity/add"
      });
    },
    ...mapActions([
      "getproductlist",
      "getqueryTypeList",
      "getstorebatchOperation"
    ])
  },
  // 监视
  watch: {
    searchTitle: function(val) {
      this.changeVal = val.length;
      if (this.changeVal == 0) {
        if (this.okClickShow) {
          this.okClickShow = false;
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.searchTitleUp = "";
          this.goodslist();
        }
      }
    }
  }
};
</script>
<style scoped>
/*删除弹出框*/

.delContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 10px #eaeaea;
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

.undercarriage {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 11% 37%;
}

.grounding {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 15.5% 37%;
}

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

.sale {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.recycle {
  height: 100px;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.recycle > div:nth-child(1) {
  min-width: 60px;
  height: 35px;
  color: #353535;
  font-size: 16px;
  line-height: 35px;
}

.recycle > div:nth-child(2) {
  margin-left: 10px;
}

.recycle > div:nth-child(3) {
  margin-top: 3px;
  margin-left: 25px;
  width: 70px;
  height: 30px;
  background-color: #fe5371;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
}

#lastLiRight {
  min-width: 300px;
  width: 80%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi > div:nth-child(1) {
  width: 10px;
}

.lastLi > div:nth-child(2) {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.checkCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
  margin-left: 12px;
}

.checkCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.checkCl > div:nth-child(3) {
  margin-left: 0px;
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
  /*margin-top: 5px;*/
}

.checkBoxCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
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

.firstLi > div:nth-child(5) {
  min-width: 35px;
}

.firstLi > div:nth-child(6) {
  min-width: 70px;
}

.firstLi > div:nth-child(7) {
  min-width: 70px;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  text-align: center;
}

.dataLi .operate {
  display: flex;
  /*justify-content: space-around;*/
  align-items: center;
}

.dataLi .operate > div {
  width: 24px;
  height: 24px;
}

.dataLi .operate > div:nth-child(2) {
  margin: 0 20px;
}

.operate img {
  width: 100%;
  cursor: pointer;
  height: 100%;
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

.dataLi {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li {
  display: flex;
  /*border: 1px solid red;*/
  min-height: 50px;
}

.listCont li > div:nth-child(1) {
  width: 10%;
  overflow: hidden;
  min-width: 95px;
  display: flex;
}

.listCont .dataLi > div:nth-child(2) {
  display: block;
  width: 25%;
  overflow: hidden;
  padding: 0 7px;
  min-width: 148px;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 49px;
  line-height: 49px;
  text-align: center;
}

.listCont .firstLi > div:nth-child(2) {
  width: 25%;
  padding: 7px;
  padding-top: 0;
  min-width: 148px;
}

.listCont li > div:nth-child(3) {
  width: 17%;
  min-width: 72px;
}

.listCont .dataLi > div:nth-child(3) {
  display: block;
  width: 17%;
  overflow: hidden;
  padding: 0 7px;
  min-width: 72px;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 49px;
  line-height: 49px;
  text-align: center;
}

.listCont .dataLi > div:nth-child(4) {
  display: block;
  width: 10%;
  overflow: hidden;
  /*padding: 0 7px;*/
  min-width: 36px;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 49px;
  line-height: 49px;
  text-align: center;
}

.listCont li > div:nth-child(4) {
  width: 10%;
  min-width: 36px;
}

.listCont li > div:nth-child(5) {
  width: 10%;
  min-width: 72px;
}

.listCont li > div:nth-child(6) {
  width: 9%;
  min-width: 72px;
}

.listCont li > div:nth-child(7) {
  width: 12%;
  min-width: 72px;
}

.listCont li > div:nth-child(8) {
  width: 15%;
  min-width: 114px;
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
  border: 1px solid #fe5371;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}

.menu {
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menuLeft {
  display: flex;
  min-width: 705px;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  font-size: 14px;
  min-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.searchInput {
  height: 32px;
  line-height: 32px;
  margin-left: 25px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
  width: 127px;
}

@media screen and (min-width: 1135px) {
  .searchInputmedia {
    width: 210px;
  }
}

.searchBut {
  margin-left: 25px;
  width: 70px;
  height: 32px;
  background-color: #fe5371;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
}

select {
  width: 200px;
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