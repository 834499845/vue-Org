<!--健康档案-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="healthFile">
    <div>
      <div class="listTitle">
        <div>
          <div @click="backClick">
            <img src="/static/img/fan.png" alt="">
          </div>
          <div>
            健康档案
          </div>
        </div>
      </div>
      <!--列表-->
      <div class="list" v-loading="loading">
        <div class="listNav">
          <ul>
            <!-- <li>分类：</li> -->
            <li v-for="(item,index) in dataLists" v-bind:key="index" :class="{'listLi':isListLi,'listSel':isListSel == index}" @click="navClick(index)">
              {{item.name}}
            </li>
            <!-- <li class="lastLi" @click="addClick">添加分类</li> -->
          </ul>
        </div>
        <div>
          <router-view keep-alive></router-view>
        </div>
      </div>
    </div>
    <!-- 添加分类弹出框 -->
    <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
      <transition name="slide-fade">
        <div class="addContent" v-show="addShow" v-loading="adding">
          <div class="addTitle">
            添加分类
          </div>
          <div class="addData">
            <div class="addDataItem">
              <div>名称：</div>
              <div>
                <input type="text" :class="{redBorder:isRedattributeValue,grayBorder:isGrayattributeValue}">
              </div>
              <div :class="{redTest:isRedattributeValue,grayTest:isGrayattributeValue}">
                可输入6个字符
              </div>                  
            </div>
            <div class="addDataItem">
              <div>code：</div>
                <div>
                  <input type="text" :class="{redBorder:isRedattributeValue,grayBorder:isGrayattributeValue}">
                </div>
                <div :class="{redTest:isRedattributeValue,grayTest:isGrayattributeValue}">
                  可输入6个字符
                </div>                   
            </div>
          </div>
          <div class="addButton">
            <div @click="butAddClick">确定</div>
            <div @click="cancelClcik">取消</div>
          </div>      
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import select from "../../cModule/select";
// import hosdel from "../../cModule/healthdel";
export default {
  components: {
    // "v-select": select,
    // "v-hosdel": hosdel
  },
  data() {
    return {
      loading: false, //控制页面加载
      adding: false, //控制添加加载
      isListSel: 0, //控制标签显示时的样式
      isListLi: true, //控制标签选中时的样式
      dataLists: [], //标签列表
      isAddPopup: true, //控制添加弹出框显示时候的样式
      isShowAdd: true, //控制添加弹出框显示或隐藏
      addShow: false, //控制添加弹出框显示或隐藏
      isGrayattributeValue: true, //控制输入框灰色样式
      isRedattributeValue: false //控制输入框红色样式
    };
  },
  // 模块新建时
  created: function() {
    var self = this;
    // self.loading = true;
    if (sessionStorage.getItem("healthFileIndex")) {
      this.isListSel = sessionStorage.getItem("healthFileIndex");
    } else {
      this.isListSel = 0;
    }
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "健康管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("user") == -1) {
        self.loading = true;
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
        self.loading = false;
        self.getHealthFileListFun();
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
  methods: {
    //查询健康档案信息
    getHealthFileListFun() {
      var self = this;
      self
        .gethealthRecordshgetHealthRecordsDetail({
          userId: sessionStorage.getItem("idUser")
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (
                data.data.nationality ||
                data.data.marriage ||
                data.data.profession ||
                data.data.income
              ) {
                self.dataLists.push({
                  name: "个人资料",
                  path: "personalData"
                });
              }
              if (data.data.healthRecordsInfo) {
                if (data.data.healthRecordsInfo.life) {
                  self.dataLists.push({
                    name: "生活习惯",
                    path: "lifeStyle"
                  });
                }

                if (data.data.healthRecordsInfo.medicalCase) {
                  self.dataLists.push({
                    name: "专属病例",
                    path: "ExclusiveCase"
                  });
                }

                if (data.data.healthRecordsInfo.healthCheckReport) {
                  self.dataLists.push({
                    name: "体质检测",
                    path: "PhysicalExamination"
                  });
                }

                if (data.data.healthRecordsInfo.subHealthCheckReport) {
                  self.dataLists.push({
                    name: "亚健康检测",
                    path: "sub-healthExamination"
                  });
                }

                if (data.data.healthRecordsInfo.medicalReport) {
                  self.dataLists.push({
                    name: "医学报告",
                    path: "medicalReport"
                  });
                }
              }
            } else {
              self.dataLists = [];
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 箭头返回上一页
    backClick() {
      sessionStorage.removeItem("healthFileIndex");
      this.$router.push({
        path: "/health/user"
      });
    },
    // 标签跳转详情
    navClick(index) {
      var pathStr = this.dataLists[index].path;
      // console.log( pathStr)
      this.$router.push({
        path: "/health/healthFile/" + pathStr
      });
      sessionStorage.setItem("healthFileIndex", index);
      this.isListSel = index;
    },
    // 添加分类
    addClick() {
      this.isShowAdd = false;
      this.addShow = true;
    },
    // 正则验证
    validateFun() {
      var reg_1 = /^[\s]$/; //输入不能为空
      var reg_2 = /^[a-zA-z\u4e00-\u9fa5]$/; //输入只能是汉字或者字母
    },
    //确认添加
    butAddClick() {
      var self = this;
      self.adding = true;
    },
    // 取消添加弹出框
    cancelClcik() {
      this.isShowAdd = true;
      this.addShow = false;
    },
    ...mapActions(["gethealthRecordshgetHealthRecordsDetail"])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
/*主页*/

.healthFile {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.healthFile > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
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
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  /*font-weight: 600;*/
  margin-left: 10px;
}

/* 列表 */
/* .list {
  margin-top: 35px;
  overflow: hidden
} */

.list {
    margin-top: 35px;
    overflow: hidden;
    min-height: 540px;
    width: 100%;
}

.listNav ul {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  width: 100%;
  flex-wrap: wrap;
  padding-left: 50px;
  /*  */
}

.listNav ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-top: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #303030;
  cursor: pointer;
  width: 5%;
  min-width: 96px;
  min-height: 30px;
  
}

.listNav > ul .listSel {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

.listNav > ul .listLi:hover {
  border: 1px solid #51d0c7;
  color: #51d0c7;
}

/* .listNav ul > li:nth-child(1) {
  margin-left: 0px;
  border: none;
  margin-right: -10px;
} */

/* .listNav ul > li:nth-child() {
  margin-left: 0px;
} */

.listNav ul > li.lastLi {
  color: #ff8d63;
  border: 1px solid #ff8d63;
}

/* 添加分类弹出框 */
.addPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addContent > div:nth-child(1) {
  height: 50px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #d1d1d1;
  line-height: 50px;
  text-align: center;
}

.addContent input {
  width: 230px;
  height: 32px;
  border-radius: 4px;
  color: #303030;
  text-align: center;
  border: 1px solid #d1d1d1;
}

.addContent {
  width: 450px;
  min-height: 200px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.showAdd {
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

.addButton {
  width: 100%;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.addButton > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.addButton > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #51d0c7;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.addButton > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addData {
  min-height: 55px;
  width: 100%;
  margin-top: 20px;
}

.addData .addDataItem {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.addData .addDataItem > div {
  margin-left: 10px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #d1d1d1;
}

.redBorder {
  border: 1px solid #fe5371;
}

.grayBorder {
  border: 1px solid #d1d1d1;
}
</style>