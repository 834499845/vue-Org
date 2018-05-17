<!--添加医生管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="canelClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        新增医生
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="list-name">
                    <div>
                        医生名称：
                    </div>
                    <div>
                        <input :class="{redbor:isborname}" type="text" maxlength="10" v-model="docName" placeholder="请输入医生名称">
                        <span :class="{redfont:isfontname}" class="isAstrict">最多输入10个字符（不支持非法字符）</span>
                    </div>
                </div>
                <div class="list-img">
                    <div>
                        上传头像：
                    </div>
                    <div>
                        <div>
                            <div>
                                <img src="/static/img/addimg.jpg" alt="" v-show="imgboxOne">
                                <img :src="mainPicuter" alt="" v-show="imgboxTow">
                            </div>
                            <label for="upfile">上传</label>
                            <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                        </div>
                        <div>
                            <span :class="{redfont:isfontimg}" class="isAstrict">图片尺寸为96*96，大小不能超过200k</span>
                        </div>
                    </div>
                </div>
                <div class="doctorNumber">
                    <div>
                        手机号：
                    </div>
                    <div>
                        <input type="text" :class="{redbor:isborPhone}" v-model="doctorPhoneModel" maxlength="11" placeholder="请输入11位手机号" onkeyup="value=value.replace(/[^\d]/g,'')"
                        />
                        <span :class="{redfont:isborPhone}"> 请输入正确的手机号</span>
                    </div>
                </div>
                <div class="doctorNumber">
                    <div>
                        执业证书编号：
                    </div>
                    <div>
                        <input type="text" :class="{redbor:isborQualification}" v-model="doctorQualificationModel" maxlength="15" placeholder="请输入15位数字编码"
                            onkeyup="value=value.replace(/[^\d]/g,'')" />
                        <span :class="{redfont:isborQualification}"> 请输入15位数字编码</span>
                    </div>
                </div>
                <div class="list-hosp">
                    <div>
                        所属医院：
                    </div>
                    <div class="list-hosp-select">
                        <select :class="{redbor:isborhosp}" @change="hospChangg" v-model="hospId">
                            <option v-for="(type,index) in hospitalLists" v-bind:value="type.id" :key="type.id">{{type.hospitalName}}</option>
                        </select>
                    </div>
                </div>
                <div class="list-mc">
                    <div>
                        科室：
                    </div>
                    <div>
                        <div class="list-select">
                            <select :class="{redbor:isborBigAdmin}" @change="bigAdminClick" v-model="BigAdminId">
                                <option v-for="(type,index) in bigAdminList" v-bind:value="type.id" :key="type.value">{{type.value}}</option>
                            </select>
                        </div>
                        <div class="list-mcSmall list-select">
                            <select :class="{redbor:isborsmallAdmin}" @change="smallAdminChg" v-model="smallAdminId">
                                <option v-for="(type,index) in smallAdminList" v-bind:value="type.id" :key="type.value">{{type.value}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="list-rank">
                    <div>
                        级别：
                    </div>
                    <div class="list-select">
                        <select :class="{redbor:isborrank}" @change="rankChg" v-model="DoctorRank">
                            <option v-for="(type,index) in docRank" v-bind:value="type.key" :key="type.value">{{type.value}}</option>
                        </select>
                    </div>
                </div>
                <div class="list-label">
                    <div>
                        标签：
                    </div>
                    <div class="cssFlex">
                        <input :class="{redbor:isborlabel}" class="listLabelInp" type="text" maxlength="5" v-model="labelName" @keyup.13="show()"
                            placeholder="请输入标签">
                        <span :class="{redfont:isfontlabel}" class="isAstrict">最多输入5个字符，输入完成请按回车确认（最多添加4个标签，不支持非法字符）</span>
                    </div>
                </div>
                <div class="list-label-spa">
                    <span v-for="(city,index) in labelArr" :key="city">
                        {{city}}
                        <img src="/static/img/shan.jpg" @click="shanBq(index)" alt="">
                    </span>
                </div>
                <div class="list-txt">
                    <div class="doctorIntroduce">
                        医生介绍：
                    </div>
                    <div class="cssFlex">
                        <textarea :class="{redbor:isborintroduce}" class="listTxtInp doctorIntroduce" maxlength="500" v-model="introduce"></textarea>
                        <span :class="{redfont:isfontintroduce}" class="isAstrict">最多输入500个字符</span>
                    </div>
                </div>
                <div class="list-txt">
                    <div>
                        擅长领域：
                    </div>
                    <div class="cssFlex">
                        <textarea :class="{redbor:isborterritory}" class="listTxtInp" maxlength="30" v-model="territory"></textarea>
                        <span :class="{redfont:isfontterritory}" class="isAstrict">最多输入30个字符</span>
                    </div>
                </div>
                <div class="list-txt">
                    <div>
                        医学背景：
                    </div>
                    <div class="cssFlex">
                        <textarea :class="{redbor:isborbackdrop}" class="listTxtInp" maxlength="200" v-model="backdrop"></textarea>
                        <span :class="{redfont:isfontbackdrop}" class="isAstrict">最多输入200个字符</span>
                    </div>
                </div>
                <div class="list-txt">
                    <div>
                        学术研究成果：
                    </div>
                    <div class="cssFlex">
                        <textarea :class="{redbor:isborachieve}" class="listTxtInp" maxlength="200" v-model="achieve"></textarea>
                        <span :class="{redfont:isfontachieve}" class="isAstrict">最多输入200个字符</span>
                    </div>
                </div>
                <div class="list-txt">
                    <div>
                        医生寄语：
                    </div>
                    <div class="cssFlex">
                        <textarea :class="{redbor:isborbailment}" class="listTxtInp" maxlength="200" v-model="bailment"></textarea>
                        <span :class="{redfont:isfopntbailment}" class="isAstrict">最多输入200个字符</span>
                    </div>
                </div>
                <div class="but">
                    <div @click="addDoct">确定</div>
                    <div @click="canelClick">取消</div>
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
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      uploadimage: true,
      adddoct: true,
      doctorPhoneModel: "", // 手机号
      isborPhone: false,
      doctorQualificationModel: "", //执业编号
      isborQualification: false,
      money: "",
      hospId: "",
      hospName: "",
      bailment: "",
      achieve: "",
      backdrop: "",
      territory: "",
      docName: "",
      DoctorRank: "",
      DoctorRankName: "",
      smallAdminId: "",
      smallAdminName: "",
      selectRankId: "",
      BigAdminId: "",
      isdelPopup: true,
      isShowdel: true,
      delShow: false,
      mainPicuter: "",
      bigAdminText: "",
      bigAdmin: "",
      introduce: "",
      fieldname: "",
      labelName: "",
      imgboxOne: true,
      imgboxTow: false,
      hospitalLists: [], //医院列表
      cities: [],
      docRank: [], //医生级别
      titlename: "劳动成果还未保存，是否退出？",
      bigAdminList: [], //一级科室列表
      smallAdminList: [], // 二级科室列表
      labelArr: [],
      isborname: false,
      isfontname: false,
      isfontimg: false,
      isborhosp: false,
      isborBigAdmin: false,
      isborsmallAdmin: false,
      isborrank: false,
      isborlabel: false,
      isfontlabel: false,
      isborintroduce: false,
      isfontintroduce: false,
      isborterritory: false,
      isfontterritory: false,
      isborbackdrop: false,
      isfontbackdrop: false,
      isborachieve: false,
      isfontachieve: false,
      isborbailment: false,
      isfopntbailment: false,
      intercept: false
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
        if (ele.name == "医疗管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      //console.log("arrs", arrs);
      if (arrs.indexOf("doctor") == -1) {
        this.intercept = true;
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
        this.gainDoctorRankList();
        this.hospitalList();
      }
    } else {
      this.intercept = true;
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
    // 箭头返回上一页/取消按钮
    canelClick() {
      this.$router.push({
        path: "/medical/doctor"
      });
    },
    //确定取消框
    okClick() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    //获取医院管理列表
    hospitalList() {
      var self = this;
      self
        .gethospitalmanageList({
          pageNo: 1,
          pageSize: 1000000000
        })
        .then(data => {
          //console.log("医院管理列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length == 0) {
                  this.hospitalLists = [];
                } else {
                  self.hospitalLists = data.data.records;
                  self.hospId = data.data.records[0].id;
                  self.hospName = data.data.records[0].hospitalName;
                  self.ksList();
                }
              } else {
                this.hospitalLists = [];
              }
            } else {
              this.hospitalLists = [];
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常！"
          });
        });
    },
    //取消返回框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //医院选取
    hospChangg() {
      var self = this;
      for (var i = 0; i < self.hospitalLists.length; i++) {
        if (self.hospId == self.hospitalLists[i].id) {
          self.hospName = self.hospitalLists[i].hospitalName;
        }
      }
      this.ksList();
      this.isborhosp = false;
    },
    //获取一级科室列表
    ksList() {
      this.bigAdminList = [{ value: "加载中...", id: "" }];
      this.BigAdminId = "";
      this.smallAdminList = [{ value: "加载中...", id: "" }];
      this.smallAdminId = "";
      var self = this;
      self
        .getselectBigDepartmentList({
          pageNo: 1,
          pageSize: 100000000,
          hospitalId: self.hospId
        })
        .then(data => {
          //console.log("一级科室列表：", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.bigAdminList = data.data.records;
                  self.BigAdminId = self.bigAdminList[0].id;
                  self.ksLitList();
                } else {
                  self.bigAdminList = [{ value: "暂无数据", id: "" }];
                  self.BigAdminId = "";
                  self.smallAdminList = [{ value: "暂无数据", id: "" }];
                  self.smallAdminId = "";
                }
              } else {
                self.bigAdminList = [{ value: "暂无数据", id: "" }];
                self.BigAdminId = "";
                self.smallAdminList = [{ value: "暂无数据", id: "" }];
                self.smallAdminId = "";
              }
            } else {
              self.bigAdminList = [{ value: "暂无数据", id: "" }];
              self.BigAdminId = "";
              self.smallAdminList = [{ value: "暂无数据", id: "" }];
              self.smallAdminId = "";
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
            self.bigAdminList = [{ value: "暂无数据", id: "" }];
            self.BigAdminId = "";
            self.smallAdminList = [{ value: "暂无数据", id: "" }];
            self.smallAdminId = "";
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常！"
          });
          self.bigAdminList = [{ value: "暂无数据", id: "" }];
          self.BigAdminId = "";
          self.smallAdminList = [{ value: "暂无数据", id: "" }];
          self.smallAdminId = "";
        });
    },
    //选取一级科室
    bigAdminClick() {
      this.isborBigAdmin = false;
      this.ksLitList();
    },
    //获取二级科室列表
    ksLitList() {
      this.smallAdminList = [{ value: "加载中...", id: "" }];
      this.smallAdminId = "";
      var self = this;
      self
        .getselectSmallDepartmentList({
          pageNo: 1,
          pageSize: 1000000000,
          hospitalId: self.hospId,
          parentId: self.BigAdminId
        })
        .then(data => {
          //console.log("二级科室列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.smallAdminList = data.data.records;
                  self.smallAdminId = self.smallAdminList[0].id;
                  self.smallAdminName = self.smallAdminList[0].value;
                } else {
                  self.smallAdminList = [{ value: "暂无数据", id: "" }];
                  self.smallAdminId = "";
                }
              } else {
                self.smallAdminList = [{ value: "暂无数据", id: "" }];
                self.smallAdminId = "";
              }
            } else {
              self.smallAdminList = [{ value: "暂无数据", id: "" }];
              self.smallAdminId = "";
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
            self.smallAdminList = [{ value: "暂无数据", id: "" }];
            self.smallAdminId = "";
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常！"
          });
          self.smallAdminList = [{ value: "暂无数据", id: "" }];
          self.smallAdminId = "";
        });
    },
    //选择二级科室
    smallAdminChg() {
      var self = this;
      for (var i = 0; i < self.smallAdminList.length; i++) {
        if (self.smallAdminId == self.smallAdminList[i].id) {
          self.smallAdminName = self.smallAdminList[i].value;
        }
      }
      this.isborsmallAdmin = false;
    },
    //获取医生级别列表
    gainDoctorRankList() {
      var self = this;
      self
        .getDoctorRank({
          token: sessionStorage.getItem("token")
        })
        .then(data => {
          //console.log("医生级别列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.docRank = data.data;
                self.DoctorRank = self.docRank[0].key;
                self.DoctorRankName = this.docRank[0].value;
              } else {
                self.docRank = [{ value: "暂无数据", key: "" }];
                self.DoctorRank = "";
              }
            } else {
              self.docRank = [{ value: "暂无数据", key: "" }];
              self.DoctorRank = "";
            }
          } else {
            self.docRank = [{ value: "暂无数据", key: "" }];
            self.DoctorRank = "";
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常！"
          });
          self.docRank = [{ value: "暂无数据", key: "" }];
          self.DoctorRank = "";
        });
    },
    //选择医生级别
    rankChg() {
      var self = this;
      for (var i = 0; i < self.docRank.length; i++) {
        if (self.DoctorRank == self.docRank[i].key) {
          self.DoctorRankName = self.docRank[i].value;
        }
      }
      this.isborrank = false;
    },
    //回车确定添加标签
    show: function() {
      if (this.labelArr.length >= 4) {
        this.isborlabel = this.isfontlabel = true;
        this.labelName = "";
        return;
      } else {
        var JudgeOne = /^[\s]*$/; //输入不能为空
        var JudgeTwo = new RegExp(
          "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
        );
        if (JudgeOne.test(this.labelName) || JudgeTwo.test(this.labelName)) {
          this.isborlabel = this.isfontlabel = true;
        } else {
          this.isborlabel = this.isfontlabel = false;
          this.labelArr.push(this.labelName);
          this.labelName = "";
        }
      }
    },
    //删除已添加标签
    shanBq(index) {
      var self = this;
      for (var i = 0; i < self.labelArr.length; i++) {
        if (self.labelArr[i] == self.labelArr[index]) {
          self.labelArr.splice(i, 1);
          break;
        }
      }
      //console.log(this.labelArr.length);
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      self.ismainPicuter = true;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      //console.log(fileData);
      // 读取图片数据
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        // 加载图片的真实宽度和高度
        var image = new Image();
        image.onload = function() {
          if (fileData.size > 204800) {
            self.$message({
              type: "info",
              message: "您上次的图片格式或大小不正确，请重新上传！"
            });
            return;
          } else {
            // else if (image.width !== 96) {
            //     self.$message({
            //         type: 'info',
            //         message: '您上传图片的格式或大小不正确，请重新上传'
            //     })
            //     //console.log("2")
            //     document.getElementById('upfile').value = ''
            //     return
            // }
            // else if (image.height !== 96) {
            //     self.$message({
            //         type: 'info',
            //         message: '您上传图片的格式或大小不正确，请重新上传'
            //     })
            //     document.getElementById('upfile').value = ''
            //     return
            //     //console.log("3")
            // }
            self.uploadImage(files[0]);
          }
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);
    },
    // 上传图片
    uploadImage(file) {
      var formdata = new FormData();
      //console.log(file);
      formdata.append("file", file);
      formdata.append("appId", "BOTU");
      formdata.append("appName", "BOTU");
      formdata.append("module", "medical");
      formdata.append("business", "doctor");
      if (this.uploadimage == true) {
        this.uploadimage = false;
        this.gethosuploadFile(formdata)
          .then(data => {
            //console.log(data);
            this.uploadimage = true;
            if (data.code == 200) {
              this.isfontimg = false;
              if (this.ismainPicuter == true) {
                this.imgboxOne = false;
                this.imgboxTow = true;
                this.mainPicuter = data.data[0].path;
              } else {
                return;
              }
            } else {
              self.$message(data.message);
            }
          })
          .catch(msg => {
            this.uploadimage = true;
            //console.log(msg);
            // self.$message({
            //     type: 'info',
            //     message: '服务器异常！'
            // });
          });
      }
    },
    //验证
    verification() {
      var JudgeOne = /^[\s]*$/; //输入不能为空
      var JudgeThree = /^1[3|4|5|8|9|7][0-9]\d{8}$/; //输入手机号码
      var JudgeTwo = new RegExp(
        "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
      );
      if (
        JudgeOne.test(this.docName) ||
        JudgeOne.test(this.doctorPhoneModel) ||
        JudgeOne.test(this.doctorQualificationModel) ||
        JudgeTwo.test(this.docName) ||
        this.imgboxTow == false ||
        this.hospId == "" ||
        this.BigAdminId == "" ||
        this.smallAdminId == "" ||
        this.DoctorRank == "" ||
        this.labelArr.length == 0 ||
        JudgeOne.test(this.introduce) ||
        JudgeOne.test(this.territory) ||
        JudgeOne.test(this.backdrop) ||
        JudgeOne.test(this.achieve) ||
        JudgeOne.test(this.bailment) ||
        this.doctorQualificationModel.length != 15
      ) {
        return false;
      }
      if (!JudgeThree.test(this.doctorPhoneModel)) {
        return false;
      }
    },
    //确定新增医生
    addDoct() {
      if (this.verification() == false) {
        var JudgeOne = /^[\s]*$/; //输入不能为空
        var JudgeThree = /^1[3|4|5|8|9|7][0-9]\d{8}$/; //输入手机号码
        var JudgeTwo = new RegExp(
          "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
        );
        if (!JudgeThree.test(this.doctorPhoneModel)) {
          this.isborPhone = true;
        }
        if (
          this.doctorQualificationModel.length != 15 ||
          JudgeOne.test(this.doctorQualificationModel)
        ) {
          this.isborQualification = true;
        }
        if (JudgeOne.test(this.docName) || JudgeTwo.test(this.docName)) {
          this.isborname = this.isfontname = true;
        }
        if (this.imgboxTow == false) {
          this.isfontimg = true;
        }
        if (this.hospId == "") {
          this.isborhosp = true;
        }
        if (this.BigAdminId == "") {
          this.isborBigAdmin = true;
        }
        if (this.smallAdminId == "") {
          this.isborsmallAdmin = true;
        }
        if (this.DoctorRank == "") {
          this.isborrank = true;
        }
        if (this.labelArr.length == 0) {
          this.isborlabel = this.isfontlabel = true;
        }
        if (JudgeOne.test(this.introduce)) {
          this.isborintroduce = this.isfontintroduce = true;
        }
        if (JudgeOne.test(this.territory)) {
          this.isborterritory = this.isfontterritory = true;
        }
        if (JudgeOne.test(this.backdrop)) {
          this.isborbackdrop = this.isfontbackdrop = true;
        }
        if (JudgeOne.test(this.achieve)) {
          this.isborachieve = this.isfontachieve = true;
        }
        if (JudgeOne.test(this.bailment)) {
          this.isborbailment = this.isfopntbailment = true;
        }
      } else {
        var self = this;
        if (self.adddoct == true) {
          self.adddoct = false;
          self
            .getaddDoct({
              doctorQualificationNumber: self.doctorQualificationModel, //医生执业编号
              doctorPhoneNumber: self.doctorPhoneModel, //手机号
              hospitalId: self.hospId, //医院id
              hospitalName: self.hospName, //医院名字
              doctorName: self.docName, //医生名字
              levelId: self.DoctorRank, //医生级别id
              level: self.DoctorRankName, //医生级别
              label: self.labelArr.join(","), //标签
              itemImage: self.mainPicuter, //图片
              instruction: self.introduce, //医生介绍
              fieldInstruction: self.territory, //擅长领域
              medicalInstruction: self.backdrop, //医学背景
              academicInstruction: self.achieve, //学术研究成果
              doctorWrote: self.bailment, //医生寄语
              bigAdministrativeOffice: self.BigAdminId, //一级科室id
              smallAdministrativeOffice: self.smallAdminId, //二级科室id
              department: self.smallAdminName //二级科室名字
            })
            .then(data => {
              self.adddoct = true;
              //console.log("添加医生", data);
              if (data.code == 200) {
                self.intercept = true;
                self.$router.push({
                  path: "/medical/doctor"
                });
              } else if (data.code == 601) {
                self.$message({
                  message: "该手机已存在，不可重复使用！",
                  type: "info"
                });
                this.isborPhone = true;
              } else if (data.code == 999) {
                self.$message({
                  message: "该手机号已被列入黑名单！",
                  type: "info"
                });
                this.isborPhone = true;
              } else {
                self.$message({
                  message: data.message,
                  type: "info"
                });
              }
            })
            .catch(msg => {
              self.adddoct = true;
              //console.log(msg);
              self.$message({
                message: "服务器异常！",
                type: "info"
              });
            });
        }
      }
    },
    ...mapActions([
      "getaddDoct",
      "gethosuploadFile",
      "getselectBigDepartmentList",
      "getDoctorRank",
      "getselectSmallDepartmentList",
      "gethospitalmanageList"
    ])
  },
  // 监视
  watch: {
    //标签
    labelName: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborlabel = this.isfontlabel = false;
      }
    },
    //医生名字
    docName: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborname = this.isfontname = false;
      }
    },
    //医生介绍
    introduce: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborintroduce = this.isfontintroduce = false;
      }
    },
    //擅长领域
    territory: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborterritory = this.isfontterritory = false;
      }
    },
    //医学背景
    backdrop: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborbackdrop = this.isfontbackdrop = false;
      }
    },
    //学术研究成果
    achieve: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborachieve = this.isfontachieve = false;
      }
    },
    //医生寄语
    bailment: function(val) {
      this.changeval = val.length;
      if (this.changeval >= 0) {
        this.isborbailment = this.isfopntbailment = false;
      }
    },
    doctorPhoneModel: function(val) {
      this.isborPhone = false;
    },
    doctorQualificationModel: function(val) {
      this.isborQualification = false;
    }
  }
};
</script>
<style scoped>
.sale {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 150px;
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

.listTitle > div {
  float: left;
  display: flex;
  justify-content: space-between;
}

.listTitle > div > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.listTitle > div > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 10px;
}

