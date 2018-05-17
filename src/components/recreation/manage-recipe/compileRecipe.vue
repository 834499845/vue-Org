<!--食谱管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" class="sale">
    <div class="foodControl">
      <div class="img" @click="backList"></div>
      编辑食谱
    </div>
    <div class="dietContent">
      <div class="foodName">名称：
        <input type="text" maxlength="12" @focus='foodNameInput' v-model='dietName' placeholder="请输入食谱名称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
        />
        <span class="markedWords" v-show='greyPrompt'>最多输入12个字符</span>
        <span class="redMarkedWords" v-show='redPrompt'>请输入食谱名称</span>
      </div>
      <input type="text" v-model='dietNamesat' v-show='dietnamesat' />
      <!--<div class="foodPic"><div class="picBox"><input id="upfile" type="file" value="+" @change="onFileChange"/><img v-show='thumbnail' :src="this.zoomPath" /></div><div class="uploading">上传图片</div><span class="picGreyPrompt" v-show='picGreyPrompt'>图片文件大小不能超过1M，尺寸为148*118</span><span class="picMarkedWords" v-show='picMarkedWords'>请选择合适图片上传</span></div>-->
      <div class="foodSpecies">
        <div class="foodOne">食物一：
          <input type="text" v-model="tt" @keyup="get($event)" @keydown.down="changeDown()" @keydown.up="changeUp()" @blur='searchInput'
          />
          <ul v-show='listFood'>
            <li v-for="(item, index) in myData" :key="index" :class="{gray:index===now}">{{item}}</li>
          </ul>
          <select v-model="selected">
            <option value="">请选择</option>
            <option>50克</option>
            <option>100克</option>
            <option>150克</option>
            <option>200克</option>
            <option>250克</option>
            <option>300克</option>
            <option>350克</option>
            <option>400克</option>
            <option>450克</option>
            <option>500克</option>
            <option>50毫升</option>
            <option>100毫升</option>
            <option>150毫升</option>
            <option>200毫升</option>
            <option>250毫升</option>
            <option>300毫升</option>
            <option>350毫升</option>
            <option>400毫升</option>
            <option>450毫升</option>
            <option>500毫升</option>
          </select>

        </div>
        <div class="foodOne">食物二：
          <input type="text" v-model="tt1" @keyup="get1($event)" @keydown.down="changeDown1()" @keydown.up="changeUp1()" @blur='searchInput'
          />
          <ul v-show='listFood1'>
            <li v-for="(item, index) in myData1" :key="index" :class="{gray:index===now}">{{item}}</li>
          </ul>
          <select v-model="selected1">
            <option value="">请选择</option>
            <option>50克</option>
            <option>100克</option>
            <option>150克</option>
            <option>200克</option>
            <option>250克</option>
            <option>300克</option>
            <option>350克</option>
            <option>400克</option>
            <option>450克</option>
            <option>500克</option>
            <option>50毫升</option>
            <option>100毫升</option>
            <option>150毫升</option>
            <option>200毫升</option>
            <option>250毫升</option>
            <option>300毫升</option>
            <option>350毫升</option>
            <option>400毫升</option>
            <option>450毫升</option>
            <option>500毫升</option>
          </select>
          <span class="markedWords">可选填</span>
        </div>
        <div class="foodOne">食物三：
          <input type="text" v-model="tt2" @keyup="get2($event)" @keydown.down="changeDown2()" @keydown.up="changeUp2()" @blur='searchInput'
          />
          <ul v-show='listFood2'>
            <li v-for="(item, index) in myData2" :key="index" :class="{gray:index===now}">{{item}}</li>
          </ul>
          <select v-model="selected2">
            <option value="">请选择</option>
            <option>50克</option>
            <option>100克</option>
            <option>150克</option>
            <option>200克</option>
            <option>250克</option>
            <option>300克</option>
            <option>350克</option>
            <option>400克</option>
            <option>450克</option>
            <option>500克</option>
            <option>50毫升</option>
            <option>100毫升</option>
            <option>150毫升</option>
            <option>200毫升</option>
            <option>250毫升</option>
            <option>300毫升</option>
            <option>350毫升</option>
            <option>400毫升</option>
            <option>450毫升</option>
            <option>500毫升</option>
          </select>
          <span class="markedWords">可选填</span>
        </div>
        <div class="foodOne">食物四：
          <input type="text" v-model="tt3" @keyup="get3($event)" @keydown.down="changeDown3()" @keydown.up="changeUp3()" @blur='searchInput'
          />
          <ul v-show='listFood3'>
            <li v-for="(item, index) in myData3" :key="index" :class="{gray:index===now}">{{item}}</li>
          </ul>
          <select v-model="selected3">
            <option value="">请选择</option>
            <option>50克</option>
            <option>100克</option>
            <option>150克</option>
            <option>200克</option>
            <option>250克</option>
            <option>300克</option>
            <option>350克</option>
            <option>400克</option>
            <option>450克</option>
            <option>500克</option>
            <option>50毫升</option>
            <option>100毫升</option>
            <option>150毫升</option>
            <option>200毫升</option>
            <option>250毫升</option>
            <option>300毫升</option>
            <option>350毫升</option>
            <option>400毫升</option>
            <option>450毫升</option>
            <option>500毫升</option>
          </select>
          <span class="markedWords">可选填</span>
        </div>
      </div>
      <div class="timeFrame">时段：
        <select v-model="selectedTime">
          <option value="">请选择</option>
          <option>早餐</option>
          <option>午餐</option>
          <option>晚餐</option>
          <option>加餐</option>
        </select>
      </div>
      <div class="recommendedReasons">
        <div>推荐原因：</div>
        <textarea class="textarea" :class="{recommendedReasonsBorder:isRecommendedReasonsBorder}" v-model="reasonsVal"
          maxlength="80" />
        <span class="astrict" :class="{redTest:isRedreasonsVal,grayTest:isGrayreasonsVal}">必填,最多输入80个汉字</span>
      </div>
      <div class="handles">
        <div class="foodSaves" @click='addfoodSave'>保存</div>
        <div class="abolishs" @click="backLists">取消</div>
      </div>
    </div>
    <!--提示信息弹出框-->
    <div :class="{delPopup:isdelPopup,showdel:isShowdels}">
      <transition name="slide-fade">
        <div class="delContent" v-show="delShows">
          <v-hosdels @canle="canleClicks" @ok="okclicks" :name="nametitles"></v-hosdels>
        </div>
      </transition>
    </div>
    <!--已存在食谱名弹出框-->
    <div class="removeBox" v-show='Recipesexist'>
      <div class="remove">
        <div class="questionMark">
          <div></div>
        </div>
        <div class="deletePrompt">该食谱已存在，请勿重复添加！</div>
        <div class="operatingButton">
          <div class="operatingButtonBox">
            <div class="iknow" @click='iknow'>我知道了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import select from "../../cModule/foodSelect";
