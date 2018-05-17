<!--饮食模块-自定义食物-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="unit">
    <div>
      <div class="listTitle">
        <div>
          自定义食物
        </div>
        <!-- <div @click="addClick">
                    新增计量单位
                </div> -->
      </div>
      <!--筛选-->
      <div class="menu">
        <div class="menuLeft">
          <div>
            <el-date-picker @change="beginTime" v-model="timeStartVal" type="date" placeholder="请选择开始时间">
            </el-date-picker>
          </div>
          <div>
            -
          </div>
          <div>
            <el-date-picker @change="overtime" v-model="timeEndVal" type="date" placeholder="请选择结束日期">
            </el-date-picker>
          </div>
          <div class="searchBut" @click="searchClick">
            搜索
          </div>
          <div class="searchBut cancelBut" @click="clanleClick">
            重置
          </div>
        </div>
      </div>
      <!--列表-->
      <div class="list">
        <div class="listContent" v-loading="loading">
          <ul>
            <li class="firstLi">
              <div title="序号">
                序号
              </div>
              <div title="用户昵称">
                用户昵称
              </div>
              <div title="用户账号">
                用户账号
              </div>
              <div title="食物名称">
                食物名称
              </div>
              <div title="创建时间">
                创建时间
              </div>
              <div title="数量">
                数量
              </div>
              <div title="单位">
                单位
              </div>
              <div title="食物图片">
                食物图片
              </div>
              <div title="蛋白质">
                蛋白质
              </div>
              <div title="脂肪">
                脂肪
              </div>
              <div title="碳水化合物">
                碳水化合物
              </div>
            </li>
            <li class="dataLi" v-show="dataList.length > 0" v-for="(item,index) in dataList" :key="index">
              <div>
                {{index + 1}}
              </div>
              <div>
                {{item.nikeName | strFun}}
              </div>
              <div>
                {{item.account | strFun}}
              </div>
              <div>
                {{item.name | strFun}}
              </div>
              <div>
                {{item.createDate | timeFun}}
              </div>
              <div>
                {{item.quantity | strFun}}
              </div>
              <div>
                {{item.unit | strFun}}
              </div>
              <div id="foodImg">
                <img @click="lookBigImgClick(index,dataList)" v-show="item.itemImage" :src="item.itemImage" alt="">
                <div v-show="!item.itemImage">
                  暂无图片
                </div>
              </div>
              <div>
                {{item.protein | strFun}}
              </div>
              <div>
                {{item.fat | strFun}}
              </div>
              <div>
                {{item.carbohydrate | strFun}}
              </div>
            </li>
            <li class="noList" v-show="dataList.length == 0">
              <div>
                <img src="/static/img/w.png" alt="">
              </div>
            </li>
          </ul>
          <div class="lastLi" v-show="dataList.length > 0">
            <div class="batchDelete">
              <!-- 批量删除 -->
            </div>
            <div>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看大图弹框 -->
    <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
      <transition name="slide-fade">
        <div class="addContent" v-show="addShow" v-loading="adding">
          <div class="addTitle">
            <div></div>
            <div @click="closeClick">
              <img src="/static/img/小叉号@2x.png" alt="">
            </div>
          </div>
          <div class="addData">
            <div>
              <img :src="imgUrl" alt="">
            </div>
          </div>
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
      adding: false, //控制添加弹出框加载,
      timeStartVal: "", //选择开始时间Model
      timeEndVal: "", //选择结束时间Model
      imgUrl: "", //存储大图路径
      dataList: [], //单位列表
      unitNameVal: "",
      isAddPopup: true, //控制添加弹出框显示时的样式
      isShowAdd: true, //控制添加弹出框显示隐藏
      addShow: false, //控制添加弹出框显示
      pageSizeNum: 10, //每页显示的条数
      currentPage: 1, //当前页
      totalNum: 1, //总条数
      loading: false, //页面加载
      titlename: "", //删除弹框提示语
      isdelPopup: true, //控制删除弹出框显示样式
      isShowdel: true, //控制删除弹出框显示隐藏
      delShow: false, //控制删除弹出框显示隐藏
      createTimeVal: Date.parse(new Date()) //创建时间Model
    };
  },
  // 过滤
  filters: {
    //分类名称过滤
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "-";
      }
    },
    //时间过滤函数
    timeFun: function(val) {
      if (val) {
        var now = new Date(val);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        var date = now.getDate();
        date = date > 9 ? date : "0" + date;
        var hour = now.getHours();
        hour = hour > 9 ? hour : "0" + hour;
        var minute = now.getMinutes();
        minute = minute > 9 ? minute : "0" + minute;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
      } else {
        return "-";
      }
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
        if (ele.name == "饮食管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("customFood") == -1) {
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
        self.listFun();
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
    // 获取数据
    listFun() {
      var self = this;
      self.loading = true;
      self
        .getfoodCustomerFoodSelectCustomerFood({
          pageSize: self.pageSizeNum,
          pageNo: self.currentPage
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.dataList = data.data.records;
                  self.totalNum = data.data.total;
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
    //查看食物大图
    lookBigImgClick(index) {
      var self = this;
      self.isShowAdd = false;
      self.addShow = true;
      self.imgUrl = self.dataList[index].topImage;
    },
    // 关闭查看大图弹框
    closeClick() {
      var self = this;
      self.isShowAdd = true;
      self.addShow = false;
    },
    //分页
    handleSizeChange(val) {
      var self = this;
      this.pageSizeNum = val;
      self.listFun();
    },
    handleCurrentChange(val) {
      var self = this;
      this.currentPage = val;
      self.listFun();
    },
    // 开始时间
    beginTime() {
      var self = this;
    },
    //结束时间
    overtime() {},
    // 提交日期格式化
    startEndFun(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      i = t.getMinutes();
      s = t.getSeconds();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    },
    clanleClick() {
      var self = this;
      this.currentPage = 1;
      self.listFun();
    },
    // 搜索
    searchClick() {
      var self = this;
      if (self.timeEndVal - self.timeStartVal <= 0) {
        self.$message({
          type: "info",
          message: "开始时间必须大于结束时间"
        });
      } else {
        var self = this;
        self.loading = true;
        self
          .getfoodCustomerFoodSelectCustomerFood({
            pageSize: self.pageSizeNum,
            pageNo: 1,
            startTime: self.startEndFun(self.timeStartVal),
            endTime: self.startEndFun(self.timeEndVal)
          })
          .then(data => {
            self.loading = false;
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length > 0) {
                    self.dataList = data.data.records;
                    self.totalNum = data.data.total;
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
      }
    },
    ...mapActions([
      "getfoodCustomerFoodSelectCustomerFood",
      "getfoodMeasurementUnitAddOrUpdate",
      "getfoodMeasurementUnitDelete"
    ])
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

/* 搜索 */

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  height: 32px;
}
.cancelBut {
  background-color: #ccc !important;
}
.searchBut {
  margin-left: 15px;
  width: 70px;
  height: 32px;
  background-color: #5acdfa;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  /* margin-bottom: 20px; */
}

/* 添加弹出框 */

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

.showAdd {
  display: none;
}

.addData {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.addData > div {
  height: 460px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 500px;
  border: 5px solid #d1d1d1;
}
.addData > div img {
  max-width: 100%;
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

.addBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
  margin-left: 30%;
}

.addBut > .but {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 50px;
}

.addBut > div:nth-child(3) {
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
  text-align: center;
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

/* .addContent .addTitle div:nth-child(1) {
  display: flex;
} */

.addContent .addTitle div:nth-child(2) {
  margin-left: 530px;
  cursor: pointer;
}

.addTitle div:nth-child(2) img {
  width: 25px;
  height: 25px;
}

.noList {
  height: 400px !important;
}

.listContent .noList > div:nth-child(1) {
  width: 607px !important;
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

.unit > div {
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

li > div:nth-child(1) {
  border-left: 1px solid #f2f4f8;
}

.firstLi div:nth-child(1) {
  width: 5%;
}

.firstLi div {
  width: 10%;
}

.listContent ul {
  border-top: 1px solid #ececec;
}

.listContent li {
  display: flex;
  height: 50px;
}

.listContent li div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listContent .firstLi > div,
.listContent .dataLi > div {
  text-align: center;
  line-height: 49px;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

#foodImg img {
  width: 70px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.listContent li > div:nth-child(1) {
  width: 5%;
}

.listContent .dataLi > div:nth-child(2) {
  width: 10%;
}

.listContent li > div:nth-child(3) {
  width: 10%;
}

.listContent li > div:nth-child(4) {
  width: 10%;
}

.listContent li > div:nth-child(5) {
  width: 10%;
}

.listContent li > div:nth-child(6) {
  width: 5%;
}

.listContent li > div:nth-child(7) {
  width: 10%;
}

.listContent li > div:nth-child(8) {
  width: 10%;
}

.listContent li > div:nth-child(9) {
  width: 10%;
}

.listContent li > div:nth-child(10) {
  width: 10%;
}

.listContent li > div:nth-child(11) {
  width: 10%;
}

.listContent li > div:nth-child(4) div {
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

.listTitle > div:nth-child(1) {
  float: left;
  color: #303030;
  font-size: 16px;
  font-weight: 600;
}

.listTitle > div:nth-child(2) {
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

.menuLeft div:nth-child(2) {
  margin-left: 10px;
  margin-right: 10px;
  /* margin-top: 8px; */
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

select::-ms-expand {
  display: none;
}
</style>