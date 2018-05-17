<!--运营中心-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    模板编辑
                </div>
                <div>
                    <!--新增热词-->
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <ul>
                    <li>
                        <div class="list-nav">
                            <img src="/static/img/nav.jpg" alt="">
                        </div>
                        <div class="list-title">
                            <div>
                                <img src="/static/img/zuo.jpg" alt="">
                            </div>
                            <div>
                                商城
                            </div>
                            <div @click="navFootClick(4)">
                                <img :src="navRightImg | navImgFun" alt="">
                            </div>
                        </div>
                        <div class="list-scorrol">
                            <div>
                                <img src="/static/img/dcor.jpg" alt="">
                            </div>
                            <div>

                            </div>
                        </div>
                        <div class="list-new">
                            <div @click="channelClick(1)">
                                {{channelOne}}
                            </div>
                            <div>
                                <ul>
                                    <li v-show="xinpins.length != 0" class="list-newLi" v-for="(item,index) in xinpins" @click="xinpinClick(index)">
                                        <div>
                                            <img :src="item.picture" alt="">
                                        </div>
                                        <div>
                                            {{item.productName}}
                                        </div>
                                        <div>
                                            {{item.goodsSort}}
                                        </div>
                                        <div>
                                            ￥ {{item.price}}
                                        </div>
                                    </li>
                                    <li class="nullLi" v-show="xinpins.length == 0" @click="addxinpincommodityClick">
                                        <div>
                                            <img src="/static/img/addimg.jpg" alt="">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class="list-for">
                            <div @click="channelClick(3)">
                                {{channelTherr}}
                            </div>
                            <div class="listImg">
                                <div>
                                    <div v-show="bigImg.length != 0" @click="forbigImgForClick">
                                        <img :src="bigImg" alt="">
                                    </div>
                                    <div v-show="bigImg.length == 0" @click="forupdateClick(1)">
                                        <img src="/static/img/addimg.jpg" alt="">
                                    </div>
                                </div>
                                <div class="smallImg">
                                    <ul>
                                        <li class="smallLi" v-for="(item,index) in lists" @click="forClick(index)">
                                            <img :src="item.image" alt="">
                                        </li>
                                        <li @click="forupdateClick(0)" v-show="lists.length != 4" class="lastSmallImg">
                                            <img src="/static/img/addimg.jpg" alt="">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class="list-new">
                            <div @click="channelClick(2)">
                                {{channelTwo}}
                            </div>
                            <div>
                                <ul>
                                    <li v-show="renqis.length != 0" class="list-newLi" v-for="(item,index) in renqis" @click="renqiClick(index)">
                                        <div>
                                            <img :src="item.picture" alt="">
                                        </div>
                                        <div>
                                            {{item.productName}}
                                        </div>
                                        <div>
                                            {{item.goodsSort}}
                                        </div>
                                        <div>
                                            ￥ {{item.price}}
                                        </div>
                                    </li>
                                    <li class="nullLi" v-show="renqis.length == 0" @click="addrenqicommodityClick">
                                        <div>
                                            <img src="/static/img/addimg.jpg" alt="">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class="list-fond">
                            <div @click="channelClick(4)">
                                {{channelFour}}
                            </div>
                            <div @click="fondClick">
                                <ul>
                                    <li class="list-fondLi" v-for="(item,index) in cenis" @click="cainiClick(index)">
                                        <div>
                                            <img :src="item.picture" alt="">
                                        </div>
                                        <div>
                                            {{item.productName}}
                                        </div>
                                        <div>
                                            {{item.goodsSort}}
                                        </div>
                                        <div>
                                            ￥ {{item.price}}
                                        </div>
                                    </li>
                                    <li class="fondLinullLi" v-show="cenis.length == 0" @click="addceniscommodityClick">
                                        <div>
                                            <img src="/static/img/addimg.jpg" alt="">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!--<div>
                            </div>-->
                        </div>
                        <div class="list-foot">
                            <div @click="navFootClick(1)">
                                <div>
                                    <img :src="meImg | meImgFun" alt="">
                                </div>
                                <div>
                                    首页
                                </div>
                            </div>
                            <div @click="navFootClick(2)">
                                <div>
                                    <img :src="typeImg | typeImgFun" alt="">
                                </div>
                                <div>
                                    分类
                                </div>
                            </div>
                            <div @click="navFootClick(3)">
                                <div>
                                    <img :src="shopImg | shopImgFun" alt="">
                                </div>
                                <div>
                                    购物车
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--更新频道弹出框-->
        <div :class="{UpPopup:isUpPopup,showUp:isShowUp}">
            <transition name="slide-fade">
                <div class="UpContent" v-show="UpShow">
                    <div class="upInput">
                        <div>
                            频道名称：
                        </div>
                        <div>
                            <input type="text" v-model="upChanneName" :class="{redInput:isRedupChanneName,grayInput:isGrayupChanneName}">
                        </div>
                        <div :class="{redTest:isRedupChanneName,grayTest:isGrayupChanneName}">
                            （限制四个汉字）
                        </div>
                    </div>
                    <div class="upbut">
                        <div @click="UpClick">
                            确定
                        </div>
                        <div @click="cancelClick">
                            取消
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import operationUp from "../../cModule/operationUp";
export default {
  components: {
    "v-operationUp": operationUp
  },
  data() {
    return {
      isRedupChanneName: false,
      isGrayupChanneName: true,
      isUpChanneName: false,
      loading: false,
      titlename: "",
      isUpPopup: true,
      isShowUp: true,
      UpShow: false,
      UpIndex: 0,
      upChanneName: "",
      xinpins: [],
      renqis: [],
      bigImg: "",
      bigImgId: "",
      imgShow: true,
      imgBigShow: false,
      lists: [],
      cenis: [],
      channelOne: "新品首发",
      channelTwo: "人气推荐",
      channelTherr: "为你精选",
      channelFour: "猜你喜欢",
      channelOneId: "",
      channelTwoId: "",
      channelTherrId: "",
      channelFourId: "",
      channelOnetype: "",
      channelTwotype: "",
      channelTherrtype: "",
      channelFourtype: "",
      navRightImg: "",
      meImg: "",
      typeImg: "",
      shopImg: "",
      navRightImgId: "",
      meImgId: "",
      typeImgId: "",
      shopImgId: "",
      UpClickTrue: false
    };
  },
  // 过滤
  filters: {
    navImgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/cuo.png";
      }
    },
    meImgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/cuo.png";
      }
    },
    typeImgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/cuo.png";
      }
    },
    shopImgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/cuo.png";
      }
    }
  },
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
        self.createchannelFun();
        self.createiconFun();
        self.channelTherrFun();
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
    // 获取所有频道
    createchannelFun() {
      var self = this;
      self.loading = true;
      self
        .getstorechannelManagementselectChannel({})
        .then(data => {
          //   console.log("频道列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  if (ele.channelType == 0) {
                    self.channelTherrtype = 0;
                    self.channelTherrId = ele.id;
                    self.channelTherr = ele.channelTitle;
                  }
                  if (ele.channelType == 1) {
                    self.channelFour = ele.channelTitle;
                    self.channelFourId = ele.id;
                    self.channelFourtype = 1;
                  }
                  if (ele.channelType == 2) {
                    self.channelOne = ele.channelTitle;
                    self.channelOneId = ele.id;
                    self.channelOnetype = 2;
                  }
                  if (ele.channelType == 3) {
                    self.channelTwo = ele.channelTitle;
                    self.channelTwoId = ele.id;
                    self.channelTwotype = 3;
                  }
                });
                self.channelOneFun(self.channelOnetype);
                self.channelTwoFun(self.channelTwotype);
                self.channelFourFun(self.channelFourtype);
              } else {
              }
            } else {
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
          self.lists = [];
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 获取所有图标
    createiconFun() {
      var self = this;
      self
        .getstorehomePagehomeIcongetHomeIcons({})
        .then(data => {
          self.loading = false;
          //   console.log("图标列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                if (data.data.length == 4) {
                  self.navRightImg = data.data[3].grayIcon;
                  self.meImg = data.data[0].grayIcon;
                  self.typeImg = data.data[1].grayIcon;
                  self.shopImg = data.data[2].grayIcon;
                  self.navRightImgId = data.data[3].id;
                  self.meImgId = data.data[0].id;
                  self.typeImgId = data.data[1].id;
                  self.shopImgId = data.data[2].id;
                } else if (data.data.length == 3) {
                  self.meImg = data.data[0].grayIcon;
                  self.typeImg = data.data[1].grayIcon;
                  self.shopImg = data.data[2].grayIcon;
                  self.meImgId = data.data[0].id;
                  self.typeImgId = data.data[1].id;
                  self.shopImgId = data.data[2].id;
                } else if (data.data.length == 2) {
                  self.meImg = data.data[0].grayIcon;
                  self.typeImg = data.data[1].grayIcon;
                  self.meImgId = data.data[0].id;
                  self.typeImgId = data.data[1].id;
                } else if (data.data.length == 1) {
                  self.meImg = data.data[0].grayIcon;
                  self.meImgId = data.data[0].id;
                }
              }
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    channelOneFun(type) {
      var self = this;
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
                  self.xinpins = data.data.channelGoodsDtoList;
                }
              }
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    channelTwoFun(type) {
      var self = this;
      self
        .getstorechannelGoodsgetChannelGoods({
          channelType: type
        })
        .then(data => {
          self.loading = false;
          //   console.log("人气推荐商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.channelGoodsDtoList) {
                if (data.data.channelGoodsDtoList.length > 0) {
                  self.renqis = data.data.channelGoodsDtoList;
                }
              }
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    channelFourFun(type) {
      var self = this;
      self
        .getstorechannelGoodsgetChannelGoods({
          channelType: type
        })
        .then(data => {
          self.loading = false;
          //   console.log("猜你喜欢商品列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.channelGoodsDtoList) {
                if (data.data.channelGoodsDtoList.length > 0) {
                  self.cenis = data.data.channelGoodsDtoList;
                }
              }
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 为你精选列表
    channelTherrFun(type) {
      var self = this;
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
              self.jingxuans = [];
            }
          } else {
            self.jingxuans = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.jingxuans = [];
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 图标更换
    navFootClick(ind) {
      this.$router.push({
        path: "/store/navOperation",
        query: {
          ref: ind
        }
      });
    },
    // 更换频道名称
    channelClick(ind) {
      var self = this;
      self.UpIndex = ind;
      if (self.UpIndex == 4) {
      } else {
        self.isShowUp = false;
        self.UpShow = true;
        if (self.UpIndex == 1) {
          self.upChanneName = self.channelOne;
        } else if (self.UpIndex == 2) {
          self.upChanneName = self.channelTwo;
        } else if (self.UpIndex == 3) {
          self.upChanneName = self.channelTherr;
        } else if (self.UpIndex == 4) {
          self.upChanneName = self.channelFour;
        }
      }
    },
    // 确认更新频道
    UpClick() {
      var self = this;
      if (self.UpClickTrue == false) {
        var id = "";
        if (self.UpIndex == 1) {
          id = self.channelOneId;
        } else if (self.UpIndex == 2) {
          id = self.channelTwoId;
        } else if (self.UpIndex == 3) {
          id = self.channelTherrId;
        } else if (self.UpIndex == 4) {
          id = self.channelFourId;
        }
        if (self.isUpChanneName == true) {
          if (self.UpIndex == 3) {
            self.loading = true;
            self.UpClickTrue = true;
            self
              .getstorecarefullyChosenupdateTitle({
                title: self.upChanneName
              })
              .then(data => {
                self.loading = false;
                self.UpClickTrue = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "更新频道成功!"
                  });
                  self.isShowUp = true;
                  self.UpShow = false;
                  self.createchannelFun();
                  self.channelTherrFun();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.UpClickTrue = false;
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
          } else {
            if (self.UpIndex == 4) {
            } else {
              self.loading = true;
              self.UpClickTrue = true;
              self
                .getstorechannelManagementupdate({
                  channelId: id,
                  channelTitle: self.upChanneName
                })
                .then(data => {
                  self.loading = false;
                  self.UpClickTrue = false;
                  if (data.code == 200) {
                    self.$message({
                      type: "success",
                      message: "更新频道成功!"
                    });
                    self.isShowUp = true;
                    self.UpShow = false;
                    self.createchannelFun();
                  } else {
                    self.lists = [];
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.UpClickTrue = false;
                  self.loading = false;
                  self.$message({
                    type: "info",
                    message: "服务器错误"
                  });
                });
            }
          }
        } else {
          if (self.isUpChanneName == false) {
            self.isRedupChanneName = true;
            self.isGrayupChanneName = false;
          } else {
            self.isRedupChanneName = false;
            self.isGrayupChanneName = true;
          }
        }
      }
    },
    // 新品首发
    xinpinClick(index) {
      var self = this;
      self.$router.push({
        path: "/store/xpOperation",
        query: {
          type: self.channelOnetype,
          typeName: self.channelOne
        }
      });
    },
    // 新品首发商品添加
    addxinpincommodityClick() {
      var self = this;
      self.$router.push({
        path: "/store/xpchoicenessOperation",
        query: {
          ap: 1,
          type: self.channelOnetype,
          typeName: self.channelOne
        }
      });
    },
    // 人气推荐
    renqiClick(index) {
      var self = this;
      self.$router.push({
        path: "/store/xpOperation",
        query: {
          type: self.channelTwotype,
          typeName: self.channelTwo
        }
      });
    },
    // 人气推荐商品添加
    addrenqicommodityClick() {
      var self = this;
      self.$router.push({
        path: "/store/xpchoicenessOperation",
        query: {
          ap: 1,
          type: self.channelTwotype,
          typeName: self.channelTwo
        }
      });
    },
    // 猜你喜欢
    cainiClick(index) {
      var self = this;
      self.$router.push({
        path: "/store/xpConjOperation",
        query: {
          type: self.channelFourtype,
          typeName: self.channelFour
        }
      });
    },
    // 猜你喜欢商品添加
    addceniscommodityClick() {
      var self = this;
      self.$router.push({
        path: "/store/xpchoicenessOperation",
        query: {
          ap: 1,
          type: self.channelFourtype,
          typeName: self.channelFour
        }
      });
    },
    // 为你精选切换
    forClick(index) {
      var self = this;
      self.$router.push({
        path: "/store/delchoicenessOperation",
        query: {
          name: self.channelTherr
        }
      });
    },
    // 点击已有大图跳转
    forbigImgForClick() {
      var self = this;
      self.$router.push({
        path: "/store/delchoicenessOperation",
        query: {
          name: self.channelTherr
        }
      });
    },
    // 点击无图跳转
    forupdateClick(index) {
      var self = this;
      self.$router.push({
        path: "/store/choicenessOperation",
        query: {
          isBig: index,
          name: self.channelTherr,
          ap: 1
        }
      });
    },
    // 猜你喜欢切换
    fondClick() {},
    // 取消弹出框
    cancelClick() {
      this.isShowUp = true;
      this.UpShow = false;
    },
    ...mapActions([
      "getstorechannelManagementselectChannel",
      "getstorechannelManagementupdate",
      "getstorehomePagehomeIcongetHomeIcons",
      "getstorechannelGoodsgetChannelGoods",
      "getstorecarefullyChosengetCarefullyChosenDetail",
      "getstorecarefullyChosenupdateTitle"
    ])
  },
  // 监视
  watch: {
    upChanneName: function(val) {
      var trimstr = val.replace(/(^\s+)|(\s+$)/g, "");
      var reg = new RegExp(/^[\u4e00-\u9fa5]{1,4}$/);
      if (trimstr.length <= 0) {
        this.isUpChanneName = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedupChanneName = false;
          this.isGrayupChanneName = true;
          this.isUpChanneName = true;
        } else {
          this.isUpChanneName = false;
        }
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

.nullLi > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #939298;
}

.grayInput {
  border: 1px solid #d1d1d1;
}

.redInput {
  border: 1px solid #fe5371;
}

.list-foot > div {
  width: 45px;
  height: 45px;
  cursor: pointer;
}

.list-foot > div:nth-child(1) {
  margin-left: 36px;
}

.list-foot > div:nth-child(3) {
  margin-right: 36px;
}

.list-foot > div {
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.list-foot > div > div {
  width: 45px;
  display: flex;
  justify-content: center;
}

.list-foot > div > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.list-foot > div > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.list-foot > div > div:nth-child(2) {
  margin-top: 5px;
}

.list-foot {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fondLinullLi > div:nth-child(1) {
  width: 150px;
  height: 150px;
  margin-top: 10px;
  border: 1px solid #d1d1d1;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.list-fondLi {
  min-width: 170px;
  height: 265px;
  border: 1px solid #d1d1d1;
  margin-left: 5px;
  margin-top: 10px;
  overflow: hidden;
}

.list-fondLi > div:nth-child(1) {
  width: 170px;
  height: 170px;
}

.list-fondLi > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.list-fondLi > div:nth-child(2) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 170px;
  font-weight: 600;
  margin-top: 17px;
  padding-left: 10px;
}

.list-fondLi > div:nth-child(3) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ccc;
  padding-left: 10px;
}

.list-fondLi > div:nth-child(4) {
  overflow: hidden;
  padding-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 7px;
  color: rgb(255, 73, 73);
  font-size: 17px;
  font-weight: 600;
}

.list-fond > div:nth-child(2) {
  height: 340px;
  cursor: pointer;
  width: 380px;
}

.list-fond > div:nth-child(2) ul {
  height: 340px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
}

.list-fond > div:nth-child(1) {
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  padding-left: 25px;
  position: relative;
}

.list-fond > div:nth-child(1):after {
  position: absolute;
  top: 5px;
  left: 15px;
  width: 3px;
  height: 20px;
  content: "";
  background-color: rgb(251, 183, 49);
}

.list-fond > div:nth-child(3) {
  height: 12px;
  background-color: rgb(245, 245, 245);
  width: 100%;
  margin-top: 20px;
}

.list-fond {
  height: 390px;
  width: 100%;
}

.lastSmallImg {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lastSmallImg img {
  width: 25px;
  height: 25px;
}

.smallImg li {
  position: relative;
  width: 100px;
  height: 65px;
  float: left;
  cursor: pointer;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 2px;
  margin-top: 2px;
  overflow: hidden;
  background-color: #fff;
}

.smallLi img {
  width: 100%;
  height: 100%;
}

.listImg > div:nth-child(2) {
  width: 220px;
  height: 140px;
  margin-left: 5px;
  overflow: hidden;
}

.listImg > div:nth-child(1) {
  width: 135px;
  height: 135px;
  margin-left: 13px;
  overflow: hidden;
}

.listImg > div:nth-child(1) > div:nth-child(1) {
  background-color: #fff;
  width: 130px;
  height: 130px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  overflow: hidden;
}

.listImg > div:nth-child(1) > div:nth-child(2) {
  background-color: #fff;
  width: 130px;
  height: 130px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listImg > div:nth-child(1) > div:nth-child(2) img {
  width: 25px;
  height: 25px;
}

.listImg > div:nth-child(1) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.listImg {
  position: relative;
  width: 100%;
  height: 320px;
  display: flex;
}

.list-for > div:nth-child(2) {
  height: 170px;
  cursor: pointer;
  margin-top: 5px;
  width: 380px;
  background-color: rgb(245, 245, 245);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.list-for > div:nth-child(1) {
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  line-height: 30px;
  padding-left: 25px;
  position: relative;
}

.list-for > div:nth-child(1):after {
  position: absolute;
  top: 5px;
  left: 15px;
  width: 3px;
  height: 20px;
  content: "";
  background-color: rgb(251, 183, 49);
}

.list-for > div:nth-child(3) {
  height: 12px;
  background-color: rgb(245, 245, 245);
  width: 100%;
  margin-top: 20px;
}

.list-for {
  height: 245px;
  width: 100%;
}

.list-newLi > div {
  width: 100px;
}

.list-newLi > div:nth-child(1) {
  width: 100px;
  height: 100px;
}

.list-newLi > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.list-newLi > div:nth-child(2) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  margin-top: 7px;
}

.list-newLi > div:nth-child(3) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ccc;
}

.list-newLi > div:nth-child(4) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(255, 73, 73);
}

.list-new > div:nth-child(2) {
  height: 190px;
  margin-top: 5px;
  cursor: pointer;
  width: 380px;
}

.list-new > div:nth-child(2) ul {
  height: 195px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

.list-new > div:nth-child(2) ul li:nth-child(1) {
  margin-left: 15px;
}

.list-new > div:nth-child(2) ul li {
  min-width: 100px;
  height: 170px;
  margin-left: 10px;
}

.list-new > div:nth-child(1) {
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  padding-left: 25px;
  cursor: pointer;
  position: relative;
}

.list-new > div:nth-child(1):after {
  position: absolute;
  top: 5px;
  left: 15px;
  width: 3px;
  height: 20px;
  content: "";
  background-color: rgb(251, 183, 49);
}

.list-new > div:nth-child(3) {
  height: 12px;
  background-color: rgb(245, 245, 245);
  width: 100%;
  margin-top: 20px;
}

.list-new {
  height: 265px;
  width: 100%;
}

.list-title > div:nth-child(1) {
  margin-left: 15px;
  cursor: pointer;
}

.list-title > div:nth-child(2) {
  font-size: 16px;
  font-weight: 600;
  color: #303030;
}

.list-title > div:nth-child(3) {
  margin-right: 15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.list-title > div:nth-child(3) img {
  width: 100%;
  height: 100%;
}

.list-title {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-scorrol > div:nth-child(2) {
  height: 12px;
  background-color: rgb(245, 245, 245);
  width: 100%;
  margin-top: 17px;
}

.list-scorrol > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.list-scorrol {
  height: 250px;
}

.list-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
}

.list > ul > li {
  width: 380px;
  height: 1575px;
  border: 1px solid #d1d1d1;
  float: left;
  margin-right: 35px;
  overflow: hidden;
  margin-bottom: 130px;
}

.list > ul > li:nth-child(1) {
  margin-left: 0;
}

.list {
  min-height: 540px;
  width: 100%;
}

.sale {
  width: 100%;
  height: 100%;
}

.sale > div:nth-child(1) {
  overflow: hidden;
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
/*更新频道弹出框*/

.upInput {
  display: flex;
  align-items: center;
  margin-top: 100px;
}

input {
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 5px;
  width: 140px;
}

.upInput > div:nth-child(1) {
  margin-left: 100px;
  font-size: 14px;
  color: #303030;
}

.upInput > div:nth-child(2) {
  margin-left: 14px;
}

.upInput > div:nth-child(3) {
  margin-left: 12px;
  font-size: 14px;
}

.UpContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  box-shadow: 0px 5px 5px #e7e7e7;
  border-radius: 4px;
  z-index: 100000;
}

.UpPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showUp {
  display: none;
}

.upbut {
  width: 525px;
  height: 32px;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.upbut > div {
  cursor: pointer;
  width: 70px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

.upbut > div:nth-child(1) {
  margin-right: 23px;
  background-color: #fe5371;
}

.upbut > div:nth-child(2) {
  margin-left: 23px;
  background-color: #aeaeae;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
</style>