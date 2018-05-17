<!--资料审核 - 查看-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientLookDetail">
        <div>
            <div class="listTitle">
                <div @click="backClick">
                    <img src="/static/img/返回蓝.jpg" alt="返回">
                </div>
                <div>
                    审核查看
                </div>
            </div>
            <!-- 数据 -->
            <div class="list">
              <div class="listTop">
                <div>
                  <div>审核状态：</div>
                  <div>{{dataList.state | auditFun}}</div>
                </div>
                <div>
                  <div>申请审核时间：</div>
                  <div>{{dataList.applyDate | timeFun}}</div>
                </div>
                <div v-show="dataList.state == '2'">
                  <div>未通过原因：</div>
                  <div>{{dataList.rejectReason | strFun}}</div>
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
                      <div>{{dataList.phone | strFun}}</div>
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
                      <div @click="bigOneClick">
                        <img :src="dataList.cardRightImg" alt="暂无照片">
                      </div>
                    </div>
                    <div>
                      <div>身份证反面：</div>
                      <div @click="bigTwoClick">
                        <img :src="dataList.cardLeftImg" alt="暂无照片">
                      </div>
                    </div>
                    <div>
                      <div>手持身份证：</div>
                      <div  @click="bigThreeClick">
                        <img :src="dataList.handCardImg" alt="暂无照片">
                      </div>
                    </div>
                  </div>
                </div>
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
      bigImgUrl: "", //大图路径
      isBigPopup: true, //控制弹框样式
      isShowBig: true, //控制弹框显示隐藏
      bigShow: false, //控制弹框显示隐藏
      dataList: [],// 详情列表
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    timeFun: function(val) {
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
    // 审核状态
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
    // 查看申请资料详情
    lookApplyDataListFun () {
      var self = this;
      self.getClientSideIdentityAuditGetApplyData({
        id:sessionStorage.getItem("id"),
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
    // 返回
    backClick() {
      var self = this;
      self.$router.push({
        path: "/clientSide/clientDataAudit"
      });
      sessionStorage.removeItem("id");
    },
    // 查看身份证正面大图
    bigOneClick() {
      var self = this;
      self.isShowBig = false;
      self.bigShow = true;
      self.bigImgUrl = self.dataList.cardRightImg
    },
    // 查看身份证反面大图
    bigTwoClick() {
      var self = this;
      self.isShowBig = false;
      self.bigShow = true;
      self.bigImgUrl = self.dataList.cardLeftImg
    },
    // 查看手持身份证大图
    bigThreeClick() {
      var self = this;
      self.isShowBig = false;
      self.bigShow = true;
      self.bigImgUrl = self.dataList.handCardImg
    },
    // 关闭大图弹框
    closeClick() {
      var self = this;
      self.isShowBig = true;
      self.bigShow = false;
    },
    ...mapActions(["getClientSideIdentityAuditGetApplyData"])
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
  /* font-weight: bold; */
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
  /* border: 2px solid #d1d1d1;
  padding: 10px 10px;
  border-radius: 5px;
  width: 500px;
  text-align: center; */
  width: 310px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding: 5px;
}

.listContent .listItem img {
  width: 300px;
  height: 100%;
  
  border-radius: 3px;
}
</style>
