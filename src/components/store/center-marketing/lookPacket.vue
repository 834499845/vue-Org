<!--营销中心-优惠券-->
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
                <div class="list-cont">
                    <div class="list-contOne">
                        <div>
                            活动名称：
                        </div>
                        <div>
                            {{name | strFun}}
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            发行状态：
                        </div>
                        <div>
                            {{issueState | stateFun}}
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            最小订单金额：
                        </div>
                        <div>
                            {{orderAmount | numFun}}
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            红包金额：
                        </div>
                        <div>
                            {{discountAmount | numFun}}
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            发放数量：
                        </div>
                        <div>
                            {{number | numFun}}
                        </div>
                    </div>
                    <div class="list-contOne">
                        <div>
                            如何发放：
                        </div>
                        <div>
                            {{type | typeFun}}
                        </div>
                    </div>
                    <div class="startTime">
                        <div>
                            发放日期：
                        </div>
                        <div>
                            {{issueDate | timeFun}}
                        </div>
                        <div>
                            至
                        </div>
                        <div>
                            {{endingDate | timeFun}}
                        </div>
                    </div>
                    <div class="startTime">
                        <div>
                            使用日期：
                        </div>
                        <div>
                            {{firsDate | timeFun}}
                        </div>
                        <div>
                            至
                        </div>
                        <div>
                            {{lastDate | timeFun}}
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
      selectType: true,
      selectCommodity: false,
      stateIndex: 1,
      title: "查看优惠券",
      loading: false,
      issueDate: "", //开始发行日期
      issuetamp: "",
      endingDate: "", //结束发行日期
      firsDate: "", //开始使用日期
      firstamp: "",
      lastDate: "", //结束使用日期
      name: "", //活动名称
      shopName: "", //商家名称
      discountAmount: "", //优惠金额
      orderAmount: "", //订单最小金额
      number: "", //优惠券数量
      issueState: "", //是否发行
      type: "" //发行类型
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
      } else {
        return "无";
      }
    },
    typeFun: function(val) {
      if (val == 0) {
        return "全场";
      } else if (val == 1) {
        return "品牌";
      } else if (val == 2) {
        return "商品";
      } else if (val == 3) {
        return "分类";
      }
    },
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    numFun: function(val) {
      if (val) {
        if (val > 0) {
          return val;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    stateFun: function(val) {
      if (val == 0) {
        return "发行";
      } else {
        return "未发行";
      }
    }
  },
  // 模块新建时
  created: function() {
    var self = this;
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
          self.loading = true;
          self
            .getstorecouponfindById({
              id: self.$route.query.id
            })
            .then(data => {
              self.loading = false;
              // console.log("优惠券详情", JSON.parse(JSON.stringify(data)));
              if (data.code == 200) {
                if (data.data) {
                  self.firsDate = data.data.firsDate;
                  self.lastDate = data.data.lastDate;
                  self.issueDate = data.data.issueDate;
                  self.endingDate = data.data.endingDate;
                  self.name = data.data.name;
                  console.log(data.data.endingDate);
                  self.shopName = data.data.shopName;
                  self.discountAmount = data.data.discountAmount;
                  self.orderAmount = data.data.orderAmount;
                  self.number = data.data.number;
                  self.type = data.data.type;
                  self.issueState = data.data.issueState;
                } else {
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
                message: "服务器错误"
              });
            });
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
    // 选择发放形式
    grantChange(index) {
      if (index == 1) {
        this.selectType = true;
        this.selectCommodity = false;
      } else {
        this.selectType = false;
        this.selectCommodity = true;
      }
      this.stateIndex = index;
    },
    // 确认添加
    addClick() {
      this.$router.push({
        path: "/store/marketing/packet"
      });
    },
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
    // 箭头返回上一页/取消按钮
    caneleClick() {
      this.$router.push({
        path: "/store/marketing/packet"
      });
    },
    ...mapActions(["getstorecouponfindById"])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
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
}

.startTime > div:nth-child(3) {
  margin-left: 18px;
}

.startTime > div:nth-child(4) {
  margin-left: 18px;
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
  margin-left: 70px;
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