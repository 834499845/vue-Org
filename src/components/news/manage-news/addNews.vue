<!--添加新闻管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="addNews">
        <div>
            <div class="listTitle">
                <div class="listTitleSon">
                    <div @click="canelClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{titleName}}
                    </div>
                </div>
                <div @click="saverDraftClick">
                    保存到草稿箱
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listLi">
                    <div>
                        标题：
                    </div>
                    <div>
                        <div>
                            <input :class="{redBor:isTitle}" maxlength="15" type="text" v-model="titleVal">
                            <span class="grayFont" :class="{redFont:isTitle}">最多15个字（不支持非法字符）</span>
                        </div>
                    </div>
                </div>
                <div class="listLi">
                    <div>
                        作者：
                    </div>
                    <div v-show="titleName=='新增新闻'">
                        <div class="author">
                            <select :class="{redBor:isAuthor}" v-model="authorVal" @change="authorChange">
                                <option v-for="(type,index) in authorList" v-bind:value="type.id" :id="type.id">{{type.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div v-show="titleName=='编辑草稿箱'">
                        <div class="author" v-show="source == ''">
                            <select :class="{redBor:isAuthor}" v-model="authorVal" @change="authorChange">
                                <option v-for="(type,index) in authorList" v-bind:value="type.id" :id="type.id">{{type.name}}</option>
                            </select>
                        </div>
                        <div v-show="source == 1">
                            {{authorName}}
                        </div>
                    </div>
                </div>
                <div class="listLi">
                    <div>
                        分类：
                    </div>
                    <div class="author">
                        <select :class="{redBor:isClassify}" v-model="classifyVal" @change="classifyChange">
                            <option v-for="(type,index) in classifyList" :value="type.id" :id="type.id">{{type.name}}</option>
                        </select>
                    </div>
                </div>
                <!-- <div class="listLi">
                    <div>
                        兴趣：
                    </div>
                    <div class="labelCss" @click="labelClick">
                        <div v-for="(item,index) in oklabelList">
                            {{item.name}}
                        </div>
                    </div>
                    <span class="grayFont">点击选择兴趣（最多选择5个兴趣）</span>
                </div> -->
                <div class="listLi">
                    <div>
                        关键字：
                    </div>
                    <div>
                        <div>
                            <input :class="{redBor:isKeyword}" type="text" maxlength="5" v-model="keywordVal" @keyup.13="keywordClick">
                        </div>
                    </div>
                </div>
                <div class="keyword">
                    <div></div>
                    <div>
                        <span :class="{redFont:isKeyword}" class="grayFont">最多输入5个字（输入完成请按回车确认、关键字总数不超过100字、不支持非法字符）</span>
                    </div>
                </div>
                <div class="keyword">
                    <div></div>
                    <div class="keywordFor">
                        <span v-for="(city,index) in keywordList">
                            {{city}}
                            <img src="/static/img/shan.jpg" @click="delKeywordClick(index)" alt="">
                        </span>
                    </div>
                </div>
                <div class="listLi">
                    <div>
                        获取视频地址：
                    </div>
                    <label for="brightIcon">上传</label>
                    <input id="brightIcon" value="上传" type="file" accept="mp4" @change="onFileChange">
                    <textarea name="" id="copys" cols="30" rows="10">{{videoUrlVal}}</textarea>
                    <span class="copys">{{videoUrlVal}}</span>
                    <div class="copy" @click="copyClick">
                        复制地址
                    </div>
                </div>
                <div class="listLi">
                    <div class="hintFont">
                        温馨提示：
                    </div>
                    <div class="hintFont">
                        编辑器上传视频前请先在上面获取视频地址，不然您的视频将无法正常上传！（最多只能上传一个视频）
                    </div>
                </div>
                <div :class="{redBor:isEditor}" class="editorFather">
                    <div id="editor" tabindex="-1" v-html="inputContentHtml" style="height: 500px;">

                    </div>
                </div>
            </div>
            <div class="but">
                <div class="okBut" @click="publishClick">发布</div>
                <div class="noBut" @click="canelClick">取消</div>
            </div>
        </div>
        <!-- 兴趣弹出框 -->
        <div class="labelBox" v-show="islabelBoxShow">
            <div class="labelBoxSon">
                <div class="labelBoxTop">
                    选择兴趣
                </div>
                <div class="labelBoxhade">
                    <div>
                        <input type="text" v-model="screenLabelVal">
                    </div>
                    <div class="okBut" @click="screenLabel">确定</div>
                </div>
                <div class="labelBoxContent">
                    <div class="labelListBox">
                        <div :class="{oklabel:item.labelShow}" v-for="(item,index) in labelList" @click="labelBoxClick(index)">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="labelListpaging">
                        <div></div>
                        <div>
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[ 20, 40]"
                                :page-size="pageSizeNum" layout="total, sizes, prev, pager, next" :total="totalNum"></el-pagination>
                        </div>
                    </div>
                </div>
                <div class="labelBoxBut">
                    <div class="okBut" @click='oklabelClick'>确定</div>
                    <div class="noBut" @click='canlabelClick'>取消</div>
                </div>
            </div>
        </div>
        <!--取消弹出框-->
        <div class="delPopup" v-show="isShowdel">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import WangEditor from 'wangeditor' //编辑器
    import { mapActions } from 'vuex'
    import deleteBox from "../../cModule/newsDelete";
    export default {
        components: {
            'v-hosdel': deleteBox
        },
        data() {
            return {
                titleName: '',  //模块名
                inputContentHtml: '', //编辑器
                titleVal: '',          //标题
                isTitle: 0,        //标题正则
                authorList: [{ name: '请选择作者', id: '' }],     //作者数组
                authorVal: '',    //作者
                islabelBoxShow: 0,    //兴趣弹出框
                screenLabelVal: '',//兴趣筛选关键字
                screenLabelShow: 0, //兴趣是否进行筛选
                oklabelList: [{ name: "请先选择分类", id: '' }],    //选定的兴趣数组
                excessivelabelList: [], //兴趣过度数组
                okLabelIdList: [],  //草稿箱详情的兴趣id数组
                labelList: [],       //兴趣数组
                classifyVal: '', //分类model
                classifyList: [{ name: '请选择分类', id: '' }],  //分类数组
                keywordList: [],//关键字数组
                keywordVal: '', //关键字
                isKeyword: 0,   //关键字验证
                contentHtml: '', //编辑器html
                inputText: '',//编辑器text
                videoUrlVal: '',//视频路径
                isAuthor: false,   //作者判断
                isClassify: false, //分类判断
                draftData: '',  //草稿箱详情
                isEditor: false,  //编辑器判断
                videolongTime: '',     //视频时长
                videoSize: '',      //视频大小
                coverImg: '',  //视频头图
                videoArrOne: [],    //上传过的视频数据数组
                videosSrc: '',    //编辑器第一个视频的路径
                draftId: '',   //草稿箱id
                newsId: '',   //新闻id
                isShowdel: false,    //跳转页面提示框
                intercept: false,   //是否允许跳转页面
                editorData: '',    //编辑器全部按钮
                editorImg: '',    //编辑器图片
                isUpAddNews: true,
                isUpAddDraft: true,
                isUpLabel: true,
                titlename: '该内容尚未保存，是否要退出？',
                pageSizeNum: 20,
                totalNum: 20,
                currentPage: 1,
                editorData: null,
                authorName: '',
                source: ''
            }
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            // 权限限制
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "新闻管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("newsList") == -1 && arrs.indexOf("draft") == -1) {
                    this.intercept = true;
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
                    if (this.$route.query.newsShow == 'draft') {
                        this.titleName = '编辑草稿箱'
                        // 获取草稿箱详情
                        var self = this
                        self.getdraftsControllerselectDraftsDetail({
                            type: 0,
                            draftsId: self.$route.query.id
                        }).then(data => {
                            if (data.code == 200) {
                                if (data.data) {
                                    self.getAuthorListsFun()
                                    self.getclassiflyList()
                                    self.draftData = data.data
                                    self.draftId = data.data.id
                                    self.authorName = data.data.authorName
                                    self.source = data.data.source
                                    console.log(data.data)
                                    if (data.data.newsId) {
                                        self.newsId = data.data.newsId
                                    }
                                    self.titleVal = data.data.title //标题
                                    if (data.data.labelId) {
                                        self.okLabelIdList = data.data.labelId.split(",")     //兴趣id
                                        self.excessivelabelList = []
                                    }
                                    if (data.data.keyword) {
                                        self.keywordList = data.data.keyword.split(" ") //关键字
                                    }
                                    if (data.data.content) {
                                        self.contentHtml = self.inputContentHtml = data.data.content       //编辑器内容 
                                    }
                                    if (data.data.picture && data.data.cover && data.data.longTime && data.data.size) {
                                        console.log("阿萨德")
                                        self.videoArrOne.push({
                                            videoUrlVal: data.data.picture,//视频路径
                                            cover: data.data.cover, //视频头图
                                            videoTime: data.data.longTime, //视频时长
                                            videoSize: parseFloat(data.data.size),  //视频大小
                                        })
                                    }
                                }
                            } else {
                                self.$message(data.message)
                            }
                        }).catch(msg => {
                            self.$message('服务器异常')
                        })
                    } else if (this.$route.query.newsShow == 'newsList') {
                        this.titleName = '新增新闻'
                        this.getAuthorListsFun()
                        this.getclassiflyList()
                    }
                }
            } else {
                this.intercept = true;
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
        mounted() {
            this.createEditor()
            var self = this
            var videoShow = document.getElementsByClassName('clearfix')[24]
            videoShow.onclick = function () {
                self.videosSrc = self.editorData.$txt.find('iframe');
                if (self.videosSrc.length == 1) {
                    self.$message('最多只能上传一个视频')
                } else if (self.videosSrc.length > 1) {
                    self.$message('最多只能上传一个视频，请删掉多余的视频')
                }
            }

        },
        //跳转拦截
        beforeRouteLeave(to, from, next) {
            this.toPath = to.path
            if (this.intercept == false) {
                this.isShowdel = true
            } else if (this.intercept == true) {
                this.isShowdel = false
                next()
            }
        },
        // 事件处理
        methods: {
            // 箭头返回上一页
            canelClick() {
                this.$router.push({
                    path: '/news/' + this.$route.query.newsShow
                })
            },
            //确定取消框
            okClick() {
                this.intercept = true
                var url = this.toPath
                this.$router.push({
                    path: url
                })
            },
            //取消返回框
            canleClick() {
                this.isShowdel = false
            },
            // 获取作者列表
            getAuthorListsFun() {
                var self = this;
                self.getnewsAuthorControllerselectAuthorList({
                    pageNo: 1,
                    pageSize: 1000000,
                }).then(data => {
                    self.authorList = [{ name: '请选择作者', id: '' }]
                    if (data.code == 200) {
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                data.data.records.forEach(ele => {
                                    self.authorList.push({
                                        name: ele.name, id: ele.id
                                    })
                                })
                                if (self.$route.query.newsShow == 'draft') {
                                    if (self.draftData.userId) {
                                        self.authorVal = self.draftData.userId
                                    }
                                }
                            }
                        }
                    } else {
                        self.$message(data.message);
                    }
                }).catch(msg => {
                    self.$message("服务器错误");
                });
            },
            //作者选择
            authorChange() {
                this.isAuthor = false
            },
            //获取分类列表
            getclassiflyList() {
                var self = this
                self.getclassiflyControlClassifyFindAll({
                    token: sessionStorage.getItem('token')
                }).then(data => {
                    if (data.code == 200) {
                        self.classifyList = [{ name: '请选择分类', id: '' }]
                        if (data.data) {
                            if (data.data.length > 0) {
                                data.data.forEach(ele => {
                                    self.classifyList.push({
                                        name: ele.name, id: ele.id
                                    })
                                })
                                if (self.$route.query.newsShow == 'draft') {
                                    if (self.draftData.classifyId) {
                                        self.classifyVal = self.draftData.classifyId
                                        self.oklabelList = [{ name: '请选择兴趣', id: '' }]
                                        self.screenLabelVal = ''
                                        // self.getLabelListsFun()
                                    }
                                }
                            }
                        }
                    } else {
                        self.$message(data.message)
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常'
                    })
                })
            },
            //选择分类
            classifyChange() {
                if (this.classifyVal == '') {
                    this.oklabelList = [{ name: '请先选择分类', id: '' }]
                } else {
                    this.okLabelIdList = []
                    this.screenLabelVal = ''
                    // this.getLabelListsFun()
                }
                this.isClassify = false
            },
            //获取兴趣列表
            getLabelListsFun() {
                if (this.isUpLabel) {
                    this.isUpLabel = false
                    var self = this;
                    self.getlabelControllerlistLabels({
                        classifyId: self.classifyVal,
                        labelName: self.screenLabelVal,
                        pageNo: self.currentPage,
                        pageSize: self.pageSizeNum
                    }).then(data => {
                        self.isUpLabel = true
                        self.labelList = []
                        if (data.code == 200) {
                            if (data.data.records) {
                                if (data.data.records.length > 0) {     //分类下有兴趣
                                    self.totalNum = data.data.total;
                                    var arr = data.data.records
                                    if (self.excessivelabelList.length == 0) {  //没有已选的兴趣
                                        arr.forEach(function (ele, ind) {
                                            self.labelList.push({
                                                name: ele.labelName, id: ele.labelId, labelShow: false
                                            })
                                        })
                                        if (self.screenLabelShow == false) {    //没有进行按条件查询兴趣
                                            if (self.okLabelIdList.length == 0) {   //草稿没有兴趣或者是新增文章才开始选兴趣
                                                self.oklabelList = [{ name: '请选择兴趣', id: 'selectLabel' }]
                                            } else {    //草稿箱有兴趣
                                                self.oklabelList = []
                                                for (var i = 0; i < arr.length; i++) {  //循环当前所有兴趣
                                                    var isLabelId = false
                                                    for (var j = 0; j < self.okLabelIdList.length; j++) {   //草稿箱兴趣id
                                                        if (arr[i].labelId == self.okLabelIdList[j]) {
                                                            isLabelId = true
                                                        }
                                                    }
                                                    if (isLabelId) {    //将草稿箱已有兴趣展示
                                                        self.oklabelList.push({
                                                            name: arr[i].labelName,
                                                            id: arr[i].labelId
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    } else {    //进行筛选/已有选择的兴趣
                                        for (var i = 0; i < arr.length; i++) {  //为已选的兴趣打钩
                                            var ifOkExc = 0
                                            for (var j = 0; j < self.excessivelabelList.length; j++) {
                                                if (arr[i].labelId == self.excessivelabelList[j].id) {
                                                    ifOkExc = 1
                                                }
                                            }
                                            if (ifOkExc) {
                                                self.labelList.push({
                                                    name: arr[i].labelName, id: arr[i].labelId, labelShow: true
                                                })
                                            } else {
                                                self.labelList.push({
                                                    name: arr[i].labelName, id: arr[i].labelId, labelShow: false
                                                })
                                            }
                                        }
                                    }
                                } else {
                                    if (this.screenLabelShow == 0) {
                                        self.oklabelList = [{ name: '此分类下暂无兴趣', id: '' }]
                                    }
                                }
                            } else {
                                if (this.screenLabelShow == 0) {
                                    self.oklabelList = [{ name: '此分类下暂无兴趣', id: '' }]
                                }
                            }
                        } else {
                            self.$message(data.message);
                        }
                    }).catch(msg => {
                        self.isUpLabel = true
                        self.$message("服务器异常");
                    });
                }
            },
            //兴趣点击
            labelClick() {
                if (this.classifyVal == '') {
                    return  //请先选择分类
                } else {
                    if (this.oklabelList[0].id == '') {
                        return  //暂无兴趣
                    } else {
                        var self = this
                        if (self.oklabelList[0].id == 'selectLabel') {  //请选择兴趣
                            self.excessivelabelList = []
                            self.oklabelList = []
                            for (var i = 0; i < self.labelList.length; i++) {   //为已经选择的兴趣打钩
                                self.labelList[i].labelShow = false
                            }
                        } else {        //已经选择了兴趣再次选择
                            self.screenLabelVal = ''
                            self.excessivelabelList = []
                            self.oklabelList.forEach(function (ele, ind) {
                                self.excessivelabelList.push({
                                    id: ele.id, name: ele.name
                                })
                            })
                            for (var i = 0; i < self.labelList.length; i++) {   //为已经选择的兴趣打钩
                                self.labelList[i].labelShow = false
                                for (var j = 0; j < self.excessivelabelList.length; j++) {
                                    if (self.labelList[i].id == self.excessivelabelList[j].id) {
                                        self.labelList[i].labelShow = true
                                    }
                                }
                            }
                        }
                        this.islabelBoxShow = 1
                    }
                }
            },
            //兴趣关键字筛选
            screenLabel() {
                if (this.screenLabelVal.length == 0) {
                    this.$message({
                        type: "info",
                        message: '请先输入关键字'
                    })
                } else {
                    this.screenLabelShow = 1
                    this.pageSizeNum = 20
                    this.currentPage = 1
                    this.getLabelListsFun()
                }
            },
            //兴趣选择
            labelBoxClick(index) {
                if (this.labelList[index].labelShow == 0) {
                    if (this.excessivelabelList.length < 5) {
                        this.excessivelabelList.push({
                            name: this.labelList[index].name,
                            id: this.labelList[index].id,
                        })
                        this.labelList[index].labelShow = 1
                    } else {
                        this.$message({
                            type: "info",
                            message: '最多选择5个兴趣'
                        })
                    }
                } else if (this.labelList[index].labelShow == 1) {
                    this.labelList[index].labelShow = 0
                    var self = this
                    var arr = []
                    for (var i = 0; i < self.excessivelabelList.length; i++) {
                        if (self.labelList[index].id != self.excessivelabelList[i].id) {
                            arr.push(self.excessivelabelList[i])
                        }
                    }
                    self.excessivelabelList = arr
                }
            },
            //兴趣分页
            handleSizeChange(val) {
                if (this.screenLabelShow == 0) {
                    this.screenLabelVal = ''
                }
                this.pageSizeNum = val
                this.getLabelListsFun()
            },
            handleCurrentChange(val) {
                if (this.screenLabelShow == 0) {
                    this.screenLabelVal = ''
                }
                this.currentPage = val
                this.getLabelListsFun()
            },
            //兴趣弹出框-确定
            oklabelClick() {
                var self = this
                if (self.excessivelabelList.length == 0) {
                    self.oklabelList = [{ name: '请选择兴趣', id: 'selectLabel' }]
                } else {
                    self.oklabelList = []
                    self.excessivelabelList.forEach(function (ele, ind) {
                        self.oklabelList.push({
                            id: ele.id, name: ele.name
                        })
                    })
                    self.excessivelabelList = []
                }

                self.islabelBoxShow = 0
            },
            //兴趣弹出框-取消
            canlabelClick() {
                if (this.oklabelList.length == 0) {
                    this.oklabelList = [{ name: '请选择兴趣', id: 'selectLabel' }]
                }
                this.excessivelabelList = []
                this.screenLabelShow = 0
                this.islabelBoxShow = 0
            },
            //关键字回车确定
            keywordClick() {
                var regOne = /^[\s]*$/;//输入不能为空
                if (regOne.test(this.keywordVal)) {
                    this.$message({
                        type: "info",
                        message: '请先输入关键字'
                    })
                } else {
                    var reg = new RegExp("[`,，~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]")
                    if (reg.test(this.keywordVal)) {
                        this.isKeyword = 1
                    } else {
                        if (this.keywordList.length <= 19) {
                            this.keywordList.push(this.keywordVal)
                            this.keywordVal = ''
                        } else if (this.keywordList.length > 19) {
                            var str = this.keywordList.join(",")
                            var string = str.replace(/,/g, '')
                            if (string.length < 100) {
                                var fontNum = 100 - string.length
                                if (this.keywordVal.length > fontNum) {
                                    this.$message({
                                        type: 'info',
                                        message: '还可以添加最后一个关键字(' + fontNum + '个字以内)'
                                    })
                                } else {
                                    this.keywordList.push(this.keywordVal)
                                    this.keywordVal = ''
                                }
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '不可以在添加关键字'
                                })
                                this.keywordVal = ''
                            }
                        }
                    }
                }
            },
            //删除关键字
            delKeywordClick(index) {
                this.keywordList.splice(index, 1)
            },
            //复制事件
            copyClick() {
                if (this.videoUrlVal.length > 0) {
                    var Url2 = document.getElementById("copys");
                    Url2.select(); // 选择对象
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    this.$message({
                        type: 'success',
                        message: '复制成功！'
                    })
                } else {
                    this.$message('请先上传视频')
                }
            },
            // 获取视频路径
            onFileChange(e) {
                this.contentHtml = this.editorData.$txt.html()
                this.videosSrc = this.editorData.$txt.find('iframe');
                if (this.videosSrc.length == 0) {
                    var self = this
                    self.isFile = false
                    var files = e.target.files || e.dataTransfer.files;
                    if (files[0]) {
                        var fileData = files[0]
                        var fileMaxSize = ''
                        fileMaxSize = fileData.size / 1024 / 1024
                        var typeVideo = fileData.type.split('/')[0]
                        if (fileMaxSize > 20) {
                            self.$message({
                                message: '上传视频不能大于20M',
                                type: 'info'
                            });
                            self.isFile = false
                        } else if (typeVideo != 'video') {
                            self.$message('请上传视频')
                        } else {
                            self.onFile(fileData)
                        }
                    }
                } else {
                    this.$message('已有视频，如果要再次上传请先删掉现有视频')
                }
            },
            onFile(file) {
                var self = this
                var TOKEN = sessionStorage.getItem('token')
                var formdata = new FormData();
                formdata.append('file', file);
                formdata.append('appName', 'BOTU')
                formdata.append('appId', 'BOTU')
                formdata.append('module', 'news')
                formdata.append('business', 'news')
                formdata.append('token', TOKEN)
                self.getUploawdFileVideo(formdata).then((data) => {   //2.0上传文件
                    if (data.code == 200) {
                        var videoTimeLenght = data.data[0].duration / 60 / 60
                        if (videoTimeLenght > 10) {
                            self.$message('视频时长不能大于10小时')
                        } {
                            self.$message({
                                message: '上传视频成功',
                                type: 'success'
                            });
                            self.isFile = true
                            self.videoUrlVal = '<iframe src="' + data.data[0].path + '"frameborder=0 allowfullscreen></iframe>'
                            self.videoArrOne.push({
                                videoUrlVal: data.data[0].path,     //视频路径  
                                videoTime: data.data[0].duration,       //视频时长
                                cover: data.data[0].videoCapturePath,   //视频头图
                                videoSize: parseFloat(data.data[0].fileSize)    //视频大小
                            })
                        }
                        console.log("视频参数", this.videoArrOne)
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            //编辑器
            createEditor() {
                const self = this
                const editor = new WangEditor('editor')
                self.editorData = editor
                editor.config.menus = ['lineheight', 'indent', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                    'link', 'unlink', 'table', 'img', 'video', 'insertcode', 'undo', 'redo', 'fullscreen'
                ]
                editor.config.menuFixed = false;
                // 上传图片（举例）
                editor.config.uploadImgUrl = '/V1.0.0/api/file/uploadWebEditor'
                var TOKEN = sessionStorage.getItem('token')
                editor.config.uploadParams = {
                    appName: 'BOTU',
                    appId: 'BOTU',
                    module: 'news',
                    business: 'news',
                    token: TOKEN
                };
                // 设置 headers（举例）
                editor.config.uploadHeaders = {
                    'Accept': '*'
                };
                // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
                //  editor.config.hideLinkImg = true;
                editor.onchange = function () {
                    self.contentHtml = this.$txt.html()
                    self.inputText = this.$txt.text()
                    self.editorImg = editor.$txt.find('img');
                    self.videosSrc = editor.$txt.find('iframe');
                    if (self.videosSrc.length > 1) {
                        self.isEditor = true
                        self.$message('编辑器内最多只能上传一个视频')
                    } else if (self.videosSrc.length <= 1) {
                        self.isEditor = false
                    }
                    self.isEditor = false
                }
                editor.config.zindex = 2;
                editor.create()
            },
            // 发布
            publishClick() {
                this.contentHtml = this.editorData.$txt.html()
                this.inputText = this.editorData.$txt.text()
                this.editorImg = this.editorData.$txt.find('img');
                this.videosSrc = this.editorData.$txt.find('iframe');
                var regOne = /^[\s]*$/;//输入不能为空
                var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]")
                if (regOne.test(this.titleVal) || regTwo.test(this.titleVal) || this.videosSrc.length > 1 || this.classifyVal == '' || (this.editorImg.length == 0 && this.videosSrc.length == 0 && this.inputText.length == 0)) {
                    if (regOne.test(this.titleVal) || regTwo.test(this.titleVal)) {
                        this.isTitle = 1
                    }
                    if (this.editorImg.length == 0 && this.videosSrc.length == 0 && this.inputText.length == 0) {
                        this.isEditor = true
                    }
                    if (this.authorVal == '') {
                        this.isAuthor = true
                    }
                    if (this.classifyVal == '') {
                        this.isClassify = true
                    }
                    if (this.videosSrc.length > 1) {
                        this.isEditor = true
                        this.$message('编辑器内最多只能上传一个视频')
                    }
                    
                } else {
                    var self = this;
                    var upShow = false
                    if (self.videosSrc.length == 1) {
                        for (var i = 0; i < self.videoArrOne.length; i++) {
                            if (self.videoArrOne[i].videoUrlVal == self.videosSrc["0"].src) {
                                self.videolongTime = self.videoArrOne[i].videoTime       //视频时长
                                self.coverImg = self.videoArrOne[i].cover    //视频头图
                                self.videoSize = self.videoArrOne[i].videoSize            //视频大小
                                upShow = true
                            }
                        }
                    } else {
                        upShow = true
                    }
                    if (upShow) {
                        if (this.isUpAddNews) {
                            this.isUpAddNews = false
                            var labelIdArr = []
                            var lableIds = []
                            if (self.oklabelList.length > 0) {
                                self.oklabelList.forEach(function (ele, ind) {
                                    labelIdArr.push(ele.id)
                                })
                                lableIds = labelIdArr.join(",")
                            }
                            var keyWords = self.keywordList.join(" ")
                            self.getnewsControllerAddNews({
                                draftsId: self.draftId, //草稿箱id
                                title: self.titleVal,   //标题
                                classifyId: self.classifyVal,   //新闻分类Id
                                labelIds: lableIds,     //兴趣/标签
                                userId: self.authorVal, //作者
                                keyWords: keyWords,     //关键字
                                content: self.contentHtml,       //编辑器内容
                                cover: self.coverImg,    //视频头图
                                longTime: self.videolongTime,   //视屏时长
                                size: self.videoSize,   //视频大小
                                source: self.source,
                                authorName: self.authorName
                            }).then(data => {
                                self.isUpAddNews = true
                                self.labelList = []
                                if (data.code == 200) {
                                    self.intercept = true
                                    sessionStorage.removeItem('newsListSelect')
                                    sessionStorage.removeItem('newsListPage')
                                    self.$router.push({
                                        path: '/news/newsList'
                                    })
                                    self.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                } else {
                                    self.$message(data.message);
                                }
                            }).catch(msg => {
                                self.isUpAddNews = true
                                self.$message("服务器异常");
                            });
                        }
                    } else {
                        self.$message('请先获取视频地址在上传')

                    }
                }
            },
            //保存到草稿箱
            saverDraftClick() {
                this.contentHtml = this.editorData.$txt.html()
                this.inputText = this.editorData.$txt.text()
                this.editorImg = this.editorData.$txt.find('img');
                this.videosSrc = this.editorData.$txt.find('iframe');
                var regOne = /^[\s]*$/;//输入不能为空
                var regTwo = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]")
                if (regOne.test(this.titleVal) || regTwo.test(this.titleVal) || this.videosSrc.length > 1 || this.authorVal == '' || this.classifyVal == '' || (this.editorImg.length == 0 && this.videosSrc.length == 0 && this.inputText.length == 0)) {
                    if (regOne.test(this.titleVal) || regTwo.test(this.titleVal)) {
                        this.isTitle = 1
                    }
                    if (this.editorImg.length == 0 && this.videosSrc.length == 0 && this.inputText.length == 0) {
                        this.isEditor = true
                    }
                    if (this.authorVal == '') {
                        this.isAuthor = true
                    }
                    if (this.classifyVal == '') {
                        this.isClassify = true
                    }
                    if (this.videosSrc.length > 1) {
                        this.isEditor = true
                        this.$message('编辑器内最多只能上传一个视频')
                    }
                } else {
                    var self = this;
                    var upShow = 0
                    console.log("视频参数",this.videoArrOne)
                    console.log("编辑器视频",this.videosSrc)
                    if (this.videosSrc.length == 1) {
                        for (var i = 0; i < self.videoArrOne.length; i++) {
                            if (self.videoArrOne[i].videoUrlVal == self.videosSrc["0"].src) {
                                self.videolongTime = self.videoArrOne[i].videoTime;       //视频时长
                                self.coverImg = self.videoArrOne[i].cover;    //视频头图
                                self.videoSize = self.videoArrOne[i].videoSize;            //视频大小
                                upShow = 1;
                            }
                        }
                    } else {
                        upShow = 1;
                    }
                    if (upShow == 1) {
                        if (this.isUpAddDraft) {
                            this.isUpAddDraft = false
                            var labelIdArr = []
                            var lableIds = []
                            if (this.oklabelList.length > 0) {
                                this.oklabelList.forEach(function (ele, ind) {
                                    labelIdArr.push(ele.id)
                                })
                                lableIds = labelIdArr.join(",")
                            }
                            var keyWords = this.keywordList.join(" ")
                            self.getnewsControllerSaveNews({
                                type: 0,         //	类型(0-新闻,1-动态)
                                newsId: self.newsId,    //新闻id
                                title: self.titleVal,   //标题
                                classifyId: self.classifyVal,   //分类
                                labelIds: lableIds,     //兴趣/标签
                                userId: self.authorVal, //作者
                                keyWords: keyWords,     //关键字
                                content: self.contentHtml,       //编辑器内容
                                textContent: self.inputText,  //	新闻文本内容
                                longTime: self.videolongTime,   //视屏时长
                                size: self.videoSize,       //视屏大小
                                cover: self.coverImg,    //视频头图
                                draftsId: self.draftId,  //草稿箱id
                                source: self.source,
                                authorName: self.authorName
                            }).then(data => {
                                self.isUpAddDraft = true
                                self.labelList = []
                                if (data.code == 200) {
                                    self.intercept = true
                                    self.$router.push({
                                        path: '/news/draft'
                                    })
                                    self.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                } else {
                                    self.$message(data.message);
                                }
                            }).catch(msg => {
                                self.isUpAddDraft = true
                                self.$message("服务器异常");
                            });
                        } 
                    }else {
                            self.$message('请先获取视频地址在上传')
                        }
                }
            },
            ...mapActions(['getUploawdFileVideo', 'getlabelControllerlistLabels', 'getnewsAuthorControllerselectAuthorList', 'getclassiflyControlClassifyFindAll', 'getnewsControllerAddNews', 'getnewsControllerSaveNews', 'getdraftsControllerselectDraftsDetail'])
        },
        // 监视
        watch: {
            screenLabelVal: function (val) {
                var changeVal = val.length
                if (changeVal == 0) {
                    if (this.screenLabelShow) {
                        this.screenLabelShow = 0
                        this.pageSizeNum = 20
                        this.currentPage = 1
                        this.getLabelListsFun()
                    }
                }
            },
            titleVal: function (val) {
                this.isTitle = 0
            },
            keywordVal: function (val) {
                this.keywordVal = val.replace(/\s/g, '')
                this.isKeyword = 0
            },
        }
    }

</script>
<style scoped>
    input[type=text] {
        width: 220px;
        height: 32px;
        border: 1px solid #aeaeae;
        border-radius: 3px;
        padding-left: 5px;
    }

    .grayFont {
        margin-left: 15px;
        color: #aeaeae;
    }

    .addNews {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }


    .addNews>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .list {
        min-height: 640px;
        margin-top: 25px;
    }

    .listLi {
        height: 50px;
        margin-top: 10px;
        display: flex;
        align-items: center;
    }

    .listLi>div:nth-child(1) {
        width: 100px;
        text-align: right;
        font-size: 14px;
        color: #303030;
        margin-right: 16px;
    }

    .keyword {
        display: flex;
    }

    .keyword>div:nth-child(1) {
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

    .keywordFor span img {
        border-radius: 14px;
        width: 14px;
        height: 14px;
        position: absolute;
        right: -7px;
        top: -7px;
    }



    .author select {
        width: 180px;
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        color: #aeaeae;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 85% 8px no-repeat transparent;
        font-size: 14px;
        color: #97969b;
        border: 1px solid #aeaeae;
        overflow: hidden;
    }

    select::-ms-expand {
        display: none;
    }

    .but {
        height: 32px;
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 1000px;
        margin-bottom: 100px;
        margin-top: 32px;
    }

    .okBut {
        width: 70px;
        height: 32px;
        background: #f84848;
        border-radius: 4px;
        color: white;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        margin-right: 16px;
    }

    .noBut {
        width: 70px;
        height: 32px;
        background: #a3a3a3;
        border-radius: 4px;
        color: white;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        margin-left: 16px;
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

    .listTitleSon {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

    .listTitleSon>div:nth-child(1) {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .listTitleSon>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
    }

    .listTitleSon>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
    }

    .listTitle>div:nth-child(2) {
        border: 1px solid #f84848;
        border-radius: 4px;
        padding: 1px 4px;
        color: #f84848;
        cursor: pointer;
    }

    /* 兴趣弹出框 */

    .labelBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%!important;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
        margin: 0!important;
    }

    .labelBoxSon {
        width: 525px;
        height: 442px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 580px) / 2) auto;
    }

    .labelBoxTop {
        width: 100%;
        height: 62px;
        text-align: center;
        line-height: 62px;
        font-size: 20px;
        font-weight: bold;
        color: #f84848;
        border-bottom: 1px solid #f84848;
    }

    .labelBoxhade {
        width: 100%;
        height: 62px;
        display: flex;
        justify-content: center;
        padding: 18px 0 12px;
    }

    .labelBoxhade input {
        width: 230px;
    }

    .labelBoxhade div {
        margin: 0 12px;
    }

    .labelBoxContent {
        width: 500px;
        height: 256px;
        margin: 0 auto;
    }

    .labelListBox {
        width: 500px;
        height: 223px;
    }

    .labelListBox>div {
        float: left;
        border: 1px solid #000;
        height: 24px;
        line-height: 24px;
        border-radius: 3px;
        margin: 6px;
        padding: 0 3px;
        cursor: pointer;
    }

    .labelListpaging {
        width: 500px;
        height: 32px;
        display: flex;
        justify-content: space-between;
    }

    .oklabel {
        background: #f84848;
        color: white;
        border: 1px solid #f84848!important;
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
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        min-width: 180px;
    }

    .labelCss>div {
        float: left;
        height: 24px;
        border-radius: 4px;
        margin: 0 4px;
    }

    .redFont {
        color: #f84848!important;
    }

    .hintFont {
        color: #f88948!important;
    }

    .redBor {
        border: 1px solid #f84848!important;
    }

    input[type=file] {
        display: none;
    }

    #brightIcon {
        display: none;
    }

    label {
        width: 70px;
        height: 32px;
        background: rgba(255, 73, 32, 0.822);
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        color: white;
        margin-right: 14px;
        cursor: pointer;
    }

    #copys {
        position: fixed;
        top: -1000px;
        left: -1000px;
        width: 1px;
        height: 1px;
    }

    .copys {
        resize: none;
        height: 32px!important;
        width: 360px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 4px;
        line-height: 32px;
        border: 1px solid #aeaeae;
        padding: 0 4px;
    }

    .copy {
        width: 70px;
        height: 32px;
        background: rgba(255, 73, 32, 0.822);
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        color: white;
        margin-left: 14px;
        cursor: pointer;
    }

    .editorFather {
        width: 80%;
        max-width: 700px;
        margin-left: 116px;
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
</style>