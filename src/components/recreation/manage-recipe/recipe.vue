<!--食物管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" class="sale">
    <div class="foodControl">
      食谱管理
      <div id="addFood" @click='addFood'>新增食谱</div>
    </div>
    <div class="foodSeek">
      <input type="text" v-model='foodseek' placeholder="请输入食谱名称" />
      <div class="seekButton" @click='foodSeek'>搜索</div>
    </div>
    <div class="symptomList" v-loading="loading">
      <div class="list">
        <div class="listCont">
          <ul>
            <li class="firstLi">
              <div class="checkBoxCl">
                <div>
                  序号
                </div>
              </div>
              <div>
                名称
              </div>
              <div>
                食物
              </div>
              <div>
                时段
              </div>
              <div>
                操作
              </div>
            </li>
            <div v-show="nodata" class="nodataBox">
              <img src="/static/img/w.png" alt="">
            </div>
            <li class="dataLi" v-for="(item,index) in foodItems" :key="index" v-show='haveData'>
              <div>
                {{index+1}}
              </div>
              <div>
                {{item.name || '-'}}
              </div>
              <div>
                {{item.combinationName || '-'}}
              </div>
              <div>
                {{item.type || '-'}}
              </div>
              <div>
                <div class="compile" @click='gonext(index)'></div>
                <div class="removesa" @click='foodRemove(index)'></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="paging" v-show='pagination'>
      <div class="lastLiRight">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
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
        <div class="deletePrompt">食谱将被删除，该操作无法恢复！</div>
        <div class="operatingButton">
          <div class="operatingButtonBox">
            <div class="fine" @click='fine'>好</div>
            <div class="abolish" @click='abolish'>取消</div>
          </div>
        </div>
      </div>
    </div>
    <div class="removeBox" v-show='noRemove'>
      <div class="remove">
        <div class="questionMark">
          <div></div>
        </div>
        <div class="deletePrompt">食谱已经与指标做关联，请先删除指标食谱关系</div>
        <div class="operatingButton">
          <div class="operatingButtonBoxs">
            <div class="fines" @click='iknow'>我知道了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      foodItems: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 15,
      remove: false,
      loading: false,
      foodseek: "",
      pagination: true,
      nodata: false,
      haveData: true,
      noRemove: false,
      foodseekTrueOrFalse: true,
      food: false,
      delIndex: 0
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
    let self = this;

    self.token = sessionStorage.token;
    this.currentPage = Number(sessionStorage.getItem("currentPages"));
    self.token = sessionStorage.token;
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
      if (arrs.indexOf("recipe") == -1) {
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
        if (sessionStorage.getItem("foodSeek")) {
          self.foodseek = sessionStorage.getItem("foodSeek");
          self.foodSeek();
        } else {
          self.getList();
        }
        self.food = false;
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
    // 搜索列表
    foodSeek() {
      let self = this;
      self.food = true;
      if (self.foodseekTrueOrFalse == true) {
        self.foodseekTrueOrFalse = false;
        self
          .getSeekRecipesList({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            name: self.foodseek,
            token: self.token
          })
          .then(data => {
            self.foodseekTrueOrFalse = true;
            if (data.code == 200) {
              sessionStorage.removeItem("currentPages");
              self.loading = false;
              self.pagination = true;
              self.nodata = false;
              self.haveData = true;
              self.foodItems = data.data.records;
              self.totalNum = data.data.total;
              for (var i = 0; i < self.foodItems.length; i++) {
                if (self.foodItems[i].type == 1) {
                  self.foodItems[i].type = "早餐";
                }
                if (self.foodItems[i].type == 2) {
                  self.foodItems[i].type = "午餐";
                }
                if (self.foodItems[i].type == 3) {
                  self.foodItems[i].type = "晚餐";
                }
                if (self.foodItems[i].type == 4) {
                  self.foodItems[i].type = "加餐";
                }
              }
            } else {
              self.pagination = false;
              self.nodata = true;
              self.haveData = false;
              self.$message({
                type: "info",
                message: data.message
              });
            }
            sessionStorage.removeItem("foodSeek");
          })
          .catch(msg => {
            self.foodseekTrueOrFalse = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //获取列表
    getList() {
      var self = this;
      self.loading = true;
      console.log("1");
      //初始化食物管理列表
      self
        .getRecipesList({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          token: self.token
        })
        .then(data => {
          if (data.code == 200) {
            // console.log(data.data.records, '食物')
            sessionStorage.removeItem("currentPages");
            self.loading = false;
            self.totalNum = data.data.total;
            self.foodItems = data.data.records;
            for (var i = 0; i < self.foodItems.length; i++) {
              if (self.foodItems[i].type == 1) {
                self.foodItems[i].type = "早餐";
              }
              if (self.foodItems[i].type == 2) {
                self.foodItems[i].type = "午餐";
              }
              if (self.foodItems[i].type == 3) {
                self.foodItems[i].type = "晚餐";
              }
              if (self.foodItems[i].type == 4) {
                self.foodItems[i].type = "加餐";
              }
            }
          } else {
            self.pagination = false;
            self.nodata = true;
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
    // 新增食物
    addFood() {
      this.$router.push({
        path: "addRecipe"
      });
    },
    gonext(index) {
      this.delId = this.foodItems[index];
      this.editData = this.delId;
      var edata = JSON.stringify(this.editData);
      sessionStorage.setItem("edata", edata);
      sessionStorage.setItem("currentPages", this.currentPage);
      sessionStorage.setItem("foodSeek", this.foodseek);
      this.$router.push({
        path: "compileRecipe"
      });
    },
    //删除食物
    foodRemove(index) {
      var self = this;
      this.remove = true;
      this.delIndex = index;
    },
    //确认删除
    fine() {
      var self = this;
      this.removeId = this.foodItems[this.delIndex].id;
      self
        .getfoodRecipesDelete({
          id: self.removeId,
          token: self.token
        })
        .then(data => {
          self.remove = false;
          if (data.code == 200) {
            self.$message({
              type: "info",
              message: "删除成功"
            });
            self.getList();
          } else {
            self.noRemove = true;
            // self.$message({
            //   type: "info",
            //   message: data.message
            // });
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
    iknow() {
      this.noRemove = false;
    },
    //取消删除
    abolish() {
      this.remove = false;
    },
    // 点击分页
    handleSizeChange(val) {
      // console.log(val)
      this.pageSizeNum = val;
      if (this.food == true) {
        this.foodSeek();
      } else {
        this.getList();
      }
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.food == true) {
        this.foodSeek();
      } else {
        this.getList();
      }
      //   this.getList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    ...mapActions([
      "getRecipesList",
      "getfoodRecipesDelete",
      "getSeekRecipesList",
      "getListResRole"
    ])
  },
  // 监视
  watch: {
    foodseek: function(val) {
      var self = this;
      if (val.length == 0) {
        this.getList();
      }
    }
  }
};
</script>
<style scoped>
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
  float: left;
  margin-left: 24px;
  width: 72px;
  height: 72px;
  border-radius: 4px;
  background-color: #ffffff;
  margin-top: -18px;
}

#foodPicture img {
  width: 72px;
  height: 72px;
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
  border: 1px solid #8f8e94;
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
  margin-top: 40px;
  margin-left: 100px;
}

.foodTitle {
  display: inline-block;
  width: 90px;
  height: 32px;
  text-align: right;
  line-height: 32px;
}

.foodComposition input {
  width: 80px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  text-align: center;
  margin-left: 12px;
}

.foodComposition span {
  color: #cccccc;
  padding-left: 12px;
}

.protein {
  margin-left: 24px;
}

#protein {
  margin-left: 11px;
}

.foodComposition ul {
  width: 100%;
  min-width: 1280px;
  float: left;
  margin-left: -50px;
}

.foodComposition ul:nth-child(1) {
  margin-left: -50px;
}

.foodComposition ul:nth-child(5) {
  margin-left: -50px;
}

.foodComposition ul li {
  margin-top: 24px;
  float: left;
}

.foodWindow {
  width: 100%;
  float: left;
  margin-top: 36px;
  margin-left: 70px;
  margin-bottom: 24px;
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

.operatingButtonBoxs {
  width: 38%;
  margin-left: 225px;
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

.fines {
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

.symptomList {
  width: calc(100% - 72px);
  margin-top: 24px;
  margin-left: 36px;
}

.listCont li {
  display: flex;
  /*border: 1px solid red;*/
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.checkCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
  margin-left: 20px;
}

.checkCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.checkCl > div:nth-child(3) {
  margin-left: 5px;
}

.checkCl > div:nth-child(3) span {
  height: 40px;
  margin-top: 1px;
  display: block;
  font-size: 15px;
}

.checkBoxCl {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkBoxCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  margin-top: 5px;
}

.checkBoxCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
  line-height: 50px;
}

.firstLi > div:nth-child(5) {
  min-width: 35px;
}

.firstLi > div:nth-child(6) {
  min-width: 35px;
}

.firstLi > div:nth-child(7) {
  min-width: 35px;
}

.firstLi > div:nth-child(8) {
  min-width: 35px;
}

.firstLi > div:nth-child(9) {
  min-width: 70px;
}

.firstLi > div:nth-child(10) {
  min-width: 70px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  color: #515151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataLi > div:last-child {
  display: flex;
  align-items: center;
  justify-content: center;
}

.listCont li > div:nth-child(1) {
  width: 12%;
  overflow: hidden;
  min-width: 109px;
  display: flex;
}

.listCont .dataLi > div:nth-child(2) {
  width: 20%;
  overflow: hidden;
  /* padding: 7px; */
  min-width: 100px;
}

.listCont .firstLi > div:nth-child(2) {
  width: 20%;
  /* padding: 7px; */
  padding-top: 0;
  min-width: 100px;
}

.listCont li > div:nth-child(3) {
  width: 28%;
  min-width: 100px;
}

.listCont li > div:nth-child(4) {
  width: 20%;
  min-width: 109px;
}

.listCont li > div:nth-child(5) {
  width: 20%;
  min-width: 100px;
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
  border: 1px solid #fe5371;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}

.compile {
  width: 25px;
  height: 25px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 20% 37%;
  cursor: pointer;
}

.removesa {
  width: 25px;
  height: 25px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 29% 37%;
  cursor: pointer;
  margin-left: 32px;
}

.foodSeek {
  width: 100%;
  margin-top: 24px;
  margin-left: 36px;
}

.foodSeek input {
  float: left;
  width: 175px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  color: #303030;
  padding-left: 12px;
}

.seekButton {
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

.nodataBox {
  width: 100%;
  margin-top: 250px;
  position: relative;
  height: 100%;
}

.nodataBox img {
  margin: auto auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>