.list {
  min-height: 540px;
  margin-top: 25px;
}

.list > div {
  width: 100%;
  overflow: hidden;
  display: flex;
  margin-bottom: 24px;
}

.list-label,
.list-label-spa {
  margin-bottom: 10px !important;
}

.list > div > div:nth-child(1) {
  width: 120px;
  text-align: right;
}

.list > div > div:nth-child(2) {
  margin-left: 24px;
}

.list-name > div {
  display: flex;
  height: 45px;
  align-items: center;
}

.list-name > div:nth-child(1) {
  width: 120px !important;
  height: 40px;
  padding-left: 50px;
  text-align: right !important;
}

.list-name > div:nth-child(2) {
  margin-left: 24px;
}

.list-name > div:nth-child(2) input {
  width: 150px;
  height: 32px;
  border-radius: 3px;
}

.list-txt > div:nth-child(1) {
  font-size: 14px;
  height: 100%;
  min-height: 60px;
  width: 80px;
  color: #303030;
  text-align: right;
}

.list-txt > div:nth-child(2) {
  margin-left: 15px;
  display: flex;
  align-items: center;
}

.list-mc > div {
  height: 32px;
  align-items: center;
}

.list-mcSmall {
  margin-left: 24px;
}

.list-mcSpan {
  padding-top: 6px;
}

