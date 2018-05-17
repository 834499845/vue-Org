<!--部位管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    分享文案
                </div>
                <div @click="addClick">
                    新建文案
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div class="firstCheckBox">
                                <div>
                                    <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                </div>
                                <div>
                                    <span>序号</span>
                                </div>
                            </div>
                            <div>
                                文章
                            </div>
                            <div>
                                作者
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists" v-bind:key="index">
                            <div class="dataCheck">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="item.remarkContent">{{checkNull}}</el-checkbox>
                                </el-checkbox-group>
                                <div>
                                    {{index + 1}}
                                </div>
                            </div>
                            <div>
                                {{item.remarkContent |　strFun}}
                            </div>
                            <div>
                                {{item.remarkAuthor |　strFun}}
                            </div>
                            <div class="operate">
                                <div @click="updateClick(index)"><img src="/static/img/编辑.png"></div>
                                <div @click="deleteClick(index)"><img src="/static/img/删除.png"></div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="lists.length > 0">
                            <div class="lastLiLeft">
                            </div>
                            <div id="lastLiRight">
                                <el-pagination :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum" :current-page="currentPage" layout="total" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recycle" v-show="lists.length > 0">
                    <div @click="deletsClick">
                        删除
                    </div>
                </div>
            </div>
        </div>
        <!--添加弹出框-->
        <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding">
                    <div class="addTitle">
                    </div>
                    <div class="addNa">
                        <div>
                            作者：
                        </div>
                        <div>
                            <div>
                                <input type="text" v-model="remarkAuthorVal" :class="{redInput:isRedremarkAuthor,grayInput:isGrayremarkAuthor}" maxlength="20">
                            </div>
                            <div :class="{redTest:isRedremarkAuthor,grayTest:isGrayremarkAuthor}">
                                可输入20个字符
                            </div>
                        </div>
                    </div>
                    <div class="addTxt">
                        <div>
                            文案：
                        </div>
                        <div>
                            <div>
                                <textarea v-model="remarkContentVal" :class="{redInput:isRedremarkContent,grayInput:isGrayremarkContent}" maxlength="50">
                                    </textarea>
                            </div>
                            <div :class="{redTest:isRedremarkContent,grayTest:isGrayremarkContent}">
                                可输入50个字符
                            </div>
                        </div>
                    </div>
                    <div class="adBut">
                        <div @click="butAddClick">确定</div>
                        <div @click="cancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @del="delClick" @canle="cancelClcik" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/finessDel";
