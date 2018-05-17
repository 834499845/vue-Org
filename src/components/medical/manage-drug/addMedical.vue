<!--新增关联-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div class="foodControl">
            <div class="img" @click="returnClick"></div>
            新增药品
        </div>
        <div v-if="ifPage" class="firstPage">
            <div class="foodName">
                药品名称：
                <input type="text" :class="{redbor:nameRed}" v-model="drugNameModel" maxlength="50" placeholder="请输入药品名称" />
                <span :class="{redfont:nameRed}" class="markedWords">最多输入50个字符,不支持非法字符</span>
            </div>
            <div class="list-img">
                <div>
                    药品封页：
                </div>
                <div>
                    <div>
                        <div>
                            <img src="/static/img/addimg.jpg" alt="" v-show="imgboxOne">
                            <img :src="mainPicuter" alt="" v-show="imgboxTow">
                        </div>
                        <label for="upfile">上传</label>
                        <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange" />
                    </div>
                    <div>
                        <span :class="{redfont:isfontimg}" class="markedWords">图片文件大小不能超过200k</span>
                    </div>
                </div>
            </div>
            <div class="CorrespondingSymptoms">
                <div class="relecomm">
                    <div class="main">
                        <div>
                            <div class="ensurearea">对应症状：</div>
                            <div class="foodOne">
                                <select @change='selectedAreaClick' v-model="bodyPartsModel">
                                    <option v-for="(type,index) in Areas" :value="type.key">{{type.value}}</option>
                                </select>
                                <input type="text" placeholder="输入症状名称开始搜索" v-model="bodyPartsInt" />
                                <button @click="symptomClick">确定</button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>可选症状</p>
                                <div class="areaBox">
                                    <ul>
                                        <li @click="rightSymptomClick(index)" v-for="(item,index) in symptomList" :class="{optionli:isoptionli,bgcolor:item.checked}">
                                            {{item.name}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <p>已选症状</p>
                                <div class="areaBox" :class="{redbor:symptomRed}">
                                    <ul class="checkedBox">
                                        <li @click="delSymptomClick(index)" v-for="(item,index) in okSymptomList" :key="index" :class="{optionli:isoptionli,bgcolor:item.checked}">
                                            <div>{{item.name}}</div>
                                            <div><img src="/static/img/删除灰.jpg" alt=""></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="CorrespondingSymptoms">
                <div class="relecomm">
                    <div class="main">
                        <div>
                            <div class="ensurearea">对应药店：</div>
                            <div class="foodOne">
                                <input id='medicalInput' type="text" v-model="drugstoreModel" placeholder="输入药店名称开始搜索" />
                                <button @click="drugstoreClick">确定</button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>可选药店</p>
                                <div class="areaBox">
                                    <ul>
                                        <li @click="rightDrugstoreClick(index)" v-for="(item,index) in drugstoreList" :key="index" :class="{optionli:isoptionli,bgcolor:item.checked}">
                                            {{item.drugstoreName}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <p>已选药店</p>
                                <div class="areaBox" :class="{redbor:drugstoreRed}">
                                    <ul class="checkedBox">
                                        <li v-for="(item,index) in okDrugstoreList" :key="index" :class="{optionli:isoptionli,bgcolor:item.checked}">
                                            <div>
                                                {{item.drugstoreName}}
                                            </div>
                                            <div @click="delDrugstoreClick(index)" >
                                                <img src="/static/img/删除灰.jpg" alt="">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="CorrespondingSymptoms">
                <div class="relecomm">
                    <div class="main">
                        <div>
                            <div class="ensurearea">药品链接：</div>
                            <div class="foodOne">
                                <input id='medicalInputs' v-model="drugLingModel" type="text" placeholder="输入名称查找商品" />
                                <button @click="drugLingClick">确定</button>
                            </div>
                        </div>
                        <div class="drugLing">
                            <ul>
                                <li @click="drugLingListClick(index)" v-for="(item,index) in drugLingList" :key="index" :class="{optionli:isoptionli,bgcolor:drugLingbag == index}">
                                    {{item.productName}}
                                </li>
                            </ul>
                        </div>
                        <div class="okDrugLings">
                            <button @click="okDrugLingClick">确定</button>
                            <span :class="{redbor:DrugLingRed}">{{DrugLingname}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="secondPage">
            <ul>
                <li>
                    <div>
                        成分：
                    </div>
                    <div>
                        <textarea :class="{redbor:elementRed}" v-model="elementModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        性状：
                    </div>
                    <div>
                        <textarea :class="{redbor:characterRed}" v-model="characterModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        适应症：
                    </div>
                    <div>
                        <textarea :class="{redbor:majorFunctionRed}" v-model="majorFunctionModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        规格：
                    </div>
                    <div>
                        <textarea :class="{redbor:specificationRed}" v-model="specificationModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        用法用量：
                    </div>
                    <div>
                        <textarea :class="{redbor:usageAndDosageRed}" v-model="usageAndDosageModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        不良反应：
                    </div>
                    <div>
                        <textarea :class="{redbor:responseRed}" v-model="responseModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        禁忌：
                    </div>
                    <div>
                        <textarea :class="{redbor:tabooRed}" v-model="tabooModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        注意事项：
                    </div>
                    <div>
                        <textarea :class="{redbor:attentionRed}" v-model="attentionModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        药物相互作用：
                    </div>
                    <div>
                        <textarea :class="{redbor:effectRed}" v-model="effectModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        药理毒理：
                    </div>
                    <div>
                        <textarea :class="{redbor:excessiveRed}" v-model="excessiveModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        贮藏：
                    </div>
                    <div>
                        <textarea :class="{redbor:storeUpRed}" v-model="storeUpModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        包装：
                    </div>
                    <div>
                        <textarea :class="{redbor:packagingRed}" v-model="packagingModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        有效期：
                    </div>
                    <div>
                        <textarea :class="{redbor:periodOfValidityRed}" v-model="periodOfValidityModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        批准文号：
                    </div>
                    <div>
                        <textarea :class="{redbor:referenceNumberRed}" v-model="referenceNumberModel"></textarea>
                    </div>
                </li>
                <li>
                    <div>
                        企业名称：
                    </div>
                    <div>
                        <textarea :class="{redbor:enterpriseRed}" v-model="enterpriseModel"></textarea>
                    </div>
                </li>
            </ul>
        </div>
        <div class="handle">
            <div v-show="ifPage" class="foodSave" @click='nextStep'>下一步</div>
            <div v-show="ifPage" class="abolish" @click='returnClick'>取消</div>
            <div v-show="noPage" class="foodSave" @click='okAddClick'>确定</div>
            <div v-show="noPage" class="abolish" @click='lastStep'>上一步</div>
        </div>
        <!--提示信息弹出框-->
        <div :class="{showdel:isShowdels}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShows">
                    <v-hosdel @ok="okclicks" @canle="canleClicks" :name="nametitles"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      drugLingClickTrueOrFalse: true,
      drugstoreClickTrueOrFalse: true,
      symptomClickTrueOrFalse: true,
      uploadImageTrueOrFalse: true,
      okAddClickTrueOrFalse: true,
      ifPage: true,
      noPage: false,
      mainPicuter: "", //药品封面
      imgboxOne: true,
      imgboxTow: false,
      symptomList: [], //可选症状列表
      okSymptomList: [], //已选症状列表
      drugstoreList: [], //可选药店列表
      okDrugstoreList: [], //已选药店列表
      drugLingList: [], //药品链接列表
      checked: false,
      isoptionli: true,
      Areas: [], //身体部位下拉
      isShowdels: true,
      delShows: false,
      nametitles: "劳动成果还未保存，确定退出？",
      intercept: false, //跳转拦截
      drugNameModel: "", //新增药品名称
      bodyPartsModel: "", //人体部位下拉
      bodyPartsInt: "", //症状搜索输入框
      drugstoreModel: "", //药店输入框
      drugLingModel: "", //药品链接输入框
      drugLingbag: -1, //药品背景选定
      DrugLingname: "", //确定药品的名称
      DrugLingId: "", //确定药品的ID
      DrugLingSKUId: "", //确定药品的SKUID
      drugLingInd: -1, //药品index
      nameRed: false, //新增药品名称提示
      isfontimg: false, //上传图片提示
      symptomRed: false, //已选症状提示
      drugstoreRed: false, //已选药店提示
      DrugLingRed: false, //药品链接提示
      //**********第二页****************************
      elementModel: "", //成分
      elementRed: false, //成分提示
      characterModel: "", //性状
      characterRed: false, //性状提示
      majorFunctionModel: "", //适应症
      majorFunctionRed: false, //适应症提示
      specificationModel: "", //规格
      specificationRed: false, //规格提示
      usageAndDosageModel: "", //用法用量
      usageAndDosageRed: false, //用法用量提示
      responseModel: "", //不良反应
      responseRed: false, //不良反应提示
      tabooModel: "", //禁忌
      tabooRed: false, //禁忌提示
      attentionModel: "", //注意事项
      attentionRed: false, //注意事项提示
      effectModel: "", //药物相互作用
      effectRed: false, //药物相互作用提示
      excessiveModel: "", //药理毒理
      excessiveRed: false, //药理毒理提示
      storeUpModel: "", //贮藏
      storeUpRed: false, //贮藏提示
      packagingModel: "", //包装
      packagingRed: false, //包装提示
      periodOfValidityModel: "", //有效期
      periodOfValidityRed: false, //有效期提示
      referenceNumberModel: "", //批转文号
      referenceNumberRed: false, //批转文号提示
      enterpriseModel: "", //企业名称
      enterpriseRed: false, //企业名称提示
      pushdrugStoreListOk: false, //判断是否添加可选药店要已选
      pushSymptomListOk: false ////判断是否添加可选症状要已选
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
      //console.log("arrs", arrs);
      if (arrs.indexOf("drug") == -1) {
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
        //获取身体部位
        self
          .getbodyPartsList({})
          .then(data => {
            //console.log("身体部位列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length == 0) {
                  self.Areas = [{ value: "暂无数据", key: "zw" }];
                  self.bodyPartsModel = "zw";
                } else {
                  var arr = [{ value: "请选择身体部位", key: "" }];
                  var arry = data.data;
                  arry.forEach(function(ele, ind) {
                    arr.push({ value: ele.value, key: ele.key });
                  });
                  self.Areas = arr;
                }
              } else {
                self.Areas = [{ value: "暂无数据", key: "zw" }];
                self.bodyPartsModel = "zw";
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
              self.Areas = [{ value: "暂无数据", key: "zw" }];
              self.bodyPartsModel = "zw";
            }
          })
          .catch(msg => {
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
            self.Areas = [{ value: "暂无数据", key: "zw" }];
            self.bodyPartsModel = "zw";
          });
        self.symptomClick();
        self.drugstoreClick();
        self.drugLingClick();
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
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdels = false;
      this.delShows = true;
    } else if (this.intercept == true) {
      this.isShowdels = true;
      this.delShows = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //返回按钮
    returnClick() {
      this.$router.push({
        path: "drug"
      });
    },
    //取消按钮
    canleClicks() {
      this.$emit("appchildsay", "return");
      this.isShowdels = true;
      this.delShows = false;
    },
    //确认跳转
    okclicks() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    //确定模糊搜素症状
    symptomClick() {
      this.okSymptomList = [];
      var self = this;
      if (self.symptomClickTrueOrFalse == true) {
        self.symptomClickTrueOrFalse = false;
        self
          .getsymptomList({
            searchTerms: self.bodyPartsInt,
            positionId: self.bodyPartsModel
          })
          .then(data => {
            self.symptomClickTrueOrFalse = true;
            //console.log("症状列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length == 0) {
                  self.symptomList = [];
                } else {
                  self.symptomList = [];
                  var arr = data.data;
                  arr.forEach(function(ele, ind) {
                    self.symptomList.push({
                      name: ele.name,
                      id: ele.id,
                      checked: false
                    });
                  });
                }
              } else {
                self.symptomList = [];
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.symptomClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //身体部位下拉
    selectedAreaClick() {
      this.symptomClick();
    },
    //可选症状点击
    selectSymptomClick(index) {
      var self = this;
      var arr = [];
      for (var i = 0; i < self.symptomList.length; i++) {
        if (self.symptomList[i].checked == true) {
          arr.push(i);
        }
      }
      if (arr.length < 20 - this.okSymptomList.length) {
        if (this.symptomList[index].checked == false) {
          this.symptomList[index].checked = true;
        } else {
          this.symptomList[index].checked = false;
        }
      } else {
        if (this.symptomList[index].checked == true) {
          this.symptomList[index].checked = false;
        } else {
          this.$message({
            type: "info",
            message: "最多可选20个！"
          });
        }
      }
    },
    //右箭头确定选择症状
    rightSymptomClick(index) {
      var self = this;
      if (self.okSymptomList.length == 0) {
        self.okSymptomList.push(self.symptomList[index]);
      } else if (self.okSymptomList.length > 0) {
        var self = this;
        for (var i = 0; i < self.okSymptomList.length; i++) {
          if (self.symptomList[index] == self.okSymptomList[i]) {
            self.$message({
              type: "info",
              message: "不可重复添加！"
            });
            self.pushSymptomListOk = false;
            break;
          } else {
            self.pushSymptomListOk = true;
          }
        }
        if (self.pushSymptomListOk == true) {
          self.okSymptomList.push(self.symptomList[index]);
        }
      }
      // var arr = []
      // for (var i = 0; i < self.symptomList.length; i++) {
      //     if (self.symptomList[i].checked == true) {
      //         self.okSymptomList.push(self.symptomList[i])
      //         this.symptomRed = false
      //     } else if (self.symptomList[i].checked == false) {
      //         arr.push(self.symptomList[i])
      //     }
      // }
      // self.symptomList = arr
      // //console.log("已选症状", self.okSymptomList)
    },
    //已选症状点击
    cancelSelectSymptomClick(index) {
      this.okSymptomList[index].checked = !this.okSymptomList[index].checked;
    },
    //删除已选症状
    delSymptomClick(index) {
      var self = this;
      self.okSymptomList.splice(index, 1);
    },
    //左箭头取消已选症状
    leftSymptomClick() {
      var self = this;
      var arr = [];
      for (var i = 0; i < self.okSymptomList.length; i++) {
        if (self.okSymptomList[i].checked == false) {
          self.symptomList.push(self.okSymptomList[i]);
        } else if (self.okSymptomList[i].checked == true) {
          arr.push(self.okSymptomList[i]);
        }
      }
      self.okSymptomList = arr;
      //console.log("已选症状", self.okSymptomList);
    },
    //确定搜索药店
    drugstoreClick() {
      this.okDrugstoreList = [];
      var self = this;
      if (self.drugstoreClickTrueOrFalse == true) {
        self.drugstoreClickTrueOrFalse = false;
        self
          .getsymptomDrugstoreList({
            searchTerms: self.drugstoreModel
          })
          .then(data => {
            self.drugstoreClickTrueOrFalse = true;
            //console.log("药店列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length == 0) {
                  self.drugstoreList = [];
                } else {
                  self.drugstoreList = [];
                  var arr = data.data;
                  arr.forEach(function(ele, ind) {
                    self.drugstoreList.push({
                      drugstoreName: ele.drugstoreName,
                      id: ele.id,
                      checked: false
                    });
                  });
                }
              } else {
                self.drugstoreList = [];
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.drugstoreClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }
    },
    //可选药店点击
    selectDrugstoreClick(index) {
      var self = this;
      var arr = [];
      for (var i = 0; i < self.drugstoreList.length; i++) {
        if (self.drugstoreList[i].checked == true) {
          arr.push(i);
        }
      }
      if (arr.length < 20 - this.okDrugstoreList.length) {
        if (this.drugstoreList[index].checked == false) {
          this.drugstoreList[index].checked = true;
        } else {
          this.drugstoreList[index].checked = false;
        }
      } else {
        if (this.drugstoreList[index].checked == true) {
          this.drugstoreList[index].checked = false;
        } else {
          this.$message({
            type: "info",
            message: "最多可选20个！"
          });
        }
      }
    },
    //点击可选药品添加至右侧列表
    rightDrugstoreClick(index) {
      var self = this;
      if (self.okDrugstoreList.length == 0) {
        self.okDrugstoreList.push(self.drugstoreList[index]);
      } else if (self.okDrugstoreList.length > 0) {
        var self = this;
        for (var i = 0; i < self.okDrugstoreList.length; i++) {
          if (self.drugstoreList[index] == self.okDrugstoreList[i]) {
            self.$message({
              type: "info",
              message: "不可重复添加！"
            });
            self.pushdrugStoreListOk = false;
            break;
          } else {
            self.pushdrugStoreListOk = true;
          }
        }
        if (self.pushdrugStoreListOk == true) {
          self.okDrugstoreList.push(self.drugstoreList[index]);
        }
      }
    },
    //已选药店点击
    okDrugstoreClick(index) {
      this.okDrugstoreList[index].checked = !this.okDrugstoreList[index]
        .checked;
    },
    //删除已选药店
    delDrugstoreClick(index) {
      var self = this;
      self.okDrugstoreList.splice(index, 1);
    },
    //确定获取药品链接
    drugLingClick() {
      var self = this;
      self.drugLingList = [];
      if (self.drugLingClickTrueOrFalse == true) {
        self.drugLingClickTrueOrFalse = false;
        self
          .getdrugLingList({
            productName: self.drugLingModel
          })
          .then(data => {
            self.drugLingClickTrueOrFalse = true;
            //console.log("药品列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length == 0) {
                  self.drugLingList = [];
                } else {
                  self.drugLingList = data.data;
                }
              } else {
                self.drugLingList = [];
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.drugLingClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }

      this.drugLingbag = -1;
      this.drugLingInd = -1;
      this.DrugLingname = "";
    },
    //药品列表点击
    drugLingListClick(index) {
      this.drugLingbag = index;
      this.drugLingInd = index;
      //console.log("fsdfas12", this.drugLingInd);
    },
    //确定药品
    okDrugLingClick() {
      if (this.drugLingInd == -1) {
        this.$message({
          type: "info",
          message: "请先选择药品！"
        });
      } else {
        this.DrugLingRed = false;
        this.DrugLingname = this.drugLingList[this.drugLingInd].productName;
        this.DrugLingSKUId = this.drugLingList[this.drugLingInd].skuId;
        this.DrugLingId = this.drugLingList[this.drugLingInd].productId;
      }
      //console.log("药品名称", this.DrugLingname);
      //console.log("药品ID", this.DrugLingId);
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      self.ismainPicuter = true;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      //console.log(fileData);
      // 读取图片数据
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        // 加载图片的真实宽度和高度
        var image = new Image();
        image.onload = function() {
          if (fileData.size > 204800) {
            this.$message({
              type: "info",
              message: "您上次的图片格式或大小不正确，请重新上传！"
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
      var formdata = new FormData();
      //console.log(file);
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "medical");
      formdata.append("business", "drug");
      if (this.uploadImageTrueOrFalse == true) {
        this.uploadImageTrueOrFalse = false;
        this.gethosuploadFile(formdata)
          .then(data => {
            //console.log(data);
            this.uploadImageTrueOrFalse = true;
            if (data.code == 200) {
              this.isfontimg = false;
              this.$message({
                message: "上传图片成功",
                type: "success"
              });
              if (this.ismainPicuter == true) {
                this.imgboxOne = false;
                this.imgboxTow = true;
                this.mainPicuter = data.data[0].path;
              } else {
                return;
              }
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            this.uploadImageTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }
    },
    //第一页验证规则
    validation() {
      var JudgeOne = /^[\s]*$/; //输入不能为空
      var JudgeTwo = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");//不能输入非法字符
      if (JudgeOne.test(this.drugNameModel) || JudgeTwo.test(this.drugNameModel)){
        this.nameRed = true
      }
      if (this.imgboxTow == false) {
        this.isfontimg = true;
      }
      if (this.okSymptomList.length == 0) {
        this.DrugLingRed = true;;
      }
      if (this.okDrugstoreList.length == 0) {
        this.drugstoreRed = true;
      }
      if ( this.DrugLingname == "") {
        this.DrugLingRed = true;
      }
      if ( this.nameRed == true ||
           this.isfontimg == true ||
           this.DrugLingRed == true ||
           this.drugstoreRed == true ||
           this.DrugLingRed == true
      ) {
        return false
      }
    },
    //下一步
    nextStep() {
      if (this.validation() == false) {
       return false     
      } else {
        this.ifPage = false;
        this.noPage = true;
      }
    },
    // 第二页正则
    regularTwo() {
      var JudgeOne = /^[\s]*$/; //输入不能为空
      var JudgeTwo = new RegExp("[`~@#$^&()=|{}\\[\\]<>@#￥&;——|{}【】]")
      // var JudgeTwo = /^[\s]*$/; //输入不能为空
      if (JudgeOne.test(this.elementModel) || JudgeTwo.test(this.elementModel)) {
          this.elementRed = true;
      }
      if (JudgeOne.test(this.characterModel) || JudgeTwo.test(this.characterModel)) {
          this.characterRed = true;
      }
      if (JudgeOne.test(this.majorFunctionModel) ||JudgeTwo.test(this.majorFunctionModel)) {
          this.majorFunctionRed = true;
      }
      if (JudgeOne.test(this.specificationModel) || JudgeTwo.test(this.specificationModel)) {
          this.specificationRed = true;
      }
      if (JudgeOne.test(this.usageAndDosageModel) || JudgeTwo.test(this.usageAndDosageModel)) {
          this.usageAndDosageRed = true;
      }
      if (JudgeOne.test(this.responseModel) || JudgeTwo.test(this.responseModel)) {
          this.responseRed = true;
      }
      if (JudgeOne.test(this.tabooModel) || JudgeTwo.test(this.tabooModel)) {
          this.tabooRed = true;
      }
      if (JudgeOne.test(this.attentionModel) || JudgeTwo.test(this.attentionModel)) {
          this.attentionRed = true;
      }
      if (JudgeOne.test(this.effectModel) || JudgeTwo.test(this.effectModel)) {
          this.effectRed = true;
      }
      if (JudgeOne.test(this.excessiveModel) || JudgeTwo.test(this.excessiveModel)) {
          this.excessiveRed = true;
      }
      if (JudgeOne.test(this.storeUpModel) || JudgeTwo.test(this.storeUpModel)) {
          this.storeUpRed = true;
      }
      if (JudgeOne.test(this.packagingModel) || JudgeTwo.test(this.packagingModel)) {
          this.packagingRed = true;
      }
      if (JudgeOne.test(this.periodOfValidityModel) ||JudgeTwo.test(this.periodOfValidityModel)) {
          this.periodOfValidityRed = true;
      }
      if (JudgeOne.test(this.referenceNumberModel) || JudgeTwo.test(this.referenceNumberModel)) {
          this.referenceNumberRed = true;
      }
      if (JudgeOne.test(this.enterpriseModel) || JudgeTwo.test(this.enterpriseModel)) {
          this.enterpriseRed = true;
      }      
      if (
          this.elementRed == true ||
          this.characterRed == true ||
          this.majorFunctionRed == true ||
          this.specificationRed == true ||
          this.usageAndDosageRed == true ||
          this.responseRed == true ||
          this.tabooRed == true ||
          this.attentionRed == true ||
          this.effectRed == true ||
          this.excessiveRed == true ||
          this.storeUpRed == true ||
          this.packagingRed == true ||
          this.periodOfValidityRed == true ||
          this.referenceNumberRed == true ||
          this.enterpriseRed == true        
      ) {
        return false;
      }
    },
    //确定
    okAddClick() {
      if (this.regularTwo() == false) {
        return false       
      } else {
        var self = this;
        //症状id  //  symptomIdString
        var symptomId = [];
        for (var i = 0; i < self.okSymptomList.length; i++) {
          symptomId.push(self.okSymptomList[i].id);
        }
        var symptomIdString = JSON.stringify(symptomId);
        //药店id  //  drugstoreIdString
        var drugstoreId = [];
        for (var i = 0; i < self.okDrugstoreList.length; i++) {
          drugstoreId.push(self.okDrugstoreList[i].id);
        }
        var drugstoreIdString = JSON.stringify(drugstoreId);
        if (self.okAddClickTrueOrFalse == true) {
          self.okAddClickTrueOrFalse = false;
          self
            .getaddMedicine({
              drugName: self.drugNameModel, //药品名称
              picture: self.mainPicuter, //药品封面
              mallDrugId: self.DrugLingId, //商城药品Id
              mallDrugSkuId: self.DrugLingSKUId, //商城药品skuId
              element: self.elementModel, //药品成分
              character: self.characterModel, //药品性状
              majorFunction: self.majorFunctionModel, //适应症
              specification: self.specificationModel, //规格
              usageAndDosage: self.usageAndDosageModel, //用法用量
              untowardEffect: self.responseModel, //不良反应
              taboos: self.tabooModel, //禁忌
              mattersNeedAttention: self.attentionModel, //注意事项
              drugInteractions: self.effectModel, //药物相互作用
              overdose: self.excessiveModel, //药理毒理
              reposit: self.storeUpModel, //贮藏
              pack: self.packagingModel, //包装
              periodOfValidity: self.periodOfValidityModel, //有效期
              approvalNumber: self.referenceNumberModel, //批准文号
              enterpriseName: self.enterpriseModel, //企业名称
              symptomIdList: symptomIdString, //症状id
              drugstoreIdList: drugstoreIdString //药店id
            })
            .then(data => {
              self.okAddClickTrueOrFalse = true;
              //console.log("身体部位列表", data);
              if (data.code == 200) {
                self.intercept = true;
                this.$router.push({
                  path: "drug"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.okAddClickTrueOrFalse = true;
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常！"
              });
            });
        }
      }
    },
    //上一步
    lastStep() {
      this.ifPage = true;
      this.noPage = false;
    },
    ...mapActions([
      "gethosuploadFile",
      "getbodyPartsList",
      "getsymptomList",
      "getsymptomDrugstoreList",
      "getdrugLingList",
      "getaddMedicine"
    ])
  },
  // 监视
  watch: {
    drugNameModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.nameRed = false;
      }
    },
    elementModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.elementRed = false;
      }
    },
    characterModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.characterRed = false;
      }
    },
    majorFunctionModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.majorFunctionRed = false;
      }
    },
    specificationModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.specificationRed = false;
      }
    },
    usageAndDosageModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.usageAndDosageRed = false;
      }
    },
    responseModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.responseRed = false;
      }
    },
    tabooModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.tabooRed = false;
      }
    },
    attentionModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.attentionRed = false;
      }
    },
    effectModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.effectRed = false;
      }
    },
    excessiveModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.excessiveRed = false;
      }
    },
    storeUpModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.storeUpRed = false;
      }
    },
    packagingModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.packagingRed = false;
      }
    },
    periodOfValidityModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.periodOfValidityRed = false;
      }
    },
    referenceNumberModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.referenceNumberRed = false;
      }
    },
    enterpriseModel: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.enterpriseRed = false;
      }
    }
  }
};
</script>
<style scoped>
textarea {
  float: left;
  width: 565px;
  height: 60px;
  border-radius: 4px;
  padding-left: 12px;
  padding-bottom: 10px;
  resize: none;
  overflow-y: hidden;
  outline: none;
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
  background: url(../../../../static/img/返回蓝.jpg) no-repeat;
  background-position: 65% 50%;
  float: left;
  margin-top: 17px;
  margin-right: 8px;
  cursor: pointer;
}

