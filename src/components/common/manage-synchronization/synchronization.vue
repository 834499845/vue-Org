<!--同步管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="synchronization">
    <div>
      <div class="listTitle">
        <div>
          同步管理
        </div>
        <div>
        </div>
      </div>
      <!--列表-->
      <div class="main">
        <div class="main-serch">
          <div>
            <div>
              起始时间：
            </div>
            <div>
              <Date-picker :clearable="true" :editable="false" v-model="ctime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间"
                style="width: 160px"></Date-picker>
            </div>
          </div>
          <div>
            <div>
              结束时间：
            </div>
            <div>
              <Date-picker :clearable="true" :editable="false" v-model="etime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间"
                style="width: 160px"></Date-picker>
            </div>
          </div>
          <div>
            <div>
              选择类别：
            </div>
            <div>
              <select v-model="typestr" @change="typeChange">
                <option v-for="(item,index) in types" :key="index" v-bind:value="item.type">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              topic ：
            </div>
            <div>
              <select class="topicstrSelect" v-model="topicstr">
                <option v-for="(item,index) in topics" :key="index" v-bind:value="index">{{item}}</option>
              </select>
            </div>
          </div>
          <div class="search-button">
            <div v-show="jobShow" @click="searchClick">
              确认
            </div>
            <div v-show="jobShow">
              重置
            </div>
            <div v-show="!jobShow">
              同步中...
            </div>
          </div>
        </div>
        <div class="main-main">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      jobShow: true,
      types: [
        { name: "用户信息", type: "99" },
        { name: "健康", type: "0" },
        { name: "医疗", type: "1" },
        { name: "健身", type: "2" }
      ],
      typestr: "99",
      topics: ["请选择"],
      topicstr: "0",
      ctime: "",
      etime: ""
    };
  },
  // 过滤
  filters: {},
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
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "公共管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("synchronization") == -1) {
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
    listFun() {
      var self = this;
      self.topicstr = 0;
      self
        .getbasestaticdatagetTopic({
          type: 99
        })
        .then(data => {
          if (data.code == 200) {
            self.topics = self.topics.concat(data.data);
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
    // 提交日期格式化
    dateFun(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      i = t.getMinutes();
      s = t.getSeconds();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (i < 10 ? "0" + i : i) +
        ":" +
        (s < 10 ? "0" + s : s)
      );
    },
    typeChange() {
      var self = this;
      self.topicstr = 0;
      self.topics = ["请选择"];
      self
        .getbasestaticdatagetTopic({
          type: self.typestr
        })
        .then(data => {
          if (data.code == 200) {
            self.topics = self.topics.concat(data.data);
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
    searchClick() {
      var self = this;
      if (self.ctime && self.etime) {
        var obj = {};
        if (self.topicstr == 0) {
          obj = {
            startDate: self.dateFun(self.ctime),
            endDate: self.dateFun(self.etime),
            type: self.typestr
          };
        } else {
          obj = {
            startDate: self.dateFun(self.ctime),
            endDate: self.dateFun(self.etime),
            type: self.typestr,
            topic: self.topics[self.topicstr]
          };
        }
        self
          .getbasestaticdatasync(obj)
          .then(data => {
            if (data.code == 200) {
              self.jobShow = false;
              self.$message({
                type: "success",
                message: "同步中..."
              });
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
              self.jobShow = true;
            }
          })
          .catch(msg => {
            self.jobShow = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        self.$message({
          type: "info",
          message: "开始时间和结束时间必填"
        });
      }
    },
    ...mapActions(["getbasestaticdatasync", "getbasestaticdatagetTopic"])
  }
};
</script>
<style scoped>
/*主页*/

.search-button > div {
  min-width: 35px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  margin-left: 15px;
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
}
.search-button > div:nth-child(3) {
  background-color: red;
  color: #fff;
}
.search-button > div:nth-child(1) {
  background-color: #fe5371;
  color: #fff;
}

.main-serch {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.main-serch > div {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 25px;
}

.main-main {
  width: 100%;
  min-height: 400px;
  border: 1px solid #ccc;
  margin-top: 25px;
}

.synchronization {
  width: 100%;
  height: 100%;
}

.synchronization > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.main {
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
  border: 1px solid #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}
.topicstrSelect {
  width: 260px;
  background: url("/static/img/hjian.png") 96% 8px no-repeat transparent;
}
select {
  width: 94px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
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
</style>