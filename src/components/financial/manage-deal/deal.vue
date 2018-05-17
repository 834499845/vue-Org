<!--交易记录-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    交易记录
                </div>
                <div>
                    <!--新增热词-->
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="list-nav">
                    <div @click="subClick(2)" :class="{navsel:isNavsel == 2}">充值</div>
                    <div @click="subClick(3)" :class="{navsel:isNavsel == 3}">提现</div>
                </div>
                <div class="list-cont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div v-for="item in navs" :key="item">{{item}}</div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists"  :key="index">
                            <div>{{index + 1}}</div>
                            <div>{{item.name | strFun}}</div>
                            <div>
                                <!-- <div> -->
                                    {{item.financialType | typeFun}}
                                <!-- </div> -->
                                <!-- <div>
                                    {{item.owner | strFun}}
                                </div> -->
                            </div>
                            <div>{{item.money | moneyFun}}</div>
                            <div>{{item.operationDate}}</div>
                            <div :class="{rst:isRst == item.state ? true : false,gst:isGst}">{{item.state | stateFun}}</div>
                            <div>{{item.remark | strFun}}</div>
                            <div>{{item.payOrderNo | strFun}}</div>
                        </li>
                        <li class="noList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="lists.length > 0">
                            <div class="lastPag">
                            </div>
                            <div class="lastSel">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum"
                                    :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
                                    </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/select";
