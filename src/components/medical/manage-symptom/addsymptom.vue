<!--疾病管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="sale">
        <div class="listTitle">
            <img src="/static/img/返回蓝.jpg" @click="returnClick" style="cursor: pointer;">
            <span>{{illtitle}}</span>
        </div>
        <div class="list">
            <div class="listLi">
                <div>
                    症状名称：
                </div>
                <div>
                    <textarea :class="{redbor:redsymptomName,graybor:graysymptomName}" maxlength="219" type="text" v-model="symptomName"></textarea>
                    <div :class="{redfont:redsymptomName,grayfont:graysymptomName}">多个症状用；隔开（最多20个），单个症状不得超过10个字符（不支持非法字符）</div>
                </div>
            </div>
            <div class="listLi">
                <div>
                    选择对应科室：
                </div>
                <div>
                    <select :class="{redbor:isRedselectedOne,graybor:isGrayselectedOne}" @change="selectOneClick" v-model="selectedOne">
                        <option v-for="(type,index) in sectionOne" :value="type.key">{{type.value}}</option>
                    </select>
                    <select :class="{redbor:isRedselectedTwo}" @change="selectTwoClick" style="margin-left: 30px;" v-model="selectedTwo">
                        <option v-for="(type,index) in sectionTwo" :value="type.key">{{type.value}}</option>
                    </select>
                </div>
            </div>
            <div class="listLi">
              <div>
                  性别：
              </div>
              <div>
                <select :class="{redbor:isRedselectedOne}" @change="selectGenderaChange" v-model="selectGender">
                  <option v-for="(gender,index) in genderList" :key="gender.value" :value="gender.key">{{gender.value}}</option>
                </select>
              </div>
            </div>
            <div class="listLi">
                <div>
                </div>
                <div class="but">
                    <div @click="okSymptoomClick">确定</div>
                    <div @click="returnClick">取消</div>
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
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      okSymptoomClickTrueOrFalse: true,
      selectTwoClickTrueOrFalse: true,
      selectOneClickTrueOrFalse: true,
      symptomName: "", //症状名称
      redsymptomName: false, //症状名称判断
      graysymptomName: true,//症状名称样式判断
      sectionOne: [], //一级科室
      isRedselectedOne: false, //一级科室提示
      isGrayselectedOne: true,//以及科室提示
      sectionTwo: [{ value: "请先选择一级科室!", key: "QXZ" }], //二级科室
      isRedselectedTwo: false, //二级科室提示
      selectedOne: "QXZ", //一级科室Model
      selectedOneName: "", //一级科室名称
      selectedTwo: "QXZ", //二级科室Model
      selectedTwoName: "", //二级科室名称
      illtitle: "", //修改/确定标题
      operation: "", //确定修改/新增
      titlename: "劳动成果还未保存，是否退出？",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      intercept: false,
      editId: "", //症状id
      symptomId: "", //身体部位id
      symptom: "", //身体部位名称
      selectGender: "ALL",//选择性别
      gender:'ALL',
      genderList:[
        {
          key: 'ALL',
          value: "男士和女士"
        },
        {
          key: 'MAN',
          value: "男士"
        },
        {
          key: 'WOMAN',
          value: "女士"
        }
      ]
    };
  },
  // 过滤
  filters: {},

  // 模块新建时
  created: function() {
    var self = this;
    //权限管理
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
      if (arrs.indexOf("symptom") == -1) {
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
        if (sessionStorage.getItem("hospitalCurrentPage")) {
          self.currentPage = Number(
            sessionStorage.getItem("hospitalCurrentPage")
          );
        }
        if (sessionStorage.getItem("hospitalPageSizeNum")) {
          self.pageSizeNum = Number(
            sessionStorage.getItem("hospitalPageSizeNum")
          );
        }
        this.operation = this.$route.query.operation;
        this.editsymptomData = JSON.parse(sessionStorage.symptomData);
        this.symptomId = this.editsymptomData.key;
        this.symptom = this.editsymptomData.value;
        if (this.operation == 1) {
          this.illtitle = "修改症状";
          var self = this;
          self.eaddsymptom = JSON.parse(sessionStorage.addsymptomdata);
          //console.log("lala"+sessionStorage.addsymptomdata)
          self.editId = self.eaddsymptom.id;
          self.symptomName = self.eaddsymptom.name;
          self.selectedOneName = self.eaddsymptom.bigDepartmentName;
          self.selectedTwoName = self.eaddsymptom.smallDepartmentName;
          self.selectGender = self.eaddsymptom.gender
          self
            .gettrainedList({
              token: sessionStorage.getItem("token")
            })
            .then(data => {
              //console.log("一级科室", data);
              if (data.code == 200) {
                if (data.data) {
                  if (data.data.length > 0) {
                    var arry = [{ value: "请选择一级科室", key: "QXZ" }];
                    var arr = data.data;
                    arr.forEach(function(ele, ind) {
                      arry.push({ value: ele.value, key: ele.id });
                    });
                    self.sectionOne = arry;
                    self.selectedOne = self.eaddsymptom.bigDepartmentId;
                    self
                      .getLitTrainedList({
                        key: self.selectedOne
                      })
                      .then(data => {
                        if (data.code == 200) {
                          if (data.data) {
                            if (data.data.length > 0) {
                              var arry = [{ value: "请选择二级科室", key: "QXZ" }];
                              var arr = data.data;
                              arr.forEach(function(ele, ind) {
                                arry.push({ value: ele.value, key: ele.id });
                              });
                              self.sectionTwo = arry;
                              self.selectedTwo =
                                self.eaddsymptom.smallDepartmentId;
                            } else {
                              self.sectionTwo = [];
                            }
                          } else {
                            self.sectionTwo = [];
                          }
                        } else {
                          self.$message({
                            type: "info",
                            message: data.message
                          });
                        }
                      })
                      .catch(msg => {
                        //console.log(msg);
                        self.$message({
                          type: "info",
                          message: "服务器异常"
                        });
                      });
                  } else {
                    self.sectionOne = [];
                  }
                } else {
                  self.sectionOne = [];
                }
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          this.ksList();
          this.illtitle = "新增症状";
        }
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
    //返回按钮
    returnClick() {
      this.$router.push({
        path: "/medical/symptomlist"
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
    //获取一级科室列表
    ksList() {
      var self = this;
      self
        .gettrainedList({
          token: sessionStorage.getItem("token")
        })
        .then(data => {
          //console.log("一级科室", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                var arry = [{ value: "请选择一级科室", key: "QXZ" }];
                var arr = data.data;
                arr.forEach(function(ele, ind) {
                  arry.push({ value: ele.value, key: ele.id });
                });
                self.sectionOne = arry;
              } else {
                self.sectionOne = [];
              }
            } else {
              self.sectionOne = [];
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //性别变化
    selectGenderaChange() {
      var self = this;
      if (self.selectGender == "ALL") {
        self.gender = "ALL"
      }
      if (self.selectGender == "MAN") {
        self.gender = "MAN"
      }
      if (self.selectGender == "WOMAN") {
        self.gender = "WOMAN"
      }
      //console.log(self.selectGender)
    },
    //选择一级科室,获取二级科室列表
    selectOneClick() {
      this.isRedselectedOne = false;
      if (this.selectedOne == "QXZ") {
        this.sectionTwo = [{ value: "请先选择一级科室!", key: "QXZ" }];
        this.selectedTwo = "QXZ";
      } else {
        var self = this;
        for (var i = 0; i < self.sectionOne.length; i++) {
          if (self.sectionOne[i].key == self.selectedOne) {
            self.selectedOneName = self.sectionOne[i].value;
          }
        }
        if (self.selectOneClickTrueOrFalse == true) {
            self.selectOneClickTrueOrFalse = false
            self
          .getLitTrainedList({
            key: self.selectedOne
          })
          .then(data => {
            self.selectOneClickTrueOrFalse = true
            if (data.code == 200) {
              if (data.data) {
                if (data.data.length > 0) {
                  var arry = [{ value: "请选择二级科室", key: "QXZ" }];
                  this.selectedTwo = "QXZ";
                  self.sectionTwo = [];
                  var arr = data.data;
                  arr.forEach(function(ele, ind) {
                    arry.push({ value: ele.value, key: ele.id });
                  });
                  self.sectionTwo = arry;
                } else {
                  self.sectionTwo = [];
                }
              } else {
                self.sectionTwo = [];
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.selectOneClickTrueOrFalse = true
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
        }
        
      }
    },
    // 选择二级科室
    selectTwoClick(index) {
      var self = this;
      for (var i = 0; i < self.sectionTwo.length; i++) {
        if (self.sectionTwo[i].key == self.selectedTwo) {
          self.selectedTwoName = self.sectionTwo[i].value;
        }
      }
      this.isRedselectedTwo = false;
    },
    //正则验证
    panduan() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
      if (reg_1.test(this.symptomName) || reg_2.test(this.symptomName)) {
        this.redsymptomName = true;
        this.graysymptomName = false;
        //console.log(this.redsymptomName)
        //console.log(this.graysymptomName)
      } 
      if (this.selectedOne == "QXZ") {
        this.isRedselectedOne = true;
        this.isGrayselectedOne = false;
      }
      if (this.selectedTwo == "QXZ") {
        this.isRedselectedTwo = true;
      }
      if (this.symptomName.indexOf("；") != -1) {
        var arr = this.symptomName.split("；");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].length > 10) {
            this.redsymptomName = true;
            this.graysymptomName = false;
            return false;
          } else if (arr.length > 20) {
            this.redsymptomName = true;
            this.graysymptomName = false;
            this.$message("最多只能输入20个症状");
            return false;
          } else {
            this.redsymptomName = true;
            this.graysymptomName = false;
          }
        }
      } else if (this.symptomName.indexOf("；") == -1) {
        if (this.symptomName.length > 10) {
          this.redsymptomName = true;
          this.graysymptomName = false;
          return false;
        } else if (
          this.symptomName.length > 0 &&
          this.symptomName.length < 10
        ) {
          this.redsymptomName = true;
          this.graysymptomName = false;
        }
      }
      if (
        this.redsymptomName == true ||
        this.isRedselectedOne == true ||
        this.isRedselectedTwo == true
      ) {
        return false;
      }
    },
    //确定按钮
    okSymptoomClick() {   
      if (this.panduan() == false) {
        return false;
      } else {
        var self = this;
        //*********症状新增**************
        if (this.operation != 1) {
          var string = {
            position_id: self.symptomId, //身体部位id
            position_name: self.symptom, //身体部位名称
            name: self.symptomName, //新增症状名称
            big_department_name: self.selectedOneName, //一级科室名称
            big_department_id: self.selectedOne, //一级科室id
            small_department_name: self.selectedTwoName, //二级科室名称
            small_department_id: self.selectedTwo, //二级科室id
            gender: self.gender,
            type: "SEE_DOCTOR" // 症状管理类型
          };
          var addString = JSON.stringify(string);
          if (self.okSymptoomClickTrueOrFalse == true) {
              self.okSymptoomClickTrueOrFalse = false
              self.getMedicalsymptomPositionadd({
                symptomPositionJson: addString,
              })
              .then(data => {
                self.okSymptoomClickTrueOrFalse = true
                //console.log("新增症状", data);
                if (data.code == 200) {
                  this.intercept = true;
                  this.$router.push({
                    path: "/medical/symptomlist"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.okSymptoomClickTrueOrFalse = true
                //console.log(msg);
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
          
          //*********编辑症状**************
        } else if (this.operation == 1) {
          var string = {
            id: self.editId,
            position_id: self.symptomId, //身体部位id
            position_name: self.symptom, //身体部位名称
            name: self.symptomName, //新增症状名称
            big_department_name: self.selectedOneName, //一级科室名称
            big_department_id: self.selectedOne, //一级科室id
            small_department_name: self.selectedTwoName, //二级科室名称
            small_department_id: self.selectedTwo, //二级科室id
            gender: self.gender,
            type: "SEE_DOCTOR" // 症状管理类型
          };
          var editString = JSON.stringify(string);
          if (self.okSymptoomClickTrueOrFalse == true) {
              self.okSymptoomClickTrueOrFalse = false
              self.getMedicalsymptomPositionadd({
                symptomPositionJson: editString
              })
              .then(data => {
                self.okSymptoomClickTrueOrFalse = true
                //console.log("新增症状", data);
                if (data.code == 200) {
                  this.intercept = true;
                  this.$router.push({
                    path: "/medical/symptomlist"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.okSymptoomClickTrueOrFalse = true
                //console.log(msg);
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
          
        }
      }
    },
    ...mapActions([
      "gettrainedList",
      "getLitTrainedList",
      "getMedicalsymptomPositionadd"
    ])
  },
  watch: {
    symptomName: function(val) {
      var aaa = this.symptomName;
      this.symptomName = aaa.replace(/[;]/g, "；");
      if (this.symptomName.indexOf("；") != -1) {
        var arr = this.symptomName.split("；");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].length > 10) {
            this.redsymptomName = true;
            this.graysymptomName = false;
            this.$message("最多只能输入10个字符");
          } else if (arr.length > 20) {
            this.redsymptomName = true;
            this.graysymptomName = false;
            this.$message("最多只能输入20个症状");
          } else {
            this.redsymptomName = true;
            this.graysymptomName = false;
          }
        }
      } else if (this.symptomName.indexOf("；") == -1) {
        if (this.symptomName.length > 10) {
          this.redsymptomName = true;
          tthis.graysymptomName = false;
          this.$message("最多只能输入10个字符");
          //console.log("你是猪人")
        } else {
          this.redsymptomName = false;
          this.graysymptomName = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.grayfont {
  color: #908f95 !important;
}

.redbor {
  border: 1px solid #fe5371 !important;
}

.graybor {
  border: 1px solid #d1d1d1;
}

.redfont {
  color: #fe5371 !important;
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
  color: #303030;
  font-size: 16px;
}

.listTitle img {
  margin-right: 5px;
}

.list {
  min-height: 540px;
  margin-left: 30px;
  margin-top: 30px;
}

.listLi {
  margin: 24px 0;
  display: flex;
}

.listLi > div:nth-child(1) {
  width: 120px;
  text-align: right;
}

.listLi > div:nth-child(2) {
  margin-left: 16px;
}



textarea {
  width: 578px;
  height: 60px;
  line-height: 22px;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  resize: none;
}

select {
  width: 150px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 95% 12px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #d1d1d1;
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

.but {
  width: 340px;
  display: flex;
  justify-content: center;
}

.but div {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
}

.but > div:nth-child(1) {
  background-color: #5acdfa;
  margin-right: 25px;
}

.but > div:nth-child(2) {
  background-color: #aeaeae;
}
</style>