<!--医疗模块-圈子分类-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="circleType">
        <div>
            <div class="listTitle">
                <div>
                    圈子分类
                </div>
                <div @click="addClick">
                    新增分类
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div>
                        <select @change="selectTypesChange" v-model="assortmentType">
                            <option v-for="assortmentType in assortmentTypes"  v-bind:key="assortmentType.labelName">{{assortmentType.labelName}}</option>
                        </select>
                    </div>
                    <!-- <div class="searchBut" @click="searchClick">
                        确定
                    </div> -->
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listContent" v-loading="loading">
                    <ul>
                        <li class="firstLi">
                            <div title="序号">
                                序号
                            </div>
                            <div title="分类名称">
                                分类名称
                            </div>
                            <div title="圈子数量">
                                圈子数量
                            </div>
                            <div title="操作">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="dataList.length > 0" v-for="(item,index) in dataList" :key="index">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.assortmentName | strFun}}
                            </div>
                            <div>
                                {{item.circleNumber}}
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png">
                                </div>
                                <div>
                                    <img @click="deleteClick(index)" src="/static/img/删除.png">
                                </div>
                            </div>
                        </li>
                        <li class="noList" v-show="dataList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                      </ul>
                </div>
            </div>
        </div>
    <!-- 添加弹出框 -->
    <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
      <transition name="slide-fade">
        <div class="addContent" v-show="addShow" v-loading="adding">
          <div class="addData" v-show="operation == 0">
            <div>
              圈子类型
            </div> 
            <div>
              <el-checkbox label="普通圈" v-model="usualChecked"></el-checkbox>   
            </div>
            <div>
              <el-checkbox label="医生圈" v-model="doctorChecked"></el-checkbox>
            </div>  
          </div>
          <div class="addData">
            <div>
              <div>
                分类名称：
              </div> 
              <div>
                <input type="text" v-model="assortmentNameVal" :class="{redBorder:isRedAssortmentNameVal,grayBorder:isGrayAssortmentNameVal}" placeholder="请输入分类名称">
              </div>
            </div>
            <div :class="{redTest:isRedAssortmentNameVal,grayTest:isGrayAssortmentNameVal}">
                不能为空，支持汉字和字母，最多输入5个字符
            </div> 
          </div>
          <div class="addBut">
            <div class="but" v-show="operation == 0" @click="butAddClick">确定</div>
            <div class="but" v-show="operation == 1" @click="butUpdateClick">确定</div>
            <div @click="cancelClcik">取消</div>
          </div>
        </div>
      </transition>
    </div>
    <!--删除弹出框-->
    <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
      <transition name="slide-fade">
        <div class="deleteContent" v-show="delShow">
          <v-hosdel @ok="butdeleteClick" @canle="canleClick" :name="titlename"></v-hosdel>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import hosdel from "../../cModule/cancelBox";//引入组件
