<!--添加医生管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        库存管理
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="noList" v-show="dataLists.length == 0">
                <div>
                    <img src="/static/img/w.png" alt="">
                </div>
            </div>
            <div class="list" v-show="dataLists.length > 0">
                <ul>
                    <li class="firstLi">
                        <div>
                            {{firstName}}
                        </div>
                        <div>
                            {{secondName}}
                        </div>
                        <div>
                            库存
                        </div>
                        <div>
                            价格
                        </div>
                        <div>
                            编辑
                        </div>
                    </li>
                    <li class="dataLi" v-for="(item,index) in dataLists">
                        <div>
                            {{item.skuName1.attr2}}
                        </div>
                        <div>
                            {{item.skuName2.attr4}}
                        </div>
                        <div>
                            {{item.surplusNum}}
                        </div>
                        <div>
                            {{item.price}}
                        </div>
                        <div class="editImg">
                            <img @click="compileClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--取消弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
        <!--编辑弹出框-->
        <div :class="{delPopup:isCompile,showdel:isShowCompile}">
            <div class="delContent" v-show="ComShow">
                <div class="delImg">
                    <div>
                        库存编辑
                    </div>
                </div>
                <div class="delCont">
                    <span>库存数量：</span>
                    <input :class="{redBorderCompilename:isredBorderCompilename}" type="text" maxlength="7" v-model="Compilename" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');">
                    <div :class="{redFontCompilename:isredFontCompilename}">只能输7位以内整数</div>
                </div>
                <div class="delope">
                    <div @click="okComClick">
                        确定
                    </div>
                    <div @click="canleComClick">
                        取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      secondName: "",
      firstName: "",
      titlename: "",
      Compilename: "",
      isCompile: true,
      isdelPopup: true,
      isShowdel: true,
      isShowCompile: true,
      delShow: false,
      ComShow: false,
      dataLists: [],
      okComClickTrue: false,
      isredBorderCompilename:false,
      isredFontCompilename:false,
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
      if (arrs.indexOf("inventory") == -1) {
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
        self.editData = JSON.parse(sessionStorage.edata);
        self.compile();
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
    //获取编辑列表
    compile() {
      var self = this;
      self
        .getcompileList({
          productId: this.editData.productId
        })
        .then(data => {
          self.loading = false;
          //   console.log("编辑列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length) {
                self.dataLists = data.data;
                this.firstName = this.dataLists[0].skuName1.attr1;
                this.secondName = this.dataLists[0].skuName2.attr3;
              } else {
                self.dataLists = [];
              }
            } else {
              self.dataLists = [];
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
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 箭头返回上一页/取消按钮
    canelClick() {
      this.$router.push({
        path: "/store/inventory"
      });
    },
    //确定取消框
    okClick() {
      this.$router.push({
        path: "/store/inventory"
      });
    },
    // 取消返回框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //编辑按钮
    compileClick(index) {
      this.isShowCompile = false;
      this.ComShow = true;
      //   console.log("bianji", this.dataLists[index]);
      this.Compilename = this.dataLists[index].surplusNum;
      this.compileId = this.dataLists[index].repertoryId;
    },
    //确定修改
    okComClick() {
      var self = this;
      if(self.Compilename == ''){
        self.isredBorderCompilename = self.isredFontCompilename = true
      }else{
      if (self.okComClickTrue == false) {
        self.okComClickTrue = true;
        self
          .getModification({
            repertoryId: this.compileId,
            surplusNum: this.Compilename
          })
          .then(data => {
            self.okComClickTrue = false;
            self.loading = false;
            if (data.code == 200) {
              self.$message({
                type:'success',
                message:'修改成功'
              })
              this.isShowCompile = true;
              this.ComShow = false;
              this.compile();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okComClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
      }
    },
    //取消修改
    canleComClick() {
      this.isShowCompile = true;
      this.ComShow = false;
    },
    ...mapActions(["getcompileList", "getModification"])
  },
  // 监视
  watch: {
    Compilename:function(val){
      if(val != ''){
        this.isredBorderCompilename = this.isredFontCompilename = false
      }
    }
  }
};
</script>
<style scoped>
.sale {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
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
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  font-size: 16px;
  font-weight: bold;
}

.list {
  min-height: 40px;
  margin-top: 24px;
  margin-left: 8%;
  margin-bottom: 150px;
}

/*取消弹出框*/

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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

li {
  width: 604px;
  height: 48px;
  overflow: hidden;
}

.firstLi div {
  background: #f2f4f8;
  font-size: 16px;
}

.firstLi {
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
}

li div {
  color: #303030;
  height: 48px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  float: left;
  line-height: 48px;
  text-align: center;
}

li div:nth-child(1) {
  border-left: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  width: 106px;
}

li div:nth-child(2) {
  width: 108px;
}

li div:nth-child(3) {
  width: 134px;
}

li div:nth-child(4) {
  width: 156px;
}

li div:nth-child(5) {
  width: 100px;
}

/* 编辑弹出框 */

.delImg {
  width: 525px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d1d1d1;
  font-size: 20px;
  font-weight: bold;
  color: #303030 !important;
}

.delCont {
  width: 435px;
  height: 25px;
  text-align: center;
  padding-top: 32px;
  position: relative;
}

.delCont input {
  width: 200px;
  height: 32px;
  margin-left: 3px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  text-align: center;
}

.delCont span:nth-child(1) {
  display: inline-block;
  width: 80px;
  font-size: 13px;
  color: #303030 !important;
}

.delCont div {
  position: absolute;
  color: #d1d1d1;
  right: -60px;
  top: 42px;
  font-size: 13px;
}

.delope {
  width: 525px;
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delope > div {
  cursor: pointer;
  width: 70px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

.delope > div:nth-child(1) {
  margin-right: 25px;
  background-color: #fe5371;
}

.delope > div:nth-child(2) {
  margin-left: 25px;
  background-color: #d1d1d1;
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

.editImg img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.redBorderCompilename{
  border:1px solid #fe5371 !important;
}
.redFontCompilename{
  color: #fe5371!important;
}
</style>