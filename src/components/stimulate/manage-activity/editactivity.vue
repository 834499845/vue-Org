<!--修改活动管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        修改活动
                    </div>
                </div>
            </div>
            <div style="overflow: hidden;">
                <div class="main_left">
                    <p>活动名称：</p>
                    <p>开始时间：</p>
                    <p style="height: 50px;line-height: 50px;">上传图片：</p>
                    <p>选择数据项：</p>
                </div>
                <div class="main_right">
                    <div>
                        <input type="text" maxlength="10" v-model="activityName">
                        <span v-show="gf_1" class="grayfont">最多输入10个汉字</span>
                        <span v-show="rf_1" class="redfont">有非法字符，请重新输入</span>
                    </div>
                    <div>
                        <div class="datetimeBox">
                        <Date-picker :disabled="datePicker" :options="pickerOptions0" :clearable="true" :editable="false" v-model="value1" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
                        </div>
                        <span style="float: left;margin-left: 13px;">结束时间：</span>
                        <div class="datetimeBox">
                        <Date-picker :disabled="datePicker" :options="pickerOptions0" :clearable="true" :editable="false" v-model="value2" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
                        </div>
                        <span v-show="rf_2" class="redfont">{{timewarn}}</span>
                    </div>
                    <div style="height: 50px;line-height: 50px;">
                        <img style="margin-left: 12px;width:80px;height: 50px;" :src="uploadImg" alt="">
                        <label for="upfile">
                            上传
                        </label>
                        <span v-show="gf_3" class="grayfont">图片文件大小不能超过200KB,图片尺寸282*216</span>
                        <span v-show="rf_3" class="redfont">图片太大，请修改文件尺寸后重新上传</span>
                        <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                    </div>
                    <div style="margin-left: 10px;">
                        <div>
                            <select :disabled="optionSelect" @change="selectTypeClick" v-model="selectfl" style="width: 140px;">
                                <option v-for="(type,index) in sTypes" :key="index" :value="index">{{type.name}}</option>
                            </select>
                            <span class="grayfont" v-show="isopetion == 1">(已开始的活动只能编辑图片和活动名称)</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="targetBox">
                <div>
                    <p>{{healthStandard}}：</p>
                </div>
                <div>
                    <div class="list-ch" v-show="!sportStandard">
                        <ul>
                            <li class="chcheck" v-for="(item,index) in healths" :label="item.value" :key="item.key">
                                <div v-show="isopetion != 1">
                                    <div @click="checkimg(index)" v-show="!item.show">
                                        <img src="/static/img/show.png" alt="" style="cursor:pointer;width: 18px;height: 18px;">
                                    </div>
                                    <div @click="checkimg(index)" v-show="item.show">

                                    </div>
                                    <div style="margin-left: 5px;">{{item.value}}</div>
                                </div>
                                <div v-show="isopetion == 1">
                                    <div v-show="!item.show">
                                        <img src="/static/img/show.png" alt="" style="cursor:pointer;width: 18px;height: 18px;">
                                    </div>
                                    <div v-show="item.show">

                                    </div>
                                    <div style="margin-left: 5px;">{{item.value}}</div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <div v-show="sportStandard && isopetion != 1" style="margin-left: 10px;">
                        <v-select  width="100" :selects="selectstep" :list="sTypesstep" @select="selectTypeClickstep"></v-select>
                    </div>
                    <div v-show="sportStandard && isopetion == 1" style="margin-left: 10px;">
                        <v-select :isdisable="isdisable" width="100" :selects="selectstep" :list="sTypesstep" @select="selectTypeClickstep"></v-select>
                    </div>
                </div>
            </div>
            <div class="targetBox">
                <div>
                    <p>单项红包金额：</p>
                </div>
                <div>
                    <div class="selectBox">
                        <v-select :isdisable="isdisable" width="100" :selects="selectmin" :list="sTypesmin" @select="selectTypeClickmin"></v-select>
                        <div style="border-top:1px solid #ff6339;width: 25px;margin:16px 12px;"></div>
                        <v-select :isdisable="isdisable" width="100" :selects="selectmax" :list="sTypesmax" @select="selectTypeClickmax"></v-select>
                        <span v-show="moneyRule" class="redfont">开始金额不能大于结束金额</span>
                    </div>
                </div>
            </div>
            <div class="btnBox">
                <input type="button" value="保存" @click="preserve">
                <input type="button" value="取消" @click="cancle">
            </div>
        </div>
        <!--提示信息弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @canle="canleClick" :name="nametitle"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/select";
