<!--新闻任务获取-->
<template>
  <div class="news">
      <div class="list">
          <div class="listCont" v-loading="loading">
              <ul>
                  <li class="firstLi">
                      <div>任务名称</div>
                      <div>获得积分数</div>
                      <div>每日上限（次）</div>
                      <div>更新时间</div>
                      <div>任务有效期</div>
                      <div>状态</div>
                      <div>操作</div>
                  </li>
                  <li class="dataLi" v-for="(item,index) in lists" :key="index">
                      <div>{{item.name}}</div>
                      <div>{{item.score}}</div>   
                      <div>{{item.dayLimitCount}}</div>
                      <div>{{item.updateDate | timeFun}}</div>
                      <!-- <div>{{item.limitType | limitFun}}</div> -->
                      <div>
                        <div v-show="item.limitType == 0">{{item.limitType | limitFun}}</div>
                        <div class="limitDateClass">{{item.limitDate | timeFun}}</div>
                      </div>
                      <div @click="enableFlagClick(index)">
                        <img v-show="item.enableFlag == 1" src="/static/img/closeBlue.png" alt="禁用" title="禁用">
                        <img v-show="item.enableFlag == 0" src="/static/img/blue.png" alt="禁用" title="禁用">
                      </div>
                      <div>
                        <img src="/static/img/编辑.png" alt="" @click="ucompileClick(index)">
                      </div>
                  </li>
                  <li class="nullList" v-show="dataLists.length == 0">
                      <div>
                          <img src="/static/img/w.png" alt="">
                      </div>
                  </li>
                  <li class="lastLi" v-show="dataLists.length > 0">
                        <div class="lastLiLeft">
                        </div>
                        <!-- <div id="lastLiRight">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum" :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="totalNum">
                            </el-pagination>
                        </div> -->
                  </li>
              </ul>
          </div>
      </div>
      <!-- 修改弹框 -->
      <div :class="{popup:isPopup,showPopup:isShowPopup}">
            <transition name="slide-fade">
                <div class="popupContent" v-show="popupShow" v-loading="popuping">
                <div class="popupTitle">
                    <div>编辑</div>
                    <div @click="closeClick">
                    <img src="/static/img/小叉号@2x.png" alt="">
                    </div>
                </div>
                <div class="popupData">
                    <div>
                        任务名称：
                    </div> 
                    <div>
                        <input type="text" v-model="nameVal" :class="{redBorder:isRedNameVal,grayBorder:isGrayNameVal}">
                    </div>
                    <div :class="{redTest:isRedNameVal,grayTest:isGrayNameVal}">任务名称不支持非法字符</div>                  
                </div>
                <div class="popupData">
                    <div>
                        积分数量：
                    </div> 
                    <div>
                        <input type="text" :disabled="disabled" v-model="scoreVal" :class="{redBorder:isRedScoreVal,grayBorder:isGrayScoreVal}">
                    </div>
                    <div :class="{redTest:isRedScoreVal,grayTest:isGrayScoreVal}">积分数量只能为正整数</div>
                </div>
                <div class="popupData">
                    <div>
                        每日上限：
                    </div> 
                    <div>
                        <select v-model="dayLimitCountVal" @change="dayLimitCountChange" :class="{redBorder:isRedDayLimitCountVal,grayBorder:isGrayDayLimitCountVal}">
                          <option v-for="(item,index) in limitLists" :key="index">{{item.value}}</option>
                        </select>
                        <!-- <input type="text" placeholder="请输入当前积分"> -->
                    </div>
                    <div :class="{redTest:isRedDayLimitCountVal,grayTest:isGrayDayLimitCountVal}">请选择每日上限</div>
                </div>
                <div class="popupData">
                    <div>
                        任务有效期：
                    </div> 
                    <div>
                        <div class="limit">
                          <div @click="limitTypeClick" v-show="limitTypeVal==1"><img src="/static/img/unchecked.png" alt=""></div>
                          <div @click="limitTypeClick" v-show="limitTypeVal==0"><img src="/static/img/checked.png" alt=""></div>
                          <div>长期有效</div>
                        </div>
                        <div class="limit">
                          <div  @click="limitTypeClick" v-show="limitTypeVal==0"><img src="/static/img/unchecked.png" alt=""></div>
                          <div  @click="limitTypeClick" v-show="limitTypeVal==1"><img src="/static/img/checked.png" alt=""></div>
                          <!-- <el-radio v-model="limitTypeVal" label="1">时间：</el-radio> -->
                          <date-picker :options="pickerOptions0" :clearable="true" :editable="false" v-model="limitTimeVal" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px">
                          </date-picker>
                        </div>
                        <div :class="{redTest:isRedlimitTimeVal,grayTest:isGraylimitTimeVal}">请选择有效期</div>                     
                    </div>
                </div>
                <div class="popupButton">
                    <div class="button" @click="butUpdateClick">确定</div>
                    <div @click="cancelClcik">取消</div>
                </div>
                </div>
            </transition>
        </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      nameVal: '',
      isGrayNameVal: true,
      isRedNameVal: false,
      scoreVal: '',
      isGrayScoreVal: true,
      isRedScoreVal: false,
      dayLimitCountVal: '请选择每日上限',
      uploadDayLimitCountVal: '',
      isGrayDayLimitCountVal: true,
      isRedDayLimitCountVal: false,
      limitTypeVal: '',
      limitTimeVal: '',
      isGraylimitTimeVal: true,
      isRedlimitTimeVal: false,
      loading: false,
      disabled: false,
      dataLists: [],
      loading: false,
      lists: [],
      isPopup: true,
      isShowPopup: true,
      popupShow: false, // 控制修改弹框展示隐藏
      popuping: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      limitLists: [
        { value: '请选择每日上限',key: ''},
        { value: '1', key: '1'},
        { value: '2', key: '2'},
        { value: '3', key: '3'},
        { value: '4', key: '4'},
        { value: '5', key: '5'},
        { value: '6', key: '6'},
        { value: '7', key: '7'},
        { value: '8', key: '8'},
        { value: '9', key: '9'},
        { value: '10', key: '10'},
      ],
      enableFlagClickTrueOrFalse: true,
      enableFlagVal: '',
      idVal: '',
    };
  },
  filters: {
    //时间过滤函数
    timeFun: function(val) {
      var time = Number(val);
      if (time) {
        var now = new Date(time);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        var date = now.getDate();
        date = date > 9 ? date : "0" + date;
        var hour = now.getHours();
        hour = hour > 9 ? hour : "0" + hour;
        var minute = now.getMinutes();
        minute = minute > 9 ? minute : "0" + minute;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
      } else {
        return "无";
      }
    },
    // 任务有效期
    limitFun: function(val) {
      if (val == 0) {
        return "长期有效"
      } else if(val == 1) {
        return '有效期'
      }
    }
  },
  created: function() {
    var self = this;
    self.loading = true;
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
      if (arrs.indexOf("getTask") == -1) {
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
        self.getFixationListFun();
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
  mounted: {},
  methods: {
    // 获取固定任务积分配置项
    getFixationListFun() {
      var self = this;
      self
        .getpointIntegralSignGetAttrList({})
        .then(data => {
          if (data.code == 200) {
            self.dataLists = data.data[3];
            self.lists = data.data[3].attrList;
            console.log(self.dataLists);
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
    // 修改启用/禁用状态
    enableFlagClick(index) {
      var self = this
      console.log(self.lists[index].enableFlag)
      if (self.enableFlagClickTrueOrFalse == true) {
        if (self.lists[index].enableFlag == 0) {
          self.enableFlagVal = 1
        } else {
          self.enableFlagVal = 0
        }
        self.getpointIntegralConfigAttrChangeAttrStatus({
          enableFlag: self.enableFlagVal,
          id: self.lists[index].id
        }).then(data => {
          if (data.code == 200) {
            self.$message({
              type: 'success',
              message: '修改状态成功！'
            })
            self.getFixationListFun()
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
    // 切换有效期类型
    limitTypeClick() {
      var self = this
      if (self.limitTypeVal == 0) {
        self.limitTypeVal = 1
      } else if (self.limitTypeVal == 1) {
        self.limitTypeVal = 0
      }
    },
    // 编辑
    ucompileClick(index) {
      var self = this;
      self.isRedNameVal = false
      self.isGrayNameVal = true
      self.isRedScoreVal = false
      self.isGrayScoreVal = true
      self.isRedScoreVal = false
      self.isGrayScoreVal = true
      self.isRedDayLimitCountVal = false
      self.isGrayDayLimitCountVal = true
      self.isRedlimitTimeVal = false
      self.isGraylimitTimeVal = true
      self.isShowPopup = false;
      self.popupShow = true;
      console.log(self.lists[index].name)
      if (self.lists[index].name == "每日签到") {
        self.disabled = true
      } else {
        self.disabled = false
      }
      self.idVal = self.lists[index].id
      self.nameVal = self.lists[index].name
      self.scoreVal = self.lists[index].score
      self.dayLimitCountVal = self.lists[index].dayLimitCount
      self.uploadDayLimitCountVal = self.lists[index].dayLimitCount
      self.limitTypeVal = self.lists[index].limitType
      self.limitTimeVal = self.lists[index].limitDate
    },
    // 关闭
    closeClick() {
      this.isShowPopup = true;
      this.popupShow = false;
    },
    //正则验证
    validateFun() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"); //不支持非法字符
      var reg_3 = /^\+?[1-9]\d*$/;// 只能输入正整数
      if (reg_1.test(this.nameVal) || reg_2.test(this.nameVal)) {
        this.isRedNameVal = true;
        this.isGrayNameVal = false;
      }
      if (reg_1.test(this.scoreVal) || !reg_3.test(this.scoreVal)) {
        this.isRedScoreVal = true;
        this.isGrayScoreVal = false;
      }
      if (this.dayLimitCountVal=="请选择每日上限") {
        this.isRedDayLimitCountVal = true;
        this.isGrayDayLimitCountVal = false;
      }
      if (reg_1.test(this.limitTypeVal)) {
          this.isRedlimitTimeVal = true;
          this.isGraylimitTimeVal = false;
      } else {
        if (this.limitTypeVal=='1') {
          if (reg_1.test(this.limitTimeVal)) {
            this.isRedlimitTimeVal = true;
            this.isGraylimitTimeVal = false;
          }       
        }
      }
      if (
        this.isRedNameVal == true ||
        this.isRedScoreVal == true ||
        this.isRedScoreVal == true ||
        this.isRedDayLimitCountVal == true ||
        this.isRedlimitTimeVal == true
      ) {
        return false;
      }
    },
    // 确认修改
    butUpdateClick() {
      var self = this
      if (self.validateFun() == false) {
        return false
      } else {
        var obj = {
          name: self.nameVal,
          score: self.scoreVal,
          dayLimitCount: self.uploadDayLimitCountVal,
          limitType: self.limitTypeVal,
          id: self.idVal,
        }
        if (self.limitTypeVal == 1) {
            var timeVal = new Date(self.limitTimeVal);
            var year = timeVal.getFullYear();
            var month = (timeVal.getMonth() + 1).toString();
            var day = timeVal.getDate().toString();
            var hour = timeVal.getHours().toString();
            var minute = timeVal.getMinutes().toString();
            var second = timeVal.getSeconds().toString();
            if (month.length == 1) {
              month = "0" + month;
            }
            if (day.length == 1) {
              day = "0" + day;
            }
            if (hour.length == 1) {
              hour = "0" + hour;
            }
            if (minute.length == 1) {
              minute = "0" + minute;
            }
            if (second.length == 1) {
              second = "0" + second;
            }
            var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            obj.limitTime = dateTime
            console.log(obj.limitTime)
        }
        self.getpointIntegralConfigAttrUpdateConfigAttr(obj)
        .then(data => {
              if (data.code == 200) {
                self.isShowPopup = true;
                self.popupShow = false;
                self.getFixationListFun()
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
    // 取消修改弹出框
    cancelClcik() {
      this.isShowPopup = true;
      this.popupShow = false;
    },
    // 每日上限change
    dayLimitCountChange() {
      var self = this
      if (self.dayLimitCountVal == '请选择每日上限') {
        self.uploadDayLimitCountVal = ''
      } else {
        self.uploadDayLimitCountVal = self.dayLimitCountVal
      }
      console.log(self.dayLimitCountVal)
    },
    ...mapActions(["getpointIntegralSignGetAttrList","getpointIntegralConfigAttrChangeAttrStatus","getpointIntegralConfigAttrUpdateConfigAttr"])
  },
  watch: {
    nameVal:function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"); //不支持非法字符
      var reg_3 = /^\+?[1-9]\d*$/;// 只能输入正整数
      if (reg_1.test(this.nameVal) || reg_2.test(this.nameVal)) {
        this.isRedNameVal = true;
        this.isGrayNameVal = false;
      } else {
        this.isRedNameVal = false;
        this.isGrayNameVal = true;
      }
    },
    scoreVal: function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"); //不支持非法字符
      var reg_3 = /^\+?[1-9]\d*$/;// 只能输入正整数
      if (reg_1.test(this.scoreVal) || !reg_3.test(this.scoreVal)) {
        this.isRedScoreVal = true;
        this.isGrayScoreVal = false;
      } else {
        this.isRedScoreVal = false;
        this.isGrayScoreVal = true;
      }
    },
    dayLimitCountVal: function(val) {
      if (val=="请选择每日上限") {
        this.isRedDayLimitCountVal = true;
        this.isGrayDayLimitCountVal = false;
      } else {
        this.isRedDayLimitCountVal = false;
        this.isGrayDayLimitCountVal = true;
      }
    },   
  }
};
</script>
<style scoped>
.news {
  width: 92%;
  min-height: 500px;
  margin: 0 1%;
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

.news > div {
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
  min-width: 115px;
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
  width: 24px;
  height: 24px;
}

.listCont li {
  display: flex;
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 40px;
  height: 40px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
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
  font-size: 15px;
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

.dataLi > div:nth-child(6),
.dataLi > div:nth-child(7) {
  cursor: pointer !important;
}

.limitDateClass {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  cursor: pointer;
  text-align: center;
}

.dataLi > div:nth-child(3),
.dataLi > div:nth-child(4),
.dataLi > div:nth-child(5),
.dataLi > div:nth-child(6) {
  text-align: center;
  min-width: 70px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
  min-width: 70px;
}

.listCont li > div:nth-child(1) {
  width: 10%;
  min-width: 70px;
  text-align: center;
}

.listCont li > div:nth-child(2) {
  width: 20%;
  min-width: 100px;
}

.listCont li > div:nth-child(3) {
  width: 15%;
  min-width: 70px;
}

.listCont li > div:nth-child(4) {
  width: 15%;
  min-width: 70px;
}

.listCont li > div:nth-child(5) {
  width: 15%;
  min-width: 70px;
}

.listCont li > div:nth-child(6) {
  width: 10%;
  min-width: 70px;
}

.listCont li > div:nth-child(7) {
  width: 15%;
  min-width: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  margin-top: 35px;
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
  width: 180px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  /* appearance: none; */
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  /* border: 1px solid #d1d1d1; */
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

/* 弹出框 */
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
  justify-content: flex-start;
  align-items: center;
  margin: 30px 100px;
}

.popupData > div:nth-child(2) {
  margin-right: 20px;
}

.popupData > div:nth-child(2) {
  margin-left: 15px;
}

.popupData:nth-child(5) {
  display: flex;
  justify-content: flex-start;
  align-items:baseline;
}

.limit {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  height: 22px;
}

.limit > div {
  margin-right: 15px;
}

.limit > div:nth-child(1) img {
  width: 18px;
  height: 18px;
}


.limit > div:nth-child(2) img {
  width: 18px;
  height: 18px;
}

.popupData:nth-child(5) > div:nth-child(2) >div {
  margin-bottom: 20px;
}

.popupData:nth-child(5) > div:nth-child(1) {
  margin-left: -14px !important;
}

.popupData input {
  width: 180px;
  height: 32px;
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

.popupButton {
  display: flex;
  margin: 30px auto 25px auto;
}
.popupButton > div {
  width: 80px;
  height: 36px;
  cursor: pointer;
  margin-left: 30%;
}

.popupButton > .button {
  width: 80px;
  height: 36px;
  background-color: #ff8a41;
  text-align: center;
  line-height: 36px;
  border-radius: 3px;
  color: #fff;
  margin-right: 50px;
}

.popupButton > div:nth-child(2) {
  width: 80px;
  height: 36px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 36px;
}

input {
  width: 200px;
  height: 38px;
  border-radius: 4px;
  color: #303030;
  /* text-align: center; */
  padding-left: 10px;
}

.popupContent {
  width: 600px;
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
  font-size: 15px;
  font-weight: bold;
}

.popupContent .popupTitle div:nth-child(2) {
  margin-left: 520px;
  cursor: pointer;
}

.popupTitle div:nth-child(2) img {
  width: 15px;
  height: 15px;
}
</style>
