<!--医学报告-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="medicalReport">
      <div class="lists">
        <div class="listContent">
          <ul class="itemContent">
            <li v-for="(item,index) in dataLists" :key="index">
              <div class="itemTitle">
                <div>类型 :&nbsp;</div>
                <div>{{item.type | typeFun}}</div>
              </div>
              <div class="itemTitle">
                <div>机构名称 :&nbsp;</div>
                <div>{{item.name | strFun}}</div>                        
              </div>
              <div class="itemTitle">
                <div>添加日期: &nbsp;</div> 
                <div>{{item.date}}</div> 
              </div>
              <div v-for="(img,imgIndex) in imgList" :key="imgIndex" @click="bigClick(imgIndex,bigImgs)">
                <img :src="img" alt=""> 
              </div>                                                                                               
            </li>
            <!-- <li v-for="(item,ind) in dataLists" :key="ind">
              <div class="itemTitle">
                <div>类型 :&nbsp;</div>
                <div>{{item.type}}</div>
              </div>
              <div class="itemTitle">
                <div>机构名称 :&nbsp;</div>
                <div>{{item.name}}</div>                        
              </div>
              <div class="itemTitle">
                <div>添加日期: &nbsp;</div> 
                <div>{{item.date}}</div> 
              </div>
              <div v-for="(list,index) in dataLists" :key="index" class="detail">
                <div>
                  <img :src="list.url" alt="">
                </div>
                <div>
                  <div clasa="abstract">
                    <div>报告摘要 :&nbsp;</div>
                    <div>{{list.content}}</div>
                  </div>
                  <div class="lookDetail" @click="detailLook">查看详情</div>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
        <div class="noList" v-show="dataLists.length == 0">
          <img src="/static/img/w.png" alt="">
        </div>
        <!-- 点击查看大图弹出框  -->
        <div :class="{imgPopup:isImgPopup,showImg:isShowImg}">
          <transition name="slide-fade">
            <div v-show="imgShow" class="imgContent">
              <div @click="cancelClick">
                    <img src="/static/img/小叉号@2x.png" alt="">
              </div>
              <div @click="previousClick">
                <img :src="imgUrlLeft" alt=""  @mouseover="leftMoveOver" @mouseout="leftMoveOut">
              </div>
              <div class="bigImg">
                <img :src="imgUrl" alt="">
              </div>
              <div @click="nextClick">
                <img :src="imgUrlRight" alt="" @mouseover="rightMoveOver" @mouseout="rightMoveOut">
              </div>
            </div> 
          </transition>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dataLists: [], //数据列表
      imgList: [], //图片列表
      bigImgs: [], //大图列表
      isImgPopup: false, //控制大图显示样式
      isShowImg: true, //控制大图弹出框显示或隐藏
      imgShow: false, //控制大图弹出框显示或隐藏
      imgUrl: "", //存储大图片路径
      url: "", //图片路径
      imgNum: 0, //存储图片Index
      imgUrlLeft: "/static/img/向左点击@2x.png", //查看大图上一页图标
      imgUrlRight: "/static/img/向右点击@2x.png" //查看大图下一页图标
    };
  },
  //模块新建时
  created: function() {
    var self = this;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "健康管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("user") == -1) {
        self.loading = true;
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
        self.loading = false;
        self.getHealthFileListFun();
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
  // 过滤
  filters: {
    // 时间过滤
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
          "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute
        );
      } else {
        return "无";
      }
    },
    // 类型过滤
    typeFun: function(val) {
      // var typeStr = val
      if (val == "1") {
        return "体检报告";
      } else {
        return "病例";
      }
    },
    //名称类过滤
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    }
  },
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    // 查询医学报告数据
    getHealthFileListFun() {
      var self = this;
      self
        .gethealthRecordshgetHealthRecordsDetail({
          userId: sessionStorage.getItem("idUser")
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (data.data.healthRecordsInfo) {
                if (data.data.healthRecordsInfo.medicalReport) {
                  self.dataLists = data.data.healthRecordsInfo.medicalReport;
                  self.dataLists.forEach(function(ele, ind) {
                    self.imgList = self.dataLists[ind].pictures.split(",");
                    self.bigImgs = self.imgList;
                  });
                  // console.log(self.dataLists)
                } else {
                  self.dataLists = [];
                }
              } else {
                self.dataLists = [];
              }
            } else {
              self.dataLists = [];
            }
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
            message: "服务器错误"
          });
        });
    },
    //查看大图
    bigClick(imgIndex) {
      var self = this;
      self.isImgPopup = true;
      self.isShowImg = false;
      self.imgShow = true;
      self.imgUrl = self.bigImgs[imgIndex];
      self.imgNum = imgIndex;
    },
    //取消弹出框
    cancelClick() {
      var self = this;
      self.imgShow = false;
      self.isShowImg = true;
      self.isImgPopup = false;
    },
    //查看详情
    detailLook() {
      var self = this;
    },
    //鼠标进入左翻页图片
    leftMoveOver() {
      var self = this;
      self.imgUrlLeft = "/static/img/向左未点击@2x.png";
    },
    //鼠标离开左翻页图片
    leftMoveOut() {
      var self = this;
      self.imgUrlLeft = "/static/img/向左点击@2x.png";
    },
    //鼠标进入右翻页图片
    rightMoveOver() {
      var self = this;
      self.imgUrlRight = "/static/img/向右未点击@2x.png";
    },
    //鼠标离开右翻页图片
    rightMoveOut() {
      var self = this;
      self.imgUrlRight = "/static/img/向右点击@2x.png";
    },
    //点击查看上一张图片
    previousClick() {
      var self = this;
      if (self.imgNum == 0) {
        self.$message({
          type: "info",
          message: "已经是第一张图片啦！"
        });
      } else {
        self.imgNum--;
        self.imgUrl = self.bigImgs[self.imgNum];
      }
    },
    //点击查看下一张图片
    nextClick() {
      var self = this;
      if (self.imgNum == self.bigImgs.length - 1) {
        self.$message({
          type: "info",
          message: "已经是最后一张图片啦！"
        });
      } else {
        self.imgNum++;
        self.imgUrl = self.bigImgs[self.imgNum];
      }
    },
    ...mapActions(["gethealthRecordshgetHealthRecordsDetail"])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.medicalReport {
  width: 100%;
  min-height: 200px;
  margin: 50px 100px auto 0px;
}

