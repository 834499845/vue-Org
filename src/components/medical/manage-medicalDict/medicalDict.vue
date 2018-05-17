<!--医疗字典-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="medicalDict">
        <div>
            <div class="listTitle">
                <div>
                    医疗字典
                </div>
                <div @click="addClick">
                    新建字典
                </div>
            </div>
            <!-- 列表 -->
            <div class="listMedical">
                <div class="listCont">
                    <ul>
                        <li class="headline">
                            <div class="divOne" title="字典名称">
                                字典名称
                            </div>
                            <div class="divTwo" title="字典编码">
                                字典编码
                            </div>
                            <div class="divThree" title="字典级别">
                                字典级别
                            </div>
                            <div class="divStor" title="字典序号">
                                字典序号
                            </div>
                            <div class="divfour" title="字典内容">
                                字典内容
                            </div>
                            <div class="divfive" title="排序">
                                排序
                            </div>
                            <div class="divsix" title="操作">
                                操作
                            </div>
                        </li>
                        <!-- 暂无数据 -->
                        <li class="noList" v-show="firstList.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="firstLiMedical" v-for="(item,indexOne) in firstList">
                            <div class="firstDict">
                                <div class="divOne ">
                                    <span class="rankName stairName" @click="firstDictClick(indexOne)" :title="item.dictionaryName">
                                        <img v-if="firstDictImg == indexOne" src="/static/img/arrowsB.jpg" alt="展开" title="展开着的">
                                        <img v-else src="/static/img/arrowsR.jpg" alt="收起" title="收起着的"> {{item.dictionaryName}}
                                    </span>
                                </div>
                                <div class="divTwo" :title="item.dictionaryCode">
                                    {{item.dictionaryCode}}
                                </div>
                                <div class="divThree" title="一级">
                                    一级
                                </div>
                                <div class="divStor" :title="item.sort">
                                    {{item.sort}}
                                </div>
                                <div class="divfour">
                                    <img src="/static/img/编辑.png" @click="celDetailsOne(indexOne)" alt="编辑" title="编辑字典内容">
                                    <img src="/static/img/查看groy.png" v-if="item.type == null" @click="banClick" alt="查看" title="不可查看字典内容">
                                    <img src="/static/img/detail.png" v-else @click="checkDetailsOne(indexOne)" alt="查看" title="查看字典内容">
                                </div>
                                <div class="divfive">
                                    <div class="handleImg">
                                        <div>
                                            <img @click="grayupIndexClick" v-if="indexOne == 0" src="/static/img/grayup.png" alt="排序" title="不可向上排序">
                                            <img @click="upRankClickOne(indexOne)" v-else src="/static/img/up.png" alt="排序" title="向上排序">
                                        </div>
                                        <div>
                                            <img @click="graydownIndexClick" v-if="indexOne+1 == firstList.length" src="/static/img/grayup.png" alt="不可排序" title="向下排序">
                                            <img @click="downRankClickOne(indexOne)" src="/static/img/down.png" v-else alt="排序" title="向下排序">
                                        </div>
                                    </div>
                                </div>
                                <div class="divsix">
                                    <div class="handleImg">
                                        <img src="/static/img/tianjia.jpg" @click="addTwoListClick(indexOne)" alt="添加" title="添加">
                                        <img src="/static/img/编辑.png" @click="celOneListClick(indexOne)" alt="编辑" title="编辑">
                                        <img src="/static/img/删除.png" @click="delOneClick(indexOne)" alt="删除" title="删除">
                                    </div>
                                </div>
                            </div>
                            <div class="secondLi" v-show="firstDictImg == indexOne" v-for="(itemTwo,indexTwo) in secondList">
                                <div class="secondDict">
                                    <div class="divOne">
                                        <span class="rankName secondLevel" @click="secondDictClick(indexTwo)" :title="itemTwo.dictionaryName">
                                            <img v-if="secondDictImg == indexTwo" src="/static/img/arrowsB.jpg" alt="展开" title="展开着的">
                                            <img v-else src="/static/img/arrowsR.jpg" alt="收起" title="收起着的"> {{itemTwo.dictionaryName}}
                                        </span>
                                    </div>
                                    <div class="divTwo" :title="itemTwo.dictionaryCode">
                                        {{itemTwo.dictionaryCode}}
                                    </div>
                                    <div class="divThree" title="二级">
                                        二级
                                    </div>
                                    <div class="divStor" :title="itemTwo.sort">
                                        {{itemTwo.sort}}
                                    </div>
                                    <div class="divfour">
                                        <img src="/static/img/编辑.png" @click="celDetailsTwo(indexTwo)" alt="编辑" title="编辑字典内容">
                                        <img src="/static/img/查看groy.png" v-if="itemTwo.type == null" @click="banClick" alt="禁止" title="不可查看字典内容">
                                        <img src="/static/img/detail.png" v-else @click="checkDetailsTwo(indexTwo)" alt="查看" title="查看字典内容">
                                    </div>
                                    <div class="divfive">
                                        <div class="handleImg">
                                            <div>
                                                <img @click="grayupIndexClick" v-if="indexTwo == 0" src="/static/img/grayup.png" alt="排序" title="不可向上排序">
                                                <img @click="upRankClickTwo(indexTwo)" v-else src="/static/img/up.png" alt="排序" title="向上排序">
                                            </div>
                                            <div>
                                                <img @click="graydownIndexClick" v-if="indexTwo+1 == secondList.length" src="/static/img/grayup.png" alt="不可排序" title="向下排序">
                                                <img @click="downRankClickTwo(indexTwo)" src="/static/img/down.png" v-else alt="排序" title="向下排序">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="divsix">
                                        <div class="handleImg">
                                            <img src="/static/img/tianjia.jpg" @click="addThreeListClick(indexTwo)" alt="添加" title="添加">
                                            <img src="/static/img/编辑.png" @click="celTwoListClick(indexTwo)" alt="编辑" title="编辑">
                                            <img src="/static/img/删除.png" @click="delTwoClick(indexTwo)" alt="删除" title="删除">
                                        </div>
                                    </div>
                                </div>
                                <div class="thirdlyDict" v-show="secondDictImg == indexTwo" v-for="(itemThree,indexThree) in thirdList">
                                    <div class="divOne ">
                                        <span class="threeLevel" :title="itemThree.dictionaryName">
                                            {{itemThree.dictionaryName}}
                                        </span>
                                    </div>
                                    <div class="divTwo" :title="itemThree.dictionaryCode">
                                        {{itemThree.dictionaryCode}}
                                    </div>
                                    <div class="divThree" title="三级">
                                        三级
                                    </div>
                                    <div class="divStor" :title="itemThree.sort">
                                        {{itemThree.sort}}
                                    </div>
                                    <div class="divfour">
                                        <img src="/static/img/编辑.png" @click="celDetailsThree(indexThree)" alt="编辑" title="编辑字典内容">
                                        <img src="/static/img/查看groy.png" v-if="itemThree.type == null" @click="banClick" alt="禁止" title="不可查看字典内容">
                                        <img src="/static/img/detail.png" v-else @click="checkDetailsThree(indexThree)" alt="查看" title="查看字典内容">
                                    </div>
                                    <div class="divfive">
                                        <div class="handleImg">
                                            <div>
                                                <img @click="grayupIndexClick" v-if="indexThree == 0" src="/static/img/grayup.png" alt="排序" title="不可向上排序">
                                                <img @click="upRankClickThree(indexThree)" v-else src="/static/img/up.png" alt="排序" title="向上排序">
                                            </div>
                                            <div>
                                                <img @click="graydownIndexClick" v-if="indexThree+1 == thirdList.length" src="/static/img/grayup.png" alt="不可排序" title="向下排序">
                                                <img @click="downRankClickThree(indexThree)" src="/static/img/down.png" v-else alt="排序" title="向下排序">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="divsix">
                                        <div class="handleImg">
                                            <img src="/static/img/编辑.png" @click="celThreeListClick(indexThree)" alt="编辑" title="编辑">
                                            <img src="/static/img/删除.png" @click="delThreeClick(indexThree)" alt="删除" title="删除">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 删除弹出框 -->
        <div :class="{showdel:isShowdel}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okCanleClick" @canle="noCanleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
        <!-- 新建字典弹框 -->
        <div class="delPopup" v-show="addBoxIf">
            <div class="delContent">
                <div class="addBoxNav">
                    <span v-if="addBoxNavIf">新建字典</span>
                    <span v-else>编辑字典</span>
                </div>
                <div class="addBoxInp">
                    <div>
                        字典名称：
                    </div>
                    <div>
                        <input :class="{redBor:isredBoxName}" placeholder="请输入字典名称" maxlength="20" type="text" v-model="addBoxName">
                    </div>
                </div>
                <!-- <div class="redFont" v-show="isredBoxName">
                    请输入正确的字典名称！（不支持特殊字符）
                </div> -->
                <div class="addBoxInp">
                    <div>
                        序号：
                    </div>
                    <div>
                        <input :class="{redBor:isredBoxSort}" placeholder="请输入字典序号(10位以内正整数)" maxlength="10" type="text" v-model="addBoxSortModel"
                            oninput="value=value.replace(/[\D]/g,'')">
                    </div>
                </div>
                <div class="addBoxBut">
                    <div v-if="addBoxNavIf" @click="addBoxOk">确定</div>
                    <div v-else @click="addBoxOkCel">确定</div>
                    <div @click="addBoxDel">取消</div>
                </div>
            </div>
        </div>
        <!-- 查看字典内容 -->
        <div class="delPopup" v-show="ifDetailsBoxShow">
            <div class="detailsBoxCss">
                <div class="addBoxNav">
                    <span v-if="detailsBoxShow">查看字典内容</span>
                    <span v-else>编辑字典内容</span>
                </div>
                <!-- 查看内容详情 -->
                <div v-show="detailsBoxShow">
                    <div class="detailsBoxBut">
                        <div class="butColor" v-show="type == 1">
                            图片
                        </div>
                        <div class="butColor" v-show="type == 0">
                            说明
                        </div>
                    </div>
                    <div class="boxDetails" v-show="type == 1">
                        <img :src="boxDetailsImgOne" alt="字典详情图" title="字典详情图">
                        <img :src="boxDetailsImgTwo" alt="字典详情图" title="字典详情图">
                    </div>
                    <div class="boxDetailsFont" v-show="type == 0">
                        {{medicalDictDetails}}
                    </div>
                </div>
                <!-- 编辑内容详情 -->
                <div v-show="!detailsBoxShow">
                    <div class="detailsBoxBut">
                        <div class="cursorpointer" @click="BoxImgClick" :class="{butColor:isBoxTrue}">
                            图片
                            <!-- <div class="detailsBoxTrue" v-show="isBoxTrue"></div> -->
                        </div>
                        <div class="cursorpointer" @click="BoxFontClick" :class="{butColor:!isBoxTrue}">
                            说明
                            <!-- <div class="detailsBoxTrue" v-show="!isBoxTrue"></div> -->
                        </div>
                    </div>
                    <div class="celBoxDetails" v-show="type == 1">
                        <div>
                            <div class="imgbor">
                                <img src="/static/img/bigNoImg.jpg" v-if="ifBoxDetailsImgOne" alt="上传图片" title="上传图片">
                                <img :src="boxDetailsImgOne" v-else alt="字典详情图" title="字典详情图">
                            </div>
                            <label for="upfileOne"></label>
                            <input id="upfileOne" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChangeOne" value="上传">
                            <span :class="{redfont:isfontimgOne}" class="isAstrict">图片大小不能超过1M</span>
                        </div>
                        <div>
                            <div class="imgbor">
                                <img src="/static/img/bigNoImg.jpg" v-if="ifBoxDetailsImgTwo" alt="上传图片" title="上传图片">
                                <img :src="boxDetailsImgTwo" v-else alt="字典详情图" title="字典详情图">
                            </div>
                            <label for="upfileTwo"></label>
                            <input id="upfileTwo" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChangeTwo" value="上传">
                            <span :class="{redfont:isfontimgTwo}" class="isAstrict">图片大小不能超过1M</span>
                        </div>
                    </div>
                    <div class="boxDetailsFont" v-show="type == 0">
                        <textarea :class="{redBor:isredtextarea}" placeholder="请输入字典说明！(最多225个字符)" maxlength="225" v-model="medicalDictDetails"></textarea>
                    </div>
                </div>
                <div class="detailsBut">
                    <div v-show="detailsBoxShow" @click="detailsBox">确定</div>
                    <div v-show="!detailsBoxShow" @click=" celDetailsOk">确定</div>
                    <div v-show="!detailsBoxShow" @click="detailsBox">取消</div>
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
      addBoxOkTrueOrFalse: true,
      getupmedicalTrueOrFalse: true,
      addBoxOkCelTrueOrFalse: true,
      uploadImageTrueOrFalse: true,
      okCanleClickTrueOrFalse: true,
      sortRankTrueOrFalse: true,
      firstList: [], //一级字典列表
      secondList: [], //二级字典列表
      thirdList: [], //三级字典列表
      firstDictImg: "-1", //一级字典点击判断
      secondDictImg: "-1", //二级字典点击判断
      pid: "", //父Id
      level: 1, //层级
      dictionaryCode: "", //字典编码
      ifClick: true, //判断是否可点击
      isShowdel: true, //删除弹框是否显示
      delShow: false, //删除弹框是否显示
      titlename: "该字典将被删除，该操作无法恢复！",
      addBoxIf: false, //新建字典弹出框
      addBoxName: "", //新建字典名称
      isredBoxName: false, //新建字典名称正则
      indexClick: "", //公共索引index
      addBoxNavIf: true, //判断为新增还是编辑;true-新增;false-编辑。
      listId: "", //当前id
      ifDetailsBoxShow: false, //编辑/查看内容弹出框
      detailsBoxShow: true, //为true时是查看内容，为false时是编辑内容
      type: 1, //编辑/查看内容弹出框：0-说明；1-图片。
      medicalDictDetails: "", //字典内容说明model
      boxDetailsImgOne: "", //字典内容图片
      boxDetailsImgTwo: "", //字典内容图片
      isBoxTrue: true, //字典内容编辑;true-图片；false-说明；
      ifBoxDetailsImgOne: true, //上传图片
      ifBoxDetailsImgTwo: true, //上传图片
      isfontimgOne: false, //上传图片提示
      isfontimgTwo: false, //上传图片提示
      upImg: true, //上传图片验证
      isUpImg: 1, //上传的是第几张图片
      isredtextarea: false, //编辑字典内容正则
      celContent: "", //编辑内容上传内容
      OneIndex: "",
      TwoIndex: "",
      isredBoxSort: false, //新建字典序号正则
      addBoxSortModel: "", //新建字典序号
      objstr: [], //排序数组
      listName: '',
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
      if (arrs.indexOf("medicalDict") == -1) {
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
        if (sessionStorage.getItem("hospitalCurrentPage")) {
          self.currentPage = Number(
            sessionStorage.getItem("hospitalCurrentPage")
          );
        }
        if (sessionStorage.getItem("hospitalPageSizeNum")) {
          self.pageSizeNum = Number(
            sessionStorage.getItem("hospitalPageSizeNum")
          );
        }
        this.getOneLIst();
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
    //获取一级字典列表
    getOneLIst() {
      var self = this;
      self
        .getpagingDictionary({
          current: 1,
          size: 1000000000
        })
        .then(data => {
          //console.log("一级字典：", data);
          if (data.code == 200) {
            if (data.data) {
              if (data.data.records) {
                if (data.data.records.length > 0) {
                  self.firstList = data.data.records;
                  console.log(self.firstList)
                } else {
                  self.firstList = [];
                }
              } else {
                self.firstList = [];
              }
            } else {
              self.firstList = [];
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
    //一级字典名字点击
    firstDictClick(indexOne) {
      if (this.ifClick == true) {
        if (this.firstDictImg == indexOne) {
          this.firstDictImg = "-1";
        } else {
          this.OneIndex = indexOne;
          this.indexClick = indexOne;
          this.firstDictImg = indexOne;
          this.pid = this.firstList[indexOne].id;
          this.level = 2;
          this.secondList = [];
          this.secondDictImg = "-1";
          this.getSunList();
        }
      } else {
        this.$message({
          type: "info",
          message: "数据请求中请等待！"
        });
      }
    },
    //二级字典名字点击
    secondDictClick(indexTwo) {
     console.log(this.secondList[indexTwo].dictionaryName)
      if (this.ifClick == true) {
        if (this.secondDictImg == indexTwo) {
          this.secondDictImg = "-1";
        } else {
          this.TwoIndex = indexTwo;
          this.indexClick = indexTwo;
          this.secondDictImg = indexTwo;
          this.pid = this.secondList[indexTwo].id;
          this.thirdList = [];
          this.level = 3;
          this.getSunList();
        }
      } else {
        this.$message({
          type: "info",
          message: "数据请求中请等待！"
        });
      }
    },
    //获取子级字典
    getSunList() {
      var self = this;
      self.ifClick = false;
      self
        .getfindMedicalByPidAndLevel({
          pid: self.pid,
          level: self.level
        })
        .then(data => {
          //console.log("子级字典：", data);
          if (data.code == 200) {
            //***********点击一级获取二级**************/
            if (self.level == 2) {
              if (data.data.length > 0) {
                self.secondList = data.data;
              } else {
                self.$message({
                  type: "info",
                  message: "当前字典暂无子级字典！"
                });
                self.firstDictImg = "-1";
              }
              //***********点击二级获取三级**************/
            } else if (self.level == 3) {
              if (data.data.length > 0) {
                self.thirdList = data.data;
              } else {
                self.$message({
                  type: "info",
                  message: "当前字典暂无子级字典！"
                });
                self.secondDictImg = "-1";
              }
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
          }
          self.ifClick = true;
        })
        .catch(msg => {
          //console.log(msg);
          self.$message({
            type: "info",
            message: "服务器异常"
          });
          self.ifClick = true;
        });
    },
    //新建一级字典
    addClick() {
      this.addBoxSortModel = "";
      this.addBoxNavIf = true;
      this.pid = 0;
      this.level = 1;
      this.isredBoxName = false;
      this.addBoxIf = true;
      this.dictionaryCode = "";
      this.addBoxName = "";
    },
    //新建二级字典
    addTwoListClick(indexOne) {
      this.addBoxSortModel = "";
      this.addBoxNavIf = true;
      this.indexClick = indexOne;
      this.pid = this.firstList[indexOne].id;
      this.level = 2;
      this.isredBoxName = false;
      this.addBoxName = "";
      this.addBoxIf = true;
      if (this.firstList[indexOne].dictionaryCode == "department") {
        this.dictionaryCode = "big";
      } else {
        this.dictionaryCode = "";
      }
    },
    //新建三级字典
    addThreeListClick(indexTwo) {
      this.addBoxSortModel = "";
      this.addBoxNavIf = true;
      this.indexClick = indexTwo;
      this.pid = this.secondList[indexTwo].id;
      this.level = 3;
      this.isredBoxName = false;
      this.addBoxName = "";
      this.addBoxIf = true;
      if (this.secondList[indexTwo].dictionaryCode == "big") {
        this.dictionaryCode = "small";
      } else {
        this.dictionaryCode = "";
      }
    },
    //新建字典名称正则
    addBoxNameIf() {
      var JudgeOne = /^[\s]*$/; //输入不能为空
      var JudgeTwo = new RegExp(
        "[`！。，.,!-%?？《》：:+`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]"
      );
      var JudgeThree = /[^\d]/g; //输入不为数字
      if (
        JudgeOne.test(this.addBoxName) ||
        JudgeTwo.test(this.addBoxName) ||
        this.addBoxName.length > 20
      ) {
        this.isredBoxName = true;
      }
      if (
        JudgeThree.test(this.addBoxSortModel) ||
        JudgeOne.test(this.addBoxSortModel) ||
        this.addBoxSortModel.length > 10
      ) {
        this.isredBoxSort = true;
      }
      if (
        JudgeOne.test(this.addBoxName) ||
        JudgeTwo.test(this.addBoxName) ||
        this.addBoxName.length > 20 ||
        JudgeThree.test(this.addBoxSortModel) ||
        JudgeOne.test(this.addBoxSortModel) ||
        this.addBoxSortModel.length > 10
      ) {
        return false;
      }
    },
    //确认新建字典
    addBoxOk() {
      if (this.addBoxNameIf() == false) {
      } else {
        var self = this;
        if (self.addBoxOkTrueOrFalse == true) {
          self.addBoxOkTrueOrFalse = false;
          self
            .getaddMedicalDictList({
              dictionaryName: self.addBoxName,
              dictionaryCode: self.dictionaryCode,
              parentId: self.pid,
              level: self.level,
              sort: self.addBoxSortModel
            })
            .then(data => {
              self.addBoxOkTrueOrFalse = true;
              //console.log("新建字典：", data);
              if (data.code == 200) {
                if (self.level == 1) {
                  self.getOneLIst();
                } else if (self.level == 2) {
                  self.firstDictImg = self.indexClick;
                  self.pid = self.firstList[self.indexClick].id;
                  self.level = 2;
                  self.getSunList();
                } else if (self.level == 3) {
                  self.secondDictImg = self.indexClick;
                  self.pid = self.secondList[self.indexClick].id;
                  self.level = 3;
                  self.getSunList();
                }
                self.addBoxIf = false;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.addBoxOkTrueOrFalse = true;
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    //一级字典编辑
    celOneListClick(indexOne) {
      this.level = 1;
      this.addBoxIf = true;
      this.addBoxName = this.firstList[indexOne].dictionaryName;
      this.addBoxSortModel = Number(this.firstList[indexOne].sort);
      this.addBoxNavIf = false;
      this.isredBoxName = false;
      this.listId = this.firstList[indexOne].id;
      this.listName = this.firstList[indexOne].dictionaryName;
      console.log(this.listName)
    },
    //二级字典编辑
    celTwoListClick(indexTwo) {
      this.level = 2;
      this.addBoxIf = true;
      this.addBoxName = this.secondList[indexTwo].dictionaryName;
      this.addBoxNavIf = false;
      this.isredBoxName = false;
      this.listId = this.secondList[indexTwo].id;
      this.addBoxSortModel = Number(this.secondList[indexTwo].sort);
    },
    //三级字典编辑
    celThreeListClick(indexThree) {
      this.level = 3;
      this.addBoxIf = true;
      this.addBoxName = this.thirdList[indexThree].dictionaryName;
      this.addBoxNavIf = false;
      this.isredBoxName = false;
      this.listId = this.thirdList[indexThree].id;
      this.addBoxSortModel = Number(this.thirdList[indexThree].sort);
    },
    //编辑字典
    addBoxOkCel() {
      if (this.addBoxNameIf() == false) {
      } else {
        var self = this;
        if (self.addBoxOkCelTrueOrFalse == true) {
          self.addBoxOkCelTrueOrFalse = false;
          self
            .getupdateMedicalDictList({
              id: self.listId,
              dictionaryName: self.addBoxName,
              sort: self.addBoxSortModel
            })
            .then(data => {
              self.addBoxOkCelTrueOrFalse = true;
              //console.log("编辑字典：", data);
              if (data.code == 200) {
                if (self.level == 1) {
                  self.getOneLIst();
                } else if (self.level == 2) {
                  self.firstDictImg = self.OneIndex;
                  self.pid = self.firstList[self.OneIndex].id;
                  self.level = 2;
                  self.getSunList();
                } else if (self.level == 3) {
                  self.secondDictImg = self.TwoIndex;
                  self.pid = self.secondList[self.TwoIndex].id;
                  self.level = 3;
                  self.getSunList();
                }
                self.addBoxIf = false;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.addBoxOkCelTrueOrFalse = true;
              //console.log(msg);
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    //取消新建/编辑字典
    addBoxDel() {
      this.addBoxIf = false;
    },
    //不可查看字典内容
    banClick() {
      this.$message({
        type: "info",
        message: "此字典暂无内容！"
      });
    },
    //一级字典查看内容
    checkDetailsOne(indexOne) {
      if (this.firstList[indexOne].type) {
        this.type = this.firstList[indexOne].type;
        if (this.type == 0) {
          this.medicalDictDetails = this.firstList[indexOne].content;
        } else if (this.type == 1) {
          var arr = this.firstList[indexOne].content.split(",");
          this.ifBoxDetailsImgOne = false;
          this.ifBoxDetailsImgTwo = false;
          this.boxDetailsImgOne = arr[0];
          this.boxDetailsImgTwo = arr[1];
        }
        this.ifDetailsBoxShow = true;
        this.detailsBoxShow = true;
      } else {
        this.$message({
          type: "info",
          message: "此字典暂无内容！"
        });
      }
    },
    //二级字典查看内容
    checkDetailsTwo(indexTwo) {
      if (this.secondList[indexTwo].type) {
        this.type = this.secondList[indexTwo].type;
        if (this.type == 0) {
          this.medicalDictDetails = this.secondList[indexTwo].content;
        } else if (this.type == 1) {
          var arr = this.secondList[indexTwo].content.split(",");
          this.ifBoxDetailsImgOne = false;
          this.ifBoxDetailsImgTwo = false;
          this.boxDetailsImgOne = arr[0];
          this.boxDetailsImgTwo = arr[1];
        }
        this.ifDetailsBoxShow = true;
        this.detailsBoxShow = true;
      } else {
        this.$message({
          type: "info",
          message: "此字典暂无内容！"
        });
      }
    },
    //三级字典查看内容
    checkDetailsThree(indexThree) {
      if (this.thirdList[indexThree].type) {
        this.type = this.thirdList[indexThree].type;
        if (this.type == 0) {
          this.medicalDictDetails = this.thirdList[indexThree].content;
        } else if (this.type == 1) {
          var arr = this.thirdList[indexThree].content.split(",");
          this.ifBoxDetailsImgOne = false;
          this.ifBoxDetailsImgTwo = false;
          this.boxDetailsImgOne = arr[0];
          this.boxDetailsImgTwo = arr[1];
        }
        this.ifDetailsBoxShow = true;
        this.detailsBoxShow = true;
      } else {
        this.$message({
          type: "info",
          message: "此字典暂无内容！"
        });
      }
    },
    //查看字典内容详情确定
    detailsBox() {
      this.ifDetailsBoxShow = false;
    },
    //编辑一级字典内容
    celDetailsOne(indexOne) {
      if (this.firstList[indexOne].type) {
        this.type = this.firstList[indexOne].type;
        if (this.type == 0) {
          this.medicalDictDetails = this.firstList[indexOne].content;
        } else if (this.type == 1) {
          if (this.firstList[indexOne].content) {
            var arr = this.firstList[indexOne].content.split(",");
            this.ifBoxDetailsImgOne = false;
            this.ifBoxDetailsImgTwo = false;
            this.boxDetailsImgOne = arr[0];
            this.boxDetailsImgTwo = arr[1];
          } else {
            this.boxDetailsImgOne = "";
            this.boxDetailsImgTwo = "";
          }
        }
      } else {
        this.type = 1;
        this.boxDetailsImgOne = "";
        this.boxDetailsImgTwo = "";
      }
      this.level = 1;
      this.ifDetailsBoxShow = true;
      this.detailsBoxShow = false;
      this.listId = this.firstList[indexOne].id;
    },
    //编辑二级字典内容
    celDetailsTwo(indexTwo) {
      if (this.secondList[indexTwo].dictionaryName === '分享appicon') {
          this.listName = '分享appicon'
          console.log("1")
      } else {
          console.log("2")
      }
      if (this.secondList[indexTwo].type) {
        this.type = this.secondList[indexTwo].type;
        if (this.type == 0) {
          this.medicalDictDetails = this.secondList[indexTwo].content;
        } else if (this.type == 1) {
          if (this.secondList[indexTwo].content) {
            var arr = this.secondList[indexTwo].content.split(",");
            this.ifBoxDetailsImgOne = false;
            this.ifBoxDetailsImgTwo = false;
            this.boxDetailsImgOne = arr[0];
            this.boxDetailsImgTwo = arr[1];
          } else {
            this.boxDetailsImgOne = "";
            this.boxDetailsImgTwo = "";
          }
        }
      } else {
        this.type = 1;
        this.boxDetailsImgOne = "";
        this.boxDetailsImgTwo = "";
      }
      this.level = 2;
      this.ifDetailsBoxShow = true;
      this.detailsBoxShow = false;
      this.listId = this.secondList[indexTwo].id;
    },
    //编辑三级字典内容
    celDetailsThree(indexThree) {
      if (this.thirdList[indexThree].type) {
        this.type = this.thirdList[indexThree].type;
        if (this.type == 0) {
          this.medicalDictDetails = this.thirdList[indexThree].content;
        } else if (this.type == 1) {
          if (this.thirdList[indexThree].content) {
            var arr = this.thirdList[indexThree].content.split(",");
            this.ifBoxDetailsImgOne = false;
            this.ifBoxDetailsImgTwo = false;
            this.boxDetailsImgOne = arr[0];
            this.boxDetailsImgTwo = arr[1];
          } else {
            this.boxDetailsImgOne = "";
            this.boxDetailsImgTwo = "";
          }
        }
      } else {
        this.type = 1;
        this.ifBoxDetailsImgOne = true;
        this.ifBoxDetailsImgTwo = true;
        this.boxDetailsImgOne = "";
        this.boxDetailsImgTwo = "";
      }
      this.level = 3;
      this.ifDetailsBoxShow = true;
      this.detailsBoxShow = false;
      this.listId = this.thirdList[indexThree].id;
    },
    //编辑字典-图片
    BoxImgClick() {
      this.isBoxTrue = true;
      this.type = 1;
    },
    //编辑字典-说明
    BoxFontClick() {
      this.isBoxTrue = false;
      this.type = 0;
    },
    // 选择图片上传
    onFileChangeOne(e) {
      if (this.upImg == true) {
        this.isUpImg = 1;
        var self = this;
        self.isfontimgOne = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          //console.log(fileData);
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
              if (fileData.size > 1048576) {
                this.$message({
                  type: "info",
                  message: "您上传的图片格式或大小不正确，请重新上传！"
                });
                self.isfontimgOne = true;
                return;
              } else {
                self.uploadImage(files[0]);
              }
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      } else {
        this.$message({
          message: "图片上传中请等待！",
          type: "success"
        });
      }
    },
    // 选择图片上传
    onFileChangeTwo(e) {
      if (this.upImg == true) {
        this.isUpImg = 2;
        var self = this;
        self.isfontimgTwo = false;
        var files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
          var fileData = files[0];
          //console.log(fileData);
          // 读取图片数据
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            // 加载图片的真实宽度和高度
            var image = new Image();
            image.onload = function() {
              if (fileData.size > 1048576) {
                this.$message({
                  type: "info",
                  message: "您上传的图片格式或大小不正确，请重新上传！"
                });
                self.isfontimgTwo = true;
                return;
              } else {
                self.uploadImage(files[0]);
              }
            };
            image.src = data;
          };
          reader.readAsDataURL(fileData);
        }
      } else {
        this.$message({
          message: "图片上传中请等待！",
          type: "success"
        });
      }
    },
    // 上传图片
    uploadImage(file) {
      var self = this
      this.upImg = false;
      var formdata = new FormData();
      //console.log(file);   
      if (this.listName == '分享appicon') {
         formdata.append("type", 'appicon');
         formdata.append("module", 'appicon');
      } else if (this.listName != '分享appicon') {
        formdata.append("module", 'medical');
        // console.log("nienf erwf ")
      }   
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");      
      formdata.append("business", "dictionary");  
      
      if (this.uploadImageTrueOrFalse == true) {
        this.uploadImageTrueOrFalse = false;
        this.gethosuploadFile(formdata)
          .then(data => {
            this.uploadImageTrueOrFalse = true;
            //console.log("上传图片", data);
            if (data.code == 200) {
              this.$message({
                message: "上传图片成功",
                type: "success"
              });
              console.log("该成果了")
              if (this.isUpImg == 1) {
                this.isfontimgOne = this.ifBoxDetailsImgOne = false;
                this.boxDetailsImgOne = data.data[0].path;
              } else if (this.isUpImg == 2) {
                this.isfontimgTwo = this.ifBoxDetailsImgTwo = false;
                this.boxDetailsImgTwo = data.data[0].path;
              } else {
                return;
              }
            } else {
              this.$message({
                type: "info",
                message: data.message
              });
            }
            this.upImg = true;
          })
          .catch(msg => {
            this.uploadImageTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //编辑字典内容保存
    celDetailsOk() {
      if (this.type == 1) {
        if (this.boxDetailsImgOne == "" || this.boxDetailsImgTwo == "") {
          if (this.boxDetailsImgOne == "") {
            this.isfontimgOne = true;
          }
          if (this.boxDetailsImgTwo == "") {
            this.isfontimgTwo = true;
          }
        } else {
          this.celContent = this.boxDetailsImgOne + "," + this.boxDetailsImgTwo;
          //console.log("内容", this.celContent, "id::", this.listId);
          this.getupmedical();
        }
      } else if (this.type == 0) {
        var JudgeOne = /^[\s]*$/; //输入不能为空
        if (
          JudgeOne.test(this.medicalDictDetails) ||
          this.addBoxName.medicalDictDetails > 225
        ) {
          this.isredtextarea = true;
        } else {
          this.celContent = this.medicalDictDetails;
          //console.log("内容", this.celContent, "id::", this.listId);
          this.getupmedical();
        }
      }
    },
    //编辑字典内容
    getupmedical() {
      var self = this;
      if (self.getupmedicalTrueOrFalse == true) {
        self.getupmedicalTrueOrFalse = false;
        self
          .getupdateMedicalDictList({
            id: self.listId,
            type: self.type,
            content: self.celContent
          })
          .then(data => {
            self.getupmedicalTrueOrFalse = true;
            //console.log("编辑字典：", data);
            if (data.code == 200) {
              if (self.level == 1) {
                //console.log("一级编辑");
                self.getOneLIst();
              } else if (self.level == 2) {
                //console.log("er级编辑");
                self.firstDictImg = self.OneIndex;
                self.pid = self.firstList[self.OneIndex].id;
                self.level = 2;
                self.getSunList();
              } else if (self.level == 3) {
                self.secondDictImg = self.TwoIndex;
                self.pid = self.secondList[self.TwoIndex].id;
                self.level = 3;
                self.getSunList();
              }
              self.ifDetailsBoxShow = false;
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.getupmedicalTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //一级字典删除
    delOneClick(indexOne) {
      this.isShowdel = false;
      this.delShow = true;
      this.level = 1;
      this.listId = this.firstList[indexOne].id;
    },
    //二级字典删除
    delTwoClick(indexTwo) {
      this.isShowdel = false;
      this.delShow = true;
      this.level = 2;
      this.listId = this.secondList[indexTwo].id;
    },
    //三级字典删除
    delThreeClick(indexThree) {
      this.isShowdel = false;
      this.delShow = true;
      this.level = 3;
      this.listId = this.thirdList[indexThree].id;
    },

    //删除字典
    okCanleClick() {
      var self = this;
      if (self.okCanleClickTrueOrFalse == true) {
        self.okCanleClickTrueOrFalse = false;
        self
          .getdeleteMedicalDict({
            id: self.listId
          })
          .then(data => {
            self.okCanleClickTrueOrFalse = true;
            //console.log("删除字典：", data);
            if (data.code == 200) {
              self.$message({
                type: "success",
                message: "删除成功！"
              });
              if (self.level == 1) {
                self.getOneLIst();
              } else if (self.level == 2) {
                self.firstDictImg = self.OneIndex;
                self.pid = self.firstList[self.OneIndex].id;
                self.level = 2;
                self.getSunList();
              } else if (self.level == 3) {
                self.secondDictImg = self.TwoIndex;
                self.pid = self.secondList[self.TwoIndex].id;
                self.level = 3;
                self.getSunList();
              }
              self.addBoxIf = false;
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okCanleClickTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }

      this.isShowdel = true;
      this.delShow = false;
    },
    //取消删除
    noCanleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //不可排序
    graydownIndexClick() {
      this.$message({
        type: "info",
        message: "最后一位不支持向下排序！"
      });
    },
    grayupIndexClick() {
      this.$message({
        type: "info",
        message: "第一位不支持向上排序！"
      });
    },
    //一级字典向上排序
    upRankClickOne(indexOne) {
      if (indexOne == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        this.level = 1;
        var self = this;
        var ups = [];
        // self.firstList.forEach(function (ele, ind) {
        //     ups.push({ id: ele.id, sort: ele.sort });
        // });
        var oneObj = [];
        var twoObj = [];
        oneObj.push({
          id: self.firstList[indexOne].id,
          sort: self.firstList[indexOne - 1].sort
        });
        twoObj.push({
          id: self.firstList[indexOne - 1].id,
          sort: self.firstList[indexOne].sort
        });
        // ups.splice(indexOne, 1, twoObj[0]);
        // ups.splice(indexOne - 1, 1, oneObj[0]);
        ups.push(oneObj[0]);
        ups.push(twoObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, sort: ele.sort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.sortRank();
      }
    },
    //一级字典向下排序
    downRankClickOne(indexOne) {
      if (indexOne + 1 == this.firstList.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        this.level = 1;
        var self = this;
        var ups = [];
        // self.firstList.forEach(function (ele, ind) {
        //     ups.push({ id: ele.id, sort: ele.sort });
        // });
        var oneObj = [];
        var twoObj = [];
        oneObj.push({
          id: self.firstList[indexOne + 1].id,
          sort: self.firstList[indexOne].sort
        });
        twoObj.push({
          id: self.firstList[indexOne].id,
          sort: self.firstList[indexOne + 1].sort
        });
        // ups.splice(indexOne + 1, 1, twoObj[0]);
        // ups.splice(indexOne, 1, oneObj[0]);
        ups.push(oneObj[0]);
        ups.push(twoObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, sort: ele.sort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.sortRank();
      }
    },
    //二级字典向上排序
    upRankClickTwo(indexTwo) {
      if (indexTwo == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        this.level = 2;
        var self = this;
        var ups = [];
        // self.secondList.forEach(function (ele, ind) {
        //     ups.push({ id: ele.id, sort: ele.sort });
        // });
        var oneObj = [];
        var twoObj = [];
        oneObj.push({
          id: self.secondList[indexTwo].id,
          sort: self.secondList[indexTwo - 1].sort
        });
        twoObj.push({
          id: self.secondList[indexTwo - 1].id,
          sort: self.secondList[indexTwo].sort
        });
        // ups.splice(indexTwo, 1, twoObj[0]);
        // ups.splice(indexTwo - 1, 1, oneObj[0]);
        ups.push(oneObj[0]);
        ups.push(twoObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, sort: ele.sort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.sortRank();
      }
    },
    //二级字典向下排序
    downRankClickTwo(indexTwo) {
      if (indexTwo + 1 == this.secondList.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        this.level = 2;
        var self = this;
        var ups = [];
        // self.secondList.forEach(function (ele, ind) {
        //     ups.push({ id: ele.id, sort: ele.sort });
        // });
        var oneObj = [];
        var twoObj = [];
        oneObj.push({
          id: self.secondList[indexTwo + 1].id,
          sort: self.secondList[indexTwo].sort
        });
        twoObj.push({
          id: self.secondList[indexTwo].id,
          sort: self.secondList[indexTwo + 1].sort
        });
        // ups.splice(indexTwo + 1, 1, twoObj[0]);
        // ups.splice(indexTwo, 1, oneObj[0]);
        ups.push(oneObj[0]);
        ups.push(twoObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, sort: ele.sort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.sortRank();
      }
    },
    //三级字典向上排序
    upRankClickThree(indexThree) {
      if (indexThree == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        this.level = 3;
        var self = this;
        var ups = [];
        // self.thirdList.forEach(function (ele, ind) {
        //     ups.push({ id: ele.id, sort: ele.sort });
        // });
        var oneObj = [];
        var twoObj = [];
        oneObj.push({
          id: self.thirdList[indexThree].id,
          sort: self.thirdList[indexThree - 1].sort
        });
        twoObj.push({
          id: self.thirdList[indexThree - 1].id,
          sort: self.thirdList[indexThree].sort
        });
        // ups.splice(indexThree, 1, twoObj[0]);
        // ups.splice(indexThree - 1, 1, oneObj[0]);
        ups.push(oneObj[0]);
        ups.push(twoObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, sort: ele.sort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.sortRank();
      }
    },
    //三级字典向下排序
    downRankClickThree(indexThree) {
      if (indexThree + 1 == this.thirdList.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        this.level = 3;
        var self = this;
        var ups = [];
        // self.thirdList.forEach(function (ele, ind) {
        //     ups.push({ id: ele.id, sort: ele.sort });
        // });
        var oneObj = [];
        var twoObj = [];
        oneObj.push({
          id: self.thirdList[indexThree + 1].id,
          sort: self.thirdList[indexThree].sort
        });
        twoObj.push({
          id: self.thirdList[indexThree].id,
          sort: self.thirdList[indexThree + 1].sort
        });
        // ups.splice(indexThree + 1, 1, twoObj[0]);
        // ups.splice(indexThree, 1, oneObj[0]);
        ups.push(oneObj[0]);
        ups.push(twoObj[0]);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, sort: ele.sort });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        self.sortRank();
      }
    },
    // 排序接口
    sortRank() {
      var self = this;
      if (self.sortRankTrueOrFalse == true) {
        self.sortRankTrueOrFalse = false;
        self
          .getupdateSortMedicalDict({
            medicalDictionaryJson: self.objstr
          })
          .then(data => {
            self.sortRankTrueOrFalse = true;
            //console.log("排序", data);
            if (data.code == 200) {
              if (self.level == 1) {
                self.getOneLIst();
              } else if (self.level == 2) {
                self.firstDictImg = self.OneIndex;
                self.pid = self.firstList[self.OneIndex].id;
                self.level = 2;
                self.getSunList();
              } else if (self.level == 3) {
                self.secondDictImg = self.TwoIndex;
                self.pid = self.secondList[self.TwoIndex].id;
                self.level = 3;
                self.getSunList();
              }
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.sortRankTrueOrFalse = true;
            //console.log(msg);
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    ...mapActions([
      "getupdateSortMedicalDict",
      "getdeleteMedicalDict",
      "gethosuploadFile",
      "getupdateMedicalDictList",
      "getaddMedicalDictList",
      "getpagingDictionary",
      "getfindMedicalByPidAndLevel"
    ])
  },
  // 监视
  watch: {
    addBoxName: function() {
      this.isredBoxName = false;
    },
    medicalDictDetails: function() {
      this.isredtextarea = false;
    },
    addBoxSortModel: function() {
      this.isredBoxSort = false;
    }
  }
};
</script>
<style scoped>
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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000000;
}

.showdel {
  display: none;
}

.addBoxNav {
  margin: 24px 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #5acdfa;
  font-size: 20px;
  border-bottom: 1px solid #5acdfa;
}

.addBoxInp {
  margin-top: 8px;
  display: flex;
  padding-left: 100px;
  height: 32px;
  line-height: 32px;
}

.addBoxInp input {
  height: 32px;
  width: 250px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 4px;
}

.addBoxInp > div:nth-child(1) {
  width: 70px;
  text-align: right;
}

.addBoxInp > div:nth-child(2) {
  margin-left: 14px;
}

.redBor {
  border: 1px solid #fe5371 !important;
}

/* .redFont {
        margin: 8px 0 8px 190px;
        height: 20px;
        font-size: 12px;
        color: #fe5371;
    } */

.addBoxBut {
  display: flex;
  margin: 30px auto;
  width: 200px;
  height: 32px;
  justify-content: space-between;
}

.addBoxBut > div {
  width: 70px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: white;
}

.addBoxBut > div:nth-child(1) {
  background: #5acdfa;
}

.addBoxBut > div:nth-child(2) {
  background: #9e9e9e;
}

/*主页*/

.medicalDict {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 150px;
}

.medicalDict > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
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

.listMedical {
  margin-top: 24px;
}

.headline,
.firstDict,
.secondDict,
.thirdlyDict {
  overflow: hidden;
}

.firstDict > div,
.secondDict > div,
.thirdlyDict > div {
  float: left;
  height: 48px;
  line-height: 48px;
}

.firstDict:hover,
.secondDict:hover,
.thirdlyDict:hover {
  background: #f0f0f0;
}

.headline > div {
  float: left;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background: #f2f4f8;
}

.headline {
  border: 1px solid #d1d1d1;
}

.firstLiMedical {
  border-left: 1px solid #d1d1d1;
  border-right: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
}

.divOne {
  width: 22%;
  border-right: 1px solid #d1d1d1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.divOne span {
  display: inline-block;
  padding-right: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.rankName {
  cursor: pointer;
}

.rankName img {
  width: 15px;
  height: 15px;
  margin: 13px 5px 16px 0;
}

.stairName {
  padding-left: 10%;
}

.secondLevel {
  padding-left: 15%;
}

.threeLevel {
  padding-left: 35%;
}

.divTwo {
  width: 12%;
  text-align: center;
  border-right: 1px solid #d1d1d1;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 7px;
}

.divThree {
  width: 8%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: 1px solid #d1d1d1;
}

.divStor {
  width: 8%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: 1px solid #d1d1d1;
}

.divfour {
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #d1d1d1;
}

.divfour img {
  margin: 0 10px;
  cursor: pointer;
}

.divfive {
  width: 14%;
  border-right: 1px solid #d1d1d1;
}

.divsix {
  text-align: center;
  width: 18%;
}

.handleImg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.handleImg img {
  margin: 0 10px;
  cursor: pointer;
}

.detailsBoxCss {
  width: 525px;
  height: 360px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 5px 5px 20px #eaeaea;
  border-radius: 7px;
  margin: calc((100vh - 380px) / 2) auto;
  z-index: 100000;
}

.detailsBoxBut {
  height: 32px;
  width: 320px;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
}

.butColor {
  background: #5acdfa !important;
}

.detailsBoxBut > div {
  height: 32px;
  width: 100px;
  line-height: 32px;
  text-align: center;
  background: #c7c7c7;
  position: relative;
  margin: 0 15px;
  border-radius: 4px;
}

.cursorpointer {
  cursor: pointer;
}

.detailsBoxTrue {
  width: 10px;
  height: 17px;
  transform: rotate(45deg);
  border-right: 2px solid rgb(247, 86, 86);
  border-bottom: 2px solid #fe5371;
  position: absolute;
  top: 4px;
  right: 12px;
}

.boxDetails,
.celBoxDetails {
  height: 160px;
  width: 340px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boxDetails img {
  width: 140px;
  height: 140px;
  margin: 0 15px;
}

.celBoxDetails > div {
  width: 140px;
  height: 160px;
  margin: 0 15px;
  overflow: hidden;
}

.celBoxDetails img {
  width: 138px;
  height: 138px;
}

.celBoxDetails > div {
  position: relative;
}

.celBoxDetails label {
  width: 140px;
  height: 140px;
  position: absolute;
  top: 0;
  left: 0;
}

.celBoxDetails span {
  font-size: 12px;
}

.redfont {
  color: #fe5371 !important;
}

.imgbor {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
}

#upfileOne,
#upfileTwo {
  display: none;
}

.boxDetailsFont {
  height: 140px;
  width: 340px;
  margin: 10px auto;
  line-height: 26px;
}

.boxDetailsFont textarea {
  height: 140px;
  width: 320px;
  resize: none;
  padding-left: 4px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
}

.detailsBut {
  display: flex;
  margin: 10px auto;
  width: 200px;
  height: 32px;
  justify-content: center;
}

.detailsBut > div {
  width: 70px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: white;
  margin: 0 15px;
}

.detailsBut > div:nth-child(1) {
  background: #5acdfa;
}

.detailsBut > div:nth-child(2) {
  background: #5acdfa;
}

.detailsBut > div:nth-child(3) {
  background: #9e9e9e;
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
</style>