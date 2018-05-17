// 新闻模块
import Vue from 'vue'
const news = {
    // 动态管理-查询动态详情
    newsControllerFindByDynamicId: function newsControllerFindByDynamicId(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取热搜列表
    hotSearchList: function hotSearchList(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加热词
    addhotWords: function addhotWords(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据id删除热词
    delhotWord: function delhotWord(ip, postdata) {
        var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改热词
    edithotWord: function edithotWord(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取新闻管理列表
    newsList: function newsList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据id删除新闻管理列表
    delnews: function delnews(ip, postdata) {
        var ipstr = ip + postdata.id + '&token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 上传图片
    uploadFile: function uploadFile(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 上传视频
    uploadFileVideo: function uploadFileVideo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata) 
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取分类管理列表
    flList: function flList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据id删除分类管理列表
    delclassify: function delclassify(ip, postdata) {
        var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //修改分类列表 
    editclassify: function editclassify(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 增加分类列表
    addclassify: function addclassify(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增新闻列表
    publish: function publish(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 更新新闻列表
    editPublish: function editPublish(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取评论管理列表
    commentList: function commentList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据id删除评论管理列表
    delcommentManager: function delcommentManager(ip, postdata) {
        //  var ipstr = ip + postdata.id
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新闻管理页面批量操作
    newsbatchOp: function newsbatchOp(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 热搜管理页面批量操作
    rsbatchOp: function rsbatchOp(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 评论管理页面批量操作
    plbatchOp: function plbatchOp(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分类管理页面批量操作
    flbatchOp: function flbatchOp(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },

    // 热搜管理排序
    sorthotWord: function sorthotWord(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分类管理排序
    sortclassify: function sortclassify(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询所有的分类
    classiflyControlClassifyFindAll: function classiflyControlClassifyFindAll(ip, postdata) {
        var ipstr = ip + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询评论内容详情
    commentdetailList: function commentdetailList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除子评论
    delcommentdetailManager: function delcommentdetailManager(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //2.0********************************************************************************
    //新闻管理-多条件查询新闻列表
    newsControllerSelectNewsList: function newsControllerSelectNewsList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-新增文字/视屏类新闻
    newsControllerAddNews: function newsControllerAddNews(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-保存新闻到草稿箱
    newsControllerSaveNews: function newsControllerSaveNews(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-对新闻属性进行修改
    newsControllerUpdate: function newsControllerUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-按新闻id查询新闻的详情
    newsControllerSelectNewsDetail: function newsControllerSelectNewsDetail(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-单个或批量推荐/取消推荐新闻
    newsControllerRecommendNews: function newsControllerRecommendNews(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-批量删除新闻
    newsControllerDelete: function newsControllerDelete(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新闻管理-查看新闻互动数据详情
    SummaryControllerListNewsInteractionData: function SummaryControllerListNewsInteractionData(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //动态管理-停止/显示动态
    newsControllerShowDynamic: function newsControllerShowDynamic(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 问答管理-问答列表展示
    newsquestionsControllerListQuestions: function newsquestionsControllerListQuestions(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 问答管理-按问答id查询问答详情
    squestionsControllerGetQuestionsDetail: function squestionsControllerGetQuestionsDetail(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 问答管理-取消/推荐问答
    squestionsControllerRecommendQuestions: function squestionsControllerRecommendQuestions(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 问答管理-删除/批量删除问题
    questionsControllerDeleteQuestions: function questionsControllerDeleteQuestions(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 问答管理-查询问答互动数据信息
    snewsSummaryControllerListQuestionInteractionData: function snewsSummaryControllerListQuestionInteractionData(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //问答管理-查看问题的回答详情
    newsanswersControllerListAnswersDetail: function newsanswersControllerListAnswersDetail(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //问答管理-查看问题的回答详情-对评论操作
    newsanswersControllerSetAnswers: function newsanswersControllerSetAnswers(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-根据昵称/用户名获取用户列表
    newsuserSummaryControllerListUserSummary: function newsuserSummaryControllerListUserSummary(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-查看用户发表的文章或动态
    newsuserSummaryControllerSelectArticleList: function newsuserSummaryControllerSelectArticleList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-查看用户提出的问题
    newsuserSummaryControllerSelectQuestionList: function newsuserSummaryControllerSelectQuestionList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-查看用户的评论列表
    newsuserSummaryControllerSelectAnswersList: function newsuserSummaryControllerSelectAnswersList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-查看用户的违规详情列表
    newsuserSummaryControllerSelectIllegalListByUserId: function newsuserSummaryControllerSelectIllegalListByUserId(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-解封/封号用户
    newsuserControllerBlockUser: function newsuserControllerBlockUser(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //  用户管理-推荐/取消用户优秀的回答者
    newsuserSummaryControllerRecommend: function newsuserSummaryControllerRecommend(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 标签管理-查询标签
    newslabelControllerlistLabels: function newslabelControllerlistLabels(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 标签管理-新增标签
    newslabelControllersaveLabel: function newslabelControllersaveLabel(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 标签管理-修改标签
    newslabelControllerupdateLabel: function newslabelControllerupdateLabel(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 标签管理-删除/批量删除标签
    newslabelControllerdeleteLabels: function newslabelControllerdeleteLabels(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 作者管理-新增作者
    newsnewsAuthorControlleraddNewsAuthor: function newsnewsAuthorControlleraddNewsAuthor(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 作者管理-模糊查询作者列表
    newsnewsAuthorControllerselectAuthorList: function newsnewsAuthorControllerselectAuthorList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 作者管理-修改作者
    newsnewsAuthorControllerupdateAuthor: function newsnewsAuthorControllerupdateAuthor(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 作者管理-删除作者
    newsnewsAuthorControllerdeleteAuthor: function newsnewsAuthorControllerdeleteAuthor(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //小视频管理-根据昵称/用户名获取用户列表
    newsvideoSelectPageVideo: function newsvideoSelectPageVideo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //小视频管理-批量删除、批量推荐和取消推荐
    newsvideoupdateVideoState: function newsvideoupdateVideoState(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分页查询赞赏记录
    newsappreciatelogselectPageIAppreciateLog: function newsappreciatelogselectPageIAppreciateLog(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分页获取评论
    newscommentsInfofindCommentsByObjectId: function newscommentsInfofindCommentsByObjectId(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取草稿箱列表
    newsdraftsControllerlistLongArticle: function newsdraftsControllerlistLongArticle(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除草稿箱里长文章或删除回收站里的长文章
    newsdraftsControllerdeleteNews: function newsdraftsControllerdeleteNews(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 多条件查询审核列表
    newsuserPermissionControllerlistUserPermissionData: function newsuserPermissionControllerlistUserPermissionData(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据id查询草稿箱的详情
    newsdraftsControllerselectDraftsDetail: function newsdraftsControllerselectDraftsDetail(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改评论状态（热评/显示）
    newscommentsInfoupdateCommentInfoState: function newscommentsInfoupdateCommentInfoState(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //分页获取评论
    newscommentsInfofindCommentsByObjectId: function newscommentsInfofindCommentsByObjectId(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 对未审核用户操作
    newsuserPermissionControllerupdateUncheckedState: function newsuserPermissionControllerupdateUncheckedState(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 对已审核信息操作
    newsuserPermissionControllerupdateCheckState: function newsuserPermissionControllerupdateCheckState(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查看用户发表的文章或动态
    newsuserSummaryControllerselectArticleList: function newsuserSummaryControllerselectArticleList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查看用户提出的问题
    newsuserSummaryControllerselectQuestionList: function newsuserSummaryControllerselectQuestionList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查看用户发表的视频
    newsuserSummaryControllerselectVideoByUserId: function newsuserSummaryControllerselectVideoByUserId(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查看用户身份证信息
    newsuserPermissionControllergetUserIdCard: function newsuserPermissionControllergetUserIdCard(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除审核记录
    newsuserPermissionControllerdeleteCheckState: function newsuserPermissionControllerdeleteCheckState(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分页获取评论-修改评论状态（热评/显示）
    newscommentsInfofindUpdateCommentInfoState: function newscommentsInfofindUpdateCommentInfoState(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
}
export default news