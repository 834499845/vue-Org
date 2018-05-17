<!--部位管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    首页文案
                </div>
                <div @click="addClick">
                    新建文案
                </div>
            </div>
            <!-- 搜索 -->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <select v-model="type" @change="selectTypesClick">
                            <option v-for="(type,index) in types" v-bind:value="index" v-bind:key="index">{{type.name}}</option>
                       </select>
                    </div>
                    <div>
                        <select v-model="part" @change="selectPartsClick">
                           <option v-for="(type,index) in parts" v-bind:value="index" v-bind:key="index">{{type.name}}</option>
                        </select>
                    </div>
                    <div class="search" @click="searchClick">
                        确定
                    </div>
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
                                文案
                            </div>
                            <div>
                                所属项目
                            </div>
                            <div>
                                使用状态
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
                                {{item.remarkContent | strFun}}
                            </div>
                            <div>
                                {{item.sportType | typeFun}}
                            </div>
                            <div>
                                {{item.sportState |　stateFun}}
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
                                <el-pagination layout="total" :total="totalNum">
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
                            首页文案：
                        </div>
                        <div>
                            <div>
                                <input type="text" v-model="nameVal" :class="{redInput:isRedname,grayInput:isGrayname}" maxlength="11">
                            </div>
                            <div :class="{redTest:isRedname,grayTest:isGrayname}">
                                可输入11个字符
                            </div>
                        </div>
                    </div>
                    <div class="addNa">
                        <div>
                            所属项目：
                        </div>
                        <div>
                            <select v-model="addtype">
                                     <option v-for="(type,index) in addtypes" v-bind:value="index" v-bind:key="index">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="addNa">
                        <div>
                            使用状态：
                        </div>
                        <div>
                            <select v-model="addpart">
                                    <option v-for="(type,index) in addparts" v-bind:value="index" v-bind:key="index">{{type.name}}</option>
                            </select>
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
      totalNum: 0,
      deling: false,
      adding: false,
      nameVal: "",
      isRedname: false,
      isGrayname: true,
      isname: false,
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
      types: [
        { name: "全部" },
        { name: "未开始", num: "0" },
        { name: "已进行", num: "1" }
      ],
      type: 0,
      parts: [
        { name: "全部" },
        { name: "跑步", num: "run" },
        { name: "骑行", num: "cycle" },
        { name: "健步", num: "walk" }
      ],
      part: 0,
      addtypes: [
        { name: "跑步", num: "run" },
        { name: "骑行", num: "cycle" },
        { name: "健步", num: "walk" }
      ],
      addtype: 0,
      addparts: [{ name: "未开始", num: "0" }, { name: "已进行", num: "1" }],
      addpart: 1,
      butAddClickTrue: false,
      delClickTrue: false
    };
  },
  // filters
  filters: {
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    stateFun: function(val) {
      if (val == 0) {
        return "未开始";
      } else {
        return "已进行";
      }
    },
    typeFun: function(val) {
      if (val == "walk") {
        return "健步";
      } else if (val == "run") {
        return "跑步";
      } else if (val == "cycle") {
        return "骑行";
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
      if (arrs.indexOf("homedocuments") == -1) {
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
      self.checkList = [];
      self.checked = false;
      self.loading = true;
      self
        .getfitnesssloganselectHomeSlogan({})
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
    searchClick() {
      var self = this;
      if (
        self.types[self.type].name == "全部" &&
        self.parts[self.part].name == "全部"
      ) {
        self.listFun();
      } else {
        // 列表
        var searchObj = {};
        if (self.types[self.type].name != "全部") {
          searchObj.sportState = self.types[self.type].num;
        }
        if (self.parts[self.part].name != "全部") {
          searchObj.sportType = self.parts[self.part].num;
        }
        self
          .getfitnesssloganselectHomeSlogan(searchObj)
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
      }
    },
    // select type
    selectTypesClick() {
      var self = this;
      if (
        self.types[self.type].name == "全部" &&
        self.parts[self.part].name == "全部"
      ) {
        self.listFun();
      }
    },
    // select part
    selectPartsClick() {
      var self = this;
      if (
        self.types[self.type].name == "全部" &&
        self.parts[self.part].name == "全部"
      ) {
        self.listFun();
      }
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
    // compile
    updateClick(index) {
      this.isShowAdd = false;
      this.addShow = true;
      this.nameVal = this.lists[index].remarkContent;
      if (this.lists[index].sportState == 1) {
        this.addpart = 1;
      } else {
        this.addpart = 0;
      }
      if (this.lists[index].sportType == "walk") {
        this.addtype = 2;
      } else if (this.lists[index].sportType == "run") {
        this.addtype = 0;
      } else if (this.lists[index].sportType == "cycle") {
        this.addtype = 1;
      }
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
      if (regOne.test(self.nameVal)) {
        self.isRedname = true
        self.isGrayname = false
      }
      if (self.isRedname == true) {
        return false
      }
    },
    // adding
    butAddClick() {
      var self = this;
      if (self.validateFun () == false) {
        return false
      } else {
         if (self.butAddClickTrue == false) {
        if (self.isname == true) {
          if (self.upOrAd == 1) {
            self.adding = true;
            self.butAddClickTrue = true;
            self
              .getfitnesssloganaddHomeSlogan({
                remarkContent: self.nameVal,
                sportType: self.addtypes[self.addtype].num,
                sportState: self.addparts[self.addpart].num
              })
              .then(data => {
                self.adding = false;
                self.isShowAdd = true;
                self.addShow = false;
                self.nameVal = "";
                self.butAddClickTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
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
                self.nameVal = "";
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          } else {
            self.adding = true;
            self.butAddClickTrue = true;
            self
              .getfitnesssloganupdateHomeSlogan({
                id: self.lists[self.upIndex].id,
                remarkContent: self.nameVal,
                sportType: self.addtypes[self.addtype].num,
                sportState: self.addparts[self.addpart].num
              })
              .then(dataThr => {
                self.adding = false;
                self.butAddClickTrue = false;
                self.nameVal = "";
                self.isShowAdd = true;
                self.addShow = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "success",
                    message: "修改成功!"
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
                self.adding = false;
                self.butAddClickTrue = false;
                self.nameVal = "";
                self.isShowAdd = true;
                self.addShow = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          }
        } else {
          if (self.isname == false) {
            self.isRedname = true;
            self.isGrayname = false;
          } else {
            self.isRedname = false;
            self.isGrayname = true;
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
          .getfitnessslogandeleteAllHomeSlogan({
            idJson: idStr
          })
          .then(data => {
            self.deling = false;
            self.checked = false;
            self.checkList = [];
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              if (self.idArr.length > 0) {
                var currNum = self.currentPage;
                if (
                  self.idArr.length == self.lists.length &&
                  self.currentPage > 1
                ) {
                  self.currentPage = currNum - 1;
                }
              } else {
                var currNum = self.currentPage;
                if (self.lists.length == 1 && self.currentPage > 1) {
                  self.currentPage = currNum - 1;
                }
              }
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
            self.deling = false;
            self.checked = false;
            self.checkList = [];
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
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
      this.nameVal = "";
    },
    ...mapActions([
      "getfitnesssloganselectHomeSlogan",
      "getfitnessslogandeleteAllHomeSlogan",
      "getfitnesssloganupdateHomeSlogan",
      "getfitnesssloganaddHomeSlogan"
    ])
  },
  // watch model
  watch: {
    nameVal: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[\u4e00-\u9fa5]{1,5}$/g);
      if (trimstr.length <= 0) {
        this.isname = false;
      } else {
        if (trimstr.length < 12) {
          this.isRedname = false;
          this.isGrayname = true;
          this.isname = true;
        } else {
          this.isname = false;
        }
      }
    }
  }
};
</script>
<style scoped>
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

.menuLeft input {
  border: 0;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
}

.menuLeft .search {
  width: 70px;
  height: 30px;
  text-align: center !important;
  line-height: 30px;
  cursor: pointer;
  background-color: #5acdfa;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
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

.dataLi > div:nth-child(3) {
  text-align: center;
}

.dataLi > div:nth-child(4) {
  text-align: center;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 15%;
  overflow: hidden;
  min-width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listCont li > div:nth-child(2) {
  width: 25%;
  min-width: 100px;
}

.listCont li > div:nth-child(3) {
  width: 20%;
  min-width: 100px;
}

.listCont li > div:nth-child(4) {
  width: 20%;
  min-width: 140px;
}

.listCont li > div:nth-child(5) {
  width: 20%;
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