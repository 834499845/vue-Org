<!--勋章管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="medal">
        <div>
            <div class="listTitle">
                <div>
                    勋章管理
                </div>
                <div @click="addClick">
                    新增勋章
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
                            <div>勋章图片</div>
                            <div>勋章名称</div>
                            <div>所需积分</div>
                            <div>状态</div>
                            <div>操作</div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists" :key="item.actionName">
                            <div class="dataCheck">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="item.actionName">{{checkNull}}</el-checkbox>
                                </el-checkbox-group>
                                <div>{{index + 1}}</div>                                                                    
                            </div>
                            <div class="medalImg" @click="bigImgClick(index)">
                              <img :src="item.itemBrightImage" alt="">
                            </div>
                            <div>{{item.name |　strFun}}</div>                                                            
                            <div>{{item.score | strFun}}</div>
                            <div @click="stateClick(index)">
                              <img v-show="item.state == 1" src="/static/img/closeBlue.png" alt="">
                              <img v-show="item.state == 0" src="/static/img/blue.png" alt="">
                            </div>                                                                                                                     
                            <div class="operate">
                                <div @click="ucompileClick(index)">
                                    <img src="/static/img/编辑.png">
                                </div>
                                <!-- <div @click="deleteClick(index)">
                                    <img src="/static/img/删除.png">
                                </div> -->
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
                    <!-- <div @click="deletsClick">
                        删除
                    </div> -->
                </div>
            </div>
        </div>
        <!--删除弹框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @del="delClick" @canle="cancleClick" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
        <!-- 查看大图弹框 -->
        <div :class="{popup:isPopup,showPopup:isShowPopup}">
            <transition name="slide-fade">
                <div class="popupContent" v-show="popupShow" v-loading="popuping">
                  <div class="popupTitle">
                      <div>查看勋章详情</div>
                      <div @click="closeClick">
                      <img src="/static/img/小叉号@2x.png" alt="">
                      </div>
                  </div>
                  <div class="popupData">
                    <img :src="bigImgUrl" alt="">
                  </div>
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
      bigImgUrl: '',
      stateClickTrueOrFalse: true,
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
      labelIds: "",
      siteIds: "",
      searchClickTrueOrFalse: false,
      isPopupisPopup: true,
      isPopup: true,
      isShowPopup: true,
      popupShow: false, // 控制修改弹框展示隐藏
      popuping: false
    };
  },
  // 过滤器
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
  // 初始化函数
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
        if (ele.name == "积分管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("medel") == -1) {
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
          self.listFun();
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
  // 计算
  mounted() {},
  // 函数
  methods: {
    // 勋章列表
    listFun() {
      var self = this;
      self.loading = true;
      self.checkList = [];
      self.checked = false;
      sessionStorage.removeItem("movementcurrentPage");
      sessionStorage.removeItem("movementpageSizeNum");
      self
        .getpointIntegralMedalGetMedalByPage({
          pageNo: self.currentPage,
          pageSize: self.pageSizeNum
        })
        .then(data => {
          self.loading = false;
          if (data.code == 200) {
            self.lists = [];
            self.totalNum = data.data.total
            if (data.data.records.length > 0) {
              self.lists = data.data.records;
              console.log(self.lists);
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
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // 全选
    numChange(event) {
      this.checkList = event.target.checked ? this.lists : [];
    },
    // 选取序号
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.lists.length;
    },
    // 分页-每页条数
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.listFun()
    },
    // 分页-当前页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.listFun()
    },
    // 编辑
    ucompileClick(index) {
      var self = this;
      this.$router.push({
        path: "/point/ucompileMedel",
      });
      sessionStorage.setItem("medelIndex",index+1)
      sessionStorage.setItem("idVal",self.lists[index].id)
      sessionStorage.setItem("nameVal",self.lists[index].name)
      sessionStorage.setItem("scoreVal",self.lists[index].score)
      sessionStorage.setItem("detailBrightImage",self.lists[index].detailBrightImage)
      sessionStorage.setItem("detailGrayImage",self.lists[index].detailGrayImage)
      sessionStorage.setItem("itemBrightImage",self.lists[index].itemBrightImage)
      sessionStorage.setItem("itemGrayImage",self.lists[index].itemGrayImage)
    },
    // 新增勋章
    addClick(index) {
      this.$router.push({
        path: "/point/addMedel",
      });
      sessionStorage.setItem("indexNumber",this.lists.length+1)
    },
    // 查看大图弹框
    bigImgClick(index) {
      var self = this;
      self.isShowPopup = false;
      self.popupShow = true;
      self.bigImgUrl = self.lists[index].detailBrightImage
    },
    // 关闭
    closeClick() {
      this.isShowPopup = true;
      this.popupShow = false;
    },
    // 状态
    stateClick (index) {
      var self = this
      if (self.stateClickTrueOrFalse == true) {
        if (self.lists[index].state == '0') {
          self.stateVal = 1
        } else if (self.lists[index].state == '1') {
          self.stateVal = 0
        }
        self.getpointIntegralMedalUpdate({
          state: self.stateVal,
          id: self.lists[index].id
        }).then(data => {
              if (data.code == 200) {
                self.listFun()
                self.$message({
                  type: 'success',
                  message: '修改状态成功！'
                })
              } else {
                    self.$message({
                        type: 'info',
                        message: data.message
                    })
              }
        }).catch(msg => {
              self.$message({
                    type: 'info',
                    message: '服务器异常'
              })
        })
      }
    },
    // 删除
    deleteClick(index) {
      this.isShowdel = false;
      this.delShow = true;
    },
    // 确认删除
    delClick() {
      var self = this;
      
    },
    // cancel delete
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
      this.titlename = "";
      this.isShowRecycle = true;
      this.RecycleShow = false;
    },
    ...mapActions([
      "getpointIntegralMedalGetMedalByPage",
      "getpointIntegralMedalUpdate"
    ])
  },
  // 监视
  watch: {
    nameVal: function(val) {
      var self = this;
      if (val.length == 0) {
        self.nameValUp = "";
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

.medal {
  width: 100%;
  height: 100%;
}

.medal > div {
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

.medalImg img {
  width: 74px;
  height: 74px;
  cursor: pointer;
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
  margin-top: 35px;
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
  border: 1px solid #ff8a41;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #ff8a41;
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

.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showPopup {
  display: none;
}

.popupData {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 25px; */
  padding: 60px 50px 50px 50px;
}

.popupData img {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

.redTest {
  color: #fe5371 !important;
}

.grayTest {
  color: #908f95 !important;
}

.redBorder {
  border: 1px solid #fe5371 !important;
}

.grayBorder {
  border: 1px solid #d1d1d1 !important;
}

input {
  width: 150px !important;
  height: 36px;
  border-radius: 4px;
  color: #303030;
  /* text-align: center; */
  padding-left: 10px;
}

.popupContent {
  width: 650px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.popupContent .popupTitle {
  display: flex;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #f2f4f8;
  width: 100%;
  border-bottom: 1px solid #d1d1d1;
  margin-top: -50;
  font-size: 17px;
  font-weight: bold;
}

.popupContent .popupTitle div:nth-child(2) {
  margin-left: 490px;
  cursor: pointer;
}

.popupTitle div:nth-child(2) img {
  width: 18px;
  height: 18px;
}
</style>