<!--账号申诉 - 查看-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientLookDetail">
        <div>
            <div class="listTitle">
                <div @click="backaClick">
                    <img src="/static/img/fan.png" alt="返回">
                </div>
                <div>
                    积分详情
                </div>
            </div>
            <!-- 数据 -->
            <div class="list">
              <div class="listTop">
                <div>
                  <div>真实姓名：</div>
                  <div>{{realNameVal}}</div>
                </div>
                <div>
                  <div>手机号：</div>
                  <div>{{phoneVal}}</div>
                </div>
                <div>
                  <div>当前积分：</div>
                  <div>{{scoreVal}}</div>
                </div>
              </div>
              <div class="listContent">
                <div>
                  <div class="list-title">积分明细：</div>
                  <div class="detailData" v-for="(item,index) in dataLists" :key="index">
                    <div>
                      {{item.name}}
                    </div>
                    <div class="timeScore">
                      <div>{{item.createDate | timeFun}}</div>
                      <div><span v-show="item.score>0">+</span>{{item.score}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pagination">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
              </el-pagination>
            </div>
        </div>
         <!--取消弹出框-->
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
      dataLists:[],//详情列表
      realNameVal: '',
      phoneVal: '',
      scoreVal: '',
      userIdVal: '',
      currentPage: 1,
      pageSizeNum: 10,
      totalNum: 10,
      intercept: false,
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      titlename: "您确定要执行该操作吗？",
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
    // 状态
    auditFun: function(val) {
      if (val == 0) {
        return "待审核"
      } else if (val == 1) {
        return "审核通过"
      } else if (val == 2) {
        return "审核未通过"
      } else if (val == 3) {
        return "撤销审核"
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
        self.realNameVal = sessionStorage.getItem("realName")
        self.phoneVal = sessionStorage.getItem("phone")
        self.scoreVal  = sessionStorage.getItem("score")
        self.userIdVal = sessionStorage.getItem("userIds")
        self.lookUserListFun ()
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
  //跳转拦截
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdel = false;
      this.delShow = true;
    } else if (this.intercept == true) {
      this.isShowdel = true;
      this.delShow = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //确定拦截弹出
    okClick() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url,
        query: { op: 3, id: sessionStorage.getItem("lookCourseId") }
      });
    },
    //取消拦截弹出
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 查看指定用户积分明细
    lookUserListFun () {
      var self = this;
      self.getpointIntegralUserDetailGetDetailList({
        pageNo: self.currentPage,
        pageSize: self.pageSizeNum,
        userId: self.userIdVal
      }).then(data => {
        if (data.code == 200) {
          if (data.data.records.length > 0) {
              self.dataLists = data.data.records
          } 
          self.totalNum = data.data.total
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
    backaClick() {
      var self = this;
      self.$router.push({
        path: "/point/pointStatistics"
      });
      sessionStorage.removeItem("realName")
      sessionStorage.removeItem("phone")
      sessionStorage.removeItem("score")
      sessionStorage.removeItem("userIds")
    },
    // 分页-每页条数
    handleSizeChange(val) {
      this.pageSizeNum = val
      this.lookUserListFun ()
    },
    // 分页-当前页
    handleCurrentChange(val) {
        console.log("123")
        this.currentPage = val;
        this.lookUserListFun ()
    },
    ...mapActions(["getpointIntegralUserDetailGetDetailList"])
  },
  watch: {

  }
};
</script>
<style scoped>
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

.listTitle img {
  width: 25px;
  height: 25px;
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

.detailData {
  margin-top: 20px;
  width: 53%;
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 20px;
}

.list-title {
  font-size: 15px;
  font-weight: bold;
}

.detailData > .timeScore {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination {
  margin-left: 22%;
}

/* 取消弹框 */

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
</style>
