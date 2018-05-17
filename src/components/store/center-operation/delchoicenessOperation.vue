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
                <div class="listCont">
                    <div class="listImg">
                        <div>
                            <div>
                                <div v-show="bigImg.length != 0" @click="bigClick">
                                    <img :src="bigImg" alt="">
                                </div>
                                <div @click="updateClick(1)" v-show="bigImg.length == 0">
                                    <img src="/static/img/addimg.jpg" alt="">
                                </div>
                            </div>
                            <div v-show="bigImg.length != 0" class="delImg" @click="delbigImgClick">
                                <img src="/static/img/删除.png" alt="">
                            </div>
                        </div>
                        <div class="smallImg">
                            <ul>
                                <draggable v-model="lists" @start="drag=true" @end="drag=false">
                                    <li class="smallLi" v-for="(item,index) in lists" :key="index">
                                        <div @click="smallClick(index)">
                                            <img :src="item.image" alt="">
                                        </div>
                                        <div @click="delSamllClick(index)">
                                            <img src="/static/img/删除.png" alt="">
                                        </div>
                                    </li>
                                </draggable>
                                <li @click="updateClick(0)" v-show="lists.length != 4" class="lastSmallImg">
                                    <div>
                                        <img src="/static/img/addimg.jpg" alt="">
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="but">
                        <div @click="upSortClick">确定</div>
                        <div @click="caneleClick">取消</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      title: "编辑为你精选",
      loading: false,
      bigImg: "",
      bigImgId: "",
      lists: [],
      delbigImgClickTrue: false,
      upSortClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    var paths = this.$route.path.split("/");
    var oneStr = paths[2];
    var twoStr = paths[3];
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
          });
        }
      });
      if (arrs.indexOf("operation") == -1) {
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
        var leng = "";
        leng = self.$route.query.isBig;
        self.creatFun();
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
    // 为你精选列表
    creatFun() {
      var self = this;
      self.loading = false;
      self
        .getstorecarefullyChosengetCarefullyChosenDetail({})
        .then(data => {
          self.loading = false;
          //   console.log("为你精选商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                var arrs = [];
                data.data.forEach(function(ele, ind) {
                  if (ele.isBig == 1) {
                    self.bigImg = ele.image;
                    self.bigImgId = ele.id;
                  } else {
                    arrs.push(ele);
                  }
                });

                self.lists = arrs;
              } else {
                self.lists = [];
              }
            } else {
              self.lists = [];
            }
          } else {
            self.lists = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.lists = [];
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 删除大图标
    delbigImgClick() {
      var self = this;
      if (self.delbigImgClickTrue == false) {
        self.delbigImgClickTrue = true;
        self.loading = true;
        var ids = self.bigImgId.toString();
        self
          .getstorecarefullyChosengetdelete({
            idJson: "[" + ids + "]"
          })
          .then(data => {
            self.loading = false;
            self.delbigImgClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除为你精选成功!"
              });
              self.bigImg = "";
              self.creatFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.delbigImgClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 删除小图标
    delSamllClick(index) {
      var self = this;
      if (self.delbigImgClickTrue == false) {
        self.delbigImgClickTrue = true;
        self.loading = true;
        var ids = self.lists[index].id.toString();
        self
          .getstorecarefullyChosengetdelete({
            idJson: "[" + ids + "]"
          })
          .then(data => {
            self.loading = false;
            self.delbigImgClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除为你精选成功!"
              });
              self.creatFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.delbigImgClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 大图小图添加
    updateClick(ind) {
      var self = this;
      self.$router.push({
        path: "/store/choicenessOperation",
        query: { isBig: ind, name: self.$route.query.name, ap: 1 }
      });
    },
    // 点击小图编辑
    smallClick(index) {
      var self = this;
      self.$router.push({
        path: "/store/choicenessOperation",
        query: {
          isBig: 0,
          ap: 2,
          id: self.lists[index].id,
          name: self.$route.query.name
        }
      });
    },
    // 点击大图编辑
    bigClick() {
      var self = this;
      self.$router.push({
        path: "/store/choicenessOperation",
        query: {
          isBig: 1,
          ap: 2,
          id: self.bigImgId,
          name: self.$route.query.name
        }
      });
    },
    // 修改排序
    upSortClick() {
      var self = this;
      var arrs = this.lists;
      var objstr = JSON.stringify(arrs);
      if (self.upSortClickTrue == false) {
        self.loading = true;
        self.upSortClickTrue = true;
        self
          .getstorecarefullyChosengetupdateSort({
            carefullyChosenJson: objstr
          })
          .then(data => {
            self.loading = false;
            self.upSortClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "修改排序成功!"
              });
              self.creatFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.upSortClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      this.$router.push({
        path: "/store/operation"
      });
    },
    ...mapActions([
      "getstorecarefullyChosengetCarefullyChosenDetail",
      "getstorecarefullyChosengetdelete",
      "getstorecarefullyChosengetupdateSort"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.lastSmallImg div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lastSmallImg div img {
  width: 55px;
  height: 55px;
}

.listImg > div:nth-child(2) {
  width: 400px;
  height: 290px;
  margin-left: 38px;
}

.smallImg li {
  position: relative;
  width: 160px;
  height: 140px;
  float: left;
  cursor: pointer;
  margin-right: 18px;
  margin-bottom: 7px;
}

.smallImg li > div:nth-child(1) {
  cursor: pointer;
  width: 154px;
  margin-top: 10px;
  height: 132px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  overflow: hidden;
}

.smallImg li > div:nth-child(2) {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.smallLi > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.delImg {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  cursor: pointer;
}

.listImg > div:nth-child(1) {
  width: 272px;
  height: 290px;
  position: relative;
}

.listImg > div:nth-child(1) > div:nth-child(1) {
  width: 272px;
  height: 290px;
  border-radius: 4px;
}

.listImg > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
  width: 262px;
  height: 280px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
  cursor: pointer;
}

.listImg > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) {
  width: 262px;
  height: 270px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.listImg > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) img {
  width: 75px;
  height: 75px;
}

.listImg > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.listImg {
  position: relative;
  width: 100%;
  height: 320px;
  display: flex;
}

.listCont {
  width: 900px;
  min-height: 450px;
  margin-top: 24px;
  overflow: hidden;
}

.listCont .but {
  margin-top: 25px;
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.listCont .but > div:nth-child(1) {
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

.listCont .but > div:nth-child(2) {
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

.sale > div:nth-child(1) {
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
  width: 150px;
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