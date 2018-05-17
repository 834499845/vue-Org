<!--问答管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <img src="/static/img/返回蓝.jpg" @click="gobackClick" style="cursor: pointer;">
                    <span>{{symptom}}</span>
                    <span>/症状列表</span>
                </div>
                <div @click="addCommClick">
                    新增症状
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <ul>
                    <li class="firstLi">
                        <div>
                            序号
                        </div>
                        <div>
                            症状
                        </div>
                        <div>
                          性别
                        </div>
                        <div>
                            对应科室
                        </div>
                        <div>
                            操作
                        </div>
                    </li>
                    <li class="dataLi" v-for="(item,index) in dataList">
                        <div>
                            {{index + 1}}
                        </div>
                        <div class="omit">
                            {{item.name}}
                        </div>
                        <div class="omit">
                          {{item.gender | genderFun}}
                        </div>
                        <div class="omit">
                            {{item.bigDepartmentName}} — {{item.smallDepartmentName}}
                        </div>
                        <div class="operate">
                            <div>
                                <img @click="updateClick(index)" src="/static/img/编辑.png">
                            </div>
                            <div>
                                <img @click="recycleClick(index)" src="/static/img/删除.png">
                            </div>
                        </div>
                    </li>
                </ul>
                 <!-- 获取不到数据时 -->
                    <div class="noList" v-show="dataList.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </div>      
                
            </div>
        </div>
        <!--删除弹出框-->
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
      okClickTrueOrFalse: true,
      symptom: "", //标题 身体部位
      dataList: [],
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      titlename: "该症状将被删除，该操作无法恢复！", // 删除弹窗标题
      delIndex: "", //删除index
      symptomId: "" //身体部位id
    };
  },
  // 过滤
  filters: {
    genderFun: function(val) {
      if (val == "ALL") {
        return "男士、女士";
      } else if (val == "MAN") {
        return "男士";
      } else {
        return "女士";
      }
    }
  },
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
        self.editsymptomData = JSON.parse(sessionStorage.symptomData);
        self.symptomId = self.editsymptomData.key;
        self.symptom = self.editsymptomData.value;
        this.getsymptom();
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
    //症状列表
    getsymptom() {
      var self = this;
      self
        .getMedicalsymptomPositionselectSymptomByPositionId({
          positionId: self.symptomId,
          type: "SEE_DOCTOR"
        })
        .then(data => {
          //console.log("症状列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length == 0) {
                self.dataList = [];
              } else {
                self.dataList = data.data;
              }
            } else {
              self.dataList = [];
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
    //返回人体部位
    gobackClick() {
      this.$router.push({
        path: "/medical/symptom"
      });
    },
    // 删除
    recycleClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = this.dataList[index].id;
      //console.log(this.delIndex);
    },
    // 确认删除框
    okClick() {
      var self = this;
      if (self.okClickTrueOrFalse == true) {
        self.okClickTrueOrFalse = false;
        self
          .getMedicalsymptomPositiondelete({
            id: self.delIndex
          })
          .then(data => {
            self.okClickTrueOrFalse = true;
            //console.log("批量操作", data);
            if (data.code == 200) {
              self.message({
                type: "success",
                message: "删除成功！"
              });
              self.getsymptom();
            } else if (data.code == 601) {
              self.$message({
                type: "success",
                message: "症状和药品存在关联，不能删除！"
              });
            } else {
              self.$message({
                type: "success",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "success",
              message: "服务器异常"
            });
          });
      }

      self.isShowdel = true;
      self.delShow = false;
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //新增
    addCommClick() {
      this.$router.push({
        path: "/medical/addsymptom"
      });
    },
    // 编辑
    updateClick(index) {
      var self = this;
      let addsymptomdata = JSON.stringify(self.dataList[index]);
      sessionStorage.setItem("addsymptomdata", addsymptomdata);
      this.$router.push({
        path: "/medical/addsymptom",
        query: { operation: 1, id: self.dataList[index].id }
      });
    },
    ...mapActions([
      "getMedicalsymptomPositionselectSymptomByPositionId",
      "getMedicalsymptomPositiondelete"
    ])
  },
  watch: {}
};
</script>
<style scoped>
/*删除弹出框*/

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
  min-height: 540px;
}

.list > div {
  margin: 0 auto;
  width: 650px;
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
  display: flex;
  align-items: center;
}

.listTitle > div:nth-child(1) img {
  margin-right: 5px;
}

.listTitle > div:nth-child(2) {
  float: right;
  width: 80px;
  height: 26px;
  border: 1px solid #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #5acdfa;
  cursor: pointer;
  border: 1px solid #5acdfa;
}

.list ul {
  border: 1px solid #ececec;
  border-bottom: none;
  width: 100%;
  margin-top: 20px;
}

.list li {
  display: flex;
}

.list li > div {
  text-align: center;
  line-height: 55px;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.dataLi li > div {
  line-height: 49px !important;
}

.list li > div:nth-child(1) {
  width: 10%;
}

.list li > div:nth-child(2) {
  width: 30%;
}

.list li > div:nth-child(3) {
  width: 15%;
}

.list li > div:nth-child(4) {
  width: 20%;
}

.list li > div:nth-child(5) {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 25%;
}

.firstLi {
  color: #303030;
  font-size: 16px;
  font-weight: bold;
  height: 55px;
  line-height: 55px;
  background: #f2f4f8;
}

.dataLi {
  color: #303030;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}

.operate div:nth-child(1) {
  cursor: pointer;
  margin-right: 10px;
}

.operate div:nth-child(2) {
  cursor: pointer;
  margin-left: 10px;
}

.omit {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 7px;
}

/* 获取不到数据 */
.noList {
  height: 400px;
}

.noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}
</style>