<!--医疗管理-热词管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="hotkye">
    <div>
      <div class="listTitle">
        <div>
          热搜管理
        </div>
        <div @click="addClick">
          新增热搜
        </div>
      </div>
      <!--列表-->
      <div class="list" v-loading="loading">
        <div class="listContent">
          <ul>
            <li class="firstLi">
              <div>
                热搜词语
              </div>
              <div>
                创建时间
              </div>
              <div>
                操作
              </div>
            </li>
            <li v-show="lists.length > 0" class="dataLi" v-for="(item,index) in lists" :key="index">
              <div>
                {{item.hotWord}}
              </div>
              <div>
                {{item.createDate | timeFun}}
              </div>
              <div class="operation">
                <div @click="updateClick(index)">
                  <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                </div>
                <div @click="deleteClick(index)">
                  <img src="/static/img/删除.png" alt="删除" title="删除">
                </div>
              </div>
            </li>
            <li class="noList" v-show="lists.length == 0">
              <div>
                <img src="/static/img/w.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--添加弹出框-->
    <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
      <transition name="slide-fade">
        <div class="addContent" v-show="addShow" v-loading="adding">
          <div class="addTitle">
          </div>
          <div class="addData">
            <div>
               热词：
            </div>
            <div>
              <div>
                <input :class="{redInput:isaddattributeValue,grayInput:isRrayattributeValue}" type="text" v-model="hotWordVal">
              </div>
              <div :class="{redTest:isaddattributeValue,grayTest:isRrayattributeValue}">
                可输入5个汉字
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
    <!--删除弹出框-->
    <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
      <transition name="slide-fade">
        <div class="delContent" v-show="delShow">
          <v-hosdel @ok="butdeleteClick" @canle="cancelClcik" :name="titlename"></v-hosdel>
        </div>
       </transition>
    </div>
  </div>
