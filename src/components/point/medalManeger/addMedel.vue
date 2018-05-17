<!--新增勋章-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="addMedel">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        新增勋章
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="list-cont">
                    <div class="listRoutine">
                        <div>
                            序号：
                        </div>
                        <div>
                          {{indexNumber}}
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            勋章名称：
                        </div>
                        <div>
                            <input type="text" v-model="nameVal" :class="{redBorder:isRedNameVal,grayBorder:isGrayNameVal}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedNameVal,grayTest:isGrayNameVal}">
                            最多十个汉字
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            所需积分：
                        </div>
                        <div>
                            <input type="text" v-model="scoreVal" :class="{redBorder:isRedScoreVal,grayBorder:isGrayScoreVal}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedScoreVal,grayTest:isGrayScoreVal}">
                            只能输入正整数
                        </div>
                    </div>
                    <div class="detailMedelImg">
                        <div>
                            勋章图片：
                        </div>
                        <div>
                            <div>
                                <img :src="imageOneDetailMedel" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="detailMedelOneImg">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedDetailMedelOneImg,grayTest:isGrayDetailMedelOneImg}">
                            支持尺寸：660*660像素（彩色大图）
                        </div>
                        <div>
                            <input id="detailMedelOneImg" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageOneDetailMedelChange">
                        </div>
                    </div>
                    <div class="listMedelImg">
                        <div>
                            小图片：
                        </div>
                        <div>
                            <div>
                                <img :src="imageOneListMedel" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="listMedelOneImg">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedListMedelOneImg,grayTest:isGrayListMedelOneImg}">
                            支持尺寸：225*225像素（彩色小图）
                        </div>
                        <div>
                            <input id="listMedelOneImg" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageOneListMedelChange">
                        </div>
                    </div>
                    <div class="detailMedelImg">
                        <div>
                            勋章图片：
                        </div>
                        <div>
                            <div>
                                <img :src="imageTwoDetailMedel" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="detailMedelTwoImg">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedDetailMedelTwoImg,grayTest:isGrayDetailMedelTwoImg}">
                            支持尺寸：660*660像素（灰色大图）
                        </div>
                        <div>
                            <input id="detailMedelTwoImg" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageTwoDetailMedelChange">
                        </div>
                    </div>
                    <div class="listMedelImg">
                        <div>
                            小图片：
                        </div>
                        <div>
                            <div>
                                <img :src="imageTwoListMedel" alt="">
                            </div>
                            <div>
                                <label class="grayIconlabel" for="imageTwoListMedel">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedbrightbgtwoImg,grayTest:isGraybrightbgtwoImg}">
                            支持尺寸：225*225像素（灰色小图）
                        </div>
                        <div>
                            <input id="imageTwoListMedel" type="file" accept="image/jpeg,image/jpg,image/png" @change="onimageTwoListMedelChange">
                        </div>
                    </div>
                    <div class="button">
                        <div @click="addClick">确定</div>
                        <div @click="backClick">取消</div>
                    </div>
                </div>
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
    </div>
