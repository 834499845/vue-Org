// 内网
// 上传文件端口
// global.uploadIp = '192.168.1.201'
// global.uploadPort = '20040'
// // 上传大文件端口
// global.upBigloadIp = '192.168.1.201'
// global.upBigloadPort = '8000'
// // 账户管理Ip端口
// global.logAccountIp = '192.168.10.61'
// global.adminPort = '30110'
// // 新闻管理Ip端口
// global.newsIp = '192.168.10.61'
// global.newsPort = '30610'
// // 新闻管理评论Ip端口
// global.newsCommenIp = '192.168.10.61'
// global.newsCommenPort = '30102'
// // 健康管理Ip端口
// global.logHeadltIp = '192.168.10.62'
// global.headltPort = '30210'
// // 公共模块Ip端口
// global.logHeadltCityIp = '192.168.10.62'
// global.headltCityPort = '30100'
// // 公共模块版本管理Ip端口
// global.versionsIp = '192.168.10.61'
// global.versionsPort = '30100'
// // 健康管理用户管理
// global.logHeadltUserIp = '192.168.10.61'
// global.headltUserPort = '30120'
// // 医疗管理Ip端口
// global.hospitalIp = '192.168.10.63'
// global.hospitalPort = '30310'
// // 医疗管理-热搜管理Ip端口
// global.hospitalSearchIp = '192.168.10.63'
// global.hospitalSearchPort = '30100'
// // 激励模块端口
// global.encourageIp = '192.168.10.56'
// global.encouragePort = '30710'
// // 激励模块下banner端口
// global.encouragebannerIp = '192.168.10.56'
// global.encouragebannerPort = '30100'
// // 娱乐模块端口
// global.foodIp = '192.168.10.62'
// global.foodPort = '30210'
// // 系统设置-检索记录
// global.foodsIp = '192.168.10.56'
// global.foodsPort = '30100'
// // 商城模块
// global.storeIp = '192.168.10.63'
// global.storePort = '30420'
// // 商城模块-优惠券
// global.storecouponIp = '192.168.10.63'
// global.storecouponPort = '30440'
// // 商城模块-订单中心
// global.storegoodsOrderIp = '192.168.10.56'
// global.storegoodsOrderPort = '30450'
// // 商城模块-热词管理
// global.storehotSearchIp = '192.168.10.56'
// global.storehotSearchPort = '30100'
// //商城模块-物流中心
// global.logisticsIp = '192.168.10.56'
// global.logisticsPort = '30400'
// // 商城模块-模板编辑
// global.storeoperationIp = '192.168.10.56'
// global.storeoperationPort = '30400'
// // 金融模块端口/支付中心
// global.financialIp = '192.168.10.56'
// global.financialPort = '30810'
// // 健身模块
// global.fitnessIp = '192.168.10.64'
// global.fitnessPort = '30910'
// // 积分模块
// global.pointIp = '192.168.10.65'
// global.pointPort = '30110'
/**
 * 外网
 * @type {string}
 */

//  *      端口号   服务名  
//  *      30110   life-authority-account  账户
//  *      30120   life-authority-userinfo 用户资料
//  *      30100   life-component-base     全局基础
//  *      30102   life-component-comment  全局评论
//  *      30820   life-finance-payment    支付中心
//  *      30810   life-finance-wallet     钱包
//  *      30710   life-health-encourage   激励
//  *      30210   life-health-health      健康
//  *      30400   life-mall-base          商城基础
//  *      30440   life-mall-coupon        商城优惠券
//  *      30420   life-mall-goods         商城商品
//  *      30410   life-mall-member        商城会员
//  *      30450   life-mall-order         商城订单
//  *      30610   life-news-news          新闻
//  *      30510   life-social-social      社交
//  *      30510   life-medical-medical    医疗
//  *      30910   life-fitness-fitness    健身
//  *      20040   fileUploadApi           文件上传
//  *      20040   fileUploadApi           小文件上传
//  *      30810   file-service-file-system 查看文件 
//  *      30110   life-authority-account   停用积分系统 
///htpp
global.httpStr = 'http://'
// var commonalityIp = 'app-api.botu.com:9000'
// var commonalityIp = 'app-api.botu.com:9001'
var commonalityIp = '192.168.10.33:8000'
//公共模块 激励banner设置
global.banner = '192.168.10.37:7001'
// global.banner = 'app-h5.botu.com:9001'
// // 前台用户管理
global.clientSideIp = commonalityIp
global.clientSidePort = 'life-authority-account'
// // 文件
global.fileIp = commonalityIp
global.filePort = 'file-service-file-system'
// 上传文件端口
global.uploadIp = commonalityIp
global.uploadPort = 'file-service-file-upload'
// 上传大文件端口
global.upBigloadIp = commonalityIp
global.upBigloadPort = ''
// 账户管理Ip端口
global.logAccountIp = commonalityIp
global.adminPort = 'life-authority-account'
// 新闻管理Ip端口
global.newsIp = commonalityIp
global.newsPort = 'life-news-news'
// 新闻管理评论Ip端口
global.newsCommenIp = commonalityIp
global.newsCommenPort = 'life-component-comment'
// 健康管理Ip端口
global.logHeadltIp = commonalityIp
global.headltPort = 'life-health-health'
// 公共模块基础字典Ip端口
global.logHeadltCityIp = commonalityIp
global.headltCityPort = 'life-component-base'
// 公共管理模块-初始化日志监控
global.logMonitoringIp = commonalityIp
global.logMonitoringPort = 'life-component-logstash'
// 健康管理用户管理
global.logHeadltUserIp = commonalityIp
global.headltUserPort = 'life-authority-userinfo'
// 医疗管理Ip端口
global.hospitalIp = commonalityIp
global.hospitalPort = 'life-medical-medical'
// 医疗管理-热词管理Ip端口
global.hospitalSearchIp = commonalityIp
global.hospitalSearchPort = 'life-component-base'
// 激励模块端口
global.encourageIp = commonalityIp
global.encouragePort = 'life-health-encourage'
// 激励模块下banner端口
global.encouragebannerIp = commonalityIp
global.encouragebannerPort = 'life-component-base'
// 饮食模块端口
global.foodIp = commonalityIp
global.foodPort = 'life-health-health'
// 系统设置-检索记录
global.foodsIp = commonalityIp
global.foodsPort = 'life-component-base'
// 商城模块
global.storeIp = commonalityIp
global.storePort = 'life-mall-goods'
// 商城模块-优惠券
global.storecouponIp = commonalityIp
global.storecouponPort = 'life-mall-coupon'
// 商城模块-订单中心
global.storegoodsOrderIp = commonalityIp
global.storegoodsOrderPort = 'life-mall-order'
// 商城模块-热词管理
global.storehotSearchIp = commonalityIp
global.storehotSearchPort = 'life-component-base'
//商城模块-物流中心
global.logisticsIp = commonalityIp
global.logisticsPort = 'life-mall-base'
// 商城模块-模板编辑
global.storeoperationIp = commonalityIp
global.storeoperationPort = 'life-mall-base'
// 金融模块端口/支付中心
global.financialIp = commonalityIp
global.financialPort = 'life-finance-wallet'
// 健身模块
global.fitnessIp = commonalityIp
global.fitnessPort = 'life-fitness-fitness'
// global.fitnessIp = '192.168.10.64'
// global.fitnessPort = '30910'

// 数据同步
global.dataIp = "192.168.10.67"
global.dataPort = '20100'
// 系统消息
global.informationIp = commonalityIp
global.informationPort = 'life-component-information'
// 积分模块
global.pointIp = commonalityIp
global.pointPort = 'life-health-encourage'
// global.pointIp = '192.168.10.65'
// global.pointPort = '30110'







// 2.0
// **************************************饮食管理*********************************************
// 食物管理
// 新增食物数据
global.foodFoodAddPath = '/V2.0.0/food/add'
// 修改食物数据
global.foodFoodUpdatePath = '/V2.0.0/food/update'
// 删除食物数据,并逻辑删除对应食物成分
global.foodFoodDeletePath = '/V2.0.0/food/delete'
// 分页查询食物数据
global.foodFoodFindFoodByPageNoAndPageSizePath = '/V2.0.0/food/findFoodByPageNoAndPageSize'
// 食谱管理
// 新增或修改食谱
global.foodRecipesAddOrUpdatePath = '/V2.0.0/recipes/addOrUpdate'
// 删除食谱
global.foodRecipesDeletePath = '/V2.0.0/recipes/delete'
// 计量单位管理
// 新增或修改食物计量单位
global.foodMeasurementUnitAddOrUpdatePath = '/V2.0.0/measurementUnit/addOrUpdate'
// 删除计量单位
global.foodMeasurementUnitDeletePath = '/V2.0.0/measurementUnit/delete'
// 查询计量单位
global.foodMeasurementUnitSelectAllPath = '/V2.0.0/measurementUnit/selectAll'
// 自定义食物
// 查询自定义食物列表
global.foodCustomerFoodSelectCustomerFoodPath = '/V2.0.0/customerFood/selectCustomerFood'


