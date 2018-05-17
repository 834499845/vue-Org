<!--积分设置-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="pointSetting">
        <div>
            <div class="listTitle">
                <div>
                    积分设置
                </div>
                <div @click="stopClick">
                    停用积分系统
                </div>
            </div>
            <!-- 内容 -->
            <div class="list">
              <!-- 签到规则设置 -->
              <div class="openTime">
                  <div>
                    <div><img src="/static/img/红色星星@2x.png" alt="图片加载失败" ></div>
                    <div>签到规则设置</div>
                  </div>
                  <div>
                    <div>七天连续签到：</div>
                    <ul class="dataLists" v-loading="loading">
                      <li>
                        <div>第一天 ：</div>
                        <input type="text" v-model="firstDayVal" :class="{redBorder:isRedFirstDayVal,grayBorder:isGrayFirstDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                      <li>
                        <div>第二天 ：</div>
                        <input type="text" v-model="secondDayVal" :class="{redBorder:isRedSecondDayVal,grayBorder:isGraySecondDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                      <li>
                        <div>第三天 ：</div>
                        <input type="text" v-model="thirdDayVal" :class="{redBorder:isRedThirdDayVal,grayBorder:isGrayThirdDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                      <li>
                        <div>第四天 ：</div>
                        <input type="text" v-model="fourDayVal" :class="{redBorder:isRedFourDayVal,grayBorder:isGrayFourDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                      <li>
                        <div>第五天 ：</div>
                        <input type="text" v-model="fiveDayVal" :class="{redBorder:isRedFiveDayVal,grayBorder:isGrayFiveDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                      <li>
                        <div>第六天 ：</div>
                        <input type="text" v-model="sixDayVal" :class="{redBorder:isRedSixDayVal,grayBorder:isGraySixDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                      <li>
                        <div>第七天 ：</div>
                        <input type="text" v-model="sevenDayVal" :class="{redBorder:isRedSevenDayVal,grayBorder:isGraySevenDayVal}" maxlength="10">
                        <div>积分</div>
                      </li>
                    </ul>
                  </div>
              </div>
              <!-- 开启积分系统 -->
              <div class="openTime">
                <div>
                    <div><img src="/static/img/红色星星@2x.png" alt=""></div>
                    <div>开启积分系统</div>
                  </div>
                </div>
                <div class="startTime">
                  <div>开启时间：</div>
                  <div>
                      <date-picker :options="pickerOptions0" :clearable="true" :editable="false" v-model="openTimeVal" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px">
                      </date-picker>
                  </div>
                </div>
              </div>
              <!-- 按钮 -->
              <div class="button">
                <div @click="submitClick">确定</div>
                <div @click="cancelClick">取消</div>
              </div>
        </div>
        <!-- 停用积分系统提醒弹框 -->
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
import { mapActions } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      submitClickTrueOrFalse: true,
      stopClickTrueOrFalse: true,
      openTimeVal: "",
      loading: false,
      firstDayVal: "",
      isRedFirstDayVal: false,
      isGrayFirstDayVal: true,
      secondDayVal: "",
      isRedSecondDayVal: false,
      isGraySecondDayVal: true,
      thirdDayVal: "",
      isRedThirdDayVal: false,
      isGrayThirdDayVal: true,
      fourDayVal: "",
      isRedFourDayVal: false,
      isGrayFourDayVal: true,
      fiveDayVal: "",
      isRedFiveDayVal: false,
      isGrayFiveDayVal: true,
      sixDayVal: "",
      isRedSixDayVal: false,
      isGraySixDayVal: true,
      sevenDayVal: "",
      isRedSevenDayVal: false,
      isGraySevenDayVal: true,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      isdelPopup: true,// 删除弹框显示时的样式
      isShowdel: true,// 控制删除弹框显示与隐藏
      delShow: false,// 控制删除弹框显示与隐藏
      deling: false,
      titlename: '确定停用积分系统吗？',
    };
  },
  // 过滤器
  filters: {
  },
  // 初始化函数
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
        if (ele.name == "积分管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("pointSetting") == -1) {
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
  mounted() {},
  methods: {
    // 查看基础设置-签到规则查看
    listFun() {
      var self = this;
      self.loading = true
      self.getpointIntegralSignGetSignRule({
          token: "6bdc2786cf0b4440a28ef196"
        })
        .then(data => {
          if (data.code == 200) {
            self.loading = false
            self.dataLists = data.data;
            self.firstDayVal = data.data.firstDay;
            self.secondDayVal = data.data.secondDay;
            self.thirdDayVal = data.data.thirdDay;
            self.fourDayVal = data.data.fourthDay;
            self.fiveDayVal = data.data.fiveDay;
            self.sixDayVal = data.data.sixDay;
            self.sevenDayVal = data.data.sevenDay;
            var startTimeVal = data.data.startDate;
            var now = new Date(startTimeVal);
            console.log(now)
            var year = now.getYear() - 100;
            var month = now.getMonth() + 1;
            month = month > 9 ? month : "0" + month;
            var date = now.getDate();
            date = date > 9 ? date : "0" + date;
            var hour = now.getHours();
            hour = hour > 9 ? hour : "0" + hour;
            var minute = now.getMinutes();
            minute = minute > 9 ? minute : "0" + minute;
            self.openTimeVal = "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;

          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.loading = false
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 正则验证
    validateFun() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.firstDayVal) || !reg_2.test(this.firstDayVal)) {
        this.isRedFirstDayVal = true;
        this.isGrayFirstDayVal = false;
      }
      if (reg_1.test(this.secondDayVal) || !reg_2.test(this.secondDayVal)) {
        this.isRedSecondDayVal = true;
        this.isGraySecondDayVal = false;
      }
      if (reg_1.test(this.thirdDayVal) || !reg_2.test(this.thirdDayVal)) {
        this.isRedThirdDayVal = true;
        this.isGrayThirdDayVal = false;
      }
      if (reg_1.test(this.fourDayVal) || !reg_2.test(this.fourDayVal)) {
        this.isRedFourDayVal = true;
        this.isGrayFourDayVal = false;
      }
      if (reg_1.test(this.fiveDayVal) || !reg_2.test(this.fiveDayVal)) {
        this.isRedFiveDayVal = true;
        this.isGrayFiveDayVal = false;
      }
      if (reg_1.test(this.sixDayVal) || !reg_2.test(this.sixDayVal)) {
        this.isRedSixDayVal = true;
        this.isGraySixDayVal = false;
      }
      if (reg_1.test(this.sevenDayVal) || !reg_2.test(this.sevenDayVal)) {
        this.isRedSevenDayVal = true;
        this.isGraySevenDayVal = false;
      }
      if (
        this.isRedFirstDayVal == true ||
        this.isRedSecondDayVal == true ||
        this.isRedThirdDayVal == true ||
        this.isRedFourDayVal == true ||
        this.isRedFiveDayVal == true ||
        this.isRedSixDayVal == true ||
        this.isRedSevenDayVal == true
      ) {
        return false;
      }
    },
    // 确定
    submitClick() {
      var self = this;
      if (self.validateFun() == false) {
         console.log("lalla")
        return false;
      } else {
        
          if (self.openTimeVal) {
            var timeVal = self.openTimeVal;
            var year = timeVal.getFullYear();
            var month = (timeVal.getMonth() + 1).toString();
            var day = timeVal.getDate().toString();
            var hour = timeVal.getHours().toString();
            var minute = timeVal.getMinutes().toString();
            var second = timeVal.getSeconds().toString();
            if (month.length == 1) {
              month = "0" + month;
            }
            if (day.length == 1) {
              day = "0" + day;
            }
            if (hour.length == 1) {
              hour = "0" + hour;
            }
            if (minute.length == 1) {
              minute = "0" + minute;
            }
            if (second.length == 1) {
              second = "0" + second;
            }
            var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
              if (self.submitClickTrueOrFalse == true) {
                self.submitClickTrueOrFalse = false;
                self
                  .getpointIntegralSignSetSignRule({
                    firstDay: self.firstDayVal,
                    secondDay: self.secondDayVal,
                    thirdDay: self.thirdDayVal,
                    fourDay: self.fourDayVal,
                    fiveDay: self.fiveDayVal,
                    sixDay: self.sixDayVal,
                    sevenDay: self.sevenDayVal,
                    openTime: dateTime
                  })
                  .then(data => {
                    console.log("lala");
                    self.submitClickTrueOrFalse = true;
                    if (data.code == 200) {
                      self.$message({
                        type: "success",
                        message: "开启成功"
                      });
                      self.listFun()
                    }
                  })
                  .catch(msg => {
                    self.submitClickTrueOrFalse = true;
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              }
          } else {
            self.$message({
              type: 'info',
              message: '请输入开启时间'
            })
          }
                
      }
    },
    // 取消
    cancelClick() {
      var self = this;
      this.isRedFirstDayVal = false
      this.isRedSecondDayVal = false
      this.isRedThirdDayVal = false
      this.isRedFourDayVal = false
      this.isRedFiveDayVal = false
      this.isRedSixDayVal = false
      this.isRedSevenDayVal = false
      self.openTimeVal = ''
      self.listFun();
    },
    // 停用积分系统
    stopClick() {
      var self = this;
      this.titlename = "确定停用积分系统吗？";
      this.isShowdel = false;
      this.delShow = true;
    },
    // 取消停用积分弹框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 确定停用积分系统
    okClick() {
      var self = this;
      console.log("123456")
      if (self.stopClickTrueOrFalse == true) {
        self.stopClickTrueOrFalse = false;
        self
          .getpointIntegralSignDisableSystem({})
          .then(data => {
            self.stopClickTrueOrFalse = true;
            if (data.code == 200) {
              self.isShowdel = true;
              self.delShow = false;
              self.$message({
                type: "success",
                message: "停用积分系统成功！"
              });
              self.openTimeVal = ""
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
              self.stopClickTrueOrFalse = true;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
          });
      }
    },
    ...mapActions([
      "getpointIntegralSignSetSignRule",
      "getpointIntegralSignDisableSystem",
      "getpointIntegralSignGetSignRule"
    ])
  },
  // 监视
  watch: {
    firstDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.firstDayVal) || !reg_2.test(this.firstDayVal)) {
        this.isRedFirstDayVal = true;
        this.isGrayFirstDayVal = false;
      } else {
        this.isRedFirstDayVal = false;
        this.isGrayFirstDayVal = true;
      }
    },
    secondDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.secondDayVal) || !reg_2.test(this.secondDayVal)) {
        this.isRedSecondDayVal = true;
        this.isGraySecondDayVal = false;
      } else {
        this.isRedSecondDayVal = false;
        this.isGraySecondDayVal = true;
      }
    },
    thirdDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.thirdDayVal) || !reg_2.test(this.thirdDayVal)) {
        this.isRedThirdDayVal = true;
        this.isGrayThirdDayVal = false;
      } else {
        this.isRedThirdDayVal = false;
        this.isGrayThirdDayVal = true;
      }
    },
    fourDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.fourDayVal) || !reg_2.test(this.fourDayVal)) {
        this.isRedFourDayVal = true;
        this.isGrayFourDayVal = false;
      } else {
        this.isRedFourDayVal = false;
        this.isGrayFourDayVal = true;
      }
    },
    fiveDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.fiveDayVal) || !reg_2.test(this.fiveDayVal)) {
        this.isRedFiveDayVal = true;
        this.isGrayFiveDayVal = false;
      } else {
        this.isRedFiveDayVal = false;
        this.isGrayFiveDayVal = true;
      }
    },
    sixDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.sixDayVal) || !reg_2.test(this.sixDayVal)) {
        this.isRedSixDayVal = true;
        this.isGraySixDayVal = false;
      } else {
        this.isRedSixDayVal = false;
        this.isGraySixDayVal = true;
      }
    },
    sevenDayVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^\+?[1-9]\d*$/; //只能输入正整数
      if (reg_1.test(this.sevenDayVal) || !reg_2.test(this.sevenDayVal)) {
        this.isRedSevenDayVal = true;
        this.isGraySevenDayVal = false;
      } else {
        this.isRedSevenDayVal = false;
        this.isGraySevenDayVal = true;
      }
    },
  }
};
</script>
<style scoped>
.pointSetting {
  width: 100%;
  height: 100%;
}

