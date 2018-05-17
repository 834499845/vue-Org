<!--食物管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <div class="listTitle">
            食物管理
            <div id="addFood" @click='addClick'>新增食物</div>
        </div>
        <div class="searchBox">
            <input type="text" v-model='foodseek' placeholder="请输入食物名称"/>
            <div class="searchButton" @click='searchClick'>搜索</div>
            <div class="searchButton cancelsearchButton" @click='cancelsearchClick'>重置</div>
        </div>
        <div v-show="dataList.length == 0" class="noList">
            <img src="/static/img/w.png" alt="图片加载失败">
        </div>        
        <div class="foodControlList" v-for='(item,index) in dataList' :key="index" v-show='haveData'>
            <div class="trigon">
                <div class="trigonCH">{{index+1}}</div>
            </div>
            <div class="foodListOne">
                <div class="foodName">食物名称：{{item.name}}</div>
                <div id="foodPicture" v-show='imgItem'>
                    <img :src="item.itemImage" />
                </div>
            </div>
            <div class="weightStandard">重量标准：
                <input type="text" class='weightVariety' v-model='item.weightStandardName' readonly="readonly" />
            </div>
            <div class="foodComposition">
                <ul>
                    <li v-show="foodList.amount != -1" v-for='(foodList,index) in item.foodComponentControllerDTOList' :key="index">
                        <div class="foodTitle">{{foodList.name}}：</div>
                        <div class="heats">{{foodList.amount}}</div>
                        <span>{{foodList.unit}}</span>
                    </li>
                </ul>
            </div>
            <div class="foodUnit">
                <div>计量单位：</div>
                <div class="foodUnit-right">
                  <ul>
                    <li v-show="item.foodUnitDTOList.length > 0" v-for='(tDTOList,tDTOListindex) in item.foodUnitDTOList' :key="tDTOListindex">
                      <div>{{tDTOList.unitName}}</div>
                      <div>{{tDTOList.unitValue}}克</div>
                    </li>
                    <li v-show="item.foodUnitDTOList.length == 0">
                      <div>暂无单位</div>
                    </li>
                  </ul>
                </div>
            </div>
            <div class="foodWindow">
                <div class="windowTitle">食物亮点：&nbsp;&nbsp;&nbsp;{{item.instruction}}</div>
            </div>
            <div class="halvingLine"></div>
            <div class="foodoPeration">
                <div class="foodRemove" @click='foodRemove(index)'></div>
                <div class="foodCompile" @click='gonext(index)'></div>
            </div>
        </div>
        <div class="paging" v-show='dataList.length !=0 '>
            <div class="lastLiRight">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 30, 40]"
                    :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                </el-pagination>
            </div>
        </div>
        <!--删除弹出框-->
        <div class="removeBox" v-show='remove'>
            <div class="remove">
                <div class="questionMark">
                    <div></div>
                </div>
                <div class="deletePrompt">食物将被删除，该操作无法恢复！</div>
                <div class="operatingButton">
                    <div class="operatingButtonBox">
                        <div class="fine" @click='fine'>确认</div>
                        <div class="abolish" @click='abolish'>取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--不能删除已关联食物弹出框-->
        <!-- <div class="removeBox" v-show='Associatedfood'>
            <div class="remove">
                <div class="questionMark">
                    <div></div>
                </div>
                <div class="deletePrompt">该食物已关联食谱，无法删除！</div>
                <div class="operatingButton">
                    <div class="operatingButtonBox">
                        <div class="iknow" @click='iknow'>我知道了</div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      haveData: true,
      foodWlys: true,
      dataList: [],
      removeId: "",
      pageSizeNum: 15,
      currentPage: 1,
      totalNum: 15,
      remove: false,
      imgItem: true,
      foodseek: "",
      foodseekOk: "",
      Associatedfood: false,
      okUpShow: false
    };
  },
  // 过滤
  filters: {
    ctimeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0 " + month;
      var date = now.getDate();
      date = date > 9 ? date : "0 " + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0 " + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0 " + minute;
      return (
        "20 " + year + "- " + month + "- " + date + " " + hour + ": " + minute
      );
    }
  },
  // 模块新建时
  created: function() {
    if (sessionStorage.getItem("footPag")) {
      var foot = JSON.parse(sessionStorage.getItem("footPag"));
      this.pageSizeNum = foot.pageSizeNum;
      this.currentPage = foot.currentPage;
      this.foodseek = foot.foodseek;
      if (foot.foodseek != "") {
        this.okUpShow = true;
        this.foodseekOk = this.foodseek;
      } else {
        this.okUpShow = false;
        this.foodseekOk = this.foodseek = "";
      }
    }
    let self = this;
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
      if (arrs.indexOf("food") == -1) {
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
        this.getList();
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
    cancelsearchClick() {
      this.foodseek = "";
      this.foodseekOk = this.foodseek;
      this.currentPage = 1;
      this.pageSizeNum = 15;
      this.getList();
    },
    // 搜索列表
    searchClick() {
      if (this.foodseek == "") {
        this.okUpShow = false;
        this.foodseekOk = "";
      } else {
        this.okUpShow = true;
        this.foodseekOk = this.foodseek;
      }
      this.currentPage = 1;
      this.pageSizeNum = 15;
      this.getList();
    },
    //获取列表
    getList() {
      let self = this;
      self
        .getfoodFoodFindFoodByPageNoAndPageSize({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          name: self.foodseekOk
        })
        .then(data => {
          if (data.code == 200) {
            sessionStorage.removeItem("footPag");
            self.haveData = true;
            self.dataList = data.data.records;
            self.totalNum = data.data.total;
            for (var i = 0; i < self.dataList.length; i++) {
              if (self.dataList[i].status == "-1") {
                self.dataList[i].status = "偏低";
              } else {
                self.dataList[i].status = "偏高";
              }
            }
          } else {
            self.haveData = false;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //搜索食物列表
    foodSeek() {},
    // 新增食物
    addClick() {
      this.$router.push({
        path: "addFood"
      });
      var nameSelect = "";
      if (this.okUpShow) {
        nameSelect = this.foodseekOk;
      }
      var obj = {
        currentPage: this.currentPage,
        pageSizeNum: this.pageSizeNum,
        foodseek: nameSelect
      };
      var str = JSON.stringify(obj);
      sessionStorage.setItem("footPag", str);
    },
    //编辑食物
    gonext(index) {
      this.delId = this.dataList[index];
      this.editData = this.delId;
      var foodData = JSON.stringify(this.editData);
      sessionStorage.setItem("foodData", foodData);
      var nameSelect = "";
      if (this.okUpShow) {
        nameSelect = this.foodseekOk;
      }
      var obj = {
        currentPage: this.currentPage,
        pageSizeNum: this.pageSizeNum,
        foodseek: nameSelect
      };
      var str = JSON.stringify(obj);
      sessionStorage.setItem("footPag", str);
      this.$router.push({
        path: "compileFood"
      });
    },
    //删除食物
    foodRemove(index) {
      this.removeId = this.dataList[index].foodId;
      this.remove = true;
    },
    //确认删除
    fine() {
      var self = this;
      this.getfoodFoodDelete({
        id: self.removeId
      })
        .then(data => {
          self.remove = false;
          if (data.code == 200) {
            self.$message({
              type: "success",
              message: "删除成功"
            });
            self.getList();
          } else {
            self.Associatedfood = true;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.remove = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //取消删除
    abolish() {
      this.remove = false;
    },
    iknow() {
      this.Associatedfood = false;
    },
    // 点击分页
    handleSizeChange(val) {
      if (this.okUpShow == false) {
        this.foodseek = this.foodseekOk = "";
      } else {
        this.foodseek = this.foodseekOk;
      }
      this.pageSizeNum = val;
      this.getList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleCurrentChange(val) {
      if (this.okUpShow == false) {
        this.foodseek = this.foodseekOk = "";
      } else {
        this.foodseek = this.foodseekOk;
      }
      this.currentPage = val;
      this.getList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    ...mapActions([
      "getfoodFoodFindFoodByPageNoAndPageSize",
      "getfoodFoodDelete",
      "getSeekfoodControl",
      "getListResRole"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.listTitle {
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
  z-index: -1;
}

#addFood {
  float: right;
  width: 80px;
  height: 24px;
  border-radius: 4px;
  color: #ff6339;
  font-size: 14px;
  border: 1px solid #ff6339;
  line-height: 24px;
  text-align: center;
  margin-top: 12px;
  cursor: pointer;
}

.foodControlList {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
  margin-top: 24px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.trigon {
  width: 0;
  height: 0;
  border-width: 20px;
  border-color: #ff6339 transparent transparent #ff6339;
  border-style: solid;
  border-top-left-radius: 4px;
  position: relative;
}

.trigonCH {
  position: absolute;
  left: -12px;
  right: 0;
  top: -15px;
  bottom: 0;
  color: #ffffff;
  font-size: 14px;
}

.foodListOne {
  width: 100%;
  float: left;
}

.foodName {
  float: left;
  margin-left: 70px;
  margin-top: 10px;
}

#foodPicture {
  float: right;
  margin-right: 200px;
  width: 72px;
  height: 72px;
  border-radius: 4px;
  background-color: #ffffff;
  margin-top: -18px;
}

#foodPicture img {
  width: 128px;
  height: 78px;
  border-radius: 4px;
}

.pullDown {
  width: 18px;
  height: 10px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 72% 69%;
  float: right;
  margin-right: 36px;
  transform: rotate(180deg);
}

.weightStandard {
  width: 100%;
  float: left;
  margin-left: 70px;
  margin-top: 24px;
}

.weightVariety {
  margin-left: 12px;
  width: 177px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  text-align: center;
}

.weightInput {
  margin-left: 12px;
  width: 114px;
  height: 32px;
  border: 1px solid #8f8e94;
  border-radius: 4px;
  text-align: center;
}

.foodComposition {
  width: 100%;
  margin-top: 120px;
  margin-left: 50px;
  overflow: hidden;
}

.foodTitle {
  display: inline-block;
  width: 90px;
  height: 32px;
  text-align: right;
  line-height: 32px;
}

.foodComposition span {
  color: #cccccc;
  padding-left: 12px;
}

.foodComposition ul {
  width: 89%;
  overflow: hidden;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.foodComposition ul li {
  width: 33%;
  margin-top: 20px;
  min-width: 250px;
}

.heats {
  display: inline-block;
  width: 90px;
  height: 32px;
  border: 1px solid #d1d1d1;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 12px;
}

.foodWindow {
  width: 100%;
  float: left;
  margin-top: 36px;
  margin-left: 70px;
  margin-bottom: 24px;
}
.foodUnit-right li > div:nth-child(1) {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 32px;
  min-width: 50px;
  text-align: center;
  line-height: 32px;
  padding-left: 7px;
  padding-right: 7px;
}
.foodUnit-right li > div:nth-child(2) {
  border-radius: 4px;
  height: 32px;
  min-width: 50px;
  line-height: 32px;
  margin-left: 7px;
}
.foodUnit-right li {
  display: flex;
  width: 20%;
  /* border: 1px solid red; */
}
.foodUnit-right ul {
  /* border: 1px solid red; */
  display: flex;
  width: 100%;
  align-items: center;
}
.foodUnit-right {
  width: 70%;
  margin-left: 15px;
}
.foodUnit > div:nth-child(1) {
  height: 40px;
}
.foodUnit {
  width: 89%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 40px;
  overflow: hidden;
  /* margin-top: 36px; */
  margin-left: 70px;
  margin-top: 25px;
  /* margin-bottom: 24px; */
}

.halvingLine {
  width: calc(100% - 72px);
  float: left;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 28px;
  margin-left: 36px;
}

.foodoPeration {
  width: calc(100% - 36px);
  float: left;
  margin-top: 10px;
  margin-bottom: 32px;
}

.foodCompile {
  width: 25px;
  height: 25px;
  float: right;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 20% 37%;
  cursor: pointer;
  margin-right: 20px;
}

.foodRemove {
  width: 25px;
  height: 25px;
  float: right;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 29% 37%;
  cursor: pointer;
}

.paging {
  width: calc(100% - 36px);
  float: left;
  margin-bottom: 28px;
  margin-top: 28px;
}

.lastLiRight {
  float: right;
}

/*删除弹出框*/

.removeBox {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
}

.remove {
  width: 525px;
  height: 285px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 25%;
  animation: removeAnimate 0.8s linear forwards;
}

@keyframes removeAnimate {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.questionMark {
  width: 100%;
  margin-top: 36px;
}

.questionMark > div {
  width: 50px;
  height: 50px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 82% 75%;
  margin: 0 auto;
}

.deletePrompt {
  width: 100%;
  margin-top: 24px;
  font-size: 22px;
  color: #ff6339;
  text-align: center;
}

.operatingButton {
  width: 100%;
  margin-top: 48px;
}

.operatingButtonBox {
  width: 38%;
  margin: 0 auto;
}

.abolish {
  width: 68px;
  height: 30px;
  background-color: #d1d1d1;
  border-radius: 4px;
  float: left;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  cursor: pointer;
  margin-left: 48px;
}

.fine {
  width: 68px;
  height: 30px;
  background-color: #ff6339;
  border-radius: 4px;
  float: left;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  cursor: pointer;
}

.searchBox {
  width: 100%;
  margin-top: 24px;
  margin-left: 36px;
}

.searchBox input {
  float: left;
  width: 175px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #303030;
  padding-left: 12px;
}
.cancelsearchButton {
  background-color: #ccc !important;
}
.searchButton {
  width: 68px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  background-color: #f66037;
  border-radius: 4px;
  color: #ffffff;
  margin-left: 20px;
  display: inline-block;
  cursor: pointer;
}

.noList {
  width: 100%;
  margin-top: 250px;
  position: relative;
  height: 100%;
}

.noList img {
  margin: auto auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.iknow {
  width: 108px;
  height: 30px;
  background-color: #fe4848;
  border-radius: 4px;
  float: left;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #ffffff;
  cursor: pointer;
  margin-left: 48px;
}
</style>