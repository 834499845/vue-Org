<!--版本管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    版本管理
                </div>
                <div @click="addClick">
                    新增版本
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div>
                                版本名称
                            </div>
                            <div>
                                版本号
                            </div>
                            <div>
                                版本类型
                            </div>
                            <div>
                                文件大小
                            </div>
                            <div>
                                下载次数
                            </div>
                            <div>
                                状态
                            </div>

                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists" :key="index">
                            <div class="dateTxt">
                                {{item.versionName | strFun}}
                            </div>
                            <div class="dateTxt">
                                {{item.versionCode |　strFun}}
                            </div>
                            <div class="dateTxt">
                                {{item.type |　strFun}}
                            </div>
                            <div class="dateTxt">
                                {{item.size |　strFun}}
                            </div>
                            <div class="dateTxt">
                                {{item.times | strFun}}
                            </div>
                            <div class="dateTxt">
                                {{item.state |　stateFun}}
                            </div>
                            <div class="operate">
                                <div @click="lookClick(index)"><img src="/static/img/查看.png"></div>
                                <div @click="updateClick(index)"><img src="/static/img/编辑.png"></div>
                                <div @click="deleteClick(index)"><img src="/static/img/删除.png"></div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="lists.length > 0">
                            <div class="lastLiLeft">
                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum"
                                    :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
                                    </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--delete popup-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @ok="delClick" @canle="cancleClick" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/newdel";
export default {
  components: {
    "v-storeDel": storeDel
  },
  data() {
    return {
      loading: false,
      deling: false,
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      dataTrue: false,
      delClickTrue: false
    };
  },
  // filters
  filters: {
    strFun: function(val) {
      if (val == 0) {
        return val;
      } else {
        return val;
      }
    },
    stateFun: function(val) {
      if (val == 1) {
        return "已发布";
      } else {
        return "未发布";
      }
    }
  },
  // initialize function
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
        if (ele.name == "公共管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("versions") == -1) {
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
  // count property
  mounted() {},
  // incident function
  methods: {
    // initialize data
    listFun() {
      var self = this;
      self.loading = true;
      self
        .getbaseappVersionpage({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          // console.log("列表", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  self.totalNum = data.data.total;
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
          // console.log(msg)
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // paging-pageNumber
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun();
    },
    //  paging-pageSize
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun();
    },
    // compile
    updateClick(index) {
      var self = this;
      this.$router.push({
        path: "/common/opVersions",
        query: { op: 2, id: self.lists[index].id }
      });
    },
    // addtion
    addClick() {
      this.$router.push({
        path: "/common/opVersions",
        query: { op: 1 }
      });
    },
    // part name details
    lookClick(index) {
      var self = this;
      this.$router.push({
        path: "/common/lookVersions",
        query: { op: 2, id: self.lists[index].id }
      });
    },
    // delete
    deleteClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
      this.titlename = "版本";
    },
    // affirm delete
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.deling = true;
        self.delClickTrue = true;
        self
          .getbaseappVersiondelete({
            id: self.lists[self.delIndex].id
          })
          .then(data => {
            self.deling = false;
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              var currNum = self.currentPage;
              if (self.lists.length == 1 && self.currentPage > 1) {
                self.currentPage = currNum - 1;
              }
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // cancel delete
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
      this.titlename = "";
    },
    ...mapActions(["getbaseappVersionpage", "getbaseappVersiondelete"])
  },
  // watch model
  watch: {}
};
</script>
<style scoped>
.list .nullList {
  height: 400px;
}

.list .nullList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.sale {
  width: 100%;
  height: 100%;
}

.sale > div {
  overflow: hidden;
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

.operate {
  align-items: center;
  display: flex;
  border-right: 1px solid #ececec;
  overflow: hidden;
}

.operate > div {
  width: 24px;
  height: 24px;
  cursor: pointer;
  overflow: hidden;
  align-items: center;
  display: flex;
}

.operate > div:nth-child(1) {
  margin-right: 14px;
}

.operate > div:nth-child(3) {
  margin-left: 14px;
}

.operate > div img {
  width: 100%;
  height: 100%;
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

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
}

.listCont .dataLi .dateTxt {
  border-right: 1px solid #ececec;
  font-size: 14px;
  color: #515151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.listCont .firstLi > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 10px;
  padding-right: 10px;
}

.dataLi > div:nth-child(1) {
  cursor: pointer;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 20%;
  min-width: 100px;
  text-align: center;
}

.listCont li > div:nth-child(2) {
  width: 20%;
  min-width: 100px;
  text-align: center;
}

.listCont li > div:nth-child(3) {
  width: 15%;
  min-width: 80px;
}

.listCont li > div:nth-child(4) {
  width: 10%;
  min-width: 50px;
}

.listCont li > div:nth-child(5) {
  width: 10%;
  min-width: 50px;
}

.listCont li > div:nth-child(6) {
  width: 10%;
  min-width: 55px;
}

.listCont li > div:nth-child(7) {
  width: 15%;
  min-width: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  margin-top: 30px;
  overflow: hidden;
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
  font-size: 14px;
  color: #97969b;
  border: 1px solid #d1d1d1;
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
  border-radius: 4px;
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
  display: flex;
  align-items: center;
  justify-content: center;
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