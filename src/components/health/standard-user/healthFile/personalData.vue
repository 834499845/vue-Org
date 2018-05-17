<!--生活习惯-->
<template  xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="lifeStyle">
    <div class="list">
        <ul>
            <li class="firstLi">
              <div v-for="(item,index) in titleLists" :key="index">
                {{item.title}}
              </div>
            </li>
            <li class="dataLi" v-loading = "loading">
              <div>{{dataLists.nationality | strFun}}</div>
              <div>{{dataLists.marriage | marriageFun | strFun}}</div>
              <div>{{dataLists.profession | strFun}}</div>
              <div>{{dataLists.income | strFun}}</div>
            </li>
            <li class="noList" v-show="loading">
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
      loading: false,//控制页面加载
      titleLists: [
        {
          title: "国籍"
        },
        {
          title: "婚姻状况"
        },
        {
          title: "职业"
        },
        {
          title: "收入"
        }
      ], //标题列表
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
    //0-未婚，1-已婚，2-离异，3-丧偶
    marriageFun: function(val) {
      if (val == "0") {
        return "未婚";
      }
      if (val == "1") {
        return "已婚";
      }
      if (val == "2") {
        return "离异";
      }
      if (val == "3") {
        return "丧偶";
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
    // 查询个人资料数据
    getHealthFileListFun() {
      var self = this;
      self
        .gethealthRecordshgetHealthRecordsDetail({
          userId: sessionStorage.getItem("idUser")
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (
                data.data.nationality ||
                data.data.marriage ||
                data.data.profession ||
                data.data.income
              ) {
                self.dataLists = data.data;
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
.lifeStyle {
  width: 100%;
  min-height: 200px;
  margin: 50px 0px auto 0px;
}

/* .list {
  margin: 30px 0px 30px 90px;
} */

.list {
    overflow: hidden;
    min-height: 200px;
    width: 80%;
    margin-left: 90px;
}

.list ul {
  width: 100%;
  
}

.list li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #d1d1d1;
  width: 100%;
  
}
.list li > div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-left: 1px solid #d1d1d1;
  width: 25%;
  height: 40px;
}
.list li:nth-child(1) > div {
  font-size: 15px;
  font-weight: bold;
}

.firstLi {
  background-color: #F2F4F8;
}

.list .noList {
  height: 400px;
  border: 0;
}

.list .noList > div {
  width: 607px;
  height: 400px;
  margin: 30% 20%;
  border: 0;
  overflow: hidden;
}
</style>