// ***********************************积分管理***************************************************
// 积分设置
// 查看基础设置-签到规则查看
global.pointIntegralSignGetSignRulePath = '/V2.0.0/integralSign/getSignRule'
// 设置积分基础签到规则
global.pointIntegralSignSetSignRulePath = '/V2.0.0/integralSign/setSignRule'
// 停用积分系统
global.pointIntegralSignDisableSystemPath = '/V2.0.0/integralSign/disableSystem'
// 积分获取
// 获取各个积分配置项
global.pointIntegralSignGetAttrListPath = '/V2.0.0/integralConfigAttr/getAttrList'
// 编辑积分配置项
global.pointIntegralConfigAttrUpdateConfigAttrPath = '/V2.0.0/integralConfigAttr/updateConfigAttr'
// 修改配置项状态
global.pointIntegralConfigAttrChangeAttrStatusPath = '/V2.0.0/integralConfigAttr/changeAttrStatus'
// 积分统计
// 按条件分页查询用户积分列表接口
global.pointIntegralUserGetUserIntegralListByConditionPath = '/V2.0.0/integralUser/getUserIntegralListByCondition'
// 分页获取用户积分明细列表接口(查看详情接口)
global.pointIntegralUserDetailGetDetailListPath = '/V2.0.0/integralUserDetail/getDetailList'
// 编辑用户积分接口
global.pointIntegralUserUpdateUserIntegralPath = '/V2.0.0/integralUser/updateUserIntegral'
// 勋章管理
// 新增勋章接口
global.pointIntegralMedalInsertPath = '/V2.0.0/integralMedal/insert'
// 编辑勋章接口
global.pointIntegralMedalUpdatePath = '/V2.0.0/integralMedal/update'
// 分页获取勋章列表接口
global.pointIntegralMedalGetMedalByPagePath = '/V2.0.0/integralMedal/getMedalByPage'
// 前台管理
// 分页查询用户列表
global.ClientSideAccountSelectAccountByConditionPath = '/V2.0.0/account/selectAccountByCondition'
// 按条件分页查询认证资料列表接口
global.ClientSideIdentityAuditGetApplyDataListByConditionPath = '/V2.0.0/identityAudit/getApplyDataListByCondition'
// 查看申请资料详情接口
global.ClientSideIdentityAuditGetApplyDataPath = '/V2.0.0/identityAudit/getApplyData'
// 审批认证申请接口
global.ClientSideIdentityAuditAuditPath = '/V2.0.0/identityAudit/audit'
// 获取拒绝原因列表接口
global.ClientSideIdentityAuditGetRejectReasonListPath = '/V2.0.0/identityAudit/getRejectReasonList'
// 根据条件查询待审核的申诉记录
global.ClientSideAppealGetAppealListPath = '/V2.0.0/appeal/getAppealList'
// 查看指定申诉记录
global.ClientAppealgetAppealByIdPath = '/V2.0.0/appeal/getAppealById'
// 申诉审核通过
global.ClientSideAppealPassAppealRequestPath = '/V2.0.0/appeal/passAppealRequest'
// 申诉拒绝
global.ClientSideAppealRejectAppealRequestPath = '/V2.0.0/appeal/rejectAppealRequest'

// 医疗模块
// 拒绝原因列表
global.MedicalDoctormedicalDictionarygetReasonsForRefusalDoctorPath = '/V2.0.0/medicalDictionary/getReasonsForRefusalDoctor'
// 医生审核
global.MedicalDoctorCheckPath = '/V2.0.0/doctor/check'
//症状自查-新增或修改症状部位关系
global.MedicalsymptomPositionaddPath = '/V2.0.0/symptomPosition/addOrUpdate'
//症状自查-删除症状部位关系
global.MedicalsymptomPositiondeletePath = '/V2.0.0/symptomPosition/delete'
//症状自查-根据部位id查询症状列表
global.MedicalsymptomPositionselectSymptomByPositionIdPath = '/V2.0.0/symptomPosition/selectSymptomByPositionId'
//疾病管理-新增或者修改疾病
global.MedicaldiseaseaddOrUpdatePath = '/V2.0.0/disease/addOrUpdate'
//疾病管理-查询疾病详情
global.MedicaldiseaseselectDiseaseByIdPath = '/V2.0.0/disease/selectDiseaseById'
//疾病管理-修改常见状态或删除疾病
global.MedicaldiseasedeletePath = '/V2.0.0/disease/delete'
//用药管理-新增或修改症状药品推荐
global.MedicalhomeDrugRecommendaddOrUpdateHomeDrugRecommendPath = '/V2.0.0/homeDrugRecommend/addOrUpdateHomeDrugRecommend'
//用药管理-查询症状药品详情
global.MedicalhomeDrugRecommendselectHomeDrugRecommendByIdPath = '/V2.0.0/homeDrugRecommend/selectHomeDrugRecommendById'
//用药管理-查询症状药品推荐列表
global.MedicalhomeDrugRecommendselectHomeDrugRecommendPath = '/V2.0.0/homeDrugRecommend/selectHomeDrugRecommend'
//圈子管理-获取圈子审核拒绝原因
global.MedicalmedicalDictionarygetReasonsForRefusalCirclePath = '/V2.0.0/medicalDictionary/getReasonsForRefusalCircle'
//圈子管理-审核圈子
global.MedicalcirclecheckPath = '/V2.0.0/circle/check'
//圈子管理-根据条件查询圈子列表接口
global.MedicalcirclefindCircleListByConditionPath = '/V2.0.0/circle/findCircleListByCondition'
//圈子管理-查看圈主资料接口
global.MedicalcirclegetCreatorDetailPath = '/V2.0.0/circle/getCreatorDetail'
//圈子分类-新增圈子分类
global.MedicalcircleAssortmentaddPath = '/V2.0.0/circleAssortment/add'
//圈子分类-修改圈子分类
global.MedicalcircleAssortmentupdatePath = '/V2.0.0/circleAssortment/update'
//圈子分类-删除圈子分类
global.MedicalcircleAssortmentdeletePath = '/V2.0.0/circleAssortment/delete'
//圈子分类-分页查询圈子分类
global.MedicalcircleAssortmentselectPath = '/V2.0.0/circleAssortment/select'
//热词管理-新增热词
global.MedicalhotSearchaddPath = '/V2.0.0/hotSearch/add'
//热词管理-修改热词
global.MedicalhotSearchupdatePath = '/V2.0.0/hotSearch/update'
//热词管理-删除热词
global.MedicalhotSearchdeletePath = '/V2.0.0/hotSearch/delete'
//热词管理-获取所有热词接口
global.MedicalhotSearchgetHotSearchPath = '/V2.0.0/hotSearch/getHotSearch'



// 健康模块******************************************************
// 查询健康档案信息
global.healthhealthRecordshgetHealthRecordsDetailPath = '/V2.0.0/healthRecords/getHealthRecordsDetail'
// 获取健康档案页卡名称
global.healthhealthRecordsgetPageCardNamePath = '/V2.0.0/healthRecords/getPageCardName'
// 获取关联账号信息列表
global.healthhealthRecordsgetRelationAccountInfoPath = '/V2.0.0/healthRecords/getRelationAccountInfo'