</template>
<script>
import { mapActions } from "vuex";
import hosdel from "../../cModule/cancelBox";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      indexNumber: '',
      loading: false,
      isRedScoreVal: false,
      isGrayScoreVal: true,
      isdescribeText: false,
      isRedNameVal: false,
      isGrayNameVal: true,
      isRedListMedelOneImg: false,
      isGrayListMedelOneImg: true,
      isRedbrightbgtwoImg: false,
      isGraybrightbgtwoImg: true,
      isbgOneImg: false,
      isbgTwoImg: false,
      isRedDetailMedelOneImg: false,
      isRedDetailMedelTwoImg: false,
      isGrayDetailMedelOneImg: true,
      isGrayDetailMedelTwoImg: true,
      isCoverOneImage: false,
      isCoverTwoImage: false,
      isRedrightLists: false,
      isGrayrightLists: true,
      imageOneDetailMedel: "",
      imageTwoDetailMedel: "",
      imageOneListMedel: "",
      imageTwoListMedel: "",
      nameVal: "",
      scoreVal: "",
      intercept: false,
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      titlename: "您确定要执行该操作吗？",
      onimageBgChangeTrue: false,
      onimageCoverChangeTrue: false,
      addClickTrueOrFalse: true
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "积分管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("medel") == -1) {
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
        self.indexNumber = sessionStorage.getItem("indexNumber")       
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
  //跳转拦截
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdel = false;
      this.delShow = true;
    } else if (this.intercept == true) {
      this.isShowdel = true;
      this.delShow = false;
      next();
    }
  },
  // 事件处理
  methods: {
    //确定拦截弹出
    okClick() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url,
      });
    },
    //取消拦截弹出
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 改变彩色小图片
    onimageOneListMedelChange(e) {
      var self = this;
      if (self.onimageBgChangeTrue == false) {
        self.isbgOneImg = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
               if (fileData.size == 102400) {
                self.$message({
                  type: "info",
                  message: "您上传的图片大小不正确，请重新上传"
                });
                document.getElementById("listMedelOneImg").value = "";
                return 
              } else if (image.width !== 225) {
                self.$message({
                  type: "info",
                  message: "您上传的图片宽度不正确，请重新上传"
                });
                document.getElementById("listMedelOneImg").value = "";
                return 
              } else if (image.height !== 225) {
                self.$message({
                  type: "info",
                  message: "您上传的图片高度不正确，请重新上传"
                });
                document.getElementById("listMedelOneImg").value = "";
                return 
              }
              self.onimageOneListMedel(fileData);
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    // 彩色小图
    onimageOneListMedel(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "authority");
      formdata.append("business", "integral");
      formdata.append("token", TOKEN);
      self.onimageBgChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageBgChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功!",
              type: "success"
            });
            self.isbgOneImg = true;
            self.imageOneListMedel = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageBgChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // 改变灰色小图
    onimageTwoListMedelChange(e) {
      var self = this;
      if (self.onimageBgChangeTrue == false) {
        self.isbgTwoImg = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
               if (fileData.size == 102400) {
                self.$message({
                  type: "info",
                  message: "您上传的图片大小不正确，请重新上传"
                });
                document.getElementById("imageTwoListMedel").value = "";
                return 
              } else if (image.width !== 225) {
                self.$message({
                  type: "info",
                  message: "您上传的图片宽度不正确，请重新上传"
                });
                document.getElementById("imageTwoListMedel").value = "";
                return 
              } else if (image.height !== 225) {
                self.$message({
                  type: "info",
                  message: "您上传的图片高度不正确，请重新上传"
                });
                document.getElementById("imageTwoListMedel").value = "";
                return 
              }
              self.onimageTwoListMedel(fileData);
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    // 灰色小图
    onimageTwoListMedel(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "authority");
      formdata.append("business", "integral");
      formdata.append("token", TOKEN);
      self.onimageBgChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageBgChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功!",
              type: "success"
            });
            self.isbgTwoImg = true;
            self.imageTwoListMedel = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageBgChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // 改变彩色大图
    onimageOneDetailMedelChange(e) {
      var self = this;
      if (self.onimageCoverChangeTrue == false) {
        self.isCoverOneImage = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
              if (fileData.size == 1048576) {
                self.$message({
                  type: "info",
                  message: "您上传的图片大小不正确，请重新上传"
                });
                document.getElementById("detailMedelOneImg").value = "";
                return 
              } else if (image.width !== 660) {
                self.$message({
                  type: "info",
                  message: "您上传的图片宽度不正确，请重新上传"
                });
                document.getElementById("detailMedelOneImg").value = "";
                return 
              } else if (image.height !== 660) {
                self.$message({
                  type: "info",
                  message: "您上传的图片高度不正确，请重新上传"
                });
                document.getElementById("detailMedelOneImg").value = "";
                return 
              }
              self.onimageOneDetailMedel(fileData);
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    // 彩色大图
    onimageOneDetailMedel(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "authority");
      formdata.append("business", "integral");
      formdata.append("token", TOKEN);
      self.onimageCoverChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageCoverChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功!",
              type: "success"
            });
            self.isCoverOneImage = true;
            self.imageOneDetailMedel = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageCoverChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // 改变灰色大图片
    onimageTwoDetailMedelChange(e) {
      var self = this;
      if (self.onimageCoverChangeTrue == false) {
        self.isCoverTwoImage = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
              if (fileData.size == 1048576) {
                self.$message({
                  type: "info",
                  message: "您上传的图片大小不正确，请重新上传"
                });
                document.getElementById("detailMedelTwoImg").value = "";
                return 
              } else if (image.width !== 660) {
                self.$message({
                  type: "info",
                  message: "您上传的图片宽度不正确，请重新上传"
                });
                document.getElementById("detailMedelTwoImg").value = "";
                return 
              } else if (image.height !== 660) {
                self.$message({
                  type: "info",
                  message: "您上传的图片高度不正确，请重新上传"
                });
                document.getElementById("detailMedelTwoImg").value = "";
                return 
              }
              self.onimageTwoDetailMedel(fileData);
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      }
    },
    // 灰色大图片
    onimageTwoDetailMedel(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "authority");
      formdata.append("business", "integral");
      formdata.append("token", TOKEN);
      self.onimageCoverChangeTrue = true;
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          self.onimageCoverChangeTrue = false;
          if (data.code == 200) {
            self.$message({
              message: "上传图片成功!",
              type: "success"
            });
            self.isCoverTwoImage = true;
            self.imageTwoDetailMedel = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onimageCoverChangeTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // 正则验证
    validateFun() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"); //不支持非法字符
      var reg_3 = /^[\u4e00-\u9fa5]*$/   //只能输入汉字
      var reg_4 = /^\+?[1-9]\d*$/;// 只能输入正整数
      if (reg_1.test(this.nameVal) || !reg_3.test(this.nameVal)) {
        this.isRedNameVal = true;
        this.isGrayNameVal = false;
      } else {
        this.isRedNameVal = false;
        this.isGrayNameVal = true;
      }
      if (reg_1.test(this.scoreVal) || !reg_4.test(this.scoreVal)) {
        this.isRedScoreVal = true;
        this.isGrayScoreVal = false;
      } else {
        this.isRedScoreVal = false;
        this.isGrayScoreVal = true;
      }
      if (this.imageOneDetailMedel.length == 0) {
        this.isRedDetailMedelOneImg = true,
        this.isGrayDetailMedelOneImg =  false
      } else {
        this.isRedDetailMedelOneImg = false,
        this.isGrayDetailMedelOneImg =  true
      }
      if (this.imageTwoDetailMedel.length == 0) {
        this.isRedDetailMedelTwoImg = true,
        this.isGrayDetailMedelTwoImg =  false
      } else {
        this.isRedDetailMedelTwoImg = false,
        this.isGrayDetailMedelTwoImg =  true
      }
      if (this.imageOneListMedel.length == 0) {
        this.isRedListMedelOneImg = true,
        this.isGrayListMedelOneImg =  false
      } else {
        this.isRedListMedelOneImg = false,
        this.isGrayListMedelOneImg =  true
      }
      if (this.imageTwoListMedel.length == 0) {
        this.isRedListMedelTwoImg = true,
        this.isGrayListMedelTwoImg =  false
      } else {
        this.isRedListMedelTwoImg = false,
        this.isGrayListMedelTwoImg =  true
      }
      if (
        this.isRedNameVal == true ||
        this.isRedScoreVal == true ||
        this.isRedDetailMedelOneImg == true ||
        this.isRedDetailMedelTwoImg == true ||
        this.isRedListMedelOneImg == true || 
        this.isRedListMedelTwoImg == true
      ) {
        return false;
      }
    },
    // 确认添加
    addClick() {
      var self = this;
      if (self.validateFun() == false) {
          return false
      } else {
        if (self.addClickTrueOrFalse == true) {
            self.getpointIntegralMedalInsert({
              name: self.nameVal,
              score: self.scoreVal,
              state: 0,
              itemGrayImage: self.imageTwoListMedel,
              itemBrightImage: self.imageOneListMedel,
              detailGrayImage: self.imageTwoDetailMedel,
              detailBrightImage: self.imageOneDetailMedel,
            }).then(data => {
                  if (data.code == 200) {
                      self.intercept = true
                      self.$router.push({
                        path: '/point/medel'
                      })
                  } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        })
                  }
            }).catch(msg => {
                  self.$message({
                        type: 'info',
                        message: '服务器异常'
                  })
            })
        }
      }
    },
    // 返回
    backClick() {
      this.$router.push({
          path: '/point/medel'
      })
      sessionStorage.removeItem("indexNumber")
    },
    ...mapActions([
      "getstorechannelManagementselectChanneluploadFile",
      "getpointIntegralMedalInsert"
    ])
  },
  // 监视
  watch: {
    nameVal: function(val) {
     
    },
    scoreVal: function(val) {
    }
  }
};
</script>
<style scoped>
.listMedelImg {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 155px;
}

