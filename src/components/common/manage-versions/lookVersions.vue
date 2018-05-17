<!--版本详情-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="lookdrill">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="caneleClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="look">
                    <div>
                        版本名称：
                    </div>
                    <div>
                        {{versionNameVal}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        版本号：
                    </div>
                    <div>
                        {{versionCodeVal}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        版本类型：
                    </div>
                    <div>
                        {{typeVal}}
                    </div>
                </div>
                <div class="look lookUrl">
                    <div>
                        下载地址：
                    </div>
                    <div>
                        {{urlVal}}
                    </div>
                    <a :href="urlVal" target="_blank">
                           点击下载
                    </a>
                </div>
                <div class="look">
                    <div>
                        版本大小：
                    </div>
                    <div>
                        {{sizeVal}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        下载次数：
                    </div>
                    <div>
                        {{timesVal}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        版本状态：
                    </div>
                    <div>
                        {{stateVal | stateFun}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        版本说明：
                    </div>
                    <div>
                        {{infoVal}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        强制更新状态：
                    </div>
                    <div>
                        {{UpdatingStateVal | UpdatingStateFun}}
                    </div>
                </div>
            </div>
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
      title: "版本详情",
      loading: false,
      versionNameVal: "",
      versionCodeVal: "",
      typeVal: "",
      infoVal: "",
      UpdatingStateVal: '',
      timesVal: "",
      urlVal: "",
      sizeVal: "",
      stateVal: ""
    };
  },
  // 过滤
  filters: {
    stateFun: function(val) {
      if (val == 1) {
        return "已发布";
      } else {
        return "未发布";
      }
    },
    UpdatingStateFun: function(val){
      if(val == 1){
        return  '强制';
      }else if(val == 0){
        return  '非强制';
      }else{
        return "--"
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
        if (ele.name == "公共管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("versions") == -1) {
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
      var id = "";
      id = self.$route.query.id;
      self
        .getbaseappVersionfindOne({
          id: id
        })
        .then(data => {
          // console.log("详情", JSON.parse(JSON.stringify(data)))
          if (data.code == 200) {
            self.versionNameVal = data.data.versionName;
            self.versionCodeVal = data.data.versionCode;
            self.typeVal = data.data.type;
            self.infoVal = data.data.info;
            self.UpdatingStateVal = data.data.forcedUpdatingState;
            self.timesVal = data.data.times;
            self.urlVal = data.data.url;
            self.sizeVal = data.data.size;
            self.stateVal = data.data.state;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          // console.log(msg)
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // uploadClick() {
    //     var self = this
    //     window.open(self.urlVal)
    // },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      this.$router.push({
        path: "/common/versions"
      });
    },
    ...mapActions(["getbaseappVersionfindOne"])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.look {
  display: flex;
  align-items: center;
}

.look > div:nth-child(1) {
  width: 120px;
  text-align: right;
  height: 30px;
  line-height: 30px;
}

.look > div:nth-child(2) {
  margin-left: 12px;
  width: 400px;
  min-height: 20px;
  word-wrap: break-word;
}

.look:nth-child(4),.look:nth-child(8) {
  display: flex;
  align-items:baseline
}

.lookUrl a {
  display: block;
  margin-left: 24px;
  width: 90px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #fe5371;
  color: #fff;
  background-color: #fe5371;
  cursor: pointer;
}

.list > div {
  margin-top: 15px;
}

.list > div:nth-child(1) {
  margin-top: 24px;
}

.list {
  min-height: 540px;
}

.lookdrill > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.listTitle {
  height: 58px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  width: 120px;
  height: 27px;
  margin-top: 12px;
  float: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.listTitle > div:nth-child(1) > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 0px;
  margin-left: 10px;
}
</style>