</template>
<script>
import { mapActions} from "vuex";
import hosdel from "../../cModule/cancelBox"; //引入组件
export default {
  components: {
    "v-hosdel": hosdel //注册组件
  },
  data() {
    return {
      butdeleteClickTrueOrFalse: true,
      butAddClickTrueOrFalse: true,
      deling: false, //删除控制
      loading: false, //加载控制
      adding: false, //添加控制
      lists: [], //热词列表
      hotWordVal: "", //热词Model
      isRrayattributeValue: true, //控制添加里面热词输入框灰色样式
      isaddattributeValue: false, //控制添加里面热词输入框红色色样式
      isattributeValue: false,
      isAddPopup: true, //控制添加弹出框样式
      isShowAdd: true, //控制添加弹出框展示/隐藏
      addShow: false, //控制添加弹出框展示/隐藏
      upOrAd: 1, //控制执行操作为编辑/新增
      upIndex: 0, //存放index
      titlename: "", //标题
      isdelPopup: true, //控制删除弹出框样式
      isShowdel: true, //控制删除弹出框展示/隐藏
      delShow: false, //控制删除弹出框展示/隐藏
      delIndex: 0 //存放index
    };
  },
  // 过滤
  filters: {
    //时间过滤函数
    timeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var date = now.getDate();
      date = date > 9 ? date : "0" + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0" + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0" + minute;
      return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
  },
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
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("hotkye") == -1) {
        var warningStr = "您暂时没有权限访问这个页面";
        self.$alert(warningStr, "提示", {
          confirmButtonText: "确定",
          type: "info"
        }).then(() => {
          self.$router.push({
            path: "/login"
          });
        }).catch(() => {
          self.$router.push({
            path: "/login"
          });
        });
      } else {
        if (arrs.indexOf("hotkye") == -1) {
          var warningStr = "您暂时没有权限访问这个页面";
          self.$alert(warningStr, "提示", {
            confirmButtonText: "确定",
            type: "info"
          }).then(() => {
            self.$router.push({
              path: "/login"
            });
          }).catch(() => {
            self.$router.push({
              path: "/login"
            });
          });
        } else {
          self.listFun();
        }
      }
    } else {
      var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
      this.$alert(warningStr, "提示", {
        confirmButtonText: "确定",
        type: "info"
      }).then(() => {
        this.$router.push({
          path: "/login"
        });
      }).catch(() => {
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
    //获取所有热词列表
    listFun() {
      var self = this;
      self.loading = true;
      self
        .getMedicalhotSearchgetHotSearch({
          type: "medical"
      }).then(data => {
        self.loading = false;
        if (data.code == 200) {
          if (data.data) {
            if (data.data.length > 0) {
              self.lists = data.data;
            } else {
              self.lists = [];
            }
          } else {
            self.lists = [];
          }
        } else {
          self.lists = [];
          self.$message({
            type: "info",
            message: data.message
          });
        }
      }).catch(msg => {
        self.lists = [];
        self.loading = false;
        self.$message({
          type: "info",
          message: "服务器错误"
        });
      });
    },
    // 编辑弹出框
    updateClick(ind) {
      this.isShowAdd = false;
      this.addShow = true;
      this.hotWordVal = this.lists[ind].hotWord;
      this.upOrAd = 2;
      this.upIndex = ind;
    },
    // 删除弹出框
    deleteClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
      this.titlename = "确定删除该热词吗？";
    },
    // 确认删除
    butdeleteClick() {
      var self = this;
      self.deling = true;
      if (self.butdeleteClickTrueOrFalse == true) {
          self.butdeleteClickTrueOrFalse = false
          self.getMedicalhotSearchdelete({
              type: "medical",
              idJson: "["+JSON.stringify(self.lists[this.delIndex].id)+"]"
          }).then(data => {
            self.butdeleteClickTrueOrFalse = true
            self.deling = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.isShowdel = true;
              self.delShow = false;
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          }).catch(msg => {
            self.butdeleteClickTrueOrFalse = true
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
      
    },
    // 添加弹出框
    addClick() {
      this.hotWordVal = '';
      this.isaddattributeValue = false;
      this.isRrayattributeValue = true;
      this.isShowAdd = false;
      this.addShow = true;
      this.upOrAd = 1;
    },
    // 正则
    validateFun () {
      var self = this;
      // var regOne = /^[\s]*$/; //输入不能为空
      var regTwo = /^[\u4e00-\u9fa5]*$/ //只能输入汉字
      if (regTwo.test(self.hotWordVal)) {
        self.isRrayattributeValue = true
        self.isaddattributeValue = false
        //console.log("111")
      } else {
        self.isaddattributeValue = true,
        self.isRrayattributeValue = false
      }
      if (self.isaddattributeValue == true) {
        return false
      }

    },
    // 确认添加或者修改
    butAddClick() {
      var self = this;
      if (self.validateFun() == false) {
        return false
      } else {
        if (self.isattributeValue == true) {
          if (self.upOrAd == 1) {
            if (self.lists.length < 16) {
              self.adding = true;
              if (self.butAddClickTrueOrFalse == true) {
                  self.butAddClickTrueOrFalse = false
                  self.getMedicalhotSearchadd({
                      type: "medical",
                      hotWord: self.hotWordVal,
                      showFlag: 0
                  }).then(data => {
                    self.butAddClickTrueOrFalse = true
                    self.adding = false;
                    if (data.code == 200) {
                      self.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      self.isShowAdd = true;
                      self.addShow = false;
                      self.hotWordVal = "";
                      self.listFun();
                    } else {
                      self.$message({
                        type: "info",
                        message: data.data
                      });
                    }
                  }).catch(msg => {
                    self.butAddClickTrueOrFalse = true
                    self.adding = false;
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              }
              
            } else {
              self.$message({
                type: "info",
                message: "热词最多15条!"
              });
            }
          } else {
            self.adding = true;
            if (self.butAddClickTrueOrFalse == true) {
                self.butAddClickTrueOrFalse = false
                self.getMedicalhotSearchupdate({
                    id: self.lists[self.upIndex].id,
                    hotWord: self.hotWordVal,
                    showFlag: 0
                }).then(data => {
                  self.butAddClickTrueOrFalse = true
                  self.adding = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "success",
                      message: "修改成功!"
                    });
                    self.hotWordVal = "";
                    self.isShowAdd = true;
                    self.addShow = false;
                    self.listFun();
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                }).catch(msg => {
                  self.butAddClickTrueOrFalse = true
                  self.adding = false;
                  self.$message({
                    type: "info",
                    message: "服务器错误"
                  });
                });
            }
            
          }
      } else {
        if (self.isattributeValue == false) {
          self.isRrayattributeValue = false;
          self.isaddattributeValue = true;
        } else {
          self.isRrayattributeValue = true;
          self.isaddattributeValue = false;
        }
      }
      }
      
    },
    // 取消弹出框
    cancelClcik() {
      this.isShowdel = true;
      this.delShow = false;
      this.isShowAdd = true;
      this.addShow = false;
    },
    ...mapActions([
      "getMedicalhotSearchgetHotSearch",
      "getMedicalhotSearchupdate",
      "getMedicalhotSearchdelete",
      "getMedicalhotSearchadd"
    ])
  },
  // 监视
  watch: {
    hotWordVal: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        this.isattributeValue = false;
      } else {
        if (trimstr.length < 6) {
          this.isRrayattributeValue = true;
          this.isaddattributeValue = false;
          this.isattributeValue = true;
        } else {
          this.isattributeValue = false;
          this.isRrayattributeValue = false;
          this.isaddattributeValue = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.redTest {
  color: #fe5371;
}

.grayTest {
  color: #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

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
  height: 15px;
  width: 100%;
}

.addContent input {
  width: 270px;
  height: 32px;
  border-radius: 4px;
  color: #303030;
  text-align: center;
}

.addContent {
  width: 450px;
  min-height: 100px;
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
  margin-top: 15px;
}

.addButton > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.addButton > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
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
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
  margin-top: 20px;
}

.addData > div:nth-child(2) {
  margin-left: 15px;
  height: 70px;
  overflow: hidden;
}

.addData > div:nth-child(2) > div {
  width: 280px;
  overflow: hidden;
}

.addData > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.addData > div:nth-child(1) {
  width: 105px;
  height: 70px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  padding-top: 5px;
}
/*删除弹出框*/

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

/*主页*/

.list .noList {
  height: 400px;
  border: 0;
}

.list .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.firstLi > div {
  height: 58px;
  border-right: 1px solid #d1d1d1;
}

.firstLi {
  border-top: 1px solid #d1d1d1;
  background-color: #f2f4f8;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.dataLi > div {
  height: 50px;
  border-right: 1px solid #d1d1d1;
}

.listContent li > div {
  width: 33.33333333%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listContent li > div:nth-child(1) {
  border-left: 1px solid #d1d1d1;
}

.listContent li {
  min-height: 50px;
  border-bottom: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
}

.listContent {
  width: 100%;
  min-height: 450px;
  margin-top: 24px;
}

.operation {
  display: flex;
}

.operation > div {
  width: 24px;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
}

.operation > div img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.operation > div:nth-child(1) {
  margin-right: 10px;
}

.operation > div:nth-child(2) {
  margin-left: 10px;
}

.hotkye {
  width: 100%;
  height: 100%;
}

.hotkye > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
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
  font-weight: 600;
}

.listTitle > div:nth-child(2) {
  float: right;
  width: 80px;
  height: 26px;
  border: 1px solid #5acdfa;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #5acdfa;
  cursor: pointer;
}
</style>
