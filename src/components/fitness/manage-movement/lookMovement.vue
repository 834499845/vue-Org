<!--新增动作管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="adding">
                <div class="list-cont">
                    <div class="listRoutine">
                        <div>
                            动作名称：
                        </div>
                        <div>
                            <input type="text" v-model="movement" :class="{redInput:isRedmovement,grayInput:isGraymovement}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedmovement,grayTest:isGraymovement}">
                            最多十个字符
                        </div>
                    </div>
                    <div class="listImg">
                        <div>
                            动作视频：
                        </div>
                        <div>
                            <div v-loading="videoUpload">
                                <video width="300" height="160" ref='videoa' :src="upFile" controls="controls">
                                    <object :data="upFile" width="300" height="160" >
                                        <embed :src="upFile" width="300" height="160" type="application/x-shockwave-flash"/>
                                    </object>
                                </video>   
                            </div>
                            <div>
                                <label class="grayIconlabel" for="brightIcon">上传</label>
                            </div>
                        </div>
                        <div :class="{redTest:isRedFile,grayTest:isGrayFile}">
                            最大100M视频
                        </div>
                        <div>
                            <input id="brightIcon" type="file" @change="onFileChange" >
                        </div>
                    </div>
                    <!-- <div class="listRoutine">
                        <div>
                            动作时长：
                        </div>
                        <div>
                            <input type="number" v-model="playtime" :class="{redInput:isRedplaytime,grayInput:isGrayplaytime}">
                        </div>
                        <div :class="{redTest:isRedplaytime,grayTest:isGrayplaytime}">

                        </div>
                    </div> -->
                    <div class="listRoutine">
                        <div>
                            动作消耗：
                        </div>
                        <div>
                            <input type="text" v-model="kilocalorie" :class="{redInput:isRedkilocalorie,grayInput:isGraykilocalorie}" maxlength="10">
                        </div>
                        <div :class="{redTest:isRedkilocalorie,grayTest:isGraykilocalorie}">
                            只能输入数字。单位为卡路里（cal)
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            动作标签：
                        </div>
                        <div>
                            <select @change="selectTypesClick" v-model="type">
                                 <option v-for="(type,index) in types"  v-bind:value="type.id">{{type.labelName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="listRoutine">
                        <div>
                            训练部位：
                        </div>
                        <div>
                            <select @change="selectPartsClick" v-model="part">
                                 <option v-for="(type,index) in parts"  v-bind:value="type.id">{{type.siteName}}</option>
                            </select>
                        </div>
                    </div>
                    <!-- <div class="but">
                        <div @click="addClick">确定</div>
                        <div @click="backClick">取消</div>
                    </div> -->
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
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/cancelBox";
import Vue from "vue";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      videoUpload: false,
      title: "动作详情",
      adding: false,
      isRedplaytime: false,
      isGrayplaytime: true,
      isplaytime: false,
      isRedkilocalorie: false,
      isGraykilocalorie: true,
      iskilocalorie: false,
      isRedmovement: false,
      isGraymovement: true,
      ismovement: false,
      isRedFile: false,
      isGrayFile: true,
      isFile: false,
      types: [],
      type: 0,
      parts: [],
      part: 0,
      upFile: "",
      movement: "",
      playtime: "",
      kilocalorie: "",
      upObj: {
        actionName: "",
        labelId: "",
        siteId: "",
        timeLong: "",
        video: "",
        kilocalorie: ""
      },
      fileSize: 0,

      intercept: false,
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      titlename: "您确定要执行该操作吗？",
      onFileChangeTrue: false,
      addClickTrue: false
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
        if (ele.name == "健身管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("movement") == -1) {
        this.intercept = true
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
        var operation = "";
        operation = self.$route.query.op;
        if (operation == 1) {
          self.title = "新增动作";
          self.addlistFun();
        } else {
          self.title = "动作详情";
          self.uplistFun();
        }
      }
    } else {
      this.intercept = true
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
        query: { op: 3, id: sessionStorage.getItem("lookDrillId") }
      });
    },
    //取消拦截弹出
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // add initialize data
    addlistFun() {
      var self = this;
      // 标签
      self
        .getfitnessLabellControllerselectLabellPage({
          current: 1,
          size: 200
        })
        .then(data => {
          //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.types = data.data.records;
                  self.type = data.data.records[0].id;
                } else {
                  self.types = [{ labelName: "暂无数据", id: 999999 }];
                  self.type = 999999;
                }
              } else {
                self.types = [{ labelName: "暂无数据", id: 999999 }];
                self.type = 999999;
              }
            } else {
              self.types = [{ labelName: "暂无数据", id: 999999 }];
              self.type = 999999;
            }
          } else {
            self.types = [{ labelName: "暂无数据", id: 999999 }];
            self.type = 999999;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.types = [{ labelName: "暂无数据", id: 999999 }];
          self.type = 999999;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
      // 部位
      self
        .getfitnessSiteControllerselectSitePage({
          current: 1,
          size: 200
        })
        .then(data => {
          //console.log("列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.parts = data.data.records;
                  self.part = data.data.records[0].id;
                } else {
                  self.parts = [{ siteName: "暂无数据", id: 999999 }];
                  self.part = 999999;
                }
              } else {
                self.parts = [{ siteName: "暂无数据", id: 999999 }];
                self.part = 999999;
              }
            } else {
              self.parts = [{ siteName: "暂无数据", id: 999999 }];
              self.part = 999999;
            }
          } else {
            self.parts = [{ siteName: "暂无数据", id: 999999 }];
            self.part = 999999;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.parts = [{ siteName: "暂无数据", id: 999999 }];
          self.part = 999999;
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // up initialize data
    uplistFun() {
      var self = this;
      var id = "";
      id = self.$route.query.id;
      self
        .getfitnessActionControllerfindById({
          id: id
        })
        .then(data => {
          //console.log("详情列表", JSON.parse(JSON.stringify(data)));
          if (data.code == 200) {
            self.movement = data.data.actionName;
            self.upObj.actionName = data.data.actionName;
            self.upFile = data.data.video;
            self.isFile = true;
            self.kilocalorie = data.data.kilocalorie;
            var labelType = data.data.labelName;
            var sitetype = data.data.siteName;
            // 标签
            self
              .getfitnessLabellControllerselectLabellPage({
                current: 1,
                size: 200
              })
              .then(data => {
                //console.log("动作标签列表", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        self.types = data.data.records;
                        self.types.forEach(function(ele, ind) {
                          if (ele.labelName == labelType) {
                            self.type = ele.id;
                          }
                        });
                      } else {
                        self.types = [];
                      }
                    } else {
                      self.types = [];
                    }
                  } else {
                    self.types = [];
                  }
                } else {
                  self.types = [];
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.lists = [];
                //console.log(msg);
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
            // 部位
            self
              .getfitnessSiteControllerselectSitePage({
                current: 1,
                size: 200
              })
              .then(data => {
                //console.log("训练部位列表", JSON.parse(JSON.stringify(data)));
                if (data.code == 200) {
                  if (data.data) {
                    if (data.data.records) {
                      if (data.data.records.length > 0) {
                        self.parts = data.data.records;
                        self.parts.forEach(function(ele, ind) {
                          if (ele.siteName == sitetype) {
                            self.part = ele.id;
                          }
                        });
                      } else {
                        self.parts = [];
                      }
                    } else {
                      self.parts = [];
                    }
                  } else {
                    self.parts = [];
                  }
                } else {
                  self.parts = [];
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.lists = [];
                //console.log(msg);
                self.loading = false;
                self.$message({
                  type: "info",
                  message: "服务器异常!"
                });
              });
          } else {
            self.types = [];
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.lists = [];
          //console.log(msg);
          self.loading = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // change video
    onFileChange(e) {
      var self = this;
      if (self.onFileChangeTrue == false) {
        self.isFile = false;
        self.videoUpload = true;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          var fileMaxSize = "";
          fileMaxSize = fileData.size / 1024 / 1024;
          self.fileSize = fileMaxSize;
          if (fileMaxSize > 100) {
            self.$message({
              message: "上传视频不能大于100M",
              type: "info"
            });
            self.isFile = false;
          } else {
            //console.log(fileData.type[0])
            if (fileData.type[0] == 'v') {
              self.onFile(fileData);
              // self.videoUpload = false;
            } else {
              self.videoUpload = false;
              self.$message({
                type: 'info',
                message: "您将要上传的文件非视频，请重新上传！"
              })
            }           
          }
        }
      }
    },
    getuploadFileVersions(formdata) {
      var self = this;
      return Vue.http
        .post("/zuul/file-service-file-upload/V1.0.0/api/file/upload", formdata)
        .then(response => {
          if (response.status === 200) {
            return Promise.resolve(response.body);
          } else {
            return Promise.reject(response.data);
          }
        });
    },
    onFile(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "fitness");
      formdata.append("business", "action");
      formdata.append("token", TOKEN);
      self.onFileChangeTrue = true;
      self
        .getuploadFileVersions(formdata)
        .then(data => {
          self.onFileChangeTrue = false;
          self.videoUpload = false;
          if (data.code == 200) {
            self.$message({
              message: "上传视频成功",
              type: "success"
            });
            self.isFile = true;
            self.upFile = data.data[0].path;
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.onFileChangeTrue = false;
          self.videoUpload = false;
          self.$message({
            type: "info",
            message: "服务器异常!"
          });
        });
    },
    // select type
    selectTypesClick() {},
    // select part
    selectPartsClick() {},
    // affirm addtion
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        var operation = "";
        operation = self.$route.query.op;
        var time = self.$refs.videoa.duration;
        self.playtime = Math.floor(time);
        if (self.type != 999999 || self.part != 999999) {
          if (
            self.ismovement == true &&
            self.isFile == true &&
            self.iskilocalorie == true
          ) {
            if (operation == 1) {
              self.adding = true;
              self.addClickTrue = true;
              self
                .getfitnessActionControllersave({
                  actionName: self.movement,
                  labelId: self.type,
                  siteId: self.part,
                  timeLong: parseInt(self.playtime),
                  video: self.upFile,
                  kilocalorie: parseInt(self.kilocalorie),
                  videoSize: self.fileSize.toFixed(2)
                })
                .then(data => {
                  self.adding = false;
                  self.addClickTrue = false;
                  if (data.code == 200) {
                    this.intercept = true;
                    self.$message({
                      type: "info",
                      message: "添加成功!"
                    });
                    self.$router.push({
                      path: "/fitness/movement"
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
                  self.adding = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常!"
                  });
                });
            } else {
              var id = "";
              id = self.$route.query.id;
              var back = "";
              back = self.$route.query.back;
              self.adding = true;
              var ipdateObj = {};
              if (self.upObj.actionName == self.movement) {
                ipdateObj = {
                  id: id,
                  labelId: self.type,
                  siteId: self.part,
                  timeLong: parseInt(self.playtime),
                  video: self.upFile,
                  kilocalorie: parseInt(self.kilocalorie),
                  videoSize: self.fileSize.toFixed(2)
                };
              } else {
                ipdateObj = {
                  actionName: self.movement,
                  id: id,
                  labelId: self.type,
                  siteId: self.part,
                  timeLong: parseInt(self.playtime),
                  video: self.upFile,
                  kilocalorie: parseInt(self.kilocalorie),
                  videoSize: self.fileSize.toFixed(2)
                };
              }
              self.addClickTrue = true;
              self
                .getfitnessActionControllerupdateById(ipdateObj)
                .then(dataThr => {
                  self.adding = false;
                  self.addClickTrue = false;
                  if (dataThr.code == 200) {
                    self.intercept = true;
                    self.$message({
                      type: "info",
                      message: "修改成功!"
                    });
                    // //console.log(self.labelName)
                    if (back == 1) {
                      var parentId = "";
                      parentId = self.$route.query.parentId;
                      self.$router.push({
                        path: "/fitness/lookDrill",
                        query: { id: parentId }
                      });
                    } else {
                      self.$router.push({
                        path: "/fitness/movement"
                      });
                    }
                  } else {
                    self.$message({
                      type: "info",
                      message: data.message
                    });
                  }
                })
                .catch(msg => {
                  self.addClickTrue = false;
                  self.adding = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常!"
                  });
                });
            }
          } else {
            if (self.ismovement == false) {
              self.isRedmovement = true;
              self.isGraymovement = false;
            } else {
              self.isRedmovement = false;
              self.isGraymovement = true;
            }
            if (self.isFile == false) {
              self.isRedFile = true;
              self.isGrayFile = false;
            } else {
              self.isRedFile = false;
              self.isGrayFile = true;
            }
            if (self.iskilocalorie == false) {
              self.isRedkilocalorie = true;
              self.isGraykilocalorie = false;
            } else {
              self.isRedkilocalorie = false;
              self.isGraykilocalorie = true;
            }
          }
        } else {
          if (self.type == 999999) {
            self.$message({
              type: "info",
              message: "标签暂无数据，请去设置!"
            });
          } else if (self.part == 999999) {
            self.$message({
              type: "info",
              message: "部位暂无数据，请去设置!"
            });
          }
        }
      }
    },
    // back
    backClick() {
      // this.$router.push({
      //     path: '/fitness/movement'
      // })
      history.back();
    },
    ...mapActions([
      "getstorechannelManagementselectChanneluploadFile",
      "getfitnessLabellControllerselectLabellPage",
      "getfitnessSiteControllerselectSitePage",
      "getfitnessActionControllersave",
      "getfitnessActionControllerupdateById",
      "getfitnessActionControllerfindById"
    ])
  },
  // 监视
  watch: {
    movement: function(val) {
      var trimstr = val;
      var reg = new RegExp(/[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/g);
      if (trimstr.length <= 0) {
        this.ismovement = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedmovement = false;
          this.isGraymovement = true;
          this.ismovement = true;
        } else {
          this.ismovement = false;
        }
      }
    },
    kilocalorie: function(val) {
      var trimstr = val;
      var reg = new RegExp(/^\d{1,10}$/);
      if (trimstr.length <= 0) {
        this.iskilocalorie = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRedkilocalorie = false;
          this.isGraykilocalorie = true;
          this.iskilocalorie = true;
        } else {
          this.iskilocalorie = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.listImg {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 175px;
}

.listImg > div:nth-child(2) > div:nth-child(1) {
  width: 310px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  /*overflow: hidden;*/
  border: 1px solid #e5e5e5;
}

.listImg > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.listImg > div:nth-child(2) > div:nth-child(2) {
  margin-left: 24px;
  width: 70px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #5acdfa;
  color: #fff;
  background-color: #5acdfa;
  cursor: pointer;
}
.listImg > div:nth-child(2) > div:nth-child(2) > label {
  padding: 0;
  width: 70px;
}
.listImg > div:nth-child(2) {
  width: 400px;
  height: 270px;
  margin-left: 14px;
  display: flex;
  align-items: center;
}

.listImg > div:nth-child(1) {
  height: 170px;
  width: 100px;
  line-height: 30px;
  color: #303030;
  font-size: 14px;
  text-align: right;
}

.listImg > div:nth-child(3) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  font-size: 14px;
}

.listImg > div:nth-child(4) {
  height: 30px;
  line-height: 30px;
  margin-left: 24px;
  width: 10px;
  font-size: 14px;
}

.listImg > div:nth-child(4) input {
  width: 10px;
}

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
  width: 800px;
  min-height: 300px;
}

.but {
  height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 40px;
}

.list .but > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #5acdfa;
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

select {
  width: 120px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appappearanceearance: none;
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