.listMedelImg > div:nth-child(2) > div:nth-child(1) {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.listMedelImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}

.listMedelImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 24px;
  width: 70px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #FF8A41;
  color: #fff;
  background-color: #FF8A41;
  cursor: pointer;
}

.listMedelImg > div:nth-child(2) > div:nth-child(2) label {
  width: 70px;
  padding: 0;
}

.listMedelImg > div:nth-child(2) {
  width: 400px;
  height: 155px;
  margin-left: 14px;
  display: flex;
  align-items: center;
}

.listMedelImg > div:nth-child(1) {
  height: 150px;
  width: 100px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
  text-align: right;
}

.listMedelImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.listMedelImg > div:nth-child(4) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  width: 10px;
  font-size: 14px;
}

.listMedelImg > div:nth-child(4) input {
  width: 10px;
  display: none;
}

.detailMedelImg {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 175px;
}

.detailMedelImg > div:nth-child(2) > div:nth-child(1) {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.detailMedelImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  border-radius: 3px;
}

.detailMedelImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 24px;
  width: 70px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #FF8A41;
  color: #fff;
  background-color: #FF8A41;
  cursor: pointer;
}
.detailMedelImg > div:nth-child(2) > div:nth-child(2) label {
  width: 70px;
  padding: 0;
}
.detailMedelImg > div:nth-child(2) {
  width: 400px;
  height: 270px;
  margin-left: 14px;
  display: flex;
  align-items: center;
}

