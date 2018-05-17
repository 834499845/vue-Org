<!--饮食模块-计量单位管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="unit">
    <div>
      <div class="listTitle">
        <div>
          计量单位管理
        </div>
        <div @click="addClick">
          新增计量单位
        </div>
      </div>
      <!--筛选-->
      <!-- <div class="menu">
                <div class="menuLeft">
                    <div>
                        <select @change="selectTypesChange" v-model="assortmentType">
                            <option v-for="assortmentType in assortmentTypes"  v-bind:key="assortmentType.labelName">{{assortmentType.labelName}}</option>
                        </select>
                    </div>
                    <div class="searchBut" @click="searchClick">
                        确定
                    </div>
                </div>
            </div> -->
      <!--列表-->
      <div class="list">
        <div class="listContent" v-loading="loading">
          <ul>
            <li class="firstLi">
              <div title="序号">
                序号
              </div>
              <div title="计量单位">
                计量单位
              </div>
              <div title="创建时间">
                创建时间
              </div>
              <div title="操作">
                操作
              </div>
            </li>
            <li class="dataLi" v-show="dataList.length > 0" v-for="(item,index) in dataList" :key="index">
              <div>
                {{index + 1}}
              </div>
              <div>
                {{item.name | strFun}}
              </div>
              <div v-if="item.type != 0">
                {{item.createDate | timeFun}}
              </div>
              <div v-else>
                系统默认
              </div>
              <div class="operate">
                <div>
                  <img v-show="item.type != 0" @click="updateClick(index)" src="/static/img/编辑.png">
                  <img v-show="item.type == 0" src="/static/img/grayedit.png">
                </div>
                <div v-show="item.type != 0">
                  <img @click="deleteClick(index)" src="/static/img/删除.png">
                </div>
              </div>
            </li>
            <li class="noList" v-show="dataList.length == 0">
              <div>
                <img src="/static/img/w.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 添加弹出框 -->
    <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
      <transition name="slide-fade">
        <div class="addContent" v-show="addShow" v-loading="adding">
          <div class="addTitle">
            <div>{{title}}</div>
            <div @click="closeClick">
              <img src="/static/img/小叉号@2x.png" alt="">
            </div>
          </div>
          <div class="addData">
            <div>
              <div>
                计量单位名称：
              </div>
              <div>
                <input type="text" v-model="unitNameVal" :class="{redBorder:isRedUnitNameVal,grayBorder:isGrayUnitNameVal}" placeholder="请输入计量单位名称">
              </div>
            </div>
            <div :class="{redTest:isRedUnitNameVal,grayTest:isGrayUnitNameVal}">
              计量单位不能为空
            </div>
          </div>
          <!-- <div class="addData">
            <div>
              <div>
                创建时间：
              </div>
              <div>
                <el-date-picker @change="createTimeChange" v-model="createTimeVal" type="date" placeholder="请选择创建日期">
                </el-date-picker>
              </div>
            </div>
            <div :class="{redTest:isRedCreateTimeValVal,grayTest:isGrayCreateTimeValVal}">
              创建时间不能为空
            </div>
          </div> -->
          <div class="addBut">
            <div class="but" v-show="operation == 0" @click="butAddClick">保存</div>
            <div class="but" v-show="operation == 1" @click="butUpdateClick">保存</div>
            <div @click="cancelClcik">取消</div>
          </div>
        </div>
      </transition>
    </div>
    <!--删除弹出框-->
    <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
      <transition name="slide-fade">
        <div class="deleteContent" v-show="delShow">
          <v-hosdel @ok="butdeleteClick(index)" @canle="canleClick" :name="titlename"></v-hosdel>
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
        title: "", //添加或者编辑的标题
        adding: false, //控制添加弹出框加载
        dataList: [
        ], //单位列表
        unitNameVal: "",
        isAddPopup: true, //控制添加弹出框显示时的样式
        isShowAdd: true, //控制添加弹出框显示隐藏
        addShow: false, //控制添加弹出框显示
        delIndex: "", //删除index
        loading: false, //页面加载
        titlename: "", //删除弹框提示语
        isdelPopup: true, //控制删除弹出框显示样式
        isShowdel: true, //控制删除弹出框显示隐藏
        delShow: false, //控制删除弹出框显示
        operation: "", //控制添加和修改的确定按钮
        isRedUnitNameVal: false, //添加计量单位名称不符合规定时提示
        isGrayUnitNameVal: true, //添加计量单位名称符合规定时提示
        isRedCreateTimeValVal: false, //选择创建时间不符合规定时提示
        isGrayCreateTimeValVal: true, //选择创建时间古河规定时提示
        createTimeVal: Date.parse(new Date()), //创建时间Model
        addDoctTrue: false // 添加按钮防重复
      };
    },
    // 过滤
    filters: {
      //分类名称过滤
      strFun: function (val) {
        if (val) {
          return val;
        } else {
          return "无";
        }
      },
      //时间过滤函数
      timeFun: function (val) {
        if (val) {
          var now = new Date(val);
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          month = month > 9 ? month : "0" + month;
          var date = now.getDate();
          date = date > 9 ? date : "0" + date;
          // var hour = now.getHours();
          // hour = hour > 9 ? hour : "0" + hour;
          // var minute = now.getMinutes();
          // minute = minute > 9 ? minute : "0" + minute;
          // return year + "-" + month + "-" + date + " " + hour + ":" +minute
          return year + "-" + month + "-" + date;
        } else {
          return "-";
        }
      }
    },
    // 模块新建时
    created: function () {
      var self = this;
      // 权限限制
      var roleIdStr = sessionStorage.getItem("roleId");
      var TOKEN = sessionStorage.getItem("token");
      var userRoleOBj = sessionStorage.getItem("userRole");
      if (userRoleOBj) {
        userRoleOBj = JSON.parse(userRoleOBj);
        var arrs = [];
        userRoleOBj.forEach(function (ele, ind) {
          if (ele.name == "饮食管理") {
            ele.children.forEach(function (one, oneIndex) {
              arrs.push(one.path);
            });
          }
        });
        if (arrs.indexOf("unit") == -1) {
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
          self.listFun()
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
    mounted() { },
    // 事件处理
    methods: {
      // 获取数据
      listFun() {
        var self = this;
        self.loading = true;
        self
          .getfoodMeasurementUnitSelectAll({
          })
          .then(data => {
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data) {
                  if (data.data.length > 0) {
                    self.dataList = data.data;
                  } else {
                    self.dataList = [];
                  }
                } else {
                  self.dataList = [];
                }
              } else {
                self.dataList = [];
              }
            } else {
              self.dataList = [];
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.dataList = [];
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常!"
            });
          });
      },
      //选择创建时间
      createTimeChange() { },
      // 新增
      addClick() {
        this.title = "新增计量单位";
        this.isRedUnitNameVal = false;
        this.isGrayUnitNameVal = true;
        this.isRedCreateTimeVal = false;
        this.unitNameVal = "";
        this.isShowAdd = false;
        this.addShow = true;
        this.operation = 0;
      },
      // 编辑
      updateClick(index) {
        this.title = "编辑计量单位";
        this.isShowAdd = false;
        this.addShow = true;
        this.operation = 1;
        this.delIndex = index
        this.unitNameVal = this.dataList[this.delIndex].name
      },
      // 删除
      deleteClick(index) {
        this.titlename = "删除后无法恢复，确定要删除？";
        this.isShowdel = false;
        this.delShow = true;
        this.delIndex = index
      },
      // 确认添加
      butAddClick() {
        var self = this;
        if (self.validateFun() == false) {
          self.$message({
            type: "info",
            message: "请完善信息！"
          });
          // console.log("1")
          return;
        } else {
          // self.unitNameVal
          if (self.addDoctTrue == false) {
            self.addDoctTrue = true;
            self
              .getfoodMeasurementUnitAddOrUpdate({
                name: self.unitNameVal
              })
              .then(data => {
                self.addDoctTrue = false;
                self.isShowAdd = true;
                self.addShow = false;
                if (data.code == 200) {
                  self.listFun()
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addDoctTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }

        }
      },
      // 确认修改
      butUpdateClick() {
        var self = this;
        if (self.validateFun() == false) {
          return;
        } else {
          if (self.addDoctTrue == false) {
            self.addDoctTrue = true;
            self
              .getfoodMeasurementUnitAddOrUpdate({
                id: self.dataList[self.delIndex].id,
                name: self.unitNameVal
              })
              .then(data => {
                self.addDoctTrue = false;
                self.isShowAdd = true;
                self.addShow = false;
                if (data.code == 200) {
                  self.listFun()
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addDoctTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }

        }
      },
      //确认删除
      butdeleteClick(index) {
        var self = this;
        if (self.titlename == "删除后无法恢复，确定要删除？") {
          if (self.addDoctTrue == false) {
            self.addDoctTrue = true;
            self
              .getfoodMeasurementUnitDelete({
                id: self.dataList[self.delIndex].id
              })
              .then(data => {
                self.addDoctTrue = false;
                self.isShowdel = true;
                if (data.code == 200) {
                  self.listFun()
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addDoctTrue = false;
                self.isShowdel = true;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        } else {
          if (self.unitNameVal.length != 0 || self.createTimeVal.length != 0) {
            if (self.titlename == "当前有未保存的信息，是否确认退出？") {
              this.isShowAdd = true;
              this.isShowdel = true;
            }
          } else {
            this.isShowdel = false;
          }
        }
      },
      //关闭添加弹框
      closeClick() {
        var self = this;
        if (self.unitNameVal.length != 0 || self.createTimeVal.length != 0) {
          this.titlename = "当前有未保存的信息，是否确认退出？";
          // console.log("1")
          this.isShowdel = false;
          this.delShow = true;
        } else {
          this.isShowAdd = true;
        }
      },
      //取消
      cancelClcik() {
        this.isShowAdd = true;
        this.addShow = false;
      },
      //取消删除框
      canleClick() {
        this.isShowdel = true;
        this.delShow = false;
      },
      //正则验证
      validateFun() {
        var reg_1 = /^[\s]*$/; //输入不能为空
        if (reg_1.test(this.unitNameVal)) {
          this.isRedUnitNameVal = true;
          this.isGrayUnitNameVal = false;
        }
        if (this.isRedUnitNameVal == true) {
          return false;
        }
      },
      ...mapActions([
        "getfoodMeasurementUnitSelectAll",
        'getfoodMeasurementUnitAddOrUpdate',
        'getfoodMeasurementUnitDelete'
      ])
    },
    watch: {
      unitNameVal: function (val) {
        var nameStr = val;
        if (nameStr.length > 0) {
          this.isRedUnitNameVal = false;
          this.isGrayUnitNameVal = true;
        }
      }
    }
  };
</script>
<style scoped>
  /*删除弹出框*/

  .deleteContent {
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

  .slide-fade-enter-active {
    transition: all 0.7s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-active {
    transform: translateY(-30px);
    opacity: 0;
  }

  /* 添加弹出框 */

  .addPopup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .showAdd {
    display: none;
  }

  .addData>div:nth-child(1) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 15px;
  }

  .addData>div:nth-child(2) {
    margin-top: 50px;
    margin-bottom: 15px;
    margin-left: 15px;
  }

  .addData:nth-child(3)>div:nth-child(2) {
    margin-bottom: 30px;
  }

  .addData:nth-child(3)>div:nth-child(1) {
    margin-top: 35px;
    margin-left: 24px;
    line-height: 38px;
    height: 38px;
  }

  .addData {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .redTest {
    color: #fe5371 !important;
  }

  .grayTest {
    color: #908f95 !important;
  }

  .redBorder {
    border: 1px solid #fe5371 !important;
  }

  .grayBorder {
    border: 1px solid #d1d1d1 !important;
  }

  .addBut {
    display: flex;
    margin: 20px auto;
  }

  .addBut>div {
    width: 68px;
    height: 30px;
    cursor: pointer;
    margin-left: 30%;
  }

  .addBut>.but {
    width: 68px;
    height: 30px;
    background-color: #5acdfa;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    color: #fff;
    margin-right: 50px;
  }

  .addBut>div:nth-child(3) {
    width: 68px;
    height: 30px;
    border-radius: 3px;
    color: #fff;
    margin-left: 25px;
    background-color: #d1d1d1;
    text-align: center;
    line-height: 30px;
  }

  input {
    width: 200px;
    height: 38px;
    border-radius: 4px;
    color: #303030;
    /* text-align: center; */
    padding-left: 10px;
  }

  .addContent {
    width: 600px;
    min-height: 100px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 7px;
    z-index: 1;
    padding-bottom: 25px;
  }

  .addContent .addTitle {
    display: flex;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    background: #f2f4f8;
    width: 100%;
    border-bottom: 1px solid #d1d1d1;
    margin-top: -50;
    font-size: 15px;
    font-weight: bold;
  }

  .addContent .addTitle div:nth-child(2) {
    margin-left: 455px;
    cursor: pointer;
  }

  .addTitle div:nth-child(2) img {
    width: 15px;
    height: 15px;
  }

  .addContent .addTitle div:nth-child(2) .listContent .noList {
    height: 400px;
  }

  .listContent .noList>div:nth-child(1) {
    width: 607px;
    height: 400px;
    margin: 0 auto;
    border: 0;
    overflow: hidden;
  }

  .unit {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #ccc;
  }

  .unit>div {
    overflow: hidden;
    width: calc(100% - 72px);
    margin-left: 36px;
  }

  .lastLi {
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .firstLi {
    line-height: 58px;
    height: 58px;
    background-color: #f2f4f8;
    font-weight: bold;
    font-size: 16px;
  }

  .firstLi>div:nth-child(1) {
    border-left: 1px solid #f2f4f8;
  }

  .dataLi>div:nth-child(1) {
    border-left: 1px solid #f2f4f8;
  }

  .dataLi .operate {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dataLi .operate>div {
    width: 25px;
    height: 25px;
  }

  .dataLi .operate>div:nth-child(1) {
    margin-right: 10px;
  }

  .dataLi .operate>div:nth-child(2) {
    margin-left: 10px;
  }

  .operate img {
    width: 100%;
    cursor: pointer;
    height: 100%;
  }

  .listContent .firstLi>div:nth-child(2) {
    width: 25%;
  }

  .listContent ul {
    border-top: 1px solid #ececec;
  }

  .listContent li {
    display: flex;
    height: 50px;
  }

  .listContent .firstLi>div,
  .listContent .dataLi>div {
    text-align: center;
    line-height: 49px;
    border-right: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
  }

  .listContent li>div:nth-child(1) {
    width: 25%;
  }

  .listContent .dataLi>div:nth-child(2) {
    width: 25%;
  }

  .listContent li>div:nth-child(3) {
    width: 25%;
  }

  .listContent li>div:nth-child(4) {
    width: 25%;
  }

  .listContent li>div:nth-child(4) div {
    line-height: 25px;
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

  .listTitle>div:nth-child(1) {
    float: left;
    color: #303030;
    font-size: 16px;
    font-weight: 600;
  }

  .listTitle>div:nth-child(2) {
    float: right;
    width: 100px;
    height: 26px;
    border: 1px solid #fff;
    border-radius: 3px;
    text-align: center;
    line-height: 24px;
    color: #5acdfa;
    cursor: pointer;
    border: 1px solid #5acdfa;
  }

  /* 搜索 */

  .menu {
    height: 80px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menuLeft {
    display: flex;
  }

  select {
    width: 120px;
    height: 32px;
    line-height: 32px;
    padding-left: 7px;
    color: #8f8e94;
    border-radius: 3px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
    font-size: 14px;
    color: #97969b;
    border: 1px solid #d1d1d1;
    overflow: hidden;
  }

  .list {
    margin-top: 32px;
  }

  select::-ms-expand {
    display: none;
  }

  .menuLeft>div {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .firstLi>div {
    overflow: hidden;
    padding: 0 7px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>