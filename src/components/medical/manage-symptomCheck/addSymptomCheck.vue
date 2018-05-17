<!--医疗管理-新增症状-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="symptomCheckAdd">
    <div>
      <!-- 新增症状头部 -->
      <div class="addTitle">
        <div>
          <div @click="backClick">
            <img src="/static/img/返回蓝.png" alt="">
          </div>
          <div>
            {{title}}
          </div>
        </div>
      </div>
      <!-- 新增症状主题 -->
      <div class="addList">
        <ul>
          <li class="addLi">
            <div>
              主症状名称：
            </div>
            <div class="addDataLi">
              <input v-model="mainsymptom" :class="{redBorder:isRedmainsymptom,grayBorder:isGraymainsymptom}"  placeholder="请输入主症状名称">
              <span :class="{redTest:isRedsymptomName,grayTest:isGraysymptomName}">最多十个字符,不支持非法字符</span>
            </div>
          </li>
          <li class="addLi">
            <div>
              性别：
            </div>
            <div class="addDataLi">
              <select :class="{redBorder:isRedGender,grayBorder:isGrayGender}"  @change="selectGenderaChange" v-model="selectGender">
                  <option v-for="gender in genderList" :key="gender.value" :value="gender.key">{{gender.value}}</option>
              </select>
            </div>
          </li>
          <li class="addLi">
            <div>
              对应疾病：
            </div>
            <div>
              <div class="search">
                <div class="searchBox">
                  <img src="/static/img/search_1.png" alt="">
                  <input type="text" placeholder="输入后开始搜索" v-model="searchKeyword" :class="{redBorder:isRedSearchKeyword,grayBorder:isGraySearchKeyword}">
                </div>
                <div class="searchButton" @click="searchClick">
                  确定
                </div>
              </div>
              <div class="searchList">
                <div class="searchLeftList">
                  <div>可选疾病</div>
                  <ul>
                    <li class="ifSearchLi" v-for="(item,index) in selectLeftLists" :key="index" @click="selectLeftClick(index)">
                      {{item.diseaseName}}{{item.checked}}
                    </li>
                  </ul>
                </div>
                <div class="searchRightList">
                  <div>已选疾病</div>
                  <ul>
                    <li class="okSearchLi" v-for="(item,index) in selectRightLists" :key="index" >
                      <div>
                        {{item.diseaseName}}
                      </div>
                      <div @click="deleteRightClick(index)">
                        <img src="/static/img/删除灰.jpg" alt="">
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div :class="{redTest:isRedDisease,grayTest:isGrayDisease}">请至少添加一种对应疾病</div>
            </div>
          </li>
          <li class="addLi">
            <div>
              伴随症状：
            </div>
            <div class="addDataLi">
              <input v-model="hasSymptom" :class="{redBorder:isRedHasSymptom,grayBorder:isGrayHasSymptom}"  @keypress="addsymptom" placeholder="请输入伴随症状">
            </div> 
          </li>
          <li class="addLi">
            <div></div>
            <div class="addDataLi addLastDataLi">
              <span v-for="(symptom,ind) in hasSymptomList" :key="ind">
                {{symptom}}
                <sup @click="delKeyClick(ind)"><img src="/static/img/shan.jpg" alt=""></sup>
              </span>
            </div>
          </li>
          <li class="addLi">
            <div></div>
            <div class="addButton">
              <div @click="addClick">
                确定
              </div>
              <div @click="backClick">
                取消
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--拦截弹出框-->
    <div :class="{interceptPopup:isInterceptPopup,showdel:isShowIntercept}">
      <transition name="slide-fade">
        <div class="interceptContent" v-show="interceptShow">
          <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import hosdel from "../../cModule/cancelBox"; //引入组件
