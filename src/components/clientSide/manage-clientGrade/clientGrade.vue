<!--资料审核-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="circle">
        <div>
            <div class="listTitle">
                <div>
                    资料审核
                </div>
                <div>
                </div>
            </div>
            <!-- 筛选 -->    
            <div class="filtrate">
                <div class="selectOne">
                    <select v-model="auditModel" @change="auditChange">
                        <option v-for="(state,index) in auditState" v-bind:value="state.key" :key='state.value'>{{state.value}}</option>
                    </select>
                </div>
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="">
                    <input type="text" placeholder="输入昵称和账号" v-model="personOrCircleModel">
                </div>
                <!-- 日期 -->
                <div class="selectTime">
                    <div>
                        <el-date-picker @change="beginTime" v-model="timeFirst" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        至
                    </div>
                    <div>
                        <el-date-picker @change="overtime" v-model="timeSecond" type="date" placeholder="请选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="filtrateOk interval" @click="filterClick">
                    确定
                </div>
                <div class="filtrateOk interval delfiltrateOk" @click="removeClick">
                    清除
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listContent">
                    <ul>
                        <li class="listContentTop">
                            <div title="序号">
                              序号
                            </div>
                            <div title="昵称">
                               昵称
                            </div>
                            <div title="账号">
                                账号
                            </div>
                            <div title="创建时间">
                                创建时间
                            </div>
                            <div title="更新时间">
                                更新时间
                            </div>
                            <div title="状态">
                                状态
                            </div>
                            <div title="认证症状">
                                认证状态
                            </div>
                            <div title="申请认证时间">
                                申请认证时间
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <div class="noList" v-show="dataList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </div>
                        <li class="dataLi" v-for="(item,index) in dataList" :key='item.name'>
                            <div>
                               {{index+1}}
                            </div>
                            <div>
                                {{item.nickName}}
                            </div>
                            <div>
                                {{item.userAccount}}
                            </div>
                            <div>
                                {{item.createTime | timeFun}}
                            </div>
                            <div>
                                {{item.updateTime | timeFun}}
                            </div>
                            <div>
                                {{item.userState}}
                            </div>
                            <div>
                                {{item.approveState}}
                            </div>
                            <div>
                               {{item.applyApproveTime | timeFun}}                               
                            </div>
                            <div class="operation">
                                <div>
                                    <img v-if="item.approveState == '等待审核'" src="/static/img/审核.png" @click="operationClick(index)" alt="审核" title="审核">
                                    <img v-else src="/static/img/审核灰.png" @click="operationNoClick" alt="已审核" title="已审核">
                                </div>
                                <div>
                                    <img src="/static/img/编辑.png" @click="updateClick(index)" alt="删除" title="删除">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 分页 -->
                    <div class="lastLidel" v-show="dataList.length > 0">
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
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
      getCircle: true,
      okdelclick: true,
      openorcloseclick: true,
      personorcirclechgclick: true,
      timeFirst: "",
      timeSecond: "",
      loading: false,
      dataList: [
        {
          nickName: '萝卜丝儿',
          userAccount: '2579741078',
          createTime: Date.parse(new Date()),
          updateTime: Date.parse(new Date()),
          userState: '正常',
          approveState: '已认证',
          applyApproveTime: '2017-12-31 09:00',
        },
        {
          nickName: '土豆丝儿',
          userAccount: '1219520341',
          createTime: Date.parse(new Date()),
          updateTime: Date.parse(new Date()),
          userState: '正常',
          approveState: '等待审核',
          applyApproveTime: '2017-12-31 09:00',
        },
        {
          nickName: '青椒丝儿',
          userAccount: '15229061301',
          createTime: Date.parse(new Date()),
          updateTime: Date.parse(new Date()),
          userState: '正常',
          approveState: '审核未通过',
          applyApproveTime: '2017-12-31 09:00',
        },
      ],
      auditState: [
        { value: "按审核状态", key: "QXZSH" },
        { value: "已认证", key: "0" },
        { value: "等待审核", key: "1" },
        { value: "审核通过", key: "2" }
      ], //下拉框
      checked: false, //选取全部序号
      checkList: [], //序号选取
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 1,
      isShowdel: true,
      titlename: "",
      timeOne: "",
      timeTwo: "",
      timeNumOne: "",
      timeNumTwo: "",
      auditModel: "QXZSH", //下拉选择审核状态
      auditModels: "", //上传的审核状态
      personOrCircleModel: "", //输入框人或者圈子
      personOrCircleChgShow: false, //判断是否筛选
      idstring: "", //id多选
      iscurrentPage: "", //删除后应该为的页码
      idstring: "", //删除id 集合
      ifGetList: true,
      dataTrue: false,
      userId:'',//圈主Id
      circleUser:[],//圈主资料列表
      circleId:''//圈子Id
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    timeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var date = now.getDate();
      date = date > 9 ? date : "0" + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0" + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0" + minute;
      return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
    },
    lFun: function(val) {
      if (val) {
        return val;
      } else {
        return "暂无数据";
      }
    },
    sFun: function(val) {
      if (val) {
        switch (val) {
          case "0":
            return "未审核";
            break;
          case "1":
            return "审核通过";
            break;
          case "2":
            return "审核未通过";
            break;
          default:
            break;
        }
      } else {
        return "暂无信息";
      }
    }
  },
  // 模块新建时
  created: function () {
            var self = this
            // 权限限制
            var roleIdStr = sessionStorage.getItem('roleId')
            var TOKEN = sessionStorage.getItem('token')
            var userRoleOBj = sessionStorage.getItem('userRole')
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj)
                var arrs = []
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "前台管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path)
                        })
                    }
                })
                if (arrs.indexOf("clientSideAccount") == -1) {
                    var warningStr = "您暂时没有权限访问这个页面"
                    self.$alert(warningStr, '提示', {
                        confirmButtonText: '确定',
                        type: 'info'
                    }).then(() => {
                        self.$router.push({
                            path: '/login'
                        })
                    }).catch(() => {
                        self.$router.push({
                            path: '/login'
                        })
                    });
                } else {
                   
                }
            } else {
                var warningStr = "没有登录不允许访问,点击确定跳转登录页面"
                this.$alert(warningStr, '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                }).then(() => {
                    this.$router.push({
                        path: '/login'
                    })
                }).catch(() => {
                    this.$router.push({
                        path: '/login'
                    })
                });
            }
        },
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    // 资料列表
    getDataListFun() {
      
    },
    //分页
    handleSizeChange(val) {
      this.pageSizeNum = val;
      this.getDataListFun();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataListFun();
    },
    //根据审核状态筛选资料列表
    auditChange() {
      if (this.auditModel == "QXZSH") {
        this.auditModels = "";
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getDataListFun()
      } else {
        this.auditModels = this.auditModel;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getDataListFun()
      }
    },
    // 模糊所搜
    filterClick() {
      var self = this;
     
    },
    // 清除
    removeClick() {
      this.auditModels = "";
      this.timeNumOne = "";
      this.timeFirst = "";
      this.timeOne = "";
      this.timeNumTwo = "";
      this.timeSecond = "";
      this.timeTwo = "";
      this.personOrCircleModel = "";
      this.pageSizeNum = 10;
      this.currentPage = 1;
      this.auditModel = "QXZSH"
      this.getDataListFun()
    },
    // 开始时间
    beginTime() {
      this.timeNumOne = Date.parse(this.timeFirst);
      if (this.timeNumOne) {
        if (this.timeNumTwo) {
          if (this.timeNumTwo - this.timeNumOne >= 0) {
            var t = this.timeFirst;
            var y, m, d, mm, dd;
            y = t.getFullYear();
            mm = t.getMonth() + 1;
            dd = t.getDate();
            if (mm > 9) {
              m = mm;
            } else {
              m = "0" + mm;
            }
            if (dd > 9) {
              d = dd;
            } else {
              d = "0" + dd;
            }
            this.timeOne = y + "-" + m + "-" + d;
            //发送请求
            this.currentPage = 1;
            this.getcircle();
          } else {
            this.$message({
              type: "info",
              message: "开始时间必须大于结束时间！"
            });
            this.timeOne = this.timeFirst = this.timeNumOne = "";
          }
        } else {
          var t = this.timeFirst;
          var y, m, d, mm, dd;
          y = t.getFullYear();
          mm = t.getMonth() + 1;
          dd = t.getDate();
          if (mm > 9) {
            m = mm;
          } else {
            m = "0" + mm;
          }
          if (dd > 9) {
            d = dd;
          } else {
            d = "0" + dd;
          }
          this.timeOne = y + "-" + m + "-" + d;
          this.currentPage = 1;
          this.getcircle();
        }
      } else {
        this.timeNumOne = "";
        this.timeFirst = "";
        this.timeOne = "";
        this.currentPage = 1;
        this.getcircle();
      }
    },
    //结束时间
    overtime() {
      this.timeNumTwo = Date.parse(this.timeSecond);
      if (this.timeNumTwo) {
        if (this.timeNumOne) {
          if (this.timeNumTwo - this.timeNumOne >= 0) {
            var t = this.timeSecond;
            var y, m, d, mm, dd;
            y = t.getFullYear();
            mm = t.getMonth() + 1;
            dd = t.getDate();
            if (mm > 9) {
              m = mm;
            } else {
              m = "0" + mm;
            }
            if (dd > 9) {
              d = dd;
            } else {
              d = "0" + dd;
            }
            this.timeTwo = y + "-" + m + "-" + d;
            //发送请求
            this.currentPage = 1;
            this.getcircle();
          } else {
            this.timeTwo = "";
            this.timeSecond = "";
            this.timeNumTwo = "";
            this.$message({
              type: "info",
              message: "结束时间不得小于开始时间！"
            });
          }
        } else {
          var t = this.timeNumTwo;
          var y, m, d, mm, dd;
          y = t.getFullYear();
          mm = t.getMonth() + 1;
          dd = t.getDate();
          if (mm > 9) {
            m = mm;
          } else {
            m = "0" + mm;
          }
          if (dd > 9) {
            d = dd;
          } else {
            d = "0" + dd;
          }
          this.timeTwo = y + "-" + m + "-" + d;
          this.currentPage = 1;
          this.getcircle();
        }
      } else {
        this.timeNumTwo = "";
        this.timeSecond = "";
        this.timeTwo = "";
        this.currentPage = 1;
        this.getcircle();
        // this.$message({
        //   type: 'info',
        //   message: '请先选择开始时间'
        // })
      }
    },
    //审核
    operationClick(index) {
      var self = this;
      sessionStorage.setItem("circleCurrentPage", self.currentPage);
      sessionStorage.setItem("circlePageSizeNum", self.pageSizeNum);
      sessionStorage.setItem("circleTimeFirst", self.timeNumOne);
      sessionStorage.setItem("circleTimeSecond", self.timeNumTwo);
      sessionStorage.setItem("circleAudit", self.auditModel);
      sessionStorage.setItem("personOrCircleModel", self.personOrCircleModel);
      let chedata = JSON.stringify(this.dataList[index]);
      sessionStorage.setItem("chedata", chedata);
      this.$router.push({
        path: "/clientSide/clientAudit"
      });
      sessionStorage.setItem("approveState",self.dataList[index].approveState)
    },
    //审核灰
    operationNoClick() {
      this.$message({
        type: "info",
        message: "已审核过，不可再操作！"
      });
    },
    //选取全部序号
    numChange(event) {
      this.checkList = event.target.checked ? this.dataList : [];
      var a = this.checkList.map(function(data) {
        return data.id;
      });
      var string = JSON.stringify(a);
      this.idstring = string;
    },
    //序号选取
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.dataList.length;
      var a = this.checkList.map(function(data) {
        return data.id;
      });
      var string = JSON.stringify(a);
      this.idstring = string;
    },
    //批量删除
    batchDelClick() {
      if (this.checkList.length > 0) {
        this.isShowdel = false;
        this.titlename = "这些圈子将被删除，该操作无法恢复！";
      } else {
        this.$message({
          type: "info",
          message: "请先选择序号！"
        });
      }
      if (this.dataList.length - this.checkList.length > 0) {
        this.iscurrentPage = this.currentPage;
      } else {
        if ((this.currentPage = 1)) {
          this.iscurrentPage = 1;
        } else if (this.currentPage > 1) {
          this.iscurrentPage = this.currentPage - 1;
        }
      }
    },
    //查看
    updateClick(index) {
      var self = this;
      sessionStorage.setItem("approveState",self.dataList[index].approveState)
      self.$router.push({
        path: '/clientSide/clientLookDetail'
      })
    },
    ...mapActions(["getcircleList", "getcancelfigureDatum","getMedicalcirclefindCircleListByCondition","getMedicalcirclecheck"])
  },
  watch: {
    personOrCircleModel: function(val) {
      var self = this;
      self.getcircle();
    }
  }
};
</script>
<style scoped>
/*主页*/

