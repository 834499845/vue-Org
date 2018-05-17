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
                    <div class="listImg" v-show="delNo">
                        <div>
                            灰色图标：
                        </div>
                        <div>
                            <div>
                                <img :src="grayIcon" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="grayIcon">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedgrayIcon,grayTest:isGraygrayIcon}">
                            图片尺寸66*66
                        </div>
                        <div>
                            <input id="grayIcon" type="file" accept="image/jpeg,image/jpg,image/png" @change="ongrayIconChange">
                        </div>
                    </div>
                    <div class="listImg" v-show="delNo">
                        <div>
                            高亮图标：
                        </div>
                        <div>
                            <div>
                                <img :src="brightIcon" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="brightIcon">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedbrightIcon,grayTest:isGraybrightIcon}">
                            图片尺寸66*66
                        </div>
                        <div>
                            <input id="brightIcon" type="file" accept="image/jpeg,image/jpg,image/png" @change="onbrightIconChange">
                        </div>
                    </div>
                    <div></div>
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
      isRedgrayIcon: false,
      isGraygrayIcon: true,
      isRedbrightIcon: false,
      isGraybrightIcon: true,
      delYes: false,
      delNo: true,
      title: "编辑小图标",
      loading: false,
      grayIcon: "",
      brightIcon: "",
      navRightImgId: "",
      meImgId: "",
      typeImgId: "",
      shopImgId: "",
      ongrayIconChangeTrue: false,
      addClickTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    self.loading = true;
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
        self.createiconFun();
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
    // 获取所有图标
    createiconFun() {
      var self = this;
      var refId = self.$route.query.ref - 1;
      // self.loading = true
      self
        .getstorehomePagehomeIcongetHomeIcons({})
        .then(data => {
          self.loading = false;
          //   console.log("图标列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.grayIcon = data.data[refId].grayIcon;
                self.brightIcon = data.data[refId].brightIcon;
                self.navRightImgId = data.data[3].id;
                self.meImgId = data.data[0].id;
                self.typeImgId = data.data[1].id;
                self.shopImgId = data.data[2].id;
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
    // 选择是否删除
    deleteChange(ind) {
      if (ind == 1) {
        this.delYes = true;
        this.delNo = false;
      } else {
        this.delYes = false;
        this.delNo = true;
      }
    },
    // 灰色图标上传
    ongrayIconChange(e) {
      var self = this;
      if (self.ongrayIconChangeTrue == false) {
        var files = e.target.files || e.dataTransfer.files;
        var fileData = files[0];
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            if (image.width != 66 && image.height != 66) {
              self.$message({
                type: "info",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              document.getElementById("grayIcon").value = "";
              return;
            } else {
              self.uploadongrayIcon(fileData);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    uploadongrayIcon(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "mall");
      formdata.append("business", "homeIcon");
      formdata.append("token", TOKEN);
      self.ongrayIconChangeTrue = true;
      self
        .uploadFile(formdata)
        .then(data => {
          self.ongrayIconChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功",
              type: "success"
            });
            self.grayIcon = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.ongrayIconChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 高亮图标上传
    onbrightIconChange(e) {
      var self = this;
      if (self.ongrayIconChangeTrue == false) {
        var files = e.target.files || e.dataTransfer.files;
        var fileData = files[0];
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            if (image.width != 66 && image.height != 66) {
              self.$message({
                type: "info",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              document.getElementById("brightIcon").value = "";
              return;
            } else {
              self.onbrightIconIcon(fileData);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    onbrightIconIcon(file) {
      var self = this;
      var formdata = new FormData();
      var TOKEN = sessionStorage.getItem("token");
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "mall");
      formdata.append("business", "homeIcon");
      formdata.append("token", TOKEN);
      self.ongrayIconChangeTrue = true;
      self
        .uploadFile(formdata)
        .then(data => {
          self.ongrayIconChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功",
              type: "success"
            });
            self.brightIcon = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.ongrayIconChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    // 修改图标
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var ref = self.$route.query.ref;
        var idstr = "";
        if (ref == 1) {
          idstr = self.meImgId;
        } else if (ref == 2) {
          idstr = self.typeImgId;
        } else if (ref == 3) {
          idstr = self.shopImgId;
        } else if (ref == 4) {
          idstr = self.navRightImgId;
        }
        //   console.log(idstr);
        if (self.grayIcon.length > 0 && self.brightIcon.length > 0) {
          self.loading = true;
          self.addClickTrue = true;
          self
            .getstorehomeIcongetHomeIconupdate({
              id: idstr,
              grayIcon: self.grayIcon,
              brightIcon: self.brightIcon
            })
            .then(data => {
              self.loading = false;
              self.addClickTrue = false;
              // console.log("修改图标", JSON.parse(JSON.stringify(data)));
              if (data.code == 200) {
                self.$message({
                  type: "success",
                  message: "修改图标成功!"
                });
                self.$router.push({
                  path: "/store/operation"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.loading = false;
              self.addClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        } else {
          if (self.grayIcon.length == 0) {
            self.isRedgrayIcon = true;
            self.isGraygrayIcon = false;
          } else {
            self.isRedgrayIcon = false;
            self.isGraygrayIcon = true;
          }
          if (self.brightIcon.length == 0) {
            self.isRedbrightIcon = true;
            self.isGraybrightIcon = false;
          } else {
            self.isRedbrightIcon = false;
            self.isGraybrightIcon = true;
          }
        }
      }
    },
    // 箭头返回上一页/取消按钮
    caneleClick() {
      this.$router.push({
        path: "/store/operation"
      });
    },
    ...mapActions([
      "getstorehomePagehomeIcongetHomeIcons",
      "uploadFile",
      "getstorehomeIcongetHomeIconupdate"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayIconlabel {
  width: 80px;
  height: 28px;
  border-radius: 4px;
  line-height: 28px;
  color: #fff;
  background-color: #fe5371;
  cursor: pointer;
  text-align: center;
  display: block;
}

.listImg {
  margin-top: 24px;
  height: 32px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.listImg > div:nth-child(2) > div:nth-child(1) {
  width: 25px;
  height: 25px;
  border: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.listImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 30px;
}

.listImg > div:nth-child(2) {
  width: 140px;
  height: 32px;
  overflow: hidden;
  margin-left: 16px;
  display: flex;
  align-items: center;
}

.listImg > div:nth-child(1) {
  height: 30px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
}

.listImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.comone {
  height: 30px;
  display: flex;
  align-items: center;
}

.comone > div:nth-child(1) {
  height: 30px;
  line-height: 28px;
}

.comone > div:nth-child(2) {
  margin-top: 5px;
  margin-left: 12px;
}

.comone > div:nth-child(2) small {
  margin-left: 8px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) small {
  margin-left: 8px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) {
  margin-top: 5px;
  overflow: hidden;
  margin-left: 30px;
}

.listCont > div {
  display: flex;
  min-height: 30px;
  width: 100%;
}

.listCont {
  width: 800px;
  min-height: 450px;
  margin-top: 25px;
  margin-left: 148px;
}

.but {
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