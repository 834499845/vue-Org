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
                <div @click="addClick">
                    新增属性
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="list-sp">
                    <div>
                        属性名称：
                    </div>
                    <div>
                        <div v-show="detailsTrue">
                            <div>
                                {{spName}}
                            </div>
                            <div @click="detailsClick">
                                <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                            </div>
                        </div>
                        <div v-show="!detailsTrue">
                            <div>
                                <input type="text" v-model="spName" maxlength="8">
                            </div>
                            <div @click="nameClick">
                                确定
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-cont">
                    <ul>
                        <li class="firstLi">
                            <div>
                                序号
                            </div>
                            <div>
                                属性值颜色
                            </div>
                            <div>
                                排序
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="(item,index) in lists">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.attributeValue}}
                            </div>
                            <div class="order">
                                <div>
                                    <img @click="grayupIndexClick" v-show="index == 0" src="/static/img/grayup.png" alt="向上" title="向上">
                                    <img @click="upIndexClick(index)" v-show="index != 0" src="/static/img/up.png" alt="向上" title="向上">
                                </div>
                                <div>
                                    <img @click="downIndexClick(index)" v-show="index != lists.length - 1" src="/static/img/down.png" alt="向下" title="向下">
                                    <img @click="graydownIndexClick" v-show="index == lists.length - 1" src="/static/img/graydown.png" alt="向下" title="向下">
                                </div>
                            </div>
                            <div class="operate">
                                <div @click="listdetailsClick(index)">
                                    <img src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div @click="deleteClick(index)">
                                    <img src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--添加弹出框-->
        <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding">
                    <div class="addTitle">
                    </div>
                    <div class="addNa">
                        <div>
                            商品属性值：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addInput:isaddattributeValue,grayInput:isRrayattributeValue}" maxlength="8" type="text"
                                    v-model="attributeValue">
                            </div>
                            <div :class="{addTest:isaddattributeValue,grayTest:isRrayattributeValue}">
                                可输入8个字符
                            </div>
                        </div>
                    </div>
                    <div class="adBut">
                        <div @click="butAddClick">确定</div>
                        <div @click="cancelClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="loading">
                    <v-storeDel @ok="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import storeDel from "../../cModule/storeDel";