export default {
  components: {
    "v-hosdel": hosdel //注册组件
  },
  data() {
    return {
      addClickTrueOrFalse: true,
      title: "新增疾病", //标题
      loading: false, //页面加载控制
      isRedDisease: false, //无对应疾病添加提示
      isGrayDisease: true, //对应疾病添加提示
      isRedSubSymptom: false, //伴随症状不合规提示
      isGraySubSymptom: true, //伴随症状合规提示
      isbgColor: '',
      hasSymptom: "", //伴随症状Model
      hasSymptomList: [], //伴随症状列表
      mainsymptom: "", //主症状
      isRedmainsymptom: false, //控制主症状输入框样式(red)
      isGraymainsymptom: true, //控制主症状输入框样式(gray)
      isRedsymptomName: false, //控制主症状提示样式(red)
      isGraysymptomName: true, //控制主症状提示样式(gray)
      isRedSearchKeyword: false, //控制对应疾病搜索输入框样式(red)
      isGraySearchKeyword: true, //控制对应疾病搜索输入框样式(gray)
      isRedHasSymptom: false, //伴随症状输入框样式控制(red)
      isGrayHasSymptom: true, //伴随症状输入框样式控制(gray)

      editId: "", //症状ID
      selectLeftLists: [], //可选对应疾病列表
      selectRightLists: [], //已选对应疾病列表
      diseaseIdList: [], //对应疾病id列表
      pushSelectRightListsOk: false,

      searchKeyword: "", //对应疾病搜索关键字

      intercept: false, //控制拦截框显示/隐藏
      isInterceptPopup: true, //控制拦截框弹出时的样式
      isShowIntercept: true, //控制拦截框的显示隐藏
      interceptShow: false, //控制拦截框的显示隐藏
      titlename: "您确定要执行该操作吗？", //拦截框弹出时的提示语
      genderList: [
        {
          key: "ALL",
          value: "全部"
        },
        {
          key: "MAN",
          value: "男士"
        },
        {
          key: "WOMAN",
          value: "女士"
        }
      ], //性别列表
      gender: "ALL",
      selectGender: "ALL", //选择性别
      isGrayGender: true, //控制性别选择框样式
      isRedGender: false //控制性别选择框样式
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
      if (arrs.indexOf("symptomCheck") == -1) {
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
        let operation = "";
        operation = self.$route.query.operation;
        if (operation == 1) {
          self.title = "修改症状";
          self.editsymptomData = JSON.parse(sessionStorage.symptomData);
          self.symptomId = self.editsymptomData.key;
          self.symptomCheck = self.editsymptomData.value;
          self.eaddsymptom = JSON.parse(sessionStorage.addsymptomcheckdata);
          self.editId = self.eaddsymptom.symptomId;
          self.mainsymptom = self.eaddsymptom.symptomName;
          self.searchKeyword = "";
          self.selectLeftLists = self.eaddsymptom.diseaseRelationList;
          self.selectRightLists = self.eaddsymptom.diseaseRelationList;
          self.eaddsymptom.subSymptomRelationList.forEach(function(ele) {
            self.hasSymptomList.unshift(ele.value);
          });
          self.selectGender = self.eaddsymptom.gender;
        } else if (operation != 1) {
          self.title = "新增症状";
          self.editsymptomData = JSON.parse(sessionStorage.symptomData);
          self.symptomId = self.editsymptomData.key;
          self.symptomCheck = self.editsymptomData.value;
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
  // 跳转拦截
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowIntercept = false;
      this.interceptShow = true;
    } else if (this.intercept == true) {
      this.isShowIntercept = true;
      this.interceptShow = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //可选疾病列表
    getDiseaseListFun() {
      var self = this;
      self
        .getillnessList({
          pageNo: 1,
          pageSize: 1000,
          diseaseName: self.searchKeyword
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var dataArr = [];
                  dataArr = data.data.records;
                  dataArr.forEach(function(ele,ind) {
                    self.selectLeftLists.push({
                      diseaseName: ele.diseaseName,
                      id: ele.id,
                      bgcolor: false
                    });
                  });
                } else {
                  self.selectLeftLists = [];
                }
              } else {
                self.selectLeftLists = [];
              }
            } else {
              self.selectLeftLists = [];
            }
          } else {
            self.selectLeftLists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.selectLeftLists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //将输入的伴随症状放置输入框下面
    addsymptom(event) {
      var self = this;
      if (event.keyCode == 13) {
        self.hasSymptomList.unshift(self.hasSymptom);
        self.delImg = "/static/img/shan.jpg";
      }
      self.hasSymptom = "";
      if (self.hasSymptomList.length > 30) {
        self.$message({
          type: "info",
          message: "您最多只能添加30个伴随症状!"
        });
      }
    },
    //删除伴随症状关键字
    delKeyClick(ind) {
      var self = this;
      for (var i = 0; i < self.hasSymptomList.length; i++) {
        if (self.hasSymptomList[i] == self.hasSymptomList[ind]) {
          self.hasSymptomList.splice(i, 1);
          break;
        }
      }
    },
    //性别变化
    selectGenderaChange() {
      var self = this;
      if (self.selectGender == "ALL") {
        self.gender = "ALL";
      }
      if (self.selectGender == "MAN") {
        self.gender = "MAN";
      }
      if (self.selectGender == "WOMAN") {
        self.gender = "WOMAN";
      }
      // //console.log(self.selectGender);
    },
    //确定拦截弹出
    okClick() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    //取消拦截弹出
    canleClick() {
      this.isShowIntercept = true;
      this.interceptShow = false;
    },
    //根据疾病关键字搜索
    searchClick() {
      var self = this;
      self.getDiseaseListFun();
    },
    // 将右边列表选中的数据移除
    deleteRightClick(index) {
      var self = this;
      self.selectRightLists.splice(index, 1);
    },
    // 将左边列表中选中的数据移到右边
    selectLeftClick(index) {
      var self = this;
      if (self.selectRightLists.length == 0) {
        self.selectRightLists.push({
          diseaseName: self.selectLeftLists[index].diseaseName,
          id: self.selectLeftLists[index].id
        });
      } else if (self.selectRightLists.length > 0) {
        for (var i = 0; i < self.selectRightLists.length; i++) {
          if (self.selectLeftLists[index].id == self.selectRightLists[i].id) {
            self.$message({
              type: "info",
              message: "不可重复添加！"
            });
            self.pushSelectRightListsOk = false;
            break;
          } else {
            self.pushSelectRightListsOk = true;
          }
        }
        if (self.pushSelectRightListsOk == true) {
          self.selectRightLists.push({
            diseaseName: self.selectLeftLists[index].diseaseName,
            id: self.selectLeftLists[index].id
          });
        }
      }
      // //console.log(self.selectRightLists)
    },
    //正则验证
    validateFun() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"); //不支持非法字符
      if (reg_1.test(this.mainsymptom) || reg_2.test(this.mainsymptom)) {
        this.isRedsymptomName = true;
        this.isRedmainsymptom = true;
        this.isGraysymptomName = false;
        this.isGraymainsymptom = false;
      }
      if (reg_1.test(this.searchKeyword)) {
        this.isRedSearchKeyword = true;
        this.isGraySearchKeyword = false;
      }
      if (this.selectLeftLists.length == 0) {
        this.isRedDisease = true;
        this.isGrayDisease = false;
      }
      if (this.selectRightLists.length == 0) {
        this.isRedDisease = true;
        this.isGrayDisease = false;
      }
      if (this.hasSymptomList.length == 0) {
        this.isRedSubSymptom = true;
        this.isRedHasSymptom = true;
        this.isGraySubSymptom = false;
        this.isGrayHasSymptom = false;
      }
      if (
        this.isRedsymptomName == true ||
        this.isRedmainsymptom == true ||
        this.isRedDisease == true ||
        this.isRedSubSymptom == true ||
        this.isRedHasSymptom == true
      ) {
        return false;
      }
    },
    // 确定新增
    addClick() {
      var self = this;
      console.log(self.hasSymptomList)
      if (self.validateFun() == false) {
        return;
      } else {
        //--------------新增症状---------------------------
        let operation = "";
        operation = self.$route.query.operation;
        if (operation != 1) {
          // //console.log("!=1")
          self.selectRightLists.forEach(function(ele) {
            self.diseaseIdList.push(ele.id);
          });
          var symptomPositionList = {
            position_id: self.symptomId,
            position_name: self.symptomCheck,
            name: self.mainsymptom,
            type: "SEE_SYMPTOM",
            diseaseIdJson: JSON.stringify(self.diseaseIdList),
            subSymptomJson: JSON.stringify(self.hasSymptomList),
            gender: self.gender
          };
          var symptomPosition = JSON.stringify(symptomPositionList);
          if (self.addClickTrueOrFalse == true) {
              self.addClickTrueOrFalse = false
              self.getMedicalsymptomPositionadd({
                  symptomPositionJson: symptomPosition
              }).then(data => {
                  self.addClickTrueOrFalse = true
                  if (data.code == 200) {
                    this.intercept = true;
                    self.$message({
                      type: "success",
                      message: "新增成功!"
                    });
                    this.$router.push({
                      path: "/medical/symptomCheckList"
                    });
                    sessionStorage.setItem("keyWord", self.searchKeyword);
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addClickTrueOrFalse = true
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
          }
          
          //-----------------编辑症状---------------------
        } else if (operation == 1) {
          // //console.log("1")
          self.selectRightLists.forEach(function(ele) {
            // self.diseaseIdList = [];
            self.diseaseIdList.push(ele.id);
          });
          var symptomPositionList = {
            id: self.editId,
            position_id: self.symptomId,
            position_name: self.symptomCheck,
            name: self.mainsymptom,
            type: "SEE_SYMPTOM",
            diseaseIdJson: JSON.stringify(self.diseaseIdList),
            subSymptomJson: JSON.stringify(self.hasSymptomList),
            gender: self.gender
          };
          var symptomPosition = JSON.stringify(symptomPositionList);
          if (self.addClickTrueOrFalse == true) {
              self.addClickTrueOrFalse = false
              self.getMedicalsymptomPositionadd({
                symptomPositionJson: symptomPosition
              })
              .then(data => {
                self.addClickTrueOrFalse = true
                if (data.code == 200) {
                  this.intercept = true;
                  self.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.$router.push({
                    path: "/medical/symptomCheckList"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addClickTrueOrFalse = true
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
          
        }
      }
    },
    // 返回
    backClick() {
      this.$router.push({
        path: "/medical/symptomCheckList"
      });
    },
    ...mapActions(["getillnessList", "getMedicalsymptomPositionadd"])
  },
  // 监视
  watch: {
    //监视主症状名称
    mainsymptom: function(val) {
      var self = this;
      var trimstr = val;
      if (trimstr.length > 10) {
        self.isRedmainsymptom = true;
        self.isGraymainsymptom = false;
        self.isRedsymptomName = true;
        self.isGraysymptomName = false;
      } else {
        self.isRedmainsymptom = false;
        self.isGraymainsymptom = true;
        self.isRedsymptomName = false;
        self.isGraysymptomName = true;
      }
    }
  }
};
</script>
<style scoped>
.symptomCheckAdd {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 150px;
}

.symptomCheckAdd > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.addTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.addTitle > div {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.addTitle > div > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.addTitle > div > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.addTitle > div > div:nth-child(2) {
  color: #303030;
  font-size: 17px;
  margin-left: 10px;
}

.addList {
  margin: 24px 0px;
}

.addLi {
  overflow: hidden;
  margin-bottom: 24px;
}

.addLi > div {
  float: left;
}

.addLi > div:nth-child(1) {
  width: 16%;
  max-width: 200px;
  height: 32px;
  line-height: 32px;
  text-align: right;
  margin-right: 16px;
}

.addLi > div:nth-child(2) {
  text-align: left;
  width: 80%;
  max-width: 720px;
}

.addLi:nth-child(3) div:nth-child(2) > div:last-child {
  margin-top: 15px;
}

.search {
  overflow: hidden;
  height: 34px;
  display: flex;
}

.searchBox {
  border-radius: 4px;
  padding-left: 10px;
  border: 1px solid #d1d1d1;
}

.searchButton {
  width: 70px;
  height: 32px;
  background: #5acdfa;
  text-align: center;
  line-height: 32px;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  margin-left: 24px;
  cursor: pointer;
}

.searchBox input {
  border: none !important;
  height: 28px;
}

.searchBox input::-webkit-input-placeholder {
  color: #75758A;
}

.searchBox input:-moz-input-placeholder {
  color: #75758A;
}

.searchBox input::-moz-input-placeholder {
  color: #75758A;
}

.searchBox input:-ms-input-placeholder {
  color: #75758A;
}

.searchList {
  width: 80%;
  display: flex;
  margin-top: 24px;
}

.searchList > div ul {
 overflow-y: auto;
 width: 100%;
}


.searchLeftList,
.searchRightList {
  width: 40%;
  max-width: 410px;
}

.searchRightList {
  margin-left: 50px;
  margin-top: 0px!important;
}

.searchRightList li > div:nth-child(1) {
  margin-left: 10px;
}

.searchRightList li > div:nth-child(2) {
  margin-right: 5px;
}

.searchLeftList > div,
.searchRightList > div {
  width: 100%;
  max-width: 410px;
  min-width: 245px;
  height: 40px;
  font-size: 16px;
  color: #303030;
  line-height: 40px;
  text-align: center;
}

.searchLeftList ul,
.searchRightList ul {
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  height: 320px;
  border: 1px solid #d1d1d1;
  overflow-y: auto;
}

.ifSearchLi {
  width: 100%;
  height: 38px;
  line-height: 38px;
  /* margin: 0 8px; */
  cursor: pointer;
  padding: 0 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ifSearchLi:hover{
  background: #fff1f3;
}

.okSearchLi {
  width: 100%;
  height: 38px;
  /* margin: 0 8px; */
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  float: left;
}

.okSearchLi:hover {
  background: #fff1f3;
}

.okSearchLi div:nth-child(1) {
  position: absolute;
  width: 90%;
  height: 38px;
  line-height: 38px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* background: red */
}

.okSearchLi div:nth-child(2) {
  width: 16px;
  height: 17px;
  position: absolute;
  top: 8px;
  right: 4px;
}

.addButton {
  width: 37% !important;
  min-width: 560px;
  height: 32px;
  display: flex;
  margin-top: 36px;
  justify-content: center;
}

.addButton div {
  width: 70px;
  height: 32px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
}

.addButton div:nth-child(1) {
  background: #5acdfa;
  margin-right: 40px;
}

.addButton div:nth-child(2) {
  background: #aeaeae;
}

select {
  width: 150px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 95% 12px no-repeat transparent;
  font-size: 14px;
  color: #75758A;
  border: 1px solid #d1d1d1;
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

.addDataLi input {
  width: 290px;
  height: 32px;
  padding: 0 4px;
  border-radius: 3px;
  color:#8f8e94;
  padding-left: 8px;
}

.addLastDataLi span {
  margin-left: 24px;
  color: #8f8e94;
}

/* 输入框边框样式 */

.redBorder {
  border: 1px solid #fe5371 !important;
}

.grayBorder {
  border: 1px solid #d1d1d1 !important;
}

/* 提示文字样式 */

.redTest {
  color: #fe5371 !important;
}

.grayTest {
  color: #75758A !important;
}

/* 取消弹出框 */

.interceptContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 280px) / 2) auto;
  z-index: 100000;
}

.interceptPopup {
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

.bgColor {
  background: #fff1f3; 
}
</style>