// 新闻模块2.0******************************************************
// 上传视频
global.uploadFileVideoPath = '/zuul/file-service-file-upload/V1.0.0/api/file/upload'
//动态管理-查询动态详情
global.newsControllerFindByDynamicIdPath = '/V2.0.0/newsController/findByDynamicId'
//新闻管理-多条件查询新闻（动态）列表
global.newsControllerSelectNewsListPath = '/V2.0.0/newsController/selectNewsList'
//新闻管理-新增文字/视屏类新闻
global.newsControllerAddNewsPath = '/V2.0.0/newsController/addNews'
//新闻管理-保存新闻到草稿箱
global.newsControllerSaveNewsPath = '/V2.0.0/draftsController/saveDraft'
//新闻管理-对新闻属性进行修改
global.newsControllerUpdatePath = '/V2.0.0/newsController/update'
//新闻管理-按新闻id查询新闻的详情
global.newsControllerSelectNewsDetailPath = '/V2.0.0/newsController/selectNewsDetail'
//新闻管理-单个或批量推荐/取消推荐新闻（动态）
global.newsControllerRecommendNewsPath = '/V2.0.0/newsController/recommendNews'
//新闻管理-批量删除新闻（动态）
global.newsControllerDeletePath = '/V2.0.0/newsController/delete'
//动态管理-停止/显示动态
global.newsControllerShowDynamicPath = '/V2.0.0/newsController/showDynamic'
//新闻管理-查看新闻（动态）互动数据详情
global.newsSummaryControllerListNewsInteractionDataPath = '/V2.0.0/newsSummaryController/listNewsInteractionData'
//问答管理-问答列表展示
global.newsquestionsControllerListQuestionsPath = '/V2.0.0/questionsController/listQuestions'
//问答管理-按问答id查询问答详情
global.newsquestionsControllerGetQuestionsDetailPath = '/V2.0.0/questionsController/getQuestionsDetail'
//问答管理-取消/推荐问答
global.newsquestionsControllerRecommendQuestionsPath = '/V2.0.0/questionsController/recommendQuestions'
//问答管理-删除/批量删除问题
global.newsquestionsControllerDeleteQuestionsPath = '/V2.0.0/questionsController/deleteQuestions'
//问答管理-查询问答互动数据信息
global.newsnewsSummaryControllerListQuestionInteractionDataPath = '/V2.0.0/newsSummaryController/listQuestionInteractionData'
//问答管理-查看问题的回答详情
global.newsanswersControllerListAnswersDetailPath = '/V2.0.0/answersController/listAnswersDetail'
//问答管理-查看问题的回答详情-对评论操作
global.newsanswersControllerSetAnswersPath = '/V2.0.0/answersController/setAnswers'
// 标签管理-查询标签
global.newslabelControllerlistLabelsPath = '/V2.0.0/labelController/listLabels'
// 标签管理-新增标签
global.newslabelControllersaveLabelPath = '/V2.0.0/labelController/saveLabel'
// 标签管理-修改标签
global.newslabelControllerupdateLabelPath = '/V2.0.0/labelController/updateLabel'
// 标签管理-删除/批量删除标签
global.newslabelControllerdeleteLabelsPath = '/V2.0.0/labelController/deleteLabels'
//小视频管理-根据昵称/用户名获取用户列表
global.newsvideoSelectPageVideoPath = '/V2.0.0/video/selectPageVideo'
//小视频管理-批量删除、批量推荐和取消推荐
global.newsvideoupdateVideoStatePath = '/V2.0.0/video/updateVideoState'
// 作者管理-新增作者
global.newsnewsAuthorControlleraddNewsAuthorPath = '/V2.0.0/newsAuthorController/addNewsAuthor'
// 作者管理-模糊查询作者列表
global.newsnewsAuthorControllerselectAuthorListPath = '/V2.0.0/newsAuthorController/selectAuthorList'
// 作者管理-修改作者
global.newsnewsAuthorControllerupdateAuthorPath = '/V2.0.0/newsAuthorController/updateAuthor'
// 作者管理-删除作者
global.newsnewsAuthorControllerdeleteAuthorPath = '/V2.0.0/newsAuthorController/deleteAuthor'
// 分页查询赞赏记录
global.newsappreciatelogselectPageIAppreciateLogPath = '/V2.0.0/appreciate-log/selectPageIAppreciateLog'
// 分页获取评论
global.newscommentsInfofindCommentsByObjectIdPath = '/V1.0.0/commentsInfo/findCommentsByObjectId'
// 分页获取评论-修改评论状态（热评/显示）
global.newscommentsInfofindUpdateCommentInfoStatePath = '/V1.0.0/commentsInfo/updateCommentInfoState'
// 获取草稿箱列表
global.newsdraftsControllerlistLongArticlePath = '/V2.0.0/draftsController/listLongArticle'
// 删除草稿箱里长文章或删除回收站里的长文章
global.newsdraftsControllerdeleteNewsPath = '/V2.0.0/draftsController/deleteNews'
// 多条件查询审核列表
global.newsuserPermissionControllerlistUserPermissionDataPath = '/V2.0.0/userPermissionController/listUserPermissionData'
// 根据id查询草稿箱的详情
global.newsdraftsControllerselectDraftsDetailPath = '/V2.0.0/draftsController/selectDraftsDetail'
// 修改评论状态（热评/显示）
global.newscommentsInfoupdateCommentInfoStatePath = '/V1.0.0/commentsInfo/updateCommentInfoState'
// 对未审核用户操作
global.newsuserPermissionControllerupdateUncheckedStatePath = '/V2.0.0/userPermissionController/updateUncheckedState'
// 对已审核信息操作
global.newsuserPermissionControllerupdateCheckStatePath = '/V2.0.0/userPermissionController/updateCheckState'
// 查看用户发表的文章或动态
global.newsuserSummaryControllerselectArticleListPath = '/V2.0.0/userSummaryController/selectArticleList'
// 查看用户提出的问题
global.newsuserSummaryControllerselectQuestionListPath = '/V2.0.0/userSummaryController/selectQuestionList'
//查看用户发表的视频
global.newsuserSummaryControllerselectVideoByUserIdPath = '/V2.0.0/userSummaryController/selectVideoByUserId'
// 查看用户身份证信息
global.newsuserPermissionControllergetUserIdCardPath = '/V2.0.0/userPermissionController/getUserIdCard'
// 删除审核记录
global.newsuserPermissionControllerdeleteCheckStatePath = '/V2.0.0/userPermissionController/deleteCheckState'
//  用户管理-根据昵称/用户名获取用户列表
global.newsuserSummaryControllerListUserSummaryPath = '/V2.0.0/userSummaryController/listUserSummary'
//  用户管理-查看用户发表的文章或动态
global.newsuserSummaryControllerSelectArticleListPath = '/V2.0.0/userSummaryController/selectArticleList'
//  用户管理-查看用户提出的问题
global.newsuserSummaryControllerSelectQuestionListPath = '/V2.0.0/userSummaryController/selectQuestionList'
//  用户管理-查看用户的评论列表
global.newsuserSummaryControllerSelectAnswersListPath = '/V2.0.0/userSummaryController/selectAnswersList'
//  用户管理-查看用户的违规详情列表
global.newsuserSummaryControllerSelectIllegalListByUserIdPath = '/V2.0.0/userSummaryController/selectIllegalListByUserId'
//  用户管理-解封/封号用户
global.newsuserControllerBlockUserPath = '/V2.0.0/userSummaryController/blockUser'
//  用户管理-推荐/取消用户优秀的回答者
global.newsuserSummaryControllerRecommendPath = '/V2.0.0/userSummaryController/userRecommend'





