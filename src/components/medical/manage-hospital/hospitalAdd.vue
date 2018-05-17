<!--添加医院管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        新增医院
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div>
                    <div>
                        医院名称：
                    </div>
                    <div class="cssFlex">
                        <input :class="{redbor:isRedname}" class="listInp redBorder" type="text" maxlength="30" v-model="name" placeholder="请输入医院名称">
                        <span :class="{redfont:isRedname}" class="isAstrict">最多输入30个汉字（不支持非法字符）</span>
                    </div>
                </div>
                <div class="upTwoIm">
                    <div>
                        上传图片：
                    </div>
                    <div>
                        <div>
                            <div>
                                <img src="/static/img/addimg.jpg" alt="" v-show="imgboxOne">
                                <img :src="mainPicuter" alt="" v-show="imgboxTow">
                            </div>
                            <label for="upfile">上传</label>
                            <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange" value="上传">
                        </div>
                        <div>
                            <span :class="{redfont:isfontimg}" class="isAstrict">图片文件大小不能超过1M</span>
                        </div>
                    </div>
                </div>
                <div class="list-ch">
                    <div>
                        一级科室：
                    </div>
                    <ul>
                        <li class="chcheck" v-for="(city,index) in cities" :label="city.value" :key="city.key">
                            <div class="chcheckOne" @click="checkimg(index)" v-show="!city.bigshow">
                                <img src="/static/img/show.jpg" alt="">
                            </div>
                            <div class="chcheckTwo" @click="checkimg(index)" v-show="city.bigshow">

                            </div>
                            <div class="chcheckThree" @click="checkval(index)">{{city.value}}</div>
                        </li>
                    </ul>
                </div>
                <div class="list-ch-lit">
                    <div>
                        二级科室：
                    </div>
                    <ul>
                        <li v-show="this.citiesaLit.length>0" class="checkAll" @click="checkAll">
                            <div v-if="check" class="chcheckOne">
                                <img src="/static/img/show.jpg" alt="">
                            </div>
                            <div v-else class="chcheckTwo"></div>
                            <div class="chcheckThree">
                                <strong>全选</strong>
                            </div>
                        </li>
                        <li class="chcheck" v-for="(city,index) in citiesaLit" :label="city.value" :key="city.key" @click="checkimgLittle(index)">
                            <div class="chcheckOne" v-show="!city.smallshow">
                                <img src="/static/img/show.jpg" alt="">
                            </div>
                            <div class="chcheckTwo" v-show="city.smallshow"></div>
                            <div class="chcheckThree">{{city.value}}</div>
                        </li>
                    </ul>
                </div>
                <div class="isRed TwoAdmin" v-show="isTwoAdmin">
                    <div></div>
                    <div>
                        <span>请选择科室</span>
                    </div>

                </div>
                <div class="listrank">
                    <div>
                        级别：
                    </div>
                    <div>
                        <ul>
                            <li v-for="(city,index) in levs" @click="levClick($event,index)" :key="index">
                                <div v-if="tfshow == index">
                                    <!-- <el-checkbox v-model="checkedt" @change="levChange($event,index)"> {{city.value}}</el-checkbox> -->
                                    <el-checkbox v-model="checkedt"> {{city.value}}</el-checkbox>
                                </div>
                                <div v-else>
                                    <el-checkbox v-model="checkedf"> {{city.value}}</el-checkbox>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="isRed TwoAdmin" v-show="isRank">
                    <div></div>
                    <div>
                        <span>请选择级别</span>
                    </div>
                </div>
                <div class="listlabel">
                    <div>
                        标签：
                    </div>
                    <div class="cssFlex">
                        <input :class="{redbor:isRedlabel}" class="listLabelInp redBorder" type="text" maxlength="5" v-model="labelName" @keyup.13="show()">
                        <span :class="{redfont:isfontlabel}" class="isAstrict">最多输入5个字符（输入完成请按回车确认、最多添加4个标签、不支持非法字符）</span>
                    </div>
                </div>
                <div class="listLabelSpa">
                    <span v-for="(city,index) in labelArr" :key="index">
                        {{city}}
                        <img src="/static/img/shan.jpg" @click="shanBq(index)" alt="">
                    </span>
                </div>
                <div class="listintroduce">
                    <div>
                        医院介绍：
                    </div>
                    <div>
                        <textarea :class="{redbor:isRedIntroduce}" class="listIntroduceInp" maxlength="5000" v-model="introduce"></textarea>
                    </div>
                </div>
                <div class="listintroduceFont">
                    <div></div>
                    <div>
                        <span :class="{redfont:isRedIntroduce}" class="isAstrict">最多输入5000个字符，可以输入中文，英文，数字</span>
                    </div>
                </div>
                <div class="list-limit">
                    <div>经度：</div>
                    <div>
                        <input :class="{redbor:isborlong}" type="text" v-model="longitudeText" maxlength="10">
                        <span class="isAstrict" :class="{redfont:isborlong}">73.66 ~ 135.05（小数点后输入6位）</span>
                    </div>
                </div>
                <div class="list-limit">
                    <div>纬度：</div>
                    <div>
                        <input :class="{redbor:isborlat}" type="text" v-model="latitudeText" maxlength="9">
                        <span class="isAstrict" :class="{redfont:isborlat}">3.86 ~ 53.55（小数点后输入6位）</span>
                    </div>
                </div>
                <div class="district">
                    <div>
                        省市区：
                    </div>
                    <div>
                        <div>
                            <select :class="{redbor:isborprovince}" @change="selecBradnsClick" v-model="gainProvinceId">
                                <option v-for="(type,index) in provinceList" v-bind:value="type.key" :key="index">{{type.value}}</option>
                            </select>
                        </div>
                        <div class="districtSmall">
                            <select :class="{redbor:isborcity}" v-model="gainCityId" @change="gainCityChg">
                                <option v-for="(type,index) in cityList" v-bind:value="type.key"  :key="index">{{type.value}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="listsite">
                    <div>
                        地址：
                    </div>
                    <div class="cssFlex">
                        <input :class="{redbor:isborsite}" class="listSiteInp redBorder" type="text" v-model="hospitalsite" maxlength="50">
                        <span :class="{redfont:isfontsite}" class="isAstrict">最多输入50个字符（不支持非法字符）</span>
                    </div>
                </div>
                <div>
                    <div></div>
                    <div class="but">
                        <div @click="newlyhos">确定</div>
                        <div @click="canelClick">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--取消弹出框-->
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
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  // props: ['isInd'],
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      uploadImageTrueOrFalse: true,
      newlyhosTrueOrFalse: true,
      latitudeText: "",
      longitudeText: "",
      gainProvinceId: "QZX",
      gainCityId: "QZX",
      provinceList: [{ value: "请选择", key: "QZX" }],
      cityList: [{ value: "请选择", key: "QZX" }],
      department: [], //科室数组
      titlename: "劳动成果还未保存，是否退出？",
      isRank: false,
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      mainPicuter: "",
      cities: [],
      labelArr: [],
      citiesLit: [],
      citiesa: [],
      citiesaLit: [],
      levs: [],
      checkedCities: [],
      checkedt: true,
      checkedf: false,
      tfshow: -1,
      name: "",
      introduce: "",
      labelName: "",
      instruction: "",
      yiyuanadd: "",
      hospitalsite: "",
      isShow: 0,
      bigIndex: 0,
      bigArray: [], //一级科室
      smallArray: [], //二级科室
      adminArry: [], //医院级别
      bigKey: "",
      imgboxOne: true,
      imgboxTow: false,
      isRedlabel: false,
      isborlong: false,
      isborlat: false,
      isborprovince: false,
      isborcity: false,
      isborsite: false,
      isRedname: false,
      isfontimg: false,
      isfontlabel: false,
      isRedIntroduce: false,
      isfontsite: false,
      isTwoAdmin: false,
      intercept: false,
      check: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
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
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      // console.log("arrs", arrs);
      if (arrs.indexOf("hospital") == -1) {
        this.intercept = true;
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
        this.ksList();
        this.jbList();
        this.proList();
      }
    } else {
      this.intercept = true;
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
  //跳转拦截
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdel = false;
      this.delShow = true;
    } else if (this.intercept == true) {
      this.isShowdel = true;
      this.delShow = false;
      next();
    }
  },
  // 事件处理
  methods: {
    // 箭头返回上一页/取消按钮
    canelClick() {
      // this.$emit('appchildsay', "hospital")
      this.$router.push({
        path: "/medical/hospital"
      });
    },
    //确定取消框
    okClick() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    // 取消返回框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //获取省列表
    proList() {
      var self = this;
      self
        .getprovince({
          code: "PROVINCE",
          parentId: 1
        })
        .then(data => {
          // console.log("省级列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                var objState = data.data;
                var arr = [{ value: "请选择", key: "QZX" }];
                objState.forEach(function(ele, ind) {
                  arr.push({ value: ele.value, key: ele.key });
                });
                self.provinceList = arr;
              } else {
                self.provinceList = [];
              }
            } else {
              self.provinceList = [];
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
    //选取省份
    selecBradnsClick() {
      // console.log("省份列表", this.gainProvinceId);
      this.isborprovince = false;
      this.gainCityId = "QZX";
      this.citList();
    },
    //获取城市列表
    citList() {
      var self = this;
      if (self.gainProvinceId == "QZX") {
        this.gainCityId = "QZX";
      } else {
        self
          .getprovince({
            code: "CITY",
            parentId: self.gainProvinceId
          })
          .then(data => {
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  var objState = data.data;
                  var arr = [{ value: "请选择", key: "QZX" }];
                  objState.forEach(function(ele, ind) {
                    arr.push({ value: ele.value, key: ele.key });
                  });
                  self.cityList = arr;
                } else {
                  self.cityList = [];
                }
              } else {
                self.cityList = [];
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
    //选择城市
    gainCityChg() {
      this.isborcity = false;
    },
    //获取一级科室列表
    ksList() {
      var self = this;
      self
        .gettrainedList({
          token: sessionStorage.getItem("token")
        })
        .then(data => {
          // console.log("一级科室", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.citiesa = data.data;
                self.citiesa.forEach(function(ele, ind) {
                  self.cities.push({
                    key: ele.id,
                    value: ele.value,
                    bigshow: true
                  });
                });
              } else {
                self.cities = [];
              }
            } else {
              self.cities = [];
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
    //一级科室选定
    checkimg(index) {
      var self = this;
      // console.log(self.cities[index].bigshow);
      if (self.cities[index].bigshow == true) {
        self.bigArray.push(self.cities[index].key);
        self.department.push({
          bigAdministrativeOffice: self.cities[index].key,
          smallAdministrativeOffices: ""
        });
      } else {
        for (var i = 0; i < self.bigArray.length; i++) {
          if (self.bigArray[i] == self.cities[index].key) {
            self.bigArray.splice(i, 1);
            self.department.splice(i, 1);
            break;
          }
        }
      }
      this.cities[index].bigshow = !this.cities[index].bigshow;
      this.bigKey = this.cities[index].key;
      this.bigIndex = index;
      this.ksLitList();
    },
    //点击一级科室val
    checkval(index) {
      this.bigIndex = index;
      this.bigKey = this.cities[index].key;
      //获取二级科室列表

      this.ksLitList();
    },
    //获取二级科室列表
    ksLitList() {
      // console.log(this.bigKey);
      var self = this;
      self
        .getLitTrainedList({
          key: this.bigKey
        })
        .then(data => {
          // console.log("二级科室", data);
          if (data.code == 200) {
            if (self.cities[self.bigIndex].bigshow == true) {
              //一级科室取消对号
              var cidsadsd = []; //二级科室
              data.data.forEach(function(ele, ind) {
                cidsadsd.push({
                  key: ele.id,
                  value: ele.value,
                  smallshow: true
                });
              });
              self.citiesaLit = cidsadsd; //当前的所有二级科室
              var arr1 = self.smallArray; //选定的所有二级科室
              var arr2 = self.citiesaLit;
              var arr3 = [];
              arr1.forEach(function(ele, ind) {
                arr2.forEach(function(art, artind) {
                  if (ele == art.key) {
                    arr3.push(ele); //当前选定的二级科室
                  }
                });
              });
              var arr4 = new Array();
              for (var i = 0; i < arr1.length; i++) {
                //选定的所有二级科室
                var flag = true;
                for (var j = 0; j < arr3.length; j++) {
                  //当前选定的二级科室
                  if (arr1[i] == arr3[j]) flag = false;
                }
                if (flag) {
                  arr4.push(arr1[i]);
                }
              }
              self.smallArray = arr4;
            } else {
              //一级科室打对号
              var cidsadsd = [];
              data.data.forEach(function(ele, ind) {
                cidsadsd.push({
                  key: ele.id,
                  value: ele.value,
                  smallshow: true
                });
              });
              self.citiesaLit = cidsadsd; //当前所有的二级科室
              var arrIf = new Array();
              for (var i = 0; i < self.smallArray.length; i++) {
                //选定的所有的二级科室
                var equality = false;
                for (var k = 0; k < self.citiesaLit.length; k++) {
                  //当前所有的二级科室
                  if (self.citiesaLit[k].key == self.smallArray[i]) {
                    self.citiesaLit[k].smallshow = false;
                    equality = true;
                  }
                }
                if (equality) {
                  arrIf.push(self.smallArray[i]); //当前选的二级科室
                }
              }
              // console.log("arrIf", arrIf);
              if (arrIf.length == 0) {
                // console.log("self.citiesaLit", self.citiesaLit);
                cidsadsd[0].smallshow = false;
                self.smallArray.push(self.citiesaLit[0].key);
                self.isTwoAdmin = false;
                for (var i = 0; i < self.department.length; i++) {
                  if (
                    self.department[i].bigAdministrativeOffice == self.bigKey
                  ) {
                    var smallOne = self.citiesaLit[0].key;
                    // console.log(
                    //   " self.citiesaLit[0].key",
                    //   self.citiesaLit[0].key
                    // );
                    var smallString = smallOne.toString();
                    self.department[i].smallAdministrativeOffices = smallString;
                  }
                }
              }
            }
            var ifcheck = [];
            for (var i = 0; i < self.citiesaLit.length; i++) {
              if (self.citiesaLit[i].smallshow == false) {
                ifcheck.push(i);
              }
            }
            if (ifcheck.length == self.citiesaLit.length) {
              self.check = true;
            } else {
              self.check = false;
            }
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          })
        });
      // console.log("所有的二级科室", this.smallArray);
    },
    //二级科室选定
    checkimgLittle(index) {
      var self = this;
      if (self.cities[self.bigIndex].bigshow == true) {
        //一级科室没打对号 //选定一级科室
        self.smallArray.push(self.citiesaLit[index].key);
        self.citiesaLit[index].smallshow = !self.citiesaLit[index].smallshow;
        self.isTwoAdmin = false;
        self.bigArray.push(self.bigKey);
        self.cities[self.bigIndex].bigshow = false; //一级科室打对号
        self.department.push({
          bigAdministrativeOffice: self.bigKey,
          smallAdministrativeOffices: self.citiesaLit[index].key
        });
      } else {
        //一级科室已经选定
        if (self.citiesaLit[index].smallshow == true) {
          //小科室没有打对号    //小科室打对号
          self.smallArray.push(self.citiesaLit[index].key);
          for (var i = 0; i < self.department.length; i++) {
            if (self.department[i].bigAdministrativeOffice == self.bigKey) {
              var smallArr = self.department[i].smallAdministrativeOffices;
              var smallArrA = self.citiesaLit[index].key;
              var smallA = smallArr + "," + smallArrA;
              self.department[i].smallAdministrativeOffices = smallA;
            }
          }
          self.isTwoAdmin = false;
        } else {
          //小科室已经打对号     //小科室取消对号
          var smallArrayDel = [];
          for (var i = 0; i < self.smallArray.length; i++) {
            if (self.smallArray[i] != self.citiesaLit[index].key) {
              smallArrayDel.push(self.smallArray[i]);
            }
          }
          self.smallArray = smallArrayDel; //从smallArray里面删掉取消对号的
          var arrIf = [];
          for (var i = 0; i < self.smallArray.length; i++) {
            for (var k = 0; k < self.citiesaLit.length; k++) {
              if (self.citiesaLit[k].key == self.smallArray[i]) {
                arrIf.push(k); //还剩下几个当前二级科室
              }
            }
          }
          if (arrIf.length == 0) {
            //判断二级科室还盛下几个选定的    arrIf.length=0 的得时候为取消掉了所有的当前二级科室
            this.cities[this.bigIndex].bigshow = true;
            var delBigArray = 0;
            for (var i = 0; i < self.bigArray.length; i++) {
              if (self.bigArray[i] == self.cities[this.bigIndex].key) {
                delBigArray = i;
              }
            }
            self.bigArray.splice(delBigArray, 1); //删除bigarray里对应的一级科室
            var delDepartment = 0;
            for (var i = 0; i < self.bigArray.length; i++) {
              if (self.bigArray[i] == self.cities[this.bigIndex].key) {
                delDepartment = i;
              }
            }
            self.department.splice(delDepartment, 1); //删除department里对应的科室
          } else {
            //取消二级科室选定后 还有剩余二级科室
            for (var i = 0; i < self.department.length; i++) {
              if (self.bigKey == self.department[i].bigAdministrativeOffice) {
                //从department寻找当前对应的一级科室
                var smallAs = self.department[i].smallAdministrativeOffices; //department对应的二级科室
                var smallA = smallAs.split(",");
                var small = [];
                for (var j = 0; j < smallA.length; j++) {
                  if (self.citiesaLit[index].key != smallA[j]) {
                    small.push(smallA[j]);
                  }
                }
                var obj = small.join(",");
                self.department[i].smallAdministrativeOffices = obj;
              }
            }
          }
        }
        self.citiesaLit[index].smallshow = !self.citiesaLit[index].smallshow;
      }
      var ifcheck = [];
      for (var i = 0; i < self.citiesaLit.length; i++) {
        //判断全选的选定与取消
        if (self.citiesaLit[i].smallshow == false) {
          ifcheck.push(i);
        }
      }
      if (ifcheck.length == self.citiesaLit.length) {
        self.check = true;
      } else {
        self.check = false;
      }
    },
    //二级科室全选
    checkAll() {
      var self = this;
      var citiekey = [];
      for (var i = 0; i < self.citiesaLit.length; i++) {
        //citiesaLit当前二级科室
        citiekey.push(self.citiesaLit[i].key);
      }
      var citieString = citiekey.toString(); //要上传的二级科室字符串
      if (self.check == false) {
        //判断全选没有打对号false-没打对号  //进行全选
        self.isTwoAdmin = false; //正则
        if (self.cities[self.bigIndex].bigshow == true) {
          //判断一级科室；true-一级科室没打对号
          // console.log("push前的一级科室", this.bigArray);
          self.bigArray.push(self.bigKey);
          // console.log("push后的一级科室", this.bigArray);
          self.cities[self.bigIndex].bigshow = false; //一级科室打对号
          for (var i = 0; i < self.citiesaLit.length; i++) {
            //循环当前二级科室数组
            self.smallArray.push(self.citiesaLit[i].key);
            self.citiesaLit[i].smallshow = false;
          }
          self.department.push({
            bigAdministrativeOffice: self.bigKey,
            smallAdministrativeOffices: citieString
          });
          // console.log(citieString);
        } else {
          //一级科室已经打对号
          for (var i = 0; i < self.citiesaLit.length; i++) {
            //循环当前二级科室数组
            self.citiesaLit[i].smallshow = false; //给所有二级科室打对号
          }
          for (var i = 0; i < self.citiesaLit.length; i++) {
            var ifArr = false;
            for (var j = 0; j < self.smallArray.length; j++) {
              if (self.citiesaLit[i].key == self.smallArray[j]) {
                ifArr = true;
              }
            }
            if (ifArr) {
              self.smallArray.push(self.citiesaLit[i].key);
            }
          }
          for (var i = 0; i < self.department.length; i++) {
            if (self.department[i].bigAdministrativeOffice == self.bigKey) {
              self.department[i].smallAdministrativeOffices = citieString;
            }
          }
        }
      } else {
        //取消全选
        self.cities[self.bigIndex].bigshow = true; //一级科室取消对号
        for (var i = 0; i < self.citiesaLit.length; i++) {
          self.citiesaLit[i].smallshow = true; //当前所有二级科室取消对号
        }
        var fakeSmallArray = [];
        for (var i = 0; i < self.smallArray.length; i++) {
          var fake = true;
          for (var j = 0; j < self.citiesaLit.length; j++) {
            if (self.citiesaLit[j].key == self.smallArray[i]) {
              fake = false;
            }
          }
          if (fake) {
            fakeSmallArray.push(self.smallArray[i]);
          }
        }
        self.smallArray = fakeSmallArray;
        for (var i = 0; i < self.department.length; i++) {
          if (self.department[i].bigAdministrativeOffice == self.bigKey) {
            self.department.splice(i, 1);
          }
        }
      }
      self.check = !self.check;
    },
    //回车确定添加标签
    show: function() {
      // console.log(this.labelName);
      if (this.labelName.indexOf('"') >= 0) {
        this.isfontlabel = this.isRedlabel = true;
      } else if (this.labelName.indexOf("'") >= 0) {
        this.isfontlabel = this.isRedlabel = true;
      } else {
        if (this.labelArr.length >= 4) {
          this.isfontlabel = this.isRedlabel = true;
          return;
        } else {
          if (this.labelName == "") {
            this.isfontlabel = this.isRedlabel = true;
          } else {
            var JudgeTwo = new RegExp(
              "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】，,]"
            );
            if (JudgeTwo.test(this.labelName)) {
              this.isfontlabel = this.isRedlabel = true;
            } else {
              this.labelArr.push(this.labelName);
              this.labelName = "";
            }
          }
        }
      }
    },
    //删除已添加标签
    shanBq(index) {
      var self = this;
      for (var i = 0; i < self.labelArr.length; i++) {
        if (self.labelArr[i] == self.labelArr[index]) {
          self.labelArr.splice(i, 1);
          break;
        }
      }
      // console.log(this.labelArr.length);
    },
    //获取级别列表
    jbList() {
      var self = this;
      self
        .getlevelList({
          token: sessionStorage.getItem("token")
        })
        .then(data => {
          // console.log("级别列表", data);
          if (data.code == 200) {
            self.levs = data.data;
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          })
        });
    },
    //级别/级别选定
    levClick(e, index) {
      e.preventDefault();
      this.tfshow = index;
      this.checkedf = false;
      this.checkedt = true;
      this.adminArry = this.levs[index].key;
      this.isRank = false;
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      self.ismainPicuter = true;
      var files = e.target.files || e.dataTransfer.files;
      if (files[0]) {
        var fileData = files[0];
        // console.log(fileData);
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            if (fileData.size > 1048576) {
              this.$message({
                type: "info",
                message: "您上传的图片格式或大小不正确，请重新上传！"
              });
              return;
            } else {
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
      var formdata = new FormData();
      // console.log(file);
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "medical");
      formdata.append("business", "hospital");
      if (this.uploadImageTrueOrFalse == true) {
        this.uploadImageTrueOrFalse = false;
        this.gethosuploadFile(formdata)
          .then(data => {
            // console.log(data);
            this.uploadImageTrueOrFalse = true;
            if (data.code == 200) {
              this.$message({
                message: "上传图片成功",
                type: "success"
              });
              if (this.ismainPicuter == true) {
                this.imgboxOne = this.isfontimg = false;
                this.imgboxTow = true;
                this.mainPicuter = data.data[0].path;
              } else {
                return;
              }
            } else {
              this.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            this.uploadImageTrueOrFalse = true;
            // console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //正则验证
    inputJudge() {
      var JudgeOne = /^[\s]*$/; //输入不能为空
      var JudgeTwo = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;——|{}【】]");
      if (
        JudgeOne.test(this.name) ||
        JudgeTwo.test(this.name) ||
        this.imgboxTow == false ||
        this.smallArray.length == 0 ||
        this.adminArry.length == 0 ||
        this.labelArr.length == 0 ||
        JudgeOne.test(this.introduce) ||
        JudgeOne.test(this.longitudeText) ||
        JudgeOne.test(this.latitudeText) ||
        this.gainProvinceId == "QZX" ||
        this.gainCityId == "QZX" ||
        JudgeOne.test(this.hospitalsite) ||
        JudgeTwo.test(this.hospitalsite)
      ) {
        return false;
      } else {
        return true;
      }
      //   if (
      //     JudgeOne.test(this.name) ||
      //     JudgeTwo.test(this.name) ||
      //     this.imgboxTow == false ||
      //     this.smallArray.length == 0 ||
      //     this.adminArry.length == 0 ||
      //     this.labelArr.length == 0 ||
      //     JudgeOne.test(this.introduce) ||
      //     JudgeOne.test(this.longitudeText) ||
      //     JudgeOne.test(this.latitudeText) ||
      //     this.gainProvinceId == "QZX" ||
      //     this.gainCityId == "QZX" ||
      //     JudgeOne.test(this.hospitalsite) ||
      //     JudgeTwo.test(this.hospitalsite)
      //   ) {
      //     return false;
      //   }
      //经度
      var longitudeNumber = Number(this.longitudeText);
      if (135.05 > longitudeNumber && longitudeNumber > 73.66) {
        return true;
      } else {
        return false;
      }
      //   //纬度
      var latitudeNumber = Number(this.latitudeText);
      if (53.55 > latitudeNumber && latitudeNumber > 3.86) {
        this.isborlat = false;
        return true;
      } else {
        return false;
      }
    },
    //确定添加
    newlyhos() {
      var self = this;
      if (this.inputJudge() == false) {
        var JudgeOne = /^[\s]*$/; //输入不能为空
        var JudgeTwo = new RegExp(
          "[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
        );
        if (JudgeOne.test(this.name) || JudgeTwo.test(this.name)) {
          this.isRedname = true;
        }
        if (this.imgboxTow == false) {
          this.isfontimg = true;
        }   
        if (this.smallArray.length == 0) {
          this.isTwoAdmin = true;
        }
        if (this.adminArry.length == 0) {
          this.isRank = true;
        }
        if (this.labelArr.length == 0) {
          this.isRedlabel = this.isfontlabel = true;
        }
        if (JudgeOne.test(this.introduce)) {
          this.isRedIntroduce = true;
        }
        if (this.gainProvinceId == "QZX") {
          this.isborprovince = true;
        }
        if (this.gainCityId == "QZX") {
          this.isborcity = true;
        }
        if (
          JudgeOne.test(this.hospitalsite) ||
          JudgeTwo.test(this.hospitalsite)
        ) {
          this.isborsite = this.isfontsite = true;
        }

        //经度
        if (JudgeOne.test(this.longitudeText)) {
          this.isborlong = true;
        }
        var longitudeNumber = Number(this.longitudeText);
        if (135.05 < longitudeNumber || longitudeNumber < 73.66) {
          this.isborlong = true;
        }
        //纬度
        if (JudgeOne.test(this.latitudeText)) {
          this.isborlat = true;
        }
        var latitudeNumber = Number(this.latitudeText);
        if (53.55 < latitudeNumber || latitudeNumber < 3.86) {
          this.isborlat = true;
        }
      } else {
        var bigString = [];
        self.department.forEach(function(ele, ind) {
          bigString.push({
            bigAdministrativeOffice: ele.bigAdministrativeOffice.toString()
          });
        });
        for (var i = 0; i < self.department.length; i++) {
          self.department[i].bigAdministrativeOffice =
            bigString[i].bigAdministrativeOffice;
        }
        var administrativeOffice = JSON.stringify(self.department);
        var labelObj = self.labelArr.join(",");
        // console.log(self.newlyhosTrueOrFalse);
        if (self.newlyhosTrueOrFalse == true) {
          self.newlyhosTrueOrFalse = false;
          self
            .getnewlyhos({
              name: self.name, //医院名称
              rankDivide: self.adminArry, //等级划分
              label: labelObj, //标签
              longitude: self.longitudeText, //经度
              latitude: self.latitudeText, //纬度
              provinceId: self.gainProvinceId, //省份id
              cityId: self.gainCityId, //城市id
              itemImage: self.mainPicuter, //列表展示图
              address: self.hospitalsite, //地址
              instruction: self.introduce, //介绍
              officesJson: administrativeOffice, //科室
              topImageJson: "[" + "'" + self.mainPicuter + "'" + "]" //详情页图片集合
            })
            .then(data => {
              self.newlyhosTrueOrFalse = true;
              // console.log("添加医院", data);
              if (data.code == 200) {
                this.intercept = true;
                self.$router.push({
                  path: "/medical/hospital"
                });
              } else if (data.code == 601) {
                this.$message({
                  type: "info",
                  message: "该医院已存在，不可重复添加！"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.newlyhosTrueOrFalse = true;
              // console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    ...mapActions([
      "getnewlyhos",
      "gettrainedList",
      "getlevelList",
      "getLitTrainedList",
      "gethosuploadFile",
      "getprovince"
    ])
  },
  // 监视
  watch: {
    name: function(val) {
      this.isRedname = false;
    },
    introduce: function(val) {
      this.isRedIntroduce = false;
    },
    labelName: function(val) {
      this.isRedlabel = this.isfontlabel = false;
    },
    hospitalsite: function(val) {
      this.isborsite = this.isfontsite = false;
    },
    longitudeText: function(val) {
      var a = this.longitudeText;
      var b = a.replace(/[^\d\.\d]/g, "");
      this.longitudeText = b;
      this.isborlong = false;
    },
    latitudeText: function(val) {
      var a = this.latitudeText;
      var b = a.replace(/[^\d\.\d]/g, "");
      this.latitudeText = b;
      this.isborlat = false;
    }
  }
};
</script>
<style scoped>
.sale {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 150px;
}

.but {
  height: 32px;
  display: flex;
  justify-content: center;
  margin: 36px auto;
}

.but > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #5acdfa;
  margin-right: 25px;
  cursor: pointer;
}

.but > div:nth-child(2) {
  margin-left: 25px;
  width: 68px !important;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #aeaeae;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.listsite {
  display: flex;
}

.listsite > div:nth-child(2) {
  display: flex;
}

.listsite > div:nth-child(2) > div:nth-child(2) {
  line-height: 50px;
  color: #8f8e94;
  font-size: 15px;
}

.listintroduceFont > div:nth-child(2) {
  min-height: 50px;
  color: #8f8e94;
  font-size: 15px;
  line-height: 35px;
}

.listintroduce > div:nth-child(1) {
  min-height: 95px;
  height: 100%;
  overflow: hidden;
}

.listintroduce {
  overflow: inherit !important;
}

.listrank {
  min-height: 50px;
  height: 100%;
  overflow: inherit !important;
  position: relative;
}

.listrank > div:nth-child(1) {
  height: 100%;
}

.listrank > div:nth-child(2) {
  height: 100%;
  width: 80%;
  overflow: hidden;
}

.listrank > div:nth-child(2) ul {
  margin: 0;
  padding: 0;
}

.listrank > div:nth-child(2) li {
  width: 90px;
  margin-right: 60px;
  padding: 0;
  margin-bottom: 20px;
  float: left;
}

.listrank > div:nth-child(3) {
  width: 100px;
  position: absolute;
  right: -100px;
  top: 0px;
}

.listrank ul label {
  font-weight: normal !important;
}

.list-ch {
  min-height: 50px;
  height: 100%;
  overflow: inherit !important;
}

.list-ch-lit {
  min-height: 50px;
  height: 100%;
  overflow: inherit !important;
}

.list-ch > ul,
.list-ch-lit > ul {
  width: 80%;
  max-width: 700px;
  min-width: 500px;
}

.list-ch-lit {
  min-height: 50px;
  height: 100%;
  overflow: hidden;
}

.list-ch > div:nth-child(1) {
  height: 100%;
}

.list-ch > div:nth-child(2) {
  height: 100%;
}

.TwoAdmin {
  margin: -15px 0 24px 0;
}

.list {
  min-height: 540px;
  margin-top: 25px;
}

.list > div > div:nth-child(2) {
  margin-left: 15px;
  width: 80%;
  min-width: 550px;
  max-width: 750px;
}

.list > div > div:nth-child(1) {
  width: 75px;
  font-size: 14px;
  color: #333;
  text-align: right;
}

.list > div {
  width: 100%;
  margin-left: 50px;
  display: flex;
}

.listTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  width: 120px;
  height: 25px;
  margin-top: 12px;
  float: left;
  display: flex;
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
  margin-left: 10px;
}

.listlabel div:nth-child(2) {
  margin-bottom: 10px;
}

.list > div:nth-child(6) {
  margin-bottom: 10px;
  overflow: inherit;
}

.listLabelSpa {
  padding: 6px 0 0 90px;
  margin-bottom: 10px;
  height: 32px;
  overflow: inherit;
}

.listLabelSpa span {
  height: 24px;
  color: #5acdfa;
  margin-right: 24px;
  border-radius: 3px;
  border: 1px solid #5acdfa;
  display: inline-block;
  position: relative;
  padding: 0 5px;
}

.listLabelSpa span img {
  border-radius: 14px;
  width: 14px;
  height: 14px;
  position: absolute;
  right: -7px;
  top: -7px;
}

.listLabelInp {
  height: 32px;
  font-size: 14px;
  border-radius: 3px;
  padding-left: 5px;
}

.listSiteInp {
  width: 418px;
  height: 32px;
  border-radius: 3px;
  padding-left: 5px;
}

.chcheck {
  margin: 0 0 25px 15px;
  padding: 0;
  overflow: hidden;
  float: left;
}

.chcheck :hover {
  cursor: pointer;
}

.chcheck div {
  float: left;
}

.chcheckOne {
  width: 18px;
  height: 18px;
}

.chcheckTwo {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid #bfcbd9;
}

.chcheckThree {
  margin-left: 8px;
}

.chcheckOne img {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-top: -5px;
  border-radius: 3px;
  border: none;
}

.chcheckTwo:hover {
  border: 1px solid #5acdfa;
}

.checkAll {
  width: 55px;
  display: flex;
  margin: 0 0 25px 15px;
}

.isRed {
  color: #fe5371;
  margin-left: 24px;
}

.isAstrict {
  color: #8f8e94;
  margin-left: 24px;
}

.listInp {
  width: 430px !important;
  height: 32px;
  border-radius: 3px;
  padding-left: 5px;
}

.redfont {
  color: #fe5371 !important;
}

.redbor {
  border: 1px solid #fe5371 !important;
}

.redBorder {
  color: #aeaeae;
  border: 1px solid #aeaeae;
}

.listIntroduceInp {
  width: 100%;
  height: 95px;
  border-radius: 3px;
  padding-left: 5px;
  resize: none;
  color: #8f8e94;
}

.upTwoIm {
  margin: 25px 0;
  height: 80px;
  overflow: hidden;
}

.upTwoIm > div {
  float: left;
}

.upTwoIm > div:nth-child(1) {
  margin-top: 25px;
  text-align: center;
}

.upTwoIm > div:nth-child(2) {
  line-height: 70px;
}

.upTwoIm > div:nth-child(2) > div:nth-child(1) div {
  width: 80px;
  height: 80px;
  border: 1px solid rgba(209, 209, 209, 0.5);
  text-align: center;
  line-height: 80px;
  float: left;
}

.upTwoIm > div:nth-child(2) > div:nth-child(1) label {
  float: left;
  background: #f0622e;
  width: 80px;
  height: 32px;
  border-radius: 3px;
  color: white;
  text-align: center;
  line-height: 32px;
  margin: 25px 0 25px 24px;
  cursor: pointer;
}

.upTwoIm > div:nth-child(2) > div:nth-child(2) {
  margin-top: 7px;
}

.upTwoIm img:nth-child(2) {
  width: 100%;
  height: 100%;
  margin-top: -5px;
}

input[type="file"] {
  display: none;
}

/*取消弹出框*/

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

.list-limit {
  margin-bottom: 24px;
}

.list-limit div:nth-child(2) input {
  width: 177px;
  height: 32px;
  border: 1px solid #aeaeae;
  border-radius: 3px;
}

input[type="text"] {
  color: #8f8e94;
  padding-left: 5px;
}

.district > div {
  height: 32px;
  align-items: center;
  margin-bottom: 24px;
}

.districtSmall {
  margin-left: 24px;
}

.districtSpan {
  padding-top: 6px;
}

.district > div:nth-child(1) {
  width: 75px;
  text-align: right !important;
  line-height: 24px;
}

.district > div:nth-child(2) div {
  float: left;
}

select {
  width: 144px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 90% 8px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

.cssFlex {
  display: flex;
  flex-wrap: wrap;
}

.cssFlex span {
  margin-top: 8px;
}
</style>