export default {
  components: {
    "v-hosdel": hosdel//注册组件
  },
  data() {
    return {
      butdeleteclick: true,
      editfun: true,//编辑圈子
      addallfun: true,//添加全部圈
      addusualfun: true,//添加普通圈
      adddoctorfun: true,//添加医生圈
      adding: false,//控制添加弹出框加载
      dataList: [],//圈子列表
      isAddPopup: true,//控制添加弹出框显示时的样式
      isShowAdd: true,//控制添加弹出框显示隐藏
      addShow: false,//控制添加弹出框显示
      pageSizeNum: 40,//每页显示的条数
      currentPage: 1,//当前页
      totalNum: 1,//总条数
      delIndex: "", //删除index
      loading: false,//页面加载
      titlename: "", //删除弹框提示语
      isdelPopup: true,//控制删除弹出框显示样式
      isShowdel: true,//控制删除弹出框显示隐藏
      delShow: false,//控制删除弹出框显示
      assortmentType: "全部", //圈子类型Model
      assortmentTypes: [
        {
          labelName: "全部"
        },
        {
          labelName: "普通圈"
        },
        {
          labelName: "医生圈"
        }
      ],//圈子类型列表
      operation: '',//控制添加和修改的确定按钮
      assortmentNameVal:'XYZ',//分类名称
      isRedAssortmentNameVal: false,//添加分类时分类名称不符合规定时提示
      isGrayAssortmentNameVal: true,//添加分类时分类名称符合规定时提示
      usualChecked: false,//普通圈Model
      doctorChecked: false,//医生圈Model

      typeId: '',//分类id

    };
  },
  // 过滤
  filters: {
    //分类名称过滤
    strFun: function (val) {
      if (val) {
        return val
      } else {
        return '无'
      }
    }
  },
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
      if (arrs.indexOf("circleType") == -1) {
        var warningStr = "您暂时没有权限访问这个页面";
        self.$alert(warningStr, "提示", {
          confirmButtonText: "确定",
          type: "info"
        }).then(() => {
          self.$router.push({
            path: "/login"
          });
        }).catch(() => {
          self.$router.push({
            path: "/login"
          });
        });
      } else {
        self.getAllCircleTypeListFun()
      }
    } else {
      var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
      this.$alert(warningStr, "提示", {
        confirmButtonText: "确定",
        type: "info"
      }).then(() => {
        this.$router.push({
          path: "/login"
        });
      }).catch(() => {
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
    //查询全部圈子分类列表
    getAllCircleTypeListFun() {
      var self = this;
      self.loading = true;
      self.getMedicalcircleAssortmentselect({
        assortmentType:'all'
      }).then(data => {
        self.loading = false
        if (data.code == 200) {
          if (data.data) {
            self.dataList = data.data
          }
        } else {
          self.$message({
          type: "info",
          message: data.message
        });
        }
      }).catch(msg => {
        self.$message({
          type: "info",
          message: "服务器异常"
        });
        self.loading = false;
      })
    },
    //查询普通圈列表
    getUsualCircleTypeListFun() {
      var self = this;
      self.loading = true;
      self.getMedicalcircleAssortmentselect({
        assortmentType: 'usual'
      }).then(data => {
        self.loading = false;
        if (data.code == 200) {
          if (data.data) {
            self.dataList = data.data
          } else {
            self.dataList = [];
          }
        } else {
          self.$message({
            type: 'info',
            message: '服务器异常'
          })
        }
      }).catch(msg => {
        self.$message({
          type: 'info',
          message: '服务器异常'
        })
      })
    },
    //查询医生圈列表
    getDoctorCircleTypeListFun() {
      var self = this;
      self.loading = true;
      self.getMedicalcircleAssortmentselect({
        assortmentType: 'doctor'
      }).then(data => {
        self.loading = false;
        if (data.code == 200) {
          if (data.data) {
            self.dataList = data.data
            self.typeId = data.data.id
          } else {
            self.dataList = [];
          }
        } else {

        }
      }).catch(msg => {
        self.$message({
          type: 'info',
          message: '服务器异常'
        })
      })
    },
    //圈子筛选
    selectTypesChange() {
      if(this.assortmentType=="全部"){
        this.getAllCircleTypeListFun()
      } else if (this.assortmentType=="普通圈") {
        this.getUsualCircleTypeListFun()
      } else {
        this.getDoctorCircleTypeListFun()
      }
    },
    //获取圈子列表
    getCircleListFun() {
      this.selectTypesChange() 
    },
    // 搜索点击
    searchClick() {},
    // 编辑/修改圈子
    updateClick(index) {
      this.assortmentNameVal = this.dataList[index].assortmentName
      this.isShowAdd = false;
      this.addShow = true;
      this.typeId = this.dataList[index].id
      if (this.dataList[index].assortmentType == 'all') {
        this.usualChecked = true
        this.doctorChecked = true
      }
      if (this.dataList[index].assortmentType == 'usual') {
        this.usualChecked = true
        this.doctorChecked = false
      }
      if (this.dataList[index].assortmentType == 'doctor') {
        this.doctorChecked = true
        this.usualChecked = false
      }
      this.operation = 1
    },
    // 确认删除框
    butdeleteClick() {
      var self = this;
      this.isShowdel = true;
      if (self.butdeleteclick == true) {
          self.butdeleteclick = false
          self.getMedicalcircleAssortmentdelete({
            id: this.typeId,
          }).then(data => {
            self.butdeleteclick = true
            if (data.code == 200) {
              self.$message({
                type: 'success',
                message: "删除成功"
              })
              self.getCircleListFun()
            } else {
              self.$message({
                type: 'info',
                message: data.message
              })
            }
          }).catch(msg => {
            self.butdeleteclick = true
            self.$message({
              type: 'info',
              message: "服务器异常"
            })
          })
      }
      
    },
    // 取消删除框
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    // 删除圈子
    deleteClick(index) {
      this.titlename = "确定要删除？";
      this.isShowdel = false;
      this.delShow = true;
      this.typeId = this.dataList[index].id
    },
    // 添加分类
    addClick() {
      this.isRedAssortmentNameVal = false;
      this.assortmentNameVal = '';
      this.isShowAdd = false;
      this.addShow = true;
      this.operation = 0 ;
      this.usualChecked = false;
      this.doctorChecked = false;
    },
    //取消
    cancelClcik() {
      this.isShowAdd = true;
      this.addShow = false;
    },
    //正则验证
    validateFun() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`！。，.,!-%?？《》：:+~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
     
        if (reg_1.test(this.assortmentNameVal) || reg_2.test(this.assortmentNameVal)) {
          this.isRedAssortmentNameVal = true
          this.isGrayAssortmentNameVal = false
        } 
        if (this.isRedAssortmentNameVal == true) {
          return false
        }

    },
    //添加全部圈
    addAllFun() {
      var self = this;
      self.adding = true;
      if (self.addallfun == true) {
        self.addallfun = false
        self.getMedicalcircleAssortmentadd({
          assortmentName: self.assortmentNameVal,
          assortmentType: 'all'
        }).then(data => {
          self.adding = false;
          self.addallfun = true
          if (data.code == 200) {
            self.$message ({
              type: 'success',
              message: '添加全部圈成功！'
            })
            self.getCircleListFun()
          } else {
            self.$message ({
              type: 'info',
              message: data.message
            })
          }
        }).catch(msg => {
          self.addallfun = true
          self.$message ({
            type: 'info',
            message: '服务器异常'
          })
        })
      }
      
    },
    //添加普通圈
    addUsualFun() {
      var self = this;
      self.adding = true;
      if (self.addusualfun == true) {
        self.addusualfun = false
        self.getMedicalcircleAssortmentadd({
          assortmentName: self.assortmentNameVal,
          assortmentType: 'usual'
        }).then(data => {
          self.adding = false;
          self.addusualfun = true
          if (data.code == 200) {
            self.$message ({
              type: 'success',
              message: '添加普通圈成功！'
            })
            self.getCircleListFun()
          } else {
            self.$message ({
              type: 'info',
              message: data.message
            })
          }
        }).catch(msg => {
          self.addusualfun = true
          self.$message ({
            type: 'info',
            message: '服务器异常'
          })
        })
      }
      
    },
    //添加医生圈
    addDoctorFun() {
      var self = this;
      self.adding = true;
      if (self.adddoctorfun == true) {
          self.adddoctorfun = false
          self.getMedicalcircleAssortmentadd({
            assortmentName: self.assortmentNameVal,
            assortmentType: 'doctor'
          }).then(data => {
            self.adddoctorfun = true
            self.adding = false;
            if (data.code == 200) {
              self.$message ({
                type: 'success',
                message: '添加医生圈成功！'
              })
              self.getCircleListFun()
            } else {
              self.$message ({
                type: 'info',
                message: data.message
              })
            }
          }).catch(msg => {
            self.adddoctorfun = true
            self.$message ({
              type: 'info',
              message: '服务器异常'
            })
          })
      }
      
    },
    //确认添加
    butAddClick() {
      var self= this
      if (self.validateFun() == false) {
        return;
      } else {
        if (self.usualChecked == true && self.doctorChecked == true) {
          self.addAllFun()
        } else {
           if (self.usualChecked == true) {
            self. addUsualFun()
          }
          if (self.doctorChecked == true) {
            self.addDoctorFun()
          } 
        }
       
        self.isShowAdd = true;
        self.addShow = false;
      }
    },
    //修改圈子
    editFun() {
      var self = this;
      if (self.editfun == true) {
        self.editfun = false
        self.getMedicalcircleAssortmentupdate({
          id: this.typeId,
          assortmentName: self.assortmentNameVal,
        }).then(data => {
          self.editfun = true
          if (data.code == 200) {
            self.$message ({
              type:'success',
              message: '修改成功!'
            })
          } else {
            self.$message ({
              type: 'info',
              message: data.message
            })
          }
        }).catch (msg => {
          self.editfun = true
          self.$message ({
            type: 'info',
            message: '服务器异常'
          })
        })
      }
      
    },
    //确认修改圈子分类
    butUpdateClick() {
      var self= this
      if (self.validateFun() == false) {
        return;
      } else {
        self.editFun();
        self.isShowAdd = true;
        self.addShow = false;
      }
    },
    ...mapActions(["getMedicalcircleAssortmentselect", "getMedicalcircleAssortmentadd","getMedicalcircleAssortmentupdate","getMedicalcircleAssortmentdelete"])
  },
  // 监视
  watch: {
    //监视分类名称
    assortmentNameVal: function(val) {
      var trimstr = val
      if (trimstr.length > 5) {
        this.isRedAssortmentNameVal = true;
        this.isGrayAssortmentNameVal = false;
      } else {
        this.isRedAssortmentNameVal = false;
        this.isGrayAssortmentNameVal = true;
      }  
    }
  }
};
</script>
<style scoped>

/*删除弹出框*/

.deleteContent {
  width: 525px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 10px #eaeaea;
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

/* 添加弹出框 */

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

.showAdd {
  display: none;
}

.addData:nth-child(1) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.addData > div:nth-child(1){
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.addData:nth-child(2) > div:nth-child(2){
  margin-left: 120px;
  
}

.redTest {
  color: #fe5371 !important;
}

.grayTest {
  color: #908f95 !important;
}

.redBorder {
  border: 1px solid #fe5371 !important;
}

.grayBorder {
  border: 1px solid #d1d1d1 !important;
}

.addData > div {
  margin: 25px;
  margin-left: 50px;
}

.addBut {
  display: flex;
  margin: 20px auto;
}
.addBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
  margin-left: 30%; 
}

.addBut > .but {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.addBut > div:nth-child(3) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addContent input {
  width: 270px;
  height: 32px;
  border-radius: 4px;
  color: #303030;
  text-align: center;
  margin-left: 20px;
}

.addContent {
  width: 450px;
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
  padding-top: 20px;
}

.listContent .noList {
  height: 400px;
}

.listContent .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.circleType {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.circleType > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}


.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.firstLi {
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  font-weight: bold;
  font-size: 16px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #f2f4f8;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #f2f4f8;
}

.dataLi .operate {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataLi .operate > div {
  width: 25px;
  height: 25px;
}

.dataLi .operate > div:nth-child(1) {
  margin-right: 10px;
}

.dataLi .operate > div:nth-child(2) {
  margin-left: 10px;
}

.operate img {
  width: 100%;
  cursor: pointer;
  height: 100%;
}

.listContent .firstLi > div:nth-child(2) {
  width: 25%;
}

.listContent ul {
  border-top: 1px solid #ececec;
}

.listContent li {
  display: flex;
  height: 50px;
}

.listContent .firstLi > div,
.listContent .dataLi > div {
  text-align: center;
  line-height: 49px;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.listContent li > div:nth-child(1) {
  width: 25%;
}

.listContent .dataLi > div:nth-child(2) {
  width: 25%;
}

.listContent li > div:nth-child(3) {
  width: 25%;
}

.listContent li > div:nth-child(4) {
  width: 25%;
}
.listContent li > div:nth-child(4) div {
  line-height: 25px;
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
  color: #5acdfa;
  cursor: pointer;
  border: 1px solid #5acdfa;
}

/* 搜索 */

.menu {
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menuLeft {
  display: flex;
}

select {
  width: 120px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #97A8BE;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
  font-size: 14px;
  border: 1px solid #d1d1d1;
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

.menuLeft > div {
  height: 100%;
  display: flex;
  align-items: center;
}

/* .searchBut {
  margin-left: 15px;
  width: 70px;
  height: 32px;
  background-color: #5acdfa;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
} */

.firstLi > div {
  overflow: hidden;
  padding: 0 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
