<!--动作管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    动作管理
                </div>
                <div @click="addClick">
                    新增动作
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <div>
                            <img src="/static/img/search_1.png" alt="">
                        </div>
                        <div>
                            <input type="text" placeholder="输入动作名称搜索" v-model="nameVal">
                        </div>
                    </div>
                    <div>
                        <select @change="selectTypesClick" v-model="type">
                            <option v-for="(type,index) in types" v-bind:value="index" :key="type.labelName">{{type.labelName}}</option>
                        </select>
                    </div>
                    <div>
                        <select @change="selectPartClick" v-model="part">
                            <option v-for="(type,index) in parts" v-bind:value="index" :key="type.siteName">{{type.siteName}}</option>
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
                            <div>动作名称</div>
                            <div>标签</div>
                            <div>部位</div>
                            <div>时长</div>
                            <div>操作</div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists" :key="item.actionName">
                            <div class="dataCheck">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="item.actionName">{{checkNull}}</el-checkbox>
                                </el-checkbox-group>
                                <div>{{index + 1}}</div>                                                                    
                            </div>
                            <div @click="partNameClick(index)">{{item.actionName | strFun}}</div>
                            <div>{{item.labelName |　strFun}}</div>                                                            
                            <div>{{item.siteName | strFun}}</div>
                            <div>{{item.actionTime |　timeFun}}</div>                                                                                                                     
                            <div class="operate">
                                <div @click="updateClick(index)">
                                    <img src="/static/img/编辑.png">
                                </div>
                                <div @click="deleteClick(index)">
                                    <img src="/static/img/删除.png">
                                </div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div><img src="/static/img/w.png" alt=""></div>
                        </li>
                        <li class="lastLi" v-show="lists.length > 0">
                            <div class="lastLiLeft">
                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum"
                                    :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
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
        <!--delete popup-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @del="delClick" @canle="cancleClick" :name="titlename"></v-storeDel>
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
      deling: false,
      checkNull: "",
      checked: false,
      checkList: [],
      types: [],
      type: 0,
      parts: [],
      part: 0,
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      idArr: [],
      nameVal: "",
      nameValUp: "",
      dataTrue: false,
      delClickTrue: false,
      labelIds: '',
      siteIds: '',
      searchClickTrueOrFalse : false,
    };
  },
  // filters
  filters: {
    timeFun: function(val) {
      if (val) {
        var h = Math.floor((val / 3600) % 24);
        var m = Math.floor((val / 60) % 60);
        var s = Math.floor(val / 60);
        m = m > 9 ? m : "0" + m;
        h = h > 9 ? h : "0" + h;
        if (val < 10) {
          return "00:00:" + "0" + val;
        } else if (val >= 10 && val < 60) {
          return "00:00:" + val;
        } else if (h < 1) {
          return "00:" + m + ":00";
        } else {
          return h + ":" + m + ":00";
        }
      } else {
        return "无";
      }
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
     if (sessionStorage.getItem("movementcurrentPage")) {
      this.currentPage = Number(sessionStorage.getItem("movementcurrentPage"));
      this.pageSizeNum = Number(sessionStorage.getItem("movementpageSizeNum"));
    }
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
      if (arrs.indexOf("movement") == -1) {
        this.intercept = true
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
        if (
          sessionStorage.getItem("movementNameVal") ||
          sessionStorage.getItem("movementLabelId") ||
          sessionStorage.getItem("movementSiteId")
        ) {
          if (sessionStorage.getItem("movementNameVal")) {
            self.nameValUp = self.nameVal = sessionStorage.getItem("movementNameVal");
            self.searchListFun();
          }
          if (sessionStorage.getItem("movementLabelId")) {
            self.labelIds = sessionStorage.getItem("movementLabelId")
            self.searchListFun();
          }
          if (sessionStorage.getItem("movementSiteId")) {
            self.siteIds = sessionStorage.getItem("movementSiteId")
            self.searchClick();
          }
        } else {
           self.listFun();
        }
      }
    } else {
      this.intercept = true
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
      sessionStorage.removeItem("movementcurrentPage");
      sessionStorage.removeItem("movementpageSizeNum");
      // 动作列表
      self.getfitnessTrainActionControllerfindAction({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
      }).then(data => {
          self.loading = false;
          //console.log("动作列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.lists = [];
                }
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
      // 标签
      self
        .getfitnessLabellControllerselectLabellPage({
          current: 1,
          size: 200
        })
        .then(data => {
          //console.log("标签列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.types = data.data.records;
                  self.types.unshift({ labelName: "请选择" });
                } else {
                  self.types = [{ labelName: "暂无数据" }];
                }
              } else {
                self.types = [{ labelName: "暂无数据" }];
              }
            } else {
              self.types = [{ labelName: "暂无数据" }];
            }
          } else {
            self.types = [{ labelName: "暂无数据" }];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.types = [{ labelName: "暂无数据" }];
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 部位
      self
        .getfitnessSiteControllerselectSitePage({
          current: 1,
          size: 200
        })
        .then(data => {
          //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.parts = data.data.records;
                  self.parts.unshift({ siteName: "请选择" });
                } else {
                  self.parts = [{ labelName: "暂无数据" }];
                }
              } else {
                self.parts = [{ labelName: "暂无数据" }];
              }
            } else {
              self.parts = [{ labelName: "暂无数据" }];
            }
          } else {
            self.parts = [{ labelName: "暂无数据" }];
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
    //带搜索的初始数据
    searchListFun() {
      var self = this;
      self.checkList = [];
      self.checked = false;
      sessionStorage.removeItem("movementNameVal");
      sessionStorage.removeItem("movementcurrentPage");
      sessionStorage.removeItem("movementpageSizeNum");
      
      self.getfitnessTrainActionControllerfindAction({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum,
          actionName: self.nameValUp,
          labelId: self.labelIds,
          siteId: self.siteIds,
      }).then(data => {
          self.loading = false;
          //console.log("搜索列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.lists = data.data.records;
                  self.totalNum = data.data.total;
                } else {
                  self.lists = [];
                }
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
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 标签
      self
        .getfitnessLabellControllerselectLabellPage({
          current: 1,
          size: 200
        })
        .then(data => {
          //console.log("标签列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.types = data.data.records;
                  self.types.unshift({ labelName: "请选择" });
                  if (sessionStorage.getItem("movementLabelId")) {
                    self.types.forEach(function(ele, ind) {
                      if (ele.id == sessionStorage.getItem("movementLabelId")) {
                        self.type = ind;
                        //console.log(self.type);
                      }
                    });
                  }
                } else {
                  self.types = [{ labelName: "暂无数据", id: 9999 }];
                  self.type = 0;
                }
              } else {
                self.types = [{ labelName: "暂无数据", id: 9999 }];
                self.type = 0;
              }
            } else {
              self.types = [{ labelName: "暂无数据", id: 9999 }];
              self.type = 0;
            }
          } else {
            self.types = [{ labelName: "暂无数据", id: 9999 }];
            self.type = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
          sessionStorage.removeItem("movementLabelId");
        })
        .catch(msg => {
          self.types = [{ labelName: "暂无数据", id: 9999 }];
          self.type = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 部位
      self
        .getfitnessSiteControllerselectSitePage({
          current: 1,
          size: 200
        })
        .then(data => {
          //console.log("部位列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.parts = data.data.records;
                  self.parts.unshift({ siteName: "请选择" });
                  if (sessionStorage.getItem("movementSiteId")) {
                    self.parts.forEach(function(ele, ind) {
                      if (ele.id == sessionStorage.getItem("movementSiteId")) {
                        self.part = ind;
                        //console.log(self.part);
                      }
                    });
                  }
                } else {
                  self.parts = [{ labelName: "暂无数据", id: 9999 }];
                  self.part = 0;
                }
              } else {
                self.parts = [{ labelName: "暂无数据", id: 9999 }];
                self.part = 0;
              }
            } else {
              self.parts = [{ labelName: "暂无数据", id: 9999 }];
              self.part = 0;
            }
          } else {
            self.parts = [{ labelName: "暂无数据", id: 9999 }];
            self.part = 0;
            self.$message({
              type: "info",
              message: data.message
            });
          }
          sessionStorage.removeItem("movementSiteId");
        })
        .catch(msg => {
          self.parts = [{ labelName: "暂无数据", id: 9999 }];
          self.part = 0;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // select type
    selectTypesClick() {
      var self = this;
      self.labelIds = ''
      if (
        self.nameVal.length == 0 &&
        self.type == "0" &&
        self.part == "0"
      ) {
        
        self.listFun();
      } else {
        if (self.type != 0) {
          self.labelIds = self.types[self.type].id
        }
        self.searchListFun();
      }
      //console.log(self.type)
    },
    // select part
    selectPartClick() {
      var self = this;
      self.siteIds = ''
      if (
        self.nameVal.length == 0 &&
        self.type == "0" &&
        self.part == "0"
      ) {
        
        self.listFun();
      } else {
        if (self.part != 0) {
          self.siteIds = self.parts[self.part].id
        }
        self.searchListFun()
      }
    },
    // batch delete
    deletsClick() {
      var self = this;
      self.idArr = [];
      if (this.checkList.length > 0) {
        this.checkList.forEach(function(ele, index) {
          self.idArr.push(ele.actionId);
        });
        this.isShowdel = false;
        this.delShow = true;
        this.titlename = "动作";
      } else {
        self.$message({
          type: "info",
          message: "请选择动作!"
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
      // self.labelIds = ''
      // self.siteIds = ''
      // if (self.type == '0' && self.part == '0' && self.nameVal.length == 0) {
      //   self.listFun();
      // } else {
      //   if (self.type != 0) {
      //     self.labelIds = self.types[self.type].id
      //   }
      //   if (self.part != 0) {
      //     self.siteIds = self.parts[self.part].id
      //   }
      //   if (self.nameVal.length > 0) {
      //     self.nameValUp = self.nameVal
      //   }
        self.searchListFun();
      // }
      
    },
    //  paging-pageSize
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      // self.labelIds = ''
      // self.siteIds = ''      
      // if (self.type == '0' && self.part == '0' && self.nameVal.length == 0) {
      //       self.listFun();
      // } else {
      //   if (self.type != 0) {
      //     self.labelIds = self.types[self.type].id
      //   }
      //   if (self.part != 0) {
      //     self.siteIds = self.parts[self.part].id
      //   }
      //   if (self.nameVal.length > 0) {
      //     self.nameValUp = self.nameVal
      //   }       
      //   self.searchListFun();               
      // }     
      self.searchListFun(); 
    },
    // compile
    updateClick(index) {
      var self = this;
      sessionStorage.setItem("movementcurrentPage", self.currentPage);
      sessionStorage.setItem("movementpageSizeNum", self.pageSizeNum);
      if (self.nameVal.length > 0) {
        sessionStorage.setItem("movementNameVal", self.nameVal);
      }
      if (self.types[self.type].labelName != "请选择") {
        sessionStorage.setItem("movementLabelId", self.types[self.type].id);
      }
      if (self.parts[self.part].siteName != "请选择") {
        sessionStorage.setItem("movementSiteId", self.parts[self.part].id);
      }
      this.$router.push({
        path: "/fitness/opMovement",
        query: { op: 2, id: self.lists[index].actionId }
      });
    },
    // addtion
    addClick() {
      this.$router.push({
        path: "/fitness/opMovement",
        query: { op: 1 }
      });
    },
    // part name details
    partNameClick(index) {
      var self = this;
      this.$router.push({
        path: "/fitness/lookMovement",
        query: { op: 2, id: self.lists[index].actionId }
      });
    },
    // delete
    deleteClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
      this.titlename = "动作";
    },
    // affirm delete
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.deling = true;
        var idStr = "";
        if (self.idArr.length > 0) {
          if (self.idArr.length == 1) {
            idStr = '["' + self.idArr[0] + '"]';
          } else {
            idStr = idStr = JSON.stringify(self.idArr);
          }
        } else {
          idStr = '["' + self.lists[self.delIndex].actionId + '"]';
        }
        self.delClickTrue = true;
        self
          .getfitnessTrainActionControllerdeleteById({
            ids: idStr
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
            self.delClickTrue = false;
            self.checked = false;
            self.checkList = [];
            self.idArr = [];
            self.isShowdel = true;
            self.delShow = false;
            self.deling = false;
            self.$message({
              type: "info",
              message: "服务器异常!"
            });
          });
      }
    },
    // cancel delete
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
      this.titlename = "";
      this.isShowRecycle = true;
      this.RecycleShow = false;
    },
    // search click
    searchClick() {
      var self = this;
      self.dataTrue = true;
      if (self.dataTrue == true) {
        self.dataTrue = false;
        if (
          self.nameVal.length == 0 &&
          self.type == "0" &&
          self.parts == "0"
        ) {
          self.listFun();
        } else {          
            self.nameValUp = self.nameVal
            self.searchListFun()
        }
      } else {
      }
    },
    ...mapActions([
      "getfitnessTrainActionControllerfindAction",
      "getfitnessLabellControllerselectLabellPage",
      "getfitnessSiteControllerselectSitePage",
      "getfitnessTrainActionControllerdeleteById",
      "getfitnessActionControllerfindById"
    ])
  },
  // watch model
  watch: {
    // nameVal: function(val) {
    //   var self = this;
    //   if (
    //     val.length == 0 &&
    //     self.type == "0" &&
    //     self.part == "0"
    //   ) {
    //     self.listFun();
    //   } else {
    //     self.searchListFun();
    //   }
    // },
    nameVal: function(val) {
      var self = this
      if (val.length == 0) {
        self.nameValUp = ""
        self.listFun();
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
  text-align: center;
  cursor: pointer;
}

.dataLi > div:nth-child(3) {
  text-align: center;
}

.dataLi > div:nth-child(4) {
  text-align: center;
}

.dataLi > div:nth-child(5) {
  text-align: center;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 10%;
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
  width: 15%;
  min-width: 140px;
}

.listCont li > div:nth-child(5) {
  width: 15%;
  min-width: 100px;
}

.listCont li > div:nth-child(6) {
  width: 15%;
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
  margin-left: 32px;
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

.menuLeft > div:nth-child(1) {
  margin-left: 0;
  border: 1px solid #eaeaea;
  width: 176px;
  overflow: hidden;
  border-radius: 4px;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  width: 32px;
  display: flex;
  align-items: center;
}

.menuLeft > div > div:nth-child(1) img {
  margin-left: 12px;
}

.menuLeft > div > div:nth-child(2) {
  width: 140px;
}

.menu > div:nth-child(2) {
  width: 95px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  line-height: 35px;
  color: #000;
  font-size: 16px;
  margin-right: 15px;
  margin-top: 9px;
  cursor: pointer;
}

.menuLeft input {
  width: 140px;
  height: 32px;
  border: 0;
  border-radius: 3px;
  padding-left: 5px;
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

/*删除弹出框*/

.delContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 4px;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>