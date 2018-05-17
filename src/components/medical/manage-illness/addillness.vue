<!--疾病管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitles">
                <img src="/static/img/返回蓝.jpg" @click="gobackClick" style="cursor: pointer;">
                <span>{{illtitle}}</span>
            </div>
            <!--列表-->
            <div class="lists">
                <div class="listOne">
                    <div>选择科室：</div>
                    <div>
                        <select :class="{redbor:isRedselectedOne}" @change="selectOneClick" v-model="selectedOne">
                            <option v-for="(type,index) in sectionOne" :value="type.id">{{type.value}}</option>
                        </select>
                        <select :class="{redbor:isRedselectedTwo}" @change="selectTwoClick" style="margin-left: 30px;" v-model="selectedTwo">
                            <option v-for="(type,index) in sectionTwo" :value="type.id">{{type.value}}</option>
                        </select>
                    </div>
                </div>
                <div class="listOne">
                    <div>疾病名称：</div>
                    <div class="cssFlex">
                        <input :class="{redbor:isRedillnessName}" type="text" v-model="illnessName" maxlength="15">
                        <span class="grayfont" :class="{redFont:isRedillnessName}">汉字、字母、数字，最多输入15个汉字（不支持非法字符）</span>
                    </div>
                </div>
                <div>
                    <div>疾病介绍：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedillIntroduce}" v-model="illIntroduce"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedillIntroduce}">最多可输入500个字符</div>
                    </div>
                </div>

                <div>
                    <div>高发群体：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedhighGroup}" v-model="highGroup"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedhighGroup}">
                            最多可输入500个字符
                        </div>
                    </div>
                </div>
                <div>
                    <div>传染：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedcommunicate}" v-model="communicate"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedcommunicate}">最多可输入500个字符</div>
                    </div>
                </div>
                <div>
                    <div>症状：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedsymptom}" v-model="symptom"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedsymptom}">最多可输入500个字符</div>
                    </div>
                </div>
                <div>
                    <div>检查：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedinspect}" v-model="inspect"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedinspect}">最多可输入500个字符</div>
                    </div>
                </div>
                <div>
                    <div>诊断和鉴别：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedilldiagnose}" v-model="illdiagnose"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedilldiagnose}">最多可输入500个字符</div>
                    </div>
                </div>
                <div class="list-label">
                    <div>
                        伴随症状：
                    </div>
                    <div class="cssFlex">
                        <input :class="{redbor:isborlabel}" class="listLabelInp" type="text" maxlength="5" v-model="subSymptom" @keyup.13="typeKeyClick()"
                            placeholder="请输入伴随症状">
                        <span :class="{redfont:isfontlabel}" class="isAstrict">可输入5个字符，完成请按回车确认（最多30个症状，不支持非法字符）</span>
                    </div>
                </div>
                <div class="list-label-spa">
                    <span v-for="(item,index) in subSymptomArr" :key="index">
                        {{item}}
                        <img src="/static/img/shan.jpg" @click="typeKeydeleteClick(index)" alt="">
                    </span>
                </div>
                <div>
                    <div>建议措施：</div>
                    <div class="cssFlex">
                        <div>
                            <textarea maxlength="500" :class="{redbor:isRedrecommendedMeasure}" v-model="recommendedMeasure"></textarea>
                        </div>
                        <div class="grayfont" :class="{redFont:isRedrecommendedMeasure}">最多可输入300个字符</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="but">
            <div @click="addensureClick" v-show="operation != 1">确定</div>
            <div @click="editensureClick" v-show="operation == 1">确定</div>
            <div @click="gobackClick">取消</div>
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
      editensureClickTrueOrFalse: true,
      addensureClickTrueOrFalse: true,
      isRedillnessName: false, //疾病名称提示
      isRedselectedOne: false, //一级科室提示
      isRedselectedTwo: false, //二级科室提示
      isRedillIntroduce: false, //疾病介绍提示
      isRedhighGroup: false, //高法群体提示
      isRedcommunicate: false, //传染提示
      isRedsymptom: false, //症状提示
      isRedinspect: false, //检查提示
      isRedilldiagnose: false, //诊断和鉴别提示
      isRedrecommendedMeasure: false, // 建议措施提示
      selectedOne: "QXZ", //一级科室Model
      selectedTwo: "QXZ", //二级科室Model
      sectionOne: [], //一级科室
      sectionTwo: [{ value: "请先选择一级科室!", id: "QXZ" }], //二级科室
      illnessName: "", //疾病名称
      operation: "", //确定修改/新增
      illIntroduce: "", //疾病介绍
      highGroup: "", //高法群体
      communicate: "", //传染
      symptom: "", //症状
      inspect: "", //检查
      illdiagnose: "", //诊断和鉴别
      subSymptom: "", // 伴随症状标签
      subSymptomArr: [], // 伴随症状数组
      illtitle: "", //新增/编辑疾病
      recommendedMeasure: "", // 建议措施
      titlename: "劳动成果还未保存，是否退出？",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      intercept: false,
      isborlabel: false,
      isfontlabel: false,
      illnessdataId: "", //疾病id
      commonState: "0" //是否设为常见疾病,0-不是,1-是
    };
  },
  // 过滤
  filters: {},
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
      if (arrs.indexOf("illness") == -1) {
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
        self.listFun();
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
  // 事件处理
  methods: {
    listFun() {
      this.operation = this.$route.query.operation;
      if (this.operation == 1) {
        this.illtitle = "修改疾病";
        var self = this;
        self.eillnessdata = JSON.parse(sessionStorage.illnessdata);
        self.illnessdataId = self.eillnessdata.id;
        //***********获取疾病详情***************************/
        self
          .getMedicaldiseaseselectDiseaseById({
            diseaseId: self.illnessdataId
          })
          .then(data => {
            //console.log("疾病详情", data);
            if (data.code == 200) {
              //********获取到详情后开始赋值********************************************/
              var details = data.data;
              //****一级科室******************************** */
              self
                .getselectBigDepartment({
                  pageNo: 1,
                  pageSize: 100000
                })
                .then(data => {
                  //console.log("一级科室::", data);
                  if (data.data) {
                    if (data.code == 200) {
                      if (data.data.records) {
                        if (data.data.records.length > 0) {
                          self.selectedOne = details.firstDepartment; //诊断和鉴别
                          var arry = [{ value: "请选择一级科室", id: "QXZ" }];
                          var arr = data.data.records;
                          arr.forEach(function(ele, ind) {
                            arry.push({ value: ele.value, id: ele.id });
                          });
                          self.sectionOne = arry;
                          //******二级科室*****************************************/
                          self
                            .getselectSmallDepartment({
                              pageNo: 1,
                              pageSize: 100000,
                              parentId: self.selectedOne
                            })
                            .then(data => {
                              if (data.code == 200) {
                                if (data.data) {
                                  if (data.data.records) {
                                    if (data.data.records.length > 0) {
                                      self.selectedTwo =
                                        details.secondDepartment;
                                      var arry = [
                                        { value: "请选择二级科室", id: "QXZ" }
                                      ];
                                      var arr = data.data.records;
                                      arr.forEach(function(ele, ind) {
                                        arry.push({
                                          value: ele.value,
                                          id: ele.id
                                        });
                                      });
                                      self.sectionTwo = arry;
                                    } else {
                                      self.sectionTwo = [];
                                    }
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
                          //***********************************************/
                        } else {
                          self.sectionOne = [];
                          self.sectionTwo = [];
                        }
                      } else {
                        self.sectionOne = [];
                        self.sectionTwo = [];
                      }
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
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
              //************************************************* */
              self.illnessName = details.diseaseName; //疾病名称
              self.illIntroduce = details.diseaseIntroduce; //疾病介绍
              self.highGroup = details.highRiskGroups; //高法群体
              self.communicate = details.contagion; //传染
              self.symptom = details.symptom; //症状
              self.inspect = details.checkUp; //检查
              self.illdiagnose = details.diagnosisAndDifferential; //诊断和鉴别
              self.commonState = details.commonState; //是否设为常见疾病
              self.recommendedMeasure = details.recommendedMeasure; //建议措施
              self.subSymptomArr = JSON.parse(details.subSymptomJson); //伴随症状
              //**********************************************************/
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
        this.illtitle = "新增疾病";
        this.ksList();
      }
    },
    //回车确定添加标签
    typeKeyClick: function() {
      if (this.subSymptomArr.length >= 30) {
        this.isborlabel = this.isfontlabel = true;
        this.subSymptom = "";
        return;
      } else {
        var JudgeOne = /^[\s]*$/; //输入不能为空
        var JudgeTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
        if (JudgeOne.test(this.subSymptom) || JudgeTwo.test(this.subSymptom)) {
          this.isborlabel = this.isfontlabel = true;
        } else {
          this.isborlabel = this.isfontlabel = false;
          this.subSymptomArr.push(this.subSymptom);
          this.subSymptom = "";
        }
      }
    },
    //删除已添加标签
    typeKeydeleteClick(index) {
      var self = this;
      for (var i = 0; i < self.subSymptomArr.length; i++) {
        if (self.subSymptomArr[i] == self.subSymptomArr[index]) {
          self.subSymptomArr.splice(i, 1);
          break;
        }
      }
    },
    gobackClick() {
      this.$router.push({
        path: "/medical/illness"
      });
    },
    //获取一级科室列表
    ksList() {
      var self = this;
      self
        .getselectBigDepartment({
          pageNo: 1,
          pageSize: 100000
        })
        .then(data => {
          //console.log("一级科室", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var arry = [{ value: "请选择一级科室", id: "QXZ" }];
                  var arr = data.data.records;
                  arr.forEach(function(ele, ind) {
                    arry.push({ value: ele.value, id: ele.id });
                  });
                  self.sectionOne = arry;
                } else {
                  self.sectionOne = [{ value: "暂无一级科室", id: "QXZ" }];
                }
              } else {
                self.sectionOne = [{ value: "暂无一级科室", id: "QXZ" }];
              }
            } else {
              self.sectionOne = [{ value: "暂无一级科室", id: "QXZ" }];
            }
          } else {
            self.sectionOne = [{ value: "暂无一级科室", id: "QXZ" }];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.sectionOne = [{ value: "暂无一级科室", id: "QXZ" }];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //选择一级科室,获取二级科室列表
    selectOneClick() {
      this.isRedselectedOne = false;
      if (this.selectedOne == "QXZ") {
        this.sectionTwo = [{ value: "请先选择一级科室!", id: "QXZ" }];
        this.selectedTwo = "QXZ";
      } else {
        var self = this;
        self
          .getselectSmallDepartment({
            pageNo: 1,
            pageSize: 100000,
            parentId: self.selectedOne
          })
          .then(data => {
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records) {
                    self.selectedTwo = "QXZ";
                    var arry = [{ value: "请选择二级科室", id: "QXZ" }];
                    var arr = data.data.records;
                    arr.forEach(function(ele, ind) {
                      arry.push({ value: ele.value, id: ele.id });
                    });
                    self.sectionTwo = arry;
                  } else {
                    self.sectionTwo = [];
                  }
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
      }
    },
    // 选择二级科室
    selectTwoClick() {
      this.isRedselectedTwo = false;
    },
    //正则验证
    verificationFun() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
      if (this.selectedOne == "QXZ") {
        this.isRedselectedOne = true;
      }
      if (this.selectedTwo == "QXZ") {
        this.isRedselectedTwo = true;
      }
      if (reg_1.test(this.illnessName) || reg_2.test(this.illnessName)) {
        this.isRedillnessName = true;
      }
      if (reg_1.test(this.illIntroduce)) {
        this.isRedillIntroduce = true;
      }
      if (reg_1.test(this.highGroup)) {
        this.isRedhighGroup = true;
      }
      if (reg_1.test(this.communicate)) {
        this.isRedcommunicate = true;
      }
      if (reg_1.test(this.symptom)) {
        this.isRedsymptom = true;
      }
      if (reg_1.test(this.inspect)) {
        this.isRedinspect = true;
      }
      if (reg_1.test(this.recommendedMeasure)) {
        this.isRedrecommendedMeasure = true;
      }
      if (reg_1.test(this.illdiagnose)) {
        this.isRedilldiagnose = true;
      }
      if (this.subSymptomArr.length <= 0) {
        this.isborlabel = this.isfontlabel = true;
      }
      if (
        this.isRedselectedOne == true ||
        this.isRedselectedTwo == true ||
        this.isRedillnessName == true ||
        this.isRedillIntroduce == true ||
        this.isRedhighGroup == true ||
        this.isRedcommunicate == true ||
        this.isRedsymptom == true ||
        this.isRedinspect == true ||
        this.isRedrecommendedMeasure == true ||
        this.isborlabel == true ||
        this.isRedilldiagnose == true
      ) {
        return false;
      }
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
    // 点击添加
    addensureClick() {
      var self = this;
      if (this.verificationFun() == false) {
        return;
      } else {
        var addStringObj = {
          diseaseName: self.illnessName, //疾病名称
          firstDepartment: self.selectedOne, //一级科室id
          secondDepartment: self.selectedTwo, //二级科室id
          diseaseIntroduce: self.illIntroduce, //疾病介绍
          highRiskGroups: self.highGroup, //高法群体
          contagion: self.communicate, //传染
          symptom: self.symptom, //症状
          checkUp: self.inspect, //检查
          diagnosisAndDifferential: self.illdiagnose, //诊断和鉴别
          commonState: "0", //是否设为常见疾病,0-不是,1-是
          recommendedMeasure: self.recommendedMeasure, //建议措施
          subSymptomJson: JSON.stringify(self.subSymptomArr) //伴随症状
        };
        var addString = JSON.stringify(addStringObj);
        if (self.addensureClickTrueOrFalse == true) {
            self.addensureClickTrueOrFalse = false
            self.getMedicaldiseaseaddOrUpdate({
              diseaseJson: addString
            })
            .then(data => {
              self.addensureClickTrueOrFalse = true
              if (data.code == 200) {
                self.intercept = true;
                self.$router.push({
                  path: "/medical/illness"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.addensureClickTrueOrFalse = true
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
        
      }
    },
    // 点击编辑
    editensureClick() {
      if (this.verificationFun() == false) {
        return;
      } else {
        var self = this;
        var arr = {
          id: self.illnessdataId, //疾病id
          diseaseName: self.illnessName, //疾病名称
          firstDepartment: self.selectedOne, //一级科室id
          secondDepartment: self.selectedTwo, //二级科室id
          diseaseIntroduce: self.illIntroduce, //疾病介绍
          highRiskGroups: self.highGroup, //高法群体
          contagion: self.communicate, //传染
          symptom: self.symptom, //症状
          checkUp: self.inspect, //检查
          diagnosisAndDifferential: self.illdiagnose, //诊断和鉴别
          commonState: self.commonState, //是否设为常见疾病,0-不是,1-是
          recommendedMeasure: self.recommendedMeasure, //建议措施
          subSymptomJson: JSON.stringify(self.subSymptomArr) //伴随症状
        };
        var addString = JSON.stringify(arr);
        if (self.editensureClickTrueOrFalse == true) {
            self.editensureClickTrueOrFalse = false
            self.getMedicaldiseaseaddOrUpdate({
              diseaseJson: addString
            })
            .then(data => {
              self.editensureClickTrueOrFalse = true
              //console.log("一级科室", data);
              if (data.code == 200) {
                self.intercept = true;
                self.$router.push({
                  path: "/medical/illness"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.editensureClickTrueOrFalse = true
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
        
      }
    },
    ...mapActions([
      "getselectBigDepartment",
      "getselectSmallDepartment",
      "getMedicaldiseaseaddOrUpdate",
      "getMedicaldiseaseselectDiseaseById"
    ])
  },
  watch: {
    illnessName: function(val) {
      this.isRedillnessName = false;
    },
    illIntroduce: function(val) {
      this.isRedillIntroduce = false;
    },
    highGroup: function(val) {
      this.isRedhighGroup = false;
    },
    communicate: function(val) {
      this.isRedcommunicate = false;
    },
    symptom: function(val) {
      this.isRedsymptom = false;
    },
    inspect: function(val) {
      this.isRedinspect = false;
    },
    illdiagnose: function(val) {
      this.isRedilldiagnose = false;
    },
    recommendedMeasure: function(val) {
      this.isRedrecommendedMeasure = false;
    },
    subSymptom: function(val) {
      this.isborlabel = this.isfontlabel = false;
    }
  }
};
</script>
<style scoped>
.grayfont {
  color: #908f95;
  margin-left: 16px;
}

.redbor {
  border: 1px solid #fe5371 !important;
}

.redFont {
  color: #fe5371 !important;
}

textarea {
  width: 500px;
  height: 100px;
  padding-left: 5px;
  resize: none;
  border: 1px solid #d1d1d1;
}

.lists input {
  width: 220px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 4px;
}

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

.lists {
  min-height: 540px;
  margin-left: 30px;
  margin-top: 30px;
}

.listTitles {
  height: 58px;
  line-height: 58px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  color: #303030;
  font-size: 16px;
}

.listTitles img {
  margin-right: 5px;
}

.lists > div {
  display: flex;
  margin-top: 20px;
}

.lists > div > div:nth-child(1) {
  min-width: 85px;
  text-align: right;
}

.lists > div > div:nth-child(2) {
  margin-left: 20px;
}

/* .listOne {
        line-height: 32px;
    } */

.but {
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: 335px;
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

.but > div:nth-child(3) {
  margin-left: 25px;
  width: 68px;
  cursor: pointer;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #aeaeae;
  color: #fff;
  border-radius: 3px;
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

.cssFlex {
  display: flex;
  flex-wrap: wrap;
}

.list-label div:nth-child(1) {
  width: 75px;
  height: 34px;
  line-height: 34px;
  text-align: right;
}

.list-label div:nth-child(2) {
  margin-left: 24px;
}

.listLabelInp {
  width: 150px !important;
  height: 32px;
  font-size: 14px;
  border-radius: 3px;
  padding-left: 5px;
}

.list-label,
.list-label-spa {
  margin-bottom: 10px !important;
}

.isAstrict {
  color: #8f8e94;
  margin-left: 12px;
  margin-top: 5px;
}

.list-label-spa {
  min-height: 35px;
  margin-left: 105px;
  width: 550px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
}

.list-label-spa span {
  height: 24px;
  color: #5acdfa;
  margin-right: 12px;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 12px;
  border-radius: 3px;
  border: 1px solid #5acdfa;
  display: inline-block;
  position: relative;
  padding: 0 5px;
}

.list-label-spa span img {
  border-radius: 14px;
  width: 14px;
  height: 14px;
  position: absolute;
  right: -7px;
  top: -7px;
}

.redfont {
  color: #fe5371 !important;
}

.redbor {
  border: 1px solid #fe5371 !important;
}
</style>