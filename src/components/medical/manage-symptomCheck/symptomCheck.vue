<!--医疗管理-症状自查-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="symptomCheck">
    <div>
      <div class="listTitle">
        <div>
          症状管理
        </div>
        <div>
        </div>
      </div>
      <!--列表-->
      <div class="list" v-show="dataList.length > 0">
        <ul>
          <li class="partLi" v-for="(item,index) in dataList" :key="index" @click="symptomClick(index)" @mouseover="partHoverMouseover(index)">
            <img class="partImgOne" v-if="num == index" :src="item.content[0]" alt="">
            <img class="partImgTwo" v-else :src="item.content[1]" alt="">
            <div v-show="num == index">{{item.value}}</div>
          </li>
        </ul>
      </div>
      <!-- 暂无数据 -->
      <div class="noList" v-show="dataList.length == 0">
        <div>
          <img src="/static/img/w.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      num: "1111",//与index进行比较
      dataList: [],//所有症状列表
      overimg: ""//鼠标移到症状图片上指向index
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    //权限管理
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("symptomCheck") == -1) {
        var warningStr = "您暂时没有权限访问这个页面";
        self.$alert(warningStr, "提示", {
          confirmButtonText: "确定",
          type: "info"
        }).then(() => {
          self.$router.push({
            path: "/login"
          });
        }).catch(() => {
          self.$router.push({
            path: "/login"
          });
        });
      } else {
        this.getbodyListFun();
      }
    } else {
      var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
      this.$alert(warningStr, "提示", {
        confirmButtonText: "确定",
        type: "info"
      }).then(() => {
        this.$router.push({
          path: "/login"
        });
      }).catch(() => {
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
    //获取人体部位
    getbodyListFun() {
      var self = this;
      self.getbodyPartsList({

      }).then(data => {
        if (data.code == 200) {
          if (data.data) {
            if (data.data.length == 0) {
              self.dataList = [];
            } else {
              var arry = data.data;
              arry.forEach(function(ele, ind) {
                self.dataList.push({
                  key: ele.key,
                  value: ele.value,
                  content: ele.content.split(",")
                });
              });
            }
          } else {
            self.dataList = [];
          }
        } else {
          self.$message({
            type: "info",
            message: data.message
          });
        }
      }).catch(msg => {
        self.$message({
          type: "info",
          message: "服务器异常"
        });
      });
    },
    partHoverMouseover(index) {
      this.num = index;  
      this.overimg = index;
    },
    // 点击不同的症状进入相应的页面
    symptomClick(index) {
      let symptomData = JSON.stringify(this.dataList[index]);
      sessionStorage.setItem("symptomData", symptomData);
      this.$router.push({
        path: "/medical/symptomCheckList"
      });
    },
    ...mapActions(["getbodyPartsList"])
  }
};
</script>
<style scoped>
/*主页*/

.symptomCheck {
  width: 100%;
  height: 100%;
}

.symptomCheck > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
  margin-top: 32px;
  margin-left: 100px;
}

.list > div {
  margin: 0 auto;
  width: 650px;
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

.partLi {
  float: left;
  width: 100px;
  height: 100px;
  border: 1px solid #5acdfa;
  border-radius: 50%;
  line-height: 100px;
  text-align: center;
  margin: 32px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.partImgOne {
  width: 120%;
  height: 120%;
  position: absolute;
  top: -5px;
  left: -10px;
}

.partImgTwo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.partLi div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
}

.noList {
  height: 400px;
}

.noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}
</style>