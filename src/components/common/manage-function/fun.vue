<!--首页活动-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    首页活动
                </div>
                <div @click="addClick">
                    新增活动
                </div>
            </div>
            <!-- <div class="moduleButton">
            </div> -->
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                序号
                            </div>
                            <div>
                                活动名称
                            </div>
                            <div>
                                海报图
                            </div>
                            <div>
                                开始时间
                            </div>
                            <div>
                                结束时间
                            </div>
                            <div>
                                状态
                            </div>
                            <div>
                                进度
                            </div>
                            <div>
                                发起人
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li v-show="lists.length > 0" class="dataLi" :key="index" v-for="(item,index) in lists">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.title | strFun}}
                            </div>
                            <div>
                                <div>
                                  <img :src="item.picture" alt="">
                                </div>
                            </div>
                            <div>
                                {{item.startDate | timeFun}}
                            </div>
                            <div>
                                {{item.endDate | timeFun}}
                            </div>
                            <div>
                                <img @click="logicDeleteClick(index)" v-if="item.state == '0'" src="/static/img/shi.png" alt="开启" title="开启">
                                <img @click="logicDeleteClick(index)" v-else src="/static/img/fou.png" alt="禁止" title="禁止">
                            </div>
                            <div>
                                {{item.logice | strFun}}
                            </div>
                            <div>
                                {{item.launch | strFun}}
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="lookClick(index)" src="/static/img/查看.png" alt="查看" title="查看">
                                </div>
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div>
                                    <img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                        <div v-show="lists.length == 0" class="nodataBox">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-hosdel @ok="delClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/commondel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      deling: false,
      loading: false,
      lists: [],
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      codes: [
        {
          dictionaryName: "请选择",
          dictionaryCode: "QINGXUNZE"
        }
      ],
      codestr: "QINGXUNZE",
      delClickTrue: false
    };
  },
  // 过滤
  filters: {
    timeFun: function(val) {
      if (val) {
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
        return (
          "20" + year + "-" + month + "-" + date + "  " + hour + ":" + minute
        );
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
        if (ele.name == "公共管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("fun") == -1) {
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
        // 获取数据列表
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
    listFun() {
      var self = this;
      self
        .getbasehoteventgetHotEvent({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  var now = new Date().getTime();
                  var arr = [];
                  data.data.records.forEach(function(ele, ind) {
                    console.log(ele.startDate);
                    if (ele.startDate > now) {
                      arr.push({
                        id: ele.id, //活动id
                        picture: ele.picture, //活动图片
                        url: ele.url, //活动h5地址
                        title: ele.title, // 活动标题
                        content: ele.content, // 活动内容
                        launch: ele.launch, // 活动发起人
                        createDate: ele.createDate, // 活动创建时间
                        updateDate: ele.updateDate, // 活动修改时间
                        startDate: ele.startDate, // 活动开始时间
                        endDate: ele.endDate, // 活动结束时间
                        state: ele.state, // 活动状态
                        logice: "未开始"
                      });
                    } else if (ele.startDate <= now && ele.endDate >= now) {
                      arr.push({
                        id: ele.id, //活动id
                        picture: ele.picture, //活动图片
                        url: ele.url, //活动h5地址
                        title: ele.title, // 活动标题
                        content: ele.content, // 活动内容
                        launch: ele.launch, // 活动发起人
                        createDate: ele.createDate, // 活动创建时间
                        updateDate: ele.updateDate, // 活动修改时间
                        startDate: ele.startDate, // 活动开始时间
                        endDate: ele.endDate, // 活动结束时间
                        state: ele.state, // 活动状态
                        logice: "进行中"
                      });
                    } else {
                      arr.push({
                        id: ele.id, //活动id
                        picture: ele.picture, //活动图片
                        url: ele.url, //活动h5地址
                        title: ele.title, // 活动标题
                        content: ele.content, // 活动内容
                        launch: ele.launch, // 活动发起人
                        createDate: ele.createDate, // 活动创建时间
                        updateDate: ele.updateDate, // 活动修改时间
                        startDate: ele.startDate, // 活动开始时间
                        endDate: ele.endDate, // 活动结束时间
                        state: ele.state, // 活动状态
                        logice: "已结束"
                      });
                    }
                  });
                  self.lists = arr;
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
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 禁止开启操作
    logicDeleteClick(index) {
      var self = this;
      if (self.lists[index].state == 0) {
        self
          .getbasehoteventdisableHotEvent({
            id: self.lists[index].id
          })
          .then(data => {
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "操作成功！"
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
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        self
          .getbasehoteventenableHotEvent({
            id: self.lists[index].id
          })
          .then(data => {
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "操作成功！"
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
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    lookClick(index) {
      var self = this;
      this.$router.push({
        path: "/common/lookFun",
        query: {
          code: self.lists[index].dictionaryCode,
          id: self.lists[index].id
        }
      });
    },
    // 修改信息
    updateClick(index) {
      var self = this;
      this.$router.push({
        path: "/common/editFun",
        query: {
          code: self.lists[index].dictionaryCode,
          id: self.lists[index].id
        }
      });
    },
    // 删除单页
    deleteClick(index) {
      this.titlename = "单页";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.loading = true;
        self.delClickTrue = true;
        self
          .getbasehoteventdeleteHotEvent({
            id: self.lists[self.delIndex].id
          })
          .then(data => {
            self.delClickTrue = false;
            self.loading = false;
            self.isShowdel = true;
            self.delShow = false;
            if (data.code == 200) {
              self.$message({
                type: "info",
                message: "删除成功！"
              });
              self
                .getbasehoteventgetHotEvent({
                  pageNo: self.currentPage,
                  pageSize: self.pageSizeNum
                })
                .then(data => {
                  // console.log('单页列表', JSON.parse(JSON.stringify(data)))
                  self.loading = false;
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
                  // console.log(msg)
                  self.lists = [];
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.delClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 新增活动
    addClick() {
      this.$router.push({
        path: "/common/addFun"
      });
    },
    ...mapActions([
      "getbasehoteventdeleteHotEvent",
      "getcutpageContextselect",
      "getbasehoteventgetHotEvent",
      "getbasefindListByParentId",
      "getbasehoteventdisableHotEvent",
      "getbasehoteventenableHotEvent"
    ])
  },
  // 监视
  watch: {}
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
  width: calc(100% - 72px);
  margin-left: 36px;
}

#lastLiRight {
  min-width: 300px;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.listCont li {
  display: flex;
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;

  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 16px;
  line-height: 58px !important;
  font-weight: bold;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  height: 50px;
}

.dataLi .operate {
  display: flex;
  align-items: center;
  width: 25%;
}

.dataLi .operate > div {
  width: 24px;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
}

.dataLi .operate > div:nth-child(1) {
  margin-right: 10px;
}

.dataLi .operate > div:nth-child(3) {
  margin-left: 10px;
}

.operate img {
  width: 100%;
  height: 100%;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  font-size: 14px;
  color: #515151;
}

.listCont li > div:nth-child(1) {
  width: 5%;
  border-left: 1px solid #ececec;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.listCont li > div:nth-child(2) {
  width: 12%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.listCont li > div:nth-child(3) {
  width: 12%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dataLi > div:nth-child(3) div {
  width: 80%;
  height: 40px;
  border: 1px solid #ccc;
}
.dataLi > div:nth-child(3) div img {
  width: 100%;
  height: 40px;
}

.listCont li > div:nth-child(4) {
  width: 13%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}
.listCont li > div:nth-child(5) {
  width: 13%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}
.listCont li > div:nth-child(6) {
  width: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}
.listCont li > div:nth-child(7) {
  width: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}
.listCont li > div:nth-child(8) {
  width: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.listCont li > div:nth-child(9) {
  width: 15%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  min-height: 540px;
  margin-top: 32px;
}

.listTitle {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
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
  margin-bottom: 10px;
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

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 23px;
}

.menuLeft > div:nth-child(1) {
  margin-left: 0;
}

.menuLeft > div > div:nth-child(1) {
  color: #303030;
  font-size: 14px;
  margin-right: 5px;
  min-width: 50px;
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

.nodataBox {
  text-align: center;
  margin: 180px 0;
}

.nodataBox p {
  margin-top: 40px;
  font-size: 30px;
  color: #f1f0f0;
}

.moduleButton {
  height: 70px;
  display: flex;
  overflow: hidden;
  align-items: center;
}

.moduleButton > div:nth-child(1) {
  height: 30px;
  line-height: 30px;
  display: flex;
}

.moduleButton > div:nth-child(1) > div:nth-child(2) {
  margin-left: 15px;
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

.but {
  margin-top: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.but > div {
  width: 68px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
}

.but > div:nth-child(1) {
  margin-right: 15px;
  background-color: #fe5371;
}

.but > div:nth-child(2) {
  margin-left: 15px;
  background-color: #d1d1d1;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

select {
  width: 144px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
  /*padding-left: 14px;*/
  font-size: 14px;
  color: #97969b;
  border: 1px solid #d1d1d1;
  /*text-align: center;*/
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}
</style>