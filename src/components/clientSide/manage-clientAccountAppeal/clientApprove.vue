<!--账号申诉 - 审核-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientLookDetail">
        <div>
            <div class="listTitle">
                <div @click="backaClick">
                    <img src="/static/img/返回蓝.jpg" alt="返回">
                </div>
                <div>
                    申诉审核
                </div>
            </div>
            <!-- 数据 -->
            <div class="list">
              <div class="listTop">
                <div>
                  <div>审核状态：</div>
                  <div>{{dataList.appealStatus | auditFun}}</div>
                </div>
                <div>
                  <div>申请审核时间：</div>
                  <div>{{dataList.createDate | timeFun}}</div>
                </div>
              </div>
              <div class="listContent">
                <div>
                  <div>申请人资料：</div>
                  <div class="listItem">
                    <div>
                      <div>昵称：</div>
                      <div>{{dataList.nickName | strFun}}</div>
                    </div>
                    <div>
                      <div>账号：</div>
                      <div>{{dataList.account | strFun}}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>申请认证信息：</div>
                  <div class="listItem">
                    <div>
                      <div>真实姓名：</div>
                      <div>{{dataList.realName | strFun}}</div>
                    </div>
                    <div>
                      <div>手机号：</div>
                      <div>{{dataList.oldPhone | strFun}}</div>
                    </div>
                    <div>
                      <div>身份证号：</div>
                      <div>{{dataList.idNumber | strFun}}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>身份证照片：</div>
                  <div class="listItem imgItem">
                    <div>
                      <div>身份证正面：</div>
                      <div @click="bigFrontClick">
                        <img :src="dataList.cardRightImg" alt="暂无照片">
                      </div>
                    </div>
                    <div>
                      <div>身份证反面：</div>
                      <div @click="bigBackClick">
                        <img :src="dataList.cardLeftImg" alt="暂无照片">
                      </div>
                    </div>
                    <div>
                      <div>手持身份证：</div>
                      <div  @click="bigHandleClick">
                        <img :src="dataList.handCardImg" alt="暂无照片">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="listButton">
                <div @click="refuseClick">拒绝</div>
                <div @click="passClick">通过</div>
              </div>
            </div>
        </div> 
        <!-- 点击可查看大图  -->
        <div :class="{bigPopup:isBigPopup,showBig:isShowBig}">
          <transition name="slide-fade">
                <div class="bigContent" v-show="bigShow">
                    <div class="bigTitle">
                        <div></div>
                        <div @click="closeClick">
                            <img src="/static/img/小叉号@2x.png" alt="关闭">
                        </div>
                    </div>
                   <div class="bigData">
                     <img :src="bigImgUrl" alt="图片加载失败">
                   </div>
                </div>
            </transition>
        </div>
        <!-- 拒绝原因弹框 -->
        <div :class="{refusePopup:isRefusePopup,showRefuse:isShowRefuse}">
          <div class="refuseContent">
            <div class="refuseTitle">
              拒绝原因列表
            </div>
            <div class="refuseData">
              <ul>
                <li v-for="(item,index) in refuseList" :key="index" class="causeLi">
                  <div v-if="item.show == false" class="causeLiselectImg" @click="causeSelectAllClick(index)">
                    <img src="/static/img/show.png" alt="选中">
                  </div>
                  <div v-else class="causeLiSelect" @click="causeSelectAllClick(index)">
                  </div>
                  <div>
                    <span>{{item.value}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="refuseButton">
              <div @click="butRefuseClick">确定</div>
              <div @click="cancelClick">取消</div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      refuseClickTrueOrFalse: true,//控制拒绝弹框
      passClickTrueOrFalse: true,//控制通过提交
      submitClickTrurOrFalse: true,//控制拒绝提交
      isRefusePopup: true, //控制拒绝原因弹框样式
      isShowRefuse: true, //控制拒绝原因弹框显示隐藏
      refuseShow: false, //控制拒绝原因弹框显示与隐藏
      bigImgUrl: "", //大图路径
      isBigPopup: true, //控制弹框样式
      isShowBig: true, //控制弹框显示隐藏
      bigShow: false, //控制弹框显示隐藏
      refuseList: [],//拒绝原因列表
      causeList: [],//拒绝原因
      dataList:[],//数据列表
      states: '',
    };
  },
  // 过滤
  filters: {
    //时间过滤函数
    timeFun: function (val) {
        var time = Number(val)
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
          return year + "-" + month + "-" + date + " " + hour + ":" + minute
          
        } else {
          return "无";
        }
    },
    // 审核状态过滤
    auditFun: function(val) {
        if (val == 0) {
          return "待审核"
        } else if (val == 1) {
          return "已认证"
        } else if(val == 2){
          return "审核未通过"
        } else {
         return "暂无数据"
        }  
    },
    // 名称类过滤
    strFun: function(val) {
      if (val) {
        return val
      } else {
        return "暂无数据"
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
        if (ele.name == "前台管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("clientSideAccount") == -1) {
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
        self.lookApplyDataListFun ()
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
    // 查看指定申诉记录
    lookApplyDataListFun () {
      var self = this;
      self.getClientAppealgetAppealById({
        appealId:sessionStorage.getItem("id"),
      }).then(data => {
        self.dataList = []
        if (data.code == 200) {
          if (data.data) {
              self.dataList = data.data
          } 
        } else {
          self.$message({
            type: 'info',
            message: data.message
          })
        }
      }).catch(msg => {
        self.$message({
            type: 'info',
            message: "服务器异常"
        })
      })
      
    },
    // 所有选项被选中时
    causeSelectAllClick(index) {
      this.refuseList[index].show = !this.refuseList[index].show;
    },
    // 返回
    backaClick() {
      var self = this;
      sessionStorage.removeItem("id"),
      self.$router.push({
        path: "/clientSide/clientAccountAppeal"
      });      
    },
    // 查看身份证正面大图
    bigFrontClick() {
      var self = this;
      self.isShowBig = false;
      self.bigShow = true;
      self.bigImgUrl = self.dataList.cardRightImg;
    },
    // 查看身份证反面大图
    bigBackClick() {
      var self = this;
      self.isShowBig = false;
      self.bigShow = true;
      self.bigImgUrl = self.dataList.cardLeftImg;
    },
    // 查看手持身份证大图
    bigHandleClick() {
      var self = this;
      self.isShowBig = false;
      self.bigShow = true;
      self.bigImgUrl = self.dataList.handCardImg;
    },
    // 取消拒绝原因弹框
    cancelClick () {
      this.isShowRefuse = true
    },
    // 关闭大图弹框
    closeClick() {
      var self = this;
      self.isShowBig = true;
      self.bigShow = false;
      self.isShowRefuse = true;
      self.refuseShow = false;
    },
    // 通过
    passClick() {
      var self = this;
      if (self.passClickTrueOrFalse == true) {
         self.passClickTrueOrFalse = false
         self.getClientSideAppealPassAppealRequest({
          appealId: sessionStorage.getItem("id"),
        }).then(data => {
          self.passClickTrueOrFalse = true
          if (data.code == 200) {
            self.$message({
              type: "success",
              message: "审核通过！"
            })
            self.$router.push({
              path: '/clientSide/clientSeeDetail'
            })
          } else {
            self.$message({
              type: 'info',
              message: data.message
            })
          } 
        }).catch(msg =>{
          self.passClickTrueOrFalse = true
          self.$message({
              type: 'info',
              message: '服务器异常'
          })
        })
      }
    },
     // 拒绝
    refuseClick() {
      var self = this;
      self.refuseList = []
      if (self.refuseClickTrueOrFalse == true) {
        self.refuseClickTrueOrFalse = false
        self.getClientSideIdentityAuditGetRejectReasonList({

        }).then(data => {
          self.refuseClickTrueOrFalse = true
          if (data.code == 200) {          
            self.isShowRefuse = false;
            if (data.data.length > 0) {          
                data.data.forEach(function(ele,ind){                 
                  self.refuseList.push({
                    key: ele.key,
                    value: ele.value,
                    show: true
                  })
                })

            }
          } else {
            self.$message({
              type: 'info',
              message: data.message
            })
          }
        }).catch(msg => {
          self.refuseClickTrueOrFalse = true
          self.$message({
              type: 'info',
              message: "服务器异常"
          })
        })
      }
    },
    // 确定拒绝
    butRefuseClick () {
      var self = this
      if (self.submitClickTrurOrFalse == true) {
        self.refuseList.forEach(function(ele,ind){
          if (ele.show == false) {
            self.causeList.push(ele.value)
          }
        })
        // console.log(self.causeList)
        self.causeList = self.causeList.splice(",").join(";")
        // console.log(typeof(self.causeList))
        self.submitClickTrurOrFalse = false
        self.getClientSideAppealRejectAppealRequest({
          appealId: sessionStorage.getItem("id"),
          realson: self.causeList
        }).then(data => {
          self.submitClickTrurOrFalse = true
          if (data.code == 200) {
            self.$message({
              type: "info",
              message: "审核未通过！"
            })
            self.isShowRefuse = true
            this.$router.push({
              path: "/clientSide/clientSeeDetail"
            });       
          } else {
            self.$message({
              type: 'info',
              message: data.message
            })
          } 
        }).catch(msg =>{
          self.submitClickTrurOrFalse = true
          self.$message({
              type: 'info',
              message: '服务器异常'
          })
        })
      }
    },
    ...mapActions(["getClientAppealgetAppealById","getClientSideIdentityAuditGetRejectReasonList","getClientSideAppealRejectAppealRequest","getClientSideAppealPassAppealRequest"])
  },
  watch: {
    
  }
};
</script>
<style scoped>
/* 大图弹框 */
.bigPopup {
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

.showBig {
  display: none;
}

.bigContent {
  width: 600px;
  min-height: 200px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: -10000000;
  padding-bottom: 25px;
}

.bigTitle {
  display: flex;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #f2f4f8;
  width: 100%;
  border-bottom: 1px solid #d1d1d1;
  margin-top: -50;
  font-size: 15px;
  font-weight: bold;
}

.bigTitle div:nth-child(2) {
  margin-left: 485px;
  cursor: pointer;
}

.bigTitle div:nth-child(2) img {
  width: 15px;
  height: 15px;
}

.bigData {
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
}

.bigData img {
  width: 400px;
}

.bigTitle div:nth-child(2) {
  margin-left: 540px;
  cursor: pointer;
}

.bigTitle div:nth-child(2) img {
  width: 20px;
  height: 20px;
}

/* 拒绝原因弹框 */
.refusePopup {
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

.showRefuse {
  display: none;
}

.refuseContent {
  width: 560px;
  height: 520px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  z-index: -100000;
}

.refuseTitle {
  height: 46px;
  width: 100%;
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  color: #303030;
  margin-top: 10px;
  margin-bottom: 10px;
}

.refuseData {
  height: 365px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  width: 100%;
}

.refuseData > ul {
  width: 87%;
}

.causeLiselectImg {
  cursor: pointer;
}

.causeLi {
  border: 1px solid #ccc;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.causeLi > div:nth-child(1) {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
}

.causeLi > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.causeLi > div:nth-child(2) {
  height: 100%;
  line-height: 35px;
  margin-left: 10px;
}

.causeLiSelect {
  cursor: pointer;
  border: 1px solid #ccc;
}

.refuseButton > div {
  border: 1px solid #fff;
  background: #5acdfa;
  width: 70px;
  height: 34px;
  line-height: 36px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.refuseButton {
  margin: 0 auto;
  margin-top: 20px;
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.refuseButton div {
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.refuseButton div:nth-child(1) {
  background: #5acdfa;
}

.refuseButton div:nth-child(2) {
  background: #aeaeae;
}


/*主页*/

.clientLookDetail {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clientLookDetail > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.listTitle {
  height: 58px;
  line-height: 58px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.listTitle > div:nth-child(2) {
  float: left;
  color: #303030;
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
}

.list {
  width: 60%;
  min-height: 550px;
  margin: 1% 5%;
}

.listTop {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 30px;
}

.listTop > div {
  display: flex;
  width: 50%;
  margin-top: 15px;
}

.listTop > div > div:nth-child(1) {
  font-size: 14px;
}

.listTop > div:nth-child(1) > div:nth-child(1) {
  /* margin-left: 16px; */
}

.listContent .listItem {
  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
  flex-wrap: wrap;
}

.listContent .imgItem:last-child {
  display: block;
}

.listContent .listItem > div {
  display: flex;
  margin-bottom: 20px;
  width: 50%;
}

.listContent .listItem {
  margin-top: 15px;
}

.listContent .imgItem {
  min-width: 50%;
  overflow: hidden;
}

.imgItem > div > div:nth-child(1) {
  margin-right: 10%;
}
.imgItem > div > div:nth-child(2) {
  border: 2px solid #d1d1d1;
  padding: 5px;
  width: 310px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.listContent .listItem img {
  width: 300px;
  height: 100%;
  
  border-radius: 3px;
}

.listButton {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  width: 500px;
  margin-left: 28px;
}

.listButton div {
  width: 80px;
  min-width: 80px;
  height: 36px;
  border: 1px solid #fff;
  line-height: 36px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  background: #AEAEAE;
  cursor: pointer;
  
}

.listButton div:nth-child(2) {
  background: #5acdfa;
}
</style>