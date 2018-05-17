<!--新增品牌管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
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
                <div class="list-cont">
                    <div>
                        <div>
                            品牌中文：
                        </div>
                        <div>
                            <input type="text" v-model="chinaName" :class="{redInput:isRedchinaName,grayInput:isGraychinaName}" maxlength="20">
                        </div>
                        <div :class="{redTest:isRedchinaName,grayTest:isGraychinaName}">
                            最多20个汉字
                        </div>
                    </div>
                    <div>
                        <div>
                            品牌英文：
                        </div>
                        <div>
                            <input type="text" v-model="engName" :class="{redInput:isRedEngName,grayInput:isGrayEngName}" maxlength="20">
                        </div>
                        <div :class="{redTest:isRedEngName,grayTest:isGrayEngName}">
                            最多20个英文字母
                        </div>
                    </div>
                    <div>
                        <div>
                            品牌描述：
                        </div>
                        <div>
                            <textarea v-model="describe" :class="{redInput:isReddescribeName,grayInput:isGraydescribeName}" maxlength="50"></textarea>
                        </div>
                        <div :class="{redTest:isReddescribeName,grayTest:isGraydescribeName}">
                            最多50个字符
                        </div>
                    </div>
                    <div class="comone">
                        <div>
                            是否启用：
                        </div>
                        <div>
                            <el-checkbox v-model="Using" @change="typeChange(0)"></el-checkbox><small>启用</small>
                        </div>
                        <div>
                            <el-checkbox v-model="NoUsing" @change="typeChange(1)"></el-checkbox><small>不启用</small>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="addClick">确定</div>
                        <div @click="caneleClick">取消</div>
                    </div>
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
      addClickTrue: false,
      title: "新增品牌",
      loading: false,
      isRedEngName: false,
      isGrayEngName: true,
      isEngName: false,
      isRedchinaName: false,
      isGraychinaName: true,
      isChinaName: false,
      isReddescribeName: false,
      isGraydescribeName: true,
      isDescribe: false,
      Using: true,
      NoUsing: false,
      types: [],
      typestr: 0,
      stateIndex: 0,
      chinaName: "", // 中文名称
      engName: "", // 英文名称
      describe: "", // 描述
      brandObj: {}
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
      } else {
        if (comms.indexOf("brand") == -1) {
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
          var self = this;
          var operation = "";
          operation = self.$route.query.operation;
          if (operation == 1) {
            self.title = "新增品牌";
          } else {
            self.title = "修改品牌";
            self
              .getstorebrandfindOneById({
                id: self.$route.query.id
              })
              .then(data => {
                self.loading = false;
                // console.log("品牌详情", JSON.parse(JSON.stringify(data)))
                if (data.code == 200) {
                  if (data.data) {
                    self.chinaName = data.data.chinaName;
                    self.engName = data.data.englishName;
                    self.describe = data.data.remark;
                    self.brandObj = data.data;
                    self.stateIndex = data.data.state;
                    if (data.data.state == 1) {
                      self.Using = false;
                      self.NoUsing = true;
                    } else {
                      self.Using = true;
                      self.NoUsing = false;
                    }
                  } else {
                  }
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
                  message: "服务器错误"
                });
              });
          }
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
    // 启用选择
    typeChange(index) {
      // console.log(index)
      if (index == 1) {
        this.Using = false;
        this.NoUsing = true;
      } else {
        this.Using = true;
        this.NoUsing = false;
      }
      this.stateIndex = index;
    },
    // 确认添加
    addClick() {
      var self = this;
      var operation = "";
      operation = self.$route.query.operation;
      if (
        self.isDescribe == true &&
        self.isChinaName == true &&
        self.isEngName == true
      ) {
        if (self.addClickTrue == false) {
          self.addClickTrue = true;
          if (operation == 1) {
            self.loading = true;
            self
              .getstorebrandAdd({
                chinaName: self.chinaName,
                englishName: self.engName,
                state: self.stateIndex,
                remark: self.describe
              })
              .then(data => {
                self.loading = false;
                self.addClickTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "添加品牌成功!"
                  });
                  self.$router.push({
                    path: "/store/commodity/brand"
                  });
                  self.chinaName = "";
                  self.engName = "";
                  self.describe = "";
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            self.loading = true;
            self
              .getstorebrandupdateById({
                id: self.$route.query.id,
                chinaName: self.chinaName,
                englishName: self.engName,
                remark: self.describe,
                state: self.stateIndex
              })
              .then(data => {
                self.loading = false;
                self.addClickTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "修改品牌成功!"
                  });
                  self.$router.push({
                    path: "/store/commodity/brand"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          }
        }
      } else {
        if (this.isDescribe == false) {
          this.isReddescribeName = true;
          this.isGraydescribeName = false;
        } else {
          this.isReddescribeName = false;
          this.isGraydescribeName = true;
        }
        if (this.isChinaName == false) {
          this.isRedchinaName = true;
          this.isGraychinaName = false;
        } else {
          this.isRedchinaName = false;
          this.isGraychinaName = true;
        }
        if (this.isEngName == false) {
          this.isRedEngName = true;
          this.isGrayEngName = false;
        } else {
          this.isRedEngName = false;
          this.isGrayEngName = true;
        }
      }
    },
    selecttypesClick() {
      // console.log(this.typestr)
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      this.$router.push({
        path: "/store/commodity/brand"
      });
      this.chinaName = "";
      this.engName = "";
      this.describe = "";
    },
    ...mapActions([
      "getstorebrandAdd",
      "getstorebrandfindOneById",
      "getstorebrandupdateById"
    ])
  },
  // 监视
  watch: {
    chinaName: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{1,20}$/);
      if (trimstr.length <= 0) {
        this.isChinaName = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedchinaName = false;
          this.isGraychinaName = true;
          this.isChinaName = true;
        } else {
          this.isChinaName = false;
        }
      }
    },
    engName: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[A-Za-z]{1,20}$/);
      if (trimstr.length <= 0) {
        this.isEngName = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedEngName = false;
          this.isGrayEngName = true;
          this.isEngName = true;
        } else {
          this.isEngName = false;
        }
      }
    },
    describe: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      // var reg = new RegExp(/^[\u4e00-\u9fa5]{1,50}$/);
      if (trimstr.length <= 0) {
        this.isDescribe = false;
      } else {
        if (trimstr.length <= 50) {
          this.isDescribe = true;
          this.isReddescribeName = false;
          this.isGraydescribeName = true;
        } else {
          this.isEngName = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
}

input {
  width: 320px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

textarea {
  width: 320px;
  height: 78px;
  resize: none;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  padding-top: 10px;
}

.list-cont > div > div:nth-child(2) {
  margin-left: 16px;
}

.list-cont > div:nth-child(3) > div:nth-child(1) {
  height: 68px;
}

.list-cont > div > div:nth-child(3) {
  margin-left: 18px;
}

.list-cont > div:nth-child(3) > div:nth-child(3) {
  height: 68px;
}

.list-cont > div {
  margin-top: 24px;
  display: flex;
  min-height: 33px;
  align-items: center;
}

.comone {
  height: 32px;
}

.comone > div:nth-child(1) {
  height: 32px;
  line-height: 32px;
}

.comone > div:nth-child(2) {
  margin-top: 5px;
}

.comone > div:nth-child(2) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) {
  margin-top: 5px;
  overflow: hidden;
  margin-left: 30px;
}

.list-cont {
  width: 700px;
  min-height: 300px;
  margin-left: 190px;
}

.but {
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.list .but > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #fe5371;
  margin-right: 25px;
  cursor: pointer;
}

.list .but > div:nth-child(2) {
  margin-left: 25px;
  width: 68px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #d1d1d1;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
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
  /*border: 1px solid red;*/
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

select {
  width: 120px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
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