.circle {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

.circle > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 550px;
}

.list > div {
  margin: 0 auto;
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

/* 筛选 */

.filtrate {
  width: 100%;
  overflow: hidden;
  height: 74px;
}

.filtrate > div {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

.interval {
  margin-left: 10px;
}

/*第一个下拉框*/

.selectOne {
  width: 15%;
  max-width: 150px;
  min-width: 100px;
}

.selectOne select {
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding-left: 5px;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 93% 12px no-repeat transparent;
  font-size: 14px;
  color: #97A3C3;
  border: 1px solid #D1D1D1;
  overflow: hidden;
  cursor: pointer;
}

.selectOne select::-ms-expand {
  display: none;
}

.searchBox {
  width: 20%;
  min-width: 150px;
  max-width: 210px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
}

.searchBox input {
  width: 85%;
  /* width: 100px; */
  border: none;
  height: 26px;
}

.searchBox input::-webkit-input-placeholder {
  color: #97A3C3;
}

.searchBox input:-moz-input-placeholder {
  color: #97A3C3;
}

.searchBox input::-moz-input-placeholder {
  color: #97A3C3;
}

.searchBox input:-ms-input-placeholder {
  color: #97A3C3;
}

.filtrateOk {
  width: 70px;
  height: 32px;
  background: #5acdfa;
  text-align: center;
  line-height: 32px;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
.delfiltrateOk {
  color: #fe5371 !important;
  background-color: #eaeaea;
}
/*选择时间*/

.selectTime {
  height: 32px;
  /* float: right !important; */
  line-height: 32px;
  overflow: hidden;
  margin-left: 10px;
}

.selectTime > div {
  float: left;
}

.selectTime > div:nth-child(1),
.selectTime > div:nth-child(3) {
  width: 100px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  position: relative;
}

.selectTime > div:nth-child(1) > div,
.selectTime > div:nth-child(3) > div {
  position: absolute;
  top: -1px;
  left: -6px;
}

.selectTime > div:nth-child(2) {
  height: 32px;
}

.selectTime div {
  margin: 0 4px;
}

/*暂无数据*/

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

/*列表*/

.listContent {
  overflow: hidden;
}

.listContentTop {
  border-top: 1px solid #e5e7eb;
}

.listContent li {
  display: flex;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(1) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
  min-width: 10%;
}

.listContent li > div:nth-child(2) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(3) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(4) {
  width: 12%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(5) {
  width: 12%;
  border-right: 1px solid #e5e7eb;
  cursor: pointer;
}

.listContent li > div:nth-child(6) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(7) {
  width: 10%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(8) {
  width: 13%;
  border-right: 1px solid #e5e7eb;
}

.listContent li > div:nth-child(9) {
  width: 13%;
  border-right: 1px solid #e5e7eb;
}

.listContentTop > div {
  font-size: 17px;
  font-weight: bold;
  color: #303030;
  background: #f2f4f8;
}

.operation {
  display: flex;
  justify-content: center;
}

.operation div {
  padding: 0 10px;
}

.operation div img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

/*批量删除*/

.lastLidel {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.dataLi > div:nth-child(3) span,
.dataLi > div:nth-child(6) span {
  color: green;
  cursor: pointer;
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

.listContent li > div:nth-child(1),
.listContent li > div:nth-child(2),
.listContent li > div:nth-child(3),
.listContent li > div:nth-child(4),
.listContent li > div:nth-child(5),
.listContent li > div:nth-child(6),
.listContent li > div:nth-child(7),
.listContent li > div:nth-child(8),
.listContent li > div:nth-child(9) {
  overflow: hidden;
  padding: 0 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>