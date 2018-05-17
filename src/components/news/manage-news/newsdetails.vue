<!--添加新闻管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="addNews">
        <div>
            <div class="listTitle">
                <img @click="canelClick" src="/static/img/fan.png" alt="">
                <div>
                    {{titleName}}
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listLi" v-show="titleVal != ''">
                    <div>
                        标题：
                    </div>
                    <div>
                        <div>
                            {{titleVal}}
                        </div>
                    </div>
                </div>
                <div class="listLi">
                    <div>
                        作者：
                    </div>
                    <div class="author">
                        {{authorVal}}
                    </div>
                </div>
                <div class="listLi">
                    <div>
                        发布时间：
                    </div>
                    <div class="author">
                        {{createDate | timeFun}}
                    </div>
                </div>
                <div class="listLi" v-show=" oklabelList && oklabelList.length > 0">
                    <div>
                        标签：
                    </div>
                    <div class="labelCss">
                        <div v-for="(item,index) in oklabelList" :key="index">
                            {{item}}
                        </div>
                    </div>
                </div>
                <div class="listLi" v-show="keywordList && keywordList.length > 0">
                    <div>
                        关键字：
                    </div>
                    <div class="keywordFor">
                        <span v-for="(city,index) in keywordList" :key="index">
                            {{city}}
                        </span>
                    </div>
                </div>
                <div class="listLi" v-show="classifyVal != ''">
                    <div>
                        分类：
                    </div>
                    <div class="author">
                        {{classifyVal}}
                    </div>
                </div>
                <div class="contentlistLi">
                    <div>
                        内容：
                    </div>
                    <div class="contentBox">
                        <!-- 文字 -->
                    
                    <!-- 文图 -->
                    <template v-if="newsType == 1">
                      <div>
                          <div v-html="contentHtml">
                          </div>
                          <div class="imgUrl">
                            <div v-for="(item,ind) in pictureList" :key="ind">
                              <img :src="item" alt="">
                            </div>
                          </div>       
                        </div>
                    </template>
                    <template  v-else-if="newsType == 2">
                        <!-- 视频 -->
                        <div>
                          <div v-html="contentHtml"> 
                          </div>
                          <video width="888" height="450" ref='videoa' :src="videoSrc" controls="controls">
                            <object :data="videoSrc" width="880" height="450" >
                              <embed :src="videoSrc" width="880" height="450" type="application/x-shockwave-flash"/>
                            </object>
                          </video>
                        </div>
                    </template>
                    <template  v-else-if="newsType == 0">
                        <div v-html="contentHtml">
                        </div>
                    </template>
                    <template  v-else>
                      <!-- 语音 -->
                      <div>
                        <audio :src="contentHtml" controls="controls"></audio>
                      </div>
                    </template>     
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      titleVal: "", //标题
      authorVal: "", //作者
      createDate: "", //发布时间
      oklabelList: [], //选定的标签数组
      classifyVal: "", //分类model
      keywordList: [], //关键字数组
      contentHtml: "", //内容html
      picture: [], //内容图片集合
      titleName: "", //标题
      type: "", //类型（0：新闻，1：动态）
      videoSrc: "", // 视频路径
      audioSrc: "", // 音频路径
      newsType: "",
      pictureList: ""
    };
  },
  // 过滤
  filters: {
    // 返回日期格式化
    timeFun: function(val) {
      val = Number(val);
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
    }
  },
  // 模块新建时
  created: function() {
    console.log(typeof this.newsType);
    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "新闻管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (
        arrs.indexOf("newsList") == -1 &&
        arrs.indexOf("dynamic") == -1 &&
        arrs.indexOf("answers") == -1 &&
        arrs.indexOf("audit") == -1 &&
        arrs.indexOf("user") == -1
      ) {
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
        if (this.$route.query.newsShow == "newsList") {
          //获取新闻详情
          this.titleName = "新闻详情";
          this.type = 0;
          this.getNewsDetail();
        } else if (this.$route.query.newsShow == "dynamic") {
          this.type = 1;
          this.titleName = "动态详情";
          this.getDynamicData();
          this.authorVal = sessionStorage.getItem("authorval");
        } else if (this.$route.query.newsShow == "answers") {
          this.titleName = "问答详情";
          this.getAnswersData();
        } else if (this.$route.query.newsShow == "userNumber") {
          if (this.$route.query.userNumber == "article") {
            this.type = 1;
            this.titleName = "用户文章详情";
            this.getNewsDetail();
          } else if (this.$route.query.userNumber == "dynamic") {
            this.type = 1;
            this.titleName = "用户动态详情";
            this.getNewsDetail();
          } else if (this.$route.query.userNumber == "issue") {
            this.titleName = "用户问题详情";
            this.getAnswersData();
          }
        } else if (this.$route.query.newsShow == "auditContent") {
          if (this.$route.query.auditContent == "auditDynamic") {
            this.type = 1;
            this.titleName = "审核动态详情";
            this.authorVal = sessionStorage.getItem("nameVal");
            this.createDate = sessionStorage.getItem("updateDateVal");
            this.contentHtml = sessionStorage.getItem("contentVal");
            console.log(this.contentHtml);
            console.log(typeof this.createDate);
            // this.getNewsDetail();
          } else if (this.$route.query.auditContent == "auditIssue") {
            this.titleName = "审核问题详情";
            this.getAnswersData();
            console.log("走着");
          }
        }
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
  // 事件处理
  methods: {
    //获取新闻详情
    getNewsDetail() {
      var self = this;
      self
        .getnewsControllerSelectNewsDetail({
          type: self.type, //类型（0：新闻，1：动态）
          newsId: self.$route.query.id
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              if (self.$route.query.newsShow == "newsList") {
                self.titleVal = data.data.title; //标题
                self.authorVal = data.data.authorName; //作者
                self.createDate = data.data.createDate; //发布时间
                if (data.data.labelName != []) {
                  self.oklabelList = data.data.labelName; // 标签
                }
                if (data.data.keyword != "") {
                  self.keywordList = data.data.keyword.split(" "); //关键字
                }
                self.classifyVal = data.data.classifyName; //分类
                self.contentHtml = data.data.content; //内容
              } else if (self.$route.query.newsShow == "dynamic") {
                self.authorVal = data.data.authorName; //作者
                self.createDate = data.data.createDate; //发布时间
                self.contentHtml = data.data.content; //内容
              } else if (self.$route.query.newsShow == "userNumber") {
                if (self.$route.query.userNumber == "article") {
                  self.titleVal = data.data.title; //标题
                  self.authorVal = data.data.authorName; //作者
                  self.createDate = data.data.createDate; //发布时间
                  self.classifyVal = data.data.classifyName; //分类
                  self.contentHtml = data.data.content; //内容
                } else if (self.$route.query.userNumber == "dynamic") {
                  self.authorVal = data.data.authorName; //作者
                  self.createDate = data.data.createDate; //发布时间
                  self.contentHtml = data.data.content; //内容
                }
              }
            }
          } else {
            self.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message("服务器异常");
        });
    },
    //获取问答详情
    getAnswersData() {
      var self = this;
      self
        .getsquestionsControllerGetQuestionsDetail({
          id: self.$route.query.id
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              self.titleVal = data.data.title; //标题
              self.authorVal = data.data.userName; //作者
              self.createDate = data.data.createDate; //发布时间
              self.contentHtml = data.data.content; //内容
              console.log(self.contentHtml);
            }
          } else {
            self.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message("服务器异常");
        });
    },
    //获取动态详情
    getDynamicData() {
      var self = this;
      self
        .getnewsControllerFindByDynamicId({
          dynamicId: self.$route.query.id
        })
        .then(data => {
          if (data.code == 200) {
            if (data.data) {
              self.authorVal = data.data.userName; //作者
              self.createDate = data.data.createDate; //发布时间
              self.contentHtml = data.data.content; //内容
              self.newsType = data.data.newsType;
              if (data.data.newsType == 0) {
              } else if (data.data.newsType == 1) {
                self.pictureList = data.data.picture.split(",");
                console.log(self.pictureList);
              } else {
                self.videoSrc = data.data.picture;
              }
            }
          } else {
            self.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message("服务器异常");
        });
    },
    // 箭头返回上一页
    canelClick() {
      this.$router.push({
        path: "/news/" + this.$route.query.newsShow
      });
      sessionStorage.removeItem("authorval");
      // 审核动态详情
      sessionStorage.removeItem("nameVal");
      sessionStorage.removeItem("updateDateVal");
      sessionStorage.removeItem("contentVal");
    },
    ...mapActions([
      "getnewsControllerSelectNewsDetail",
      "getsquestionsControllerGetQuestionsDetail",
      "getnewsControllerFindByDynamicId"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.grayFont {
  margin-left: 15px;
  color: #aeaeae;
}

.addNews {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}

.addNews > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.list {
  min-height: 640px;
  margin-top: 25px;
  margin-bottom: 100px;
}

.listLi {
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.listLi > div:nth-child(1) {
  width: 85px;
  text-align: right;
  font-size: 14px;
  color: #303030;
  margin-right: 16px;
}

.keyword {
  display: flex;
}

.keyword > div:nth-child(1) {
  width: 101px;
  height: 1px;
}

.keywordFor {
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 32px;
  max-width: 750px;
  overflow: inherit;
}

.keywordFor span {
  height: 24px;
  color: #5acdfa;
  border-radius: 3px;
  border: 1px solid #5acdfa;
  display: inline-block;
  position: relative;
  padding: 0 5px;
  margin: 4px 24px 8px 0;
}

.listTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
}

.listTitle > div {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 16px;
  font-size: 16px;
  font-weight: bold;
}

.listTitle img {
  cursor: pointer;
}

/* 标签弹出框 */

.labelListpaging {
  width: 500px;
  height: 32px;
  display: flex;
  justify-content: space-between;
}

.oklabel {
  background: #f84848;
  color: white;
  border: 1px solid #f84848 !important;
}

.labelBoxBut {
  height: 62px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-top: 1px solid #f84848;
}

.labelCss {
  border: 1px solid #aeaeae;
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  min-width: 180px;
}

.labelCss > div {
  float: left;
  height: 24px;
  border-radius: 4px;
  margin: 0 4px;
}

.redFont {
  color: #f84848 !important;
}

.redBor {
  border: 1px solid #f84848 !important;
}

.contentlistLi {
  margin-top: 20px;
  display: flex;
}

.contentlistLi > div:nth-child(1) {
  width: 85px;
  height: 50px;
  text-align: right;
  font-size: 14px;
  color: #303030;
  margin-right: 16px;
}

.contentBox {
  width: 80%;
  max-width: 900px;
  height: 500px;
  border: 1px solid #aeaeae;
  overflow-y: auto;
  overflow-x: auto;
  padding: 5px;
  border-radius: 4px;
}

.contentBox .imgUrl {
  display: flex;
}

.contentBox img {
  width: 400px;
  height: 400px;
  margin: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
}
</style>