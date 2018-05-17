<!--专属病例-->
<template  xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="ExclusiveCase">
    <div class="list">
        <ul>
            <li class="firstLi">
              <div v-for="(item,index) in dataLists" :key="index">
                {{item.dataName}}
              </div>
            </li>
            <li class="dataLi" v-show="dataLists.length > 0" >
              <div v-for="(item,index) in dataLists" :key="index">
                {{item.dataValue | judgeFun}}
              </div>        
            </li>
            <li class="noList" v-show="dataLists.length == 0">
              <div>
                <img src="/static/img/w.png" alt="">
              </div>
            </li>
        </ul>
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
  // 过滤
  filters: {
    //名称类字符串过滤
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    // 是否或者空过滤
    judgeFun: function(val) {
      if (val > 0) {
        return "是";
      } else if (val < 0) {
        return "否";
      } else {
        return "空";
      }
    }
  },
  // 模块新建时
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
  //计算属性
  mounted() {},
  //事件处理
  methods: {
    // 查询专属病例
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
                if (data.data.healthRecordsInfo.medicalCase) {
                  self.dataLists = data.data.healthRecordsInfo.medicalCase;
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
.ExclusiveCase {
  width: 100%;
  min-height: 200px;
  margin: 50px 0px auto 0px;
}

.list {
    overflow: hidden;
    min-height: 540px;
    width: 100%;
    padding-left: 90px;
}

.list ul {
  width: 100%;
}

.list li {
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #d1d1d1; */
  width: 100%;
}

.list li > div {
  border: 1px solid #d1d1d1;
  border-left: 1px solid #d1d1d1;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.firstLi {
  background-color: #F2F4F8;
}

.list li > div:nth-child(1) {
  width: 15%;
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li > div:nth-child(2) {
  width: 15%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li > div:nth-child(3) {
  width: 15%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li > div:nth-child(4) {
  width: 18%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li > div:nth-child(5) {
  width: 17%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li > div:nth-child(6) {
  width: 20%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li:nth-child(1) > div {
  font-size: 15px;
  font-weight: bold;
}

.list .noList {
  height: 400px;
  border: 0;
}

.list .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 30% 20%;
  border: 0;
  overflow: hidden;
}
</style>
