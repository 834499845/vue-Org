<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        新增物流
                    </div>
                </div>
            </div>
            <!--列表-->
            <div>
                <ul class="list">
                    <li class="dispatching">
                        <div>
                            配送方式：
                        </div>
                        <div>
                            <input :class="{redBor:dispatchingRed}" type="text" maxlength="10" v-model="dispatchingModel">
                            <span :class="{redFont:dispatchingRed}">最多10个字符（不支持非法字符）</span>
                        </div>
                    </li>
                    <li class="startUsing">
                        <div>
                            是否启用：
                        </div>
                        <div>
                            <ul class="check">
                                <li v-for="(city,index) in levs" @click="levClick($event,index)">
                                    <div v-if="tfshow == index">
                                        <el-checkbox v-model="checkedt">{{city.value}}</el-checkbox>
                                    </div>
                                    <div v-else>
                                        <el-checkbox v-model="checkedf">{{city.value}}</el-checkbox>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="postage">
                        <div class="postageOne">
                            默认邮费：
                        </div>
                        <div class="postageinp">
                            <div>
                                首重
                                <input :class="{redBor:inpRed}" type="text" v-model="firstWeight" maxlength="8">kg
                                <input :class="{redBor:inpRed}" type="text" v-model="postage" maxlength="8">元
                            </div>

                            <div>
                                每增加
                                <input :class="{redBor:inpRed}" type="text" v-model="additionalWeight" maxlength="8">kg 续费
                                <input :class="{redBor:inpRed}" type="text" v-model="renew" maxlength="8">元
                                <span :class="{redFont:inpRed}">最多输8位数字（包含小数点）</span>
                            </div>
                        </div>
                    </li>
                    <li class="area">
                        <div>
                            配送区域：
                        </div>
                        <div class="areasele">
                            <div>
                                <select @change="stateCha" v-model="statemodel">
                                    <option v-for="(type,index) in state" v-bind:value="type.key">{{type.value}}</option>
                                </select>
                            </div>
                            <div>
                                <select @change="provinceCha" v-model="provincemodel">
                                    <option v-for="(type,index) in province" v-bind:value="type.key">{{type.value}}</option>
                                </select>
                            </div>
                            <div>
                                <select @change="cityCha" v-model="citymodel">
                                    <option v-for="(type,index) in city" v-bind:value="type.key">{{type.value}}</option>
                                </select>
                            </div>
                            <div>
                                <select @change="countyCha" v-model="countymodel">
                                    <option v-for="(type,index) in county" v-bind:value="type.key">{{type.value}}</option>
                                </select>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="but">
            <div @click="addlogistics">确定</div>
            <div @click="returnClick">取消</div>
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
      levs: [{ value: "是", key: "0" }, { value: "否", key: "1" }],
      checkedt: true,
      checkedf: false,
      isShowKey: 0,
      tfshow: 0,
      state: [],
      province: [{ value: "请选择", key: "QZX" }],
      city: [{ value: "请选择", key: "QZX" }],
      county: [{ value: "请选择", key: "QZX" }],
      statemodel: "1",
      provincemodel: "QZX",
      citymodel: "QZX",
      countymodel: "QZX",
      dispatchingModel: "",
      dispatchingRed: false,
      firstWeight: "",
      postage: "",
      additionalWeight: "",
      renew: "",
      area: "",
      enable: "0",
      inpRed: false,
      addlogisticsTrue: false
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
          });
        }
      });
      if (arrs.indexOf("logistics") == -1) {
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
        self.gainstateList();
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
    //获取国家
    gainstateList() {
      var self = this;
      self
        .getstateList({
          code: "COUNTRY",
          parentId: 0
        })
        .then(data => {
          // console.log("国家", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                this.state = data.data;
                this.stateCha();
                // console.log("国家", this.state);
              } else {
                this.state = [];
              }
            } else {
              this.state = [];
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
    },
    //选择国家/获取省份列表
    stateCha() {
      if (this.state.length > 0) {
        this.area = 1;
        this.province = [{ value: "请选择", key: "QZX" }];
        this.city = [{ value: "请选择", key: "QZX" }];
        this.county = [{ value: "请选择", key: "QZX" }];
        this.provincemodel = "QZX";
        this.citymodel = "QZX";
        this.countymodel = "QZX";
        var self = this;
        self
          .getstateList({
            code: "PROVINCE",
            parentId: 1
          })
          .then(data => {
            // console.log("省区", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  var objState = data.data;
                  var arr = [{ value: "请选择", key: "QZX" }];
                  objState.forEach(function(ele, ind) {
                    arr.push({ value: ele.value, key: ele.key });
                  });
                  this.province = arr;
                } else {
                  self.$message({
                    type: "info",
                    message: "已是最后级别！"
                  });
                  this.province = [];
                }
              } else {
                this.province = [];
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
      }
    },
    //选择省份/获取市区
    provinceCha() {
      this.city = [{ value: "请选择", key: "QZX" }];
      this.county = [{ value: "请选择", key: "QZX" }];
      this.citymodel = "QZX";
      this.countymodel = "QZX";
      if (this.provincemodel == "QZX") {
        this.area = 1;
        return;
      } else {
        this.area = 1 + "," + this.provincemodel;
        var self = this;
        self
          .getstateList({
            code: "CITY",
            parentId: self.provincemodel
          })
          .then(data => {
            // console.log("市区", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  var objState = data.data;
                  var arr = [{ value: "请选择", key: "QZX" }];
                  objState.forEach(function(ele, ind) {
                    arr.push({ value: ele.value, key: ele.key });
                  });
                  this.city = arr;
                } else {
                  self.$message({
                    type: "info",
                    message: "已是最后级别！"
                  });
                  this.city = [];
                }
              } else {
                this.city = [];
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
      // console.log("省区model", this.provincemodel);
    },
    //选择市区/获取县
    cityCha() {
      this.county = [{ value: "请选择", key: "QZX" }];
      this.countymodel = "QZX";
      if (this.citymodel == "QXZ") {
        this.area = 1 + "," + this.provincemodel;
        return;
      } else {
        this.area = 1 + "," + this.provincemodel + "," + this.citymodel;
        var self = this;
        self
          .getstateList({
            code: "REGION",
            parentId: self.citymodel
          })
          .then(data => {
            // console.log("县级", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  var objState = data.data;
                  var arr = [{ value: "请选择", key: "QZX" }];
                  objState.forEach(function(ele, ind) {
                    arr.push({ value: ele.value, key: ele.key });
                  });
                  this.county = arr;
                } else {
                  self.$message({
                    type: "info",
                    message: "已是最后级别！"
                  });
                  this.county = [];
                }
              } else {
                this.county = [];
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
    //选择县级
    countyCha() {
      if (this.countymodel == "QZX") {
        this.area = 1 + "," + this.provincemodel + "," + this.citymodel;
      } else {
        this.area =
          1 +
          "," +
          this.provincemodel +
          "," +
          this.citymodel +
          "," +
          this.countymodel;
      }
    },
    //返回
    returnClick() {
      this.$router.push({
        path: "/store/logistics"
      });
    },
    //选定是否显示
    levClick(e,index) {
      e.preventDefault();
      this.tfshow = index;
      this.enable = this.levs[index].key;
      this.checkedf = false;
      this.checkedt = true;
    },
    //判断
    panduan() {
      var JudgeOne = /^[\s]*$/; //输入不能为空
      var JudgeTwo = new RegExp(
        "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
      );
      if (
        JudgeOne.test(this.dispatchingModel) ||
        JudgeTwo.test(this.dispatchingModel) ||
        JudgeOne.test(this.firstWeight) ||
        JudgeOne.test(this.postage) ||
        JudgeOne.test(this.additionalWeight) ||
        JudgeOne.test(this.renew)
      ) {
        return false;
      }
    },
    //确定
    addlogistics() {
      var self = this;
      if (self.addlogisticsTrue == false) {
        if (this.panduan() == false) {
          var JudgeOne = /^[\s]*$/; //输入不能为空
          var JudgeTwo = new RegExp(
            "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
          );
          if (
            JudgeOne.test(this.dispatchingModel) ||
            JudgeTwo.test(this.dispatchingModel)
          ) {
            this.dispatchingRed = true;
          }
          if (
            JudgeOne.test(this.firstWeight) ||
            JudgeOne.test(this.postage) ||
            JudgeOne.test(this.additionalWeight) ||
            JudgeOne.test(this.renew)
          ) {
            this.inpRed = true;
          }
        } else {
          var showObj = [];
          showObj = [
            {
              expressDelivery: this.dispatchingModel,
              additionalWeight: this.additionalWeight,
              firstWeight: this.firstWeight,
              postage: this.postage,
              renew: this.renew,
              area: this.area,
              enable: this.enable
            }
          ];
          var objstr = [];
          objstr = JSON.stringify(showObj);
          self.addlogisticsTrue = true;
          self
            .getAddlogistics({
              logisticsCenterJson: objstr
            })
            .then(data => {
              self.loading = false;
              self.addlogisticsTrue = false;
              if (data.code == 200) {
                this.$message({
                  type:'success',
                  message:'保存成功'
                })
                this.$router.push({
                  path: "/store/logistics"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.loading = false;
              self.addlogisticsTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    ...mapActions(["getstateList", "getAddlogistics"])
  },
  watch: {
    //配送方式
    dispatchingModel: function(val) {
      this.dispatchingRed = false;
    },
    //首重kg
    firstWeight: function(val) {
      this.inpRed = false;
      var a = this.firstWeight;
      var b = a.replace(/[^\d.]/g, "");
      this.firstWeight = b;
    },
    //首重元
    postage: function(val) {
      this.inpRed = false;
      var a = this.postage;
      var b = a.replace(/[^\d.]/g, "");
      this.postage = b;
      this.inpRed = false;
    },
    //续重kg
    additionalWeight: function(val) {
      this.inpRed = false;
      var a = this.additionalWeight;
      var b = a.replace(/[^\d.]/g, "");
      this.additionalWeight = b;
      this.inpRed = false;
    },
    //续重元
    renew: function(val) {
      this.inpRed = false;
      var a = this.renew;
      var b = a.replace(/[^\d.]/g, "");
      this.renew = b;
      this.inpRed = false;
    }
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

.list {
  min-height: 100px;
  margin: 30px auto;
}

.listTitle {
  height: 58px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.listTitle > div > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.listTitle > div > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 10px;
}

select {
  width: 100px;
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

.check li {
  float: left;
  margin-right: 24px;
}

.list > li {
  width: 100%;
  min-width: 500px;
  display: flex;
  margin-top: 24px;
}

.list > li > div:nth-child(1) {
  width: 120px;
  text-align: right;
  margin-right: 20px;
}

.dispatching input {
  width: 150px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
}

.dispatching span {
  display: inline-block;
  margin-left: 24px;
  color: #d1d1d1;
}

.postageOne {
  width: 120px !important;
}

.postageinp {
  width: 80%;
  min-width: 400px;
  display: flex;
  flex-wrap: wrap;
}

.postageinp > div:nth-child(1) {
  width: 373px;
  margin-right: 60px;
  overflow: hidden;
  margin-bottom: 24px;
}

.postageinp > div:nth-child(2) {
  width: 551px;
  overflow: hidden;
  margin-bottom: 24px;
}

.postageinp > div:nth-child(2) span {
  width: 210px;
  color: #d1d1d1;
  margin-left: 24px;
}

.postageinp input {
  width: 100px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  margin: 0 3px;
  border: 1px solid #d1d1d1;
}

.area {
  margin-top: 0px !important;
}

.areasele {
  display: flex;
}

.areasele > div {
  margin-right: 24px;
}

.but {
  width: 200px;
  display: flex;
  margin: 36px 350px;
}

.but > div {
  width: 74px;
  height: 32px;
  text-align: center;
  cursor: pointer;
  line-height: 32px;
  color: white;
  font-size: 14px;
  border-radius: 4px;
}

.but > div:nth-child(1) {
  background: #fe5371;
  margin-right: 40px;
}

.but > div:nth-child(2) {
  background: #d1d1d1;
}

.redBor {
  border: 1px solid #fe5371 !important;
}

.redFont {
  color: #fe5371 !important;
}
</style>