.firstPage,
.secondPage {
  width: 100%;
  margin-top: 24px;
}

.foodName {
  padding-top: 20px;
  padding-left: 95px;
}

.foodName input {
  width: 180px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 12px;
  margin-left: 8px;
}

.markedWords {
  padding-left: 20px;
  color: #8f8e94;
}

.list-img {
  display: flex;
  margin: 25px 0;
  height: 100px;
  overflow: hidden;
  padding-left: 95px;
}

.list-img > div:nth-child(1) {
  margin-top: 2px;
}

.list-img > div:nth-child(2) {
  margin-left: 25px;
  height: 50px;
}

.list-img > div:nth-child(2) > div {
  float: left;
}

.list-img > div:nth-child(2) > div:nth-child(1) div {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(209, 209, 209, 0.5);
  text-align: center;
  line-height: 100px;
  float: left;
}

.list-img > div:nth-child(2) > div:nth-child(1) label {
  float: left;
  background: #f0622e;
  width: 80px;
  height: 30px;
  border-radius: 3px;
  color: white;
  text-align: center;
  line-height: 30px;
  margin: 10px 0 0 24px;
  cursor: pointer;
}

.list-img > div:nth-child(2) > div:nth-child(2) {
  color: #8f8e94;
  height: 50px;
  line-height: 50px;
}