// 公共模块-数据同步****************************************************
// 数据同步接口
global.staticdatasyncPath = '/V1.0.0/static/data/sync'
// 根据类型获取topic
global.staticdatagetTopicPath = '/V1.0.0/static/data/getTopic'
// 公共模块-初始化管理****************************************************
// ------------------公共模块-----------
// 初始化轮播图到redis接口
global.baseinitBannerToRedisPath = '/V1.0.0/banner/initBannerToRedis'
// 初始化系统消息
global.baseinitinformationPath = '/V2.0.0/information/init'
// 初始化所有字典缓存
global.baseinitinitDictionaryRedisPath = '/V1.0.0/base/dictionary/initDictionaryRedis'
// 初始化领域缓存
global.baseinitinitAdvantageAreaToRedisPath = '/V1.0.0/base/dictionary/initAdvantageAreaToRedis'
// 初始化基础字典缓存
global.baseinitinitBaseDictionaryRedisPath = '/V1.0.0/base/dictionary/initBaseDictionaryRedis'
// 初始化地区字典到redis
global.baseinitinitAreaToRedisPath = '/V1.0.0/base/dictionary/initAreaToRedis'
// 初始化所有热词到redis
global.baseinitinitHotSearchToRedisPath = '/V1.0.0/hotSearch/initHotSearchToRedis'
// 初始化初始化日志监控系统接收人缓存
global.baseinitStaticLogstashDictionaryInitReceivePath = '/V1.0.0/static/logstash/dictionary/initReceive'
// 初始化日志监控系统服务列表缓存
global.baseinitStaticLogstashDictionaryInitServiceListPath = '/V1.0.0/static/logstash/dictionary/initServiceList'
// ------------------医疗-----------
// 初始化医生
global.baseinitinitDoctorToRedisPath = '/V1.0.0/doctor/initDoctorToRedis'
// 初始化医生geo
global.baseinitinitDoctorGeoPath = '/V1.0.0/doctor/initDoctorGeo'
// 初始化医院
global.baseinitinitHospitalToRedisPath = '/V1.0.0/hospital/initHospitalToRedis'
// 初始化医院Geo
global.baseinitinitHospitalGeoPath = '/V1.0.0/hospital/initHospitalGeo'
// 初始化Redis健康回答
global.baseinitintoHealthAnswerRedisPath = '/V1.0.0/healthAnswer/intoHealthAnswerRedis'
// 初始化医疗字典到redis
global.baseinitinitMedicalDictionaryRedisPath = '/V1.0.0/medicalDictionary/initMedicalDictionaryRedis'
// 初始化医疗圈子分类
global.baseinitinitCircleAssortmentToRedisPath = '/V2.0.0/circleAssortment/initCircleAssortmentToRedis'
// 初始化疾病和疾病子症状关联
global.baseinitinitDiseaseAndDiseaseSubSymptomRelationToRedisPath = '/V2.0.0/disease/initDiseaseAndDiseaseSubSymptomRelationToRedis'
// 初始化症状疾病关联和症状子症状
global.baseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedisPath = '/V2.0.0/symptomPosition/initSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis'
// 初始化圈子成员至缓存
global.baseinitinitCircleMemberPath = '/V2.0.0/circleMember/initCircleMember'
// 初始化文章认证
global.baseinitinitArticleAuthenticationToRedisPath = '/V1.0.0/article/initArticleAuthenticationToRedis'
// ------------------新闻-----------
// 问题回答缓存初始化
global.baseinitinitAnswersCachePath = '/V2.0.0/questionsController/initAnswersCache'
// 问题缓存初始化
global.baseinitinitQuestionsCachePath = '/V2.0.0/questionsController/initQuestionsCache'
// 热搜初始化
global.baseinittopSearchControlPushPath = '/V1.0.0/topSearchControl/push'
// 新闻信息初始化
global.baseinittopSearchControlInitPath = '/V1.0.0/topSearchControl/init'
// 新闻个人分类初始化
global.baseinituserClassifyinitUserClassifyRedisPath = '/V2.0.0/userClassify/initUserClassifyRedis' 
// ------------------健康-----------
// 初始化所有字典到redis
global.baseinitinitAllDictionaryToRedisPath = '/V1.0.0/dictionary/initAllDictionaryToRedis'
// ------------------饮食-----------
// 初始化食谱到redis
global.baseinitinitRecipesToRedisPath = '/V1.0.0/recipes/initRecipesToRedis'
// ------------------健身-----------
// 初始化健身数据到redis
global.baseinitinitRedisPath = '/V1.0.0/init/initRedis'
// ---------------商城--------------
// 1.初始化为你精选图到redis
global.baseinitinitCarefullyChosenToRedisPath = '/V1.0.0/homePage/carefullyChosen/initCarefullyChosenToRedis'
// 2.初始化所有图标到redis
global.baseinitinitHomeIconToRedisPath = '/V1.0.0/homePage/homeIcon/initHomeIconToRedis'
// 3.初始化优惠券到redis
global.baseinitcouponinitRedisPath = '/V1.0.0/coupon/initRedis'
// 2.初始化必康定制水
global.baseinitinnitCustomWaterPath = '/V1.0.0/product/innitCustomWater'
// 3.初始化商品信息
global.baseinitinnitProductInfoPath = '/V1.0.0/product/innitProductInfo'
// ---------------激励---------------
// 1.缓存所有可用激励任务
global.baseinitinitEncourageTasksPath = '/V1.0.0/encourage/initEncourageTasks'
// ------------个人中心--------------
// 1.初始化角色-资源关系到redis
global.baseinitinitRoleResourcesPath = '/V1.0.0/roleResource/initRoleResources'
// 2.初始化app用户缓存
global.baseinitinitAccountPath = '/V1.0.0/account/initAccount'

// 首页热门活动
// 添加热门活动
global.basehoteventaddHotEventPath = '/V2.0.0/web/hot-event/addHotEvent'
// 修改热门活动
global.basehoteventeditHotEventPath = '/V2.0.0/web/hot-event/editHotEvent'
// 查询热门活动列表
global.basehoteventgetHotEventPath = '/V2.0.0/web/hot-event/getHotEvent'
// 查询热门活动详情
global.basehoteventgetHotEventInfoPath = '/V2.0.0/web/hot-event/getHotEventInfo'
// 禁止热门活动
global.basehoteventdisableHotEventPath = '/V2.0.0/web/hot-event/disableHotEvent'
// 启用热门活动
global.basehoteventenableHotEventPath = '/V2.0.0/web/hot-event/enableHotEvent'
// 删除热门活动
global.basehoteventdeleteHotEventPath = '/V2.0.0/web/hot-event/deleteHotEvent'
// 首页功能区
// 添加首页功能区
global.basehomeFunctioncreatePath = '/V2.0.0/homeFunction/create'
// 修改首页功能区
global.basehomeFunctionupdatePath = '/V2.0.0/homeFunction/update'
// 查询首页功能区列表
global.basehomeFunctionqueryAllPath = '/V2.0.0/homeFunction/queryAll'
// 修改默认配置首页服务
global.basehomeFunctionupdateDefaultPath = '/V2.0.0/homeFunction/updateDefault'
// 首页功能区明细查询
global.basehomeFunctionqueryPath = '/V2.0.0/homeFunction/query'
// 查询默认首页服务列表
global.basehomeFunctionqueryDefaultPath = '/V2.0.0/homeFunction/queryDefault'
// 更新首页服务开启状态
global.basehomeFunctionstatusPath = '/V2.0.0/homeFunction/status'