.list-mc > div:nth-child(1) {
  width: 75px;
  text-align: right !important;
  line-height: 24px;
}

.list-mc > div:nth-child(2) {
  margin-left: 24px;
}

.list-mc > div:nth-child(2) div {
  float: left;
}

.but {
  max-width: 1000px;
  height: 80px;
  display: flex;
  max-width: 1000px;
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
  background-color: #5acdfa;
  margin-right: 25px;
}

.list .but > div:nth-child(2) {
  margin-left: 25px;
  width: 68px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #aeaeae;
  color: #fff;
  border-radius: 3px;
}

.list .but > div {
  cursor : pointer;
}

.list-img {
  margin: 25px 0;
  height: 50px;
  overflow: hidden;
}

.list-img > div:nth-child(1) {
  margin-top: 2px;
}

.list-img > div:nth-child(2) {
  margin-left: 25px;
  height: 50px;
}

.list-img > div:nth-child(2) > div {
  float: left;
}

.list-img > div:nth-child(2) > div:nth-child(1) {
  height: 50px !important;
}

.list-img > div:nth-child(2) > div:nth-child(1) div {
  width: 48px;
  height: 48px;
  border: 1px solid rgba(209, 209, 209, 0.5);
  border-radius: 100%;
  text-align: center;
  line-height: 46px;
  float: left;
  margin-top: 1px;
}