.list-img img:nth-child(2) {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

input[type="file"] {
  display: none;
}

.foodOne {
  margin-left: 122px;
}

select {
  width: 178px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  padding-left: 12px;
  margin-left: -116px;
  cursor: pointer;
}

.foodOne input {
  width: 178px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  text-align: center;
  padding-left: 4px;
  margin-left: 20px;
}

#medicalInput,
#medicalInputs {
  width: 178px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  text-align: center;
  padding-left: 4px;
  margin-left: -116px;
}

button {
  width: 78px;
  height: 32px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  text-align: center;
  margin-left: 20px;
  background-color: #5acdfa;
  color: #ffffff;
}

.CorrespondingSymptoms {
  width: 100%;
  margin-top: 24px;
  overflow: hidden;
}

.handle {
  display: flex;
  justify-content: center;
  height: 32px;
  margin: 36px 0;
  width: 830px;
}

.foodSave,
.abolish {
  width: 75px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
}

.abolish {
  background-color: #d1d1d1;
  margin-left: 48px;
}

.foodSave {
  background-color: #5acdfa;
}

.relecomm .main > div {
  display: flex;
}

.relecomm .main > div:nth-child(1) {
  margin-bottom: 24px;
}

.main {
  margin-left: 170px;
}

.main li {
  cursor: pointer;
}