export default {
  components: {
    "v-storeDel": storeDel
  },
  data() {
    return {
      title: "商品规格",
      loading: false,
      adding: false,
      spName: "待定",
      detailsTrue: true,
      lists: [],
      isRrayattributeValue: true,
      isaddattributeValue: false,
      isattributeValue: false,
      attributeValue: "",
      isAddPopup: true,
      isShowAdd: true,
      addShow: false,
      upOrAd: 1,
      upIndex: 0,
      titlename: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      delIndex: 0,
      nameClickTrue: false,
      butAddClickTrue: false,
      delClickTrue: false,
      upIndexClickTrue: false
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
        if (comms.indexOf("standard") == -1) {
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
          var first = "";
          first = self.$route.query.first;
          self.spName = first;
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
    // 获取分类列表
    listFun() {
      var self = this;
      self.loading = true;
      var id = "";
      id = self.$route.query.id;
      var rank = "";
      rank = self.$route.query.rank;
      self
        .getstoreclassAttributeItemfindByAttributeId({
          id: id,
          type: rank
        })
        .then(dataOne => {
          self.loading = false;
          //   console.log("商品规格属性列表", JSON.parse(JSON.stringify(dataOne)));
          if (dataOne.code == 200) {
            if (dataOne.data) {
              if (dataOne.data.length > 0) {
                self.lists = dataOne.data;
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
              message: dataOne.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.lists = [];
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 点击编辑属性名称
    detailsClick() {
      this.detailsTrue = false;
    },
    // 属性名称修改
    nameClick() {
      var self = this;
      if (self.spName == "") {
        self.$message("请输入属性名称");
      } else {
        if (self.nameClickTrue == false) {
          self.nameClickTrue = true;
          var id = "";
          id = self.$route.query.id;
          var rank = "";
          rank = self.$route.query.rank;
          if (rank == 1) {
            self.loading = true;
            self
              .getstoreclassAttributemodify({
                id: id,
                firstAttribute: self.spName
              })
              .then(dataThr => {
                self.loading = false;
                self.nameClickTrue = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "success",
                    message: "修改规格成功!"
                  });
                  self.$route.query.first = self.spName;
                  this.detailsTrue = true;
                } else {
                  self.$message({
                    type: "info",
                    message: dataThr.message
                  });
                }
              })
              .catch(msg => {
                self.nameClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            self.loading = true;
            self
              .getstoreclassAttributemodify({
                id: id,
                secondAttribute: self.spName
              })
              .then(dataThr => {
                self.loading = false;
                self.nameClickTrue = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "success",
                    message: "修改规格成功!"
                  });
                  self.$route.query.first = self.spName;
                  this.detailsTrue = true;
                } else {
                  self.$message({
                    type: "info",
                    message: dataThr.message
                  });
                }
              })
              .catch(msg => {
                self.nameClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          }
        }
      }
    },
    // 添加弹出框
    addClick() {
      this.isShowAdd = false;
      this.addShow = true;
      this.upOrAd = 1;
    },
    // 确认添加或编辑
    butAddClick() {
      var self = this;
      var rankNum = self.lists.length;
      var rank = "";
      rank = self.$route.query.rank;
      var id = "";
      id = self.$route.query.id;
      if (self.isattributeValue == true) {
        if (self.butAddClickTrue == false) {
          self.butAddClickTrue = true;
          if (this.upOrAd == 1) {
            self.loading = true;
            self
              .getstoreclassAttributeItemsave({
                attributeId: id,
                attributeValue: self.attributeValue,
                attributeMark: rank,
                rank: rankNum + 1
              })
              .then(dataThr => {
                self.loading = false;
                self.butAddClickTrue = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "success",
                    message: "添加规格属性成功!"
                  });
                  self.isShowAdd = true;
                  self.addShow = false;
                  self.attributeValue = "";
                  self.listFun();
                } else {
                  self.$message({
                    type: "info",
                    message: dataThr.message
                  });
                }
              })
              .catch(msg => {
                self.butAddClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            self.loading = true;
            self
              .getstoreclassAttributeItemmodify({
                id: self.lists[self.upIndex].id,
                attributeValue: self.attributeValue
              })
              .then(dataThr => {
                self.loading = false;
                self.butAddClickTrue = false;
                if (dataThr.code == 200) {
                  self.$message({
                    type: "success",
                    message: "修改规格属性成功!"
                  });
                  self.attributeValue = "";
                  self.isShowAdd = true;
                  self.addShow = false;
                  self.listFun();
                } else {
                  self.$message({
                    type: "info",
                    message: dataThr.message
                  });
                }
              })
              .catch(msg => {
                self.butAddClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          }
        }
      } else {
        if (self.isattributeValue == false) {
          this.isRrayattributeValue = false;
          this.isaddattributeValue = true;
        } else {
          this.isRrayattributeValue = true;
          this.isaddattributeValue = false;
        }
      }
    },
    // 编辑弹出框
    listdetailsClick(ind) {
      this.isShowAdd = false;
      this.addShow = true;
      this.attributeValue = this.lists[ind].attributeValue;
      this.upOrAd = 2;
      this.upIndex = ind;
    },
    // 删除弹出框
    deleteClick(ind) {
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = ind;
      this.titlename = "属性";
    },
    // 确认删除
    delClick() {
      var self = this;
      if (self.delClickTrue == false) {
        self.delClickTrue = true;
        self.loading = true;
        var id = "";
        id = self.$route.query.id;
        self
          .getstoreclassAttributeItemdelete({
            id: self.lists[self.delIndex].id
          })
          .then(dataThr => {
            self.loading = false;
            self.isShowdel = true;
            self.delShow = false;
            self.delClickTrue = false;
            if (dataThr.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: dataThr.message
              });
            }
          })
          .catch(msg => {
            self.delClickTrue = false;
            self.loading = false;
            self.isShowdel = true;
            self.delShow = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 取消删除弹出框
    cancleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 取消弹出框
    cancelClcik() {
      this.isShowAdd = true;
      this.addShow = false;
    },
    // 禁止向上
    grayupIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于第一位不支持向上排序!"
      });
    },
    // 向上排序
    upIndexClick(index) {
      var self = this;
      if (self.upIndexClickTrue == false) {
        self.upIndexClickTrue = true;
        var arrs = self.lists;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({
            id: ele.id,
            rank: ele.rank
          });
        });
        var downObj = ups[index];
        ups.splice(index, 1);
        ups.splice(index - 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({
            id: ele.id,
            rank: upIn + 1
          });
        });
        var objstr = JSON.stringify(downs);
        self.loading = true;
        self
          .getstoreclassAttributeItembatchUpdateRank({
            rankJson: objstr
          })
          .then(dataThr => {
            self.loading = false;
            self.upIndexClickTrue = false;
            if (dataThr.code == 200) {
              self.$message({
                type: "success",
                message: "排序成功!"
              });
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: dataThr.message
              });
            }
          })
          .catch(msg => {
            self.upIndexClickTrue = false;
            self.loading = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    // 禁止向下
    graydownIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于最后一位不支持向下排序!"
      });
    },
    // 向下排序
    downIndexClick(index) {
      var self = this;
      if (self.upIndexClickTrue == false) {
        self.upIndexClickTrue = true;
        var arrs = self.lists;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({
            id: ele.id,
            rank: ele.rank
          });
        });
        var downObj = ups[index];
        ups.splice(index, 1);
        ups.splice(index + 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({
            id: ele.id,
            rank: upIn + 1
          });
        });
        var objstr = JSON.stringify(downs);
        self.loading = true;
        self
          .getstoreclassAttributeItembatchUpdateRank({
            rankJson: objstr
          })
          .then(dataThr => {
            self.loading = false;
            self.upIndexClickTrue = false;
            if (dataThr.code == 200) {
              self.$message({
                type: "success",
                message: "排序成功!"
              });
              self.listFun();
            } else {
              self.$message({
                type: "info",
                message: dataThr.message
              });
            }
          })
          .catch(msg => {
            self.upIndexClickTrue = false;
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
        path: "/store/commodity/standard"
      });
    },
    ...mapActions([
      "getstoreclassAttributeItemfindByAttributeId",
      "getstoreclassAttributemodify",
      "getstoreclassAttributeItemsave",
      "getstoreclassAttributeItemmodify",
      "getstoreclassAttributeItemdelete",
      "getstoreclassAttributeItembatchUpdateRank"
    ])
  },
  // 监视
  watch: {
    attributeValue: function(val) {
      //   console.log(val);
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      if (trimstr.length <= 0) {
        this.isattributeValue = false;
      } else {
        if (trimstr.length <= 8) {
          this.isRrayattributeValue = true;
          this.isaddattributeValue = false;
          this.isattributeValue = true;
        } else {
          this.isattributeValue = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.addInput {
  border: 1px solid #fe5371;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

.addTest {
  color: #fe5371;
}

.grayTest {
  color: #d1d1d1;
}

.list-cont .nullList {
  height: 400px;
}

.list-cont > ul .nullList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.firstLi > div {
  color: #303030;
  font-size: 17px;
  font-weight: bold;
  height: 58px;
  line-height: 58px;
  text-align: center;
  background-color: #f2f4f8;
}

.dataLi > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.order {
  display: flex;
  align-items: center;
  justify-content: center;
}

.order > div {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.order > div img {
  width: 100%;
  height: 100%;
}

.order > div:nth-child(1) {
  margin-right: 10px;
}

.order > div:nth-child(2) {
  margin-left: 10px;
}

.operate > div:nth-child(1) {
  margin-right: 10px;
}

.operate > div:nth-child(2) {
  margin-left: 10px;
}

.operate {
  display: flex;
  align-items: center;
  justify-content: center;
}

.operate > div {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.operate > div img {
  width: 100%;
  height: 100%;
}

.list-cont li {
  display: flex;
  min-height: 50px;
  border-bottom: 1px solid #d1d1d1;
}

.list-cont li:nth-last-of-type(1) {
  border-bottom: 0;
}

.list-cont li:nth-child(1) {
  border-top: 1px solid #d1d1d1;
}

.list-cont li > div:nth-child(1) {
  border-left: 1px solid #d1d1d1;
}

.list-cont li > div {
  width: 25%;
  border-right: 1px solid #d1d1d1;
}

.list-cont {
  width: 100%;
  min-height: 500px;
  overflow: hidden;
  margin-top: 24px;
}

.list-sp {
  height: 32px;
  width: 100%;
  display: flex;
  font-size: 16px;
  color: #303030;
  line-height: 32px;
}

.list-sp > div:nth-child(2) {
  margin-left: 7px;
  display: flex;
  align-items: center;
  height: 32px;
}

.list-sp > div:nth-child(2) > div:nth-child(1) {
  display: flex;
  height: 32px;
}

.list-sp > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) {
  min-width: 35px;
  height: 32px;
}

.list-sp > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) {
  margin-left: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.list-sp > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.list-sp > div:nth-child(2) > div:nth-child(2) {
  display: flex;
  height: 32px;
}

.list-sp > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) {
  margin-left: 22px;
  width: 70px;
  height: 30px;
  text-align: center !important;
  line-height: 30px;
  cursor: pointer;
  background-color: #fe5371;
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
}

.list-sp input {
  width: 150px;
  height: 32px;
  border-radius: 4px;
  color: #303030;
  border: 1px solid #d1d1d1;
  text-align: center;
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

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
  width: 100%;
  overflow: hidden;
  margin-top: 24px;
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

.listTitle > div:nth-child(2) {
  float: right;
  width: 80px;
  height: 26px;
  border: 1px solid #fe5371;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}

.addPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addContent > div:nth-child(1) {
  height: 15px;
  width: 100%;
}

.addContent input {
  width: 270px;
  height: 32px;
  border-radius: 4px;
  color: #303030;
  text-align: center;
}

.addContent {
  width: 450px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.showAdd {
  display: none;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

.adBut {
  width: 100%;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.adBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.adBut > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #fe5371;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.adBut > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addNa {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
  margin-top: 20px;
}

.addNa > div:nth-child(2) {
  margin-left: 15px;
  /*border: 1px solid red;*/
  height: 70px;
  overflow: hidden;
}

.addNa > div:nth-child(2) > div {
  width: 280px;
  overflow: hidden;
}

.addNa > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.addNa > div:nth-child(1) {
  width: 105px;
  height: 70px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  padding-top: 5px;
}
/*删除弹出框*/

.delContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 280px) / 2) auto;
  z-index: 100000;
}

.delPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.showdel {
  display: none;
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