// 公共模块****************************************************
// 基础字典
// 查询省市县
global.healthFindAreaListPath = '/V1.0.0/base/dictionary/findAreaFromRedis'
// 添加字典
global.baseadddictionaryPath = '/V1.0.0/base/dictionary/add'
// 修改字典
global.baseupdatedictionaryPath = '/V1.0.0/base/dictionary/update'
// 检验字典code是否存在
global.basecheckCodeIsExistPath = '/V1.0.0/base/dictionary/checkCodeIsExist'
// 删除字典
global.basedeldictionaryPath = '/V1.0.0/base/dictionary/del'
// 根据字典id获取字典及子字典列表接口
global.basefindListByParentIdPath = '/V1.0.0/base/dictionary/findListByParentId'
// 获取所有根字典接口
global.basefindRootDictionaryPath = '/V1.0.0/base/dictionary/findRootDictionary'
// 查询字典详情接口
global.basefindDictionaryByIdPath = '/V1.0.0/base/dictionary/findDictionaryById'
// 根据字典id获取字典及子字典列表接口
global.basefindDictionaryListByIdPath = '/V1.0.0/base/dictionary/findDictionaryListById'
// banner模块
// 新增/修改banner获取商品列表
global.bannnerProductListPath = '/V1.0.0/product/list'
// 单页模块
// 新增单页
global.cutpageContextaddPath = '/V1.0.0/pageContext/add'
// 删除单页
global.cutpageContextdelPath = '/V1.0.0/pageContext/del'
// 修改单页
global.cutpageContextupdatePath = '/V1.0.0/pageContext/update'
// 查找单页
global.cutpageContextselectPath = '/V1.0.0/pageContext/select'
// 查询分页
global.cutpageContextselectPagePath = '/V1.0.0/pageContext/selectPage'
// 文件管理
// 文件详情
global.basefileInfopagePath = '/V1.0.0/fileInfo/page'
// 文件列表
global.basefileInfofindByIdPath = '/V1.0.0/fileInfo/findById'
// 删除文件
global.baseapifiledeleteFilePath = '/V1.0.0/api/file/deleteFile'
// 版本管理
// 新增版本
global.baseappVersionsavePath = '/V1.0.0/base/appVersion/save'
// 删除版本
global.baseappVersiondeletePath = '/V1.0.0/base/appVersion/delete'
// 修改版本
global.baseappVersionupdatePath = '/V1.0.0/base/appVersion/update'
// ID查找版本
global.baseappVersionfindOnePath = '/V1.0.0/base/appVersion/findOne'
// 版本分页
global.baseappVersionpagePath = '/V1.0.0/base/appVersion/page'
// 健康模块****************************************************
// 用户管理
// 用户列表
global.healthuserinfoListPath = '/V1.0.0/userinfo/getPage'
// 用户列表展示
global.healthFindgetUserHealthDataPath = '/V1.0.0/user-health-data/getUserHealthData'
// 查询年龄段
global.healthFindAgeListPath = '/V1.0.0/dictionary/findAgeGroupFromRedis'
// 添加标准信息
global.healthAddstandardPath = '/V1.0.0/standard-data/add'
// 修改标准信息
global.healthUpstandardPath = '/V1.0.0/standard-data/update'
// 查询已录入的体征
global.healthFindLrtzFromRedisPath = '/V1.0.0/dictionary/findLrtzFromRedis'
// 新增字典
global.healthAddDictionaryPath = '/V1.0.0/dictionary/add'
// 修改字典
global.healthupDictionaryPath = '/V1.0.0/dictionary/update'
// 删除字典
global.healthDelDictionaryPath = '/V1.0.0/dictionary/del'
// 检验字典code
global.healthCheckIndexRangeCodePath = '/V1.0.0/dictionary/checkCodeIsExist'
// 查询基础字典
global.healthFindBaseDictionaryPath = '/V1.0.0/dictionary/findBaseDictionaryFromRedis'
// 查询父code子字典类型集合
global.healthFindBaseDictionaryFromRedisPath = '/V1.0.0/dictionary/findDictionaryTypeByCodeAndLevel'
// 获取所有根字典接口
global.healthfindRootDictionaryPath = '/V1.0.0/dictionary/findRootDictionary'
// 根据字典id获取字典以及子字典列表
global.healtfindDictionaryListByIdPath = '/V1.0.0/dictionary/findDictionaryListById'
// 根据父id查询子字典列表接口
global.healtfindDictionaryfindListByParentIdPath = '/V1.0.0/dictionary/findListByParentId'
// 查询字典详情接口
global.healthfindDictionaryByIdPath = '/V1.0.0/dictionary/findDictionaryById'
// 标准模型
// 查询标准指标字典
global.healthFindBzzbModulesPath = '/V1.0.0/dictionary/findBzzbFromRedis'
// 添加标准模型
global.healthfindStandardDataPath = '/V1.0.0/standard-data/findStandardData'
// 健康建议
// 查询健康建议列表
global.healthFindTipListPath = '/V1.0.0/index-tip/list'
// 更新单个健康建议列表
global.healthUpdateTipOnePath = '/V1.0.0/index-tip/update'
// 批量添加健康建议列表
global.healthAddTipsPath = '/V1.0.0/index-tip/add'
// 健康档案
// 新增健康建议
global.healthbodyCheckRuleAddPath = '/V1.0.0/bodyCheckRule/add'
// 查询检测规则列表
global.healthfindByPageNoAndPageSizePath = '/V1.0.0/bodyCheckRule/findByPageNoAndPageSize'
// 修改检测规则
global.healthbodyCheckRuleupdatePath = '/V1.0.0/bodyCheckRule/update'
// 删除检测规则
global.healthbodyCheckRuledeletePath = '/V1.0.0/bodyCheckRule/delete'
// 查询检测类目列表
global.healthfindJcTypeListPath = '/V1.0.0/dictionary/findJcTypeList'
// 类目对应问题列表
global.healthfindJcOptionsListPath = '/V1.0.0/dictionary/findJcOptionsList'
// 登录模块****************************************************
// 登录
global.loginpath = '/V1.0.0/static/account/login'
// global.loginpath = 'https://app-api.botu.com:9001/life-authority-account/V1.0.0/static/account/login'
// 账户管理****************************************************
// 账户模块
// 新增账户
global.adminAddAcountPath = '/V1.0.0/account/saveAccount'
// 获取账户列表
global.adminAcountListPath = '/V1.0.0/account/selectAccounts'
// 账户和角色关联
global.adminAcountAndRolePath = '/V1.0.0/accountRole/add'
// 查询账号下所有角色
global.adminAcountAndRoleListPath = '/V1.0.0/accountRole/selectRolesByAccountId'
// 删除账户关联
global.adminDelAcountRolePath = '/V1.0.0/accountRole/delete'
// 设置账户状态
global.adminAcountStatePAth = '/V1.0.0/account/updateAccountState'
// 删除账户
global.adminAcountDelPath = '/V1.0.0/account/deleteAccount'
// 修改账户信息
global.adminAcountUpPath = '/V1.0.0/account/update'
// 添加角色
global.adminAddRolePath = '/V1.0.0/role/add'
// 删除角色
global.adminDelRolePath = '/V1.0.0/role/delete'
// 更新角色
global.adminUpRolePath = '/V1.0.0/role/update'
// 角色列表
global.adminListRolePath = '/V1.0.0/role/select'
// 角色和资源关联
global.adminRoleResPath = '/V1.0.0/roleResource/add'
// 角色和资源关联列表
global.adminRoleResListPath = '/V1.0.0/roleResource/selectResourcesByRoleId'
// 角色和资源关联列表
global.adminRoleResDelPath = '/V1.0.0/roleResource/delete'
// 添加资源
global.adminAddResPath = '/V1.0.0/resource/add'
// 删除角色
global.adminDelResPath = '/V1.0.0/resource/delete'
// 更新角色
global.adminUpResPath = '/V1.0.0/resource/update'
// 资源列表
global.adminListResPath = '/V1.0.0/resource/selectAll'
// *******************************新闻模块**********************
// 获取热搜列表
global.hotSearchListPath = '/V1.0.0/topSearchControl/findPage'
// 添加热词
global.addhotWordsPath = '/V1.0.0/topSearchControl/add'
// 根据id删除热词
global.delhotWordPath = '/V1.0.0/topSearchControl/deleteById'
// 修改热词
global.edithotWordPath = '/V1.0.0/topSearchControl/updateById'
// 获取新闻管理列表
global.newsListPath = '/V1.0.0/newsControl/selectPage'
// 根据id删除新闻管理列表
global.delnewsPath = '/V1.0.0/newsControl/delete?id='
// 上传图片
// global.uploadFilePath = '/V1.0.0/api/file/upload'
global.uploadFilePath = '/zuul/file-service-file-upload/V1.0.0/api/file/upload'
// 获取分类管理列表
global.flListPath = '/V1.0.0/classiflyControl/selectPage'
// 根据id删除分类管理列表
global.delclassifyPath = '/V1.0.0/classiflyControl/delete'
// 修改分类管理列表
global.editclassifyPath = '/V1.0.0/classiflyControl/meger'
// 增加分类管理列表
global.addclassifyPath = '/V1.0.0/classiflyControl/save'
// 增加新闻管理列表
global.publishPath = '/V1.0.0/newsControl/save'
// 更新新闻管理列表
global.editPublishPath = '/V1.0.0/newsControl/modify'
// 获取评论管理列表
global.commentListPath = '/V1.0.0/commentsInfo/page'
// 根据id删除评论管理列表
global.delcommentManagerPath = '/V1.0.0/commentsInfo/deleteById'
// 新闻管理页面批量操作新闻管理页面批量操作
global.newsbatchOpPath = '/V1.0.0/newsControl/batch'
// 热搜管理页面批量操作
global.rsbatchOpPath = '/V1.0.0/topSearchControl/batch'
// 评论管理页面批量操作
global.plbatchOpPath = '/V1.0.0/UsersComController/batch'
// 分类管理页面批量操作
global.flbatchOpPath = '/V1.0.0/classiflyControl/batch'
// 热搜管理页面排序
global.sorthotWordPath = '/V1.0.0/topSearchControl/updateSort'
// 分类管理页面排序
global.sortclassifyPath = '/V1.0.0/classiflyControl/sorting'
// 查询所有的分类
global.classiflyControlClassifyFindAllPath = '/V1.0.0/classiflyControl/classifyFindAll'
// 查询评论详情
global.commentdetailListPath = '/V1.0.0/replyInfo/page'
// 删除子评论
global.delcommentdetailManagerPath = '/V1.0.0/replyInfo/deleteById'
// ************************************医疗模块*****************************
// 上传图片
// global.hospitaluploadFilePath = '/V1.0.0/api/file/upload'
// 获取医院管理列表
global.hospitalmanageListPath = '/V1.0.0/hospital/selectHospitals'
// 医院列表排序
global.HospRankPath = '/V1.0.0/hospital/updateSort'
// 新增医院管理列表
global.newlyhosPath = '/V1.0.0/hospital/insert'
// 医院管理-修改-获取医院详情
global.HospitalDetailPath = '/V1.0.0/hospital/getHospitalDetail'
// 修改医院管理列表
global.ModificationHosPath = '/V1.0.0/hospital/update'
// 新增医院-获取省市列表
global.provincePath = '/V1.0.0/base/dictionary/findAreaFromRedis'
// 新增医院-获取一级科室列表
global.trainedListPath = '/V1.0.0/medicalDictionary/getBigOffice'
// 新增医院-获取二级科室列表
global.LitTrainedListPath = '/V1.0.0/medicalDictionary/getSmallOffice'
// 新增医院-获取级别列表
global.levelListPath = '/V1.0.0/medicalDictionary/getHospitalLevel'
// 删除医院管理列表
global.delhospitalPath = '/V1.0.0/hospital/delete'
// 获取医生管理列表
global.doctorListsPath = '/V1.0.0/doctor/selectDoctorPage'
// 新增医生-获取一级科室
global.selectBigDepartmentListPath = '/V1.0.0/medicalDictionary/selectBigDepartment'
// 新增医生-获取二级科室
global.selectSmallDepartmentListPath = '/V1.0.0/medicalDictionary/selectSmallDepartment'
// 新增医生下获取医生级别列表
global.DoctorRankPath = '/V1.0.0/medicalDictionary/getDoctorType'
// 医生列表排序
global.DoctorSortPath = '/V1.0.0/doctor/updateSort'
// 新增医生
global.addDoctPath = '/V1.0.0/doctor/add'
// 编辑医生-获取医生详情
global.selectDoctorByIdPath = '/V1.0.0/doctor/selectDoctorById'
// 编辑医生
global.EditDoctPath = '/V1.0.0/doctor/update'
// 医生接诊详情
global.doctorFindPageListsPath = '/V1.0.0/doctor-word/findPage'
// 删除医生管理列表
global.deldoctorPath = '/V1.0.0/doctor/del'
//药店管理-分页
global.drugstoreListPath = '/V1.0.0/drugstore/page'
//药店管理-新增
global.addDrugstorePath = '/V1.0.0/drugstore/add'
//药店管理-编辑
global.editDrugstorePath = '/V1.0.0/drugstore/update'
//药店管理-删除
global.cancelDrugstoreListPath = '/V1.0.0/drugstore/deleteById'
//药物管理-分页
global.drugListPath = '/V1.0.0/drug/page'
//药物管理-删除
global.deletedrugPath = '/V1.0.0/drug/deleteById'
//药物管理-新增-人体部位
global.bodyPartsListPath = '/V1.0.0/medicalDictionary/getBodyChart'
//药物管理-新增-获取症状
global.symptomListPath = '/V1.0.0/drug/findSymptomPosition'
//药物管理-新增-获取药店
global.symptomDrugstoreListPath = '/V1.0.0/drug/findDrugstore'
//药物管理-新增-获取药品链接
global.drugLingListPath = '/V1.0.0/product/findByProductName'
//药物管理-新增
global.addMedicinePath = '/V1.0.0/drug/addDrug'
//药物管理-编辑
global.editMedicinePath = '/V1.0.0/drug/updateDrug'
//药品推荐-分页
global.drugpushmanageListPath = '/V1.0.0/homeDrugRecommend/selectHomeDrugRecommend'
//药品推荐-删除
global.deltaDrugpushPath = '/V1.0.0/homeDrugRecommend/deleteHomeDrugRecommendById'
//药品推荐-新增-症状
global.drugSymptomListPath = '/V1.0.0/medicalDictionary/getHomeSymptoms'
//药品推荐-新增-商城药品
global.storeDrugListPath = '/V1.0.0/homeDrugRecommend/selectDrugList'
//药品推荐-新增
global.addDrugpushPath = '/V1.0.0/homeDrugRecommend/addOrUpdateHomeDrugRecommend'
//疾病管理-分页
global.illnessListPath = '/V1.0.0/disease/selectPage'
//疾病管理-常见/不常见
global.illnessShowPath = '/V1.0.0/disease/delete'
//疾病管理-新增
global.addlilnessPath = '/V1.0.0/disease/addOrUpdate'
//疾病管理-新增-查询一级科室
global.selectBigDepartmentPath = '/V1.0.0/medicalDictionary/selectBigDepartment'
//疾病管理-新增-查询二级科室
global.selectSmallDepartmentPath = '/V1.0.0/medicalDictionary/selectSmallDepartment'
//疾病管理-获取详情
global.lilnessDetailsPath = '/V1.0.0/disease/selectDiseaseById'
//症状管理-分页
global.partSymptomListPath = '/V1.0.0/symptomPosition/getSymptomByPositionId'
//症状管理-新增
global.addSymptomlistPath = '/V1.0.0/symptomPosition/add'
//症状管理-修改
global.editSymptomlistPath = '/V1.0.0/symptomPosition/update'
//症状管理-删除
global.deleteSymptomlistPath = '/V1.0.0/symptomPosition/delete'
//问答管理-分页
global.questionsListPath = '/V1.0.0/healthQuestion/page'
//问答管理-删除
global.cancelQuestionsPath = '/V1.0.0/healthQuestion/deleteById'
//问答管理-批量删除
global.cancelBatchQuestionsPath = '/V1.0.0/healthQuestion/bacthDelete'
//问答管理-评论详情
global.answerListPath = '/V1.0.0/healthAnswer/page'
//问答管理-评论详情-删除
global.cancelAnswerPath = '/V1.0.0/healthAnswer/deleteById'
//文章管理-分页
global.articleListPath = '/V1.0.0/article/select'
//文章管理-分页-删除
global.articleDeletePath = '/V1.0.0/article/delete'
//文章管理-分页-推荐
global.recommendPath = '/V1.0.0/article/updateById'
//文章管理-新增-健康分类
global.ArticleAssortmentPath = '/V1.0.0/medicalDictionary/getArticleAssortment'
//文章管理-新增
global.addArticlePath = '/V1.0.0/article/add'
//圈子管理-分页
global.circleListPath = '/V1.0.0/circle/findCircleListByCondition'
//圈子管理-删除
global.cancelfigureDatumPath = '/V1.0.0/circle/delete'
//圈子管理-动态分页
global.dynamicListPath = '/V1.0.0/dynamic/findOneCircleDynamics'
//圈子管理-动态管理-删除
global.deleteDynamicPath = '/V1.0.0/dynamic/delete'
//圈子管理-动态详情
global.remarkOnListPath = '/V1.0.0/commentsInfo/page'
//圈子管理-动态详情-删除
global.delRemarkOnPath = '/V1.0.0/commentsInfo/deleteById'
//圈子管理-动态评论详情
global.discussOnListPath = '/V1.0.0/replyInfo/page'
//圈子管理-动态评论详情-删除
global.deldiscussPath = '/V1.0.0/replyInfo/deleteById'
//圈子管理-圈主详情
global.figureDatumPath = '/V1.0.0/circle/getCreatorDetail'
//圈子管理-圈主审核
global.auditfigureDatumPath = '/V1.0.0/circle/audit'
// 获取广告列表
global.adveListPath = '/V1.0.0/Advertising/page'
// 新增广告列表
global.AddInforPath = '/V1.0.0/Advertising/add'
// 广告列表排序
global.InforRankPath = '/V1.0.0/Advertising/updateSort'
// 修改广告
global.EditInforPath = '/V1.0.0/Advertising/updateById'
// 删除广告列表
global.delinforPath = '/V1.0.0/Advertising/deleteById'
// 获取一级字典
global.pagingDictionaryPath = '/V1.0.0/medicalDictionary/pagingDictionary'
// 获取子级字典
global.findMedicalByPidAndLevelPath = '/V1.0.0/medicalDictionary/findMedicalByPidAndLevel'
// 新增医疗字典
global.addMedicalDictListPath = '/V1.0.0/medicalDictionary/add'
// 编辑医疗字典
global.updateMedicalDictListPath = '/V1.0.0/medicalDictionary/update'
// 删除医疗字典
global.deleteMedicalDictPath = '/V1.0.0/medicalDictionary/delete'
// 医疗字典排序
global.updateSortMedicalDictPath = '/V1.0.0/medicalDictionary/updateSort'
// 指标与科室-列表
global.findByPagingListPath = '/V1.0.0/indexDepartment/findByPaging'
// 指标与科室-指标
global.findDepartmentListPath = '/V1.0.0/medicalDictionary/findDepartmentList'
// 指标与科室-新增
global.addTargetListPath = '/V1.0.0/indexDepartment/add'
// 指标与科室-编辑
global.updateTargetListPath = '/V1.0.0/indexDepartment/update'
// 指标与科室-删除
global.deleteFindByPagingPath = '/V1.0.0/indexDepartment/delete'
// 获取健康问答列表
// global.healthDiscussListPath = '/V1.0.0/healthQuestion/page'
// 获取健康问答列表
// global.DeleHealthDiscussListPath = '/V1.0.0/healthQuestion/deleteById'

