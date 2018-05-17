<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" class="check">
    <div>
      <!-- 详情头部 -->
      <div class="checkTop">
        <div>
          <div @click="returnClick">
            <img src="/static/img/返回蓝.jpg" alt="">
          </div>
          <div>
            {{doctorname}}审核详情
          </div>
        </div>
      </div>
      <!-- 审核列表展示 -->
      <div class="checkList">
        <ul>
          <li>
            <div>
              姓名：
            </div>
            <div>
              {{doctorname}}
            </div>
          </li>
          <li>
            <div>
              所属医院：
            </div>
            <div>
              {{hospitalName}}
            </div>
          </li>
          <li>
            <div>
              科室：
            </div>
            <div>
              {{department}}
            </div>
          </li>
          <li>
            <div>
              级别：
            </div>
            <div>
              {{doctorLevel}}
            </div>
          </li>
          <li>
            <div>
              状态：
            </div>
            <div>
              {{doctorState|StateFun}}
            </div>
          </li>
          <li>
            <div>
              擅长领域介绍：
            </div>
            <div>
              {{fieldInstruction}}
            </div>
          </li>
          <li v-show="state != '3'">
            <div>
              医生职业证书：
            </div>
            <div>
              <img :src="certificateImg" @click="certificateClick" alt="暂无图片">
            </div>
          </li>
          <li v-show="state != '3'">
            <div>
              职称证书或工牌：
            </div>
            <div>
              <img :src="workCardImg" @click="workCarClick" alt="暂无图片">
            </div>
          </li>
        </ul>
      </div>
      <div class="but" v-show="state == 0">
        <div @click="passClick">通过</div>
        <div @click="repulseClick">拒绝</div>
      </div>
    </div>
    <!-- 拒绝弹出框 -->
    <div :class="{repulsePopup:isRepulse,repulseShow:isRepulseShow}">
      <div class="repulseContent">
        <div class="repulseimg">
          拒绝原因列表
        </div>
        <div class="repulseText">
          <ul>
            <li v-for="(item,index) in causeLists" :key="index" class="causeLi">
              <div v-if="item.show == false" class="causeLiselectImg" @click="causeSelectImg(index)">
                <img src="/static/img/show.png" alt="">
              </div>
              <div v-else class="causeLiSelect" @click="causeSelectImg(index)">
              </div>
              <div>
                <span>{{item.value}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="repulseBut">
          <div @click="okClick">确定</div>
          <div @click="celClick">取消</div>
        </div>
      </div>
    </div>
    <!-- 图片弹出框 -->
    <div class="imgPopupBoxFa" :class="{imgBoxShow:isImgBox}">
      <div class="imgPopupBox">
        <img id="imgZoom" :src="imgBox" @wheel.prevent="scrollBarWheel">
      </div>
      <div class="offImgBox" @click="offImgBoxClick">
        <img src="/static/img/添加.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      repulseclick: true,
      okclick: true,
      passclick: true,
      checkLists: [], // 选中不符合条件
      doctorname: "",
      hospitalName: "",
      department: "",
      doctorLevel: "",
      doctorState: "",
      fieldInstruction: "",
      certificateImg: "",
      workCardImg: "",
      imgBox: "",
      isRepulse: true,
      isRepulseShow: true,
      isImgBox: true,
      value1: "",
      causeLists: [],//拒绝原因列表
      state: '',
      title: '审核详情'
    };
  },
  // 过滤
  filters: {
    StateFun: function(val) {
      if (val == 0) {
        return "未审核";
      }
      if (val == 1) {
        return "审核通过";
      }
      if (val == 2) {
        return "未通过";
      }
      if (val == 3) {
        return "无需审核";
      }
    }
  },
  // 模块新建时
  created: function() {
    this.dcheckData = JSON.parse(sessionStorage.chdata);
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
      if (arrs.indexOf("doctor") == -1) {
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
        self.state = sessionStorage.getItem("doctorState")
        if (self.state == 0) {
          self.title = "审核详情"
        } else {
          self.title = "医生详情"
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
    listFun() {
      var self = this;
      self
        .getselectDoctorById({
          doctorId: self.dcheckData.id
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              self.doctorname = data.data.doctorName;
              self.hospitalName = data.data.hospitalName;
              self.department = data.data.department;
              self.doctorLevel = data.data.doctorLevel;
              self.doctorState = data.data.doctorState;
              self.fieldInstruction = data.data.fieldInstruction;
              self.certificateImg = data.data.doctorPracticeCertificate;
              self.workCardImg = data.data.titleCertificate;
            } else {
              self.doctorname = "暂无数据！";
              self.hospitalName = "暂无数据！";
              self.department = "暂无数据！";
              self.doctorLevel = "暂无数据！";
              self.doctorState = "暂无数据！";
              self.fieldInstruction = "暂无数据！";
              self.certificateImg = "";
              self.workCardImg = "";
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
            message: "服务器异常"
          });
        });
      self
        .getMedicalDoctormedicalDictionarygetReasonsForRefusalDoctor({})
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  // self.causeLists.push({
                  //   key: ele.key,
                  //   value: ele.value,
                  //   show: true
                  // });
                });
              } else {
              }
            } else {
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //返回按钮
    returnClick() {
      this.$router.push({
        path: "/medical/doctor"
      });
      sessionStorage.removeItem("doctorState")
    },
    //医生职业证书点击
    certificateClick() {
      this.imgBox = this.certificateImg;
      this.isImgBox = false;
    },
    //职称证书或工牌
    workCarClick() {
      this.imgBox = this.workCardImg;
      this.isImgBox = false;
    },
    //关闭证书弹框
    offImgBoxClick() {
      this.imgBox = "";
      this.isImgBox = true;
    },
    //滚轮事件缩放图片
    scrollBarWheel(e) {
      var imgs = document.getElementById("imgZoom");
      var e = window.event || e; // 兼容处理
      var delta = e.deltaY; //鼠标滚动后事件中的值
      if (delta > 0) {
        //鼠标向下滚动
        if (imgs.offsetHeight <= 200) {
          imgs.style.height == 200 + "px";
        }
        if (imgs.offsetWidth <= 500) {
          imgs.style.width == 500 + "px";
        } else {
          imgs.style.width = imgs.offsetWidth - 50 + "px";
        }
      } else {
        //鼠标向上滚动
        if (imgs.offsetHeight >= 750) {
          imgs.style.height == 750 + "px";
        }
        if (imgs.offsetWidth >= 1100) {
          imgs.style.width == 1100 + "px";
        } else {
          imgs.style.width = imgs.offsetWidth + 50 + "px";
        }
      }
      return false;
    },
    //通过
    passClick() {
      var self = this;
      this.checkNumber = 1;
      if (self.passclick == true) {
          self.passclick = false
          self.getMedicalDoctorCheck({
          doctorId: self.dcheckData.id,
          doctorState: self.checkNumber,
      }).then(data => {
          self.passclick = true
          if (data.code == 200) {
            self.$router.push({
              path: "/medical/doctor"
            });
          } else {
            this.$message({
              type: "info",
              message: data.message
            });
          }
      }).catch(msg => {
          self.passclick = true
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常！"
          });
        });
      }
      
    },
    //拒绝
    repulseClick() {
      var self = this;
      self.causeLists = [];
      if (self.repulseclick == true) {
        self.repulseclick = false
        self.getMedicalDoctormedicalDictionarygetReasonsForRefusalDoctor({
        }).then(data => {
          self.repulseclick = true
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                data.data.forEach(function(ele,ind){
                  self.causeLists.push({
                    key: ele.key,
                    value: ele.value,
                    show: true
                  })
                })
                this.isRepulseShow = false;
              }
            }
          } else {
            self.$message({
              type: 'info',
              message: data.message
            })
          }
        }).catch(msg => {
          self.repulseclick = true
          self.$message({
            type: 'info',
            message: '服务器异常'
          })
        })
      }
      
    },
    //确定拒绝
    okClick() {
      var self = this;
      this.checkNumber = 2;
      var reasonIds = [];
      this.causeLists.forEach(function(ele, ind) {
        if (ele.show == false) {
          reasonIds.push(ele.key);
        }
      });
      if (reasonIds.length > 0) {
        this.isRepulseShow = true;
        if (self.okclick == true) {
            self.okclick = false
            self.getMedicalDoctorCheck({
              doctorId: self.dcheckData.id,
              doctorState: self.checkNumber,
              reasonIdJson: JSON.stringify(reasonIds)
            })
            .then(data => {
              self.okclick = true
              if (data.code == 200) {
                self.$router.push({
                  path: "/medical/doctor"
                });
              } else {
                this.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.okclick = true
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常！"
              });
            });
        }
        
      } else {
        this.$message({
          type: "info",
          message: "请选择拒绝原因"
        });
      }
    },
    //取消拒绝
    celClick() {
      this.isRepulseShow = true;
    },
    // 所有选项被选中时
    causeSelectImg(index) {
      this.causeLists[index].show = !this.causeLists[index].show;
    },
    ...mapActions([
      "getselectDoctorById",
      "getMedicalDoctorCheck",
      "getMedicalDoctormedicalDictionarygetReasonsForRefusalDoctor",
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.check {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 150px;
  position: relative;
}

.check > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.checkTop {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkTop > div {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.checkTop > div > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.checkTop > div > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
}

.checkTop > div > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  margin-left: 10px;
}

.checkList {
  margin-top: 24px;
  width: 100%;
}

.checkList li {
  overflow: hidden;
  margin-bottom: 24px;
}

.checkList li div {
  float: left;
}

.checkList li div:nth-child(1) {
  width: 20%;
  max-width: 200px;
  text-align: right;
  margin-right: 16px;
}

.checkList li div:nth-child(2) {
  max-width: 360px;
  text-align: left;
}

.checkList li div img {
  width: 320px;
  height: 168px;
  cursor: pointer;
}

.but {
  height: 80px;
  display: flex;
  margin-left: 290px;
  margin-bottom: 100px;
}

.but > div {
  cursor: pointer;
}

.but > div:nth-child(1) {
  width: 68px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #5acdfa;
  margin-right: 25px;
}

.but > div:nth-child(2) {
  margin-left: 25px;
  width: 68px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #aeaeae;
  color: #fff;
  border-radius: 3px;
}

/*拒绝弹出框*/

.repulsePopup {
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

.repulseShow {
  display: none;
}

.repulseContent {
  width: 560px;
  height: 520px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 10px #eaeaea;
  border-radius: 7px;
  z-index: 100000;
}

/*图片弹出框*/

.imgPopupBoxFa {
  position: fixed;
  left: 10px;
  top: 70px;
  width: 100%;
  height: 800px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000000;
  border-radius: 7px;
}

.imgBoxShow {
  display: none;
}

.imgPopupBox {
  width: 100%;
  text-align: center;
  line-height: 800px;
  z-index: 100000;
}

.offImgBox {
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  overflow: hidden;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  /* IE 9 */
  -moz-transform: rotate(45deg);
  /* Firefox */
  -webkit-transform: rotate(45deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(45deg);
  /* Opera */
}

#imgZoom {
  max-width: 1100px;
  max-height: 750px;
}

/***************拒绝******************************/

.repulseimg {
  height: 46px;
  width: 100%;
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  color: #303030;
  margin-top: 10px;
  margin-bottom: 10px;
}

.repulseText {
  height: 365px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  width: 100%;
}

.repulseText > ul {
  width: 87%;
}

.causeLi {
  border: 1px solid #ccc;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.causeLi > div:nth-child(1) {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
}

.causeLiselectImg {
  cursor: pointer;
}

.causeLiSelect {
  cursor: pointer;
  border: 1px solid #ccc;
}

.causeLi > div:nth-child(1) img {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.causeLi > div:nth-child(2) {
  height: 100%;
  line-height: 35px;
  margin-left: 10px;
}

.repulseBut {
  margin: 0 auto;
  margin-top: 20px;
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.repulseBut div {
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.repulseBut div:nth-child(1) {
  background: #5acdfa;
}

.repulseBut div:nth-child(2) {
  background: #aeaeae;
}
</style>