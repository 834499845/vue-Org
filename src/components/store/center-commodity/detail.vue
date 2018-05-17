<!--商品中心-添加商品-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="addCommodity">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="gobackClick" style="cursor: pointer;">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        查看商品
                    </div>
                </div>
            </div>
            <div class="main">
                <div>
                    <div>商品类型：</div>
                    <div>{{goodsType}}</div>
                </div>
                <div>
                    <div>商品类目：</div>
                    <div>{{goodsLevel}}</div>
                </div>
                <div>
                    <div>商家品牌：</div>
                    <div>{{goodsBrands}}</div>
                </div>
                <div>
                    <div>供货商：</div>
                    <div>{{supplier}}</div>
                </div>
                <div>
                    <div>进货价：</div>
                    <div>{{buyPrice}}</div>
                </div>
                <div>
                    <div>商品名称：</div>
                    <div>{{productName}}</div>
                </div>
                <!--<div>
                    <div>商品描述：</div>
                    <div>{{goodsDetail}}</div>
                </div>-->
                <div>
                    <div>商品标签：</div>
                    <div>{{goodsLabel}}</div>
                </div>
                <div>
                    <div>详细列表：</div>
                    <div class="pDetaLs">
                        <ul>
                            <li class="firstLi">
                                <div>
                                    {{color}}
                                </div>
                                <div>
                                    {{size}}
                                </div>
                                <div>
                                    库存
                                </div>
                                <div>
                                    价格
                                </div>
                                <div>
                                    图片
                                </div>
                            </li>
                            <li class="dataLi" v-for="(item,index) in dataLists">
                                <div>{{item.skuName | transColor}}</div>
                                <div>{{item.skuName | transSize}}</div>
                                <div>{{item.productNum}}</div>
                                <div>{{item.price}}</div>
                                <div><img style="width:35px;height:35px;" :src="item.picture" alt=""></div>
                            </li>
                        </ul>
                    </div>
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
      goodsType: "普通商品",
      goodsLevel: "",
      goodsBrands: "",
      supplier: "",
      buyPrice: "",
      productName: "",
      //    goodsDetail:'',
      goodsLabel: "",
      color: "",
      size: "",
      dataLists: []
    };
  },
  // 过滤
  filters: {
    transColor: function(data) {
      return data.split(",")[0].split(":")[1];
    },
    transSize: function(data) {
      return data.split(",")[1].split(":")[1];
    }
  },
  // 模块新建时
  created: function() {
    this.goodscontent();
    var self = this;
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
        if (comms.indexOf("sale") == -1) {
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
    goodscontent() {
      var self = this;
      self
        .getstoreProductInfo({
          productId: self.$route.query.id
        })
        .then(data => {
          if (data.code == 200) {
            var getskuname = data.data.repertoryList[0].skuName;
            self.color = getskuname.split(",")[0].split(":")[0];
            self.size = getskuname.split(",")[1].split(":")[0];
            self.supplier =
              data.data.product.server == null
                ? "平台自营"
                : data.data.product.server;
            self.buyPrice = data.data.product.buyingPrice;
            self.productName = data.data.product.productName;
            // self.goodsDetail = data.data.product.description
            self.goodsLabel = data.data.product.lable;
            self.dataLists = data.data.repertoryList;
            self.askBrands(data.data.product.brandId);
            // var categoryId = data.data.product.categoryId.split('#')
            self.askgoodsType(data.data.product.categoryId);
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 根据id查询商家品牌
    askBrands(id) {
      var self = this;
      self
        .getbrandfindOneById({
          id: id
        })
        .then(data => {
          if (data.code == 200) {
            self.goodsBrands = data.data.chinaName;
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 查询商品类目
    askgoodsType(m) {
      var self = this;
      self
        .getaskgoodsTypeList({
          path: m
        })
        .then(data => {
          if (data.code == 200) {
            self.goodsLevel = data.data;
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    gobackClick() {
      this.$router.push({
        path: "/store/commodity/sale"
      });
    },
    ...mapActions([
      "getstoreProductInfo",
      "getbrandfindOneById",
      "getaskgoodsTypeList"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.addCommodity {
  width: 100%;
  height: 100%;
}

.addCommodity > div {
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
}

.listTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(1) img {
  margin: 0;
  padding: 0;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  font-weight: 600;
  margin-left: 10px;
}

/*.main {
        margin-left: 150px;
    }*/

.main > div {
  margin-top: 24px;
  display: flex;
}

.main > div > div:nth-child(1) {
  display: flex;
  min-width: 80px;
  justify-content: flex-end;
}

.main > div > div:nth-child(2) {
  margin-left: 10px;
}

ul {
  border: 1px solid #d9dbde;
  border-bottom: none;
}

ul li {
  display: flex;
}

ul li > div {
  border-bottom: 1px solid #d9dbde;
  border-right: 1px solid #d9dbde;
  width: 110px;
  text-align: center;
}

.firstLi {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  background-color: #f2f4f8;
}

.dataLi {
  height: 50px;
  line-height: 50px;
}
</style>