// ***********************************激励模块**********************
// 获取活动管理列表
global.activityListPath = '/V1.0.0/encourage/findAll'
// 获取健康指标所有数据
global.indicatorListPath = '/V1.0.0/encourage/findAllDictionary'
// 添加活动
global.addactivityPath = '/V1.0.0/encourage/add'
// 根据id查询激励任务
global.editactivityPath = '/V1.0.0/encourage/findOne/'
// 编辑修改活动信息
global.editpreserveactivityPath = '/V1.0.0/encourage/update'
// 删除活动管理
global.delactivityPath = '/V1.0.0/encourage/delete/'
// 活动管理开始或停止活动
global.startorstopPath = '/V1.0.0/encourage/openOrClosed'
// banner 设置列表
global.bannerListPath = '/V1.0.0/banner/getBannerDetail'
// 激励新增banner
global.addbannerListPath = '/V1.0.0/banner/add'
// 激励删除banner
global.delbannerPath = '/V1.0.0/banner/delete'
// banner排序
global.sortbannerPath = '/V1.0.0/banner/modifyBannerSort'
// 修改banner
global.editbannerListPath = '/V1.0.0/banner/update'
// ***********************************金融模块**********************
// 交易记录
global.financialListPath = '/V1.0.0/wallet/getDetailPage'
// ***********************************娱乐模块**********************
// 食物管理列表
global.foodControlPath = '/V1.0.0/food/findFoodByPageNoAndPageSize'
// 食物管理列表
global.SeekfoodControlPath = '/V1.0.0/food/findFoodByPageNoAndPageSize'
// 新增食物
global.foodaddPath = '/V1.0.0/food/add'
// 编辑食物
global.foodUpdatePath = '/V1.0.0/food/update'
// 删除食物
global.foodremovePath = '/V1.0.0/food/delete'
// 模糊查询食物
global.foodFuzzyQueryPath = '/V1.0.0/food/findFoodByName'
// 查询食物重量标准
global.foodweightStandardPath = '/V1.0.0/food/findFoodWeight'
// 上传图片
// global.fooduploadFilePath = '/V1.0.0/api/file/upload'
global.fooduploadFilePath = '/zuul/file-service-file-upload/V1.0.0/api/file/upload'
// 食谱管理列表
global.RecipesListPath = '/V1.0.0/recipes/findRecipesByPageNoAndPageSize'
// 搜索食谱管理列表
global.SeekRecipesListPath = '/V1.0.0/recipes/findByName'
// 删除食谱
global.RecipesRemovePath = '/V1.0.0/recipes/delete'
// 新增食谱
global.RecipesAddPath = '/V1.0.0/recipes/add'
// 编辑食谱
global.RecipesUpdatePath = '/V1.0.0/recipes/update'
// 症状关联列表
global.AssociatedSymptomsPath = '/V1.0.0/indexRecipes/findIndexRecipesByPageNoAndPageSize'
// 搜索症状关联列表
global.SeekAssociatedSymptomsPath = '/V1.0.0/indexRecipes/findByDictionaryName'
// 新增症状关联
global.AddAssociatedSymptomsPath = '/V1.0.0/indexRecipes/add'
// 删除症状关联
global.RemoveAssociatedSymptomsPath = '/V1.0.0/indexRecipes/delete'
// 修改症状关联
global.AmendAssociatedSymptomsPath = '/V1.0.0/indexRecipes/update'
// 查询指标
global.IndexQueryPath = '/V1.0.0/dictionary/findLrtzJkzbFromRedis'
// 获取所有食物的千卡
global.getRecipesKcalPath = '/V1.0.0/recipes/getRecipesKcal'
// 按食谱类型查询食谱
global.findRecipesByTypePath = '/V1.0.0/recipes/findRecipesByType'
// 校验食谱名是否存在
global.verifyByNamePath = '/V1.0.0/recipes/verifyByName'
// ***********************************商城模块**********************
// 降价通知列表
global.storeNoticeOfReductionControllerPath = '/V1.0.0/NoticeOfReductionController/selectNoticePage'
// 降价通知
global.storemerchantsNoticePath = '/V1.0.0/NoticeOfReductionController/merchantsNotice'
// 新增品牌
global.storebrandAddPath = '/V1.0.0/brand/add'
// 修改品牌
global.storebrandupdateByIdPath = '/V1.0.0/brand/updateById'
// 删除品牌
global.storebranddeleteByIdPath = '/V1.0.0/brand/deleteById'
// 查询所有品牌
global.storebrandfindAllPath = '/V1.0.0/brand/findAll'
// 查询带有分页品牌
global.storebrandfindPagePath = '/V1.0.0/brand/findPage'
// 根据品牌名称查询品牌
global.storebrandfindByBrandNamePath = '/V1.0.0/brand/findByBrandName'
// 品牌详情
global.storebrandfindBrandPath = '/V1.0.0/brand/findBrand'
// 查询分类
global.storeclassfindByLevelAndIdPath = '/V0.0.1/classfication/findByLevelAndId'
// 商品列表/回收中心
global.storeproductListPath = '/V1.0.0/product/list'
// 批量上架/下架/删除/还原/物理删除
global.storebatchOperationPath = '/V1.0.0/product/batchOperation'
// ********************************** 库存管理 ********************/
// 获取库存管理列表
global.InventoryPath = '/V1.0.0/productRepertory/getRepertoryInfo'
// 删除库存管理列表
global.delInventoryPath = '/V1.0.0/product/batchOperation'
// ********************************** 优惠券 ******************************************************
// 新增优惠券
global.storecouponaddPath = '/V1.0.0/coupon/add'
// 修改优惠券
global.storecouponupdateByIdPath = '/V1.0.0/coupon/updateById'
// 批量删除优惠券
global.storecoupondeleteByIdPath = '/V1.0.0/coupon/deleteById'
// 发放优惠券
global.storecouponissuePath = '/V1.0.0/coupon/issue'
// 优惠券分页
global.storecouponpagePath = '/V1.0.0/coupon/page'
// 查看优惠券详情
global.storecouponfindByIdPath = '/V1.0.0/coupon/findById'
// 查询类目对应的子类目
global.storeclassficationfindByLevelAndIdPath = '/V0.0.1/classfication/findByLevelAndId'
// ********************************** 订单中心 *******************************************************
// 分页查询订单列表                          /V1.0.0/goodsOrder/findOrderList
global.storegoodsOrderfindOrderListPath = '/V1.0.0/goodsOrder/findOrderList'
// ********************************** 商品规格 ****************************************************
// 商品规格列表
global.storeclassAttributefindPagePath = '/V0.0.1/classAttribute/findPage'
// 新增商品规格
global.storeclassAttributesavePath = '/V0.0.1/classAttribute/save'
// 修改商品规格
global.storeclassAttributemodifyPath = '/V0.0.1/classAttribute/modify'
// 删除商品规格
global.storeclassAttributedeletePath = '/V0.0.1/classAttribute/delete'
// 商品规格属性项新增
global.storeclassAttributeItemsavePath = '/V0.0.1/classAttributeItem/save'
// 商品规格属性项修改
global.storeclassAttributeItemmodifyPath = '/V0.0.1/classAttributeItem/modify'
// 商品规格属性项删除接口
global.storeclassAttributeItemdeletePath = '/V0.0.1/classAttributeItem/delete'
// 查询某一规格属性下所有属性项值
global.storeclassAttributeItemfindByAttributeIdPath = '/V0.0.1/classAttributeItem/findByAttributeId'
// 商品规格属性项批量排序
global.storeclassAttributeItembatchUpdateRankPath = '/V0.0.1/classAttributeItem/batchUpdateRank'
// ************************************模板编辑********************************************
// 模板编辑-获取频道列表
global.storechannelManagementselectChannelPath = '/V1.0.0/homePage/channelManagement/selectChannel'
// 模板编辑-新增频道
global.storechannelManagementaddPath = '/V1.0.0/homePage/channelManagement/add'
// 模板编辑-修改频道
global.storechannelManagementupdatePath = '/V1.0.0/homePage/channelManagement/update'
// 模板编辑-删除频道
global.storechannelManagementdeletePath = '/V1.0.0/homePage/channelManagement/delete'
// 模板编辑-获取频道下商品
global.storechannelGoodsgetChannelGoodsPath = '/V1.0.0/homePage/channelGoods/getChannelGoods'
// 模板编辑-新增频道商品
global.storechannelGoodsaddPath = '/V1.0.0/homePage/channelGoods/add'
// 模板编辑-修改频道商品
global.storechannelGoodsupdatePath = '/V1.0.0/homePage/channelGoods/update'
// 模板编辑-排序频道商品
global.storechannelGoodsupdateSortPath = '/V1.0.0/homePage/channelGoods/updateSort'
// 模板编辑-删除频道商品
global.storechannelGoodsdeletePath = '/V1.0.0/homePage/channelGoods/delete'
// 模板编辑-获取全部为你精选图
global.storecarefullyChosengetCarefullyChosenDetailPath = '/V1.0.0/homePage/carefullyChosen/getCarefullyChosenDetail'
// 模板编辑-修改为你精选图
global.storecarefullyChosengetupdatePath = '/V1.0.0/homePage/carefullyChosen/update'
// 模板编辑-排序为你精选图
global.storecarefullyChosengetupdateSortPath = '/V1.0.0/homePage/carefullyChosen/updateSort'
// 模板编辑-新增为你精选图
global.storecarefullyChosengetaddPath = '/V1.0.0/homePage/carefullyChosen/add'
// 模板编辑-为你精选图排序
global.storecarefullyChosengetcarefullyChosenSortPath = '/V1.0.0/homePage/carefullyChosen/carefullyChosenSort'
// 模板编辑-删除为你精选图
global.storecarefullyChosengetdeletePath = '/V1.0.0/homePage/carefullyChosen/delete'
// 模板编辑-更改为你精选图标题
global.storecarefullyChosenupdateTitlePath = '/V1.0.0/homePage/carefullyChosen/updateTitle'
// 模板编辑-从redis获取所有热词接口
global.storehomePagehomeIcongetHomeIconsPath = '/V1.0.0/homePage/homeIcon/getHomeIcons'
// 模板编辑-新增图标接口
global.storehomeIcongetHomeIconaddPath = '/V1.0.0/homePage/homeIcon/add'
// 模板编辑-修改图标接口
global.storehomeIcongetHomeIconupdatePath = '/V1.0.0/homePage/homeIcon/update'
// 模板编辑-删除图标接口
global.storehomeIcongetHomeIcondeletePath = '/V1.0.0/homePage/homeIcon/delete'
// ***************************************生成系统设置********
// 系统设置-获取热词列表
global.storehotSearchgetHotSearchPath = '/V1.0.0/hotSearch/getHotSearch'
// 系统设置-修改热词接口
global.storehotSearchupdatePath = '/V1.0.0/hotSearch/update'
// 系统设置-删除热词接口
global.storehotSearchdeletePath = '/V1.0.0/hotSearch/delete'
// 系统设置-新增热词
global.storehotSearchaddPath = '/V1.0.0/hotSearch/add'
// ************************************商品中心***********
// 商品详情
global.storegoodsOrderfindGoodsByOrderIdPath = '/V1.0.0/goodsOrder/findGoodsByOrderId'
// 库存管理下获取分类列表
global.ClassfyListFirstPath = '/V0.0.1/classfication/findByLevelAndId'
// 编辑库存
global.compileListPath = '/V1.0.0/productRepertory/getProductSku'
// 确定编辑库存
global.ModificationPath = '/V1.0.0/productRepertory/updateRepertoryNum'
// 查询不同层级下的分类数目
global.queryTypeListPath = '/V0.0.1/classfication/findByLevelAndId'
// 根据一级目录查询商家品牌
global.merchantBrandListPath = '/V1.0.0/brand/findOneById'
// 根据id查询商品品牌
global.brandfindOneByIdPath = '/V1.0.0/brand/findBrand'
// 根据3级分类id查询商品类目
global.askgoodsTypeListPath = '/V0.0.1/classfication/findClaNameStringByPath'
// 查询所有的商家品牌
global.AllBrandListPath = '/V1.0.0/brand/findAll'
// 根据品牌名称查询品牌
global.findByBrandNamePath = '/V1.0.0/brand/findByBrandName'
// 查询最近使用类目
global.RecentTypeListPath = '/V1.0.0/product/getClassName'
// 查询所有的物流信息
global.StoreLogisticsPath = '/V1.0.0/logisticsCenter/findAllName'
// *********************************商品类目******************.
// 新增类目
global.reartypeAddClassifyPath = '/V0.0.1/classfication/save'
// 修改类目
global.reartypeCompileClassifyPath = '/V0.0.1/classfication/modify'
// 删除类目
global.reartypeDeleteClassifyPath = '/V0.0.1/classfication/delete'
// 类目排序
global.batchUpdateRankClassifyPath = '/V0.0.1/classfication/batchUpdateRank'
// 根据商品分类ID 查询分类下的商品规格及规格项
global.merchantSKUListPath = '/V0.0.1/classfication/findAttributItemByClassId/'
// 添加商品
global.addproductPath = '/V1.0.0/product/insertOrUpdateProduct'
// 商品列表
global.productlistPath = '/V1.0.0/product/list'
// 商品中心商品详情
global.storeProductInfoPath = '/V1.0.0/product/getProductInfo'
// 编辑商品中删除sku信息
global.skuDelListPath = '/V1.0.0/productRepertory/deleteById'
// 编辑商品中删除微量元素
global.eleDelListPath = '/V1.0.0/product/deleByElementId'
// 上传图片
// global.hospitaluploadFilePath = '/V1.0.0/api/file/upload'
global.hospitaluploadFilePath = '/zuul/file-service-file-upload/V1.0.0/api/file/upload'
//物流中心列表
global.LogisticsDataPath = '/V1.0.0/logisticsCenter/findByPaging'
//物流中心-是否展示
global.ShowlogisticsPath = '/V1.0.0/logisticsCenter/update'
//物流中心-删除
global.DelLogisticsPath = '/V1.0.0/logisticsCenter/delete'
//物流中心-删除
global.AddlogisticsPath = '/V1.0.0/logisticsCenter/add'
//商城-系统设置-检索记录
global.searchingListPath = '/V1.0.0/searchStatistics/findSearchData'
//商城-系统设置-检索记录-删除
global.DelSearchingPath = '/V1.0.0/searchStatistics/deleteSearchData'
//**************支付中心*************
//支付中心列表
global.PayCentreListPath = '/V1.0.0/paymentCenter/findAllPaymentCenter'
//支付中心列表
global.PayListrankPath = '/V1.0.0/paymentCenter/updateSort'
//支付中心是否展示
global.PayListShowPath = '/V1.0.0/paymentCenter/update'
//*******************************健身中心******************************
//添加标签
global.fitnessLabellControllersavePath = '/V1.0.0/LabellController/save'
//修改标签
global.fitnessLabellControllerupdateLabelPath = '/V1.0.0/LabellController/updateLabel'
//删除标签
global.fitnessLabellControllerdeleteByIdPath = '/V1.0.0/LabellController/deleteById'
//标签列表
global.fitnessLabellControllerselectLabellPagePath = '/V1.0.0/LabellController/selectLabellPage'
//新增部位
global.fitnessSiteControllersavePath = '/V1.0.0/SiteController/save'
//修改部位
global.fitnessSiteControllerupdatePath = '/V1.0.0/SiteController/updateSite'
//删除部位
global.fitnessSiteControllerdeleteByIdPath = '/V1.0.0/SiteController/deleteById'
//部位列表
global.fitnessSiteControllerselectSitePagePath = '/V1.0.0/SiteController/selectSitePage'
//添加动作
global.fitnessActionControllersavePath = '/V1.0.0/ActionController/save'
//修改动作
global.fitnessActionControllerupdateByIdPath = '/V1.0.0/ActionController/updateById'
//动作删除
global.fitnessTrainActionControllerdeleteByIdPath = '/V1.0.0/ActionController/deleteById'
//搜索动作
global.fitnessTrainActionControllerfindActionPath = '/V1.0.0/ActionController/findAction'
//搜索动作
global.fitnessActionControllerfindByIdPath = '/V1.0.0/ActionController/findById'
//动作分页
global.fitnessActionControllerselectTrainActionDTOPagePath = '/V1.0.0/ActionController/selectTrainActionDTOPage'
//添加训练
global.fitnessTrainControllersavePath = '/V1.0.0/TrainController/save'
//修改训练
global.fitnessTrainControllerupdateByIdPath = '/V1.0.0/TrainController/updateById'
//训练删除
global.fitnessTrainControllerdeleteByIdsPath = '/V1.0.0/TrainController/deleteByIds'
//id搜索训练
global.fitnessTrainControllerfindTrainActionByIdPath = '/V1.0.0/TrainController/findTrainActionById'
//训练分页
global.fitnessTrainControllerselectTrainPagePath = '/V1.0.0/TrainController/selectTrainPage'
//添加课程
global.fitnessCourseControllersavePath = '/V1.0.0/CourseController/save'
//条件搜索训练
global.fitnessCourseControllerselectSiteLabelLevelPath = '/V1.0.0/CourseController/selectSiteLabelLevel'
//修改课程
global.fitnessCourseControllerupdateByIdPath = '/V1.0.0/CourseController/updateById'
//课程删除
global.fitnessCourseControllerdeleteByIdPath = '/V1.0.0/CourseController/deleteById'
//搜索课程
// global.fitnessCourseControllerselectCourseParticularsPath = '/V1.0.0/CourseController/selectCourseParticulars'
//课程详情
global.fitnessCourseControllerfindByIdPath = '/V1.0.0/CourseController/selectCourseParticulars'
//课程详情
global.fitnessCourseControllerfindByIdPath = '/V1.0.0/CourseController/selectCourseParticulars'
//课程分页
global.fitnessCourseControllerselectCoursePagePath = '/V1.0.0/CourseController/selectCoursePage'
//添加首页文案
global.fitnesssloganaddHomeSloganPath = '/V1.0.0/slogan/addHomeSlogan'
//修改首页文案
global.fitnesssloganupdateHomeSloganPath = '/V1.0.0/slogan/updateHomeSlogan'
//首页文案删除
global.fitnessslogandeleteAllHomeSloganPath = '/V1.0.0/slogan/deleteAllHomeSlogan'
//首页文案查询分页
global.fitnesssloganselectHomeSloganPath = '/V1.0.0/slogan/selectHomeSlogan'
//添加分享文案
global.fitnesssloganaaddShareSloganPath = '/V1.0.0/slogan/addShareSlogan'
//修改分享文案
global.fitnesssloganupdateShareSloganPath = '/V1.0.0/slogan/updateShareSlogan'
//分享文案删除
global.fitnessslogandeleteAllShareSloganPath = '/V1.0.0/slogan/deleteAllShareSlogan'
//分享文案分页
global.fitnesssloganselectShareSloganPath = '/V1.0.0/slogan/selectShareSlogan'