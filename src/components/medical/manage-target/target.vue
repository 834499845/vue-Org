<!--症状管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div id="app" class="target">
		<div>
			<div class="listTitle">
				<div>
					指标与科室
				</div>
				<div @click="addtarget">
					新增关联
				</div>
			</div>
			<!-- 筛选 -->
			<div class="filtrate">
				<div class="searchBox">
					<img src="/static/img/search_1.png" alt="">
					<input type="text" placeholder="输入后开始搜索" v-model="screenModel" maxlength="100">
				</div>
				<div class="filtrateOk" @click="okScreen">
					确定
				</div>
			</div>
			<!--列表-->
			<div class="list">
				<ul>
					<li class="topList">
						<div title="序号">
							序号
						</div>
						<div title="指标名称">
							指标名称
						</div>
						<div title="对应科室">
							对应科室
						</div>
						<div title="操作">
							操作
						</div>
					</li>
					<!-- 暂无数据 -->
					<div class="noList" v-show="dataList.length == 0">
						<div>
							<img src="/static/img/w.png" alt="">
						</div>
					</div>
					<li class="listLi" v-for="(item,index) in dataList">
						<div :title="index+1">
							{{index+1}}
						</div>
						<div :title="item.dictionaryName">
							{{item.dictionaryName}}
						</div>
						<div :title="item.bigDepartmentName+'-'+item.smallDepartmentName">
							{{item.bigDepartmentName}} — {{item.smallDepartmentName }}
						</div>
						<div>
							<img @click="updateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑">
							<img @click="recycleClick(index)" src="/static/img/删除.png" alt="删除" title="删除">
						</div>
					</li>
				</ul>
				<!-- 底部分页 -->
				<div class="lastLi" v-show="dataList.length > 0">
					<div>
					</div>
					<div>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSizeNum" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<!--删除弹出框-->
		<div :class="{delPopup:isdelPopup,showdel:isShowdel}">
			<transition name="slide-fade">
				<div class="delContent" v-show="delShow">
					<v-hosdel @ok="okDelClick" @canle="canleClick" :name="titlename"></v-hosdel>
				</div>
			</transition>
		</div>
		<!-- 新增/编辑弹框 -->
		<div class="delPopup" v-show='isAddBox'>
			<div class="delContent">
				<div class="addBoxTop">
					<span v-if="addTarget">
                        新增指标关联
                    </span>
					<span v-else>
                        编辑指标关联
                    </span>
				</div>
				<div class="addBoxList">
					<div class="addBoxListSelect">
						<div>
							选择科室：
						</div>
						<div>
							<select @change="chagOne" v-model="docstateSelectOne">
								<option v-for="(type,index) in SelectOne" v-bind:value="type.id">{{type.value}}</option>
							</select>
							<select @change="chagTwo" class="selectCss" v-model="docstateSelectTwo">
								<option v-for="(type,index) in SelectTwo" v-bind:value="type.id">{{type.value}}</option>
							</select>
						</div>
					</div>
					<div class="addBoxListSelect">
						<div>
							选择指标：
						</div>
						<div>
							<select @change="chagThree" v-model="docstateSelectThree">
								<option v-for="(type,index) in SelectThree" v-bind:value="type.key">{{type.value}}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="addBoxClick">
					<div v-if="addTarget" @click='addTargetClick'>确定</div>
					<div v-else @click='celTargetClick'>确定</div>
					<div @click='delBoxClick'>取消</div>
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
      celTargetClickTrueOrFalse: true,
      addTargetClickTrueOrFalse: true,
      okDelClickTrueOrFalse: true,
      isdelPopup: true, //删除弹框
      isShowdel: true, //删除弹框
      screenModel: "", //文本输入框
      screenModelUp: "", //上传的关键字
      ScreenClick: false, //是否进行筛选
      pageSizeNum: 10, //每页条数
      currentPage: 1, //页码
      totalNum: 10, //总条数
      dataList: [], //列表
      delShow: false, //删除弹出框的显示
      ifGetList: true, //请求判断
      addTarget: true, //新增/编辑指标
      SelectOne: [], //一级科室列表
      SelectTwo: [], //二级科室列表
      SelectThree: [], //指标列表
      isAddBox: false, //新增弹出框
      docstateSelectOne: "", //一级科室
      SelectOneName: "", //一级科室名字
      docstateSelectTwo: "", //二级科室
      SelectTwoName: "", //二级科室名字
      docstateSelectThree: "", //指标
      SelectThreeName: "", //指标名字
      delId: "", //删除的id
      UpId: "", //编辑id
      Upindex: "", //编辑index
      upclick: false, //是否编辑
      titlename: "该指标将被删除，该操作无法恢复！"
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    //权限管理
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
      if (arrs.indexOf("target") == -1) {
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
        this.getTargetList();
        this.ksList();
        this.targetList();
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
    //指标与科室列表
    getTargetList() {
      var self = this;
      self.ifGetList = false;
      self
        .getfindByPagingList({
          current: self.currentPage,
          size: self.pageSizeNum,
          name: self.screenModelUp
        })
        .then(data => {
          self.ifGetList = true;
          //console.log("指标与科室列表", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length == 0) {
                  self.dataList = [];
                } else {
                  self.dataList = data.data.records;
                  self.totalNum = data.data.total;
                }
              } else {
                self.dataList = [];
              }
            } else {
              self.dataList = [];
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
          self.ifGetList = true;
        });
    },
    //获取一级科室列表
    ksList() {
      var self = this;
      self
        .gettrainedList({
          token: sessionStorage.getItem("token")
        })
        .then(data => {
          //console.log("一级科室", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.SelectOne = data.data;
                self.docstateSelectOne = self.SelectOne[0].id;
                self.SelectOneName = self.SelectOne[0].value;
                //获取二级科室列表
                // self.keshiList()
              } else {
                self.SelectOne = [
                  {
                    id: "QXZ",
                    value: "暂无数据！"
                  }
                ];
                self.docstateSelectOne = "QXZ";
              }
            } else {
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
            self.SelectOne = [
              {
                id: "QXZ",
                value: "暂无数据！"
              }
            ];
            self.docstateSelectOne = "QXZ";
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //获取二级科室
    keshiList() {
      var self = this;
      self
        .getLitTrainedList({
          key: self.docstateSelectOne
        })
        .then(data => {
          //console.log("二级科室", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.SelectTwo = data.data;
                //console.log(self.upclick);
                if (self.upclick) {
                  self.docstateSelectTwo =
                    self.dataList[self.Upindex].smallDepartmentId;
                  self.SelectTwoName =
                    self.dataList[self.Upindex].smallDepartmentName;
                  self.upclick = false;
                } else {
                  self.docstateSelectTwo = self.SelectTwo[0].id;
                  self.SelectTwoName = self.SelectTwo[0].value;
                }
              } else {
                self.SelectTwo = [
                  {
                    id: "QXZ",
                    value: "暂无数据！"
                  }
                ];
                self.docstateSelectTwo = "QXZ";
              }
            } else {
              self.SelectTwo = [
                {
                  id: "QXZ",
                  value: "暂无数据！"
                }
              ];
              self.docstateSelectTwo = "QXZ";
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
            self.SelectTwo = [
              {
                id: "QXZ",
                value: "暂无数据！"
              }
            ];
            self.docstateSelectTwo = "QXZ";
          }
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //获取指标列表
    targetList() {
      var self = this;
      self
        .getfindDepartmentList({})
        .then(data => {
          //console.log("指标", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.length > 0) {
                self.SelectThree = data.data;
                self.docstateSelectThree = self.SelectThree[0].key;
                self.SelectThreeName = self.SelectThree[0].value;
              } else {
                self.SelectThree = [
                  {
                    key: "QXZ",
                    value: "暂无数据！"
                  }
                ];
                self.docstateSelectThree = "QXZ";
              }
            } else {
              self.SelectThree = [
                {
                  key: "QXZ",
                  value: "暂无数据！"
                }
              ];
              self.docstateSelectThree = "QXZ";
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
    },
    //确认筛选
    okScreen() {
      if (this.screenModel == "") {
        self.$message({
          type: "info",
          message: "请先输入搜索关键字!"
        });
      } else {
        this.screenModelUp = this.screenModel;
        this.currentPage = 1;
        this.pageSizeNum = 10;
        this.ScreenClick = true;
        this.getTargetList();
      }
    },
    //分页
    handleSizeChange(val) {
      if (this.ScreenClick) {
        this.screenModelUp = this.screenModel;
      } else {
        this.screenModelUp = "";
      }
      this.pageSizeNum = val;
      this.getTargetList();
    },
    handleCurrentChange(val) {
      if (this.ScreenClick) {
        this.screenModelUp = this.screenModel;
      } else {
        this.screenModelUp = "";
      }
      this.currentPage = val;
      this.getTargetList();
    },
    //一级科室选择
    chagOne() {
      var self = this;
      for (var i = 0; i < self.SelectOne.length; i++) {
        if (self.SelectOne[i].id == self.docstateSelectOne) {
          self.SelectOneName = self.SelectOne[i].value;
        }
      }
      this.keshiList();
    },
    //二级科室选择
    chagTwo() {
      var self = this;
      for (var i = 0; i < self.SelectTwo.length; i++) {
        if (self.SelectTwo[i].id == self.docstateSelectTwo) {
          self.SelectTwoName = self.SelectTwo[i].value;
        }
      }
    },
    //指标选择
    chagThree() {
      //console.log(this.SelectThree);
      var self = this;
      for (var i = 0; i < self.SelectThree.length; i++) {
        if (self.SelectThree[i].key == self.docstateSelectThree) {
          self.SelectThreeName = self.SelectThree[i].value;
        }
      }
    },
    //新增指标
    addtarget() {
      this.addTarget = true;
      this.isAddBox = true;
      this.upclick = false;
      this.docstateSelectOne = this.SelectOne[0].id;
      this.SelectOneName = this.SelectOne[0].value;
      this.docstateSelectThree = this.SelectThree[0].key;
      this.SelectThreeName = this.SelectThree[0].value;
      this.keshiList();
    },
    //确认新增指标
    addTargetClick() {
      var self = this;
      var json = [
        {
          bigDepartmentName: self.SelectOneName,
          bigDepartmentId: self.docstateSelectOne,
          smallDepartmentName: self.SelectTwoName,
          smallDepartmentId: self.docstateSelectTwo,
          dictionaryName: self.SelectThreeName,
          dictionaryid: self.docstateSelectThree
        }
      ];
      var string = JSON.stringify(json);
      if (self.addTargetClickTrueOrFalse == true) {
        self.addTargetClickTrueOrFalse = false;
        self
          .getaddTargetList({
            indexDepartmentJson: string
          })
          .then(data => {
            self.addTargetClickTrueOrFalse = true;
            //console.log("指标", data);
            if (data.code == 200) {
              this.getTargetList();
              this.isAddBox = false;
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.addTargetClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //编辑指标
    updateClick(index) {
      //console.log(this.dataList[index]);
      this.Upindex = index;
      this.upclick = true;
      this.docstateSelectOne = this.dataList[index].bigDepartmentId;
      this.SelectOneName = this.dataList[index].bigDepartmentName;
      this.docstateSelectThree = this.dataList[index].dictionaryId;
      this.SelectThreeName = this.dataList[index].dictionaryName;
      this.addTarget = false;
      this.isAddBox = true;
      this.UpId = this.dataList[index].id;
      this.keshiList();
    },
    //确认编辑指标
    celTargetClick() {
      var self = this;
      var json = [
        {
          id: self.UpId,
          bigDepartmentName: self.SelectOneName,
          bigDepartmentId: self.docstateSelectOne,
          smallDepartmentName: self.SelectTwoName,
          smallDepartmentId: self.docstateSelectTwo,
          dictionaryName: self.SelectThreeName,
          dictionaryid: self.docstateSelectThree
        }
      ];
      var string = JSON.stringify(json);
      if (self.celTargetClickTrueOrFalse == true) {
        self.celTargetClickTrueOrFalse = false;
        self
          .getupdateTargetList({
            indexDepartmentJson: string
          })
          .then(data => {
            self.celTargetClickTrueOrFalse = true;
            //console.log("编辑", data);
            if (data.code == 200) {
              this.getTargetList();
              this.isAddBox = false;
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.celTargetClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //取消新增-编辑弹出框
    delBoxClick() {
      this.isAddBox = false;
      this.upclick = false;
    },
    //删除指标
    recycleClick(index) {
      this.isShowdel = false;
      this.delShow = true;
      this.delId = this.dataList[index].id;
    },
    //确认删除
    okDelClick() {
      var self = this;
      if (self.okDelClickTrueOrFalse == true) {
        self.okDelClickTrueOrFalse = false;
        self
          .getdeleteFindByPaging({
            id: self.delId
          })
          .then(data => {
            self.okDelClickTrueOrFalse = true;
            //console.log("删除指标与科室", data);
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功！"
              });
              if (self.dataList.length == 1) {
                if (self.currentPage == 1) {
                  self.currentPage = 1;
                } else if (self.currentPage > 1) {
                  self.currentPage = self.currentPage - 1;
                }
              }
              this.isShowdel = true;
              this.delShow = false;
              this.getTargetList();
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okDelClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //取消删除
    canleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    ...mapActions([
      "getfindByPagingList",
      "gettrainedList",
      "getLitTrainedList",
      "getdeleteFindByPaging",
      "getfindDepartmentList",
      "getaddTargetList",
      "getupdateTargetList"
    ])
  },
  watch: {
    screenModel: function(val) {
      var changeVal = val.length;
      if (changeVal == 0) {
        if (this.ScreenClick) {
          this.ScreenClick = false;
          this.screenModelUp = "";
          this.currentPage = 1;
          this.pageSizeNum = 10;
          this.getTargetList();
        }
      }
    }
  }
};
</script>
<style scoped>
/*主页*/

.target {
  width: 100%;
  height: 100%;
}

.target > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 540px;
}

.filtrate {
  overflow: hidden;
  height: 74px;
}

.filtrate div {
  float: left;
  margin: 20px 10px 0 0;
}

.searchBox {
  height: 32px;
  line-height: 32px;
  margin-left: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
  width: 210px;
}

.searchBox input {
  border: none;
  height: 26px;
  width: 80%;
}

.searchBox input::-webkit-input-placeholder {
  color: #97a8be;
}

.searchBox input:-moz-input-placeholder {
  color: #97a8be;
}

.searchBox input::-moz-input-placeholder {
  color: #97a8be;
}

.searchBox input:-ms-input-placeholder {
  color: #97a8be;
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

.topList {
  display: flex;
  height: 50px;
  background: #f2f4f8;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #d1d1d1;
}

.listLi {
  display: flex;
  height: 48px;
  font-size: 14px;
  text-align: center;
  line-height: 48px;
  border-left: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  border-right: 1px solid #d1d1d1;
}

.list li div:nth-child(1) {
  width: 15%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list li div:nth-child(2) {
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-left: 1px solid #d1d1d1;
}

.list li div:nth-child(3) {
  width: 35%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-left: 1px solid #d1d1d1;
}

.list li div:nth-child(4) {
  width: 20%;
  border-left: 1px solid #d1d1d1;
}

.list li div:nth-child(4) img {
  margin: 0 10px;
  cursor: pointer;
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000000;
}

.showdel {
  display: none;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.addBoxTop {
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  color: #5acdfa;
  border-bottom: 1px solid #5acdfa;
}

.addBoxList {
  height: 120px;
  margin-top: 30px;
}

.addBoxListSelect {
  display: flex;
  margin: 18px 0 0 50px;
}

.addBoxListSelect > div:nth-child(1) {
  height: 32px;
  line-height: 32px;
  width: 80px;
  text-align: right;
  margin-right: 14px;
}

select {
  width: 150px;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 95% 12px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

.selectCss {
  margin-left: 14px;
}

.addBoxClick {
  height: 32px;
  width: 230px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  color: white;
}

.addBoxClick > div {
  width: 75px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.addBoxClick > div:nth-child(1) {
  background: #5acdfa;
}

.addBoxClick > div:nth-child(2) {
  background: #bbbbbb;
}
</style>