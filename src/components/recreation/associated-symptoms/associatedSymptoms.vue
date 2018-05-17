<!--症状关联-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <div class="listTop">
            症状关联
            <div id="listTopRight" @click='addClick'>新增关联</div>
        </div>
        <div class="searchBox">
            <input type="text" v-model='foodseek' placeholder="请输入指标名称" />
            <div class="searchButton" @click='searchClick'>搜索</div>
        </div>
        <div class="symptomList">
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
                                指标
                            </div>
                            <div>
                                类型
                            </div>
                            <div>
                                时段
                            </div>
                            <div>
                                建议食谱
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <div v-show="nodata" class="nodataBox">
                            <img src="/static/img/w.png" alt="">
                        </div>
                        <li class="dataLi" v-for="(item,index) in foodItems" v-show='havedata'>
                            <div>
                                {{index+1}}
                            </div>
                            <div>
                                {{item.dictionaryName || '-'}}
                            </div>
                            <div>
                                {{item.status || '-'}}
                            </div>
                            <div>
                                {{item.type || '-'}}
                            </div>
                            <div>
                                <el-tooltip :disabled="item.suggestName && item.suggestName.length > 8 ? false : true" popper-class="toolexam" :content="item.suggestName"
                                    placement="bottom" effect="light">
                                    <div id="classFlx">
                                        {{item.suggestName || '-'}}
                                    </div>
                                </el-tooltip>
                            </div>
                            <div>
                                <div class="compile" @click='compileSymptom(index)'></div>
                                <div class="remove" @click='removeSymptom(index)'></div>
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
            <div class="removes">
                <div class="questionMark">
                    <div></div>
                </div>
                <div class="deletePrompt">相关症状将被删除，该操作无法恢复！</div>
                <div class="operatingButton">
                    <div class="operatingButtonBox">
                        <div class="fine" @click='fine()'>好</div>
                        <div class="abolish" @click='abolish'>取消</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      foodItems: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 15,
      remove: false,
      foodseek: "",
      foodseekOk: "",
      pagination: true,
      nodata: false,
      havedata: true,
      isListUp: true,
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
    //    初始化列表
    let self = this;
    if (sessionStorage.getItem("associatedPag")) {
      var objag = JSON.parse(sessionStorage.getItem("associatedPag"));
      this.currentPage = objag.currentPage;
      this.pageSizeNum = objag.pageSizeNum;
      this.foodseek = objag.foodseek;
      if (this.foodseek != "") {
        this.okUpShow = true;
        this.foodseekOk = this.foodseek;
      } else {
        this.okUpShow = false;
        this.foodseekOk = this.foodseek = "";
      }
    }
    self.getListFun();
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
      if (arrs.indexOf("associatedSymptoms") == -1) {
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
    searchClick() {
      if (this.foodseek != "") {
        this.okUpShow = true;
        this.foodseekOk = this.foodseek;
      } else {
        this.okUpShow = false;
        this.foodseekOk = "";
      }
      this.currentPage = 1;
      this.pageSizeNum = 10;
      this.getListFun();
    },
    // 获取列表
    getListFun() {
      if (this.isListUp) {
        this.isListUp = false;
        let self = this;
        self
          .getSeekAssociatedSymptoms({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            dictionaryName: self.foodseekOk
          })
          .then(data => {
            self.isListUp = true;
            if (data.code == 200) {
              sessionStorage.removeItem("associatedPag");
              self.pagination = true;
              self.nodata = false;
              self.havedata = true;
              self.foodItems = data.data.records;
              self.totalNum = data.data.total;
              for (var i = 0; i < self.foodItems.length; i++) {
                if (self.foodItems[i].status == "-1") {
                  self.foodItems[i].status = "偏低";
                } else {
                  self.foodItems[i].status = "偏高";
                }
              }
              for (var i = 0; i < self.foodItems.length; i++) {
                if (self.foodItems[i].type == "1") {
                  self.foodItems[i].type = "早餐";
                }
                if (self.foodItems[i].type == "2") {
                  self.foodItems[i].type = "中餐";
                }
                if (self.foodItems[i].type == "3") {
                  self.foodItems[i].type = "晚餐";
                }
                if (self.foodItems[i].type == "4") {
                  self.foodItems[i].type = "加餐";
                }
              }
            } else {
              self.pagination = false;
              self.nodata = true;
              self.havedata = false;
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.isListUp = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 点击分页
    handleSizeChange(val) {
      if (this.okUpShow == false) {
        this.foodseekOk = this.foodseek = "";
      } else {
        this.foodseek = this.foodseekOk;
      }
      this.pageSizeNum = val;
      this.getListFun();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleCurrentChange(val) {
      if (this.okUpShow == false) {
        this.foodseekOk = this.foodseek = "";
      } else {
        this.foodseek = this.foodseekOk;
      }
      this.currentPage = val;
      this.getListFun();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    // 新增症状
    addClick() {
      this.$router.push({
        path: "addAssociatedSymptoms"
      });
      var foodseekVal = "";
      if (this.okUpShow) {
        foodseekVal = this.foodseekOk;
      }
      var obj = {
        currentPage: this.currentPage,
        pageSizeNum: this.pageSizeNum,
        foodseek: foodseekVal
      };
      var srt = JSON.stringify(obj);
      sessionStorage.setItem("associatedPag", srt);
    },
    //编辑症状
    compileSymptom(index) {
      var self = this;
      self.delId = self.foodItems[index];
      var edata = JSON.stringify(self.delId);
      sessionStorage.setItem("edata", edata);
      this.$router.push({
        path: "compileAssociatedSymptoms"
      });
      var foodseekVal = "";
      if (this.okUpShow) {
        foodseekVal = this.foodseekOk;
      }
      var obj = {
        currentPage: this.currentPage,
        pageSizeNum: this.pageSizeNum,
        foodseek: foodseekVal
      };
      var srt = JSON.stringify(obj);
      sessionStorage.setItem("associatedPag", srt);
    },
    //删除症状
    removeSymptom(index) {
      var self = this;
      self.remove = true;
      self.delId = self.foodItems[index].id;
    },
    //确认删除
    fine() {
      let self = this;
      self
        .getRemoveAssociatedSymptoms({
          id: self.delId,
          token: self.token
        })
        .then(data => {
          if (data.code == 200) {
            self.remove = false;
            self.getListFun();
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
            message: "服务器异常"
          });
        });
    },
    //取消删除
    abolish() {
      this.remove = false;
    },

    ...mapActions([
      "getAssociatedSymptoms",
      "getRemoveAssociatedSymptoms",
      "getAmendAssociatedSymptoms",
      "getSeekAssociatedSymptoms",
      "getListResRole"
    ])
  },
  // 监视
  watch: {
    foodseek: function(val) {
      var self = this;
      if (val.length == 0) {
        self.foodseekOk = ''
        self.pageSizeNum = 10
        this.getListFun();
      }
    }
  }
};
</script>
<style scoped>
.listTop {
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

#listTopRight {
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

.symptomList {
  width: calc(100% - 72px);
  margin-top: 24px;
  margin-left: 36px;
}

.listCont {
  width: 100%;
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
  height: 50px;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #515151;
  height: 50px;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 12%;
  overflow: hidden;
  min-width: 109px;
  display: flex;
}

.listCont .dataLi > div:nth-child(2) {
  width: 18%;
  overflow: hidden;
  padding: 7px;
  min-width: 100px;
}

.listCont .firstLi > div:nth-child(2) {
  width: 18%;
  padding: 7px;
  padding-top: 0;
  min-width: 100px;
}

.listCont li > div:nth-child(3) {
  width: 18%;
  min-width: 100px;
}

.listCont li > div:nth-child(4) {
  width: 12%;
  min-width: 109px;
}

.listCont li > div:nth-child(5) {
  width: 22%;
  min-width: 100px;
}

.listCont li > div:nth-child(6) {
  width: 18%;
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

.remove {
  width: 25px;
  height: 25px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 29% 37%;
  cursor: pointer;
  margin-left: 32px;
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

.removes {
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

.paging {
  width: calc(100% - 36px);
  float: left;
  margin-bottom: 28px;
  margin-top: 28px;
}

.lastLiRight {
  float: right;
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

#classFlx {
  padding: 0 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>