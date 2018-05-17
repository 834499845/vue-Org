<!--疾病管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    疾病管理
                </div>
                <div @click="addCommClick">
                    新增疾病
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div class="searchInput">
                        <img src="/static/img/search_1.png" alt="">
                        <input v-model="illnessModel" type="text" maxlength="15" placeholder="请输入疾病名称" style="border:none;height: 28px;">
                    </div>
                    <div class="searchBut" @click="searchClick">
                        确定
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div title="序号">
                                序号
                            </div>
                            <div title="疾病名称">
                                疾病名称
                            </div>
                            <div title="对应科室">
                                对应科室
                            </div>
                            <div title="设为常见疾病">
                                设为常见疾病
                            </div>
                            <div title="操作">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="dataList.length > 0" v-for="(item,index) in dataList">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.diseaseName}}
                            </div>
                            <div>
                                {{item.firstDepartment}} — {{item.secondDepartment}}
                            </div>
                            <div>
                                <img @click="uncommonClick(index)" v-if="item.commonState == 1" src="/static/img/blue.png" alt="常见" title="常见">
                                <img @click="uncommonClick(index)" v-else src="/static/img/closeBlue.png" alt="不常见" title="不常见">
                                <!-- 是否为常见疾病：0-不是，1-是 -->
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png">
                                </div>
                                <div>
                                    <img @click="recycleClick(index)" src="/static/img/删除.png">
                                </div>
                            </div>
                        </li>
                        <li class="noList" v-show="dataList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>

                    </ul>
                    <div class="lastLi" v-show="dataList.length > 0">
                        <div>
                        </div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
                            </el-pagination>
                        </div>
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
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      okClickTrueOrFalse: true,
      uncommonClickTrueOrFalse: true,
      dataList: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 1,
      illnessModel: "", //模糊搜索输入框
      illnessModelUp: "", //模糊搜索输入框
      delIndex: "", //删除index
      loading: false,
      titlename: "", //删除弹框提示语
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      ifGetList: true,
      searchClickShow: false //判断是否筛选
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    if (sessionStorage.getItem("illnessPageSizeNum")) {
      this.pageSizeNum = Number(sessionStorage.getItem("illnessPageSizeNum"));
    }
    if (sessionStorage.getItem("illnessCurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("illnessCurrentPage"));
    }
    if (sessionStorage.getItem("illnessModel")) {
      this.illnessModel = this.illnessModelUp = sessionStorage.getItem(
        "illnessModel"
      );
      //console.log("aaaaaaaaaaaa", this.illnessModelUp);
      this.searchClickShow = true;
    }
    var self = this;

    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("illness") == -1) {
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
        if (sessionStorage.getItem("hospitalCurrentPage")) {
          self.currentPage = Number(
            sessionStorage.getItem("hospitalCurrentPage")
          );
        }
        if (sessionStorage.getItem("hospitalPageSizeNum")) {
          self.pageSizeNum = Number(
            sessionStorage.getItem("hospitalPageSizeNum")
          );
        }
        this.getillness();
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
    //获取疾病-分页
    getillness() {
      var self = this;
      self.ifGetList = false;
      self
        .getillnessList({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          diseaseName: self.illnessModelUp
        })
        .then(data => {
          //console.log("疾病管理列表", data);
          if (data.code == 200) {
            sessionStorage.removeItem("illnessPageSizeNum");
            sessionStorage.removeItem("illnessCurrentPage");
            sessionStorage.removeItem("illnessModel");
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length == 0) {
                  self.dataList = [];
                } else {
                  self.dataList = data.data.records;
                  self.totalNum = data.data.total;
                }
              } else {
                self.dataList = [];
              }
            } else {
              self.dataList = [];
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
          self.ifGetList = true;
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
          self.ifGetList = true;
        });
    },
    // 点击分页
    handleSizeChange(val) {
      if (this.searchClickShow) {
        this.illnessModelUp = this.illnessModel;
      } else {
        this.illnessModelUp = "";
      }
      this.pageSizeNum = val;
      this.getillness();
    },
    handleCurrentChange(val) {
      if (this.searchClickShow) {
        this.illnessModelUp = this.illnessModel;
      } else {
        this.illnessModelUp = "";
      }
      this.currentPage = val;
      this.getillness();
    },
    // 搜索点击
    searchClick() {
      if (this.illnessModel == "") {
        this.$message({
          type: "info",
          message: "请输入搜索关键词！"
        });
      } else {
        if (this.ifGetList == false) {
          this.$message({
            type: "info",
            message: "数据请求中请稍后！"
          });
        } else {
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.searchClickShow = true;
          this.illnessModelUp = this.illnessModel;
          this.getillness();
        }
      }
    },
    //常见/不常见按钮
    uncommonClick(index) {
      var isShow = "";
      if (this.dataList[index].commonState == 0) {
        isShow = 1;
      } else if (this.dataList[index].commonState == 1) {
        isShow = 0;
      }
      var self = this;
      if (self.uncommonClickTrueOrFalse == true) {
        self.uncommonClickTrueOrFalse = false;
        self
          .getMedicaldiseasedelete({
            diseaseId: self.dataList[index].id,
            commonState: isShow
          })
          .then(data => {
            self.uncommonClickTrueOrFalse = true;
            //console.log("疾病管理列表", data);
            if (data.code == 200) {
              self.getillness();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.uncommonClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 编辑疾病
    updateClick(index) {
      var self = this;
      let illnessdata = JSON.stringify(self.dataList[index]);
      sessionStorage.setItem("illnessdata", illnessdata);
      sessionStorage.setItem("illnessPageSizeNum", this.pageSizeNum);
      sessionStorage.setItem("illnessCurrentPage", this.currentPage);
      sessionStorage.setItem("illnessModel", this.illnessModelUp);
      this.$router.push({
        path: "/medical/addillness",
        query: { operation: 1 }
      });
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okClickTrueOrFalse == true) {
        self.okClickTrueOrFalse = false;
        self
          .getMedicaldiseasedelete({
            diseaseId: self.dataList[self.delIndex].id
          })
          .then(data => {
            self.okClickTrueOrFalse = true;
            //console.log("疾病管理列表", data);
            if (data.code == 200) {
              self.$message({
                type: 'success',
                message: '删除成功！'
              })
              if (self.dataList.length == 1) {
                if (self.currentPage == 1) {
                  self.currentPage = 1;
                } else if (self.currentPage > 1) {
                  self.currentPage = self.currentPage - 1;
                }
              }
              self.getillness();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }

      this.isShowdel = true;
      this.delShow = false;
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 删除
    recycleClick(index) {
      this.titlename = "该疾病将被删除，该操作无法恢复！";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 添加商品
    addCommClick() {
      this.$router.push({
        path: "/medical/addillness"
      });
    },
    ...mapActions(["getillnessList", "getMedicaldiseasedelete"])
  },
  // 监视
  watch: {
    illnessModel: function(val) {
      this.changeval = val.length;
      if (this.changeval == 0) {
        if (this.searchClickShow) {
          this.illnessModelUp = "";
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.getillness();
        }
      }
    }
  }
};
</script>
<style scoped>
label {
  margin-bottom: 0 !important;
}

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

.uncommon {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: url("/static/img/elf.png") no-repeat 38.5% 73%;
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

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.checkCl span {
  height: 40px;
  margin-top: 1px;
  display: block;
  font-size: 15px;
}

.firstLi {
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  font-weight: bold;
  font-size: 16px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #f2f4f8;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #f2f4f8;
}

.dataLi .operate {
  display: flex;
  align-items: center;
}

.dataLi .operate > div {
  width: 25px;
  height: 25px;
}

.dataLi .operate > div:nth-child(1) {
  margin-right: 10px;
}

.dataLi .operate > div:nth-child(2) {
  margin-left: 10px;
}

.operate img {
  width: 100%;
  cursor: pointer;
  height: 100%;
}

.listCont .firstLi > div:nth-child(2) {
  width: 25%;
}

.listCont ul {
  border-top: 1px solid #ececec;
}

.listCont li {
  display: flex;
  height: 50px;
}

.listCont .firstLi > div,
.listCont .dataLi > div {
  text-align: center;
  line-height: 49px;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 10%;
}

.listCont .dataLi > div:nth-child(2) {
  width: 25%;
}

.listCont li > div:nth-child(3) {
  width: 25%;
}

.listCont li > div:nth-child(4) {
  width: 18%;
}

.listCont li > div:nth-child(5) {
  width: 22%;
  display: flex;
  justify-content: center;
}

.listCont li > div:nth-child(5) div {
  line-height: 25px;
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
  color: #5acdfa;
  cursor: pointer;
  border: 1px solid #5acdfa;
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
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
}

.searchInput {
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
  width: 220px;
}
.searchInput input {
  padding-left: 10px;
}
input::-webkit-input-placeholder {
  color: #97a8be;
}

input:-moz-input-placeholder {
  color: #97a8be;
}

input::-moz-input-placeholder {
  color: #97a8be;
}

input:-ms-input-placeholder {
  color: #97a8be;
}
.searchBut {
  margin-left: 25px;
  width: 70px;
  height: 32px;
  background-color: #5acdfa;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
}

.firstLi > div {
  overflow: hidden;
  padding: 0 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>