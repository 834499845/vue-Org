<!--新增动作管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="lookdrill">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="caneleClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="look">
                    <div>训练描述：</div>
                    <div>{{describeText}}</div>
                </div>
                <div class="lookCover">
                    <div>封面图：</div>
                    <div>
                        <img :src="imageCorve" alt="">
                    </div>
                </div>
                <div class="lookBg">
                    <div>背景图：</div>
                    <div>
                        <img :src="imageBg" alt="">
                    </div>
                </div>
                <div class="look">
                    <div>
                        有无器材：
                    </div>
                    <div>
                        {{anyEquipment}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        级别：
                    </div>
                    <div>
                        {{level}}
                    </div>
                </div>
                <div class="lookList">
                    <div>
                        动作列表：
                    </div>
                    <div class="lookListCont">
                        <ul>
                            <li class="firstLi">
                                <div>动作名称</div>
                                <div>时长</div>
                                <div>操作</div>
                            </li>
                            <li class="dataLi" v-for="(item,index) in lists">
                                <div>{{item.actionName}}</div>
                                <div>{{item.time | timeFun}}</div>
                                <div class="option">
                                    <div @click="updateClick(index)"><img src="/static/img/编辑.png" alt=""></div>
                                    <!-- <div @click="deleteClick(index)"><img src="/static/img/删除.png" alt=""></div> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @del="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDel>
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
      title: "训练详情",
      loading: false,
      lists: [],
      imageBg: "",
      imageCorve: "",
      describeText: "",
      anyEquipment: "",
      anyEquipmentVal: "",
      level: "",
      levelVal: "",
      siteId: "",
      labelId: "",

      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      deling: false
    };
  },
  // 过滤
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
        if (ele.name == "健身管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("drill") == -1) {
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
        self.uplistFun();
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
    // 确认添加
    listFun() {
      var self = this;
    },
    uplistFun() {
      var self = this;
      var id = "";
      id = self.$route.query.id;
      self
        .getfitnessTrainControllerfindTrainActionById({
          id: id
        })
        .then(data => {
          //console.log("详情", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            self.trainName = data.data.trainName;
            self.imageBg = data.data.backgroundMap || "";
            self.imageCorve = data.data.coverSheet || "";
            self.describeText = data.data.describe || "";
            self.siteId = data.data.siteId || "";
            self.labelId = data.data.labelId || "";
            var levelStr = data.data.level || "";
            self.levelVal = data.data.level;
            self.anyEquipmentVal = data.data.anyEquipment;
            if (data.data.anyEquipment == 1) {
              self.anyEquipment = "无";
            } else {
              self.anyEquipment = "有";
            }
            if (levelStr == 1) {
              self.level = "中级";
            } else if (levelStr == 2) {
              self.level = "高级";
            } else {
              self.level = "初级";
            }
            self.lists = data.data.actionList;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    updateClick(index) {
      var self = this;
      var id = "";
      id = self.$route.query.id;
      this.$router.push({
        path: "/fitness/updateDrill",
        query: { op: 2, back: 1, id: self.lists[index].actionId, parentId: id }
      });
    },
    deleteClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
      this.titlename = "动作";
    },
    // affirm delete
    delClick() {
      var self = this;
      self.deling = true;
      self.lists.splice(self.delIndex, 1);
      var ids = self.lists.map(function(ele) {
        return ele.actionId;
      });
      var id = "";
      id = self.$route.query.id;
      var ipdateObj = {};
      ipdateObj = {
        id: id,
        trainName: self.trainName,
        describe: self.describeText,
        coverSheet: self.imageCorve,
        backgroundMap: self.imageBg,
        labelId: self.labelId,
        siteId: self.siteId,
        anyEquipment: parseInt(self.anyEquipmentVal),
        level: parseInt(self.levelVal),
        actionIds: JSON.stringify(ids)
      };
      self
        .getfitnessTrainControllerupdateById(ipdateObj)
        .then(dataThr => {
          self.deling = false;
          self.isShowdel = true;
          self.delShow = false;
          //console.log("删除成功", JSON.parse(JSON.stringify(dataThr)));
          if (dataThr.code == 200) {
            self.$message({
              type: "info",
              message: "删除成功!"
            });
            self.uplistFun();
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.deling = false;
          self.isShowdel = true;
          self.delShow = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // cancel delete
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
      this.titlename = "";
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      this.$router.push({
        path: "/fitness/drill"
      });
    },
    ...mapActions([
      "getfitnessTrainControllerfindTrainActionById",
      "getfitnessLabellControllerselectLabellPage",
      "getfitnessSiteControllerselectSitePage",
      "getfitnessTrainControllerupdateById"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.lookListCont li {
  height: 50px;
  display: flex;
  border-bottom: 1px solid #d1d1d1;
}

.firstLi {
  border-top: 1px solid #d1d1d1;
}

.firstLi > div {
  line-height: 50px;
  text-align: center;
}

.lookListCont li > div {
  border-right: 1px solid #d1d1d1;
}

.lookListCont li > div:nth-child(1) {
  width: 300px;
  border-left: 1px solid #d1d1d1;
  text-align: center;
  line-height: 50px;
}

.lookListCont li > div:nth-child(2) {
  width: 70px;
  line-height: 50px;
  text-align: center;
}

.lookListCont li > div:nth-child(3) {
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lookListCont li > div:nth-child(3) > div:nth-child(1) {
  margin-right: 9px;
}

.lookListCont li > div:nth-child(3) > div:nth-child(2) {
  margin-left: 9px;
}

.option {
  display: flex;
}

.option > div {
  width: 24px;
  height: 24px;
  overflow: hidden;
}

.option > div img {
  width: 100%;
  height: 100%;
}

.lookList {
  display: flex;
  margin-bottom: 40px;
}

.lookListCont {
  width: 500px;
  min-height: 30px;
  margin-left: 15px;
}

.lookList > div:nth-child(1) {
  width: 120px;
  text-align: right;
  height: 30px;
  line-height: 30px;
}

.look {
  display: flex;
  align-items: center;
}

.lookCover {
  display: flex;
}

.lookBg {
  display: flex;
}

.look > div:nth-child(1) {
  width: 120px;
  text-align: right;
  height: 30px;
  line-height: 30px;
}

.look > div:nth-child(2) {
  margin-left: 12px;
}

.lookCover > div:nth-child(1) {
  width: 120px;
  text-align: right;
  height: 30px;
  line-height: 30px;
}

.lookCover > div:nth-child(2) {
  width: 310px;
  height: 170px;
  border: 1px solid #d1d1d1;
  margin-left: 12px;
}

.lookCover > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.lookBg > div:nth-child(1) {
  width: 120px;
  text-align: right;
  height: 30px;
  line-height: 30px;
}

.lookBg > div:nth-child(2) {
  width: 170px;
  height: 150px;
  border: 1px solid #d1d1d1;
  margin-left: 12px;
}

.lookBg > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.list > div {
  margin-top: 15px;
}

.list > div:nth-child(1) {
  margin-top: 24px;
}

.list {
  min-height: 540px;
}

.lookdrill > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.listTitle {
  height: 58px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  width: 120px;
  height: 27px;
  margin-top: 12px;
  float: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.listTitle > div:nth-child(1) > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 0px;
  margin-left: 10px;
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