.pointSetting > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
  width: 80%;
  margin-left: 50px;
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
  width: 100px;
  height: 26px;
  border: 1px solid #ff8a41;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #ff8a41;
  cursor: pointer;
}

.openTime > div:nth-child(1) {
  display: flex;
  margin: 20px 0px;
  font-size: 16px;
  width: 250px;
  height: 32px;
  line-height: 32px;
}

.list img {
  width: 20px;
  height: 20px;
  margin-top: -5px;
  margin-right: 10px;
}

.openTime > div:nth-child(2) {
  margin-left: 30px;
}

.openTime:nth-child(2) > div:nth-child(2) {
  margin-left: 45px !important;
}

.dataLists {
  display: flex;
  flex-wrap: wrap;
}

.dataLists li {
  display: flex;
  width: 25%;
  min-width: 200px;
  margin: 15px 0px;
}

.dataLists li > div {
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
}

.dataLists li > input {
  line-height: 40px;
  text-align: center;
  width: 80px;
  min-width: 80px;
  height: 40px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-right: 10px;
}

.startTime {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.button {
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.button > div {
  width: 80px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #ff8a41;
  border-radius: 4px;
  text-align: center;
  background: #ff8a41;
  color: #fff;
  margin-right: 100px;
  cursor: pointer;
}

.button > div:nth-child(2) {
  background: #b1b1b1;
  border: 1px solid #b1b1b1;
}

.redBorder {
  border: 1px solid #f22 !important;
}

.grayBorder {
  border: 1px solid #d1d1d1 !important;
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
</style>