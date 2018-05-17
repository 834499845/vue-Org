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
                        <ul>
                            <draggable v-model="lists" @start="drag=true" @end="drag=false">
                                <li class="liImg" v-for="(item,index) in lists">
                                    <div @click="updateImgClick(index)">
                                        <img :src="item.picture" alt="">
                                    </div>
                                    <div @click="delImgClick(index)">
                                        <img src="/static/img/否.png" alt="">
                                    </div>
                                </li>
                            </draggable>
                            <li class="addLiImg" v-show="lists.length != 200" @click="addImgClick">
                                <div>
                                    <img src="/static/img/addimg.jpg" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="but">
                        <div @click="aupsortClick">确定</div>
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
      loading: false,
      title: "新品首发",
      lists: [],
      delImgClickTrue: false,
      isaupsortClick: false
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
        self.createFun();
        self.title = self.$route.query.typeName;
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
    // 获取所有新品
    createFun() {
      var self = this;
      var type = "";
      self.loading = true;
      type = self.$route.query.type;
      self
        .getstorechannelGoodsgetChannelGoods({
          channelType: type
        })
        .then(data => {
          self.loading = false;
          //   console.log("新品商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.channelGoodsDtoList) {
                if (data.data.channelGoodsDtoList.length > 0) {
                  self.lists = data.data.channelGoodsDtoList;
                } else {
                  self.lists = [];
                }
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
    // 更新商品
    updateImgClick(index) {
      var self = this;
      var type = "";
      type = self.$route.query.type;
      var typeName = "";
      typeName = self.$route.query.typeName;
      self.$router.push({
        path: "/store/xpchoicenessOperation",
        query: {
          ap: 2,
          type: type,
          id: self.lists[index].id,
          goodsId: self.lists[index].goodsId,
          typeName: typeName
        }
      });
    },
    // 添加商品
    addImgClick() {
      var self = this;
      var type = "";
      type = self.$route.query.type;
      var typeName = "";
      typeName = self.$route.query.typeName;
      self.$router.push({
        path: "/store/xpchoicenessOperation",
        query: {
          ap: 1,
          type: type,
          typeName: typeName
        }
      });
    },
    // 删除商品
    delImgClick(index) {
      var self = this;
      if (self.delImgClickTrue == false) {
        self.delImgClickTrue = true;
        var type = "";
        type = self.$route.query.type;
        self
          .getstorechannelGoodsdelete({
            goodsId: self.lists[index].goodsId,
            channelType: parseInt(type)
          })
          .then(data => {
            self.loading = false;
            self.delImgClickTrue = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.createFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.loading = false;
            self.delImgClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 排序
    aupsortClick() {
      var self = this;
      if (self.isaupsortClick == false) {
        var type = "";
        var arrs = [];
        var idJson = "";
        var ids = [];
        type = self.$route.query.type;
        arrs = self.lists;
        arrs.forEach(function(ele, ind) {
          ids.push(ele.goodsId);
        });
        var idJson = ids.join(",");
        self.isaupsortClick = true;
        self
          .getstorechannelGoodsupdateSort({
            goodsIdJson: "[" + idJson + "]",
            channelType: parseInt(type)
          })
          .then(data => {
            self.loading = false;
            self.isaupsortClick = false;
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "排序成功!"
              });
              self.createFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.loading = false;
            self.isaupsortClick = false;
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
      "getstorechannelGoodsgetChannelGoods",
      "getstorechannelGoodsdelete",
      "getstorechannelGoodsupdateSort"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.addLiImg > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.addLiImg div img {
  width: 25px;
  height: 25px;
}

.listImg li > div:nth-child(1) {
  width: 99px;
  height: 99px;
  border: 1px solid #d1d1d1;
  margin-top: 9px;
  border-radius: 4px;
}

.liImg > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.listImg li > div:nth-child(2) {
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #d1d1d1;
}

.listImg li > div:nth-child(2) img {
  margin-top: -2px;
  margin-left: 0px;
  width: 100%;
  height: 100%;
}

.listImg {
  width: 100%;
  min-height: 400px;
  overflow: hidden;
}

.listImg li {
  width: 109px;
  height: 109px;
  float: left;
  margin-right: 24px;
  position: relative;
  background-color: #fff;
  margin-bottom: 15px;
  cursor: pointer;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.listCont {
  margin-top: 24px;
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

.but {
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  width: 100%;
  align-items: center;
  overflow: hidden;
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