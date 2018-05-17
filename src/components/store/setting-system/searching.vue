<!--系统设置-用户检索记录-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="sale">
        <div>
            <div class="listTitle">
                <div>
                    检索记录
                </div>
            </div>
            <div class="symptomList" v-loading="loading">
                <div class="list">
                    <div class="listCont">
                        <ul>
                            <li class="firstLi">
                                <div title="关键词"> 
                                    关键词
                                </div>
                                <div title="结果">
                                    结果
                                </div>
                                <div title="总所搜次数">
                                    总搜索次数
                                </div>
                                <div title="本日搜搜次数">
                                    本日搜索次数
                                </div>
                                <div title="本周搜索次数">
                                    本周搜索次数
                                </div>
                                <div title="本月所搜次数">
                                    本月搜索次数
                                </div>
                                <div title="操作">
                                    操作
                                </div>
                            </li>
                            <li class="dataLi" v-for="(item,index) in dataList">
                                <div>
                                    {{item.searchWord}}
                                </div>
                                <div>
                                    暂无
                                </div>
                                <div>
                                    {{item.sumSearchTimes}}
                                </div>
                                <div>
                                    {{item.daySearchTimes}}
                                </div>
                                <div>
                                    {{item.weekSearchTimes}}
                                </div>
                                <div>
                                    {{item.monthSearchTimes}}
                                </div>
                                <div>
                                    <div class="remove" @click='delClick(index)'></div>
                                </div>
                            </li>
                            <!-- 暂无数据 -->
                            <li class="noList" v-show="dataList.length == 0">
                                <div>
                                    <img src="/static/img/w.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="paging" v-show='dataList.length > 0'>
                <div class="lastLiRight">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                        </el-pagination>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="delName">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okCanleClick" @canle="noCanleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/newdel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      dataList: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 10,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delName: "",
      loading: false,
      foodseek: "",
      delId: "",
      okCanleClickTrue: false
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
            if (one.name == "系统设置") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("system") == -1) {
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
        if (comms.indexOf("searching") == -1) {
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
          //   console.log("持有权限");
          self.gitList();
          self.loading = true;
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
    // 获取列表
    gitList() {
      //   console.log("获取列表");
      var self = this;
      self.loading = true;
      self
        .getsearchingList({
          type: "mall",
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          token: self.token
        })
        .then(data => {
          //   console.log("检索", data);
          if (data.code == 200) {
            self.loading = false;
            self.dataList = data.data.records;
            self.totalNum = data.data.total;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器错误"
          });
          //   console.log(msg);
        });
    },
    //删除
    delClick(index) {
      this.delId = this.dataList[index].id;
      this.titlename = "数据";
      this.isShowdel = false;
      this.delShow = true;
    },
    //确认删除
    okCanleClick() {
      var self = this;
      if (self.okCanleClickTrue == false) {
        self.okCanleClickTrue = true;
        self
          .getDelSearching({
            id: self.delId
          })
          .then(data => {
            self.okCanleClickTrue = false;
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              if (self.dataList.length == 1) {
                if (self.currentPage == 1) {
                  self.currentPage = 1;
                } else if (self.currentPage > 1) {
                  self.currentPage = self.currentPage - 1;
                }
              }
              self.gitList();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器错误"
            });
            self.isShowdel = true;
            self.delShow = false;
            self.okCanleClickTrue = false;
          });
      }
    },
    //取消删除
    noCanleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 点击分页
    handleSizeChange(val) {
      //   console.log(val);
      this.pageSizeNum = val;
      this.gitList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gitList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    ...mapActions(["getsearchingList", "getDelSearching"])
  }
};
</script>
<style scoped>
/*主页*/

.sale {
  width: 100%;
  height: 100%;
}

.sale > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

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

.symptomList {
  width: 100%;
  margin-top: 24px;
}

.listCont li {
  display: flex;
  height: 50px;
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

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 7px;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  color: #515151;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 7px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.dataLi > div:nth-child(7) {
  display: flex;
}

.listCont li > div:nth-child(1) {
  width: 14%;
  min-width: 85px;
}

.listCont li > div:nth-child(2) {
  width: 14%;
  min-width: 85px;
}

.listCont li > div:nth-child(3) {
  width: 15%;
  min-width: 85px;
}

.listCont li > div:nth-child(4) {
  width: 14%;
  min-width: 85px;
}

.listCont li > div:nth-child(5) {
  width: 14%;
  min-width: 85px;
}

.listCont li > div:nth-child(6) {
  width: 14%;
  min-width: 85px;
}

.listCont li > div:nth-child(7) {
  width: 15%;
  min-width: 85px;
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

.compile {
  width: 25px;
  height: 25px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 20% 37%;
  cursor: pointer;
}

.remove {
  width: 25px;
  height: 25px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 29% 37%;
  cursor: pointer;
  margin: auto;
}
/*删除弹出框*/

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

.paging {
  width: calc(100% - 36px);
  float: left;
  margin-bottom: 28px;
  margin-top: 28px;
}

.lastLiRight {
  float: right;
}

.foodSeek {
  width: 100%;
  margin-top: 24px;
  margin-left: 36px;
}

.foodSeek input {
  float: left;
  width: 175px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #303030;
  padding-left: 12px;
}

.seekButton {
  width: 68px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  background-color: #f66037;
  border-radius: 4px;
  color: #ffffff;
  margin-left: 20px;
  display: inline-block;
  cursor: pointer;
}
</style>