import hosdel from "../../cModule/newdel";
export default {
  components: {
    "v-minput": minput,
    "v-select": select,
    "v-hosdel": hosdel
  },
  data() {
    return {
      isRst: 2,
      isGst: true,
      loading: false,
      isNavsel: 2,
      navs: [],
      recharges: [
        "序号",
        "用户名",
        "充值方式",
        "充值金额",
        "充值时间",
        "充值结果",
        "备注",
        "交易号"
      ],
      deposits: [
        "序号",
        "用户名",
        "提现方式",
        "提现金额",
        "提现时间",
        "提现结果",
        "备注",
        "交易号"
      ],
      lists: [],
      pageSizeNum: 10,
      totalNum: 0,
      currentPage: 1,
      subClickTrue: false
    };
  },
  // 过滤
  filters: {
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
        var seconds = now.getSeconds();
        minute = minute > 9 ? minute : "0" + minute;
        return (
          "20" +
          year +
          "-" +
          month +
          "-" +
          date +
          "  " +
          hour +
          ":" +
          minute +
          ":" +
          seconds
        );
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
    moneyFun: function(val) {
      if (val) {
        return val + " 元";
      } else {
        return "无";
      }
    },
    typeFun: function(val) {
      if (val) {
        if (val == 0) {
          return "余额";
        } else if (val == 1) {
          return "支付宝";
        } else if (val == 2) {
          return "微信";
        } else if (val == 3) {
          return "银联";
        }
      } else {
        return "无";
      }
    },
    stateFun: function(val) {
      if (val) {
        if (val == 0) {
          return "交易中";
        } else if (val == 1) {
          return "交易成功";
        } else if (val == 2) {
          return "交易失败";
        } else if (val == 4) {
          return "待收款";
        } else if (val == 3) {
          return "交易取消";
        }
      } else {
        return "无";
      }
    }
  },
  // 模块新建时
  created: function() {
    this.navs = this.recharges;
    // 默认获取充值列表
    var self = this;
    self.loading = true;
    self
      .getDetailPageList({
        pageNo: self.currentPage,
        pageSize: self.pageSizeNum,
        subjects: 2
      })
      .then(data => {
        // console.log("列表", JSON.parse(JSON.stringify(data)));
        self.loading = false;
        if (data.code == "200") {
          if (data.data) {
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
          self.$message({
            type: "info",
            message: data.message
          });
        }
      })
      .catch(msg => {
        // console.log(msg);
        self.loading = false;
        self.lists = [];
        self.$message({
          type: "info",
          message: "服务器异常"
        });
      });
  },
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    // 获取列表
    listFun() {
      var self = this;
      self.loading = true;
      self
        .getDetailPageList({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          subjects: self.isNavsel
        })
        .then(data => {
          //   console.log("列表", JSON.parse(JSON.stringify(data)));
          self.loading = false;
          if (data.code == "200") {
            if (data.data) {
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
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.lists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // nav切换
    subClick(index) {
      var self = this;
      if (self.subClickTrue == false) {
        self.isNavsel = index;
        if (index == 2) {
          self.navs = self.recharges;
        } else {
          self.navs = self.deposits;
        }
        self.loading = true;
        self.subClickTrue = true;
        self
          .getDetailPageList({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            subjects: index
          })
          .then(data => {
            self.subClickTrue = false;
            self.loading = false;
            if (data.code == "200") {
              if (data.data) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.lists = [];
                }
              } else {
                self.lists = [];
                self.$message({
                  type: "info",
                  message: "暂无数据!"
                });
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
            self.subClickTrue = false;
            self.loading = false;
            self.lists = [];
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 每页个数
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun();
    },
    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun();
    },
    ...mapActions(["getDetailPageList"])
  }
};
</script>
<style scoped>
/*主页*/

.list-cont .dataLi .rst {
  color: red !important;
}

.list-cont .dataLi .gst {
  color: green;
}

.list-cont .noList {
  height: 400px;
  border: 0;
}

.list-cont .noList > div:nth-child(1) {
  width: 657px;
  height: 400px;
  margin: 0 auto;
  border: 0;
}

.list-cont .dataLi > div:nth-child(3) {
  display: flex;
  flex-direction: column;
}

.list-cont .dataLi > div:nth-child(3) > div {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  line-height: 24px;
  text-align: center;
  width: 100%;
  height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-cont li > div:nth-child(1) {
  width: 7%;
  border-left: 1px solid #d9d9d9;
}

.list-cont li > div:nth-child(2) {
  width: 10%;
}

.list-cont li > div:nth-child(3) {
  width: 20%;
  min-width: 150px;
}

.list-cont li > div:nth-child(4) {
  width: 8%;
}

.list-cont li > div:nth-child(5) {
  width: 14%;
}

.list-cont li > div:nth-child(6) {
  width: 9%;
}

.list-cont li > div:nth-child(7) {
  width: 10%;
}

.list-cont li > div:nth-child(8) {
  width: 22%;
}

.list-cont li > div {
  border-right: 1px solid #d9d9d9;
  line-height: 52px;
  text-align: center;
  color: #303030;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-cont .firstLi {
  height: 56px;
  line-height: 56px;
  font-size: 18px;
  background-color: #f2f4f8;
}

.list-cont .lastLi {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  border: 0;
  margin-top: 25px;
}

.list-cont .lastLi > div:nth-child(1) {
  width: 150px;
  height: 100%;
  border: 0;
}

.list-cont .lastLi > div:nth-child(2) {
  min-width: 650px;
  height: 100%;
  border: 0;
}

.list-cont .dataLi {
  height: 52px;
  line-height: 52px;
  font-size: 14px;
}

.list-cont > ul > li:last-of-type {
  border-bottom: 0;
}

.list-cont > ul > li {
  display: flex;
  min-height: 52px;
  border-bottom: 1px solid #d9d9d9;
}

.list-cont > ul > li:nth-child(1) {
  border-top: 1px solid #d9d9d9;
}

.list-cont {
  width: 100%;
  min-height: 500px;
}

.list-nav > div {
  width: 70px;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #fa9c16;
  color: #303030;
}

.list-nav .navsel {
  background-color: #fa9c16;
  color: #fff;
}

.list-nav > div:nth-child(2) {
  margin-left: 24px;
}

.list-nav {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
}

.list {
  min-height: 540px;
}

.sale {
  width: 100%;
  height: 100%;
}

.sale > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
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
</style>