import intercept from "../../cModule/intercept";
export default {
  components: {
    "v-select": select,
    "v-hosdels": intercept
  },
  data() {
    return {
      Recipesexist: false,
      dietNamesat: "",
      dietnamesat: false,
      zoomPath: "",
      thumbnail: true,
      dietName: "",
      selectedTime: "",
      selected: "",
      selected1: "",
      selected2: "",
      selected3: "",
      myData1: [],
      myData2: [],
      myData3: [],
      tt1: "",
      tt2: "",
      tt3: "",
      kca: "",
      kca1: "",
      kca2: "",
      kca3: "",
      comid: "",
      comid1: "",
      comid2: "",
      comid3: "",
      checked: false,
      selectedfl: "",
      selectOp: "请选择",
      brands: ["请选择", "删除"],
      booksearchtext: "",
      booklist: [],
      conditions: "",
      myData: [],
      myBrr: [],
      tt: "",
      now: -1,
      listFood: false,
      listFood1: false,
      listFood2: false,
      listFood3: false,
      specification: "",
      picGreyPrompt: true,
      picMarkedWords: false,
      greyPrompt: true,
      redPrompt: false,
      isShowdels: true,
      topath: "",
      delShows: false,
      nametitles: "劳动成果还未保存，确定退出？",
      intercept: false,
      isdelPopup: true,
      isRedreasonsVal: false,
      isGrayreasonsVal: true,
      islaunchVal: false,
      isRecommendedReasonsBorder: false,
      reasonsVal: "" //推荐原因Model
    };
  },
  // 过滤
  filters: {
    conditions: function(items) {
      var searchRegex = new RegExp(this.booksearchtext, "i");
      var arr = [];
      for (var i = 0, j = items.length; i < j; i++) {
        arr[i] = {};
        arr[i].contacters = [];
        for (
          var item = 0, len = items[i].contacters.length;
          item < len;
          item++
        ) {
          if (
            searchRegex.test(items[i].contacters[item].name) ||
            searchRegex.test(items[i].contacters[item].enterpriseName) ||
            searchRegex.test(items[i].contacters[item].phoneNumber) ||
            searchRegex.test(items[i].contacters[item].uniqueID)
          ) {
            arr[i].firstLetter = items[i].firstLetter;
            arr[i].contacters.push(items[i].contacters[item]);
          }
        }
      }
      return arr;
    }
  },
  // 模块新建时
  created: function() {
    let self = this;
    self.edata = JSON.parse(sessionStorage.edata);
    // console.log(self.edata)
    self.zoomPath = self.edata.itemImage;
    self.Id = self.edata.id;
    self.dietName = self.edata.name;
    self.dietNamesat = self.edata.name;
    self.strid = self.edata.combinationId.split(",");
    self.kca = self.strid[0];
    self.kca1 = self.strid[1];
    self.kca2 = self.strid[2];
    self.kca3 = self.strid[3];
    self.reasonsVal = self.edata.recommendedReason;

    self.str = self.edata.combinationName.split(",");
    self.tt = self.str[0];
    self.tt1 = self.str[1];
    self.tt2 = self.str[2];
    self.tt3 = self.str[3];
    self.ke = self.edata.specifications.split("+");
    self.selected = self.ke[0];
    self.selected1 = self.ke[1];
    self.selected2 = self.ke[2];
    self.selected3 = self.ke[3];
    self.selectedTimes = self.edata.type;
    self.selectedTime = self.selectedTimes;
    if (self.selectedTime == 1) {
      self.selectedTime = "早餐";
    }
    if (self.selectedTime == 2) {
      self.selectedTime = "午餐";
    }
    if (self.selectedTime == 3) {
      self.selectedTime = "晚餐";
    }
    if (self.selectedTime == 4) {
      self.selectedTime = "加餐";
    }
    self.token = sessionStorage.token;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "饮食管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("recipe") == -1) {
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
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdels = false;
      this.delShows = true;
      // this.istipMsg = true
    } else if (this.intercept == true) {
      // this.istipMsg = false
      this.isShowdels = true;
      this.delShows = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //      	消息框
    canleClicks() {
      this.isShowdels = true;
      this.delShows = false;
    },
    okclicks() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    iknow() {
      this.Recipesexist = false;
    },
    //获取焦点
    foodNameInput() {
      this.redPrompt = false;
      this.greyPrompt = true;
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      self.picMarkedWords = false;
      self.picGreyPrompt = true;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      // console.log(fileData)
      // 读取图片数据
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        // 加载图片的真实宽度和高度
        var image = new Image();
        image.onload = function() {
          if (image.width != 148) {
            self.$message({
              type: "warning",
              message: "您上传图片的格式或大小不正确，请重新上传"
            });
            return;
          } else if (image.height != 118) {
            self.$message({
              type: "warning",
              message: "您上传图片的格式或大小不正确，请重新上传"
            });
            return;
          } else if (fileData.size > 1048576) {
            self.$message({
              type: "warning",
              message: "您上传图片的格式或大小不正确，请重新上传"
            });
            return;
          } else {
            self.uploadImage(files[0]);
          }
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);
    },
    // 上传图片
    uploadImage(file) {
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "amusment");
      formdata.append("business", "recipes");
      formdata.append("token", TOKEN);
      this.getfooduploadFile(formdata)
        .then(data => {
          // console.log(data)
          if (data.code == 200) {
            this.path = data.data[0].path;
            this.zoomPath = data.data[0].zoomPath;
            this.thumbnail = true;
            this.$message({
              message: "上传图片成功",
              type: "success"
            });
            document.getElementById("upfile").value = "";
            if (this.ismainPicuter == true) {
              this.imgbox_1 = false;
              this.imgbox_2 = true;
              this.mainPicuter = data.data[0].path;
            } else {
              this.imgbox_3 = false;
              this.imgbox_4 = true;
              this.minorPicuter = data.data[0].path;
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //失去焦点
    searchInput(e) {
      this.listFood1 = false;
    },
    get3: function(e) {
      // 请求限制 按了上下箭头
      if (e.keyCode === 38 || e.keyCode === 40) {
        return;
      }
      // enter跳转
      if (e.keyCode === 13) {
        this.listFood3 = false;
        return;
      }
      // 限制频繁请求
      this.getData3();
      //this.throttle(this.getData,window)
    },
    changeDown3: function() {
      this.now++;
      // 到了最后一个选项
      if (this.now === this.myData3.length) {
        this.now = -1;
      }
      this.tt3 = this.myData3[this.now];
      this.kca3 = this.myBrr3[this.now];
      this.comid3 = this.myCrr3[this.now];
    },
    changeUp3: function() {
      this.now--;
      // 到了第一个选项
      if (this.now === -2) {
        this.now = this.myData3.length - 1;
      }
      this.tt3 = this.myData3[this.now];
      this.kca3 = this.myBrr3[this.now];
      this.comid3 = this.myCrr3[this.now];
    },
    // 把请求单独拿出来
    getData3() {
      this.listFood3 = true;
      if (this.tt3.length == 0) {
        this.listFood3 = false;
      } else {
        this.getfoodFuzzyQuery({
          name: this.tt3
        })
          .then(data => {
            if (data.code == 200) {
              var Data3 = data.data;
              var Arr = [];
              var Brr = [];
              var Crr = [];
              var myCrr3 = [];
              var myBrr3 = [];
              for (var i = 0; i < Data3.length; i++) {
                Arr.push(Data3[i].list.name);
                Brr.push(Data3[i].key);
                Crr.push(Data3[i].list.kcal);
                if (Arr.length > 20) {
                  Arr.length = 20;
                }
              }
              this.myBrr3 = Brr;
              this.myData3 = Arr;
              this.myCrr3 = Crr;
              this.now = -1;
            } else {
              this.$message({
                message: data.message
              });
              this.tt3 = "";
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    get2: function(e) {
      // 请求限制 按了上下箭头
      if (e.keyCode === 38 || e.keyCode === 40) {
        return;
      }
      // enter跳转
      if (e.keyCode === 13) {
        this.listFood2 = false;
        return;
      }
      // 限制频繁请求
      this.getData2();
      //this.throttle(this.getData,window)
    },
    changeDown2: function() {
      this.now++;
      // 到了最后一个选项
      if (this.now === this.myData2.length) {
        this.now = -1;
      }
      this.tt2 = this.myData2[this.now];
      this.kca2 = this.myBrr2[this.now];
      this.comid2 = this.myCrr2[this.now];
    },
    changeUp2: function() {
      this.now--;
      // 到了第一个选项
      if (this.now === -2) {
        this.now = this.myData2.length - 1;
      }
      this.tt2 = this.myData2[this.now];
      this.kca2 = this.myBrr2[this.now];
      this.comid2 = this.myCrr2[this.now];
    },
    // 把请求单独拿出来
    getData2() {
      this.listFood2 = true;
      if (this.tt2.length == 0) {
        this.listFood2 = false;
      } else {
        this.getfoodFuzzyQuery({
          name: this.tt2
        })
          .then(data => {
            if (data.code == 200) {
              var Data2 = data.data;
              var Arr = [];
              var Brr = [];
              var myBrr2 = [];
              var Crr = [];
              var myCrr2 = [];
              for (var i = 0; i < Data2.length; i++) {
                Arr.push(Data2[i].list.name);
                Brr.push(Data2[i].key);
                Crr.push(Data2[i].list.kcal);
                if (Arr.length > 20) {
                  Arr.length = 20;
                }
              }
              this.myBrr2 = Brr;
              this.myData2 = Arr;
              this.myCrr2 = Crr;
              this.now = -1;
            } else {
              this.$message({
                message: data.message
              });
              this.tt2 = "";
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    get1: function(e) {
      // 请求限制 按了上下箭头
      if (e.keyCode === 38 || e.keyCode === 40) {
        return;
      }
      // enter跳转
      if (e.keyCode === 13) {
        this.listFood1 = false;
        return;
      }
      // 限制频繁请求
      this.getData1();
      //this.throttle(this.getData,window)
    },
    changeDown1: function() {
      this.now++;
      // 到了最后一个选项
      if (this.now === this.myData1.length) {
        this.now = -1;
      }
      this.tt1 = this.myData1[this.now];
      this.kca1 = this.myBrr1[this.now];
      this.comid1 = this.myCrr1[this.now];
    },
    changeUp1: function() {
      this.now--;
      // 到了第一个选项
      if (this.now === -2) {
        this.now = this.myData1.length - 1;
      }
      this.tt1 = this.myData1[this.now];
      this.kca1 = this.myBrr1[this.now];
      this.comid1 = this.myCrr1[this.now];
    },
    // 把请求单独拿出来
    getData1() {
      this.listFood1 = true;
      if (this.tt1.length == 0) {
        this.listFood1 = false;
      } else {
        this.getfoodFuzzyQuery({
          name: this.tt1
        })
          .then(data => {
            if (data.code == 200) {
              var Data1 = data.data;
              var Arr = [];
              var Brr = [];
              var myBrr1 = [];
              var Crr = [];
              var myCrr1 = [];
              for (var i = 0; i < Data1.length; i++) {
                Arr.push(Data1[i].list.name);
                Brr.push(Data1[i].key);
                Crr.push(Data1[i].list.kcal);
                if (Arr.length > 20) {
                  Arr.length = 20;
                }
              }
              this.myBrr1 = Brr;
              this.myData1 = Arr;
              this.myCrr1 = Crr;
              this.now = -1;
            } else {
              this.$message({
                message: data.message
              });
              this.tt1 = "";
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    get: function(e) {
      // 请求限制 按了上下箭头
      if (e.keyCode === 38 || e.keyCode === 40) {
        return;
      }
      // enter跳转
      if (e.keyCode === 13) {
        this.listFood = false;
        return;
      }
      // 限制频繁请求
      this.getData();
      //this.throttle(this.getData,window)
    },
    changeDown: function() {
      this.now++;
      // 到了最后一个选项
      if (this.now === this.myData.length) {
        this.now = -1;
      }
      this.tt = this.myData[this.now];
      this.kca = this.myBrr[this.now];
      this.comid = this.myCrr[this.now];
    },
    changeUp: function() {
      this.now--;
      // 到了第一个选项
      if (this.now === -2) {
        this.now = this.myData.length - 1;
      }
      this.tt = this.myData[this.now];
      this.kca = this.myBrr[this.now];
      this.comid = this.myCrr[this.now];
    },
    // 把请求单独拿出来
    getData() {
      this.listFood = true;
      if (this.tt.length == 0) {
        this.listFood = false;
      } else {
        this.getfoodFuzzyQuery({
          name: this.tt
        })
          .then(data => {
            if (data.code == 200) {
              var Data = data.data;
              var Arr = [];
              var Brr = [];
              var Crr = [];
              var myBrr = [];
              var myCrr = [];
              for (var i = 0; i < Data.length; i++) {
                Arr.push(Data[i].list.name);
                Brr.push(Data[i].key);
                Crr.push(Data[i].list.kcal);

                if (Arr.length > 20) {
                  Arr.length = 20;
                }
              }
              this.myBrr = Brr;
              this.myData = Arr;
              this.myCrr = Crr;
              this.now = -1;
              // console.log(this.myCrr)
            } else {
              this.$message({
                message: data.message
              });
              this.tt = "";
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //返回上级页面
    backList() {
      this.$router.push({
        path: "recipe"
      });
    },
    backLists() {
      this.$router.push({
        path: "recipe"
      });
    },
    // 分类选择
    selecBradnsClick(sType) {
      // console.log(sType)
      this.selectfl = sType;
      this.Classification = sType == "请选择" ? "" : sType;
      //              this.xwList()
    },
    validation() {
      var flag = true;
      var chineseCharacters = /[\u4e00-\u9fa5_a-zA-Z0-9_]/;
      if (!chineseCharacters.test(this.dietName)) {
        this.redPrompt = true;
        this.greyPrompt = false;
        flag = false;
      }
      if (!chineseCharacters.test(this.reasonsVal)) {
        this.isRedreasonsVal = true;
        this.isGrayreasonsVal = false;
        flag = false;
      } else {
        this.isRedreasonsVal = false;
        this.isGrayreasonsVal = true;
      }
      return flag;
    },
    //      保存食谱
    addfoodSave() {
      var feiK = /^\s*$/g;
      if (!this.validation()) {
        return;
      }
      if (this.tt1 == "") {
        this.kca1 = "";
      }
      if (this.tt2 == "") {
        this.kca2 = "";
      }
      if (this.tt3 == "") {
        this.kca3 = "";
      }

      this.intercept = true;
      if (this.selectedTime.length == 0) {
        this.$message({
          message: "请选择时段！"
        });
        return;
      }
      if (this.tt.length == 0) {
        this.$message({
          message: "请填写食物一！"
        });
        return;
      }
      if (!feiK.test(this.tt) && feiK.test(this.selected)) {
        this.$message({
          message: "请选择食物一重量！"
        });
        return;
      }
      if (feiK.test(this.tt1) && !feiK.test(this.selected1)) {
        this.$message({
          message: "请选择食物二！"
        });
        return;
      }
      if (!feiK.test(this.tt1) && feiK.test(this.selected1)) {
        this.$message({
          message: "请选择食物二重量！"
        });
        return;
      }
      if (feiK.test(this.tt2) && !feiK.test(this.selected2)) {
        this.$message({
          message: "请选择食物三！"
        });
        return;
      }
      if (!feiK.test(this.tt2) && feiK.test(this.selected2)) {
        this.$message({
          message: "请选择食物三重量！"
        });
        return;
      }
      if (feiK.test(this.tt3) && !feiK.test(this.selected3)) {
        this.$message({
          message: "请选择食物四！"
        });
        return;
      }
      if (!feiK.test(this.tt3) && feiK.test(this.selected3)) {
        this.$message({
          message: "请选择食物四重量！"
        });
        return;
      }
      var self = this;
      if (self.selectedTime == "早餐") {
        self.selectedTime = 1;
      }
      if (self.selectedTime == "午餐") {
        self.selectedTime = 2;
      }
      if (self.selectedTime == "晚餐") {
        self.selectedTime = 3;
      }
      if (self.selectedTime == "加餐") {
        self.selectedTime = 4;
      }
      let c = [self.kca, self.kca1, self.kca2, self.kca3];
      let c1 = [];
      for (var i = 0; i < c.length; i++) {
        if (c[i] !== "" && c[i] !== undefined) {
          c1.push(c[i]);
        }
      }
      let d = [self.comid, self.comid1, self.comid2, self.comid3];
      let d1 = [];
      for (var i = 0; i < d.length; i++) {
        if (d[i] !== undefined && d[i] !== "") {
          d1.push(d[i]);
        }
      }
      var s = 0;
      for (var i = 0; i < d1.length; i++) {
        s += Number(d1[i]);
      }
      let a = [self.tt, self.tt1, self.tt2, self.tt3];
      let a1 = [];
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== undefined && a[i] !== "") {
          a1.push(a[i]);
        }
      }
      let b = [self.selected, self.selected1, self.selected2, self.selected3];
      let b1 = [];
      for (var i = 0; i < b.length; i++) {
        if (b[i] !== undefined && b[i] !== "") {
          b1.push(b[i]);
        }
      }

      var addfood = {
        id: self.Id,
        combinationName: a1.join(","),
        name: self.dietName,
        type: self.selectedTime,
        combinationId: c1.join(","),
        specifications: b1.join("+"),
        recommendedReason: self.reasonsVal
      };

      if (self.dietName == self.dietNamesat) {
        var addFoods = JSON.stringify(addfood);
        self
          .getfoodRecipesAddOrUpdate({
            recipesJson: addFoods
          })
          .then(data => {
            if (data.code == 200) {
              self.$message({
                message: "保存成功",
                type: "success"
              });
              self.$router.push({
                path: "recipe"
              });
            } else {
              this.$message({
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        self
          .getverifyByName({
            name: self.dietName
          })
          .then(data => {
            if (data.code == 400) {
              this.Recipesexist = true;
            } else {
              if (data.code == 200) {
                var addFoods = JSON.stringify(addfood);
                self
                  .getfoodRecipesAddOrUpdate({
                    recipesJson: addFoods
                  })
                  .then(data => {
                    if (data.code == 200) {
                      self.$message({
                        message: "保存成功",
                        type: "success"
                      });
                      self.$router.push({
                        path: "recipe"
                      });
                    } else {
                      self.$message({
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    self.$message({
                      type: "info",
                      message: "服务器异常"
                    });
                  });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    ...mapActions([
      "getfoodRecipesAddOrUpdate",
      "getfoodFuzzyQuery",
      "getListResRole",
      "getfooduploadFile",
      "getverifyByName"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.redMarkedWords {
  padding-left: 20px;
  color: red;
}

.foodName {
  padding-top: 20px;
  padding-left: 137px;
}

.foodName input {
  width: 180px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 12px;
  margin-left: 6px;
}

.markedWords {
  padding-left: 20px;
  color: #8f8e94;
}

.timeFrame select,
.foodOne select {
  width: 138px;
  height: 32px;
  border: 1px solid #8f8e94;
  border-radius: 4px;
  margin-left: 6px;
}

.foodControl {
  color: #303030;
  font-size: 16px;
  width: auto;
  height: 56px;
  border-bottom: 1px solid #d1d1d1;
  line-height: 56px;
  padding-left: 1px;
  margin-right: 36px;
  margin-left: 36px;
  font-weight: 600;
  padding-top: 8px;
}

.img {
  width: 20px;
  height: 20px;
  background: url(../../../../static/img/精灵.png) no-repeat;
  background-position: 41.7% 50%;
  float: left;
  margin-top: 17px;
  margin-right: 8px;
  cursor: pointer;
}

.dietContent {
  width: 100%;
  margin-top: 24px;
}

.dietName {
  width: 100%;
  margin-left: 108px;
}

.dietName input {
  border: 1px solid #8f8e94;
  border-radius: 4px;
  width: 176px;
  height: 30px;
  text-align: center;
  margin-left: 6px;
}

.proofRule {
  margin-left: 24px;
  color: #8f8e94;
  font-size: 14px;
}

.foodSpecies {
  width: 100%;
  float: left;
}

.foodOne {
  margin-left: 122px;
  margin-top: 24px;
  position: relative;
}

.foodOne input {
  border: 1px solid #8f8e94;
  border-radius: 4px;
  width: 176px;
  height: 30px;
  text-align: center;
  margin-left: 2px;
}

.foodOne ul {
  position: absolute;
  left: 60px;
  border: 1px solid #8f8e94;
  width: 176px;
  height: 90px;
  text-align: center;
  margin-left: 2px;
  background-color: #ffffff;
  z-index: 999;
}

.gray {
  background: #fff1f3;
}

.addFood {
  width: 100%;
  margin-top: 24px;
  overflow: hidden;
}

.plusSign {
  float: left;
  width: 20px;
  height: 20px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 74.8% 70%;
  margin-left: 184px;
  border: 1px solid #fe5371;
  border-radius: 50%;
  cursor: pointer;
}

.addFoodChars {
  float: left;
  margin-left: 10px;
}

.CorrespondingSymptoms {
  width: 100%;
  margin-top: 24px;
  overflow: hidden;
}

.symptomsName {
  float: left;
  margin-left: 108px;
}

.CorrespondingSymptoms ul {
  float: left;
}

.CorrespondingSymptoms ul:nth-child(3) {
  float: left;
  margin-left: 178px;
}

.CorrespondingSymptoms ul li:nth-child(1) {
  float: left;
  margin-left: 6px;
}

.CorrespondingSymptoms ul li {
  float: left;
  margin-left: 22px;
}

.diseaseName {
  margin-left: 8px;
}

.timeFrame {
  width: 100%;
  margin-left: 137px;
  margin-top: 24px;
  float: left;
}

.handles {
  float: left;
  margin-top: 40px;
  width: 100%;
}

.foodSaves,
.abolishs {
  float: left;
  width: 68px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  margin: auto auto;
}

.abolishs {
  background-color: #d1d1d1;
  margin-left: 48px;
}

.foodSaves {
  background-color: #ff6339;
  margin-left: 38%;
}

.markedWords {
  padding-left: 20px;
  color: #8f8e94;
}

.markedWords {
  padding-left: 20px;
  color: #8f8e94;
}

.foodPic {
  padding-left: 140px;
  padding-top: 24px;
}

.picBox {
  float: left;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  margin-left: 54px;
  border: 1px solid #d1d1d1;
  background: url(/static/img/elf.3b8efb5.png) no-repeat;
  background-position: 60% 71%;
  margin-top: 3px;
}

.picBox input {
  width: 120px;
  height: 28px;
}

.picBox img {
  float: left;
  width: 28px;
  height: 28px;
  margin-top: -29px;
  margin-left: -1px;
  border-radius: 4px;
}

.uploading {
  float: left;
  width: 68px;
  height: 30px;
  border-radius: 4px;
  background-color: #ff6339;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  margin-left: 24px;
  margin-top: 2px;
  cursor: pointer;
}

.picGreyPrompt {
  float: left;
  color: #8f8e94;
  padding-left: 20px;
  margin-top: 6px;
}

.picMarkedWords {
  float: left;
  color: red;
  padding-left: 20px;
  margin-top: 6px;
}

/*消息框*/

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

/*弹出框*/

.removeBox {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
}

.remove {
  width: 525px;
  height: 285px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 25%;
  animation: removeAnimate 0.8s linear forwards;
}

@keyframes removeAnimate {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.iknow {
  width: 108px;
  height: 30px;
  background-color: #fe4848;
  border-radius: 4px;
  float: left;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  cursor: pointer;
  margin-left: 48px;
}

.questionMark {
  width: 100%;
  margin-top: 36px;
}

.questionMark > div {
  width: 50px;
  height: 50px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 82% 75%;
  margin: 0 auto;
}

.deletePrompt {
  width: 100%;
  margin-top: 24px;
  font-size: 22px;
  color: #ff6339;
  text-align: center;
}

.operatingButton {
  width: 100%;
  margin-top: 48px;
}

.operatingButtonBox {
  width: 38%;
  margin: 0 auto;
}

.abolish {
  width: 68px;
  height: 30px;
  background-color: #d1d1d1;
  border-radius: 4px;
  float: left;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  cursor: pointer;
  margin-left: 48px;
}

.fine {
  width: 68px;
  height: 30px;
  background-color: #ff6339;
  border-radius: 4px;
  float: left;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  cursor: pointer;
}
.recommendedReasons {
  width: 100%;
  margin-left: 107px;
  padding-top: 24px;
  display: flex;
}
.textarea {
  float: left;
  width: 505px;
  height: 100px;
  /*	border: 1px solid #D1D1D1;*/
  margin-left: 12px;
  border-radius: 4px;
  padding-left: 12px;
  padding-bottom: 10px;
  resize: none;
  overflow-y: hidden;
  outline: none;
}
.astrict {
  float: left;
  margin-top: 20px;
  color: #8f8e94;
  font-size: 14px;
  margin-left: 34px;
}
.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayInput {
  border: 1px solid #d1d1d1;
}
</style>