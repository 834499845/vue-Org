<!--商品中心-商品类目-新建类目-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="category">
        <div class="listTitle">
            <div>
                <img src="/static/img/fan.png" alt="" @click="returnClick"> 新建分类
            </div>
        </div>
        <div class="list">
            <div class="Name">
                <div>
                    分类名称：
                </div>
                <div>
                    <input :class="{redborder:isnameredborder}" type="text" maxlength="8" v-model="classifyName">
                    <span :class="{redfont:isnameredfont}">最多输入8个字符</span>
                </div>
            </div>
            <div class="isShow">
                <div>
                    是否显示：
                </div>
                <div>
                    <ul>
                        <li v-for="(city,index) in levs" :key="index" @click="levClick($event,index)">
                            <div v-if="tfshow == index">
                                <el-checkbox v-model="checkedt" @change="levChange(index)">{{city.value}}</el-checkbox>
                            </div>
                            <div v-else>
                                <el-checkbox v-model="checkedf" >{{city.value}}</el-checkbox>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="btnBox">
                <div></div>
                <div>
                    <input type="button" value="确定" @click="okClassifyClick">
                    <input type="button" value="取消" @click="returnClick">
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      levs: [{ value: "是", key: "1" }, { value: "否", key: "2" }],
      checkedt: true,
      checkedf: false,
      tfshow: 0,
      // isShowKey: "1",
      classifyName: "",
      isnameredborder: false,
      isnameredfont: false,
      okClassifyClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      var comms = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "商城管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
            if (one.name == "商品中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("commodity") == -1) {
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
        if (comms.indexOf("reartype") == -1) {
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
          //   console.log("持有当前权限");
        }
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
    //返回商品类目
    returnClick() {
      this.$router.push({
        path: "/store/commodity/reartype"
      });
    },
    //是否显示
    levClick(e, index) {
      e.preventDefault();
      this.tfshow = index;
      this.checkedf = false;
      this.checkedt = true;
    },
    //选定是否显示
    levChange(index) {
      // this.isShowKey = this.levs[index].key;
    },
    //判断新增分类名称
    panduan() {
      var regOne = /^[\s]*$/; //输入不能为空
      var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
      if (regTwo.test(this.classifyName) || regOne.test(this.classifyName)) {
        return false;
      }
    },
    //确定新增分类
    okClassifyClick() {
      var self = this;
      if (self.okClassifyClickTrue == false) {
        if (this.panduan() == false) {
          var regOne = /^[\s]*$/; //输入不能为空
          var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
          if (regTwo.test(this.classifyName)) {
            this.isnameredfont = this.isnameredborder = true;
          }
          if (regOne.test(this.classifyName)) {
            this.isnameredfont = this.isnameredborder = true;
          }
        } else {
          self.okClassifyClickTrue = true;
          self
            .getreartypeAddClassify({
              name: self.classifyName,
              parentId: 1,
              isShow: self.tfshow == '0'?'1':'2',
              level: 1
            })
            .then(data => {
              self.okClassifyClickTrue = false;
              if (data.code == 200) {
                this.$router.push({
                  path: "/store/commodity/reartype"
                });
              } else {
                self.$message({
                  type: "warning",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.okClassifyClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        }
      }
    },
    ...mapActions(["getreartypeAddClassify"])
  },

  // 监视
  watch: {
    classifyName: function(val) {
      this.changeval = val.length;
      if (this.changeval == 0) {
        this.isnameredfont = this.isnameredborder = false;
      } else {
        this.isnameredfont = this.isnameredborder = false;
      }
    }
  }
};
</script>
<style scoped>
.category {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.category > div {
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
  justify-content: space-between;
}

.listTitle > div {
  float: left;
  color: #303030;
  font-size: 16px;
  font-weight: 600;
}

.listTitle > div img {
  margin-right: 10px;
  cursor: pointer;
}

.list {
  min-height: 540px;
  margin-top: 25px;
}

.list > div {
  width: 988px;
  overflow: hidden;
  margin-left: 120px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.list > div > div:nth-child(1) {
  width: 100px;
  text-align: right;
}

.list > div > div:nth-child(2) {
  margin-left: 14px;
}

.isShow li {
  float: left;
  margin-right: 24px;
}
/* .serialNumber input {
    width: 60px;
    padding-left: 4px;
} */

.btnBox {
  width: 300px;
  margin: 100px 0 300px 550px;
  overflow: hidden;
}

.btnBox input {
  width: 68px;
  height: 32px;
  line-height: 32px;
  border: none;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btnBox input:nth-child(1) {
  margin-right: 24px;
  background: #fe5371;
}

.btnBox input:nth-child(2) {
  margin-left: 24px;
  background: #d1d1d1;
}

.category span {
  color: #d1d1d1;
  font-size: 13px;
  margin-left: 24px;
}

.redfont {
  color: #fe5371 !important;
}

.category input {
  border-radius: 4px;
  height: 33px;
  line-height: 33px;
  border: 1px solid #d1d1d1;
}

.Name input {
  padding-left: 4px;
}

.redborder {
  border: 1px solid #fe5371 !important;
}
</style>