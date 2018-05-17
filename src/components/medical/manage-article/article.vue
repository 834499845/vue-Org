<!--圈子管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    文章管理
                </div>
                <div @click="addCommClick">
                    新增文章
                </div>
            </div>
            <!-- 筛选 -->
            <div class="filtrate">
                <div class="selectOne">
                    <select v-model="selectMod" @change="selectchg">
                        <option v-for="(type,index) in docstate" v-bind:value="type.key">{{type.value}}</option>
                    </select>
                </div>
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" v-model="seekmodel" placeholder="输入后开始搜索" maxlength="25">
                </div>
                <div class="selectTime">
                    <div>
                        <el-date-picker @change="beginTime" v-model="valueOne" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker @change="overtime" v-model="valueTwo" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="filtrateOk interval" @click="searchclick">
                    确定
                </div>
                <div class="filtrateOk interval delfiltrateOk" @click="personOrCircleCDeleteClick">
                    清除
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div>
                                <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                <span>序号</span>

                            </div>
                            <div>
                                文章标题
                            </div>
                            <div>
                                分类
                            </div>
                            <div>
                                作者
                            </div>
                            <div>
                                推荐
                            </div>
                            <div>
                                发布时间
                            </div>
                            <div>
                                状态
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <div class="noList" v-show="dataList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </div>
                        <li class="dataLi" v-for="(item,index) in dataList">
                            <div>
                                <div>
                                    <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                        <el-checkbox :label="item" :key="item.articleId">{{index + 1}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="omit">
                                {{item.articleTitle}}
                            </div>
                            <div class="omit">
                                {{item.articleAssortment}}
                            </div>
                            <div class="omit">
                                {{item.authorName}}
                            </div>
                            <div class="recommend">
                                <img @click="recommendClick(index)" v-if="item.recommendationState == 1" src="/static/img/blue.png" alt="开着的" title="开着的">
                                <img @click="recommendClick(index)" v-else src="/static/img/closeBlue.png" alt="关着的" title="关着的">
                            </div>
                            <div class="omit">
                                {{item.publishTime | ctimeFun}}
                            </div>
                            <div class="omit">
                                {{item.articleState | sFun}}
                            </div>
                            <div class="operation">
                                <div>
                                    <img v-if="item.articleState == 2" src="/static/img/审核.png" @click="operationClick(index)" alt="审核" title="审核">
                                    <img v-else src="/static/img/审核灰.png" @click="operationNoClick" alt="审核灰" title="审核灰">
                                </div>
                                <div>
                                    <img src="/static/img/删除.png" @click="delClick(index)" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 底部删除/分页 -->
                    <div class="lastLi" v-show="dataList.length > 0">
                        <div class="batchDelete" @click="batchDelClick">
                            批量删除
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
        <!-- 审核弹出框 -->
        <div :class="{showdel:isShowCheck}" class="delPopup">
            <div class="checkContent">
                <div class="chePopupTop">
                    审核
                </div>
                <div class="chePopupIf">
                    <ul>
                        <li class="chePopupLi" v-for="(item,index) in checkLists" @click="chePopupClick(index)">
                            <div class="PopupImgShow">
                                <div v-if="imgShow == index">
                                    <img src="/static/img/cheBlue.jpg" alt="">
                                </div>
                                <div class="imgBox" v-else>

                                </div>
                            </div>
                            <div>
                                {{item.value}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="checkBut">
                    <div @click="okCheckClick">
                        确定
                    </div>
                    <div @click="cancelCheClick">
                        取消
                    </div>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{showdel:isShowdel}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="okDelClick" @canle="canleClick" :name="titlename"></v-hosdel>
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
      articlelist: true, //控制是否能获取文章列表
      okdelclick: true, //控制是否删除
      okcheckclick: true, //控制确定审核
      recommendclick: true, //控制推荐按钮点击
      imgShow: 0, //审核弹框的选择
      ifrecommend: false,
      isShowCheck: true,
      cheKey: "1", //审核是否通过的判定
      valueOne: "", //开始日期
      valueTwo: "", //结束日期
      loading: false,
      checkLists: [
        { value: "审核通过", key: "1" },
        { value: "审核不通过", key: "0" }
      ],
      dataList: [],
      seekmodel: "", // inp输入框
      seekmodelUp: "", // inp输入框
      CheckShow: false, //是否进行筛选
      selectMod: "QXZ", //下拉选择model
      selectModUp: "", //下拉选择model
      docstate: [
        { value: "请选择", key: "QXZ" },
        { value: "审核未通过", key: "0" },
        { value: "审核通过", key: "1" },
        { value: "待审核", key: "2" },
        { value: "无需审核", key: "3" }
      ], //下拉框
      checked: false, //选取全部序号
      checkList: [], //序号选取
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 1,
      isShowdel: true,
      titlename: "",
      timeOne: "",
      timeTwo: "",
      timeNumOne: "",
      timeNumTwo: "",
      audit: "",
      ifGetList: true
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    ctimeFun: function(val) {
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
    },
    sFun: function(val) {
      if (val) {
        switch (val) {
          case "0":
            return "审核未通过";
            break;
          case "1":
            return "审核通过";
            break;
          case "2":
            return "待审核";
            break;
          case "3":
            return "无需审核";
            break;
          default:
            break;
        }
      } else {
        return "暂无信息";
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
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      //console.log("arrs", arrs);
      if (arrs.indexOf("article") == -1) {
        this.intercept = true;
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
        this.articleList();
      }
    } else {
      this.intercept = true;
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
  // 事件处理
  methods: {
    //获取文章列表
    articleList() {
      var self = this;
      self.ifGetList = false;
      self.checkList = [];
      self.checked = false;
      self.loading = true;
      if (self.articlelist == true) {
        self.articlelist = false;
        self
          .getarticleList({
            searchStr: self.seekmodelUp, //关键字
            articleState: self.selectModUp, //审核状态
            startDate: self.timeOne, //开始日期
            endDate: self.timeTwo, //结束日期
            pageNo: self.currentPage, //页码
            pageSize: self.pageSizeNum //每页记录数
          })
          .then(data => {
            self.loading = false;
            self.articlelist = true;
            //console.log("文章管理列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length == 0) {
                    self.dataList = [];
                  } else {
                    self.dataList = data.data.records;
                    self.totalNum = data.data.total;
                  }
                } else {
                  self.dataList = [];
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
            self.ifGetList = true;
          })
          .catch(msg => {
            //console.log(msg);
            self.articlelist = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
            self.loading = false;
            self.ifGetList = true;
          });
      }
    },
    // 清除筛选数据
    personOrCircleCDeleteClick() {
      var self = this;
      self.seekmodelUp = "";
      self.selectModUp = "";
      self.timeTwo = "";
      self.timeOne = "";
      self.seekmodel = "";
      self.valueTwo = "";
      self.valueOne = "";
      self.currentPage = 1;
      self.pageSizeNum = 10;
      this.selectMod = "QXZ";
      this.articleList();
    },
    //下拉选择状态
    selectchg() {
      if (this.selectMod == "QXZ") {
        this.selectModUp = "";
      } else {
        this.selectModUp = this.selectMod;
      }
      if (this.CheckShow) {
        this.seekmodelUp = this.seekmodel;
      } else {
        this.seekmodelUp = "";
      }
      this.currentPage = 1;
      this.pageSizeNum = 10;
      this.articleList();
      //console.log(this.selectMod);
    },
    //确定搜索
    searchclick() {
      if (this.seekmodel == "") {
        this.$message({
          type: "info",
          message: "请先输入关键词！"
        });
      } else {
        if (this.ifGetList == false) {
          this.$message({
            type: "info",
            message: "数据请求中请稍后！"
          });
        } else {
          this.seekmodelUp = this.seekmodel;
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.CheckShow = true;
          this.articleList();
        }
      }
    },
    //分页
    handleSizeChange(val) {
      if (this.CheckShow) {
        this.seekmodelUp = this.seekmodel;
      } else {
        this.seekmodelUp = "";
      }
      this.pageSizeNum = val;
      this.articleList();
    },
    handleCurrentChange(val) {
      if (this.CheckShow) {
        this.seekmodelUp = this.seekmodel;
      } else {
        this.seekmodelUp = "";
      }
      this.currentPage = val;
      this.articleList();
    },
    // 开始时间
    beginTime() {
      this.timeNumOne = Date.parse(this.valueOne) / 1000;
      if (this.timeNumOne) {
        if (this.timeNumTwo) {
          if (this.timeNumTwo - this.timeNumOne >= 0) {
            var t = this.valueOne;
            var y, m, d, mm, dd;
            y = t.getFullYear();
            mm = t.getMonth() + 1;
            dd = t.getDate();
            if (mm > 9) {
              m = mm;
            } else {
              m = "0" + mm;
            }
            if (dd > 9) {
              d = dd;
            } else {
              d = "0" + dd;
            }
            this.timeOne = y + "-" + m + "-" + d;
            //发送请求
            this.articleList();
          } else {
            this.$message({
              type: "info",
              message: "开始时间不能大于结束时间！"
            });
            this.valueOne = this.timeNumOne = "";
          }
        } else {
          var t = this.valueOne;
          var y, m, d, mm, dd;
          y = t.getFullYear();
          mm = t.getMonth() + 1;
          dd = t.getDate();
          if (mm > 9) {
            m = mm;
          } else {
            m = "0" + mm;
          }
          if (dd > 9) {
            d = dd;
          } else {
            d = "0" + dd;
          }
          this.timeOne = y + "-" + m + "-" + d;
        }
      }
    },
    //结束时间
    overtime() {
      this.timeNumTwo = Date.parse(this.valueTwo) / 1000;
      if (this.timeNumTwo) {
        if (this.timeNumOne) {
          if (this.timeNumTwo - this.timeNumOne >= 0) {
            var t = this.valueTwo;
            var y, m, d, mm, dd;
            y = t.getFullYear();
            mm = t.getMonth() + 1;
            dd = t.getDate();
            if (mm > 9) {
              m = mm;
            } else {
              m = "0" + mm;
            }
            if (dd > 9) {
              d = dd;
            } else {
              d = "0" + dd;
            }
            this.timeTwo = y + "-" + m + "-" + d;
            //发送请求
            this.articleList();
          } else {
            this.valueTwo = "";
            this.timeNumTwo = "";
            this.$message({
              type: "info",
              message: "结束时间不得小于开始时间！"
            });
          }
        } else {
          this.valueTwo = "";
          this.timeNumTwo = "";
          this.$message({
            type: "info",
            message: "请先选择开始时间！"
          });
        }
      }
    },
    //推荐按钮点击
    recommendClick(index) {
      if (
        this.dataList[index].articleState == 0 ||
        this.dataList[index].articleState == 2
      ) {
        this.$message({
          type: "info",
          message: "审核未通过与待审核不可推荐！"
        });
      } else if (
        this.dataList[index].articleState == 1 ||
        this.dataList[index].articleState == 3
      ) {
        var self = this;
        var recommendNum = "";
        if (this.dataList[index].recommendationState == 1) {
          recommendNum = 0;
        } else if (this.dataList[index].recommendationState == 0) {
          recommendNum = 1;
        }
        if (this.recommendclick == true) {
          this.recommendclick = false;
          self
            .getrecommend({
              articleId: this.dataList[index].articleId, //文章id
              articleAssortmentId: this.dataList[index].articleAssortmentId, //分类id
              recommendationState: recommendNum //是否推荐，0-不推荐，1-推荐
            })
            .then(data => {
              //console.log("推荐", data);
              this.recommendclick = true;
              if (data.code == 200) {
                if (this.dataList[index].recommendationState == 1) {
                  this.dataList[index].recommendationState = 0;
                } else if (this.dataList[index].recommendationState == 0) {
                  this.dataList[index].recommendationState = 1;
                }
              } else if (data.code == 167) {
                self.$message({
                  type: "info",
                  message: data.message
                });
              } else if (data.code == 109) {
                self.$message({
                  type: "info",
                  message: data.message
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              this.recommendclick = true;
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常！"
              });
            });
        }
      }
    },
    //审核
    operationClick(index) {
      this.isShowCheck = false;
      this.audit = index;
    },
    //审核弹框的选择按钮
    chePopupClick(index) {
      this.cheKey = this.checkLists[index].key;
      this.imgShow = index;
    },
    //确定审核
    okCheckClick() {
      var self = this;
      if (self.okcheckclick == true) {
        self.okcheckclick = false;
        self
          .getrecommend({
            articleId: this.dataList[self.audit].articleId, //文章id
            articleAssortmentId: this.dataList[self.audit].articleAssortmentId, //分类id
            articleState: this.cheKey //审核状态，0-审核未通过，1-审核通过
          })
          .then(data => {
            self.okcheckclick = true;
            //console.log("推荐", data);
            if (data.code == 200) {
              if (this.cheKey == 1) {
                this.dataList[self.audit].articleState = "1";
                self.$message({
                  type: "info",
                  message: "审核通过！"
                });
              } else if (this.cheKey == 0) {
                this.dataList[self.audit].articleState = "0";
                self.$message({
                  type: "info",
                  message: "审核未通过！"
                });
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okcheckclick = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }
      this.isShowCheck = true;
    },
    //取消审核
    cancelCheClick() {
      this.isShowCheck = true;
    },
    //审核灰
    operationNoClick() {
      this.$message({
        type: "info",
        message: "已审核过！"
      });
    },
    //选取全部序号
    numChange(event) {
      this.checkList = event.target.checked ? this.dataList : [];
      var a = this.checkList.map(function(data) {
        return data.articleId;
      });
      var string = a.join(",");
      this.idstring = string;
    },
    //序号选取
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.dataList.length;
      var a = this.checkList.map(function(data) {
        return data.articleId;
      });
      var string = a.join(",");
      this.idstring = string;
    },
    //批量删除
    batchDelClick() {
      if (this.checkList.length > 0) {
        this.isShowdel = false;
        this.titlename = "这些信息将被删除，该操作无法恢复！";
      } else {
        this.$message({
          type: "info",
          message: "请先选择序号！"
        });
      }
      if (this.dataList.length - this.checkList.length > 0) {
        this.iscurrentPage = this.currentPage;
      } else {
        if ((this.currentPage = 1)) {
          this.iscurrentPage = 1;
        } else if (this.currentPage > 1) {
          this.iscurrentPage = this.currentPage - 1;
        }
      }
    },
    //删除弹框
    delClick(index) {
      this.isShowdel = false;
      this.titlename = "该信息将被删除，该操作无法恢复！";
      var cancelId = this.dataList[index].articleId;
      // var string = JSON.stringify(cancelId)
      this.idstring = cancelId;
    },
    //确认删除
    okDelClick() {
      var self = this;
      if (this.okdelclick == true) {
        this.okdelclick = false;
        self
          .getarticleDelete({
            articleIds: self.idstring
          })
          .then(data => {
            this.okdelclick = true;
            //console.log("文章管理删除", data);
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功！"
              });
              if (this.dataList.length == 1) {
                if (this.currentPage == 1) {
                  this.currentPage = 1;
                } else if (this.currentPage > 1) {
                  this.currentPage = this.currentPage - 1;
                }
              } else {
                this.currentPage = this.currentPage;
              }
              //   self.currentPage = self.iscurrentPage;
              self.articleList();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            this.okdelclick = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常！"
            });
          });
      }

      this.isShowdel = true;
    },
    //取消删除
    canleClick() {
      this.isShowdel = true;
    },
    //新增文章
    addCommClick() {
      this.$router.push({
        path: "/medical/articleAdd"
      });
    },
    ...mapActions(["getarticleList", "getrecommend", "getarticleDelete"])
  },
  watch: {
    seekmodel: function(val) {
      if (val.length == 0) {
        if (this.CheckShow) {
          this.seekmodelUp = "";
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.CheckShow = false;
          this.articleList();
        }
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

.sale {
  width: 100%;
  height: 100%;
}

.sale > div:nth-child(1) {
  overflow: hidden;
  margin-left: 36px;
  width: calc(100% - 72px);
}

.list {
  min-height: 550px;
}

.list > div {
  margin: 0 auto;
}

.listTitle {
  height: 58px;
  display: flex;
  overflow: hidden;
  line-height: 58px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
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

/* 筛选 */

.filtrate {
  width: 100%;
  overflow: hidden;
  height: 74px;
}

.filtrate > div {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

.interval {
  margin-left: 10px;
}

.delfiltrateOk {
  color: #fe5371 !important;
  background-color: #eaeaea !important;
}

/*第一个下拉框*/

.selectOne select {
  width: 150px;
  height: 32px;
  line-height: 32px;
  padding-left: 25px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
  font-size: 14px;
  color: #97a8be;
  border: 1px solid #d1d1d1;
  overflow: hidden;
  cursor: pointer;
}

.selectOne select::-ms-expand {
  display: none;
}

.searchBox {
  width: 210px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
}

.searchBox input {
  border: none;
  height: 26px;
  width: 80%;
}

.searchBox input::-webkit-input-placeholder {
  color: #97a8be;
}

.searchBox input:-moz-input-placeholder {
  color: #97a8be;
}

.searchBox input::-moz-input-placeholder {
  color: #97a8be;
}

.searchBox input:-ms-input-placeholder {
  color: #97a8be;
}

.filtrateOk {
  width: 70px;
  height: 32px;
  background: #5acdfa;
  text-align: center;
  line-height: 32px;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

/*选择时间*/

.selectTime {
  height: 32px;
  /* float: right !important; */
  line-height: 32px;
  overflow: hidden;
  margin-left: 10px;
}

.selectTime > div {
  float: left;
}

.selectTime > div:nth-child(1),
.selectTime > div:nth-child(3) {
  width: 100px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  position: relative;
}

.selectTime > div:nth-child(1) > div,
.selectTime > div:nth-child(3) > div {
  position: absolute;
  top: -1px;
  left: -6px;
}

.selectTime > div:nth-child(2) {
  height: 32px;
}

.selectTime div {
  margin: 0 5px;
}

/*暂无数据*/

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

/*列表*/

.listContent {
  overflow: hidden;
}

.listContentTop {
  border-top: 1px solid #e5e7eb;
}

.listContent li {
  display: flex;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(1) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(2) {
  width: 22%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(3) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(4) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(5) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.recommend img {
  cursor: pointer;
}

.listContent li > div:nth-child(6) {
  width: 14%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(7) {
  width: 12%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(8) {
  width: 12%;
}

.listContentTop > div {
  font-size: 17px;
  font-weight: bold;
  color: #303030;
  background: #f2f4f8;
}

.operation {
  display: flex;
  justify-content: center;
}

.operation div {
  padding: 0 10px;
}

.operation div img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

/*批量删除*/

.lastLi {
  display: flex;
  height: 60px;
  margin-top: 10px;
  justify-content: space-between;
}

.batchDelete {
  width: 100px !important;
  height: 32px;
  background: #5acdfa;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  font-size: 17px;
  color: white;
  cursor: pointer;
  border: none !important;
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

/*审核弹框*/

.checkContent {
  width: 480px;
  height: 260px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 280px) / 2) auto;
  z-index: 100000;
}

.chePopupTop {
  /* width: 380px; */
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 24px;
  color: #303030;
  border-bottom: 1px solid #d1d1d1;
}

.chePopupIf ul {
  display: flex;
  margin-left: 111px;
  margin-top: 15px;
}

.chePopupLi {
  display: flex;
  margin: 24px;
  cursor: pointer;
}

.chePopupLi:hover .imgBox {
  border-color: #5acdfa;
}

.PopupImgShow {
  height: 18px;
  display: flex;
  padding-right: 4px;
}

.PopupImgShow div {
  width: 18px;
  height: 18px;
  overflow: hidden;
  position: relative;
}

.PopupImgShow img {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 0;
  left: 0;
}

.imgBox {
  border: 1px solid #d1d1d1;
  border-radius: 3px;
}

.checkBut {
  width: 240px;
  height: 32px;
  margin: 0 auto;
  display: flex;
}

.checkBut div {
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  margin: 0 25px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.checkBut div:nth-child(1) {
  background: #5acdfa;
}

.checkBut div:nth-child(2) {
  background: #aeaeae;
}

.omit {
  overflow: hidden;
  padding: 0 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>