.detailMedelImg > div:nth-child(1) {
  height: 170px;
  width: 100px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
  text-align: right;
}

.detailMedelImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.detailMedelImg > div:nth-child(4) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  width: 10px;
  font-size: 14px;
}

.detailMedelImg > div:nth-child(4) input {
  width: 10px;
  display: none;
}

.redTest {
  color: #fe5371;
}

.grayTest {
  color: #8f8e94;
}

.grayBorder {
  border: 1px solid #d1d1d1;
}

.redBorder {
  border: 1px solid #fe5371;
}

.listRoutine input {
  width: 305px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  color: #303030;
}

.listRoutine > div:nth-child(1) {
  width: 100px;
  text-align: right;
}

.listRoutine > div:nth-child(2) {
  margin-left: 16px;
}

.listRoutine > div:nth-child(3) {
  margin-left: 18px;
}

.listRoutine {
  margin-top: 24px;
  display: flex;
  min-height: 33px;
  align-items: center;
}

.list-cont {
  width: 850px;
  min-height: 300px;
}

.button {
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 80px;
}

.list .button > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #FF8A41;
  margin-right: 25px;
  cursor: pointer;
}

.list .button > div:nth-child(2) {
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

.addMedel > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
  width: 100%;
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

/* 取消弹出框 */

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
</style>