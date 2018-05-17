<!--用户管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="user">
    <div>
      <div class="listTitle">
        <div>
          用户管理
        </div>
      </div>
      <div class="menu">
        <div class="menuLeft">
          <div>
            <div>
            </div>
            <div>
              <input type="text" v-model="searchMolue" placeholder="昵称或手机搜索">
            </div>
          </div>
          <div class="search">
            <div @click="searchClick">
              搜索
            </div>
          </div>
        </div>
      </div>
      <!--列表-->
      <div class="list" v-loading="loading">
        <ul>
          <li class="listLi firstLi">
            <div title="序号">序号</div>
            <div title="姓名">姓名</div>
            <div title="手机">手机</div>
            <div title="性别">性别</div>
            <div title="地域">地域</div>
            <div title="年龄">年龄</div>
            <div title="身高">身高</div>
            <div title="体重">体重</div>
            <div title="健康档案">健康档案</div>
            <div title="健康数据">健康数据</div>
            <div title="医疗记录">医疗记录</div>
            <div title="关联账号">关联账号</div>
            <div title="操作">操作</div>
          </li>
          <li v-show="lists.length > 0" class="listLi dataLi" v-for="(item,index) in lists" :key="index">
            <div>{{index+1}}</div>
            <div>{{item.userInfo.name | strFun}}</div>
            <div>{{item.userInfo.phone | strFun}}</div>
            <div>{{item.userInfo.gender | sexFun}}</div>
            <div>{{item.userInfo.provinceId | provinceFun}}</div>
            <div>{{item.userInfo.birthday | birthdayFun}}</div>
            <div>{{item.userInfo.height | strFun}}</div>
            <div>{{item.userInfo.weight | strFun}}</div>
            <div @click="healthFileClick(index)">点击查看</div>
            <div @click="healthData">点击查看</div>
            <div @click="medicalRecord">点击查看</div>
            <div @click="relatedClick(index)">查看</div>
            <div class="operate">
              <div>
                <img @click="detailsdateClick(index)" src="/static/img/查看.png" title="编辑">
              </div>
              <template v-if="item.enable == 0">
                <div>
                  <img @click="stateClick(index)" src="/static/img/禁用.png" title="禁用">
                </div>
              </template>
              <template v-else>
                <div>
                  <img @click="stateClick(index)" src="/static/img/选中-禁用.png" title="启用">
                </div>
              </template>
            </div>
          </li>
          <li class="noList" v-show="lists.length == 0">
            <div>
              <img src="/static/img/w.png" alt="">
            </div>
          </li>
          <li v-show="lists.length > 0" class="lastLi">
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
    <!-- 关联账号弹出框 -->
    <div :class="{relatedAccount:isRelated,showRelated:isShowRelated}">
      <transition name="slide-fade">
        <div class="relatedContent" v-show="relatedShow" v-loading="relatedloading">
          <div class="relatedTitle">
            <div>关联账号信息</div>
            <div @click="closeClick">
              <img src="/static/img/小叉号@2x.png" alt="">
            </div>
          </div>
          <div></div>
          <div class="relatedList" v-loading="loading">
            <div>
              <ul>
                <li class="relatedListLi relatedFirstLi">
                  <div>关系</div>
                  <div>姓名</div>
                  <div>手机号</div>
                  <div>上次活跃时间</div>
                </li>
                <li v-show="relatedList.length > 0" v-for="(item,index) in relatedList" :key="index" class="relatedListLi relatedDataLi">
                  <div>{{item.relation | strFun}}</div>
                  <div>{{item.name | strFun}}</div>
                  <div>{{item.phone | strFun}}</div>
                  <div>{{item.lastActiveTime | timeFun}}</div>
                </li>
                <li v-show="relatedList.length == 0">
                    <div>
                      <img src="/static/img/w.png"/> 
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>
<script>
import { mapActions } from "vuex";
import select from "../../cModule/select";
import hosdel from "../../cModule/healthdel";
export default {
  components: {
    "v-select": select,
    "v-hosdel": hosdel
  },
  data() {
    return {
      loading: false,
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      searchMolue: "",

      isRelated: true,
      isShowRelated: true,
      relatedShow: false,
      relatedloading: false,
      relatedList: [] //关联账号列表
    };
  },
  // 过滤
  filters: {
    provinceFun: function(val) {
      if (val) {
        switch (val) {
          case "2":
            return "北京";
            break;
          case "3":
            return "安徽";
            break;
          case "4":
            return "福建";
            break;
          case "5":
            return "甘肃";
            break;
          case "6":
            return "广东";
            break;
          case "7":
            return "广西";
            break;
          case "8":
            return "贵州";
            break;
          case "9":
            return "海南";
            break;
          case "10":
            return "河北";
            break;
          case "11":
            return "河南";
            break;
          case "12":
            return "黑龙江";
            break;
          case "13":
            return "湖北";
            break;
          case "14":
            return "湖南";
            break;
          case "15":
            return "吉林";
            break;
          case "16":
            return "江苏";
            break;
          case "17":
            return "江西";
            break;
          case "18":
            return "辽宁";
            break;
          case "19":
            return "内蒙古";
            break;
          case "20":
            return "宁夏";
            break;
          case "21":
            return "青海";
            break;
          case "22":
            return "山东";
            break;
          case "23":
            return "山西";
            break;
          case "24":
            return "陕西";
            break;
          case "25":
            return "上海";
            break;
          case "26":
            return "四川";
            break;
          case "27":
            return "天津";
            break;
          case "28":
            return "西藏";
            break;
          case "29":
            return "新疆";
            break;
          case "30":
            return "云南";
            break;
          case "31":
            return "浙江";
            break;
          case "32":
            return "重庆";
            break;
          case "33":
            return "香港";
            break;
          case "34":
            return "澳门";
            break;
          case "35":
            return "台湾";
            break;
          default:
            break;
        }
      } else {
        return "无";
      }
    },
    birthdayFun: function(val) {
      if (val) {
        var date = new Date();
        var y = date.getFullYear();
        var now = new Date(val);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        var date = now.getDate();
        date = date > 9 ? date : "0" + date;
        //   return year + '-' + month + '-' + date
        var age = y - year;
        return age;
      } else {
        return "无";
      }
    },
    sexFun: function(val) {
      if (val) {
        if (val == 1) {
          return "男";
        } else {
          return "女";
        }
      } else {
        return "无";
      }
    },
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    //时间过滤函数
    timeFun: function(val) {
      var time = Number(val);
      if (time) {
        var now = new Date(time);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        var date = now.getDate();
        date = date > 9 ? date : "0" + date;
        var hour = now.getHours();
        hour = hour > 9 ? hour : "0" + hour;
        var minute = now.getMinutes();
        minute = minute > 9 ? minute : "0" + minute;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
      } else {
        return "无";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    // 权限限制
    self.loading = true;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (sessionStorage.getItem("healUsercurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("healUsercurrentPage"));
      this.pageSizeNum = Number(sessionStorage.getItem("healUserpageSizeNum"));
    }
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
      if (arrs.indexOf("user") == -1) {
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
        if (sessionStorage.getItem("healUsersearchName")) {
          self.searchMolue = sessionStorage.getItem("healUsersearchName");
          self.listbrandNameFun();
        } else {
          self.listsFun();
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
    // 初始数据
    listsFun() {
      sessionStorage.removeItem("healUsercurrentPage");
      sessionStorage.removeItem("healUserpageSizeNum");
      var self = this;
      self.loading = true;
      self
        .getuserinfoList({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          // console.log("查询健康用户列表", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.list) {
                if (data.data.list.length > 0) {
                  self.lists = data.data.list;
                  self.totalNum = data.data.count;
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
    // 有搜索内容时初始数据
    listbrandNameFun() {
      var self = this;
      self.loading = true;
      self.currentPage = 1;
      self
        .getuserinfoList({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          name: self.searchMolue
        })
        .then(data => {
          self.loading = false;
          sessionStorage.removeItem("healUsersearchName");
          // console.log("搜索健康用户列表", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            if (data.data) {
              if (data.data.list) {
                if (data.data.list.length > 0) {
                  self.lists = data.data.list;
                  self.totalNum = data.data.count;
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
          sessionStorage.removeItem("healUsersearchName");
          self.lists = [];
          // console.log(msg)
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listsFun();
    },
    // 调整每页个数
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listsFun();
    },
    //关联账户
    relatedClick(index) {
      var self = this;
      self
        .gethealthRecordsgetRelationAccountInfo({
          userId: self.lists[index].userInfo.userId
        })
        .then(data => {
          if (data.code == 200) {
            this.isShowRelated = false;
            this.relatedShow = true;
            if (data.data) {
              if (data.data.length > 0) {
                self.relatedList = data.data;
              } else {
                self.relatedList = [];
              }
            } else {
              self.relatedList = [];
            }
          } else {
            self.relatedList = [];
          }
        })
        .catch(msg => {});
    },
    //关闭关联账户弹框
    closeClick() {
      this.relatedShow = false;
      this.isShowRelated = true;
    },
    //查看健康档案
    healthFileClick(index) {
      var self = this;
      self.$router.push({
        path: "healthFile"
      });
      sessionStorage.setItem("idUser", self.lists[index].userInfo.userId);
    },
    //查看健康数据
    healthData() {
      var self = this;
      self.$router.push({
        path: "healthData"
      });
    },
    //查看医疗记录
    medicalRecord() {
      var self = this;
      self.$router.push({
        path: "medicalRecord"
      });
    },
    // 状态切换
    stateClick(index) {
      var self = this;
      var enaSta = "";
      if (self.lists[index].enable == 0) {
        enaSta = 1;
      } else {
        enaSta = 0;
      }
      var TOKEN = sessionStorage.getItem("token");
      self
        .getStateAcount({
          id: self.lists[index].id,
          enable: enaSta,
          token: TOKEN
        })
        .then(data => {
          // console.log('修改状态', data)
          if (data.code == 200) {
            self.$message({
              type: "success",
              message: "修改状态成功！"
            });
            if (self.searchMolue.length > 0) {
              self.listbrandNameFun();
            } else {
              self.listsFun();
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
    },
    // 详情页面
    detailsdateClick(index) {
      var self = this;
      if (self.searchMolue.length > 0) {
        sessionStorage.setItem("healUsersearchName", self.searchMolue);
      } else {
        sessionStorage.setItem("healUsercurrentPage", self.currentPage);
        sessionStorage.setItem("healUserpageSizeNum", self.pageSizeNum);
      }
      this.$router.push({
        path: "/health/dateilsuser",
        query: {
          id: self.lists[index].id
        }
      });
    },
    // 搜索
    searchClick() {
      var self = this;
      if (self.searchMolue.length > 0) {
        self.loading = true;
        self.currentPage = 1;
        self
          .getuserinfoList({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            name: self.searchMolue
          })
          .then(data => {
            self.loading = false;
            // console.log("搜索健康用户列表", JSON.parse(JSON.stringify(data)))
            if (data.code == 200) {
              if (data.data) {
                if (data.data.list) {
                  if (data.data.list.length > 0) {
                    self.lists = data.data.list;
                    self.totalNum = data.data.count;
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
      }
    },
    ...mapActions([
      "getuserinfoList",
      "getFindgetUserHealthData",
      "getStateAcount",
      "gethealthRecordsgetRelationAccountInfo"
    ])
  },
  // 监视
  watch: {
    searchMolue: function(val) {
      if (val.length == 0) {
        var self = this;
        self.currentPage = 1;
        self.pageSizeNum = 10;
        self.listsFun();
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

input {
  padding-left: 10px;
  width: 220px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
}

.dataLi .operate {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.dataLi .operate > div {
  width: 24px;
  height: 24px;
  margin-left: 10px;
  margin-right: 10px;
}

.operate img {
  width: 100%;
  cursor: pointer;
  height: 100%;
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

.dataLi {
  height: 50px;
}

.list > ul > li {
  display: flex;
  min-height: 50px;
  border-top: 1px solid #e5e7eb;
}

.firstLi {
  background-color: #f2f4f8;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  font-weight: bold;
  color: #303030;
}

.listLi > div {
  border-left: 1px solid #e5e7eb;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* line-height: 50px; */
  text-align: center;
}

.listLi > div:last-of-type {
  border-right: 1px solid #e5e7eb;
}

.listLi > div:nth-child(1) {
  width: 5%;
  min-width: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
}

.listLi > div:nth-child(2) {
  width: 10%;
  min-width: 50px;
  overflow: hidden;
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(3) {
  width: 15%;
  min-width: 50px;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(4) {
  width: 5%;
  min-width: 20px;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(5) {
  width: 10%;
  line-height: 50px;
  min-width: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(6) {
  width: 5%;
  min-width: 20px;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(7) {
  width: 5%;
  min-width: 20px;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(8) {
  width: 5%;
  min-width: 20px;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi > div:nth-child(9) {
  width: 10%;
  cursor: pointer;
  line-height: 50px;
  min-width: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.listLi:not(:nth-child(1)) > div:nth-child(9) {
  color: #4cc0de;
}

.listLi > div:nth-child(10) {
  width: 10%;
  cursor: pointer;
  line-height: 50px;
  min-width: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi:not(:nth-child(1)) > div:nth-child(10) {
  color: #4cc0de;
}

.listLi > div:nth-child(11) {
  width: 10%;
  line-height: 50px;
  cursor: pointer;
  min-width: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listLi:not(:nth-child(1)) > div:nth-child(11) {
  color: #4cc0de;
}

.listLi > div:nth-child(12) {
  width: 10%;
  cursor: pointer;
  min-width: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
}

.listLi:not(:nth-child(1)) > div:nth-child(12) {
  color: #4cc0de;
}

.listLi > div:nth-child(13) {
  width: 9%;
  min-width: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.user {
  width: 100%;
  height: 100%;
}

.user > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  overflow: hidden;
  min-height: 540px;
  width: 100%;
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

.menu {
  height: 80px;
  align-items: center;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.menuLeft {
  display: flex;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 23px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  font-size: 14px;
  margin-right: 5px;
  min-width: 0px;
  margin-left: 0;
}

.menuLeft .search {
  width: 100px;
  height: 100%;
}

.menuLeft .search > div:nth-child(1) {
  margin-top: 1px;
  border-radius: 3px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 28px;
  background-color: #51d0c7;
}

/* 关联账户弹出框 */

.relatedAccount {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showRelated {
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

.relatedContent {
  width: 800px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  z-index: 1;
}

.relatedContent > div:nth-child(1) {
  width: 100%;
  margin: 35px auto 25px 20px;
  display: flex;
}

.relatedContent > div:nth-child(1) > div:nth-child(1) {
  font-size: 14px;
  font-weight: bold;
  margin-left: 35px;
}

.relatedContent > div:nth-child(1) > div:nth-child(2) {
  margin-left: 580px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.relatedContent > div:nth-child(2) {
  width: 100%;
  height: 0;
}

.relatedContent img {
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin: 8px;
}

.relatedContent > div:nth-child(2) {
  width: 100%;
  height: 0;
}

.relatedTitle > div:nth-child(1) {
  font-size: 16px !important;
}

.relatedList > div {
  padding: 0 100px 100px 100px;
}

.relatedList:last-child img {
  width: 500px;
  height: 400px;
  margin-left: 50px;
}

.relatedList ul {
  margin: 0;
  padding: 0;
}

.relatedList ul li {
  display: flex;
  min-height: 50px;
  border: 0.5px solid #e5e7eb;
}

.relatedListLi > div {
  width: 80%;
  border-left: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.relatedList .relatedFirstLi {
  background-color: #f2f4f8;
  height: 58px;
}

.relatedList .relatedDataLi:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}

.relatedListLi > div:nth-child(1) {
  width: 15%;
}

.relatedListLi > div:nth-child(2) {
  width: 25%;
}

.relatedListLi > div:nth-child(3) {
  width: 30%;
}

.relatedListLi > div:nth-child(4) {
  width: 30%;
}
</style>