.areaBox {
  width: 200px;
  height: 320px;
  border: 1px solid #d1d1d1;
  overflow-y: auto;
}

.checkedBox li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkedBox li div:nth-child(2) {
  margin-right: 5px;
}

.checkedBox li div:nth-child(1) {
  margin-left: 10px;
}

.relecomm .main > div:nth-child(2) p {
  font-size: 16px;
  text-align: center;
}

.main > div:nth-child(2) > div:nth-child(1) {
  margin-right: 50px;
}

.rightarrow {
  width: 19px;
  height: 30px;
  cursor: pointer;
  background: url("/static/img/elf.png") no-repeat 50.8% 72%;
}

.leftarrow {
  width: 19px;
  height: 30px;
  cursor: pointer;
  background: url("/static/img/elf.png") no-repeat 53.4% 72%;
  margin-top: 40px;
}

.optionli {
  height: 35px;
  line-height: 35px;
  text-align: center;
}

.optionli:hover {
  background: #fff1f3;
}

.bgcolor {
  background: #fff1f3;  
}

.areaBox ul li {
  width: 100%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 4px;
  text-overflow: ellipsis;
}

.ensurearea {
  width: auto;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 3px;
  color: #000;
  margin-left: -76px;
}

.drugLing {
  width: 500px;
  height: 300px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  overflow: hidden;
  overflow-y: auto;
}

.drugLing li {
  width: 500px;
  text-align: center;
}

.okDrugLings {
  width: 500px;
  margin-top: 16px;
  margin-left: -24px;
}

.okDrugLings span {
  width: 440px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-left: 16px;
  border: 1px solid #d1d1d1;
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

.secondPage li {
  display: flex;
  margin-top: 24px;
}

.secondPage li > div:nth-child(1) {
  width: 20%;
  max-width: 240px;
  height: 60px;
  line-height: 60px;
  text-align: right;
  margin-right: 16px;
}

.redbor {
  border: 1px solid #fe5371 !important;
}

.graybor {
  border: 1px solid #d1d1d1 !important;
}

.redfont {
  color: #fe5371 !important;
}

.arrows {
  margin: 154px 40px 0 40px;
}
</style>