export default {
  components: {
    "v-storeDel": storeDel
  },
  data() {
    return {
      loading: false,
      checkNull: "",
      checked: false,
      checkList: [],
      lists: [],
      pageSizeNum: 4,
      currentPage: 1,
      totalNum: 0,
      deling: false,
      adding: false,
      remarkAuthorVal: "",
      isRedremarkAuthor: false,
      isGrayremarkAuthor: true,
      isremarkAuthor: false,
      remarkContentVal: "",
      isRedremarkContent: false,
      isGrayremarkContent: true,
      isremarkContent: false,
      isAddPopup: true,
      isShowAdd: true,
      addShow: false,
      upOrAd: 1,
      upIndex: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      idArr: [],
      delClickTrue: false,
      butAddClickTrue: false
    };
  },
  // filters
  filters: {
    timeFun: function(val) {
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
    },
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    }
  },
  // initialize function
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
        if (ele.name == "健身管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("shoredocuments") == -1) {
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
  // count property
  mounted() {},
  // incident function
  methods: {
    // initialize data
    listFun() {
      var self = this;
      self.loading = true;
      self.checkList = [];
      self.checked = false;
      // 列表
      self
        .getfitnesssloganselectShareSlogan({})
        .then(data => {
          self.loading = false;
          //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.lists = data.data;
                self.totalNum = data.data.length;
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
        })
        .catch(msg => {
          self.lists = [];
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // batch delete
    deletsClick() {
      var self = this;
      self.idArr = [];
      if (this.checkList.length > 0) {
        this.checkList.forEach(function(ele, index) {
          self.idArr.push(ele.id);
        });
        this.isShowdel = false;
        this.delShow = true;
        this.titlename = "文案";
      } else {
        self.$message({
          type: "info",
          message: "请选择文案!"
        });
      }
    },
    // selete all number
    numChange(event) {
      this.checkList = event.target.checked ? this.lists : [];
    },
    // click select number
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.lists.length;
    },
    // paging-pageNumber
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun();
    },
    //  paging-pageSize
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun();
    },
    // compile
    updateClick(index) {
      this.isShowAdd = false;
      this.addShow = true;
      this.remarkContentVal = this.lists[index].remarkContent;
      this.remarkAuthorVal = this.lists[index].remarkAuthor;
      this.upOrAd = 2;
      this.upIndex = index;
    },
    // addtion
    addClick() {
      this.isShowAdd = false;
      this.addShow = true;
      this.upOrAd = 1;
    },
    //正则验证
    validateFun () {
      var self = this;
      var regOne = /^[\s]*$/; //输入不能为空
      if (regOne.test(self.remarkAuthorVal)) {
        self.isRedremarkAuthor = true
        self.isGrayremarkAuthor = false
      } else {
        self.isRedremarkAutho = false
        self.isGrayremarkAuthor = true
      }
      if (regOne.test(self.remarkContentVal)) {
        self.isRedremarkContent = true
        self.isGrayremarkContent = false
      }
      if (self.isRedname == true || self.isRedremarkContent == true) {
        return false
      }
    },
    // 确认添加或者修改
    butAddClick() {
      var self = this;
      if (self.validateFun () == false) {
        return false
      } else {
        if (self.butAddClickTrue == false) {
        if (self.isremarkAuthor == true && self.isremarkContent == true) {
          if (self.upOrAd == 1) {
            self.adding = true;
            self.butAddClickTrue = true;
            self
              .getfitnesssloganaaddShareSlogan({
                remarkContent: self.remarkContentVal,
                remarkAuthor: self.remarkAuthorVal
              })
              .then(data => {
                self.butAddClickTrue = false;
                self.adding = false;
                self.isShowAdd = true;
                self.addShow = false;
                self.remarkAuthorVal = "";
                self.remarkContentVal = "";
                if (data.code == 200) {
                  self.$message({
                    type: "info",
                    message: "添加成功!"
                  });

                  self.listFun();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.butAddClickTrue = false;
                self.adding = false;
                self.isShowAdd = true;
                self.addShow = false;
                self.remarkAuthorVal = "";
                self.remarkContentVal = "";
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          } else {
            self.adding = true;
            self.butAddClickTrue = true;
            self
              .getfitnesssloganupdateShareSlogan({
                id: self.lists[self.upIndex].id,
                remarkContent: self.remarkContentVal,
                remarkAuthor: self.remarkAuthorVal
              })
              .then(dataThr => {
                self.adding = false;
                self.remarkAuthorVal = "";
                self.remarkContentVal = "";
                self.butAddClickTrue = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "info",
                    message: "修改成功!"
                  });
                  self.name = "";
                  self.isShowAdd = true;
                  self.addShow = false;
                  self.listFun();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.adding = false;
                self.remarkAuthorVal = "";
                self.remarkContentVal = "";
                self.butAddClickTrue = false;
                self.name = "";
                self.isShowAdd = true;
                self.addShow = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          }
        } else {
          if (self.isremarkAuthor == false) {
            self.isRedremarkAuthor = true;
            self.isGrayremarkAuthor = false;
          } else {
            self.isRedremarkAuthor = false;
            self.isGrayremarkAuthor = true;
          }
          if (self.isremarkContent == false) {
            self.isRedremarkContent = true;
            self.isGrayremarkContent = false;
          } else {
            self.isRedremarkContent = false;
            self.isGrayremarkContent = true;
          }
        }
      }
      }
      
    },
    // delete
    deleteClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
      this.titlename = "文案";
    },
    // affirm delete
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.deling = true;
        var idStr = "";
        if (self.idArr.length > 0) {
          if (self.idArr.length == 1) {
            idStr = self.idArr[0];
          } else {
            idStr = self.idArr.join(",");
          }
        } else {
          idStr = self.lists[self.delIndex].id;
        }
        self.delClickTrue = true;
        self
          .getfitnessslogandeleteAllShareSlogan({
            idJson: idStr
          })
          .then(data => {
            self.delClickTrue = false;
            self.deling = false;
            self.checked = false;
            self.checkList = [];
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.listFun();
              self.idArr = [];
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.checked = false;
            self.checkList = [];
            self.idArr = [];
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器异常!"
            });
          });
      }
    },
    // cancel delete
    cancelClcik() {
      this.isShowdel = true;
      this.delShow = false;
      this.titlename = "";
      this.isShowAdd = true;
      this.addShow = false;
      this.remarkAuthorVal = "";
      this.remarkContentVal = "";
    },
    ...mapActions([
      "getfitnesssloganselectShareSlogan",
      "getfitnesssloganaaddShareSlogan",
      "getfitnesssloganupdateShareSlogan",
      "getfitnessslogandeleteAllShareSlogan"
    ])
  },
  // watch model
  watch: {
    remarkAuthorVal: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[\u4e00-\u9fa5]{1,5}$/g);
      if (trimstr.length <= 0) {
        this.isremarkAuthor = false;
      } else {
        if (trimstr.length < 20) {
          this.isRedremarkAuthor = false;
          this.isGrayremarkAuthor = true;
          this.isremarkAuthor = true;
        } else {
          this.isremarkAuthor = false;
        }
      }
    },
    remarkContentVal: function(val) {
      var trimstr = val;
      if (trimstr.length <= 0) {
        this.isremarkContent = false;
      } else {
        if (trimstr.length < 50) {
          this.isRedremarkContent = false;
          this.isGrayremarkContent = true;
          this.isremarkContent = true;
        } else {
          this.isremarkContent = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.list .nullList {
  height: 400px;
}

.list .nullList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.sale {
  width: 100%;
  height: 100%;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.recycle {
  height: 100px;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.recycle > div:nth-child(1) {
  margin-top: 3px;
  margin-left: 25px;
  width: 70px;
  height: 30px;
  background-color: #5acdfa;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
}

#lastLiRight {
  width: 80%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi > div:nth-child(1) {
  width: 10px;
}

.lastLi > div:nth-child(2) {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.operate {
  align-items: center;
  display: flex;
}

.operate > div {
  width: 30px;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
}

.operate > div:nth-child(1) {
  margin-right: 9px;
}

.operate > div:nth-child(2) {
  margin-left: 9px;
}

.operate > div img {
  width: 25px;
  height: 25px;
}

.listCont {
  margin-top: 36px;
}

.listCont li {
  display: flex;
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.dataCheck > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.dataCheck > div:nth-child(2) {
  width: 25px;
  line-height: 22px;
  height: 25px;
  margin-left: 8px;
}

.dataCheck > div:nth-child(3) {
  margin-left: 5px;
}

.dataCheck > div:nth-child(3) span {
  height: 40px;
  margin-top: 1px;
  display: block;
  font-size: 15px;
}

.firstCheckBox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.firstCheckBox > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  margin-top: 5px;
}

.firstCheckBox > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
}

.listCont .dataLi > div {
  border-right: 1px solid #ececec;
  font-size: 14px;
  color: #515151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 10px;
  padding-right: 10px;
}

.listCont .firstLi > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 10px;
  padding-right: 10px;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 25%;
  overflow: hidden;
  min-width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listCont li > div:nth-child(2) {
  width: 25%;
  min-width: 100px;
  text-align: center;
}

.listCont li > div:nth-child(3) {
  width: 25%;
  min-width: 100px;
  text-align: center;
}

.listCont li > div:nth-child(4) {
  width: 25%;
  min-width: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.addTest {
  color: #fe5371;
}

.grayTest {
  color: #d1d1d1;
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
  padding-left: 10px;
}

.addContent {
  width: 500px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
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

.adBut {
  width: 100%;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.adBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.adBut > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.adBut > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addNa {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
  margin-top: 20px;
}

.addNa > div:nth-child(2) {
  margin-left: 15px;
  /*border: 1px solid red;*/
  height: 70px;
  overflow: hidden;
}

.addNa > div:nth-child(2) > div {
  width: 280px;
  overflow: hidden;
}

.addNa > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.addNa > div:nth-child(1) {
  width: 105px;
  height: 70px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  padding-top: 5px;
}

.addTxt {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
  margin-top: 20px;
}

.addTxt > div:nth-child(2) {
  margin-left: 15px;
  height: 170px;
  overflow: hidden;
}

.addTxt > div:nth-child(2) > div {
  width: 320px;
  overflow: hidden;
}

.addTxt > div:nth-child(2) > div textarea {
  width: 320px;
  height: 120px;
  resize: none;
  border-radius: 4px;
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
}

.addTxt > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.addTxt > div:nth-child(1) {
  width: 105px;
  height: 170px;
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
</style>