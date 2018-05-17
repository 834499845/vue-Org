<!--体质检测-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="sub-healthExamination">
    <div class="content">
      <div class="item" v-for="(item,index) in dataLists" :key="index">
        <div class="dataItem">
          <div>日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 期：&nbsp;</div>
          <div>{{item.createDate | timeFun}}</div>
        </div>
        <div class="dataItem">
          <div>检测结果：&nbsp;</div>
          <div>{{item.content}}</div>
        </div>
        <div class="dataItem">
          <div>评 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 论：&nbsp;</div>
          <div>{{item.remark}}</div>
        </div>         
      </div>
      <div class="noList"  v-show="dataLists.length == 0">
        <img src="/static/img/w.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dataLists: [] //数据列表
    };
  },
  //过滤
  filters: {
    //时间过滤函数
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
    }
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
  // 事件处理
  methods: {
    // 查询亚健康检测数据
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
                if (data.data.healthRecordsInfo.subHealthCheckReport) {
                  self.dataLists =
                    data.data.healthRecordsInfo.subHealthCheckReport;
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
    ...mapActions(["gethealthRecordshgetHealthRecordsDetail"])
  }
};
</script>
<style scoped>

.sub-healthExamination {
  width: 100%;
  min-height: 200px;
  margin: 50px 100px auto 0px;
}
.content {
  margin: 20px 120px;
}

.dataItem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.item {
  margin-top: 30px;
}

.dataItem > div:nth-child(1) {
  width: 80px;
  min-width: 80px;
  height: 30px;
  text-align: right;
}

.dataItem > div:nth-child(2) {
  width: 100%;
  min-width: 100%;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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