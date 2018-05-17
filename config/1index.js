// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
require("../API/config.js");
module.exports = {
    // production 环境
    build: {
        // 使用 prod.env 中定义的编译环境
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        // 编译输出的静态资源根路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 编译输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布上线路径的根目录，可配置为资源服务器域名或CDN域名
        assetsPublicPath: '/',
        // 是否开启 gzip
        productionGzip: false,
        // 需要使用 gsip 压缩的文件扩展名
        productionGzipExtensions: ['js', 'css']
    },
    // dev环境
    dev: {
        // 使用 dev.env 中定义的编译环境
        env: require('./dev.env'),
        // 进行测试页面的端口
        port: 7000,
        // 编译 输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布线上的根目录 可以自定义
        assetsPublicPath: '/',
        proxyTable: {
            // 2.0-------------------------
            // 医生管理
            '/V2.0.0/medicalDictionary/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            '/V2.0.0/doctor/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 症状自查
            '/V2.0.0/symptomPosition/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 疾病管理
            '/V2.0.0/disease/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 用药管理
            '/V2.0.0/homeDrugRecommend/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 圈子管理
            '/V2.0.0/medicalDictionary/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            '/V2.0.0/circle/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 圈子分类
            '/V2.0.0/circleAssortment/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 热词管理
            '/V2.0.0/hotSearch/': {
                target: "http://" + global.hospitalSearchIp + ":" + global.hospitalSearchPort,
                changeOrigin: true
            },
            // 2.0健康模块
            // 查询健康档案信息
            '/V2.0.0/healthRecords/': {
                target: "http://" + global.logHeadltIp + ":" + global.headltPort,
            },
            // 1.0---------------------------------------------------
            // 登录模块
            '/V1.0.0/static/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            // 账户模块
            '/V1.0.0/static/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/account/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/accountRole/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/role/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/roleResource/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/resource/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/accountRole/': {
                target: "http://" + global.logAccountIp + ":" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/user-health-data/': {
                target: "http://" + global.logHeadltIp + ":" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/userinfo/': {
                target: "http://" + global.logHeadltUserIp + ":" + global.headltUserPort,
                changeOrigin: true
            },
            // 字典模块
            '/V1.0.0/dictionary/': {
                target: "http://" + global.logHeadltIp + ":" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/base/dictionary/': {
                target: "http://" + global.logHeadltCityIp + ":" + global.headltCityPort,
                changeOrigin: true
            },
            '/V1.0.0/bodyCheckRule/': {
                target: "http://" + global.logHeadltIp + ":" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/standard-data/': {
                target: "http://" + global.logHeadltIp + ":" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/index-tip/': {
                target: "http://" + global.logHeadltIp + ":" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/topSearchControl': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            '/V1.0.0/newsControl': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            //文件上传
            '/V1.0.0/api/file/upload': {
                target: "http://" + global.uploadIp + ":" + global.uploadPort,
                changeOrigin: true
            },
            '/zuul/fileUploadApi': {
                target: "http://" + global.upBigloadIp + ":" + global.upBigloadPort,
                changeOrigin: true
            },
            '/V1.0.0/classiflyControl': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            // 激励模块
            '/V1.0.0/encourage': {
                target: "http://" + global.encourageIp + ":" + global.encouragePort,
                changeOrigin: true
            },
            '/v1.0.0/homePage': {
                target: "http://" + global.encourageIp + ":" + global.encouragePort,
                changeOrigin: true
            },
            '/V1.0.0/banner': {
                target: "http://" + global.encouragebannerIp + ":" + global.encouragebannerPort,
                changeOrigin: true
            },
            // 金融模块
            '/V1.0.0/wallet': {
                target: "http://" + global.financialIp + ":" + global.financialPort,
                changeOrigin: true
            },
            // 饮食模块
            '/V1.0.0/food': {
                target: "http://" + global.foodIp + ":" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/indexRecipes': {
                target: "http://" + global.foodIp + ":" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/recipes': {
                target: "http://" + global.foodIp + ":" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/dictionary': {
                target: "http://" + global.foodIp + ":" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/searchStatistics': {
                target: "http://" + global.foodsIp + ":" + global.foodsPort,
                changeOrigin: true
            },
            // 商城模块
            // 降价通知
            '/V1.0.0/NoticeOfReductionController': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            // 品牌管理
            '/V1.0.0/brand': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            // 库存管理
            '/V1.0.0/productRepertory': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            // 商品分类
            '/V0.0.1/classfication': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            //库存下商城删除
            '/V1.0.0/product': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            // 商城删除--优惠券
            '/V1.0.0/coupon': {
                target: "http://" + global.storecouponIp + ":" + global.storecouponPort,
                changeOrigin: true
            },
            // 商城--商品规格
            '/V0.0.1/classAttribute': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            '/V0.0.1/classAttributeItem': {
                target: "http://" + global.storeIp + ":" + global.storePort,
                changeOrigin: true
            },
            // 商城-支付中心-列表
            '/V1.0.0/paymentCenter': {
                target: "http://" + global.financialIp + ":" + global.financialPort,
                changeOrigin: true
            },
            // 商城-物流管理-列表
            '/V1.0.0/logisticsCenter': {
                target: "http://" + global.logisticsIp + ":" + global.logisticsPort,
                changeOrigin: true
            },
            // 商城--订单中心
            '/V1.0.0/goodsOrder': {
                target: "http://" + global.storegoodsOrderIp + ":" + global.storegoodsOrderPort,
            },
            // 商城--模板编辑
            '/V1.0.0/homePage': {
                target: "http://" + global.storeoperationIp + ":" + global.storeoperationPort,
            },
            // 商城删除--模板编辑
            '/V1.0.0/api/homeIcon': {
                target: "http://" + global.storeoperationIp + ":" + global.storeoperationPort,
            },
            // 公共模块--单页管理
            '/V1.0.0/pageContext': {
                target: "http://" + global.logHeadltCityIp + ":" + global.headltCityPort,
            },
            // 公共模块--版本管理
            '/V1.0.0/base/appVersion': {
                target: "http://" + global.versionsIp + ":" + global.versionsPort,
            },
            // 商城-系统设置-模板编辑
            '/V1.0.0/hotSearch': {
                target: "http://" + global.storehotSearchIp + ":" + global.storehotSearchPort,
            },
            // 健身模块
            '/V1.0.0/LabellController': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            // 健身模块
            '/V1.0.0/SiteController': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            // 健身模块
            '/V1.0.0/ActionController': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            // 健身模块
            '/V1.0.0/TrainActionController': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            // 健身模块
            '/V1.0.0/TrainController': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            // 健身模块
            '/V1.0.0/CourseController': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            // 健身模块
            '/V1.0.0/slogan': {
                target: "http://" + global.fitnessIp + ":" + global.fitnessPort,
            },
            //医疗模块
            //动态/评论
            '/V1.0.0/commentsInfo': {
                target: "http://" + global.newsCommenIp + ":" + global.newsCommenPort,
                changeOrigin: true
            },
            //评论
            '/V1.0.0/replyInfo': {
                target: "http://" + global.newsCommenIp + ":" + global.newsCommenPort,
                changeOrigin: true
            },
            //医院
            '/V1.0.0/hospital/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/doctor/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/doctor-word/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //药店管理
            '/V1.0.0/drugstore/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //药品推荐
            '/V1.0.0/homeDrugRecommend/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //疾病管理
            '/V1.0.0/disease/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //症状管理
            '/V1.0.0/symptomPosition/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/medicalDictionary/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/Advertising/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //问答管理
            '/V1.0.0/healthQuestion/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //问答管理-评论详情
            '/V1.0.0/healthAnswer/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //文章管理
            '/V1.0.0/article/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //药物管理
            '/V1.0.0/drug/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //圈子管理-分页
            '/V1.0.0/circle/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //圈子管理-动态分页
            '/V1.0.0/dynamic/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            //指标与科室-分页
            '/V1.0.0/indexDepartment/': {
                target: "http://" + global.hospitalIp + ":" + global.hospitalPort,
                changeOrigin: true
            },
            // 新闻2.0 模块************************************************************
            //  新闻管理
            '/V2.0.0/newsController/': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
            },
            // 标签管理
            '/V2.0.0/labelController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            //小视频管理
            '/V2.0.0/video/': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
            },
            // 赞赏记录
            '/V2.0.0/appreciate-log': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
            },
            // 作者管理
            '/V2.0.0/newsAuthorController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            // 草稿管理
            '/V2.0.0/draftsController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            //问答管理
            '/V2.0.0/questionsController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            //问答管理-查询问答互动数据信息
            '/V2.0.0/newsSummaryController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            // 审核管理
            '/V2.0.0/userPermissionController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            // 审核详情
            '/V2.0.0/userSummaryController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            // 用户管理
            '/V2.0.0/userSummaryController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
            // 互动数据
            '/V2.0.0/answersController': {
                target: "http://" + global.newsIp + ":" + global.newsPort,
                changeOrigin: true
            },
        },
        // 是否开启 cssSourceMap
        cssSourceMap: false
    }
}