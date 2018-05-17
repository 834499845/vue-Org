<!--用户管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="clientSideAccount">
        <div>
            <div class="listTitle">
                <div>
                    用户管理
                </div>
            </div>
            <!-- 条件筛选 -->
            <!-- <div class="conditionFilter">
                <div class="conditionFilterTitle">
                    <div>
                        <div>
                            <img src="/static/img/you.jpg" alt="">
                        </div>
                        <div>条件筛选</div>
                    </div>
                    <div>
                        <div @click="arrowDownClick">
                            <div v-if="arrowup">
                                <img src="/static/img/向上箭头.png" alt="">
                            </div>
                            <div v-else>
                                <img src="/static/img/向下箭头.png" alt="">
                            </div>
                        </div>
                        <div>
                            <div v-if="arrowup">收起筛选</div>
                            <div v-else>展开筛选</div>
                        </div>
                        <div class="selectItem">
                            <div @click="searchClick">查询结果</div>
                            <div @click="advancedSearchClick">高级检索</div>
                        </div>
                    </div>
                </div>
                <div class="conditionFilterContent" v-show="arrowup">
                    <div class="filterKey">
                        <div>用户账号：</div>
                        <div>
                            <input type="text" placeholder="输入账号或昵称" v-model="searchWordVal">
                        </div>
                    </div>
                    <div class="filterKey">
                        <div>注册时间：</div>
                        <div>
                            <el-date-picker @change="beginTime" v-model="timeFirst" type="date" placeholder="选择开始时间">
                            </el-date-picker>
                        </div>
                        <div>至</div>
                        <div>
                            <el-date-picker @change="overtime" v-model="timeSecond" type="date" placeholder="选择截止时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="filterKey">
                        <div>资料认证：</div>
                        <div>
                            <select v-model="auditModel" @change="selectApproveChange">
                                <option v-for="(item,index) in dataApproveList" :value="item.key" :key="item.value">{{item.value}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>-->
        <!-- 搜索 -->
        <div class="filtrate">
                <div class="selectOne">
                    <select v-model="auditModel" @change="selectApproveChange">
                      <option v-for="(item,index) in dataApproveList" :value="item.key" :key="index">{{item.value}}</option>
                    </select>
                </div>
                <div class="searchBox interval">
                    <img src="/static/img/search_1.png" alt="搜索">
                    <input type="text" placeholder="输入姓名和账号" v-model="searchWordVal">
                </div>
                <!-- 日期 -->
                <div class="selectTimes">
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
                <div class="filtrateOk interval" @click="searchClick">
                    确定
                </div>
                <div class="filtrateOk interval delfiltrateOk" @click="removeClick">
                    清除
                </div>
                <div class="filtrateOk interval" @click="advancedSearchClick">
                  更多
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div style="width: 10%">
                                真实姓名
                            </div>
                            <div style="width: 10%">
                                账号
                            </div>
                            <div style="width: 15%">
                                创建时间
                            </div>
                            <div style="width: 15%">
                                更新时间
                            </div>
                            <div style="width: 5%">
                                状态
                            </div>
                            <div style="width: 10%">
                                实名认证
                            </div>
                            <div style="width: 10%">
                                类型
                            </div>
                            <div style="width: 10%">
                                电话
                            </div>
                            <div style="width: 15%">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="dataLists.length > 0" v-for="(item,index) in dataLists" :key="index">
                            <div style="width: 10%">
                                {{item.name | strFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.account}}
                            </div>
                            <div style="width: 15%">
                                {{item.createDate | timeFun}}
                            </div>
                            <div style="width: 15%">
                                {{item.updateDate | timeFun}}
                            </div>
                            <div style="width: 5%">
                                {{item.accountState | enableFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.state | stateFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.accountType | typeFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.phone | strFun}}
                            </div>
                            <div class="operate" style="width: 15%">
                                <div v-show="item.accountType == 2"><img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑"></div>
                                <div v-show="item.accountType == 2"><img @click="roleClick(index)" src="/static/img/LIJ.png" alt="角色关联" title="角色关联"></div>
                                <template v-if="item.accountState == 0">
                                    <div><img @click="stateClick(index)" src="/static/img/禁用.png" title="禁用"></div>
                                </template>
                                <template v-else>
                                    <div><img @click="stateClick(index)" src="/static/img/选中-禁用.png" title="启用"></div>
                                </template>
                                <div><img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除"></div>
                            </div>
                        </li>
                        <li class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="图片加载失败">
                            </div>
                        </li>
                        <li class="lastLi" v-show="dataLists.length > 0">
                            <div class="lastLiLeft">
                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-accountdel @ok="butDeleteClick" @canle="cancelDelClick" :name="titlename"></v-accountdel>
                </div>
            </transition>
        </div>
        <!--关联弹出框-->
        <div :class="{rolPopup:isrolPopup,showrol:isShowrol}">
            <transition name="slide-fade">
                <div class="rolContent" v-show="rolShow" v-loading="roling">
                    <div class="rolTitle">
                        账户关联角色
                    </div>
                    <div class="rolCont">
                         <ul>
                           <li v-for="(item,index) in states" :label="item.value" :key="item.key">
                             <div class="checked" @click="checkedClick(index)" v-show="!item.show">
                               <img src="/static/img/show.jpg" alt="选中">
                             </div>
                             <div class="unchecked" @click="checkedClick(index)" v-show="item.show">

                             </div>
                             <div class="checkedContent">
                                {{item.value}}
                             </div>
                           </li>
                         </ul>
                    </div>
                    <div class="rolBut">
                        <div @click="butrolClick">确定</div>
                        <div @click="cancelrolClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--修改弹出框-->
        <div :class="{upPopup:isupPopup,showup:isShowup}">
            <transition name="slide-fade">
                <div class="upContent" v-show="upShow" v-loading="uping">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                        <div>
                            账户：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddAcountInput,grayRoleInput:isRrayAcountInput}" maxlength="20" type="text"
                                    v-model="upaccountStr">
                            </div>
                            <div :class="{addRoleTest:isaddAcountInput,grayRoleTest:isRrayAcountInput}">
                                账号必须为11位手机号
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            密码：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddpwsInput,grayRoleInput:isRraypwsInput}" type="text" maxlength="16" minlength="8" v-model="uppwsStr">
                            </div>
                            <div :class="{addRoleTest:isaddpwsInput,grayRoleTest:isRraypwsInput}">
                                不输入为使用旧密码，8-16位数字字母组合
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            姓名：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddnameInput,grayRoleInput:isRraynameInput}" type="text" maxlength="10"
                                    v-model="upnameStr">
                            </div>
                            <div :class="{addRoleTest:isaddnameInput,grayRoleTest:isRraynameInput}">
                                只可为汉字或字母且字数限制在10位以内
                            </div>

                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            电话：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddphoneInput,grayRoleInput:isRrayphoneInput}" type="text" maxlength="11"
                                    v-model="upphoneStr">
                            </div>
                            <div :class="{addRoleTest:isaddphoneInput,grayRoleTest:isRrayphoneInput}">
                                11位手机号
                            </div>

                        </div>
                    </div>
                    <div class="updateButton">
                        <div @click="butUpdateClick">修改</div>
                        <div @click="cancelUpdateClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
         <!-- 高级检索弹框 -->
        <div :class="{searchPopup:isSearchPopup,showSearch:isShowSearch}">
            <transition name="slide-fade">
                <div class="searchContent" v-show="searchShow">
                    <div class="searchTitle">
                        <div>高级检索</div>
                        <div @click="closeClick">
                            <img src="/static/img/小叉号@2x.png" alt="关闭">
                        </div>
                    </div>
                    <div class="searchData">
                        <div>
                            <div>用户账号：</div>
                            <div>
                                <input type="text" v-model="searchWordVal" placeholder="请输入用户账号或真实姓名">
                            </div>
                        </div>
                    </div>
                    <div class="searchData">
                        <div>
                            <div>资料认证：</div>
                            <div>
                                <select v-model="auditModel" @change="selectApproveChange">
                                    <option v-for="(item,indexOne) in dataApproveList" :value="item.key" :key="indexOne">{{item.value}}</option>
                                </select>
                            </div>
                        </div>                       
                    </div>
                    <div class="searchData">
                        <div>
                              <div>角色选择：</div>
                              <div>
                                  <select v-model="roleSelectVal" @change="selectRoleChange">
                                      <option v-for="(item,indexTwo) in roles" :value="item.key" :key="indexTwo">{{item.value}}</option>
                                  </select>
                              </div>
                        </div>
                    </div>
                    <div class="searchData">
                        <div>
                            <div>注册时间：</div>
                            <div class="selectTime">
                                <el-date-picker @change="beginTime" v-model="timeFirst" type="date" placeholder="开始时间">
                                </el-date-picker>
                            </div>
                            <div class="centerLine">至</div>
                            <div class="selectTime">
                              <el-date-picker @change="overtime" v-model="timeSecond" type="date" placeholder="截止时间">
                              </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="searchButton">
                        <div @click="removeClick">重置</div>
                        <div @click="searchStartClick">开始检索</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import accountdel from "../../cModule/healthdel";