import textraea from "../../cModule/textraea";
import nopreserve from "../../cModule/nopreserve";
export default {
  components: {
    "v-minput": minput,
    "v-select": select,
    "v-textra": textraea,
    "v-hosdel": nopreserve
  },
  data() {
    return {
      isopetion: "",
      isdisable: false,
      optionSelect: false,
      datePicker: "",
      moneyRule: false,
      gf_1: true,
      gf_3: true,
      rf_1: false,
      rf_2: false,
      rf_3: false,
      timewarn: "",
      nametitle: "该活动已存在，请勿重复添加",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      healthStandard: "",
      riceStandard: false,
      restStandard: false,
      sportStandard: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      value1: "",
      value2: "",
      uploadImg: "/static/img/upload.png",

      sTypesmin: [
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1"
      ],
      sTypesmax: [
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1"
      ],
      sTypesstep: ["5000", "6000", "7000", "8000", "9000", "10000"],
      selectfl: 0,
      sTypes: [],
      indicatorList: [],
      health: [],
      healths: [],
      bigArray: [],
      selectmin: "0.1",
      selectmax: "0.5",
      selectstep: "5000",
      activityName: "",
      code: "",
      editData: "",
      onFileChangeTrue: false,
      preserveUpdateTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    // console.log(new Date(), "Date");
    var self = this;
    var operation = self.$route.query.operation;
    if (operation == 1) {
      self.datePicker = self.optionSelect = self.isdisable = true;
      self.isopetion = 1;
    } else {
      self.datePicker = self.optionSelect = self.isdisable = false;
      self.isopetion = "";
    }

    self.indicatorList = JSON.parse(sessionStorage.allhealthData);

    self.editData = JSON.parse(sessionStorage.edata);
    self.activityName = self.editData.taskName;
    self.value1 = self.editData.startDate;

    self.value2 = self.editData.endDate;

    self.uploadImg = self.editData.headImg;
    var selectminStr = self.editData.minMoney;
    self.selectmin = selectminStr.toString();
    var selectmaxStr = self.editData.maxMoney;

    self.selectmax = selectmaxStr.toString();

    for (var i = 0; i < self.indicatorList.length; i++) {
      self.sTypes.push({
        name: self.indicatorList[i].name,
        code: self.indicatorList[i].code
      });
    }
    self.sTypes.forEach(function(ele, ind) {
      if (ele.code == self.editData.taskCode) {
        self.selectfl = ind;
      }
    });
    self.healthStandard = self.sTypes[self.selectfl].name;
    if (self.editData.childrenCodes.indexOf(",") > -1) {
      this.sportStandard = false;
      var arrchildrenCodes = self.editData.childrenCodes.split(",");
      self.code = self.indicatorList[self.selectfl].code;
      self.healths = [];
      self.indicatorList[self.selectfl].children.forEach(function(ele, ind) {
        self.healths.push({
          key: ele.code,
          value: ele.name,
          show: true
        });
      });
      for (var i = 0; i < self.healths.length; i++) {
        for (var j = 0; j < arrchildrenCodes.length; j++) {
          if (self.healths[i].key == arrchildrenCodes[j]) {
            self.healths[i].show = false;
          }
        }
      }
    } else {
      if (self.indicatorList[self.selectfl].children) {
        self.healths = [];
        var arrchildrenCodes = [];
        arrchildrenCodes.push(self.editData.childrenCodes);
        self.indicatorList[self.selectfl].children.forEach(function(ele, ind) {
          self.healths.push({
            key: ele.code,
            value: ele.name,
            show: true
          });
        });
        for (var i = 0; i < self.healths.length; i++) {
          for (var j = 0; j < arrchildrenCodes.length; j++) {
            if (self.healths[i].key == arrchildrenCodes[j]) {
              self.healths[i].show = false;
            }
          }
        }
      } else {
        self.sportStandard = true;
        self.selectstep = self.editData.childrenCodes;
      }
    }
  },
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    // 取消提示框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 返回日期格式化
    UnFormatDates(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      i = t.getMinutes();
      s = t.getSeconds();
      return (
        y +
        "." +
        (m < 10 ? "0" + m : m) +
        "." +
        (d < 10 ? "0" + d : d) +
        " " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (i < 10 ? "0" + i : i) +
        ":" +
        (s < 10 ? "0" + s : s)
      );
    },
    // 提交日期格式化
    UnFormatDate(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      i = t.getMinutes();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (i < 10 ? "0" + i : i)
      );
    },
    selectTypeClickmin(sType) {
      //   console.log(sType);
      this.selectmin = sType;
    },
    selectTypeClickmax(sType) {
      //   console.log(sType);
      this.selectmax = sType;
    },
    selectTypeClickstep(sType) {
      //   console.log(sType);
      this.selectstep = sType;
    },
    cancle() {
      this.$router.push({
        path: "/stimulate/activity"
      });
    },
    panduan() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*（）——|{}【】]");
      if (
        reg_1.test(this.activityName) ||
        this.value1 == "" ||
        this.value2 == "" ||
        this.uploadImg == "/static/img/upload.png"
      ) {
        this.nametitle = "有未完成的内容，请填写完整再保存";
        this.isShowdel = false;
        this.delShow = true;
        return false;
      }
      if (reg_2.test(this.activityName)) {
        this.gf_1 = this.rf_2 = this.rf_3 = this.moneyRule = false;
        this.rf_1 = this.gf_3 = true;
        return false;
      }
      //   console.log(this.value1)
      //   console.log(this.value1.getTime(),'555555555555')
      if (this.value1 < new Date().getTime() + 300000) {
        this.timewarn = "开始时间必须大于当前时间至少5分钟";
        this.gf_1 = this.rf_2 = this.gf_3 = true;
        this.rf_1 = this.rf_3 = this.moneyRule = false;
        return false;
      }
      if (this.value1 >= this.value2) {
        this.timewarn = "开始时间不能大于等于结束时间";
        this.gf_1 = this.rf_2 = this.gf_3 = true;
        this.rf_1 = this.rf_3 = this.moneyRule = false;
        return false;
      }
      console.log(this.healths.length, this.bigArray.length);
      if (this.healths.length > 0 && this.bigArray.length == 0) {
        this.$message("请选择具体指标项");
        return false;
      }
      if (this.selectmin > this.selectmax) {
        this.moneyRule = this.gf_1 = this.gf_3 = true;
        this.rf_1 = this.rf_2 = this.rf_3 = false;
        return false;
      }
    },
    panduan_1() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*（）——|{}【】]");
      if (
        reg_1.test(this.activityName) ||
        this.value1 == "" ||
        this.value2 == "" ||
        this.uploadImg == "/static/img/upload.png"
      ) {
        this.nametitle = "有未完成的内容，请填写完整再保存";
        this.isShowdel = false;
        this.delShow = true;
        return false;
      }
      if (reg_2.test(this.activityName)) {
        this.gf_1 = this.rf_2 = this.rf_3 = this.moneyRule = false;
        this.rf_1 = this.gf_3 = true;
        return false;
      }
    },
    // 添加活动发请求
    preserve() {
      var self = this;
      self.bigArray = [];
      self.healths.forEach(function(ele, ind) {
        if (ele.show == false) {
          self.bigArray.push(ele.key);
        }
      });
      if (this.$route.query.operation == 1) {
        if (this.panduan_1() == false || this.rf_3 == true) {
          return;
        } else {
          this.preserveUpdate();
        }
      } else {
        if (this.panduan() == false || this.rf_3 == true) {
          return;
        } else {
          this.preserveUpdate();
        }
      }
    },
    preserveUpdate() {
      var self = this;

      if (self.preserveUpdateTrue == false) {
        self.rf_1 = self.rf_2 = self.rf_3 = false;
        self.gf_1 = self.gf_3 = true;
        self.preserveUpdateTrue = true;

        self
          .geteditpreserveactivity({
            taskCode: self.code,
            id: self.editData.id,
            taskName: self.activityName,
            childrenCodes:
              self.bigArray.length == 0
                ? self.selectstep
                : self.bigArray.join(","),
            minMoney: self.selectmin,
            maxMoney: self.selectmax,
            headImg: self.uploadImg,
            explain: self.activityName,
            startDate: self.UnFormatDate(self.value1),
            endDate: self.UnFormatDate(self.value2)
          })
          .then(data => {
            self.preserveUpdateTrue = false;
            if (data.code == 200) {
              this.$router.push({
                path: "/stimulate/activity"
              });
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.preserveUpdateTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 是否选中
    checkimg(index) {
      var self = this;
      // if (self.healths[index].show == true) {
      //   self.bigArray.push(self.healths[index].key);
      // } else {
      //   for (var i = 0; i < self.bigArray.length; i++) {
      //     if (self.bigArray[i] == self.healths[index].key) {
      //       self.bigArray.splice(i, 1);
      //       break;
      //     }
      //   }
      // }
      self.healths[index].show = !self.healths[index].show;
      //   console.log(self.bigArray.join(","));
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      if (self.onFileChangeTrue == false) {
        var files = e.target.files || e.dataTransfer.files;
        var fileData = files[0];
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            if (image.width !== 282) {
              self.$message({
                type: "warning",
                message: "上传图片格式不正确"
              });
              return;
            } else if (image.height !== 216) {
              self.$message({
                type: "warning",
                message: "上传图片格式不正确"
              });
              return;
            } else if (fileData.size > 204800) {
              self.rf_3 = true;
              self.gf_3 = false;
              return;
            } else {
              self.rf_3 = false;
              self.gf_3 = true;
              self.uploadImage(files[0]);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    // 上传图片
    uploadImage(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "encourage");
      formdata.append("business", "task");
      formdata.append("token", TOKEN);
      self.onFileChangeTrue = true;
      this.uploadFile(formdata)
        .then(data => {
          self.onFileChangeTrue = false;
          if (data.code == 200) {
            this.$message({
              message: "上传图片成功",
              type: "success"
            });
            this.uploadImg = data.data[0].path;
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.onFileChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 箭头返回上一页
    canelClick() {
      this.$router.push({
        path: "/stimulate/activity"
      });
    },
    // 分类选择
    selectTypeClick() {
      var self = this;
      self.healths = [];
      self.healthStandard = self.sTypes[self.selectfl].name;
      self.code = self.indicatorList[self.selectfl].code;
      if (self.indicatorList[self.selectfl].children) {
        self.sportStandard = false;
        self.bigArray = [];
        self.healths = [];
        self.indicatorList[self.selectfl].children.forEach(function(ele, ind) {
          self.healths.push({
            key: ele.code,
            value: ele.name,
            show: true
          });
        });
      } else {
        self.sportStandard = true;
      }
    },
    ...mapActions(["uploadFile", "getindicatorList", "geteditpreserveactivity"])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.targetBox {
  display: flex;
  margin-top: 24px;
}
.targetBox ul {
  overflow: hidden;
  margin-bottom: 0;
}
.targetBox > div:nth-child(1) p {
  width: 100px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  text-align: right;
}
.targetBox > div:nth-child(2),
.targetBox > div:nth-child(3) {
  line-height: 32px;
  height: auto;
}
/*提示弹出框*/

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
.showdel {
  display: none;
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
.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
.datetimeBox {
  width: 137px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  height: 32px;
  margin-left: 12px;
  float: left;
}

/*.el-date-editor.el-input {
        width: 180px!important;
        margin-top: -3px!important;
        margin-left: -1px;
    }*/

input[type="text"] {
  width: 178px;
  margin-left: 12px;
  height: 32px;
  border: 1px solid #d1d1d1;
  padding-left: 5px;
  border-radius: 4px;
}

.main_left {
  float: left;
  width: 100px;
  /*margin-left: 92px;*/
}

.main_left p {
  margin-top: 24px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  float: right;
}

.main_right {
  float: left;
}

.main_right > div {
  margin-top: 24px;
  height: 32px;
  line-height: 32px;
}

.main_right > div:nth-child(3) label {
  cursor: pointer;
  width: 80px;
  height: 28px;
  border-radius: 4px;
  background: #ee3100;
  font-weight: normal;
  text-align: center;
  line-height: 28px;
  color: #fff;
  margin-left: 23px;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 40px);
  margin-left: 20px;
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
  width: 20px;
  height: 20px;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  /*font-weight: 600;*/
  /*margin-left: 10px;*/
}

.grayfont {
  color: #8f8e94;
  margin-left: 12px;
}
.redfont {
  color: #dc322b;
  margin-left: 12px;
}

.list-ch li {
  float: left;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.list-ch li > div > div {
  float: left;
}

.list-ch li > div > div:nth-child(2) {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1px solid #bfcbd9;
  margin-top: 7px;
}

.list-ch li > div > div:nth-child(2):hover {
  border: 1px solid #5acdfa;
}

.selectBox > div {
  float: left;
}

.selectBox > div:nth-child(1) {
  margin-left: 10px;
}

.btnBox {
  margin: 36px 0;
  /*margin-left: 400px;*/
  min-width: 307px;
  max-width: 800px;
  text-align: center;
}

.btnBox input {
  width: 68px;
  height: 32px;
  line-height: 32px;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btnBox input:nth-child(1) {
  margin-right: 24px;
  background: #ee3100;
}

.btnBox input:nth-child(2) {
  margin-left: 24px;
  background: #d1d1d1;
}
select {
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 85% 8px no-repeat transparent;
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