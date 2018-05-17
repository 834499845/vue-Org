<!--支付中心-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="pay">
        <div>
            <div class="listTitle">
                <div>
                    支付中心
                </div>
                <div>
                    <!--新增热词-->
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <ul class="listCont">
                    <li class="firstLi">
                        <div>
                            支付方式
                        </div>
                        <div>
                            排序
                        </div>
                        <div>
                            是否展示
                        </div>
                        <div>
                            描述
                        </div>
                        <div>
                            操作
                        </div>
                    </li>
                    <li class="paydatalist" v-for="(item,index) in payList">
                        <div>
                            {{item.payment}}
                        </div>
                        <div>
                            <div>
                                <img @click="grayupIndexClick" v-show="index == 0" src="/static/img/grayup.png" alt="不可排序" title="不可排序">
                                <img @click="upClick(index)" v-show="index != 0" src="/static/img/up.png" alt="向上排序" title="向上排序">
                            </div>
                            <div>
                                <img @click="downClick(index)" v-show="index != payList.length - 1" src="/static/img/down.png" alt="向下排序" title="向下排序">
                                <img @click="graydownIndexClick" v-show="index == payList.length - 1" src="/static/img/graydown.png" alt="不可排序" title="不可排序">
                            </div>
                        </div>
                        <div>
                            <img v-show="item.whetherShow == 0" src="/static/img/shi.png" alt="开着的" title="开着的" @click="showClick(index)">
                            <img v-show="item.whetherShow == 1" src="/static/img/fou.png" alt="关着的" title="关着的" @click="showClick(index)">
                        </div>
                        <div>
                            {{item.remark}}
                        </div>
                        <div>
                            <img @click="compileClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <li class="noList" v-show="payList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--编辑支付方式弹出框-->
        <div :class="{delPopup:isCompile,showdel:isShowCompile}">
            <div class="delContent" v-show="ComShow">
                <div class="delImg">
                    编辑支付方式
                </div>
                <div class="editPay">
                    <span>支付方式：</span>
                    <input :class="{isredbor:redway}" type="text" maxlength="10" v-model="way">
                    <span :class="{isredfont:redway}" class="grayFont">限制10个字符（不支持非法字符）</span>
                </div>
                <div class="editPay">
                    <span>描述：</span>
                    <input :class="{isredbor:reddescribe}" type="text" maxlength="10" v-model="describe">
                    <span :class="{isredfont:reddescribe}" class="grayFont">限制10个字符（不支持非法字符）</span>
                </div>
                <div class="delope">
                    <div @click="okEdit">
                        确定
                    </div>
                    <div @click="canleEdit">
                        取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