export default {
  components: {
    "v-accountdel": accountdel
  },
  data() {
    return {
      getListFunTrueOrFalse: true, //控制账户列表
      checkedNum: "", //存储多个关联角色
      checkeLists: "", //关联角色列表
      searchWordVal: "", //筛选输入得关键词
      searchWordValUp: "", // 上传的关键字
      timeFirst: "", //注册时间开始时间model
      timeSecond: "", //注册时间结束时间model
      timeOne: "", // 存放开始时间
      timeTwo: "", // 存放结束时间
      timeNumOne: "", // 存放开始时间
      timeNumTwo: "", // 存放结束时间
      roleSelectVal: "", //角色选择model
      selectRoleVal: "", //选择角色Model
      isSearchPopup: true, //控制检索框样式
      isShowSearch: true, //控制检索框样式
      searchShow: false, //控制检索弹框显示或隐藏
      arrowup: false, //筛选箭头向上
      auditModel: "QXZSH", //下拉选择的认证状态
      auditModels: "", // 上传的认证状态
      dataApproveList: [
        { key: "QXZSH", value: "资料认证状态" },
        { key: "-1", value: "未认证" },
        { key: "0", value: "待审核" },
        { key: "1", value: "审核通过" },
        { key: "2", value: "审核未通过" }
      ], // 审核状态列表
      roles: [],
      isRrayphoneInput: true, // 控制修改弹框手机号输入框和提示符合规则样式
      isaddphoneInput: false, //  控制修改弹框手机号输入框和提示不符合规则样式
      isRraynameInput: true, // 控制修改弹框姓名输入框和提示符合规则样式
      isaddnameInput: false, // 控制修改弹框姓名输入框和提示不符合规则样式
      isaddpwsInput: false, // 控制修改弹框密码输入框和提示符合规则样式
      isRraypwsInput: true, // 控制修改弹框密码输入框和提示不符合规则样式
      isaddAcountInput: false, // 控制修改弹框账号输入框和提示符合规则样式
      isRrayAcountInput: true, // 控制修改弹框账号输入框和提示不符合规则样式
      tfshow: 1000000, // 用来存放index
      loading: false, // 控制页面加载
      states: [], //关联角色列表
      deling: false, // 控制删除弹框加载
      adding: false, // 控制添加弹框加载
      uping: false, // 控制修改弹框加载
      roling: false, // 控制管理弹框加载
      isrolPopup: true, // 控制管理弹框样式
      isShowrol: true, // 控制关联弹框展示与隐藏
      rolShow: false, // 控制关联弹框展示与隐藏
      upaccountStr: "", // 修改弹框账户Model
      uppwsStr: "", // 修改弹框密码Model
      upnameStr: "", // 修改弹框姓名Model
      upphoneStr: "", // 修改弹框手机号Model
      isupPopup: true, // 控制修改弹框展示时的样式
      isShowup: true, // 控制修改弹框展示隐藏
      upShow: false, // 控制修改弹框展示隐藏
      titlename: "", //删除弹框提示
      isdelPopup: true, // 控制删除弹框展示时的样式
      isShowdel: true, // 控制删除弹框是否展示
      delShow: false, // 控制删除弹框是否展示
      dataLists: [], // 账户列表
      pageSizeNum: 10, // 每页展示的条数
      currentPage: 1, // 当前页码
      totalNum: 0, // 总条数
      delIndex: "", // 保存被点击删除的数据index
      rolIndex: "", // 保存被关联的数据的index
      upIndex: "", // 保存修改数据的index
      checkList: [], // 存放关联角色的列表
      ids: [] // 存放已关联的角色列表
    };
  },
  // 过滤
  filters: {
    // 时间过滤
    timeFun: function(val) {
      if (val) {
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
        return (
          "20" + year + "-" + month + "-" + date + " " + hour + ": " + minute
        );
      } else {
        return "暂无";
      }
    },
    // 名称类过滤
    strFun: function(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
    // 账号类型过滤
    typeFun: function(val) {
      if (val) {
        if (val == 0) {
          return "账号";
        } else if (val == 1) {
          return "邮箱";
        } else if (val == 2) {
          return "手机号";
        } else if (val == 3) {
          return "第三方邮箱";
        } else if (val == 4) {
          return "后台管理";
        }
      } else {
        return "—";
      }
    },
    // 账号状态
    enableFun: function(val) {
      if (val) {
        if (val == 0) {
          return "正常";
        } else if (val == 1) {
          return "禁用状态";
        }
      } else {
        return "无";
      }
    },
    // 审核状态
    stateFun: function(val) {
      if (val == -1) {
        return "未认证";
      } else if (val == 0) {
        return "待审核";
      } else if (val == 1) {
        return "审核通过";
      } else if (val == 2) {
        return "审核未通过";
      } else {
        return "—";
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
        if (ele.name == "前台管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("clientSideAccount") == -1) {
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
        // 获取账户列表
        self.getListFun();
        // 获取角色列表
        self
          .getListRole({
            pageNo: 1,
            pageSize: 1000,
            type: "0",
            token: TOKEN
          })
          .then(data => {
            // console.log("角色列表", data);
            if (data.code == 200) {
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length > 0) {
                    data.data.records.forEach(function(ele, ind) {
                      self.states.push({
                        key: ele.id,
                        value: ele.name,
                        show: true
                      });
                      self.roles = self.states;
                    });
                  } else {
                    self.states = [];
                  }
                } else {
                  self.states = [];
                }
              } else {
                self.states = [];
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
    // 获取账户列表
    getListFun() {
      var self = this;
      if (self.getListFunTrueOrFalse == true) {
        self.getListFunTrueOrFalse = false;
        self.loading = true;
        self
          .getClientSideAccountSelectAccountByCondition({
            pageNo: self.currentPage,
            pageSize: self.pageSizeNum,
            type: "2",
            regStartDate: self.timeOne,
            regEndDate: self.timeTwo,
            state: self.auditModels,
            searchWord: self.searchWordValUp,
            roleId: self.selectRoleVal
          })
          .then(data => {
            self.getListFunTrueOrFalse = true;
            self.loading = false;
            if (data.code == 200) {
              self.dataLists = [];
              if (data.data) {
                if (data.data.records) {
                  if (data.data.records.length > 0) {
                    self.dataLists = data.data.records;
                    self.totalNum = data.data.total;
                  }
                }
              } else {
                self.dataLists = [];
              }
            } else {
              self.dataLists = [];
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.loading = false;
            self.getListFunTrueOrFalse = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
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
            this.currentPage = 1;
            this.getListFun();
          } else {
            this.$message({
              type: "info",
              message: "开始时间必须小于结束时间！"
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
          this.getListFun();
        }
      } else {
        this.timeNumOne = "";
        this.timeFirst = "";
        this.timeOne = "";
        this.currentPage = 1;
        this.getListFun();
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
            this.currentPage = 1;
            this.getListFun();
          } else {
            this.timeTwo = "";
            this.timeSecond = "";
            this.timeNumTwo = "";
            this.$message({
              type: "info",
              message: "结束时间必须大于开始时间！"
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
          this.getListFun();
        }
      } else {
        this.timeNumTwo = "";
        this.timeSecond = "";
        this.timeTwo = "";
        this.currentPage = 1;
        this.getListFun();
      }
    },
    // 选择资料认证状态
    selectApproveChange() {
      if (this.auditModel == "QXZSH") {
        this.auditModels = "";
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getListFun();
      } else {
        this.auditModels = this.auditModel;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getListFun();
      }
    },
    // 选择角色
    selectRoleChange() {
      if (this.roleSelectVal == "") {
        (this.selectRoleVal = ""), (this.currentPage = 1);
        this.pageSizeNum = 10;
        this.getListFun();
      } else {
        this.selectRoleVal = this.roleSelectVal;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.getListFun();
      }
    },
    // 选中的角色列表
    selectCheckedNumChange(val) {
      var self = this;
      self.checkeLists = JSON.stringify(self.checkList);
      self.checkedNum = self.checkeLists
        .replace(/[\[\]]/g, "")
        .replace(/\"/g, "");
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
      this.searchWordVal = "";
      this.searchWordValUp = "";
      this.pageSizeNum = 10;
      this.currentPage = 1;
      this.auditModel = "QXZSH";
      (this.selectRoleVal = ""), (this.roleSelectVal = "CXY");
      this.getListFun();
    },
    // 展开筛选
    arrowDownClick() {
      if (this.arrowup == true) {
        this.arrowup = false;
      } else {
        this.arrowup = true;
      }
    },
    // 查询结果
    searchClick() {
      var self = this;
      if (self.searchWordVal == "") {
        this.$message({
          type: "info",
          message: "请先输入关键字!"
        });
      } else {
        self.searchWordValUp = self.searchWordVal;
        self.currentPage = 1
        self.getListFun();
      }
    },
    // 开始检索
    searchStartClick() {
      var self = this;
      if (self.searchWordVal == "") {
        this.$message({
          type: "info",
          message: "请先输入关键字!"
        });
      } else {
        self.searchWordValUp = self.searchWordVal;
        self.getListFun();
      }
    },
    //高级检索
    advancedSearchClick() {
      var self = this;
      self.isShowSearch = false;
      self.searchShow = true;
      self.roles.unshift({
        key: "",
        value: "请选择角色",
        show: true
      });
    },
    // 关闭高级检索弹框
    closeClick() {
      var self = this;
      self.isShowSearch = true;
      self.roles.splice(0, 1);
    },
    // 点击分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.getListFun();
    },
    // 选择每页个数
    handleSizeChange(val) {
      var self = this;
      self.pageSizeNum = val;
      self.getListFun();
    },
    // 添加账号角色关联
    roleClick(index) {
      var self = this;
      self.roling = true;
      self.tfshow = 0;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getAcountAndRoleList({
          accountId: self.dataLists[index].id,
          type: "0",
          token: TOKEN
        })
        .then(data => {
          // console.log("用户的角色列表", data);
          self.roling = false;
          if (data.code == 200) {
            if (data.data) {
              self.ids = [];
              self.checkList = [];
              self.checkedNum = [];
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  self.ids.push(ele.id);
                });
                self.states.forEach(function(ele, ind) {
                  ele.show = true;
                  for (var k = 0; k < data.data.length; k++) {
                    if (ele.key == data.data[k].id) {
                      ele.show = false;
                    }
                  }
                });
              } else {
                self.states.forEach(function(ele, ind) {
                  ele.show = true;
                });
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        }).catch(msg => {
          self.roling = false;
          self.dataLists = [];
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
      this.isShowrol = false;
      this.rolShow = true;
      this.rolIndex = index;
    },
    // 选中角色
    checkedClick(index) {
      var self = this;
      if (self.states[index].show == true) {
        self.checkList.push(self.states[index].key);
        self.checkList = self.checkList.concat(self.ids);
      } else {
        for (var i = 0; i < self.ids.length; i++) {
          if (self.ids[i] == self.states[index].key) {
            self.ids.splice(i, 1);
          }
        }
        self.checkList = self.ids;
      }
      self.checkeLists = JSON.stringify(self.checkList);
      self.checkedNum = self.checkeLists
        .replace(/[\[\]]/g, "")
        .replace(/\"/g, "");
      this.states[index].show = !this.states[index].show;
    },
    // 角色id去重
    unique(array) {
      var n = [];
      for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) {
          n.push(array[i]);
        }
        return n;
      }
    },
    // 确认关联按钮
    butrolClick() {
      var self = this;
      self.roling = true;
      var reoleIdStr = "";
      var TOKEN = sessionStorage.getItem("token");
      self
        .getDelAcountRole({
          accountId: self.dataLists[self.rolIndex].id,
          token: TOKEN,
          type: "0"
        })
        .then(data => {
          if (data.code == 200 || data.code == 602) {
            var TOKEN = sessionStorage.getItem("token");
            self
              .getAcountAndRole({
                accountId: self.dataLists[self.rolIndex].id,
                roleId: self.checkedNum,
                token: TOKEN,
                type: "0"
              })
              .then(data => {
                // console.log(data);
                self.roling = false;
                if (data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "角色和账户关联成功"
                  });

                  self.isShowrol = true;
                  self.rolShow = false;
                  self.getListFun();
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.roling = false;
                // console.log(msg);
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          } else {
            self.roling = false;
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.roling = false;
          // console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 取消关联弹出框
    cancelrolClcik() {
      this.isShowrol = true;
      this.rolShow = false;
    },
    // 修改账户状态
    stateClick(index) {
      var self = this;
      var enaSta = "";
      if (self.dataLists[index].accountState == 0) {
        enaSta = 1;
      } else {
        enaSta = 0;
      }
      var TOKEN = sessionStorage.getItem("token");
      self
        .getStateAcount({
          id: self.dataLists[index].id,
          enable: enaSta,
          token: TOKEN,
          type: "0"
        })
        .then(data => {
          // console.log("修改状态", data);
          if (data.code == 200) {
            self.$message({
              type: "success",
              message: "修改状态成功！"
            });
            self.getListFun();
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          // console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 修改账户信息
    updateClick(index) {
      var self = this;
      this.isShowup = false;
      this.upShow = true;
      var upObj = self.dataLists[index];
      var date = Date.parse(new Date());
      this.upaccountStr = upObj.account;
      this.uppwsStr = "";
      this.upnameStr = upObj.name;
      if (upObj.phone) {
        this.upphoneStr = upObj.phone;
      } else {
        this.upphoneStr = "";
      }
      self.upIndex = index;
    },
    // 确认修改
    butUpdateClick() {
      var self = this;
      var listObj = {
        account: self.upaccountStr,
        password: self.uppwsStr,
        name: self.upnameStr,
        phone: self.upphoneStr,
        id: self.dataLists[self.upIndex].id
      };
      var obj = {};
      for (var key in listObj) {
        if (listObj[key]) {
          if (listObj[key].length > 0) {
            obj[key] = listObj[key];
          }
        }
      }
      if (
        this.isRrayphoneInput != true &&
        this.isRraynameInput != true &&
        this.isRrayAcountInput != true &&
        (this.isRraypwsInput != true || self.uppwsStr == "")
      ) {
        self.uping = true;
        self
          .getUpAcount(listObj)
          .then(data => {
            self.uping = false;
            if (data.code == 200) {
              this.isShowup = true;
              this.upShow = false;
              self.$message({
                type: "success",
                message: "修改账户信息成功！"
              });
              self.upaccountStr = "";
              self.uppwsStr = "";
              self.upnameStr = "";
              self.upphoneStr = "";
              self.getListFun();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.uping = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
            // console.log(msg);
          });
      } else {
        if (this.isRrayphoneInput == true) {
          self.$message({
            type: "info",
            message: "电话格式不正确！"
          });
        } else if (this.isRraynameInput == true) {
          self.$message({
            type: "info",
            message: "昵称格式不正确！"
          });
        } else if (this.isRrayAcountInput == true) {
          self.$message({
            type: "info",
            message: "账户格式不正确！"
          });
        }
      }
    },
    // 取消修改弹出框
    cancelUpdateClick() {
      this.isShowup = true;
      this.upShow = false;
      this.upaccountStr = "";
      this.uppwsStr = "";
      this.upnameStr = "";
      this.upphoneStr = "";
    },
    // 删除
    deleteClick(index) {
      this.titlename = "角色";
      this.isShowdel = false;
      this.delShow = true;
      this.delIndex = index;
    },
    // 确认删除框
    butDeleteClick() {
      var self = this;
      self.deling = true;
      var currentNum = self.currentPage;
      if (self.currentPage > 1 && self.delIndex == 0) {
        self.currentPage = currentNum - 1;
      }
      var TOKEN = sessionStorage.getItem("token");
      self
        .getDelAcount({
          id: self.dataLists[self.delIndex].id,
          token: TOKEN,
          type: self.dataLists[self.delIndex].accountType
          // type: "4"
        })
        .then(data => {
          // console.log(data);
          self.deling = false;
          if (data.code == 200) {
            self.$message({
              type: "info",
              message: "不能删除账户，只能禁用"
            });
            if (self.dataLists.length == 1) {
              if (self.currentPage == 1) {
                self.currentPage = 1;
              } else if (self.currentPage > 1) {
                slef.currentPage = currentPage - 1;
              }
            }
            self.isShowdel = true;
            self.delShow = false;
            self.getListFun();
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          self.deling = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 取消删除框
    cancelDelClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    ...mapActions([
      "getDelAcount",
      "getStateAcount",
      "getListRole",
      "getAcountAndRole",
      "getDelAcountRole",
      "getAcountAndRoleList",
      "getUpAcount",
      "getClientSideAccountSelectAccountByCondition"
    ])
  },
  // 监视
  watch: {
    searchWordVal: function(val) {
      var self = this;
      if (val.length == 0) {
        self.searchWordValUp = "";
        self.getListFun();
      }
    },
    upaccountStr: function(val) {
      var trimstr = val;
      var reg = new RegExp(/^\d{11}$/);
      if (trimstr.length <= 0) {
        this.isaddAcountInput = false;
        this.isRrayAcountInput = true;
      } else {
        if (reg.test(trimstr)) {
          this.isaddAcountInput = true;
          this.isRrayAcountInput = false;
        } else {
          this.isaddAcountInput = false;
          this.isRrayAcountInput = true;
        }
      }
    },
    uppwsStr: function(val) {
      var trimstr = val;
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/);
      if (trimstr.length <= 0) {
        this.isaddpwsInput = false;
        this.isRraypwsInput = true;
      } else {
        if (reg.test(trimstr)) {
          this.isaddpwsInput = true;
          this.isRraypwsInput = false;
        } else {
          this.isaddpwsInput = false;
          this.isRraypwsInput = true;
        }
      }
    },
    upnameStr: function(val) {
      var trimstr = val;
      var reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]{1,10}$/);
      if (trimstr.length <= 0) {
        this.isRraynameInput = true;
        this.isaddnameInput = false;
      } else {
        if (reg.test(trimstr)) {
          this.isRraynameInput = false;
          this.isaddnameInput = true;
        } else {
          this.isRraynameInput = true;
          this.isaddnameInput = false;
        }
      }
    },
    upphoneStr: function(val) {
      var trimstr = val;
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      // var reg = new RegExp(/^\d{11}$/);
      if (trimstr.length == 0) {
        this.isaddphoneInput = false;
        this.isRrayphoneInput = true;
      } else {
        if (reg.test(trimstr)) {
          this.isaddphoneInput = true;
          this.isRrayphoneInput = false;
        } else {
          this.isaddphoneInput = false;
          this.isRrayphoneInput = true;
        }
      }
    }
  }
};
</script>
<style scoped>
/*关联弹出框*/

.listCont .noList {
  height: 400px;
}

.listCont .noList > div:nth-child(1) {
  width: 607px;
  height: 400px;
  margin: 0 auto;
  border: 0;
  overflow: hidden;
}

.chcheck {
  margin-left: 25px;
  margin-bottom: 20px;
}

.rolTitle {
  height: 56px;
  margin-top: 13px;
  overflow: hidden;
  width: 100%;
  line-height: 56px;
  text-align: center;
  font-size: 17px;
  color: #303030;
}

.rolCont {
  min-height: 70px;
  height: 100%;
  width: 100%;
}

.rolCont ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 80px;
  margin-top: 20px;
}

.rolCont ul li {
  display: flex;
  width: 50%;
  margin-bottom: 20px;
}

.rolCont .unchecked {
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  border-radius: 3px;
}

.rolCont .checked {
  width: 18px;
  height: 18px;
}

.rolCont .checked img {
  width: 18px;
  height: 18px;
}

.rolCont .checkedContent {
  margin-left: 8px;
}

/* .rolCont > div {
  width: 80%;
  min-height: 70px;
  margin: 10px 60px;
}
.rolCont > div .ul {
  min-height: 70px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.rolCont > div .ul .li {
  margin: 10px 10%;
  width: 30%;
} */
.rolPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.27);
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rolContent {
  width: 440px;
  min-height: 250px;
  background-color: #fff;
  /* border: 1px solid #8492a6; */
  border-radius: 5px;
  z-index: 1;
}

.rolBut {
  width: 100%;
  height: 60px;
  display: flex;
  margin-top: 5px;
  justify-content: center;
}

.rolBut > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.rolBut > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.rolBut > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.showrol {
  display: none;
}
/*添加弹出框*/

#inp {
  width: 270px;
  border: 1px solid #aeaeae;
  height: 32px;
  line-height: 32px;
  padding-left: 2px;
  border-radius: 3px;
}

.addRoleTest {
  color: #d1d1d1;
}

.grayRoleTest {
  color: #dc322b;
}

.addRoleInput {
  border: 1px solid #d1d1d1;
}

.grayRoleInput {
  border: 1px solid #dc322b;
}

#addRoleInput {
  width: 270px;
  height: 32px;
  line-height: 32px;
  padding-left: 2px;
  border-radius: 3px;
}

.updateButton {
  width: 100%;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.updateButton > div {
  width: 68px;
  height: 30px;
  cursor: pointer;
}

.updateButton > div:nth-child(1) {
  width: 68px;
  height: 30px;
  background-color: #5acdfa;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.updateButton > div:nth-child(2) {
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #d1d1d1;
  text-align: center;
  line-height: 30px;
}

.addForm {
  display: flex;
  align-items: center;
  min-height: 55px;
  width: 100%;
}

.addForm > div:nth-child(2) {
  margin-left: 15px;
  /*border: 1px solid red;*/
  height: 70px;
  overflow: hidden;
}

.addForm > div:nth-child(2) > div {
  width: 280px;
  overflow: hidden;
}

.addForm > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.addForm > div:nth-child(1) {
  width: 105px;
  height: 70px;
  text-align: right;
  font-size: 15px;
  color: #303030;
  padding-top: 5px;
}

.addTitle {
  margin-top: 15px;
}

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

.searchPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addContent > div:nth-child(1) {
  height: 15px;
  width: 100%;
}

.addContent {
  width: 450px;
  min-height: 330px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.searchContent {
  width: 450px;
  min-height: 200px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: -10000000;
  padding-bottom: 25px;
}

.searchTitle {
  display: flex;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #f2f4f8;
  width: 100%;
  border-bottom: 1px solid #d1d1d1;
  margin-top: -50;
  font-size: 15px;
  font-weight: bold;
}

.searchTitle div:nth-child(2) {
  margin-left: 335px;
  cursor: pointer;
}

.searchTitle div:nth-child(2) img {
  width: 15px;
  height: 15px;
}

.searchData {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.searchData > div > div:nth-child(1) {
  margin-right: 8px;
}

.searchData input {
  width: 250px;
  height: 36px;
  border: 1px solid #bfcbd9;
  border-radius: 3px;
  padding-left: 8px;
}

.searchData .selectTime div {
  width: 118px;
}

.searchData .centerLine {
  margin-left: 10px;
  margin-right: 10px;
}

::-webkit-input-placeholder {
  color: #97a8be;
}

::-moz-input-placeholder {
  color: #97a3c3;
}

::-moz-input-placeholder {
  color: #97a3c3;
}

::-ms-input-placeholder {
  color: #97a3c3;
}

.searchData > div:nth-child(1) select {
  width: 250px;
  text-align: center;
}

.searchData > div {
  display: flex;
  align-items: center;
}

.searchButton {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}

.searchButton > div {
  width: 80px;
  height: 36px;
  /* border: 1px solid #fff; */
  line-height: 36px;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.searchButton > div:nth-child(1) {
  background: #d1d1d1;
  color: #fe5371;
  font-size: 15px;
}

.searchButton > div:nth-child(2) {
  background: #5acdfa;
  /* border: 1px solid #d1d1d1; */
  font-size: 15px;
}

.showAdd {
  display: none;
}

.showSearch {
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
/*修改弹出框*/

.upPopup {
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

.upContent > div:nth-child(1) {
  height: 15px;
  width: 100%;
}

.upContent {
  width: 450px;
  min-height: 330px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  z-index: 1;
  padding-bottom: 25px;
}

.showup {
  display: none;
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
/*主页*/

.clientSideAccount {
  width: 100%;
  height: 100%;
}

.clientSideAccount > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.recycle {
  height: 100px;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.recycle > div:nth-child(1) {
  min-width: 60px;
  height: 35px;
  color: #353535;
  font-size: 16px;
  line-height: 35px;
}

.recycle > div:nth-child(2) {
  margin-left: 10px;
}

.recycle > div:nth-child(3) {
  margin-top: 3px;
  margin-left: 25px;
  width: 70px;
  height: 30px;
  background-color: #5acdfa;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
}

#lastLiRight {
  width: 80%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.lastLi > div:nth-child(1) {
  width: 10px;
}

.lastLi > div:nth-child(2) {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}

.lastLi {
  height: 60px;
  display: flex;
  border: 0;
  justify-content: space-between;
}

.listCont li {
  display: flex;
  /*border: 1px solid red;*/
  min-height: 50px;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  line-height: 58px;
  height: 58px;
  background-color: #f2f4f8;
  border-bottom: 1px solid #d9d9d9;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(5) {
  min-width: 35px;
}

.firstLi > div:nth-child(6) {
  min-width: 35px;
}

.firstLi > div:nth-child(7) {
  min-width: 35px;
}

.firstLi > div:nth-child(8) {
  min-width: 35px;
}

.firstLi > div:nth-child(9) {
  min-width: 70px;
  vertical-align: middle;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
  height: 50px;
}

.dataLi .opexu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dataLi .opexu > div {
  width: 30px;
  height: 30px;
}

.dataLi .opexu > div:nth-child(1) {
  margin-left: 5px;
}

.dataLi .opexu > div:nth-child(2) {
  margin-right: 5px;
}

.opexu img {
  width: 30px;
  font-size: 18px;
  cursor: pointer;
  height: 26px;
}

.dataLi .operate {
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  height: 58px;
  line-height: 58px;
}

.dataLi .operate > div {
  width: 24px;
  height: 24px;
}

.operate img {
  width: 100%;
  cursor: pointer;
  height: 100%;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  font-size: 14px;
  color: #515151;
  height: 58px;
}

.dataLi > div:nth-child(2) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(3) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(4) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(5) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(6) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(7) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(8) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.dataLi > div:nth-child(9) {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.list {
  /*border: 1px solid red;*/
  min-height: 540px;
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
  border: 1px solid #5acdfa;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #5acdfa;
  cursor: pointer;
}

/* 条件筛选 */
.conditionFilterTitle > div:nth-child(1) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  /* margin-top: 15px; */
  color: #515151;
}

.conditionFilterTitle > div:nth-child(2) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  color: #515151;
}

.conditionFilterTitle > div:nth-child(2) > .selectItem {
  display: flex;
  margin-right: 0px;
}

.selectItem > div {
  border: 1px solid #ddd;
  padding: 5px 10px;
  cursor: pointer;
}

.conditionFilterTitle > div > div {
  margin-right: 10px;
}

.conditionFilterTitle {
  padding: 8px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d1d1d1;
  background: #f2f4f8;
}

.conditionFilter {
  width: 100%;
  min-height: 50px;
  border: 1px solid #d1d1d1;
  margin-top: 15px;
}

.filterKey {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filterKey:nth-child(2) > div:nth-child(3) {
  margin-left: 10px;
  margin-right: 10px;
}

.filterKey:nth-child(2) > div:nth-child(2) > div,
.filterKey:nth-child(2) > div:nth-child(4) > div {
  width: 140px;
  overflow: hidden;
}

.filterKey > div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.filterKey input {
  width: 80px !important;
  height: 36px;
  border: 1px solid #bfcbd9;
  border-radius: 3px;
  padding-left: 10px;
}

.filterKey select {
  width: 200px;
}

/* select {
        width: 193px;
        height: 36px;
        border: 1px solid #BFCBD9;
        border-radius: 3px;
        padding-left: 10px;
    } */

select {
  width: 193px;
  height: 36px;
  line-height: 36px;
  padding-left: 7px;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
  font-size: 14px;
  color: #97a8be;
  border: 1px solid #bfcbd9;
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

.conditionFilterContent {
  padding: 10px 3.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filtrate {
  width: 100%;
  overflow: hidden;
  height: 74px;
}

.filtrate > div {
  float: left;
  margin-top: 20px;
  margin-bottom: -20px;
}

.interval {
  margin-left: 10px;
}

/*第一个下拉框*/

.selectOne {
  width: 17%;
  max-width: 200px;
  min-width: 120px;
}

.selectOne select {
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 93% 12px no-repeat transparent;
  font-size: 14px;
  color: #97a3c3;
  border: 1px solid #d1d1d1;
  overflow: hidden;
  cursor: pointer;
}

.selectOne select::-ms-expand {
  display: none;
}

.searchBox {
  width: 10%;
  min-width: 132px;
  /* max-width: 210px; */
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.searchBox input {
  width: 100%;
  border: none;
  height: 26px;
}

.searchBox input::-webkit-input-placeholder {
  color: #97a3c3;
}

.searchBox input:-moz-input-placeholder {
  color: #97a3c3;
}

.searchBox input::-moz-input-placeholder {
  color: #97a3c3;
}

.searchBox input:-ms-input-placeholder {
  color: #97a3c3;
}

.filtrateOk {
  width: 60px;
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

.selectTimes {
  height: 32px;
  /* float: right !important; */
  line-height: 32px;
  overflow: hidden;
  margin-left: 10px;
}

.selectTimes > div {
  float: left;
}

.selectTimes > div:nth-child(1),
.selectTimes > div:nth-child(3) {
  width: 90px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  position: relative;
}

.selectTimes > div:nth-child(1) > div,
.selectTimes > div:nth-child(3) > div {
  position: absolute;
  top: -1px;
  left: -6px;
}

.selectTimes > div:nth-child(2) {
  height: 32px;
}

.selectTimes div {
  margin: 0 4px;
}
</style>