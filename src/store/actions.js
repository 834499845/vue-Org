require('../../API/config')
import health from '../assets/health'
import getLogin from '../assets/login'
import admin from '../assets/admin'
import clientSide from '../assets/clientSide'
import news from '../assets/news'
import hospital from '../assets/hospital'
import encourage from '../assets/encourage'
import financial from '../assets/financial'
import base from '../assets/base'
import store from '../assets/store'
import food from '../assets/food'
import fitness from '../assets/fitness'
import point from '../assets/point'
export default {
    // 2.0-------------------------------------
    // ********************************饮食管理**************************************
    // 食物管理
    // 新增食物数据
    getfoodFoodAdd({ }, postdata) {
        return food.foodFoodAdd(global.foodFoodAddPath, postdata)
    },
    // 修改食物数据
    getfoodFoodUpdate({ }, postdata) {
        return food.foodFoodUpdate(global.foodFoodUpdatePath, postdata)
    },
    // 删除食物数据,并逻辑删除对应食物成分
    getfoodFoodDelete({ }, postdata) {
        return food.foodFoodDelete(global.foodFoodDeletePath, postdata)
    },
    // 分页查询食物数据
    getfoodFoodFindFoodByPageNoAndPageSize({ }, postdata) {
        return food.foodFoodFindFoodByPageNoAndPageSize(global.foodFoodFindFoodByPageNoAndPageSizePath, postdata)
    },
    // 食谱管理
    // 新增或修改食谱
    getfoodRecipesAddOrUpdate({ }, postdata) {
        return food.foodRecipesAddOrUpdate(global.foodRecipesAddOrUpdatePath, postdata)
    },
    // 删除食谱
    getfoodRecipesDelete({ }, postdata) {
        return food.foodRecipesDelete(global.foodRecipesDeletePath, postdata)
    },
    // 计量单位管理
    // 新增或修改食物计量单位
    getfoodMeasurementUnitAddOrUpdate({ }, postdata) {
        return food.foodMeasurementUnitAddOrUpdate(global.foodMeasurementUnitAddOrUpdatePath, postdata)
    },
    // 删除计量单位
    getfoodMeasurementUnitDelete({ }, postdata) {
        return food.foodMeasurementUnitDelete(global.foodMeasurementUnitDeletePath, postdata)
    },
    // 查询计量单位
    getfoodMeasurementUnitSelectAll({ }, postdata) {
        return food.foodMeasurementUnitSelectAll(global.foodMeasurementUnitSelectAllPath, postdata)
    },
    // 自定义食物
    // 查询自定义食物列表
    getfoodCustomerFoodSelectCustomerFood({ }, postdata) {
        return food.foodCustomerFoodSelectCustomerFood(global.foodCustomerFoodSelectCustomerFoodPath, postdata)
    },
    // ********************************积分管理***************************************
    // 积分设置
    // 查看基础设置-签到规则查看
    getpointIntegralSignGetSignRule({ }, postdata) {
        return point.pointIntegralSignGetSignRule(global.pointIntegralSignGetSignRulePath, postdata)
    },
    // 设置积分基础签到规则
    getpointIntegralSignSetSignRule({ }, postdata) {
        return point.pointIntegralSignSetSignRule(global.pointIntegralSignSetSignRulePath, postdata)
    },
    // 停用积分系统
    getpointIntegralSignDisableSystem({ }, postdata) {
        return point.pointIntegralSignDisableSystem(global.pointIntegralSignDisableSystemPath, postdata)
    },
    // 积分获取
    // 获取各个积分配置项
    getpointIntegralSignGetAttrList({ }, postdata) {
        return point.pointIntegralSignGetAttrList(global.pointIntegralSignGetAttrListPath, postdata)
    },
    // 编辑积分配置项
    getpointIntegralConfigAttrUpdateConfigAttr({ }, postdata) {
        return point.pointIntegralConfigAttrUpdateConfigAttr(global.pointIntegralConfigAttrUpdateConfigAttrPath, postdata)
    },
    // 修改配置项状态
    getpointIntegralConfigAttrChangeAttrStatus({ }, postdata) {
        return point.pointIntegralConfigAttrChangeAttrStatus(global.pointIntegralConfigAttrChangeAttrStatusPath, postdata)
    },
    // 积分统计
    // 按条件分页查询用户积分列表接口
    getpointIntegralUserGetUserIntegralListByCondition({ }, postdata) {
        return point.pointIntegralUserGetUserIntegralListByCondition(global.pointIntegralUserGetUserIntegralListByConditionPath, postdata)
    },
    // 分页获取用户积分明细列表接口(查看详情接口)
    getpointIntegralUserDetailGetDetailList({ }, postdata) {
        return point.pointIntegralUserDetailGetDetailList(global.pointIntegralUserDetailGetDetailListPath, postdata)
    },
    // 编辑用户积分接口
    getpointIntegralUserUpdateUserIntegral({ }, postdata) {
        return point.pointIntegralUserUpdateUserIntegral(global.pointIntegralUserUpdateUserIntegralPath, postdata)
    },
    // 勋章管理
    // 新增勋章接口
    getpointIntegralMedalInsert({ }, postdata) {
        return point.pointIntegralMedalInsert(global.pointIntegralMedalInsertPath, postdata)
    },
    // 编辑勋章接口
    getpointIntegralMedalUpdate({ }, postdata) {
        return point.pointIntegralMedalUpdate(global.pointIntegralMedalUpdatePath, postdata)
    },
    // 分页获取勋章列表接口
    getpointIntegralMedalGetMedalByPage({ }, postdata) {
        return point.pointIntegralMedalGetMedalByPage(global.pointIntegralMedalGetMedalByPagePath, postdata)
    },
    // 前台管理
    // 分页查看用户管理列表
    getClientSideAccountSelectAccountByCondition({ }, postdata) {
        return clientSide.ClientSideAccountSelectAccountByCondition(global.ClientSideAccountSelectAccountByConditionPath, postdata)
    },
    // 按条件分页查询认证资料列表接口
    getClientSideIdentityAuditGetApplyDataListByCondition({ }, postdata) {
        return clientSide.ClientSideIdentityAuditGetApplyDataListByCondition(global.ClientSideIdentityAuditGetApplyDataListByConditionPath, postdata)
    },
    // 查看申请资料详情接口
    getClientSideIdentityAuditGetApplyData({ }, postdata) {
        return clientSide.ClientSideIdentityAuditGetApplyData(global.ClientSideIdentityAuditGetApplyDataPath, postdata)
    },
    // 审批认证申请接口
    getClientSideIdentityAuditAudit({ }, postdata) {
        return clientSide.ClientSideIdentityAuditAudit(global.ClientSideIdentityAuditAuditPath, postdata)
    },
    // 获取拒绝原因列表接口
    getClientSideIdentityAuditGetRejectReasonList({ }, postdata) {
        return clientSide.ClientSideIdentityAuditGetRejectReasonList(global.ClientSideIdentityAuditGetRejectReasonListPath, postdata)
    },
    // 根据条件查询待审核的申诉记录
    getClientSideAppealGetAppealList({ }, postdata) {
        return clientSide.ClientSideAppealGetAppealList(global.ClientSideAppealGetAppealListPath, postdata)
    },
    // 查看指定申诉记录
    getClientAppealgetAppealById({ }, postdata) {
        return clientSide.ClientAppealgetAppealById(global.ClientAppealgetAppealByIdPath, postdata)
    },
    // 申诉审核通过
    getClientSideAppealPassAppealRequest({ }, postdata) {
        return clientSide.ClientSideAppealPassAppealRequest(global.ClientSideAppealPassAppealRequestPath, postdata)
    },
    // 申诉拒绝
    getClientSideAppealRejectAppealRequest({ }, postdata) {
        return clientSide.ClientSideAppealRejectAppealRequest(global.ClientSideAppealRejectAppealRequestPath, postdata)
    },
    // 审核医生
    getMedicalDoctorCheck({ }, postdata) {
        return hospital.MedicalDoctorCheck(global.MedicalDoctorCheckPath, postdata)
    },
    // 获取医生审核拒绝原因列表
    getMedicalDoctormedicalDictionarygetReasonsForRefusalDoctor({ }, postdata) {
        return hospital.MedicalDoctormedicalDictionarygetReasonsForRefusalDoctor(global.MedicalDoctormedicalDictionarygetReasonsForRefusalDoctorPath, postdata)
    },
    // 症状自查-新增或修改症状部位关系
    getMedicalsymptomPositionadd({ }, postdata) {
        return hospital.MedicalsymptomPositionadd(global.MedicalsymptomPositionaddPath, postdata)
    },
    // 症状自查-删除症状部位关系
    getMedicalsymptomPositiondelete({ }, postdata) {
        return hospital.MedicalsymptomPositiondelete(global.MedicalsymptomPositiondeletePath, postdata)
    },
    // 症状自查-根据部位id查询症状列表
    getMedicalsymptomPositionselectSymptomByPositionId({ }, postdata) {
        return hospital.MedicalsymptomPositionselectSymptomByPositionId(global.MedicalsymptomPositionselectSymptomByPositionIdPath, postdata)
    },
    // 疾病管理-新增或者修改疾病
    getMedicaldiseaseaddOrUpdate({ }, postdata) {
        return hospital.MedicaldiseaseaddOrUpdate(global.MedicaldiseaseaddOrUpdatePath, postdata)
    },
    // 疾病管理-查询疾病详情
    getMedicaldiseaseselectDiseaseById({ }, postdata) {
        return hospital.MedicaldiseaseselectDiseaseById(global.MedicaldiseaseselectDiseaseByIdPath, postdata)
    },
    // 疾病管理-修改常见状态或删除疾病
    getMedicaldiseasedelete({ }, postdata) {
        return hospital.Medicaldiseasedelete(global.MedicaldiseasedeletePath, postdata)
    },
    // 用药管理-新增或修改症状药品推荐
    getMedicalhomeDrugRecommendaddOrUpdateHomeDrugRecommend({ }, postdata) {
        return hospital.MedicalhomeDrugRecommendaddOrUpdateHomeDrugRecommend(global.MedicalhomeDrugRecommendaddOrUpdateHomeDrugRecommendPath, postdata)
    },
    // 用药管理-查询症状药品详情
    getMedicalhomeDrugRecommendselectHomeDrugRecommendById({ }, postdata) {
        return hospital.MedicalhomeDrugRecommendselectHomeDrugRecommendById(global.MedicalhomeDrugRecommendselectHomeDrugRecommendByIdPath, postdata)
    },
    // 用药管理-查询症状药品推荐列表
    getMedicalhomeDrugRecommendselectHomeDrugRecommend({ }, postdata) {
        return hospital.MedicalhomeDrugRecommendselectHomeDrugRecommend(global.MedicalhomeDrugRecommendselectHomeDrugRecommendPath, postdata)
    },
    // 圈子管理-获取圈子审核拒绝原因
    getMedicalmedicalDictionarygetReasonsForRefusalCircle({ }, postdata) {
        return hospital.MedicalmedicalDictionarygetReasonsForRefusalCircle(global.MedicalmedicalDictionarygetReasonsForRefusalCirclePath, postdata)
    },
    // 圈子管理-审核圈子
    getMedicalcirclecheck({ }, postdata) {
        return hospital.Medicalcirclecheck(global.MedicalcirclecheckPath, postdata)
    },
    // 圈子管理-根据条件查询圈子列表接口
    getMedicalcirclefindCircleListByCondition({ }, postdata) {
        return hospital.MedicalcirclefindCircleListByCondition(global.MedicalcirclefindCircleListByConditionPath, postdata)
    },
    // 圈子管理-查看圈主资料接口
    getMedicalcirclegetCreatorDetail({ }, postdata) {
        return hospital.MedicalcirclegetCreatorDetail(global.MedicalcirclegetCreatorDetailPath, postdata)
    },
    // 圈子分类-新增圈子分类
    getMedicalcircleAssortmentadd({ }, postdata) {
        return hospital.MedicalcircleAssortmentadd(global.MedicalcircleAssortmentaddPath, postdata)
    },
    // 圈子分类-修改圈子分类
    getMedicalcircleAssortmentupdate({ }, postdata) {
        return hospital.MedicalcircleAssortmentupdate(global.MedicalcircleAssortmentupdatePath, postdata)
    },
    // 圈子分类-删除圈子分类
    getMedicalcircleAssortmentdelete({ }, postdata) {
        return hospital.MedicalcircleAssortmentdelete(global.MedicalcircleAssortmentdeletePath, postdata)
    },
    // 圈子分类-分页查询圈子分类
    getMedicalcircleAssortmentselect({ }, postdata) {
        return hospital.MedicalcircleAssortmentselect(global.MedicalcircleAssortmentselectPath, postdata)
    },
    // 热词管理-新增热词
    getMedicalhotSearchadd({ }, postdata) {
        return hospital.MedicalhotSearchadd(global.MedicalhotSearchaddPath, postdata)
    },
    // 热词管理-修改热词
    getMedicalhotSearchupdate({ }, postdata) {
        return hospital.MedicalhotSearchupdate(global.MedicalhotSearchupdatePath, postdata)
    },
    // 热词管理-删除热词
    getMedicalhotSearchdelete({ }, postdata) {
        return hospital.MedicalhotSearchdelete(global.MedicalhotSearchdeletePath, postdata)
    },
    // 热词管理-获取所有热词接口
    getMedicalhotSearchgetHotSearch({ }, postdata) {
        return hospital.MedicalhotSearchgetHotSearch(global.MedicalhotSearchgetHotSearchPath, postdata)
    },







    // 新闻2.0相关***********************************************************************************
    //新闻管理-多条件查询新闻列表
    getnewsControllerSelectNewsList({ }, postdata) {
        return news.newsControllerSelectNewsList(global.newsControllerSelectNewsListPath, postdata)
    },
    //新闻管理-新增文字/视屏类新闻
    getnewsControllerAddNews({ }, postdata) {
        return news.newsControllerAddNews(global.newsControllerAddNewsPath, postdata)
    },
    //新闻管理-保存新闻到草稿箱
    getnewsControllerSaveNews({ }, postdata) {
        return news.newsControllerSaveNews(global.newsControllerSaveNewsPath, postdata)
    },
    //新闻管理-对新闻属性进行修改
    getnewsControllerUpdate({ }, postdata) {
        return news.newsControllerUpdate(global.newsControllerUpdatePath, postdata)
    },
    //新闻管理-按新闻id查询新闻的详情
    getnewsControllerSelectNewsDetail({ }, postdata) {
        return news.newsControllerSelectNewsDetail(global.newsControllerSelectNewsDetailPath, postdata)
    },
    //新闻管理-单个或批量推荐/取消推荐新闻
    getnewsControllerRecommendNews({ }, postdata) {
        return news.newsControllerRecommendNews(global.newsControllerRecommendNewsPath, postdata)
    },
    //新闻管理-批量删除新闻
    getControllerDelete({ }, postdata) {
        return news.newsControllerDelete(global.newsControllerDeletePath, postdata)
    },
    //新闻管理-查看新闻互动数据详情
    getSummaryControllerListNewsInteractionData({ }, postdata) {
        return news.SummaryControllerListNewsInteractionData(global.newsSummaryControllerListNewsInteractionDataPath, postdata)
    },
    //动态管理-停止/显示动态
    getControllerShowDynamic({ }, postdata) {
        return news.newsControllerShowDynamic(global.newsControllerShowDynamicPath, postdata)
    },
    // 问答管理-问答列表展示
    getquestionsControllerListQuestions({ }, postdata) {
        return news.newsquestionsControllerListQuestions(global.newsquestionsControllerListQuestionsPath, postdata)
    },
    // 问答管理-按问答id查询问答详情
    getsquestionsControllerGetQuestionsDetail({ }, postdata) {
        return news.squestionsControllerGetQuestionsDetail(global.newsquestionsControllerGetQuestionsDetailPath, postdata)
    },
    // 问答管理-取消/推荐问答
    getsquestionsControllerRecommendQuestions({ }, postdata) {
        return news.squestionsControllerRecommendQuestions(global.newsquestionsControllerRecommendQuestionsPath, postdata)
    },
    // 问答管理-删除/批量删除问题
    getquestionsControllerDeleteQuestions({ }, postdata) {
        return news.questionsControllerDeleteQuestions(global.newsquestionsControllerDeleteQuestionsPath, postdata)
    },
    // 问答管理-查询问答互动数据信息
    getsnewsSummaryControllerListQuestionInteractionData({ }, postdata) {
        return news.snewsSummaryControllerListQuestionInteractionData(global.newsnewsSummaryControllerListQuestionInteractionDataPath, postdata)
    },
    //问答管理-查看问题的回答详情
    getanswersControllerListAnswersDetail({ }, postdata) {
        return news.newsanswersControllerListAnswersDetail(global.newsanswersControllerListAnswersDetailPath, postdata)
    },
    //问答管理-查看问题的回答详情-对评论操作
    getanswersControllerSetAnswers({ }, postdata) {
        return news.newsanswersControllerSetAnswers(global.newsanswersControllerSetAnswersPath, postdata)
    },
    // 标签管理-查询标签
    getlabelControllerlistLabels({ }, postdata) {
        return news.newslabelControllerlistLabels(global.newslabelControllerlistLabelsPath, postdata)
    },
    // 标签管理-新增标签
    getlabelControllersaveLabel({ }, postdata) {
        return news.newslabelControllersaveLabel(global.newslabelControllersaveLabelPath, postdata)
    },
    // 标签管理-修改标签
    getlabelControllerupdateLabel({ }, postdata) {
        return news.newslabelControllerupdateLabel(global.newslabelControllerupdateLabelPath, postdata)
    },
    // 标签管理-删除/批量删除标签
    getlabelControllerdeleteLabels({ }, postdata) {
        return news.newslabelControllerdeleteLabels(global.newslabelControllerdeleteLabelsPath, postdata)
    },
    // 作者管理-新增作者
    getnewsAuthorControlleraddNewsAuthor({ }, postdata) {
        return news.newsnewsAuthorControlleraddNewsAuthor(global.newsnewsAuthorControlleraddNewsAuthorPath, postdata)
    },
    // 作者管理-模糊查询作者列表
    getnewsAuthorControllerselectAuthorList({ }, postdata) {
        return news.newsnewsAuthorControllerselectAuthorList(global.newsnewsAuthorControllerselectAuthorListPath, postdata)
    },
    // 作者管理-修改作者
    getnewsAuthorControllerupdateAuthor({ }, postdata) {
        return news.newsnewsAuthorControllerupdateAuthor(global.newsnewsAuthorControllerupdateAuthorPath, postdata)
    },
    // 作者管理-删除作者
    getnewsAuthorControllerdeleteAuthor({ }, postdata) {
        return news.newsnewsAuthorControllerdeleteAuthor(global.newsnewsAuthorControllerdeleteAuthorPath, postdata)
    },
    //小视频管理-根据昵称/用户名获取用户列表
    getVideoSelectPageVideo({ }, postdata) {
        return news.newsvideoSelectPageVideo(global.newsvideoSelectPageVideoPath, postdata)
    },
    //小视频管理-批量删除、批量推荐和取消推荐
    getvideoupdateVideoState({ }, postdata) {
        return news.newsvideoupdateVideoState(global.newsvideoupdateVideoStatePath, postdata)
    },
    // 分页查询赞赏记录
    getappreciatelogselectPageIAppreciateLog({ }, postdata) {
        return news.newsappreciatelogselectPageIAppreciateLog(global.newsappreciatelogselectPageIAppreciateLogPath, postdata)
    },
    // 获取草稿箱列表
    getdraftsControllerlistLongArticle({ }, postdata) {
        return news.newsdraftsControllerlistLongArticle(global.newsdraftsControllerlistLongArticlePath, postdata)
    },
    // 删除草稿箱里长文章或删除回收站里的长文章
    getdraftsControllerdeleteNews({ }, postdata) {
        return news.newsdraftsControllerdeleteNews(global.newsdraftsControllerdeleteNewsPath, postdata)
    },
    // 根据id查询草稿箱的详情
    getdraftsControllerselectDraftsDetail({ }, postdata) {
        return news.newsdraftsControllerselectDraftsDetail(global.newsdraftsControllerselectDraftsDetailPath, postdata)
    },
    // 分页获取评论
    getcommentsInfofindCommentsByObjectId({ }, postdata) {
        return news.newscommentsInfofindCommentsByObjectId(global.newscommentsInfofindCommentsByObjectIdPath, postdata)
    },
    // 修改评论状态（热评/显示）
    getcommentsInfoupdateCommentInfoState({ }, postdata) {
        return news.newscommentsInfoupdateCommentInfoState(global.newscommentsInfoupdateCommentInfoStatePath, postdata)
    },
    // 对未审核用户操作
    getuserPermissionControllerupdateUncheckedState({ }, postdata) {
        return news.newsuserPermissionControllerupdateUncheckedState(global.newsuserPermissionControllerupdateUncheckedStatePath, postdata)
    },
    // 对已审核信息操作
    getuserPermissionControllerupdateCheckState({ }, postdata) {
        return news.newsuserPermissionControllerupdateCheckState(global.newsuserPermissionControllerupdateCheckStatePath, postdata)
    },
    // 查看用户发表的文章或动态
    getuserSummaryControllerselectArticleList({ }, postdata) {
        return news.newsuserSummaryControllerselectArticleList(global.newsuserSummaryControllerselectArticleListPath, postdata)
    },
    // 查看用户提出的问题
    getuserSummaryControllerselectQuestionList({ }, postdata) {
        return news.newsuserSummaryControllerselectQuestionList(global.newsuserSummaryControllerselectQuestionListPath, postdata)
    },
    // 查看用户发表的视频
    getuserSummaryControllerselectVideoByUserId({ }, postdata) {
        return news.newsuserSummaryControllerselectVideoByUserId(global.newsuserSummaryControllerselectVideoByUserIdPath, postdata)
    },
    // 查看用户身份证信息
    getuserPermissionControllergetUserIdCard({ }, postdata) {
        return news.newsuserPermissionControllergetUserIdCard(global.newsuserPermissionControllergetUserIdCardPath, postdata)
    },
    // 删除审核记录
    getuserPermissionControllerdeleteCheckState({ }, postdata) {
        return news.newsuserPermissionControllerdeleteCheckState(global.newsuserPermissionControllerdeleteCheckStatePath, postdata)
    },
    //分页获取评论
    getcommentsInfofindCommentsByObjectId({ }, postdata) {
        return news.newscommentsInfofindCommentsByObjectId(global.newscommentsInfofindCommentsByObjectIdPath, postdata)
    },
    // 分页获取评论-修改评论状态（热评/显示）
    getcommentsInfofindUpdateCommentInfoState({ }, postdata) {
        return news.newscommentsInfofindUpdateCommentInfoState(global.newscommentsInfofindUpdateCommentInfoStatePath, postdata)
    },
    //  用户管理-根据昵称/用户名获取用户列表
    getsuserSummaryControllerListUserSummary({ }, postdata) {
        return news.newsuserSummaryControllerListUserSummary(global.newsuserSummaryControllerListUserSummaryPath, postdata)
    },
    //  用户管理-查看用户发表的文章或动态
    getuserSummaryControllerSelectArticleList({ }, postdata) {
        return news.newsuserSummaryControllerSelectArticleList(global.newsuserSummaryControllerSelectArticleListPath, postdata)
    },
    //  用户管理-查看用户提出的问题
    getuserSummaryControllerSelectQuestionList({ }, postdata) {
        return news.newsuserSummaryControllerSelectQuestionList(global.newsuserSummaryControllerSelectQuestionListPath, postdata)
    },
    //  用户管理-查看用户的评论列表
    getuserSummaryControllerSelectAnswersList({ }, postdata) {
        return news.newsuserSummaryControllerSelectAnswersList(global.newsuserSummaryControllerSelectAnswersListPath, postdata)
    },
    //  用户管理-查看用户的违规详情列表
    getuserSummaryControllerSelectIllegalListByUserId({ }, postdata) {
        return news.newsuserSummaryControllerSelectIllegalListByUserId(global.newsuserSummaryControllerSelectIllegalListByUserIdPath, postdata)
    },
    //  用户管理-解封/封号用户
    getuserControllerBlockUser({ }, postdata) {
        return news.newsuserControllerBlockUser(global.newsuserControllerBlockUserPath, postdata)
    },
    //  用户管理-推荐/取消用户优秀的回答者
    getsuserSummaryControllerRecommend({ }, postdata) {
        return news.newsuserSummaryControllerRecommend(global.newsuserSummaryControllerRecommendPath, postdata)
    },
    // 多条件查询审核列表
    getuserPermissionControllerlistUserPermissionData({ }, postdata) {
        return news.newsuserPermissionControllerlistUserPermissionData(global.newsuserPermissionControllerlistUserPermissionDataPath, postdata)
    },








    // 健康2.0相关***********************************************************************************
    // 查询健康档案信息
    gethealthRecordshgetHealthRecordsDetail({ }, postdata) {
        return health.healthhealthRecordshgetHealthRecordsDetail(global.healthhealthRecordshgetHealthRecordsDetailPath, postdata)
    },
    // 获取健康档案页卡名称
    gethealthRecordsgetPageCardName({ }, postdata) {
        return health.healthhealthRecordsgetPageCardName(global.healthhealthRecordsgetPageCardNamePath, postdata)
    },
    // 获取关联账号信息列表
    gethealthRecordsgetRelationAccountInfo({ }, postdata) {
        return health.healthhealthRecordsgetRelationAccountInfo(global.healthhealthRecordsgetRelationAccountInfoPath, postdata)
    },



    // 数据同步相关***********************************************************************************
    // 登录
    // 数据同步接口
    getbasestaticdatasync({ }, postdata) {
        return base.basestaticdatasync(global.staticdatasyncPath, postdata)
    },
    // 根据类型获取topic
    getbasestaticdatagetTopic({ }, postdata) {
        return base.basestaticdatagetTopic(global.staticdatagetTopicPath, postdata)
    },

    // 首页活动热门 - 添加热门活动
    getbasehoteventaddHotEvent({ }, postdata) {
        return base.basehoteventaddHotEvent(global.basehoteventaddHotEventPath, postdata)
    },
    // 首页活动热门 - 修改热门活动
    getbasehoteventeditHotEvent({ }, postdata) {
        return base.basehoteventeditHotEvent(global.basehoteventeditHotEventPath, postdata)
    },
    // 首页活动热门 - 查询热门活动列表
    getbasehoteventgetHotEvent({ }, postdata) {
        return base.basehoteventgetHotEvent(global.basehoteventgetHotEventPath, postdata)
    },
    // 首页活动热门 - 查询热门活动详情
    getbasehoteventgetHotEventInfo({ }, postdata) {
        return base.basehoteventgetHotEventInfo(global.basehoteventgetHotEventInfoPath, postdata)
    },
    // 首页活动热门 - 禁止热门活动
    getbasehoteventdisableHotEvent({ }, postdata) {
        return base.basehoteventdisableHotEvent(global.basehoteventdisableHotEventPath, postdata)
    },
    // 首页活动热门 - 启用热门活动
    getbasehoteventenableHotEvent({ }, postdata) {
        return base.basehoteventenableHotEvent(global.basehoteventenableHotEventPath, postdata)
    },
    // 首页活动热门 - 删除热门活动
    getbasehoteventdeleteHotEvent({ }, postdata) {
        return base.basehoteventdeleteHotEvent(global.basehoteventdeleteHotEventPath, postdata)
    },
    // 首页功能区 - 添加首页功能区
    getbasehomeFunctioncreate({ }, postdata) {
        return base.basehomeFunctioncreate(global.basehomeFunctioncreatePath, postdata)
    },
    // 首页功能区 - 修改首页功能区
    getbasehomeFunctionupdate({ }, postdata) {
        return base.basehomeFunctionupdate(global.basehomeFunctionupdatePath, postdata)
    },
    // 首页功能区 - 查询首页功能区列表
    getbasehomeFunctionqueryAll({ }, postdata) {
        return base.basehomeFunctionqueryAll(global.basehomeFunctionqueryAllPath, postdata)
    },
    // 首页功能区 - 修改默认配置首页服务
    getbasehomeFunctionupdateDefault({ }, postdata) {
        return base.basehomeFunctionupdateDefault(global.basehomeFunctionupdateDefaultPath, postdata)
    },
    // 首页功能区 - 首页功能区明细查询
    getbasehomeFunctionquery({ }, postdata) {
        return base.basehomeFunctionquery(global.basehomeFunctionqueryPath, postdata)
    },
    // 首页功能区 - 查询默认首页服务列表
    getbasehomeFunctionqueryDefault({ }, postdata) {
        return base.basehomeFunctionqueryDefault(global.basehomeFunctionqueryDefaultPath, postdata)
    },
    // 首页功能区 - 更新首页服务开启状态
    getbasehomeFunctionstatus({ }, postdata) {
        return base.basehomeFunctionstatus(global.basehomeFunctionstatusPath, postdata)
    },

    // 1.0--------------------------------------
    // 登录 https://app-api.botu.com:9001/life-authority-account/V1.0.0/static/account/login
    login({ }, postdata) {
        return getLogin(global.loginpath, postdata)
    },
    // 查询账户下的角色
    getAcountAndRoleList({ }, postdata) {
        return admin.adminAcountAndRoleList(global.adminAcountAndRoleListPath, postdata)
    },
    // 账户模块**************************************************************************
    // 新增账户
    getAddAcount({ }, postdata) {
        return admin.adminAddAcount(global.adminAddAcountPath, postdata)
    },
    // 账户列表
    getListAcount({ }, postdata) {
        return admin.adminListAcount(global.adminAcountListPath, postdata)
    },
    // 账户和角色关联
    getAcountAndRole({ }, postdata) {
        return admin.adminAcountAndRole(global.adminAcountAndRolePath, postdata)
    },
    // 账户下角色列表
    getListResRole({ }, postdata) {
        return admin.adminListResRole(global.adminRoleResListPath, postdata)
    },
    // 删除角色下资源列表
    getDelRoleRes({ }, postdata) {
        return admin.adminDelResRole(global.adminRoleResDelPath, postdata)
    },
    // 删除账户下角色
    getDelAcountRole({ }, postdata) {
        return admin.adminDelAcountAndRole(global.adminDelAcountRolePath, postdata)
    },
    // 修改账户状态
    getStateAcount({ }, postdata) {
        return admin.adminStateAcount(global.adminAcountStatePAth, postdata)
    },
    // 删除账户
    getDelAcount({ }, postdata) {
        return admin.adminDelAcount(global.adminAcountDelPath, postdata)
    },
    // 修改账户信息
    getUpAcount({ }, postdata) {
        return admin.adminUpAcount(global.adminAcountUpPath, postdata)
    },
    // 新增角色
    getAddRole({ }, postdata) {
        return admin.adminAddRole(global.adminAddRolePath, postdata)
    },
    // 角色列表
    getListRole({ }, postdata) {
        return admin.adminListRole(global.adminListRolePath, postdata)
    },
    // 更新角色
    getUpdateRole({ }, postdata) {
        return admin.adminUpRole(global.adminUpRolePath, postdata)
    },
    // 删除角色
    getDelRole({ }, postdata) {
        return admin.adminDelRole(global.adminDelRolePath, postdata)
    },
    // 角色关联资源
    getRoleRes({ }, postdata) {
        return admin.adminRoleRes(global.adminRoleResPath, postdata)
    },
    // 新增资源
    getAddRes({ }, postdata) {
        return admin.adminAddRes(global.adminAddResPath, postdata)
    },
    // 资源列表
    getListRes({ }, postdata) {
        return admin.adminListRes(global.adminListResPath, postdata)
    },
    // 更新资源
    getUpRes({ }, postdata) {
        return admin.adminUpRes(global.adminUpResPath, postdata)
    },
    // 删除资源
    getDelRes({ }, postdata) {
        return admin.adminDelRes(global.adminDelResPath, postdata)
    },
    // 健康模块**************************************************************************
    // 获取用户列表
    getuserinfoList({ }, postdata) {
        return health.healthuserinfoList(global.healthuserinfoListPath, postdata)
    },
    // 获取用户最近健康数据操作记录
    getFindgetUserHealthData({ }, postdata) {
        return health.healthFindgetUserHealthData(global.healthFindgetUserHealthDataPath, postdata)
    },
    // 获取地域信息
    getfindAreaFromRedisList({ }, postdata) {
        return health.healthfindAreaFromRedisList(global.healthFindAreaListPath, postdata)
    },
    // 获取年龄信息
    getfindAgeGroupFromRedisList({ }, postdata) {
        return health.healthfindAgeGroupFromRedisList(global.healthFindAgeListPath, postdata)
    },
    // 添加标准信息
    getAddstandardData({ }, postdata) {
        return health.getAddstandardData(global.healthAddstandardPath, postdata)
    },
    // 修改标准信息
    getUpdatestandardData({ }, postdata) {
        return health.getUpstandardData(global.healthUpstandardPath, postdata)
    },
    // 查询健康建议列表
    getFindTipList({ }, postdata) {
        return health.healthFindTipList(global.healthFindTipListPath, postdata)
    },
    // 更新单个健康建议列表
    getUpTipOne({ }, postdata) {
        return health.healthUpTipOne(global.healthUpdateTipOnePath, postdata)
    },
    // 批量添加健康建议列表
    getAddTips({ }, postdata) {
        return health.healthAddTips(global.healthAddTipsPath, postdata)
    },
    // 获取标准数据字典
    getFindBzzbFromRedisList({ }, postdata) {
        return health.healthFindBzzbFrom(global.healthFindBzzbModulesPath, postdata)
    },
    // 查询已录入的体征
    getLrtzFromRedisList({ }, postdata) {
        return health.healthLrtzFromRedisList(global.healthFindLrtzFromRedisPath, postdata)
    },
    // 获取标准数据列表
    getfindStandardDataList({ }, postdata) {
        return health.healthfindStandardDataList(global.healthfindStandardDataPath, postdata)
    },
    // 删除模型
    getDeleteModules({ }, postdata) {
        return health.healthDeleteModules(global.healthDeleteModulesPath, postdata)
    },
    // 添加健康建议
    getAddSuggest({ }, postdata) {
        return health.healthAddSuggest(global.healthAddSuggestPath, postdata)
    },
    // 修改健康建议
    getUpdateSuggest({ }, postdata) {
        return health.healthUpdateSuggest(global.healthUpdateSuggestPath, postdata)
    },
    // 删除健康建议
    getDeleteSuggest({ }, postdata) {
        return health.healthDeleteSuggest(global.healthDeleteSuggestPath, postdata)
    },
    // 新增字典
    getAddDictionary({ }, postdata) {
        return health.healthAddDictionary(global.healthAddDictionaryPath, postdata)
    },
    // 修改字典
    getupDictionary({ }, postdata) {
        return health.healthupDictionary(global.healthupDictionaryPath, postdata)
    },
    // 删除字典
    getDeleteDictionary({ }, postdata) {
        return health.healthDelDictionary(global.healthDelDictionaryPath, postdata)
    },
    getCheckIndexRangeCode({ }, postdata) {
        return health.healthCheckIndexRangeCode(global.healthCheckIndexRangeCodePath, postdata)
    },
    // 查询基础字典
    getFindBaseDictionary({ }, postdata) {
        return health.healthFindBaseDictionary(global.healthFindBaseDictionaryPath, postdata)
    },
    // 查询父code子字典类型集合
    getFindBaseDictionaryFromRedis({ }, postdata) {
        return health.healthFindBaseDictionaryFromRedis(global.healthFindBaseDictionaryFromRedisPath, postdata)
    },
    // 获取所有根字典接口
    getfindRootDictionary({ }, postdata) {
        return health.healthfindRootDictionary(global.healthfindRootDictionaryPath, postdata)
    },
    // 根据字典id获取字典以及子字典列表
    getfindDictionaryListById({ }, postdata) {
        return health.healtfindDictionaryListById(global.healtfindDictionaryListByIdPath, postdata)
    },
    // 根据父id查询子字典列表接口
    gethealtfindDictionaryfindListByParentId({ }, postdata) {
        return health.healtfindDictionaryfindListByParentId(global.healtfindDictionaryfindListByParentIdPath, postdata)
    },
    // 查询字典详情接口
    getfindDictionaryById({ }, postdata) {
        return health.healthfindDictionaryById(global.healthfindDictionaryByIdPath, postdata)
    },
    // 新增健康建议
    gethealthbodyCheckRuleAdd({ }, postdata) {
        return health.healthbodyCheckRuleAdd(global.healthbodyCheckRuleAddPath, postdata)
    },
    // 查询检测规则列表
    gethealthfindByPageNoAndPageSize({ }, postdata) {
        return health.healthfindByPageNoAndPageSize(global.healthfindByPageNoAndPageSizePath, postdata)
    },
    // 修改检测规则
    getfindhealthbodyCheckRuleupdate({ }, postdata) {
        return health.healthbodyCheckRuleupdate(global.healthbodyCheckRuleupdatePath, postdata)
    },
    // 删除检测规则
    gethealthbodyCheckRuledelete({ }, postdata) {
        return health.healthbodyCheckRuledelete(global.healthbodyCheckRuledeletePath, postdata)
    },
    // 查询检测类目列表
    gethealthfindJcTypeList({ }, postdata) {
        return health.healthfindJcTypeList(global.healthfindJcTypeListPath, postdata)
    },
    // 类目对应问题列表
    gethealthfindJcOptionsList({ }, postdata) {
        return health.healthfindJcOptionsList(global.healthfindJcOptionsListPath, postdata)
    },
    // **************************************新闻模块*******************************
    // 获取热搜列表
    gethotSearchList({ }, postdata) {
        return news.hotSearchList(global.hotSearchListPath, postdata)
    },
    // 添加热词
    getaddhotWords({ }, postdata) {
        return news.addhotWords(global.addhotWordsPath, postdata)
    },
    // 根据id删除热词
    getdelhotWord({ }, postdata) {
        return news.delhotWord(global.delhotWordPath, postdata)
    },
    // 修改热词
    getedithotWord({ }, postdata) {
        return news.edithotWord(global.edithotWordPath, postdata)
    },
    // 动态管理-查询动态详情
    getnewsControllerFindByDynamicId({ }, postdata) {
        return news.newsControllerFindByDynamicId(global.newsControllerFindByDynamicIdPath, postdata)
    },
    // 获取新闻管理列表
    getnewsList({ }, postdata) {
        return news.newsList(global.newsListPath, postdata)
    },
    // 根据id删除新闻管理列表
    getdelnews({ }, postdata) {
        return news.delnews(global.delnewsPath, postdata)
    },
    // 上传图片
    uploadFile({ }, postdata) {
        return news.uploadFile(global.uploadFilePath, postdata)
    },
    // 上传视频
    getUploawdFileVideo({ }, postdata) {
        return news.uploadFileVideo(global.uploadFileVideoPath, postdata)
    },
    // 获取分类管理列表
    getflList({ }, postdata) {
        return news.flList(global.flListPath, postdata)
    },
    // 根据id删除分类管理列表
    getdelclassify({ }, postdata) {
        return news.delclassify(global.delclassifyPath, postdata)
    },
    // 修改分类管理列表
    geteditclassify({ }, postdata) {
        return news.editclassify(global.editclassifyPath, postdata)
    },
    // 增加分类管理列表
    getaddclassify({ }, postdata) {
        return news.addclassify(global.addclassifyPath, postdata)
    },
    // 新增新闻列表
    getpublish({ }, postdata) {
        return news.publish(global.publishPath, postdata)
    },
    // 更新新闻列表
    geteditPublish({ }, postdata) {
        return news.editPublish(global.editPublishPath, postdata)
    },
    // 获取评论管理列表
    getcommentList({ }, postdata) {
        return news.commentList(global.commentListPath, postdata)
    },
    // 根据id删除评论管理列表
    getdelcommentManager({ }, postdata) {
        return news.delcommentManager(global.delcommentManagerPath, postdata)
    },
    //新闻管理页面批量操作
    getnewsbatchOp({ }, postdata) {
        return news.newsbatchOp(global.newsbatchOpPath, postdata)
    },
    // 热搜管理页面批量操作
    getrsbatchOp({ }, postdata) {
        return news.rsbatchOp(global.rsbatchOpPath, postdata)
    },
    // 评论管理页面批量操作
    getplbatchOp({ }, postdata) {
        return news.plbatchOp(global.plbatchOpPath, postdata)
    },
    // 分类管理页面批量操作
    getflbatchOp({ }, postdata) {
        return news.flbatchOp(global.flbatchOpPath, postdata)
    },
    // 热搜管理排序
    getsorthotWord({ }, postdata) {
        return news.sorthotWord(global.sorthotWordPath, postdata)
    },
    // 分类管理排序
    getsortclassify({ }, postdata) {
        return news.sortclassify(global.sortclassifyPath, postdata)
    },
    // 查询所有的分类
    getclassiflyControlClassifyFindAll({ }, postdata) {
        return news.classiflyControlClassifyFindAll(global.classiflyControlClassifyFindAllPath, postdata)
    },
    // 查询评论内容详情
    getcommentdetailList({ }, postdata) {
        return news.commentdetailList(global.commentdetailListPath, postdata)
    },
    // 删除子评论
    getdelcommentdetailManager({ }, postdata) {
        return news.delcommentdetailManager(global.delcommentdetailManagerPath, postdata)
    },
    // **************************************医疗模块*******************************
    // 上传图片
    gethosuploadFile({ }, postdata) {
        return hospital.hosuploadFile(global.hospitaluploadFilePath, postdata)
    },
    // 获取医院管理列表
    gethospitalmanageList({ }, postdata) {
        return hospital.hospitalmanageList(global.hospitalmanageListPath, postdata)
    },
    // 医院列表排序
    getHospRank({ }, postdata) {
        return hospital.HospRank(global.HospRankPath, postdata)
    },
    // 医院管理-新增
    getnewlyhos({ }, postdata) {
        return hospital.newlyhos(global.newlyhosPath, postdata)
    },
    // 医院管理-修改-获取医院详情
    getHospitalDetail({ }, postdata) {
        return hospital.HospitalDetail(global.HospitalDetailPath, postdata)
    },
    // 医院管理-修改
    getModificationHos({ }, postdata) {
        return hospital.ModificationHos(global.ModificationHosPath, postdata)
    },
    // 新增医院下获取省份列表
    getprovince({ }, postdata) {
        return hospital.province(global.provincePath, postdata)
    },
    // 新增医院下获取大科室列表
    gettrainedList({ }, postdata) {
        return hospital.trainedList(global.trainedListPath, postdata)
    },
    // 新增医院下获取小科室列表
    getLitTrainedList({ }, postdata) {
        return hospital.LitTrainedList(global.LitTrainedListPath, postdata)
    },
    // 新增医院下获取级别列表
    getlevelList({ }, postdata) {
        return hospital.levelList(global.levelListPath, postdata)
    },
    // 删除医院管理列表
    getdelhospital({ }, postdata) {
        return hospital.delhospital(global.delhospitalPath, postdata)
    },
    // 获取医生管理列表
    getdoctorLists({ }, postdata) {
        return hospital.doctorLists(global.doctorListsPath, postdata)
    },
    // 获取医生级别列表
    getDoctorRank({ }, postdata) {
        return hospital.DoctorRank(global.DoctorRankPath, postdata)
    },
    // 新增医生-获取一级科室
    getselectBigDepartmentList({ }, postdata) {
        return hospital.selectBigDepartmentList(global.selectBigDepartmentListPath, postdata)
    },
    // 新增医生-获取二级科室
    getselectSmallDepartmentList({ }, postdata) {
        return hospital.selectSmallDepartmentList(global.selectSmallDepartmentListPath, postdata)
    },
    // 医生列表排序
    getDoctorSort({ }, postdata) {
        return hospital.DoctorSort(global.DoctorSortPath, postdata)
    },
    // 新增医生
    getaddDoct({ }, postdata) {
        return hospital.addDoct(global.addDoctPath, postdata)
    },
    // 编辑医生-获取医生详情
    getselectDoctorById({ }, postdata) {
        return hospital.selectDoctorById(global.selectDoctorByIdPath, postdata)
    },
    // 编辑医生
    getEditDoct({ }, postdata) {
        return hospital.EditDoct(global.EditDoctPath, postdata)
    },
    // 医生审核
    getDoctorCheck({ }, postdata) {
        return hospital.DoctorCheck(global.DoctorCheckPath, postdata)
    },
    // 医生接诊详情
    getdoctorFindPageLists({ }, postdata) {
        return hospital.doctorFindPageLists(global.doctorFindPageListsPath, postdata)
    },
    // 删除医生管理列表
    getdeldoctor({ }, postdata) {
        return hospital.deldoctor(global.deldoctorPath, postdata)
    },
    //药店管理-分页
    getdrugstoreList({ }, postdata) {
        return hospital.drugstoreList(global.drugstoreListPath, postdata)
    },
    //药店管理-新增
    getaddDrugstore({ }, postdata) {
        return hospital.addDrugstore(global.addDrugstorePath, postdata)
    },
    //药店管理-新增
    geteditDrugstore({ }, postdata) {
        return hospital.editDrugstore(global.editDrugstorePath, postdata)
    },
    //药店管理-删除
    getcancelDrugstoreList({ }, postdata) {
        return hospital.cancelDrugstoreList(global.cancelDrugstoreListPath, postdata)
    },
    //药物管理-分页
    getdrugList({ }, postdata) {
        return hospital.drugList(global.drugListPath, postdata)
    },
    //药物管理-删除
    getdeletedrug({ }, postdata) {
        return hospital.deletedrug(global.deletedrugPath, postdata)
    },
    //药物管理-新增-人体部位
    getbodyPartsList({ }, postdata) {
        return hospital.bodyPartsList(global.bodyPartsListPath, postdata)
    },
    //药物管理-新增-获取症状
    getsymptomList({ }, postdata) {
        return hospital.symptomList(global.symptomListPath, postdata)
    },
    //药物管理-新增-获取药店
    getsymptomDrugstoreList({ }, postdata) {
        return hospital.symptomDrugstoreList(global.symptomDrugstoreListPath, postdata)
    },
    //药物管理-新增-获取药品
    getdrugLingList({ }, postdata) {
        return hospital.drugLingList(global.drugLingListPath, postdata)
    },
    //药物管理-新增
    getaddMedicine({ }, postdata) {
        return hospital.addMedicine(global.addMedicinePath, postdata)
    },
    //药物管理-编辑
    geteditMedicine({ }, postdata) {
        return hospital.editMedicine(global.editMedicinePath, postdata)
    },
    //药品推荐-分页
    getdrugpushmanageList({ }, postdata) {
        return hospital.drugpushmanageList(global.drugpushmanageListPath, postdata)
    },
    //药品推荐-删除
    getdeltaDrugpush({ }, postdata) {
        return hospital.deltaDrugpush(global.deltaDrugpushPath, postdata)
    },
    //药品推荐-新增-症状
    getdrugSymptomList({ }, postdata) {
        return hospital.drugSymptomList(global.drugSymptomListPath, postdata)
    },
    //药品推荐-新增-商城药品
    getstoreDrugList({ }, postdata) {
        return hospital.storeDrugList(global.storeDrugListPath, postdata)
    },
    //药品推荐-新增
    getaddDrugpush({ }, postdata) {
        return hospital.addDrugpush(global.addDrugpushPath, postdata)
    },
    //疾病管理-分页
    getillnessList({ }, postdata) {
        return hospital.illnessList(global.illnessListPath, postdata)
    },
    //疾病管理-常见/不常见
    getillnessShow({ }, postdata) {
        return hospital.illnessShow(global.illnessShowPath, postdata)
    },
    //疾病管理-新增
    getaddlilness({ }, postdata) {
        return hospital.addlilness(global.addlilnessPath, postdata)
    },
    //疾病管理-新增-查询一级科室
    getselectBigDepartment({ }, postdata) {
        return hospital.selectBigDepartment(global.selectBigDepartmentPath, postdata)
    },
    //疾病管理-新增-查询二级科室
    getselectSmallDepartment({ }, postdata) {
        return hospital.selectSmallDepartment(global.selectSmallDepartmentPath, postdata)
    },
    //疾病管理-获取详情
    getlilnessDetails({ }, postdata) {
        return hospital.lilnessDetails(global.lilnessDetailsPath, postdata)
    },
    //症状管理-分页
    getpartSymptomList({ }, postdata) {
        return hospital.partSymptomList(global.partSymptomListPath, postdata)
    },
    //症状管理-新增
    getaddSymptomlist({ }, postdata) {
        return hospital.addSymptomlist(global.addSymptomlistPath, postdata)
    },
    //症状管理-修改
    geteditSymptomlist({ }, postdata) {
        return hospital.editSymptomlist(global.editSymptomlistPath, postdata)
    },
    //症状管理-删除
    getdeleteSymptomlist({ }, postdata) {
        return hospital.deleteSymptomlist(global.deleteSymptomlistPath, postdata)
    },
    //问答管理-分页
    getquestionsList({ }, postdata) {
        return hospital.questionsList(global.questionsListPath, postdata)
    },
    //问答管理-删除
    getcancelQuestions({ }, postdata) {
        return hospital.cancelQuestions(global.cancelQuestionsPath, postdata)
    },
    //问答管理-批量删除
    getcancelBatchQuestions({ }, postdata) {
        return hospital.cancelBatchQuestions(global.cancelBatchQuestionsPath, postdata)
    },
    //问答管理-评论详情
    getanswerList({ }, postdata) {
        return hospital.answerList(global.answerListPath, postdata)
    },
    //问答管理-评论详情-删除
    getcancelAnswer({ }, postdata) {
        return hospital.cancelAnswer(global.cancelAnswerPath, postdata)
    },
    //文章管理-分页
    getarticleList({ }, postdata) {
        return hospital.articleList(global.articleListPath, postdata)
    },
    //文章管理-分页-删除
    getarticleDelete({ }, postdata) {
        return hospital.articleDelete(global.articleDeletePath, postdata)
    },
    //文章管理-分页-是否推荐
    getrecommend({ }, postdata) {
        return hospital.recommend(global.recommendPath, postdata)
    },
    //文章管理-新增-健康分类
    getArticleAssortment({ }, postdata) {
        return hospital.ArticleAssortment(global.ArticleAssortmentPath, postdata)
    },
    //文章管理-新增
    getaddArticle({ }, postdata) {
        return hospital.addArticle(global.addArticlePath, postdata)
    },
    //圈子管理-分页
    getcircleList({ }, postdata) {
        return hospital.circleList(global.circleListPath, postdata)
    },
    //圈子管理-删除
    getcancelfigureDatum({ }, postdata) {
        return hospital.cancelfigureDatum(global.cancelfigureDatumPath, postdata)
    },
    //圈子管理-动态分页
    getdynamicList({ }, postdata) {
        return hospital.dynamicList(global.dynamicListPath, postdata)
    },
    //圈子管理-动态管理-删除
    getdeleteDynamic({ }, postdata) {
        return hospital.deleteDynamic(global.deleteDynamicPath, postdata)
    },
    //圈子管理-动态详情
    getremarkOnList({ }, postdata) {
        return hospital.remarkOnList(global.remarkOnListPath, postdata)
    },
    //圈子管理-动态详情-删除
    getdelRemarkOn({ }, postdata) {
        return hospital.delRemarkOn(global.delRemarkOnPath, postdata)
    },
    //圈子管理-动态评论详情
    getdiscussOnList({ }, postdata) {
        return hospital.discussOnList(global.discussOnListPath, postdata)
    },
    //圈子管理-动态评论详情-删除
    getdeldiscuss({ }, postdata) {
        return hospital.deldiscuss(global.deldiscussPath, postdata)
    },
    //圈子管理-圈主详情
    getfigureDatum({ }, postdata) {
        return hospital.figureDatum(global.figureDatumPath, postdata)
    },
    //圈子管理-圈主审核
    getauditfigureDatum({ }, postdata) {
        return hospital.auditfigureDatum(global.auditfigureDatumPath, postdata)
    },
    // 获取广告列表
    getadveList({ }, postdata) {
        return hospital.adveList(global.adveListPath, postdata)
    },
    // 新增广告列表
    getAddInfor({ }, postdata) {
        return hospital.AddInfor(global.AddInforPath, postdata)
    },
    // 修改广告列表
    getEditInfor({ }, postdata) {
        return hospital.EditInfor(global.EditInforPath, postdata)
    },
    // 广告列表排序
    getInforRank({ }, postdata) {
        return hospital.InforRank(global.InforRankPath, postdata)
    },
    // 删除广告列表
    getdelinfor({ }, postdata) {
        return hospital.delinfor(global.delinforPath, postdata)
    },
    //获取一级字典列表
    getpagingDictionary({ }, postdata) {
        return hospital.pagingDictionary(global.pagingDictionaryPath, postdata)
    },
    //获取子级字典列表
    getfindMedicalByPidAndLevel({ }, postdata) {
        return hospital.findMedicalByPidAndLevel(global.findMedicalByPidAndLevelPath, postdata)
    },
    //新增医疗字典
    getaddMedicalDictList({ }, postdata) {
        return hospital.addMedicalDictList(global.addMedicalDictListPath, postdata)
    },
    //编辑医疗字典
    getupdateMedicalDictList({ }, postdata) {
        return hospital.updateMedicalDictList(global.updateMedicalDictListPath, postdata)
    },
    //删除医疗字典
    getdeleteMedicalDict({ }, postdata) {
        return hospital.deleteMedicalDict(global.deleteMedicalDictPath, postdata)
    },
    //医疗字典排序
    getupdateSortMedicalDict({ }, postdata) {
        return hospital.updateSortMedicalDict(global.updateSortMedicalDictPath, postdata)
    },
    //指标与科室-列表
    getfindByPagingList({ }, postdata) {
        return hospital.findByPagingList(global.findByPagingListPath, postdata)
    },
    //指标与科室-指标
    getfindDepartmentList({ }, postdata) {
        return hospital.findDepartmentList(global.findDepartmentListPath, postdata)
    },
    //指标与科室-新增
    getaddTargetList({ }, postdata) {
        return hospital.addTargetList(global.addTargetListPath, postdata)
    },
    //指标与科室-编辑
    getupdateTargetList({ }, postdata) {
        return hospital.updateTargetList(global.updateTargetListPath, postdata)
    },
    //指标与科室-删除
    getdeleteFindByPaging({ }, postdata) {
        return hospital.deleteFindByPaging(global.deleteFindByPagingPath, postdata)
    },
    // *******************************************金融模块*****************************
    // 交易记录列表
    getDetailPageList({ }, postdata) {
        return financial.financialDealList(global.financialListPath, postdata)
    },
    // *******************************************激励模块*****************************
    // 获取活动管理首页列表
    getactivityList({ }, postdata) {
        return encourage.activityList(global.activityListPath, postdata)
    },
    // 获取健康指标所有数据
    getindicatorList({ }, postdata) {
        return encourage.indicatorList(global.indicatorListPath, postdata)
    },
    // 添加活动
    getaddactivity({ }, postdata) {
        return encourage.addactivity(global.addactivityPath, postdata)
    },
    // 根据id获取激励任务信息
    geteditactivity({ }, postdata) {
        return encourage.editactivity(global.editactivityPath, postdata)
    },
    // 修改激励任务
    geteditpreserveactivity({ }, postdata) {
        return encourage.editpreserveactivity(global.editpreserveactivityPath, postdata)
    },
    // 删除活动管理
    getdelactivity({ }, postdata) {
        return encourage.delactivity(global.delactivityPath, postdata)
    },
    // 活动管理开始或停止活动
    getstartorstop({ }, postdata) {
        return encourage.startorstop(global.startorstopPath, postdata)
    },
    // 获取banner设置列表
    getbannerList({ }, postdata) {
        return encourage.bannerList(global.bannerListPath, postdata)
    },
    // 激励新增banner
    getaddbannerList({ }, postdata) {
        return encourage.addbannerList(global.addbannerListPath, postdata)
    },
    // 激励删除banner
    getdelbanner({ }, postdata) {
        return encourage.delbanner(global.delbannerPath, postdata)
    },
    // banner排序
    getsortbanner({ }, postdata) {
        return encourage.sortbanner(global.sortbannerPath, postdata)
    },
    // 修改banner
    geteditbannerList({ }, postdata) {
        return encourage.editbannerList(global.editbannerListPath, postdata)
    },
    // *******************************************公共模块*****************************
    // 新增版本
    getbaseappVersionsave({ }, postdata) {
        return base.baseappVersionsave(global.baseappVersionsavePath, postdata)
    },
    // 删除版本
    getbaseappVersiondelete({ }, postdata) {
        return base.baseappVersiondelete(global.baseappVersiondeletePath, postdata)
    },
    // 修改版本
    getbaseappVersionupdate({ }, postdata) {
        return base.baseappVersionupdate(global.baseappVersionupdatePath, postdata)
    },
    // ID查找版本
    getbaseappVersionfindOne({ }, postdata) {
        return base.baseappVersionfindOne(global.baseappVersionfindOnePath, postdata)
    },
    // 版本分页
    getbaseappVersionpage({ }, postdata) {
        return base.baseappVersionpage(global.baseappVersionpagePath, postdata)
    },
    // 新增单页
    getcutpageContextadd({ }, postdata) {
        return base.cutpageContextadd(global.cutpageContextaddPath, postdata)
    },
    // 删除单页
    getcutpageContextdel({ }, postdata) {
        return base.cutpageContextdel(global.cutpageContextdelPath, postdata)
    },
    // 修改单页
    getcutpageContextupdate({ }, postdata) {
        return base.cutpageContextupdate(global.cutpageContextupdatePath, postdata)
    },
    // 查找单页
    getcutpageContextselect({ }, postdata) {
        return base.cutpageContextselect(global.cutpageContextselectPath, postdata)
    },
    // 查询分页
    getcutpageContextselectPage({ }, postdata) {
        return base.cutpageContextselectPage(global.cutpageContextselectPagePath, postdata)
    },
    // 获取所有根字典接口
    getBasefindRootDictionary({ }, postdata) {
        return base.BasefindRootDictionary(global.basefindRootDictionaryPath, postdata)
    },
    // 添加字典
    getbaseadddictionary({ }, postdata) {
        return base.baseadddictionary(global.baseadddictionaryPath, postdata)
    },
    // 修改字典
    getbaseupdatedictionary({ }, postdata) {
        return base.baseupdatedictionary(global.baseupdatedictionaryPath, postdata)
    },
    // 检验字典code是否存在
    getbasecheckCodeIsExist({ }, postdata) {
        return base.basecheckCodeIsExist(global.basecheckCodeIsExistPath, postdata)
    },
    // 删除字典
    getbasedeldictionary({ }, postdata) {
        return base.basedeldictionary(global.basedeldictionaryPath, postdata)
    },
    // 根据父字典id获取字典及子字典列表接口
    getbasefindListByParentId({ }, postdata) {
        return base.basefindListByParentId(global.basefindListByParentIdPath, postdata)
    },
    // 查询字典详情接口
    getbasefindDictionaryById({ }, postdata) {
        return base.basefindDictionaryById(global.basefindDictionaryByIdPath, postdata)
    },
    // 根据字典id获取字典及子字典列表接口
    getbasefindDictionaryListById({ }, postdata) {
        return base.basefindDictionaryListById(global.basefindDictionaryListByIdPath, postdata)
    },
    // 新增/修改banner获取商品列表
    getbannerProductList({ }, postdata) {
        return base.bannerProductList(global.bannnerProductListPath, postdata)
    },


    // 初始化-初始化轮播图到redis接口
    getbaseinitBannerToRedis({ }, postdata) {
        return base.baseinitBannerToRedis(global.baseinitBannerToRedisPath, postdata)
    },
    // 初始化-初始化系统消息
    getbaseinitinformation({ }, postdata) {
        return base.baseinitinformation(global.baseinitinformationPath, postdata)
    },
    // 初始化-初始化所有字典缓存
    getbaseinitinitDictionaryRedis({ }, postdata) {
        return base.baseinitinitDictionaryRedis(global.baseinitinitDictionaryRedisPath, postdata)
    },
    // 初始化-初始化领域缓存
    getbaseinitinitAdvantageAreaToRedis({ }, postdata) {
        return base.baseinitinitAdvantageAreaToRedis(global.baseinitinitAdvantageAreaToRedisPath, postdata)
    },
    // 初始化-初始化基础字典缓存
    getbaseinitinitBaseDictionaryRedis({ }, postdata) {
        return base.baseinitinitBaseDictionaryRedis(global.baseinitinitBaseDictionaryRedisPath, postdata)
    },
    // 初始化-初始化地区字典到redis
    getbaseinitinitAreaToRedis({ }, postdata) {
        return base.baseinitinitAreaToRedis(global.baseinitinitAreaToRedisPath, postdata)
    },
    // 初始化-初始化所有热词到redis
    getbaseinitinitHotSearchToRedis({ }, postdata) {
        return base.baseinitinitHotSearchToRedis(global.baseinitinitHotSearchToRedisPath, postdata)
    },
    // 初始化-初始化日志监控系统接收人缓存
    getbaseinitStaticLogstashDictionaryInitReceive({ }, postdata) {
        return base.baseinitStaticLogstashDictionaryInitReceive(global.baseinitStaticLogstashDictionaryInitReceivePath, postdata)
    },
    // 初始化日志监控系统服务列表缓存
    getbaseinitStaticLogstashDictionaryInitServiceList({ }, postdata) {
        return base.baseinitStaticLogstashDictionaryInitServiceList(global.baseinitStaticLogstashDictionaryInitServiceListPath, postdata)
    },
    // 初始化-初始化医生
    getbaseinitinitDoctorToRedis({ }, postdata) {
        return base.baseinitinitDoctorToRedis(global.baseinitinitDoctorToRedisPath, postdata)
    },
    // 初始化-初始化医生geo
    getbaseinitinitDoctorGeo({ }, postdata) {
        return base.baseinitinitDoctorGeo(global.baseinitinitDoctorGeoPath, postdata)
    },
    // 初始化-初始化医院
    getbaseinitinitHospitalToRedis({ }, postdata) {
        return base.baseinitinitHospitalToRedis(global.baseinitinitHospitalToRedisPath, postdata)
    },
    // 初始化-初始化医院Geo
    getbaseinitinitHospitalGeo({ }, postdata) {
        return base.baseinitinitHospitalGeo(global.baseinitinitHospitalGeoPath, postdata)
    },
    // 初始化-初始化Redis健康回答
    getbaseinitintoHealthAnswerRedis({ }, postdata) {
        return base.baseinitintoHealthAnswerRedis(global.baseinitintoHealthAnswerRedisPath, postdata)
    },
    // 初始化-初始化医疗字典到redis
    getbaseinitinitMedicalDictionaryRedis({ }, postdata) {
        return base.baseinitinitMedicalDictionaryRedis(global.baseinitinitMedicalDictionaryRedisPath, postdata)
    },
    // 初始化-初始化医疗圈子分类
    getbaseinitinitCircleAssortmentToRedis({ }, postdata) {
        return base.baseinitinitCircleAssortmentToRedis(global.baseinitinitCircleAssortmentToRedisPath, postdata)
    },
    // 初始化-初始化疾病和疾病子症状关联
    getbaseinitinitDiseaseAndDiseaseSubSymptomRelationToRedis({ }, postdata) {
        return base.baseinitinitDiseaseAndDiseaseSubSymptomRelationToRedis(global.baseinitinitDiseaseAndDiseaseSubSymptomRelationToRedisPath, postdata)
    },
    // 初始化-初始化症状疾病关联和症状子症状
    getbaseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis({ }, postdata) {
        return base.baseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis(global.baseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedisPath, postdata)
    },
    // 初始化-初始化圈子成员至缓存
    getbaseinitinitCircleMember({ }, postdata) {
        return base.baseinitinitCircleMember(global.baseinitinitCircleMemberPath, postdata)
    },
    // 初始化-初始化文章认证
    getbaseinitinitArticleAuthenticationToRedis({ }, postdata) {
        return base.baseinitinitArticleAuthenticationToRedis(global.baseinitinitArticleAuthenticationToRedisPath, postdata)
    },
    // 初始化-问题回答缓存初始化
    getbaseinitinitAnswersCache({ }, postdata) {
        return base.baseinitinitAnswersCache(global.baseinitinitAnswersCachePath, postdata)
    },
    // 初始化-问题缓存初始化
    getbaseinitinitQuestionsCache({ }, postdata) {
        return base.baseinitinitQuestionsCache(global.baseinitinitQuestionsCachePath, postdata)
    },
    // 初始化-初始化所有字典到redis
    getbaseinitinitAllDictionaryToRedis({ }, postdata) {
        return base.baseinitinitAllDictionaryToRedis(global.baseinitinitAllDictionaryToRedisPath, postdata)
    },
    // 初始化-初始化食谱到redis
    getbaseinitinitRecipesToRedis({ }, postdata) {
        return base.baseinitinitRecipesToRedis(global.baseinitinitRecipesToRedisPath, postdata)
    },
    // 初始化-初始化健身数据到redis
    getbaseinitinitRedis({ }, postdata) {
        return base.baseinitinitRedis(global.baseinitinitRedisPath, postdata)
    },
    // 初始化-初始化为你精选图到redis
    getbaseinitinitCarefullyChosenToRedis({ }, postdata) {
        return base.baseinitinitCarefullyChosenToRedis(global.baseinitinitCarefullyChosenToRedisPath, postdata)
    },
    // 初始化-初始化所有图标到redis
    getbaseinitinitHomeIconToRedis({ }, postdata) {
        return base.baseinitinitHomeIconToRedis(global.baseinitinitHomeIconToRedisPath, postdata)
    },
    // 初始化-初始化优惠券到redis
    getbaseinitcouponinitRedis({ }, postdata) {
        return base.baseinitcouponinitRedis(global.baseinitcouponinitRedisPath, postdata)
    },
    // 初始化-缓存所有可用激励任务
    getbaseinitinitEncourageTasks({ }, postdata) {
        return base.baseinitinitEncourageTasks(global.baseinitinitEncourageTasksPath, postdata)
    },
    // 初始化-初始化角色资源关系到redis
    getbaseinitinitRoleResources({ }, postdata) {
        return base.baseinitinitRoleResources(global.baseinitinitRoleResourcesPath, postdata)
    },
    // 初始化-初始化app用户缓存
    getbaseinitinitAccount({ }, postdata) {
        return base.baseinitinitAccount(global.baseinitinitAccountPath, postdata)
    },
    // 初始化-热搜初始化
    getbaseinittopSearchControlPush({ }, postdata) {
        return base.baseinittopSearchControlPush(global.baseinittopSearchControlPushPath, postdata)
    },
    // 初始化-新闻信息初始化
    getbaseinittopSearchControlInit({ }, postdata) {
        return base.baseinittopSearchControlInit(global.baseinittopSearchControlInitPath, postdata)
    },
    // 初始化-新闻个人分类初始化
    getbaseinituserClassifyinitUserClassifyRedis({ }, postdata) {
        return base.baseinituserClassifyinitUserClassifyRedis(global.baseinituserClassifyinitUserClassifyRedisPath, postdata)
    },
    // 初始化-初始化必康定制水
    getbaseinitinnitCustomWater({ }, postdata) {
        return base.baseinitinnitCustomWater(global.baseinitinnitCustomWaterPath, postdata)
    },
    // 初始化-初始化商品信息
    getbaseinitinnitProductInfo({ }, postdata) {
        return base.baseinitinnitProductInfo(global.baseinitinnitProductInfoPath, postdata)
    },






    // **************************************商城模块***********************************
    // 降价通知列表
    getstoreNoticeOfReductionControllerselectNoticePage({ }, postdata) {
        return store.storeNoticeOfReductionController(global.storeNoticeOfReductionControllerPath, postdata)
    },
    // 降价通知发送
    getstoremerchantsNotice({ }, postdata) {
        return store.storemerchantsNotice(global.storemerchantsNoticePath, postdata)
    },
    // 新增品牌
    getstorebrandAdd({ }, postdata) {
        return store.storebrandAdd(global.storebrandAddPath, postdata)
    },
    // 修改品牌
    getstorebrandupdateById({ }, postdata) {
        return store.storebrandupdateById(global.storebrandupdateByIdPath, postdata)
    },
    // 删除品牌
    getstorebranddeleteById({ }, postdata) {
        return store.storebranddeleteById(global.storebranddeleteByIdPath, postdata)
    },
    // 分页查询所有品牌
    getstorebrandfindPage({ }, postdata) {
        return store.storebrandfindPage(global.storebrandfindPagePath, postdata)
    },
    // 根据品牌名称查询品牌
    getstorebrandfindByBrandName({ }, postdata) {
        return store.storebrandfindByBrandName(global.storebrandfindByBrandNamePath, postdata)
    },
    // 品牌详情
    getstorebrandfindOneById({ }, postdata) {
        return store.storebrandfindOneById(global.storebrandfindBrandPath, postdata)
    },
    // 商品分类
    getstoreclassfindByLevelAndId({ }, postdata) {
        return store.storeclassfindByLevelAndId(global.storeclassfindByLevelAndIdPath, postdata)
    },
    // 商品/回收站列表
    getstoreproductList({ }, postdata) {
        return store.storeproductList(global.storeproductListPath, postdata)
    },
    // 批量上架/下架/删除/还原/物理删除
    getstorebatchOperation({ }, postdata) {
        return store.storebatchOperation(global.storebatchOperationPath, postdata)
    },
    // 新增优惠券
    getstorecouponadd({ }, postdata) {
        return store.storecouponadd(global.storecouponaddPath, postdata)
    },
    // 查询一个类目的所有子类目
    getstoreclassficationfindByLevelAndId({ }, postdata) {
        return store.storeclassficationfindByLevelAndId(global.storeclassficationfindByLevelAndIdPath, postdata)
    },
    // 修改优惠券
    getstorecouponupdateById({ }, postdata) {
        return store.storecouponupdateById(global.storecouponupdateByIdPath, postdata)
    },
    // 批量删除优惠券
    getstorecoupondeleteById({ }, postdata) {
        return store.storecoupondeleteById(global.storecoupondeleteByIdPath, postdata)
    },
    // 发放优惠券
    getstorecouponissue({ }, postdata) {
        return store.storecouponissue(global.storecouponissuePath, postdata)
    },
    // 优惠券分页
    getstorecouponpage({ }, postdata) {
        return store.storecouponpage(global.storecouponpagePath, postdata)
    },
    // 查看优惠券详情
    getstorecouponfindById({ }, postdata) {
        return store.storecouponfindById(global.storecouponfindByIdPath, postdata)
    },
    // 获取库存管理列表
    getInventory({ }, postdata) {
        return store.Inventory(global.InventoryPath, postdata)
    },
    // 删除库存管理列表
    getdelInventory({ }, postdata) {
        return store.delInventory(global.delInventoryPath, postdata)
    },
    // 分页查询订单列表
    getstoregoodsOrderfindOrderList({ }, postdata) {
        return store.storegoodsOrderfindOrderList(global.storegoodsOrderfindOrderListPath, postdata)
    },
    // 订单列表商品详情
    getstoregoodsOrderfindGoodsByOrderId({ }, postdata) {
        return store.storegoodsOrderfindGoodsByOrderId(global.storegoodsOrderfindGoodsByOrderIdPath, postdata)
    },
    // 库存管理下获取分类列表
    getClassfyListFirst({ }, postdata) {
        return store.ClassfyListFirst(global.ClassfyListFirstPath, postdata)
    },
    // 编辑库存
    getcompileList({ }, postdata) {
        return store.compileList(global.compileListPath, postdata)
    },
    // 确定编辑库存
    getModification({ }, postdata) {
        return store.Modification(global.ModificationPath, postdata)
    },
    // 查询分类不同层级下的类目
    getqueryTypeList({ }, postdata) {
        return store.queryTypeList(global.queryTypeListPath, postdata)
    },
    // 查询选中一级分类下的商家品牌
    getmerchantBrandList({ }, postdata) {
        return store.merchantBrandList(global.merchantBrandListPath, postdata)
    },
    // **************************************商品规格***********************************
    // 商品规格列表
    getstoreclassAttributefindPage({ }, postdata) {
        return store.storeclassAttributefindPage(global.storeclassAttributefindPagePath, postdata)
    },
    // 新增商品规格
    getstoreclassAttributesave({ }, postdata) {
        return store.storeclassAttributesave(global.storeclassAttributesavePath, postdata)
    },
    // 修改商品规格
    getstoreclassAttributemodify({ }, postdata) {
        return store.storeclassAttributemodify(global.storeclassAttributemodifyPath, postdata)
    },
    // 删除商品规格
    getstoreclassAttributedelete({ }, postdata) {
        return store.storeclassAttributedelete(global.storeclassAttributedeletePath, postdata)
    },
    // 商品规格属性项新增
    getstoreclassAttributeItemsave({ }, postdata) {
        return store.storeclassAttributeItemsave(global.storeclassAttributeItemsavePath, postdata)
    },
    // 商品规格属性项删除接口
    getstoreclassAttributeItemdelete({ }, postdata) {
        return store.storeclassAttributeItemdelete(global.storeclassAttributeItemdeletePath, postdata)
    },
    // 商品规格属性项修改
    getstoreclassAttributeItemmodify({ }, postdata) {
        return store.storeclassAttributeItemmodify(global.storeclassAttributeItemmodifyPath, postdata)
    },
    // 查询某一规格属性下所有属性项值
    getstoreclassAttributeItemfindByAttributeId({ }, postdata) {
        return store.storeclassAttributeItemfindByAttributeId(global.storeclassAttributeItemfindByAttributeIdPath, postdata)
    },
    // 商品规格属性项批量排序
    getstoreclassAttributeItembatchUpdateRank({ }, postdata) {
        return store.storeclassAttributeItembatchUpdateRank(global.storeclassAttributeItembatchUpdateRankPath, postdata)
    },
    // **************************************娱乐模块***********************************
    // 食物管理列表
    getfoodControl({ }, postdata) {
        return food.foodControl(global.foodControlPath, postdata)
    },
    // 搜索食物管理列表
    getSeekfoodControl({ }, postdata) {
        return food.SeekfoodControl(global.SeekfoodControlPath, postdata)
    },
    //新增食物
    getfoodadd({ }, postdata) {
        return food.foodadd(global.foodaddPath, postdata)
    },
    //编辑食物
    getfoodUpdate({ }, postdata) {
        return food.foodUpdate(global.foodUpdatePath, postdata)
    },
    //删除食物
    getfoodremove({ }, postdata) {
        return food.foodremove(global.foodremovePath, postdata)
    },
    //上传图片
    getfooduploadFile({ }, postdata) {
        return food.fooduploadFile(global.fooduploadFilePath, postdata)
    },
    //查询食物重量标准
    getweightStandard({ }, postdata) {
        return food.foodweightStandard(global.foodweightStandardPath, postdata)
    },
    //模糊查询食物
    getfoodFuzzyQuery({ }, postdata) {
        return food.foodFuzzyQuery(global.foodFuzzyQueryPath, postdata)
    },
    //食谱管理列表
    getRecipesList({ }, postdata) {
        return food.RecipesList(global.RecipesListPath, postdata)
    },
    //搜索食谱管理列表
    getSeekRecipesList({ }, postdata) {
        return food.SeekRecipesList(global.SeekRecipesListPath, postdata)
    },
    //新增食谱
    getRecipesAdd({ }, postdata) {
        return food.RecipesAdd(global.RecipesAddPath, postdata)
    },
    //编辑食谱
    getRecipesUpdate({ }, postdata) {
        return food.RecipesUpdate(global.RecipesUpdatePath, postdata)
    },
    //删除食谱
    getRecipesRemove({ }, postdata) {
        return food.RecipesRemove(global.RecipesRemovePath, postdata)
    },
    //症状关联列表
    getAssociatedSymptoms({ }, postdata) {
        return food.AssociatedSymptoms(global.AssociatedSymptomsPath, postdata)
    },
    //搜索症状关联列表
    getSeekAssociatedSymptoms({ }, postdata) {
        return food.SeekAssociatedSymptoms(global.SeekAssociatedSymptomsPath, postdata)
    },
    //新增症状关联
    getAddAssociatedSymptoms({ }, postdata) {
        return food.AddAssociatedSymptoms(global.AddAssociatedSymptomsPath, postdata)
    },
    //删除症状关联
    getRemoveAssociatedSymptoms({ }, postdata) {
        return food.RemoveAssociatedSymptoms(global.RemoveAssociatedSymptomsPath, postdata)
    },
    //修改症状关联
    getAmendAssociatedSymptoms({ }, postdata) {
        return food.AmendAssociatedSymptoms(global.AmendAssociatedSymptomsPath, postdata)
    },
    //按食谱类型查询食谱
    getfindRecipesByType({ }, postdata) {
        return food.findRecipesByType(global.findRecipesByTypePath, postdata)
    },
    //查询指标
    getIndexQuery({ }, postdata) {
        return food.IndexQuery(global.IndexQueryPath, postdata)
    },
    //获取所有食物的千卡
    getRecipesKcal({ }, postdata) {
        return food.RecipesKcal(global.getRecipesKcalPath, postdata)
    },
    //校验食谱名是否存在
    getverifyByName({ }, postdata) {
        return food.verifyByName(global.verifyByNamePath, postdata)
    },
    /***************************商品类目*******************/
    //新增类目
    getreartypeAddClassify({ }, postdata) {
        return store.reartypeAddClassify(global.reartypeAddClassifyPath, postdata)
    },
    //修改类目
    getreartypeCompileClassify({ }, postdata) {
        return store.reartypeCompileClassify(global.reartypeCompileClassifyPath, postdata)
    },
    //删除类目
    getreartypeDeleteClassify({ }, postdata) {
        return store.reartypeDeleteClassify(global.reartypeDeleteClassifyPath, postdata)
    },
    //类目排序
    getbatchUpdateRankClassify({ }, postdata) {
        return store.batchUpdateRankClassify(global.batchUpdateRankClassifyPath, postdata)
    },
    // ***************************************模板编辑************
    // 上传图片
    getstorechannelManagementselectChanneluploadFile({ }, postdata) {
        return store.storechannelManagementselectChanneluploadFile(global.uploadFilePath, postdata)
    },
    // 模板编辑-获取频道列表 
    getstorechannelManagementselectChannel({ }, postdata) {
        return store.storechannelManagementselectChannel(global.storechannelManagementselectChannelPath, postdata)
    },
    // 模板编辑-修改频道
    getstorechannelManagementupdate({ }, postdata) {
        return store.storechannelManagementupdate(global.storechannelManagementupdatePath, postdata)
    },
    // 模板编辑-获取频道下商品
    getstorechannelGoodsgetChannelGoods({ }, postdata) {
        return store.storechannelGoodsgetChannelGoods(global.storechannelGoodsgetChannelGoodsPath, postdata)
    },
    // 模板编辑-新增频道商品
    getstorechannelGoodsadd({ }, postdata) {
        return store.storechannelGoodsadd(global.storechannelGoodsaddPath, postdata)
    },
    // 模板编辑-修改频道商品
    getstorechannelGoodsupdate({ }, postdata) {
        return store.storechannelGoodsupdate(global.storechannelGoodsupdatePath, postdata)
    },
    // 模板编辑-排序频道商品
    getstorechannelGoodsupdateSort({ }, postdata) {
        return store.storechannelGoodsupdateSort(global.storechannelGoodsupdateSortPath, postdata)
    },
    // 模板编辑-删除频道商品
    getstorechannelGoodsdelete({ }, postdata) {
        return store.storechannelGoodsdelete(global.storechannelGoodsdeletePath, postdata)
    },
    // 模板编辑-获取全部精选图
    getstorecarefullyChosengetCarefullyChosenDetail({ }, postdata) {
        return store.storecarefullyChosengetCarefullyChosenDetail(global.storecarefullyChosengetCarefullyChosenDetailPath, postdata)
    },
    // 模板编辑-添加为你精选图
    getstorecarefullyChosengetadd({ }, postdata) {
        return store.storecarefullyChosengetadd(global.storecarefullyChosengetaddPath, postdata)
    },
    // 模板编辑-修改为你精选
    getstorecarefullyChosenupdateTitle({ }, postdata) {
        return store.storecarefullyChosenupdateTitle(global.storecarefullyChosenupdateTitlePath, postdata)
    },
    // 模板编辑-排序为你精选图
    getstorecarefullyChosengetupdateSort({ }, postdata) {
        return store.storecarefullyChosengetupdateSort(global.storecarefullyChosengetupdateSortPath, postdata)
    },
    // 模板编辑-删除为你精选图
    getstorecarefullyChosengetdelete({ }, postdata) {
        return store.storecarefullyChosengetdelete(global.storecarefullyChosengetdeletePath, postdata)
    },
    // 模板编辑-修改为你精选图
    getstorecarefullyChosengetupdate({ }, postdata) {
        return store.storecarefullyChosengetupdate(global.storecarefullyChosengetupdatePath, postdata)
    },
    // 模板编辑-从redis上获取图标接口
    getstorehomePagehomeIcongetHomeIcons({ }, postdata) {
        return store.storehomePagehomeIcongetHomeIcons(global.storehomePagehomeIcongetHomeIconsPath, postdata)
    },
    // 模板编辑-新增图标
    getstorehomeIcongetHomeIconadd({ }, postdata) {
        return store.storehomeIcongetHomeIconadd(global.storehomeIcongetHomeIconaddPath, postdata)
    },
    // 模板编辑-删除图标
    getstorehomeIcongetHomeIcondelete({ }, postdata) {
        return store.storehomeIcongetHomeIcondelete(global.storehomeIcongetHomeIcondeletePath, postdata)
    },
    // 模板编辑-修改图标
    getstorehomeIcongetHomeIconupdate({ }, postdata) {
        return store.storehomeIcongetHomeIconupdate(global.storehomeIcongetHomeIconupdatePath, postdata)
    },
    // ***************************************商品中心************
    // 根据商品分类ID 查询分类下的商品规格及规格项
    getmerchantSKUList({ }, postdata) {
        return store.merchantSKUList(global.merchantSKUListPath, postdata)
    },
    // 添加商品
    getaddproduct({ }, postdata) {
        return store.addproduct(global.addproductPath, postdata)
    },
    // 商品列表
    getproductlist({ }, postdata) {
        return store.productlist(global.productlistPath, postdata)
    },
    // 商品详情
    getstoreProductInfo({ }, postdata) {
        return store.storeProductInfo(global.storeProductInfoPath, postdata)
    },
    // 编辑商品中删除sku信息
    getskuDelList({ }, postdata) {
        return store.skuDelList(global.skuDelListPath, postdata)
    },
    // 编辑商品中删除微量元素
    geteleDelList({ }, postdata) {
        return store.eleDelList(global.eleDelListPath, postdata)
    },
    // 根据品牌id查询品牌
    getbrandfindOneById({ }, postdata) {
        return store.brandfindOneById(global.brandfindOneByIdPath, postdata)
    },
    // 根据3级分类id查询商品类目
    getaskgoodsTypeList({ }, postdata) {
        return store.askgoodsTypeList(global.askgoodsTypeListPath, postdata)
    },
    // 查询所有的品牌
    getAllBrandList({ }, postdata) {
        return store.AllBrandList(global.AllBrandListPath, postdata)
    },
    // 根据品牌名称查询品牌
    getfindByBrandName({ }, postdata) {
        return store.findByBrandName(global.findByBrandNamePath, postdata)
    },
    //查询最近使用类目 
    getRecentTypeList({ }, postdata) {
        return store.RecentTypeList(global.RecentTypeListPath, postdata)
    },
    // 查询所有的物流信息
    getStoreLogistics({ }, postdata) {
        return store.StoreLogistics(global.StoreLogisticsPath, postdata)
    },
    // **************************************系统设置*******************************
    // 热搜列表
    getstorehotSearchgetHotSearch({ }, postdata) {
        return store.storehotSearchgetHotSearch(global.storehotSearchgetHotSearchPath, postdata)
    },
    //  修改热词
    getstorehotSearchupdate({ }, postdata) {
        return store.storehotSearchupdate(global.storehotSearchupdatePath, postdata)
    },
    // 删除热词
    getstorehotSearchdelete({ }, postdata) {
        return store.storehotSearchdelete(global.storehotSearchdeletePath, postdata)
    },
    // 添加热词
    getstorehotSearchadd({ }, postdata) {
        return store.storehotSearchadd(global.storehotSearchaddPath, postdata)
    },
    //***************************************支付中心***************************************
    // 支付中心列表
    getPayCentreList({ }, postdata) {
        return store.PayCentreList(global.PayCentreListPath, postdata)
    },
    // 支付中心列表排序
    getPayListrank({ }, postdata) {
        return store.PayListrank(global.PayListrankPath, postdata)
    },
    // 支付中心是否展示
    getPayListShow({ }, postdata) {
        return store.PayListShow(global.PayListShowPath, postdata)
    },
    //物流中心列表
    getLogisticsData({ }, postdata) {
        return store.LogisticsData(global.LogisticsDataPath, postdata)
    },
    //物流中心-是否展示
    getShowlogistics({ }, postdata) {
        return store.Showlogistics(global.ShowlogisticsPath, postdata)
    },
    //物流中心-是否展示
    getDelLogistics({ }, postdata) {
        return store.DelLogistics(global.DelLogisticsPath, postdata)
    },
    //物流中心-获取省市区
    getstateList({ }, postdata) {
        return store.stateList(global.healthFindAreaListPath, postdata)
    },
    //物流中心-新增物流
    getAddlogistics({ }, postdata) {
        return store.Addlogistics(global.AddlogisticsPath, postdata)
    },
    //商城-系统设置-检索记录
    getsearchingList({ }, postdata) {
        return store.searchingList(global.searchingListPath, postdata)
    },
    //商城-系统设置-检索记录-删除
    getDelSearching({ }, postdata) {
        return store.DelSearching(global.DelSearchingPath, postdata)
    },
    // **************************************健身模块*******************************
    // 添加标签
    getfitnessLabellControllersave({ }, postdata) {
        return fitness.fitnessLabellControllersave(global.fitnessLabellControllersavePath, postdata)
    },
    // 修改标签
    getfitnessLabellControllerupdateLabel({ }, postdata) {
        return fitness.fitnessLabellControllerupdateLabel(global.fitnessLabellControllerupdateLabelPath, postdata)
    },
    // 删除标签
    getfitnessLabellControllerdeleteById({ }, postdata) {
        return fitness.fitnessLabellControllerdeleteById(global.fitnessLabellControllerdeleteByIdPath, postdata)
    },
    // 标签列表
    getfitnessLabellControllerselectLabellPage({ }, postdata) {
        return fitness.fitnessLabellControllerselectLabellPage(global.fitnessLabellControllerselectLabellPagePath, postdata)
    },
    // 新增部位
    getfitnessSiteControllersave({ }, postdata) {
        return fitness.fitnessSiteControllersave(global.fitnessSiteControllersavePath, postdata)
    },
    // 修改部位
    getfitnessSiteControllerupdate({ }, postdata) {
        return fitness.fitnessSiteControllerupdate(global.fitnessSiteControllerupdatePath, postdata)
    },
    // 删除部位
    getfitnessSiteControllerdeleteById({ }, postdata) {
        return fitness.fitnessSiteControllerdeleteById(global.fitnessSiteControllerdeleteByIdPath, postdata)
    },
    // 部位列表
    getfitnessSiteControllerselectSitePage({ }, postdata) {
        return fitness.fitnessSiteControllerselectSitePage(global.fitnessSiteControllerselectSitePagePath, postdata)
    },
    // 添加动作
    getfitnessActionControllersave({ }, postdata) {
        return fitness.fitnessActionControllersave(global.fitnessActionControllersavePath, postdata)
    },
    // 修改动作
    getfitnessActionControllerupdateById({ }, postdata) {
        return fitness.fitnessActionControllerupdateById(global.fitnessActionControllerupdateByIdPath, postdata)
    },
    // 动作删除
    getfitnessTrainActionControllerdeleteById({ }, postdata) {
        return fitness.fitnessTrainActionControllerdeleteById(global.fitnessTrainActionControllerdeleteByIdPath, postdata)
    },
    // 动作分页
    getfitnessTrainActionControllerfindAction({ }, postdata) {
        return fitness.fitnessTrainActionControllerfindAction(global.fitnessTrainActionControllerfindActionPath, postdata)
    },
    // 搜索动作
    getfitnessActionControllerfindById({ }, postdata) {
        return fitness.fitnessActionControllerfindById(global.fitnessActionControllerfindByIdPath, postdata)
    },
    // 添加训练
    getfitnessTrainControllersave({ }, postdata) {
        return fitness.fitnessTrainControllersave(global.fitnessTrainControllersavePath, postdata)
    },
    // 修改训练
    getfitnessTrainControllerupdateById({ }, postdata) {
        return fitness.fitnessTrainControllerupdateById(global.fitnessTrainControllerupdateByIdPath, postdata)
    },
    // 训练删除
    getfitnessTrainControllerdeleteByIds({ }, postdata) {
        return fitness.fitnessTrainControllerdeleteByIds(global.fitnessTrainControllerdeleteByIdsPath, postdata)
    },
    // 搜索训练
    getfitnessTrainControllerfindTrainActionById({ }, postdata) {
        return fitness.fitnessTrainControllerfindTrainActionById(global.fitnessTrainControllerfindTrainActionByIdPath, postdata)
    },
    // 训练分页
    getfitnessTrainControllerselectTrainPage({ }, postdata) {
        return fitness.fitnessTrainControllerselectTrainPage(global.fitnessTrainControllerselectTrainPagePath, postdata)
    },
    // 添加课程
    getfitnessCourseControllersave({ }, postdata) {
        return fitness.fitnessCourseControllersave(global.fitnessCourseControllersavePath, postdata)
    },
    // 修改课程
    getfitnessCourseControllerupdateById({ }, postdata) {
        return fitness.fitnessCourseControllerupdateById(global.fitnessCourseControllerupdateByIdPath, postdata)
    },
    // 课程删除
    getfitnessCourseControllerdeleteById({ }, postdata) {
        return fitness.fitnessCourseControllerdeleteById(global.fitnessCourseControllerdeleteByIdPath, postdata)
    },
    // 搜索课程
    getfitnessCourseControllerselectCourseParticulars({ }, postdata) {
        return fitness.fitnessCourseControllerselectCourseParticulars(global.fitnessCourseControllerselectCourseParticularsPath, postdata)
    },
    // 课程详情
    getfitnessCourseControllerfindById({ }, postdata) {
        return fitness.fitnessCourseControllerfindById(global.fitnessCourseControllerfindByIdPath, postdata)
    },
    // 条件搜索训练
    getfitnessCourseControllerselectSiteLabelLevel({ }, postdata) {
        return fitness.fitnessCourseControllerselectSiteLabelLevel(global.fitnessCourseControllerselectSiteLabelLevelPath, postdata)
    },
    // 课程分页
    getfitnessCourseControllerselectCoursePage({ }, postdata) {
        return fitness.fitnessCourseControllerselectCoursePage(global.fitnessCourseControllerselectCoursePagePath, postdata)
    },
    // 添加首页文案
    getfitnesssloganaddHomeSlogan({ }, postdata) {
        return fitness.fitnesssloganaddHomeSlogan(global.fitnesssloganaddHomeSloganPath, postdata)
    },
    // 修改首页文案
    getfitnesssloganupdateHomeSlogan({ }, postdata) {
        return fitness.fitnesssloganupdateHomeSlogan(global.fitnesssloganupdateHomeSloganPath, postdata)
    },
    // 首页文案删除
    getfitnessslogandeleteAllHomeSlogan({ }, postdata) {
        return fitness.fitnessslogandeleteAllHomeSlogan(global.fitnessslogandeleteAllHomeSloganPath, postdata)
    },
    // 首页文案查询分页
    getfitnesssloganselectHomeSlogan({ }, postdata) {
        return fitness.fitnesssloganselectHomeSlogan(global.fitnesssloganselectHomeSloganPath, postdata)
    },
    // 添加分享文案
    getfitnesssloganaaddShareSlogan({ }, postdata) {
        return fitness.fitnesssloganaaddShareSlogan(global.fitnesssloganaaddShareSloganPath, postdata)
    },
    // 修改分享文案
    getfitnesssloganupdateShareSlogan({ }, postdata) {
        return fitness.fitnesssloganupdateShareSlogan(global.fitnesssloganupdateShareSloganPath, postdata)
    },
    // 分享文案删除
    getfitnessslogandeleteAllShareSlogan({ }, postdata) {
        return fitness.fitnessslogandeleteAllShareSlogan(global.fitnessslogandeleteAllShareSloganPath, postdata)
    },
    // 分享文案分页
    getfitnesssloganselectShareSlogan({ }, postdata) {
        return fitness.fitnesssloganselectShareSlogan(global.fitnesssloganselectShareSloganPath, postdata)
    },
}