export default {
  components: {
    "v-minput": minput
  },
  data() {
    return {
      loading: false,
      payList: [],
      oneObj: [],
      teoObj: [],
      isCompile: false,
      isShowCompile: true,
      ComShow: false,
      way: "",
      describe: "",
      redway: false,
      reddescribe: false,
      editIndex: "",
      upClickTrue: false,
      showClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
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
      if (arrs.indexOf("payment") == -1) {
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
        this.gainPayDetails();
        // console.log('持有当前权限')
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
    //获取支付信息
    gainPayDetails() {
      var self = this;
      self.loading = true;
      self
        .getPayCentreList({})
        .then(data => {
          self.loading = false;
        //   console.log("支付中心列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.payList = data.data;
              } else {
                self.payList = [];
              }
            } else {
              self.payList = [];
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
        });
    },
    // 禁止向上
    grayupIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于第一位不支持向上排序!"
      });
    },
    // 禁止向下
    graydownIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于最后一位不支持向下排序!"
      });
    },
    //向上排序
    upClick(index) {
      var self = this;
      if (self.upClickTrue == false) {
        if (index == 0) {
          this.$message({
            type: "info",
            message: "属性处于第一位不支持向上排序!"
          });
        } else {
          var arrs = self.payList;
          var ups = [];
          self.oneObj = [];
          self.twoObj = [];
          self.oneObj.push({
            id: self.payList[index].id,
            sort: self.payList[index - 1].sort
          });
          self.twoObj.push({
            id: self.payList[index - 1].id,
            sort: self.payList[index].sort
          });
          ups.push(self.oneObj[0]);
          ups.push(self.twoObj[0]);
          self.objstr = [];
          self.objstr = JSON.stringify(ups);
          self.upClickTrue = true;
          self
            .getPayListrank({
              paymentCenterSortJson: self.objstr
            })
            .then(data => {
              self.upClickTrue = false;
              if (data.code == 200) {
                self.gainPayDetails();
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.upClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    // 向下排序
    downClick(index) {
      if (index + 1 == this.payList.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        var self = this;
        var arrs = self.payList;
        var ups = [];
        self.oneObj = [];
        self.twoObj = [];
        self.oneObj.push({
          id: self.payList[index + 1].id,
          sort: self.payList[index].sort
        });
        self.twoObj.push({
          id: self.payList[index].id,
          sort: self.payList[index + 1].sort
        });
        // console.log("11111", self.oneObj[0]);
        // console.log("22222", self.twoObj[0]);
        ups.push(self.oneObj[0]);
        ups.push(self.twoObj[0]);
        self.objstr = [];
        self.objstr = JSON.stringify(ups);
        // console.log("向下排序", self.objstr);
        self
          .getPayListrank({
            paymentCenterSortJson: self.objstr
          })
          .then(data => {
            // console.log("向下排序", data);
            if (data.code == 200) {
              this.gainPayDetails();
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
    //是否展示
    showClick(index) {
      var self = this;
      if (self.showClickTrue == false) {
        if (self.payList[index].whetherShow == 0) {
          self.showClickTrue = true;
          self
            .getPayListShow({
              id: self.payList[index].id,
              whetherShow: 1
            })
            .then(data => {
              self.showClickTrue = false;
              if (data.code == 200) {
                self.gainPayDetails();
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.showClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          self.showClickTrue = true;
          self
            .getPayListShow({
              id: self.payList[index].id,
              whetherShow: 0
            })
            .then(data => {
              self.showClickTrue = false;
              if (data.code == 200) {
                self.gainPayDetails();
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.showClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    //编辑
    compileClick(index) {
      this.editIndex = index;
      this.isCompile = true;
      this.isShowCompile = false;
      this.ComShow = true;
      this.way = this.payList[index].payment;
      this.describe = this.payList[index].remark;
    },
    //判断
    panduan() {
      var regOne = /^[\s]*$/; //输入不能为空
      var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
      if (
        regTwo.test(this.way) ||
        regOne.test(this.way) ||
        regTwo.test(this.describe) ||
        regOne.test(this.describe)
      ) {
        return false;
      }
    },
    //确定编辑
    okEdit() {
      var self = this;
      if (self.showClickTrue == false) {
        if (this.panduan() == false) {
          var regOne = /^[\s]*$/; //输入不能为空
          var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
          if (regTwo.test(this.way) || regOne.test(this.way)) {
            this.redway = true;
          }
          if (regTwo.test(this.describe) || regOne.test(this.describe)) {
            this.reddescribe = true;
          }
        } else {
          self.showClickTrue = true;
          self
            .getPayListShow({
              id: self.payList[self.editIndex].id,
              remark: self.describe,
              payment: self.way
            })
            .then(data => {
              self.showClickTrue = false;
              if (data.code == 200) {
                self.gainPayDetails();
                self.isCompile = false;
                self.isShowCompile = true;
                self.ComShow = false;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.showClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    //取消编辑
    canleEdit() {
      this.isCompile = false;
      this.isShowCompile = true;
      this.ComShow = false;
    },
    ...mapActions(["getPayCentreList", "getPayListrank", "getPayListShow"])
  },
  // 监视
  watch: {
    way: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.redway = false;
      }
    },
    describe: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.reddescribe = false;
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

.pay {
  width: 100%;
  height: 100%;
}

.pay > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
}

.list > ul {
  margin: 24px auto;
  /* width: 650px; */
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

.list {
  min-height: 540px;
  margin-bottom: 150px;
}

.listCont li {
  display: flex;
  min-height: 50px;
}

.firstLi {
  height: 58px;
  font-size: 17px;
  font-weight: bold;
  line-height: 58px;
  background-color: #f2f4f8;
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}

.listCont li > div {
  width: 20%;
  text-align: center;
  border-right: 1px solid #d9d9d9;
}

.paydatalist {
  height: 50px;
  line-height: 50px;
  border-left: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}

.paydatalist > div:nth-child(2) {
  display: flex;
  justify-content: center;
}

.paydatalist > div:nth-child(2) div {
  margin: 0 12px;
}

.paydatalist > div {
  overflow: hidden;
  white-space: nowrap;
  padding: 0 7px;
  text-overflow: ellipsis;
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

.delImg {
  width: 525px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid #d1d1d1;
  font-size: 20px;
  font-weight: bold;
  color: #303030 !important;
}

.editPay {
  height: 25px;
  margin-top: 30px;
  padding-left: 20px;
}

.editPay input {
  width: 200px;
  height: 32px;
  margin-left: 3px;
  padding-left: 4px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
}

.editPay span:nth-child(1) {
  width: 65px;
  font-size: 13px;
  text-align: right;
  margin-right: 5px;
  display: inline-block;
  color: #303030 !important;
}

.grayFont {
  color: #d1d1d1;
}

.delope {
  width: 525px;
  height: 145px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.delope > div {
  cursor: pointer;
  width: 70px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

.delope > div:nth-child(1) {
  margin-right: 25px;
  background-color: #fe5371;
}

.delope > div:nth-child(2) {
  margin-left: 25px;
  background-color: #d1d1d1;
}

.isredbor {
  border: 1px solid #fe5371 !important;
}

.isredfont {
  color: #fe5371 !important;
}
</style>