<!--医疗记录-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        医疗记录
                    </div>
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <el-date-picker @change="dateChange" v-model="datevalue" format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="search">
                        <div @click="searchClick">
                            搜索
                        </div>
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <ul>
                    <li class="listLi firstLi">
                        <div>指标</div>
                        <div>修改时间</div>
                        <div>指标数据</div>
                        <div>单位</div>
                        <div>数据来源</div>
                        <div>状态</div>
                    </li>
                    <li v-show="lists.length > 0" v-loading="loading" class="listLi dataLi" v-for="(item,index) in lists">
                        <div>{{item.indexName}}</div>
                        <div>{{item.updateDate | timeFun}}</div>
                        <div>{{item.indexValue}}</div>
                        <div>{{item.indexUnit | strFUn}}</div>
                        <div>{{item.source | sourceFun}}</div>
                        <div>{{item.status | stateFun}}</div>
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
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
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
      datevalue: "",
      date: ""
    };
  },
  // 过滤
  filters: {
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
    strFUn: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    sourceFun: function(val) {
      if (val == 0) {
        return "用户录入";
      } else {
        return "设备录入";
      }
    },
    stateFun: function(val) {
      if (val == 0) {
        return "正常";
      } else if (val == -1) {
        return "偏低";
      } else if (val == 1) {
        return "偏高";
      } else if (val == 99) {
        return "无标志值验证";
      }
    },
    sourceFun: function(val) {
      if (val == 0) {
        return "用户录入";
      } else {
        return "设备录入";
      }
    },
    timeFun: function(val) {
      if (val) {
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
        return (
          "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute
        );
      } else {
        return "无";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
    self.loading = true;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
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
        self.loading = true;
        self
          .getFindgetUserHealthData({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            userId: self.$route.query.id
          })
          .then(data => {
            self.loading = false;
            // console.log("查询健康用户详情", JSON.parse(JSON.stringify(data)));
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
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            // console.log(msg);
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
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
    // 箭头返回上一页
    canelClick() {
      this.$router.push({
        path: "/health/user"
      });
    },
    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      var obj = {};
      if (self.date) {
        obj = {
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          userId: self.$route.query.id,
          date: self.date
        };
      } else {
        obj = {
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          userId: self.$route.query.id
        };
      }
      self
        .getFindgetUserHealthData(obj)
        .then(data => {
          //   console.log("查询健康用户详情", JSON.parse(JSON.stringify(data)));
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
        });
    },
    // 调整每页个数
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self
        .getFindgetUserHealthData({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          userId: self.$route.query.id
        })
        .then(data => {
          //   console.log("查询健康用户详情", JSON.parse(JSON.stringify(data)));
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
        });
    },
    // 根据时间搜索 on the basis of time search
    searchClick() {
      var self = this;
      //   console.log(self.date);
      if (self.date) {
        self
          .getFindgetUserHealthData({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            userId: self.$route.query.id,
            date: self.date
          })
          .then(data => {
            // console.log("查询健康用户详情", JSON.parse(JSON.stringify(data)));
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
              message: "服务器异常"
            });
          });
      } else {
        self.loading = true;
        self
          .getFindgetUserHealthData({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            userId: self.$route.query.id
          })
          .then(data => {
            self.loading = false;
            // console.log("查询健康用户详情", JSON.parse(JSON.stringify(data)));
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
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            // console.log(msg);
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    dateChange(val) {
      var self = this;
      this.date = val;
      if (val == undefined) {
        self
          .getFindgetUserHealthData({
            pageNo: 1,
            pageSize: self.pageSizeNum,
            userId: self.$route.query.id
          })
          .then(data => {
            // console.log("查询健康用户详情", JSON.parse(JSON.stringify(data)));
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
              message: "服务器异常"
            });
          });
      }
    },
    ...mapActions([
      "getFindgetUserHealthData",
      "getfindAreaFromRedisList",
      "getfindAgeGroupFromRedisList",
      "getAddstandardData",
      "getfindStandardDataList",
      "getListResRole"
    ])
  },
  // 监视
  watch: {
    datevalue: function(val) {}
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

.list > ul > li {
  display: flex;
  min-height: 50px;
  border-top: 1px solid #e5e7eb;
}

.firstLi {
  background-color: #f2f4f8;
  height: 58px;
}

.dataLi {
  height: 50px;
}

.listLi > div {
  border-left: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listLi > div:last-of-type {
  border-right: 1px solid #e5e7eb;
}

.listLi > div:nth-child(1) {
  width: 15%;
}

.listLi > div:nth-child(2) {
  width: 20%;
}

.listLi > div:nth-child(3) {
  width: 20%;
}

.listLi > div:nth-child(4) {
  width: 10%;
}

.listLi > div:nth-child(5) {
  width: 20%;
}

.listLi > div:nth-child(6) {
  width: 15%;
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
/*主页*/

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

.listTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  /*font-weight: 600;*/
  margin-left: 10px;
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
  height: 80px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
  min-width: 200px;
}

.menuLeft .search {
  width: 100px;
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

select {
  width: 114px;
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