.list-img > div:nth-child(2) > div:nth-child(1) label {
  float: left;
  background: #f0622e;
  width: 80px;
  height: 30px;
  border-radius: 3px;
  color: white;
  text-align: center;
  line-height: 30px;
  margin: 10px 0 0 24px;
}

.list-img > div:nth-child(2) > div:nth-child(2) {
  color: #8f8e94;
  height: 50px;
  line-height: 50px;
}

.list-img img:nth-child(2) {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.list-label div:nth-child(1) {
  width: 75px;
  height: 34px;
  line-height: 34px;
  text-align: right;
}

.list-label div:nth-child(2) {
  margin-left: 24px;
}

.listLabelInp {
  width: 150px;
  height: 32px;
  font-size: 14px;
  border-radius: 3px;
  padding-left: 5px;
}

.list-label-spa {
  height: 35px;
  padding-left: 145px;
}

.list-label-spa span {
  height: 24px;
  color: #5acdfa;
  margin-right: 24px;
  margin-top: 10px;
  border-radius: 3px;
  border: 1px solid #5acdfa;
  display: inline-block;
  position: relative;
  padding: 0 5px;
}

.list-label-spa span img {
  border-radius: 14px;
  width: 14px;
  height: 14px;
  position: absolute;
  right: -7px;
  top: -7px;
}

.listTxtInp {
  width: 100% !important;
  height: 59px;
  border-radius: 3px;
  border: 1px solid #aeaeae;
  padding-left: 5px;
  resize: none;
  color: #8f8e94;
}

.doctorIntroduce {
  height: 160px !important;
}

.moneymag {
  width: 78px;
  text-align: right;
  margin-left: 24px;
  color: #8f8e94;
}

.moneymags {
  color: #8f8e94;
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

.list-hosp-select select {
  width: 445px;
  height: 32px;
  line-height: 32px;
  padding-left: 4px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 99% 12px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
}

.list-select select {
  width: 150px;
  height: 32px;
  line-height: 32px;
  padding-left: 25px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

input[type="text"] {
  padding-left: 5px;
  border: 1px solid #aeaeae;
  border-radius: 3px;
}

input[type="file"] {
  display: none;
}

.isAstrict {
  color: #8f8e94;
  margin-left: 24px;
}

.redfont {
  color: #fe5371 !important;
}

.redbor {
  border: 1px solid #fe5371 !important;
}

.cssFlex {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}

.cssFlex .listTxtInp {
  width: 100%;
  min-width: 400px;
  min-height: 85px;
  max-width: 800px;
  overflow-y: auto;
}

.cssFlex .isAstrict {
  margin-top: 8px;
}

.doctorNumber input {
  width: 150px;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
}

.doctorNumber span {
  color: #8F8E94;
  margin-left: 10px;
}
</style>