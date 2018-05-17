<!--商品中心-商品类目-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="category">
        <div class="listTitle">
            <div>
                商品中心-商品类目
            </div>
            <div @click="addClassify">
                新建分类
            </div>
        </div>
        <!-- 列表 -->
        <div class="list" v-loading="loading">
            <div class="listCont">
                <ul>
                    <li class="firstLi">
                        <div class="ClassifyOne">
                            分类名称
                        </div>
                        <div class="ClassifyTwo">
                            分类图片
                        </div>
                        <div class="ClassifyThree">
                            分类级别
                        </div>
                        <div class="Classifyfour">
                            商品数量
                        </div>
                        <div class="ClassifyfiveHead">
                            显示
                        </div>
                        <div class="ClassifysixHead">
                            排序
                        </div>
                        <div class="ClassifysevenHead">
                            操作
                        </div>
                    </li>
                    <li class="dataLi" v-for="(itme,indexOne) in firstClassifyLIst">
                        <div class="firstClassify">
                            <div class="rankClick ClassifyOne">
                                <span @click="firstClassifyClick(indexOne)">
                                    <img v-if="firstClassifyImg == indexOne" src="/static/img/arrowsB.jpg" alt="展开着的" title="展开着的">
                                    <img v-else src="/static/img/arrowsR.jpg" alt="收起着的" title="收起着的"> {{itme.name}}
                                </span>
                            </div>
                            <div class="ClassifyTwo">
                            </div>
                            <div class="ClassifyThree">
                                一级
                            </div>
                            <div class="Classifyfour">
                                商品数量
                            </div>
                            <div class="Classifyfive">
                                <img v-show="itme.isShow == 1" src="/static/img/blue.png" alt="开着的" title="开着的" @click="oneShowClick(indexOne)">
                                <img v-show="itme.isShow == 2" src="/static/img/closeBlue.png" alt="关着的" title="关着的" @click="oneShowClick(indexOne)">
                            </div>
                            <div class="Classifysix">
                                <div>
                                    <img @click="grayupIndexClick" v-show="indexOne == 0" src="/static/img/grayup.png" alt="不可排序" title="不可排序">
                                    <img @click="upRankOneClick(indexOne)" v-show="indexOne != 0" src="/static/img/up.png" alt="向上排序" title="向上排序">
                                </div>
                                <div>
                                    <img @click="downRankOneClick(indexOne,'down')" v-show="indexOne != firstClassifyLIst.length - 1" src="/static/img/down.png"
                                        alt="向下排序" title="向下排序">
                                    <img @click="graydownIndexClick" v-show="indexOne == firstClassifyLIst.length - 1" src="/static/img/graydown.png" alt="不可排序"
                                        title="不可排序">
                                </div>
                            </div>
                            <div class="Classifyseven">
                                <div>
                                    <img @click="oneClassifyClick(indexOne)" src="/static/img/tianjia.jpg" alt="添加二级分类" title="添加二级分类">
                                </div>
                                <div>
                                    <img @click="amendClickOne(indexOne)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                </div>
                                <div>
                                    <img @click="oneDeleteClick(indexOne)" src="/static/img/删除.png" alt="删除" title="删除">
                                </div>
                            </div>
                        </div>
                        <div v-show="residueClassifyShow == indexOne" v-for="(itmeTwo,indexTwo) in secondClassifyLIst" class="residueClassify">
                            <div class="secondClassify">
                                <div class="rankClick ClassifyOne">
                                    <span @click="secondClassifyClick(indexTwo)">
                                        <img v-if="secondClassifyImg == indexTwo" src="/static/img/arrowsB.jpg" alt="展开着的" title="展开着的">
                                        <img v-else src="/static/img/arrowsR.jpg" alt="收起着的" title="收起着的"> {{itmeTwo.name}}
                                    </span>
                                </div>
                                <div class="ClassifyTwo">
                                </div>
                                <div class="ClassifyThree">
                                    二级
                                </div>
                                <div class="Classifyfour">
                                    数量
                                </div>
                                <div class="Classifyfive">
                                    <img v-show="itmeTwo.isShow == 1" src="/static/img/blue.png" alt="开着的" title="开着的" @click="twoShowClick(indexTwo)">
                                    <img v-show="itmeTwo.isShow == 2" src="/static/img/closeBlue.png" alt="关着的" title="关着的" @click="twoShowClick(indexTwo)">
                                </div>
                                <div class="Classifysix">
                                    <div>
                                        <img @click="grayupIndexClick" v-show="indexTwo == 0" src="/static/img/grayup.png" alt="不可排序" title="不可排序">
                                        <img @click="upRankTwoClick(indexTwo)" v-show="indexTwo != 0" src="/static/img/up.png" alt="向上排序" title="向上排序">
                                    </div>
                                    <div>
                                        <img @click="downRankTwoClick(indexTwo)" v-show="indexTwo != secondClassifyLIst.length - 1" src="/static/img/down.png" alt="不可排序"
                                            title="不可排序">
                                        <img @click="graydownIndexClick" v-show="indexTwo == secondClassifyLIst.length - 1" src="/static/img/graydown.png" alt="向下排序"
                                            title="向下排序">
                                    </div>
                                </div>
                                <div class="Classifyseven">
                                    <div>
                                        <img @click="twoClassifyClick(indexTwo)" src="/static/img/tianjia.jpg" alt="添加三级分类" title="添加三级分类">
                                    </div>
                                    <div>
                                        <img @click="amendClickTwo(indexTwo)" src="/static/img/编辑.png" alt="编辑" title="编辑">
                                    </div>
                                    <div>
                                        <img @click="twoDeleteClick(indexTwo)" src="/static/img/删除.png" alt="删除" title="删除">
                                    </div>
                                </div>
                            </div>
                            <div v-show="thirdlyClassifyShow == indexTwo" class="thirdlyClassify" v-for="(itmeThree,indexThree) in thirdlyClassifyLIst">
                                <div class="ClassifyOne">
                                    {{itmeThree.name}}
                                </div>
                                <div class="ClassifyTwo addImg">
                                    <div @click="uploadImg(indexThree)">
                                        <img v-show="itmeThree.imageSrc != null" :src="itmeThree.imageSrc" alt="图片" title="图片">
                                    </div>
                                </div>
                                <div class="ClassifyThree">
                                    三级
                                </div>
                                <div class="Classifyfour">
                                    数量
                                </div>
                                <div class="Classifyfive">
                                    <img v-show="itmeThree.isShow == 1" src="/static/img/blue.png" alt="开着的" title="开着的" @click="threeShowClick(indexThree)">
                                    <img v-show="itmeThree.isShow == 2" src="/static/img/closeBlue.png" alt="关着的" title="关着的" @click="threeShowClick(indexThree)">
                                </div>
                                <div class="Classifysix">
                                    <div>
                                        <img @click="grayupIndexClick" v-show="indexThree == 0" src="/static/img/grayup.png" alt="不可排序" title="不可排序">
                                        <img @click="upRankThreeClick(indexThree)" v-show="indexThree != 0" src="/static/img/up.png" alt="向上排序" title="向上排序">
                                    </div>
                                    <div>
                                        <img @click="downRankThreeClick(indexThree)" v-show="indexThree != thirdlyClassifyLIst.length - 1" src="/static/img/down.png"
                                            alt="向下排序" title="向下排序">
                                        <img @click="graydownIndexClick" v-show="indexThree == thirdlyClassifyLIst.length - 1" src="/static/img/graydown.png" alt="不可排序"
                                            title="不可排序">
                                    </div>
                                </div>
                                <div class="Classifyseven">
                                    <div></div>
                                    <div>
                                        <img @click="amendClickThree(indexThree)" alt="编辑" title="编辑" src="/static/img/编辑.png">
                                    </div>
                                    <div>
                                        <img @click="threeDeleteClick(indexThree)" alt="删除" title="删除" src="/static/img/删除.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- 暂无数据 -->
                    <li class="noList" v-show="firstClassifyLIst.length == 0">
                        <div>
                            <img src="/static/img/w.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--新增分类弹出框-->
        <div :class="{delPopup:isCompile,showdel:isShowCompile}">
            <div class="delContent" v-show="ComShow">
                <div class="delImg">
                    新增分类
                </div>
                <div class="delCont">
                    <span>分类名称：</span>
                    <input type="text" maxlength="8" v-model="Compilename">
                    <span v-show="CompilenameGray" class="grayFont">限制8个字符</span>
                    <span v-show="CompilenameRed" class="redFont">请输入</span>
                    <span v-show="CompilenameRedIf" class="redFont">有非法字符，请重新输入</span>
                </div>
                <div class="delope">
                    <div @click="addClassifyOk">
                        确定
                    </div>
                    <div @click="canleClassify">
                        取消
                    </div>
                </div>
            </div>
        </div>
        <!--编辑弹出框-->
        <div :class="{delPopup:isEdit,showdel:isShowEdit}">
            <div class="delContent" v-show="editShow">
                <div class="delImg">
                    <div>
                        分类编辑
                    </div>
                </div>
                <div class="delCont">
                    <span>分类名称：</span>
                    <input type="text" maxlength="8" v-model="editName">
                    <span v-if="editShowName" class="grayFont">最多输入8个字符</span>
                    <span v-else class="redFont">修改不能为空</span>
                </div>
                <div class="delope">
                    <div @click="okEditClick">
                        确定
                    </div>
                    <div @click="noEditClick">
                        取消
                    </div>
                </div>
            </div>
        </div>
        <!--三级分类添加/修改图片弹出框-->
        <div :class="{delPopup:isEdit,showdel:isShowEditImg}">
            <div class="delContent" v-show="editShowImg">
                <div class="imgUploadA">
                    <div>
                        <div>图片：</div>
                        <div>
                            <img :src="imgupload" alt="">
                        </div>
                        <label for="upfile">
                            上传
                        </label>
                        <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange($event,ind)">
                    </div>
                </div>
                <div class="imgUploadB">
                    <span class="grayFont">图片尺寸为600*600，大小不能超过200KB</span>
                </div>
                <div class="delope">
                    <div @click="compileImg">
                        确定
                    </div>
                    <div @click="cancelImgClick">
                        取消
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除弹出框 -->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okCanleClick" @canle="noCanleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import hosdel from "../../cModule/newdel";
export default {
  components: {
    "v-hosdel": hosdel
  },
  data() {
    return {
      sectionNumber: [{ key: "0" }, { key: "1" }, { key: "2" }, { key: "3" }],
      firstClassifyLIst: [],
      secondClassifyLIst: [],
      thirdlyClassifyLIst: [],
      residueClassifyShow: -1,
      thirdlyClassifyShow: -1,
      firstClassifyImg: -1,
      secondClassifyImg: -1,
      Compilename: "",
      isEdit: true,
      isShowEdit: true,
      isShowEditImg: true,
      editShow: false,
      editShowImg: false,
      editName: "",
      isCompile: true,
      isdelPopup: true,
      isShowdel: true,
      titlename: "分类",
      isShowCompile: true,
      delShow: false,
      ComShow: false,
      addClassifyId: "",
      addClassifyIdOne: "",
      addClassifyIdTwo: "",
      addClassifyLevel: "",
      mainPicuter: "",
      classifyShow: "",
      classifyId: "",
      classifyRank: "",
      threeIndexImg: "",
      loading: false,
      CompilenameGray: true,
      CompilenameRed: false,
      CompilenameRedIf: false,
      CompilenameIf: false,
      deleteClassifyId: "",
      showIndexOne: "",
      showIndexTwo: "",
      showIndexThree: "",
      editClassifyID: "",
      editIndexThree: "",
      editIndexTwo: "",
      deleteIdTwo: "",
      deleteIdOne: "",
      classifyRankDelete: "",
      editShowName: true,
      editShowNameIf: false,
      addIndexOne: "",
      addIndexTwo: "",
      imgupload: "/static/img/uploadtwo.jpg",
      objstr: [],
      classifysort: "",
      batchUpdateRankTrue: false,
      okCanleClickTrue: false,
      compileImgTrue: false,
      addClassifyOkTrue: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
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
            if (one.name == "商品中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("commodity") == -1) {
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
        if (comms.indexOf("reartype") == -1) {
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
          self.getClassfyOne();
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
    //新建分类
    addClassify() {
      this.$router.push({
        path: "/store/commodity/reartypeAdd"
      });
    },
    //获取一级分类
    getClassfyOne() {
      var self = this;
      self.loading = true;
      self
        .getClassfyListFirst({
          level: 1
        })
        .then(data => {
          self.loading = false;
          //   console.log("分类一级列表", data);
          if (data.code == 200) {
            self.loading = false;
            if (data.data) {
              self.firstClassifyLIst = data.data;
              if (self.firstClassifyLIst.length == 0) {
                self.nodata = true;
              } else {
                self.nodata = false;
              }
            } else {
              self.nodata = true;
              self.$message({
                type: "info",
                message: "暂无数据！"
              });
            }
          } else {
            self.$message({
              type: "info",
              message: data.message
            });
            self.loading = false;
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器错误"
          });
          self.nodata = true;
          self.loading = false;
        });
    },
    //一级分类点击
    firstClassifyClick(indexOne) {
      this.deleteIdOne = this.firstClassifyLIst[indexOne].id;
      if (this.firstClassifyLIst[indexOne].isShow == 1) {
        this.secondClassifyLIst = [];
        this.thirdlyClassifyLIst = [];
        this.thirdlyClassifyShow = -1;
        this.secondClassifyImg = -1;
        if (this.residueClassifyShow == indexOne) {
          this.residueClassifyShow = -1;
          this.firstClassifyImg = -1;
        } else {
          var self = this;
          self
            .getClassfyListFirst({
              pid: self.firstClassifyLIst[indexOne].id
            })
            .then(data => {
              //   console.log("分类二级列表", data);
              if (data.code == 200) {
                self.secondClassifyLIst = data.data;
                if (self.secondClassifyLIst.length == 0) {
                  this.residueClassifyShow = -1;
                  this.firstClassifyImg = -1;
                  self.$message({
                    type: "info",
                    message: "此一级列表下暂无二级列表！"
                  });
                } else if (self.secondClassifyLIst.length > 0) {
                  this.residueClassifyShow = indexOne;
                  this.firstClassifyImg = indexOne;
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
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        }
      } else {
        this.$message({
          type: "info",
          message: "需要显示后才能操作！"
        });
      }
    },
    //二级分类点击
    secondClassifyClick(indexTwo) {
      this.deleteIdTwo = this.secondClassifyLIst[indexTwo].id;
      if (this.secondClassifyLIst[indexTwo].isShow == 1) {
        this.thirdlyClassifyLIst = [];
        if (this.thirdlyClassifyShow == indexTwo) {
          this.thirdlyClassifyShow = -1;
          this.secondClassifyImg = -1;
        } else {
          this.thirdlyClassifyShow = indexTwo;
          var self = this;
          self
            .getClassfyListFirst({
              pid: self.secondClassifyLIst[indexTwo].id
            })
            .then(data => {
              //   console.log("分类三级列表", data);
              if (data.code == 200) {
                self.thirdlyClassifyLIst = data.data;
                if (self.thirdlyClassifyLIst.length == 0) {
                  this.thirdlyClassifyShow = -1;
                  this.secondClassifyImg = -1;
                  self.$message({
                    type: "info",
                    message: "此二级列表下暂无三级列表！"
                  });
                } else if (self.thirdlyClassifyLIst.length > 0) {
                  this.secondClassifyImg = indexTwo;
                  this.thirdlyClassifyShow = indexTwo;
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
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        }
      } else {
        this.$message({
          type: "info",
          message: "需要显示后才能操作！"
        });
      }
    },
    //一级新增二级分类
    oneClassifyClick(indexOne) {
      this.addIndexOne = indexOne;
      this.deleteIdOne = this.firstClassifyLIst[indexOne].id;
      if (this.firstClassifyLIst[indexOne].isShow == 1) {
        var self = this;
        self
          .getClassfyListFirst({
            pid: self.firstClassifyLIst[indexOne].id
          })
          .then(data => {
            // console.log("分类二级列表", data);
            if (data.code == 200) {
              self.secondClassifyLIst = data.data;
              if (self.secondClassifyLIst.length == 0) {
                self.$message({
                  type: "info",
                  message: "此一级列表下暂无二级列表！"
                });
              } else {
                this.residueClassifyShow = indexOne;
                this.firstClassifyImg = indexOne;
                this.thirdlyClassifyShow = -1;
                this.secondClassifyImg = -1;
              }
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
              message: "服务器错误"
            });
          });
        this.isShowCompile = false;
        this.ComShow = true;
        this.addClassifyLevel = "2";
        this.Compilename = "";
        this.addClassifyId = this.firstClassifyLIst[indexOne].id;
        this.addClassifyIdOne = this.firstClassifyLIst[indexOne].id;
      } else {
        this.$message({
          type: "info",
          message: "需要显示后才能操作！"
        });
      }
    },
    //二级新增三级分类
    twoClassifyClick(indexTwo) {
      this.addIndexTwo = indexTwo;
      this.deleteIdTwo = this.secondClassifyLIst[indexTwo].id;
      if (this.secondClassifyLIst[indexTwo].isShow == 1) {
        var self = this;
        self
          .getClassfyListFirst({
            pid: self.secondClassifyLIst[indexTwo].id
          })
          .then(data => {
            // console.log("分类三级列表", data);
            if (data.code == 200) {
              self.thirdlyClassifyLIst = data.data;
              if (self.thirdlyClassifyLIst.length == 0) {
                self.$message({
                  type: "info",
                  message: "此二级列表下暂无三级列表！"
                });
              } else {
                this.thirdlyClassifyShow = indexTwo;
                this.secondClassifyImg = indexTwo;
              }
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
              message: "服务器错误"
            });
          });
        this.isShowCompile = false;
        this.ComShow = true;
        this.addClassifyLevel = "3";
        this.Compilename = "";
        this.addClassifyId = this.secondClassifyLIst[indexTwo].id;
        this.addClassifyIdTwo = this.secondClassifyLIst[indexTwo].id;
      } else {
        this.$message({
          type: "info",
          message: "需要显示后才能操作！"
        });
      }
    },
    //判断新增分类名称
    panduan() {
      var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
      if (regTwo.test(this.Compilename)) {
        this.CompilenameRed = this.CompilenameGray = false;
        this.CompilenameRedIf = true;
        return false;
      }
    },
    //新增分类弹出框确定
    addClassifyOk() {
      var self = this;
      if (this.CompilenameIf == false) {
        this.CompilenameRed = true;
        this.CompilenameRedIf = false;
        this.CompilenameGray = false;
      } else {
        if (self.addClassifyOkTrue == false) {
          self.addClassifyOkTrue = true;
          if (self.panduan() == false) {
            return;
          } else {
            self
              .getreartypeAddClassify({
                name: self.Compilename,
                parentId: self.addClassifyId,
                isShow: "1",
                level: self.addClassifyLevel
              })
              .then(data => {
                self.addClassifyOkTrue = false;
                if (data.code == 200) {
                  //****************************判断新增的是几级分类**********************************
                  if (self.addClassifyLevel == 2) {
                    self
                      .getClassfyListFirst({
                        pid: self.addClassifyIdOne
                      })
                      .then(data => {
                        //   console.log("新增分类二级列表", data);
                        if (data.code == 200) {
                          self.secondClassifyLIst = data.data;
                          self.residueClassifyShow = self.addIndexOne;
                          self.firstClassifyImg = self.addIndexOne;
                        } else {
                          self.$message({
                            type: "info",
                            message: data.message
                          });
                        }
                      })
                      .catch(msg => {
                        //   console.log(msg);
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
                      });
                  } else if (self.addClassifyLevel == 3) {
                    self
                      .getClassfyListFirst({
                        pid: self.addClassifyIdTwo
                      })
                      .then(data => {
                        //   console.log("新增分类三级级列表", data);
                        if (data.code == 200) {
                          self.thirdlyClassifyLIst = data.data;
                          self.thirdlyClassifyShow = self.addIndexTwo;
                          self.secondClassifyImg = self.addIndexTwo;
                        } else {
                          self.$message({
                            type: "info",
                            message: data.message
                          });
                        }
                      })
                      .catch(msg => {
                        //   console.log(msg);
                        self.$message({
                          type: "info",
                          message: "服务器错误"
                        });
                      });
                  }
                  //****************************************************************
                  self.$message({
                    message: "操作成功！",
                    type: "success"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.message
                  });
                }
              })
              .catch(msg => {
                self.addClassifyOkTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器错误"
                });
              });
            self.isShowCompile = true;
            self.ComShow = false;
          }
        }
      }
    },
    //新增分类弹出框取消
    canleClassify() {
      this.isShowCompile = true;
      this.ComShow = false;
      if (this.addClassifyLevel == 2) {
        this.residueClassifyShow = -1;
        this.firstClassifyImg = -1;
      } else if (this.addClassifyLevel == 3) {
        this.thirdlyClassifyShow = -1;
        this.secondClassifyImg = -1;
      }
    },
    //上传图片弹出框
    uploadImg(indexThree) {
      this.ind = indexThree;
      this.threeIndexImg = indexThree;
      this.isShowEditImg = false;
      this.editShowImg = true;
      if (this.thirdlyClassifyLIst[indexThree].imageSrc == null) {
        this.imgupload = "/static/img/uploadtwo.jpg";
      } else {
        this.mainPicuter = this.thirdlyClassifyLIst[indexThree].imageSrc;
        this.imgupload = this.thirdlyClassifyLIst[indexThree].imageSrc;
      }
    },
    //取消上传图片弹出框
    cancelImgClick() {
      this.imgupload = "/static/img/uploadtwo.jpg";
      this.isShowEditImg = true;
      this.editShowImg = false;
      this.mainPicuter = "";
    },
    // 选择图片上传
    onFileChange($event, ind) {
      var self = this;
      this.threeClassifyImgId = this.thirdlyClassifyLIst[ind].id;
      var files = $event.target.files || $event.dataTransfer.files;
      if (files[0]) {
        var fileData = files[0];
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function($event) {
          var data = $event.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            if (fileData.size == 204800) {
              self.$message({
                type: "info",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              document.getElementById("upfile").value = "";
              return;
            } else if (image.width !== 600) {
              self.$message({
                type: "info",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              document.getElementById("upfile").value = "";
              return;
            } else if (image.height !== 600) {
              self.$message({
                type: "info",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              document.getElementById("upfile").value = "";
              return;
            }
            self.uploadImage(files[0]);
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    // 上传图片
    uploadImage(file) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "mall");
      formdata.append("business", "classfication");
      formdata.append("token", TOKEN);
      self
        .getstorechannelManagementselectChanneluploadFile(formdata)
        .then(data => {
          //   console.log("上传图片", data);
          if (data.code == 200) {
            self.$message({
              message: "选择图片成功！",
              type: "success"
            });
            self.imgupload = data.data[0].path;
            self.mainPicuter = data.data[0].path;
            document.getElementById("upfile").value = "";
          } else {
            self.$message("出错了！~");
          }
        });
    },
    //修改/新增图片
    compileImg() {
      var self = this;
      if (self.compileImgTrue == false) {
        self.compileImgTrue = true;
        if (this.mainPicuter) {
          self
            .getreartypeCompileClassify({
              id: self.threeClassifyImgId,
              imageSrc: self.mainPicuter
            })
            .then(data => {
              self.compileImgTrue = false;
              if (data.code == 200) {
                self.thirdlyClassifyLIst[this.threeIndexImg].imageSrc =
                  self.mainPicuter;
                this.$message({
                  message: "上传图片成功！",
                  type: "success"
                });
                this.isShowEditImg = true;
                this.editShowImg = false;
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.compileImgTrue = false;
              self.$message({
                type: "info",
                message: "服务器错误"
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "请添加图片！"
          });
        }
      }
    },
    //一级是否显示
    oneShowClick(indexOne) {
      this.showIndexOne = indexOne;
      this.classifyId = this.firstClassifyLIst[indexOne].id;
      this.classifyRank = 1;
      if (this.firstClassifyLIst[indexOne].isShow == 1) {
        this.classifyShow = 2;
      } else if (this.firstClassifyLIst[indexOne].isShow == 2) {
        this.classifyShow = 1;
      }
      this.classifyIsShow();
    },
    //二级是否显示
    twoShowClick(indexTwo) {
      this.showIndexTwo = indexTwo;
      this.classifyId = this.secondClassifyLIst[indexTwo].id;
      this.classifyRank = 2;
      if (this.secondClassifyLIst[indexTwo].isShow == 1) {
        this.classifyShow = 2;
      } else if (this.secondClassifyLIst[indexTwo].isShow == 2) {
        this.classifyShow = 1;
      }
      this.classifyIsShow();
    },
    //三级是否显示
    threeShowClick(indexThree) {
      this.showIndexThree = indexThree;
      this.classifyId = this.thirdlyClassifyLIst[indexThree].id;
      this.classifyRank = 3;
      if (this.thirdlyClassifyLIst[indexThree].isShow == 1) {
        this.classifyShow = 2;
      } else if (this.thirdlyClassifyLIst[indexThree].isShow == 2) {
        this.classifyShow = 1;
      }
      this.classifyIsShow();
    },
    //是否显示接口
    classifyIsShow() {
      var self = this;
      self
        .getreartypeCompileClassify({
          id: this.classifyId,
          isShow: this.classifyShow,
          level: this.classifyRank
        })
        .then(data => {
          //   console.log("新增分类", data);
          if (data.code == 200) {
            //*******************判断开关是几级的**************************
            //一级开关
            if (this.classifyRank == 1) {
              if (this.firstClassifyLIst[this.showIndexOne].isShow == 1) {
                this.firstClassifyLIst[this.showIndexOne].isShow = 2;
                this.residueClassifyShow = -1;
                this.firstClassifyImg = -1;
                this.thirdlyClassifyShow = -1;
                this.secondClassifyImg = -1;
                var self = this;
                for (var i = 0; i < self.secondClassifyLIst.length; i++) {
                  self.secondClassifyLIst[i].isShow = 2;
                }
                for (var i = 0; i < self.thirdlyClassifyLIst.length; i++) {
                  self.thirdlyClassifyLIst[i].isShow = 2;
                }
              } else if (
                this.firstClassifyLIst[this.showIndexOne].isShow == 2
              ) {
                this.firstClassifyLIst[this.showIndexOne].isShow = 1;
              }
              //二级开关
            } else if (this.classifyRank == 2) {
              if (this.secondClassifyLIst[this.showIndexTwo].isShow == 1) {
                this.secondClassifyLIst[this.showIndexTwo].isShow = 2;
                this.thirdlyClassifyShow = -1;
                this.secondClassifyImg = -1;
                var self = this;
                for (var i = 0; i < self.thirdlyClassifyLIst.length; i++) {
                  self.thirdlyClassifyLIst[i].isShow = 2;
                }
              } else if (
                this.secondClassifyLIst[this.showIndexTwo].isShow == 2
              ) {
                this.secondClassifyLIst[this.showIndexTwo].isShow = 1;
              }
              //三级开关
            } else if (this.classifyRank == 3) {
              if (this.thirdlyClassifyLIst[this.showIndexThree].isShow == 1) {
                this.thirdlyClassifyLIst[this.showIndexThree].isShow = 2;
              } else if (
                this.thirdlyClassifyLIst[this.showIndexThree].isShow == 2
              ) {
                this.thirdlyClassifyLIst[this.showIndexThree].isShow = 1;
              }
            }
            //***********************************************************
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          } else {
            this.$message({
              type: "info",
              message: data.message
            });
          }
        })
        .catch(msg => {
          //   console.log(msg);
          self.$message({
            type: "info",
            message: "服务器错误"
          });
        });
    },
    //一级分类删除
    oneDeleteClick(indexOne) {
      this.deleteClassifyId = this.firstClassifyLIst[indexOne].id;
      this.classifyRankDelete = 1;
      this.isShowdel = false;
      this.delShow = true;
    },
    //二级分类删除
    twoDeleteClick(indexTwo) {
      this.deleteClassifyId = this.secondClassifyLIst[indexTwo].id;
      this.classifyRankDelete = 2;
      this.isShowdel = false;
      this.delShow = true;
    },
    //三级分类删除
    threeDeleteClick(indexThree) {
      this.deleteClassifyId = this.thirdlyClassifyLIst[indexThree].id;
      this.classifyRankDelete = 3;
      this.isShowdel = false;
      this.delShow = true;
    },
    //确认删除
    okCanleClick() {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      if (self.okCanleClickTrue == false) {
        self.okCanleClickTrue = true;
        self
          .getreartypeDeleteClassify({
            id: self.deleteClassifyId,
            token: TOKEN
            // leve: this.classifyRankDelete,
          })
          .then(data => {
            self.okCanleClickTrue = false;
            if (data.code == 200) {
              if (self.classifyRankDelete == 1) {
                self.residueClassifyShow = -1;
                self.firstClassifyImg = -1;
                self.thirdlyClassifyShow = -1;
                self.secondClassifyImg = -1;
                self.getClassfyOne();
                //二级分类删除
              } else if (self.classifyRankDelete == 2) {
                self
                  .getClassfyListFirst({
                    pid: self.deleteIdOne
                  })
                  .then(data => {
                    //   console.log("分类二级列表", data);
                    if (data.code == 200) {
                      self.secondClassifyLIst = [];
                      self.secondClassifyLIst = data.data;
                      self.thirdlyClassifyShow = -1;
                      self.secondClassifyImg = -1;
                      if (self.secondClassifyLIst.length == 0) {
                        self.residueClassifyShow = -1;
                        self.firstClassifyImg = -1;
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
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
                //三级分类删除
              } else if (self.classifyRankDelete == 3) {
                self
                  .getClassfyListFirst({
                    pid: self.deleteIdTwo
                  })
                  .then(data => {
                    //   console.log("分类三级列表", data);
                    if (data.code == 200) {
                      self.thirdlyClassifyLIst = [];
                      self.thirdlyClassifyLIst = data.data;
                      if (self.thirdlyClassifyLIst.length == 0) {
                        self.thirdlyClassifyShow = -1;
                        self.secondClassifyImg = -1;
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
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              }
              //*************************************************************************
              self.$message({
                message: "删除成功",
                type: "success"
              });
            } else if (data.code == 605) {
              self.$message({
                type: "info",
                message: "该分类关联商品不可删除！"
              });
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.okCanleClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });

        this.isShowdel = true;
        this.delShow = false;
      }
    },
    // 取消删除框
    noCanleClick() {
      this.isShowdel = true;
      this.delShow = false;
    },
    //一级分类修改
    amendClickOne(indexOne) {
      this.editClassifyID = this.firstClassifyLIst[indexOne].id;
      this.editName = this.firstClassifyLIst[indexOne].name;
      this.isShowEdit = false;
      this.editShow = true;
      this.classifyRank = 1;
    },
    //二级分类修改
    amendClickTwo(indexTwo) {
      this.editIndexTwo = indexTwo;
      this.editClassifyID = this.secondClassifyLIst[indexTwo].id;
      this.editName = this.secondClassifyLIst[indexTwo].name;
      this.isShowEdit = false;
      this.editShow = true;
      this.classifyRank = 2;
    },
    //三级分类修改
    amendClickThree(indexThree) {
      this.editIndexThree = indexThree;
      this.editClassifyID = this.thirdlyClassifyLIst[indexThree].id;
      this.editName = this.thirdlyClassifyLIst[indexThree].name;
      this.isShowEdit = false;
      this.editShow = true;
      this.classifyRank = 3;
    },
    //确定修改分类名称
    okEditClick() {
      if (this.editShowNameIf == true) {
        var self = this;
        self
          .getreartypeCompileClassify({
            id: self.editClassifyID,
            name: self.editName
          })
          .then(data => {
            // console.log("修改/新增图片", data);
            if (data.code == 200) {
              self.$message({
                message: "修改成功",
                type: "success"
              });
              //*********************判断修改的是几级分类*******************************
              //修改一级名称成功
              if (self.classifyRank == 1) {
                self.getClassfyOne();
                //修改二级名称成功
              } else if (self.classifyRank == 2) {
                self.secondClassifyLIst[self.editIndexTwo].name = self.editName;
                //修改三级名称成功
              } else if (self.classifyRank == 3) {
                self.thirdlyClassifyLIst[self.editIndexThree].name =
                  self.editName;
              }
              //**********************************************************************
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
              message: "服务器错误"
            });
          });
        this.isShowEdit = true;
        this.editShow = false;
      } else {
        this.editShowName = false;
      }
    },
    // 取消修改框
    noEditClick() {
      this.isShowEdit = true;
      this.editShow = false;
    },
    // 禁止向上
    grayupIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于第一位不支持向上排序!"
      });
    },
    // 禁止向下
    graydownIndexClick() {
      this.$message({
        type: "info",
        message: "属性处于最后一位不支持向下排序!"
      });
    },
    //*****************排序************************/
    //排序接口
    batchUpdateRank() {
      var self = this;
      if (self.batchUpdateRankTrue == false) {
        self.batchUpdateRankTrue = true;
        self
          .getbatchUpdateRankClassify({
            rankJson: self.objstr
          })
          .then(data => {
            self.batchUpdateRankTrue = false;
            if (data.code == 200) {
              self.$message({
                message: "排序成功",
                type: "success"
              });
              if (self.classifysort == 1) {
                self.getClassfyOne();
              } else if (self.classifysort == 2) {
                self
                  .getClassfyListFirst({
                    pid: self.deleteIdOne
                  })
                  .then(data => {
                    //   console.log("分类二级列表", data);
                    if (data.code == 200) {
                      self.secondClassifyLIst = [];
                      self.secondClassifyLIst = data.data;
                      self.thirdlyClassifyShow = -1;
                      self.secondClassifyImg = -1;
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    //   console.log(msg);
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
                  });
              } else if (self.classifysort == 3) {
                self
                  .getClassfyListFirst({
                    pid: self.deleteIdTwo
                  })
                  .then(data => {
                    //   console.log("分类三级列表", data);
                    if (data.code == 200) {
                      self.thirdlyClassifyLIst = [];
                      self.thirdlyClassifyLIst = data.data;
                    } else {
                      self.$message({
                        type: "info",
                        message: data.message
                      });
                    }
                  })
                  .catch(msg => {
                    //   console.log(msg);
                    self.$message({
                      type: "info",
                      message: "服务器错误"
                    });
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
            self.batchUpdateRankTrue = false;
            self.$message({
              type: "info",
              message: "服务器错误"
            });
          });
      }
    },
    //一级分类向上排序
    upRankOneClick(indexOne) {
      if (indexOne == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        this.classifysort = 1;
        var self = this;
        var arrs = self.firstClassifyLIst;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, rank: ind + 1 });
        });
        var downObj = ups[indexOne];
        ups.splice(indexOne, 1);
        ups.splice(indexOne - 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, rank: upIn + 1 });
        });
        self.objstr = [];
        self.objstr = JSON.stringify(downs);
        // console.log("一级向上", self.objstr);
        this.batchUpdateRank();
      }
    },
    //一级分类向下排序
    downRankOneClick(indexOne) {
      if (indexOne + 1 == this.firstClassifyLIst.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        this.classifysort = 1;
        var self = this;
        var arrs = self.firstClassifyLIst;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, rank: ind + 1 });
        });
        var downObj = ups[indexOne];
        ups.splice(indexOne, 1);
        ups.splice(indexOne + 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, rank: upIn + 1 });
        });
        self.objstr = JSON.stringify(downs);
        // console.log("一级向下", self.objstr);
        this.batchUpdateRank();
      }
    },
    //二级分类向上排序
    upRankTwoClick(indexTwo) {
      if (indexTwo == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        this.classifysort = 2;
        var self = this;
        var arrs = self.secondClassifyLIst;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, rank: ind + 1 });
        });
        var downObj = ups[indexTwo];
        ups.splice(indexTwo, 1);
        ups.splice(indexTwo - 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, rank: upIn + 1 });
        });
        self.objstr = JSON.stringify(downs);
        // console.log("二级向上", self.objstr);
        this.batchUpdateRank();
      }
    },
    //二级分类向下排序
    downRankTwoClick(indexTwo) {
      if (indexTwo + 1 == this.secondClassifyLIst.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        this.classifysort = 2;
        var self = this;
        var arrs = self.secondClassifyLIst;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, rank: ind + 1 });
        });
        var downObj = ups[indexTwo];
        ups.splice(indexTwo, 1);
        ups.splice(indexTwo + 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, rank: upIn + 1 });
        });
        self.objstr = JSON.stringify(downs);
        // console.log("二级向下", self.objstr);
        this.batchUpdateRank();
      }
    },
    //三级分类向上排序
    upRankThreeClick(indexThree) {
      if (indexThree == 0) {
        this.$message({
          type: "info",
          message: "属性处于第一位不支持向上排序!"
        });
      } else {
        this.classifysort = 3;
        var self = this;
        var arrs = self.thirdlyClassifyLIst;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, rank: ind + 1 });
        });
        var downObj = ups[indexThree];
        ups.splice(indexThree, 1);
        ups.splice(indexThree - 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, rank: upIn + 1 });
        });
        self.objstr = JSON.stringify(downs);
        // console.log("三级级向上", self.objstr);
        this.batchUpdateRank();
      }
    },
    //三级分类向下排序
    downRankThreeClick(indexThree) {
      if (indexThree + 1 == this.thirdlyClassifyLIst.length) {
        this.$message({
          type: "info",
          message: "属性处于最后一位不支持向下排序!"
        });
      } else {
        this.classifysort = 3;
        var self = this;
        var arrs = self.thirdlyClassifyLIst;
        var ups = [];
        arrs.forEach(function(ele, ind) {
          ups.push({ id: ele.id, rank: ind + 1 });
        });
        var downObj = ups[indexThree];
        ups.splice(indexThree, 1);
        ups.splice(indexThree + 1, 0, downObj);
        var downs = [];
        ups.forEach(function(ele, upIn) {
          downs.push({ id: ele.id, rank: upIn + 1 });
        });
        self.objstr = JSON.stringify(downs);
        // console.log("三级向下", self.objstr);
        this.batchUpdateRank();
      }
    },
    ...mapActions([
      "getClassfyListFirst",
      "getbatchUpdateRankClassify",
      "getreartypeDeleteClassify",
      "getreartypeCompileClassify",
      "getstorechannelManagementselectChanneluploadFile",
      "getreartypeAddClassify"
    ])
  },

  // 监视
  watch: {
    Compilename: function(val) {
      this.changeval = val.length;
      if (this.changeval == 0) {
        this.CompilenameIf = false;
        this.CompilenameRedIf = false;
      } else {
        this.CompilenameRed = false;
        this.CompilenameRedIf = false;
        this.CompilenameGray = true;
        this.CompilenameIf = true;
      }
    },
    editName: function(val) {
      this.changeval = val.length;
      if (this.changeval == 0) {
        this.editShowNameIf = false;
      } else {
        this.editShowName = true;
        this.editShowNameIf = true;
      }
    }
  }
};
</script>
<style scoped>
.category {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
  border-bottom: 1px solid #ccc;
}