.lists {
  margin: 20px 120px;
}

.listContent ul li {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.itemTitle {
  display: flex;
  width: 33%;
}

.itemContent img {
  width: 150px;
  height: 150px;
  margin: 20px 15px;
  border: 5px solid #ddd;
}

.showImg {
  display: none;
}

.imgPopup {
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

.imgContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 950px;
  height: 800px;
  border: 1px solid #d1d1d1;
  background: #fff;
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
}

.imgContent div:nth-child(1) {
  position: absolute;
  right: 10px;
  top: 10px;
}

.imgContent div:nth-child(1) img {
  width: 30px;
  height: 30px;
  border: 1px solid #d1d1d1;
  border-radius: 50%;
  padding: 5px;
}

.bigImg {
  overflow: hidden;
  margin-left: 30px;
  margin-right: 30px;
}

.bigImg > img {
  width: 800px;
  /* height: 450px; */
  border: 3px solid #d1d1d1;
}

/* 报告详情 */
.detail {
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail > div:nth-child(2) > div:nth-child(1) {
  display: flex;
  margin-top: -45px;
  margin-bottom: 40px;
}

.detail img {
  border: 5px solid #d1d1d1;
}

.lookDetail {
  color: #0076ff;
  cursor: pointer;
}

.noList {
  height: 400px;
  border: 0;
}

.noList {
  width: 607px;
  height: 400px;
  margin: 3% 20%;
  border: 0;
  overflow: hidden;
}
</style>