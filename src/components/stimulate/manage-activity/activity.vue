<!--活动管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    活动管理
                </div>
                <div @click="addCommClick">
                    新增活动
                </div>
            </div>
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
                                开始时间
                            </div>
                            <div>
                                结束时间
                            </div>
                            <div>
                                红包发放次数
                            </div>
                            <div>
                                红包发放金额
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <div v-show="dataLists.length == 0" class="nodataBox">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                        <li v-show="dataLists.length > 0" class="dataLi" v-for="(item,index) in dataLists">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.taskName}}
                            </div>
                            <div>
                                {{item.startDate | UnFormatDates}}
                            </div>
                            <div>
                                {{item.endDate | UnFormatDates}}
                            </div>
                            <div>
                                {{item.numOfReleases}}
                            </div>
                            <div>
                                {{item.amountOfPayment}}
                            </div>
                            <div class="operate">
                                <div v-show="item.state == 1 || item.state == 4"><img src="/static/img/graystop.png"></div>
                                <div @click="startactivity(index)" v-show="item.state == '3'"><img src="/static/img/stop.png"></div>
                                <div @click="stopactivity(index)" v-show="item.state == '2'"><img src="/static/img/start.png"></div>
                                <div style="margin:0 20px;" v-show="item.state == '2' || item.state == 4"><img src="/static/img/grayedit.png"></div>
                                <div style="margin:0 20px;" v-show="item.state == '1' || item.state == '3'"><img @click="updateClick(index)" src="/static/img/编辑.png"></div>
                                <div v-show="item.state != '2'"><img @click="deleteClick(index)" src="/static/img/删除.png"></div>
                                <div v-show="item.state == '2'"><img src="/static/img/删除灰.png"></div>
                            </div>
                        </li>
                        <!--<li class="lastLi">
                            <div class="lastLiLeft">

                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSizeNum"
                                    layout="total,prev, pager, next,jumper" :total="totalNum">
                                    </el-pagination>
                            </div>
                        </li>-->
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/select";
import hosdel from "../../cModule/newdel";
export default {
  components: {
    "v-minput": minput,
    "v-select": select,
    "v-hosdel": hosdel
  },
  data() {
    return {
      loading: false,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      checked: false,
      sRecys: ["回收站", "新品"],
      dataLists: [],
      pageSizeNum: 15,
      currentPage: 1,
      totalNum: 15,
      delIndex: "",
      ids: "",
      updateClickTrue: false,
      okClickTrue: false,
      batchTrue: false
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    UnFormatDates(date) {
      var y, m, d, h, f, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      f = t.getMinutes();
      return (
        y +
        "." +
        (m < 10 ? "0" + m : m) +
        "." +
        (d < 10 ? "0" + d : d) +
        "  " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (f < 10 ? "0" + f : f)
      );
    }
  },
  // 模块新建时
  created: function() {
    this.jlList();
  },
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    // 获取激励活动列表
    jlList() {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      self.loading = true;
      self
        .getactivityList({
          token: TOKEN
        })
        .then(data => {
          self.loading = false;
          //   console.log("激励活动列表", data);
          if (data.code == 200) {
            self.dataLists = data.data;
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 开始或停止活动
    batch(m) {
      var self = this;
      if (self.batchTrue == false) {
        self.batchTrue = true;
        self
          .getstartorstop({
            status: m,
            id: self.ids
          })
          .then(data => {
            self.batchTrue = false;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              self.jlList();
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.batchTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 开始活动
    startactivity(index) {
      var self = this;
      self.ids = self.dataLists[index].id;
      var TOKEN = sessionStorage.getItem("token");
      self.loading = true;
      self
        .getactivityList({
          token: TOKEN
        })
        .then(data => {
          self.loading = false;
          //   console.log("激励活动列表", data);
          if (data.code == 200) {
            self.dataLists = data.data;
            if (self.dataLists[index].state == "3") {
              self.batch("1");
            } else {
              return;
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 停止活动
    stopactivity(index) {
      var self = this;
      self.ids = self.dataLists[index].id;
      var TOKEN = sessionStorage.getItem("token");
      self.loading = true;
      self
        .getactivityList({
          token: TOKEN
        })
        .then(data => {
          self.loading = false;
          //   console.log("激励活动列表", data);
          if (data.code == 200) {
            self.dataLists = data.data;
            if (self.dataLists[index].state == "2") {
              self.batch("0");
            } else {
              return;
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 状态选择
    selectStateClick(state) {
      //   console.log(state);
    },
    // 分类选择
    selectTypeClick(type) {
      //   console.log(type);
    },
    // 回收站
    selectRecClick() {},
    // 点击分页
    handleSizeChange() {},
    handleCurrentChange(val) {},
    // 修改活动信息
    updateClick(index) {
      var self = this;
      if (self.updateClickTrue == false) {
        self.updateClickTrue = true;
        var TOKEN = sessionStorage.getItem("token");
        self
          .geteditactivity({
            id: self.dataLists[index].id,
            token: TOKEN
          })
          .then(data => {
            self.updateClickTrue = false;
            if (data.code == 200) {
              let edata = JSON.stringify(data.data);
              sessionStorage.setItem("edata", edata);
              if (data.data.state == "3") {
                // alert('11')
                self.$router.push({
                  path: "/stimulate/editactivity",
                  query: { operation: 1 }
                });
              } else if (data.data.state == "1") {
                self.$router.push({
                  path: "/stimulate/editactivity"
                });
              } else if (data.data.state == "2" || data.data.state == "4") {
                self.$message("活动已经开始或活动已经结束，列表刷新中...");
                self.jlList();
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.updateClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
        self.hiList();
      }
    },
    // 获取健康指标所有数据
    hiList() {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getindicatorList({
          token: TOKEN
        })
        .then(data => {
          //   console.log(data, "健康指标所有数据");
          if (data.code == 200) {
            let allhealthData = JSON.stringify(data.data);
            sessionStorage.setItem("allhealthData", allhealthData);
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 删除
    deleteClick(index) {
      this.titlename = "活动";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 新增活动
    addCommClick() {
      this.$router.push({
        path: "/stimulate/addactivity"
      });
    },
    // 确认删除框
    okClick() {
      //   console.log("确认删除");
      var self = this;
      if (self.okClickTrue == false) {
        self.okClickTrue = true;
        var TOKEN = sessionStorage.getItem("token");
        self
          .getdelactivity({
            id: self.dataLists[self.delIndex].id,
            token: TOKEN
          })
          .then(data => {
            self.okClickTrue = false;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              self.isShowdel = true;
              self.delShow = false;
              self.jlList();
            } else {
              self.isShowdel = true;
              self.delShow = false;
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.okClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    ...mapActions([
      "getactivityList",
      "geteditactivity",
      "getindicatorList",
      "getdelactivity",
      "getstartorstop"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
/*主页*/

.sale {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.sale > div:nth-child(1) {
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
  min-width: 60px;
  height: 35px;
  color: #353535;
  font-size: 16px;
  line-height: 35px;
}

.recycle > div:nth-child(2) {
  margin-left: 10px;
}

.recycle > div:nth-child(3) {
  margin-top: 3px;
  margin-left: 25px;
  width: 70px;
  height: 30px;
  background-color: #fe5371;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
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

.glyphicon-ok {
  color: green;
  font-size: 16px;
}

.glyphicon-remove {
  color: red;
  font-size: 16px;
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

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 16px;
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
}

.dataLi .opexu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dataLi .opexu > div {
  width: 30px;
  height: 30px;
}

.dataLi .opexu > div:nth-child(1) {
  margin-left: 5px;
}

.dataLi .opexu > div:nth-child(2) {
  margin-right: 5px;
}

.opexu img {
  width: 30px;
  font-size: 18px;
  cursor: pointer;
  height: 26px;
}

.dataLi .operate {
  display: flex;
  justify-content: center;
  align-items: center;
}

.operate img {
  /*width: 30px;*/
  font-size: 18px;
  cursor: pointer;
  /*height: 26px;*/
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 14px;
  color: #515151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 160px;
  overflow: hidden;
  min-width: 44px;
}

.listCont li > div:nth-child(2) {
  width: 16%;
  overflow: hidden;
  min-width: 136px;
}

.listCont li > div:nth-child(3) {
  width: 15%;
  min-width: 90px;
}

.listCont li > div:nth-child(4) {
  width: 15%;
  min-width: 90px;
}

.listCont li > div:nth-child(5) {
  width: 10%;
  min-width: 107px;
}

.listCont li > div:nth-child(6) {
  width: 10%;
  min-width: 105px;
}

.listCont li > div:nth-child(7) {
  width: 24%;
  min-width: 130px;
}

.list {
  margin-top: 28px;
  min-height: 540px;
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
</style>