.category > div {
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
  border: 1px solid #fe5371;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}

.list {
  min-height: 540px;
  margin-top: 25px;
}

.listCont li:nth-child(1) {
  display: flex;
  min-height: 50px;
}

.ClassifyOne {
  width: 22%;
  min-width: 150px;
  line-height: 44px;
  border-left: 1px solid #d9d9d9;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ClassifyTwo {
  width: 11%;
  text-align: center;
  border-left: 1px solid #d9d9d9;
}

.ClassifyThree {
  width: 13%;
  line-height: 44px;
  text-align: center;
  border-left: 1px solid #d9d9d9;
}

.Classifyfour {
  width: 13%;
  line-height: 44px;
  text-align: center;
  border-left: 1px solid #d9d9d9;
}

.ClassifyfiveHead {
  width: 10%;
}

.Classifyfive {
  line-height: 44px;
  width: 10%;
  padding-left: 4%;
  border-left: 1px solid #d9d9d9;
}

.ClassifysixHead {
  width: 13%;
}

.Classifysix {
  width: 13%;
  display: flex;
  line-height: 44px;
  justify-content: center;
  border-left: 1px solid #d9d9d9;
}

.Classifysix > div:nth-child(1) {
  margin-right: 10px;
}

.Classifysix > div:nth-child(2) {
  margin-left: 10px;
}

.Classifysix img {
  width: 25px;
  font-size: 18px;
  cursor: pointer;
  height: 25px;
}

.ClassifysevenHead {
  width: 18%;
}

.Classifyseven {
  width: 18%;
  display: flex;
  line-height: 44px;
  justify-content: center;
  border-left: 1px solid #d9d9d9;
}

.Classifyseven > div:nth-child(2) {
  margin-left: 20px;
  margin-right: 20px;
}

.Classifyseven > div {
  width: 25px;
  height: 25px;
}

.Classifyseven > div img {
  cursor: pointer;
  width: 25px;
  height: 25px;
}

.Classifyfive img {
  width: 30px;
  height: 15px;
  cursor: pointer;
}

.firstClassify > div:nth-child(1) {
  padding-left: 5%;
}

.secondClassify > div:nth-child(1) {
  padding-left: 7%;
}

.thirdlyClassify > div:nth-child(1) {
  line-height: 44px;
  padding-left: 11%;
}

.firstLi {
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  font-size: 15px;
  font-weight: bold;
  height: 58px;
  background-color: #f2f4f8;
  text-align: center;
}

.firstLi div {
  border-left: 1px solid #d9d9d9;
  line-height: 58px !important;
}

.dataLi {
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}

.firstClassify,
.secondClassify,
.thirdlyClassify {
  height: 44px;
  display: flex;
}

.firstClassify > div {
  font-size: 14px;
  line-height: 44px;
}

.rankClick span {
  cursor: pointer;
}

.rankClick img {
  width: 15px;
  height: 15px;
  margin: 13px 10px 16px 0;
}
/*新增分类弹出框*/

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

.delImg {
  width: 525px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid #d1d1d1;
  font-size: 20px;
  font-weight: bold;
  color: #303030 !important;
}

.delCont {
  height: 25px;
  margin-top: 30px;
}

.delCont {
  padding-left: 80px;
}

.delCont input {
  margin-left: 80px;
  width: 200px;
  height: 32px;
  margin-left: 3px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 4px;
}

.delCont span:nth-child(1) {
  display: inline-block;
  width: 80px;
  font-size: 13px;
  color: #303030 !important;
}

.grayFont {
  color: #d1d1d1;
  font-size: 13px;
}

.redFont {
  color: #dc322b;
  font-size: 13px;
}

.delope {
  width: 525px;
  height: 145px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.delope > div {
  cursor: pointer;
  width: 70px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

.delope > div:nth-child(1) {
  margin-right: 25px;
  background-color: #fe5371;
}

.delope > div:nth-child(2) {
  margin-left: 25px;
  background-color: #d1d1d1;
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

select {
  width: 60px;
  height: 24px;
  line-height: 24px;
  padding-left: 13px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 85% 8px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

.nodataBox {
  text-align: center;
  margin: 180px 0;
}

.nodataBox p {
  margin-top: 40px;
  font-size: 30px;
  color: #f1f0f0;
}

.addImgInput {
  width: 30px;
  height: 30px;
  border: 1px solid red;
  position: absolute;
  top: 8px;
  left: 42%;
}

.addImg {
  position: relative;
}

.addImg div {
  width: 31px;
  height: 31px;
  margin: 6px auto;
  background: url(/static/img/addimg.jpg)no-repeat;
  background-size: 50% 50%;
  background-position: 50% 50%;
}

.addImg div img {
  width: 100%;
  height: 100%;
}
/*****上传图片弹出框********/

.imgUploadA {
  height: 66px;
  line-height: 66px;
  margin-top: 50px;
  padding-left: 102px;
}

.imgUploadB {
  height: 20px;
  font-size: 14px;
  padding-left: 167px;
  margin-top: 20px;
}

.imgUploadA > div > div {
  float: left;
}

.imgUploadA > div > div:nth-child(2) {
  width: 60px;
  height: 60px;
  margin: 0 20px;
}

.imgUploadA > div > div:nth-child(2) img {
  width: 100%;
  height: 100%;
  margin-top: -5px;
}

label {
  width: 68px;
  height: 30px;
  color: white;
  background-color: #fe5371;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
}

input[type="file"] {
  display: none;
}
</style>